---
title: Plan an AI video before you pay for it
order: 3
description: Set up a director agent and lock in a shootable story and shot list before generating images.
---

> [!TLDR] Catch errors at the cheapest stage, and have a separate reviewer check the work.
> - Catch errors in text first, then in images, then in video. Each stage costs more than the one before.
> - One coding agent directs, an image model draws, a video model animates. A separate agent reviews. You approve direction and spend.
> - Write a story AI can shoot: a one-sentence point, the best image first, episodic shots, no known failure shots.
> - Storyboard every shot with angle, motion and a colour table, then check the sketches in greyscale.

## Fix errors where they're cheapest

Editing a prompt is free and regenerating an image is cheap, while video is billed per second. Put **every check as early as possible**.

Software engineers know this idea from Barry Boehm and Victor Basili, who reported that [a bug caught after delivery often costs 100 times more to fix than one caught in design](https://www.cs.umd.edu/projects/SoftEng/ESEG/papers/82.78.pdf), though only about 5 times more in small projects. Tim Menzies and colleagues later [checked 171 software projects and found no consistent effect](https://arxiv.org/abs/1609.04886). In AI video the rule holds for a simpler reason. Every rerolled second hits your bill again.

Who checks matters just as much. Jie Huang and colleagues found that [language models struggle to correct their own reasoning without outside feedback](https://arxiv.org/abs/2310.01798), and sometimes get worse. Boehm and Basili also report that peer review catches a median of about 60% of defects. That's why a separate agent, with no access to your chat, reviews the work.

The workflow here and in the next lesson comes from @EianLu, who credits these rules for a very low reroll rate (his own experience):

- No images until you approve the story.
- No final shots until you approve the style.
- A separate review agent approves prompts and frames before generating any video.
- Fix a bad clip in code before regenerating it.
- Save every version as a new file and never overwrite.

The source links to @EianLu's Chinese originals. The prompts below are English translations.

> [!DIAGRAM] cost-ladder

## Put one agent in the director's chair

You talk to one coding agent only. It calls the image and video models for you.

| Role | Does |
| --- | --- |
| You | choose direction, approve style, approve spend; watch motion, listen to sound |
| Claude Code (director) | story, storyboard, all prompts, checks every image and clip, post-production in code |
| Codex (illustrator) | style sheets, sample frames, first and last frame of every shot |
| Seedance (animator) | turns first and last frames into a few seconds of video |

Codex alone can do the whole job. The author prefers Claude's taste for directing.

> [!TRICK] Set up the director
> 1. Install ffmpeg and Python. If Claude Code and Codex are both installed, tell Claude to call Codex for images.
> 2. For Seedance, register on Volcengine (火山引擎), get an Ark API key, and have Claude write the call script.
> 3. Send this before starting. Prices are the author's figures at the time of writing; your bill is the real number.
>
> ```
> You are the director of this short film, responsible end to end; I talk only to you.
> Before starting, do two things:
> 1. Ask me: length, aspect ratio, total budget, whether to add music and subtitles.
> 2. Check that Codex, ffmpeg, Python and ARK_API_KEY work; tell me what's missing.
>
> Keep all files in a new project folder.
>
> Roles:
> - You: write the story and storyboard, write all prompts, call the other models, extract and zoom into frames to check every image and clip, do post-production in code with ffmpeg and Python.
> - Codex (illustrator): draws style sheets, sample frames and the first/last frame of every shot. You don't draw yourself.
>
> If you are Codex, use your own image generation tool.
>
> - Seedance (animator): turns first/last frames into a few seconds of video.
>
> - Me: choose direction, approve style, approve spend, watch motion, listen to sound.
>
> Calling Codex:
> codex exec --skip-git-repo-check -s read-only -i reference.png - < prompt.txt
> Start the prompt with: Use your image generation tool to create exactly ONE image. Do not run shell commands.
> Images land in ~/.codex/generated_images/<session id from the log>/.
>
> Calling Seedance:
> POST https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks
> The key is in env var ARK_API_KEY; never print it. Check the Volcengine Ark docs for request format.
> Model: doubao-seedance-2-5-260628 (720p ~¥1.5/s) or doubao-seedance-2-0-mini-260615 (720p ~¥0.5/s); the bill is authoritative.
>
> Core principle: stop errors before money is spent. Errors findable in text don't reach images; errors findable in images don't reach video.
>
> Rules:
> 1. No images before I approve the story.
> 2. No final shots before I approve the style.
> 3. Before submitting video generation, open a separate agent to review every detail of prompts and images; it only finds faults, never edits files. After it passes, quote the cost; submit only with my approval.
> 4. If a clip has a problem, first try fixing it in code; reshoot only that shot if code can't fix it.
> 5. Save new versions as new files; never overwrite or delete old ones.
> 6. You can't see real motion or hear sound. Tell me explicitly about anything you haven't seen or heard.
> 7. Don't top up or buy credits. If the API reports insufficient balance, stop and rough-cut the clips you have for me.
> ```

## Write a story the model can shoot

A shootable AI short needs a one-sentence point, its most striking image first, and turns that follow real-world logic. Write every gag in three beats: the problem, how the protagonist solves it, and staggered bystander reactions like real people.

**Prefer episodic stories**, where no shot has to match the one before. Continuous stories break the fastest. Once the story is down, hand it to a fresh agent that has never seen your chat.

Write around what video models get wrong. In 2024, OpenAI said its first Sora model [may struggle with the physics of a complex scene, with cause and effect, and with telling left from right](https://openai.com/index/sora/). The longer failure list in the prompt below comes from @EianLu's own failed shots.

> [!TRICK] Develop the story, then have it reviewed
> Story prompt:
>
> ```
> The film I want: [one sentence, or my rough plot]. Length: [seconds].
> Song: [title, length, BPM; delete if none].
> Reference film: [if any; otherwise delete].
>
> First help me develop this idea into a complete story. Ask me about anything unclear; we'll discuss, and wait for my approval before writing further.
> Prefer an episodic structure, because shots needn't match continuity, which is safest. Continuous structure breaks most easily; don't use it unless I ask.
>
> Once the story is set, expand it shot by shot, meeting these requirements:
> 1. Real-world logic. Question every turn: why does this happen? Where does the object come from? Can they reach it? Would it really happen?
> 2. Sayable in one sentence. Write that sentence first; if you can't, the story needs work.
> 3. Hook at the start. Put the most striking image first and state at which second it appears.
> 4. Bystander reactions feel human. Write every gag or turn in 3 beats: problem → how the protagonist solves it → how bystanders react. Reactions are staggered; several people never do the same action in the same second. Details are real, e.g. people lean back when surprised.
> 5. Shootable by AI. Avoid these weaknesses: people crossing, hands holding small objects, text, mirrors and reflections, asymmetric features, lighting changes within one shot, one person doing three actions in a row, top-down shots hiding faces, too many extras.
>
> With a song, put turns on the chorus and key actions on the downbeat.
> ```
>
> Review prompt, for a fresh agent given only the shot-by-shot story:
>
> ```
> This is the shot-by-shot story of a short film. You're seeing it for the first time; only find faults, don't edit files.
> 1. Read in shot order and first write the story as you understood it.
> 2. Question every turn in order: why does it happen? Where does the object come from? Can they reach it? Would it really happen?
> 3. Can the point be said in one sentence?
> 4. Does the opening hook? Is the most striking image up front?
> 5. Do bystander reactions feel human? Are they staggered?
> 6. Which shots are AI video models likely to get wrong? (people crossing, hands holding small objects, text, mirrors and reflections, asymmetric features, lighting change within a shot, one person doing three actions, top-down shots hiding faces, too many extras)
> For each: shot, problem, suggested fix. Mark uncertain ones "maybe". End with "pass" or "fail".
> ```

## Storyboard angle, motion and colour

Shot design and colour decide quality more than plot does. Give each shot a different angle from the last, something moving in frame, and a reason for any camera move. Lock the palette before drawing the first image, then check your sketches in greyscale. If people blend into the background, your contrast is too low.

The 38% / 62% rule for heads in the prompt is @EianLu's. Stephen Palmer's lab at Berkeley found that viewers [prefer a single front-facing subject at the centre](https://palmerlab.berkeley.edu/pdf/PalmerGardner&Wickens-1.pdf), and a sideways-facing subject placed so it faces into the frame. Save those off-centre lines for people in profile, looking into the space you leave them.

> [!TRICK] Turn the story into a shot list
> If you have a reference film, the agent studies it frame by frame first. Otherwise it designs to the rules in the prompt.
>
> ```
> Turn the final story into a shot list. One row per shot: time in film (by bar if there's a song), generation seconds (film duration rounded up, leave ~0.5 s extra), shot size, camera position, camera move, who goes where (screen left/right), which expression drives it, what moves in the shot, how it transitions to the next.
>
> If there's a reference film, first study it frame by frame, measure camera positions and entry/exit proportions, and imitate. Without one, design to the rules below.
>
> Rules:
> 1. Change angle every shot. Eye-level frontal at most twice in the film; otherwise high, low, from behind, over-shoulder, through objects.
> 2. Something is always moving. Most shots have a person or thing entering or leaving frame. If people don't move, move something else, e.g. a drifting sheet of paper or a passer-by behind. Static-camera shots especially need people moving, e.g. from far to near.
> 3. Don't run several shots of the same size in a row; alternate full, medium and close-up.
> 4. State what moves in each shot: camera, focus, light, something passing in front of the lens, or a small gesture; at least one. Don't move all the time either: move where it matters, stay still where it matters.
> 5. Camera moves need a reason: follow something, slowly push in to a close-up, or slowly pull out from close.
> 6. Every frame should look good as a still. Centre a single subject facing the camera. Put a subject in profile at roughly 38% or 62% of frame width, with space in the direction they face.
>
> Design the colour separately, before the first image. The palette I want: [my preference; if unsure give me options].
> List each scene's colours in a separate colour table.
>
> Finally, use code to draw a 1920×1080 colour-block sketch per shot, marking the 38% and 62% lines and the main objects, tiled into one sheet for my approval. Then view the sketches in black and white; if people and background aren't distinguishable, contrast is too low, so rework the palette.
> ```

Once the shot list and palette are approved, move on to *Generate AI shots without rerolls*.

> [!FORM] Your film
> 1. The film you want, about your product, in one sentence.
> 2. Song: title, length and BPM, or none.
> 3. Reference film, if any.

> [!DO] Get a story for a 15-second film
> Fill in your film above, then copy your answers into the first three lines of the story prompt, with 15 seconds as the length. Paste it into any chat model, answer its questions, and save the shot-by-shot story it returns as `story.md`.

> [!CHECK] In an AI video setup with Claude Code, Codex and Seedance, what does each one do?
> Claude Code directs: story, prompts, checks and post-production. Codex draws the frames, and Seedance animates between first and last frames, while you approve direction and spend.

> [!CHECK] Your AI film story has one continuous scene where people cross paths holding small objects. What do you change?
> Make it episodic, so no shot has to match the one before, and cut shots AI gets wrong, like people crossing and hands holding small objects.

> [!CHECK] In AI video, why approve the story before any image, and images before any video?
> Each stage costs more than the last: prompt edits are free, images are cheap, video is billed per second. Catch every error at the cheapest stage.

## Sources

- [Barry Boehm and Victor R. Basili, *Software Defect Reduction Top 10 List* (2001)](https://www.cs.umd.edu/projects/SoftEng/ESEG/papers/82.78.pdf)
- [Tim Menzies et al., *Are Delayed Issues Harder to Resolve?* (2016)](https://arxiv.org/abs/1609.04886)
- [Jie Huang et al., *Large Language Models Cannot Self-Correct Reasoning Yet* (2024)](https://arxiv.org/abs/2310.01798)
- [OpenAI: Sora (2024)](https://openai.com/index/sora/)
- [Stephen E. Palmer, Jonathan S. Gardner and Thomas D. Wickens, *Aesthetic Issues in Spatial Composition* (2008)](https://palmerlab.berkeley.edu/pdf/PalmerGardner&Wickens-1.pdf)
- [@EianLu: AI video workflow with Claude Code, Codex and Seedance (original in Chinese)](https://x.com/EianLu/status/2118317430665613741)
