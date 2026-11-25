# Literature: Search engines (`content/seo/`)

Research notes for module 7. Each lesson lists the principles it rests on, the strongest sources found, and an audit of every number and factual claim in the lesson.

Every source below was opened and read in November 2026. Primary sources come first: Google Search Central, Google's help centres, the US court record, Bing, web.dev, Cloudflare, the AI companies' own crawler docs, and the GitHub repos the lessons name. Industry studies (Ahrefs, Backlinko, Advanced Web Ranking, SearchPilot, Whitespark) are correlational, vendor-run or expert surveys. The lessons label them that way and never state them as fact.

Verdicts come from an audit that reopened each source for each claim:

- **Supported**: the source says this.
- **Overstated**: the source says something narrower, older, or with caveats the lesson dropped.
- **Misattributed**: true or close to it, but the cited source doesn't say it.
- **Disputed**: stronger evidence says otherwise.
- **Unsupported**: no source, and nothing else confirms it.
- **One person's claim**: a practitioner's number or experience, labelled as such in the lesson.

Where a claim wasn't supported, the check names the fix made in the lesson.

## Sources

### Google

- **Creating helpful, reliable, people-first content.** https://developers.google.com/search/docs/fundamentals/creating-helpful-content. Asks whether content gives "original information, reporting, research, or analysis" and "substantial value when compared to other pages in search results". Defines E-E-A-T, says trust matters most, and that "E-E-A-T itself isn't a specific ranking factor". The "Who, How, Why" section asks for bylines where readers expect them and for background "such as through links to an author page or a site's About page". It calls fabricated creator profiles ("AI-generated headshots, made-up names, or false credentials") deception, and asks for disclosure "if automation is used to substantially generate content". Lists changing a page's date without substantial change, and writing to a word count, as warning signs.
- **Spam policies for Google web search.** https://developers.google.com/search/docs/essentials/spam-policies. Scaled content abuse: many pages generated "for the primary purpose of manipulating search rankings and not helping users", "no matter how it's created"; examples include automated transformations like synonymizing, and creating multiple sites to hide scale. Doorway abuse: pages targeted at regions or cities "that funnel users to one page". Site reputation abuse: third-party content published on a host "mainly because of that host's already-established ranking signals"; Google's examples are sponsored payday-loan reviews on an educational site and a third-party "best casinos" page on a medical site. Not a violation: user-generated content sites (forums, comment sections), columns and opinion pieces, and an integrated coupons section is named as "not likely to take action". Google presumes new pages match the quality of the rest of the domain. Link spam includes optimised links "in articles, guest posts, or press releases distributed on other sites".
- **Google Search's core updates and your website (last updated 10 December 2025).** https://developers.google.com/search/docs/appearance/core-updates. Core updates come "several times a year", are broad and "don't target specific sites or individual web pages"; pages that drop "aren't necessarily 'bad'". To check a drop: confirm the rollout finished on the Search Status Dashboard, wait "at least a full week", compare with "a week before the core update started rolling out", and check Web, Images, Video and News separately. Small drop ("position 2 to 4"): "no need to take drastic action", and avoid changing content "that's already performing well". Large drop ("position 4 to 29"): run the self-assessment for the site "as a whole", ideally with people "unaffiliated with your site", and study the most affected pages. Avoid "quick fix" changes; "Deleting content is a last resort", and wanting to delete whole sections is "likely a sign those sections were created for search engines first". Effects take "a few days" to "several months", sometimes the next core update; smaller core updates also happen unannounced; "there's no guarantee".
- **Search Status Dashboard: ranking incidents.** https://status.search.google.com/. November 2026 core update released 10 November, complete 24 November 2026. On 24 November Google preannounced a December 2026 core update on "longer and more complex questions" and personalisation.
- **SEO Starter Guide.** https://developers.google.com/search/docs/fundamentals/seo-starter-guide. Changes can take "a few hours" to "several months"; wait "a few weeks" before judging. Titles should be unique, clear, concise and accurate. Anchor text tells users and Google about the linked page. Lists myths: meta keywords, word count targets, E-E-A-T as a ranking factor, heading counts, duplicate content penalties.
- **Influencing your title links.** https://developers.google.com/search/docs/appearance/title-link. "There's no limit on how long a `<title>` element can be"; Google truncates "to fit the device width". Best practices advise against long titles and keyword stuffing. The common issues that make Google generate a different title link: half-empty, obsolete (outdated year), inaccurate, micro-boilerplate, no clear main title, and a language or script mismatch. Replacements come from "header elements or other large and prominent text", anchors and other sources. Recrawling takes "a few days to a few weeks".
- **More info about titles (Search Central blog, September 2021).** https://developers.google.com/search/blog/2021/09/more-info-about-titles. After refinements, Google uses the title element "around 87% of the time, rather than around 80% before".
- **Control your snippets.** https://developers.google.com/search/docs/appearance/snippet. Google "primarily uses the content on the page" for snippets and uses the meta description when it describes the page better. No length limit; truncated to device width.
- **A guide to Google Search ranking systems.** https://developers.google.com/search/docs/appearance/ranking-systems-guide. Ranks individual pages, with site-wide signals also used. Names passage ranking ("individual sections or 'passages' of a web page"), "query deserves freshness" systems, original content and reviews systems. Google "generally won't show more than two web page listings from the same site" in top results. No mention of clicks.
- **How Search works: ranking results.** https://www.google.com/search/howsearchworks/how-search-works/ranking-results/. "We also use aggregated and anonymized interaction data to assess whether search results are relevant to queries."
- **SEO link best practices.** https://developers.google.com/search/docs/crawling-indexing/links-crawlable. Google uses links "when determining the relevancy of pages and to find new pages". Anchor text should be "descriptive, reasonably concise, and relevant". "Every page you care about should have a link from at least one other page on your site." Google can generally crawl only `<a href>` links.
- **JavaScript SEO basics.** https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics. Googlebot renders JavaScript, but "server-side or pre-rendering is still a great idea" because "not all bots can run JavaScript".
- **Robots.txt introduction.** https://developers.google.com/search/docs/crawling-indexing/robots/intro. Robots.txt manages crawling and is not a way to keep a page out of Google; a blocked URL can "still be indexed if linked to from other sites". Use `noindex` or password protection.
- **Sitemaps overview.** https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview. Sites of about 500 pages or fewer that link every page may not need one; a sitemap doesn't guarantee crawling or indexing.
- **Consolidate duplicate URLs.** https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls. Redirects and `rel="canonical"` are strong signals, sitemaps weak; Google may still choose another canonical. Pick one host variant and redirect the rest.
- **Ask Google to recrawl your URLs.** https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl. Crawling takes "a few days to a few weeks"; there's a quota, and requesting again "won't get it crawled any faster".
- **Understanding page experience.** https://developers.google.com/search/docs/appearance/page-experience. "Core Web Vitals are used by our ranking systems", but good scores don't guarantee a top ranking and Google shows the most relevant content "even if the page experience is sub-par".
- **AI features and your website.** https://developers.google.com/search/docs/appearance/ai-features. "You don't need to create new machine readable files, AI text files, or markup". AI Overviews and AI Mode traffic is counted inside the Performance report's "Web" totals, with no separate citation report. Google says clicks from AI Overview pages are "higher quality".
- **Google's common crawlers (Google-Extended).** https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers. Google-Extended has no user agent of its own; it's a robots.txt token for Gemini training and grounding and "does not impact a site's inclusion in Google Search".
- **Latest documentation updates.** https://developers.google.com/search/updates. FAQ rich results stopped appearing in May 2026; the docs were then removed.
- **Video SEO best practices.** https://developers.google.com/search/docs/appearance/video. Google "will prioritize key moments set by you, either through structured data or the YouTube description".
- **Search Console Help: Performance report.** https://support.google.com/webmasters/answer/7042828. CTR is "clicks ÷ impressions"; average position averages the topmost position across impressions.
- **Search Console Help: Performance report data discrepancies.** https://support.google.com/webmasters/answer/17010575. Tables show at most 1,000 rows; anonymised (rare) queries are left out of the query table.
- **Search Console Help: URL Inspection tool.** https://support.google.com/webmasters/answer/9012289. Shows "Last crawl": "The last time this page was crawled by Google".
- **Understanding news topic authority (May 2023).** https://developers.google.com/search/blog/2023/05/understanding-news-topic-authority. Google's only published "topic authority" system covers news results.
- **Search Quality Rater Guidelines (11 September 2025).** https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf. Section 3.4: trust is "the most important member of the E-E-A-T family"; experience means "first-hand or life experience"; raters look at what creators say about themselves, including the "About us" page. Section 12.7: queries can have Know, Do, Website or Visit-in-person intent; a Do query's goal "may be to download, to buy, to obtain".

