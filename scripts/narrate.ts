/**
 * Voices lessons in Mia's cloned voice, into the earshot-narration R2 bucket the lesson pages play
 * from (`src/routes/narration/[...key]/+server.ts`). Reads the prerendered lessons, so build first.
 *
 *   pnpm narrate --dry-run                        what it would voice, and what that costs
 *   pnpm narrate --only foundations/positioning   voice one lesson (repeatable)
 *   pnpm narrate                                  keep every narrated lesson current
 *   pnpm narrate --all --budget 180000            voice the whole course
 *
 * Each section (its headings, paragraphs and list items; see `src/lib/narration.ts`) is recorded in
 * one request, with word timestamps, so it plays with no seams, and stored under a hash of its text,
 * voice and model: editing a paragraph pays for its section only. Nothing is generated when a run
 * would spend more than its budget (25,000 characters by default) or more than the ElevenLabs
 * account has left.
 *
 * Bucket layout:
 *   sections/<key>.mp3, sections/<key>.json   a section's audio and word timings
 *   lessons/<module>/<lesson>.json            a lesson's narration (LessonNarration)
 *   index.json                                what the bucket holds, so a run needn't list it
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
import { type LessonNarration, lessonSections, NARRATION_FORMAT, sectionKey, sectionText } from '#lib/narration.ts';

const BUCKET = 'earshot-narration';
/** The prerendered site, and where generated audio is kept between runs. */
const SITE = '.svelte-kit/cloudflare';
const CACHE = '.narration';
const DEFAULT_BUDGET = 25_000;
/** The most characters ElevenLabs reads in one request; a longer section would need splitting. */
const MAX_SECTION = 5_000;
/** Sections generated at once; ElevenLabs plans allow a few concurrent requests. */
const CONCURRENCY = 3;
/** Saves the index after this many sections, so a failed run keeps what it paid for. */
const SAVE_EVERY = 12;

/** One voiced section of a lesson: its text, and where each of its words starts and how long it is. */
export type Section = { key: string; text: string; offsets: number[]; lengths: number[] };
export type Lesson = { id: string; sections: Section[] };
/** What the bucket holds: every recorded section key, and each narrated lesson's keys. */
export type Index = { sections: string[]; lessons: Record<string, string[]> };

/** The voiced sections of one prerendered lesson page, in reading order, or none for any other page. */
export const readLesson = async (html: string, voice: string, model: string): Promise<Section[]> => {
	const { document } = parseHTML(html);
	// linkedom splits text at every entity (`buyer&#39;s` is three text nodes), where a browser keeps one
	// node, and the marker counts words per text node: merge them, so both count the same words.
	document.documentElement.normalize();
	return Promise.all(
		lessonSections(document).map(async (blocks) => {
			const spoken = sectionText(blocks);
			return { key: await sectionKey(spoken, voice, model), ...spoken };
		})
	);
};

/**
 * What a run does: the lessons it voices (those named, every one with `all`, else those already
 * narrated), the sections it must record, once each, and what they cost in characters.
 */
