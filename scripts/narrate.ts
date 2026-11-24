/**
 * Voices lessons in Mia's cloned voice, into the earshot-narration R2 bucket the lesson pages play
 * from (`src/routes/narration/[...key]/+server.ts`). Reads the prerendered lessons, so build first.
 *
 *   pnpm narrate --dry-run                        what it would voice, and what that costs
 *   pnpm narrate --only foundations/positioning   voice one lesson (repeatable)
 *   pnpm narrate                                  keep every narrated lesson current
 *   pnpm narrate --all --budget 180000            voice the whole course
 *
 * Each block (a heading, paragraph or list item; see `src/lib/narration.ts`) is generated once, with
 * word timestamps, and stored under a hash of its text, voice and model: editing one paragraph pays
 * for that paragraph only. Nothing is generated when a run would spend more than its budget (25,000
 * characters by default) or more than the ElevenLabs account has left.
 *
 * Bucket layout:
 *   blocks/<key>.mp3, blocks/<key>.json   a block's audio and word timings
 *   lessons/<module>/<lesson>.json        a lesson's narration (LessonNarration)
 *   index.json                            what the bucket holds, so a run needn't list it
 *
 * Needs ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID (ELEVENLABS_MODEL_ID defaults to eleven_v4), from
 * the environment or .env, and R2 access through wrangler: its login locally, CLOUDFLARE_API_TOKEN
 * in CI.
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parseArgs, promisify } from 'node:util';
import { parseHTML } from 'linkedom';
import {
	blockKey,
	blockWords,
	type LessonNarration,
	NARRATION_FORMAT,
	narratedSections,
	spokenText
} from '#lib/narration.ts';

const BUCKET = 'earshot-narration';
/** The prerendered site, and where generated audio is kept between runs. */
const SITE = '.svelte-kit/cloudflare';
const CACHE = '.narration';
const DEFAULT_BUDGET = 25_000;
/** Blocks generated at once; ElevenLabs plans allow a few concurrent requests. */
const CONCURRENCY = 3;
/** Saves the index after this many blocks, so a failed run keeps what it paid for. */
const SAVE_EVERY = 12;

/** One voiced block of a lesson. */
export type Block = { key: string; text: string; offsets: number[]; lengths: number[] };
export type Lesson = { id: string; blocks: Block[] };
/** What the bucket holds: every generated block key, and each narrated lesson's keys. */
export type Index = { blocks: string[]; lessons: Record<string, string[]> };

/** The voiced blocks of one prerendered lesson page, in reading order, or none for any other page. */
export const readLesson = async (html: string, voice: string, model: string): Promise<Block[]> => {
	const { document } = parseHTML(html);
	const body = document.querySelector('[data-narration]');
	if (!body) return [];
	return Promise.all(
		narratedSections(body)
			.flat()
			.map(async (el) => {
				const words = blockWords(el);
				const { text, offsets } = spokenText(words);
				return { key: await blockKey(text, voice, model), text, offsets, lengths: words.map((w) => w.text.length) };
			})
	);
};

/**
 * What a run does: the lessons it voices (those named, every one with `all`, else those already
 * narrated), the blocks it must generate, once each, and what they cost in characters.
 */
export const plan = (lessons: Lesson[], index: Index, scope: { only: string[]; all: boolean }) => {
	const unknown = scope.only.filter((id) => !lessons.some((l) => l.id === id));
	if (unknown.length) throw new Error(`No lesson ${unknown.join(', ')}. Name lessons as <module>/<lesson>.`);
	const voiced = lessons.filter((l) => scope.all || scope.only.includes(l.id) || l.id in index.lessons);
	const have = new Set(index.blocks);
	const missing = new Map<string, Block>();
	for (const block of voiced.flatMap((l) => l.blocks)) if (!have.has(block.key)) missing.set(block.key, block);
	const generate = [...missing.values()];
	return { voiced, generate, characters: generate.reduce((sum, block) => sum + block.text.length, 0) };
};

/** Refuses a run that would spend more characters than its budget or than the account has left. */
export const checkSpend = (characters: number, budget: number, remaining: number) => {
	if (characters > budget)
		throw new Error(
			`This run needs ${characters} characters, over its budget of ${budget}. Rerun with --budget ${characters} to allow it.`
		);
	if (characters > remaining)
		throw new Error(`This run needs ${characters} characters; the ElevenLabs account has ${remaining} left.`);
};

const run = promisify(execFile);
const wrangler = (...command: string[]) =>
	run('node_modules/.bin/wrangler', [...command, '--remote'], { maxBuffer: 1 << 26 });
const upload = (key: string, file: string, type: string) =>
	wrangler('r2', 'object', 'put', `${BUCKET}/${key}`, '--file', file, '--content-type', type);
const download = async (key: string, file: string) => {
	try {
		await wrangler('r2', 'object', 'get', `${BUCKET}/${key}`, '--file', file);
		return true;
	} catch {
		return false;
	}
};
const readJson = async <T>(file: string): Promise<T> => JSON.parse(await readFile(file, 'utf8'));

async function* lessonPages(dir: string): AsyncGenerator<string> {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* lessonPages(path);
		else if (/^[^/]+\/[^/]+\.html$/.test(relative(SITE, path))) yield path;
	}
}

const ms = (seconds: number) => Math.round(seconds * 1000) / 1000;

