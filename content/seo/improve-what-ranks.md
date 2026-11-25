---
title: Improve the pages that already rank
order: 4
description: Use Search Console data to add missing answers to pages Google already trusts.
---

> [!TLDR] A page Google already shows has data on what searchers wanted from it, so improving it beats starting from nothing.
> - Your fastest SEO gains come from improving top pages, not writing new ones.
> - Search Console shows which queries a page gets seen for but doesn't answer. Add those answers.
> - Answer the main question in the first two paragraphs, and link pages where a reader wants to go next.
> - Give Claude your data and a playbook so it can run these checks every week.
> - After a core update, wait a week past the rollout before you compare. Only large drops need work.

## Start with pages Google already trusts

**A page that already ranks is closer to a win than a page that doesn't exist.** Google already shows it for real searches. If it sits on page 2 or 3 (positions 10 to 30), @asaio87 reads that as relevant but incomplete. Add what's missing and it can climb.

Search Console shows what's missing. Each page's Queries tab lists searches it appeared for, including ones the article never mentions. Add those answers. The tab [hides anonymised queries and stops at 1,000 rows](https://support.google.com/webmasters/answer/17010575), so a query missing from it doesn't mean the page never showed for it.

Give changes time to show up. Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) says updates take anywhere from a few hours to several months, and advises waiting a few weeks before judging. @asaio87 gives it one to three months.

