---
title: Stay out of the filters
order: 3
description: Keep your posts eligible for the feed and your account's reputation growing.
---

> [!TLDR] A post can only rank if it survives X's filters, and those filters are written down in X's code.
> - A post has 48 hours to take off, and each extra post you send the same viewer counts for less.
> - Fresh posts from accounts under 50,000 followers get a small boost. Big accounts get no guaranteed reach.
> - Labels for spam or inauthentic behaviour limit who sees your posts. X's Under the Hood tool shows them.
> - Write your own posts, stay out of fights and check your labels.

## Each post lives 48 hours

X's open-source feed code, [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm), lists its filters by name. The `AgeFilter` drops "posts older than 48 hours", so **a post makes or misses its reach within two days**.

Other filters drop posts the viewer has already seen, reposts and replies from accounts they don't follow, and blocked or muted accounts and keywords. A separate visibility system drops posts carrying spam or safety labels. Posts from accounts the viewer doesn't follow get their score multiplied by a discount below 1.

Posting more is not free. The code multiplies each further post from the same author in one viewer's feed by a decaying factor. Ryan (@ryangrowthh) reads this as "if you post too often, X doesn't give every post a chance". *Run a daily article routine* sets a rule for how much to post.

## Small accounts get a head start

The code has a cold-start boost. It lifts posts under 2 hours old from authors under 50,000 followers, while the post has had fewer than 200 impressions. It runs as an experiment, so not every viewer gets it. A new account can still go viral early: Ryan's own first viral post came three days after starting a new account. Ryan reports 8,000+ followers and 4M+ impressions in 4 weeks, solo, and about 9,900 followers in a month. That's one person's result.

The flip side: big accounts get no guaranteed reach. Follower count isn't one of the scored actions. Ryan has watched many big accounts fade over about 18 months. Starting small is not a handicap.

## Reputation and labels

Twitter's 2023 open-source release computed a credibility score called [Tweepcred](https://github.com/twitter/the-algorithm/blob/main/src/scala/com/twitter/graph/batch/job/tweepcred/README): PageRank over who mentions and reposts whom. X's 2026 code still keeps a PageRank-style score and uses it in its spam rules. Engagement from well-connected accounts in your niche counts for more than a big follower count. Ryan says the score lifts or caps every post. The code shows it in spam rules, not as a multiplier on every post.

- Engage genuinely with people in your niche to build a dense, high-quality network.
- Engagement groups (accounts that agree to engage with each other's posts) do little. X's code comments say only actions on posts served in the Home feed count, and going to a post directly from a group chat "has no ranking impact".

> [!RISK] Labels limit every post
> A label for spam or inauthentic behaviour cuts the visibility of your account or individual posts, and account labels add up from what your posts collected. Avoid content that gets you muted, blocked or reported, and check X's Under the Hood tool, which shows labels on your account and on posts marked as spam.

> [!TRICK] Keep your account clean
> - Don't let AI write and post 100% of your copy. X tracks inauthentic behaviour over time.
> - Get Premium, and verify your ID if you're comfortable.
> - Avoid negative and political content.
> - Don't argue with trolls. Block or mute them.
>
> This is Ryan's advice from reading the code, unverified beyond that.

Ryan also warns that a troll blocking or muting you cuts your reach. The code comments say otherwise: blocks and reports mostly change what *similar* viewers see, not your reach for everyone. Mute them anyway. The fight costs you time.

> [!DO] Check your labels
> Open [X's Under the Hood tool](https://x.com/i/jf/under_the_hood) and look for labels on your account or posts. Write down what you find, even if it's "none".

> [!CHECK] On X, how long does a post have to take off before it's filtered out of the feed?
> 48 hours. A post makes or misses its reach within two days.

> [!CHECK] A troll keeps replying to your X posts. What do you do?
> Block or mute them, and don't argue. Their block mostly affects viewers like them, so the fight costs you more than their block does.

> [!CHECK] On X, why does a new account with 300 followers have a fair shot at reach?
> X's code boosts fresh posts, under 2 hours old, from authors under 50,000 followers while they have few impressions. Follower count isn't scored.

## Sources

- [xAI: X For You feed algorithm (GitHub)](https://github.com/xai-org/x-algorithm)
- [Twitter: Tweepcred, PageRank reputation in the 2023 algorithm release (GitHub)](https://github.com/twitter/the-algorithm/blob/main/src/scala/com/twitter/graph/batch/job/tweepcred/README)
- [@ryangrowthh: filters, reputation and the small-account boost](https://x.com/ryangrowthh/status/2117684231983800732)
- [@AIGuide_: Ryan's growth to about 9,900 followers in a month](https://x.com/AIGuide_/status/2119241264843358402)
