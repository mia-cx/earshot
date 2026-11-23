# Literature: Growing on X (`content/x/`)

Research pass, November 2026. Every source below was opened and read for this pass. "Not verified" marks anything I could not open.

The module's lessons came from three X posts: @ryangrowthh's reading of X's ranking code, @mattepstein on launches, and @NicholasDulait's article routine. The strongest check on them is the code itself, so most claims here are checked against `xai-org/x-algorithm` at commit date 2026-11-21.

## Primary sources

| Source | What it is | Used for |
| --- | --- | --- |
| [xai-org/x-algorithm, README](https://github.com/xai-org/x-algorithm) | X's open-source For You code, updated almost daily since January 2026 | Pipeline, candidate sources, filters, adjustments, Under the Hood |
| [xai-org/x-algorithm, `home-mixer/params/param.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/params/param.rs) | Production default parameters | Action weights, cold-start boost, comments on how to read the weights |
| [`home-mixer/filters/age_filter.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/filters/age_filter.rs), [`dedup_conversation_filter.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/filters/dedup_conversation_filter.rs) | Filter code | 48-hour age limit, one post per conversation |
| [`home-mixer/scorers/author_cold_start.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/scorers/author_cold_start.rs) | Small-author boost | Who gets the boost and for how long |
| [`phoenix/README.md`](https://github.com/xai-org/x-algorithm/blob/main/phoenix/README.md) | The ranking and retrieval models | "Millions → 1000s" retrieval, history-based user tower |
| [twitter/the-algorithm, tweepcred README](https://github.com/twitter/the-algorithm/blob/main/src/scala/com/twitter/graph/batch/job/tweepcred/README) | Twitter's 2023 open-source release | PageRank reputation ("Tweepcred") |
| [Satuluri et al., *SimClusters* (KDD 2020)](https://dl.acm.org/doi/10.1145/3394486.3403370) ([author PDF](https://venusatuluri.github.io/KDD_SimClusters_paper.pdf)) | Peer-reviewed paper by Twitter engineers | How interest communities are found |
| [Berger & Milkman, "What Makes Online Content Viral?" (*Journal of Marketing Research*, 2012)](https://journals.sagepub.com/doi/10.1509/jmr.10.0353) | Peer-reviewed study of 3 months of *New York Times* articles plus experiments | What makes people share |
| [Penn Today, "Q&A with Jonah Berger" (2013)](https://penntoday.upenn.edu/2013-04-18/interviews/qa-jonah-berger) | Berger explains the six STEPPS principles of *Contagious* (2013) in his own words | Why people pass things on |
| [Jakob Nielsen, "Show Numbers as Numerals When Writing for Online Readers" (NN/g, 2007)](https://www.nngroup.com/articles/web-writing-show-numbers-as-numerals/) | Eyetracking findings | Numbers in titles and first lines |

## What the sources say

### The pipeline (xai-org/x-algorithm README, phoenix README)

- The For You feed combines in-network posts (`Thunder`, recent posts from accounts the viewer follows) and out-of-network posts (`Phoenix retrieval`, `SimClusters`, and a shared `Popular posts` list, "initially from the most-followed active accounts").
- `Phoenix` is a transformer that reads the viewer's recent engagement history and predicts, per post, the probability of each action. The final score is `Σ (weight_i × P(action_i))`.
- Retrieval narrows "millions → 1000s" of candidates (phoenix README diagram).
- After the weighted sum come three adjustments: author diversity (each further post by the same author is multiplied by a decaying factor), an out-of-network discount ("a factor below 1"), and a new-author boost.
- Pre-scoring filters include `AgeFilter` ("Posts older than 48 hours"), `PreviouslySeenPostsFilter`, `MutedKeywordFilter`, `AuthorSocialgraphFilter` (blocked or muted accounts), and `OONRetweetReplyFilter`. Visibility filtering runs separately and can ALLOW, NOTICE, INTERSTITIAL or DROP a post, using labels from other systems.
- `DedupConversationFilter` keeps the single highest-scoring post per conversation (the root of the reply chain) and drops the rest.
- Query hydrators for `user_inferred_gender` and `user_installed_apps` exist in `home-mixer/query_hydrators/`.

### How to read the weights (param.rs comments, README "August 14th, 2026")

The code's own comment block, written because of posts like Ryan's:

- Each weight multiplies the *predicted probability* of that action for this viewer, "the weights do not multiply raw engagement counts".
- Reading weight ratios as count equivalences ("one report cancels 468 likes") is called out as "incorrect".
- Negative actions get large weights because they are rare: "the baseline probability of a Report is more than 1000x lower than a Like, so it's weighted more to allow the prediction to affect the final ranking at all."
- Mass blocking or reporting by bad actors mainly changes recommendations for viewers similar to those actors, and only actions on posts served in the Home timeline count.

Current defaults (2026-11-21): like 0.708, reply 5.0, quote 5.0, share via DM 5.0, share via copy link 20.0, share 2.118, follow author 4.0, repost 1.0, click 0.274, open link 0.2, dwell 0.05, photo expand 0.05, profile click 0.0, video quality view 0.0; not interested −53.07, block −31.2, mute −58.8, report −234.0, not dwelled −0.02. A separate `BidirectionalFollowReplyWeightBoost` is 15.0.

### Small-author boost (author_cold_start.rs, param.rs)

The boost applies to authors under 50,000 followers (`ColdStartFollowerCap`), on posts under 2 hours old (`ColdStartMaxPostAgeSecs` 7200) that have fewer than 200 impressions (`ColdStartImpressionThreshold`). It lifts them toward feed slots 15 to 16. It runs with treatment, control and holdout arms, so it is an experiment that not every viewer gets.

### Reputation (tweepcred README; x-algorithm botmaker rules)

Twitter's 2023 release computed "Tweepcred", a PageRank over the interaction graph (mentions, retweets) adjusted by follower-to-following ratio, described as "a measure of reputation". The 2026 repo still has a PageRank-based `UserCredV2` score, used in spam rules (`IsHighPageRankUser`). The 2026 ranking README does not describe reputation as a direct multiplier on every post.

### Labels (README, Under the Hood)

Labels attached to posts and accounts drive visibility filtering. `safety-label-user-agg` "labels an account for what its posts collected". The [Under the Hood](https://x.com/i/jf/under_the_hood) tool shows aggregate label statistics for your account and posts, and since September 18, 2026 shows legal or compliance limits.

### SimClusters (Satuluri et al. 2020)

A "general-purpose representation layer based on overlapping communities into which users as well as heterogeneous content can be captured as sparse, interpretable vectors". Communities are discovered from the follow graph with a Metropolis-Hastings sampling algorithm. The posts and accounts a viewer sees from SimClusters come from communities the viewer is part of.

### Why people share (Berger & Milkman 2012; Berger 2013)

- Abstract: "Content that evokes high-arousal positive (awe) or negative (anger or anxiety) emotions is more viral. Content that evokes low-arousal, or deactivating, emotions (e.g., sadness) is less viral." Surprising, interesting and practically useful content is also more viral, and the emotion effect holds after controlling for those.
- Berger's six STEPPS principles: social currency (sharing makes the sharer look good), triggers ("top of mind, tip of tongue"), emotion (arousing emotions), public ("built to show, built to grow"), practical value ("news you can use"), stories ("Trojan horses" for information).

### Numerals (Nielsen 2007)

Eyetracking showed "numerals often stop the wandering eye and attract fixations", even in text readers otherwise skip. "Digits enhance the scannability of web content."

## Claim check

### How X picks what people see (`how-the-feed-works.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Every post passes find, score, filter | **Confirmed**, with nuance: some filters run before scoring and visibility filtering after selection | README "Filtering" |
| Retrieval pulls "roughly 2,000+" candidates per refresh | **Partly confirmed**: the code says "millions → 1000s"; the exact 2,000 is unverified | phoenix README |
| The model predicts likes, replies, shares, read-through, follows, mutes, and adds weighted predictions | **Confirmed** | README, param.rs |
| Filters drop stale, seen, blocked, muted, spam and low-reputation posts | **Confirmed** for stale, seen, blocked, muted; spam and label-based drops happen in visibility filtering | README |
| Thunder: followed accounts the viewer interacts with | **Partly confirmed**: Thunder returns posts from accounts the viewer follows; "interacts with" is not in the description | README table |
| Phoenix matches out-of-network posts to an interest profile from history | **Confirmed** | README, phoenix README |
| SimClusters groups by who engages with what | **Confirmed** | README table, Satuluri et al. |
| Popular Posts first seeded from the most-followed active accounts | **Confirmed** | README table |
| Followers are round one; "that's where it stops" without a strong score or quotes | **Confirmed in mechanism** (in-network vs out-of-network sources, out-of-network discount); Epstein's framing is his | README |
| X shows one post per conversation | **Confirmed**: the highest-scoring post in a reply chain wins, the rest are dropped | dedup_conversation_filter.rs |
| Every rule serves "keep people on the platform" | **Unverified**: Ryan's interpretation; the code optimises predicted actions including dwell and time spent | param.rs |

### Optimise for shares and replies (`what-x-rewards.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Weights as listed (share via copy link 20, reply 5, …, report −234) | **Confirmed** as of 2026-11-21, except like is now 0.708 (Ryan: 0.66), not interested −53.07 (−52.3), click 0.274 (0.3), share 2.118 (2.0) | param.rs |
| "A share by copied link is worth about 30 likes", "a reply about 7.5" | **Disputed**: X's code says reading weight ratios as count equivalences is "incorrect"; weights multiply predicted probabilities | param.rs comment, README |
| "One mute cancels roughly 89 likes, one report about 355" | **Disputed**, same reason; negative weights are large because those actions are rare | param.rs comment |
| Weights change without notice; like went 0.5 → 0.66 between August and October | **Confirmed in direction**: the like weight changed again to 0.708 by November 21; the August value is Ryan's | param.rs |
| Model reads the last ~1,000 actions | **Unverified**: the code reads recent engagement history; I found no 1,000 figure | phoenix README |
| Personalisation uses installed apps, inferred gender, IP location | **Confirmed** for installed apps and inferred gender (hydrators exist); IP location not checked | tree of `home-mixer/query_hydrators/` |
| Profile clicks count for 0 | **Confirmed** | param.rs |
| Shareable posts are original, specific, easy to scan | **Supported** by Berger & Milkman (interesting, useful, arousing content spreads) and Berger's STEPPS; Ryan's list itself is his advice | Berger & Milkman 2012; Berger 2013 |

### Stay out of the filters (`stay-visible.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Posts older than about 48 hours are filtered out | **Confirmed** | README, age_filter.rs |
| Filter drops seen posts, out-of-network reposts and replies, blocked and muted accounts and keywords, spam | **Confirmed** | README filter list |
| Out-of-network posts get a discount below 1 | **Confirmed** | README |
| Posting too often means some posts don't get a chance | **Supported**: author diversity multiplies each further post by the same author by a decaying factor | README |
| Small accounts get a cold-start boost on fresh posts | **Confirmed**, narrower than stated: under 50,000 followers, under 2 hours old, under 200 impressions, run as an experiment | author_cold_start.rs, param.rs |
| Ryan: first viral post 3 days in; 8,000+ followers and 4M+ impressions in 4 weeks; ~9,900 in a month | **Unverified**, one person's claim | Ryan's post |
| Big accounts get no guaranteed reach | **Supported**: no follower-count term in the score; Ryan's "18 months of fading accounts" is his observation | README |
| Credibility score worked out PageRank-style | **Confirmed** for Tweepcred (2023) and `UserCredV2` (2026, spam rules); **unverified** that it lifts or caps every post's rank | tweepcred README, botmaker rules |
| Engagement groups no longer work | **Partly supported**: only actions on posts served in Home count; directly navigating to a post "has no ranking impact" | param.rs comment |
| Labels limit visibility; Under the Hood shows them | **Confirmed** | README |
| Too many blocks and reports relative to likes trigger labels | **Unverified** as stated; account labels aggregate what posts collected | README `safety-label-user-agg` |
| Don't argue with trolls: if they mute or block you, reach drops | **Partly disputed**: block and mute weights apply to that viewer's predicted probability; mass blocking "will primarily affect recommendations for users who are similar to the bad actors" | param.rs comment |
| Get Premium, verify ID; avoid political content; don't let AI write 100% | **Unverified**, Ryan's advice (`IneligibleSubscriptionFilter` exists but I didn't read it) | README |

### Run a daily article routine (`article-engine.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| 5,000 followers in 5 months with daily articles | **Unverified**, one person's claim | Nicholas's post |
| One topic keeps you in one interest community | **Supported**: SimClusters places accounts and posts in communities by who engages with them | Satuluri et al. 2020 |
| Quotes are among the heavier actions | **Confirmed**: quote 5.0 | param.rs |
| Numbers in the first line | **Supported**: numerals attract fixations from scanning readers | Nielsen 2007 |
| "Keep links out of the post body" | **Disputed** in the ranker: open link has a positive weight (0.2); no link penalty appears in the documented scoring | param.rs |
| Posting more makes each post reach fewer | **Supported** by author diversity decay | README |
| "Make broad promises" | **Disputed** by the copywriting advice already in the lesson; no research checked | Ryan's copywriting advice |

## Not verified

- Twitter's 2023 engineering post "Twitter's Recommendation Algorithm" returned 403; not used.
- X Help Center platform-manipulation policy returned 403; not used.
- Berger's *Contagious* book itself was not opened; the STEPPS summary comes from Berger's own Penn Today interview.
