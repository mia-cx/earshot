/**
 * Schema.org structured data for the course, so search engines and AI crawlers read Earshot as a
 * course. Every page carries `course` (`Seo.svelte`): the whole course with its modules as courses
 * of their own and their lessons in order. Lessons and worksheets add their own node and point back
 * to it by `@id`; the home page adds `moduleList`, the course list Google shows as a carousel.
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

const duration = (minutes: number) => `PT${minutes}M`;
const minutesIn = (module: Module) => module.lessons.reduce((n, l) => n + l.minutes, 0);

const free = {
	isAccessibleForFree: true,
	inLanguage: 'en',
	offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', category: 'Free' }
};

/** A module as a course of its own, without its lessons. */
const moduleCourse = (origin: string, module: Module) => ({
	'@type': 'Course',
	'@id': moduleId(origin, module),
	name: module.title,
	description: module.summary,
	url: `${origin}${module.href}`,
	provider: maker,
	timeRequired: duration(minutesIn(module)),
	...free
});

/** The whole course: every module, each with its lessons. */
export const course = (origin: string, outline: Outline) => {
	const lessons = outline.flatMap((m) => m.lessons);
	return {
		'@context': 'https://schema.org',
		'@type': 'Course',
		'@id': courseId(origin),
		name: 'Earshot',
		description: courseSummary(lessons.length),
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
			courseWorkload: duration(lessons.reduce((n, l) => n + l.minutes, 0))
		},
		syllabusSections: outline.map((m) => ({
			'@type': 'Syllabus',
			name: m.title,
			description: m.summary,
			timeRequired: duration(minutesIn(m))
		})),
		hasPart: outline.map((m) => ({
			...moduleCourse(origin, m),
			isPartOf: { '@id': courseId(origin) },
			hasPart: m.lessons.map((l) => ({
				'@type': 'LearningResource',
				'@id': `${origin}${l.href}`,
				name: l.title,
				description: l.summary,
				url: `${origin}${l.href}`,
				learningResourceType: 'Lesson',
				timeRequired: duration(l.minutes)
			}))
		}))
	};
};

/** The modules as a list of courses from one provider: what Google shows as a course carousel. */
export const moduleList = (origin: string, outline: Outline) => ({
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: outline.map((m, i) => ({ '@type': 'ListItem', position: i + 1, item: moduleCourse(origin, m) }))
});
