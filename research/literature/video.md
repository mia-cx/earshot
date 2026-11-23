# Literature: Video (`content/video/`)

Research pass, November 2026. Every source below was opened and read for this pass. "Not verified" marks anything I could not open.

The module came from four X posts: @leomeethewoo on premium product videos, @tuanle and @dsqjaffa on short-form formats, and @EianLu's AI video workflow. The checks below come from perception research, the Ehrenberg-Bass Institute, platform documentation, and the AI video models' own docs.

## Primary sources

| Source | What it is | Used for |
| --- | --- | --- |
| [Palmer, Gardner & Wickens, "Aesthetic issues in spatial composition" (*Spatial Vision*, 2008)](https://palmerlab.berkeley.edu/pdf/PalmerGardner&Wickens-1.pdf) | Psychophysics experiments on framing single objects | Centre bias, inward bias, rule of thirds |
| [Reber, Schwarz & Winkielman, "Processing fluency and aesthetic pleasure" (*Personality and Social Psychology Review*, 2004)](https://pages.ucsd.edu/~pwinkiel/abs_beauty-PSPR-2004.htm) | Review paper | Why repetition and consistency read as quality |
| [Ehrenberg-Bass Institute: "Differentiation versus distinctiveness"](https://marketingscience.info/news-and-insights/differentiation-versus-distinctiveness) | Institute article | Distinctive assets: logos, house styles |
| [Romaniuk, Sharp, Dawes & Faghidno, "How B2B Brands Grow" (Ehrenberg-Bass and LinkedIn B2B Institute, 2023)](https://marketingscience.info/news-and-insights/how-b2b-brands-grow) | Institute report page | Brands grow by acquiring customers, not loyalty |
| [Page Laubheimer, "Executing UX Animations: Duration and Motion Characteristics" (NN/g, 2020)](https://www.nngroup.com/articles/animation-duration/) | Usability research article | Easing vs linear motion |
| [Husain, Thompson & Schellenberg, "Effects of musical tempo and mode on arousal, mood, and spatial abilities" (*Music Perception*, 2002)](https://research.bond.edu.au/en/publications/effects-of-musical-tempo-and-mode-on-arousal-mood-and-spatial-abi/) | Experiment | Tempo changes arousal; mode changes mood |
| [Cristos Goodrow, "On YouTube's recommendation system" (YouTube blog, 2021)](https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/) | YouTube's VP of Engineering | What YouTube's recommender reads |
| [TikTok, "How TikTok recommends videos #ForYou" (2020)](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you) | TikTok newsroom | Follower count is not a direct factor |
| [YouTube Help: "Measure key moments for audience retention"](https://support.google.com/youtube/answer/9314415) | Official help page | Comparing a video against your own typical retention; the first 30 seconds |
| [Boehm & Basili, "Software Defect Reduction Top 10 List" (*IEEE Computer*, 2001)](https://www.cs.umd.edu/projects/SoftEng/ESEG/papers/82.78.pdf) | Short paper | Cost of fixing late; peer review |
| [Menzies et al., "Are Delayed Issues Harder to Resolve?" (2016)](https://arxiv.org/abs/1609.04886) | Study of 171 software projects | Counter-evidence to the general cost-escalation rule |
| [Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet" (ICLR 2024)](https://arxiv.org/abs/2310.01798) | Peer-reviewed paper | Why a separate reviewer beats self-review |
| [OpenAI: "Sora" (2024)](https://openai.com/index/sora/) | Model announcement with stated weaknesses | Physics, cause and effect, left and right |
| [Google Cloud: Video generation prompt guide (Veo)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide) | Official documentation | Negative phrasing, specificity |
| [BytePlus ModelArk: Create a video generation task (Seedance)](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/create-video-generation-task-api) | Official API documentation | First and last frames, aspect ratio, resolution, audio |

## What the sources say

### Framing (Palmer et al. 2008)

Abstract: for front-facing single objects, "preference was greatest for pictures whose subject was located at or near the center of the frame and decreased monotonically and symmetrically with distance from the center (the center bias)." For left- or right-facing objects, viewers also preferred "objects to face into rather than out of the frame (the inward bias)." The same held when participants took their own photos. Later work from the lab describes this as contradicting the rule of thirds.

### Fluency (Reber et al. 2004)

"The more fluently perceivers can process an object, the more positive their aesthetic response." Repetition, symmetry, figure-ground contrast and prototypicality all raise fluency and with it liking.

### Distinctiveness and growth (Ehrenberg-Bass)

- "Distinctiveness is all about making your brand easily identified by customers. Brand names, logos, jingles, slogans and house styles contribute to this." Buyers "naturally buy the brands they remember and can find when needed."
- How B2B Brands Grow (2023): "brands grow by acquiring new customers, not by increasing customer loyalty", through advertising that builds memory structures and reaches every category buyer.

### Easing (Laubheimer, NN/g 2020)

"Completely linear motion looks weird and unnatural to users." Objects in the world "tend to accelerate and decelerate when they start and, respectively, stop moving." Ease-out is the usual choice for things entering.

### Tempo (Husain et al. 2002)

Four versions of one Mozart sonata, fast or slow, major or minor. "Tempo manipulations affected arousal but not mood, whereas mode manipulations affected mood but not arousal."

### Recommendation systems

- YouTube (Goodrow 2021): signals are "clicks, watchtime, survey responses, sharing, likes, and dislikes"; "the job of our recommendation system is to find that audience"; adding watch time in 2012 caused "an immediate 20% drop in views".
- TikTok (2020): recommendations use interactions, video information and device settings; "neither follower count nor whether the account has had previous high-performing videos are direct factors."
- YouTube Help: the retention report compares a video with "your 10 most recent videos of similar length"; "Intro" is the share still watching after 30 seconds; a strong intro may mean the opening "matched the viewer's expectation of the video's thumbnail and title."

### Catching errors early

- Boehm & Basili (2001): "Finding and fixing a software problem after delivery is often 100 times more expensive than finding and fixing it during the requirements and design phase", but "for small, noncritical software systems to be more like 5:1 than 100:1." Peer review "catches from 31 to 93 percent of the defects, with a median of around 60 percent."
- Menzies et al. (2016) tested the "delayed issue effect" in 171 projects and "found no evidence" that later fixes cost consistently more. The general rule is disputed; it holds where the later stage is visibly more expensive, as with per-second video billing.
- Huang et al. (2024): "LLMs struggle to self-correct their responses without external feedback", and sometimes "their performance even degrades after self-correction."

### Video model behaviour

- Sora (OpenAI 2024): the model "may struggle to simulate the physics of a complex scene", may miss cause and effect ("a cookie might not show a mark after a character bites it"), and "may also confuse spatial details included in a prompt, such as discerning left from right."
- Veo prompt guide (Google): "Not recommended: using instructive language or words such as "no" or "don't"", for example "no walls". Recommended: "Describe what you don't want to see" as plain nouns in the negative prompt field. "Specificity helps avoid generic outputs."
- Seedance API (BytePlus): first-and-last-frame generation takes two images with roles `first_frame` and `last_frame`; if their aspect ratios differ, "the first frame image takes precedence, and the last frame image will be automatically cropped to fit." 2.0 mini outputs 480p or 720p only. `generate_audio` defaults to `true` and adds "synchronized voice, sound effects, and music"; `false` returns a silent video.

## Claim check

### Make product videos feel premium (`premium-product-videos.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Premium means nothing looks accidental; fixed rules make choices look deliberate | **Supported**: consistency builds recognition (distinctive assets), and repetition raises processing fluency and liking | Ehrenberg-Bass; Reber et al. 2004 |
| Apple's videos aren't trying to make more people know Apple; they make existing buyers feel special | **Disputed** as a growth strategy: Ehrenberg-Bass finds brands grow by acquiring new customers, not loyalty | How B2B Brands Grow 2023 |
| Leo's studio made 50+ videos in one summer | **Unverified**, his claim | Leo's post |
| Apple keeps a brand guideline for video | **Unverified**, Leo's claim | Leo's post |
| The key object sits in the centre of the frame | **Confirmed** for a single front-facing object (centre bias) | Palmer et al. 2008 |
| Linear motion reads as cheap; ease your keyframes | **Supported**: linear motion "looks weird and unnatural" | Laubheimer 2020 |
| Tempo sets the energy of the whole video | **Supported**: tempo changes arousal, not mood; mode (major/minor) changes mood | Husain et al. 2002 |
| BPM ranges (60–80 regal, 90–110 smooth, 115–123 elite) | **Unverified**, Leo's opinion; research supports only "faster is more arousing" | Husain et al. 2002 |

### Reuse formats that already work (`short-form.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| "Algorithms push formats they already recognise" | **Disputed** as stated: YouTube and TikTok describe ranking on viewer responses (watch time, shares, surveys, interactions), not format recognition | Goodrow 2021; TikTok 2020 |
| Proven formats work | **Supported** on the viewer side: familiar, prototypical forms are processed more fluently; formats that broke out already earned the viewer signals the ranker reads | Reber et al. 2004; Goodrow 2021 |
| tuanle: 4B+ views, 4M-view iPhone video; Buldak 900M views; Stan; MrBeast starts from title and thumbnail | **Unverified**, chapter list only | tuanle's post |
| Judge a video against the creator's usual views | **Supported**: YouTube's own retention report compares a video with the creator's 10 most recent similar videos | YouTube Help |
| Small creators' outliers show the format did the work | **Supported** on TikTok: follower count and past hits are not direct ranking factors | TikTok 2020 |
| Shortlist creators under ~100,000 followers | **Unverified** threshold, a practitioner heuristic | None |
| TikTok is the only platform with saves (analyst bot prompt) | **Unverified**: no platform docs checked | None |

### Plan an AI video before you pay for it (`ai-video-plan.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Each stage costs more than the one before; catch errors early | **Confirmed** for this pipeline by the price list (video billed per second); **disputed** as a general law in software | Seedance docs; Boehm & Basili 2001; Menzies et al. 2016 |
| A separate review agent passes prompts before spend | **Supported**: models self-correct poorly without outside feedback; peer review catches a median ~60% of defects | Huang et al. 2024; Boehm & Basili 2001 |
| Very low reroll rate from these rules | **Unverified**, EianLu's experience | EianLu's post |
| AI video fails at crossing people, hands with small objects, text, mirrors, left/right | **Partly confirmed**: OpenAI lists physics, cause and effect, and left/right confusion; the rest are EianLu's list | Sora 2024 |
| Seedance prices (~¥1.5/s at 720p for 2.5; ~¥0.5/s for 2.0 mini) | **Unverified**: Volcengine pricing not opened | None |
| Heads at 38% or 62% of frame width | **Disputed** as a general rule: viewers prefer a single front-facing subject centred; for subjects facing sideways, facing into the frame matters more | Palmer et al. 2008 |
| Check palette in greyscale for contrast | **Unverified**: painters' value-study practice; no source opened | None |

### Generate AI shots without rerolls (`ai-video-shots.md`)

| Claim | Verdict | Source |
| --- | --- | --- |
| Generating between drawn first and last frames prevents most errors | **Supported in mechanism**: Seedance's docs say to use first-and-last-frame mode when frames must strictly match; "most errors" is EianLu's claim | Seedance docs |
| Both frames must be the same size | **Confirmed in effect**: a mismatched last frame is auto-cropped to the first frame's ratio | Seedance docs |
| Models often ignore negatives; phrase fixes positively | **Confirmed**: Google's Veo guide says not to write "no" or "don't" | Veo prompt guide |
| Give direction in screen terms | **Supported**: models confuse left and right in prompts | Sora 2024 |
| Seedance 2.5 adds music despite "no music" | **Confirmed in mechanism**: audio generation defaults to on and includes music; set `generate_audio` to `false` | Seedance docs |
| Seedance 2.5 costs about 3x 2.0 mini | **Unverified** (prices not opened) | None |
| Generate at 720p and upscale | **Consistent** with docs: 2.0 mini supports only 480p and 720p | Seedance docs |
| BT.601 decode, BT.709 tag | **Unverified**, EianLu's practice | None |

## Not verified

- Pixar in a Box (Khan Academy) on storyboards and story reels was considered for the AI video lessons; the pages didn't load, so it's not used.
- Volcengine (Chinese) pricing pages for Seedance were not opened; all prices stay labelled as the author's.
- The Disney animation principles (*The Illusion of Life*, Thomas & Johnston, 1981) were not opened; the easing claim rests on NN/g instead.
