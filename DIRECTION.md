# Direction

## What it is

Earshot is a marketing and growth course for builders learning it from zero. Each lesson starts from what marketing research and official documentation show, then applies it through posts practitioners shared for free on X. It keeps both durable principles and cheap, specific tricks, and it is built for readers with ADHD: short lessons, the short version first, one small action per lesson, visible progress.

## How the course is made

1. `research/tools/links.txt` lists the source posts. `research/tools/scrape.mjs` fetches each one through the fxtwitter API (threads, long-form articles and quoted posts) into `research/sources/`.
2. Five analysts extracted knowledge units into `research/analysis/`, each tagged durable or trick, with evidence and risk.
3. `research/tools/course-outline.md` deduplicates the units and orders them into 13 modules. Every unit lives in exactly one lesson.
4. Writers followed `research/tools/writing-brief.md` to produce the lessons in `content/`.

5. A research pass grounded every module in the literature: `research/literature/<module>.md` lists the books, studies and official docs behind each lesson and checks every claim in it as confirmed, disputed or unverified. Lessons open with the principle and its evidence; the posts' tricks follow as ways to apply it.

To add sources: append to `links.txt`, scrape, analyse into a new batch file, place the units in the outline, then write or revise the affected lessons and check their claims against the module's literature notes. Text inside images on public posts is transcribed by hand into `research/sources/`. Newsletters are cited, never copied: their source file keeps the link and the points the course uses, so readers subscribe for the full piece.

## Decisions

- SvelteKit on Cloudflare Workers, every page prerendered. No accounts or database: progress lives in the reader's browser. The Worker leaves room for server features later.
- `/` is a landing page for visitors; the reader's progress map is `/map`. Marketing pages follow the seo skills: one intent per page, title matching the H1, canonical, sitemap, robots.txt open to search and AI crawlers.
- Svartz is the index, the app is the host: `content/` is a Svartz vault that indexes the lessons and writes a Markdown copy of each for agents, and the app renders every page with its own design. A full Svartz theme was ruled out: its three-column shell with a file explorer works against "start the next thing without deciding".
- Agents get the course two ways: the gtm, seo and marketing-agents skills at `/.well-known/agent-skills/` (installable with `npx skills add <site>`), and `/llms.txt` with every lesson's Markdown copy. Both stay out of search results (`_headers`); every page except error pages is indexable.
- Every page describes Earshot as a schema.org `Course` in JSON-LD (`src/lib/schema.ts`). The curriculum goes only where the page shows it, per Google's rule against marking up content readers can't see: every module and lesson on the home page and the map, a module's lessons on its page. No course carousel: Google shows it only for instructor-led courses with a student roster.
- Lessons are plain markdown with GitHub-style callouts (`[!TLDR]`, `[!TRICK]`, `[!RISK]`, `[!DO]`), so they read fine on GitHub too.
- Research leads, posts apply it. Where the research disputes a post, the lesson says so. Unverified numbers stay in, labelled as one person's claim. Risky tricks stay in with a concrete Watch out note; the reader decides.
- Sources are credited and linked on every lesson: research first, then the posts.
- `/resources` lists the tools the lessons use (`src/lib/server/tools.ts`), each tied to the lesson that teaches it, with a note when its recommender sells it or its claims are the vendor's own. Long lists of launch sites, directories and local listings stay in their lessons.
- Goal worksheets (`/worksheets/<slug>`, listed on the landing page) serve visitors who come for one job, like positioning or finding their audience. Each gathers questions the lessons already ask, so answers are shared, and fills a fixed, hand-written prompt that hands them to one of the skills. No AI writes the prompt.
- Feedback without accounts: "Check my work" hands the lesson and the reader's answers to their own AI assistant. A small model running in the browser over WebGPU could give that feedback on the page later; until then the reader's assistant does it. Questions and ideas go to GitHub Discussions.

## State

Live on seo.mia.cx: 65 lessons (166 tricks) across 13 modules, each grounded in the research it cites (237 studies, books, guides and essays) and applied through free posts on X and one newsletter, lessons.sh. Public repo `mia-cx/earshot`. seo.mia.cx is the canonical address and the one we advertise: Google already lists unrelated AI-made pages for "earshot", so the name alone won't find the course. earshot.mia.cx serves the same pages without a redirect; their canonical URLs point to seo.mia.cx. Every push to main deploys the `earshot-staging` Worker to staging.seo.mia.cx; merging a Changesets release pull request deploys the `earshot` Worker to both production hostnames and tags the release.

seo.mia.cx is in Google Search Console with its sitemap (91 pages) and in Bing Webmaster Tools, and each release sends the pages it changed to IndexNow. Cloudflare allows every crawler, AI crawlers included.

Next: watch Search Console and Bing until every lesson is indexed.
