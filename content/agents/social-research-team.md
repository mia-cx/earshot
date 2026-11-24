---
title: Build a social research team
order: 7
description: Set up research bots that share one folder and send you a weekly shortlist.
---

> [!TLDR]
> - Run several narrow research bots on schedules. Each writes to its own file in one shared folder.
> - A head bot reads every file and sends you the 5 best ideas each Monday. Writing and posting stay with you.
> - Add one bot at a time, and only once the last one works.
> - Studying only hits misleads you. Compare each outlier with similar videos that flopped before you copy it.
> - The prompts below use Virlo as the data source. Swap in any source your agent can read; the structure stays the same.

## Share one folder, not one chat

The team is a set of bots that never talk to each other directly. **They talk through files.** Each bot reads a shared brief, does one research job on a schedule, and writes its findings to its own file. A head bot reads all of them and turns them into your plan.

Anthropic's [research agents](https://www.anthropic.com/engineering/multi-agent-research-system) work this way: each subagent saves its work and passes back a link, so nothing gets lost in a chain of summaries. Anthropic's [context guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) recommends the same for any long job: notes in files outside the model, read back when needed.

The folder is `social/`, with these files:

- `brief.md`: what you sell, who buys, off-limits claims, your goal
- `outliers.md`, `niche.md`, `competitors.md`, `trends.md`, `comments.md`: one per research bot
- `templates.md`, `voice.md`, `creators.md`, `lessons.md`: used by the video and outreach bots
- `log.md`: what you actually made, so ideas don't repeat

The design rules are worth copying into any agent you build:

- Read free data before paying for searches.
- Stay silent on days with nothing new.
- Mark "why it worked" as opinion; the data only shows that it did.
- Cite sample sizes, and call any pattern under 6 videos "early". Six is the author's rule, not a statistical test, but the instinct is right: Amos Tversky and Daniel Kahneman showed that people [trust small samples](https://doi.org/10.1037/h0031322) far more than they should.

> [!RISK] The author sells the data source
> The prompts come from Virlo's co-founder, with no results reported. Virlo is a paid database that says it holds 21.6M+ viral TikTok, Instagram and YouTube Shorts videos. The prompts also call Virlo tools (marketing agents, Virality Score) and Grok Bot features (skills, routines) that may change.
>
> To stay portable, swap each "On Virlo" or "from Virlo" line for whatever your agent can reach: another data tool, Meta's public Ad Library for ads, or files you export by hand.

## Wire it into your agent tool

Any agent tool that can connect to data, save a repeatable skill and run on a schedule will do. The author uses Grok Bot.

