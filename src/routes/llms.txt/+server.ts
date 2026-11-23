import { course } from '#lib/server/course.ts';
import { SKILLS_PATH, skills } from '#lib/server/skills.ts';

export const prerender = true;

/** The site for agents (llmstxt.org): what the course is, how to install its skills, and every lesson. */
export const GET = ({ url }) => {
	const at = (path: string) => new URL(path, url.origin).href;
	const first = course.modules[0].lessons[0];
	const body = [
		'# Earshot',
		'',
		`> A free marketing course for builders with ADHD: ${course.lessons.length} short lessons on positioning, writing, launches, SEO and marketing with AI agents, grounded in marketing research and official documentation and applied through free posts practitioners shared on X, with every source linked. Each lesson starts with the short version and ends with one task.`,
		'',
		'## Start here',
		'',
		`- [Course home](${at('/')}): what the course is and how a lesson works.`,
		`- [First lesson: ${first.title}](${at(first.markdownHref ?? first.href)}): ${first.summary}`,
		`- [Sources](${at('/sources')}): the research and posts behind the lessons.`,
		'',
		'## Agent skills',
		'',
		`The course's methods as agent skills. Install all of them with \`npx skills add ${url.origin}\`, or read any SKILL.md directly. Index: ${at(`${SKILLS_PATH}/index.json`)}`,
		'',
		...skills.map((s) => `- [${s.name}](${at(s.href)}): ${s.description}`),
		'',
		...course.modules.flatMap((m) => [
			`## ${m.number}. ${m.title}`,
			'',
			// Each lesson links its Markdown copy, which Svartz writes beside the page.
			...m.lessons.map((l) => `- [${l.title}](${at(l.markdownHref ?? l.href)}): ${l.summary}`),
			''
		])
	].join('\n');
	return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
