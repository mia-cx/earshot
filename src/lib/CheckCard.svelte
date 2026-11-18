<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A retrieval-practice card: the reader answers in their head, then reveals the answer.
	 * Revealing moves focus to the answer, so keyboard and screen reader users keep their place.
	 * `attempt` adds an optional field to type an answer first, shown beside the real one after the
	 * reveal and never saved. `after` renders under the revealed answer (the review page puts its
	 * grading buttons there).
	 */
	let {
		question,
		answer,
		revealed = $bindable(false),
		attempt = false,
		after
	}: { question: string; answer: string; revealed?: boolean; attempt?: boolean; after?: Snippet } = $props();

	const id = $props.id();
	let typed = $state('');
	let answerEl = $state<HTMLElement>();
	const tried = $derived(attempt && typed.trim() !== '');

	$effect(() => {
		if (revealed) answerEl?.focus();
	});
</script>

<div class="card" data-revealed={revealed || undefined}>
	<p class="question">{@html question}</p>
	{#if attempt && !revealed}
		<label for="{id}-typed" class="typed-label">Type it first (optional)</label>
		<textarea id="{id}-typed" rows="2" bind:value={typed}></textarea>
	{/if}
	{#if !revealed}
		<button type="button" class="reveal" aria-expanded="false" aria-controls={id} onclick={() => (revealed = true)}>
			Show answer
		</button>
	{/if}
	<div class="answer" {id} tabindex="-1" inert={!revealed} bind:this={answerEl}>
		<div class="inner">
			<div class:compare={tried}>
				{#if tried}
					<div>
						<p class="side">You wrote</p>
						<p class="typed">{typed}</p>
					</div>
				{/if}
				<div>
					{#if tried}<p class="side">Answer</p>{/if}
					<div class="lesson">{@html answer}</div>
				</div>
			</div>
			{@render after?.()}
		</div>
	</div>
</div>

<style>
	.card {
		padding: 1.1rem 1.25rem;
		border-radius: 14px;
		background: var(--paper);
		border: 1.5px solid var(--accent-line);
	}

	.question {
		font-size: 1.1rem;
		font-weight: 700;
		line-height: 1.4;
	}

	.typed-label {
		display: block;
		margin-top: 0.75rem;
		font-size: 0.9rem;
		font-weight: 650;
		color: var(--muted);
	}

	textarea {
		display: block;
		width: 100%;
		margin-top: 0.35rem;
		padding: 0.5rem 0.75rem;
		field-sizing: content;
		min-height: 2.6lh;
		resize: vertical;
		font: inherit;
		line-height: 1.5;
		color: var(--ink);
		background: var(--paper);
		border: 1px solid var(--field-line);
		border-radius: 10px;
	}

	.reveal {
		margin-top: 0.75rem;
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.9rem;
		background: var(--accent-soft);
		color: var(--ink);
		&:hover {
			background: var(--accent-line);
		}
	}

	/* Accordion: grid rows grow from 0fr to 1fr so the answer opens to its natural height. */
	.answer {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		transition:
			grid-template-rows var(--duration-slow) var(--ease-smooth-out),
			opacity var(--duration-fast) var(--ease-in-out);
	}

	/* Focus lands here only to keep the reader's place; it isn't a control, so it draws no ring. */
	.answer:focus {
		outline: none;
	}

	.inner {
		min-height: 0;
		overflow: hidden;
	}

	[data-revealed] .answer {
		grid-template-rows: 1fr;
		opacity: 1;
		& .inner {
			padding-top: 0.6rem;
		}
	}

	/* The reader's attempt beside the real answer, stacked on narrow screens. */
	.compare {
		display: grid;
		gap: 1rem 1.5rem;
		@media (width >= 40rem) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.side {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--muted);
	}

	.typed {
		margin-top: 0.25rem;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	@media (prefers-reduced-motion: reduce) {
		.answer {
			transition: none;
		}
	}
</style>