> [!TRICK] Connect the data source and save each bot
> Connect a data source over MCP (the author's prompt for Virlo):
> ```
> Add a custom MCP server called virlo at https://dev.virlo.ai/api/mcp/mcp
>
> Ask me for my Virlo API key in a private input, and send it
> as the header Authorization: Bearer [key]
>
> Then read https://dev.virlo.ai/agent-playbook.txt and list
> your tools.
> ```
> For each bot: create a new bot, paste its prompt with the brackets filled, correct its first draft, then send:
> ```
> Save what we just did as a skill.
> Then set up the routine from your first message.
> ```
> Rollout, one or two a day:
> - Day 1: Head of Social + Outlier Finder
> - Day 2: Niche Map + Teardown
> - Day 3: Pipeline + Comment Miner
> - Day 4: Trend Radar + Competitor Watch
> - Day 5: Analyst
> - Creator Scout on demand
>
> Teardown, Pipeline and Analyst are in *Reuse formats that already work*; Creator Scout is in *Do the work first, then ask*.

## Start with a head and an outlier finder

The head bot interviews you once, writes the shared brief, and each Monday scores ideas for fit, ease and novelty. The Outlier Finder feeds it videos that did far better than their creator's size. That hints the format did some of the work, though it can't rule out luck or timing, so the finder also looks for similar videos that flopped.

> [!RISK] Outliers hide the failures
> Study only winners and risky choices look like the cause of success, because everyone who tried the same move and failed is out of view. Jerker Denrell's research on [learning from successes](https://ora.ox.ac.uk/objects/uuid:a8102a34-f7a4-40de-91c0-139355f97358) shows this trap. Before copying an outlier, ask the bot for 5 videos in your niche using the same hook or format that flopped. If they exist, the format didn't do the work alone.

> [!TRICK] Head of Social bot
> ```
> JOB
> Run my social media team and turn what the other bots find
> into a plan for my week. Writing and posting stay with me.
>
> SET UP ONCE
> - Look through [website] and [TikTok, Instagram, YouTube and
>   X handles].
> - Ask me questions, one per message, until you're clear on
>   what I sell, who buys it, which claims are off limits, and
>   the result I want from content: [calls, signups, sales].
> - Save the answers to social/brief.md for the other bots.
> - Draft a weekly Virlo marketing agent for my niche: a
>   one-line goal, 7 to 12 search phrases, terms to leave out,
>   all 3 platforms, AI video breakdown on. Hold it until I
>   say yes.
>
> MONDAYS, 9 A.M.
> - Go through the agent's newest report, which costs nothing
>   to read, and everything in social/.
> - Rate each idea out of 10 for fit, how easily I could shoot
>   it this week, and whether it's new for us (see
>   social/log.md).
> - Send me your best 5 in one message: the idea, its source
>   video, how far it outperformed, the format, its first line
>   and a suggested day.
>
> WEEKDAYS, 8 A.M.
> A 5-line update: new finds, decisions for me, blockers.
>
> DATA
> Every number comes from Virlo. When the newest report hasn't
> landed, tell me and wait for it.
> ```

> [!TRICK] Outlier Finder bot
> ```
> JOB
> Spot the videos in my niche that took off for their size.
> Weekdays, 7 a.m.
>
> STEPS
> - Read social/brief.md.
> - Open the outliers from my Virlo marketing agent. They're
>   free to read, so check them before spending anything.
> - Run a single Virlo search for [topic]: TikTok and
>   Instagram, past week, outliers only, Virality Score 18+,
>   creators under [100,000] followers, [language]. One page.
> - Drop paid posts and anything already in
>   social/outliers.md.
> - For each pick, run one more one-page search for its hook
>   or format without the outlier filter, to find the ones
>   that flopped.
>
> SEND ME 5, HIGHEST SCORE FIRST
> - Link, creator, followers, views and score.
> - First line, hook type and format.
> - Your best guess at why it took off.
> - Up to 3 videos in my niche with the same hook or format
>   that flopped, and what differs. If the search can't
>   return weak videos, say so. Never report that none
>   flopped.
> - Whether my business could shoot it this week.
>
> Add them to social/outliers.md. On a day with nothing new,
> stay silent.
> ```

## Map the niche and watch rivals

The Niche Map runs monthly and shows who owns your topic and which formats nobody does well. Competitor Watch runs weekly and turns each change a rival makes into a test idea. It sorts their ads oldest first, because the ads they've kept running are the ones they keep paying for.

> [!TRICK] Niche Map bot
> ```
> JOB
> Show me who's winning in [topic] and which formats are up
> for grabs. Run now, then on the 1st of each month.
>
> STEPS
> - Read social/brief.md.
> - On Virlo, look up the 20 biggest creators for this topic
>   across TikTok, Instagram and YouTube, with followers,
>   typical views, biggest video and breakout count.
> - Label each one brand or person. Star anyone under
>   [100,000] followers with several breakouts.
> - For the top 10, pull their outliers and note the hook
>   types and formats they come back to.
>
> SEND ME
> - A table of all 20.
> - The 5 most common formats.
> - 3 formats that fit my business and that few of them are
>   doing well.
>
> Save it as social/niche.md and mark your opinions as
> opinions.
> ```

> [!TRICK] Competitor Watch bot
> ```
> JOB
> Keep an eye on [up to 5 handles] and the ads from [brands].
> Mondays, 8 a.m.
>
> SET UP ONCE
> Track those handles on Virlo and change the check from daily
> to weekly. Confirm when it's done.
>
> STEPS
> - Read social/brief.md.
> - Read this week's tracking signals, which are free.
> - For each handle, note outliers, any hook or format they've
>   reused, and changes in posting pace.
> - Pull each brand's live Meta ads with the copy, start date
>   and landing page, oldest first. Old ads are the ones
>   they've kept paying for.
>
> SEND ME
> Each change with its link, plus one idea I could test from
> it. Save it as social/competitors.md.
> ```

## Sort trends and mine comments

Trend Radar judges each trend on one test: whether your buyer would care. Size doesn't matter. Comment Miner collects your audience's exact words under the week's best videos, so each video you make answers a real comment.

> [!TRICK] Trend Radar bot
> ```
> JOB
> Sort this week's trends into make or skip for my business.
> Mondays, 7 a.m.
>
> PULL FROM VIRLO
> - Content trends: formats being copied now, with stage,
>   creator count this week, and what to keep or change.
> - Topic trends: today's and emerging stories in [region].
> - Sounds: most used and breakouts from the past 7 days.
>
> STEPS
> - Read social/brief.md.
> - Keep formats, topics and sounds in separate lists.
> - Mark each one MAKE or SKIP. Size doesn't matter here, only
>   whether my buyer would care.
>
> SEND ME
> For each MAKE: an example link, its stage, and what we'd
> actually shoot. Flag any sound that isn't in TikTok's
> Commercial Music Library for [region] and the placements I
> plan to use. Save it as social/trends.md.
> ```

> [!RISK] Trending sounds may not be licensed
> On TikTok, [businesses can't use the general music library](https://ads.tiktok.com/help/article/commercial-music-library?lang=en) for commercial posts, ads included. Use a track you've licensed yourself, or a song from the Commercial Music Library of pre-cleared songs. [Its songs vary by region and by placement](https://ads.tiktok.com/help/article/how-to-use-the-commercial-music-library), so check the song is available in your campaign's region and for the placement you plan. The prompt flags likely problems, but check the licence before you post.

> [!TRICK] Comment Miner bot
> ```
> JOB
> Collect what my audience says under viral videos. Mondays,
> 7:30 a.m.
>
> STEPS
> - Read social/brief.md.
> - Pick this week's 5 strongest videos from
>   social/outliers.md.
> - Pull their top comments from Virlo.
> - Sort them under: questions, complaints, requests, and
>   phrases I should reuse.
>
> SEND ME
> Each list with the original wording untouched and the video
> link, then 5 video ideas that each answer a specific
> comment. Save it as social/comments.md.
> ```

> [!FORM] Your social brief
> 1. What do we do? What problem do we solve? Give one short, precise answer.
> 2. Target audience: who exactly are we for?
> 3. Which claims are off limits?
> 4. Which result do we want from content: calls, signups or sales?

> [!DO] Write social/brief.md
> Fill in your social brief above: what you sell, who buys it, claims that are off limits, and the result you want from content. Download it as Markdown and save it as `brief.md` in a new `social/` folder. Every bot reads this file first.

> [!CHECK] In a team of social research bots, how do the bots share their work?
> Through files in one shared folder. Each bot writes to its own file, and a head bot reads them all and sends you the best ideas.

> [!CHECK] A research bot finds a pattern across 4 of your videos. How should it report it?
> With the sample size, marked as early, since any pattern under 6 videos is early. Its reason why it worked is marked as opinion.

> [!CHECK] Why should a bot watching competitors sort their ads oldest first?
> The oldest ads are the ones they've kept paying for. That's a better signal than a new ad, but not proof it works: some ads run because nobody switched them off.

## Sources

- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Jerker Denrell, *Vicarious learning, undersampling of failure, and the myths of management* (2003)](https://ora.ox.ac.uk/objects/uuid:a8102a34-f7a4-40de-91c0-139355f97358)
- [Amos Tversky, Daniel Kahneman, *Belief in the law of small numbers* (1971)](https://doi.org/10.1037/h0031322)
- [TikTok: About the Commercial Music Library](https://ads.tiktok.com/help/article/commercial-music-library?lang=en)
- [TikTok: How to use the Commercial Music Library](https://ads.tiktok.com/help/article/how-to-use-the-commercial-music-library)
- [@dsqjaffa: scheduled social research bots sharing one folder](https://x.com/dsqjaffa/status/2119160045263077664)
