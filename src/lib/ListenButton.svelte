<script lang="ts">
	/**
	 * Plays one section of the lesson, or pauses it. `Narrator.svelte` mounts it as the first child of
	 * the section's opening block (its heading, when it has one). The button rides a rail in the left
	 * gutter as tall as the whole section (`span`, in px), so it sticks below the header while the
	 * section scrolls and never leaves it. It holds no text, so the marker counts no words in it. Shown
	 * only where the page has a left gutter; narrower pages use the Listen button.
	 */
	let { playing, span, onclick }: { playing: boolean; span: number; onclick: () => void } = $props();
</script>

<span class="listen-rail" style:height="{span}px">
	<button
		type="button"
		class="listen-button"
		aria-label={playing ? 'Pause' : 'Listen to this section'}
		data-playing={playing || undefined}
		{onclick}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			{#if playing}<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />{:else}<path d="M8 5.5v13l11-6.5z" />{/if}
		</svg>
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
		& svg {
			width: 18px;
			fill: currentColor;
		}
	}
</style>
