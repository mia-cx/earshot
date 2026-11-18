<script lang="ts">
	import { tick } from 'svelte';
	import { balance } from '#lib/balance.ts';
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();

	let filter = $state<string | null>(null);
	let picked = $state<string | null>(null);

	const shown = $derived(filter ? data.tricks.filter((t) => t.module === filter) : data.tricks);
	const counts = $derived(Object.groupBy(data.tricks, (t) => t.module));

	/** Tailwind's `md`, where the cards go into two columns. */
	const TWO_COLUMNS = '(width >= 48rem)';
	let list = $state<HTMLElement>();
	let columns = $state<(typeof shown)[]>();
	let placed = $state(false);
	let width = 0;

	/**
	 * Masonry: renders the shown cards in CSS columns to measure them, then splits them into two
	 * columns that end level. Runs within one task, so the measuring layout never paints.
	 */
	const place = async () => {
		placed = false;
		columns = undefined;
		width = innerWidth;
		await document.fonts.ready;
		await tick();
		if (list && matchMedia(TWO_COLUMNS).matches) {
			const cards = [...list.children].map((card) => card.getBoundingClientRect().height + parseFloat(getComputedStyle(card).marginBottom));
			columns = balance(cards).map((column) => column.map((i) => shown[i]));
		}
		placed = true;
	};

	$effect(() => {
		void shown;
		place();
	});

	/** Picks a random trick from the current filter and moves focus to it. */
	const pick = async () => {
		const trick = shown[Math.floor(Math.random() * shown.length)];
		picked = trick.key;
		await tick();
		const card = document.getElementById(trick.key);
		card?.focus({ preventScroll: true });
		card?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
	};
</script>

<Seo
	title="{data.tricks.length} cheap marketing tricks you can try today · Free Game"
	description="Specific marketing moves for builders, from cold email and X posts to SEO and launches, each linked to the lesson that explains it."
/>

<div class="flex flex-wrap items-end gap-4">
	<h1 class="mr-auto text-4xl font-[800] tracking-tight">{data.tricks.length} cheap tricks</h1>
	<button
		type="button"
		onclick={pick}
		class="rounded-full bg-go px-5 py-2.5 font-bold text-go-ink hover:brightness-110"
	>
		Pick one for me
	</button>
</div>

<div class="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by module">
	<button type="button" class="chip" aria-pressed={filter === null} onclick={() => (filter = null)}>
		All <span class="tabular-nums opacity-70">{data.tricks.length}</span>
	</button>
	{#each data.outline.filter((m) => counts[m.slug]) as module (module.slug)}
		<button
			type="button"
			class="chip"
			aria-pressed={filter === module.slug}
			onclick={() => (filter = filter === module.slug ? null : module.slug)}
		>
			{module.title} <span class="tabular-nums opacity-70">{counts[module.slug]?.length}</span>
		</button>
	{/each}
</div>

<svelte:window onresize={() => innerWidth !== width && place()} />

{#snippet card(trick: (typeof shown)[number])}
	<li
		id={trick.key}
		tabindex="-1"
		class="callout {picked === trick.key ? 'ring-4 ring-ink' : ''}"
		data-kind="trick"
		data-hue
		style="--hue: {trick.hue}"
	>
		<p class="callout-title">{trick.title}</p>
		<div class="lesson text-[0.95rem]">{@html trick.html}</div>
		<a href={trick.lesson.href} class="from mt-3 block text-sm font-semibold underline underline-offset-4">
			From: {trick.lesson.title}
		</a>
	</li>
{/snippet}

{#if columns}
	<div class="masonry placed mt-8 grid grid-cols-2 items-start gap-5">
		{#each columns as column, c (c)}
			<ul>
				{#each column as trick (trick.key)}
					{@render card(trick)}
				{/each}
			</ul>
		{/each}
	</div>
{:else}
	<!-- Without JavaScript, and while measuring: CSS columns, in course order down each column. -->
	<ul bind:this={list} class="masonry mt-8 gap-5 md:columns-2" class:placed>
		{#each shown as trick (trick.key)}
			{@render card(trick)}
		{/each}
	</ul>
{/if}

<style>
	.chip {
		border: 2px solid var(--line);
		border-radius: 999px;
		padding: 0.3rem 0.85rem;
		font-weight: 600;
		font-size: 0.9rem;
		&:hover {
			border-color: var(--muted);
		}
		&[aria-pressed='true'] {
			background: var(--ink);
			border-color: var(--ink);
			color: var(--paper);
		}
	}
	/* With scripts on, wide screens wait for the level columns instead of painting the measuring layout. */
	@media (width >= 48rem) {
		:global([data-js]) .masonry:not(.placed) {
			visibility: hidden;
		}
	}

	/* The border carries the module's colour. */
	.callout {
		--edge: var(--accent);
		margin: 0 0 1.25rem;
		break-inside: avoid;
	}
</style>
