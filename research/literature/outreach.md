# Outreach: literature notes

Research behind `content/outreach/`. Each lesson lists the principles it rests on and an independent audit of every factual claim in it. Verdicts: **supported** (the source says this), **overstated** (the source says something narrower), **misattributed** (true, but the cited source doesn't say it), **disputed**, **unsupported**, or **one person's claim** (a practitioner's number, labelled as such in the lesson). Where a claim wasn't supported, the lesson was corrected and the row says how. All sources were opened and read on 2026-11-23. ftc.gov and aiga.org block scripts, so those were read through the Wayback Machine's 2026 copies.

## Sources used across the module

| Source | What it says (paraphrased) |
| --- | --- |
| [Brian Dean (Backlinko) with Pitchbox, "We Analyzed 12 Million Outreach Emails" (2019)](https://backlinko.com/email-outreach-study) | 12 million cold outreach emails, mostly SEO and content pitches. 8.5% got a reply. One follow-up lifted replies 65.8%; three or more messages did best overall. Personalised subject lines +30.5%, personalised bodies +32.7%. Correlations, not causes, and now seven years old. |
| [Google, "Email sender guidelines"](https://support.google.com/a/answer/81126) and [FAQ](https://support.google.com/a/answer/14229414) | Every sender needs SPF or DKIM and TLS. Keep the Postmaster spam rate below 0.1% and never reach 0.3%. Above 5,000 messages a day to Gmail: SPF and DKIM, DMARC, aligned From domain, one-click unsubscribe for marketing mail, and honour unsubscribes within 48 hours. |
| [Microsoft, "Outlook's New Requirements for High-Volume Senders" (2025)](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730) | Domains sending over 5,000 emails a day to Outlook.com, Hotmail and Live must pass SPF and DKIM and publish DMARC (at least p=none, aligned). Non-compliant mail goes to junk from 5 May 2025, with rejection to follow. Also recommends a working unsubscribe link, list hygiene and bounce management, and authentication for all senders. |
| [FTC, "CAN-SPAM Act: A Compliance Guide for Business"](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) | Applies to all commercial email, B2B included. A return email address is an allowed opt-out. Honour opt-outs within 10 business days and keep the mechanism working for 30 days. Include a valid physical postal address. Subject lines must match content. Say clearly that it's an ad. |
| [ICO, "Electronic mail marketing"](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/) and ["Business-to-business marketing"](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/) | You can email any corporate body (a company, LLP, Scottish partnership or government body) without consent. Sole traders and some partnerships are treated as individuals and need consent or the soft opt-in. Marketing to a named business contact still needs a lawful basis under UK GDPR. |
| [Apple, "Mail Privacy Protection"](https://www.apple.com/legal/privacy/data/en/mail-privacy-protection/) | Apple Mail downloads remote content, tracking pixels included, in the background whether or not the reader opens the email, so senders can't tell when it was opened. |
| [James Oldroyd, Kristina McElheran & David Elkington, "The Short Life of Online Sales Leads", *Harvard Business Review* (2011)](https://scholarsarchive.byu.edu/facpub/9711/) | Abstract read (full text paywalled): most companies don't respond to online leads nearly fast enough. Specific multipliers often quoted from this line of research are **not verified**. Elkington ran InsideSales.com, whose data the research used. |
| [Rob Fitzpatrick on *The Mom Test*, The Learning Leader show notes](https://learningleader.com/robfitzpatrick/) | Talk about their life instead of your idea; ask about specifics in the past; talk less and listen more. |
| [LinkedIn Help, "LinkedIn's Ad Library"](https://www.linkedin.com/help/linkedin/answer/a1517918) | A publicly available database. Search by company or advertiser, payer, keyword, country and date range. Includes ads run after 1 June 2023; ads stay for a year after their last impression. |
| [LinkedIn User Agreement, section 8.2](https://www.linkedin.com/legal/user-agreement) | Members must not use bots or unauthorised automated methods to access the services, add contacts, or send or redirect messages, and must not use software, scripts, crawlers, browser plugins or add-ons to scrape or copy the services. |
| [LinkedIn Help, "Invitation limit reached"](https://www.linkedin.com/help/linkedin/answer/a550555) | All members have invitation limits. Hitting one restricts invitations, typically for a week; support can't lift it or say why. No number is published. |
| [Evan Miller, "How Not To Run an A/B Test" (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) | Checking results as they come in and stopping when one looks ahead inflates false positives. Fix the sample size in advance. Rule of thumb: n = 16σ²/δ² per version, with σ² = p(1 − p). At a 10% reply rate, detecting a jump to 15% needs about 576 sends per version (16 × 0.09 / 0.05²). |
| [Robert Cialdini / Influence at Work: the principles of persuasion](https://www.influenceatwork.com/7-principles-of-persuasion/) | Reciprocity: people feel obliged to return what they received first. Restaurant study: one mint raised tips about 3%, a second mint offered personally ("For you nice people") 23%. Give first, and make it personalised and unexpected. |
| [Paul Graham, "Do Things That Don't Scale" (2013)](https://paulgraham.com/ds.html) | The Collison brothers didn't promise a beta link; they said "give me your laptop" and set people up on the spot. B2B founders can act as consultants for a single user, as long as they aren't paid for it. |
| [AIGA, "Position on Spec Work"](https://www.aiga.org/resources/aiga-position-on-spec-work) | Spec work is work done before engagement in hope of payment. AIGA asks designers to be aware of the risks before doing it and leaves the decision to designer and client. Clients risk compromised quality because spec work skips research and testing. Designers risk being taken advantage of, and it lowers the value of the work. Both sides carry intellectual property risk. |
| [Instantly, "PULSE-1" (2026)](https://instantly.ai/pulse-1) | Vendor page, read 25 November 2026. A lead-ranking model inside Instantly's AI Sales Agent, "trained on billions of signals from historical sales interactions". In a "retrospective blind test" on 123 workspaces left out of training, the top 20% of ranked leads got 56.2 positive replies per 1,000 against 25.7 "without ranking". No lead count, definition of positive, or error margins. Says it beats Fable 5.1 by 9% and GPT-6 Astra by 18%, with no method given. |
| [Simone Wies, Alexander Bleier & Alexander Edeling, "Finding Goldilocks Influencers", *Journal of Marketing* (2023)](https://www.ama.org/2022/10/11/finding-goldilocks-influencers-why-high-follower-count-may-not-be-the-best-driver-of-engagement-on-social-media/) | Via the AMA's summary. Engagement follows an inverted U by follower count; mid-sized creators are the sweet spot. |

## Fix cold email by its symptoms (`cold-email.md`)

**Principles.** Deliverability comes first: mailbox providers set hard rules (Google, Microsoft). Replies go with follow-ups and real personalisation (Backlinko/Pitchbox, a correlation). Law sets the floor for opt-outs (FTC). Fast replies to interested leads matter (Oldroyd et al.).

| Claim | Verdict | Source that settles it |
| --- | --- | --- |
| Every sender needs SPF or DKIM; keep reported spam below 0.3% | **supported** | Google sender guidelines |
| Microsoft requires SPF, DKIM and DMARC above 5,000 emails a day | **supported**; non-compliant mail is now rejected | Microsoft 2025 post and its update |
| Apple Mail loads tracking pixels whether or not the email is opened | **supported** | Apple Mail Privacy Protection |
| The pixel hurts inbox placement | **one person's claim**, labelled; no mailbox provider says so | cheat sheet |
| 0 replies and 0 bounces means spam; bounces over 2% mean the list | **one person's claim**, labelled; neither Google nor Microsoft publishes a bounce threshold | cheat sheet |
| 1 lead per 300 contacts is great, 1 per 500 solid | **one person's claim**, labelled | cheat sheet |
| 8.5% of 12 million outreach emails got a reply; mostly SEO pitches, 2019 | **supported** (study last updated April 2019; top topics are links, guest posts and roundups) | Backlinko |
| Google prospects reply 6.5x more than Microsoft ones | **one person's claim**, labelled | cheat sheet |
| Microsoft prospects need copy under 40 words | **one person's claim**, labelled | cheat sheet |
| AI-written first lines get a 0.27% reply rate | **one person's claim**, labelled | cheat sheet |
| Personalised bodies got about a third more replies | **supported** (32.7%) | Backlinko |
| One follow-up "lifted" replies by 65.8% | **overstated**: the study reports a correlation ("appear to"), not a controlled test. Lesson and TLDR now say emails with a follow-up got 65.8% more replies, and that it's a correlation. | Backlinko |
| Three or more messages did best overall | **supported** | Backlinko |
| PULSE-1's top 20% of ranked leads got 56.2 positive replies per 1,000 against 25.7 unranked (2.2x) | **vendor's own claim**, labelled; a backtest on past campaigns, compared with the unranked average rather than a fit filter, with no sample size | Instantly PULSE-1 page |
| Follow-up #4 is "Hi John???"; answer within 5 minutes | **one person's claim**, labelled | cheat sheet |
| Most companies answer online leads far too slowly | **supported** (abstract) | Oldroyd et al. |
| Gmail bulk sender: close to 5,000+ messages a day to personal Gmail, permanently; needs one-click unsubscribe and a visible link | **supported** | Google sender guidelines and FAQ |
| Google asks bulk senders to honour unsubscribes within 48 hours (added beside Yahoo's 2 days, second skills review) | **supported** ("fulfill unsubscribe requests within 48 hours") | Google sender guidelines FAQ |
| CAN-SPAM: reply-based opt-out allowed, B2B included; postal address required; honour opt-outs within 10 business days | **supported** | FTC CAN-SPAM guide |
| PECR lets you email companies; consent needed for individuals and sole traders | **overstated**: LLPs and Scottish partnerships may be emailed too; other partnerships need consent like sole traders; a named person's work address still falls under UK GDPR. Lesson now says so | ICO: Electronic mail marketing; ICO: Business-to-business marketing |

## Open DMs with a problem buyers already pay to solve (`linkedin-dms.md`)

**Principles.** Open with the buyer's problem, not your product (Fitzpatrick's first rule). Competitors' paid ads are public evidence of that problem (LinkedIn Ad Library). Small tests can't pick a winner reliably (Miller). Automation and scraping break LinkedIn's terms.

| Claim | Verdict | Source that settles it |
| --- | --- | --- |
| The Mom Test's first rule: talk about their life instead of your idea | **supported** | The Learning Leader show notes |
| A problem three competitors all pay to advertise is on buyers' minds | **one person's claim** | DinScales post |
| The author sells a done-for-you LinkedIn outreach service and a sending tool | **supported** (EagleRev; its own sending engine, InMailer.ai) | eaglerev.io |
| The Ad Library is publicly available | **supported** | LinkedIn Help |
| It holds ads run since June 2023 | **overstated**: ads stay for one year after their last impression. Lesson now says so. | LinkedIn Help |
| 3 DMs to 50 people each; send the winner to the other 850 | **one person's claim**, labelled; disputed as a test design (row below) | DinScales post |
| Telling 10% from 15% apart takes about 576 sends per version; don't stop early | **supported** (16 × 0.09 / 0.05²) | Miller |
| LinkedIn limits invitations, restricts accounts typically for a week, publishes no number | **supported** | LinkedIn Help |
| Send 150 DMs through Sales Navigator in one week | **overstated** (second skills review, 2026-11-24): Sales Navigator allocates 50 InMail credits a month, banks up to 150, sells no extra, and refunds a credit when someone replies within 90 days. The TRICK now checks the credit balance first and splits the pilot across months or tests fewer DMs; title drops "one week". FORM unchanged | LinkedIn Help: InMail credits in Sales Navigator |
| Section 8.2 bans bots that "send or redirect messages" and scripts, crawlers and plugins that scrape or copy | **supported** | User Agreement 8.2 |
| The terms also limit copying other people's content | **supported** | User Agreement 8.2 |
| The method works | **one person's claim**; the post shows no results (labelled) | DinScales post |

## Do the work first, then ask (`do-the-work-first.md`)

**Principles.** Reciprocity: people return what they received first, especially when it's personal and unexpected (Cialdini). Doing the work for the user lowers the cost of saying yes (Graham's "Collison installation"). Unpaid spec work has real risks (AIGA). Mid-sized creators engage best (Wies et al.).

| Claim | Verdict | Source that settles it |
| --- | --- | --- |
| One mint raised tips about 3%; a second mint offered personally, 23% | **supported** | Cialdini |
| Give first, and make it personal and unexpected | **supported** | Cialdini |
| Stripe's founders said "give me your laptop" and set users up on the spot | **supported** | Graham |
| JK Molina's DM to Koe, quoted | **one person's claim** (matches Koe's article word for word) | Koe article |
| 10 DMs a day lands at least one $2,500 to $5,000 a month client | **one person's claim**, labelled | Koe article |
| Koe sells Eden, the tool the article recommends | **supported** | Koe article and bio |
| AIGA "warns against" spec work | **overstated**: AIGA's position lists the risks and leaves the choice to designer and client. Lesson now says it warns of the risks. | AIGA position |
| Spec work risks weaker quality, being used for free labour, and IP risk on both sides | **supported** | AIGA position |
| Going public works on X, Substack or any platform; Cardone replied "Hit me I'm stuck" | **one person's claim** | Koe article |
| Engagement peaks with mid-sized creators | **supported** | Wies et al. |
| @dsqjaffa co-founded Virlo | **supported** | their X bio |
