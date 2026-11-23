---
title: Keep the users you get
order: 1
description: Define your onboarded event, find what brings users back, and message on behaviour.
---

> [!TLDR]
> - Customers who stay are worth more every year, but new customers are what grow you. Plan for both.
> - Define "onboarded" as one key action, repeated at the rhythm you expect, and build the first one into the product.
> - Trigger email and SMS on what people do, and hold 10% back to prove the messages add revenue.
> - Check-ins say what happens next and by when. They don't wait for approval nobody needs to give.

## Keep customers, and keep finding new ones

*Map the whole funnel* named the stages. This lesson works through the ones after acquisition.

[Fred Reichheld's research at Bain](https://media.bain.com/Images/BB_Prescription_cutting_costs.pdf) found that customers get more profitable each year they stay: they buy more, cost less to serve and refer others. In financial services, a 5% rise in retention lifted profit by more than 25%. But keeping customers is not how you grow. [A 2014 study by Byron Sharp's team at the Ehrenberg-Bass Institute](https://ideas.repec.org/a/eee/jbrese/v67y2014i5p990-997.html) found that growing and shrinking brands differed mostly in how many new customers they won, not in how many they lost.

So retention multiplies what acquisition brings in. It doesn't replace it.

## Define onboarded as a habit, not a click

Decide what "onboarded" means as **one key action that shows a user got value**. In @kunalvg's crypto examples it's "wallet connected" or "first transaction". For a writing app it might be "document shared".

[Casey Winters, who led growth at Pinterest and Grubhub](https://www.caseyaccidental.com/p/why-onboarding-is-the-most-crucial-part-of-your-growth-strategy), adds the part a single event misses: how often. A user is activated when they still do the key action at the rhythm you expect, some weeks after sign-up. Pinterest used "saved a pin every week, four weeks after sign-up".

1. Pick the key action: the one that only happens when someone got value.
2. Pick the rhythm from the offline habit you replace. Ordering takeaway by phone is monthly, so Grubhub aimed for monthly orders.
3. Watch each month's sign-ups over time. Activated users are the ones still doing it at that rhythm.
4. Engineer the first "aha" moment inside the product with whoever builds it, so a new user feels the value before they leave.

Kunal argues that smoother onboarding alone puts you ahead of 90% of projects. That's his read of crypto, but the logic carries: most teams spend their effort on getting people in, not on what happens next.

## Know why people stay and why they leave

Retention takes as much planning as acquisition, so answer these questions early, starting with your onboarded event:

> [!FORM] Your retention plan
> 1. Which single action means a new user got value? Finish the sentence: "A user is onboarded when they…"
> 2. How many of last month's sign-ups did it? Check your analytics.
> 3. Hero features: which features bring people back?
> 4. Levelling up: how does a casual user become a power user?
> 5. Segments: which usage numbers matter for your product, so you can split users by them?
> 6. Churn: why do people leave, and which campaign would win them back?

For the numbers, use Google Analytics for the website, plus a product analytics tool for what happens inside the product. Kunal uses Redash and Dune for on-chain data.

To judge your numbers, [Lenny Rachitsky and Casey Winters asked about 20 growth leaders](https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29) what good looks like six months after sign-up. Their rough answers: about 25% still active for a consumer social app, 40% of paying subscribers for consumer software, and 60% of paying companies for small-business software. Those are practitioner estimates, not a study.

Pricing belongs here too. Write down why, how and what you'll charge on day one. Free with no revenue model doesn't last. *Read your pricing from your numbers* covers the signals that tell you the price is wrong.

> [!DIAGRAM] funnel

## Message people on what they did

[BJ Fogg's behaviour model](https://behaviormodel.org/) says an action happens only when motivation, ability and a prompt meet at the same moment. A message fired by what someone just did arrives while their motivation is still there. Selling again to someone who already bought also costs a fraction of finding a new customer, so send messages based on what each person did.

The holdout is what makes them measurable. [Ron Kohavi's experiments at Microsoft](https://hbr.org/2017/09/the-surprising-power-of-online-experiments) showed how often intuition misjudges a change; only a random group that gets nothing tells you what the messages added.

> [!TRICK] Build five behaviour flows with a holdout
> 1. Use Klaviyo (or your email tool). Send it product events: viewed, added to cart, bought, went quiet.
> 2. Build five flows, each fired by one behaviour.
> 3. Hold out 10% of customers at random. They receive nothing.
> 4. Compare revenue between the two groups.

The source, @korzhov_dm, writes for online stores and says most have one abandoned-cart email and nothing else (his claim). Swap in your own product's events, such as signed up, reached the aha moment, went quiet.

> [!DIAGRAM] holdout

## Make check-ins state the next step

If you sell a service or a membership, weekly check-ins are part of retention. **End each one with what happens next and by when**, not a request for feedback.

@huntkyle read the Slack messages of an agency with 35 clients and chronically late delivery. Every message ended "let me know what you think", and the team waited 1 to 3 days for approvals clients never asked to give. Hunt sells agency consulting, and this is his anecdote.

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
> Fill in the first two questions of your retention plan above: your onboarded event, and how many of last month's sign-ups did it. Download the plan and put both answers at the top of your roadmap.

> [!CHECK] In retention, how do you define "onboarded"?
> As one key action that shows a user got value, done at the rhythm you expect, such as "saved a pin every week, four weeks after sign-up".

> [!CHECK] You send emails triggered by what customers do. How do you prove they add revenue?
> Hold out 10% of customers who receive nothing, then compare revenue between the two groups.

> [!CHECK] Why should a client check-in end with what happens next and by when, instead of "let me know what you think"?
> Asking for feedback leaves the team waiting days for approvals the client never needed to give. Stating the next step keeps delivery moving.

## Sources

- [Fred Reichheld, *Prescription for cutting costs* (Bain, 2001)](https://media.bain.com/Images/BB_Prescription_cutting_costs.pdf)
- [Riebe, Wright, Stern and Sharp, *How to grow a brand: Retain or acquire customers?* (2014)](https://ideas.repec.org/a/eee/jbrese/v67y2014i5p990-997.html)
- [Ehrenberg-Bass Institute: Effective brand growth, acquisition or retention?](http://marketingscience.info/effective-brand-growth-acquisition-or-retention)
- [Casey Winters, *Why Onboarding is the Most Crucial Part of Your Growth Strategy* (2017)](https://www.caseyaccidental.com/p/why-onboarding-is-the-most-crucial-part-of-your-growth-strategy)
- [Lenny Rachitsky and Casey Winters, *What is good retention* (2020)](https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29)
- [BJ Fogg: Fogg Behavior Model](https://behaviormodel.org/)
- [Ron Kohavi and Stefan Thomke, *The Surprising Power of Online Experiments* (2017)](https://hbr.org/2017/09/the-surprising-power-of-online-experiments)
- [@kunalvg: product marketing basics, from acquisition to monetisation](https://x.com/kunalvg/status/1951276376251617737)
- [@kunalvg: the funnel and smoother onboarding](https://x.com/kunalvg/status/1685889947461402624)
- [@kunalvg: think in funnels from day one](https://x.com/kunalvg/status/2042111501608391080)
- [@korzhov_dm: email and SMS triggered on behaviour, with a holdout](https://x.com/korzhov_dm/status/2118984106335756532)
- [@huntkyle: a check-ins bot that states next steps](https://x.com/huntkyle/status/2118086670918750341)
