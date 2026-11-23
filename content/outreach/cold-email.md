---
title: Fix cold email by its symptoms
order: 1
description: Read a cold email campaign's numbers and know which part to fix.
---

> [!TLDR]
> - Cold email fails in three places, in order: the inbox, the offer, the list. Each failure pattern points to one of them.
> - Pass the inbox first. Google and Microsoft set sender rules, and the law sets opt-out rules.
> - Follow up. In a study of 12 million outreach emails, one follow-up brought about 66% more replies.
> - Most numbers here are one practitioner's cheat sheet, not shown data. Treat them as starting points to test.

## Read the symptom, fix the cause

When a campaign stalls, don't rewrite everything. **The failure pattern tells you which part is broken.**

Pass the inbox first, or nobody reads your copy. Google's [sender guidelines](https://support.google.com/a/answer/81126) require every sender to set up SPF or DKIM and keep reported spam below 0.3%. Microsoft [requires SPF, DKIM and DMARC](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730) above 5,000 emails a day.

> [!DIAGRAM] cold-email-doctor

Turn off open-rate tracking. Apple Mail's [privacy protection](https://www.apple.com/legal/privacy/data/en/mail-privacy-protection/) loads tracking pixels whether the email is opened or not, so the number is unreliable. The cheat sheet also claims the pixel hurts inbox placement, though no mailbox provider confirms that.

These rules come from a cold email cheat sheet by @coldemailchris, who builds B2B outbound systems. No data is shown behind them.

## Know what good looks like

Without a benchmark, every result feels like failure. The same cheat sheet gives one:

- **1 lead per 300 contacts** is a great campaign.
- 1 lead per 500 is still solid.

So a list of 1,000 contacts that brings in 2 to 3 leads is working.

For replies, Brian Dean's [study of 12 million outreach emails](https://backlinko.com/email-outreach-study) found 8.5% got any response. Those were mostly SEO pitches from 2019, so use it as a rough guide.

## Write for the inbox they use

Your prospect's email provider changes how often they reply. The cheat sheet says Google Workspace prospects reply about 6.5 times more than Microsoft ones. That's one practitioner's number, unconfirmed by public data.

> [!TRICK] Split your list by email provider
> Sort prospects into Google and Microsoft. Send Microsoft prospects copy **under 40 words**.

Skip AI-written personalised first lines. The cheat sheet puts them at about a 0.27% reply rate and calls personalisation at scale fake. Real personalisation is different. In Dean's study, personalised bodies got about a third more replies.

## Follow up, then answer fast

Following up is where the replies are. Dean's study found one follow-up lifted replies by 65.8%, and three or more messages did best overall. The cheat sheet's follow-up #4 is two words: "Hi John???"

When someone replies with interest, **answer within 5 minutes**. The cheat sheet gives that number. James Oldroyd and colleagues [found most companies answer online leads far too slowly](https://scholarsarchive.byu.edu/facpub/9711/).

> [!TRICK] Offer a reply word to opt out
> Ask people to reply with a word to opt out, such as "banana". It works only while you're not a Gmail bulk sender. Google counts you as one once you've sent close to 5,000 or more messages in a day to personal Gmail accounts, and for good. Check your status before you rely on a reply word: bulk senders also need one-click unsubscribe headers and a visible unsubscribe link.

> [!RISK] Opt-out rules differ by country and volume
> The US [CAN-SPAM Act](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) accepts a reply-based opt-out, B2B included, but also requires your postal address in every email and honouring opt-outs within 10 business days. [Gmail requires one-click unsubscribe](https://support.google.com/a/answer/14229414) from bulk senders: anyone who has sent close to 5,000 or more messages in a day to personal Gmail accounts, even if their volume later drops. EU and UK law may require more. Check the rules for where your prospects are and how much you send, and honour every opt-out.

> [!FORM] Your cold email
> 1. What do we do? What problem do we solve? Give one short, precise answer.
> 2. Who is the one real prospect you're writing to?
> 3. What is your one clear offer?
> 4. Your email, under 40 words, with no AI-written first line.
> 5. Your follow-up #4, a two-word bump.

> [!DO] Write one cold email under 40 words
> Fill in your cold email above for one real prospect, then download it.

> [!CHECK] In cold email, what do these symptoms point to: 0 replies and 0 bounces, replies with no interest, bounces over 2%?
> Spam placement, the offer, and the list. Fix only the part the symptom points to instead of rewriting everything.

> [!CHECK] Your cold email campaign to 1,000 contacts brought in 2 leads. Is it failing?
> No, it's working. One lead per 300 contacts is a great campaign, and one per 500 is still solid.

> [!CHECK] Why turn off open-rate tracking in cold email?
> The number is unreliable, because Apple Mail's privacy protection loads tracking pixels whether or not the email is opened. The cheat sheet also claims the pixel hurts inbox placement.

## Sources

- [Google: Email sender guidelines](https://support.google.com/a/answer/81126)
- [Google: Email sender guidelines FAQ](https://support.google.com/a/answer/14229414)
- [Microsoft: Outlook's new requirements for high-volume senders (2025)](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730)
- [Brian Dean, *We Analyzed 12 Million Outreach Emails* (2019)](https://backlinko.com/email-outreach-study)
- [Apple: Mail Privacy Protection](https://www.apple.com/legal/privacy/data/en/mail-privacy-protection/)
- [James Oldroyd, Kristina McElheran and David Elkington, *The Short Life of Online Sales Leads* (2011)](https://scholarsarchive.byu.edu/facpub/9711/)
- [FTC: CAN-SPAM Act compliance guide for business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
- [@coldemailchris: the cold email cheat sheet](https://x.com/coldemailchris/status/2119415642202034427)
