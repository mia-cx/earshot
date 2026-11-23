# Design

Earshot is read by people with ADHD who are learning marketing from zero. The design serves four needs: know where you are, start the next thing without deciding, skim a lesson and still get it, and remember it next week.

## Learning model

- **Advance organiser**: every module opens with its signature diagram and the list of lessons, so the reader sees the shape before the detail.
- **Short version first**: each lesson starts with its TLDR and keeps sections short.
- **Doing over reading**: diagrams are interactive (pick, toggle, step, adjust) and every lesson ends with one small "Do it now" task.
- **Retrieval practice**: three check cards per lesson. The reader answers in their head, then reveals.
- **Spaced review**: finishing a lesson adds its cards to the review deck. Recalled cards come back after 3, 7, 16, then 35 days; missed cards come back tomorrow (`src/lib/review.svelte.ts`).
- **Visible progress**: the route map, module rings, lesson pips, reading bar and done animation all show movement.

## Routes

- **Landing (`/`)**: for visitors who haven't started. A huge heading that says what the course is and for whom, the facts (lessons, minutes, tricks, no sign-up), one Start button, and the 13 module colours as a strip of links. Then a real lesson (`SHOWCASE` in `+page.server.ts`) taken apart into its pieces, each beside one sentence on why it's there; each piece rises in as it scrolls into view (CSS `view()` timeline), and the diagram and check card work. Then the route, the credits (every cited author, counted from lesson sources), and a closing Start. A reader with progress also gets a Continue link in space held for it.
- **Map (`/map`)**: one card with the next lesson, a Continue button, a review nudge when cards are due, and overall progress. Below it, the route: one station per module on a trail. Stations show a progress ring and one pip per lesson; the trail between finished modules is solid and colour-shifts from one module hue to the next, and draws itself as you scroll (CSS `view()` timeline). On wide screens stations alternate sides of a central trail. The route is `src/lib/Route.svelte`, shared with the landing page. The card names the date of the next review that isn't due yet, with "Add to calendar": an all-day `.ics` event with a morning alert, made in the browser (`src/lib/calendar.ts`). At the bottom, "Back up your progress" downloads every `earshot:*` key as one JSON file and loads one back, then reloads (`src/lib/backup.ts`).
- **Module (`/<module>`)**: giant module number in the module colour, summary, Start or Continue, lessons as steps with summary and reading time, and the signature diagram beside them (sticky on wide screens).
- **Lesson (`/<module>/<lesson>`)**: reading progress bar along the top (CSS `scroll()` timeline), module pips, lesson body with diagrams placed in it, Check yourself cards, sources, and a footer whose button marks the lesson done (with a check-draw animation), adds its cards to the deck and opens the next lesson. The reading column is centred. Its outline highlights the section being read: it sticks in the right gutter on wide screens and opens from a Contents button at the bottom right on narrower ones. ← and → move between lessons. A lesson with narration has a player (`src/lib/ListenBar.svelte`) that says it reads the page's own words, with play, back and forward 15 seconds, position, and speed (1, 1.25, 1.5, 2, 0.75x).
- **Reading rhythm**: each `##` topic reads as its own page, with close to a screen of space above it (`--space-topic` in `layout.css`). Paragraphs sit a blank line apart, and callouts, diagrams and code get more room than prose. A heading sits close to the text it introduces.
- **Review (`/review`)**: one card at a time with a progress bar. An optional "Type it first" field sits above Show answer; what the reader typed shows beside the answer and is never saved. While focus is in the card, Space reveals, 1 is "Not yet", 2 is "Got it"; focus moves to each new card. When nothing is due it says when cards come back and offers a practice round.
- **Tricks (`/tricks`)**: every cheap trick as a card bordered in its module's colour, filterable by module, with "Pick one for me". On wide screens the cards form a two-column masonry whose columns end level (`src/lib/balance.ts`), each column in course order.
- **Sources (`/sources`)**: every cited author, then every lesson's sources grouped by module (`src/lib/server/credits.ts` counts them for the landing page and footer).
- **Footer**: on every page. The course in one line, the credit count with a link to the sources, the modules, the pages, what agents read (skills, `llms.txt`, sitemap), and who made it: Mia, the 0rwx AI level, the GitHub repo and Svartz. A "Questions and ideas" link opens the repo's GitHub Discussions.
- **Lab (`/lab`)**: every diagram under any module colour, for building and checking diagrams. Not linked from the nav.

## Search and sharing

`src/lib/Seo.svelte` writes each page's title, description, canonical URL, Open Graph tags and structured data. The landing, modules, lessons, tricks and sources are indexable and listed in `/sitemap.xml`; the map, review and lab are personal or internal, so they're `noindex`. Title and H1 say the same thing. Each module and lesson links its Markdown copy (written by Svartz) with `<link rel="alternate" type="text/markdown">`; `/llms.txt` lists the agent skills and every lesson's copy. Indexable pages allow large image previews. Module and lesson pages mark up their visible trail as a `BreadcrumbList`; the landing page carries `WebSite`; each lesson is an `Article` (`og:type` article) with its reading time and the X posts it was rewritten from as `isBasedOn`. Mia, credited in the footer, is author and publisher. Course rich results were retired by Google in 2025, so there's no `Course` markup. The share image `static/og.png` is rendered from `research/tools/og.html`.

