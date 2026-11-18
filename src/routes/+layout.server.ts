import type { Outline } from '#lib/course.ts';
import { course } from '#lib/server/course.ts';
import { credits } from '#lib/server/credits.ts';

export const prerender = true;

export const load = () => ({
	credits: { posts: credits.posts, people: credits.authors.length },
	outline: course.modules.map(({ lessons, ...module }) => ({
		...module,
		lessons: lessons.map(({ id, href, module, number, title, summary, minutes, checks }) => ({
			id,
			href,
			module,
			number,
			title,
			summary,
			minutes,
			checks: checks.length
		}))
	})) satisfies Outline
});
