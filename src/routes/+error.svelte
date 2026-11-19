<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/Seo.svelte';

	const heading = $derived(page.status === 404 ? '404: Page not found' : `${page.status}: Something went wrong`);
	const message = $derived(
		page.status === 404 ? "This page doesn't exist. Maybe it never did." : (page.error?.message ?? 'Please try again later.')
	);
</script>

<Seo title="{heading} · Earshot" noindex />

<div class="mx-auto max-w-2xl py-12 sm:py-20">
	<h1 class="text-4xl font-[800] tracking-tight">{heading}</h1>
	<p class="mt-6 text-lg text-muted">{message}</p>
	<div class="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-semibold">
		<a href="/foundations/attention-is-the-job" class="underline underline-offset-4">Start lesson 1</a>
		<a href="/map" class="underline underline-offset-4">Open the map</a>
	</div>
</div>
