import { course } from './course.ts';

const X_POST = /https:\/\/x\.com\/(\w+)\/status\/(\d+)/g;
/** Every link in a rendered Sources section. */
const LINK = /href="(https?:\/\/[^"]+)"/g;

/** One key per document: the same page linked to a section, over http or with a trailing slash counts once. */
const documentKey = (url: string) => {
	const { hostname, pathname, search } = new URL(url);
	return `${hostname.replace(/^www\./, '')}${pathname.replace(/\/$/, '')}${search}`;
};

/** Every link in a lesson's Sources section, research and X posts, once each, in order. */
export const sourceLinks = (sources: string) => [...new Set(Array.from(sources.matchAll(LINK), ([, url]) => url))];

const posts = new Map<string, string>();
const research = new Set<string>();
for (const lesson of course.lessons) {
	for (const [, handle, id] of lesson.sources.matchAll(X_POST)) posts.set(id, handle);
	for (const [, url] of lesson.sources.matchAll(LINK))
		if (!url.startsWith('https://x.com/')) research.add(documentKey(url));
}

/**
 * What the lessons stand on: the research they cite (studies, books, official docs, every non-X
 * source, counted once per document) and the X posts they apply it through, with the posts' authors
 * sorted by handle.
 */
export const credits = {
	research: research.size,
	posts: posts.size,
	authors: [...new Map([...posts.values()].map((h) => [h.toLowerCase(), h])).values()].sort((a, b) =>
		a.localeCompare(b, 'en', { sensitivity: 'base' })
	)
};
