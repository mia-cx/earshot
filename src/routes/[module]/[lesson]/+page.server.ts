import { existsSync } from 'node:fs';
import { error } from '@sveltejs/kit';
import { course } from '#lib/server/course.ts';
import { sourceLinks } from '#lib/server/credits.ts';

export const entries = () => course.lessons.map((l) => ({ module: l.module, lesson: l.id.split('/')[1] }));

export const load = ({ params, url }) => {
	const lesson = course.lessons.find((l) => l.id === `${params.module}/${params.lesson}`);
	if (!lesson) error(404, 'No lesson here');
	const { tricks, tldr, task, ...rest } = lesson;
	// Narration made by research/tools/voice.mjs, when it exists for this lesson.
	const audio = existsSync(`static/audio/${lesson.id}.mp3`) ? `/audio/${lesson.id}.mp3` : null;
	// Share image made by research/tools/og.mjs, when it exists for this lesson.
	const image = existsSync(`static/og/${lesson.id}.png`) ? `/og/${lesson.id}.png` : '/og.png';
	// Prerendered, so `url` has the public origin (SITE_URL) even when a mirror serves the page.
	return { lesson: rest, audio, image, link: url.href, basedOn: sourceLinks(lesson.sources) };
};
