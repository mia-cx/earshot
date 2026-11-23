---
title: Get your site found at all
order: 2
description: Make your site crawlable and indexable with one checklist your coding agent runs.
---

> [!TLDR] A page Google and AI bots can't fetch, read and index can't rank, so make it readable without JavaScript first.
> - Most technical SEO is a mechanical checklist. A coding agent can apply almost all of it.
> - The last two items, human writing and earned links, are yours.
> - Let the AI search bots in, and set up Bing Webmaster Tools. Block a search bot and you vanish from that assistant's answers.
> - Fix pages tied to real buying questions first. Warnings on unimportant pages can wait.

## Technical SEO is a checklist

If Google can't fetch, render and index a page, nothing else in this module matters. Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) starts there. **The fixes are mechanical:** server-side rendering, a sitemap, no stray noindex tags, unique titles and fast pages. That makes them a good job for a coding agent, especially on a site you built quickly with one.

Rendering matters most. Googlebot runs JavaScript, yet Google [still recommends](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) server-side or pre-rendering because "not all bots can run JavaScript". [Vercel's crawler logs](https://vercel.com/blog/the-rise-of-the-ai-crawler) found that none of the major AI crawlers (OpenAI's, Anthropic's, Perplexity's) render JavaScript. A page that stays blank until scripts run looks blank to them.

