# Literature: Video (`content/video/`)

Research pass and independent audit, November 2026. Every source below was opened and read. "Not verified" marks anything that could not be opened.

The module came from four X posts: @leomeethewoo on premium product videos, @tuanle and @dsqjaffa on short-form formats, and @EianLu's AI video workflow. The checks below come from perception research, the Ehrenberg-Bass Institute, platform documentation, and the AI video models' own docs.

## Primary sources

| Source | What it is | Used for |
| --- | --- | --- |
| [Palmer, Gardner & Wickens, "Aesthetic issues in spatial composition" (*Spatial Vision*, 2008)](https://palmerlab.berkeley.edu/pdf/PalmerGardner&Wickens-1.pdf) | Psychophysics experiments on framing single objects | Centre bias, inward bias, rule of thirds |
| [Reber, Schwarz & Winkielman, "Processing fluency and aesthetic pleasure" (*Personality and Social Psychology Review*, 2004)](https://pages.ucsd.edu/~pwinkiel/abs_beauty-PSPR-2004.htm) | Review paper | Why repetition and consistency read as quality |
| [Romaniuk, Sharp, Dawes & Faghidno, "How B2B Brands Grow" (Ehrenberg-Bass and LinkedIn B2B Institute, 2023)](https://marketingscience.info/news-and-insights/how-b2b-brands-grow) | Institute report page | Mental availability, distinctive assets, growth through new customers |
| [Page Laubheimer, "Executing UX Animations: Duration and Motion Characteristics" (NN/g, 2020)](https://www.nngroup.com/articles/animation-duration/) | Usability research article | Easing vs linear motion |
| [Husain, Thompson & Schellenberg, "Effects of musical tempo and mode on arousal, mood, and spatial abilities" (*Music Perception*, 2002)](https://research.bond.edu.au/en/publications/effects-of-musical-tempo-and-mode-on-arousal-mood-and-spatial-abi/) | Experiment | Tempo changes arousal; mode changes mood |
| [Cristos Goodrow, "On YouTube's recommendation system" (YouTube blog, 2021)](https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/) | YouTube's VP of Engineering | What YouTube's recommender reads |
| [TikTok, "How TikTok recommends videos #ForYou" (2020)](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you) | TikTok newsroom | Follower count is not a direct factor |
| [YouTube Help: "Measure key moments for audience retention"](https://support.google.com/youtube/answer/9314415) | Official help page | Comparing a video against your own typical retention |
| [Meta for Developers: Instagram Media Insights](https://developers.facebook.com/documentation/instagram-platform/reference/instagram-media/insights) | Official API reference | Instagram reports saves on posts and reels |
| [Boehm & Basili, "Software Defect Reduction Top 10 List" (*IEEE Computer*, 2001)](https://www.cs.umd.edu/projects/SoftEng/ESEG/papers/82.78.pdf) | Short paper | Cost of fixing late; peer review |
| [Menzies et al., "Are Delayed Issues Harder to Resolve?" (2016)](https://arxiv.org/abs/1609.04886) | Study of 171 software projects | Counter-evidence to the general cost-escalation rule |
| [Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet" (ICLR 2024)](https://arxiv.org/abs/2310.01798) | Peer-reviewed paper | Why a separate reviewer beats self-review |
| [OpenAI: "Sora" (2024)](https://openai.com/index/sora/) | Model announcement with stated weaknesses | Physics, cause and effect, left and right |
| [Google Cloud: Video generation prompt guide (Veo)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide) | Official documentation (moved from the Vertex AI docs path in 2026) | Negative phrasing, specificity |
| [BytePlus ModelArk: Create a video generation task (Seedance)](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/create-video-generation-task-api) | Official API documentation | First and last frames, aspect ratio, resolution, audio |

## What the sources say

### Framing (Palmer et al. 2008)

Abstract: for front-facing single objects, "preference was greatest for pictures whose subject was located at or near the center of the frame and decreased monotonically and symmetrically with distance from the center (the center bias)." For left- or right-facing objects, viewers also preferred "objects to face into rather than out of the frame (the inward bias)." The data are "generally inconsistent with the rule of thirds": off-centre positions work "only when the object faces into the frame".

### Fluency (Reber et al. 2004)

"The more fluently perceivers can process an object, the more positive their aesthetic response." Figural goodness, figure-ground contrast, stimulus repetition, symmetry and prototypicality all raise fluency and with it liking.

### Distinctiveness and growth (Ehrenberg-Bass)

How B2B Brands Grow (2023): buyers choose brands that are "easy to mind" and "easy to find"; "brands grow by acquiring new customers, not by increasing customer loyalty"; "Brands compete through 'meaningless distinctiveness' – logos, characters, colors – not through meaningful differentiation."

### Easing (Laubheimer, NN/g 2020)

"Completely linear motion looks weird and unnatural to users." An object that "subtly speeds up or down over time" feels more natural.

### Tempo (Husain et al. 2002)

Four versions of one Mozart sonata, fast or slow, major or minor. "Tempo manipulations affected arousal but not mood, whereas mode manipulations affected mood but not arousal."

### Recommendation systems

- YouTube (Goodrow 2021): signals are "clicks, watchtime, survey responses, sharing, likes, and dislikes".
- TikTok (2020): "neither follower count nor whether the account has had previous high-performing videos are direct factors", though a video "is likely to receive more views if posted by an account that has more followers".
- YouTube Help: "use typical retention to compare your 10 latest videos of similar length".
- Instagram API: the `saved` metric ("Number of time your app user's Instagram media was saved") exists for `FEED` posts and `REELS`.

### Catching errors early

- Boehm & Basili (2001): "Finding and fixing a software problem after delivery is often 100 times more expensive than finding and fixing it during the requirements and design phase", but "for small, noncritical software systems to be more like 5:1 than 100:1." Peer review "catches from 31 to 93 percent of the defects, with a median of around 60 percent."
- Menzies et al. (2016) tested the "delayed issue effect" in 171 projects and "found no evidence" that later fixes cost consistently more.
- Huang et al. (2024): "LLMs struggle to self-correct their responses without external feedback, and at times, their performance even degrades after self-correction."

### Video model behaviour

- Sora (OpenAI, February 2024, the first Sora model): it "may struggle to simulate the physics of a complex scene", may miss cause and effect ("a cookie might not show a mark after a character bites it"), and "may also confuse spatial details included in a prompt, such as discerning left from right."
- Veo prompt guide (Google), on the negative prompt field: "Not recommended: using instructive language or words such as "no" or "don't". For example, avoid prompts such as "no walls"". Recommended: list unwanted things as plain nouns ("wall, frame"). On subjects: "Specificity helps avoid generic outputs."
- Seedance API (BytePlus): first-and-last-frame generation takes two images with roles `first_frame` and `last_frame` (Seedance 2.5 series, 2.0 series and 1.0 pro). If their aspect ratios differ, "the first frame image takes precedence, and the last frame image will be automatically cropped to fit." To "strictly ensure the first and last frames exactly match the specified images", use this mode. Seedance 2.0 mini supports 480p and 720p only. `generate_audio` defaults to `true` and generates "matching human voice, sound effects and background music".

## Claim check

Verdicts: **supported** (the source says this), **overstated** (the source says something narrower), **misattributed**, **disputed**, **unsupported**, **one person's claim** (labelled as such in the lesson).

### Make product videos feel premium (`premium-product-videos.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| People like things more when repetition, symmetry and contrast make them easy to take in | **supported** | Reber et al. 2004 |
| "The Ehrenberg-Bass Institute adds that buyers pick brands they recognise easily, built through consistent colours and house styles" | **misattributed**: the cited page is an unsigned blog post republished on the Institute's site, not Institute research. Fixed: cited to Romaniuk, Sharp et al.'s *How B2B Brands Grow*, which says buyers choose brands that are easy to mind and that brands compete through logos, characters and colours | How B2B Brands Grow 2023 |
| Leo's studio sells to fintech and made 50+ videos in one summer | **one person's claim** | Leo's post |
| Apple's videos make existing buyers feel special | **one person's claim**; the Watch out adds that brands grow through new customers | Leo's post; How B2B Brands Grow 2023 |
| Apple keeps a brand guideline; the team storyboards in Figma | **one person's claim** | Leo's post |
| Viewers prefer a single front-facing object in the centre, and a sideways one facing into the frame | **supported** | Palmer et al. 2008 |
| Linear motion "looks weird and unnatural" | **supported** | Laubheimer 2020 |
| Tempo changed arousal, mode changed mood | **supported** | Husain et al. 2002 |
| BPM ranges (60–80 regal, 90–110 smooth, 115–123 elite) | **one person's claim** (labelled); research supports only "faster is more arousing" | Husain et al. 2002 |
| Brands grow by acquiring new customers, not loyalty | **supported** | How B2B Brands Grow 2023 |

### Reuse formats that already work (`short-form.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| YouTube reads clicks, watch time, surveys, shares, likes and dislikes | **supported** | Goodrow 2021 |
| TikTok describes similar signals | **supported** | TikTok 2020 |
| People like familiar, easy-to-process forms more | **supported** | Reber et al. 2004 (prototypicality, repetition) |
| tuanle: 4B+ views, the 4M-view video, Buldak, Stan, MrBeast | **one person's claim** (chapter list only) | tuanle's post |
| YouTube's retention report compares with your 10 latest videos of similar length | **supported** | YouTube Help |
| TikTok: follower count and past hits aren't direct factors, though a bigger following can bring more views | **supported** | TikTok 2020 |
| dsqjaffa co-founded Virlo | **supported** | Their X bio in the scraped post |
| Analyst bot: TikTok is "the one platform that has" saves | **disputed**: Instagram reports saves on posts and reels. Fixed: "Compare saves only on platforms whose data includes them" | Instagram Media Insights |

### Plan an AI video before you pay for it (`ai-video-plan.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Video is billed per second; prompt edits are free | **one person's claim** (EianLu's prices, labelled) | EianLu's post |
| Late bugs often cost 100 times more, about 5 times in small projects | **supported** | Boehm & Basili 2001 |
| 171 projects showed no consistent effect | **supported** | Menzies et al. 2016 |
| Models struggle to self-correct without outside feedback | **supported** | Huang et al. 2024 |
| Peer review catches a median of about 60% of defects | **supported** | Boehm & Basili 2001 |
| Very low reroll rate from these rules | **one person's claim** | EianLu's post |
| "OpenAI says its Sora model may struggle with physics, cause and effect, left and right" | **overstated** as a current fact: this is OpenAI's February 2024 note on the first Sora model. Fixed: dated to 2024 | OpenAI 2024 |
| Seedance prices (~¥1.5/s, ~¥0.5/s) | **supported**: Volcengine lists ¥70 and ¥23 per million tokens at 720p, and 720p at 24 fps is about 21,600 tokens a second | EianLu's post; [Volcengine Ark: Model pricing](https://www.volcengine.com/docs/82379/1544106) |
| Viewers prefer centred front-facing subjects; 38/62% lines only for profiles facing in | **supported** | Palmer et al. 2008 |
| Codex alone can do the job; Claude has better directing taste | **one person's claim** | EianLu's post |
| Check palette sketches in greyscale for contrast | **one person's claim** (EianLu's practice) | EianLu's post |

### Generate AI shots without rerolls (`ai-video-shots.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Seedance takes `first_frame` and `last_frame`; mismatched ratios crop the last frame | **supported** | Seedance docs |
| First-and-last-frame mode prevents most logic errors | **one person's claim**; the docs recommend the mode when frames must match exactly | EianLu's post; Seedance docs |
| "Google's Veo guide warns against 'no' or 'don't'" | **overstated**: the advice is about how to fill the negative prompt field. Fixed: says so; link updated to the guide's new address | Veo prompt guide |
| "Specificity helps avoid generic outputs" | **supported** | Veo prompt guide |
| "OpenAI notes Sora can confuse left and right" | **overstated** as current: a 2024 note. Fixed: dated | OpenAI 2024 |
| Seedance adds music by default; set `generate_audio` to `false` | **supported** | Seedance docs |
| 2.0 mini outputs 720p at most, so upscale in post | **supported** | Seedance docs |
| Seedance 2.5 costs about 3x 2.0 mini | **one person's claim** | EianLu's post |
| Failure fixes table, BT.601 decoding, post-production settings | **one person's claim** | EianLu's post |

## Not verified

- Seedance 2.5's price relative to 2.0 mini rests on the author's post; the lesson keeps it labelled as his.
- Instagram's own Help Center pages return 400 to scripts; the saves metric was read from Meta's developer reference instead.
- Romaniuk's *Building Distinctive Brand Assets* (2018) and the Disney animation principles (*The Illusion of Life*, 1981) were not opened.