> [!TRICK] Refresh a top page from its own query data
> From @asaio87, who runs an SEO agency.
>
> 1. Search Console → Performance → Pages. Sort by clicks, then impressions. Take the top 10.
> 2. Get the data into Claude: connect Search Console through an MCP connector, or click a page → Queries tab → Export, and upload the zip. Use the last 3 months, not 7 days.
> 3. Run this prompt:
>
> ```
> My site is [URL]. Here's my GSC data for the last 3 months: [pull via connector or attached export]
> Find my top 10 pages by clicks and impressions
>
> For page #1, list queries with impressions that the article doesn't directly answer or mention
> List queries ranking in positions 10–30
>
> For each one, tell me exactly where it belongs: new H2, new paragraph, FAQ entry, or a tweak to an existing sentence
> Rewrite only the sections that need to change, don't rewrite the whole article
>
> Current article: [paste or URL]
>
> Stop after page #1 and wait for me before moving to the next.
> ```
>
> 4. Search Console → URL Inspection → Request indexing for each updated page. Once is enough: Google says [asking again won't speed it up](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
> 5. Wait until URL Inspection shows Google has recrawled the page, then give it a few weeks. Pull the queries again and repeat.

> [!TRICK] The Monday version
> Nicholas Dulait (who sells an SEO agent, ChatSEO) runs a lighter loop for one hour every Monday:
> 1. Search Console, last 28 days: list searches where your average position is 5 to 15, with clicks, impressions and the ranking page.
> 2. Group them by page.
> 3. For the 3 pages with the most impressions, decide what to add or change so the page answers those searches better.
> 4. Skip any page you edited recently that Google hasn't crawled since. Dulait waits 60 days. URL Inspection [shows the last crawl date](https://support.google.com/webmasters/answer/9012289), which is a better test: Google says crawling takes a few days to a few weeks.

## Other refreshes worth doing

- Find pages losing clicks. Compare against the same season last year so a recurring dip doesn't look like a new problem.
- Update old prices and screenshots.
- Merge pages that cover the same thing, and redirect the old URLs to the merged one.
- Rewrite weak titles (see *Test titles for quick wins*).

## Measure a core update drop before you fix it

Several times a year Google makes broad changes to how it ranks pages, called core updates. [Google says](https://developers.google.com/search/docs/appearance/core-updates) they "don't target specific sites or individual web pages", and a page that drops isn't necessarily bad: other pages may now serve the search better. The [Search Status Dashboard](https://status.search.google.com/) lists each update with its start and end dates.

After the November 2026 update, posts on X said sites built on mass-produced AI content were hit hardest. The evidence so far is two domains Glenn Gabe [shared while they dropped](https://www.seroundtable.com/google-november-2026-core-update-ranking-volatility-42543.html), while other site owners reported AI-written pages outranking theirs. Google didn't say the update targeted AI content. Its spam policies already treat pages mass-produced to rank as scaled content abuse, "no matter how it's created" (see *Build the pages buyers check before paying*).

> [!TRICK] Read a core update drop
> From Google's core update guide, plus one check for AI answers:
> 1. Wait until the Search Status Dashboard shows the update finished, then at least one more full week.
> 2. In Search Console, compare that week with the week before the rollout started. Check Web, Image, Video and News separately. First check Google's [data anomalies list](https://support.google.com/webmasters/answer/6211453): a logging error can fake a drop.
> 3. Open Performance → Generative AI too. Jam (@spreadjam), who sells an AI-search tool, reads it this way: clicks down while AI Overview and AI Mode impressions hold means you still appear in AI answers, so look for pages that lost rankings or clicks. Then rerun the buyer questions you track (see *Track the questions buyers ask AI*), starting with the pages closest to revenue. Where a competitor replaced you, read their cited page for what yours skipped.
> 4. Small drop, like position 2 to 4: change nothing. Google advises against editing content that already performs well.
> 5. Large drop, like 4 to 29: answer Google's [self-assessment questions](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) for the whole site, not just the page, and look at what now outranks your hardest-hit pages. Ask someone unconnected to the site to answer them too.
> 6. Improve those pages properly, for example by rewriting or restructuring them. Skip quick fixes, like removing an element because you heard it hurts SEO.

> [!RISK] Delete only what can't be saved
> Google calls deleting content "a last resort". If you're thinking of deleting whole sections, Google reads that as a sign they were written for search engines first, and removing those can help the rest of the site. Recovery can take several months, sometimes until the next core update, and Google guarantees none.

## Answer the question up front

**Put the answer in the first two paragraphs.** Journalists call this the inverted pyramid. Amy Schade at the [Nielsen Norman Group](https://www.nngroup.com/articles/inverted-pyramid/) explains why it fits the web: people skim, and can stop at any point and still get the main idea. Skip the 300-word warm-up story.

Check that the main keyword appears in three places: the title, the meta description and the first paragraph. Keep the title matching the H1, and give the page a useful share image.

Treat the meta description as click copy, not a ranking lever: Google [builds most snippets from the page itself](https://developers.google.com/search/docs/appearance/snippet) and uses your description only when it fits the search better.

> [!TRICK] Check the intro and get title options
> From @asaio87:
>
> ```
> Here's my article: [paste]
> Main keyword: [keyword]
>
> Check if the main query is answered within the first 2 paragraphs. If not, rewrite the intro so it is
>
> Check that the main keyword appears in the title, meta description and first paragraph
> Give me 3 title options under 60 chars and 3 meta descriptions under 155 chars
>
> Keep my tone of voice, no fluff, no filler words
> ```
>
> Google sets no length limit. It cuts titles and descriptions to fit the screen, so these numbers are rough targets.

## Link where a reader wants to go next

**Link every page you care about from at least one other page, with anchor text that makes sense out of context.** That's the floor in Google's [link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): internal links show Google which pages matter and help readers keep going. As a rule of thumb, @asaio87 adds 3 to 5 per article, only where a reader would actually click.

- Link articles to the product pages they relate to.
- Link to orphan pages (pages nothing else links to).
- Link from established pages to pages close to page one.
- Put the link next to the question it answers, and describe the destination in the anchor text. Vary the wording.
- Put key guides and product pages in the footer.
- Measure clicks on internal links to see which ones work.

> [!TRICK] Get internal link suggestions
> From @asaio87:
>
> ```
> Here are my pages with their URLs and main keywords: [paste list]
>
> Suggest internal links between them. For each one give me the source page, target page, the exact sentence where it fits, and the anchor text. Only suggest links a reader would actually click. Max 3–5 per article.
> ```

## Make it a weekly job for Claude

These checks repeat, so hand them to an agent with a written playbook. Borja Fat describes this setup; he sells a Claude SEO connector (Distribb).

- Give Claude your website, product facts and Search Console data. Pick one tactic list and have it work through it.
- Connect Search Console (MCP connector) and your CMS so Claude can prepare page edits.
- Keep a playbook file: product facts, writing examples, instructions, finished examples. Add every correction you make.
- Schedule page and citation checks, and have Claude open each published URL to confirm changes went live. Log finished jobs and failures so nothing runs twice.
- Track starting metrics and edits, sales by landing page, UTM-tagged links, and profile calls and bookings.

*Give the bot your context, not clever prompts* goes deeper on playbooks.

## Save this for month three on a new domain

**A new domain doesn't have Search Console data yet.** Striking-distance fixes, title tests and pruning all need months of queries and positions. Start them in month three, and wait 2 to 3 months before judging any change.

> [!TRICK] The order for a new domain
> From TheoAGI's playbook, distilled from the articles they read:
> - **Week 0:** the checks in *Get your site found at all*, Bing Webmaster Tools, and a first run of your buyer questions (see *Track the questions buyers ask AI*).
> - **Launch:** Search Console, sitemap, directories.
> - **Month 1 on:** one decision page a week, with a video for each.
> - **Month 3:** open Search Console and start the refreshes in this lesson.

> [!DO] Refresh your top page
> Export the last 3 months of queries for your top page from Search Console, run the refresh prompt above, and add the first suggested section to the page.

> [!CHECK] In Search Console, where do you find what a ranking page is missing?
> The page's Queries tab. Searches the page appears for but never mentions are what to add.

> [!CHECK] Your article opens with a 300-word story before it gets to the point. What do you change?
> Answer the main question in the first two paragraphs. Then check the main keyword appears in the title, the meta description and the first paragraph.

> [!CHECK] Why improve a page ranking at positions 10 to 30 before writing a new one?
> Google already shows that page for real searches, so adding the answers it's missing can move it up. A brand-new page starts from nothing.

## Sources

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Search Console Help: Performance report data discrepancies](https://support.google.com/webmasters/answer/17010575)
- [Search Console Help: URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
- [Google Search Central: Google Search's core updates and your website](https://developers.google.com/search/docs/appearance/core-updates)
- [Google Search Status Dashboard](https://status.search.google.com/)
- [Search Console Help: Data anomalies in Search Console](https://support.google.com/webmasters/answer/6211453)
- [Search Console Help: Generative AI performance report (Search)](https://support.google.com/webmasters/answer/16984139)
- [Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Barry Schwartz, Search Engine Roundtable, *Google November 2026 core update ranking volatility* (2026)](https://www.seroundtable.com/google-november-2026-core-update-ranking-volatility-42543.html)
- [Amy Schade, Nielsen Norman Group, *Inverted Pyramid: Writing for Comprehension* (2018)](https://www.nngroup.com/articles/inverted-pyramid/)
- [Google Search Central: Control your snippets in search results](https://developers.google.com/search/docs/appearance/snippet)
- [Google Search Central: SEO link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [@asaio87: query-gap refresh, intro check and internal link prompts](https://x.com/asaio87/status/2119171723849245031)
- [@borjafat: refresh moves, internal links and the Claude SEO playbook](https://x.com/borjafat/status/2116164330014007296)
- [@borjafat: running SEO with Claude and Search Console](https://x.com/borjafat/status/2119227612258054502)
- [@NicholasDulait: the weekly positions 5 to 15 loop](https://x.com/NicholasDulait/status/2120063043614716174)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
- [@spreadjam: checking AI answers after the November 2026 core update](https://x.com/spreadjam/status/2125294993413972179)
