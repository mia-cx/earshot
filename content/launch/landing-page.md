---
title: Make your landing page look designed on purpose
order: 3
description: Pick a style before any code, try five hero layouts, and add one signature touch.
---

> [!TLDR]
> - Visitors judge how a page looks in a fraction of a second, and simple pages with a familiar layout make the best first impression.
> - Choose the audience, style and palette before you prompt a coding agent, or you get the average of every template.
> - Sketch five different hero layouts side by side, then combine their best parts.
> - Keep the page familiar and quiet, and add one signature touch that fits what you sell.

## First impressions form before anyone reads

Alexandre Tuch and colleagues [showed people screenshots of 119 websites](https://doi.org/10.1016/j.ijhcs.2012.06.003) for as little as 17 milliseconds. Even that was enough for two things to shape how attractive a page looked: its visual complexity, and how closely it matched what people expect a website to look like. **Pages with low complexity and a familiar layout were judged most appealing.**

So "stand out" doesn't mean "look strange". Keep the layout familiar and the page simple, and make one thing yours.

## Pick the style before the code

Leo (@leodev), who launches developer tools and writes the free weekly letter [lessons.sh](https://lessons.sh), sees most developer landing pages looking the same now: ask a coding agent for a landing page and you get the average of every template. **The look is the one part you can't leave to the agent's defaults.**

Start with the audience. A dev tool, a design tool and an enterprise product shouldn't look like the same page. Then pick the style, colours and fonts that fit. His own letter uses a warm white page, plain lowercase type and black ink. gradients.sh sells live GPU gradients, so its hero is a dark canvas where a moving gradient carries the weight.

> [!TRICK] Lock the look in the prompt
> 1. Name the audience in one line: dev tool, design tool, enterprise, or yours.
> 2. Pick a palette and fonts that fit it.
> 3. Put both in every prompt, and tell the agent to use only those colours and fonts.
>
> Without this, the agent picks colours as it goes and every component gets its own shade of grey. If you can't name your audience and palette yet, don't start coding.

## Sketch five heroes before you build one

Code feels expensive to throw away, so the first layout tends to get polished instead of replaced. Steven Dow and colleagues at Stanford [had novices design web ads](https://hci.stanford.edu/publications/2010/parallel-prototyping/ParallelPrototyping2010.pdf) either several at a time or one after another with feedback after each. **The ads made in parallel got more clicks and better expert ratings, and were more varied.**

> [!TRICK] Five heroes side by side
> Leo uses Paper (paper.design), a design canvas a coding agent can draw on; any canvas, or pen and paper, works. Ask for five hero layouts in your palette, each with a different structure:
> 1. **Split:** headline and install command on the left, a live product preview on the right.
> 2. **Centred:** a short headline, one line of value, a copyable command, and a wide product frame below.
> 3. **Bento grid:** the headline in one cell, small demos in the cells around it.
> 4. **Full-bleed:** your visual signature runs edge to edge behind one high-contrast card.
> 5. **Tool first:** a minimal header, then the tool, calculator or table straight away.
>
> None has to be right on its own. Take the best headline from one, the best preview from another and the cleanest navigation from a third, combine them in one frame, then have the agent build that frame in code.

## Add one signature touch that fits

Have the agent build the core 70 to 80% first: type, copy, spacing and a working mobile view. That page is readable, but easy to forget. Then add **one signature touch that matches what you sell**, and keep everything else quiet so it doesn't compete. A retro dither shader on an accounting dashboard would look silly.

> [!TRICK] Match the signature to the product
> Leo's examples:
>
> | Product | What buyers care about | Signature that fits |
> | --- | --- | --- |
> | Design tool (gradients.sh) | Visual quality | Live GPU gradients in the hero |
> | Dev tool (dithercn.dev) | Craft and technical depth | The dither engine running before you install anything |
> | SDK (email-sdk.dev) | Simplicity | An engraved carrier pigeon beside plain developer type |
> | Benchmark (aisandboxbench.com) | Hard numbers | The results themselves, at the top |

## Spend motion on the hero only

Coding agents add fade-ins, staggered reveals and springy transitions everywhere unless you tell them not to. On a landing page, Leo allows one signature animation in the hero and short hover states on buttons. He bans slow text fade-ins that keep people from reading the headline.

Page Laubheimer at NN/g [puts most interface animations at 100 to 500 ms](https://www.nngroup.com/articles/animation-duration/), and warns that at 500 ms "animations start to feel like a real drag". Honour the visitor's reduce-motion setting too.

> [!FORM] Your landing page brief
> 1. Who is the page for? Dev tool, design tool, enterprise, or something else.
> 2. Your palette and fonts.
> 3. Which of the five hero layouts fits best, and which part would you borrow from another?
> 4. Your one signature touch, and why it fits what you sell.

> [!DO] Write your landing page brief
> Fill in your landing page brief above, then download it. Paste it into the prompt the next time you ask an agent for a page.

> [!CHECK] According to Tuch and colleagues, what kind of web page makes the best first impression?
> One with low visual complexity and a familiar layout. People judged it within a fraction of a second, before reading anything.

> [!CHECK] Why sketch five hero layouts before you build one?
> In Dow and colleagues' study, designs made several at a time got more clicks and better expert ratings than designs refined one after another. Building from your first idea locks you into polishing it.

> [!CHECK] How many signature touches should a landing page have?
> One, matched to what you sell. The rest of the page stays quiet so it doesn't compete.

## Sources

- [Alexandre Tuch et al., *The role of visual complexity and prototypicality regarding first impression of websites* (2012)](https://doi.org/10.1016/j.ijhcs.2012.06.003)
- [Steven Dow et al., *Parallel Prototyping Leads to Better Design Results, More Divergence, and Increased Self-Efficacy* (2010)](https://hci.stanford.edu/publications/2010/parallel-prototyping/ParallelPrototyping2010.pdf)
- [Page Laubheimer, *Executing UX Animations: Duration and Motion Characteristics* (2020)](https://www.nngroup.com/articles/animation-duration/)
- [@leodev: lessons.sh #02, style first, five heroes and one signature touch](https://lessons.sh)
