import { course } from '#lib/server/course.ts';
import { credits } from '#lib/server/credits.ts';

export const load = () => ({
	...credits,
	modules: course.modules.map((m) => ({
		slug: m.slug,
		number: m.number,
		title: m.title,
		href: m.href,
		hue: m.hue,
		lessons: m.lessons.map((l) => ({ id: l.id, title: l.title, href: l.href, sources: l.sources }))
	}))
});
