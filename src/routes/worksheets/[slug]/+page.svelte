<script lang="ts">
	import Seo from '#lib/Seo.svelte';
	import Worksheet from '#lib/Worksheet.svelte';

	let { data } = $props();

	const sheet = $derived(data.worksheet);
	const form = $derived({ id: sheet.slug, title: sheet.title, questions: sheet.questions, sheet: sheet.questions });
</script>

<Seo title="{sheet.title}: a worksheet that becomes an agent prompt · Earshot" description={sheet.summary} />

<article class="mx-auto mt-8 max-w-[40rem]">
	<h1 class="text-4xl leading-[1.08] font-[800] tracking-tight text-balance sm:text-5xl">{sheet.title}</h1>
	<p class="mt-3 text-lg text-muted">{sheet.summary}</p>
	<div class="mt-8">
		<Worksheet {form} agent={{ skill: sheet.skill, task: sheet.task }} />
	</div>
</article>
