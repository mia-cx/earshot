---
title: Reuse formats that already work
order: 2
description: Find formats that beat their creator's usual numbers and rebuild them for you.
---

> [!TLDR] Platforms rank videos on viewer response, so reuse formats viewers already respond to.
> - A format that broke out has already earned the watch time and shares platforms rank on. Copy the format, never the content.
> - Judge a video against its creator's usual views, not raw numbers.
> - Run three bots: one tears down a viral video, one turns a voice note into 3 scripts, one learns from your own results every week.

## Copy the format, never the content

Platforms don't rank formats directly. They rank viewer behaviour. Cristos Goodrow, YouTube's VP of Engineering, writes that its recommender reads [clicks, watch time, survey answers, shares, likes and dislikes](https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/), and TikTok [describes similar signals](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you).

A breakout format has already earned those signals, and viewers know how to follow it. Rolf Reber and colleagues reviewed evidence that [people like familiar, easy-to-process forms more](https://pages.ucsd.edu/~pwinkiel/abs_beauty-PSPR-2004.htm). The core skill is **spotting which proven format to reuse, and when**. Inventing one from scratch is the slow road.

@tuanle (who claims 4B+ views) says he spent two years trying to be original before a 4M-view iPhone video changed his mind. His examples:

- The "Hey chef, can you make me something with this?" format.
- Stan copying the "how much do you pay for rent" office-tour format.
- Buldak reaching 900M views with proven formats.
- MrBeast starting every video from the title and thumbnail.

Reusing a format means taking its structure: the opening, the beats and the framing. The subject, words, footage and claims stay yours. Lifting someone's script or clips is plain copying and gives you nothing you own.

Only the chapter list of tuanle's video was available, so the reasoning behind these examples is unverified. He also says no views, no saves and no shares point to three different problems, though the source doesn't include his fixes.

## Look for outliers, not big numbers

A big creator's views mostly reflect their audience size. The useful signal is the **outlier**: a video that did far better than that creator's usual views or follower count. The gap suggests the format did some of the work. It doesn't prove it: luck, timing and topic play a part too, so treat outliers as formats worth testing, not proof they work.

The platforms judge a video against its own baseline too. YouTube's [retention report](https://support.google.com/youtube/answer/9314415) compares a video's retention curve with your own 10 most recent videos of similar length. TikTok says follower count and past hits aren't direct ranking factors, though a bigger following can still bring more views.

1. Shortlist creators under about 100,000 followers who have several breakouts.
2. For each one, scroll their last 20 videos and note their usual views.
3. Mark any video far above that. One outlier can be luck. A format that broke out twice is a pattern.

Their formats are the ones most likely to work for a small account like yours.

## Hand the repeat work to three bots

The prompts below come from @dsqjaffa, who co-founded Virlo, a paid database of viral short-form videos. They call Virlo for data, but any model works if you give it the transcript and comments yourself.

The bots read and write a shared `social/` folder. Start with `social/brief.md`: what you sell, who buys, claims you must never make, and your goal. *Build a social research team* covers the full folder and the other bots.

> [!TRICK] Teardown bot: rebuild any viral video
> Send it a video link. It returns the structure and 5 hooks for your version.
>
> ```
> JOB
> Break down any video link I send so I can reuse the
> structure with my own words.
>
> STEPS
> - Read social/brief.md.
> - On Virlo, get how it compares with the creator's recent
>   videos, its transcript, top comments and current numbers.
>   Instagram has no transcript, so use the caption and
>   comments there.
>
> SEND ME
> - First line, word for word.
> - Each beat in order.
> - What viewers really came for.
> - What commenters keep asking.
> - What to keep and swap for my business.
> - 5 hooks for my version, each from a different angle.
> - Claims inside the video I should verify.
>
> Mark why-it-worked as opinion, since the data only shows
> that it did. Save the structure to social/templates.md.
> ```

> [!TRICK] Pipeline bot: voice note in, 3 scripts out
> Record a few minutes of talking. The bot turns it into 3 scripts on proven structures, in your voice, and learns from every edit you make.
>
> ```
> JOB
> Turn my spoken thoughts into scripts I can shoot on my
> phone.
>
> SET UP ONCE
> Study my 30 latest captions plus any transcripts I share.
> Save my go-to words, the words I avoid, and how my videos
> start and end to social/voice.md, along with AI-sounding
> habits to keep out.
>
> MONDAYS AND THURSDAYS, 9 A.M.
> Look for themes in social/outliers.md and send me 3 prompts
> per theme that I can talk through.
>
> WHEN A VOICE NOTE ARRIVES
> - Choose 3 structures from social/templates.md.
> - Build a script on each using my words and my claims alone.
> - For each: first line, on-screen text, beats, ending and
>   caption.
> - Check them against social/voice.md first.
>
> Save anything I change to social/voice.md so the next batch
> starts better. Log the script I choose in social/log.md.
> ```

> [!TRICK] Analyst bot: weekly lessons from your results
> It compares each week to your 3-month baseline and writes lessons the other bots read, with honest sample sizes.
>
> ```
> JOB
> Show me which of my videos worked and turn that into
> guidance for the team. Mondays, 6 a.m., ahead of the other
> bots.
>
> SET UP ONCE
> Track [my handles] on Virlo with weekly checks.
>
> STEPS
> - Read social/brief.md.
> - Line up this week's videos against my typical views over
>   the past 3 months.
> - Find my 3 strongest and 3 weakest, then what the strong
>   ones share: hook type, format, length, topic.
> - Note the sample size behind every pattern, and call out
>   anything under 6 videos as early.
> - Add 3 to 5 lessons to social/lessons.md for the team to
>   read.
>
> SEND ME
> A 6-line summary. Compare saves on TikTok only, since that's
> the one platform that has them.
> ```

> [!FORM] Your outlier
> 1. Which creator in your niche, with under 100,000 followers, did you pick?
> 2. Of their last 20 videos, which has the most views compared with the rest? Give its link.
> 3. Its first line, word for word.
> 4. Its beats, in order.

> [!DO] Find one outlier in your niche
> Pick a creator in your niche with under 100,000 followers and scroll their last 20 videos. Fill in your outlier above, then download it into `social/templates.md`.

> [!CHECK] In short-form video, what is an outlier?
> A video that did far better than its creator's usual views or follower count. The gap suggests the format did some of the work, so it's a format worth testing, not proof.

> [!CHECK] You want to reuse a short-form video format that broke out. What do you take, and what stays yours?
> Take the structure: the opening, the beats, the framing. The subject, words, footage and claims stay yours.

> [!CHECK] In short-form video, why reuse a proven format instead of inventing your own?
> It has already earned the watch time and shares platforms rank on, and viewers already know how to watch it. Inventing a new format is the slow road.

## Sources

- [Cristos Goodrow, *On YouTube's recommendation system* (2021)](https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/)
- [TikTok: How TikTok recommends videos #ForYou (2020)](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you)
- [YouTube Help: Measure key moments for audience retention](https://support.google.com/youtube/answer/9314415)
- [Rolf Reber, Norbert Schwarz and Piotr Winkielman, *Processing Fluency and Aesthetic Pleasure* (2004)](https://pages.ucsd.edu/~pwinkiel/abs_beauty-PSPR-2004.htm)
- [@tuanle: copying proven formats instead of chasing originality](https://x.com/tuanle/status/2119097657658597491)
- [@dsqjaffa: scheduled research bots for short-form video](https://x.com/dsqjaffa/status/2119160045263077664)
