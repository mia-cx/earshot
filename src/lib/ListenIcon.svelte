<script lang="ts" module>
	/** Where a section's narration stands: not started, paused in it, or playing it. */
	export type ListenState = 'idle' | 'paused' | 'playing';
</script>

<script lang="ts">
	/** The narration button's icon: headphones before it starts, play when paused, pause while playing. */
	let { state }: { state: ListenState } = $props();
</script>

<svg viewBox="0 0 24 24" aria-hidden="true">
	{#if state === 'playing'}
		<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
	{:else if state === 'paused'}
		<path d="M8 5.5v13l11-6.5z" />
	{:else}
		<path
			d="M12 3a9 9 0 0 0-9 9v6.5A2.5 2.5 0 0 0 5.5 21H7a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H5v-1a7 7 0 0 1 14 0v1h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1.5a2.5 2.5 0 0 0 2.5-2.5V12a9 9 0 0 0-9-9z"
		/>
	{/if}
</svg>

<style>
	svg {
		width: 18px;
		fill: currentColor;
	}
</style>
