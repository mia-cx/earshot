import { expect, it } from 'vitest';
import { content } from './indexnow.ts';

const page = (head: string, body: string) => `<html><head>${head}</head><body>${body}</body></html>`;
const deployed = page(
	'<title>Positioning</title><link href="/_app/immutable/entry/app.DYq1zc10.js" rel="modulepreload"><style>a{color:red}</style><script type="module" src="https://seo.mia.cx/.webmcp/bridge.js"></script>',
	'<h1>Positioning</h1><p>Context makes value obvious.</p><script>kit.init({ version: "1795491467101" })</script>'
);

it('ignores what changes with every build or deploy', () => {
	const rebuilt = page(
		'<title>Positioning</title><link href="/_app/immutable/entry/app.BAo974wc.js" rel="modulepreload"><style>a{color:blue}</style>',
		'<h1>Positioning</h1>\n\t<p>Context makes value obvious.</p><script>kit.init({ version: "1795549946879" })</script>'
	);
	expect(content(rebuilt)).toBe(content(deployed));
});

it('sees a change to the text, the title or the structured data', () => {
	const edited = [
		deployed.replace('value obvious', 'value plain'),
		deployed.replace('<title>Positioning', '<title>Positioning, revised'),
		deployed.replace('</head>', '<script type="application/ld+json">{"@type":"Article"}</script></head>')
	];
	for (const html of edited) expect(content(html)).not.toBe(content(deployed));
});
