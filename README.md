# Earshot

<a href="https://0rwx.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://0rwx.com/static/AI-W-dark.svg">
    <img alt="AI:W" src="https://0rwx.com/static/AI-W-light.svg" height="48">
  </picture>
</a>

A marketing and growth course for builders, learned from zero. Each lesson starts from what marketing research and official documentation show, then applies it through the best posts practitioners shared for free on X, with credit and links on every lesson. `research/literature/` holds the sources and claim checks behind each module.

Built for ADHD brains: every lesson starts with the short version, keeps sections short, marks cheap tricks and risks, and ends with one thing to do now. Your progress stays in your browser.

## Run it

```sh
pnpm install
pnpm dev
```

`pnpm dev` and `pnpm build` run through [Svartz](https://github.com/mia-cx/svartz), which indexes the lessons in `content/` as a vault (`svartz.config.ts`) and writes a Markdown copy of every lesson beside its page. The app renders every page itself. `pnpm test` checks every lesson has the parts the reader relies on. `pnpm lint` runs Biome and svelte-check.

Two workarounds keep Svartz 2.3 working with SvelteKit 3, until Svartz supports it: `patches/svartz@2.3.0.patch` makes `svartz build` build the server too, and `vite.config.ts` imports the vault's index alone instead of Svartz's page runtime.

## Agent skills

The course's methods ship as agent skills from [mia-cx/skills](https://github.com/mia-cx/skills): `gtm`, `seo` and `marketing-agents` with their branches. `pnpm skills:sync` copies them into `static/.well-known/agent-skills/` with an `index.json`, so `npx skills add <site>` installs them and every `SKILL.md` is a plain URL. Links to skills the site doesn't serve point at GitHub. `/llms.txt` lists the skills and every lesson for agents.

## Deploy to Cloudflare

The app runs on Cloudflare Workers through `@sveltejs/adapter-cloudflare`. Every page is prerendered into static assets, so the Worker only answers requests no page matches.

GitHub Actions deploys it (`.github/workflows/release.yml`):

- Every push to `main` deploys to [staging.seo.mia.cx](https://staging.seo.mia.cx), which answers every request with `X-Robots-Tag: noindex`, and opens or updates the Changesets release pull request.
- Merging the release pull request bumps the version; that commit deploys to [seo.mia.cx](https://seo.mia.cx) and becomes a tagged GitHub release. [earshot.mia.cx](https://earshot.mia.cx) serves the same pages, with canonical URLs on seo.mia.cx.

Describe a change for the changelog with `pnpm changeset`. The Cloudflare token and account are the mia-cx organisation's `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

`SITE_URL` is the public origin. Canonical URLs, the sitemap, robots.txt and the share image use it, and the build fails without it. After a production deploy, every sitemap URL goes to IndexNow; the key is the name and content of `static/<key>.txt`. To build and serve locally: `SITE_URL=http://localhost:8787 pnpm build && pnpm exec wrangler dev`.

## Narration

Lessons are read aloud in Mia's cloned ElevenLabs voice. `scripts/narrate.ts` reads the prerendered lessons and voices the body section by section: a heading and the paragraphs, lists and subheadings under it, up to the next callout, diagram or `##`, recorded in one request so it plays with no seams (`src/lib/narration.ts` decides what is read). The TL;DR is read as a section of its own; other callouts, diagrams, worksheets, quotes, tables, code and Sources stay silent. Each recording and its word timings live in the `earshot-narration` R2 bucket under a hash of exactly the text it reads, its voice and its model, so editing a paragraph re-records only its section, and changed text never plays stale audio. `/narration/…` serves them; every environment shares the bucket.

A run generates nothing when it would spend more than its budget (25,000 characters by default) or more than the ElevenLabs account has left. By default it keeps lessons that already have narration up to date; name a lesson with `--only` to voice it, or pass `--all` for the whole course (about 180,000 characters; one lesson is 1,000 to 4,000).

Locally:

```sh
cp .env.example .env                          # the ElevenLabs key and voice ID
pnpm exec wrangler login                      # R2 access, and the dev server's remote bucket
SITE_URL=https://seo.mia.cx pnpm build
pnpm narrate --only foundations/positioning --dry-run   # what it would voice, and the cost
pnpm narrate --only foundations/positioning             # voice one lesson
pnpm dev                                      # plays narration from the real bucket
```

Only `pnpm dev` binds the bucket remotely; builds and tests use an empty local one and need no login.

In CI, the Narration workflow (`.github/workflows/narration.yml`) runs on every push to `main` and keeps narrated lessons current. Run it by hand to voice new lessons or the whole course, with a bigger budget. It reads the `ELEVENLABS_API_KEY` secret, the `ELEVENLABS_VOICE_ID` variable and the organisation's `CLOUDFLARE_API_TOKEN`.

## Write a lesson

Lessons live in `content/<module>/<lesson>.md`, and the folder and file names are the URL. `order` sets the sequence. Each module folder has an `index.md` with its title, order, description and signature `diagram`. The folder opens as an Obsidian vault.

```md
---
title: Say what you are, for whom, against what
order: 2
description: Write a positioning doc you can test today.
---

> [!TLDR]
> - The whole lesson in a few bullets.

## A short section

> [!TRICK] A specific tactic
> The numbers, tools and prompt.

> [!RISK] What can go wrong
> The downside and how to avoid it.

> [!FORM] Your positioning doc
> 1. A question the reader answers on the page.
> 2. Each list item becomes an answer field; answers download as Markdown or PDF.
> 3. An earlier lesson's question, repeated word for word, shows the reader's answer to refine.

> [!DO] One small action
> Something you can finish in 20 minutes.

## Sources

- [@handle: topic](https://x.com/handle/status/123)
```

How the course was researched and assembled is in [DIRECTION.md](DIRECTION.md). Visual decisions are in [DESIGN.md](DESIGN.md).
