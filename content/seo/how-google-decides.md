---
title: How Google decides who ranks
order: 1
description: Know which signals Google trusts, so you write pages it wants to show.
---

> [!TLDR] Google rewards the page that satisfies the searcher best, and it measures that partly from clicks.
> - Google uses aggregated click data to judge whether results help, so write titles your page delivers on.
> - Trust comes from real experience. Show a real author, and add something the top results don't have.
> - AI can find the gaps. Only you can fill them with firsthand tests, data and examples.
> - The easiest wins are in topics nobody covers well yet.

## Clicks are a ranking signal

**Google ranks pages partly by how people click on them.** Its [How Search works](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/) page says it uses "aggregated and anonymized interaction data to assess whether search results are relevant". Bing says the same openly: it checks whether people [click a result and stay, or quickly come back](https://www.seroundtable.com/bing-ranking-algorithm-signals-29706.html).

The US antitrust court record shows how Google does it. Judge Amit Mehta's [2024 opinion](https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf) describes NavBoost, one of Google's core ranking signals. Google's Eric Lehman testified that NavBoost remembers which results people clicked for each query. Pandu Nayak, Google's VP of Search, testified that it learns from the last 13 months of that click data.

The 2024 leak of Google's internal docs, [published by Rand Fishkin](https://sparktoro.com/blog/an-anonymous-source-shared-thousands-of-leaked-google-search-api-documents-with-me-everyone-in-seo-should-see-them/), mentions "good clicks", "bad clicks" and "last longest clicks". It names those fields, not how much they weigh.

The record doesn't show how one skipped result or one quick return affects a single page. The safe reading is the simple one: earn the click with a clear title, then deliver what it promised. Never write a title the page can't deliver.

AI Overviews take some of those clicks. How often they show depends on what's sampled. [Advanced Web Ranking](https://www.advancedwebranking.com/seo/organic-ctr) saw them on 43% of its sampled US desktop results in July 2026. SE Ranking found 82.5% in a sample of US branded queries ([Search Engine Roundtable](https://www.seroundtable.com/over-80-of-google-searches-have-ai-overviews-42372.html)). [Ahrefs estimates](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update) the #1 result's click rate is about 58% lower than forecast when one shows. That figure is a correlation from desktop informational searches, not a controlled test.

## Show who wrote it

**Both readers and search engines ask whether they can trust your page.** Google's [Search Quality Rater Guidelines](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf) frame this as E-E-A-T: experience, expertise, authoritativeness and trust, with trust the most important. Experience means first-hand use. A review from someone who used the product beats one from someone who didn't.

E-E-A-T [isn't a ranking factor by itself](https://developers.google.com/search/docs/fundamentals/creating-helpful-content); it describes what Google's systems try to reward. Make trust easy to see:

- A real byline on every article, linked to the author's relevant experience.
- Firsthand tests shown on the page, and how you ran them.
- A factual About page.
- The same company facts (name, address, what you do) everywhere you appear. That one is Borja Fat's advice; Google's guidance doesn't mention it.

> [!RISK] Never invent an author
> Google's guidance counts fake author profiles, AI headshots and invented credentials as deception. If AI wrote much of the page, say so.

## Add what only you can provide

**Your page wins by adding what the top 10 results lack:** your own tests, your own data, screenshots of you doing the thing, or a new angle. Top results often repeat each other. Google's [own checklist](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) asks whether a page offers "original information, reporting, research, or analysis" and "substantial value when compared to other pages in search results".

Split the work. Let AI find the gap by reading the top results, YouTube transcripts, forum threads and review complaints, then comparing what buyers ask with what existing pages answer.

You fill the gap. Have Claude interview you for examples, analyse your own records, count review complaints, or run the same task in competing products and note what happened. Write those sentences yourself. If AI drafts the page, make it mark every unverified fact as `[CHECK]`, then clear every mark before publishing.

> [!TRICK] Ask AI where your article is generic
> This prompt is from @asaio87, who runs an SEO agency:
>
> ```
> Here's my article: [paste]
>
> Tell me where a screenshot, image, table or diagram would help the reader more than text. For each one, tell me exactly what to show and why.
>
> Then tell me what the top 5 results for "[keyword]" all say the same way, and suggest 3 unique angles I could add from my own experience.
> ```

## Pick topics where you have an edge

**Firsthand content is hard to fake, and your work already produces it every week.** One marketer had engineers and other staff write up problems they solved, using basic keyword guidelines. Over four years they published 70+ articles and report top rankings and steady business without much link building (no traffic numbers given). If you work alone, every bug you fixed or customer question you answered is a candidate page.

The same marketer notes a second edge: new or fast-moving categories often have plenty of search volume with no good answer yet. He saw this in crypto. Before you write, check how weak the current results are in your own category.

## Some rankings aren't about SEO

**Sometimes a competitor outranks you for reasons no page can fix.** AI removes excuses for skipping audits, but it can't pick which keywords make money or read your market. One local SEO consultant's example: a business that sponsored local youth sports for 10 years and earned links from every local news site. Check what a competitor does offline before trying to out-write them.

> [!FORM] Your page's gap
> 1. Which article is your most important? Give its URL and main keyword.
> 2. Which of the three angles from the prompt will you add?
> 3. Your paragraph for that angle, written from your own experience.

> [!DO] Find one gap in your best page
> Paste your most important article into the prompt above. Fill in your page's gap with one of the angles it suggests, download it, and add the paragraph to the page.

> [!CHECK] What signals make a page easy for readers and Google to trust?
> A real byline linked to the author's experience, firsthand tests shown on the page, and a factual About page. Trust matters most, and first-hand experience builds it.

> [!CHECK] The top 10 Google results for your keyword all say the same thing. How does your page win?
> Add what they lack from your own experience: your tests, data, screenshots or a new angle. AI can find the gap, but only you can fill it.

> [!CHECK] Why should a page's title never promise more than the page delivers?
> Google ranks pages partly on aggregated click data about whether results help. A title that overpromises wins clicks the page can't satisfy, which works against you.

## Sources

- [Google: How Search works, ranking results](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/)
- [Amit P. Mehta, *United States v. Google LLC*, memorandum opinion (2024)](https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf)
- [Rand Fishkin, SparkToro: the leaked Google Search API documents (2024)](https://sparktoro.com/blog/an-anonymous-source-shared-thousands-of-leaked-google-search-api-documents-with-me-everyone-in-seo-should-see-them/)
- [Search Engine Roundtable: how Bing ranks pages, from Bing's webmaster guidelines (2020)](https://www.seroundtable.com/bing-ranking-algorithm-signals-29706.html)
- [Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Search Quality Rater Guidelines (2025)](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf)
- [Ahrefs, *Update: AI Overviews reduce clicks by 58%* (2026)](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update)
- [Advanced Web Ranking: Google organic CTR by position (2026)](https://www.advancedwebranking.com/seo/organic-ctr)
- [Search Engine Roundtable: over 80% of Google searches have AI Overviews (2026)](https://www.seroundtable.com/over-80-of-google-searches-have-ai-overviews-42372.html)
- [@borjafat: click signals, NavBoost and the 2024 leak](https://x.com/borjafat/status/2119227612258054502)
- [@asaio87: adding firsthand information, gap prompt](https://x.com/asaio87/status/2119171723849245031)
- [@borjafat: author bylines and filling content gaps](https://x.com/borjafat/status/2116164330014007296)
- [@suraj_sharma14: real author with a real bio](https://x.com/suraj_sharma14/status/2116062550416871512)
- [@kunalvg: staff writing up solved problems](https://x.com/kunalvg/status/1697157671567470819)
- [@kunalvg: underserved search demand](https://x.com/kunalvg/status/1685889947461402624)
- [@bloggersarvesh: AI research and the offline edge](https://x.com/bloggersarvesh/status/2088983373859725755)
- [@NicholasDulait: marking unverified facts for review](https://x.com/NicholasDulait/status/2120063043614716174)
