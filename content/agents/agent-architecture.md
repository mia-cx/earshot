---
title: Design an always-on agent
order: 8
description: Design an agent that filters noise, works ahead, keeps context lean and never blocks you.
---

> [!TLDR]
> - Drop most incoming events with cheap rules; send only the ambiguous ones to the model.
> - Let the agent start likely work early, and keep its replies short in chat and structured everywhere else.
> - Treat the context window as a cache: IDs and summaries inline, pointers to the rest. Models get worse as their context fills.
> - Run long tools in the background, keep the agent's state in the cloud, and build delegation into the structure instead of asking for it.

## Filter with rules, then the model

Most incoming events need no action. **Drop noise with cheap, fixed rules first** (source, channel, allowlists). Send only the ambiguous candidates to the model, where you can edit the policy in plain language.

For each source, set one of three modes:

> [!FORM] Your agent's filters
> 1. Which sources should it respond to only on explicit requests?
> 2. Which sources should it treat as candidate events?
> 3. Which sources should it ignore?

The same split applies to choosing models: route easy requests to a fast, cheap path and escalate only the hard ones to a reasoning model. Lingjiao Chen, Matei Zaharia and James Zou showed with [FrugalGPT](https://arxiv.org/abs/2305.05176) that a chain of cheap-then-expensive models can match the best model's results for up to 98% less. Suraj Sharma's checklist frames it as resolving about 95% cheaply and escalating 5%; he gives no evidence for the split.

Route only once you can measure. [OpenAI's agent guide](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) says to build with the strongest model first, test it, then swap in cheaper models where the results hold.

## Work ahead, and speak in the channel's format

Use spare compute to start likely work in the background, so you only review a finished draft. Discard what isn't needed.

- On a meeting invite or to-do: check calendar conflicts, gather background, draft the reply. You review and send.
- On a reported issue: try to reproduce and fix it silently. Speak only once it's confirmed.

Match what the agent says to where it says it, and keep its reasoning and tool logs out of shared spaces.

> [!TRICK] Output rules per channel
> - Chat: notify only when a decision or sign-off is needed, ask direct questions, give short conclusions. Hard rule: max 100 words per reply. DeepSeek calls the cap "simple, effective" and says they verified it internally.
> - GitHub, email, docs: dense and structured (background, what changed, verification results).

## Treat the context window as a cache

Keep what the model needs soon in context, and leave the long tail outside behind a pointer.

Anthropic's [context guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) treats context as a budget: every token added makes the model a little worse at recalling the rest. Its agents keep "lightweight identifiers" such as file paths and links, and load the content only when needed. [Liu and colleagues found](https://arxiv.org/abs/2307.03172) that models are worst at using facts placed in the middle of a long input, so a bigger window doesn't fix a stuffed one.

> [!TRICK] Build context in three layers
> 1. Start with the current object's ID and a summary.
> 2. Add related objects' IDs and nearby content: the first 50 characters, surrounding messages, the message it replies to.
> 3. Cut long content at a small cap and leave a pointer to where it continues.
>
> Give every object (event, thread, task) an ID and list related IDs, so the agent can follow links hop by hop to recover old context. DeepSeek calls this "Chain of Recall".

## Never block the conversation

A blocking tool call leaves the agent deaf until it finishes. Run long tools in the background instead: replace `run()` with `start()` (returns "Started" at once) and `stop()`, and deliver results as new messages. DeepSeek has built this but hasn't turned it on by default.

Pair that with durable state so a crash or multi-day approval doesn't wipe out a run. Sharma suggests a durable workflow engine like Temporal, which resumes a crashed run where it stopped. Anthropic [built the same](https://www.anthropic.com/engineering/multi-agent-research-system) for its research agents because "agents are stateful and errors compound", making a restart from scratch slow and costly. One catch: a step that was mid-call when the run crashed [starts again from the beginning](https://docs.temporal.io/activities), so make every paid or outbound step safe to repeat. Check for its earlier result before you pay or send again.

Keep the agent in the cloud and its tools where they live. Store state in a database, run on stateless cloud compute, and reach your machines through a thin daemon. Your laptop sleeping no longer stops it, and a reconnecting device runs its queued tasks.

Anthropic calls this ["decoupling the brain from the hands"](https://www.anthropic.com/research/managed-agents): the agent's history sits in a log outside the model, so a crashed agent restarts from where it was, and logins stay in a vault the model never sees. DeepSeek's prototype is [on GitHub](https://github.com/deepseek-ai/dsh-superagent-prototype) (not an official product).

> [!RISK] One compromised loop reaches every machine
> If the cloud loop is compromised, every device connected to it can be taken over. Give each connection the least access it needs and keep credentials out of the model's context; see *Keep bots from doing damage*.

## Build delegation into the structure

Telling a single agent to delegate is unreliable, because it decides case by case whether a job is "small". Anthropic says the same of its own agents: they're "not yet great at coordinating and delegating to other agents in real time".

In DeepSeek's test, a neutral prompt delegated in 0 of 5 runs and a delegation-first prompt in 4 of 5. The one run where it called the work "small" was the slowest. The workload was synthetic and the authors call it indicative only.

Fix it in the structure, not the prompt: give the coordinator no tools to do the work, and give workers only their own threads. See *Put a coordinator over your bots* for the timings and the solo version of this split.

> [!DO] Write your agent's filter table
> Fill in your agent's filters above: put every source your agent watches (inboxes, channels, repos, calendars) under one mode, then download it.

> [!CHECK] In an always-on agent, what three modes can you set for each incoming source?
> Respond only to explicit requests, treat as candidate events, or ignore.

> [!CHECK] A tool your always-on agent calls takes ten minutes. How should it run?
> In the background: it returns "Started" at once and delivers the result later as a new event. A blocking call leaves the agent deaf until it finishes.

> [!CHECK] Why build delegation into an agent's structure instead of telling it to delegate?
> An agent told to delegate decides case by case whether work is "small", so it often doesn't. Give the coordinator no tools to do the work, and it has to delegate.

## Sources

- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Anthropic: Scaling Managed Agents, decoupling the brain from the hands](https://www.anthropic.com/research/managed-agents)
- [Nelson F. Liu et al., *Lost in the middle: how language models use long contexts* (2023)](https://arxiv.org/abs/2307.03172)
- [Lingjiao Chen, Matei Zaharia, James Zou, *FrugalGPT* (2023)](https://arxiv.org/abs/2305.05176)
- [OpenAI: A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- [Temporal docs: Activities](https://docs.temporal.io/activities)
- [@DeepSeekHarness: super-agent architecture](https://x.com/DeepSeekHarness/status/2116857257245987236)
- [@suraj_sharma14: model routing and durable workflows](https://x.com/suraj_sharma14/status/2118682313479573689)
