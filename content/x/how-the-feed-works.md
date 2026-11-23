---
title: How X picks what people see
order: 1
description: Know the three stages every post passes and where reach beyond followers comes from.
---

> [!TLDR] X predicts what each viewer will do with your post, and ranks by that prediction.
> - Every post passes three stages: X finds candidates, scores them per viewer, then filters some out.
> - Your followers see you first. Reach beyond them comes from interest matching, not follows.
> - X shows one post per conversation, so a launch must live in one self-contained post.

## Every post passes three stages

X publishes the code behind its For You feed on GitHub as [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm). It narrows millions of posts to thousands of candidates, then a model reads each viewer's recent engagement history and **predicts how likely that viewer is to like, reply, share, follow or mute**. The score is those predictions multiplied by weights and added up.

Ryan (@ryangrowthh), who read the code, nicknames the stages Scouts, Judge and Bouncer.

1. Find (Scouts): several retrieval systems pull thousands of candidate posts each time a feed refreshes.
2. Score (Judge): for each post and each viewer, a model predicts the chance of a like, reply, share, read-through, follow, mute and so on, multiplies each by a weight, and adds them up.
3. Filter (Bouncer): stale, already seen, blocked or muted posts are dropped, and a separate system drops posts carrying spam or safety labels.

Ryan sums up the goal as **keep people on the platform**. That's his reading, not a line in the code, but the code does reward predicted reading time and penalise predicted scroll-pasts. When you're unsure what X rewards, ask what keeps a viewer reading and talking.

> [!DIAGRAM] x-feed

## Four places X finds posts

Reach beyond your followers comes from the sources that don't depend on follows.

| Source | What it pulls |
| --- | --- |
| Thunder | Recent posts from accounts the viewer follows |
| Phoenix | Posts from accounts the viewer doesn't follow, matched to an interest profile built from their history |
| SimClusters | Posts popular with the interest community the viewer belongs to, grouped by who engages with what |
| Popular Posts | A small shared list of popular recent posts, first seeded from the most-followed active accounts |

Phoenix is where broad virality comes from. SimClusters explains niche virality. Venu Satuluri and colleagues at Twitter describe it in their [KDD 2020 paper](https://dl.acm.org/doi/10.1145/3394486.3403370): it finds overlapping communities from who follows whom, then places both accounts and posts in them. A post can blow up inside one community, such as tech startups, without going platform-wide. That's also why one idea per post matters (see *Write for one reader and one action*): mixed topics confuse which community to show it to.

## Your followers are round one

Matt Epstein, whose company Shown Media runs tech launches on X, points out that the first audience for any post is your own follower circle via Thunder. That's why big accounts get bigger launches, and it's the part you control most.

In Epstein's words, your followers feed Thunder for your account, "and that's where it stops". The code agrees on the mechanism: posts from accounts a viewer doesn't follow get their score multiplied by a factor below 1. Getting further takes a strong predicted score, or other people quoting you to their own followers (see *Line up your launch-day voices*).

## Keep a launch in one post

X's `DedupConversationFilter` keeps only the highest-scoring post from each conversation in a viewer's feed. Epstein's example: spread a launch across 5 tweets in a thread and 4 of them never reach non-followers.

The main post has to stand alone: everything a stranger needs, with nothing left for the replies to explain. *Give strangers a reason to care* covers what goes in it.

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
