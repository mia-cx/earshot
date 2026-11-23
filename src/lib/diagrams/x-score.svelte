<script lang="ts">
	/**
	 * How X scores one post for one viewer: each action's predicted chance times its weight, summed.
	 * Weights are the production defaults in X's open-source ranking code on 21 November 2026, as taught
	 * in "What X rewards". The chances are the reader's to set: examples, not data.
	 */
	const actions = [
		{ key: 'like', label: 'Like', weight: 0.708, chance: 10, max: 30, step: 0.5 },
		{ key: 'reply', label: 'Reply', weight: 5, chance: 1, max: 10, step: 0.1 },
		{ key: 'share', label: 'Share by copied link', weight: 20, chance: 0.5, max: 5, step: 0.05 },
		{ key: 'mute', label: 'Mute', weight: -58.8, chance: 0.2, max: 2, step: 0.02 }
	];

	const id = $props.id();
	let chances: Record<string, number> = $state(Object.fromEntries(actions.map((a) => [a.key, a.chance])));

	const parts = $derived(actions.map((a) => ({ ...a, points: (chances[a.key] / 100) * a.weight })));
	const score = $derived(parts.reduce((n, p) => n + p.points, 0));
	const largest = $derived(parts.reduce((a, b) => (Math.abs(b.points) > Math.abs(a.points) ? b : a)));
	/** Bars are drawn against the biggest contribution, so the reader sees which action moves the score most. */
	const scale = $derived(Math.max(Math.abs(largest.points), 0.01));

	const signed = (n: number) => `${n < 0 ? '−' : '+'}${Math.abs(n).toFixed(2)}`;
	const sentence = $derived(
		`These four actions add ${signed(score)} to this viewer's score. ${largest.label} moves it most${largest.points < 0 ? ', downwards' : ''}.`
	);
</script>

<figure class="diagram">
	<div class="actions">
		{#each parts as part (part.key)}
			<div class="action">
				<div class="head">
					<label for="{id}-{part.key}">
						<span>{part.label}</span>
						<span class="weight">weight {String(part.weight).replace('-', '−')}</span>
					</label>
					<output for="{id}-{part.key}" class="chance">{chances[part.key]}% chance</output>
				</div>
				<input
					id="{id}-{part.key}"
					type="range"
					min="0"
					max={part.max}
					step={part.step}
					bind:value={chances[part.key]}
					aria-valuetext="{chances[part.key]}% chance"
				/>
				<span class="track" aria-hidden="true">
					<span
						class="bar"
						class:negative={part.points < 0}
						style="width: {(Math.abs(part.points) / scale) * 100}%"
					></span>
				</span>
				<span class="points">{signed(part.points)}</span>
			</div>
		{/each}
	</div>

	<p class="diagram-output mt-5" aria-live="polite">{sentence}</p>

	<figcaption>
		X predicts how likely this viewer is to take each action and multiplies by its weight. This shows four of the
		actions, so it's part of the score, not all of it. Weights from X's open-source ranking code on 21 November 2026;
		the chances are examples, and the weights change without notice.
	</figcaption>
</figure>

<style>
	.actions {
		display: grid;
		gap: 1rem;
	}

	.action {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 3.5rem;
		gap: 0.3rem 0.75rem;
		align-items: center;
	}

	.head {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 0 0.75rem;
	}

	label {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.5rem;
		font-weight: 650;
	}

	.weight,
	.chance {
		font-size: 0.875rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	.weight {
		font-weight: 500;
	}

	input {
		grid-column: 1 / -1;
		width: 100%;
		accent-color: var(--accent);
	}

	.track {
		height: 0.6rem;
		border-radius: 999px;
		background: var(--surface);
		overflow: hidden;
	}

	.bar {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: var(--accent);
		transition: width var(--duration-quick) var(--ease-out);
		&.negative {
			background: var(--risk-edge);
		}
	}

	.points {
		text-align: right;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	@media (prefers-reduced-motion: reduce) {
		.bar {
			transition: none;
		}
	}
</style>
