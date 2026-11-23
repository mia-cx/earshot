# AI search: literature and claim check

Research notes behind `content/ai-search/`. Every source below was opened and read on 2026-11-23. Anything not opened is marked "not verified" and kept out of the lessons.

The claim tables carry the verdicts of an independent audit (2026-11-23) by a reader who did not write the lessons and re-opened every source: **supported**, **overstated**, **misattributed**, **disputed**, **unsupported**, or **one person's claim** (labelled as such in the lesson). Where the lesson changed, the table says how.

## Sources

### How AI search picks sources (official documentation)

- **OpenAI: [Searching the web with ChatGPT](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt).** ChatGPT "typically rewrites your query into one or more targeted queries" sent to search providers, may send "additional, more specific queries", and can add saved memories and approximate location to them. Search results and citations "can be incomplete, outdated, or incorrect". The old `9237897-chatgpt-search` URL redirects here.
- **OpenAI: [Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots).** OAI-SearchBot surfaces sites in ChatGPT search; GPTBot crawls for model training; ChatGPT-User fetches pages when a user asks. "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers", though they may still appear as navigation links.
- **Perplexity: [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).** PerplexityBot surfaces and links sites in Perplexity search and is not used for model training. "To ensure your site appears in search results, we recommend allowing PerplexityBot." Perplexity-User fetches for user actions and generally ignores robots.txt.
- **Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).** "There are no additional requirements to appear in AI Overviews or AI Mode." "You don't need to create new machine readable files, AI text files, or markup", and there is "no special schema.org structured data" to add. A supporting link must be indexed and eligible for a snippet. Both features may use "query fan-out": "issuing multiple related searches across subtopics and data sources". AI feature traffic is counted inside Search Console's Performance report, "Web" search type, not separately.
- **Microsoft Bing: [Introducing AI Performance in Bing Webmaster Tools Public Preview](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) (February 2026).** Reports total citations, cited pages, sample "grounding queries" (the phrases the AI used to retrieve your content) and per-page citations across Copilot, Bing AI summaries and some partners. Counts citations, not clicks. Bing's advice for being cited: clear headings, tables and FAQ sections; examples, data and sources; freshness; IndexNow.
- **Jeremy Howard: [The /llms.txt file](https://llmstxt.org/) (proposed 3 September 2024).** A Markdown file that gives agents a curated overview of a site at inference time. The spec says it is used most for software documentation that coding agents read. It does not claim that any search engine or assistant ranks or cites sites by it.
- **Anthropic: [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview).** A skill is a folder with a `SKILL.md` whose frontmatter needs a `name` and a `description`. At startup the agent loads only those two fields, and "The `description` is what Claude matches your request against", so it must say what the skill does and when to use it. Anthropic advises using skills only from trusted sources and auditing every bundled file.

### Research on what gets cited

- **Pranjal Aggarwal, Vishvak Murahari, Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan and Ameet Deshpande, "GEO: Generative Engine Optimization", KDD 2024.** [arXiv:2311.09735](https://arxiv.org/abs/2311.09735), results read in the [HTML version](https://arxiv.org/html/2311.09735v3). A controlled experiment: the authors rewrote source pages and measured how much of each page the generative engine used. On GEO-bench, adding quotations (27.2 vs 19.3 baseline on position-adjusted word count), statistics (25.2) or cited sources (24.6) gave 30 to 40% relative gains; fluency edits 15 to 30%; an authoritative tone "no significant improvement"; keyword stuffing fell below baseline. On Perplexity.ai, quotations gave a 22% gain and statistics about 37% on the subjective measure. Gains were largest for lower-ranked pages: "Cite Sources" raised the fifth-ranked result's visibility by 115.1% while the first-ranked result fell 30.3%.
- **Mahe Chen, Xiaoxuan Wang, Kaiwen Chen and Nick Koudas, "Generative Engine Optimization: How to Dominate AI Search" (University of Toronto, 2025).** [arXiv:2509.08919](https://arxiv.org/abs/2509.08919). Large comparison of AI search and Google across verticals, languages and query wordings. AI engines source very differently from Google and from each other, and show "a systematic and overwhelming bias towards Earned media (third-party, authoritative sources)" over brand-owned and social content. Recommends engine-specific strategies and earning third-party coverage. Observational.
- **Dmitrij Żatuchin, "Cited Web Sources in LLM Answers about Brands: A Multilingual Audit" (2026, v2).** [arXiv:2606.25787](https://arxiv.org/abs/2606.25787). Of 131,512 classified citations in answers about brands (the principal Nordic-Baltic component of the audit), 82.4% pointed outside brand-associated sites. Wikipedia was the top source in 11 of 12 languages. v2 replaced an unreproducible 85.7% figure with the reproduced 82.4%. Observational; does not measure legal ownership.
- **Pratyush Kumar, "Generative Engine Optimization at Scale" (Ranqo, 2026).** [arXiv:2606.20065](https://arxiv.org/abs/2606.20065). 100K+ responses about 100+ brands tracked on the author's own platform: the best-of listicle is the most-cited format (about 21%); about 78% of citations go to corporate websites, which include both the brand's own pages and other companies' pages in the same space; among non-corporate sources, YouTube, Reddit, editorial media and Wikipedia are most cited, in that order; niche brands appeared in 11% of first runs against 73% for household names. Vendor data, correlational.
- **Rand Fishkin (SparkToro) and Patrick O'Donnell (Gumshoe.ai), ["AIs are highly inconsistent when recommending brands or products"](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/) (January 2026).** 600 volunteers ran 12 prompts 2,961 times in ChatGPT, Claude and Google's AI (November to December 2025). Under a 1 in 100 chance that ChatGPT or Google's AI gives the same brand list twice; same order about 1 in 1,000. Strong brands still appeared in most runs (for example 55 to 77% for leading headphone brands across 142 different human-written prompts). Fishkin concludes "visibility % across dozens to hundreds of prompts run multiple times is a reasonable metric" and that "ranking position in AI" is not. Not peer reviewed; O'Donnell works for an AI-tracking company.

### Vendor case studies (primary pages of the claims the posts relay)

- **Profound: [How Ramp increased AI brand visibility 7x in accounts payable](https://www.tryprofound.com/customers/ramp).** Reports 3.2% to 22.2% visibility "in just 1 month", 19th to 8th among fintech brands, 300+ citations for the two targeted pages, 6% of prior citations from automation content. The page's own charts are dated "12/01/2024 vs 2/15/2025", about ten weeks. No engines, prompt counts or method disclosed. Published by the vendor whose tool was used.
- **Discovered Labs: [How Granola grew monthly activated users from AI search 4,600%](https://discoveredlabs.com/case-studies/granola).** Reports new active users attributed to AI up 4,600% since January 2026; non-branded AI citation rate up 558% and mention rate up 739% (January to August 2026, measured on the agency's own platform); organic sessions up 134% (GA4). Describes the own, claim, earn, contest split and measuring Google and AI separately. The attribution method for users is not explained, and the team reset its baseline when scope changed.

## Lesson: Track the questions buyers ask AI (`ai-answers.md`)

**Principles.** AI answers vary from run to run, so one answer is an anecdote and visibility is a frequency across many runs (Fishkin and O'Donnell). AI engines pick sources differently from Google, so the two need separate numbers (Chen et al.). Google needs no special file or schema for its AI features (Google), and llms.txt is a proposal for agents, with no stated effect on citations (Howard).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| 600 volunteers, 12 prompts, 2,961 runs; under 1 in 100 chance of the same brand list twice; same order about 1 in 1,000 | **supported** | SparkToro 2026 |
| Visibility across many runs is a fair measure; "ranking position in AI" isn't | **overstated**: Fishkin hedges ("(probably) a reasonable way") and says the study isn't "absolute, definitive proof". Lesson now says "probably" | SparkToro 2026 |
| Not peer reviewed; O'Donnell works for an AI-tracking company | **supported** (Gumshoe.ai; conflict named in the post) | SparkToro 2026 |
| AI engines pick sources very differently from Google and each other | **supported** | Chen et al. 2025, abstract |
| AI Overviews and AI Mode traffic is reported inside Search Console's "Web" search type | **supported** | Google AI features (updated 2025-12-10) |
| Granola and Ramp examples relayed by an AI-search vendor crediting others' work | **supported** (@wespreadjam credits Discovered Labs and Profound, and sells audits) | @wespreadjam |
| Referrer credited Google with 3.4 times more signups than customers did | **one person's claim** (one founder via TheoAGI) | @TheoAGI |
| Free measurement routine: 15 to 30 questions, twice per engine, under 100 visits report counts | **one person's claim** (TheoAGI), labelled | @TheoAGI |
| Bing's AI Performance report shows Copilot citations and grounding queries | **supported** | Bing Webmaster Blog |
| Cited pages share three traits: answer first, original numbers, clear author | **one person's claim** (@korzhov_dm), labelled; only the evidence part is tested | @korzhov_dm; Aggarwal et al. 2024 |
| Adding statistics, quotations or cited sources raised a page's share of AI answers by 30 to 40% | **supported** | Aggarwal et al. 2024 |
| Google's AI features need "no special schema.org structured data" and no "AI text files" | **supported** | Google AI features |
| llms.txt is for agents reading docs, mostly coding agents, and claims no effect on citations | **supported**: the v2 spec says it is "used most heavily for software documentation" and makes no ranking claim | llmstxt.org |

## Lesson: Fix why AI skips you (`the-loop.md`)

**Principles.** Because answers vary, a change can only be judged against the same prompts rerun (Fishkin and O'Donnell). Editing a page to add evidence measurably raised its share of the answer in a controlled study, most of all for lower-ranked pages (Aggarwal et al.). AI search leans on third-party sources (Chen et al.; Żatuchin). A page blocked from a search crawler can't be cited (OpenAI, Perplexity, Google).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Rewriting pages one method at a time; quotations, statistics or cited sources raised the visibility score 30 to 40%; biggest gains for lower-ranked pages; keyword stuffing didn't help | **supported** ("Cite Sources" +115.1% for the fifth-ranked result) | Aggarwal et al. 2024, HTML v3 |
| The score is words in citing sentences, weighted toward the top of the answer | **supported** (position-adjusted word count) | Aggarwal et al. 2024 |
| Four causes of a lost prompt; improve a weak page rather than publish a second | **one person's claim** as Granola's process, relayed by @wespreadjam; the case study describes checking whether a source leaves the brand "absent, inaccurate, outdated, incomplete" | @wespreadjam; Discovered Labs |
| Sites blocking OAI-SearchBot "will not be shown in ChatGPT search answers" | **supported** | OpenAI crawlers |
| Perplexity recommends allowing PerplexityBot | **supported** | Perplexity crawlers |
| Google links only pages that are indexed and eligible for a snippet | **supported** | Google AI features |
| Granola: AI new active users +4,600% since January 2026; citation rate +558% and mention rate +739% January to August, on the agency's tool; organic sessions +134% January to July | **supported** as reported by the agency that did the work; not independent | Discovered Labs |
| ChatGPT rewrites a question into "one or more targeted queries"; Google calls it "query fan-out" | **supported** | OpenAI help; Google AI features |
| Assistants run about ten hidden searches per question | **one person's claim** (TheoAGI's estimate), labelled | @TheoAGI |
| AI search shows a "systematic and overwhelming bias" toward earned sources | **supported** | Chen et al. 2025 |
| 82.4% of 131,512 brand citations pointed away from the brand's sites | **overstated** by omission: the sample is the audit's Nordic-Baltic component. Lesson now says "mostly Nordic and Baltic ones" | Żatuchin 2026, v2 abstract |
| 44,070 citations across 10 brands: 85% third-party, under 4% own site; own-site brands named more | **one person's claim**: TheoAGI quotes an unpublished vendor dataset, labelled | @TheoAGI |
| Own, claim, earn, contest | **supported** as Discovered Labs' framework (OCEC) | Discovered Labs |

## Lesson: Be the page AI quotes (`pages-and-places.md`)

**Principles.** AI search breaks a question into narrower searches (query fan-out; ChatGPT's query rewriting, which adds context like location), so a page that answers one segment's exact version of a question has a search to match. Third-party communities are a large share of what AI cites (Chen et al.; Kumar). An agent finds a skill by matching the request against the skill's description (Anthropic).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| ChatGPT rewrites a question into "one or more targeted queries", adding context such as location; Google uses "query fan-out" | **supported** | OpenAI help; Google AI features |
| Ramp: 3.2% to 22.2%; 19th to 8th; 300+ citations; 6% of citations from automation content; two segment pages plus comparison pages | **supported** as reported by Profound | Profound case study |
| "One month" | **disputed**, and the lesson says so: Profound's own charts are dated 12/01/2024 vs 2/15/2025 | Profound case study |
| Reddit ranks among the most-cited sources after company sites and YouTube | **supported** (correlational, brands tracked for Ranqo's customers) | Kumar 2026 |
| At most one company mention per subreddit per week | **one person's claim** (TheoAGI), labelled. Reddit's own rules could not be opened | @TheoAGI |
| A link dropped without context on Reddit or Hacker News is treated as spam | **one person's claim** (@2whazzuup) | @2whazzuup |
| The agent reads only each skill's `name` and `description` at startup; "the description is what Claude matches your request against" | **supported** | Anthropic Agent Skills overview |
| skills.sh is Vercel's; DR 82; a page with install command and counter after `npx skills add` | **one person's claim** (@tarasshyn), labelled; skills.sh does list Vercel's own skills | @tarasshyn |
| Claude sends "multiple customers a day" | **one person's claim**, labelled | @tarasshyn |

## Not verified, kept out of the lessons

- Reddit's Content Policy and spam help pages (blocked to automated fetches).
- Any study behind "ChatGPT swaps most sources week to week".
- The original 44,070-citation dataset.
