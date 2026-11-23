# Outreach: literature notes

Research behind `content/outreach/`. Each lesson lists the principles it rests on, the sources that back them, and a check of every number and factual claim in the lesson as written before this pass. All sources were opened and read on 2026-11-23 unless marked **not verified**.

## Sources used across the module

| Source | What it says (paraphrased) |
| --- | --- |
| [Brian Dean (Backlinko) with Pitchbox, "We Analyzed 12 Million Outreach Emails" (2019)](https://backlinko.com/email-outreach-study) | 12 million cold outreach emails, mostly SEO and content pitches. 8.5% got a reply. One follow-up lifted replies 65.8%; three or more messages did best overall. Personalised subject lines +30.5%, personalised bodies +32.7%. Correlations, not causes, and now seven years old. |
| [Google, "Email sender guidelines"](https://support.google.com/a/answer/81126) and [FAQ](https://support.google.com/a/answer/14229414) | Every sender needs SPF or DKIM and TLS. Keep the Postmaster spam rate below 0.1% and never reach 0.3%. Above 5,000 messages a day to Gmail: SPF and DKIM, DMARC, aligned From domain, one-click unsubscribe for marketing mail, and honour unsubscribes within 48 hours. |
| [Microsoft, "Outlook's New Requirements for High-Volume Senders" (2025)](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730) | Domains sending over 5,000 emails a day to Outlook.com, Hotmail and Live must pass SPF and DKIM and publish DMARC (at least p=none, aligned). Non-compliant mail goes to junk from 5 May 2025, with rejection to follow. Also recommends a working unsubscribe link, list hygiene and bounce management, and authentication for all senders. |
| [FTC, "CAN-SPAM Act: A Compliance Guide for Business"](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) | Applies to all commercial email, B2B included. A return email address is an allowed opt-out. Honour opt-outs within 10 business days and keep the mechanism working for 30 days. Include a valid physical postal address. Subject lines must match content. Say clearly that it's an ad. |
| [Apple, "Mail Privacy Protection"](https://www.apple.com/legal/privacy/data/en/mail-privacy-protection/) | Apple Mail downloads remote content, tracking pixels included, in the background whether or not the reader opens the email, so senders can't tell when it was opened. |
| [James Oldroyd, Kristina McElheran & David Elkington, "The Short Life of Online Sales Leads", *Harvard Business Review* (2011)](https://scholarsarchive.byu.edu/facpub/9711/) | Abstract read (full text paywalled): most companies don't respond to online leads nearly fast enough. Specific multipliers often quoted from this line of research are **not verified**. Elkington ran InsideSales.com, whose data the research used. |
| [Rob Fitzpatrick on *The Mom Test*, The Learning Leader show notes](https://learningleader.com/robfitzpatrick/) | Talk about their life instead of your idea; ask about specifics in the past; talk less and listen more. |
| [LinkedIn Help, "LinkedIn's Ad Library"](https://www.linkedin.com/help/linkedin/answer/a1517918) | A publicly available database. Search by company or advertiser, payer, keyword, country and date range. Includes ads run after 1 June 2023; ads stay for a year after their last impression. |
| [LinkedIn User Agreement, section 8.2](https://www.linkedin.com/legal/user-agreement) | Members must not use bots or unauthorised automated methods to access the services, add contacts, or send or redirect messages, and must not use software, scripts, crawlers, browser plugins or add-ons to scrape or copy the services. |
| [LinkedIn Help, "Invitation limit reached"](https://www.linkedin.com/help/linkedin/answer/a550555) | All members have invitation limits. Hitting one restricts invitations, typically for a week; support can't lift it or say why. No number is published. |
| [Evan Miller, "How Not To Run an A/B Test" (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) | Checking results as they come in and stopping when one looks ahead inflates false positives. Fix the sample size in advance. Rule of thumb: n = 16σ²/δ² per version, with σ² = p(1 − p). At a 10% reply rate, detecting a jump to 15% needs about 576 sends per version (16 × 0.09 / 0.05²). |
| [Robert Cialdini / Influence at Work: the principles of persuasion](https://www.influenceatwork.com/7-principles-of-persuasion/) | Reciprocity: people feel obliged to return what they received first. Restaurant study: one mint raised tips about 3%, a second mint offered personally ("For you nice people") 23%. Give first, and make it personalised and unexpected. |
| [Paul Graham, "Do Things That Don't Scale" (2013)](https://paulgraham.com/ds.html) | The Collison brothers didn't promise a beta link; they said "give me your laptop" and set people up on the spot. B2B founders can act as consultants for a single user, as long as they aren't paid for it. |
| [AIGA, "Position on Spec Work"](https://www.aiga.org/resources/aiga-position-on-spec-work) | Spec work is work done before engagement in hope of payment. Clients risk compromised quality because spec work skips research and testing. Designers risk being taken advantage of, and it lowers the value of the work. Both sides carry intellectual property risk. |
| [Simone Wies, Alexander Bleier & Alexander Edeling, "Finding Goldilocks Influencers", *Journal of Marketing* (2023)](https://www.ama.org/2022/10/11/finding-goldilocks-influencers-why-high-follower-count-may-not-be-the-best-driver-of-engagement-on-social-media/) | Via the AMA's summary. Engagement follows an inverted U by follower count; mid-sized creators are the sweet spot. |

## Fix cold email by its symptoms (`cold-email.md`)

**Principles.** Deliverability comes first: mailbox providers set hard rules (Google, Microsoft). Replies come from follow-ups and real personalisation (Backlinko/Pitchbox). Law sets the floor for opt-outs (FTC). Fast replies to interested leads matter (Oldroyd et al.).

| Claim | Verdict | Source |
| --- | --- | --- |
| 0 replies and 0 bounces means spam placement | **Unverified** as a rule; consistent with Google's authentication and spam-rate thresholds | Google |
| Bounces over 2% mean the list | **Unverified**; neither Google nor Microsoft publishes a bounce threshold | none found |
| The open-tracking pixel hurts inbox placement | **Unverified**. What is confirmed: Apple Mail loads pixels for every message, so open rates are unreliable. Lesson and check card now lead with that. | Apple |
| 1 lead per 300 contacts is great, 1 per 500 solid | **Unverified**, one practitioner's benchmark (already labelled) | source post |
| Google Workspace prospects reply 6.5x more than Microsoft | **Unverified** | none found |
| Microsoft prospects need copy under 40 words | **Unverified** | none found |
| AI-written first lines get 0.27% replies | **Unverified**. Backlinko found genuine personalisation correlated with about a third more replies, so the target is fake personalisation, not personalisation. | Backlinko |
| A short bump as follow-up #4 | **Confirmed in principle**: one follow-up +65.8%, three or more messages best | Backlinko |
| Answer interested replies within 5 minutes | **Unverified** for cold email. Research on inbound web leads found most firms reply far too slowly. | Oldroyd et al. |
| CAN-SPAM accepts a reply-based opt-out | **Confirmed**, but the same law also requires a physical postal address and honouring within 10 business days. Added. | FTC |
| Gmail and Yahoo require one-click unsubscribe above 5,000 a day | **Confirmed for Gmail**; Yahoo not checked, dropped from the lesson | Google |

## Open DMs with a problem buyers already pay to solve (`linkedin-dms.md`)

**Principles.** Open with the buyer's problem, not your product (Fitzpatrick's first rule). Competitors' paid ads are public evidence of that problem (LinkedIn Ad Library). Small tests can't pick a winner reliably (Miller). Automation and scraping break LinkedIn's terms.

| Claim | Verdict | Source |
| --- | --- | --- |
| LinkedIn Ad Library needs no account | **Partly confirmed**: LinkedIn calls it a publicly available database | LinkedIn Help |
| Ads searchable by advertiser and date | **Confirmed**; only ads since 1 June 2023 | LinkedIn Help |
| Send each of 3 DMs to 50 people, keep the winner | **Disputed**: at typical reply rates, 50 sends per version can't separate versions unless the gap is very large; Miller's rule needs hundreds. Added as a Watch out. | Miller |
| LinkedIn limits weekly invitations and restricts automated accounts | **Confirmed** (limits and week-long restrictions; numbers unpublished) | LinkedIn Help |
| LinkedIn's terms prohibit third-party automation of messaging | **Confirmed** | User Agreement 8.2 |
| Apify pulls every ad from the LinkedIn Ad Library | **Disputed for compliance**: section 8.2 also bans scraping the services with scripts or crawlers. Watch out extended. | User Agreement 8.2 |
| The method works | **Unverified**; the post shows no results (already labelled) | source post |

## Do the work first, then ask (`do-the-work-first.md`)

**Principles.** Reciprocity: people return what they received first, especially when it's personal and unexpected (Cialdini). Doing the work for the user lowers the cost of saying yes (Graham's "Collison installation"). Unpaid spec work has real costs (AIGA). Mid-sized creators engage best (Wies et al.).

| Claim | Verdict | Source |
| --- | --- | --- |
| Free finished work persuades better than a pitch | **Confirmed in principle** | Cialdini; Graham |
| JK Molina's DM to Dan Koe | **Unverified** beyond Koe's account | source post |
| 10 DMs a day lands at least one $2,500 to $5,000 a month client | **Unverified**, Koe's expectation (already labelled) | source post |
| Grant Cardone replied "Hit me I'm stuck" | **Unverified** beyond Koe's account | source post |
| Follower count misleads | **Confirmed**: engagement peaks at mid follower counts | Wies et al. |
| Spec work costs nothing but time | **Disputed**: AIGA lists quality, exploitation and IP risks. Added as a Watch out. | AIGA |
