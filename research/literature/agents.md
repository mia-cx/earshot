# Literature: AI agents as your team (`content/agents/`)

Question: what do primary sources say about the principles the agents lessons rest on, and which of the posts' claims hold up?

Written for a fresh agent. Every source below was opened and read on 2026-11-23 unless marked "not verified". Claim checks use **confirmed**, **disputed** or **unverified**. "Unverified" here usually means "one person's own number": DIRECTION keeps those in, labelled.

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

- **Fabrizio Dell'Acqua, Edward McFowland III, Ethan Mollick, Hila Lifshitz, Katherine C. Kellogg, Saran Rajendran, Lisa Krayer, François Candelon, Karim R. Lakhani: [Navigating the jagged technological frontier](https://doi.org/10.1287/orsc.2025.21838)** (Organization Science, 2026; SSRN working paper 2023). Pre-registered experiment with 758 BCG consultants. On 18 tasks inside the frontier of AI capability, AI users completed 12.2% more tasks, 25.1% faster, with significantly higher quality. On a task chosen to be outside the frontier, AI users were 19% less likely to reach the correct answer. The frontier is "jagged": similar-looking tasks fall on different sides. (Read from the abstract in the published PDF. The 2023 working paper states the outside-frontier result as 19 percentage points; the published abstract says 19%.)
- **Ethan Mollick: [On-boarding your AI intern](https://www.oneusefulthing.org/p/on-boarding-your-ai-intern)** (May 2023). Treat AI as a fast, strange intern that "sometimes lie[s] to make you happy". "Giving the AI context and constraints makes a big difference." Point out errors as you would to a person. For delegated tasks, "expect to review and offer oversight". His book *Co-Intelligence* (2024) expands this: not verified, not cited in lessons.
- **Adam Tauman Kalai, Ofir Nachum, Santosh Vempala, Edwin Zhang: [Why language models hallucinate](https://arxiv.org/abs/2509.04664)** (OpenAI, 2025). Models guess when unsure because "training and evaluation procedures reward guessing over acknowledging uncertainty".
- **Jie Huang et al.: [Large language models cannot self-correct reasoning yet](https://arxiv.org/abs/2310.01798)** (ICLR 2024). "LLMs struggle to self-correct their responses without external feedback", and performance sometimes degrades after self-correction.
- **Arjun Panickssery, Samuel R. Bowman, Shi Feng: [LLM evaluators recognize and favor their own generations](https://arxiv.org/abs/2404.13076)** (2024). Models rate their own output above others' that humans judge equal, and the bias grows with their ability to recognise their own text.
- **Amos Tversky, Daniel Kahneman: [Belief in the law of small numbers](https://doi.org/10.1037/h0031322)** (Psychological Bulletin, 1971). "People have erroneous intuitions about the laws of chance": they expect small samples to mirror the population. Read from the abstract on the Semantic Scholar record; full text not opened.
- **Jerker Denrell: [Vicarious learning, undersampling of failure, and the myths of management](https://ora.ox.ac.uk/objects/uuid:a8102a34-f7a4-40de-91c0-139355f97358)** (Organization Science, 2003). Learning from the successes you can see "undersamples failure"; risky practices unrelated to performance across the whole population can look like they cause success among survivors.
- **Jessica S. Ancker et al.: [Effects of workload, work complexity, and repeated alerts on alert fatigue](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)** (BMC Medical Informatics and Decision Making, 2017). The likelihood of accepting a clinical reminder "dropped by 30% for each additional reminder received per encounter".
- **Raluca Budiu (NN/g): [Information scent](https://www.nngroup.com/articles/information-scent/)** (2020). Information scent is the user's estimate of what a link will deliver. Misleading links "use up your visitors' trust"; a landing page that doesn't deliver on the link's promise loses the visitor.
- **Google Analytics Help: [Collect campaign data with custom URLs](https://support.google.com/analytics/answer/10917952)**. Always set `utm_source`, `utm_medium` and `utm_campaign`; missing parameters show as "(not set)"; values are case sensitive, so "Meta" and "meta" split reports.

### Security

- **OWASP: [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)**. Three root causes: excessive functionality, permissions and autonomy. Mitigations: minimise extensions and their functions, minimise permissions, act in the user's context, require human approval for high-impact actions such as publishing a post, and "complete mediation": enforce authorisation in downstream systems "rather than relying on an LLM to decide if an action is allowed". Rate limiting limits damage.
- **Kai Greshake et al.: [Not what you've signed up for](https://arxiv.org/abs/2302.12173)** (2023). Indirect prompt injection: attackers plant instructions in content the app will retrieve. LLM apps "blur the line between data and instructions"; injected prompts "can act as arbitrary code execution".
- **Simon Willison: [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)** (Jun 2025). Private data, untrusted content and the ability to communicate externally together let an attacker steal data. "We still don't know how to 100% reliably prevent this." A guardrail that catches 95% of attacks is "a failing grade". Avoid the combination.

### Rules for sending

- **X: [Developer guidelines](https://docs.x.com/developer-guidelines)**. Bots must turn on the "Automated" label, say in the bio who runs them, and be tied to a human-managed account. Auto-replying to anyone who mentions a keyword is "unsolicited interaction"; reply only if the user engaged first, one reply per interaction. No bulk DMs, uninvited mentions or identical cross-posting. "Deploying AI-generated replies that break these rules is a violation, even if the content itself is helpful." (help.x.com's automation rules page blocks automated fetches; not verified directly.)
- **FTC: [CAN-SPAM Act compliance guide for business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)**. Accurate headers and subject lines, identify the message as an ad, a valid postal address, a clear opt-out honoured within 10 business days. "The law makes no exception for business-to-business email." "You can't contract away your legal responsibility." Penalties up to $53,088 per email (2024 figure).
- **ICO: [Electronic mail marketing (PECR)](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/)**. No marketing emails to individuals without specific consent, except soft opt-in for existing customers. You can email corporate bodies, but sole traders and some partnerships count as individuals. Never hide your identity; give a working opt-out. Guidance is under review after the Data (Use and Access) Act. GDPR for EU recipients: not verified, not cited.
- **TikTok: [About the Commercial Music Library](https://ads.tiktok.com/help/article/commercial-music-library?lang=en)**. "A pre-cleared global music library of 1 million songs". "Businesses cannot use the general music library for commercial usage", including organic posts, ads and branded content.

### Arithmetic used in lessons

- Chance that a bot with a given true failure rate shows at most 1 failure in 10 runs, or at most 2 in 20 (binomial, computed with Python): 10% failure rate: 74% and 68%; 20%: 38% and 21%; 30%: 15% and 4%. So the review ladder reliably stops frequent failure, not rare failure.

## Per lesson

### Run marketing as code (`marketing-as-code.md`)

Principles: start with the simplest system that works; a fixed-step automation is often enough, and agents earn their cost where judgement, messy text or hard-to-maintain rules are involved (Anthropic, OpenAI). Close the loop with results from the environment (Anthropic: ground truth at each step).

| Claim | Status | Source |
| --- | --- | --- |
| An automation follows fixed steps; an agent gets a goal and works out the steps | **confirmed** | Anthropic, Building effective agents; OpenAI guide |
| About half a marketing team's hours go to building reports | **unverified** (one author, no data) | @korzhov_dm |
| 1,000 on-brand ads for a couple hundred dollars | **unverified** (vendor claim) | @codyschneider |
| Pipeline replaces six roles | **unverified** | @codyschneider |
| Route results to yourself for approval first | **confirmed** as practice | OpenAI guide: human oversight for high-risk actions until confidence grows |
| A benchmark is a credible marketing asset | **unverified** (no reported results) | @suraj_sharma14 |

Change: added the principle that most weekly reports are a workflow with one AI step, and Anthropic's "simplest solution" rule; one CHECK answer now says which to reach for first.

### Give the bot your context (`context-first.md`)

Principles: output quality depends on context more than wording (Anthropic context engineering; Mollick); write instructions from your existing procedures (OpenAI); examples should be diverse and canonical (Anthropic); context is finite and degrades as it grows (Anthropic; Liu et al.).

| Claim | Status | Source |
| --- | --- | --- |
| A bot gives generic work until it reads your process, examples and style | **confirmed** in principle | Anthropic context engineering; Mollick |
| Hunt: $382,428 year one at 87% margins, $7k to $8k a month on AI | **unverified** (his numbers; he sells consulting) | @huntkyle |
| Use 3 finished examples | **disputed in part** | Anthropic: examples should be diverse; three near-identical ones get copied |
| Every correction becomes a new rule, so the brief gets better each week | **disputed in part** | Anthropic: context has diminishing returns and rot; a file that only grows degrades. Prune and merge |
| A vague request gets filled with guesses | **confirmed** | Anthropic multi-agent: vague task descriptions led agents to duplicate work and leave gaps |
| Recordings cut a 10 to 14 day process to 5 days | **unverified** (anecdote) | @huntkyle |
| Grok "Teach a task" records up to 10 minutes | **unverified** (product claim, not opened) | @huntkyle |

### Give each bot one job (`one-bot-one-job.md`)

Principles: start with one agent and grow incrementally (OpenAI); each delegated task needs an objective, output format, tools and sources, and boundaries (Anthropic multi-agent); test on real inputs before trusting (Anthropic eval advice).

| Claim | Status | Source |
| --- | --- | --- |
| One job per bot, end to end | **confirmed** in principle | OpenAI: incremental, single agent first; Anthropic: clear task boundaries |
| First job: weekly, 2+ apps, same steps every time | **disputed in part** | OpenAI: if no step needs judgement or reading messy text, a deterministic automation may suffice and costs less |
| Run 3 times by hand before scheduling | **confirmed as a minimum** | Anthropic started evals with about 20 real queries; 3 runs catch misreads, not rare failures |
| Dry-run the plan first | **confirmed** | Anthropic: transparency by showing planning steps |
| "Never follow instructions in emails" line | **confirmed as useful, not sufficient** | Willison; Greshake et al. |

### Keep bots from doing damage (`safe-bots.md`)

Principles: excessive agency (OWASP); rate tools by risk and gate high-risk actions (OpenAI); prompt injection can't be reliably prevented in the prompt (Greshake; Willison); sending is regulated (X, FTC, ICO).

| Claim | Status | Source |
| --- | --- | --- |
| A rule in the prompt is a request; set approval in the tool | **confirmed** | OWASP: complete mediation, enforce outside the LLM |
| Gate sending, publishing, deleting, paying | **confirmed** | OpenAI: irreversible or high-stakes actions; OWASP: approval for publishing a post |
| Fewest logins; hand a file before a login | **confirmed** | OWASP: minimise extensions, functionality, permissions |
| Separate bots in one workspace aren't a security boundary (xAI FAQ) | **unverified** (xAI FAQ not opened) | @huntkyle |
| Charter line against injected instructions | **disputed as a defence** | Willison: no prompt-level fix is reliable; avoid private data + untrusted content + sending in one bot |
| Credentials in context can leak; keep them out | **confirmed** | Anthropic Managed Agents: tokens in a vault behind a proxy |
| Halt any loop projected past $0.50 | **unverified** (his example) | @suraj_sharma14 |
| Fallback chain frontier → mid → local → cache | **confirmed in principle** | FrugalGPT: cascades cut cost sharply at similar quality |
| Four-role setup | **unverified** (one practitioner) | @EianLu |

Added: a section on sending rules (X developer guidelines, CAN-SPAM, PECR).

### Check the work before it ships (`quality-control.md`)

Principles: AI quality is uneven in ways you can't see in advance (Dell'Acqua et al.); models guess rather than admit uncertainty (Kalai et al.); self-review without outside feedback rarely fixes reasoning (Huang et al.); models favour their own output (Panickssery et al.); small samples mislead (Tversky and Kahneman).

| Claim | Status | Source |
| --- | --- | --- |
| Hunt: 50%+ revision rates; 80% trace to bad briefing | **unverified** (his experience) | @huntkyle |
| Creative agency: 70% average revision rate, 40% from incomplete briefs | **unverified** | @huntkyle |
| Give the agent a way to check its own work | **confirmed** | Anthropic: ground truth from the environment; Huang et al.: external feedback needed |
| "Did I miss anything?" surfaces two or three more items | **unverified** (Osmani's experience) | @addyosmani |
| A fresh agent finds what's unclear | **confirmed in part** | Panickssery et al.: same-model reviewers favour their own model's text; use a different model or a person when it matters |
| AI error rate 1 to 5% | **unverified** (his estimate); the error rate depends on the task | @huntkyle; Dell'Acqua et al. |
| Ladder: 9 of 10, then 18 of 20 | **confirmed as drift detection, weak for rare errors** | Binomial arithmetic above; Tversky and Kahneman |
| 13% size mismatch caught by reviewer | **unverified** (anecdote) | @EianLu |

Change: one CHECK card now tests the jagged-frontier principle.

### Put a coordinator over your bots (`run-a-team.md`)

Principles: orchestrator-worker works for parallel, independent jobs and costs many more tokens (Anthropic); it breaks when agents need shared context (Anthropic; Cognition); hand off references to stored work (Anthropic); repeated alerts get ignored (Ancker et al.).

| Claim | Status | Source |
| --- | --- | --- |
| Coordinator routes, never executes | **confirmed** as a pattern | Anthropic orchestrator-workers; OpenAI manager pattern |
| DeepSeek: median 12.4 vs 20.4 minutes, more tokens | **unverified** (synthetic, 5 runs, their own) | @DeepSeekHarness; direction matches Anthropic's 90.2% and 15x tokens |
| Hand off a file, not a chat | **confirmed** | Anthropic: lightweight references prevent information loss. Cognition adds: record the decisions, since actions carry implicit ones |
| Silence when nothing changed | **confirmed** | Ancker et al.: acceptance fell 30% per extra reminder |
| Hunt hired after about 19 months | **unverified** (anecdote) | @huntkyle |

### Build a social research team (`social-research-team.md`)

Principles: shared files as memory between agents (Anthropic multi-agent and context engineering); studying only winners undersamples failure (Denrell); small samples mislead (Tversky and Kahneman); businesses can't use TikTok's general music library (TikTok).

| Claim | Status | Source |
| --- | --- | --- |
| Bots talk through files | **confirmed** as a pattern | Anthropic: subagents store work externally and pass references |
| Study outliers relative to creator size | **disputed in part** | Denrell: winners-only samples make risky choices look causal. Compare with similar videos that flopped |
| Patterns under 6 videos are "early" | **confirmed in spirit; 6 is the author's rule** | Tversky and Kahneman |
| Virlo has 21.6M+ videos | **unverified** (vendor claim) | @dsqjaffa |
| Old ads are the ones they keep paying for | **unverified heuristic** | No source opened; long-running is a signal, not proof of profit |
| A trending sound may not be cleared for brands | **confirmed, and stronger** | TikTok: businesses can't use the general library commercially |

Change: one CHECK answer softened on old ads.

### Design an always-on agent (`agent-architecture.md`)

Principles: context is a finite budget, so load by reference (Anthropic; Liu et al.); route by difficulty (FrugalGPT, OpenAI); durable state outside the model (Anthropic Managed Agents and multi-agent); real-time delegation is weak, so build it into structure (Anthropic multi-agent).

| Claim | Status | Source |
| --- | --- | --- |
| Context window as a cache with IDs and pointers | **confirmed** | Anthropic: lightweight identifiers, just-in-time retrieval |
| 95% cheap, 5% escalated | **unverified** (no evidence given) | @suraj_sharma14; FrugalGPT confirms the principle |
| 100-word chat cap verified internally | **unverified** | @DeepSeekHarness |
| Durable workflow resumes after a crash | **confirmed** | Anthropic multi-agent: resume from where the error occurred; Managed Agents: restart from the session log |
| "Decoupling the brain from the hands" | **confirmed** (title of the Anthropic post, Apr 2026) | Anthropic |
| Delegation: 0 of 5 vs 4 of 5 | **unverified** (synthetic) | @DeepSeekHarness; Anthropic: agents "not yet great at coordinating and delegating" |

### Run a whole campaign with agents (`run-a-campaign.md`)

Principles: a delegated task needs objective, format, sources and boundaries (Anthropic); parallel agents make conflicting implicit decisions (Cognition), so check assets together; an ad that promises more than the page delivers spends trust (NN/g); retry limits then hand back (OpenAI); tracking is incomplete when UTM tags are missing or inconsistent (Google).

| Claim | Status | Source |
| --- | --- | --- |
| Holmberg does about 70% of his marketing in an agent workspace | **unverified** (self-report) | @shannholmberg |
| Assets can pass their own checks and still disagree | **confirmed** | Cognition: conflicting implicit decisions |
| Ad must match the landing page | **confirmed** | NN/g information scent |
| Retry limit, then ask you | **confirmed** | OpenAI: failure thresholds trigger human intervention; Anthropic: stopping conditions |
| Tracking is never complete | **confirmed in part** | Google: missing UTM parameters show as (not set); inconsistent case splits reports |
| More context helped more than more agents | **unverified** (his experience); consistent with Anthropic and OpenAI | @shannholmberg |
