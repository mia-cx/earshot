# Literature: Growing on X (`content/x/`)

Research pass and independent audit, November 2026. Every source below was opened and read. "Not verified" marks anything that could not be opened.

The module's lessons came from three X posts: @ryangrowthh's reading of X's ranking code, @mattepstein on launches, and @NicholasDulait's article routine. The strongest check on them is the code itself, so most claims here are checked against `xai-org/x-algorithm` at commit `269340ce` (2026-11-21).

## Primary sources

| Source | What it is | Used for |
| --- | --- | --- |
| [xai-org/x-algorithm, README](https://github.com/xai-org/x-algorithm) | X's open-source For You code, updated almost daily | Pipeline, candidate sources, filters, adjustments, labelling systems, Under the Hood |
| [xai-org/x-algorithm, `home-mixer/params/param.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/params/param.rs) and [its commit history](https://github.com/xai-org/x-algorithm/commits/main/home-mixer/params/param.rs) | Production default parameters, and how they changed since 2026-08-13 | Action weights, cold-start boost, comments on how to read the weights, like-weight history |
| [`home-mixer/filters/age_filter.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/filters/age_filter.rs), [`dedup_conversation_filter.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/filters/dedup_conversation_filter.rs) | Filter code | 48-hour age limit, one post per conversation |
| [`home-mixer/scorers/author_cold_start.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/scorers/author_cold_start.rs) | Small-author boost | Which posts qualify, how many get lifted, experiment arms |
| [`xai-value-model/scoring.rs`](https://github.com/xai-org/x-algorithm/blob/main/xai-value-model/scoring.rs) | Score arithmetic | Weighted sum, then offset and multipliers |
| [`phoenix/README.md`](https://github.com/xai-org/x-algorithm/blob/main/phoenix/README.md) | The ranking and retrieval models | "Millions → 1000s" retrieval, history-based user tower |
| [`botmaker-rules/.../IsHighPageRankUser.df`](https://github.com/xai-org/x-algorithm/blob/main/botmaker-rules/scarecrow/derived-feature/IsHighPageRankUser.df) | Spam rule feature | Where the 2026 PageRank score is used |
| [twitter/the-algorithm, tweepcred README](https://github.com/twitter/the-algorithm/blob/main/src/scala/com/twitter/graph/batch/job/tweepcred/README) | Twitter's 2023 open-source release | PageRank reputation ("Tweepcred") |
| [Satuluri et al., *SimClusters* (KDD 2020)](https://dl.acm.org/doi/10.1145/3394486.3403370) ([author PDF](https://venusatuluri.github.io/KDD_SimClusters_paper.pdf)) | Peer-reviewed paper by Twitter engineers | How interest communities are found |
| [Berger & Milkman, "What Makes Online Content Viral?" (*Journal of Marketing Research*, 2012)](https://journals.sagepub.com/doi/10.1509/jmr.10.0353) ([author PDF](https://jonahberger.com/wp-content/uploads/2013/02/ViralityB.pdf)) | Peer-reviewed study of 3 months of *New York Times* articles plus experiments | What makes people share |
| [Penn Today, "Q&A with Jonah Berger" (2013)](https://penntoday.upenn.edu/2013-04-18/interviews/qa-jonah-berger) | Berger explains the six STEPPS principles of *Contagious* (2013) in his own words | Why people pass things on |
| [Jakob Nielsen, "Show Numbers as Numerals When Writing for Online Readers" (NN/g, 2007)](https://www.nngroup.com/articles/web-writing-show-numbers-as-numerals/) | Eyetracking findings | Numbers in titles and first lines |

The ACM, SAGE and Penn Today pages return 403 to scripts. Their content was read from the author PDFs, Crossref metadata and a Wayback Machine copy of the Penn Today page.

## What the sources say

### The pipeline (xai-org/x-algorithm README, phoenix README)

- The For You feed combines in-network posts (`Thunder`, recent posts from accounts the viewer follows) and out-of-network posts (`Phoenix retrieval`, `SimClusters`, and a shared `Popular posts` list, "initially from the most-followed active accounts").
- `Phoenix` is a transformer that reads the viewer's recent engagement history and predicts, per post, the probability of each action. The final score is `Σ (weight_i × P(action_i))`. `scoring.rs` then offsets the sum and applies multipliers before ranking.
- Retrieval narrows "millions → 1000s" of candidates (phoenix README diagram).
- After the weighted sum come three adjustments: author diversity (each further post by the same author is multiplied by a decaying factor), an out-of-network discount ("a factor below 1"), and a new-author boost.
- Pre-scoring filters include `AgeFilter` ("Posts older than 48 hours"), `PreviouslySeenPostsFilter`, `MutedKeywordFilter`, `AuthorSocialgraphFilter` (blocked or muted accounts), and `OONRetweetReplyFilter` (reposts and replies from accounts the viewer doesn't follow). Visibility filtering runs separately and can ALLOW, NOTICE, INTERSTITIAL or DROP a post, using labels from other systems.
- `DedupConversationFilter` groups posts by conversation and keeps only the highest-scoring one.
- Query hydrators for `user_inferred_gender`, `user_installed_apps` and `ip` exist in `home-mixer/query_hydrators/`.

### How to read the weights (param.rs comments, README "August 14th, 2026")

The code's own comment block, written because of posts like Ryan's:

- Each weight multiplies the *predicted probability* of that action for this viewer, "the weights do not multiply raw engagement counts".
- Reading weight ratios as count equivalences ("one report cancels 468 likes") is called out as "incorrect".
- Negative actions get large weights because they are rare: "the baseline probability of a Report is more than 1000x lower than a Like, so it's weighted more to allow the prediction to affect the final ranking at all."
- Mass blocking or reporting by bad actors mainly changes recommendations for viewers similar to those actors, and only actions on posts served in the Home timeline count.

Current defaults (2026-11-21): like 0.708, reply 5.0, quote 5.0, share via DM 5.0, share via copy link 20.0, share 2.118, follow author 4.0, repost 1.0, click 0.274, open link 0.2, dwell 0.05, photo expand 0.05, profile click 0.0, video quality view 0.0; not interested −53.07, block −31.2, mute −58.8, report −234.0, not dwelled −0.02. A separate `BidirectionalFollowReplyWeightBoost` is 15.0.

The like weight in the commit history: 0.5 from 2026-08-13, 0.6 on 2026-10-13, 0.66 on 2026-10-14, 0.708 from 2026-11-05.

### Small-author boost (author_cold_start.rs, param.rs)

Eligible posts are original posts (not replies or reposts) from authors with at most 50,000 followers (`ColdStartFollowerCap`), under 2 hours old (`ColdStartMaxPostAgeSecs` 7200), with fewer than 200 Home impressions (`ColdStartImpressionThreshold`). Each request picks at most one eligible post, by Thompson sampling, and lifts it to the score of the post ranked at `ColdStartSlotMin` (15; the range up to `ColdStartSlotMax` 16 is exclusive). Viewers are split into holdout, control and treatment arms: holdout viewers can be shown any eligible author, the other arms only authors in the matching corpus.

### Reputation (tweepcred README; x-algorithm README and botmaker rules)

Twitter's 2023 release computed "Tweepcred", a PageRank over the interaction graph (mentions, retweets) adjusted by follower-to-following ratio, described as "a measure of reputation". The 2026 repo's `user-cred-v2` "runs PageRank over the follow graph and engagement edges". A code search finds it in spam, enforcement and label rules (`IsHighPageRankUser`, `abuse-enforcement-service`, `safety-label-user-agg`), not in the ranking score.

### Labels (README, Under the Hood)

Labels attached to posts and accounts drive visibility filtering. `agatha` labels "an account from how others respond to its posts: blocks, reports and spam reports relative to favorites". `safety-label-user-agg` "labels an account for what its posts collected". The [Under the Hood](https://x.com/i/jf/under_the_hood) tool shows aggregate label statistics for your account and posts, and since September 18, 2026 shows legal or compliance limits.

### SimClusters (Satuluri et al. 2020)

A "general-purpose representation layer based on overlapping communities into which users as well as heterogeneous content can be captured as sparse, interpretable vectors". Communities are discovered from the follow graph. A post's representation aggregates the representations of "all the users who engaged with" it, updated as engagements stream in.

### Why people share (Berger & Milkman 2012; Berger 2013)

- Abstract: "all the New York Times articles published over a three-month period". "Content that evokes high-arousal positive (awe) or negative (anger or anxiety) emotions is more viral. Content that evokes low-arousal, or deactivating, emotions (e.g., sadness) is less viral." Surprising, interesting and practically useful content is also more viral, and the emotion effect holds after controlling for those.
- Berger's six STEPPS principles: "social currency, for example, is all about how we share things that make us look good, smart, and in-the-know"; practical value: "That's just useful information, so people share it."

### Numerals (Nielsen 2007)

Eyetracking showed "numerals often stop the wandering eye and attract fixations, even when they're embedded within a mass of words that users otherwise ignore."

## Claim check

Verdicts: **supported** (the source says this), **overstated** (the source says something narrower), **misattributed**, **disputed**, **unsupported**, **one person's claim** (labelled as such in the lesson).

### How X picks what people see (`how-the-feed-works.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| X publishes the For You code as `xai-org/x-algorithm` | **supported** | README |
| Each refresh narrows millions of posts to thousands of candidates | **supported** | phoenix README |
| The model reads recent engagement history and predicts like, reply, share, read-through, follow, mute; weights times predictions, summed | **supported** | README "Scoring and Ranking" |
| Stale, seen, blocked and muted posts mostly drop before scoring; spam and safety labels after selection | **supported** | README "Filtering" |
| "Keep people on the platform" is Ryan's reading; the code rewards predicted dwell and penalises scroll-pasts | **supported** (labelled as Ryan's) | param.rs: dwell 0.05, not dwelled −0.02 |
| Thunder, Phoenix, SimClusters and Popular Posts as described | **supported** | README "Candidate Sources" |
| Popular Posts is a "small" list | **unsupported**: the README says only "a shared list". Fixed: "small" removed | README |
| SimClusters finds communities from who follows whom and places accounts and posts in them | **supported** | Satuluri et al. 2020 |
| A post can go viral inside one niche | **supported** in mechanism | README; Satuluri et al. |
| Big accounts get bigger launches; followers are "where it stops" | **one person's claim** (Epstein's framing); mechanism supported by the out-of-network discount | README |
| One post per conversation; the highest-scoring one wins | **supported** | dedup_conversation_filter.rs |
| A 5-tweet launch thread: 4 never reach non-followers | **supported** | dedup_conversation_filter.rs; `OONRetweetReplyFilter` drops replies from accounts the viewer doesn't follow |

### Optimise for shares and replies (`what-x-rewards.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Share by copied link 20, reply and quote 5, like about 0.7 | **supported** | param.rs |
| Mute −58.8, report −234; large because those actions are rare | **supported** | param.rs comment |
| Reading the weights as like-equivalents is "incorrect" | **supported** | param.rs comment; README |
| The full weights table as of 2026-11-21 | **supported**: every value matches | param.rs at `269340ce` |
| Profile clicks count for 0 | **supported** | param.rs |
| X sums every action, then transforms the total | **supported** | scoring.rs `offset_score`, multipliers |
| Like weight 0.5 in August, 0.66 in October, 0.708 by November | **one person's claim** in the lesson, now **supported** by the code history. Fixed: cited to the commit history with exact dates | param.rs commit history |
| The model reads recent history and loads installed apps and inferred gender | **supported** | query hydrators |
| Berger and Milkman: 3 months of *NYT* articles; awe, anger, anxiety spread more, sadness less; useful and surprising spread more | **supported** | Berger & Milkman 2012 |
| People share what makes them look smart and what's useful | **supported** | Penn Today 2013 |
| Anger earns "mutes and blocks, the heaviest negatives" | **overstated**: report (−234) is the heaviest and block (−31.2) the lightest of the three. Fixed: "mutes, blocks and reports" | param.rs |
| Ryan's list of shareable-post habits | **one person's claim** | Ryan's post |

### Stay out of the filters (`stay-visible.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Posts older than 48 hours are filtered out | **supported** | README; age_filter.rs |
| Filters drop seen posts, out-of-network reposts and replies, blocked and muted accounts and keywords; visibility filtering drops labelled posts | **supported** | README |
| Out-of-network posts get a discount below 1 | **supported** | README |
| Each extra post from you is multiplied by a decaying factor | **supported** | README "Author Diversity" |
| Cold-start boost for posts under 2 hours from authors under 50,000 followers with under 200 impressions; "not every viewer gets it" | **overstated**: only original posts qualify, at most one post per refresh is lifted (to about slot 15), and the experiment arms decide which authors qualify for which viewers. Fixed | author_cold_start.rs; param.rs |
| Ryan: first viral post in 3 days; 8,000+ followers and 4M+ impressions in 4 weeks; about 9,900 in a month | **one person's claim** | Ryan's article; @AIGuide_ |
| "Follower count isn't part of the score" | **overstated**: no weight rewards it, but the cold-start boost reads follower count. Fixed: "No weight in the score rewards follower count" | param.rs; author_cold_start.rs |
| Ryan has watched big accounts fade over about 18 months | **one person's claim** | Ryan's article |
| Engagement from well-connected niche accounts counts for more than a big follower count | **unsupported** as a fact: Ryan's view; the 2026 score has no such term. Fixed: attributed to Ryan | Ryan's article; README |
| Tweepcred: PageRank over who mentions and reposts whom | **supported** | tweepcred README |
| The 2026 PageRank-style score is used in spam rules | **overstated**: it runs over follows and engagement and also feeds enforcement and label rules. Fixed | README `user-cred-v2`; code search |
| Engagement groups do little: only Home-served actions count | **supported**, and they're banned: the authenticity policy prohibits "coordinating to exchange engagement" (read via Wayback, 15 Nov 2026) | param.rs comment; X authenticity policy |
| Labels limit visibility; account labels aggregate; Under the Hood shows them | **supported** | README |
| Ryan's account-hygiene tricks (Premium, ID, no 100% AI copy, avoid politics) | **one person's claim** | Ryan's article |
| A troll blocking you: "X's code comments say otherwise" | **overstated**: true for one person's block, but `agatha` labels accounts from blocks and reports relative to likes, so a pile-on can still cost you. Fixed | param.rs comment; README `agatha` |

### Run a daily article routine (`article-engine.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| SimClusters "places accounts and posts into interest communities based on who engages with them" | **overstated**: communities come from the follow graph; posts are placed by who engages with them. Fixed | Satuluri et al. 2020 |
| 5,000 followers in 5 months with daily articles | **one person's claim** | Nicholas's post |
| A predicted quote weighs 5 against about 0.7 for a like | **supported** | param.rs |
| "Make broad promises" vs "Numbers, names, and timeframes always beat vague promises" | **one person's claim** each; Ryan's quote is verbatim | Nicholas's post; Ryan's copywriting article |
| Numerals stop a scanning reader's eye | **supported** | Nielsen 2007 |
| Open link has weight 0.2; the documented scoring has no link penalty | **supported** | param.rs; README "Scoring and Ranking" |
| Each extra post from the same author is multiplied by a decaying factor | **supported** | README |
| "Ryan argues for posting less" | **overstated**: he warns that posting too much means not every post gets a chance. Fixed | Ryan's article |
| X added comments to its weights file because people and AI misread it | **supported** | README "August 14th, 2026" |

## Not verified

- Twitter's 2023 engineering post "Twitter's Recommendation Algorithm" returned 403; not used.
- X Help Center platform-manipulation policy returned 403; not used.
- Berger's *Contagious* book itself was not opened; the STEPPS summary comes from Berger's own Penn Today interview.
- Some botmaker rules are not published in the repo, so "the code only uses PageRank in spam and enforcement rules" covers the published code only.
