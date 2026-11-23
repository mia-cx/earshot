---
title: Keep the users you get
order: 1
description: Define your onboarded event, find what brings users back, and message on behaviour.
---

> [!TLDR]
> - Customers who stay are worth more every year, but new customers are what grow you. Plan for both.
> - Define "onboarded" as one key action repeated on your expected rhythm, and build that first moment into the product.
> - Trigger email and SMS on what people do, and hold 10% back to prove the messages add revenue.
> - Check-ins say what happens next and by when. They don't wait for approval nobody needs to give.

## Keep customers, and keep finding new ones

**Retention multiplies what acquisition brings in. It doesn't replace it.** *Map the whole funnel* named the stages; this lesson covers what happens after someone signs up.

Customers who stay get more profitable each year. [Fred Reichheld's research at Bain](https://media.bain.com/Images/BB_Prescription_cutting_costs.pdf) found they buy more, cost less to serve and refer others: in financial services, a 5% rise in retention lifted profit by more than 25%.

Keeping customers still won't grow you on its own. [A 2014 study by Erica Riebe, Byron Sharp and colleagues at the Ehrenberg-Bass Institute](https://ideas.repec.org/a/eee/jbrese/v67y2014i5p990-997.html) found that growing and shrinking brands differed mostly in how many new customers they won, not in how many they lost.

## Define onboarded as a habit, not a click

Define "onboarded" as **one key action that shows a user got value**. In @kunalvg's crypto examples it's "wallet connected" or "first transaction". For a writing app it might be "document shared".

A single click misses half the picture: how often. [Casey Winters, who led growth at Pinterest and Grubhub](https://www.caseyaccidental.com/p/why-onboarding-is-the-most-crucial-part-of-your-growth-strategy), counts a user as activated only when they still do that key action on your expected rhythm, weeks after sign-up. Pinterest used "saved a pin every week, four weeks after sign-up".

1. Pick the key action: the one that only happens when someone got value.
2. Pick the rhythm from the offline habit you replace. Ordering takeaway by phone is monthly, so Grubhub aimed for monthly orders.
3. Watch each month's sign-ups over time. Activated users are the ones still doing it at that rhythm.
4. Build the first "aha" moment into the product with whoever builds it, so new users feel the value before they leave.

Kunal argues that smoother onboarding alone puts you ahead of 90% of projects. That's his read of crypto, though the point holds: most teams spend their effort getting people in, not on what happens next.

## Know why people stay and why they leave

Retention takes as much planning as acquisition, so answer these questions early, starting with your onboarded event:

> [!FORM] Your retention plan
> 1. Which single action means a new user got value? Finish the sentence: "A user is onboarded when they…"
> 2. How many of last month's sign-ups did it? Check your analytics.
> 3. At what rhythm should an activated user repeat that action, how long after sign-up do you check, and how many sign-ups old enough to be checked still do it?
> 4. Hero features: which features bring people back?
> 5. Levelling up: how does a casual user become a power user?
> 6. Segments: which usage numbers matter for your product, so you can split users by them?
> 7. Churn: why do people leave, and which campaign would win them back?

Track the site with Google Analytics and in-product actions with a product analytics tool. Kunal uses Redash and Dune for on-chain data.

For rough benchmarks, [Lenny Rachitsky and Casey Winters asked about 20 growth leaders](https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29) what good six-month retention looks like: about 25% active for consumer social, 40% of paying subscribers for consumer software, and 60% of paying companies for software sold to small and mid-sized businesses. These are practitioner estimates, not a study.

Pricing belongs here too. Write down why, how and what you'll charge on day one; free with no revenue model doesn't last. *Read your pricing from your numbers* covers the signals that your price is wrong.

> [!DIAGRAM] funnel

## Message people on what they did

Send messages triggered by what a user just did. [BJ Fogg's behaviour model](https://behaviormodel.org/) says an action happens only when motivation, ability and a prompt meet at the same moment, so a timely prompt catches motivation while it's still there. Keeping a customer is cheaper too: winning a new one costs [5 to 25 times more](https://hbr.org/2014/10/the-value-of-keeping-the-right-customers), depending on the study and the industry.

To measure whether the messages add revenue, hold out a random control group. [Ron Kohavi's experiments at Microsoft](https://hbr.org/2017/09/the-surprising-power-of-online-experiments) showed that even experts misjudge which changes will pay off; only a random group that gets nothing tells you what the messages added. Decide the test's size and end date before you start, because [checking until the difference looks real](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) turns chance results into false wins.

> [!TRICK] Build five behaviour flows with a holdout
> 1. Use Klaviyo (or your email tool). Send it product events: viewed, added to cart, bought, went quiet.
> 2. Build five flows, each fired by one behaviour.
> 3. Hold out 10% of customers at random. They receive nothing.
> 4. Before you start, fix how many customers you'll test and for how many weeks.
> 5. Compare revenue between the two groups only at the end. On a small list, the test may show nothing either way.

@korzhov_dm writes for online stores and claims most have one abandoned-cart email and nothing else. Swap in your own events, such as signed up, reached the aha moment, or went quiet.

> [!DIAGRAM] holdout

## Make check-ins state the next step

If you sell a service or a membership, weekly check-ins are part of retention. **End each one with what happens next and by when**, not a request for feedback.

@huntkyle read the Slack history of a 35-client agency with chronically late delivery. Every message ended "let me know what you think", leaving the team waiting 1 to 3 days for approvals clients never asked to give. Hunt sells agency consulting, and this is his anecdote.

> [!TRICK] Check-ins bot prompt
> Fill in the brackets, run it weekly, and send nothing without reading it first.
>
> ```
> Role: you are my Check-ins bot.
> Read first: each active [client / member]'s goals in [Notion], the last two check-ins, and any message they've sent me since.
> When you run: every Monday at 9am.
> Done looks like: one draft per person covering what moved last week, what's blocked, and a single question that gets them replying.
> Never end on "let me know what you think". Say what happens next and by when. Only ask for sign-off when they really have to decide.
> Flag anyone who skipped their last 2 check-ins, and anyone in their first 4 months, because churn before month 4 loses you money.
> Ask me first before you: send any message, move a deadline, cut a deliverable or touch a price.
> ```

> [!DO] Write your onboarded event
> Fill in the first three questions of your retention plan above: your onboarded event, how many of last month's sign-ups did it, and the rhythm that counts as activated. Download the plan and put the activated number at the top of your roadmap.

> [!CHECK] In retention, how do you define "onboarded"?
> As one key action that shows a user got value. Count them as activated only once they keep doing it at the rhythm you expect, such as "saved a pin every week, four weeks after sign-up".

> [!CHECK] You send emails triggered by what customers do. How do you prove they add revenue?
> Hold out a random 10% of customers who receive nothing, fix the test's size and length up front, then compare revenue between the two groups at the end.

> [!CHECK] Why should a client check-in end with what happens next and by when, instead of "let me know what you think"?
> Asking for feedback leaves the team waiting days for approvals the client never needed to give. Stating the next step keeps delivery moving.

## Sources

- [Fred Reichheld, *Prescription for cutting costs* (Bain, 2001)](https://media.bain.com/Images/BB_Prescription_cutting_costs.pdf)
- [Riebe, Wright, Stern and Sharp, *How to grow a brand: Retain or acquire customers?* (2014)](https://ideas.repec.org/a/eee/jbrese/v67y2014i5p990-997.html)
- [Ehrenberg-Bass Institute: Effective brand growth, acquisition or retention?](https://marketingscience.info/news-and-insights/effective-brand-growth-acquisition-or-retention)
- [Amy Gallo, *The Value of Keeping the Right Customers* (2014)](https://hbr.org/2014/10/the-value-of-keeping-the-right-customers)
- [Casey Winters, *Why Onboarding is the Most Crucial Part of Your Growth Strategy* (2017)](https://www.caseyaccidental.com/p/why-onboarding-is-the-most-crucial-part-of-your-growth-strategy)
- [Lenny Rachitsky and Casey Winters, *What is good retention* (2020)](https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29)
- [BJ Fogg: Fogg Behavior Model](https://behaviormodel.org/)
- [Ron Kohavi and Stefan Thomke, *The Surprising Power of Online Experiments* (2017)](https://hbr.org/2017/09/the-surprising-power-of-online-experiments)
- [Evan Miller, *How Not To Run an A/B Test* (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
- [@kunalvg: product marketing basics, from acquisition to monetisation](https://x.com/kunalvg/status/1951276376251617737)
- [@kunalvg: the funnel and smoother onboarding](https://x.com/kunalvg/status/1685889947461402624)
- [@kunalvg: think in funnels from day one](https://x.com/kunalvg/status/2042111501608391080)
- [@korzhov_dm: email and SMS triggered on behaviour, with a holdout](https://x.com/korzhov_dm/status/2118984106335756532)
- [@huntkyle: a check-ins bot that states next steps](https://x.com/huntkyle/status/2118086670918750341)
