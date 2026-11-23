import { course } from './course.ts';

const X_POST = /https:\/\/x\.com\/(\w+)\/status\/(\d+)/g;

/** The X posts a lesson's Sources section links, once each, in order. */
export const sourcePosts = (sources: string) => [...new Set(sources.match(X_POST))];

const posts = new Map<string, string>();
for (const lesson of course.lessons)
	for (const [, handle, id] of lesson.sources.matchAll(X_POST)) posts.set(id, handle);

/** Every X post the lessons cite, and the people who wrote them, sorted by handle. */
export const credits = {
	posts: posts.size,
	authors: [...new Map([...posts.values()].map((h) => [h.toLowerCase(), h])).values()].sort((a, b) =>
		a.localeCompare(b, 'en', { sensitivity: 'base' })
	)
};
