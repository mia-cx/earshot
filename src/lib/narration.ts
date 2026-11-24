/**
 * Lesson narration, shared by the generator (`scripts/narrate.ts`, reading the prerendered pages)
 * and the player (`Narrator.svelte`, reading the live page), so both see the same words.
 *
 * The lesson body carries `data-narration`. Its prose is voiced block by block: each `##` and `###`
 * heading, paragraph and list item is one clip. Blocks group into sections, read one after another:
 * a section ends at a visual break (a callout, diagram, worksheet, quote, table, code block or image)
 * and before each `##`, which starts a new topic. A clip is stored under a hash of its exact spoken
 * text, voice and model, so editing one paragraph leaves the others' audio in place, and edited text
 * never plays stale audio.
 *
 * A word is a whitespace-separated run of text in one text node, outside `<pre>` and `aria-hidden`,
 * as `<mia-marker>` counts them, so a word's index in the timings is its index in the highlight.
 */

/** Bumped when extraction or the audio format changes, so every block is voiced afresh. */
export const NARRATION_VERSION = 1;
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
 * in, and for each block key its words' start and end times in seconds, flat as `[start0, end0, …]`.
 */
export type LessonNarration = {
	voice: string;
	model: string;
	blocks: Record<string, number[]>;
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

/**
 * The sections a lesson body reads aloud, in reading order, each a list of blocks read one after
 * another. Anything that isn't a heading, paragraph or list breaks a section, as does a paragraph
 * with no words (an image), and every `##` starts one.
 */
export const narratedSections = (body: Element): Element[][] => {
	const sections: Element[][] = [[]];
	const end = () => {
		if (sections.at(-1)?.length) sections.push([]);
	};
	for (const el of body.children) {
		if (el.tagName === 'H2') end();
		const blocks = /^(H2|H3|P)$/.test(el.tagName)
			? [el]
			: /^(UL|OL)$/.test(el.tagName)
				? [...el.children].filter((li) => li.tagName === 'LI')
				: [];
		const voiced = blocks.filter((block) => blockWords(block).length);
		if (!voiced.length) end();
		else sections.at(-1)?.push(...voiced);
	}
	return sections.filter((section) => section.length);
};

/** Whether a block gets its own play button: headings and paragraphs do, list items are read as part of a section. */
export const hasButton = (block: Element) => block.tagName !== 'LI';

/** A block as it is read aloud, and where each word starts in that text. */
export const spokenText = (words: Word[]) => {
	let text = '';
	const offsets: number[] = [];
	for (const [i, word] of words.entries()) {
		if (i > 0 && !word.joined) text += ' ';
		offsets.push(text.length);
		text += word.text;
	}
	return { text, offsets };
};

/** SHA-256 as hex, with Web Crypto, so Node and the browser hash alike. */
const sha256 = async (input: string) => {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/** The key a block's audio is stored under: a hash of its spoken text, voice, model and format. */
export const blockKey = (text: string, voice: string, model: string) =>
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