### Google help centres

- **Google Business Profile: Tips to improve your local ranking.** https://support.google.com/business/answer/7091. Local results rest on relevance, distance and prominence; prominence uses "how many websites link to your business and how many reviews you have". "Businesses with complete and accurate info are more likely to show up." "More reviews and positive ratings can help your business's local ranking." Replies show "you value their feedback" and help you "stand out"; the page doesn't say replies affect ranking. "There's no way to request or pay for a better local ranking."
- **Guidelines for representing your business on Google.** https://support.google.com/business/answer/3038177. Eligible businesses have a location customers visit or travel to customers. Virtual offices aren't eligible. The business name should match the real-world name "as used consistently on your storefront, website, stationery". "Use as few categories as possible"; "Do not use categories solely as keywords".
- **Maps user-generated content policy: Prohibited and restricted content.** https://support.google.com/contributionpolicy/answer/7400114. Bans incentivised reviews, and businesses that "discourage or prohibit negative reviews, or selectively solicit positive reviews".
- **Create and manage posts on your Business Profile.** https://support.google.com/business/answer/7342169. "Posts older than 6 months are archived unless a date range is set."
- **YouTube Help: Video chapters.** https://support.google.com/youtube/answer/9884579. First timestamp 00:00, at least three in ascending order, each chapter at least 10 seconds.
- **Google Trends Help: FAQ about Google Trends data.** https://support.google.com/trends/answer/4365533. A sample of searches, each point divided by total searches for its place and time and scaled 0 to 100. Relative interest, not search volume.
- **Google Ads Help: About responsive search ads.** https://support.google.com/google-ads/answer/7684791. Headlines up to 30 characters, descriptions up to 90.

