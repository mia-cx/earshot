import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import { blockWords, narratedSections, spokenText, wordAt } from '#lib/narration.ts';
import { checkSpend, type Index, type Lesson, plan, readLesson, wordTimings } from './narrate.ts';

// Proves an emoji, one ElevenLabs character but two UTF-16 units, doesn't shift the words after it:
// "Hi 🎉 there" is 10 code points, and "there" starts at the sixth (index 5).
it('maps word times through code points, not UTF-16 units', async () => {
	const [section] = await readLesson(page('<p>Hi 🎉 there</p>'), 'voice', 'model');
	const times = Array.from(section.text).map((_, i) => i);
	expect(wordTimings(section, times, times)).toEqual([0, 1, 3, 3, 5, 9]);
});

/** A prerendered lesson page, cut down to its body. */
const page = (body: string) =>
	`<html><body><h1>Title</h1><div class="lesson" data-narration>${body}</div></body></html>`;

const lesson = page(`
	<aside class="callout" data-kind="tldr"><p class="callout-title">The short version.</p><ul><li>A point.</li></ul></aside>
	<p>Positioning is <em>any</em>way the <a href="/x">context</a> that   makes value obvious.</p>
	<h2 id="why">Why it matters</h2>
	<p>Three reasons:</p>
	<ul><li>It sets the price.</li><li>It picks the buyer.</li></ul>
	<h3>The first reason</h3>
	<p>Price follows category.</p>
	<aside class="callout" data-kind="trick"><p>A trick paragraph.</p></aside>
	<p>After the trick.</p>
	<blockquote><p>A quoted paragraph.</p></blockquote>
	<table><tbody><tr><td>A cell.</td></tr></tbody></table>
	<p><img src="/a.png" alt="A chart"></p>
	<h2 id="next">Next topic</h2>
	<p>Second paragraph, <code>robots.txt</code> included.<span aria-hidden="true"> hidden</span></p>
`);

// Proves what a heading's button reads: the heading and the prose under it, lists included, through
// subheadings, stopping at a callout, quote, table or image and before the next topic. The TL;DR is a
// section of its own; other callouts, quotes and tables stay silent, and words split by markup read as one.
it('reads a lesson body as sections of headings, paragraphs and list items', () => {
	const { document } = parseHTML(lesson);
	const sections = narratedSections(document.querySelector('[data-narration]') as Element).map((section) =>
		section.map((block) => spokenText(blockWords(block)).text)
	);
	expect(sections).toEqual([
		['The short version.', 'A point.'],
		['Positioning is anyway the context that makes value obvious.'],
		[
			'Why it matters',
			'Three reasons:',
			'It sets the price.',
			'It picks the buyer.',
			'The first reason',
			'Price follows category.'
		],
		['After the trick.'],
		['Next topic', 'Second paragraph, robots.txt included.']
	]);
});

// Proves each section is one recording of its blocks, a paragraph break apart, with a full stop after
// headings so the voice pauses there, and that every word's position points at that word in the text
// sent, so the timings land on the words the page highlights.
it('voices each section as one text, with every word located in it', async () => {
	const sections = await readLesson(lesson, 'voice', 'model');
	expect(sections.map((s) => s.text)).toEqual([
		'The short version.\n\nA point.',
		'Positioning is anyway the context that makes value obvious.',
		'Why it matters.\n\nThree reasons:\n\nIt sets the price.\n\nIt picks the buyer.\n\nThe first reason.\n\nPrice follows category.',
		'After the trick.',
		'Next topic.\n\nSecond paragraph, robots.txt included.'
	]);
	const words = (s: (typeof sections)[number]) => s.offsets.map((at, i) => s.text.slice(at, at + s.lengths[i]));
	expect(words(sections[2])).toEqual(
		'Why it matters Three reasons: It sets the price. It picks the buyer. The first reason Price follows category.'.split(
			' '
		)
	);
	// Markup splits a word for the marker, as it does here, while the voice still reads "anyway".
	expect(words(sections[1]).slice(0, 4)).toEqual(['Positioning', 'is', 'any', 'way']);
	// An entity doesn't: a browser keeps "buyer's" one text node, so it's one word, as the marker counts it.
	const [entity] = await readLesson(page('<p>Your buyer&#39;s mind, an idea.</p>'), 'voice', 'model');
	expect(words(entity)).toEqual(['Your', "buyer's", 'mind,', 'an', 'idea.']);
	// A handle is said as a name, and still counts as the one word the page shows.
	const [handle] = await readLesson(page('<p>In @kunalvg&#39;s experience.</p>'), 'voice', 'model');
	expect(handle.text).toBe("In Kunal V G's experience.");
	expect(words(handle)).toEqual(['In', "Kunal V G's", 'experience.']);
	expect(await readLesson('<html><body><p>Not a lesson.</p></body></html>', 'voice', 'model')).toEqual([]);
});

