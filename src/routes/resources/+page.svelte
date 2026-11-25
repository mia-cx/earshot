<script lang="ts">
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();
</script>

<Seo
	title="Resources: {data.count} marketing tools for builders · Earshot"
	description="The SEO, outreach, launch and video tools the Earshot lessons use, what each one does, what it costs, and the lesson that shows you how."
/>

<div class="resources-page">
	<h1>Resources</h1>
	<p class="lede">
		{data.count} tools the lessons use, grouped by module. Each links to the lesson that shows you how to use it. Where the
		person recommending a tool also sells it, the note says so.
	</p>
	<p class="lede">
		Long lists stay in their lessons: launch sites and directories in
		<a href={data.lists.launch.href}>{data.lists.launch.title}</a>, and local listings in
		<a href={data.lists.local.href}>{data.lists.local.title}</a>.
	</p>

	{#each data.modules as module (module.slug)}
		<section aria-labelledby="tools-{module.slug}" data-hue style="--hue: {module.hue}">
			<h2 id="tools-{module.slug}">
				<a href={module.href}><span class="number">{module.number}</span> {module.title}</a>
			</h2>
			<ul class="tools">
				{#each module.tools as tool (tool.name)}
					<li>
						<h3>
							<a href={tool.url} target="_blank" rel="noopener">{tool.name}</a>
							{#if tool.price}<span class="price">{tool.price}</span>{/if}
						</h3>
						<p>{tool.what}</p>
						{#if tool.note}<p class="note">{tool.note}</p>{/if}
						<a href={tool.lesson.href} class="from">In: {tool.lesson.title}</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style>
	.resources-page {
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
		& a {
			color: var(--ink);
			text-decoration: underline;
			text-underline-offset: 4px;
		}
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

	.tools {
		margin-top: 1rem;
		display: grid;
		gap: 1.75rem;
		& h3 {
			display: flex;
			flex-wrap: wrap;
			align-items: baseline;
			gap: 0.25rem 0.75rem;
			font-weight: 750;
			font-size: 1.1rem;
			& a {
				text-decoration: underline;
				text-decoration-color: var(--accent);
				text-underline-offset: 4px;
				&:hover {
					text-decoration-color: currentColor;
				}
			}
		}
		& p {
			margin-top: 0.25rem;
			line-height: 1.5;
		}
	}

	.price,
	.note {
		font-size: 0.9rem;
		color: var(--muted);
	}

	.from {
		display: inline-block;
		margin-top: 0.35rem;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: underline;
		text-decoration-color: var(--line);
		text-underline-offset: 3px;
		&:hover {
			text-decoration-color: currentColor;
		}
	}
</style>
