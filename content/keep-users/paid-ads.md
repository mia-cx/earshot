---
title: Run paid ads you can measure
order: 2
description: Count each sale once, match pages to ads, and measure what ads really add.
---

> [!TLDR]
> - Ad platforms report sales that follow an ad, not sales the ad caused. Only switching ads off somewhere shows the difference.
> - Fix tracking first: ad algorithms learn from your sale events, so each sale must count exactly once.
> - Make the landing page say what the clicked ad promised.
> - Feed your ad account better inputs: competitors' long-running ads, many cheap creatives, and data no rival has.

## Ads get credit for sales they didn't cause

Ads go to people who were likely to buy anyway, so "saw the ad, then bought" overstates what the ad did. Brett Gordon and colleagues compared 15 randomised experiments at Facebook with the usual tracking-based estimates. [In half of them the estimates were off by a factor of three](https://www.kellogg.northwestern.edu/faculty/gordon_b/files/fb_comparison.pdf), mostly too high. At eBay, [Steven Tadelis's team switched off search ads](https://www.nber.org/system/files/working_papers/w20171/w20171.pdf) and found ads on eBay's own brand name brought almost no extra sales: people clicked the free result instead.

Everything below is one person's playbook for working inside that problem: @korzhov_dm's eleven marketing-engineering workflows, written for Meta and Google ads on an online store. His numbers are unverified claims. If you don't spend on ads yet, skim this and come back when you do.

## Count every sale exactly once

Ad platforms optimise on the conversion events you send them. [Meta's documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices/) says only events it can match to a person feed its delivery optimisation. If sales are duplicated or missing, **the algorithm learns from wrong data**. Korzhov claims most accounts send duplicates or miss about a quarter of orders.

> [!TRICK] Deduplicate the purchase event
> 1. Stack: Google Tag Manager, GA4, server-side tracking (Stape), Meta Conversions API.
> 2. Send the purchase event from both the browser and the server with the same event ID and event name, so Meta merges them. [Meta drops the duplicate](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/) if it arrives within 48 hours.
> 3. In Meta Events Manager, confirm each order counts once. Check event match quality, which Meta scores out of 10. Korzhov aims for above 7; Meta publishes no target.

## Match the page to the ad

The ad promises one thing, the page says another, and that gap is where most paid traffic leaves. [Nielsen Norman Group's research on information scent](https://www.nngroup.com/articles/information-scent/) explains why: people click on a guess of what the page holds, and leave fast when the page doesn't confirm it. Closing that gap costs less than any increase in spend.

> [!TRICK] Rewrite the page per ad
> - Build a landing page whose headline and first section change to match the ad the visitor clicked. AI writes the variants.
> - Measure with PostHog.
> - Calculate the A/B test sample size before you start, and don't call the test early. [Evan Miller shows](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) that checking until it looks significant turns noise into false wins.

## Measure what ads really add

Korzhov puts platform over-crediting at 2 to 5 times. The experiments above point the same way, though the size varies by account. The only way to know yours is to switch ads off somewhere and watch what happens. [Google's researchers call this a geo experiment](https://research.google/pubs/measuring-ad-effectiveness-using-geo-experiments/): regions are split at random into ads on and ads off, and the off regions show what would have happened anyway.

> [!TRICK] Run a regional holdout
> - Turn Meta ads off in 5 matched regions for 4 weeks.
> - Compare the real sales drop with the sales Meta's attribution said it drove.
> - For an ongoing estimate per channel, try marketing mix modelling with the free tools [Google Meridian](https://developers.google.com/meridian) or [Meta Robyn](https://facebookexperimental.github.io/Robyn/). Both can take your holdout results as a check.

> [!RISK] You lose sales in the test regions
> Four weeks without ads in five regions means four weeks of lost sales there. Pick regions small enough that you can afford the drop.

> [!RISK] A small test may show nothing
> Sales swing a lot from week to week, and an ad's effect is small next to that. [Randall Lewis and Justin Rao](https://ideas.repec.org/a/oup/qjecon/v130y2015i4p1941-1973.html) found that even large retailers' ad experiments often left a return-on-spend range over 100 points wide. If your regions are small, a "no change" result may only mean the test was too small to see it.

> [!DIAGRAM] holdout

## Rebuild what already works, in volume

**Run time is the best public hint that an ad performs.** Nobody keeps paying for an ad that clearly loses money, so an ad live for two months is probably paying for itself. It's a heuristic, not proof: big brands also run awareness ads for months, and some accounts simply aren't managed.

> [!TRICK] Rebuild competitor ads that ran 60+ days
> 1. Have Claude Code write a scraper for the Meta Ad Library (free and public) covering 30 competitors.
> 2. Keep the ads that have run for more than 60 days.
> 3. Have AI rebuild each format for your product, with your own footage and claims.
> 4. Upload them paused, and review before switching them on.

> [!RISK] Copying creative invites IP complaints
> Copy the structure only. Never reuse a competitor's wording, footage or claims.

Creative matters more than any other choice you make. [Nielsen's analysis of about 500 campaigns](https://www.nielsen.com/insights/2017/when-it-comes-to-advertising-effectiveness-what-is-key/) found the ad itself drove more of the sales lift than reach, targeting or timing. Korzhov's claim goes further: the account that tests more creatives usually wins on Meta. He compares a $20k shoot that gives 10 videos with the same budget in API calls giving 1,000 (his estimate).

> [!TRICK] Batch AI UGC-style ads
> - Tools: Veo, Seedance or Kling for video; ElevenLabs for voice; auto-captions; a script that runs them in batches.
> - Input: one product photo and a 30-second script.
> - Output: 100 phone-style ads with different hooks, voices and openings, exported in 9:16 and 4:5.

> [!RISK] Fake customers break the rules
> [The FTC's 2024 rule](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) bans testimonials that misrepresent who gave them, AI-generated ones included, and platforms have their own AI-disclosure rules. Label the ads as AI, and never imply a real customer said it.

## Let an agent run the account on hard rules

Competitors' ad accounts are increasingly run by agents bidding in the same auction with the same platform data. Two agents with the same rules tie. **The winner has inputs others lack**: your review data, a scrape of your competitors, and what a customer really costs you across all channels.

> [!TRICK] Build an hourly ad agent
> Connect Claude Code to your Meta and Google Ads accounts, run it on a schedule with spend limits, and give it these rules:
> - Check the account every hour.
> - Pause ads costing over 3x your target cost per customer, after 50 conversions.
> - Raise budget 20% on ads that won three days in a row.
> - Write three new versions of the best ad.
> - Post every action, with its reason, to Slack, and keep a log.
>
> Korzhov's Claude skills for all eleven workflows: https://github.com/irinabuht12-oss/marketing-skills

> [!RISK] An agent can burn your budget
> Rules inside the agent aren't enough. Set spend caps on the ad platform itself, so a bug can't spend past them. *Keep bots from doing damage* covers the rest.

> [!DO] List a competitor's long-running ads
> Open the Meta Ad Library, search your closest competitor, and list every ad that has been live for more than 60 days: its first line, its format (video, image, carousel) and its landing page. Save the list in a doc.

> [!CHECK] In paid ads, what is the best public hint that a competitor's ad performs?
> How long it has run. Nobody keeps paying for a clearly losing ad, so one live for 60+ days probably pays for itself. It's a heuristic: brand ads and neglected accounts run long too.

> [!CHECK] Meta says your ads drove most of your sales. How do you find out what they really add?
> Switch ads off in a few matched regions for a few weeks and compare the real sales drop with what Meta claimed. Pick regions small enough to afford the lost sales.

> [!CHECK] In paid ads, why must every sale be counted exactly once?
> Ad algorithms learn from the sale events you send them. Duplicated or missing sales teach them from wrong data.

## Sources

- [Gordon, Zettelmeyer, Bhargava and Chapsky, *A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook* (2019)](https://www.kellogg.northwestern.edu/faculty/gordon_b/files/fb_comparison.pdf)
- [Blake, Nosko and Tadelis, *Consumer Heterogeneity and Paid Search Effectiveness* (2014)](https://www.nber.org/system/files/working_papers/w20171/w20171.pdf)
- [Lewis and Rao, *The Unfavorable Economics of Measuring the Returns to Advertising* (2015)](https://ideas.repec.org/a/oup/qjecon/v130y2015i4p1941-1973.html)
- [Vaver and Koehler, *Measuring Ad Effectiveness Using Geo Experiments* (Google, 2011)](https://research.google/pubs/measuring-ad-effectiveness-using-geo-experiments/)
- [Meta for Developers: Conversions API best practices](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices/)
- [Meta for Developers: Deduplicate Pixel and server events](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/)
- [Raluca Budiu, *Information Scent* (Nielsen Norman Group, 2020)](https://www.nngroup.com/articles/information-scent/)
- [Evan Miller, *How Not To Run an A/B Test* (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
- [Nielsen: When it comes to advertising effectiveness, what is key?](https://www.nielsen.com/insights/2017/when-it-comes-to-advertising-effectiveness-what-is-key/)
- [Google: Meridian](https://developers.google.com/meridian)
- [Meta: Robyn](https://facebookexperimental.github.io/Robyn/)
- [FTC: Final rule banning fake reviews and testimonials (2024)](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)
- [@korzhov_dm: eleven marketing-engineering workflows, from ad agents to incrementality](https://x.com/korzhov_dm/status/2118984106335756532)
