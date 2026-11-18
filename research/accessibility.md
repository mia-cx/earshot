# Accessibility and readability research

Question: what should Free Game change to be the most readable and accessible online course, and which typography gives the most durable understanding?

Written for a fresh agent. Read `DESIGN.md` first. Everything below was checked against the code on 2026-11-18 (`src/routes/layout.css`, `+layout.svelte`, lesson page, `CheckCard`, `Worksheet`, `ListenBar`, review page). Nothing here is implemented.

## Short answers

1. **Typeface does not buy durable understanding.** The only typography claims that survived replication are about legibility and comfort (size, spacing, contrast), not memory. Disfluent "memory fonts" showed no effect on recall in a 25-study meta-analysis. Durable understanding comes from retrieval practice and spacing, which the site already has.
2. **Keep Atkinson Hyperlegible Next as the default.** Add reader controls for text size, spacing and a small font choice, because the best font differs per person and spacing has better evidence than letterforms.
3. **The biggest gaps are not typographic.** They are keyboard and focus bugs in the review flow, no reader controls, no backup of progress, and one WCAG 1.4.11 failure on the worksheet fields.

## What the site already does (do not re-recommend)

- TL;DR first, short sections, one action per lesson, three retrieval cards, spaced review at 3, 7, 16, 35 days with missed cards back tomorrow, worksheets with autosave and Markdown/PDF export, visible progress.
- Plain language: lessons average 657 words, 13.7 words per sentence, 38 words per paragraph, Flesch-Kincaid grade about 6.7 (my own rough script over `content/*/*.md` with markdown stripped, so treat it as an estimate).
- Atkinson Hyperlegible Next at 18px, line height 1.65, 40rem measure, left aligned, no justification, no italics for emphasis (bold), underlined links, `rem` units so browser text size is honoured, `<meta name="text-scale">`.
- Contrast: body ink 16.2:1 light and 15.0:1 dark; muted text 5.4:1 (light, on paper) and 5.0:1 (on surface), 6.8:1 dark; links 5.1:1 light, 8.3:1 dark. All pass AA (computed from the tokens in `layout.css`).
- Light, dark and system theme with a saved toggle; off-white dark paper (no pure black on pure white).
- Skip link, 3px focus ring, `prefers-reduced-motion` handled in every animated component, `aria-live="polite"` on diagram results, native controls, `inert` on hidden answers.
- Cross-lesson worksheet answers (WCAG 3.3.7 redundant entry is met in spirit).
- Narration player exists, but only one lesson has audio (`static/audio/foundations/positioning.mp3`).

## Ranked changes for this site

Ranking weighs evidence strength and reader benefit against effort. "WCAG" items are conformance fixes, ranked by how much a reader loses.

### 1. Reader controls panel: text size, spacing, font (medium)

A small "Aa" button next to the theme toggle opens a popover with three saved settings, applied before first paint like the theme (`app.html`).

- **Text size**: steps of about 100%, 115%, 130% on `html`. The site's 18px is inside the BDA range, while the studies that tested larger sizes found gains at larger sizes (below).
- **Spacing**: Normal, Roomy. Roomy adds letter spacing and word spacing together, and paragraph spacing. Never raise letter spacing without word spacing (Galliussi 2020).
- **Font**: Atkinson Hyperlegible Next (default), Lexend, System sans. Label them by name only. Do not claim a benefit.
- Optional later: a Calm toggle that hides the outline gutter, Contents button and reading bar (COGA "limit interruptions").