## Lesson anatomy

Enforced by `src/lib/server/build-course.spec.ts`: title, summary, TLDR first, a DO, exactly three CHECK cards, only diagrams that exist, and forms with questions. Callouts are tinted boxes with a thin border all round, never a side stripe, and render by kind: **TL;DR** (the lesson's idea in one sentence, then numbered key points on a rail), **Cheap trick** (highlighter yellow), **Watch out** (red), **Do it now** (green).

## Worksheets

Where a lesson asks the reader questions to answer, `> [!FORM] Title` with the questions as a list places a worksheet right there in the lesson (`src/lib/Worksheet.svelte`): one answer field per question, saved in the browser as the reader types (`src/lib/answers.ts`). Answers belong to the question, not the form: a later lesson that asks an earlier question again, word for word, shows the reader's answer with a link to where it was first asked, and editing it there edits it everywhere. That lets a later worksheet build on an earlier one. Forms with the same title are one sheet. **Download Markdown** saves the sheet so far as a `.md` file: this form's questions plus every answered question on the sheet. **Save as PDF** prints the same from a hidden frame. Both name the lessons the questions came from. **Check my work** gives feedback without accounts or a server: it copies a review prompt with the lesson's Markdown copy and the sheet so far, and links Claude and ChatGPT to paste it into.

## Diagrams

One Svelte component per file in `src/lib/diagrams/`, registered by file name. A lesson places one with `> [!DIAGRAM] name`; a module picks its signature one with `diagram:` in its `index.md`. Each is a `<figure class="diagram">` framed in the module accent, uses native controls, announces computed results politely, takes every fact from the lesson, and works from 320 to 720px wide. Shared pieces (`.diagram-chips`, `.diagram-chip`, `.diagram-output`) live in `layout.css`. Contract: `research/tools/diagrams-brief.md`.

## Type

Atkinson Hyperlegible Next (variable) for text and Atkinson Hyperlegible Mono for code, chosen for legibility. Base size 18px, line height 1.65, 40rem measure. Headings are heavy (750 to 800) and tight so structure reads at a glance. Module numbers are not zero-padded because the font's slashed zero reads as Ø at display size.

Readers set their own text through the "Aa" button beside the theme toggle (`src/lib/ReaderSettings.svelte`): text size 100, 115 or 130%; spacing Normal or Roomy (letter and word spacing together, never letter spacing alone, plus wider paragraph gaps); font Atkinson Hyperlegible, Lexend or System. Fonts are named, never ranked: the best one differs per reader. The choices are `data-text-size`, `data-spacing` and `data-font` on `<html>`, applied before first paint by `app.html` and read by custom properties in `layout.css` (`--text-scale`, `--font-reader`, `--space-paragraph`). Every page fits 320px wide at 130% and Roomy; icon buttons are sized in px so only the words grow.

## Colour

Role tokens in `src/routes/layout.css`, exposed to Tailwind through `@theme inline`:

| Token | Role |
| --- | --- |
| `paper`, `surface`, `ink`, `muted`, `line` | Page, raised surface, text, secondary text, rules |
| `accent`, `accent-ink`, `accent-soft`, `accent-line` | The current module's colour: actions, progress, diagram frames |
| `go`, `go-ink` | Course-level action when no module applies |
| `trick-*`, `risk-*`, `do-*` | Callout kinds |
| `focus` | Focus ring |
| `field-line` | Text field edges, at least 3:1 against what's behind them |

Each module has a hue from a hand-picked walk round the colour wheel that skips olive yellows (`MODULE_HUES` in `src/lib/server/course.ts`). Any element with `data-hue style="--hue: N"` recomputes the accent roles in OKLCH from that hue, in light and dark. Light is warm paper. Every colour token is `light-dark(light, dark)`, so the page follows the system setting until the reader uses the sun/moon button in the header; that choice is saved (`earshot:theme`) and applied before first paint by a small script in `app.html`, which sets `data-theme` on `<html>` and with it `color-scheme`.

## Motion

Durations and easings are the transitions.dev motion tokens in `layout.css`. Scroll-linked effects (reading bar, trail drawing, diagram entrance) use CSS scroll and view timelines, with no JavaScript per frame. Under reduced motion every animation is off and the content is unchanged; the reading bar stays because it reports position rather than moving on its own.

## Storage

Done lessons (`earshot:done`), the review deck (`earshot:review`), worksheet answers (`earshot:answers:<question>`), the theme (`earshot:theme`), reading settings (`earshot:reader`) and playback speed (`earshot:speed`) live in `localStorage`, per browser. When storage is blocked, they last for the visit. The backup on `/map` carries all of them to another browser.