### US court record and the 2024 leak

- **Amit P. Mehta, Memorandum Opinion, *United States v. Google LLC*, No. 1:20-cv-03010 (D.D.C. 5 August 2024).** https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf. Finding of fact 96: "Navboost is another signal that pairs queries and documents through memorizing user click data" (citing Eric Lehman's testimony). Trained on 18 months of data before 2017 and 13 months since (citing Pandu Nayak, listed as Vice President, Search). ¶102 quotes a Google document: "Navboost remains one of the most power[ful] ranking components". The conclusions call it "one of Google's core ranking models".
- **Rand Fishkin, SparkToro, "An Anonymous Source Shared Thousands of Leaked Google Search API Documents with Me" (28 May 2024).** https://sparktoro.com/blog/an-anonymous-source-shared-thousands-of-leaked-google-search-api-documents-with-me-everyone-in-seo-should-see-them/. Modules reference "goodClicks", "badClicks" and "lastLongestClicks". The docs don't show "the weight of particular elements" "nor does it prove which elements are used".

### Bing and IndexNow

- **Bing Webmaster Guidelines, ranking parameters (as reproduced by Search Engine Roundtable, 1 July 2020).** https://www.seroundtable.com/bing-ranking-algorithm-signals-29706.html. Bing lists relevance, quality and credibility, user engagement, freshness, location and page load time "in general order of importance". User engagement asks whether users clicked a result and whether they "quickly return to Bing". Microsoft's own page renders with JavaScript and didn't load, directly or through the Wayback Machine, so this stays a secondary quote.
- **Bing Webmaster Blog, "New AI visibility insights in Bing Webmaster Tools" (16 June 2026).** https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/. The AI Performance report shows where a site is cited "across Microsoft Copilot, Bing, and select partner AI experiences", with grounding queries. Adds intents, topics, citation share and period compare. Citation share is "not a ranking system".
- **Bing Webmaster Blog, "Easily verify your site in Bing Webmaster Tools by importing from Google Search Console" (September 2019).** https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/. Imported sites are "automatically verified", and the import connects "verified sites and sitemaps".
- **IndexNow FAQ.** https://www.indexnow.org/faq. Participating engines: Amazon, Bing, Naver, Seznam.cz, Yandex, Yep. Google isn't listed. "Submitting a URL does not guarantee immediate indexing."

### AI crawlers and infrastructure

- **OpenAI: Overview of OpenAI crawlers.** https://developers.openai.com/api/docs/bots. OAI-SearchBot surfaces sites in ChatGPT search, and sites opted out "will not be shown in ChatGPT search answers"; GPTBot collects training data; "Each setting is independent of the others"; robots.txt changes take "~24 hours". For ChatGPT-User, "robots.txt rules may not apply".
- **Anthropic: Does Anthropic crawl data from the web?** https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler. ClaudeBot (training), Claude-User (fetches for users), Claude-SearchBot (search quality). Blocking either search bot "may reduce your site's visibility". All honour robots.txt.
- **Perplexity: Perplexity crawlers.** https://docs.perplexity.ai/guides/bots. PerplexityBot surfaces sites in Perplexity search and isn't used for training. Perplexity-User fetches for users and "generally ignores robots.txt rules".
- **Vercel, "The rise of the AI crawler" (17 December 2024).** https://vercel.com/blog/the-rise-of-the-ai-crawler. From Vercel network logs: "none of the major AI crawlers currently render JavaScript" (OpenAI's, ClaudeBot, PerplexityBot and others). Gemini (via Googlebot) and Applebot do. A log study by a hosting vendor, dated.
- **Cloudflare: Bot Fight Mode.** https://developers.cloudflare.com/bots/get-started/bot-fight-mode/. "You cannot bypass or skip Bot Fight Mode using WAF custom rules or Page Rules"; an IP Access rule that matches first does stop it. It "may challenge API or mobile app traffic". Challenged requests show "Bot Fight Mode" under Security > Analytics > Events.
- **Cloudflare: Managed robots.txt (updated 2 November 2026).** https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/. Found under Security Settings, filtered by Bot traffic, as "AI Crawler and Agent access policies" with Search, Agent and Training controls. With Bot Preference Sync on and any policy set to block, Cloudflare prepends managed directives to your robots.txt. Training set to Disallow also blocks training crawlers at the edge, but "Mixed-use crawlers are excluded from this edge block."
- **Cloudflare: Crawler Hints.** https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/. Crawler Hints supports IndexNow and sends changed URLs to it.
- **web.dev: Web Vitals (updated 31 October 2024).** https://web.dev/articles/vitals. Good thresholds: LCP within 2.5 s, INP 200 ms or less, CLS 0.1 or less, measured at the 75th percentile of real page loads.

### Agents

- **Adam Kalai and others, OpenAI, "Why language models hallucinate" (5 September 2025).** https://openai.com/index/why-language-models-hallucinate/. "Standard training and evaluation procedures reward guessing over acknowledging uncertainty"; arbitrary facts like birthdays can't be learned from patterns.
- **OWASP GenAI Security Project, LLM06:2025 Excessive Agency.** https://genai.owasp.org/llmrisk/llm062025-excessive-agency/. Lists eight mitigations, among them minimising permissions, requiring "a human to approve high-impact actions", and complete mediation: "implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed".
- **Claude Code docs: Hooks reference.** https://code.claude.com/docs/en/hooks. "Exit with code 2 to block the action": a `PreToolUse` hook "blocks the tool call".
- **GitHub repos named in `agent-seo.md`, read November 2026.** [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc): MIT, runs locally, "read-only by default, write only when `GSC_ALLOW_DESTRUCTIVE=true`". [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude): 11.8k stars; installs with `curl ... main/install.sh | bash`; its `geo-crawlers` skill says blocking GPTBot means content "will NOT appear in ChatGPT Search results". [RomeoSEO/seo-skills](https://github.com/RomeoSEO/seo-skills): MIT. [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo): MIT; README links a paid Skool community.

### Writing for the web

- **Amy Schade, Nielsen Norman Group, "Inverted Pyramid: Writing for Comprehension" (11 February 2018).** https://www.nngroup.com/articles/inverted-pyramid/. Readers "can stop reading at any point on the page and still come away with the main point".

### Industry studies (correlational, vendor or survey)

- **Ryan Law, Ahrefs, "Update: AI Overviews reduce clicks by 58%" (4 February 2026).** https://ahrefs.com/blog/ai-overviews-reduce-clicks-update. 300,000 keywords, desktop Search Console CTR, December 2025 against December 2023: position-one CTR about 58% lower than forecast when an AI Overview shows, using informational keywords without one as the baseline. Correlational.
- **Barry Schwartz, Search Engine Roundtable, "Over 80% of Google searches have AI Overviews" (26 October 2026).** https://www.seroundtable.com/over-80-of-google-searches-have-ai-overviews-42372.html. Aggregates Semrush, SE Ranking (82.5%, US brand searches only) and seoClarity (62%, 55% to 84% by industry).
- **Advanced Web Ranking, "Google organic CTR by position" (July 2026 data).** https://www.advancedwebranking.com/seo/organic-ctr. US desktop: position 1 20.02%, position 2 10.36%, position 3 3.89%. AI Overviews on 43% of sampled desktop results; with one, position-1 CTR falls to 9.69% (−52%).
- **Brian Dean, Backlinko, "We analyzed 4 million Google search results" (updated 16 April 2025).** https://backlinko.com/google-ctr-stats. Position 1 averages 27.6% CTR; moving up one spot raises relative CTR by 32.3% "all things being equal", but #10 to #9 "doesn't make a statistically significant difference". Titles of 40 to 60 characters had the best CTR. Data from Semrush; the 4-million-result version was live by June 2023 (Wayback Machine), so the data predates AI Overviews.
- **Sam Nemzer, SearchPilot, "Adding month and year to title tags" (3 December 2020).** https://www.searchpilot.com/resources/case-studies/seo-split-test-lessons-adding-month-year-to-title-tags. On one listings site, adding "in January 2020" to titles gave 5% more organic sessions, measured against control pages. Vendor case study, one site.
- **Darren Shaw, Whitespark, "2026 Local Search Ranking Factors" (6 November 2025).** https://whitespark.ca/local-search-ranking-factors/. 47 experts scoring 187 factors; opinion, not measurement. Map-pack ranks: primary GBP category #1, additional categories #8, review recency #11, owner responses to most reviews #122, frequency of Google posts #148. Citations "lost about half a percentage point".
- **Barry Schwartz, Search Engine Roundtable, "Google November 2026 core update ranking volatility" (16 November 2026).** https://www.seroundtable.com/google-november-2026-core-update-ranking-volatility-42543.html. Glenn Gabe shared "two domains" that were "dropping pretty heavily so far" and "were scaling heavily via AI-generated content". Commenters reported the opposite in their niches, such as a "2022 blog page with mass ai slop text" outranking theirs. Anecdotes mid-rollout, no numbers.
- **Tim Ferriss, "Feeling stuck? Read this…" (31 January 2011).** https://tim.blog/2011/01/31/feeling-stuck-read-this/. "It wasn't until I tested a few variations using Google AdWords that we decided on 'The 4-Hour Workweek'."

## How Google decides who ranks (`how-google-decides.md`)

**Principles.** Google ranks by relevance and quality, and measures relevance partly from aggregated click behaviour (How Search Works; Mehta opinion ¶96). Quality means trust built from experience, expertise and authority (Rater Guidelines 3.4), and original value compared with what already ranks (helpful content guidance). E-E-A-T is a rater framework, not a ranking factor.

**Claim audit**

- Google uses aggregated interaction data to judge relevance. **Supported**: How Search Works.
- Bing checks whether people click and stay or quickly come back. **Supported**: Bing's 2020 guidelines, via Search Engine Roundtable.
- NavBoost is one of Google's core ranking signals. **Supported**: Mehta opinion ("one of Google's core ranking models").
- NavBoost remembers clicks per query over 13 months, "based on testimony from Pandu Nayak". **Misattributed**: the opinion cites Eric Lehman for how NavBoost works and Nayak for the 13-month window. Fixed: the lesson names both.
- The leak names "good clicks", "bad clicks", "last longest clicks", not their weight. **Supported**: SparkToro.
- AI Overviews on 43% (AWR) and 82.5% of branded queries (SE Ranking); Ahrefs' 58% is a desktop correlation. **Supported**: AWR, Search Engine Roundtable, Ahrefs.
- E-E-A-T, trust most important, experience is first-hand. E-E-A-T isn't a ranking factor. **Supported**: helpful content guidance; Rater Guidelines 3.4.
- Bylines, firsthand tests and an About page make trust visible. **Supported**: helpful content guidance; Rater Guidelines 3.4.
- The same company facts everywhere you appear. **Unsupported** by Google for organic search; it comes from @borjafat's post. Fixed: labelled as Borja Fat's advice and dropped from the check card.
- Fake author profiles are deception. **Supported**. "If AI helped write the page, say so." **Overstated**: Google asks for disclosure when automation "substantially" generates content. Fixed: "If AI wrote much of the page".
- Google's checklist asks for original information and substantial value. **Supported**.
- "Most top results repeat each other." **Unsupported**. Fixed: softened to "often".
- 70+ articles in four years, top rankings without much link building. **One person's claim** (@kunalvg), labelled.
- Underserved demand in a young category "holds for any young category". **Overstated**: @kunalvg saw it in Web3. Fixed: the reader checks their own category.
- A competitor who sponsored local youth sports for 10 years. **One person's claim** (@bloggersarvesh), labelled.

## Get your site found at all (`technical-basics.md`)

**Principles.** Google must be able to crawl, render and index a page before anything else matters (Starter Guide). Most fixes are mechanical and documented by Google. Rendering matters more for AI crawlers, which mostly didn't run JavaScript in 2024 (Vercel). Each AI company separates training bots from search bots. Page speed is a real but small ranking input; relevance wins.

**Claim audit**

- Google still recommends server-side or pre-rendering; "not all bots can run JavaScript". **Supported**: JavaScript SEO basics.
- None of the major AI crawlers render JavaScript. **Supported** as Vercel's December 2024 finding; the source line carries the year.
- Core Web Vitals are used in ranking, but relevance wins. **Supported**: page experience.
- Thresholds at the 75th percentile. **Supported**. The checklist said "under" each threshold. **Overstated** by a hair: web.dev says "or less". Fixed.
- FAQ rich results are no longer shown. **Supported**: Search Central updates.
- `noindex` keeps a page out; a robots.txt-blocked URL can still be indexed. **Supported**: robots.txt intro.
- `llms.txt` has no confirmed effect; Google needs no special AI files. **Supported** for Google: AI features doc.
- A sitemap stopped updating. **One person's claim** (@NicholasDulait's co-founder), labelled.
- `www` should redirect to the main address. **Supported**: consolidate duplicate URLs.
- Bot table and "each setting is independent". **Supported**: OpenAI, Anthropic, Perplexity and Google crawler docs.
- Google-Extended is a token and doesn't affect Search. **Supported**.
- ChatGPT-User and Perplexity-User may ignore robots.txt. **Supported**.
- OpenAI: about 24 hours for robots.txt changes. **Supported**.
- Cloudflare's AI Crawler and Agent access policies under Security → Settings → Bot traffic, with Search, Agent and Training. **Supported**: managed robots.txt doc (2 November 2026).
- "Training rules also hit bots that do both search and training." **Disputed**: Cloudflare says "Mixed-use crawlers are excluded from this edge block." Fixed.
- Managed robots.txt adds rules "when training is disallowed". **Overstated**: it needs Bot Preference Sync, and any of the three policies set to block triggers it. Fixed, with the doc linked.
- "Firewall rules can't make exceptions" to Bot Fight Mode. **Overstated**: Cloudflare names WAF custom rules and Page Rules; an IP Access rule that matches first does stop it. Fixed to "WAF custom rules".
- Bot Fight Mode can challenge legitimate crawlers. **One person's claim** (i365dev/awesome-seo), labelled; Cloudflare itself warns it "may challenge API or mobile app traffic".
- Bing's index feeds Copilot; AI Performance shows citations and grounding queries, not clicks. **Supported**: Bing blog.
- Google doesn't show where AI answers cited you. **Supported**: AI features doc counts AI Overviews and AI Mode inside the Web totals.
- Importing from Search Console verifies the site and brings sitemaps. **Supported**: Bing's 2019 blog, now linked.
- IndexNow reaches Bing and others, not Google. **Supported**: IndexNow FAQ.
- Cloudflare Crawler Hints sends changes to IndexNow. **Supported**: Crawler Hints doc, now linked.
- Fix buyer pages first, from Granola's case study. **One person's claim** (@wespreadjam, an AEO tool vendor), labelled.

## Build the pages buyers check before paying (`pages-that-sell.md`)

**Principles.** Every query has an intent, and Google's raters judge results by how well they meet it (Rater Guidelines 12.7). The live results show which page type meets that intent. Mass-produced or city-swapped pages are spam whatever the tool (scaled content and doorway policies).

**Claim audit**

- Four intent types; a Do query is to buy, download or obtain. **Supported**: Rater Guidelines 12.7.
- Choose keywords by closeness to purchase, not volume. **One person's claim** (@borjafat), consistent with intent-based rating.
- Live results show Google's current reading of intent. **Supported** in principle.
- Two pages chasing one search split Google's attention. **One person's claim** (Dulait, labelled in the trick). Google publishes nothing on "cannibalisation".
- Decision pages are the pages AI answers cite most. **Unsupported**: TheoAGI's playbook asserts it without data, and the same playbook quotes a vendor dataset where 85% of citations went to third-party pages. Fixed: labelled as TheoAGI's reading.
- Decision-page numbers (6 of top 10, 4 of top 10, 40 to 80 words, 5 to 8 options). **One person's claim**, labelled as rules of thumb.
- Google's passage ranking judges sections of a page. **Supported**: ranking systems guide.
- Topic authority is a news system; links help Google find and understand pages. **Supported**: news topic authority post; link best practices.
- Scaled content abuse, "regardless of how" pages are produced. **Misattributed** quote: Google's words are "no matter how it's created". Fixed.
- Doorway abuse: city pages that funnel to one destination. **Supported**.
- Google indexes thin pages slowly and removes them later. **One person's claim** (Korzhov), labelled.
- A new domain never ranked; 1 to 4 pages a week. **One person's claim** (Dulait; TheoAGI's authors), labelled.