Evidence:
- The best font differs per person: Wallace et al. 2022, 16 fonts, "one font does not fit all", fastest-versus-slowest font gap up to 35% in reading speed with comprehension unchanged. No font won overall, and preference and familiarity did not predict the fastest font. Source: [ACM TOCHI](https://dl.acm.org/doi/10.1145/3502222), summary at [Readability Matters](https://readabilitymatters.org/articles/towards-individuated-reading-experiences). Caveat: adult crowdsourced short "interlude" reading; speed, not retention.
- Spacing beats letterforms for dyslexic readers: [Zorzi et al. 2012, PNAS](https://www.pnas.org/doi/10.1073/pnas.1205566109) (children aged 8 to 14, accuracy doubled with extra-wide letter spacing, no gain for typical readers); [Marinus et al. 2016](https://onlinelibrary.wiley.com/doi/10.1002/dys.1527) (the Dyslexie gain vanished once Arial got the same spacing); [Galliussi et al. 2020](https://link.springer.com/article/10.1007/s11881-020-00194-x) (letter spacing without word spacing slowed reading).
- Size: [Rello, Pielot and Marcos, CHI 2016](https://changedyslexia.org/publications/pdfs/2016-CHI-Make%20It%20Big%20The%20Effect%20of%20Font%20Size.pdf) found comprehension lower at 10 and 12pt and subjective readability best at 18pt (that is 24 CSS px, my conversion; lab screens and dyslexic readers). [Legge and Bigelow 2011](https://jov.arvojournals.org/article.aspx?articleid=2191906): a 10-fold fluent range of print sizes, and much print sits at the small end.
- Personalisation is itself a guideline: [COGA objective 8](https://www.w3.org/TR/coga-usable/#objective-8-support-adaptation-and-personalization-0). [WCAG 1.4.12](https://www.w3.org/TR/WCAG22/#text-spacing) and [1.4.8 (AAA)](https://www.w3.org/TR/WCAG22/#visual-presentation) require that readers can change these things.

Benefit: the only change that addresses individual differences, which are the best-evidenced finding in the field. Starting values for Roomy (about +0.05em letter, +0.2em word, paragraph gap 2em) are my choice, not from a study; tune them with a few real readers.

### 2. Single-key shortcuts on `/review` break WCAG 2.1.4 (small)

`src/routes/review/+page.svelte` binds `Space`, `1` and `2` on `window` with no way to turn them off. [2.1.4 Character Key Shortcuts](https://www.w3.org/TR/WCAG22/#character-key-shortcuts) (Level A) requires turn-off, remapping with a modifier, or active-only-on-focus. Fix: attach the handler to the card region and make it fire only when that region has focus, and focus the region when a card appears. Speech-input and screen-reader users otherwise trigger grades by accident.

The lesson page's left and right arrow keys are not character keys, so 2.1.4 does not apply. They can still fight horizontal scrolling inside the overflow table wrappers; skip them when `event.target` is inside a scroll container.

### 3. Focus and announcements after reveal and grade (small)

- `CheckCard.svelte` removes the Show answer button when clicked, so keyboard focus drops to `<body>`. Keep the button, flip `aria-expanded`, and move focus to the answer, or move focus to the answer container (`tabindex="-1"`).
- On `/review`, grading re-renders the card inside `{#key currentId}`, so the focused grade button vanishes. Move focus to the next card's question and add a polite live region for "Card 3 of 10".

Evidence: [COGA objective 4](https://www.w3.org/TR/coga-usable/#objective-4-help-users-avoid-mistakes-and-know-how-to-correct-them-0) and WCAG focus order basics. Benefit: screen reader and keyboard users can finish a review session at all.

### 4. Worksheet fields fail non-text contrast (small)

The textarea in `Worksheet.svelte` is identified only by `1px solid var(--line)`. `--line` against `--paper` is 1.29:1 (light) and 1.38:1 (dark). [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) needs 3:1 for a boundary that is the only cue, and fields have no other cue. Fix: a field border of about 3:1 (a new `--field-line` token). Same sweep: inactive lesson pips (`--accent-line` on paper) and the listen-bar track. Also add `@media (prefers-contrast: more)` (darker muted text and lines) and check `forced-colors` (pips and the reading bar are background-only, so they vanish).

### 5. Back up progress (small to medium)

Done lessons, the review deck and answers live only in `localStorage`. Clearing site data or switching browser erases a spaced-review schedule that runs 35+ days. Add Export and Import of all `free-game:*` keys as one JSON file on the Map page. Evidence: [COGA "Avoid Data Loss"](https://www.w3.org/TR/coga-usable/#avoid-data-loss-and-timeouts-pattern). Benefit: the reader's long-term investment survives a browser change, and it is the cheapest "account" substitute.

### 6. Review reminders (small to medium)

Spacing only works if reviews happen, and an ADHD reader will not remember a badge on a page they are not on. Offer "Add to calendar": an `.ics` with the next due date, generated client-side from the deck, no accounts. The schedule itself is defensible: [Cepeda et al. 2006](https://www.yorku.ca/ncepeda/publications/CPVWR2006.html) (839 assessments, 317 experiments) found the best gap grows with how long you need to remember, and [Cepeda 2008](https://www.yorku.ca/ncepeda/publications/CPVWR2006.html) (listed on the same page; I did not read it) is the source for the 10 to 20 percent rule of thumb, which I could not confirm from a primary page. So leave 3, 7, 16, 35 alone. Reminders: [COGA objective 7](https://www.w3.org/TR/coga-usable/#objective-7-provide-help-and-support-0).

### 7. Make the retrieval step harder to skip (medium)

A check card lets the reader click Show answer without trying. The testing effect depends on the attempt: [Roediger and Karpicke 2006](https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/) (repeated testing beat restudy on delayed tests while feeling less effective), [Dunlosky et al. 2013](https://journals.sagepub.com/doi/abs/10.1177/1529100612453266) (practice testing and distributed practice are the two high-utility techniques; testing with feedback beats testing alone), [Adesope et al. 2017](https://journals.sagepub.com/doi/abs/10.3102/0034654316689306) (meta-analysis, practice tests beat restudy). What the evidence does not show is that typing an answer beats thinking it for this audience, so ship it as an option and measure: an optional "Type it first" field above Show answer in Review, with the typed text shown beside the answer. Keep the in-lesson cards as they are.

### 8. Test harness for what the code cannot show (medium)

No automated accessibility check exists. Add a Playwright run with axe-core on a lesson, `/review`, `/map` and one page per diagram type, in four states: default, WCAG 1.4.12 override (line height 1.5, paragraph spacing 2em, letter 0.12em, word 0.16em, nothing else changed), 200% zoom, 320px width ([1.4.4](https://www.w3.org/TR/WCAG22/#resize-text), [1.4.10](https://www.w3.org/TR/WCAG22/#reflow)). Then one manual VoiceOver pass over a lesson, a worksheet, a diagram and a review round. Also give the `display: block; overflow-x: auto` tables `tabindex="0"` and a label so keyboard users can scroll them. Benefit: I verified contrast by arithmetic and read the code, but I did not run a browser, so overflow under text-spacing overrides is unchecked.

### 9. Narration: coverage and controls (small, then large)

One of 63 lessons has audio. If narration is a promise, coverage matters more than polish. Small fixes to `ListenBar`: say what it reads ("Listen to this lesson, same words as below"), add skip back and forward 15 seconds and a 0.75x speed. The page text is the transcript, which [WCAG 1.2.1](https://www.w3.org/TR/WCAG22/#audio-only-and-video-only-prerecorded) exempts when clearly labelled. Large and later: sentence highlighting while the audio plays, which COGA lists as a reading aid ([COGA objective 3](https://www.w3.org/TR/coga-usable/#objective-3-use-clear-and-understandable-content-0)). Mayer's [redundancy principle](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E) warns against narration plus on-screen text over graphics, but the lessons have no animation beside the text, so a read-along is not that case (a search summary reports narration with matching text helps without animation; I did not read the primary paper).

### 10. A floor for text size (small)

39 declarations use 0.85rem or smaller (13.5px at the 18px root), including captions, TOC, sources and labels. [Piepenbrock et al. 2014](https://www.nngroup.com/articles/dark-mode/) found the polarity effect grows as characters shrink, and small text is the first thing 1.4.12 and zoom break. Set a floor of 0.875rem (15.75px) for anything a reader needs to read, keep tiny sizes for decorative uppercase labels only. Evidence: Legge and Bigelow above; [BDA](https://cdn.bdadyslexia.org.uk/uploads/documents/Advice/style-guide/BDA-Style-Guide-2023.pdf) asks for 12 to 14pt (16 to 19px) body text.

### 11. Content pass on the longest and hardest lessons (medium)

- Over 1000 words: `seo/pages-that-sell` (1134), `video/ai-video-shots` (1037), `seo/technical-basics` (1002). Split or fold the lowest-value sections. [COGA "Avoid Too Much Content"](https://www.w3.org/TR/coga-usable/#objective-5-help-users-focus-0); Mayer's [segmenting principle](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E) (learner-paced chunks beat one continuous unit).
- Highest estimated reading grade: `launch/first-100-users` (11.4), `backlinks/weekly-link-habit` (10.3), `video/ai-video-shots` (9.0). Aim for sentences under 16 words. [WCAG 3.1.5](https://www.w3.org/TR/WCAG22/#reading-level) (AAA) asks for a simpler version when text needs more than lower secondary reading ability.

### 12. Measure the line length in characters (small, low priority)

40rem at 18px is 720px. In Atkinson that is probably 70 to 80 characters (I did not measure it). Evidence is mixed: [Dyson and Haselgrove 2001](https://stu.westga.edu/~ssynan1/literacy/Dyson.pdf) found 55 characters per line gave better comprehension than 100; [Shaikh 2005](https://www.researchgate.net/publication/253615156_The_Effects_of_Line_Length_on_Reading_Online_News) found the longest lines (95) read fastest; [WCAG 1.4.8](https://www.w3.org/TR/WCAG22/#visual-presentation) caps at 80; the BDA guide's older edition says 60 to 70. Measure in a browser; if it is above 75, set `max-width: 66ch`. Moving between 66 and 75 is a guess.

## Evidence on fonts

### Verdict

- **Keep Atkinson Hyperlegible Next as the default.** It was designed by Braille Institute with Applied Design Works for letterform distinction and tested informally with low-vision readers ([Design Week](https://www.designweek.co.uk/issues/2-8-august-2021/designing-atkinson-hyperlegible/), [Fast Company](https://www.fastcompany.com/90395836/this-typeface-hides-a-secret-in-plain-sight-and-thats-the-point)). I found no peer-reviewed study of it, so it is a reasoned choice, not a proven one. It is free, has a mono companion, and its distinct letterforms suit code samples and the zero-versus-O problem.
- **Offer a choice of three** in the reader panel: Atkinson Hyperlegible Next, Lexend, system sans. Choice is supported by Wallace et al.; the specific alternatives are a judgment. Lexend has wide default spacing, and spacing is the one dyslexia-related lever that held up. System sans costs no download and is the font the reader already knows.
- **Do not add** OpenDyslexic, Dyslexie, Sans Forgetica or a Bionic Reading mode.

### What each claim has behind it

| Claim | Evidence | Status |
| --- | --- | --- |
| Best font differs per reader | [Wallace et al. 2022](https://dl.acm.org/doi/10.1145/3502222): 16 fonts, no overall winner, up to 35% speed gap between a reader's fastest and slowest font, comprehension unchanged, preference and familiarity did not predict speed. | One large study, speed only, adults. Plausible, needs replication. I could not read the PDF text, so details come from the ACM page and a summary. |
| Extra spacing helps dyslexic readers | Zorzi 2012, Marinus 2016, Galliussi 2020 (see change 1). Skottun and Skoyles argued the effect is about poor readers generally ([PNAS reply](https://www.pnas.org/doi/abs/10.1073/pnas.1213265109)). | Moderate. Applies to children with dyslexia; letter spacing must come with word spacing. |
| OpenDyslexic helps | [Wery and Diliberto 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5629233/): no gain in rate or accuracy over Arial and Times, none of the children preferred it. | Null. |
| Dyslexie helps | [Kuster et al. 2018](https://link.springer.com/article/10.1007/s11881-017-0154-6): 170 and 147 children, no gain over Arial, children with dyslexia preferred Arial. [Joseph et al. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9804695/) found no advantage over Calibri. | Null. Marinus 2016 shows any gain was spacing. |
| Dyslexia fonts in general | A 2026 meta-analysis of 15 studies and 688 children is reported to find no reliable effect ([Annals of Dyslexia](https://link.springer.com/article/10.1007/s11881-026-00389-8)). Paywalled; I only saw a secondary summary. | Null, unverified. |
| Sans serif, roman and monospaced help readers with dyslexia | [Rello and Baeza-Yates 2013](https://dl.acm.org/doi/abs/10.1145/2897736) (later journal version: 97 readers, 48 with dyslexia, 12 fonts): sans serif, roman and monospaced gave shorter fixations; Helvetica, Courier, Arial, Verdana and CMU best; italics worse. No significant reading time difference was reported in the 2013 paper. | Moderate for italics and serifs, weak for speed. |
| Lexend raises fluency | Claims come from its designer's own studies; I found no independent peer-reviewed replication ([project page](https://github.com/bghryct/lexend), critical review at [binarydecimal](https://binarydecimal.com/blogs/dyslexia-friendly-fonts)). Times New Roman, the comparison, is tightly spaced, so spacing may explain the gain. | Unverified. Fine as an option, no benefit claim. |
| Disfluent fonts (Sans Forgetica) aid memory | [Taylor et al. 2020](https://wrap.warwick.ac.uk/id/eprint/136656/): four experiments, equal or worse recall. [Huff et al. 2022](https://cognitiveresearchjournal.springeropen.com/articles/10.1186/s41235-022-00448-9): no benefit. [Xie et al. 2018 meta-analysis](https://link.springer.com/article/10.1007/s10648-018-9442-x): 25 articles, 3135 participants, recall d = -0.01, transfer d = 0.03; learning takes longer and readers judge their learning lower. | Null, replicated. |
| Bionic Reading speeds reading | [Snell 2024](https://research.vu.nl/en/publications/no-bionic-reading-does-not-work/) (no difference in reading time), [eye-tracking study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12565662/) (no speed difference, slower on average), [Readwise](https://blog.readwise.io/bionic-reading-results/) (2,074 readers, 2.6 words per minute slower; not peer reviewed). | Null. Some readers may like it; no evidence it helps. |

### The other typography variables

| Variable | What the evidence supports | Site status |
| --- | --- | --- |
| Size | Gains up to larger sizes ([Rello 2016](https://changedyslexia.org/publications/pdfs/2016-CHI-Make%20It%20Big%20The%20Effect%20of%20Font%20Size.pdf)); BDA 12 to 14pt; fluent range is wide ([Legge and Bigelow](https://jov.arvojournals.org/article.aspx?articleid=2191906)). Let readers choose. | 18px; add control (change 1) and a floor (change 10). |
| Line spacing | WCAG 1.4.12 requires surviving 1.5; BDA prefers 1.5. No replicated evidence that more than 1.5 helps; [Rello 2013](https://pielot.org/pubs/Rello2013-W4A-SizeMatters.pdf) found spacing mattered little against size. | 1.65, fine. |
| Letter and word spacing | Helps dyslexic readers when word spacing grows with it. No gain for typical readers (Zorzi). The page must survive 0.12em and 0.16em ([1.4.12](https://www.w3.org/TR/WCAG22/#text-spacing)). | Default only. Add Roomy preset (change 1). |
| Paragraph spacing | 1.4.12 requires surviving 2x font size; AAA 1.4.8 asks 1.5x line spacing. | 1.5rem (about one line). Roomy preset covers it. |
| Alignment | Left aligned, not justified: [WCAG 1.4.8](https://www.w3.org/TR/WCAG22/#visual-presentation) and BDA. | Done. |
| Italics, capitals, underline | BDA and Rello 2013: avoid italics and long runs of capitals; use bold for emphasis. Underline only for links ([1.4.1](https://www.w3.org/TR/WCAG22/#use-of-color)). | Done. Capitals appear only in 0.75rem labels. |
| Line length | Mixed (change 12). | Likely 70 to 80 characters. Measure. |
| Contrast and dark mode | [Piepenbrock et al. 2013](https://www.psychologie.hhu.de/fileadmin/redaktion/Oeffentliche_Medien/Fakultaeten/Mathematisch-Naturwissenschaftliche_Fakultaet/Psychologie/AAP/Publikationen/2013/Piepenbrock-2013-Positive_display_polarity_is_.pdf), [NN/g](https://www.nngroup.com/articles/dark-mode/): light text on dark loses for normal vision, may help some low-vision readers (cataract). One later study found no difference on visualisation tasks ([arXiv 2409.10841](https://arxiv.org/html/2409.10841v2)). | Both offered, system default. Good. |
| WCAG 3 | Working draft of 10 September 2026; thresholds still "values to be determined"; the contrast algorithm is undecided ([WCAG 3.0](https://www.w3.org/TR/wcag-3.0/)). | Target WCAG 2.2 AA, with AAA text rules where cheap. |

## Evidence on learning and cognition

- **Retrieval and spacing**: already the course's backbone (change 7 and 6 refine them). Dunlosky 2013 rated practice testing and distributed practice highest of ten techniques and rereading and highlighting low.
- **Chunking and scanning**: readers scan; [NN/g](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/) (232 users, 2006) found the F-pattern, so start headings and paragraphs with information-carrying words. [COGA](https://www.w3.org/TR/coga-usable/) lists summaries of long content, separate instructions, white space, and clear headings that tell users where they are.
- **ADHD**: the best empirical anchor I found is that sustained attention is the main predictor of reading comprehension in adults with ADHD, and mind wandering mediates the gap, narrowed by staged prompts at different reading stages ([Learning and Instruction 2025](https://www.academia.edu/126038350/Metacognitive_scaffolding_for_digital_reading_and_mind_wandering_in_adults_with_and_without_ADHD), [Sustained attention study](https://www.sciencedirect.com/science/article/abs/pii/S1041608023000444); both read as search summaries only). I found no controlled study of chunked text for ADHD, so the course's short sections rest on COGA and general multimedia learning research, not an ADHD trial. COGA's ADHD notes ask for breadcrumbs and step indicators so readers can resume after attention drops; the lesson pips and outline do this.
- **Time limits and errors**: no timers anywhere on the site, autosave on worksheets. Keep it that way ([COGA objective 4](https://www.w3.org/TR/coga-usable/#objective-4-help-users-avoid-mistakes-and-know-how-to-correct-them-0)).
- **Interactive diagrams**: contract in `research/tools/diagrams-brief.md` matches COGA and WCAG (native controls, live results, reduced motion). The gap is verification (change 8), not design.

## Don't do

- **OpenDyslexic, Dyslexie, Sans Forgetica, "dyslexia mode" fonts.** Null results (table above). A dyslexia font promises something the evidence does not deliver and signals the site is guessing.
- **Bionic Reading or bolded word starts.** Null on speed and no comprehension gain.
- **Colour overlays or a "tinted background" mode as a treatment.** Systematic reviews say overlays cannot be endorsed ([2016 review](https://www.researchgate.net/publication/307548820_The_effect_of_coloured_overlays_and_lenses_on_reading_a_systematic_review_of_the_literature)). A line-focus ruler is optional comfort: a CHI study found readers without dyslexia were not faster but preferred it ([ACM](https://dl.acm.org/doi/10.1145/3544548.3581367)). Build it last, if at all.
- **"Desirable difficulty" typography.** Learning takes longer and readers feel they learned less; recall did not improve.
- **Justified text, long runs of italics or capitals, light grey text.** Opposed by WCAG 1.4.8 and the BDA guide.
- **Huge line height or letter spacing as defaults.** Benefits come from per-reader settings, and letter spacing without word spacing slowed reading.
- **A timer, streak pressure or confetti-style gamification on review.** No evidence it improves retention, and time pressure works against COGA's avoid-timeouts pattern. The existing done animation is enough.
- **An accessibility overlay widget.** Add real controls (change 1), not a third-party toolbar.
- **Adopting WCAG 3 draft thresholds now.** Not stable.

## How this was researched

- Read directly: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (first 200,000 characters), [COGA](https://www.w3.org/TR/coga-usable/) (first 100,000 characters, to pattern 4.2.5, later patterns from the table of contents), [WCAG 3.0 draft](https://www.w3.org/TR/wcag-3.0/) (first 100,000 characters), [Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), and the site code listed at the top.
- Read through search summaries only (the paper itself was not opened): every peer-reviewed study cited above. Where a number came from a secondary source it is labelled. The Wallace et al. PDF was downloaded but could not be extracted (no PDF tool installed), so the list of 16 fonts and the sample size are unconfirmed.
- Not obtained: the BDA 2023 style guide, the IDA page on special fonts (both returned 403), the GOV.UK Design System typography page (404), USWDS (not consulted). BDA figures come from search summaries of its PDF.
- Check before quoting any figure publicly: the 35% figure, the Zorzi effect sizes, the 2026 dyslexia-font meta-analysis, and the Cepeda 10 to 20 percent rule.
- Not tested: nothing in a browser. Contrast ratios are computed from the token hex values; `oklch` accent tokens were not measured.
