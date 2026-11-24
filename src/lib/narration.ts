/**
 * Lesson narration, shared by the generator (`scripts/narrate.ts`, reading the prerendered pages)
 * and the player (`Narrator.svelte`, reading the live page), so both see the same words.
 *
 * The lesson body carries `data-narration`. Its prose is voiced section by section: a section's blocks
 * (each `##` and `###` heading, paragraph and list item) are read in one recording, so it flows with no
 * seams between them. A section ends at a visual break (a callout, diagram, worksheet, quote, table,
 * code block or image) and before each `##`, which starts a new topic. A recording is stored under a
 * hash of its exact spoken text, voice and model, so editing a paragraph re-records its section only,
 * and edited text never plays stale audio.
 *
 * A word is a whitespace-separated run of text in one text node, outside `<pre>` and `aria-hidden`,
 * as `<mia-marker>` counts them, so a word's index in the timings is its index in the highlight.
 */

import { say } from './pronunciation.ts';

/** Bumped when extraction or the audio format changes, so every block is voiced afresh. */
export const NARRATION_VERSION = 3;
/** ElevenLabs output format, part of every key. */
export const NARRATION_FORMAT = 'mp3_44100_128';

/** One word of a block as it reads aloud. */
export type Word = {
	text: string;
	/** Continues the previous word with no space between, as `<em>any</em>way` does. */
	joined: boolean;
};

/**
 * A lesson's narration as stored at `lessons/<module>/<lesson>.json`: the voice and model it was read
 * in, and for each section key the start and end times in seconds of every word it reads, its blocks'
 * words one after another, flat as `[start0, end0, …]`.
 */
export type LessonNarration = {
	voice: string;
	model: string;
	sections: Record<string, number[]>;
};

const SILENT = 'pre, script, style, noscript, [aria-hidden="true"]';
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

/** A block's words in reading order. */
export const blockWords = (block: Element): Word[] => {
	const words: Word[] = [];
	/** Whether the last word ended its text node with no space after it, so the next may join it. */
	let open = false;
	const visit = (node: Node) => {
		if (node.nodeType === ELEMENT_NODE) {
			if ((node as Element).matches(SILENT)) return;
			for (const child of node.childNodes) visit(child);
			return;
		}
		if (node.nodeType !== TEXT_NODE) return;
		const data = (node as Text).data;
		for (const match of data.matchAll(/\S+/g)) {
			words.push({ text: match[0], joined: open && match.index === 0 });
			open = false;
		}
		if (data.length) open = /\S$/.test(data);
	};
	for (const child of block.childNodes) visit(child);
	return words;
};

/** The TL;DR callout, the one callout read aloud: a section of its own. */
export const TLDR = '[data-kind="tldr"]';

/** A heading or paragraph is one block; a list is one block per item; anything else is none. */
const blocksOf = (el: Element) =>
	/^(H2|H3|P)$/.test(el.tagName)
		? [el]
		: /^(UL|OL)$/.test(el.tagName)
			? [...el.children].filter((li) => li.tagName === 'LI')
			: [];

/**
 * The sections a lesson body reads aloud, in reading order, each a list of blocks read one after
 * another. Anything that isn't a heading, paragraph or list breaks a section, as does a paragraph
 * with no words (an image), and every `##` starts one. The TL;DR is read as a section of its own:
 * its one-line summary, then its points.
 */
export const narratedSections = (body: Element): Element[][] => {
	const sections: Element[][] = [[]];
	const end = () => {
		if (sections.at(-1)?.length) sections.push([]);
	};
	for (const el of body.children) {
		if (el.tagName === 'H2' || el.matches(TLDR)) end();
		const blocks = el.matches(TLDR) ? [...el.children].flatMap(blocksOf) : blocksOf(el);
		const voiced = blocks.filter((block) => blockWords(block).length);
		if (!voiced.length) end();
		else sections.at(-1)?.push(...voiced);
		if (el.matches(TLDR)) end();
	}
	return sections.filter((section) => section.length);
};

/** The lesson title, whose `data-narration-intro` names its module, read before the title itself. */
export const TITLE = 'h1[data-narration-intro]';

/** Every section of a lesson page in reading order: its title, then its body's (`narratedSections`). */
export const lessonSections = (page: ParentNode): Element[][] => {
	const body = page.querySelector('[data-narration]');
	if (!body) return [];
	const title = page.querySelector(TITLE);
	return [...(title && blockWords(title).length ? [[title]] : []), ...narratedSections(body)];
};

/**
 * A block as it is read aloud, and where each word starts in that text and how long it is there. A
 * word is said as `say` gives it (an X handle as a name), so one word on the page can be several spoken.
 */
export const spokenText = (words: Word[]) => {
	let text = '';
	const offsets: number[] = [];
	const lengths: number[] = [];
	for (const [i, word] of words.entries()) {
		if (i > 0 && !word.joined) text += ' ';
		const spoken = say(word.text);
		offsets.push(text.length);
		lengths.push(spoken.length);
		text += spoken;
	}
	return { text, offsets, lengths };
};

/** Text that already ends a sentence, so the voice stops there. */
const ENDS_SENTENCE = /[.!?:;…]["'”’)\]]*$/;

/**
 * A section as it is read aloud: its blocks' text, a paragraph break apart so the voice pauses between
 * them, and where each word starts in that text and how long it is, in reading order. A block that
 * doesn't end a sentence, like a heading, gets a full stop the page doesn't show, or the voice runs it
 * straight into the next block. A section opened by the lesson title starts with its intro (the
 * module), spoken but not on the page, so no word of it is highlighted.
 */
export const sectionText = (blocks: Element[]) => {
	const intro = blocks[0]?.getAttribute('data-narration-intro');
	let text = intro ? `${intro}\n\n` : '';
	const offsets: number[] = [];
	const lengths: number[] = [];
	for (const [i, block] of blocks.entries()) {
		if (i > 0) text += '\n\n';
		const spoken = spokenText(blockWords(block));
		offsets.push(...spoken.offsets.map((offset) => text.length + offset));
		lengths.push(...spoken.lengths);
		text += ENDS_SENTENCE.test(spoken.text) ? spoken.text : `${spoken.text}.`;
	}
	return { text, offsets, lengths };
};

/** SHA-256 as hex, with Web Crypto, so Node and the browser hash alike. */
const sha256 = async (input: string) => {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/** The key a section's audio is stored under: a hash of its spoken text, voice, model and format. */
export const sectionKey = (text: string, voice: string, model: string) =>
	sha256(JSON.stringify({ v: NARRATION_VERSION, text, voice, model, format: NARRATION_FORMAT }));

/** The index of the word being spoken at `seconds`: the last one started, or 0 before the first. */
export const wordAt = (timings: number[], seconds: number) => {
	let low = 0;
	let high = timings.length / 2 - 1;
	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (timings[mid * 2] <= seconds) low = mid;
		else high = mid - 1;
	}
	return low;
};