## Improve the pages that already rank (`improve-what-ranks.md`)

**Principles.** A page Google already shows for a query has a measured starting point in Search Console. Readers skim, so the answer goes first (NN/g). Google can rank a page on one relevant passage. Internal links help Google find pages and learn what they're about.

**Claim audit**

- The Queries tab hides anonymised queries and stops at 1,000 rows. **Supported**: data discrepancies help page.
- Positions 10 to 30 mean "Google thinks the page fits but is incomplete". **Unsupported** as a Google statement: it's @asaio87's reading. Fixed in the body and the check card.
- Changes take a few hours to several months; wait a few weeks. **Supported**: Starter Guide.
- Expect one to three months. **One person's claim** (@asaio87). Fixed: attributed.
- Request indexing once; repeats don't speed it up. **Supported**: recrawl doc.
- Dulait's 60 days; URL Inspection shows the last crawl; crawling takes days to weeks. **Supported**: URL Inspection help, now linked; recrawl doc.
- Answer first; readers can stop at any point. **Supported**: NN/g.
- Main keyword in title, meta description and first paragraph. **One person's claim** (@asaio87's prompt). "Many pages miss at least one." **Unsupported**. Fixed: removed.
- Google builds most snippets from the page. **Supported**: snippet doc.
- No length limit; truncated to fit the screen. **Supported**: title-link and snippet docs.
- Every page you care about gets at least one internal link with descriptive anchors. **Supported**: link best practices.
- 3 to 5 internal links per article. **One person's claim** (@asaio87), labelled.
- The weekly Claude setup and the new-domain order. **One person's claim** (Borja Fat; TheoAGI), labelled.
- Core updates come several times a year, don't target specific sites, and a dropped page isn't necessarily bad. **Supported**: core updates guide.
- The Search Status Dashboard lists start and end dates. **Supported**: core updates guide; dashboard.
- Sites built on mass AI content were hit hardest in November 2026. **One person's claim**: two domains from Glenn Gabe, contradicted by other site owners' reports. The lesson says so and states that Google named no AI target. Scaled content abuse "no matter how it's created". **Supported**: spam policies.
- The five-step drop check (finished rollout plus a full week, week before the rollout, search types separately, 2 to 4 change nothing, 4 to 29 run the site-wide self-assessment with outsiders, no quick fixes). **Supported**: core updates guide.
- Deleting is a last resort; wanting to delete sections signals search-first content; recovery takes up to several months or the next core update, with no guarantee. **Supported**: core updates guide.

