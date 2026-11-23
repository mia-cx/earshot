---
title: Scale outbound without burning your market
order: 4
description: Score your whole market in one table, work signals first, and cap how often you send.
---

> [!TLDR]
> - Start with warm intros, then put every account in your market in one scored, tiered table before you automate anything.
> - Work the accounts with a reason to hear from you today: a signal answers "why now?".
> - Let an agent research and draft. A person presses send on anything a senior buyer reads.
> - Contact each account at most every 30 to 60 days, with a fresh angle and a re-checked list.

## Start with people who know you

Ramp, the finance company, got its first deals from warm intros. **A warm intro skips the trust problem**, and early customers who know you give honest feedback fast.

> [!TRICK] Mine your network for intros
> 1. Export your team's and investors' LinkedIn connections.
> 2. Match them against your list of ideal customers, looking for anyone who knows someone.
> 3. Ask for an intro to one named person, with a 2-line blurb they can forward as is.
> 4. Ask every early customer for the next 3 intros.

This lesson follows @coldemailchris's breakdown of Ramp's sales history, compiled from public talks by Ramp's founders and sales leads. Chris runs an outbound agency and a paid community, and the article sells both.

## Put your whole market in one table

Ramp's automated outbound worked for years because **every account in its market sat in one table, scored and split into tiers, before a single automated email went out**. So the automation only wrote to accounts worth writing to.

A raw database export is only about 50 to 60% good fit, by Chris's count. His team has AI read each company's website and check it against the ideal customer, which gets the list to 90%+.

> [!TRICK] Score and tier your list
> ```
> Here's my company list: [file].
> Columns: company, domain, employees, industry, description.
>
> My ICP: [who you sell to, deal size, must-haves, deal-breakers].
>
> 1. For every company, write one line on what they sell.
> 2. Score each one 0-100 against my ICP, with one line on why.
> 3. Cut anything under 80.
> 4. Split the rest into 3 tiers:
>    Tier 1: the biggest likely deal size or a live buying signal
>    Tier 2: a strong fit with no signal yet
>    Tier 3: a fit, but small
> 5. Give me the count in each tier.
>
> Don't invent any data. If you can't tell, mark it UNKNOWN.
> ```
>
> Tier 1 gets a person. Tiers 2 and 3 get the automated sequence.

## Work the accounts with a reason today

**A signal answers "why now?" before the prospect asks it.** Ramp's reps start each day with a ranked list of accounts, the reason each one is on it, and a first draft to review. The signals: pricing page visits, new hires, webinar sign-ups, events, intent data from other sites and competitor activity.

A signal only counts on an account that fits. A pricing page visit means nothing from a company that was never a buyer. One of Chris's clients emailed every customer of a competitor that had just been acquired, offering 2 years of free service: 106 interested leads from 23,418 people contacted.

> [!TRICK] Build a morning list in Claude Code
> ```
> Here's my qualified account list: [file].
> Here's this week's signal data: [file].
> Signals: pricing page visits, new hires in [role], funding,
> job posts mentioning [problem], competitor contract renewals.
>
> 1. Match every signal to an account on my list.
> 2. Rank the accounts by how many signals they have, then by tier.
> 3. For the top 25, write:
>    - one line on why they're on the list today
>    - the best contact to email (name, title)
>    - a first email under 65 words that mentions the signal
>      without sounding like we're watching them
> 4. Save it as a table I can review.
>
> Send nothing. Keep everything as drafts.
> ```

## Decide who presses send

Ramp built an AI that wrote emails and sorted replies with no rep in the loop. It produced about 30% of its pipeline for years, then Ramp shut it down in December 2025. The reasons, in the co-founder's words: dozens of competitors' automated tools working from the same data, and "cold-outbound fatigue" among buyers. Ramp still uses AI across sales. It dropped AI that emails buyers with nobody checking.

**Match the automation to the sale:**

| Sale | Who sends |
| --- | --- |
| Simple, with replies that look alike | The agent |
| Big deals, senior buyers, replies that need judgment | The agent drafts, a person sends |

Chris reports both sides: about 80% of the sales teams he talks to cancelled their AI SDR within 3 months, while an agent answering every reply for a custom cup maker got 1,100 positive replies in 21 days.

## Cap how often you touch the market

A market you email every week stops replying. **Ramp caps the share of its market it contacts each month**, and says outbound to the same audience works better now than two years ago.

- Contact each account every 30 to 60 days at most, with a new angle each time.
- Check a segment's size first: a perfect segment of 1,000 companies is used up in weeks.
- Under 10,000 companies in your whole market, skip volume and work it account by account.
- Re-enrich the list before every pass. Chris finds 30 to 50% of contacts on a 6-month-old list have changed jobs or details.

> [!FORM] Your market table
> 1. Who do you sell to? Give the deal size, must-haves and deal-breakers.
> 2. Roughly how many companies fit? Under 10,000 means account by account.
> 3. Which 3 signals would tell you an account needs you this month?

> [!DO] Score 50 companies
> Fill in your market table above, then run the scoring prompt on a list of 50 companies. Write down how many land in each tier.

> [!CHECK] Why did Ramp's automated outbound only write to accounts worth writing to?
> Every account in its market sat in one table, scored and tiered, before any automated email went out.

> [!CHECK] Your agent drafts an email to a CFO about a large deal. Who sends it?
> A person. The agent researches and drafts; anyone senior in a complex sale gets an email a person has read.

> [!CHECK] How often should one account hear from you?
> Every 30 to 60 days at most, with a fresh angle and a re-enriched list. A market you hit every week stops replying.

## Sources

- [@coldemailchris: breakdown of Ramp's outbound strategy](https://x.com/coldemailchris/status/2124591211985952946)
