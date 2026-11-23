---
title: Stay out of the filters
order: 3
description: Keep your posts eligible for the feed and your account's reputation growing.
---

> [!TLDR] A post can only rank if it survives X's filters, which are written in X's code.
> - A post has 48 hours to take off, and each extra post you send the same viewer counts for less.
> - Fresh posts from accounts under 50,000 followers can get a small boost. Big accounts get no guaranteed reach.
> - Labels for spam or inauthentic behaviour limit who sees your posts. X's Under the Hood tool shows them.
> - Write your own posts, stay out of fights and check your labels.

## Each post lives 48 hours

**A post makes or misses its reach within two days.** In X's open-source feed code ([xai-org/x-algorithm](https://github.com/xai-org/x-algorithm)), `AgeFilter` drops "posts older than 48 hours".

Other filters drop posts the viewer has already seen, reposts and replies from accounts they don't follow, and blocked or muted accounts and keywords. A separate visibility system drops posts with spam or safety labels. Posts from accounts the viewer doesn't follow also have their score multiplied by a discount below 1.

Posting more isn't free. Each extra post from you in the same viewer's feed gets multiplied by a decaying factor. Ryan (@ryangrowthh) sums this up as "if you post too often, X doesn't give every post a chance". *Run a daily article routine* gives you a rule for how much to post.

## Small accounts get a head start

Starting small isn't a handicap. X's code has a cold-start boost for original posts (not replies or reposts) from authors with up to 50,000 followers. A post can be boosted while it's under 2 hours old and has fewer than 200 Home feed impressions, if it already ranks well enough to be in the running. Each refresh lifts at most one such post to around the 15th slot. The boost runs as an experiment, so which authors qualify depends on the viewer.

A new account can still break out early. Ryan's own first viral post came three days after starting a new account, and he reports 8,000+ followers and 4M+ impressions in 4 weeks solo, reaching about 9,900 followers in a month. Treat that as one person's result.

Big accounts get no guaranteed reach either. No weight in the score rewards follower count, and Ryan says he has watched many big accounts fade over about 18 months.

## Reputation and labels

Ryan says engagement from well-connected accounts in your niche counts for more than a big follower count. Twitter's 2023 open-source release computed a credibility score called [Tweepcred](https://github.com/twitter/the-algorithm/blob/main/src/scala/com/twitter/graph/batch/job/tweepcred/README), using PageRank over who mentions and reposts whom.

X's 2026 code still keeps a PageRank-style score over follows and engagement. Ryan says it lifts or caps every post, though the code only uses it in spam and enforcement rules, not as a multiplier on every post.

- Engage genuinely with people in your niche to build a dense, high-quality network.
- Stay out of engagement groups (accounts that agree to engage with each other's posts). X's [authenticity policy](https://help.x.com/en/rules-and-policies/authenticity) bans "coordinating to exchange engagement". The groups barely work anyway: X's code comments say only actions on posts served in the Home feed count, so opening a post straight from a group chat "has no ranking impact".

> [!RISK] Labels limit every post
> A spam or inauthentic-behaviour label cuts the visibility of a post or your whole account. Account labels also add up from what your posts collected. Avoid content that gets you muted, blocked or reported, and check X's Under the Hood tool to see labels on your account or posts marked as spam.

> [!TRICK] Keep your account clean
> - Don't let AI write and post 100% of your copy. X tracks inauthentic behaviour over time.
> - Get Premium, and verify your ID if you're comfortable.
> - Avoid negative and political content.
> - Don't argue with trolls. Block or mute them.
>
> This is Ryan's advice from reading the code, unverified beyond that.

Ryan also warns that a troll blocking or muting you cuts your reach. For a single troll, X's code comments say otherwise. Blocks and reports mostly change what *similar* viewers see, not your reach for everyone. A pile-on is different. X's `agatha` jobs label accounts whose posts draw many blocks and reports relative to likes. Mute trolls anyway, because the fight costs you time.

> [!DO] Check your labels
> Open [X's Under the Hood tool](https://x.com/i/jf/under_the_hood) and look for labels on your account or posts. Write down what you find, even if it's "none".

> [!CHECK] On X, how long does a post have to take off before it's filtered out of the feed?
> 48 hours. A post makes or misses its reach within two days.

> [!CHECK] A troll keeps replying to your X posts. What do you do?
> Block or mute them, and don't argue. Their block mostly affects viewers like them, so the fight costs you more than their block does.

> [!CHECK] On X, why does a new account with 300 followers have a fair shot at reach?
> X's code can boost fresh posts, under 2 hours old, from authors under 50,000 followers while they have few impressions. No weight in the score rewards follower count.

## Sources

- [xAI: X For You feed algorithm (GitHub)](https://github.com/xai-org/x-algorithm)
- [X Help: Authenticity policy](https://help.x.com/en/rules-and-policies/authenticity)
- [Twitter: Tweepcred, PageRank reputation in the 2023 algorithm release (GitHub)](https://github.com/twitter/the-algorithm/blob/main/src/scala/com/twitter/graph/batch/job/tweepcred/README)
- [@ryangrowthh: filters, reputation and the small-account boost](https://x.com/ryangrowthh/status/2117684231983800732)
- [@AIGuide_: Ryan's growth to about 9,900 followers in a month](https://x.com/AIGuide_/status/2119241264843358402)
