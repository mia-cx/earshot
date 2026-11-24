<script lang="ts">
	import { tick } from 'svelte';
	import CheckCard from '#lib/CheckCard.svelte';
	import { progress } from '#lib/progress.svelte.ts';
	import { DAY_MS, review } from '#lib/review.svelte.ts';
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();

	/** Cards practised in one sitting when nothing is due yet. */
	const PRACTICE_SIZE = 10;

	let queue = $state<string[] | null>(null);
	let position = $state(0);
	let revealed = $state(false);
	let recalled = $state(0);
	/** The current card, or the end-of-session message once the queue runs out. */
	let current = $state<HTMLElement>();

	const deckSize = $derived(review.enrolled().filter((id) => data.cards[id]).length);
	const currentId = $derived(queue?.[position]);
	const card = $derived(currentId ? data.cards[currentId] : undefined);
	const nextLesson = $derived(
		data.outline.flatMap((m) => m.lessons).find((l) => !progress.done.has(l.id))
	);

	/** Starts today's session once saved cards are loaded. */
	$effect(() => {
		if (review.restored && queue === null) queue = review.due().filter((id) => data.cards[id]);
	});

	/** Focus follows the session: to the next card, or to the result when the queue is done. */
	const focusCurrent = async () => {
		await tick();
		current?.focus();
	};

	const grade = (gotIt: boolean) => {
		if (!currentId) return;
		review.answer(currentId, gotIt);
		if (gotIt) recalled += 1;
		revealed = false;
		position += 1;
		focusCurrent();
	};

	const practise = () => {
		const ids = review.enrolled().filter((id) => data.cards[id]);
		queue = ids.sort(() => Math.random() - 0.5).slice(0, PRACTICE_SIZE);
		position = 0;
		recalled = 0;
		focusCurrent();
	};

	const nextDue = $derived.by(() => {
		const at = review.nextDue();
		if (at === null) return null;
		const days = Math.max(1, Math.round((at - Date.now()) / DAY_MS));
		return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(days, 'day');
	});

	/**
	 * 1 and 2 grade a revealed card; Space reveals it. Only while focus is in the card, so the keys
	 * never fire by accident elsewhere on the page (WCAG 2.1.4).
	 */
	const onkeydown = (event: KeyboardEvent) => {
		if (!card || event.metaKey || event.ctrlKey || event.altKey) return;
		if (!(event.target instanceof Node) || !current?.contains(event.target)) return;
		if (event.target instanceof HTMLElement && event.target.closest('input, textarea')) return;
		if (!revealed && event.key === ' ' && !(event.target instanceof HTMLButtonElement)) {
			event.preventDefault();
			revealed = true;
		} else if (revealed && (event.key === '1' || event.key === '2')) {
			grade(event.key === '2');
		}
	};
</script>

<svelte:window {onkeydown} />

<Seo
	title="Review · Earshot"
	description="Recall the check cards from Earshot lessons you finished. Cards you get right come back after 3, 7, 16, then 35 days."
	noindex
/>

<div class="mx-auto max-w-2xl">
	<h1 class="text-4xl font-[800] tracking-tight">Review</h1>

	{#if queue === null}
		<p class="mt-6 text-muted" data-review-loading>Loading your cards.</p>
	{:else if card && queue}
		<div class="mt-6 flex items-center gap-3 text-sm text-muted tabular-nums" role="status">
			<div class="bar" aria-hidden="true"><span style="width: {(position / queue.length) * 100}%"></span></div>
			Card {position + 1} of {queue.length}
		</div>

		{#key currentId}
			<div class="enter mt-6" data-hue style="--hue: {card.hue}" tabindex="-1" bind:this={current}>
				<CheckCard question={card.question} answer={card.answer} attempt bind:revealed>
					{#snippet after()}
						<div class="mt-5 flex flex-wrap items-center gap-3">
							<button type="button" class="grade" aria-keyshortcuts="1" onclick={() => grade(false)}>
								Not yet <kbd aria-hidden="true">1</kbd>
							</button>
							<button type="button" class="grade grade-yes" aria-keyshortcuts="2" onclick={() => grade(true)}>
								Got it <kbd aria-hidden="true">2</kbd>
							</button>
						</div>
					{/snippet}
				</CheckCard>
				<a href={card.lesson.href} class="mt-3 inline-block text-sm text-muted underline underline-offset-4">
					From: {card.lesson.title}
				</a>
			</div>
		{/key}
	{:else if deckSize === 0}
		<p class="mt-6 text-lg">Your deck is empty. Finish a lesson and its three check cards join it.</p>
		{#if nextLesson}
			<a href={nextLesson.href} class="cta mt-6">Go to {nextLesson.title} <span aria-hidden="true">→</span></a>
		{/if}
	{:else}
		<p class="mt-6 text-lg" tabindex="-1" bind:this={current}>
			{#if queue.length}
				Done. You recalled {recalled} of {queue.length}.
			{:else}
				Nothing due right now.
			{/if}
			{#if nextDue}Next cards come back {nextDue}.{/if}
		</p>
		<p class="mt-2 text-muted">
			{deckSize}
			{deckSize === 1 ? 'card' : 'cards'} in your deck. Cards you recall come back after 3, 7, 16, then 35 days.
		</p>
		<div class="mt-6 flex flex-wrap items-center gap-4">
			{#if nextLesson}
				<a href={nextLesson.href} class="cta">Continue the course <span aria-hidden="true">→</span></a>
			{/if}
			<button type="button" class="font-semibold underline underline-offset-4" onclick={practise}>
				Practise {Math.min(PRACTICE_SIZE, deckSize)} now
			</button>
		</div>
	{/if}
</div>

<style>
	/* The saved deck can replace this short placeholder with an entire card. Reveal the footer in its final position. */
	:global([data-js] main:has([data-review-loading]) + .site-footer) {
		visibility: hidden;
	}

	.bar {
		flex: 1;
		height: 6px;
		border-radius: 3px;
		background: var(--line);
		overflow: hidden;
		& span {
			display: block;
			height: 100%;
			background: var(--ink);
			transition: width var(--duration-fast) var(--ease-smooth-out);
		}
	}

	.enter {
		animation: rise var(--duration-slow) var(--ease-smooth-out) both;
	}

	/* Focus lands on the card or the result only to keep the reader's place; neither is a control. */
	[tabindex='-1']:focus {
		outline: none;
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 var(--distance-medium);
			filter: blur(var(--blur-medium));
		}
	}

	.grade {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 1.1rem;
		border-radius: 999px;
		font-weight: 700;
		border: 1.5px solid var(--line);
		&:hover {
			border-color: var(--muted);
		}
	}

	.grade-yes {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--accent-ink);
	}

	kbd {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		padding: 0 0.35rem;
		border-radius: 4px;
		border: 1px solid currentColor;
		opacity: 0.6;
	}

	.cta {
		display: inline-flex;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 999px;
		background: var(--go);
		color: var(--go-ink);
		font-weight: 700;
		font-size: 1.05rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.enter {
			animation: none;
		}
	}
</style>
