import { course } from './course.ts';

const X_POST = /https:\/\/x\.com\/(\w+)\/status\/(\d+)/g;
/** Every link in a rendered Sources section. */
const LINK = /href="(https?:\/\/[^"]+)"/g;

/** The X posts a lesson's Sources section links, once each, in order. */
export const sourcePosts = (sources: string) => [...new Set(sources.match(X_POST))];

const posts = new Map<string, string>();
const research = new Set<string>();
for (const lesson of course.lessons) {
	for (const [, handle, id] of lesson.sources.matchAll(X_POST)) posts.set(id, handle);
	for (const [, url] of lesson.sources.matchAll(LINK)) if (!url.startsWith('https://x.com/')) research.add(url);
}

/**
 * What the lessons stand on: the research they cite (studies, books, official docs, every non-X
 * source, counted once per link) and the X posts they apply it through, with the posts' authors
 * sorted by handle.
 */
export const credits = {
	research: research.size,
	posts: posts.size,
	authors: [...new Map([...posts.values()].map((h) => [h.toLowerCase(), h])).values()].sort((a, b) =>
		a.localeCompare(b, 'en', { sensitivity: 'base' })
	)
};
