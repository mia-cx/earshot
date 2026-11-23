import { error } from '@sveltejs/kit';
import { course } from '#lib/server/course.ts';
import { credits } from '#lib/server/credits.ts';
import { skillGroups } from '#lib/server/skills.ts';

/** The lesson the landing page takes apart: a short TLDR, an interactive diagram and small tricks. */
const SHOWCASE = 'outreach/cold-email';

export const load = () => {
	const lesson = course.lessons.find((l) => l.id === SHOWCASE);
	const module = course.modules.find((m) => m.slug === lesson?.module);
	if (!lesson || !module) error(500, `Showcase lesson ${SHOWCASE} is missing`);

	return {
		showcase: {
			title: lesson.title,
			href: lesson.href,
			hue: module.hue,
			tldr: lesson.tldr,
			diagram: lesson.blocks.find((b) => b.kind === 'diagram')?.name,
			trick: lesson.tricks[0],
			task: lesson.task,
			check: lesson.checks[0]
		},
		tricks: course.lessons.reduce((n, l) => n + l.tricks.length, 0),
		research: credits.research,
		posts: credits.posts,
		authors: credits.authors,
		skills: skillGroups
	};
};
