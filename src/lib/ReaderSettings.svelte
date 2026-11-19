<script lang="ts">
	/**
	 * Text size, spacing and font for this reader. Each choice is a `data-*` attribute on <html> that
	 * `layout.css` reads; it's saved in this browser and applied before first paint by app.html.
	 */
	const KEY = 'earshot:reader';

	const SETTINGS = [
		{
			key: 'textSize',
			legend: 'Text size',
			options: [
				{ value: '100', label: '100%' },
				{ value: '115', label: '115%' },
				{ value: '130', label: '130%' }
			]
		},
		{
			key: 'spacing',
			legend: 'Spacing',
			options: [
				{ value: 'normal', label: 'Normal' },
				{ value: 'roomy', label: 'Roomy' }
			]
		},
		{
			key: 'font',
			legend: 'Font',
			options: [
				{ value: 'atkinson', label: 'Atkinson Hyperlegible' },
				{ value: 'lexend', label: 'Lexend' },
				{ value: 'system', label: 'System' }
			]
		}
	] as const;

	type Setting = (typeof SETTINGS)[number]['key'];

	let chosen = $state<Record<Setting, string>>({ textSize: '100', spacing: 'normal', font: 'atkinson' });

	$effect(() => {
		const { dataset } = document.documentElement;
		for (const { key, options } of SETTINGS) chosen[key] = dataset[key] ?? options[0].value;
	});

	const save = () => {
		Object.assign(document.documentElement.dataset, chosen);
		try {
			localStorage.setItem(KEY, JSON.stringify(chosen));
		} catch {
			// Storage blocked: the settings last for this visit.
		}
	};
</script>

<button type="button" class="toggle" popovertarget="reader-settings">
	Aa<span class="sr-only"> reading settings</span>
</button>

<div id="reader-settings" popover role="dialog" aria-labelledby="reader-settings-title" class="panel">
	<h2 id="reader-settings-title">Reading settings</h2>
	{#each SETTINGS as setting (setting.key)}
		<fieldset>
			<legend>{setting.legend}</legend>
			<div class="options">
				{#each setting.options as option (option.value)}
					<label style={setting.key === 'font' ? `font-family: var(--font-${option.value})` : undefined}>
						<input
							type="radio"
							name="reader-{setting.key}"
							value={option.value}
							bind:group={chosen[setting.key]}
							onchange={save}
						/>
						{option.label}
					</label>
				{/each}
			</div>
		</fieldset>
	{/each}
</div>

<style>
	.toggle {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		color: var(--ink);
		font-size: 1rem;
		font-weight: 750;
		transition: background-color var(--duration-quick) var(--ease-out);
		&:hover {
			background: var(--surface);
		}
	}

	/*
	 * Opens under the button, right edges lined up; on narrow screens it keeps the page gutter instead.
	 * Without anchor positioning it sits at the top right of the screen.
	 */
	.panel {
		position: fixed;
		inset: 4.5rem 1rem auto auto;
		margin: 0;
		width: min(20rem, calc(100vw - 2rem));
		max-height: calc(100dvh - 2rem);
		overflow: auto;
		padding: 1rem;
		border: 1px solid var(--line);
		border-radius: 14px;
		background: var(--paper);
		color: var(--ink);
		box-shadow: 0 12px 40px rgb(0 0 0 / 0.18);
		transition:
			opacity var(--duration-fast) var(--ease-smooth-out),
			translate var(--duration-fast) var(--ease-smooth-out),
			overlay var(--duration-fast) allow-discrete,
			display var(--duration-fast) allow-discrete;
		@supports (position-area: bottom) {
			inset: auto;
			margin-top: 0.5rem;
			max-height: calc(100% - 1.5rem);
			position-area: bottom span-left;
			@media (width < 40rem) {
				position-area: bottom span-all;
				justify-self: end;
				margin-right: 1rem;
			}
		}
		&:not(:popover-open) {
			opacity: 0;
			translate: 0 calc(-1 * var(--distance-base));
		}
		@starting-style {
			&:popover-open {
				opacity: 0;
				translate: 0 calc(-1 * var(--distance-base));
			}
		}
		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	}

	h2 {
		font-weight: 750;
	}

	fieldset {
		margin-top: 1rem;
	}

	legend {
		margin-bottom: 0.4rem;
		font-size: 0.9rem;
		color: var(--muted);
	}

	.options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	label {
		position: relative;
		flex: 1 1 auto;
		padding: 0.4rem 0.75rem;
		border: 1.5px solid var(--field-line);
		border-radius: 999px;
		text-align: center;
		font-size: 0.95rem;
		font-weight: 650;
		cursor: pointer;
		transition:
			background-color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out),
			color var(--duration-quick) var(--ease-out);
		&:hover {
			border-color: var(--muted);
		}
		&:has(:checked) {
			border-color: var(--ink);
			background: var(--ink);
			color: var(--paper);
		}
		&:has(:focus-visible) {
			outline: 3px solid var(--focus);
			outline-offset: 2px;
		}
	}

	input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
</style>
