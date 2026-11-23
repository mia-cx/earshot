# Literature: Search engines (`content/seo/`)

Research notes for module 7. Each lesson lists the principles it rests on, the strongest sources found, and a check of every number and factual claim in the lesson.

Every source below was opened and read in November 2026. Primary sources come first: Google Search Central, Google's help centres, the US court record, Bing, web.dev, and the AI companies' own crawler docs. Industry studies (Ahrefs, Backlinko, Advanced Web Ranking, SearchPilot, Whitespark) are correlational, vendor-run or expert surveys. The lessons label them that way and never state them as fact.

Claim marks: **confirmed** (a primary source says so), **disputed** (a primary source or stronger study says otherwise, or the claim overstates it), **unverified** (no source found; one practitioner's claim).

## Sources

### Google

- **Creating helpful, reliable, people-first content.** https://developers.google.com/search/docs/fundamentals/creating-helpful-content. Asks whether content gives "original information, reporting, research, or analysis" and "substantial value when compared to other pages in search results". Defines E-E-A-T, says trust matters most, and that "E-E-A-T itself isn't a specific ranking factor". The "Who, How, Why" section asks for bylines where readers expect them, explanations of how content was made and whether AI was used, and calls fake author profiles deception. Lists changing a page's date without substantial change, and writing to a word count, as warning signs.
- **Spam policies for Google web search.** https://developers.google.com/search/docs/essentials/spam-policies. Scaled content abuse: many pages generated "for the primary purpose of manipulating search rankings and not helping users", however they're produced. Doorway abuse: many similar pages for regions or cities that funnel to one destination. Site reputation abuse: third-party content published on a host "mainly because of that host's already-established ranking signals". Not a violation: user-generated content sites (forums, comment sections), columns and opinion pieces, and content with real editorial oversight.
- **SEO Starter Guide.** https://developers.google.com/search/docs/fundamentals/seo-starter-guide. Changes can take "a few hours" to "several months"; wait "a few weeks" before judging. Titles should be unique, clear, concise and accurate. Anchor text tells users and Google about the linked page. Lists myths: meta keywords, word count targets, E-E-A-T as a ranking factor, heading counts, duplicate content penalties.
- **Influencing your title links.** https://developers.google.com/search/docs/appearance/title-link. "There's no limit on how long a `<title>` element can be"; Google truncates "to fit the device width". Lists the sources Google draws title links from (title, main visual title, H1, og:title, anchor text) and the problems that make it rewrite one: half-empty, obsolete (outdated year), inaccurate, boilerplate, no clear main title, keyword stuffing.
- **More info about titles (Search Central blog, September 2021).** https://developers.google.com/search/blog/2021/09/more-info-about-titles. After refinements, Google uses the title element "around 87% of the time, rather than around 80% before".
- **Control your snippets.** https://developers.google.com/search/docs/appearance/snippet. Google builds snippets mainly from page content and uses the meta description only when it describes the page better. No length limit; truncated to device width.
- **A guide to Google Search ranking systems.** https://developers.google.com/search/docs/appearance/ranking-systems-guide. Names passage ranking, freshness, original content and reviews systems. The helpful content system became part of core ranking in March 2024. Google "generally won't show more than two web page listings from the same site" in top results. No mention of clicks.
- **How Search works: ranking results.** https://www.google.com/search/howsearchworks/how-search-works/ranking-results/. "We also use aggregated and anonymized interaction data to assess whether search results are relevant to queries."
- **SEO link best practices.** https://developers.google.com/search/docs/crawling-indexing/links-crawlable. Anchor text should be "descriptive, reasonably concise, and relevant". "Every page you care about should have a link from at least one other page on your site." Google can generally crawl only `<a href>` links.
- **JavaScript SEO basics.** https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics. Googlebot renders JavaScript, but "server-side or pre-rendering is still a great idea" and "not all bots can run JavaScript". A `noindex` in the original HTML can stop Google rendering the page.
- **Robots.txt introduction.** https://developers.google.com/search/docs/crawling-indexing/robots/intro. Robots.txt manages crawling and "is not a mechanism for keeping a web page out of Google"; use `noindex`.
- **Sitemaps overview.** https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview. Sites of about 500 pages or fewer that link every page may not need one; a sitemap doesn't guarantee crawling or indexing.
- **Consolidate duplicate URLs.** https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls. Redirects and `rel="canonical"` are strong signals, sitemaps weak; Google may still choose another canonical. Pick one host variant and redirect the rest.
- **Ask Google to recrawl your URLs.** https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl. Crawling takes "a few days to a few weeks"; requesting again "won't get it crawled any faster"; a request doesn't guarantee inclusion.
- **Understanding page experience.** https://developers.google.com/search/docs/appearance/page-experience. "Core Web Vitals are used by our ranking systems", but good scores don't guarantee a top ranking and Google shows the most relevant content "even if the page experience is sub-par".
- **AI features and your website.** https://developers.google.com/search/docs/appearance/ai-features. No extra requirements for AI Overviews or AI Mode; "You don't need to create new machine readable files, AI text files, or markup". Google says clicks from AI Overview pages are "higher quality".
- **Google's common crawlers (Google-Extended).** https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers. Google-Extended has no user agent of its own; it's a robots.txt token for Gemini training and grounding and "does not impact a site's inclusion in Google Search".
- **Latest documentation updates.** https://developers.google.com/search/updates. FAQ rich results stopped appearing from 7 May 2026; the docs were removed in June 2026.
- **Video SEO best practices.** https://developers.google.com/search/docs/appearance/video. Google prioritises key moments you set through structured data or the YouTube description.
- **Search Console Help: Performance report.** https://support.google.com/webmasters/answer/7042828. Defines clicks, impressions, CTR and average position (the topmost position, averaged across queries).
- **Understanding news topic authority (May 2023).** https://developers.google.com/search/blog/2023/05/understanding-news-topic-authority. Google's only published "topic authority" system covers news results, using notability, original reporting and reputation.
- **Search Quality Rater Guidelines (11 September 2025).** https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf. Section 3.4: trust is "the most important member" of E-E-A-T; experience means first-hand or life experience; raters judge creators by what they say about themselves, what others say, and what the page shows. Section 3.2: main content quality depends on effort, originality, talent or skill. Section 12.7: user intents (Know, Do, Website, Visit-in-person). Section 4.6.5: scaled content abuse rates Lowest. The content-creation guide says raters "have no control over how pages rank".

### Google help centres

- **Google Business Profile: Tips to improve your local ranking.** https://support.google.com/business/answer/7091. Local results rest on relevance, distance and prominence. "More reviews and positive ratings can help your business's local ranking." Replying shows you value feedback; the page doesn't say replies affect ranking. "There's no way to request or pay for a better local ranking."
- **Guidelines for representing your business on Google.** https://support.google.com/business/answer/3038177. Eligible businesses have a location customers visit or travel to customers. No virtual offices or remote mailboxes. "Use as few categories as possible to describe your overall core business"; don't use categories as keywords. No extra words in the business name.
- **Maps user-generated content policy: Prohibited and restricted content.** https://support.google.com/contributionpolicy/answer/7400114. Bans paid or incentivised reviews, and merchants who "discourage or prohibit negative reviews, or selectively solicit positive reviews".
- **Create and manage posts on your Business Profile.** https://support.google.com/business/answer/7342169. "Posts older than 6 months are archived unless a date range is set." No claim that posts affect ranking.
- **YouTube Help: Video chapters.** https://support.google.com/youtube/answer/9884579. First timestamp 00:00, at least three in ascending order, each chapter at least 10 seconds.
- **Google Trends Help: FAQ about Google Trends data.** https://support.google.com/trends/answer/4365533. Trends uses a sample, normalised to 0 to 100 against all searches for that place and time. It shows relative interest, not search volume.
- **Google Ads Help: About responsive search ads.** https://support.google.com/google-ads/answer/7684791. Headlines up to 30 characters, descriptions up to 90.

### US court record and the 2024 leak

- **Amit P. Mehta, Memorandum Opinion, *United States v. Google LLC*, No. 1:20-cv-03010 (D.D.C. 5 August 2024).** https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf. Finding of fact 96 (page 37): "Navboost is another signal that pairs queries and documents through memorizing user click data." It remembers which documents users clicked after a query. Trained on 18 months of data before 2017 and 13 months since, citing Pandu Nayak's testimony (Tr. 6405). ¶102 quotes a Google document: "Navboost remains one of the most power[ful] ranking components historically." Page 230 calls it "one of Google's core ranking models".
- **Rand Fishkin, SparkToro, "An Anonymous Source Shared Thousands of Leaked Google Search API Documents with Me" (28 May 2024).** https://sparktoro.com/blog/an-anonymous-source-shared-thousands-of-leaked-google-search-api-documents-with-me-everyone-in-seo-should-see-them/. Modules reference "goodClicks", "badClicks" and "lastLongestClicks". The docs don't show "the weight of particular elements" "nor does it prove which elements are used".

### Bing and IndexNow

- **Bing Webmaster Guidelines, ranking parameters (as reproduced by Search Engine Roundtable, 1 July 2020).** https://www.seroundtable.com/bing-ranking-algorithm-signals-29706.html. Bing lists relevance, quality and credibility, user engagement, freshness, location and page load time "in general order of importance". User engagement asks whether users clicked a result and whether they "quickly return to Bing". Microsoft's own page (https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) renders with JavaScript and didn't load for this research, so this is a secondary quote of it.
- **Bing Webmaster Blog, "New AI visibility insights in Bing Webmaster Tools" (16 June 2026).** https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/. The AI Performance report (public preview February 2026) shows where a site is cited in Copilot, Bing and select partner AI answers, with grounding queries. Adds intents, topics, citation share and period compare. Citation share is "not a ranking system".
- **IndexNow FAQ.** https://www.indexnow.org/faq. Participating engines: Amazon, Bing, Naver, Seznam.cz, Yandex, Yep. Google isn't listed. "Submitting a URL does not guarantee immediate indexing."

### AI crawlers and infrastructure

- **OpenAI: Overview of OpenAI crawlers.** https://developers.openai.com/api/docs/bots. OAI-SearchBot surfaces sites in ChatGPT search; GPTBot collects training data; "Each setting is independent of the others"; robots.txt changes take "~24 hours". ChatGPT-User acts for users and "robots.txt rules may not apply".
- **Anthropic: Does Anthropic crawl data from the web?** https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler. ClaudeBot (training), Claude-User (fetches for users), Claude-SearchBot (search quality). All three honour robots.txt.
- **Perplexity: Perplexity crawlers.** https://docs.perplexity.ai/guides/bots. PerplexityBot surfaces sites in Perplexity search and isn't used for training. Perplexity-User fetches for users and "generally ignores robots.txt rules".
- **Vercel, "The rise of the AI crawler" (17 December 2024).** https://vercel.com/blog/the-rise-of-the-ai-crawler. From Vercel network logs: "none of the major AI crawlers currently render JavaScript" (OpenAI's, ClaudeBot, PerplexityBot and others). Gemini (via Googlebot) and Applebot do. Log study by a hosting vendor.
- **Cloudflare: Bot Fight Mode.** https://developers.cloudflare.com/bots/get-started/bot-fight-mode/. "You cannot bypass or skip Bot Fight Mode using WAF custom rules or Page Rules." Challenged requests show "Bot Fight Mode" under Security > Analytics > Events.
- **Cloudflare: Managed robots.txt.** https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/. When a Search, Agent or Training policy is set to Block, Cloudflare prepends its own rules to your robots.txt.
- **web.dev: Web Vitals (updated 31 October 2024).** https://web.dev/articles/vitals. Good thresholds: LCP within 2.5 s, INP 200 ms or less, CLS 0.1 or less, measured at the 75th percentile of real page loads.

### Agents

- **Adam Kalai and others, OpenAI, "Why language models hallucinate" (5 September 2025).** https://openai.com/index/why-language-models-hallucinate/. "Standard training and evaluation procedures reward guessing over acknowledging uncertainty"; arbitrary rare facts can't be predicted from patterns.
- **OWASP GenAI Security Project, LLM06:2025 Excessive Agency.** https://genai.owasp.org/llmrisk/llm062025-excessive-agency/. Limit an agent's permissions to the minimum; "require a human to approve high-impact actions"; "implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed".
- **Claude Code docs: Hooks reference.** https://code.claude.com/docs/en/hooks. A `PreToolUse` hook runs before a tool call and can block it (exit code 2 or `permissionDecision: "deny"`).

### Writing for the web

- **Amy Schade, Nielsen Norman Group, "Inverted Pyramid: Writing for Comprehension" (11 February 2018).** https://www.nngroup.com/articles/inverted-pyramid/. Put the conclusion first; web users skim and may "stop reading at any point".

### Industry studies (correlational, vendor or survey)

- **Ryan Law, Ahrefs, "Update: AI Overviews reduce clicks by 58%" (4 February 2026).** https://ahrefs.com/blog/ai-overviews-reduce-clicks-update. 300,000 keywords, desktop Search Console CTR, December 2025 against December 2023: position-one CTR about 58% lower than forecast when an AI Overview shows. Correlational.
- **Barry Schwartz, Search Engine Roundtable, "Over 80% of Google searches have AI Overviews" (26 October 2026).** https://www.seroundtable.com/over-80-of-google-searches-have-ai-overviews-42372.html. Aggregates Semrush, SE Ranking (82.5%, US branded searches only) and seoClarity (62%, 55% to 84% by industry). No single tracker in the article shows 80% across all searches.
- **Advanced Web Ranking, "Google organic CTR by position" (July 2026 data).** https://www.advancedwebranking.com/seo/organic-ctr. US desktop: position 1 20.02%, position 2 10.36%, position 3 3.89%. An AI Overview cuts position-1 CTR to 9.69% (−52%). CTR varies hugely with SERP features, intent and brand.
- **Brian Dean, Backlinko, "We analyzed 4 million Google search results" (updated 16 April 2025).** https://backlinko.com/google-ctr-stats. Position 1 averages 27.6% CTR; moving up one spot adds 32.3% relative CTR. Titles of 40 to 60 characters had the best CTR. Data from Semrush (Backlinko's owner), charts dated 2022.
- **Sam Nemzer, SearchPilot, "Adding month and year to title tags" (3 December 2020).** https://www.searchpilot.com/resources/case-studies/seo-split-test-lessons-adding-month-year-to-title-tags. On one listings site, adding "in January 2020" to titles gave about 5% more organic sessions, measured with control and variant page groups. Vendor case study, one site.
- **Darren Shaw, Whitespark, "2026 Local Search Ranking Factors" (6 November 2025).** https://whitespark.ca/local-search-ranking-factors/. A survey of 47 experts scoring 187 factors; opinion, not measurement. Top map-pack factors: primary GBP category, proximity, keywords in the business name, address in the city. Review recency #11 and steady review flow #14. Owner responses to reviews #122; post frequency #148.
- **Tim Ferriss, "Feeling stuck? Read this…" (31 January 2011).** https://tim.blog/2011/01/31/feeling-stuck-read-this/. "It wasn't until I tested a few variations using Google AdWords that we decided on 'The 4-Hour Workweek'."

## How Google decides who ranks (`how-google-decides.md`)

**Principles.** Google ranks by relevance and quality, and measures relevance partly from aggregated click behaviour (Google's How Search Works; Mehta opinion ¶96). Quality means trust built from experience, expertise and authority (Rater Guidelines 3.4), and original value compared with what already ranks (Google helpful content; Rater Guidelines 3.2 originality). E-E-A-T is a rater framework, not a ranking factor (Starter Guide).

**Claim check**

- NavBoost exists and uses click data. **Confirmed**: Mehta opinion ¶96.
- Pandu Nayak described it in the 2023 trial. **Confirmed**: ¶96 cites Nayak's testimony for the 13-month window (Tr. 6405); Eric Lehman's testimony for how it works.
- "About 13 months of click data". **Confirmed**: ¶96 (18 months before 2017).
- "To decide which pages deserve the top spots". **Disputed (overstated)**: it's one core ranking signal that memorises which results people click for a query, alongside many others (¶96, ¶102). Lesson reworded.
- The 2024 leak mentions "good clicks", "bad clicks", "last longest clicks". **Confirmed**: SparkToro. The leak doesn't show weights or prove use; lesson now says so.
- Clicks that bounce straight back hurt a page. **Unverified as a mechanism.** Bing says it watches whether users "quickly return"; Google says it uses interaction data to assess relevance. The direction is supported; the exact effect isn't published. Lesson keeps it as a consequence, not a stated rule.
- AI Overviews on about 8 in 10 searches. **Disputed**: the Search Engine Roundtable figure combines trackers; seoClarity sees 62% (55% to 84% by industry), Advanced Web Ranking 43% of sampled US desktop results. Lesson now gives the range.
- #1 result gets about 58% fewer clicks with an AI Overview. **Confirmed as Ahrefs' estimate**: desktop, informational keywords, correlational. Advanced Web Ranking finds −52% for July 2026.
- Real bylines, firsthand tests, factual About page, consistent company facts help trust. **Confirmed** for bylines, firsthand tests and About pages as what raters and Google's self-assessment look for (helpful content; Rater Guidelines 3.4). Consistent company facts everywhere: **unverified** for organic search (it's a local-search practice).
- Top 10 results say the same things; add what they lack. **Confirmed as Google's stated aim**: "substantial value when compared to other pages in search results".
- 70+ articles in four years, top rankings, no traffic numbers. **Unverified**: one marketer's account.
- Underserved demand in young categories. **Unverified**: one marketer's observation.
- A competitor who sponsored local youth sports for 10 years. **Unverified**: illustrative example.

## Get your site found at all (`technical-basics.md`)

**Principles.** Google must be able to crawl, render and index a page before anything else matters (Starter Guide). Most fixes are mechanical and documented by Google. Rendering matters more for AI crawlers, which mostly don't run JavaScript (Vercel). Each AI company separates training bots from search bots (OpenAI, Anthropic, Perplexity docs). Page speed is a real but small ranking input; relevance wins (Google page experience).

**Claim check**

- Server-side rendering is needed. **Confirmed with nuance**: Googlebot renders JS, but Google still recommends SSR or pre-rendering; Vercel found major AI crawlers don't render JS.
- Submit a sitemap in Search Console. **Confirmed** as useful; not required for small, well-linked sites; doesn't guarantee indexing.
- Keep noindex on staging, admin, login. **Confirmed** by Google robots.txt docs: noindex, not robots.txt, keeps a page out.
- FAQ rich results no longer shown. **Confirmed**: stopped 7 May 2026 (Search Central updates).
- Core Web Vitals: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. **Confirmed** (web.dev), at the 75th percentile of real visits. Lesson adds that it's field data and that Google says relevance outweighs it.
- Sitemaps can stop updating without warning. **Unverified anecdote** (one founder).
- `www` should redirect to the main address. **Confirmed** by Google's canonicalization guide (pick one variant, redirect the rest).
- llms.txt has no confirmed effect on AI citations. **Confirmed** for Google: "You don't need to create new machine readable files, AI text files, or markup".
- Bot table. **Confirmed**: OpenAI, Anthropic, Perplexity, Google-Extended docs. Added: user-triggered fetchers (ChatGPT-User, Perplexity-User) may ignore robots.txt.
- Google-Extended is a token, not a visiting bot, and doesn't affect Search. **Confirmed**.
- OpenAI says robots.txt changes take about 24 hours. **Confirmed**.
- Bingbot feeds Copilot. **Confirmed** indirectly: Bing's AI Performance report counts citations in Copilot.
- Cloudflare: managed robots.txt prepends rules; Bot Fight Mode can't be skipped by firewall rules; events show "Bot Fight Mode". **Confirmed** (Cloudflare docs). The AI Crawl Control menu path isn't checked.
- Bing import from Search Console. **Confirmed** (Bing Webmaster Tools interface strings).
- IndexNow reaches Bing and others, not Google. **Confirmed** (IndexNow FAQ).
- AI Performance shows citations and grounding queries, not clicks. **Confirmed** (Bing blog).
- Fix buyer pages first (Granola case study via a vendor). **Unverified**.

## Build the pages buyers check before paying (`pages-that-sell.md`)

**Principles.** Every query has an intent, and Google's raters judge results by how well they meet it (Rater Guidelines 12.7: Know, Do, Website, Visit-in-person). The live results show which page type meets that intent. Mass-produced or city-swapped pages are spam whatever the tool (scaled content and doorway policies).

**Claim check**

- Choose keywords by closeness to purchase, not volume. **Unverified as a measured rule**; consistent with intent-based evaluation.
- Live results show the page format buyers expect. **Confirmed in principle**: raters judge results against the likely intent; the live results are Google's current reading of it.
- Two pages chasing one search split Google's attention. **Unverified**; Google says it generally shows no more than two results per site, but publishes nothing on "cannibalisation".
- Decision pages are the pages AI answers cite most. **Unverified**.
- Decision-page numbers (6 of top 10, 4 of top 10 overlap, 40 to 80 words, 5 to 8 options). **Unverified** rules of thumb; lesson already says so.
- "AI engines lift passages, not whole pages." **Partly confirmed**: Google's passage ranking judges sections of pages (ranking systems guide).
- Topical authority as a Google system. **Disputed for non-news sites**: Google's only published "topic authority" system covers news. Lesson now calls it a practitioner idea.
- Scaled content abuse can get pages dropped. **Confirmed** (spam policies). Added: city pages that funnel to one destination are doorway abuse.
- Google indexes thin pages slowly and removes them later. **Unverified** (Korzhov).
- New domain never ranked because of publishing pace. **Unverified**; Google's policy targets purpose and value, not a rate. 1 to 4 pages a week: **unverified**.

## Improve the pages that already rank (`improve-what-ranks.md`)

**Principles.** A page Google already shows for a query has a measured starting point in Search Console. Readers skim, so the answer goes first (NN/g inverted pyramid). Google can rank a page on one relevant passage (passage ranking). Internal links are how Google finds pages and learns what they're about (link best practices).

**Claim check**

- Positions 10 to 30 mean "relevant but incomplete". **Unverified interpretation**.
- Expect results over one to three months. **Consistent** with Google ("a few hours" to "several months"; judge after "a few weeks").
- Request indexing for each updated page. **Confirmed** as available; Google says repeat requests don't speed it up and there's a quota.
- Skip pages edited in the last 60 days; Google hasn't re-read them. **Disputed**: Google says crawling takes "a few days to a few weeks", and URL Inspection shows the last crawl date. Lesson now says to check the last crawl.
- Put the answer in the first two paragraphs. **Confirmed in principle** (NN/g).
- Main keyword in title, meta description and first paragraph. **Partly confirmed**: titles and anchor text matter; Google uses meta descriptions only occasionally for snippets and doesn't say they affect ranking. Lesson rewords: the meta description earns the click, not the ranking.
- Titles under 60 characters, meta descriptions under 155. **Disputed as limits**: Google sets no limit; it truncates to device width. Kept as practical targets.
- 3 to 5 internal links per article. **Unverified** number. Google's rule is that every page you care about has at least one internal link, with descriptive anchors.
- Compare against the same season last year. **Sound practice**, not sourced.

## Test titles for quick wins (`title-tests.md`)

**Principles.** Click rate depends on position, intent and SERP features (Advanced Web Ranking; Backlinko). Google rewrites titles it finds inaccurate, obsolete or stuffed, and uses the title element about 87% of the time (title-link docs; 2021 blog). A fair test needs a comparison group, because season and Google updates shift traffic (SearchPilot's control/variant method).

**Claim check**

- New title shows in Search Console within about two weeks. **Unverified**; Google says crawling takes a few days to a few weeks.
- Borja Fat: 20M+ clicks in 12 months. **Unverified**.
- CTR benchmarks: position 3 ≈ 9%, 4 ≈ 6%, 5 ≈ 4%. **Disputed**: Advanced Web Ranking's July 2026 US desktop data puts position 3 at 3.89%; Backlinko's older data is higher. Curves differ by study, device and SERP features. Lesson now tells readers to build a baseline from their own Search Console data. The `ctr-check` diagram still hard-codes the author's numbers (see final report).
- Google rewrites many titles, usually to the H1. **Confirmed** (title-link docs; about 13% of the time in 2021).
- QuickBooks alternatives 4.7% vs under 1%. **Unverified** (one site).
- Current year in the title. **Supported by one vendor test** (SearchPilot +5%, one listings site). Next year in Q4: **unverified and risky**: Google rewrites "obsolete" or inaccurate titles, and its helpful-content guidance flags dates changed without real updates. Lesson adds a Watch out.
- Under 60 characters so Google doesn't cut it off. **Disputed as a rule**: Google truncates by device width; Backlinko found 40 to 60 characters had the best CTR. Kept as a rough target.
- Judge on clicks, not CTR. **Sound**: CTR is clicks ÷ impressions (Search Console Help), so new impressions lower it.
- Ad headlines capped at 30 characters. **Confirmed** (Google Ads Help).
- Tim Ferriss chose *The 4-Hour Workweek* with an ad test. **Confirmed** (Ferriss's blog).

## Rank on sites that already rank (`beyond-your-site.md`)

**Principles.** Google ranks pages, and some hosts already rank. Publishing your own signed article on a platform built for user content is allowed; placing content on a host mainly to borrow its ranking is site reputation abuse (spam policies). Videos surface through key moments you set (video best practices; YouTube chapters). Google Trends shows relative interest from a sample (Trends FAQ).

**Claim check**

- "Parasite SEO" as a name for publishing on LinkedIn or Medium. **Disputed framing**: the term usually means the practice Google penalises as site reputation abuse. Lesson adds a Watch out drawing the line.
- LinkedIn headline sets the URL. **Unverified**.
- Chapters starting at 00:00. **Confirmed** (YouTube: at least three, each 10 seconds or longer). Google prioritises chapters you set.
- Trends history separates seasonal demand from spikes. **Confirmed in principle**; Trends shows relative interest, not volume.

## Win the local map (`local-seo.md`)

**Principles.** Google ranks local results on relevance, distance and prominence, and says complete, accurate profiles and more positive reviews help (GBP help). Its guidelines limit who can list and how (GBP guidelines; Maps review policy). Most specific ranking weights come from expert surveys, not Google (Whitespark).

**Claim check**

- GBP decides map-pack visibility; pick the most specific category. **Confirmed** (GBP help; guidelines: "as few categories as possible").
- Identical name, address and phone everywhere. **Unverified** as a Google rule; Whitespark reports citations losing weight.
- GBP requires in-person contact. **Confirmed** (guidelines: a location customers visit, or you travel to them).
- Adding a secondary category leads to new searches within a week. **Unverified** (author); additional categories rank #8 in Whitespark's survey. Google warns against categories used as keywords; lesson adds that.
- Recent reviews count more than total reviews. **Unverified by Google**; Whitespark experts rank recency #11. Google says more reviews and positive ratings help.
- Google has confirmed replying to reviews helps ranking. **Disputed**: Google's page says replies show you value feedback and help you "stand out", not that they help ranking; Whitespark experts rank owner responses #122 of 187.
- Review gating and paid reviews banned. **Confirmed** (Maps UGC policy).
- Posts expire after 7 days. **Disputed**: Google says posts are archived after 6 months unless a date range is set.
- Posting 2 to 3 times a week ties you to places. **Unverified**; Whitespark experts rank post frequency #148.
- 90 days outranks long-established businesses. **Unverified** (author).
- 14 years in the field. **Unverified** (author's bio).

## Let an agent run your SEO (`agent-seo.md`)

**Principles.** Language models guess when they don't know, because training rewards guessing (OpenAI, Kalai et al.). An agent needs the least permissions it can work with, human approval for high-impact actions, and limits enforced outside the model (OWASP Excessive Agency). Claude Code hooks are one place to enforce them.

**Claim check**

- Models invent numbers. **Confirmed** in principle (OpenAI).
- mcp-gsc is free, local and read-only by default. **Unverified** here (repo not opened).
- "Never" tier in a hook, not the prompt. **Confirmed** by OWASP's advice and Claude Code's `PreToolUse` blocking.
- Four silent site-killers (noindex, canonical, 404, robots.txt). **Confirmed** as mechanisms by Google docs (robots, canonicals). That they're "the" four is the author's list.
- 8 areas scored out of 5, pass at 32. **Unverified** rule of thumb.
- 11,000-star repo gets ChatGPT's crawler wrong. **Unverified**.
- OAI-SearchBot decides ChatGPT search inclusion. **Confirmed** (OpenAI).
- Site scores out of 100 were never checked against rankings. **Unverified**; reasonable.
- One repo installs with `curl | bash`. **Unverified** (repo not opened); the risk is general.
