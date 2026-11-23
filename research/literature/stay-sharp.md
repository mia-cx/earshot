# Stay sharp: literature notes

Research behind `content/stay-sharp/`. Every source below was opened and read; where only an abstract or summary was readable, the note says so. Claims are marked **confirmed**, **disputed** or **unverified**.

## keep-your-judgment.md: Use AI without surrendering your judgment

### Principles and sources

**People adopt AI answers without checking, and feel more sure while doing it.**

- Steven D. Shaw and Gideon Nave (Wharton), [*Thinking—Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender*](https://ssrn.com/abstract=6097646) (working paper, January 2026). Abstract read from the full PDF. Three preregistered experiments (N = 1,372; 9,593 trials) on an adapted Cognitive Reflection Test with AI accuracy secretly randomised. People consulted the AI on most trials. Accuracy rose 25 points when the AI was right and fell 15 points when it was wrong (Study 1). Using the AI raised confidence even after errors. Incentives, feedback and time pressure didn't remove the pattern. Higher trust in AI, lower need for cognition and lower fluid intelligence predicted more surrender.
- Lee et al. (Microsoft Research), [*The Impact of Generative AI on Critical Thinking*](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/) (CHI 2025). Page read. Survey of 319 knowledge workers, 936 examples: "higher confidence in GenAI is associated with less critical thinking," while higher self-confidence goes with more. Self-reported and correlational.

**AI quality is uneven in ways you can't see from the output.**

- Dell'Acqua et al., [*Navigating the Jagged Technological Frontier*](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf) (HBS Working Paper 24-013, 2023). Abstract read. 758 BCG consultants. On 18 tasks inside AI's frontier, consultants with GPT-4 finished 12.2% more tasks, 25.1% faster, at more than 40% higher quality. On one task outside the frontier, they were 19 percentage points less likely to be correct than consultants without AI.

**Checking skills fade while you only watch.**

- Lisanne Bainbridge, [*Ironies of Automation*](https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf), *Automatica* 19(6), 1983. Read. Automation leaves people the monitoring and take-over jobs, but "physical skills deteriorate when they are not used," so "a formerly experienced operator who has been monitoring an automated process may now be an inexperienced one." Today's monitors are "riding on their skills, which later generations of operators cannot be expected to have."

**Premortem.**

- Gary Klein, HBR, [*Performing a Project Premortem*](https://hbr.org/2007/09/performing-a-project-premortem) (2007), opening read. Imagine the project has already failed and list the plausible reasons. The prospective-hindsight figure often quoted with it was behind the paywall; **not verified**, not used.

### Claim check

| Claim in the lesson | Status | Source |
| --- | --- | --- |
| "Cognitive surrender" is Shaw and Nave's term | **confirmed** | Shaw and Nave 2026. |
| You don't choose to slide; you skim more each time | **consistent** | Shaw and Nave: confidence rises with AI use even after errors; Lee et al.: trust in AI predicts less checking. |
| The test is whether you can explain it | **practitioner rule** | Osmani's; no study tests this exact rule. |
| Addy Osmani works on Claude Code at Anthropic | **confirmed** | His X bio in the scraped post (`research/sources/2117512471930167377.md`). |
| Once you've read a polished answer, it's hard to picture another | **consistent** | Shaw and Nave: AI answers override people's own intuition and deliberation. |
| A test you can run beats the model's confidence | **consistent** | Shaw and Nave: confidence rose even when the AI was wrong. |
| "I only merge after I pass the quiz perfectly" | **unverified** | Quote relayed by Osmani. |
| One person can follow 3 to 5 agent sessions (DeepSeek Harness) | **unverified** | Their observation; labelled in the lesson. |

## skills-that-last.md: Pick skills AI makes more valuable

### Principles and sources

**AI raises the value of expert judgment and lowers the value of work anyone can now do.**

- PwC, *2026 Global AI Jobs Barometer* (15 June 2026), [press release](https://www.prnewswire.com/news-releases/ai-reshapes-global-labour-market-into-two-distinct-paths-rewarding-human-skills-pwc-2026-global-ai-jobs-barometer-302798987.html) read (pwc.com blocked fetches). More than a billion job ads in 27 countries and territories. Average AI-skills wage premium 62%, up from 57%. Jobs needing specific AI skills grew 69%, about eight times the 9% of all jobs. "Professionalised" roles, where AI frees experts for judgement, show twice the job growth and 42% faster salary growth than "democratised" roles, where AI lets non-experts do the work.
- Noy and Zhang, *Experimental evidence on the productivity effects of generative AI* ([working paper](https://economics.mit.edu/sites/default/files/inline-files/Noy_Zhang_1_0.pdf), read; published in *Science*, 2023, per [MIT News](https://news.mit.edu/2023/study-finds-chatgpt-boosts-worker-productivity-writing-0714), read). 444 to 453 professionals on writing tasks: 40% less time, 18% higher quality. ChatGPT moved work "towards idea-generation and editing and away from rough-drafting."
- Brynjolfsson, Chandar and Chen (Stanford Digital Economy Lab), [*Canaries in the Coal Mine*](https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/), revised August 2026. Page read. Workers aged 22 to 25 in AI-exposed jobs are now 19% below where they'd be had they kept pace with less-exposed peers; the gap "has widened steadily since we first documented it in August 2025." Declines cluster where AI substitutes for tasks; where it complements workers, employment is flat or rising. Descriptive, not causal.
- Lightcast, [*Beyond the Buzz*](https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23) (23 July 2025). Read. 1.3 billion postings: 51% of postings asking for AI skills are outside IT and computer science; they advertise 28% higher salaries.

**Unused skills decay, cognitive ones fastest.**

- Arthur, Bennett, Stanush and McNelly, [*Factors That Influence Skill Decay and Retention*](https://gwern.net/doc/psychology/spaced-repetition/1998-arthur.pdf), *Human Performance* 11(1), 1998. Abstract read. Meta-analysis of 189 data points from 53 articles: substantial loss with non-use, from d = -0.01 right after training to d = -1.4 after more than a year. Cognitive and accuracy-based tasks decayed more than physical and speed-based ones.
- Anthropic, [*How AI is transforming work at Anthropic*](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) (2 December 2025). Read. Survey of 132 engineers and researchers, 53 interviews, 200,000 Claude Code transcripts. Names the paradox of supervision: "supervising Claude requires the very coding skills that may atrophy from AI overuse." Some staff skip AI on purpose to stay sharp.
- Bainbridge 1983 (above): the same paradox, forty years earlier, for industrial automation.

### Claim check

| Claim in the lesson | Status | Source |
| --- | --- | --- |
| PwC: AI-skill jobs pay 62% more | **confirmed** | PwC 2026 barometer. Lesson had "over a billion job ads"; confirmed. |
| PwC: AI-skill jobs grew 69% against 9% for all jobs | **confirmed** | PwC 2026 barometer. |
| MIT: writing 40% faster and 18% better | **confirmed** | Noy and Zhang 2023, via MIT News. |
| Stanford 2025: 22 to 25 year olds in AI-doable jobs down 13% relative | **superseded** | The 13% is the first 2025 version (not opened). The August 2026 revision says 19%. Lesson updated. |
| Lightcast: over half of AI-skill job ads are outside tech | **confirmed** | 51% outside IT and computer science. |
| Skills you stop using fade faster than you expect | **confirmed** | Arthur et al. 1998. |
| Paradox of supervision quote | **confirmed** | Anthropic 2025. |
| Gandhi's six marketing skills; Uniswap marketer profile | **unverified** | Practitioner views, labelled. |

## learn-in-30-days.md: Learn a new skill in 30 days

### Principles and sources

**Skill grows from practice on a defined task with fast feedback.**

- Ericsson, Krampe and Tesch-Römer, [*The Role of Deliberate Practice in the Acquisition of Expert Performance*](https://gwern.net/doc/psychology/writing/1993-ericsson.pdf), *Psychological Review* 100(3), 1993. Abstract and method section read. Performance tracks accumulated deliberate practice. Its conditions: a task designed to improve performance, "immediate informative feedback and knowledge of results," and repeating the same or similar tasks.

**Routines take longer than 30 days to stick.**

- Lally, van Jaarsveld, Potts and Wardle, *How are habits formed* (*European Journal of Social Psychology*, 2010), via the [BPS Research Digest summary](https://www.bps.org.uk/research-digest/how-form-habit). Read. 96 people repeated one daily behaviour for 84 days; reaching peak automaticity took 66 days on average, ranging from 18 to a projected 254. Missing one day barely mattered.

**Audit by task, not by job.**

- Eloundou, Manning, Mishkin and Rock, [*GPTs are GPTs*](https://arxiv.org/abs/2303.10130) (2023). Abstract read. Scores occupations task by task: about 80% of US workers have at least 10% of tasks exposed, about 19% have half or more. With an LLM alone ~15% of tasks get much faster at equal quality; with tooling on top, 47 to 56%.
- Dell'Acqua et al. 2023 (above): which tasks fall inside AI's frontier isn't obvious, so test each one.

### Claim check

| Claim in the lesson | Status | Source |
| --- | --- | --- |
| Two complementary skills beat one | **unverified** | @notkvtwts's framing. |
| AI does roughly 80% of a task; the paid part is the last 20% | **unverified, direction consistent** | Noy and Zhang: work shifts to editing. Dell'Acqua: the share varies sharply by task. Lesson labels the 80/20 as a rough split. |
| Judge at 3 months, not 30 days | **consistent** | Lally et al.: routines take about 66 days on average. |
| The AI prompt may name courses that don't exist | **consistent** | Shaw and Nave show people accept wrong AI output; lesson already warns. |
| "Used to take 4 hours, now 1" | example, not a claim | |

## make-it-pay.md: Turn the skill into income

### Principles and sources

- Noy and Zhang 2023 (above): AI shifts the human part of writing work to idea generation and editing. Supports the agencies' report that the job moved to reviewing drafts.
- PwC 2026 (above): where AI lets non-experts do the work ("democratised" roles), pay grows slower. Supports the Watch out that a price held only by effort won't survive once clients can get the result cheaply elsewhere.
- Kaplan 2005 (keep-users notes): customers shouldn't pay for your inefficiencies, but price each option to at least cover its cost. Used for pricing by result, not by hour.

### Claim check

| Claim in the lesson | Status | Source |
| --- | --- | --- |
| Agencies say review and rewrite now takes 4 hours a day, not 12 | **unverified, direction consistent** | Dan Koe's report; Noy and Zhang confirm the shift to editing. |
| $10k to $75k a month across 1 to 3 clients | **unverified** | Koe's claim; he sells a tool for this work. |
| 1 call per 100 DMs; $2,500 a month per client | **unverified** | @DinScales26's assumption. |
| $5,000 audit, 5 hours down to 1, same price | **unverified** | Hunt's self-reported example. |
| Keep the price when AI cuts the hours | **holds only while the result is scarce** | PwC 2026: AI that lets non-experts do the work slows pay growth. Watch out added. |

## reading-list.md: Read the classics next

### Books added, each checked against a publisher, author or catalogue page

- Byron Sharp, *How Brands Grow* (Oxford University Press, 2010). [Ehrenberg-Bass books page](http://marketingscience.info/how-brands-grow) lists it; publisher and year from Open Library. What it teaches confirmed via the Ehrenberg-Bass article above: brands grow mainly by reaching more buyers, light buyers included; loyalty follows size (Double Jeopardy).
- Les Binet and Peter Field, *The Long and the Short of It* (IPA, 2013). [IPA page](https://ipa.co.uk/knowledge/publications-reports/the-long-and-the-short-of-it-balancing-short-and-long-term-marketing-strategies) and the [IPA presentation](https://ipa.co.uk/media/5811/long_and_short_of_it_presentation_final.pdf), read: meta-analysis of 996 campaigns in the IPA Databank; the most very large effects came at roughly 60% brand building, 40% activation.
- April Dunford, *Obviously Awesome* (2019). [Author's page](https://www.aprildunford.com/obviously-awesome), read: a step-by-step positioning method that breaks positioning into five components.
- Rob Fitzpatrick, *The Mom Test* (2013). [Book site](https://www.momtestbook.com/), read: subtitle "How to talk to customers & learn if your business is a good idea when everyone is lying to you"; covers judging whether someone will actually buy. Year from retailer listings (September 2013).
- Gabriel Weinberg and Justin Mares, *Traction* (2014). [Open Library](https://openlibrary.org/works/OL20015670W). The book site refused connections and Weinberg's Bullseye essay (already in the list) blocks scripts, so the content comes from a [secondary summary](https://businessbookclub.substack.com/p/free-book-summary-traction-by-gabriel): 19 channels; brainstorm one idea per channel, test the top three cheaply, then focus on the one that works.
- Eugene Schwartz, *Breakthrough Advertising* (1966). [Book site](https://breakthroughadvertisingbook.com/), read: channel existing mass desire instead of creating demand; match the message to the market's awareness and sophistication.
- Al Ries and Jack Trout, *Positioning: The Battle for Your Mind* (McGraw-Hill, 1981). [Open Library](https://openlibrary.org/works/OL1892673W). The original text wasn't opened. [Graham Mann's book notes](https://grahammann.net/book-notes/positioning-al-ries-jack-trout) quote it: "You concentrate on the perceptions of the prospect. Not the reality of the product."
- Bob Moesta with Greg Engle, *Demand-Side Sales 101* (2020). [Book site](https://demandsidesales.com/), read: stop pushing and help buyers make the progress they're already trying to make; built on Jobs to be Done.

### Claim check

| Claim in the lesson | Status | Source |
| --- | --- | --- |
| Twenty essays from a decade of bookmarks | **confirmed** | Gandhi's post. |
| Essays still hold up | **opinion** | Gandhi's. Link check: every essay URL responds (Medium and Fast Company return 403 to scripts but load in a browser). |
| GACC = Goal, Audience, Creative, Channel | **confirmed** | MKT1 link in the list. |
| Balfour: process first, tactics second | **confirmed** | Essay URL and title. |
