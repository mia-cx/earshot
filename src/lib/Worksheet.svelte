<script lang="ts">
	import { answers } from './answers.ts';
	import type { Form, Question } from './course.ts';
	import { downloadFile } from './download.ts';

	/**
	 * A lesson's `[!FORM]` worksheet: one answer field per question, saved in this browser as the
	 * reader types (`answers.ts`). A question an earlier lesson asked shows that answer, and editing
	 * it here edits it everywhere. The export holds the sheet so far: this form's questions plus every
	 * answered question that forms with the same title ask. In a lesson, "Check my work" copies a
	 * review prompt with the lesson and the sheet for the reader's own AI assistant. On a goal
	 * worksheet (`server/worksheets.ts`), "Copy prompt for your agent" fills a fixed template that
	 * hands the answers to one of the course's skills.
	 */
	type Agent = { skill: { name: string; href: string }; task: string };
	let { form, ...props }: { form: Form } & ({ lesson: { href: string } } | { agent: Agent }) = $props();
	const lesson = $derived('lesson' in props ? props.lesson : undefined);
	const agent = $derived('agent' in props ? props.agent : undefined);

	const answer = (q: Question) => $answers[q.id]?.trim() ?? '';

	const exported = () => {
		const asked = new Set(form.questions.map((q) => q.id));
		const questions = form.sheet.filter((q) => asked.has(q.id) || answer(q));
		const lessons = [...new Map(questions.map((q) => [q.lesson.href, q.lesson])).values()].map((l) => ({
			title: l.title,
			url: `${location.origin}${l.href}`
		}));
		return { questions, lessons };
	};

	const markdown = () => {
		const { questions, lessons } = exported();
		return `${[
			`# ${form.title}`,
			`From ${lessons.map((l) => `[${l.title}](${l.url})`).join(', ')} in Earshot.`,
			...questions.flatMap((q, i) => [`## ${i + 1}. ${q.text}`, answer(q) || '_No answer yet._'])
		].join('\n\n')}\n`;
	};

	const download = () => downloadFile(`${form.id}.md`, markdown(), 'text/markdown');

	const escape = (text: string) =>
		text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

	/** The answers as a standalone page, printed from a hidden frame so the PDF holds only the worksheet. */
	const printable = () => {
		const { questions, lessons } = exported();
		return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escape(form.title)}</title>
<style>
	body { font: 12pt/1.55 system-ui, sans-serif; color: #1d1b18; max-width: 40rem; margin: 2rem auto; }
	h1 { font-size: 20pt; margin: 0; }
	.from { color: #6b655c; margin: 0.25rem 0 2rem; }
	section { break-inside: avoid; margin-top: 1.5rem; }
	h2 { font-size: 12pt; margin: 0; }
	p { white-space: pre-wrap; margin: 0.4rem 0 0; }
	.blank { color: #6b655c; font-style: italic; }
	a { color: inherit; }
</style></head><body>
<h1>${escape(form.title)}</h1>
<p class="from">From ${lessons.map((l) => `${escape(l.title)} (${escape(l.url)})`).join(', ')} in Earshot</p>
${questions
	.map(
		(q, i) =>
			`<section><h2>${i + 1}. ${q.html}</h2>${answer(q) ? `<p>${escape(answer(q))}</p>` : '<p class="blank">No answer yet.</p>'}</section>`
	)
	.join('\n')}
</body></html>`;
	};

	const REVIEW_PROMPT = `You're reviewing my worksheet from Earshot, a free marketing course for builders. The lesson comes first, then my answers.

Review my answers against the lesson:
1. For each answer, say in one or two sentences what is strong and what is vague or wrong.
2. Name anything the lesson teaches that my answers miss or contradict.
3. Rewrite my weakest answer to show what a strong one looks like, using only facts I gave you. Ask me for anything you'd need to know.
4. End with the one next step that would help most.

Be direct and specific. Skip praise that doesn't teach me anything.`;

	let checkStatus: 'idle' | 'copied' | 'empty' | 'failed' = $state('idle');
	/** The agent prompt, shown to select and copy by hand when the clipboard is blocked. */
	let fallback = $state('');

	/** The review prompt: the lesson's Markdown copy (written by Svartz beside the page) and the sheet so far. */
	const reviewPrompt = async (href: string) => {
		const response = await fetch(`${href}.md`);
		if (!response.ok) throw new Error(`${response.status} for ${href}.md`);
		return `${REVIEW_PROMPT}\n\n<lesson url="${location.origin}${href}">\n${(await response.text()).trim()}\n</lesson>\n\n<my-answers>\n${markdown().trim()}\n</my-answers>\n`;
	};

	/** The agent prompt: a fixed template naming the skill and its task, then the sheet so far. */
	const agentPrompt = ({ skill, task }: Agent) => `Use the ${skill.name} skill to ${task}

If you don't have the skill, read ${location.origin}${skill.href}, or install all of Earshot's skills with \`npx skills add ${location.origin}\`.

My answers from Earshot's "${form.title}" worksheet are below. Before you start, ask me about anything I left blank or answered too vaguely to work from.

<my-answers>
${markdown().trim()}
</my-answers>
`;

	/** Copies the review or agent prompt. Nothing leaves the browser until the reader pastes it. */
	const copyPrompt = async () => {
		if (!exported().questions.some(answer)) {
			checkStatus = 'empty';
			return;
		}
		const text = 'agent' in props ? Promise.resolve(agentPrompt(props.agent)) : reviewPrompt(props.lesson.href);
		const prompt = text.then((t) => new Blob([t], { type: 'text/plain' }));
		fallback = '';
		try {
			// The write starts inside the click and takes the prompt as a promise, so Safari keeps the
			// click's permission to use the clipboard while the lesson downloads.
			await navigator.clipboard.write([new ClipboardItem({ 'text/plain': prompt })]);
			checkStatus = 'copied';
		} catch (error) {
			console.error('Worksheet: could not copy the prompt', error);
			checkStatus = 'failed';
			if ('agent' in props) fallback = agentPrompt(props.agent);
		}
	};

	const print = () => {
		const frame = document.createElement('iframe');
		frame.style.cssText = 'position: fixed; width: 0; height: 0; border: 0;';
		frame.srcdoc = printable();
		frame.onload = () => {
			const view = frame.contentWindow;
			if (!view) return;
			view.addEventListener('afterprint', () => frame.remove());
			view.print();
		};
		document.body.append(frame);
	};
