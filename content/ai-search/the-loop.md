---
title: Fix why AI skips you
order: 2
description: Diagnose a lost AI prompt, make one fix, and rerun to see if it moved.
---

> [!TLDR]
> - Run AI visibility as an experiment: same prompts, one change, rerun. In a controlled study, adding evidence to a page raised its share of AI answers by 30 to 40%.
> - When you don't appear, find which of four causes applies before you write anything new.
> - AI leans on other people's pages. Sort every source it cites into own, claim, earn or contest; each needs a different action.

## Change one thing, then rerun

**AI visibility improves through small, measured experiments, not through publishing more.** [Pranjal Aggarwal and colleagues](https://arxiv.org/abs/2311.09735) ran exactly this test (KDD 2024): they rewrote source pages one method at a time and measured how much of each page the AI answer used. Adding quotations, statistics or cited sources raised visibility by 30 to 40%. Keyword stuffing didn't help, and the biggest gains went to pages ranked lower in search. Their engine and queries were a benchmark, not your market, so rerun your own prompts to check.

Keep a fixed set of real buying prompts (see *Track the questions buyers ask AI*) so every check is comparable. Answers vary from run to run, so rerun each prompt several times before you call a change.

> [!TRICK] The experiment loop
> 1. Run your saved prompts in each AI separately: ChatGPT, Google's AI answers, and so on.
> 2. Record brands recommended and sources cited in separate columns.
> 3. Find the prompts that name competitors but not you.
> 4. Read the sources cited again and again across those answers, to see what evidence they rely on.
> 5. Make one specific change: improve your own page, or pitch the cited page.
> 6. Rerun the same prompts. Track visibility and activated users.
> 7. Double down on what moved.

## Diagnose before you create

When you lose a prompt, the reflex is to write a new article. Most lost prompts don't need one. Work out the cause first:

| Cause | Sign | Fix |
| --- | --- | --- |
| Missing page | No page of yours answers the question | Create one |
| Weak page | A page exists but answers only part of it | Improve that page; don't publish a second on the same question |
| Crawl or index problem | The page exists but AI and Google can't reach it | Fix it technically (see *Get your site found at all*). Allow OAI-SearchBot and PerplexityBot |
| Third-party problem | AI draws on Reddit threads, review sites, articles and directories that barely mention you | Work those sources (next section) |

The crawl cause is written down by the engines themselves. [OpenAI says](https://developers.openai.com/api/docs/bots) sites that block OAI-SearchBot "will not be shown in ChatGPT search answers". [Perplexity](https://docs.perplexity.ai/guides/bots) asks you to allow PerplexityBot. [Google](https://developers.google.com/search/docs/appearance/ai-features) only links pages that are indexed and eligible for a snippet.

Granola, the AI meeting-notes company, ran this diagnosis on every lost prompt. [Discovered Labs](https://discoveredlabs.com/case-studies/granola), the agency that did the work, reports that from January to August 2026 monthly new active users from AI search rose 4,600%, non-branded AI citation rate 558%, non-branded mention rate 739%, and organic sessions 134%. The citation and mention rates come from the agency's own tool. Read them as direction, not promise.

> [!DIAGRAM] ai-loop

> [!TRICK] Read the searches the assistant runs
> Assistants turn your question into several hidden web searches. [OpenAI](https://help.openai.com/en/articles/9237897-chatgpt-search) says ChatGPT rewrites it into "one or more targeted queries", and Google calls the same move "query fan-out". About ten per question is TheoAGI's estimate. In ChatGPT or Claude, open the "searching" step under the answer to read them. Each search is a page you need, or a site you need to be on.

## Sort the sources AI trusts

For a third-party problem, the question is not "how do we get more backlinks?" It is "which sources shape this specific recommendation, and why are competitors better represented there?"

**You need both your own pages and other people's.** [Mahe Chen and colleagues at the University of Toronto](https://arxiv.org/abs/2509.08919) found AI search has "a systematic and overwhelming bias" toward earned, third-party sources over brands' own sites. [An audit by Dmitrij Żatuchin](https://arxiv.org/abs/2606.25787) of 131,512 citations in answers about brands found 82.4% pointed away from the brand's sites. Both studies observe patterns; neither tests what causes a citation.

TheoAGI quotes one vendor's dataset (44,070 citations across 10 brands): 85% went to third-party pages and under 4% to the brand's own site, but brands whose own site got cited were named far more often. That dataset isn't published, so treat the second half as one vendor's observation.

> [!TRICK] Own, claim, earn, contest
> Label each source AI cites for a buyer question by who controls it:
>
> | Label | What it is | Action |
> | --- | --- | --- |
> | OWN | Pages you control | Improve them directly |
> | CLAIM | Profiles and listings you can take over (review sites, directories) | Claim and complete them |
> | EARN | Editorial mentions, reviews, community threads | Deserve them: see *Give people a reason to link* |
> | CONTEST | Outdated or wrong information about you | Get it corrected |

> [!TRICK] Correct what AI gets wrong about you
> 1. Write a dated fact sheet: price, plans, platforms.
> 2. Ask each engine about your product and compare its answers with the sheet.
> 3. Trace each wrong claim to the page it came from, and get it fixed there.
> 4. Call it fixed only when the wrong claim has been gone two months in a row.

> [!DO] Diagnose one lost prompt
> Pick one buyer question where AI names competitors but not you. Open every source it cites, label each own, claim, earn or contest in your sheet, and write which of the four causes applies.

> [!CHECK] When AI names competitors for a buyer question but not you, what are the four possible causes?
> A missing page, a weak page, a crawl or index problem, or a third-party problem. Each needs a different fix, so diagnose before you write anything new.

> [!CHECK] AI keeps citing a review-site profile of your company that you never filled in. How do you label it in own, claim, earn, contest, and what do you do?
> Claim: take the profile over and complete it.

> [!CHECK] When you work on AI visibility, why make one change and then rerun the same saved prompts?
> It shows you which change moved the result. Answers vary from run to run, so only the same prompts, rerun several times, make the before and after comparable.

## Sources

- [Pranjal Aggarwal et al., *GEO: Generative Engine Optimization* (2024)](https://arxiv.org/abs/2311.09735)
- [Mahe Chen, Xiaoxuan Wang, Kaiwen Chen and Nick Koudas, *Generative Engine Optimization: How to Dominate AI Search* (2025)](https://arxiv.org/abs/2509.08919)
- [Dmitrij Żatuchin, *Cited Web Sources in LLM Answers about Brands: A Multilingual Audit* (2026)](https://arxiv.org/abs/2606.25787)
- [OpenAI: Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [OpenAI: ChatGPT search](https://help.openai.com/en/articles/9237897-chatgpt-search)
- [Perplexity: Perplexity crawlers](https://docs.perplexity.ai/guides/bots)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Discovered Labs: How Granola grew monthly activated users from AI search 4,600%](https://discoveredlabs.com/case-studies/granola)
- [@wespreadjam: Granola's diagnose-then-fix loop and own/claim/earn/contest](https://x.com/wespreadjam/status/2115568290307469548)
- [@wespreadjam: Ramp's rerun-and-measure experiments](https://x.com/wespreadjam/status/2117333079106932897)
- [@borjafat: finding gaps in AI recommendations](https://x.com/borjafat/status/2116164330014007296)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
