import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import { blockWords, narratedSections, spokenText, wordAt } from '#lib/narration.ts';
import { checkSpend, type Index, type Lesson, plan, readLesson } from './narrate.ts';

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
// subheadings, stopping at a callout, quote, table or image and before the next topic. Callouts, quotes
// and tables stay silent, and words split by markup read as one.
it('reads a lesson body as sections of headings, paragraphs and list items', () => {
	const { document } = parseHTML(lesson);
	const sections = narratedSections(document.querySelector('[data-narration]') as Element).map((section) =>
		section.map((block) => spokenText(blockWords(block)).text)
	);
	expect(sections).toEqual([
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

// Proves each section is one recording of its blocks, a paragraph break apart, and that every word's
// position points at that word in the text sent, so the timings land on the words the page highlights.
it('voices each section as one text, with every word located in it', async () => {
	const sections = await readLesson(lesson, 'voice', 'model');
	expect(sections.map((s) => s.text)).toEqual([
		'Positioning is anyway the context that makes value obvious.',
		'Why it matters\n\nThree reasons:\n\nIt sets the price.\n\nIt picks the buyer.\n\nThe first reason\n\nPrice follows category.',
		'After the trick.',
		'Next topic\n\nSecond paragraph, robots.txt included.'
	]);
	const words = (s: (typeof sections)[number]) => s.offsets.map((at, i) => s.text.slice(at, at + s.lengths[i]));
	expect(words(sections[1])).toEqual(
		'Why it matters Three reasons: It sets the price. It picks the buyer. The first reason Price follows category.'.split(
			' '
		)
	);
	// Markup splits a word for the marker, as it does here, while the voice still reads "anyway".
	expect(words(sections[0]).slice(0, 4)).toEqual(['Positioning', 'is', 'any', 'way']);
	expect(await readLesson('<html><body><p>Not a lesson.</p></body></html>', 'voice', 'model')).toEqual([]);
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
		expect(generate.map((s) => s.text)).toEqual(['B\n\nSecond after the edit.']);
		expect(characters).toBe(25);
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