Speed counts less than people think. Google [uses Core Web Vitals in ranking](https://developers.google.com/search/docs/appearance/page-experience), yet still shows the most relevant page "even if the page experience is sub-par". The [web.dev thresholds](https://web.dev/articles/vitals) apply to real visitors at the 75th percentile, not one lab test. Pass them, then stop polishing.

The checklist below ends with two jobs no agent can do: writing that doesn't read like AI filler, and links from sites people trust. See *How Google decides who ranks* and the *Backlinks* module.

> [!TRICK] Paste the checklist into your coding agent
> Adapted from a tongue-in-cheek prompt by @suraj_sharma14. The original strips every noindex tag, adds FAQ schema everywhere and promises page one by Monday. This version asks before removing any noindex tag, adds structured data only for what a page shows, and promises no date, because nobody can promise when Google ranks you:
>
> ```
> My vibe-coded site doesn't show up on Google. Fix it.
> - Switch to server-side rendering.
> - Create an XML sitemap.
> - Submit it in Search Console.
> - Let Googlebot in through robots.txt.
> - List every noindex tag and ask me before removing any. Keep them on staging, admin and login pages.
> - Collapse the redirect chains.
> - Fix every broken link.
> - Set canonical URLs.
> - Give every page a unique title and meta description.
> - Keep each page's title and H1 saying the same thing.
> - Add structured data only for what each page shows. Skip FAQ schema: Google no longer shows FAQ rich results.
> - Add breadcrumb navigation if the site has a real hierarchy.
> - Internally link every orphan page.
> - Write alt text for every image.
> - Compress images to WebP.
> - Pass Core Web Vitals: LCP 2.5 seconds or less, INP 200 ms or less, CLS 0.1 or less.
> - Rewrite anything that sounds like AI slop.
> - Add a real author with a real bio.
> - Earn backlinks from sites people trust.
>
> Show me the diff before you change robots.txt or a canonical.
> When you're done, list what you changed and which items I have to do myself.
> ```
>
> Unless your agent is connected to Search Console, submit the sitemap yourself.

## Check the result, not the claim

An agent saying "done" isn't Google seeing the page. Confirm each fix from Google's side:

- Inspect key URLs in Search Console to confirm they can be indexed.
- Look for blocks or noindex tags you didn't mean to add.
- Make sure every page sits in your navigation and sitemap, reached by normal `<a href>` links.
- After every publish, check the new page is in the sitemap. Sitemaps can stop updating without warning: one founder found a live page missing from his the day after publishing.
- Check the rendered page shows the answer, not an empty shell waiting for JavaScript.
- Open `www.yoursite.com` and check that it redirects to your main address.
- Keep structured data matching the facts visible on the page. Test it with Google's Rich Results Test.
- Compress images, drop scripts you don't need, and fix anything broken on mobile.
- Add an `llms.txt` file only if a tool you use reads it. It has no confirmed effect on AI citations, and Google says AI Overviews [need no special files](https://developers.google.com/search/docs/appearance/ai-features).
- To keep a public page out of Google, use `noindex`, and leave the page crawlable so Google can read the tag. A URL blocked in robots.txt [can still be indexed](https://developers.google.com/search/docs/crawling-indexing/robots/intro) if other sites link to it. Put staging and admin pages behind a login instead.

## Let the AI search bots in

AI companies run two kinds of bot. **Training bots collect pages to train models; search bots fetch pages so assistants can cite them.** Block a training bot to opt out of training. Block a search bot and you disappear from that assistant's answers.

| Company | Training | Search and live answers |
| --- | --- | --- |
| OpenAI | GPTBot | OAI-SearchBot (ChatGPT search) |
| Anthropic | ClaudeBot | Claude-SearchBot, Claude-User |
| Perplexity | none | PerplexityBot |
| Google | Google-Extended | Googlebot |
| Microsoft | none listed | Bingbot (feeds Copilot) |

Each setting is independent: you can block GPTBot and still appear in ChatGPT search ([OpenAI's crawler docs](https://developers.openai.com/api/docs/bots)). Google-Extended is a robots.txt token, not a bot that visits. It controls Gemini training and [doesn't affect Google Search](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers).

A third kind of bot fetches a page when a person asks the assistant about it: ChatGPT-User, Claude-User, Perplexity-User. OpenAI and Perplexity say theirs may ignore robots.txt because a person triggered the fetch.

> [!TRICK] Test what the search bots get
> 1. Open your **live** robots.txt in a browser (`https://yoursite.com/robots.txt`), not the copy in your project. Your CDN can add rules you never wrote.
> 2. Ask for your homepage as each search bot:
>
> ```
> curl -A "OAI-SearchBot" -s -o /dev/null -w "%{http_code}" https://yoursite.com/
> ```
>
> 3. Repeat with `Claude-SearchBot`, `PerplexityBot` and `bingbot`. Anything but 200 is a problem.
>
> Your curl doesn't come from the bot's real addresses, so a firewall that checks them may block it even when the real bot gets through. Check your firewall's event log to tell the two apart. OpenAI says robots.txt changes take about 24 hours to reach ChatGPT search.

> [!RISK] Cloudflare can block bots for you
> If your site runs behind Cloudflare, three settings change what bots see:
> - **AI Crawler and Agent access policies** (Security → Settings → Bot traffic) split Search, Agent and Training controls. Setting Search to Block shuts out AI search bots. Setting Training to Disallow blocks training bots, but not bots that also do search.
> - **Managed robots.txt:** with Bot Preference Sync on, any of those policies set to block makes Cloudflare [add its own rules](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/) at the top of your robots.txt.
> - **Bot Fight Mode** challenges automated-looking traffic, and [WAF custom rules can't make exceptions to it](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/). One reading list (i365dev/awesome-seo) warns it can challenge legitimate crawlers. After launch, check Security → Analytics → Events for requests labelled Bot Fight Mode.

## Set up Bing too

**Bing's index feeds Microsoft Copilot, and Bing shows where AI answers cited you.** Google doesn't. Bing's [AI Performance report](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) lists citations across Copilot, Bing and some partners, with the searches behind them. Setup takes about ten minutes.

> [!TRICK] Bing Webmaster Tools in ten minutes
> 1. Sign in to Bing Webmaster Tools, open My Sites → Import, and import your site from Google Search Console. That [verifies the site and brings your sitemaps along](https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/).
> 2. Check the sitemap is listed. Submit it if not.
> 3. Turn on IndexNow, which notifies Bing (and [other engines that use it](https://www.indexnow.org/faq), not Google) the moment a page changes. Many site builders include it or offer a plugin. On Cloudflare, switch on [Crawler Hints](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/).
> 4. Open **AI Performance** to see how often Copilot, Bing's AI summaries and some partners cited each page, plus a sample of "grounding queries" (the searches the AI ran to find you). It counts citations, not clicks, and it's the closest thing to free citation data you'll get.

## Fix buyer pages first

A site audit tool will hand you hundreds of warnings. **Fix pages tied to real buying questions first:** pricing, comparisons, and the product pages people read before they pay. Crawl, index and speed problems there cost you money. The same warning on an old blog tag page can wait.

This order comes from a case study of Granola's AI search work, relayed secondhand by a vendor who sells AI search audits. Treat it as a sensible rule, not proven data. *Build the pages buyers check before paying* covers which pages those are.

> [!DO] Inspect your three money pages
> Open Google Search Console, run URL Inspection on your three most important pages (home, pricing, main product page), and write down for each one whether it is indexed and any problem it lists.

> [!CHECK] Which two items on the technical SEO checklist can't a coding agent do for you?
> Writing that doesn't read like AI filler, and earning links from sites people trust.

> [!CHECK] A site audit tool gives you 300 SEO warnings. Where do you start?
> On the pages tied to real buying questions: pricing, comparisons and the product pages people land on before they pay. The same warning on an old blog tag page can wait.

> [!CHECK] Why check SEO fixes in Search Console after your coding agent says they're done?
> An agent saying "done" is not Google seeing the page. URL Inspection shows whether Google can actually index it.

## Sources

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Vercel, *The rise of the AI crawler* (2024)](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [Google Search Central: Understanding page experience](https://developers.google.com/search/docs/appearance/page-experience)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [Google Search Central: Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Central: Google's common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)
- [Google Search Central: FAQ rich results removed (2026)](https://developers.google.com/search/updates)
- [OpenAI: Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic: Does Anthropic crawl data from the web?](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity: Perplexity crawlers](https://docs.perplexity.ai/guides/bots)
- [Cloudflare: Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/)
- [Cloudflare: Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
- [Cloudflare: Crawler Hints](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/)
- [Bing Webmaster Blog: AI visibility insights in Bing Webmaster Tools (2026)](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/)
- [Bing Webmaster Blog: Import sites from Search Console to Bing Webmaster Tools (2019)](https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/)
- [IndexNow: FAQ](https://www.indexnow.org/faq)
- [@suraj_sharma14: technical SEO checklist prompt](https://x.com/suraj_sharma14/status/2116062550416871512)
- [@borjafat: indexability, rendering and structured data checks](https://x.com/borjafat/status/2116164330014007296)
- [@wespreadjam: Granola case study, fixing buyer pages first](https://x.com/wespreadjam/status/2115568290307469548)
- [@NicholasDulait: the sitemap that stopped updating](https://x.com/NicholasDulait/status/2120063043614716174)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
