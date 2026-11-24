---
title: Run marketing as code
order: 1
description: Turn one weekly marketing chore into a scheduled agent that reports back to you.
---

> [!TLDR]
> - Use the simplest system that does the job. Most weekly chores need fixed steps that call AI only where a step needs it, not a full agent.
> - A coding agent with access to your data and channels can run one channel as a loop that learns from its own results.
> - Start with a weekly manual report: write every step, let an agent run it, approve the output yourself.
> - Bigger pipelines, like research tools and pain-point-to-ad machines, are the same idea with more steps.
> - Most posts selling this setup also sell the product that does it. Copy the pattern, judge the claims.

## Start with the simplest system

People mix up two words. An automation follows fixed steps and calls a model at each step that needs one, sometimes several calls in a row. If no step needs a model, it's a plain script. An agent gets a goal and picks its own steps and tools. Anthropic's guide [*Building effective agents*](https://www.anthropic.com/engineering/building-effective-agents) draws the same line and says to find "the simplest solution possible", which may mean no agent at all.

Reach for an agent only when fixed steps fall short. [OpenAI's agent guide](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) gives three signs: the job needs judgement, its rules are too messy to maintain, or it reads unstructured text like emails and reviews. Otherwise, fixed steps are cheaper and more predictable.

**Marketing as code** means software runs the work through APIs and scripts, then reads the results and adjusts. Don't automate everything at once. Pick one channel and build a loop that improves from its own performance data.

> [!TRICK] Give the agent the environment it needs
> Cody Schneider lists what a coding agent needs to run a brand's marketing:
> - a data pipeline and a data warehouse
> - a cloud runtime for hosting, object storage and cron jobs
> - API access to all ad channels, the CMS, and so on
> - a git remote so several people can ship to it
> - generation tools: an image model (he names "chatgpt image 2.5"), Seedance for video, word-by-word transcription
>
> He builds Graphed, which sells this setup. Treat the list as a checklist, not proof it pays off.

## Automate the Monday report first

Start with the report someone builds by hand every week. One author claims about half a marketing team's hours go to building reports (unverified), and automating it is a fast way to get noticed inside a company.

> [!TRICK] Build the Monday report
> - Put the numbers in a dashboard: Looker Studio or Metabase.
> - The report compares last week with the week before, explains what changed and suggests the next test.
> - AI writes the summary. A Slack bot posts it before anyone logs in.
>
> Only the summary needs AI. The dashboard and the posting are fixed steps, so this report is an automation with one AI step.

The same shape works for any weekly manual task, such as checking what competitors changed.

> [!TRICK] Turn a weekly task into a scheduled agent
> Example Monday schedule:
> - 8:00 check 10 competitors' sites and socials
> - 8:05 detect changes (prices, products, posts)
> - 8:10 compare with last week
> - 8:15 write a one-page report with 3 moves worth making
> - 8:20 the report lands in your inbox before the team sees it
>
> Steps:
> 1. Pick one weekly manual task.
> 2. Write every step, including the decisions a person makes.
> 3. Build the agent. The author names Claude Code, Grok Bot and Hermes Agent; any agent tool that can run on a schedule works.
> 4. Route results to yourself for approval first.
> 5. Run it 2 to 3 weeks, fix what breaks, count the hours saved.

Once one of these runs cleanly, other businesses with the same chore may pay for it. See *Turn the skill into income*.

## Research before you write

An agent can do the reading you skip. Matt Epstein's agency runs an internal tool, Script Studio, inside Claude Code before writing launch copy. It isn't public, but every step is something you can ask your own agent to do.

> [!TRICK] Copy the research tool's steps
> - Read every call transcript and doc the brand provided.
> - Search X and score every post against the median of its own search results, so you study outliers, not averages.
> - Pull Reddit threads, reviews and competitor material, and save each as a cited "receipt".
> - Build a page of objections with sources, so the script answers doubts people already have.
> - Write five hooks from different angles and test them against a library of past winning launches.

## Scale to a pain-point-to-ad pipeline

Cody Schneider describes a six-step pipeline he says replaces a researcher, designer, editor, copywriter, media buyer and analyst. His headline is "1,000 on-brand ads for a couple hundred dollars". It's unverified, and he sells the product.

> [!TRICK] The six steps
> 1. An agent scrapes Reddit for customer pain points into one big markdown file.
> 2. Each pain point becomes a static ad via GPT Image 2 through kie (kie.ai, an API reseller).
> 3. Seedance generates avatar videos on the same angles.
> 4. fal transcribes every word; motion graphics are cut in (he names "tesseract"; it's unclear which tool he means).
> 5. Everything uploads to Meta and Google Ads through their APIs.
> 6. Each ad is tracked to revenue in the warehouse, and you make more of what works.

> [!RISK] Volume without review burns budget
> A thousand generated ads can spend real money on weak creative, and the brand fit is claimed, not shown. Review a sample before upload, cap spend per ad set, and scale only the angles step 6 proves. See *Run paid ads you can measure* for the tracking step 6 depends on.

## Publish a benchmark if you sell AI

If you sell an AI system, one reproducible benchmark is a credible marketing asset: compare your system with the naive approach on cost, speed and task success. DeepSeek's super-agent write-up shows the form: a small table (4 designs, 5 runs each, typical and worst-case times, token cost) with honest caveats.

Nobody in these sources reports results from doing this as marketing, so treat it as an idea to test.

> [!FORM] Your first agent brief
> 1. Which report or check do you do by hand every week?
> 2. List every step in order, including each decision you make, like "skip it if the price didn't change".

> [!DO] Write down your weekly report as steps
> Pick the one report or check you do by hand every week and fill in the brief above: every step in order, including each decision you make. Then download it. That doc is the agent's first brief.

> [!CHECK] What is the difference between a marketing automation and a marketing agent, and which do you reach for first?
> An automation follows fixed steps. An agent gets a goal and works out the steps. Start with the automation, and use an agent only where a step needs judgement or reads messy text.

> [!CHECK] You want your first marketing agent. What do you start with, and how?
> A report or check you do by hand every week. Write every step including your decisions, have the agent send the results to you for approval, and run it 2 to 3 weeks before you trust it.

> [!CHECK] Why review a sample before uploading a thousand AI-generated ads?
> Volume can spend real money on weak creative. Review, cap spend per ad set, and scale only the angles tracked to revenue.

## Sources

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [OpenAI: A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- [@codyschneider: the environment a coding agent needs for marketing](https://x.com/codyschneider/status/2119173056673309041)
- [@codyschneider: pain-point-to-ad pipeline](https://x.com/codyschneider/status/2119429831163027708)
- [@mattepstein: research tool for outliers, objections and hooks](https://x.com/mattepstein/status/2117351855856779486)
- [@korzhov_dm: automating the Monday report](https://x.com/korzhov_dm/status/2118984106335756532)
- [@kunalvg: building a marketing function](https://x.com/kunalvg/status/1697157671567470819)
- [@notkvtwts: scheduled agent for a weekly manual task](https://x.com/notkvtwts/status/2115810173830750575)
- [@notkvtwts: AI business guide](https://x.com/notkvtwts/status/2116886564802576703)
- [@suraj_sharma14: publishing a benchmark](https://x.com/suraj_sharma14/status/2118682313479573689)
- [@DeepSeekHarness: super-agent design and ablation table](https://x.com/DeepSeekHarness/status/2116857257245987236)