// Proves the title is read first, after its module, and that only the title's words are timed: the
// module is spoken but isn't on the page to highlight.
it('reads the module and lesson title as the first section', async () => {
	const titled = `<html><body><h1 data-narration-intro="Module 1: What marketing is.">Say what you are</h1>
		<div class="lesson" data-narration><p>Body.</p></div></body></html>`;
	const [title, body] = await readLesson(titled, 'voice', 'model');
	expect(title.text).toBe('Module 1: What marketing is.\n\nSay what you are.');
	expect(title.offsets.map((at, i) => title.text.slice(at, at + title.lengths[i]))).toEqual([
		'Say',
		'what',
		'you',
		'are'
	]);
	expect(body.text).toBe('Body.');
});

describe('a rerun', () => {
	const read = async (id: string, html: string, voice = 'voice'): Promise<Lesson> => ({
		id,
		sections: await readLesson(html, voice, 'model')
	});
	const voicedIndex = (lessons: Lesson[]): Index => ({
		sections: lessons.flatMap((l) => l.sections.map((s) => s.key)),
		lessons: Object.fromEntries(lessons.map((l) => [l.id, l.sections.map((s) => s.key)]))
	});

	// Proves an edit pays for the edited paragraph's section only.
	it('records only the section that changed', async () => {
		const before = await read('m/one', page('<h2>A</h2><p>First stays.</p><h2>B</h2><p>Second before.</p>'));
		const after = await read('m/one', page('<h2>A</h2><p>First stays.</p><h2>B</h2><p>Second after the edit.</p>'));
		const { generate, characters } = plan([after], voicedIndex([before]), { only: [], all: false });
		expect(generate.map((s) => s.text)).toEqual(['B.\n\nSecond after the edit.']);
		expect(characters).toBe(26);
	});

	// Proves a markup-only edit that splits a word for the marker re-records its section, so the
	// timings never have fewer words than the page highlights.
	it('records a section again when markup splits a word', async () => {
		const before = await read('m/one', page('<p>Read it anyway now.</p>'));
		const after = await read('m/one', page('<p>Read it <em>any</em>way now.</p>'));
		expect(after.sections[0].text).toBe(before.sections[0].text);
		expect(plan([after], voicedIndex([before]), { only: [], all: false }).generate).toHaveLength(1);
	});

	// Proves a new voice is never mixed with audio in the old one.
	it('records every section again in a new voice', async () => {
		const before = await read('m/one', page('<p>First.</p><blockquote><p>Q</p></blockquote><p>Second.</p>'));
		const after = await read('m/one', page('<p>First.</p><blockquote><p>Q</p></blockquote><p>Second.</p>'), 'another');
		expect(plan([after], voicedIndex([before]), { only: [], all: false }).generate).toHaveLength(2);
	});

	// Proves a plain run keeps narrated lessons current and spends nothing on lessons nobody asked for.
	it('voices narrated lessons, plus those named', async () => {
		const narrated = await read('m/one', page('<p>Narrated.</p>'));
		const edited = await read('m/one', page('<p>Narrated, then edited.</p>'));
		const fresh = await read('m/two', page('<p>Never narrated.</p>'));
		const index = voicedIndex([narrated]);
		const ids = (scope: { only: string[]; all: boolean }) =>
			plan([edited, fresh], index, scope).voiced.map((l) => l.id);
		expect(ids({ only: [], all: false })).toEqual(['m/one']);
		expect(ids({ only: ['m/two'], all: false })).toEqual(['m/one', 'm/two']);
		expect(ids({ only: [], all: true })).toEqual(['m/one', 'm/two']);
		expect(() => plan([edited, fresh], index, { only: ['m/typo'], all: false })).toThrow('No lesson m/typo');
	});

	// Proves a section too long for one request is refused before anything is spent.
	it('refuses a section longer than one request', async () => {
		const long = await read('m/one', page(`<p>${'word '.repeat(1_200)}</p>`));
		expect(() => plan([long], { sections: [], lessons: {} }, { only: ['m/one'], all: false })).toThrow('over the 5000');
	});
});

// Proves a run never spends past its budget or the account's balance.
it.each([
	{ characters: 2_000, budget: 25_000, remaining: 10_000, refused: false },
	{ characters: 25_000, budget: 25_000, remaining: 25_000, refused: false },
	{ characters: 25_001, budget: 25_000, remaining: 100_000, refused: 'over its budget of 25000' },
	{ characters: 5_000, budget: 25_000, remaining: 4_999, refused: 'has 4999 left' }
])(
	'$characters characters, budget $budget, $remaining left: refused $refused',
	({ characters, budget, remaining, refused }) => {
		const spend = () => checkSpend(characters, budget, remaining);
		if (refused) expect(spend).toThrow(refused);
		else expect(spend).not.toThrow();
	}
);

// Proves the highlight follows the voice: the last word started, never one not yet spoken.
it.each([
	{ seconds: 0, word: 0 },
	{ seconds: 0.39, word: 0 },
	{ seconds: 0.4, word: 1 },
	{ seconds: 0.95, word: 1 },
	{ seconds: 1.2, word: 2 },
	{ seconds: 99, word: 2 }
])('at $seconds s the word is $word', ({ seconds, word }) => {
	expect(wordAt([0.05, 0.35, 0.4, 0.9, 1.1, 1.6], seconds)).toBe(word);
});
