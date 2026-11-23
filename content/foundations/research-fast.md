---
title: Research a market in an afternoon
order: 3
description: Build a first market hypothesis with AI, then check it against what buyers say.
---

> [!TLDR] AI drafts a market hypothesis fast. Only what buyers have actually done confirms it.
> - Feed an AI model raw market material and ask questions that force it to think, not summarise.
> - Check it by asking buyers what they did, not what they think.
> - Reviews already say why people buy and complain, in words you can reuse.
> - A competitor's oldest running ads are a shortlist of ideas to test, not proof they pay.

## Load the AI with raw material

Use AI for desk research and hypotheses, never for the final decision. Nielsen Norman Group compared AI-generated "users" with real research and found the AI feedback shallow and too favourable ([NN/g](https://www.nngroup.com/articles/synthetic-users/)).

To draft a first go-to-market hypothesis in an afternoon, feed an AI model your market's raw material and ask hard questions. The key is what you ask: **ask for synthesis, not summary**.

The source author claims Y Combinator teaches this method and that it replaces about four weeks of research. Neither claim is verified, and the post ends with a plug for Gojiberry, their company.

> [!TRICK] Run a three-hour market research session
> 1. Gather raw material:
>    - 25 to 40 competitor websites, fully scraped (pricing pages, case studies, docs)
>    - the last few earnings calls from the 3 to 5 biggest incumbents
>    - 100+ customer reviews (G2, Capterra, Trustpilot, app stores)
>    - every Reddit or forum thread where people vent about the category
> 2. Ask questions that force thinking. In about 20 minutes these show where everyone agrees, where everyone is blind, and which pains nobody is building for:
>
> ```
> What do the winners in this market know that their customers would never admit?
> ```
>
> ```
> List the beliefs this whole industry takes for granted. For each one, what would need to happen for it to be false?
> ```
>
> 3. Pick your best angle and attack it, for several rounds:
>
> ```
> Steelman this thesis like a top-tier VC would. Then show me exactly where it fails.
> ```

## Check every hypothesis with buyers

People are polite about your idea, so opinions mislead. Rob Fitzpatrick's [*The Mom Test*](https://www.momtestbook.com/) has three rules: talk about their life instead of your idea, ask about past specifics instead of future opinions, and listen more than you talk.

Bob Moesta saw why selling condos: prospects said they didn't need a dining room, yet actual buyers kept coming back to their dining table ([Christensen Institute](https://www.christenseninstitute.org/theory/jobs-to-be-done/)).

1. Pick the riskiest claim in your AI hypothesis.
2. Find five people who have the problem now.
3. Ask about the last time it happened: what they did, what it cost, what they tried. Don't mention your idea.
4. Count compliments and "I would" as no data.
5. Keep the parts of the claim their stories match. Rewrite the rest.

## Read buyers' own words in reviews

Reviews already tell you why people buy and complain, in the exact words that stop a scroll. Joanna Wiebe of Copyhackers calls this [review mining](https://copyhackers.com/2014/10/amazon-review-mining/). In Wiebe's test for a rehab clinic, a headline lifted from an Amazon book review ("If you think you need rehab, you do") got over 400% more clicks.

Read reviews at scale instead of guessing. One author says most teams have read fewer than 50 (an estimate, not a measured number).

> [!TRICK] Mine 5,000 reviews for buyer language
> 1. Scrape about 5,000 reviews of your product and your competitors from Amazon, Trustpilot, Reddit and the App Store.
> 2. Have AI group them by topic and summarise each group.
> 3. Pull out the 10 most common complaints and the 10 most common reasons to buy.
> 4. Write 50 ad hooks (first lines that stop the scroll) in the customers' exact phrasing.

## Sort competitors' ads oldest first

A competitor's longest-running ads make a good shortlist of ideas to test. The source author reads a long run as a sign the ad pays for itself; the data can't show that. Pull their live Meta ads and sort oldest first.

Meta's public Ad Library shows each ad's copy and start date; the source also pulls landing pages using Virlo, a tool its author co-founded. In the EU, the [Digital Services Act](https://www.eu-digital-services-act.com/Digital_Services_Act_Article_39.html) requires large platforms to publish run dates and keep each ad listed for a year after it stops.

> [!RISK] A long run isn't proof of profit
> The library shows when an ad ran, not what it spent or earned. A small ad someone forgot to switch off can run for months. Treat run time as a lead to test, not a result to copy.

*Run paid ads you can measure* shows how to rebuild those long-running ads for your own product.

> [!DO] Copy ten buyer phrases
> Open a competitor's reviews on any one site (G2, Trustpilot, an app store) and read 30. Paste the 10 most vivid phrases into a doc, word for word, each tagged "complaint" or "reason to buy".

> [!CHECK] An AI model hands you a confident market thesis. How do you check it?
> Talk about buyers' lives instead of your idea, ask about specific past events instead of future opinions, and listen more than you talk.

> [!CHECK] You want ad hooks that sound like your buyers. Where do you get the words?
> From customer reviews of your product and your competitors. They already say why people buy and complain, in phrasing you can reuse word for word.

> [!CHECK] Why should you sort a competitor's ads oldest first?
> To shortlist ideas worth testing. A long run hints that the ad is worth keeping, but the library shows dates, not spend or results, so treat it as a lead, not proof.

## Sources

- [Maria Rosala and Kate Moran, NN/g, *Synthetic Users: If, When, and How to Use AI-Generated "Research"* (2024)](https://www.nngroup.com/articles/synthetic-users/)
- [Rob Fitzpatrick, *The Mom Test* (2013)](https://www.momtestbook.com/)
- [Clayton Christensen Institute: Jobs to Be Done theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/)
- [Joanna Wiebe, *Amazon review mining for copywriting* (2014)](https://copyhackers.com/2014/10/amazon-review-mining/)
- [EU Digital Services Act: Article 39, online advertising transparency](https://www.eu-digital-services-act.com/Digital_Services_Act_Article_39.html)
- [@romanbuildsaas: three-hour AI market research](https://x.com/romanbuildsaas/status/2119091729181880583)
- [@korzhov_dm: mining 5,000 reviews for hooks](https://x.com/korzhov_dm/status/2118984106335756532)
- [@dsqjaffa: competitors' oldest running ads](https://x.com/dsqjaffa/status/2119160045263077664)
