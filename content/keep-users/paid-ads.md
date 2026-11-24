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

Ads often reach people who were likely to buy anyway, so "saw the ad, then bought" overstates what the ad did. Two large field experiments show how far off that gets:

- Across 15 randomised Facebook experiments, Brett Gordon and colleagues found tracking-based estimates were [off by a factor of three in half the studies](https://www.kellogg.northwestern.edu/faculty/gordon_b/files/fb_comparison.pdf), mostly too high.
- At eBay, [Tom Blake, Chris Nosko and Steven Tadelis switched off search ads](https://www.nber.org/system/files/working_papers/w20171/w20171.pdf) and found ads on eBay's own brand name added almost no extra sales: people clicked the free result instead.

The playbook below is one person's way of working inside that problem: @korzhov_dm's eleven workflows for Meta and Google ads on an online store. His numbers are unverified claims. If you don't spend on ads yet, skim this and come back when you do.

## Count every sale exactly once

Ad platforms optimise on the conversion events you send. [Meta's documentation](https://developers.facebook.com/documentation/ads-commerce/conversions-api/best-practices) says only events matched to a person feed delivery optimisation. Duplicate or missing sales mean **the algorithm learns from wrong data**. Korzhov claims most accounts send duplicates or miss about a quarter of orders.

> [!TRICK] Deduplicate the purchase event
> 1. Stack: Google Tag Manager, GA4, server-side tracking (Stape), Meta Conversions API.
> 2. Send the purchase event from both the browser and the server with the same event ID and event name, so Meta merges them. [Meta drops the duplicate](https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events) if it arrives within 48 hours.
> 3. In Meta Events Manager, confirm each order counts once. Check event match quality, which Meta scores out of 10. Korzhov aims for above 7; Meta publishes no target.

## Match the page to the ad

[Nielsen Norman Group's research on information scent](https://www.nngroup.com/articles/information-scent/) shows people click on a guess of what the page holds, and leave fast when the page doesn't confirm it. Korzhov says the gap between ad and page is where most paid traffic leaves. He also claims fixing the page costs less than raising ad spend.

> [!TRICK] Rewrite the page per ad
> - Build a landing page whose headline and first section change to match the ad the visitor clicked. AI writes the variants.
> - Measure with PostHog.
> - Calculate the A/B test sample size before you start, and don't call the test early. [Evan Miller shows](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) that checking until it looks significant turns noise into false wins.

## Measure what ads really add

The only way to know what ads add for your account is to switch them off somewhere and watch sales. Korzhov puts platform over-crediting at 2 to 5 times; the experiments above point the same way, though the size varies by account.

If Meta offers your account a Conversion Lift test, which holds out people instead of regions, use that first: Meta rates it statistically stronger. Otherwise run a geo test in Meta's free [GeoLift](https://facebookincubator.github.io/GeoLift/), which plans the test and reads the result with the same model. It compares the regions without ads against a **synthetic control**: a weighted mix of other regions that tracked them before the test, standing in for what they would have sold with ads on.

> [!TRICK] Run a regional holdout in GeoLift
> - Load your past sales by region into GeoLift and run its power analysis. It picks which markets go without ads and for how long. Korzhov's default is 5 regions for 4 weeks.
> - Turn Meta ads off in those markets only.
> - Read GeoLift's result: percent lift, incremental sales and a confidence range. With ads off, the lift comes out negative; its size is what ads added. Don't subtract raw sales changes between regions yourself: a big and a small region growing at the same rate show a gap with no ad effect.
> - Compare it with the sales Meta's attribution claimed in the same markets, for the same conversion event, over the same number of weeks just before the test. Only work out how much Meta over-credits when the confidence range excludes zero.
> - For an ongoing estimate per channel, try marketing mix modelling with the free tools [Google Meridian](https://developers.google.com/meridian) or [Meta Robyn](https://facebookexperimental.github.io/Robyn/). Both can take your holdout results as a check.

> [!RISK] You lose sales in the test regions
> Four weeks without ads in five regions means four weeks of lost sales there. Pick regions small enough that you can afford the drop.

> [!RISK] A small test may show nothing
> Weekly sales are noisy, and an ad's lift is small next to that swing. [Randall Lewis and Justin Rao](https://ideas.repec.org/a/oup/qjecon/v130y2015i4p1941-1973.html) found that even large retailers' ad experiments often left a return-on-spend range over 100 points wide. With small regions, "no change" may just mean the test was too small to see it.

> [!DIAGRAM] holdout

## Rebuild what already works, in volume

**Run time is the best public hint that an ad performs.** Nobody keeps paying for an ad that clearly loses money, so an ad live for two months is probably paying for itself. It's a heuristic, not proof: big brands also run awareness ads for months, and some accounts simply aren't managed.

> [!TRICK] Rebuild competitor ads that ran 60+ days
> 1. List the active ads of up to 30 competitors in the [Meta Ad Library](https://www.facebook.com/ads/library/) (free and public). Read it by hand, or use its [API](https://developers.facebook.com/docs/graph-api/reference/ads_archive/), which covers commercial ads only where they reached the EU. Don't scrape it: Meta's [terms](https://www.facebook.com/legal/automated_data_collection_terms) forbid automated collection without written permission.
> 2. Keep the ads that have run for more than 60 days.
> 3. Have AI rebuild each format for your product, with your own footage and claims.
> 4. Upload them paused, and review before switching them on.

> [!RISK] Copying creative invites IP complaints
> Copy the structure only. Never reuse a competitor's wording, footage or claims.

**Creative matters more than any other choice you make.** [Nielsen's analysis of about 500 consumer-goods campaigns](https://www.nielsen.com/insights/2017/when-it-comes-to-advertising-effectiveness-what-is-key/) found the ad itself drove more sales lift than reach, targeting or timing.

Korzhov goes further and claims the account that tests more creatives usually wins on Meta. He compares a $20k shoot giving 10 videos with the same budget in API calls giving 1,000 (his estimate).

> [!TRICK] Batch AI UGC-style ads
> - Tools: Veo, Seedance or Kling for video; ElevenLabs for voice; auto-captions; a script that runs them in batches.
> - Input: one product photo and a 30-second script.
> - Output: 100 phone-style ads with different hooks, voices and openings, exported in 9:16 and 4:5.

> [!RISK] Fake customers break the rules
> [The FTC's 2024 rule](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) bans testimonials that misrepresent who gave them, AI-generated ones included, and platforms have their own AI-disclosure rules. Label the ads as AI, and never imply a real customer said it.

## Let an agent run the account on hard rules

Korzhov expects agents to run competitors' ad accounts, bidding in the same auction with the same platform data. Two agents with the same rules tie. **The winner has inputs others lack**: your review data, a scrape of your competitors, and what a customer really costs you across all channels.

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
> Run a geo test in GeoLift: its power analysis picks the regions that go without ads, and its synthetic control shows what they would have sold with ads on. The lift and its confidence range are what ads added. Compare that with what Meta claimed for the same regions, and pick regions small enough to afford the lost sales.

> [!CHECK] In paid ads, why must every sale be counted exactly once?
> Ad algorithms learn from the sale events you send them. Duplicated or missing sales teach them from wrong data.

## Sources

- [Gordon, Zettelmeyer, Bhargava and Chapsky, *A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook* (2019)](https://www.kellogg.northwestern.edu/faculty/gordon_b/files/fb_comparison.pdf)
- [Blake, Nosko and Tadelis, *Consumer Heterogeneity and Paid Search Effectiveness* (2014)](https://www.nber.org/system/files/working_papers/w20171/w20171.pdf)
- [Lewis and Rao, *The Unfavorable Economics of Measuring the Returns to Advertising* (2015)](https://ideas.repec.org/a/oup/qjecon/v130y2015i4p1941-1973.html)
- [Meta Open Source: GeoLift](https://facebookincubator.github.io/GeoLift/)
- [Meta Open Source: GeoLift walkthrough](https://facebookincubator.github.io/GeoLift/docs/GettingStarted/Walkthrough/)
- [Meta for Developers: Ad Library API (ads_archive)](https://developers.facebook.com/docs/graph-api/reference/ads_archive/)
- [Meta: Automated Data Collection Terms](https://www.facebook.com/legal/automated_data_collection_terms)
- [Meta for Developers: Conversions API best practices](https://developers.facebook.com/documentation/ads-commerce/conversions-api/best-practices)
- [Meta for Developers: Deduplicate Pixel and server events](https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events)
- [Raluca Budiu, *Information Scent* (Nielsen Norman Group, 2020)](https://www.nngroup.com/articles/information-scent/)
- [Evan Miller, *How Not To Run an A/B Test* (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
- [Nielsen: When it comes to advertising effectiveness, what is key?](https://www.nielsen.com/insights/2017/when-it-comes-to-advertising-effectiveness-what-is-key/)
- [Google: Meridian](https://developers.google.com/meridian)
- [Meta: Robyn](https://facebookexperimental.github.io/Robyn/)
- [FTC: Final rule banning fake reviews and testimonials (2024)](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)
- [@korzhov_dm: eleven marketing-engineering workflows, from ad agents to incrementality](https://x.com/korzhov_dm/status/2118984106335756532)