## Test titles for quick wins (`title-tests.md`)

**Principles.** Click rate depends on position, intent and SERP features (Advanced Web Ranking; Backlinko). Google rewrites titles it finds half-empty, obsolete, inaccurate or boilerplate, and used the title element about 87% of the time in 2021. A fair test needs a comparison group (SearchPilot).

**Claim audit**

- Google picks up a new title on its next crawl, a few days to a few weeks. **Overstated**: the title-link doc says Google must "recrawl and reprocess the page", and it may still show a different title link. Fixed in the body and CHECK card; the honest-test steps now start counting only once the new title shows for the target query, and call the test inconclusive if it never does.
- A new title "reports back in about two weeks" (TLDR and check card). **Overstated**: that's @borjafat's figure; Google gives days to weeks. Fixed: "within weeks".
- Moving up one spot raises click rate by about a third. **Overstated**: Backlinko's 32.3% is an average "all things being equal"; #10 to #9 made no significant difference, and the data predates AI Overviews. Fixed.
- Borja Fat: 20M+ clicks in 12 months, and the CTR table from those sites. **One person's claim**, labelled; the `ctr-check` diagram says so too.
- Advanced Web Ranking puts position 3 near 4%. **Supported** (3.89%, July 2026).
- Google rewrites titles "usually to your H1" when "too long, keyword-stuffed, repeated, out of date or off-topic". **Misattributed**: Google's listed issues are half-empty, obsolete, inaccurate, micro-boilerplate, no clear main title and language mismatch, with replacements from headings or prominent text. Length and stuffing are best-practice advice, not listed rewrite causes. Fixed.
- About 87% in 2021. **Supported**.
- QuickBooks alternatives 4.7% against under 1%. **One person's claim**, labelled.
- Next year's date in Q4. **One person's claim**; the lesson's Watch out cites Google's obsolete-title and changed-date guidance.
- SearchPilot: about 5% more organic visits from month and year. **Supported**.
- 60 characters is a rough target; Google sets no limit. **Supported**.
- CTR is clicks ÷ impressions. **Supported**: Performance report help.
- SearchPilot compares changed and unchanged page groups. **Supported**.
- Ad headlines capped at 30 characters. **Supported**.
- Tim Ferriss tested titles in AdWords. **Supported**.

