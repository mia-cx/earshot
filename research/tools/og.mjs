// Renders one share image per lesson from og.html with headless Chrome.
// Usage: node research/tools/og.mjs [lesson.md...]   (default: every lesson)
//        Writes static/og/<module>/<lesson>.png, the image the lesson page shares.
//        CHROME=<binary> picks the browser (default: google-chrome).
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chrome = process.env.CHROME ?? 'google-chrome';
const template = pathToFileURL(resolve('research/tools/og.html'));
const field = (file, key) =>
	readFileSync(file, 'utf8')
		.match(new RegExp(`^${key}: (.*)$`, 'm'))?.[1]
		.trim();

const modules = readdirSync('content', { withFileTypes: true })
	.filter((d) => d.isDirectory())
	.map((d) => ({
		slug: d.name,
		order: Number(field(`content/${d.name}/index.md`, 'order')),
		title: field(`content/${d.name}/index.md`, 'title')
	}))
	.sort((a, b) => a.order - b.order);

const args = process.argv.slice(2);
const files = args.length
	? args
	: modules.flatMap((m) =>
			readdirSync(`content/${m.slug}`)
				.filter((f) => f.endsWith('.md') && f !== 'index.md')
				.map((f) => `content/${m.slug}/${f}`)
		);

for (const file of files) {
	const slug = basename(dirname(file));
	const number = modules.findIndex((m) => m.slug === slug) + 1;
	const url = new URL(template);
	url.search = new URLSearchParams({
		kicker: `Earshot · Module ${number}: ${modules[number - 1].title}`,
		title: field(file, 'title'),
		module: String(number)
	}).toString();
	const out = `static/og/${slug}/${basename(file, '.md')}.png`;
	mkdirSync(dirname(out), { recursive: true });
	execFileSync(chrome, ['--headless', '--hide-scrollbars', '--window-size=1200,630', `--screenshot=${out}`, url.href], {
		stdio: 'ignore'
	});
	console.log(out);
}
