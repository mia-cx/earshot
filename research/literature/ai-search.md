# AI search: literature and claim check

Research notes behind `content/ai-search/`. Every source below was opened and read on 2026-11-23. Anything not opened is marked "not verified" and kept out of the lessons.

## Sources

### How AI search picks sources (official documentation)

- **OpenAI: [ChatGPT search](https://help.openai.com/en/articles/9237897-chatgpt-search).** ChatGPT "typically rewrites your query into one or more targeted queries" sent to search providers, may run follow-up queries, and can add saved memories and approximate location to them. It ranks results "using multiple factors intended to help users find relevant, reliable information"; "Placement is not guaranteed". To be eligible, a site must allow OAI-SearchBot.
- **OpenAI: [Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots).** OAI-SearchBot surfaces sites in ChatGPT search; GPTBot crawls for model training; ChatGPT-User fetches pages when a user asks. "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers", though they may still appear as navigation links.
- **Perplexity: [Perplexity crawlers](https://docs.perplexity.ai/guides/bots).** PerplexityBot surfaces and links sites in Perplexity search and is not used for model training. "To ensure your site appears in search results, we recommend allowing PerplexityBot." Perplexity-User fetches for user actions and generally ignores robots.txt.
- **Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).** "There are no additional requirements to appear in AI Overviews or AI Mode." "You don't need to create new machine readable files, AI text files, or markup", and there is "no special schema.org structured data" to add. A supporting link must be indexed and eligible for a snippet. Both features may use "query fan-out": "issuing multiple related searches across subtopics and data sources". AI feature traffic is counted inside Search Console's Performance report, "Web" search type, not separately.
- **Microsoft Bing: [Introducing AI Performance in Bing Webmaster Tools Public Preview](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) (February 2026).** Reports total citations, cited pages, sample "grounding queries" (the phrases the AI used to retrieve your content) and per-page citations across Copilot, Bing AI summaries and some partners. Counts citations, not clicks. Bing's advice for being cited: clear headings, tables and FAQ sections; examples, data and sources; freshness; IndexNow.
- **Jeremy Howard: [The /llms.txt file](https://llmstxt.org/) (proposed 3 September 2024).** A Markdown file that gives agents a curated overview of a site at inference time. The spec says it is used most for software documentation that coding agents read. It does not claim that any search engine or assistant ranks or cites sites by it.
- **Anthropic: [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview).** A skill is a folder with a `SKILL.md` whose frontmatter needs a `name` and a `description`. At startup the agent loads only those two fields, and "The `description` is what Claude matches your request against", so it must say what the skill does and when to use it. Anthropic advises using skills only from trusted sources and auditing every bundled file.

### Research on what gets cited

- **Pranjal Aggarwal, Vishvak Murahari, Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan and Ameet Deshpande, "GEO: Generative Engine Optimization", KDD 2024.** [arXiv:2311.09735](https://arxiv.org/abs/2311.09735), results read in the [HTML version](https://arxiv.org/html/2311.09735v3). A controlled experiment: the authors rewrote source pages and measured how much of each page the generative engine used. On GEO-bench, adding quotations (27.2 vs 19.3 baseline on position-adjusted word count), statistics (25.2) or cited sources (24.6) gave 30 to 40% relative gains; fluency edits 15 to 30%; an authoritative tone "no significant improvement"; keyword stuffing fell below baseline. On Perplexity.ai, quotations gave a 22% gain and statistics about 37% on the subjective measure. Gains were largest for lower-ranked pages: "Cite Sources" raised the fifth-ranked result's visibility by 115.1% while the first-ranked result fell 30.3%.
- **Mahe Chen, Xiaoxuan Wang, Kaiwen Chen and Nick Koudas, "Generative Engine Optimization: How to Dominate AI Search" (University of Toronto, 2025).** [arXiv:2509.08919](https://arxiv.org/abs/2509.08919). Large comparison of AI search and Google across verticals, languages and query wordings. AI engines source very differently from Google and from each other, and show "a systematic and overwhelming bias towards Earned media (third-party, authoritative sources)" over brand-owned and social content. Recommends engine-specific strategies and earning third-party coverage. Observational.
- **Dmitrij Żatuchin, "Cited Web Sources in LLM Answers about Brands: A Multilingual Audit" (2026, v2).** [arXiv:2606.25787](https://arxiv.org/abs/2606.25787). Of 131,512 classified citations in answers about brands, 82.4% pointed outside brand-associated sites. Wikipedia was the top source in 11 of 12 languages. v2 replaced an unreproducible 85.7% figure with the reproduced 82.4%. Observational; does not measure legal ownership.
- **Pratyush Kumar, "Generative Engine Optimization at Scale" (Ranqo, 2026).** [arXiv:2606.20065](https://arxiv.org/abs/2606.20065). 100K+ responses about 100+ brands tracked on the author's own platform: the best-of listicle is the most-cited format (about 21%); after corporate sites, YouTube, Reddit, editorial media and Wikipedia are most cited; niche brands appeared in 11% of first runs against 73% for household names. Vendor data, correlational.
- **Rand Fishkin (SparkToro) and Patrick O'Donnell (Gumshoe.ai), ["AIs are highly inconsistent when recommending brands or products"](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/) (January 2026).** 600 volunteers ran 12 prompts 2,961 times in ChatGPT, Claude and Google's AI (November to December 2025). Under a 1 in 100 chance that ChatGPT or Google's AI gives the same brand list twice; same order about 1 in 1,000. Strong brands still appeared in most runs (for example 55 to 77% for leading headphone brands across 142 different human-written prompts). Fishkin concludes "visibility % across dozens to hundreds of prompts run multiple times is a reasonable metric" and that "ranking position in AI" is not. Not peer reviewed; O'Donnell works for an AI-tracking company.

### Vendor case studies (primary pages of the claims the posts relay)

- **Profound: [How Ramp increased AI brand visibility 7x in accounts payable](https://www.tryprofound.com/customers/ramp-case-study).** Reports 3.2% to 22.2% visibility "in just 1 month", 19th to 8th among fintech brands, 300+ citations for the two targeted pages, 6% of prior citations from automation content. The page's own charts are dated "12/01/2024 vs 2/15/2025", about ten weeks. No engines, prompt counts or method disclosed. Published by the vendor whose tool was used.
- **Discovered Labs: [How Granola grew monthly activated users from AI search 4,600%](https://discoveredlabs.com/case-studies/granola).** Reports new active users attributed to AI up 4,600% since January 2026; non-branded AI citation rate up 558% and mention rate up 739% (January to August 2026, measured on the agency's own platform); organic sessions up 134% (GA4). Describes the own, claim, earn, contest split and measuring Google and AI separately. The attribution method for users is not explained, and the team reset its baseline when scope changed.

## Lesson: Track the questions buyers ask AI (`ai-answers.md`)

**Principles.** AI answers vary from run to run, so one answer is an anecdote and visibility is a frequency across many runs (Fishkin and O'Donnell). AI engines pick sources differently from Google, so the two need separate numbers (Chen et al.). Google needs no special file or schema for its AI features (Google), and llms.txt is a proposal for agents, with no stated effect on citations (Howard).

| Claim | Status | Source |
| --- | --- | --- |
| Buyers ask AI before they search | **unverified** generalisation (@korzhov_dm). Kept out of the TLDR | @korzhov_dm |
| Track Google and AI separately; they move independently | **confirmed**: AI engines source very differently from Google; Granola's case study measured them separately | Chen et al. 2025; Discovered Labs |
| One study says ChatGPT swaps most of its sources week to week | **unverified**: TheoAGI quotes it without naming the study. Replaced with the SparkToro study, which supports the same caution with checkable numbers | SparkToro 2026 |
| Run each question at least twice per engine | practitioner rule (TheoAGI); SparkToro suggests a stable percentage needs dozens of runs | SparkToro 2026 |
| Referrer credited Google with 3.4 times more signups than customers did | **unverified**, one founder via TheoAGI | @TheoAGI |
| Cited pages share three traits: direct answer first, original numbers, clear author | **partly confirmed**: statistics, quotations and cited sources raise visibility in a controlled study; "answer first" and "clear author" **unverified** | Aggarwal et al. 2024 |
| Google's AI answers need no special schema or file | **confirmed** | Google AI features |
| llms.txt has no confirmed effect on AI citations | **confirmed**: the spec claims none and Google says no AI text files are needed | llmstxt.org; Google |
| Bing's AI Performance report shows Copilot citations | **confirmed** | Bing Webmaster Blog |

## Lesson: Fix why AI skips you (`the-loop.md`)

**Principles.** Because answers vary, a change can only be judged against the same prompts rerun (Fishkin and O'Donnell). Editing a page to add evidence measurably raised its share of the answer in a controlled study, most of all for lower-ranked pages (Aggarwal et al.). AI search leans on third-party sources (Chen et al.; Żatuchin). A page blocked from a search crawler can't be cited (OpenAI, Perplexity, Google).

| Claim | Status | Source |
| --- | --- | --- |
| Granola: AI new active users +4,600%, citation rate +558%, mention rate +739%, organic sessions +134% over about 7 months | **confirmed as reported** by the agency that did the work; citation and mention rates from its own tool; not independent | Discovered Labs |
| Granola diagnosed every lost prompt into four causes | from the X post; the case study describes checking whether each source leaves the brand "absent, inaccurate, outdated, incomplete" | @wespreadjam; Discovered Labs |
| Assistants run about ten hidden searches per question | **unverified** number (TheoAGI's estimate). **Confirmed** that ChatGPT rewrites a prompt into one or more searches and Google uses query fan-out | OpenAI; Google |
| 44,070 citations across 10 brands: 85% third-party, under 4% own site | **unverified**: TheoAGI credits @alexteillet's dataset; no published study found. Independent audits point the same way: 82.4% of 131,512 brand citations went to non-brand sites | Żatuchin 2026; Chen et al. 2025 |
| Brands whose own site got cited were named far more often | **unverified** | @TheoAGI |
| Own, claim, earn, contest | **confirmed** as Discovered Labs' framework (they call it OCEC) | Discovered Labs |

## Lesson: Be the page AI quotes (`pages-and-places.md`)

**Principles.** AI search breaks a question into narrower searches (query fan-out; ChatGPT's query rewriting, which adds context like location), so a page that answers one segment's exact version of a question has a search to match. Third-party communities are a large share of what AI cites (Chen et al.; Kumar). An agent finds a skill by matching the request against the skill's description (Anthropic).

| Claim | Status | Source |
| --- | --- | --- |
| Ramp 3.2% to 22.2% in one month; 19th to 8th; 300+ citations; 6% from automation content | **confirmed as reported** by Profound; **disputed** timeframe: Profound's own charts span 1 December 2024 to 15 February 2025; no engines or prompt counts disclosed | Profound case study |
| Reddit threads are among the sources AI cites | **confirmed** (correlational): Reddit is among the most-cited non-corporate sources in one vendor's data | Kumar 2026 |
| Mention your company in at most one answer per subreddit per week | **unverified** rule of thumb (TheoAGI). Reddit's own rules could not be opened | @TheoAGI |
| skills.sh is DR 82 | **unverified**, the author's figure | @tarasshyn |
| Claude sends "multiple customers a day" | **unverified**, one person's report | @tarasshyn |
| `npx skills add your-org/your-repo` lists a skill | from the post; not independently tested here | @tarasshyn |

## Not verified, kept out of the lessons

- Reddit's Content Policy and spam help pages (blocked to automated fetches).
- Any study behind "ChatGPT swaps most sources week to week".
- The original 44,070-citation dataset.
