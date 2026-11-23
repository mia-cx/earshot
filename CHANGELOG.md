# earshot

## 0.1.4

### Patch Changes

- 142592c: Worksheets have a Check my work button: it copies the lesson and your answers as a review prompt to paste into Claude or ChatGPT. The footer links to GitHub Discussions for questions and ideas.
- 68511d1: The AI agents lessons now start from the research behind them, from Anthropic's and OpenAI's agent guides to the BCG field study and OWASP's agent security list, and say plainly where the original posts overreach.
- 1f1317e: The landing page, footer and sources page say what the course stands on: the studies, books, guides and essays each lesson cites, and the posts that apply them.
- 582a84b: The Backlinks and AI search lessons now open with the research behind each idea, from Google's own documentation and the PageRank paper to peer-reviewed studies of what AI search cites, and they correct the claims that research disputes.
- e4a162f: The "What marketing is" lessons now open with the research behind each idea (Sharp, Binet and Field, Godin, Dunford, Christensen, Fitzpatrick, Rumelt, McClure) and correct claims the evidence doesn't support, such as spending most of your time on retention.
- cc35ddb: The Keep and convert and Stay sharp lessons now open with the research behind each trick, correct the claims the evidence disputes, and the reading list adds eight classic marketing books.
- 37504ae: The Launching and Outreach lessons now start from the research behind each tactic, from Paul Graham, *Traction*, Cialdini, Berger and Milkman, and platform rules, and correct the claims that research disputes.
- a89956a: The search engine lessons now open with what Google, Bing and the research say, and correct the tips that the sources contradict.
- be11618: The writing and content lessons now open with the research behind each tip, from Nielsen Norman Group, Caples, Fogg, Cialdini, Binet and Field, Pulizzi and others, and correct the claims that research doesn't support.
- c713bd9: The X and Video lessons now start from the research and X's own ranking code, and correct the claims that didn't hold up, like reading one mute as cancelling 89 likes.

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