</script>

<!-- On a goal worksheet the page's own heading names the sheet, so the form carries only its label. -->
<form
	class="worksheet"
	aria-labelledby={lesson ? `${form.id}-title` : undefined}
	aria-label={lesson ? undefined : form.title}
	onsubmit={(e) => e.preventDefault()}
>
	{#if lesson}
		<p class="worksheet-kind">Fill it in</p>
		<h3 id="{form.id}-title" class="worksheet-title">{form.title}</h3>
	{/if}
	<ol>
		{#each form.questions as question, i (question.id)}
			{@const id = `${form.id}-${question.id}`}
			<li>
				<label for={id}>{@html question.html}</label>
				{#if !lesson}
					{#if question.lesson.href !== form.questions[i - 1]?.lesson.href}
						<p class="first-asked">From <a href={question.lesson.href}>{question.lesson.title}</a></p>
					{/if}
				{:else if question.lesson.href !== lesson.href}
					<p class="first-asked">First asked in <a href={question.lesson.href}>{question.lesson.title}</a></p>
				{/if}
				<textarea
					{id}
					rows="2"
					value={$answers[question.id] ?? ''}
					oninput={(e) => answers.setKey(question.id, e.currentTarget.value)}
				></textarea>
			</li>
		{/each}
	</ol>
	<div class="worksheet-actions">
		<button type="button" onclick={copyPrompt}>{agent ? 'Copy prompt for your agent' : 'Check my work'}</button>
		<button type="button" onclick={download}>Download Markdown</button>
		<button type="button" onclick={print}>Save as PDF</button>
		<span>Saved in this browser as you type.</span>
	</div>
	<p class="check-status" role="status">
		{#if checkStatus === 'copied' && agent}
			Copied the prompt with your answers. Paste it into your coding agent,
			<a href="https://claude.ai/new" target="_blank" rel="noopener">Claude</a> or
			<a href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a>.
		{:else if checkStatus === 'copied'}
			Copied the lesson and your answers. Paste them into
			<a href="https://claude.ai/new" target="_blank" rel="noopener">Claude</a> or
			<a href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a> for feedback.
		{:else if checkStatus === 'empty'}
			{agent ? 'Answer at least one question, then copy the prompt.' : 'Answer at least one question, then check your work.'}
		{:else if checkStatus === 'failed'}
			{agent
				? 'Couldn’t copy. Select the prompt below and copy it.'
				: 'Couldn’t copy. Download the Markdown and give it to your AI assistant with a link to this lesson.'}
		{/if}
	</p>
	{#if fallback}
		<textarea class="fallback" readonly aria-label="Prompt for your agent" value={fallback} onfocus={(e) => e.currentTarget.select()}
		></textarea>
	{/if}
</form>

<style>
	.worksheet {
		padding: 1.25rem 1.4rem 1.4rem;
		border: 1px solid var(--accent-line);
		border-radius: 14px;
		background: color-mix(in oklch, var(--accent-soft) 45%, var(--paper));
	}

	.worksheet-kind {
		font-size: 0.75rem;
		font-weight: 750;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.worksheet-title {
		margin-top: 0.35rem;
		font-size: 1.2rem;
		font-weight: 800;
	}

	ol {
		display: grid;
		gap: 1.5rem;
		.worksheet-title + & {
			margin-top: 1.25rem;
		}
		padding: 0;
		list-style: none;
		counter-reset: question;
	}

	li {
		counter-increment: question;
		margin: 0;
	}

	label {
		display: block;
		font-weight: 650;
		line-height: 1.45;
		&::before {
			content: counter(question) '. ';
			color: var(--accent);
			font-weight: 800;
		}
	}

	.first-asked {
		margin-top: 0.15rem;
		font-size: 0.875rem;
		color: var(--muted);
		& a {
			color: inherit;
			text-decoration: underline;
		}
	}

	textarea {
		display: block;
		width: 100%;
		min-height: 3.2lh;
		margin-top: 0.5rem;
		padding: 0.6rem 0.75rem;
		field-sizing: content;
		resize: vertical;
		font: inherit;
		line-height: 1.5;
		color: var(--ink);
		background: var(--paper);
		border: 1px solid var(--field-line);
		border-radius: 10px;
		&:focus-visible {
			outline-offset: 0;
			border-color: var(--accent);
		}
	}

	.worksheet-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1.5rem;
		& button {
			padding: 0.55rem 1.1rem;
			border-radius: 999px;
			font-weight: 700;
			background: var(--accent);
			color: var(--accent-ink);
			&:hover {
				filter: brightness(1.1);
			}
		}
		& button + button {
			background: var(--paper);
			color: var(--ink);
			border: 1px solid var(--line);
		}
		& span {
			font-size: 0.875rem;
			color: var(--muted);
		}
	}

	.fallback {
		max-height: 16rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
	}

	.check-status {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		&:empty {
			display: none;
		}
		& a {
			text-decoration: underline;
		}
	}
</style>