/** Generates one block's audio and its words' start and end times, into the cache. */
const generate = async (block: Block, env: { key: string; voice: string; model: string }) => {
	const response = await fetch(
		`https://api.elevenlabs.io/v1/text-to-speech/${env.voice}/with-timestamps?output_format=${NARRATION_FORMAT}`,
		{
			method: 'POST',
			headers: { 'xi-api-key': env.key, 'content-type': 'application/json' },
			body: JSON.stringify({ text: block.text, model_id: env.model })
		}
	);
	if (!response.ok) throw new Error(`ElevenLabs answered ${response.status}: ${await response.text()}`);
	const { audio_base64, alignment } = (await response.json()) as {
		audio_base64: string;
		alignment: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
	};
	// Timings index into the text as sent; an alignment of other text would misplace every word.
	if (alignment.characters.join('') !== block.text)
		throw new Error(`ElevenLabs aligned different text than it was sent for block ${block.key}.`);
	const timings = block.offsets.flatMap((first, i) => [
		ms(alignment.character_start_times_seconds[first]),
		ms(alignment.character_end_times_seconds[first + block.lengths[i] - 1])
	]);
	await writeFile(join(CACHE, `${block.key}.mp3`), Buffer.from(audio_base64, 'base64'));
	await writeFile(join(CACHE, `${block.key}.json`), JSON.stringify(timings));
};

/** A block's timings, from the cache or the bucket. */
const timingsOf = async (key: string) => {
	const file = join(CACHE, `${key}.json`);
	if (!existsSync(file) && !(await download(`blocks/${key}.json`, file)))
		throw new Error(`blocks/${key}.json is in index.json but not in the bucket`);
	return readJson<number[]>(file);
};

async function main() {
	const { values } = parseArgs({
		options: {
			'dry-run': { type: 'boolean', default: false },
			only: { type: 'string', multiple: true, default: [] },
			all: { type: 'boolean', default: false },
			budget: { type: 'string', default: String(DEFAULT_BUDGET) }
		}
	});
	const budget = Number(values.budget);
	const key = process.env.ELEVENLABS_API_KEY;
	const voice = process.env.ELEVENLABS_VOICE_ID;
	const model = process.env.ELEVENLABS_MODEL_ID || 'eleven_v4';
	if (!voice) throw new Error('Set ELEVENLABS_VOICE_ID, in the environment or .env.');
	if (!Number.isFinite(budget)) throw new Error(`--budget takes a number of characters, not ${values.budget}.`);
	if (!existsSync(SITE)) throw new Error(`No built site at ${SITE}: run pnpm build first.`);
	await mkdir(CACHE, { recursive: true });

	const lessons: Lesson[] = [];
	for await (const file of lessonPages(SITE)) {
		const blocks = await readLesson(await readFile(file, 'utf8'), voice, model);
		if (blocks.length) lessons.push({ id: relative(SITE, file).replace(/\.html$/, ''), blocks });
	}
	const indexFile = join(CACHE, 'index.json');
	const index: Index = (await download('index.json', indexFile))
		? await readJson(indexFile)
		: { blocks: [], lessons: {} };
	const { voiced, generate: missing, characters } = plan(lessons, index, { only: values.only, all: values.all });

	console.log(`${lessons.length} lessons; voicing ${voiced.length}:`);
	for (const lesson of voiced) console.log(`  ${lesson.id}`);
	console.log(`${missing.length} blocks to generate: ${characters} characters (budget ${budget}).`);
	if (values['dry-run']) return;

	if (characters) {
		if (!key) throw new Error('Set ELEVENLABS_API_KEY, in the environment or .env.');
		const subscription = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
			headers: { 'xi-api-key': key }
		});
		if (!subscription.ok) throw new Error(`Couldn't read the ElevenLabs balance: ${subscription.status}`);
		const { character_count, character_limit } = (await subscription.json()) as Record<string, number>;
		checkSpend(characters, budget, character_limit - character_count);
	}

	const saveIndex = async () => {
		await writeFile(indexFile, JSON.stringify(index));
		await upload('index.json', indexFile, 'application/json');
	};
	try {
		for (let i = 0; i < missing.length; i += CONCURRENCY) {
			// Settled, not raced: a failure still lets its batch finish, so the index records all it paid for.
			const results = await Promise.allSettled(
				missing.slice(i, i + CONCURRENCY).map(async (block) => {
					await generate(block, { key: key as string, voice, model });
					await upload(`blocks/${block.key}.mp3`, join(CACHE, `${block.key}.mp3`), 'audio/mpeg');
					await upload(`blocks/${block.key}.json`, join(CACHE, `${block.key}.json`), 'application/json');
					index.blocks.push(block.key);
				})
			);
			const failed = results.find((r) => r.status === 'rejected');
			if (failed) throw failed.reason;
			const done = Math.min(i + CONCURRENCY, missing.length);
			console.log(`  generated ${done}/${missing.length}`);
			if (done % SAVE_EVERY < CONCURRENCY) await saveIndex();
		}
	} finally {
		if (missing.length) await saveIndex();
	}

	// A lesson's file keeps the blocks it had too, so a deploy still showing older text keeps its audio.
	for (const lesson of voiced) {
		const known = index.lessons[lesson.id] ?? [];
		const added = lesson.blocks.filter((block) => !known.includes(block.key));
		if (!added.length) continue;
		const file = join(CACHE, 'lessons', `${lesson.id}.json`);
		await mkdir(join(file, '..'), { recursive: true });
		const before =
			known.length && (await download(`lessons/${lesson.id}.json`, file))
				? await readJson<LessonNarration>(file)
				: undefined;
		const narration: LessonNarration = {
			voice,
			model,
			blocks: before?.voice === voice && before.model === model ? before.blocks : {}
		};
		for (const block of added) narration.blocks[block.key] = await timingsOf(block.key);
		await writeFile(file, JSON.stringify(narration));
		await upload(`lessons/${lesson.id}.json`, file, 'application/json');
		index.lessons[lesson.id] = Object.keys(narration.blocks);
		await saveIndex();
		console.log(`  narrated ${lesson.id}: ${added.length} new blocks`);
	}
}

if (import.meta.main) await main();
