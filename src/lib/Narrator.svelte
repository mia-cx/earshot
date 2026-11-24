<script lang="ts">
	import type { MarkerElement, MarkerSeekEvent } from '@mia-cx/marker';
	import { mount, unmount, untrack } from 'svelte';
	import ListenButton from './ListenButton.svelte';
	import {
		blockWords,
		type LessonNarration,
		narratedSections,
		sectionKey,
		sectionText,
		TLDR,
		wordAt
	} from './narration.ts';
	import { volume } from './volume.svelte.ts';

	/** A jump to a word starts this many seconds early, so its first sound isn't cut off. */
	const PREROLL = 0.3;
	/** Every start fades in over this many seconds, so it never clicks in mid-sound. */
	const FADE_IN = 0.25;

	/**
	 * Reads a lesson aloud in Mia's voice (`scripts/narrate.ts`). Each section with audio (see
	 * `narration.ts`) is one recording, with one button in the left gutter beside its heading that
	 * reads the section and stops; narrower pages get one Listen button that reads the section on
	 * screen. The marker highlights the spoken word, and clicking a word seeks there; selecting text pauses.
	 */
	let { lesson, body }: { lesson: string; body: MarkerElement | undefined } = $props();

	type Voiced = {
		key: string;
		blocks: Element[];
		/** Where the section's button goes: its first block, or the TL;DR box it's read from. */
		opener: Element;
		/** How many words each block reads, so a word in the recording maps to its block. */
		counts: number[];
		/** Every word's start and end in the recording, flat as `[start0, end0, …]`. */
		timings: number[];
	};

	let audio = $state<HTMLAudioElement>();
	let sections = $state.raw<Voiced[]>([]);
	/** The section loaded in the player, or -1. */
	let current = $state(-1);
	let playing = $state(false);
	/** The marker word last shown, so a frame that changes nothing writes nothing. */
	let shown = -1;

	/** The lesson's sections that have audio in the stored voice, in reading order. */
	const load = async (id: string, root: Element): Promise<Voiced[]> => {
		const response = await fetch(`/narration/lessons/${id}.json`);
		if (!response.ok) return [];
		const narration: LessonNarration = await response.json();
		if (!narration.sections) return [];
		const found = await Promise.all(
			narratedSections(root).map(async (blocks) => {
				const key = await sectionKey(sectionText(blocks).text, narration.voice, narration.model);
				const timings = narration.sections[key];
				if (!timings) return [];
				const opener = blocks[0].closest(TLDR) ?? blocks[0];
				return [{ key, blocks, opener, counts: blocks.map((el) => blockWords(el).length), timings }];
			})
		);
		return found.flat();
	};

	$effect(() => {
		const root = body;
		if (!root) return;
		volume.restore();
		let live = true;
		load(lesson, root).then((found) => {
			if (live) sections = found;
		});
		return () => {
			live = false;
			audio?.pause();
			sections = [];
			current = -1;
			show(-1);
		};
	});

	/** Each section's height in px, from its opener's top to the bottom of whichever ends lower, it or the last block. */
	let spans = $state.raw<number[]>([]);
	$effect(() => {
		const root = body;
		const voiced = sections;
		if (!root || !voiced.length) return;
		const observer = new ResizeObserver(() => {
			spans = voiced.map(({ blocks, opener }) => {
				const box = opener.getBoundingClientRect();
				return Math.max(box.bottom, (blocks.at(-1) as Element).getBoundingClientRect().bottom) - box.top;
			});
		});
		observer.observe(root);
		return () => observer.disconnect();
	});

	// Each section's button goes inside its opener, on a rail as tall as the section, so it sticks within it.
	$effect(() => {
		const voiced = sections;
		const buttons = untrack(() =>
			voiced.map((section, i) =>
				mount(ListenButton, {
					target: section.opener,
					// In a heading or paragraph the button comes first; a TL;DR box spaces its children, so it goes last.
					anchor: section.opener === section.blocks[0] ? (section.opener.firstChild ?? undefined) : undefined,
					props: {
						get playing() {
							return playing && current === i;
						},
						get span() {
							return spans[i] ?? 0;
						},
						onclick: () => (playing && current === i ? audio?.pause() : resume(i))
					}
				})
			)
		);
		return () => {
			for (const button of buttons) unmount(button);
		};
	});

	const show = (word: number) => {
		if (!body || word === shown) return;
		shown = word;
		body.word = word;
	};

	/** The marker's index for word `w` of section `s`'s recording. */
	const markerWord = (s: number, w: number) => {
		const { blocks, counts } = sections[s];
		let b = 0;
		while (b < counts.length - 1 && w >= counts[b]) w -= counts[b++];
		return (body as MarkerElement).wordIndexOf(blocks[b]) + w;
	};

	/*
	 * The audio clock runs ahead of what the reader hears by the output's latency (large on Bluetooth
	 * headphones), so the highlight trails the clock by that much. An AudioContext reports it; it runs
	 * only while the narration plays.
	 */
	let output: AudioContext | undefined;
	const latency = () => (output?.state === 'running' ? output.outputLatency || 0 : 0);

	/** After a jump to a word, the highlight stays on it through the preroll, until its start is heard. */
	let hold: { seconds: number; word: number } | undefined;

	/** Highlights the word being heard. */
	const sync = () => {
		if (current < 0 || !audio || !body) return;
		const heard = audio.currentTime - latency();
		if (hold && heard < hold.seconds) return show(hold.word);
		hold = undefined;
		show(markerWord(current, wordAt(sections[current].timings, heard)));
	};

	/** When the latest start began, for its fade-in. */
	let started = 0;
	/** The volume to play at now: the reader's volume, faded in after each start. */
	const level = () => volume.level * Math.min(1, (performance.now() - started) / 1000 / FADE_IN);

	/** Loads section `s` at `seconds` without playing it. */
	const cue = (s: number, seconds = 0) => {
		if (!audio) return;
		if (s !== current) {
			current = s;
			audio.src = `/narration/sections/${sections[s].key}.mp3`;
		}
		audio.currentTime = seconds;
	};

	const play = (s: number, seconds = 0) => {
		cue(s, seconds);
		pausedBySelection = false;
		started = performance.now();
		if (audio) audio.volume = 0;
		output ??= new AudioContext();
		// Starting another section interrupts a pending play; that rejection is expected.
		audio?.play().catch((error: unknown) => {
			if (!(error instanceof DOMException && error.name === 'AbortError')) throw error;
		});
	};

	/** Plays section `s`, picking up where it paused if it's the one paused in. */
	const resume = (s: number) => play(s, current === s ? (audio?.currentTime ?? 0) : 0);

	/** The Listen button: pauses, resumes the section on screen, or starts the first one on screen. */
	const listen = () => {
		if (playing) return audio?.pause();
		const onScreen = ({ blocks }: Voiced) =>
			(blocks.at(-1) as Element).getBoundingClientRect().bottom > innerHeight / 4 &&
			blocks[0].getBoundingClientRect().top < innerHeight;
		if (sections[current] && onScreen(sections[current])) return resume(current);
		play(Math.max(0, sections.findIndex(onScreen)));
	};

	/** At the end of a section, stop. */
	const onended = () => {
		current = -1;
		show(-1);
	};

	// While playing, the highlight follows the audio clock every frame, and the volume fades in.
	$effect(() => {
		if (!playing) return;
		output?.resume();
		let frame = requestAnimationFrame(function tick() {
			sync();
			if (audio) audio.volume = level();
			frame = requestAnimationFrame(tick);
		});
		return () => {
			cancelAnimationFrame(frame);
			output?.suspend();
		};
	});

	// Clicking a word seeks there, into whichever section reads it; paused stays paused.
	$effect(() => {
		const root = body;
		if (!root) return;
		const onseek = ({ detail: { word } }: MarkerSeekEvent) => {
			for (const [s, { blocks, counts, timings }] of sections.entries()) {
				let before = 0;
				for (const [b, block] of blocks.entries()) {
					const index = word - root.wordIndexOf(block);
					if (index >= 0 && index < counts[b]) {
						const seconds = timings[(before + index) * 2];
						hold = { seconds, word };
						const from = Math.max(0, seconds - PREROLL);
						if (playing) return play(s, from);
						cue(s, from);
						shown = -1;
						return show(word);
					}
					before += counts[b];
				}
			}
			// A word nothing voices: the highlight goes back to the word being spoken.
			const was = shown;
			shown = -1;
			show(was);
		};
		root.addEventListener('seek', onseek);
		return () => root.removeEventListener('seek', onseek);
	});

	/** Whether selecting text paused the narration, so clearing the selection resumes it. */
	let pausedBySelection = false;

	/** Selecting text in the lesson pauses, so the reader can read it; clearing the selection resumes. */
	const onselectionchange = () => {
		const selection = getSelection();
		const selecting = !!body && !!selection && !selection.isCollapsed && selection.containsNode(body, true);
		if (selecting && playing) {
			pausedBySelection = true;
			audio?.pause();
		} else if (!selecting && pausedBySelection) {
			pausedBySelection = false;
			if (current >= 0) resume(current);
		}
	};
</script>

<svelte:document {onselectionchange} />

<audio
	bind:this={audio}
	preload="none"
	onplay={() => (playing = true)}
	onpause={() => (playing = false)}
	onseeked={sync}
	{onended}
></audio>

{#if sections.length}
	<button type="button" class="listen" onclick={listen}>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			{#if playing}<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />{:else}<path d="M8 5.5v13l11-6.5z" />{/if}
		</svg>
		{playing ? 'Pause' : 'Listen'}
	</button>
{/if}

<style>
	/* Narrower pages have no gutter: one Listen button at the bottom left, across from Contents. */
	.listen {
		position: fixed;
		left: 1rem;
		bottom: 1rem;
		z-index: 30;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.1rem 0.6rem 0.9rem;
		border: 1px solid var(--accent);
		border-radius: 999px;
		background: var(--accent);
		color: var(--accent-ink);
		box-shadow: 0 4px 16px rgb(0 0 0 / 0.12);
		font-size: 0.95rem;
		font-weight: 700;
		@container (width >= 48rem) {
			display: none;
		}
		& svg {
			width: 18px;
			fill: currentColor;
		}
	}
</style>
