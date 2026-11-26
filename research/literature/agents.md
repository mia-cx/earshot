# Literature: AI agents as your team (`content/agents/`)

Question: what do primary sources say about the principles the agents lessons rest on, and which of the posts' claims hold up?

Written for a fresh agent. Every source below was opened and read on 2026-11-23 unless marked "not verified".

The claim tables carry the verdicts of an independent audit (2026-11-23) by a reader who did not write the lessons and re-opened every source: **supported**, **overstated**, **misattributed**, **disputed**, **unsupported**, or **one person's claim** (a practitioner's number, labelled as such in the lesson, which DIRECTION keeps in). Where the lesson changed, the table says how.

## Sources read

Shared across lessons. Each line paraphrases what the source says.

### Agent design

- **Anthropic: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)** (Dec 2024). Workflows run LLMs and tools "through predefined code paths"; agents "dynamically direct their own processes and tool usage". Find "the simplest solution possible" and add complexity only when it "demonstrably improves outcomes", which may mean not building an agent at all. Agents should get "ground truth" from the environment at each step, have stopping conditions such as a maximum number of iterations, and be tested in sandboxes with guardrails. Autonomy brings "higher costs, and the potential for compounding errors". Patterns: prompt chaining, routing, parallelisation, orchestrator-workers, evaluator-optimizer.
- **OpenAI: [A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)** (2025). Build an agent where rules-based automation falls short: complex decision-making, difficult-to-maintain rules, heavy reliance on unstructured data. "Otherwise, a deterministic solution may suffice." Use existing operating procedures, support scripts or policy documents to write instructions. Customers "achieve greater success with an incremental approach"; "maximize a single agent's capabilities first". Prototype with the most capable model to set an eval baseline, then try smaller models. Rate each tool low, medium or high risk by read-only vs write, reversibility, permissions and financial impact. Two triggers for human intervention: exceeding failure thresholds (limits on retries or actions) and high-risk actions (sensitive, irreversible, high stakes), "until confidence in the agent's reliability grows".
- **Anthropic (Rajasekaran, Dixon, Ryan, Hadfield): [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)** (Sep 2025). Context is "a finite resource with diminishing marginal returns"; recall falls as tokens are added ("context rot"), a gradient rather than a cliff. Aim for the "smallest possible set of high-signal tokens". System prompts sit between brittle hardcoded logic and vague guidance. Use examples, but "curate a set of diverse, canonical examples" instead of a laundry list of edge cases. Keep "lightweight identifiers (file paths, stored queries, web links, etc.)" and load data just in time. Long jobs: compaction, structured note-taking outside the context window, sub-agents that return a condensed summary (often 1,000 to 2,000 tokens).
- **Anthropic (Hadfield, Zhang, Lien, Scholz, Fox, Ford): [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)** (Jun 2025). Orchestrator-worker: a lead agent plans and spawns subagents. Opus 4 lead with Sonnet 4 subagents "outperformed single-agent Claude Opus 4 by 90.2%" on their internal research eval. Agents use about 4x the tokens of chat, multi-agent systems about 15x. Poor fit when agents must share the same context or have many dependencies; "LLM agents are not yet great at coordinating and delegating to other agents in real time". "Each subagent needs an objective, an output format, guidance on the tools and sources to use, and clear task boundaries"; without that, agents "duplicate work, leave gaps". Subagents store work in external systems and pass "lightweight references" back, which "prevents information loss". Eval: start with about 20 real queries; early prompt changes moved success from 30% to 80%; human testers find edge cases evals miss. "Agents are stateful and errors compound"; they built resume-from-failure with retries and checkpoints.
- **Walden Yan (Cognition): [Don't build multi-agents](https://cognition.com/blog/dont-build-multi-agents)** (Jun 2025). Two principles: share full context and traces, not just messages; "actions carry implicit decisions, and conflicting decisions carry bad results". In his Flappy Bird example, parallel subagents build a background and a bird in clashing styles because neither sees the other's choices. Recommends a single-threaded agent, plus a compression model for very long jobs.
- **Anthropic (Martin, Cemaj, Cohen): [Scaling Managed Agents: decoupling the brain from the hands](https://www.anthropic.com/research/managed-agents)** (Apr 2026). The session is a durable append-only log outside the model and sandbox; the harness is stateless and restarts from the log with `wake(sessionId)`; tools are reached through one `execute(name, input)` interface; credentials stay in a vault behind a proxy, out of reach of generated code.
- **Lingjiao Chen, Matei Zaharia, James Zou: [FrugalGPT](https://arxiv.org/abs/2305.05176)** (2023). A learned cascade of models "can match the performance of the best individual LLM (e.g. GPT-4) with up to 98% cost reduction".
- **Nelson F. Liu et al.: [Lost in the middle: how language models use long contexts](https://arxiv.org/abs/2307.03172)** (TACL, 2023). Performance is highest when relevant information is at the start or end of the input and "significantly degrades" when it sits in the middle, even for long-context models.

### Working with AI, and checking it

- **Fabrizio Dell'Acqua, Edward McFowland III, Ethan Mollick, Hila Lifshitz, Katherine C. Kellogg, Saran Rajendran, Lisa Krayer, François Candelon, Karim R. Lakhani: [Navigating the jagged technological frontier](https://doi.org/10.1287/orsc.2025.21838)** (Organization Science, 2026; SSRN working paper 2023). Pre-registered experiment with 758 BCG consultants. On 18 tasks inside the frontier of AI capability, AI users completed 12.2% more tasks, 25.1% faster, with significantly higher quality. On a task chosen to be outside the frontier, AI users were 19% less likely to reach the correct answer. The frontier is "jagged": similar-looking tasks fall on different sides. (Read from the published abstract; the publisher returns 403 to scripts, so the audit re-read it through Crossref. The 2023 working paper states the outside-frontier result as 19 percentage points; the published abstract says 19%.)
- **Ethan Mollick: [On-boarding your AI intern](https://www.oneusefulthing.org/p/on-boarding-your-ai-intern)** (May 2023). Treat AI as a fast, strange intern that "sometimes lie[s] to make you happy". "Giving the AI context and constraints makes a big difference." Point out errors as you would to a person. For delegated tasks, "expect to review and offer oversight". His book *Co-Intelligence* (2024) expands this: not verified, not cited in lessons.
- **Adam Tauman Kalai, Ofir Nachum, Santosh Vempala, Edwin Zhang: [Why language models hallucinate](https://arxiv.org/abs/2509.04664)** (OpenAI, 2025). Models guess when unsure because "training and evaluation procedures reward guessing over acknowledging uncertainty".
- **Jie Huang et al.: [Large language models cannot self-correct reasoning yet](https://arxiv.org/abs/2310.01798)** (ICLR 2024). "LLMs struggle to self-correct their responses without external feedback", and performance sometimes degrades after self-correction.
- **Arjun Panickssery, Samuel R. Bowman, Shi Feng: [LLM evaluators recognize and favor their own generations](https://arxiv.org/abs/2404.13076)** (2024). Models rate their own output above others' that humans judge equal, and the bias grows with their ability to recognise their own text.
- **Amos Tversky, Daniel Kahneman: [Belief in the law of small numbers](https://doi.org/10.1037/h0031322)** (Psychological Bulletin, 1971). "People have erroneous intuitions about the laws of chance": they expect small samples to mirror the population. Read from the abstract on the Semantic Scholar record; full text not opened.
- **Jerker Denrell: [Vicarious learning, undersampling of failure, and the myths of management](https://ora.ox.ac.uk/objects/uuid:a8102a34-f7a4-40de-91c0-139355f97358)** (Organization Science, 2003). Learning from the successes you can see "undersamples failure"; risky practices unrelated to performance across the whole population can look like they cause success among survivors.
- **Jessica S. Ancker et al.: [Effects of workload, work complexity, and repeated alerts on alert fatigue](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)** (BMC Medical Informatics and Decision Making, 2017). The likelihood of accepting a clinical reminder "dropped by 30% for each additional reminder received per encounter".
- **Raluca Budiu (NN/g): [Information scent](https://www.nngroup.com/articles/information-scent/)** (2020). An explainer, not a new study, built on information-foraging theory. Information scent is the user's estimate of what a link will deliver. A misleading title gets the click but will "use up your visitors' trust"; a landing page that doesn't give enough context soon enough makes users "simply leave".
- **Google Analytics Help: [Collect campaign data with custom URLs](https://support.google.com/analytics/answer/10917952)**. Always set `utm_source`, `utm_medium` and `utm_campaign`; missing parameters show as "(not set)"; values are case sensitive, so "Meta" and "meta" split reports.
- **Google Analytics Help: [Campaigns and traffic sources](https://support.google.com/analytics/answer/11242841)**. A new campaign value sent mid-session doesn't start a new session; it is "associated with the events for which [it was] collected" and used for event-based attribution, while the session keeps its original source.

### Security

- **Claude Code docs: [Configure permissions](https://code.claude.com/docs/en/permissions)** and **[Run Claude Code programmatically](https://code.claude.com/docs/en/headless)**. Read 2026-11-24. Ask rules "prompt for confirmation"; deny rules "prevent Claude Code from using the specified tool"; evaluated deny, then ask, then allow. With sandbox auto-allow, "sandboxed Bash commands run without prompting", even with a bare Bash ask rule. "Bash permission patterns that try to constrain command arguments are fragile." In a Manual-mode `claude -p` run, "a call that needs approval is denied unless something approves it".
- **Temporal docs: [Activities](https://docs.temporal.io/activities)**. Read 2026-11-24. A failed activity attempt is retried; "Each attempt starts from the initial state, unless your code uses a Heartbeat detail payload for checkpointing." Temporal recommends idempotent activities "so retries can be processed without duplicate side effects".
- **OWASP: [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)**. Three root causes: excessive functionality, permissions and autonomy. Mitigations: minimise extensions and their functions, minimise permissions, act in the user's context, require human approval for high-impact actions such as publishing a post, and "complete mediation": enforce authorisation in downstream systems "rather than relying on an LLM to decide if an action is allowed". Rate limiting limits damage.
- **Kai Greshake et al.: [Not what you've signed up for](https://arxiv.org/abs/2302.12173)** (2023). Indirect prompt injection: attackers plant instructions in content the app will retrieve. LLM apps "blur the line between data and instructions"; injected prompts "can act as arbitrary code execution".
- **Simon Willison: [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)** (Jun 2025). Private data, untrusted content and the ability to communicate externally together let an attacker steal data. "We still don't know how to 100% reliably prevent this." A guardrail that catches 95% of attacks is "a failing grade". Avoid the combination.

### Rules for sending

- **X: [Developer guidelines](https://docs.x.com/developer-guidelines)**. Automated accounts must be labelled, say in the bio who runs them, and be tied to a human-managed account. Auto-replying to anyone who mentions a keyword is "unsolicited interaction". Reply to users "only if user engaged first. Max 1 reply per interaction." Auto-DMs to new followers are "unsolicited contact, even though they followed you". No bulk DMs, uninvited mentions or identical cross-posting. "Deploying AI-generated replies that break these rules is a violation, even if the content itself is helpful." (help.x.com's automation rules page returns 403 to scripts and has no Wayback snapshot; not verified directly.)
- **FTC: [CAN-SPAM Act compliance guide for business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)**. Accurate headers and subject lines, identify the message as an ad, a valid postal address, a clear opt-out honoured within 10 business days. "The law makes no exception for business-to-business email." "You can't contract away your legal responsibility." Penalties up to $53,088 per email. ftc.gov answers scripted requests with a 404; read through the Wayback Machine (snapshot 2026-11-17).
- **Cornell LII: [15 U.S. Code § 7704](https://www.law.cornell.edu/uscode/text/15/7704)**. Section (a)(5)(A) requires the ad identification, the opt-out notice and a postal address; (a)(5)(B) says the ad-identification requirement "does not apply ... if the recipient has given prior affirmative consent to receipt of the message". The FTC guide does not mention this exception.
- **ICO: [Electronic mail marketing (PECR)](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/)**. No marketing emails to individuals without specific consent, except soft opt-in for existing customers. You can email corporate bodies, but sole traders and some partnerships count as individuals. Never hide your identity; give a working opt-out. Guidance is under review after the Data (Use and Access) Act. GDPR for EU recipients: not verified, not cited.
- **TikTok: [About the Commercial Music Library](https://ads.tiktok.com/help/article/commercial-music-library?lang=en)**. "A pre-cleared global music library of 1 million songs". "Businesses cannot use the general music library for commercial usage", including organic posts, ads and branded content.

### Arithmetic used in lessons

- Chance that a bot with a given true failure rate shows at most 1 failure in 10 runs, or at most 2 in 20 (binomial, computed with Python): 10% failure rate: 74% and 68%; 20%: 38% and 21%; 30%: 15% and 4%. So the review ladder reliably stops frequent failure, not rare failure.

## Per lesson

### Run marketing as code (`marketing-as-code.md`)

Principles: start with the simplest system that works; a fixed-step automation is often enough, and agents earn their cost where judgement, messy text or hard-to-maintain rules are involved (Anthropic, OpenAI). Close the loop with results from the environment (Anthropic: ground truth at each step).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| An automation follows fixed steps; an agent gets a goal and works out the steps; find "the simplest solution possible" | **supported** | Anthropic, Building effective agents |
| Most weekly chores need "fixed steps with one AI step" | **overstated**: Anthropic's workflows call a model at every step that needs one (prompt chaining runs several calls in a row); a job with no such step is a plain script; an agent is for jobs where the model picks its own steps and tools. TLDR and body now say so; the Monday report still has one AI step because only its summary needs one | Anthropic, Building effective agents |
| Use an agent where the job needs judgement, messy rules or unstructured text; otherwise "a deterministic solution may suffice" | **supported** | OpenAI guide |
| About half a marketing team's hours go to building reports | **one person's claim** (@korzhov_dm: "pulling numbers into slides"), labelled | @korzhov_dm |
| Competitor-check schedule; Claude Code, Grok Bot, Hermes Agent; run 2 to 3 weeks | **one person's claim** (@notkvtwts) | @notkvtwts |
| Script Studio's steps (median-scored outliers, receipts, five hooks) | **one person's claim** (@mattepstein, internal tool) | @mattepstein |
| 1,000 on-brand ads for a couple hundred dollars; replaces six roles | **one person's claim**, and he sells Graphed; labelled | @codyschneider |
| Route results to yourself for approval first | **supported** as practice | OpenAI guide: human oversight for high-risk actions until confidence grows |
| DeepSeek's table: 4 designs, 5 runs each, p50/p95 times, tokens, "indicative only" | **supported** | @DeepSeekHarness |
| A benchmark is a credible marketing asset | **one person's claim** (@suraj_sharma14), and the lesson says nobody reports results | @suraj_sharma14 |

Change: added the principle that most weekly chores are a fixed workflow that calls AI only where a step needs it, and Anthropic's "simplest solution" rule; one CHECK answer now says which to reach for first.

### Give the bot your context (`context-first.md`)

Principles: output quality depends on context more than wording (Anthropic context engineering; Mollick); write instructions from your existing procedures (OpenAI); examples should be diverse and canonical (Anthropic); context is finite and degrades as it grows (Anthropic; Liu et al.).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Smallest set of high-signal information; "diverse, canonical examples" rather than a laundry list | **supported** | Anthropic context engineering |
| Write instructions from existing procedures | **supported** | OpenAI guide |
| "Giving the AI context and constraints makes a big difference" | **supported** (exact quote) | Mollick 2023 |
| Hunt: $382,428 year one at 87% margins, $7k to $8k a month on AI | **one person's claim**, labelled | @huntkyle |
| 3 finished examples, varied | **supported** as amended: the lesson asks for varied examples, per Anthropic's "diverse, canonical" | Anthropic context engineering |
| Audience, out of scope, definition of done; interview me; rewrite after two rounds | **one person's claim** (Osmani), attributed | @addyosmani |
| Agents given a vague task duplicated work and left gaps | **supported** | Anthropic multi-agent |
| Every correction becomes a new rule, so the brief gets better each week | **disputed** in part, and the lesson says so: the RISK callout tells readers to prune | Anthropic context engineering |
| Models recall less as context fills ("context rot"); facts in the middle are missed | **supported** | Anthropic context engineering; Liu et al. 2023 |
| Prune rules "the bot no longer breaks" | **unsupported**, and risky: a rule the bot follows may be why it follows it. Lesson now prunes duplicates and rules that no longer apply, and keeps rules the bot follows | Anthropic context engineering: "minimal does not necessarily mean short; you still need to give the agent sufficient information up front to ensure it adheres to the desired behavior" |
| Recordings cut a 10 to 14 day process to 5 days; only build a playbook if it saves 20 to 30 minutes | **one person's claim**, labelled | @huntkyle |
| Grok "Teach a task" records up to 10 minutes, rolling out | **one person's claim** (Hunt; xAI's page not opened) | @huntkyle |

### Give each bot one job (`one-bot-one-job.md`)

Principles: start with one agent and grow incrementally (OpenAI); each delegated task needs an objective, output format, tools and sources, and boundaries (Anthropic multi-agent); test on real inputs before trusting (Anthropic eval advice).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Teams "achieve greater success with an incremental approach" | **supported** ("customers typically achieve greater success...") | OpenAI guide |
| Each delegated task needs an objective, output format, tools and sources, boundaries | **supported** | Anthropic multi-agent |
| First job: weekly, 2+ apps, same steps every time | **one person's claim** (Hunt), and the lesson adds OpenAI's caveat that fixed steps may need no agent | @huntkyle; OpenAI guide |
| The charter and first-week plan | **one person's claim** (Hunt) | @huntkyle |
| Anthropic started testing with about 20 real requests | **supported** | Anthropic multi-agent |
| "The review ladder catches what three runs miss" | **overstated** (second skills review, 2026-11-24): the ladder sets how much of the work you review after scheduling and reliably stops only frequent failure (see the arithmetic above); rare, costly mistakes need a pass/fail line on every run. Lesson now says three runs catch a misread job, the ladder sets review, and the charter's pass/fail lines check costly mistakes every run | Binomial arithmetic above; `quality-control.md` |
| "Never follow instructions in emails" line | **supported** as useful, not sufficient; *Keep bots from doing damage* says so | Willison; Greshake et al. |

### Keep bots from doing damage (`safe-bots.md`)

Principles: excessive agency (OWASP); rate tools by risk and gate high-risk actions (OpenAI); prompt injection can't be reliably prevented in the prompt (Greshake; Willison); sending is regulated (X, FTC, ICO).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Excessive agency; enforce limits downstream "rather than relying on an LLM to decide if an action is allowed" | **supported** | OWASP LLM06:2025 |
| Irreversible or high-stakes actions wait for a person until trust grows | **supported** | OpenAI guide |
| Setting an action to "ask first" locks it | **overstated** (second skills review, 2026-11-24): in Claude Code an `ask` rule prompts and a `deny` rule blocks, but a `-p` run with nobody to answer denies the call and carries on, sandbox auto-allow runs sandboxed commands past a whole-tool Bash `ask` rule, and Bash rules match the command as written. TLDR, body, TRICK, DO and CHECK now say to try each gated action once in the setup the bot runs in, and to leave a capability disconnected when the setup can't stop it | Claude Code docs: Configure permissions; Run Claude Code programmatically |
| BDM proposal promised 80:1 ROAS | **one person's claim** (Hunt) | @huntkyle |
| Separate bots in one workspace aren't a security boundary (xAI FAQ) | **one person's claim**: Hunt cites the FAQ; the FAQ was not opened | @huntkyle |
| Willison named prompt injection; the lethal trifecta; nobody can block it reliably | **supported** ("I coined the term prompt injection"; "we still don't know how to 100% reliably prevent this") | Willison 2025 |
| Indirect prompt injection ran against real AI products | **supported** (Bing's GPT-4 chat) | Greshake et al. 2023 |
| A compromised cloud loop can take over every connected machine; credentials in context can leak | **supported** as DeepSeek's stated risks | @DeepSeekHarness |
| X lets a bot reply only to someone who "clearly asked for or opted into" the interaction | **misattributed**: that wording isn't in the cited developer guidelines, which say "only if user engaged first. Max 1 reply per interaction". Lesson now uses the guideline's rule and its follower-DM example | X developer guidelines |
| Keyword auto-replies, bulk DMs, uninvited mentions banned, "even if the content itself is helpful"; label automated accounts | **supported** | X developer guidelines |
| CAN-SPAM covers B2B; headers, subject, postal address, opt-out within 10 business days; can't contract away responsibility | **supported** | FTC guide |
| No ad label needed if the recipient opted in | **misattributed**: true, but the FTC guide doesn't say it; the statute does. Lesson now links 15 U.S.C. § 7704(a)(5)(B) | Cornell LII, 15 U.S.C. § 7704 |
| PECR: consent for individuals and sole traders; soft opt-in only for your own similar products and existing customers; companies need no consent; name yourself and give an opt-out | **supported**. The ICO notes this guidance is under review after the Data (Use and Access) Act | ICO PECR guide |
| The PECR rule covers email only, and only sole traders among businesses | **overstated** by omission: the same rule covers texts and social media DMs, and some partnerships count as individuals; LLPs and Scottish partnerships count as corporate; a named person's work address still falls under UK GDPR. Lesson now says so | ICO: Electronic mail marketing; ICO: Business-to-business marketing |
| Halt any loop projected past $0.50; frontier → mid → local → cache | **one person's claim**, labelled; FrugalGPT supports cascading in principle | @suraj_sharma14; FrugalGPT |
| Four-role setup and prompt | **one person's claim** | @EianLu |

### Check the work before it ships (`quality-control.md`)

Principles: AI quality is uneven in ways you can't see in advance (Dell'Acqua et al.); models guess rather than admit uncertainty (Kalai et al.); self-review without outside feedback rarely fixes reasoning (Huang et al.); models favour their own output (Panickssery et al.); small samples mislead (Tversky and Kahneman).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| 758 BCG consultants; 25.1% faster with better work inside the frontier; 19% less likely to be right outside it | **supported** | Dell'Acqua et al. 2026, abstract via Crossref |
| Models guess because training rewards guessing | **supported** | Kalai et al. 2025 |
| Hunt: 50%+ revision rates, 80% from bad briefing; agency at 70%, one editor 115%, 40% and 30% causes | **one person's claim**, labelled | @huntkyle |
| Self-review without outside feedback rarely fixes reasoning, sometimes worsens it | **supported** | Huang et al. 2024 |
| "Did I miss anything?" surfaces two or three more items | **one person's claim** (Osmani), attributed | @addyosmani |
| "If you can't say what the checks would miss, ask for a real review" | **one person's claim**: Osmani quoting the Claude Code team's write-up, which was not opened | @addyosmani |
| 13% cup mismatch, hat brim, left/right reversals caught by a reviewer | **one person's claim** (EianLu, in Chinese) | @EianLu |
| Models rate their own writing above equally good writing | **supported** | Panickssery et al. 2024 |
| AI error rate 1 to 5% | **one person's claim** (Hunt's estimate), labelled | @huntkyle |
| Ladder: 9 of 10, then 18 of 20 | **one person's claim**, labelled "not a tested reliability measure" | @huntkyle |
| A bot that fails 1 run in 5 still scores 9 of 10 about 38% of the time | **supported** (binomial: 0.8¹⁰ + 10 × 0.2 × 0.8⁹ = 0.376) | Arithmetic above |
| People trust small samples too much | **supported** | Tversky and Kahneman 1971, abstract |
| $1.4M agency misspelled client names; $2.1M agency wanted QA without a checklist | **one person's claim** | @huntkyle |

### Put a coordinator over your bots (`run-a-team.md`)

Principles: orchestrator-worker works for parallel, independent jobs and costs many more tokens (Anthropic); it breaks when agents need shared context (Anthropic; Cognition); hand off references to stored work (Anthropic); repeated alerts get ignored (Ancker et al.).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Coordinator routes, never executes; "air traffic control, not the entire airport" | **supported** as a pattern; the quote is Hunt's | Anthropic orchestrator-workers; @huntkyle |
| Lead agent with subagents beat a single agent by 90.2%; about 15× the tokens of chat | **supported** | Anthropic multi-agent |
| Breaks where agents need the same context or depend on each other; actions carry implicit decisions | **supported** | Anthropic multi-agent; Cognition |
| Router on a lighter model with no shell; workers isolated, strongest model, never message people | **supported** ("can run without a Bash tool at all") | @DeepSeekHarness |
| Workers get "full tools" | **overstated** as general advice: DeepSeek's workers are coding workers with "a full set of execution tools" and "usually" the most capable models. Lesson now says so and that a marketing worker gets only the tools its job needs | @DeepSeekHarness, section 2.2 |
| Auditor prompt: "Ask me first before you share anything with the client" | **overstated** safety: it implies the bot has a way to send. The prompt now saves drafts to a folder, gives the bot no email, chat, upload or web tool, and leaves sending to you | Lesson's own least-privilege rule (`safe-bots.md`) |
| 12.4 minutes median "against 20.4 for a single agent told to use subagents" | **disputed** by its own source: 20.4 was the single agent with a neutral prompt, which never delegated; told to delegate, it took 13.8 (p95 29.0). Lesson now gives both | @DeepSeekHarness, section 7.1 table |
| Subagents save work and pass back a reference, which "prevents information loss" | **supported** | Anthropic multi-agent |
| Reminder acceptance dropped 30% for each extra reminder per encounter | **supported** | Ancker et al. 2017 |
| Chief of staff prompt: "Send me one page in [Slack / email]" | **overstated** safety (second skills review, 2026-11-24): the bot reads private drafts built from outside text, so a general send tool completes the lethal trifecta. The prompt now sends only through a webhook or mail connector that reaches the user's own channel or inbox, and otherwise saves the page to a folder | Willison 2025; the lesson's own rule in `safe-bots.md` |
| DeepSeek's watchdog judges drift, retries transient failures, answers why in plain language | **supported** | @DeepSeekHarness |
| Hunt's framework covers 8 areas; first 90 days building unasked processes; first hire after about 19 months solo | **one person's claim** | @huntkyle |

### Build a social research team (`social-research-team.md`)

Principles: shared files as memory between agents (Anthropic multi-agent and context engineering); studying only winners undersamples failure (Denrell); small samples mislead (Tversky and Kahneman); businesses can't use TikTok's general music library (TikTok).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Bots talk through files; notes outside the model, read back when needed | **supported** | Anthropic multi-agent; Anthropic context engineering |
| Patterns under 6 videos are "early" | **one person's claim** for the number, labelled; the instinct is **supported** | @dsqjaffa; Tversky and Kahneman 1971 |
| Virlo holds 21.6M+ videos; the author is its co-founder | **one person's claim**, and the conflict is named in the lesson | @dsqjaffa |
| Studying only winners makes risky choices look like the cause of success | **supported** | Denrell 2003, abstract |
| Old ads are the ones they've kept paying for | **one person's claim**; the CHECK answer adds that some ads run because nobody switched them off | @dsqjaffa |
| Businesses can't use TikTok's general music library for commercial posts, ads included | **supported** (page updated July 2025) | TikTok Commercial Music Library |
| Checking a sound against the Commercial Music Library is enough | **overstated**: the library is filtered by the region the campaign runs in and by usable placements. The RISK callout and Trend Spotter prompt now check region and placement | TikTok: How to use the Commercial Music Library (updated July 2026) |
| The Outlier Finder reports similar videos that flopped | **unsupported** by its own steps: it searched outliers only, so it could never see flops. The prompt now runs one more one-page search per pick without the outlier filter, and says so when the source can't return weak videos | Denrell 2003 (why the flops matter) |

### Design an always-on agent (`agent-architecture.md`)

Principles: context is a finite budget, so load by reference (Anthropic; Liu et al.); route by difficulty (FrugalGPT, OpenAI); durable state outside the model (Anthropic Managed Agents and multi-agent); real-time delegation is weak, so build it into structure (Anthropic multi-agent).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Filter events with cheap fixed rules, then the model (fast path, slow path) | **supported** as DeepSeek's design | @DeepSeekHarness |
| A cascade of models can match the best model for up to 98% less | **supported** | FrugalGPT, abstract |
| 95% cheap, 5% escalated | **one person's claim**, labelled "no evidence for the split" | @suraj_sharma14 |
| Prototype with the most capable model, then swap in smaller ones | **supported** | OpenAI guide |
| 100-word chat cap, "simple, effective", verified internally | **one person's claim** (DeepSeek), labelled | @DeepSeekHarness |
| Context is a budget; keep "lightweight identifiers" and load just in time | **supported** | Anthropic context engineering |
| Models are worst with facts in the middle of long inputs | **supported** | Liu et al. 2023 |
| `start()` returns "Started" at once; built but not yet on by default | **supported** | @DeepSeekHarness |
| Temporal resumes from the exact step | **overstated** (second skills review, 2026-11-24): Temporal resumes workflow state, but an activity that fails mid-call is retried, and "each attempt starts from the initial state"; Temporal recommends idempotent activities. Lesson now says a mid-call step starts again, so paid and outbound steps must be safe to repeat | Temporal docs: Activities |
| Anthropic built resume-from-failure because "agents are stateful and errors compound" | **supported** | Anthropic multi-agent |
| "Decoupling the brain from the hands": session log outside the model, `wake()` restarts, credentials in a vault | **supported** | Anthropic Managed Agents |
| DeepSeek's prototype is on GitHub, not an official product | **supported** (the README says so) | deepseek-ai/dsh-superagent-prototype |
| Agents are "not yet great at coordinating and delegating to other agents in real time" | **supported** | Anthropic multi-agent |
| Delegation: 0 of 5 neutral vs 4 of 5 delegation-first; the "small" run was the long tail | **supported**, synthetic and labelled | @DeepSeekHarness |

### Run a whole campaign with agents (`run-a-campaign.md`)

Principles: a delegated task needs objective, format, sources and boundaries (Anthropic); parallel agents make conflicting implicit decisions (Cognition), so check assets together; an ad that promises more than the page delivers spends trust (NN/g); retry limits then hand back (OpenAI); tracking is incomplete when UTM tags are missing or inconsistent (Google).

| Claim | Audit verdict | Source that settles it |
| --- | --- | --- |
| Holmberg does about 70% of his marketing in an agent workspace; talks 5 to 10 minutes; Matt Pocock's planning skills | **one person's claim** (self-report). The post is an X article not in `research/sources/`; read through the fxtwitter API | @shannholmberg |
| Each task needs an objective, output format, sources and limits; without them agents duplicated work | **supported** | Anthropic multi-agent |
| Four agents for three production steps; better writer context helped more than more agents | **one person's claim** | @shannholmberg |
| Assets can pass their own checks and still disagree | **supported** | Cognition: "actions carry implicit decisions" |
| NN/g "research ... shows" a link promising more than the page delivers spends trust | **overstated**: the source is an explainer, not a study, and splits the point in two (misleading titles use up trust; pages without context make users leave). Lesson now calls it a guide and states both | NN/g information scent |
| Retry limit, then hand to a person | **supported** | OpenAI guide: exceeding failure thresholds |
| Missing UTM values show as "(not set)"; "Meta" and "meta" are two sources | **supported** | GA: custom URLs |
| Tagging internal links "credits the events after that click" to the tag | **overstated** and uncited in Sources: GA attaches a mid-session campaign value to the events collected with it, for event-based attribution; the session keeps its source. Lesson reworded; the page added to Sources | GA: campaigns and traffic sources |
