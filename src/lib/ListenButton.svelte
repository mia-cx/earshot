<script lang="ts">
	/**
	 * Plays the lesson from one heading or paragraph to the end of its section, or pauses it.
	 * `Narrator.svelte` mounts it as the block's first child, so it sits in the left gutter and sticks
	 * below the header while the block scrolls, never leaving it. It holds no text, so the marker counts
	 * no words in it. Shown only where the page has a left gutter; narrower pages use the Listen button.
	 */
	let { playing, onclick }: { playing: boolean; onclick: () => void } = $props();
</script>

<button
	type="button"
	class="listen-button"
	aria-label={playing ? 'Pause' : 'Listen from here'}
	data-playing={playing || undefined}
	{onclick}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		{#if playing}<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />{:else}<path d="M8 5.5v13l11-6.5z" />{/if}
	</svg>
</button>

<style>
	/*
	 * A float whose margins cancel its width, so the text never wraps around it: it hangs in the gutter,
	 * centred on the first line. Sticky inside its block, it rides down a long one and stops at its end.
	 * Sized in px, so a larger text size grows the words, not the button.
	 */
	.listen-button {
		--size: 40px;
		--gap: 1.25rem;
		display: none;
		float: left;
		position: sticky;
		top: calc(var(--header) + 1rem);
		place-items: center;
		width: var(--size);
		height: var(--size);
		margin: calc((1lh - var(--size)) / 2) var(--gap) 0 calc(-1 * (var(--size) + var(--gap)));
		border: 1.5px solid var(--accent-line);
		border-radius: 10px;
		background: var(--paper);
		color: var(--muted);
		@container (width >= 48rem) {
			display: grid;
		}
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
		& svg {
			width: 18px;
			fill: currentColor;
		}
	}
</style>
