---
title: Optimise for shares and replies
order: 2
description: Use X's action weights to write posts people pass on and answer, not just like.
---

> [!TLDR] X ranks a post by how likely each viewer is to share or answer it, so write posts people pass on.
> - In X's code, a predicted share by copied link weighs 20 and a predicted like 0.7.
> - Weights multiply each viewer's predicted chance of an action, not raw counts, so likes don't cancel out mutes.
> - The weights change without notice, so aim at what they serve: sharing and conversation.
> - People share what is useful, surprising or stirring, and what makes them look good.

## Shares and replies beat likes

In X's [published parameters](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/params/param.rs), **a share by copied link weighs 20, a reply or quote 5, and a like about 0.7**. X predicts each viewer's chance of acting and multiplies by those weights, so a post people look likely to pass on beats one they'd only like.

Negatives weigh even more: mute −58.8, report −234. X's code comments explain why. Those actions are rare, so their weights must be big to move the score at all.

Ryan (@ryangrowthh) turned the table into like-equivalents, such as a share worth about 30 likes or one mute cancelling about 89. X's code calls that reading "incorrect". The weights multiply this viewer's predicted chance of an action, not counts of what happened.

> [!TRICK] Know the published action weights
> Production defaults in X's code on November 21, 2026:
>
> ```
> Positive actions
> Share via copy link     20.0
> Reply                   5.0
> Quote                   5.0
> Share via DM            5.0
> Follow author           4.0
> Share                   2.118
> Repost                  1.0
> Like                    0.708
> Click into post         0.274
> Open link               0.2
> Dwell                   0.05
> Photo expand            0.05
> Profile click           0.0
> Video quality view      0.0
>
> Negative actions
> Not dwelled (scrolled past)    -0.02
> Block author                   -31.2
> Not interested                 -53.07
> Mute author                    -58.8
> Report                         -234.0
> ```
>
> Profile clicks count for 0, so posts built to send people to your profile earn nothing for it.

The diagram works through part of one viewer's score the way X's code does, for four of the actions: each action's chance times its weight. Raise the share chance, then the mute chance, and watch which one moves it.

> [!DIAGRAM] x-score

## Aim at the goal, not the numbers

The weights shift silently. Ryan saw the like weight rise from 0.5 in August to 0.66 in October 2026, and by November 21 the code had 0.708. Any tactic built on one exact number breaks on the next tweak.

The goal underneath stays put. X wants people sharing and talking. To guess what each viewer wants, the model reads their recent engagement history and loads signals like installed apps and inferred gender. You can't game that per viewer. You can write posts people want to pass on.

> [!RISK] The table will drift
> If you build a tactic on an exact weight, it can stop working overnight. Re-check X's open-source ranking code before relying on a specific number, and treat this table as a snapshot.

## Write posts people pass on

People share what stirs them up, surprises them, or helps them. Jonah Berger and Katherine Milkman studied three months of *New York Times* articles and found [high-arousal emotions made stories spread more](https://journals.sagepub.com/doi/10.1509/jmr.10.0353). Awe, anger and anxiety worked, while sadness didn't. Useful and surprising articles spread more too.

In [an interview on *Contagious*](https://penntoday.upenn.edu/2013-04-18/interviews/qa-jonah-berger), Berger adds that people share what makes them look smart and what's practically useful. Anger spreads, but on X it also earns mutes and blocks, the heaviest negatives. Aim for awe and usefulness.

Ryan's list puts that into practice:

- Draw on your experience, your network and your job. Nobody else can copy that.
- Format posts so they're easy to scan and easy to forward.
- Never copy someone one-for-one. Credit others, and use X's native image and video features.
- Test the formats X is pushing right now: threads, articles and media.
- If you make video, invest in camera, mic and lighting.

*Make the first line earn the second* covers the hook that gets someone to read far enough to share.

> [!FORM] Your share reasons
> 1. For each of your last 5 posts, one line: why would someone send it to a friend or reply?
> 2. The post with the weakest answer, rewritten as a new draft.

> [!DO] Find the share reason
> Fill in your share reasons above, then download them.

> [!CHECK] On X, why can't you say one share by copied link is worth 30 likes?
> The weights multiply each viewer's predicted chance of an action, not counts. A high share weight means a post people are likely to share ranks far above one they're only likely to like.

> [!CHECK] Your posts get likes and a handful of mutes. Why is that a problem on X?
> Mute weighs −58.8 against a like's 0.7. If the model learns that viewers like yours tend to mute you, that prediction drags your score for them. Avoid content that makes people mute you.

> [!CHECK] Why shouldn't you build an X tactic around an exact action weight?
> The weights change without notice. Aim at what they serve instead: sharing and conversation.

## Sources

- [xAI: X For You feed algorithm, action weights (GitHub)](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/params/param.rs)
- [Jonah Berger and Katherine L. Milkman, *What Makes Online Content Viral?* (2012)](https://journals.sagepub.com/doi/10.1509/jmr.10.0353)
- [Penn Today: Q&A with Jonah Berger on *Contagious* (2013)](https://penntoday.upenn.edu/2013-04-18/interviews/qa-jonah-berger)
- [@ryangrowthh: X's action weights and what they reward](https://x.com/ryangrowthh/status/2117684231983800732)
