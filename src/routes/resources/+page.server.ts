import { course } from '#lib/server/course.ts';
import { tools } from '#lib/server/tools.ts';

/** The tools grouped under the modules that teach them, in lesson order, each with its lesson's title and link. */
export const load = () => {
	const lessons = new Map(course.lessons.map((l, order) => [l.id, { ...l, order }]));
	const lesson = (id: string) => {
		const found = lessons.get(id);
		if (!found) throw new Error(`/resources names lesson ${id}, which doesn't exist`);
		return found;
	};
	const link = ({ title, href }: { title: string; href: string }) => ({ title, href });
	const resolved = tools
		.map((tool) => {
			const { order, module, ...rest } = lesson(tool.lesson);
			return { ...tool, order, module, lesson: link(rest) };
		})
		.sort((a, b) => a.order - b.order);
	return {
		count: tools.length,
		lists: { launch: link(lesson('launch/first-100-users')), local: link(lesson('seo/local-seo')) },
		modules: course.modules
			.map((m) => ({
				slug: m.slug,
				number: m.number,
				title: m.title,
				href: m.href,
				hue: m.hue,
				tools: resolved.filter((t) => t.module === m.slug)
			}))
			.filter((m) => m.tools.length)
	};
};
