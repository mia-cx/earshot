import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, it } from 'vitest';

// Proves a fresh scrape updates the source without losing the hand transcription used by a lesson.
it.each([
	['## Image text', []],
	['## Image text of the quoted post', ['123']]
] as const)('preserves %s when refreshing sources', (heading, ids) => {
	const root = mkdtempSync(join(tmpdir(), 'earshot-scrape-'));
	try {
		mkdirSync(join(root, 'tools'));
		mkdirSync(join(root, 'sources'));
		const script = join(root, 'tools', 'scrape.mjs');
		copyFileSync('research/tools/scrape.mjs', script);
		writeFileSync(join(root, 'tools', 'links.txt'), 'later\ttest\t123\n');
		const source = join(root, 'sources', '123.md');
		const transcription = `\n---\n${heading} (transcribed by hand; the scraper keeps no image text)\n\nWords from the image.\n`;
		writeFileSync(source, `Old post\n${transcription}`);
		const stub = `globalThis.fetch = async () => ({
			ok: true,
			json: async () => ({ status: { author: { screen_name: 'test' }, text: 'Updated post' } })
		});`;

		execFileSync(process.execPath, ['--import', `data:text/javascript,${encodeURIComponent(stub)}`, script, ...ids]);

		expect(readFileSync(source, 'utf8')).toContain(`Updated post\n${transcription}`);
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});