## Rank on sites that already rank (`beyond-your-site.md`)

**Principles.** Google ranks pages with some site-wide signals, so a page on a strong host starts with some of its standing. Publishing your own signed work on a platform built for user content is allowed; placing content on a host mainly to borrow its ranking is site reputation abuse. Videos surface through key moments you set. Google Trends shows relative interest from a sample.

**Claim audit**

- Ranking works page by page with some site-wide signals. **Supported**: ranking systems guide; the spam policy adds that Google presumes new pages match the domain's quality.
- Site reputation abuse "such as paid coupon or casino pages on a news site". **Misattributed**: Google's examples are a payday-loan review page on an educational site and a casino page on a medical site, and it names an integrated coupons section as "not likely to take action". Fixed.
- Forums and opinion pieces are named as fine. **Supported**.
- The LinkedIn headline sets the article URL. **One person's claim** (@borjafat).
- Google prioritises key moments you set in the YouTube description. **Supported**: video best practices.
- Chapters start at 00:00, at least three, each 10 seconds or longer. **Supported**: YouTube Help.
- Freshness systems favour newer pages where people expect them. **Supported**: ranking systems guide.
- Trends shows sampled relative interest on 0 to 100, not volume. **Supported**: Trends FAQ.

## Win the local map (`local-seo.md`)

