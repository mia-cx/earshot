---
title: How X picks what people see
order: 1
description: How X finds, scores and filters every post, and where reach beyond followers comes from.
---

> [!TLDR] X ranks your post by predicting what each viewer will do with it.
> - Every post passes three stages: find candidates, score them per viewer, filter some out.
> - Your followers see you first. Reach beyond them comes from interest matching, not follows.
> - X shows one post per conversation, so put a launch in one self-contained post.

## Every post passes three stages

X publishes its For You feed code on GitHub as [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm). Every refresh narrows millions of posts to thousands of candidates, then scores each one for each viewer.

Ryan (@ryangrowthh), who read the code, nicknames the stages Scouts, Judge and Bouncer:

1. **Find (Scouts).** Retrieval systems pull thousands of candidate posts each time a feed refreshes.
2. **Score (Judge).** A model reads the viewer's recent engagement history and **predicts how likely they are to like, reply, share, read through, follow or mute**. It multiplies each prediction by a weight and adds them up.
3. **Filter (Bouncer).** X drops stale, already seen, blocked or muted posts. A separate system drops posts with spam or safety labels.

Ryan sums up the goal as **keep people on the platform**. That's his reading, not a line in the code, though the code does reward predicted reading time and penalise predicted scroll-pasts. When you're unsure what X rewards, ask what keeps someone reading and talking.

> [!DIAGRAM] x-feed

## Four places X finds posts

To reach strangers, your post has to come from a source that doesn't rely on follows.

| Source | What it pulls |
| --- | --- |
| Thunder | Recent posts from accounts the viewer follows |
| Phoenix | Posts from accounts the viewer doesn't follow, matched to an interest profile built from their history |
| SimClusters | Posts popular in the viewer's interest community, grouped by who engages with what |
| Popular Posts | A small shared list of popular recent posts, first seeded from the most-followed active accounts |

Phoenix drives broad virality. SimClusters drives niche virality. Venu Satuluri and colleagues at Twitter explain SimClusters in their [KDD 2020 paper](https://dl.acm.org/doi/10.1145/3394486.3403370). It finds overlapping communities from who follows whom, then places both accounts and posts inside them.

That means a post can blow up inside one niche, like tech startups, without going platform-wide. It's also why one idea per post matters (see *Write for one reader and one action*). Mixing topics makes it harder for X to pick the right community for your post.

## Your followers are round one

Your own followers see your post first, through Thunder. Matt Epstein, whose company Shown Media runs tech launches on X, notes that this is why big accounts get bigger launches, and it's the part you control most.

In Epstein's words, your followers feed Thunder for your account, "and that's where it stops". X's code backs the mechanism. Posts from accounts a viewer doesn't follow have their score multiplied by a factor below 1. Breaking out past your circle takes a strong predicted score, or other people quoting you to their own followers (see *Line up your launch-day voices*).

## Keep a launch in one post

X shows at most one post per conversation in a viewer's feed. `DedupConversationFilter` keeps the highest-scoring post in a reply chain and drops the rest. In Epstein's example, if you spread a launch across 5 tweets in a thread, 4 of them never reach non-followers.

Your main post has to stand alone. Give a stranger everything they need there, with nothing left for the replies to explain. *Give strangers a reason to care* covers what goes in it.

> [!FORM] Your cluster
> 1. Which interest community do you want X to put you in? Name it in one line.
> 2. How many of your last 10 posts stay inside it?

> [!DO] Name your cluster
> Fill in your cluster above, then download it. To count, tick each of your last 10 posts that stays inside the community.

> [!CHECK] What three stages does every post pass through in X's For You feed?
> X finds candidate posts, scores each one per viewer, then filters some out.

> [!CHECK] You plan to announce a launch on X across five tweets. What do you change?
> Put the whole launch in one self-contained post. X shows one post per conversation, so the other tweets never reach non-followers.

> [!CHECK] What does X's ranking model actually score when it ranks your post for one viewer?
> Its prediction of what that viewer will do: like, reply, share, follow, mute and so on, each multiplied by a weight and added up.

## Sources

- [xAI: X For You feed algorithm (GitHub)](https://github.com/xai-org/x-algorithm)
- [Satuluri et al., *SimClusters: Community-Based Representations for Heterogeneous Recommendations at Twitter* (2020)](https://dl.acm.org/doi/10.1145/3394486.3403370)
- [@ryangrowthh: how the X algorithm finds, scores and filters posts](https://x.com/ryangrowthh/status/2117684231983800732)
- [@mattepstein: candidate sources and one post per conversation](https://x.com/mattepstein/status/2117351855856779486)
