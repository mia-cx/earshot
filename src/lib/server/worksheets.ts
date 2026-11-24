/**
 * Worksheets for one goal, linked from the landing page: each gathers questions the lessons already
 * ask, so an answer given here shows in the lesson and the other way round, and turns the answers
 * into a prompt that hands them to one of the course's agent skills.
 */
import type { Question } from '#lib/course.ts';
import { course } from './course.ts';
import { skills } from './skills.ts';

type Definition = {
	slug: string;
	title: string;
	summary: string;
	skill: string;
	/** Finishes "Use the <skill> skill to …" in the prompt. */
	task: string;
	/** Sheet ids (a form's slugged title, for all its questions) or question ids, in order. */
	ask: string[];
};

const DEFINITIONS: Definition[] = [
	{
		slug: 'positioning',
		title: 'Your positioning',
		summary: 'What you sell, who it’s for, and why they’d pick you over what they use now.',
		skill: 'gtm-foundations',
		task: 'write my positioning: one sentence on what we do and for whom, the category we compete in, the alternatives buyers weigh us against, and the differences that matter most to them.',
		ask: ['your-positioning-doc']
	},
	{
		slug: 'audience',
		title: 'Your audience',
		summary: 'The one person you’re for, the problem in their words, and what they’ve already tried.',
		skill: 'gtm-foundations',
		task: 'turn this into a profile of my ideal customer: who they are, the problem in their own words, what they’ve tried, and what would make them switch. Mark every part you’re guessing.',
		ask: [
			'who-you-help-describe-one-real-person-what-does-a-bad-day-look-like-for-them-what-do-they-say-when-they-complain-to-a-friend-exact-words-what-have-they-already-tried-that-didn-t-work',
			'your-reader'
		]
	},
	{
		slug: 'where-to-find-them',
		title: 'Where to find them',
		summary: 'The places your buyers talk about the problem, and the signs one needs you now.',
		skill: 'gtm-outreach',
		task: 'find where these people talk about this problem: the communities, platforms and accounts, with links to real posts from the last month, ranked by how often the problem comes up.',
		ask: [
			'where-do-they-read-are-they-even-on-x',
			'which-one-platform-do-the-people-you-want-to-reach-spend-time-on',
			'your-market-table'
		]
	},
	{
		slug: 'go-to-market-plan',
		title: 'Your go-to-market plan',
		summary: 'Your promise, your audience, the next three months, and the numbers that show it’s working.',
		skill: 'gtm-foundations',
		task: 'fit my go-to-market plan on one page: the promise, the audience, how we grow over the next three months, the projects that get us there, and the outcome and input we track.',
		ask: ['your-one-page-strategy', 'which-ring-is-the-weakest']
	},
	{
		slug: 'content-plan',
		title: 'Your content plan',
		summary: 'Three themes you’ll own and the topics under them, in a voice that sounds like you.',
		skill: 'gtm-organic',
		task: 'plan my content: three pillars, five topics under each, and my first ten posts, each answering a question my audience already asks.',
		ask: ['your-content-map', 'your-voice-card']
	},
	{
		slug: 'launch',
		title: 'Your launch',
		summary: 'The story behind the launch: what your market loves, what it hates, and what you stand against.',
		skill: 'gtm-launch',
		task: 'plan my launch: the story, the demo, who shares it and where it’s listed, and the conversation after.',
		ask: ['your-clarity-doc', 'your-launch-narrative']
	},
	{
		slug: 'pages-that-sell',
		title: 'Pages that sell',
		summary: 'The pricing, comparison and alternative pages buyers search for right before they choose.',
		skill: 'seo-content',
		task: 'plan the purchase pages my site is missing, starting with the first one: the search it answers, its headline and outline, and the pages that should link to it.',
		ask: ['your-purchase-pages']
	},
	{
		slug: 'retention',
		title: 'Keep your users',
		summary: 'The moment a user gets value, how often they come back, and why the rest leave.',
		skill: 'gtm-retention',
		task: 'set up my retention: check the onboarded event, the messages that get new users there, and the check-ins for users who drift away.',
		ask: ['your-retention-plan']
	},
	{
		slug: 'first-marketing-agent',
		title: 'Your first marketing agent',
		summary: 'One weekly task you do by hand, written down step by step so an agent can take it over.',
		skill: 'marketing-agents-first-agent',
		task: 'turn the task I picked into a scheduled agent: its steps, what it reads, what it may change, and what it sends me to approve.',
		ask: ['your-first-bot-s-job', 'your-first-agent-brief']
	}
];

const forms = course.lessons.flatMap((l) => l.blocks.flatMap((b) => (b.kind === 'form' ? [b.form] : [])));
const questions = new Map(forms.flatMap((f) => f.sheet.map((q) => [q.id, q] as const)));

/** A sheet's questions, or the one question with that id; the build fails on an id the course lacks. */
const resolve = (id: string): Question[] => {
	const sheet = forms.find((f) => f.id === id)?.sheet;
	const question = questions.get(id);
	if (sheet) return sheet;
	if (question) return [question];
	throw new Error(`Worksheet asks for "${id}", which no lesson's form has`);
};

export const worksheets = DEFINITIONS.map(({ skill: name, ask, ...worksheet }) => {
	const skill = skills.find((s) => s.name === name);
	if (!skill) throw new Error(`Worksheet ${worksheet.slug} uses skill ${name}, which the site doesn't serve`);
	const asked = ask.flatMap(resolve);
	return {
		...worksheet,
		href: `/worksheets/${worksheet.slug}`,
		skill,
		questions: asked.filter((q, i) => asked.findIndex((other) => other.id === q.id) === i)
	};
});

export type Worksheet = (typeof worksheets)[number];