**Principles.** Google ranks local results on relevance, distance and prominence, and says complete, accurate profiles and more positive reviews help. Its guidelines limit who can list and how. Most specific ranking weights come from expert surveys, not Google (Whitespark).

**Claim audit**

- Relevance, distance, prominence; prominence uses links and reviews; complete and accurate info helps; no paying for rank. **Supported**: GBP help.
- Keep name, address and phone identical everywhere. **Partly supported**: Google asks for the real-world name used consistently; address and phone consistency across directories is practitioner advice, and Whitespark's experts see citations losing weight.
- GBP needs a place customers visit or a service area; virtual offices are ineligible. **Supported**: guidelines.
- Whitespark: 47 experts; primary category #1, additional categories #8, review recency #11, owner responses #122, post frequency #148. **Supported**.
- A secondary category brings new searches within a week. **One person's claim** (@bloggersarvesh), labelled.
- Fewest categories; never categories as keywords. **Supported**: guidelines.
- More reviews and positive ratings help. **Supported**: GBP help.
- 90 reviews gaining 15 a month beats 200 old ones. **One person's claim**, labelled.
- Paid reviews and review gating are banned. **Supported**: Maps policy.
- Google has confirmed replies help ranking. **Disputed**: Google's page says replies show you value feedback and help you stand out; the lesson already says so.
- Posts archived after 6 months, not 7 days. **Supported**: posts help.
- Most competitors never post on their GBP. **One person's claim**. Fixed: attributed to the author.
- 90 days outranks long-established businesses; 14 years in the field. **One person's claim**, labelled.

