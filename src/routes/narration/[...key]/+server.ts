import { env } from 'cloudflare:workers';
import { error } from '@sveltejs/kit';

// Read from R2 per request, in every environment, `pnpm dev` included (see wrangler.jsonc).
export const prerender = false;

/**
 * Lesson narration from the earshot-narration bucket (written by `scripts/narrate.ts`): a lesson's
 * word timings at `lessons/<module>/<lesson>.json`, and each block's audio (a heading, paragraph or
 * list item) at `blocks/<hash>.mp3`. Audio never changes behind its hash, so it is cached for good; a lesson's
 * file changes when it is voiced again, so it is revalidated. Audio answers byte ranges, for seeking.
 */
const SERVED = /^(?:blocks\/[0-9a-f]{64}\.mp3|lessons\/[a-z0-9-]+\/[a-z0-9-]+\.json)$/;

export const GET = async ({ params, request }) => {
	if (!SERVED.test(params.key)) error(404, 'No such narration');
	const object = await env.NARRATION.get(params.key, { range: request.headers, onlyIf: request.headers });
	if (!object) error(404, 'No such narration');

	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set('etag', object.httpEtag);
	headers.set(
		'cache-control',
		params.key.startsWith('blocks/') ? 'public, max-age=31536000, immutable' : 'public, no-cache'
	);
	headers.set('accept-ranges', 'bytes');
	if (!object.body) return new Response(null, { status: 304, headers });

	const range = object.range;
	if (!request.headers.has('range') || !range) return new Response(object.body, { headers });
	const offset = range.suffix !== undefined ? object.size - range.suffix : (range.offset ?? 0);
	const length = range.suffix ?? range.length ?? object.size - offset;
	headers.set('content-range', `bytes ${offset}-${offset + length - 1}/${object.size}`);
	headers.set('content-length', String(length));
	return new Response(object.body, { status: 206, headers });
};
