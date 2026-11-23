# Stay sharp: literature notes

Research behind `content/stay-sharp/`, with an independent audit in November 2026. Every source below was opened and read; where only an abstract or summary was readable, the note says so.

Verdicts in the claim checks: **supported** (the source says this), **overstated** (the source says something narrower), **misattributed**, **disputed**, **unsupported**, **one person's claim** (labelled as such in the lesson).

## keep-your-judgment.md: Use AI without surrendering your judgment

### Principles and sources

**People adopt AI answers without checking, and feel more sure while doing it.**

- Steven D. Shaw and Gideon Nave (Wharton), [*Thinking—Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender*](https://ssrn.com/abstract=6097646) (working paper, January 2026). SSRN blocks scripts; the abstract was read from the [PsyArXiv preprint record](https://doi.org/10.31234/osf.io/yk25n_v1). Three preregistered experiments (N = 1,372; 9,593 trials) on an adapted Cognitive Reflection Test with AI accuracy secretly randomised. People consulted the AI on most trials. Accuracy rose 25 points when the AI was right and fell 15 points when it was wrong (Study 1). Using the AI raised confidence "even following errors". Time pressure, incentives and feedback didn't remove the pattern. Cognitive surrender is "adopting AI outputs with minimal scrutiny, overriding intuition (System 1) and deliberation (System 2)".
- Lee et al. (Microsoft Research), [*The Impact of Generative AI on Critical Thinking*](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/) (CHI 2025). Survey of 319 knowledge workers, 936 examples: "higher confidence in GenAI is associated with less critical thinking," while higher self-confidence goes with more. Self-reported and correlational.

**AI quality is uneven in ways you can't see from the output.**

- Dell'Acqua et al., [*Navigating the Jagged Technological Frontier*](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf) (HBS Working Paper 24-013, 2023). 758 BCG consultants. On 18 tasks inside AI's frontier, consultants with GPT-4 finished 12.2% more tasks, 25.1% faster, at more than 40% higher quality. On one task outside the frontier, they were 19 percentage points less likely to be correct. Tasks "seemingly similar in difficulty level" fall on either side.

**Checking skills fade while you only watch.**

- Lisanne Bainbridge, [*Ironies of Automation*](https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf), *Automatica* 19(6), 1983. Automation leaves people the monitoring and take-over jobs, but skills deteriorate when not used. Today's monitors are "riding on their skills, which later generations of operators cannot be expected to have."

### Claim check

| Claim in the lesson | Verdict | Source |
| --- | --- | --- |
| Shaw and Nave: 1,372 people, AI secretly wrong on some puzzles, used on most, +25/−15 points, confidence up even after errors, incentives didn't remove it | **supported** | Shaw and Nave 2026 abstract |
| Microsoft survey of 319 workers: more trust in AI, less checking | **supported** | Lee et al. 2025 |
| Harvard and BCG, 758 consultants: over 40% better inside the frontier, 19 points less likely to be right outside; both looked equally hard | **supported** | Dell'Acqua et al. 2023 |
| Addy Osmani works on Claude Code at Anthropic; the hotel example; where he draws the line | **supported** | His X bio and post |
| AI answers overrode gut feeling and careful reasoning | **supported** | Shaw and Nave: the definition their experiments test |
| "I only merge after I pass the quiz perfectly" | **supported** as a quote Osmani relays | Osmani's post |
| The orchestration tax | **supported** as Osmani's term | Osmani's post |
| One person can follow 3 to 5 agent sessions | **one person's claim** (labelled) | DeepSeek Harness post |

## skills-that-last.md: Pick skills AI makes more valuable

### Principles and sources

**AI raises the value of expert judgment and lowers the value of work anyone can now do.**

- PwC, *2026 Global AI Jobs Barometer*, [press release](https://www.prnewswire.com/news-releases/ai-reshapes-global-labour-market-into-two-distinct-paths-rewarding-human-skills-pwc-2026-global-ai-jobs-barometer-302798987.html) (pwc.com blocks scripts). More than a billion job ads in 27 countries and territories. Average AI-skills wage premium 62%, up from 57%. Jobs needing specific AI skills grew 69%, about eight times the 9% of all jobs. "Professionalised" roles, where AI frees experts for judgement, show "twice the growth in available jobs and 42% faster salary growth" than "democratised" roles.
- Noy and Zhang, [*Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence*](https://economics.mit.edu/sites/default/files/inline-files/Noy_Zhang_1_0.pdf) (working paper; published in *Science*, 2023). 444 professionals; ChatGPT "restructures tasks towards idea-generation and editing and away from rough-drafting". [MIT News](https://news.mit.edu/2023/study-finds-chatgpt-boosts-worker-productivity-writing-0714) reports the *Science* version: 453 professionals, 40% less time, 18% higher quality. MIT News does not mention the shift from drafting to editing.
- Brynjolfsson, Chandar and Chen (Stanford Digital Economy Lab), [*Canaries in the Coal Mine*](https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/), revised August 2026 ([paper PDF](https://digitaleconomy.stanford.edu/wp-content/uploads/2025/08/Canaries_BrynjolfssonChandarChen.pdf)). Workers aged 22 to 25 in AI-exposed jobs are 19% below where they'd be had they kept pace with less-exposed peers. "Earlier versions of this study headlined regression estimates adjusting for firm-level shocks (a 13% relative decline as of July 2025 data; 16% as of September 2025 data)." On the descriptive measure the paper now uses, "the kept-pace shortfall was 15% at the July 2025 data vintage and has since widened to 19%". Declines cluster where AI substitutes for tasks; where it complements workers, employment is "flat or rising". Descriptive, not causal.
- Lightcast, [*Beyond the Buzz*](https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23) (23 July 2025): "As of 2024, 51% of job postings requiring AI skills are outside IT and computer science occupations."

**Unused skills decay, cognitive ones fastest.**

- Arthur, Bennett, Stanush and McNelly, [*Factors That Influence Skill Decay and Retention*](https://gwern.net/doc/psychology/spaced-repetition/1998-arthur.pdf), *Human Performance* 11(1), 1998. 189 data points from 53 articles: skill loss from d = −0.01 right after training to d = −1.4 after more than 365 days of non-use. "Physical, natural, and speed-based tasks were less susceptible to skill loss than cognitive, artificial, and accuracy-based tasks."
- Anthropic, [*How AI is transforming work at Anthropic*](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) (December 2025): the "paradox of supervision": "supervising Claude requires the very coding skills that may atrophy from AI overuse."
- Bainbridge 1983 (above): the same paradox for industrial automation.

### Claim check

| Claim in the lesson | Verdict | Source |
| --- | --- | --- |
| PwC: over a billion job ads; professionalised roles grew jobs twice as fast and pay 42% faster | **supported** | PwC 2026 |
| PwC: AI-skill jobs advertise 62% more pay and grew 69% against 9% | **supported** | PwC 2026 |
| MIT: writing 40% faster and 18% better | **supported** | MIT News 2023 |
| MIT: "Their work shifted from drafting to editing", linked to MIT News | **misattributed**: MIT News doesn't say it; the working paper does. Fixed: cited to Noy and Zhang | Noy and Zhang 2023 |
| Stanford: 22 to 25 year olds 19% below the kept-pace line; a growth comparison | **supported** | Canaries, August 2026 |
| "The post quotes 13% from the first 2025 version; the gap has widened since" | **overstated**: 13% was a regression estimate; the measure behind 19% stood at 15% in July 2025. Fixed: says both | Canaries paper, August 2026 |
| Declines where AI replaces tasks; employment held up where it assists | **supported** | Canaries 2026 |
| Lightcast: 51% of AI-skill job ads outside IT and computer science | **supported** | Lightcast 2025 |
| Gandhi built marketing at a data and AI startup to its acquisition; six basics | **supported** as his account | Gandhi's posts |
| Gandhi's months of reading; the Uniswap marketer's view of the market | **one person's claim** | Gandhi's post quoting @saintniko |
| 53 studies: large losses after a year; thinking skills fade faster | **supported** | Arthur et al. 1998 |
| Bainbridge: someone who only watches stops being an expert | **supported** | Bainbridge 1983 |
| Paradox of supervision quote | **supported** | Anthropic 2025 |
| Osmani's weekly calibration routine | **one person's claim** | Osmani's post |

## learn-in-30-days.md: Learn a new skill in 30 days

### Principles and sources

- Ericsson, Krampe and Tesch-Römer, [*The Role of Deliberate Practice in the Acquisition of Expert Performance*](https://gwern.net/doc/psychology/writing/1993-ericsson.pdf), *Psychological Review* 100(3), 1993. Conditions for practice to improve performance: a well-defined task, "immediate informative feedback and knowledge of results", and repeating "the same or similar tasks".
- Lally et al., *How are habits formed* (*European Journal of Social Psychology*, 2010), via the [BPS Research Digest summary](https://www.bps.org.uk/research-digest/how-form-habit). Average time to peak automaticity 66 days, from 18 to a predicted 254. "A single missed day had little impact."
- Eloundou, Manning, Mishkin and Rock, [*GPTs are GPTs*](https://arxiv.org/abs/2303.10130) (2023), abstract: task-level exposure varies widely by occupation. Not cited in the lesson.

### Claim check

| Claim in the lesson | Verdict | Source |
| --- | --- | --- |
| Skill grows through deliberate practice: a stretching task, quick feedback, repeats | **supported** | Ericsson et al. 1993 |
| Two complementary skills beat one; the five skills and pairings | **one person's claim** | @notkvtwts |
| 66 days on average to automatic, some far longer; a missed day barely matters | **supported** | Lally et al. 2010 via BPS |
| AI does roughly 80% of a task; 50 ads, pick 3 | **one person's claim** (labelled as a rough guess) | @notkvtwts |
| "In the MIT writing study, ChatGPT shifted people's time from drafting to editing", linked to MIT News | **misattributed**: the finding is in the paper, not the news story. Fixed: linked to Noy and Zhang | Noy and Zhang 2023 |
| AI made consultants better on some tasks, worse on one that looked as hard | **supported** | Dell'Acqua et al. 2023 |

## make-it-pay.md: Turn the skill into income

### Principles and sources

- Noy and Zhang 2023 (above): AI shifts writing work to idea generation and editing.
- PwC 2026 (above): pay grows slower where AI lets non-experts do the work.

### Claim check

| Claim in the lesson | Verdict | Source |
| --- | --- | --- |
| Koe: founders post "announcement" content; two versions of the creative-team offer | **one person's claim** | Koe's article |
| Agencies say the job is reviewing drafts, 4 hours a day instead of 12 | **one person's claim** (Koe paraphrasing agencies) | Koe's article |
| MIT experiment, 444 professionals: time moved from drafting to ideas and editing, work finished faster | **supported** | Noy and Zhang 2023 |
| $10k to $75k a month for 1 to 3 clients; Koe sells Eden | **one person's claim**; the Eden link is in his article | Koe's article |
| Resell an agent you run | **one person's claim** (an illustration, labelled) | @notkvtwts |
| SDR search, $10k+ offers, $500 test, 1 call per 100 DMs, $2,500 a month | **one person's claim** (labelled; he sells the service) | @DinScales26 |
| $5,000 audit: 5 hours by hand, now 30 minutes of AI and 30 of checking | **one person's claim** (labelled) | @huntkyle |
| PwC: pay rose 42% faster where AI frees experts | **supported** | PwC 2026 |

## reading-list.md: Read the classics next

### Books, each checked against a publisher, author or catalogue page

- Byron Sharp, *How Brands Grow* (Oxford University Press, 2010), on the [Ehrenberg-Bass books page](https://marketingscience.info/learn-with-us/books#how-brands-grow). The old `marketingscience.info/how-brands-grow` address now redirects to the Institute's home page. What it teaches: How B2B Brands Grow (2023) summarises it as growth through new customers and reaching category buyers.
- Les Binet and Peter Field, *The Long and the Short of It* (IPA, 2013). The [IPA presentation](https://ipa.co.uk/media/5811/long_and_short_of_it_presentation_final.pdf): meta-analysis of 996 campaigns; "The 60:40 rule", with the number of very large effects peaking at about 40% activation share of budget.
- April Dunford, *Obviously Awesome* (2019). [Author's page](https://www.aprildunford.com/obviously-awesome): "How to break positioning down into five component pieces."
- Rob Fitzpatrick, *The Mom Test* (2013). [Book site](https://www.momtestbook.com/): "How to talk to customers & learn if your business is a good idea when everyone is lying to you."
- Gabriel Weinberg and Justin Mares, *Traction* (2014). [Open Library](https://openlibrary.org/works/OL20015670W). Weinberg's [Bullseye essay](https://medium.com/@yegg/the-bullseye-framework-for-getting-traction-ef49d05bfd7e): run "cheap traction tests" in the most promising channels, then focus on the one that works.
- Eugene Schwartz, *Breakthrough Advertising* (1966). [Book site](https://breakthroughadvertisingbook.com/): he saw his job as "channeling and directing the mass desire in the market toward his product"; segment the market by "state of awareness and sophistication level".
- Al Ries and Jack Trout, *Positioning: The Battle for Your Mind* (McGraw-Hill, 1981). [Open Library](https://openlibrary.org/works/OL1892673W) (refuses connections from this network; it answered a reader proxy with its verification page). [Graham Mann's book notes](https://grahammann.net/book-notes/positioning-al-ries-jack-trout): "Positioning is what you do to the mind of the prospect, not what you do to the product."
- Bob Moesta with Greg Engle, *Demand-Side Sales 101* (2020). [Book site](https://demandsidesales.com/): "Stop Selling and Help Your Customers Make Progress".

### Claim check

| Claim in the lesson | Verdict | Source |
| --- | --- | --- |
| Gandhi kept 20 essays from years of bookmarks, some 10 years old, and returns to them | **supported** | Gandhi's post |
| Each book's one-line summary | **supported** | Pages above |
| Across 996 campaigns, the best results came at about 60% brand, 40% activation | **supported** | IPA presentation |
| GACC = Goal, Audience, Creative, Channel | **supported** | MKT1: "Goals. Audience. Creative. Channels." |
| Balfour: process first, tactics second | **supported** | Balfour's essay |
| Every link opens the document it names | **unsupported** for three links. Fixed: *How Brands Grow* pointed at a redirect to the Institute's home page (now the books page); Dave Bailey's essay is now titled "Why Founders Market Their Products Too Late"; the HubSpot page is now about SMART goal dos and don'ts | Link check, November 2026 |

Medium, Fast Company and SSRN return 403 to scripts. Each Medium essay was opened through a reader proxy or confirmed in the Wayback Machine.
