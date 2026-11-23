<script lang="ts">
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();
</script>

<Seo
	title="Sources and credits: {data.posts} posts by {data.authors.length} people · Earshot"
	description="Every study, book, guide and post the Earshot course stands on, lesson by lesson, and the people who shared what worked for them on X."
/>

<div class="sources-page">
	<h1>Sources and credits</h1>
	<p class="lede">
		Earshot stands on {data.research} studies, books, guides and essays, and {data.posts} posts by
		{data.authors.length} people who shared what worked for them on X. Every lesson links its sources; here they are in
		one place.
	</p>

	<section aria-labelledby="people">
		<h2 id="people">The people</h2>
		<ul class="people">
			{#each data.authors as handle (handle)}
				<li><a href="https://x.com/{handle}" target="_blank" rel="noopener">@{handle}</a></li>
			{/each}
		</ul>
	</section>

	{#each data.modules as module (module.slug)}
		<section aria-labelledby="sources-{module.slug}" data-hue style="--hue: {module.hue}">
			<h2 id="sources-{module.slug}">
				<a href={module.href}><span class="number">{module.number}</span> {module.title}</a>
			</h2>
			{#each module.lessons as lesson (lesson.id)}
				<div class="lesson-sources">
					<h3><a href={lesson.href}>{lesson.title}</a></h3>
					{@html lesson.sources}
				</div>
			{/each}
		</section>
	{/each}
</div>

<style>
	.sources-page {
		max-width: 46rem;
		margin-inline: auto;
	}

	h1 {
		font-size: clamp(2.25rem, 6vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.05;
	}

	.lede {
		margin-top: 1rem;
		font-size: 1.15rem;
		line-height: 1.55;
		color: var(--muted);
	}

	section {
		margin-top: 4rem;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		& a:hover {
			text-decoration: underline;
			text-underline-offset: 5px;
		}
	}

	.number {
		color: var(--accent);
	}

	.people {
		margin-top: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		& a {
			display: inline-block;
			padding: 0.3rem 0.7rem;
			border-radius: 999px;
			background: var(--surface);
			font-size: 0.9rem;
			font-weight: 650;
			&:hover {
				background: var(--line);
			}
		}
	}

	.lesson-sources {
		margin-top: 1.75rem;
		& h3 {
			font-weight: 750;
			& a:hover {
				text-decoration: underline;
				text-underline-offset: 4px;
			}
		}
		& :global(ul) {
			margin-top: 0.4rem;
			display: grid;
			gap: 0.25rem;
			font-size: 0.95rem;
			color: var(--muted);
		}
		& :global(a[href^='http']) {
			text-decoration: underline;
			text-decoration-color: var(--line);
			text-underline-offset: 3px;
			&:hover {
				color: var(--ink);
				text-decoration-color: currentColor;
			}
		}
	}
</style>
