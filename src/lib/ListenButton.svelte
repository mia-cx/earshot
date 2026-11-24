<script lang="ts">
	/**
	 * Plays one section of the lesson, or pauses it. `Narrator.svelte` mounts it as the first child of
	 * the section's opening block (its heading, when it has one). The button rides a rail in the left
	 * gutter as tall as the whole section (`span`, in px), so it sticks below the header while the
	 * section scrolls and never leaves it. It holds no text, so the marker counts no words in it. Shown
	 * only where the page has a left gutter; narrower pages use the Listen button.
	 */
	import ListenIcon, { type ListenState } from './ListenIcon.svelte';

	let { state, span, onclick }: { state: ListenState; span: number; onclick: () => void } = $props();

	const LABELS: Record<ListenState, string> = { idle: 'Listen to this section', paused: 'Resume', playing: 'Pause' };
</script>

<span class="listen-rail" style:height="{span}px">
	<button
		type="button"
		class="listen-button"
		aria-label={LABELS[state]}
		data-playing={state === 'playing' || undefined}
		{onclick}
	>
		<ListenIcon {state} />
	</button>
</span>

<style>
	/* The opening block anchors the rail, which hangs in the gutter beside it and runs down the section. */
	:global(:has(> .listen-rail)) {
		position: relative;
	}

	/*
	 * Sized in px, so a larger text size grows the words, not the button. The button starts centred on
	 * the block's first line, then sticks inside the rail, so it stops at the section's end.
	 */
	.listen-rail {
		--size: 40px;
		--gap: 1.25rem;
		display: none;
		position: absolute;
		top: 0;
		left: calc(-1 * (var(--size) + var(--gap)));
		width: var(--size);
		@container (width >= 48rem) {
			display: block;
		}
	}

	.listen-button {
		display: grid;
		position: sticky;
		top: calc(var(--header) + 1rem);
		place-items: center;
		width: var(--size);
		height: var(--size);
		margin-top: max(0px, calc((1lh - var(--size)) / 2));
		border: 1.5px solid var(--accent-line);
		border-radius: 10px;
		background: var(--paper);
		color: var(--muted);
		@media (prefers-reduced-motion: no-preference) {
			transition:
				color var(--duration-quick) var(--ease-out),
				background-color var(--duration-quick) var(--ease-out),
				border-color var(--duration-quick) var(--ease-out);
		}
		&:hover {
			border-color: var(--accent);
			color: var(--accent);
		}
		&[data-playing] {
			border-color: var(--accent);
			background: var(--accent);
			color: var(--accent-ink);
		}
	}
</style>
