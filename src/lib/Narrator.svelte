<script lang="ts">
	import type { MarkerElement, MarkerSeekEvent } from '@mia-cx/marker';
	import { mount, unmount, untrack } from 'svelte';
	import ListenButton from './ListenButton.svelte';
	import { blockKey, blockWords, type LessonNarration, narratedSections, spokenText, wordAt } from './narration.ts';

	/**
	 * Reads a lesson aloud in Mia's voice (`scripts/narrate.ts`). Each heading and paragraph with audio
	 * gets a button in the left gutter that reads from there to the end of its section (see
	 * `narration.ts`), then stops; narrower pages get one Listen button that reads from the block on
	 * screen. The marker highlights the spoken word, and clicking a word seeks there; selecting text pauses.
	 */
	let { lesson, body }: { lesson: string; body: MarkerElement | undefined } = $props();

	type Voiced = {
		el: Element;
		key: string;
		timings: number[];
		/** Blocks read in one go share a section; a block with no audio yet ends one. */
		section: number;
		/** Headings and paragraphs get a button; so does a list item that opens a section. */
		button: boolean;
	};

	let audio = $state<HTMLAudioElement>();
	let blocks = $state.raw<Voiced[]>([]);
	/** The block loaded in the player, or -1. */
	let current = $state(-1);
	let playing = $state(false);
	/** The marker word last shown, so a frame that changes nothing writes nothing. */
	let shown = -1;

	/** The lesson's blocks that have audio in the stored voice, in reading order. */
	const load = async (id: string, root: Element): Promise<Voiced[]> => {
		const response = await fetch(`/narration/lessons/${id}.json`);
		if (!response.ok) return [];
		const narration: LessonNarration = await response.json();
		const keyed = await Promise.all(
			narratedSections(root).map((section) =>
				Promise.all(
					section.map(async (el) => ({
						el,
						key: await blockKey(spokenText(blockWords(el)).text, narration.voice, narration.model)
					}))
				)
			)
		);
		const found: Voiced[] = [];
		let section = 0;
		for (const blocks of keyed) {
			let opens = true;
			for (const { el, key } of blocks) {
				const timings = narration.blocks[key];
				if (!timings) {
					section += 1;
					opens = true;
					continue;
				}
				found.push({ el, key, timings, section, button: opens || el.tagName !== 'LI' });
				opens = false;
			}
			section += 1;
		}
		return found;
	};

	$effect(() => {
		const root = body;
		if (!root) return;
		let live = true;
		load(lesson, root).then((found) => {
			if (live) blocks = found;
		});
		return () => {
			live = false;
			audio?.pause();
			blocks = [];
			current = -1;
			show(-1);
		};
	});

	/** The block whose button stands for what's playing: the current one, or the last button before it in its section. */
	const active = $derived.by(() => {
		for (let i = current; i >= 0 && blocks[i].section === blocks[current].section; i--) if (blocks[i].button) return i;
		return -1;
	});

	// Each button goes inside its block, so it can stick within the block's height.
	$effect(() => {
		const voiced = blocks;
		const buttons = untrack(() =>
			voiced.flatMap((block, i) =>
				block.button
					? [
							mount(ListenButton, {
								target: block.el,
								anchor: block.el.firstChild ?? undefined,
								props: {
									get playing() {
										return playing && active === i;
									},
									onclick: () => (playing && active === i ? audio?.pause() : resume(i))
								}
							})
						]
					: []
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

	/** Highlights the word being spoken. */
	const sync = () => {
		const block = blocks[current];
		if (block && audio && body) show(body.wordIndexOf(block.el) + wordAt(block.timings, audio.currentTime));
	};

	/** Loads block `i` at `seconds` without playing it. */
	const cue = (i: number, seconds = 0) => {
		if (!audio) return;
		if (i !== current) {
			current = i;
			audio.src = `/narration/blocks/${blocks[i].key}.mp3`;
		}
		audio.currentTime = seconds;
	};

	const play = (i: number, seconds = 0) => {
		cue(i, seconds);
		// Starting another block interrupts a pending play; that rejection is expected.
		audio?.play().catch((error: unknown) => {
			if (!(error instanceof DOMException && error.name === 'AbortError')) throw error;
		});
	};

	/** Plays from block `i`, picking up where it paused if it's the one paused in. */
	const resume = (i: number) => {
		if (current >= 0 && active === i) play(current, audio?.currentTime ?? 0);
		else play(i);
	};

	/** The Listen button: pauses, resumes the block on screen, or starts the one being read. */
	const listen = () => {
		if (playing) return audio?.pause();
		const onScreen = (block: Voiced) => {
			const { top, bottom } = block.el.getBoundingClientRect();
			return bottom > innerHeight / 4 && top < innerHeight;
		};
		if (blocks[current] && onScreen(blocks[current])) return play(current, audio?.currentTime ?? 0);
		play(Math.max(0, blocks.findIndex(onScreen)));
	};

	/** At the end of a block, read on through its section; at the section's end, stop. */
	const onended = () => {
		const next = blocks[current + 1];
		if (next && next.section === blocks[current].section) return play(current + 1);
		current = -1;
		show(-1);
	};

	// While playing, the highlight follows the audio clock every frame.
	$effect(() => {
		if (!playing) return;
		let frame = requestAnimationFrame(function tick() {
			sync();
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});

	// Clicking a word seeks there, into whichever block holds it; paused stays paused.
	$effect(() => {
		const root = body;
		if (!root) return;
		const onseek = ({ detail: { word } }: MarkerSeekEvent) => {
			for (const [i, block] of blocks.entries()) {
				const index = word - root.wordIndexOf(block.el);
				if (index < 0 || index >= block.timings.length / 2) continue;
				if (playing) return play(i, block.timings[index * 2]);
				cue(i, block.timings[index * 2]);
				shown = -1;
				return show(word);
			}
			// A word nothing voices: the highlight goes back to the word being spoken.
			const was = shown;
			shown = -1;
			show(was);
		};
		root.addEventListener('seek', onseek);
		return () => root.removeEventListener('seek', onseek);
	});

	/** Selecting text in the lesson pauses, so the reader can read it. */
	const onselectionchange = () => {
		const selection = getSelection();
		if (playing && body && selection && !selection.isCollapsed && selection.containsNode(body, true)) audio?.pause();
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

{#if blocks.length}
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
