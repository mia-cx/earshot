---
title: Be the page AI quotes
order: 3
description: Publish a page per buying decision, join the right threads, and list for agents.
---

> [!TLDR]
> - AI splits a question into narrower searches, so a page built for one buyer segment has a specific search to match.
> - Where AI barely mentions you, write one page per buyer segment for that decision, backed by comparison pages.
> - Join only the Reddit threads your tracked buyer questions surface, and contribute before you link.
> - Publish an agent skill for your API so AI assistants can find and use your product.

## Write one page per decision and buyer

**A small business and a large one ask the same question with different needs, so each deserves its own answer.** AI search doesn't run your buyer's question as typed. [OpenAI says](https://help.openai.com/en/articles/9237897-chatgpt-search) ChatGPT rewrites it into "one or more targeted queries", adding context such as location. [Google](https://developers.google.com/search/docs/appearance/ai-features) describes "query fan-out": "issuing multiple related searches across subtopics".

A page written for one segment's version of the decision matches one of those narrower searches directly. Pick a category where your AI visibility is low, check what AI already cites there, and write dedicated pages for each buyer segment.

> [!TRICK] The Ramp pattern
> 1. Pick one category with a low baseline. Ramp had 3.2% AI visibility in accounts payable.
> 2. Study what AI already cites. For Ramp: automation, AI and software-comparison content. Only 6% of Ramp's citations came from automation content, which showed the gap.
> 3. Write one page per segment: "accounts payable software for small businesses" and "accounts payable software for large businesses".
> 4. Support them with related pages: accounts payable automation software comparisons, and AI in accounts payable.
>
> Reported result from [Profound's case study](https://www.tryprofound.com/customers/ramp-case-study) (the vendor whose tool Ramp used): the two pages earned 300+ citations in one month, visibility rose from 3.2% to 22.2%, and Ramp moved from 19th to 8th among fintech brands in the category.

> [!RISK] The "one month" doesn't match the charts
> Profound's copy says one month, yet its own charts span 1 December 2024 to 15 February 2025, about ten weeks. The page names no AI engines or prompt counts, so you can't rerun its measurement. Expect a slower, smaller result.

The commercial pages themselves live in *Build the pages buyers check before paying*.

## Join only the threads your questions point to

Reddit threads are among the third-party sources AI cites. In [one vendor's data](https://arxiv.org/abs/2606.20065) (correlational, from its own clients), Reddit ranked among the most-cited sources after company sites and YouTube. Let your tracked buyer questions pick where you show up: when a thread is cited for a question you track, join that one instead of posting everywhere.

Share what the community would value even without your link, and contribute before you promote. Answer on Reddit and Quora as yourself, and say you work on the product. TheoAGI's rule of thumb: mention your company in at most one answer per subreddit per week, and always put each subreddit's own rules first. The wider community list lives in *Find your first 100 users*.

> [!RISK] Links without context are spam
> On Reddit and Hacker News, a link dropped without context gets treated as spam. Answer the question in full in the thread, and add your link only where it genuinely helps.

## Make your product usable by agents

AI assistants look for tools they can use on a person's behalf. If your product has an API, give agents instructions for using it and list them where assistants look.

[Anthropic's Agent Skills docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) explain how discovery works: at startup the agent reads only each skill's `name` and `description`, and "the `description` is what Claude matches your request against". That matching only runs once the skill is installed in the user's agent, so a public listing makes your skill easy to install; it doesn't put it in front of Claude for everyone. Write the description in the words a user would type, saying what your skill does and when to use it.

> [!TRICK] List an agent skill on skills.sh
> 1. Write a `SKILL.md` that tells an agent how to use your API, with a `description` that names the task and when to use it. Claude can write it for you.
> 2. Put it in a public GitHub repo.
> 3. Run this once:
>
> ```
> npx skills add your-org/your-repo
> ```
>
> You get a dedicated page on Vercel's skills.sh (the author cites it as DR 82) with your skill, its install command and an install counter.
>
> The author, a staff engineer with several SaaS products, says Claude now sends them "multiple customers a day" through integrations. One person's report.

> [!FORM] Your segment pages
> 1. Which category does AI name you least in?
> 2. Who is the first buyer segment, and what is the exact page title for it? For example, "X for small teams".
> 3. Who is the second buyer segment, who decides differently, and what is the exact page title for it? For example, "X for enterprises".

> [!DO] Name your two segment pages
> Pick the category where AI names you least and fill in your segment pages above: the two buyer segments who decide differently in it, and the exact page title for each. Then download it.

> [!CHECK] How do you list your API as an agent skill on skills.sh?
> Write a `SKILL.md` that tells an agent how to use your API, put it in a public GitHub repo, and run `npx skills add your-org/your-repo` once.

> [!CHECK] AI rarely names you for "accounts payable software". What pages do you write?
> One page per buyer segment, such as "accounts payable software for small businesses" and "for large businesses", supported by related comparison pages.

> [!CHECK] On Reddit, why answer a question in full before you add your link?
> A link dropped without context gets treated as spam. The full answer is what the community values, and the link only helps where it adds something.

## Sources

- [OpenAI: ChatGPT search](https://help.openai.com/en/articles/9237897-chatgpt-search)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Profound: How Ramp increased AI brand visibility 7x in accounts payable](https://www.tryprofound.com/customers/ramp-case-study)
- [Pratyush Kumar, *Generative Engine Optimization at Scale* (2026)](https://arxiv.org/abs/2606.20065)
- [Anthropic: Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [@wespreadjam: Ramp's pages per buying decision](https://x.com/wespreadjam/status/2117333079106932897)
- [@wespreadjam: Granola's Reddit targeting from tracked questions](https://x.com/wespreadjam/status/2115568290307469548)
- [@2whazzuup: links without context on Reddit and Hacker News](https://x.com/2whazzuup/status/2119247229601062993)
- [@tarasshyn: listing an agent skill on skills.sh](https://x.com/tarasshyn/status/2119165493470974378)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
