# earshot

## 0.1.3

### Patch Changes

- 55a10f8: Each release tells Bing and the other IndexNow search engines that its pages changed, so they recrawl them without waiting for their own schedule.
- 03e2dda: The first page you open paints sooner: its styles arrive inside the page instead of as separate files.

## 0.1.2

### Patch Changes

- 038e385: Earshot's address is seo.mia.cx again. earshot.mia.cx shows the same pages, and search engines are pointed to seo.mia.cx.
- fbe7487: Lessons tell search engines and AI assistants what they are: an article with its reading time and the X posts it was rewritten from. Shared links get large image previews, and phone browsers tint their toolbar to match the page.

## 0.1.1

### Patch Changes

- 9c71359: Earshot lives at earshot.mia.cx. Links to seo.mia.cx redirect to the same page there.

## 0.1.0

### Minor Changes

- 4383480: First public release on seo.mia.cx: 63 lessons across 13 modules, a landing page, the gtm, seo and marketing-agents agent skills at `/.well-known/agent-skills/`, and a Markdown copy of every lesson for agents.

### Patch Changes

- 5f525cf: Earshot has its own icon: an ear in a rounded tile, in browser tabs, bookmarks and on home screens.
- 2a0bf30: Keep the header, page content and Review footer from jumping as fonts and saved cards load.
- 086fb9b: Add a styled, noindex error page with a page title and links to lesson 1 and the map.
- 64b568c: The technical SEO checklist prompt asks before removing any noindex tag, adds structured data only for what a page shows, and no longer promises page one by Monday. The AI citation routine no longer suggests schema or `llms.txt` as a citation lever.
