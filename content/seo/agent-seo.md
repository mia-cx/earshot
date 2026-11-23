---
title: Let an agent run your SEO
order: 8
description: Give an SEO agent real data, hard limits and a deploy check, and vet its skills.
---

> [!TLDR] An SEO agent guesses when it lacks data and acts on what it's allowed to, so give it real data and enforce its limits outside the model.
> - Numbers come from your tools, never from the model.
> - Sort every action into allowed, needs approval, and never alone. Enforce the "never" in code, not in the prompt.
> - Snapshot your key pages before every deploy and compare after, for the four changes that quietly kill a site.
> - Test an SEO skill or tool before you trust it, and read its files before you install it.

## Numbers come from tools

**Every number must come from a tool the agent called or a page it fetched.** Models happily invent search volumes and click counts. OpenAI's researchers [explain why](https://openai.com/index/why-language-models-hallucinate/): training and benchmarks "reward guessing over acknowledging uncertainty", and rare facts like your page's clicks can't be predicted from patterns. If the agent can't check a number, it writes "not checked".

> [!TRICK] Catch a model that makes up numbers
> Ask the agent for your top 5 pages by clicks over the last 3 months, then compare with Search Console → Performance → Pages. If the lists differ, it's guessing. Connect Search Console first: mcp-gsc (AminForou/mcp-gsc on GitHub) is a free local connector that's read-only by default.

## Give it three permission tiers

An agent with more permissions than its job needs does damage when it misreads a task or follows instructions hidden in a page it read. OWASP calls this [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). Its fixes include minimum permissions, human approval for high-impact actions, and limits enforced outside the model.

| Tier | Actions |
| --- | --- |
| Allowed | Read data, write drafts |
| Needs your approval | Publish, change a title |
| Never on its own | Delete a page, change robots.txt or a canonical |

For anything that needs approval, you see the diff first.

**Put the "never" tier in a hook, not the prompt.** A hook is a small script your agent tool runs before every action, and it can refuse the action. In Claude Code, a [`PreToolUse` hook](https://code.claude.com/docs/en/hooks) blocks a tool call by exiting with code 2. A line in the prompt is only a request. *Keep bots from doing damage* covers where to set approval gates.

## Check the site after every deploy

**Four silent changes can kill a site with no error anyone sees.** Each sends Google a signal: [`noindex`](https://developers.google.com/search/docs/crawling-indexing/robots/intro) removes a page, a [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) can make Google show another URL in its place, and robots.txt stops crawling.

- A page turns noindex.
- A canonical starts pointing somewhere else.
- A page that returned 200 now returns 404.
- robots.txt blocks everything.

> [!TRICK] Snapshot before, compare after
> Before every deploy, have the agent save each key page's status code, robots meta tag and canonical, plus the live robots.txt. After the deploy, fetch them again and list every difference. If any of the four changes shows up, roll back first and investigate second.

## Grade drafts before they ship

Give drafts a scorecard, not a vibe check. The best skill TheoAGI read scores 8 areas out of 5 each, and passes a draft at 32 out of 40 with no area under 3. *Check the work before it ships* covers the fresh-eyes review around it.

## Test a skill before you trust it

Free SEO skills and repos for agents are everywhere, and GitHub stars don't tell you whether the advice is current. TheoAGI found a repo with 11,000 stars that gets ChatGPT's crawler wrong.

> [!TRICK] The one-question test for an SEO tool
> Ask it: "Which bot decides whether my site shows up in ChatGPT search?" [OpenAI's docs](https://developers.openai.com/api/docs/bots) say OAI-SearchBot. GPTBot only collects training data. If the tool gets this wrong, check the rest of its advice against primary docs too.
>
> TheoAGI's two picks after reading 14 repos: RomeoSEO/seo-skills (the clearest method, MIT licence, nothing sold inside) and AgriciDaniel/claude-seo (the most precise technical checks; it adds a link to a paid community after big reports).

> [!TRICK] The ten most-starred AI SEO repos, checked
> Nicholas Dulait (co-founder of ChatSEO, which sells an SEO agent) ranked these by GitHub stars on 21 November 2026. Verdicts on the middle six are TheoAGI's; the other four were checked for this course.
>
> | Repo | What it is | Verdict |
> | --- | --- | --- |
> | coreyhaines31/marketingskills | Marketing skills for agents, SEO included | Passes the bot question. Ignore its HowTo schema advice |
> | AgriciDaniel/claude-seo | 26 SEO skills for Claude Code | Install. Use the page, technical and schema commands |
> | every-app/open-seo | Open-source Semrush and Ahrefs | Once you have data. Needs paid data |
> | zubair-trabzada/geo-seo-claude | AI-citation audits | Take only its live robots.txt check. Fails the bot question |
> | Ryze-AI-Adgent/open-seo-mcp-skills | SEO tools for agents (MCP) | Short skills. Your data goes through their hosted connector |
> | TheCraigHewitt/seomachine | Long-form post workspace | Keep the context files. Drop the keyword density target and any fictional stories |
> | nowork-studio/notfair-plugin | SEO and marketing skills | A solid page audit, through their hosted server. Overrates FAQ markup |
> | yaojingang/GEOFlow | AI articles published across many sites | See the risk below |
> | ericosiu/ai-marketing-skills | Growth, sales and content skills | SEO is one folder of many. No AI crawler guidance |
> | AgriciDaniel/claude-blog | Answer-first blog writer from claude-seo's author | Gets FAQ and HowTo markup right. Ignore its 100-point score |
>
> Whichever you install, check every change it makes in Search Console.

> [!RISK] Scores and installers
> - Some tools give your site a score out of 100. TheoAGI found that none of the three that do had checked their weights against real rankings or citations. Read the findings and ignore the number.
> - Read every file of a skill or repo before you install it. One popular SEO repo installs by piping a script from its main branch straight into your shell (`curl | bash`), so whatever is on that branch runs on your machine.
> - Tools that mass-produce AI articles across many sites, like GEOFlow, can run you into what Google's spam policies call scaled content abuse: many pages made mainly to rank, not to help anyone. Publish only pages you would write by hand.

Two companies that sell SEO tools, Distribb and ChatSEO, wrote most of the articles behind this playbook. TheoAGI says so.

> [!DO] Run the number test
> Ask your agent for your top 5 pages by clicks over the last 3 months, then compare its list with Search Console → Performance → Pages. Write down whether they match.

> [!CHECK] Which bot decides whether your site shows up in ChatGPT search?
> OAI-SearchBot. GPTBot only collects training data, so blocking it doesn't remove you from ChatGPT search.

> [!CHECK] Where do you put the rule that an SEO agent must never change robots.txt?
> In a hook, a script that runs before every action and can refuse it. A line in the prompt is only a request.

> [!CHECK] Which four changes do you look for after every deploy?
> A page turns noindex, a canonical points somewhere else, a 200 becomes a 404, and robots.txt blocks everything.

## Sources

- [Adam Kalai and others, OpenAI, *Why language models hallucinate* (2025)](https://openai.com/index/why-language-models-hallucinate/)
- [OWASP GenAI Security Project: LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
- [Claude Code docs: Hooks reference](https://code.claude.com/docs/en/hooks)
- [Google Search Central: Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Search Central: Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [OpenAI: Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
- [@NicholasDulait: the top 10 AI SEO repos on GitHub](https://x.com/NicholasDulait/status/2124496217233314057)
