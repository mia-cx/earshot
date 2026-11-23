---
title: Win the local map
order: 7
description: Audit and fix your Google Business Profile against the businesses in the map pack.
---

> [!TLDR] Google ranks local results on relevance, distance and prominence, and your Business Profile is where you control relevance.
> - For a local business, the Google Business Profile (GBP) decides whether you show in the map pack.
> - Load your business and competitor details into an AI agent once, then run one audit prompt per task.
> - Copy what the map-pack leaders do: their categories, their review pace, their posts, their services list.
> - Fix in order over five weeks, then keep a weekly routine.

## Get your listings right first

**A complete, accurate Google Business Profile is the base of local search.** Google [ranks local results on three factors](https://support.google.com/business/answer/7091):

- **Relevance:** how well your profile matches the search.
- **Distance:** how far you are from the searcher.
- **Prominence:** how well known you are, including links and reviews.

You can't move your shop, so focus on relevance and prominence. Google says "businesses with complete and accurate info are more likely to show up", and there's no way to pay for a better local ranking.

Pick the most specific category that fits, and keep your name, address and phone number identical everywhere. Link the profile to the matching service page on your site, fill in contact and booking details, upload real job photos, publish current offers, and track calls and bookings from the profile. After every job, ask for an honest review and reply with relevant details.

> [!TRICK] Citation sites to fill in
> List your business only where customers in your area really look: Google Business Profile, Apple Business, Bing Places, Yelp, Better Business Bureau, Manta, Brownbook, EZlocal, Hotfrog, CitySquares, Cylex, Cybo, Foursquare, MerchantCircle, Superpages, DexKnows, Yellowbook, Alignable, Nextdoor Business, Chamber of Commerce.

> [!RISK] GBP is for businesses that meet customers
> Google Business Profile [requires](https://support.google.com/business/answer/3038177) a place customers visit, or a service area you travel to. Online-only businesses generally don't qualify, and a virtual office or fake address breaks its rules and can get the listing removed. If you have no real location or service area, skip this lesson.

## Load context once, then run task prompts

Generic AI output usually means the AI knows nothing about your business. The rest of this lesson follows @bloggersarvesh, a local SEO consultant with 14 years in the field who sells the service. He uses Grok; any agent that can browse the web works. Before running any prompt, give it a folder with:

- One file with your business name, address, phone, website, GBP URL, service areas and target keywords.
- One file per competitor, with their GBP URL.
- Your GBP details: categories, attributes, photos, services.
- A prompt library, one file per SEO task.

> [!FORM] Your business file
> 1. Your business name, address and phone number, exactly as they appear everywhere.
> 2. Your website and Google Business Profile URL.
> 3. Which areas do you serve?
> 4. Which keywords do you want to rank for?
> 5. Which competitors show up in the map pack? Give each one's Google Business Profile URL.
> 6. Your primary and secondary Google Business Profile categories.
> 7. Which secondary category do the map-pack leaders have that you're missing?

## Copy the map-pack leaders' profiles

**Your primary and secondary GBP categories decide which searches put you on the map.** In Whitespark's [2026 Local Search Ranking Factors](https://whitespark.ca/local-search-ranking-factors/) survey, 47 local SEO experts ranked the primary category first and secondary categories eighth. That's expert opinion, not Google data.

Adding a missing secondary category is often the fastest local win: the author says clients who added one appeared for new searches within a week.

> [!RISK] Only categories you really are
> Google's guidelines say to use "as few categories as possible" to describe your core business, and never to use categories as keywords. Copy a competitor's category only if it's work you actually do.

> [!TRICK] Category audit prompt
> ```
> Search '[service] in [city]' on Google, note which of my competitors show up in the Map Pack. Then open each competitor's GBP listing and extract their primary category and all secondary categories. Put everything in a spreadsheet. One tab per keyword. Columns: business name, primary category, secondary categories, star rating, review count, ranking position. Highlight any categories my competitors have that I'm missing from my GBP.
> ```
> Look for patterns. Example: every business ranking for "emergency plumber in [city]" also lists "water damage restoration".

The services section is the other part you fully control. List every service with a description, and **add any service from your website that's missing on GBP**. A plumber offering "trenchless sewer repair" on their site but not on GBP is invisible for that map search.

> [!TRICK] Services audit prompt
> ```
> Go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, check the services section. Extract: every service listed, whether it has a description, how detailed the descriptions are, and any service categories or groupings. Put this in a spreadsheet comparing my services section vs competitors. Then audit my current services section against my website [URL] and find any services on my site that aren't listed on my GBP. Finally, write optimized descriptions for all my services. Each description should be 2-3 sentences, naturally include target keywords, mention specific service areas where relevant, and include a benefit statement. Here are my core services: [service1], [service2], [service3] and service areas: [area1], [area2], [area3].
> ```

## Win on recent reviews and replies

**Track review pace, not star rating: recent reviews count more than old totals.** Google confirms the base of this: "more reviews and positive ratings can help your business's local ranking". Recency is the experts' view: Whitespark's panel ranks review recency 11th of 187 factors.

A business with 90 reviews gaining 15 a month beats one with 200 reviews where 180 are two years old. The services and neighbourhoods customers mention also signal what you're relevant for.

> [!TRICK] Review velocity prompt
> ```
> Go to these competitor GBP listings: [URL1], [URL2], [URL3]. For each competitor, read their last 50 reviews. Extract: total review count, average rating, how many reviews in the last 30/60/90 days, the most mentioned services in reviews, the most mentioned neighborhoods or cities, and any recurring complaints. Then compare their review velocity to mine at [my GBP URL]. Output a spreadsheet with all this data and a separate tab that says exactly how many reviews per month I need to catch the top competitor and how long it will take.
> ```
> Use the services and places competitors' reviewers mention to know which details matter to customers.

> [!RISK] Review rules
> Google's [review policy](https://support.google.com/contributionpolicy/answer/7400114) bans paying or rewarding customers for reviews and asking only happy customers (review gating). Ask everyone for an honest review. Don't script what they write.

Reply to every review for the customers reading them, not to rank. The author says Google has confirmed that replying helps local ranking, yet Google's own page says only that replies show you value feedback and help you stand out. Whitespark's experts rank owner replies 122nd of 187 ranking factors.

Templates with variations cut each reply to under a minute and let you mention services and places naturally.

> [!TRICK] Review response template prompt
> ```
> Go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, analyze the last 30 review responses from the business owner. Note: how many reviews have responses vs no response, average response time, whether responses mention specific services or locations, response length and tone, and how negative reviews are handled. Put this in a spreadsheet comparing my response strategy vs competitors. Then write me a review response template system: one template for 5-star reviews that naturally includes service + location keywords, one for 4-star reviews, one for 3-star reviews, and one for 1-2 star reviews that's professional and defuses negativity. Each template should have 3 variations so my responses don't look robotic.
> ```

## Post weekly and fix in order

**Post 2 to 3 times a week naming the neighbourhoods you serve.** Most competitors never post on their GBP, so steady updates show customers you're active. One simple angle: "just completed a kitchen remodel in [neighborhood]", rotated across 8 to 10 neighbourhoods a month.

Posts help people choose you more than they help you rank: Whitespark's experts put post frequency 148th of 187 ranking factors. The author says posts expire after 7 days, though Google now says posts [stay up for 6 months](https://support.google.com/business/answer/7342169) unless you set a date range.

> [!TRICK] Posting calendar prompt
> ```
> Go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, check their GBP posts section. Note: how many posts in the last 90 days, what type of posts, whether posts include images and CTAs, what topics they cover, and how often they post. Put this in a spreadsheet. Then build me an 8-week GBP posting calendar. I want 2-3 posts per week covering: seasonal service promotions, before-and-after project showcases, neighborhood-specific content mentioning areas we serve ([area1], [area2], [area3]), review highlights, and team spotlights. Each post should naturally include at least one target keyword from this list: [keyword1], [keyword2], [keyword3]. Write the first 4 weeks of posts for me - full copy and image suggestions.
> ```

Run the audits in order of impact, one block a week, then switch to a steady routine.

> [!TRICK] The five-week sequence
> - Week 1: categories and attributes (fastest effect, often within days).
> - Week 2: services section and business description.
> - Week 3: review teardown and response templates.
> - Week 4: posting calendar and photo audit.
> - Week 5 onward: post consistently, upload photos weekly, reply to every review.
>
> The author names attribute, description and photo audits but doesn't share those prompts. He claims 90 days of this outranks long-established businesses; that's his unverified claim.

> [!DO] Run the category audit
> Run the category audit prompt for your main service and city. Note the missing secondary category in your business file above, add it to your profile, then download the file for your agent's folder.

> [!CHECK] On a Google Business Profile, what change often gives the fastest local ranking win?
> Adding a secondary category the map-pack leaders have and you're missing. Your categories decide which searches show you on the map.

> [!CHECK] Which three factors does Google say decide local rankings, and which one can your profile change?
> Relevance, distance and prominence. Your profile controls relevance: complete, accurate categories, services and details. Reviews feed prominence.

> [!CHECK] Why should a plumber list every service from their website on their Google Business Profile?
> A service missing from the profile is invisible for that map search, even when the website offers it.

## Sources

- [Google Business Profile Help: Tips to improve your local ranking on Google](https://support.google.com/business/answer/7091)
- [Google Business Profile Help: Guidelines for representing your business on Google](https://support.google.com/business/answer/3038177)
- [Google Maps Help: Prohibited and restricted content (fake engagement)](https://support.google.com/contributionpolicy/answer/7400114)
- [Google Business Profile Help: Create and manage posts](https://support.google.com/business/answer/7342169)
- [Darren Shaw, Whitespark, *2026 Local Search Ranking Factors* (2025)](https://whitespark.ca/local-search-ranking-factors/)
- [@bloggersarvesh: local SEO with AI, GBP audit prompts and five-week plan](https://x.com/bloggersarvesh/status/2088983373859725755)
- [@borjafat: local listings and reviews](https://x.com/borjafat/status/2116164330014007296)
- [@2whazzuup: local citation sites](https://x.com/2whazzuup/status/2119247229601062993)
