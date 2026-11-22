---
title: Track the questions buyers ask AI
order: 1
description: Build a list of buyer questions and log who AI recommends for each one.
---

> [!TLDR]
> - AI rarely gives the same answer twice. Measure visibility by how often you appear across many runs of a buyer question, not your spot in one answer.
> - Map the decisions buyers make before paying, and turn each into a Google keyword and an AI prompt.
> - Track Google and each AI separately: they pick sources differently.
> - Log brands and URLs each AI cites weekly, and judge success by customers.

## Start from buying decisions

**Your unit of measurement is a question a buyer asks before choosing, asked many times.** "What's the best meeting notes app for a sales team?" tells you more than the keyword "meeting notes app", because it carries the decision.

You ask it many times because AI answers drift. [Rand Fishkin at SparkToro and Patrick O'Donnell at Gumshoe](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/) had 600 volunteers run 12 prompts nearly 3,000 times in ChatGPT, Claude and Google's AI. ChatGPT and Google's AI had under a 1 in 100 chance of naming the same brands twice, yet strong brands still appeared in most runs. Fishkin's conclusion: how often you appear across many runs is probably a fair measure, and a "ranking position in AI" isn't. The study isn't peer reviewed, and O'Donnell sells AI tracking.

List the decisions people make before buying something like yours. Take the wording from your inbox, sales calls and reviews, not your head. Turn each one into a Google keyword and an AI prompt, then check where you show up for both. A short list of real decisions beats hundreds of prompt variations.

For each question, ask:

- Who gets recommended today?
- Which pages are being cited?
- Do we have a page that fully answers the question?

## Track Google and each AI separately

A page can climb in Google and barely move in ChatGPT, or gain AI mentions while organic traffic stays flat. [Mahe Chen and colleagues at the University of Toronto](https://arxiv.org/abs/2509.08919) found AI engines pick sources very differently from Google, and from each other. Assume good SEO means good AI visibility and you'll miss both gaps, so keep two sets of numbers.

Search Console won't split them for you: Google counts [AI Overviews and AI Mode traffic](https://developers.google.com/search/docs/appearance/ai-features) inside the ordinary "Web" report.

**Each AI needs its own column too.** In one Ramp test, Claude passed on an exact offer with its link and step-by-step instructions, Perplexity mentioned it vaguely, and ChatGPT read the same pages but mentioned the offer 0 times in 32 days.

The public examples in this module come from Granola (meeting notes) and Ramp (finance software). They are relayed by AI-search vendors that sell audits or citation outreach, crediting other people's work, so treat their numbers as directional.

> [!TRICK] Count the AI bots that visit
> 1. Open your server or CDN logs and filter by the AI bot names listed in *Get your site found at all*.
> 2. Count visits per bot per week, and note which pages they read.
>
> Ramp logged thousands of visits from 7 AI platforms in 2 weeks, and Claude's crawler visited more than all the other named AI crawlers combined. Some bots pose as normal browsers (DeepSeek showed up as a Chrome version from 2017), so named bots are a floor, not the total.

## Count customers, not mentions

Visibility is a signal. The test is whether qualified visitors and customers arrive, so track leads, demos, new active users and revenue from AI search next to your citation counts.

Analytics undercounts AI. **Add "How did you hear about us?" to your signup form.** One founder compared those answers with analytics: the referrer credited Google with 3.4 times more signups than customers themselves did.

> [!TRICK] Measure AI search for free
> Skip paid visibility trackers at first. From TheoAGI's playbook:
> 1. Write 15 to 30 real buyer questions.
> 2. Run each one at least twice per engine, logged out: ChatGPT, Claude, Perplexity, Gemini.
> 3. Log brands named and URLs cited in separate columns. Being cited and being recommended are two different numbers.
> 4. Under about 100 AI visits a month, report counts, not percentages.
> 5. Add Bing's [AI Performance report](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) for Copilot citations and the searches behind them (setup in *Get your site found at all*).
>
> The free stack: Google Search Console, Bing Webmaster Tools, Ahrefs Webmaster Tools, Screaming Frog (free up to 500 URLs).

> [!RISK] One run proves nothing
> Answers move. In the SparkToro study, two answers almost never named the same brands, and the same order came up about once in 1,000 runs. Two runs per engine catch big gaps. A percentage you can trust needs dozens of runs. Judge a change on repeated runs over weeks, never on a single answer.

> [!TRICK] A weekly citation log
> One marketing engineer's routine:
> 1. Write a script that asks ChatGPT, Claude and Perplexity 100 real buyer questions every Monday and saves the answers.
> 2. Log which brands and URLs each answer cites.
> 3. Read the cited pages. The author observes they share three traits: a direct answer in the first paragraph, original numbers, and a clear author. Only the numbers are tested: in the [GEO study](https://arxiv.org/abs/2311.09735), adding statistics, quotations or cited sources raised a page's share of AI answers by 30 to 40%.
> 4. Rewrite your 10 most important pages to match.
> 5. Add `llms.txt` (a file that tells AI what your site is about) and schema markup.
>
> Skip step 5 unless you have another reason for it. Google says its AI answers need "no special schema.org structured data" and no "AI text files". Jeremy Howard's [`llms.txt` proposal](https://llmstxt.org/) is for agents reading your docs, mostly coding agents, and claims no effect on AI citations. Add structured data only to describe what the page already shows. For the first-paragraph rule, see *Improve the pages that already rank*.

Skip the script on day one. Ten questions asked by hand in a spreadsheet get you started. One answer per question isn't a baseline yet, because answers vary from run to run: ask each a few times before you compare against it, and automate once the list stops changing.

> [!DO] Start your question sheet
> Write 10 real buyer questions in a spreadsheet. Ask each one in ChatGPT and fill two columns: brands named, URLs cited.

> [!CHECK] When you track AI search, what is your unit of measurement?
> A question a buyer asks before choosing, such as "What's the best meeting notes app for a sales team?", run many times. It carries the decision, and answers vary so much that only a share of many runs means anything.

> [!CHECK] Your page climbs in Google. Can you assume your AI visibility rose too?
> No. Keep separate numbers for Google and AI, because a page can climb in one and barely move in the other.

> [!CHECK] Why track new users from AI search next to your AI citation counts?
> Citations are only a signal. The real test is whether qualified visitors and customers arrive.

## Sources

- [Rand Fishkin and Patrick O'Donnell, *AIs are highly inconsistent when recommending brands or products* (2026)](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/)
- [Mahe Chen, Xiaoxuan Wang, Kaiwen Chen and Nick Koudas, *Generative Engine Optimization: How to Dominate AI Search* (2025)](https://arxiv.org/abs/2509.08919)
- [Pranjal Aggarwal et al., *GEO: Generative Engine Optimization* (2024)](https://arxiv.org/abs/2311.09735)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Microsoft Bing: Introducing AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
- [Jeremy Howard, *The /llms.txt file* (2024)](https://llmstxt.org/)
- [@wespreadjam: Granola's buyer-decision workflow for AI search](https://x.com/wespreadjam/status/2115568290307469548)
- [@wespreadjam: Ramp's questions for finding AI gaps](https://x.com/wespreadjam/status/2117333079106932897)
- [@borjafat: saving real buying questions for repeatable checks](https://x.com/borjafat/status/2116164330014007296)
- [@korzhov_dm: asking three AIs 100 buyer questions every Monday](https://x.com/korzhov_dm/status/2118984106335756532)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
- [@wespreadjam: buying-decision prompts and revenue over hundreds of variations](https://x.com/wespreadjam/status/2124249761339572689)
- [@CrowdReply_io: Ramp's AI bot visits and how each AI passed on an offer](https://x.com/CrowdReply_io/status/2124253365165326674)
