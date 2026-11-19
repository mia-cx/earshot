/**
 * A backup is one JSON file holding every saved `earshot:*` key in this browser (done lessons,
 * the review deck, answers, settings), so the reader can move their progress to another browser.
 */
const PREFIX = 'earshot:';

type Saved = Record<string, string>;

const ours = (entries: [string, unknown][]) => entries.filter(([key]) => key.startsWith(PREFIX));

/** The backup file's text for what's saved, e.g. `exportBackup({ ...localStorage })`. */
export const exportBackup = (saved: Saved) =>
	JSON.stringify(Object.fromEntries(ours(Object.entries(saved))), null, '\t');

/** The keys and values to write back from a backup file's text, or null when it isn't a backup. */
export const parseBackup = (text: string): Saved | null => {
	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch {
		return null;
	}
	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
	const entries = Object.entries(parsed);
	if (!entries.length || ours(entries).length !== entries.length) return null;
	if (!entries.every(([, value]) => typeof value === 'string')) return null;
	return Object.fromEntries(entries);
};
