<script lang="ts" module>
	/** Who makes Earshot, as the footer credits her: the author and publisher in structured data. */
	export const maker = { '@type': 'Person', name: 'Mia', url: 'https://mia.cx' };

	/** Describes the course share image, `static/og.png`. */
	const IMAGE_ALT = 'Earshot: a free marketing course for builders with ADHD';
</script>

<script lang="ts">
	import { page } from '$app/state';

	/**
	 * A page's search and share metadata: title, description, canonical URL, Open Graph and
	 * structured data. The origin comes from `prerender.origin` in `vite.config.ts` (env `SITE_URL`).
	 * Every page is indexable except error pages, which pass `noindex`. Every page of
	 * a staging build is noindex, so staging never competes with the live site in search.
	 * `crumbs` mirrors the visible trail above the page (module, then lesson) as a BreadcrumbList.
	 * Lessons pass `type="article"` and their own share `image`, described by `imageAlt`.
	 */
	let {
		title,
		description,
		noindex = false,
		type = 'website',
		crumbs = [],
		schema = [],
		markdown,
		image: imagePath = '/og.png',
		imageAlt = IMAGE_ALT
	}: {
		title: string;
		description?: string;
		noindex?: boolean;
		type?: 'website' | 'article';
		crumbs?: { name: string; href: string }[];
		schema?: object[];
		/** The page's Markdown copy, linked so an agent reading the page finds it. */
		markdown?: string;
		/** Path of a 1200x630 share image. */
		image?: string;
		imageAlt?: string;
	} = $props();

	const hidden = $derived(noindex || page.url.hostname.startsWith('staging.'));
	const absolute = (path: string) => new URL(path, page.url.origin).href;
	const canonical = $derived(absolute(page.url.pathname));
	const image = $derived(absolute(imagePath));
	const all = $derived(
		crumbs.length
			? [
					...schema,
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: crumbs.map((c, i) => ({
							'@type': 'ListItem',
							position: i + 1,
							name: c.name,
							item: absolute(c.href)
						}))
					}
				]
			: schema
	);
	// `<` is escaped so content can never close the script tag early.
	const json = (data: object) =>
		`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}<\/script>`;
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}<meta name="description" content={description} />{/if}
	{#if hidden}
		<meta name="robots" content="noindex" />
	{:else}
		<meta name="robots" content="max-image-preview:large" />
		<link rel="canonical" href={canonical} />
		{#if markdown}<link rel="alternate" type="text/markdown" href={markdown} />{/if}
		<meta property="og:type" content={type} />
		<meta property="og:site_name" content="Earshot" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:title" content={title} />
		{#if description}<meta property="og:description" content={description} />{/if}
		<meta property="og:url" content={canonical} />
		<meta property="og:image" content={image} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content={imageAlt} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image:alt" content={imageAlt} />
		{#each all as data, i (i)}
			{@html json(data)}
		{/each}
	{/if}
</svelte:head>
