<script lang="ts">
	import { exportBackup, parseBackup } from '#lib/backup.ts';
	import { reviewEvent } from '#lib/calendar.ts';
	import { downloadFile } from '#lib/download.ts';
	import { progress } from '#lib/progress.svelte.ts';
	import { review } from '#lib/review.svelte.ts';
	import Route from '#lib/Route.svelte';
	import { page } from '$app/state';
	import { curriculum } from '#lib/schema.ts';
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();

	const lessons = $derived(data.outline.flatMap((m) => m.lessons));
	const next = $derived(lessons.find((l) => !progress.done.has(l.id)));
	const nextModule = $derived(data.outline.find((m) => m.slug === next?.module));
	const percent = $derived(Math.round((progress.done.size / lessons.length) * 100));
	const due = $derived(review.due().length);
	const upcoming = $derived(review.nextDue(Date.now()));

	let picker = $state<HTMLInputElement>();
	let problem = $state('');

	const longDate = (time: number) =>
		new Date(time).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });

	const today = () => new Date().toISOString().slice(0, 10);

	const remind = () => {
		if (upcoming !== null)
			downloadFile('earshot-review.ics', reviewEvent(upcoming, `${location.origin}/review`), 'text/calendar');
	};

	const backUp = () =>
		downloadFile(`earshot-backup-${today()}.json`, exportBackup({ ...localStorage }), 'application/json');

	/** Writes a picked backup file into this browser and reloads, so every page reads it. */
	const restore = async (input: HTMLInputElement) => {
		const file = input.files?.[0];
		input.value = '';
		if (!file) return;
		const saved = parseBackup(await file.text());
		if (!saved) {
			problem = `${file.name} isn't an Earshot backup. Pick a file that Download backup saved.`;
			return;
		}
		try {
			for (const [key, value] of Object.entries(saved)) localStorage.setItem(key, value);
		} catch {
			problem = "This browser isn't letting the site save, so the backup can't be loaded here.";
			return;
		}
		location.reload();
	};
</script>

<!-- The reader's own progress view; the landing page carries the same route for search. -->
<Seo
	title="Your map · Earshot"
	description="Your place in Earshot: the next lesson, every module's progress, review cards due, and a backup of your answers."
	schema={[curriculum(page.url.origin, data.outline)]}
/>

<h1 class="sr-only">Your map</h1>

<section
	class="next grid items-center gap-6 rounded-3xl bg-ink p-6 text-paper sm:grid-cols-[1fr_auto] sm:p-10"
	data-hue
	style="--hue: {nextModule?.hue ?? 155}"
>
	<div>
		{#if next && nextModule}
			<a href={nextModule.href} class="font-semibold text-accent-line hover:underline">
				Module {nextModule.number} · {nextModule.title}
			</a>
			<h2 class="mt-2 text-3xl leading-tight font-[800] tracking-tight sm:text-5xl">{next.title}</h2>
			<p class="mt-3 max-w-2xl text-lg opacity-80">{next.summary}</p>
			<div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
				<a
					href={next.href}
					class="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-lg font-bold text-accent-ink hover:brightness-110"
				>
					{progress.done.size ? 'Continue' : 'Start the course'} <span aria-hidden="true">→</span>
				</a>
				{#if due}
					<a href="/review" class="font-semibold underline underline-offset-4 opacity-90 hover:opacity-100">
						Review {due} {due === 1 ? 'card' : 'cards'} first
					</a>
				{/if}
				<span class="text-sm opacity-70 tabular-nums">{next.minutes} min</span>
			</div>
		{:else}
			<h2 class="text-3xl font-[800] tracking-tight sm:text-5xl">You finished every lesson.</h2>
			<a
				href="/review"
				class="mt-7 inline-flex rounded-full bg-accent px-7 py-3.5 text-lg font-bold text-accent-ink"
			>
				Keep it fresh in review <span aria-hidden="true">→</span>
			</a>
		{/if}
		{#if upcoming !== null}
			<p class="mt-5 opacity-90">
				Next review on {longDate(upcoming)}.
				<button type="button" class="font-semibold underline underline-offset-4" onclick={remind}>
					Add to calendar
				</button>
			</p>
		{/if}
	</div>
	<div class="overall max-sm:hidden" role="img" aria-label="{percent}% of the course done">
		<svg viewBox="0 0 120 120" aria-hidden="true">
			<circle cx="60" cy="60" r="52" pathLength="100" class="track" />
			<circle cx="60" cy="60" r="52" pathLength="100" class="fill" style="stroke-dasharray: {percent} 100" />
		</svg>
		<span class="tabular-nums"><strong>{percent}%</strong>{progress.done.size}/{lessons.length}</span>
	</div>
</section>

<h2 class="sr-only">Modules</h2>
<div class="mt-14"><Route outline={data.outline} /></div>

<section class="mx-auto mt-24 max-w-2xl rounded-3xl border border-line bg-surface p-6 sm:p-8" aria-labelledby="backup">
	<h2 id="backup" class="text-xl font-[750]">Back up your progress</h2>
	<p class="mt-2 text-muted">
		Done lessons, review cards and answers are saved in this browser only. Download a backup to keep them safe or to
		carry on in another browser.
	</p>
	<div class="mt-5 flex flex-wrap gap-3">
		<button type="button" class="backup-button" onclick={backUp}>Download backup</button>
		<button type="button" class="backup-button" onclick={() => picker?.click()}>Load a backup</button>
		<input
			bind:this={picker}
			type="file"
			accept=".json,application/json"
			hidden
			onchange={(event) => restore(event.currentTarget)}
		/>
	</div>
	<p class="mt-3 text-[0.95rem] empty:hidden" role="alert">{problem}</p>
</section>

<style>
	.backup-button {
		padding: 0.6rem 1.25rem;
		border: 1.5px solid var(--ink);
		border-radius: 999px;
		background: var(--paper);
		font-weight: 700;
		transition:
			background-color var(--duration-quick) var(--ease-out),
			color var(--duration-quick) var(--ease-out);
		&:hover {
			background: var(--ink);
			color: var(--paper);
		}
	}

	.overall {
		position: relative;
		/* Capped by the viewport too, so enlarged text can't push the card wider than the screen. */
		width: min(9rem, 28vw);
		justify-self: center;
		& svg {
			rotate: -90deg;
		}
		& circle {
			fill: none;
			stroke-width: 9;
		}
		& .track {
			stroke: color-mix(in oklch, var(--paper) 18%, transparent);
		}
		& .fill {
			stroke: var(--accent);
			stroke-linecap: round;
			transition: stroke-dasharray var(--duration-very-slow) var(--ease-smooth-out);
		}
		& span {
			position: absolute;
			inset: 0;
			display: grid;
			place-content: center;
			text-align: center;
			font-size: 0.8rem;
			opacity: 0.85;
		}
		& strong {
			display: block;
			font-size: 1.6rem;
			line-height: 1.1;
		}
	}
</style>
