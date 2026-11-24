/**
 * Lists the pages a deploy changes, one URL per line, for the deploy workflow to send to IndexNow.
 * Run it after `pnpm build` and before `wrangler deploy`, while the site still serves the old pages:
 *
 *   node scripts/indexnow.ts https://seo.mia.cx
 *
 * A page counts as changed when its built HTML differs from the live page once scripts, styles and
 * asset links are stripped, since those change with every build and Cloudflare injects its own. A
 * page new to the sitemap counts, and so does one the sitemap drops, so search engines see it gone.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';

const BUILD = '.svelte-kit/cloudflare';
/** Scripts, styles and links to built assets; canonical and alternate links stay in the comparison. */
const VOLATILE =
	'script:not([type="application/ld+json"]), style, noscript, link[rel~="modulepreload"], link[rel~="preload"], link[rel~="stylesheet"]';

const locs = (sitemap: string) => Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, loc]) => loc);

/** The page as a search engine reads it: markup, text and structured data, without build artifacts. */
export const content = (html: string) => {
	const { document } = parseHTML(html);
	for (const node of document.querySelectorAll(VOLATILE)) node.remove();
	return document.documentElement.outerHTML.replace(/>\s+</g, '><').replace(/\s+/g, ' ');
};

/**
 * The URLs to send: pages the new sitemap adds, pages on both whose content `changed`, and pages
 * it drops. A page it adds goes even when it already serves the same HTML, since search engines
 * may not have found it yet.
 */
export const toSubmit = async (built: string[], listed: string[], changed: (url: string) => Promise<boolean>) => {
	const kept = built.filter((url) => listed.includes(url));
	const flags = await Promise.all(kept.map(changed));
	return [
		...built.filter((url) => !listed.includes(url)),
		...kept.filter((_, i) => flags[i]),
		...listed.filter((url) => !built.includes(url))
	];
};

const main = async () => {
	const [site] = process.argv.slice(2);
	if (!site) throw new Error('Usage: node scripts/indexnow.ts <site origin>');
	const { origin } = new URL(site);

	/** The live page on this site, or undefined when it isn't there; any other failure throws. */
	const live = async (url: string) => {
		const { href, origin: host } = new URL(url);
		if (host !== origin) throw new Error(`${url} is not on ${origin}`);
		const response = await fetch(href, { redirect: 'manual' });
		if (response.status === 404) return undefined;
		if (!response.ok) throw new Error(`${href}: ${response.status}`);
		return response.text();
	};
	const built = (url: string) => {
		const { pathname } = new URL(url);
		return readFile(join(BUILD, pathname === '/' ? 'index.html' : `${pathname}.html`), 'utf8');
	};
	const changed = async (url: string) => {
		const [before, after] = await Promise.all([live(url), built(url)]);
		return before === undefined || content(before) !== content(after);
	};

	const pages = locs(await readFile(join(BUILD, 'sitemap.xml'), 'utf8'));
	const listed = locs((await live(`${origin}/sitemap.xml`)) ?? '');
	for (const url of await toSubmit(pages, listed, changed)) console.log(url);
};

if (import.meta.main) await main();
