---
title: Open DMs with a problem buyers already pay to solve
order: 2
description: Write LinkedIn DMs from your competitors' ads and test them before you scale.
---

> [!TLDR]
> - Open with the buyer's problem, not your product. If several competitors pay to advertise a problem this month, buyers already care about it.
> - Find it free in the LinkedIn Ad Library, then ask Claude to turn the ads into three short DMs.
> - Test the three on a slice of your list before you scale, and treat a small test as a hint, not a verdict.
> - Let an agent draft while you read and approve every send, because LinkedIn's terms ban automated messaging and scraping.

## Start from a problem someone paid to advertise

Rob Fitzpatrick's first rule in [*The Mom Test*](https://www.momtestbook.com/) is to [talk about their life instead of your idea](https://learningleader.com/robfitzpatrick/). A cold DM that leads with your product asks a stranger to care about you. One that leads with a problem they already have is about them. Competitors' ads tell you which problem to pick.

Every LinkedIn ad is a message a company paid to show buyers. When **three competitors all pay to talk about the same problem**, that problem is on your buyers' minds right now. Use it as your opening line instead of guessing what they care about.

This method comes from @DinScales26, who sells a done-for-you LinkedIn outreach service and a sending tool. They wrote it for agencies messaging on a client's behalf, and the steps below adapt it for your own product. The post shows no results, so test it on a small slice first.

> [!TRICK] Mine the LinkedIn Ad Library
> 1. Go to linkedin.com/ad-library, which LinkedIn [describes as publicly available](https://www.linkedin.com/help/linkedin/answer/a1517918). It holds ads run since June 2023.
> 2. List the 3 companies you lose deals to. Search each as the advertiser, with the date filter set to the last 30 days.
> 3. For each ad, note three things: the problem it opens with, the offer (a demo, a free audit, a report), and the job title it's written for ("for heads of sales").
> 4. Find the problem all 3 companies advertise. Copy the text of 5 to 10 ads about it into one doc.
> 5. Paste the doc into Claude. Tell it what you sell and one result you got for a customer. Ask for 3 DMs, 2 lines each, under 20 words. Tell it to keep the problem from the ads and drop the ad wording, because a DM that reads like an ad gets ignored.
>
> Each DM comes out in this shape:
>
> ```
> we helped [company like theirs] fix [the problem from the ads] in [how long]. want the breakdown?
> ```

Read every DM before it goes out. Claude can miss when a line sounds robotic, and you only get one first message per person.

## Test small, then scale the winner

Don't send your best guess to the whole list. Split-test on a slice first.

> [!TRICK] Three DMs, 150 people, one week
> 1. In LinkedIn Sales Navigator, filter by your buyer's job title, industry and company headcount.
> 2. Send each of your 3 DMs to 50 people (150 total).
> 3. After a week, take the DM with the most replies and write 3 new versions of it.
> 4. Send those to the rest of your list (the author's example: the remaining 850 of 1,000).

> [!RISK] 50 sends can't pick a winner
> At a 10% reply rate, 50 sends gives you about 5 replies per DM, and 5 against 8 can be pure luck. Evan Miller's [rule of thumb for A/B tests](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) says telling 10% from 15% apart takes about 576 sends per version. Decide the sample size before you start, and don't stop early because one looks ahead. With a small list, keep a DM only if it wins by a wide margin, and keep testing.

> [!RISK] LinkedIn restricts accounts that send too much
> LinkedIn [limits how many invitations you can send](https://www.linkedin.com/help/linkedin/answer/a550555) and restricts accounts that hit the limit, typically for a week. It doesn't publish the number, so send at a human pace.

## Hand the research to an agent, keep the send

Once the method works by hand, an agent can repeat the research every week. Connect three tools through MCP (the connector that lets an agent use a tool on its own).

> [!TRICK] A weekly DM research agent
> **Connections:**
> - **Apify:** searches the LinkedIn Ad Library and pulls every ad a company runs.
> - **Firecrawl:** reads your website and case studies, so the agent knows what you sell and your results.
> - **A sending tool with an MCP:** handles DMs, follow-ups and one inbox for replies. The author names their own, Eaglesend.
>
> Add them to an agent such as Claude Code and give it this job:
> 1. Pull new ads every week.
> 2. Find the problems that repeat.
> 3. Rewrite the ads as DMs.
> 4. Write new versions of the best DM.
> 5. Send you the drafts.
>
> You read each draft and say yes or no before anything goes out.

> [!RISK] Automated messaging and scraping break LinkedIn's terms
> Section 8.2 of LinkedIn's [User Agreement](https://www.linkedin.com/legal/user-agreement) bans bots that "send or redirect messages", along with scripts, crawlers and browser plugins that scrape or copy the site. That covers an automated sending tool and can cover a scraper pulling the Ad Library. Keep a human approval step on every send, and consider collecting the ads by hand.

To keep an agent from doing damage on its own, see *Keep bots from doing damage*.

> [!FORM] Your competitor ads
> 1. If not us, what would users choose instead? Include doing nothing.
> 2. Which 3 companies do you lose deals to?
> 3. Paste the text of 5 of their ads from the last 30 days. Under each, note the problem it opens with, the offer and the job title it's written for.
> 4. Which problem do all 3 companies advertise?

> [!DO] Pull your competitors' ads
> Open linkedin.com/ad-library and search the 3 companies you lose deals to (last 30 days). Fill in your competitor ads above, then download them.

> [!CHECK] When an agent researches and drafts your LinkedIn DMs, which step stays yours?
> Approving every send. LinkedIn's User Agreement bans bots that send messages, so the agent only researches and drafts.

> [!CHECK] You have three LinkedIn DM drafts and 1,000 buyers on your list. How do you send them?
> Send each draft to a slice first, such as 50 people. After a week, write three new versions of the one with the most replies and send those to the rest. With slices that small, trust only a wide margin.

> [!CHECK] Why open a cold LinkedIn DM with a problem your competitors all pay to advertise?
> It makes the DM about the buyer's life, not your idea. A problem several competitors pay to show buyers is on their minds right now, so you aren't guessing what they care about.

## Sources

- [Rob Fitzpatrick, *The Mom Test*](https://www.momtestbook.com/)
- [The Learning Leader: Rob Fitzpatrick on the Mom Test rules](https://learningleader.com/robfitzpatrick/)
- [LinkedIn Help: LinkedIn's Ad Library](https://www.linkedin.com/help/linkedin/answer/a1517918)
- [LinkedIn Help: Invitation limit reached](https://www.linkedin.com/help/linkedin/answer/a550555)
- [LinkedIn: User Agreement](https://www.linkedin.com/legal/user-agreement)
- [Evan Miller, *How Not To Run an A/B Test* (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
- [@DinScales26: competitor ads into LinkedIn DMs, testing and automation](https://x.com/DinScales26/status/2119077318769385871)