## Let an agent run your SEO (`agent-seo.md`)

**Principles.** Language models guess when they don't know, because training rewards guessing (OpenAI). An agent needs the least permissions it can work with, human approval for high-impact actions, and limits enforced outside the model (OWASP). Claude Code hooks are one place to enforce them.

**Claim audit**

- Training rewards guessing; rare facts can't be predicted. **Supported**: OpenAI.
- mcp-gsc is free, local and read-only by default. **Supported**: its README.
- OWASP "recommends three fixes". **Overstated**: OWASP lists eight mitigations; the three named are among them. Fixed: "its fixes include".
- A `PreToolUse` hook blocks a tool call with exit code 2. **Supported**: hooks reference.
- `noindex` removes a page, a canonical can swap the URL, robots.txt stops crawling. **Supported**: robots and canonical docs.
- The four silent changes. **One person's claim** (TheoAGI's list).
- Scorecard: 8 areas out of 5, pass at 32. **One person's claim**, labelled.
- A repo with 11,000 stars gets ChatGPT's crawler wrong. **Supported**: zubair-trabzada/geo-seo-claude (11.8k stars) says blocking GPTBot removes you from ChatGPT search; OpenAI's docs say each bot is independent.
- OAI-SearchBot decides ChatGPT search inclusion. **Supported**: OpenAI.
- TheoAGI's picks: seo-skills MIT; claude-seo links a paid community. **Supported**: the repos.
- Score-out-of-100 weights were never checked against rankings. **One person's claim** stated as fact. Fixed: attributed to TheoAGI.
- One popular repo installs with `curl | bash` from main. **Supported**: geo-seo-claude README.
- Distribb and ChatSEO wrote most of the articles. **Supported**: TheoAGI's post ("The two tools behind 49 of these articles").
