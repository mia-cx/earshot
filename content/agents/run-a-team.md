---
title: Put a coordinator over your bots
order: 6
description: Add one bot that reads the others' work and sends you a daily page of decisions.
---

> [!TLDR]
> - A coordinator pays off when your bots do separate jobs. Jobs that share decisions belong in one bot.
> - Put one coordinator over your bots. It reads their output and tells you what needs you; it never does the work.
> - Bots hand off a file and a five-part note, never a whole chat.
> - Bots stay silent when nothing changed, and every Friday each routine earns a keep or a kill.
> - When you become the bottleneck, the next move is a human hire, not another bot.

## One coordinator that never does the work

Twelve bots reporting straight to you is the same mistake as twelve direct reports. Split the roles: **one long-lived coordinator talks to you and routes work, and never executes tasks itself.** Each worker owns one job and reports back through it. Kyle Hunt calls his version a chief of staff: "air traffic control, not the entire airport."

The split pays off on separate jobs, at a token cost. Anthropic uses it in [its research agents](https://www.anthropic.com/engineering/multi-agent-research-system), where a lead agent with subagents beat a single agent by 90.2% on its internal test, using about 15 times the tokens of a chat.

Anthropic also names where it breaks: jobs where agents need the same context, or where steps depend on each other. As Cognition's Walden Yan [warns](https://cognition.com/blog/dont-build-multi-agents), every action carries decisions, and parallel agents make decisions that clash. Give the coordinator independent jobs (an audit, a call summary, a month-end report) and keep one piece of work inside one bot.

DeepSeek's team built the same split into an always-on agent called Router/Worker. The router handles human conversation and dispatch, and can run on a lighter model with no shell. Its workers write code, so each gets isolated context, a full set of execution tools and usually the strongest model, and never messages people directly. A marketing worker gets only the tools its job needs. In their test (a synthetic workload, 5 runs each, which they call indicative only), Router/Worker finished in a median 12.4 minutes, using more tokens. Left to choose, a single agent with a subagent tool took 20.4 minutes because it never delegated. Told to delegate, it took 13.8, though its slowest tasks still ran to 29 minutes.

> [!TRICK] Chief-of-staff bot prompt
> ```
> Role: you are my chief of staff bot. You never do the work yourself. You read what my other bots made and tell me what needs me.
>
> When you run: every weekday at 7am, before I open anything else.
>
> Read everything new since your last run:
> - [Auditor drafts folder]
> - [Call notes page]
> - [Check-in drafts]
> - [Month-end sheet, on the 1st]
> - The group chat, for anything a bot flagged
>
> Send me one page through [the Slack webhook or mail connector that reaches only my own channel or inbox]. If you have neither, save it to [folder] instead. Put things in this order:
> 1. What needs my decision today. For each one: 1 problem, 3 options, 1 recommendation
> 2. Drafts sitting in my review pile, oldest first, with links
> 3. Anything off: a missing file, a number that moved more than [20]% since last week, a bot that skipped its run
> 4. Every client or member still waiting on a reply from me, and anyone who hasn't been touched in [5] business days
>
> Skip anything that's fine.
>
> Every Friday, add one line per routine: runs, clean runs, how many times I had to fix it, and keep or kill. If I wouldn't notice it gone, say so.
>
> Handoffs between bots: the job, a link to the file, what's decided, what's still open, who's next.
>
> Rules:
> - Stay under [250] words. Link to the work, never paste it in.
> - If a bot skipped its run, that goes first.
> - You can message the other bots in the group chat to chase a missing piece.
> - Ask me first before you contact a client or edit another bot's instructions.
> ```
> The chief of staff reads private drafts built from other people's emails and pages, so it gets no tool that picks a recipient: only a webhook or connector that reaches you (see the lethal trifecta in *Keep bots from doing damage*). The folders it reads belong to the worker bots: the Auditor below, the Call Notes bot (*Turn one conversation into ten posts*), and the Check-ins and Month-End bots (*Keep and convert*).

> [!DIAGRAM] bot-team

## A worker to start with: the Auditor

If you sell audits, proposals or diagnostics, the first draft is a good worker job. The bot ties every finding to the client's own numbers; you spend your review time tracing those numbers.

> [!TRICK] Auditor bot prompt
> ```
> Role: you are my Auditor. You write the first version of every [audit / proposal / diagnostic] I sell.
> Read first: every past audit in [Drive folder], my framework doc [link], and this client's intake answers.
> When you run: when I message you "start audit for [client]".
> Done looks like: my report template, with every finding tied to one of the client's own numbers. Cover every area in my framework, then rank the fixes, so this client gets their own order and not my standard one.
> Tag each finding high, medium or low confidence, and list anything you couldn't check.
> Save every draft to [Drive folder]. You have no email, chat, upload or web tool; I send everything to the client myself.
> Ask me first before you quote a price or fill a gap with an assumption.
> ```
> - Hunt's framework covers 8 areas: strategy, delivery, client management, team, quality, recruiting, operations, financials.
> - Spend your 30 review minutes tracing every number back to the client's file.

## Hand off files, and stay quiet otherwise

When one bot hands off to another, pass the file and a five-part note: the job, a link to the file, what's decided, what's still open, who's next. Whole chats and chained summaries pass stale ideas along until nobody has read the original.

Make each bot read the source document, not just the last bot's summary. Anthropic's subagents save their work and pass back a link, which Anthropic found "prevents information loss". The "what's decided" line carries the choices Yan warns get lost.

Stay quiet when nothing changed. A routine that pings you with no news trains you to mute it, so you miss the day it matters. In a study of doctors' alerts, [Jessica Ancker and colleagues found](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/) the chance of acting on a reminder dropped by 30% for each extra reminder in the same visit. Give every bot the line "If nothing changed since your last run, send me nothing." DeepSeek's agent works the same way: it watches event streams and speaks only when it has news.

## Keep, kill, or hire

- Prune weekly. The Friday line in the prompt above scores every routine on runs, clean runs and fixes, and kills any you wouldn't miss. Hunt spent his first 90 days as a COO building processes the team never asked for.
- Watch for drift, not just crashes. Long-running agents fail by looping or wandering off the goal while still "running". DeepSeek adds a separate watchdog agent on a schedule that judges each worker's progress, retries transient failures, and can be asked in plain language why something failed. The solo version is the chief of staff putting skipped runs first.
- Hire when **the constraint is you**. Bots raise a solo operator's ceiling but don't remove it. Hunt made his first hire, a Head of Operations, after about 19 months solo.

> [!DO] Write your coordinator's reading list
> List every bot, report or inbox that produces work for you. Paste the list into the "Read everything new" section of the chief-of-staff prompt, and set the time it runs.

> [!CHECK] In a team of bots, what does the coordinator do, and what does it never do?
> It reads the other bots' output, routes work, and tells you what needs you. It never does the work itself.

> [!CHECK] Your bots work well, but finished work keeps waiting on your review. What's the next move?
> Hire a person. When the constraint is you, another bot won't remove it.

> [!CHECK] Why should a scheduled bot send nothing when nothing changed?
> A routine that pings you with no news trains you to mute it, and then you miss the day it matters.

## Sources

- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Walden Yan, *Don't build multi-agents* (2025)](https://cognition.com/blog/dont-build-multi-agents)
- [Jessica S. Ancker et al., *Effects of workload, work complexity, and repeated alerts on alert fatigue in a clinical decision support system* (2017)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)
- [@huntkyle: chief-of-staff bot, Auditor bot, handoffs and pruning](https://x.com/huntkyle/status/2118086670918750341)
- [@DeepSeekHarness: Router/Worker design, silence and drift watchdog](https://x.com/DeepSeekHarness/status/2116857257245987236)
- [@addyosmani: reading the original, not the summary](https://x.com/addyosmani/status/2117512471930167377)
