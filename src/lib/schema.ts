/**
 * Schema.org structured data for the course, so search engines and AI crawlers read Earshot as a
 * course. Every page carries `course` (`Seo.svelte`): what the course is, without its curriculum.
 * Pages that show the curriculum add it, matching what the reader sees: `curriculum` on the home
 * page and the map, `moduleCourse` with its lessons on a module page. Lessons and worksheets add
 * their own node and point to their module or the course by `@id`.
 */
import type { Outline } from './course.ts';

type Module = Outline[number];

/** Who makes Earshot, as the footer credits her: the author and provider in structured data. */
export const maker = { '@type': 'Person', name: 'Mia', url: 'https://mia.cx' };

/** One line on the whole course: the home page's search description and the course's own. */
export const courseSummary = (lessons: number) =>
	`${lessons} short lessons on positioning, writing, launches, SEO and marketing with AI agents, grounded in research. One small task per lesson, free with no sign-up.`;

export const courseId = (origin: string) => `${origin}/#course`;
export const moduleId = (origin: string, module: Pick<Module, 'href'>) => `${origin}${module.href}#course`;

const CONTEXT = 'https://schema.org';
const duration = (minutes: number) => `PT${minutes}M`;
const minutesIn = (module: Module) => module.lessons.reduce((n, l) => n + l.minutes, 0);

const free = {
	isAccessibleForFree: true,
	inLanguage: 'en',
	offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', category: 'Free' }
};

/** What the course is: its outcome, audience, cost and workload. */
export const course = (origin: string, outline: Outline) => ({
	'@context': CONTEXT,
	'@type': 'Course',
	'@id': courseId(origin),
	name: 'Earshot',
	description: courseSummary(outline.flatMap((m) => m.lessons).length),
	url: `${origin}/`,
	provider: maker,
	author: maker,
	educationalLevel: 'Beginner',
	audience: { '@type': 'Audience', audienceType: 'Builders with ADHD' },
	teaches: outline.map((m) => m.title),
	...free,
	hasCourseInstance: {
		'@type': 'CourseInstance',
		courseMode: 'Online',
		courseWorkload: duration(outline.reduce((n, m) => n + minutesIn(m), 0))
	}
});

/**
 * A module as a course of its own, part of Earshot. `lessons` matches what the page shows of each
 * lesson: its title alone (home, map) or its details too, summary and minutes (the module page).
 */
export const moduleCourse = (origin: string, module: Module, lessons: 'titles' | 'details') => ({
	'@type': 'Course',
	'@id': moduleId(origin, module),
	name: module.title,
	description: module.summary,
	url: `${origin}${module.href}`,
	provider: maker,
	timeRequired: duration(minutesIn(module)),
	...free,
	isPartOf: { '@id': courseId(origin) },
	hasPart: module.lessons.map((l) => ({
		'@type': 'LearningResource',
		'@id': `${origin}${l.href}`,
		name: l.title,
		url: `${origin}${l.href}`,
		learningResourceType: 'Lesson',
		...(lessons === 'details' && { description: l.summary, timeRequired: duration(l.minutes) })
	}))
});

/** Every module and its lessons, for the pages that show them all (home and the map). */
export const curriculum = (origin: string, outline: Outline) => ({
	'@context': CONTEXT,
	'@id': courseId(origin),
	syllabusSections: outline.map((m) => ({
		'@type': 'Syllabus',
		name: m.title,
		description: m.summary,
		timeRequired: duration(minutesIn(m))
	})),
	hasPart: outline.map((m) => moduleCourse(origin, m, 'titles'))
});
