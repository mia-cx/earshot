<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { progress } from '#lib/progress.svelte.ts';
	import { review } from '#lib/review.svelte.ts';
	import { copyCode } from '#lib/copy.ts';
	import ReaderSettings from '#lib/ReaderSettings.svelte';
	import ThemeToggle from '#lib/ThemeToggle.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const total = $derived(data.outline.reduce((n, m) => n + m.lessons.length, 0));
	const due = $derived(review.due().length);
	const current = (path: string) => (page.url.pathname === path ? 'page' : undefined);

	$effect(() => {
		progress.restore();
		review.restore();
	});

	// The header sticks to the top, so anything else that sticks or scrolls into view clears it via --header.
	let headerHeight = $state(0);
	$effect(() => document.documentElement.style.setProperty('--header', `${headerHeight}px`));
</script>

<svelte:document onclick={copyCode} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:p-2">
	Skip to content
</a>

<header bind:offsetHeight={headerHeight} class="site-header">
	<div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
		<a href="/" class="mr-auto text-lg font-[800] tracking-tight whitespace-nowrap">Free Game</a>
		<nav aria-label="Main" class="flex flex-wrap items-center gap-3 text-[0.95rem] sm:gap-5">
			<a href="/map" aria-current={current('/map')} class="nav-link">Map</a>
			<a href="/review" aria-current={current('/review')} class="nav-link">
				Review{#if due}<span class="badge"><span class="sr-only">,</span> {due}<span class="sr-only"> due</span></span>{/if}
			</a>
			<a href="/tricks" aria-current={current('/tricks')} class="nav-link">Tricks</a>
			<span class="text-muted tabular-nums max-sm:hidden">{progress.done.size}/{total} done</span>
			<span class="flex">
				<ReaderSettings />
				<ThemeToggle />
			</span>
		</nav>
	</div>
</header>

<main id="main" class="mx-auto max-w-6xl px-4 pt-4 pb-24 sm:px-6">
	{@render children()}
</main>

<footer class="site-footer">
	<div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
		<div>
			<a href="/" class="text-lg font-[800] tracking-tight">Free Game</a>
			<p class="mt-2 max-w-sm">
				A free marketing course for builders, learned from zero. No sign-up: your progress and answers stay in your
				browser.
			</p>
			<p class="mt-4 max-w-sm">
				Rewritten from {data.credits.posts} free posts by {data.credits.people} people on X.
				<a href="/sources" class="footer-link underline">Every source</a>
			</p>
		</div>

		<nav aria-labelledby="footer-course">
			<h2 id="footer-course">Course</h2>
			<ol>
				{#each data.outline as module (module.slug)}
					<li><a href={module.href} class="footer-link">{module.number}. {module.title}</a></li>
				{/each}
			</ol>
		</nav>

		<div class="grid content-start gap-8">
			<nav aria-labelledby="footer-pages">
				<h2 id="footer-pages">Pages</h2>
				<ul>
					<li><a href="/map" class="footer-link">Map</a></li>
					<li><a href="/review" class="footer-link">Review</a></li>
					<li><a href="/tricks" class="footer-link">Tricks</a></li>
					<li><a href="/sources" class="footer-link">Sources and credits</a></li>
				</ul>
			</nav>
			<nav aria-labelledby="footer-agents">
				<h2 id="footer-agents">For agents</h2>
				<ul>
					<li><a href="/#agents" class="footer-link">Agent skills</a></li>
					<li><a href="/llms.txt" class="footer-link">llms.txt</a></li>
					<li><a href="/sitemap.xml" class="footer-link">Sitemap</a></li>
				</ul>
			</nav>
			<nav aria-labelledby="footer-made">
				<h2 id="footer-made">Made by</h2>
				<ul>
					<li>
						<a href="https://mia.cx" class="footer-link underline">Mia</a>, with AI (<a href="https://0rwx.com" class="footer-link underline">AI:W</a>)
					</li>
					<li><a href="https://github.com/mia-cx/free-game" class="footer-link">Source on GitHub</a></li>
					<li>Built with <a href="https://github.com/mia-cx/svartz" class="footer-link underline">Svartz</a></li>
				</ul>
			</nav>
		</div>
	</div>
</footer>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		border-bottom: 1px solid var(--line);
		background: var(--paper);
	}

	.site-footer {
		border-top: 1px solid var(--line);
		background: var(--surface);
		color: var(--muted);
		font-size: 0.95rem;
		line-height: 1.55;
		& h2 {
			font-size: 0.75rem;
			font-weight: 750;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			color: var(--ink);
		}
		& :is(ol, ul) {
			margin-top: 0.75rem;
			display: grid;
			gap: 0.35rem;
		}
		& > div > div:first-child > a {
			color: var(--ink);
		}
	}
	.footer-link {
		color: var(--ink);
		text-underline-offset: 4px;
		&:hover {
			text-decoration: underline;
		}
	}

	.nav-link {
		font-weight: 600;
		white-space: nowrap;
		text-underline-offset: 6px;
		&:hover,
		&[aria-current='page'] {
			text-decoration: underline;
			text-decoration-thickness: 2px;
		}
	}
	.badge {
		display: inline-grid;
		place-items: center;
		min-width: 1.45rem;
		height: 1.45rem;
		margin-left: 0.3rem;
		padding-inline: 0.35rem;
		border-radius: 999px;
		background: var(--accent);
		color: var(--accent-ink);
		font-size: 0.875rem;
		line-height: 1;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		vertical-align: 0.1em;
	}
</style>