export const plan = (lessons: Lesson[], index: Index, scope: { only: string[]; all: boolean }) => {
	const unknown = scope.only.filter((id) => !lessons.some((l) => l.id === id));
	if (unknown.length) throw new Error(`No lesson ${unknown.join(', ')}. Name lessons as <module>/<lesson>.`);
	const voiced = lessons.filter((l) => scope.all || scope.only.includes(l.id) || l.id in index.lessons);
	const have = new Set(index.sections);
	const missing = new Map<string, Section>();
	for (const section of voiced.flatMap((l) => l.sections))
		if (!have.has(section.key)) missing.set(section.key, section);
	const generate = [...missing.values()];
	const long = generate.find((section) => section.text.length > MAX_SECTION);
	if (long)
		throw new Error(
			`A section is ${long.text.length} characters, over the ${MAX_SECTION} ElevenLabs reads at once: "${long.text.slice(0, 60)}…"`
		);
	return { voiced, generate, characters: generate.reduce((sum, section) => sum + section.text.length, 0) };
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
/** Fetches an object into `file`; false only when it doesn't exist, so a failed read stops the run. */
const download = async (key: string, file: string) => {
	try {
		await wrangler('r2', 'object', 'get', `${BUCKET}/${key}`, '--file', file);
		return true;
	} catch (error) {
		if (String((error as { stderr?: unknown }).stderr).includes('The specified key does not exist')) return false;
		throw error;
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

/**
 * Each word's start and end in seconds, flat as `[start0, end0, …]`, from ElevenLabs' per-character
 * times. Those count code points, while a section's offsets and lengths count UTF-16 units, so an
 * emoji or other astral character is one entry there and two here: map every unit to its code point.
 */
export const wordTimings = (
	section: Pick<Section, 'text' | 'offsets' | 'lengths'>,
	starts: number[],
	ends: number[]
) => {
	const codePoint: number[] = [];
	for (const [i, char] of Array.from(section.text).entries()) codePoint.push(...Array(char.length).fill(i));
	return section.offsets.flatMap((first, i) => [
		ms(starts[codePoint[first]]),
		ms(ends[codePoint[first + section.lengths[i] - 1]])
	]);
};

/** Records one section's audio and its words' start and end times, into the cache. */
const generate = async (section: Section, env: { key: string; voice: string; model: string }) => {
	const response = await fetch(
		`https://api.elevenlabs.io/v1/text-to-speech/${env.voice}/with-timestamps?output_format=${NARRATION_FORMAT}`,
		{
			method: 'POST',
			headers: { 'xi-api-key': env.key, 'content-type': 'application/json' },
			body: JSON.stringify({ text: section.text, model_id: env.model })
		}
	);
	if (!response.ok) throw new Error(`ElevenLabs answered ${response.status}: ${await response.text()}`);
	const { audio_base64, alignment } = (await response.json()) as {
		audio_base64: string;
		alignment: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
	};
	// Timings index into the text as sent; an alignment of other text would misplace every word.
	if (alignment.characters.join('') !== section.text)
		throw new Error(`ElevenLabs aligned different text than it was sent for section ${section.key}.`);
	const timings = wordTimings(section, alignment.character_start_times_seconds, alignment.character_end_times_seconds);
	await writeFile(join(CACHE, `${section.key}.mp3`), Buffer.from(audio_base64, 'base64'));
	await writeFile(join(CACHE, `${section.key}.json`), JSON.stringify(timings));
};

/** A section's timings, from the cache or the bucket. */
const timingsOf = async (key: string) => {
	const file = join(CACHE, `${key}.json`);
	if (!existsSync(file) && !(await download(`sections/${key}.json`, file)))
		throw new Error(`sections/${key}.json is in index.json but not in the bucket`);
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
		const sections = await readLesson(await readFile(file, 'utf8'), voice, model);
		if (sections.length) lessons.push({ id: relative(SITE, file).replace(/\.html$/, ''), sections });
	}
	const indexFile = join(CACHE, 'index.json');
	const readIndex = async (): Promise<Index> => {
		const stored = (await download('index.json', indexFile)) ? await readJson<Partial<Index>>(indexFile) : {};
		return { sections: stored.sections ?? [], lessons: stored.lessons ?? {} };
	};
	const index = await readIndex();
	/** The lessons this run rewrote since its last save, whose entries in the index are this run's to set. */
	const rewritten = new Set<string>();
	const { voiced, generate: missing, characters } = plan(lessons, index, { only: values.only, all: values.all });

	console.log(`${lessons.length} lessons; voicing ${voiced.length}:`);
	for (const lesson of voiced) console.log(`  ${lesson.id}`);
	console.log(`${missing.length} sections to record: ${characters} characters (budget ${budget}).`);
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

	// Another run (CI, or someone's local one) may have saved since this one read the index: merge into
	// the latest copy, so neither run's sections or lessons go missing.
	const saveIndex = async () => {
		const latest = await readIndex();
		index.sections = [...new Set([...latest.sections, ...index.sections])];
		for (const [id, keys] of Object.entries(latest.lessons)) if (!rewritten.has(id)) index.lessons[id] = keys;
		await writeFile(indexFile, JSON.stringify(index));
		await upload('index.json', indexFile, 'application/json');
		// Saved: from here on, a later run's entry for these lessons is the newer one.
		rewritten.clear();
	};
	try {
		for (let i = 0; i < missing.length; i += CONCURRENCY) {
			// Settled, not raced: a failure still lets its batch finish, so the index records all it paid for.
			const results = await Promise.allSettled(
				missing.slice(i, i + CONCURRENCY).map(async (section) => {
					await generate(section, { key: key as string, voice, model });
					await upload(`sections/${section.key}.mp3`, join(CACHE, `${section.key}.mp3`), 'audio/mpeg');
					await upload(`sections/${section.key}.json`, join(CACHE, `${section.key}.json`), 'application/json');
					index.sections.push(section.key);
				})
			);
			const failed = results.find((r) => r.status === 'rejected');
			if (failed) throw failed.reason;
			const done = Math.min(i + CONCURRENCY, missing.length);
			console.log(`  recorded ${done}/${missing.length}`);
			if (done % SAVE_EVERY < CONCURRENCY) await saveIndex();
		}
	} finally {
		if (missing.length) await saveIndex();
	}

	// A lesson's file keeps the sections it had too, so a deploy still showing older text keeps its audio.
	for (const lesson of voiced) {
		const known = index.lessons[lesson.id] ?? [];
		const added = lesson.sections.filter((section) => !known.includes(section.key));
		if (!added.length) continue;
		const file = join(CACHE, 'lessons', `${lesson.id}.json`);
		await mkdir(join(file, '..'), { recursive: true });
		const before =
			known.length && (await download(`lessons/${lesson.id}.json`, file))
				? await readJson<Partial<LessonNarration>>(file)
				: undefined;
		const narration: LessonNarration = {
			voice,
			model,
			sections: before?.voice === voice && before.model === model ? (before.sections ?? {}) : {}
		};
		for (const section of added) narration.sections[section.key] = await timingsOf(section.key);
		await writeFile(file, JSON.stringify(narration));
		await upload(`lessons/${lesson.id}.json`, file, 'application/json');
		index.lessons[lesson.id] = Object.keys(narration.sections);
		rewritten.add(lesson.id);
		await saveIndex();
		console.log(`  narrated ${lesson.id}: ${added.length} new sections`);
	}
}

if (import.meta.main) await main();
