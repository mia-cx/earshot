# Backlinks: literature and claim check

Research notes behind `content/backlinks/`. Every source below was opened and read on 2026-11-23. Anything not opened is marked "not verified" and kept out of the lessons.

The claim tables carry the verdicts of an independent audit (2026-11-23) by a reader who did not write the lessons and re-opened every source: **supported**, **overstated**, **misattributed**, **disputed**, **unsupported**, or **one person's claim** (labelled as such in the lesson). Where the lesson changed, the table says how.

## Sources

### How links count

- **Sergey Brin and Lawrence Page, "The Anatomy of a Large-Scale Hypertextual Web Search Engine", *Computer Networks* 30 (1998).** [Google Research page](https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/), full text at [snap.stanford.edu](https://snap.stanford.edu/class/cs224w-readings/Brin98Anatomy.pdf). Section 2.1.1 builds PageRank on academic citation counting, but does not count every link equally: a page's vote is split across all the links on it. Section 2.1.2 calls PageRank "a model of user behavior": a "random surfer" keeps clicking links, and the chance the surfer lands on a page is its PageRank. A page ranks high when many pages link to it, or when a few well-linked pages do. Section 2.2 attaches a link's anchor text to the page it points to, because anchors often describe a page better than the page itself.
- **Jeffrey Dean, Corin Anderson and Alexis Battle, US patent 7,716,225, "Ranking documents based on user behavior and/or feature data" (Google; filed 2004, granted 2010).** [Google Patents](https://patents.google.com/patent/US7716225B1/en). The "reasonable surfer" model: instead of every link being equally likely to be clicked, each link is weighted by how likely a real person is to click it, using features such as its position on the page, font, anchor words and whether it relates to the page's topic. Terms-of-service links, banner ads and unrelated links are named as rarely clicked. A patent shows what Google owned, not what it runs today; the patent has expired.
- **Google Search Central: [A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide).** PageRank was "one of our core ranking systems used when Google first launched", has changed a lot, and is still part of core ranking. Also names an exact-match domain system so that domains built to match a query don't get "too much credit", and SpamBrain for spam-policy violations.
- **Google Search Central: [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).** Google uses links "as a signal when determining the relevancy of pages and to find new pages to crawl". Good anchor text is descriptive, concise and relevant to both pages; don't cram keywords into it.
- **Google Search Central: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).** Google finds pages mainly through links. Other sites linking to you "happens naturally over time". Promotion through community and word of mouth is encouraged, but "you can overdo promoting your site and actually harm it". Keywords in a domain name "have hardly any effect beyond appearing in breadcrumbs". PageRank is one signal among many. The guide never mentions third-party scores such as Domain Rating.
- **Ahrefs: [What is Domain Rating (DR)?](https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr)** DR is Ahrefs' own relative 0 to 100 score of a site's backlink profile against others in its database. Ahrefs says DR "correlates with Google rankings pretty well" but less well than its page-level URL Rating, and warns against judging a site by DR alone. Nowhere does it say Google uses DR.

### Where Google draws the line

- **Google Search Central: [Spam policies, Link spam](https://developers.google.com/search/docs/essentials/spam-policies#link-spam).** Link spam is creating links "primarily for the purpose of manipulating search rankings". Named examples: buying or selling links that pass ranking credit (money, goods, services, or free products in exchange for a link); "excessive link exchanges" and partner pages made only to cross-link; automated link creation; requiring a link in terms of service without letting the site owner qualify it; advertorials with links that pass credit; links with optimised anchor text in articles, guest posts or press releases distributed on other sites; low-quality directory or bookmark links; widget, footer and forum-signature links. Paid links are a normal part of the web when qualified with `rel="sponsored"` or `rel="nofollow"`.
- **Google Search Central: [Qualify your outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links).** `sponsored` is for ads and paid placements (nofollow still accepted, sponsored preferred), `ugc` for comments and forum posts, `nofollow` for other cases. Links with these values "will generally not be followed".
- **Google Search Central Blog: [December 2022 link spam update](https://developers.google.com/search/blog/2022/12/december-22-link-spam-update) (14 December 2022).** SpamBrain now detects "both sites buying links, and sites used for the purpose of passing outgoing links", and neutralises unnatural links; "any credit passed by these unnatural links are lost".
- **Google Search Console Help: [Manual actions report](https://support.google.com/webmasters/answer/9044175).** "Unnatural links to your site" is issued for "a pattern of unnatural, artificial, deceptive, or manipulative links pointing to your site" and can apply to "some or all" of the site, which then ranks lower or drops out.

### Why people link

- **Google Search Central: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).** Self-assessment questions include "Does the content provide original information, reporting, research, or analysis?" and "Is this the sort of page you'd want to bookmark, share with a friend, or recommend?"
- **Pranjal Aggarwal, Vishvak Murahari, Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan and Ameet Deshpande, "GEO: Generative Engine Optimization", KDD 2024.** [arXiv:2311.09735](https://arxiv.org/abs/2311.09735). On their GEO-bench benchmark, adding quotations, statistics or cited sources to a page raised its visibility in generative-engine answers by about 30 to 40%; keyword stuffing did not help. Relevant here because the evidence that earns links also gets a page quoted by AI.
- **Mahe Chen, Xiaoxuan Wang, Kaiwen Chen and Nick Koudas, "Generative Engine Optimization: How to Dominate AI Search" (University of Toronto, 2025).** [arXiv:2509.08919](https://arxiv.org/abs/2509.08919). AI search engines show "a systematic and overwhelming bias towards Earned media (third-party, authoritative sources)" over brand-owned and social content, unlike Google's more balanced mix. Recommends practitioners "dominate earned media". Observational comparison, not an intervention.
- **Pratyush Kumar, "Generative Engine Optimization at Scale" (Ranqo, 2026).** [arXiv:2606.20065](https://arxiv.org/abs/2606.20065). In 100K+ AI responses about 100+ brands tracked on the author's own platform (March to May 2026), the "best-of" listicle was the most-cited content format, at about 21% of citations. Vendor data, self-selected clients, correlational.

### Cold email

- **US Federal Trade Commission: [CAN-SPAM Act: A Compliance Guide for Business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).** Applies to all commercial email, and "makes no exception for business-to-business email". Requires truthful headers and subject lines, a valid postal address, a clear opt-out honoured within 10 business days.
- GDPR and the EU/UK rules for unsolicited email: not verified for this pass. The lesson keeps its existing one-line mention and points to the cold email module.

## Lesson: Know what a link is worth (`what-links-are-worth.md`)

**Principles.** A link counts because a person might follow it (Brin and Page's random surfer; the reasonable surfer patent). Links are a relevance signal and a discovery path (Google link best practices). Third-party authority scores are estimates, not Google's numbers (Ahrefs). Mass, automated or low-quality directory links are link spam (Google spam policies), and SpamBrain neutralises them (2022 update).

| Claim in the lesson | Audit verdict | Source that settles it |
| --- | --- | --- |
| PageRank is "a model of user behavior": a random surfer clicking links | **supported** (section 2.1.2) | Brin and Page 1998, full text |
| Each page splits its vote across its links | **overstated** as "one link on a focused page": PageRank normalises by the number of links on a page, not by topic focus. Lesson now says "a page with few links" | Brin and Page 1998, section 2.1.1 |
| A patent weights links by click likelihood: position, wording, topic fit | **supported**: features include position, font, anchor words and topical cluster. The patent expired in March 2025 | US 7,716,225 |
| Google still names PageRank as a core ranking system | **supported** | Ranking systems guide (updated 2025-12-10) |
| DR is Ahrefs' relative score; correlates with rankings; don't judge a site by DR alone | **supported** | Ahrefs DR page |
| Use descriptive link text, not keywords | **supported** | Link best practices |
| Point links at pages ranking 10 to 30; 2 to 5 links a month | **one person's claim** (@asaio87, "2–5 a month is enough", no data), labelled in the lesson | @asaio87 |
| Some sites restrict clickable links to paid plans | **one person's claim** (@2whazzuup: "some are free, others have paid tiers"; "others restrict clickable hyperlinks") | @2whazzuup |
| Spam policies name low-quality directory links and automated link creation as link spam | **supported** | Spam policies |
| Since 2022 SpamBrain has neutralised them so they pass nothing | **overstated**: SpamBrain neutralises the unnatural links it detects. Lesson now says so | December 2022 link spam update |
| A pattern of them can earn a manual action | **supported** | Manual actions report |

## Lesson: Earn five links a week (`weekly-link-habit.md`)

**Principles.** Links accrue "naturally over time" from promotion people value, and too much promotion can harm a site (SEO Starter Guide). Low-quality directories, automated creation and required reciprocal links are link spam (spam policies). An approved listing may carry a `nofollow`, `ugc` or `sponsored` link, which Google generally doesn't follow (qualify outbound links).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Links build up "naturally over time"; "you can overdo promoting your site and actually harm it" | **supported** | SEO Starter Guide |
| Low-quality directory links and automated link creation are link spam | **supported** | Spam policies |
| Approval is not a link; `nofollow`, `ugc` and `sponsored` links "will generally not be followed" | **supported** | Qualify outbound links (updated 2025-12-10) |
| Keep name, description and logo identical so listings match one product | **one person's claim**, labelled as practitioner advice (@borjafat tactic 69; TheoAGI: "same name, same one-line description, same logo") | @borjafat; @TheoAGI |
| Pick 20 to 30 platforms, not 300 | **one person's claim**. The words are TheoAGI's, not @2whazzuup's (who says "choose your best 20") | @TheoAGI |
| Requiring a link in terms of service without letting the owner qualify it is link spam | **supported** | Spam policies |
| Five a week, Monday to Friday; tracker columns | **one person's claim**: practitioner routine | @2whazzuup |

## Lesson: Give people a reason to link (`links-you-earn.md`)

**Principles.** Links work like citations (Brin and Page). Google asks whether content offers "original information, reporting, research, or analysis" and is worth recommending (helpful content). Pages with statistics, quotations and cited sources are quoted more by generative engines (Aggarwal et al.). AI search leans on earned, third-party media more than Google does (Chen et al.).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| PageRank builds on academic citation counting | **supported** (section 2.1.1) | Brin and Page 1998 |
| Google asks for "original information, reporting, research, or analysis" and pages you'd recommend | **supported** | Helpful content |
| Top tier of the 69 tactics: roundups, statistics, journalist requests | **overstated**: the S tier also opens with link exchanges, and the A tier includes mining competitors' links. Lesson now lists both | @borjafat |
| AI search shows a "systematic and overwhelming bias" toward earned, third-party sources | **supported** | Chen et al. 2025, abstract |
| "Best X for Y" roundups are the single most-cited page type, about a fifth of AI citations | **supported** as one vendor's data from brands its customers track; correlational | Kumar 2026, abstract and acknowledgements |
| Cited sources for buying queries are "mostly listicles" | **disputed**, and the lesson says so: largest single format, not the majority | Kumar 2026; @SimonHoiberg |
| Keep the pitch to 120 to 180 words; one follow-up | **one person's claim** (TheoAGI) | @TheoAGI |
| CAN-SPAM "makes no exception for business-to-business email"; postal address; opt-out | **supported**. ftc.gov returns 404 to scripted requests; the page was read through the Wayback Machine (snapshot 2026-11-17) | FTC guide |
| Adding statistics, quotations or cited sources raised AI visibility 30 to 40%; keyword stuffing didn't help | **supported** (relative gain on position-adjusted word count; up to 37% on Perplexity) | Aggarwal et al. 2024, HTML v3 |
| Journalist platforms; some paid; no publication guaranteed | **one person's claim**, kept as a discovery list | @2whazzuup |
| Vendors often feature customer stories with a link | **unsupported** as a generalisation: the post only says to find vendors that "could feature your story". Lesson now says a vendor that runs customer stories may feature yours | @borjafat |

## Lesson: Tricks with a price tag (`grey-zone.md`)

**Principles.** Google defines link spam by purpose: links made "primarily" to manipulate rankings. Paid links are fine when qualified. Since 2022 SpamBrain detects link buyers and sellers and neutralises the links, so the usual cost of an unmarked paid link is that it passes nothing; a pattern of them can earn a manual action on some or all of the site.

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Link spam is links made "primarily for the purpose of manipulating search rankings" | **supported** | Spam policies |
| Paid links allowed only when marked `sponsored` or `nofollow` | **supported** | Spam policies; qualify outbound links |
| "Excessive link exchanges" named as a scheme | **supported** | Spam policies |
| SpamBrain detects link buyers and sellers; "any credit passed" is lost | **supported** | December 2022 link spam update |
| "Usually, a bought link is money for nothing" | **overstated**: Google says credit is lost for links SpamBrain detects, not for most bought links. Lesson now says "once SpamBrain catches it" | December 2022 link spam update |
| A pattern of unnatural links can earn a manual action on some or all of the site | **supported** | Manual actions report |
| TheoAGI's refuse list (exchange networks, paid Reddit tasks, 1,500 AI posts, city × service pages) | **one person's claim**: an AI-made summary of 66 articles by a founder of another product | @TheoAGI |
| Paid roundup pitch; "don't use" backlink marketplaces | **one person's claim** | @SimonHoiberg |
| One SEO ranks link exchange top-tier and sells an exchange product | **supported** from the post (S tier, item 1; Distribb exchange ad) | @borjafat |
| Exact-match "best X" domains ranked #1 in 10 days and drew a seven-figure offer | **one person's claim**, no URLs, amplified by a domain broker | @margatix; @andrewrosener |
| Google runs an exact-match domain system; keywords in a domain have "hardly any effect beyond appearing in breadcrumbs" | **supported** | Ranking systems guide; SEO Starter Guide |
| Links with optimised anchor text in distributed press releases are link spam | **supported** | Spam policies |

## Not verified, kept out of the lessons

- Reddit's official spam and self-promotion pages (403 to automated fetches). The "10% rule" is not used.
- GDPR rules for B2B cold email.
- Matt Cutts' 2012 exact-match domain announcement.
