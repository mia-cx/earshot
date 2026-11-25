/** A tool a lesson has the reader use, listed on `/resources` under the module that teaches it. */
export type Tool = {
	name: string;
	url: string;
	/** What the reader uses it for, in one sentence. */
	what: string;
	/** Only when the lesson or its source states it. */
	price?: string;
	/** The lesson that teaches it, as `module/lesson`. */
	lesson: string;
	/** Who recommends it and also sells it, or why to doubt its claims. */
	note?: string;
};

/** Long lists (launch sites, directories, local citations, backlink menus) stay in their lessons. */
export const tools: Tool[] = [
	// foundations
	{
		name: 'Trustpilot',
		url: 'https://www.trustpilot.com',
		what: 'Read reviews in your category for the exact words buyers use to complain and to buy.',
		lesson: 'foundations/research-fast'
	},
	{
		name: 'Google Analytics',
		url: 'https://analytics.google.com',
		what: 'Measure traffic, bounce rate and UTM-tagged campaigns at each step of the funnel.',
		price: 'Free',
		lesson: 'foundations/the-funnel'
	},

	// content
	{
		name: 'Eden',
		url: 'https://eden.so',
		what: 'Find which content performs across platforms and pull posts from creators, inside Claude or ChatGPT over MCP.',
		lesson: 'content/content-map',
		note: 'Dan Koe, who recommends it, founded Eden.'
	},

	// x
	{
		name: 'X Under the Hood',
		url: 'https://x.com/i/jf/under_the_hood',
		what: 'See whether your account or posts carry a spam or inauthentic-behaviour label.',
		lesson: 'x/stay-visible'
	},
	{
		name: 'xai-org/x-algorithm',
		url: 'https://github.com/xai-org/x-algorithm',
		what: "X's open-source For You feed code. Read it to check how posts are found, scored and filtered instead of trusting summaries.",
		lesson: 'x/how-the-feed-works'
	},
	{
		name: 'Grok',
		url: 'https://grok.com',
		what: 'Tag it under a long X post, or paste in a long platform guide, and ask what the algorithm rewards.',
		lesson: 'x/article-engine'
	},

	// launch
	{
		name: 'Paper',
		url: 'https://paper.design',
		what: 'A design canvas a coding agent can draw on: sketch five hero layouts side by side before you build one.',
		lesson: 'launch/landing-page'
	},
	{
		name: 'Product Hunt',
		url: 'https://www.producthunt.com',
		what: 'The launch site built around launch day. Link straight to your product and never ask for upvotes.',
		lesson: 'launch/first-100-users'
	},
	{
		name: 'Context.dev',
		url: 'https://context.dev',
		what: 'Fetches Reddit for an agent whose IP Reddit blocks, so it can watch for leads every hour.',
		lesson: 'launch/first-100-users',
		note: 'The story that recommends it was published by Context.dev.'
	},
	{
		name: 'Loom',
		url: 'https://www.loom.com',
		what: 'Record quick product demos for your first posts without a designer.',
		lesson: 'launch/day-zero-week'
	},

	// outreach
	{
		name: 'PULSE-1 (Instantly)',
		url: 'https://instantly.ai/pulse-1',
		what: 'Ranks your lead list by how likely each lead is to reply, so you contact the likeliest first. Only inside Instantly.',
		lesson: 'outreach/cold-email',
		note: 'Instantly\'s "2.2x more positive replies" comes from its own backtest: the top 20% of ranked leads against the unranked list, not against a simple fit filter. The lesson shows how to test it against your own filter.'
	},
	{
		name: 'LinkedIn Ad Library',
		url: 'https://www.linkedin.com/ad-library',
		what: 'Search the three competitors you lose to and note the problem each ad opens with.',
		price: 'Free',
		lesson: 'outreach/linkedin-dms'
	},
	{
		name: 'LinkedIn Sales Navigator',
		url: 'https://business.linkedin.com/sell/sales-navigator',
		what: 'Filter buyers by job title, industry and company size to build your DM test list.',
		lesson: 'outreach/linkedin-dms'
	},
	{
		name: 'Firecrawl',
		url: 'https://www.firecrawl.dev',
		what: 'Lets a research agent read your site and case studies, so it knows what you sell before it drafts a DM.',
		lesson: 'outreach/linkedin-dms'
	},

	// seo
	{
		name: 'Google Search Console',
		url: 'https://search.google.com/search-console',
		what: "Find pages ranking 10 to 30, queries a page shows for but doesn't answer, and indexing problems.",
		price: 'Free',
		lesson: 'seo/improve-what-ranks'
	},
	{
		name: 'Bing Webmaster Tools',
		url: 'https://www.bing.com/webmasters',
		what: 'Import your site from Search Console, submit your sitemap, and see when Copilot cites you.',
		price: 'Free',
		lesson: 'seo/technical-basics'
	},
	{
		name: 'IndexNow',
		url: 'https://www.indexnow.org',
		what: 'Tell Bing and other engines the moment a page changes. Google does not take part.',
		price: 'Free',
		lesson: 'seo/technical-basics'
	},
	{
		name: 'Cloudflare Crawler Hints',
		url: 'https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/',
		what: 'Sends IndexNow pings for you when your site sits behind Cloudflare.',
		lesson: 'seo/technical-basics'
	},
	{
		name: 'Google Rich Results Test',
		url: 'https://search.google.com/test/rich-results',
		what: 'Check that your structured data parses and matches what the page shows.',
		price: 'Free',
		lesson: 'seo/technical-basics'
	},
	{
		name: 'LowFruits',
		url: 'https://lowfruits.io',
		what: 'Find long-tail keywords with weak competition.',
		lesson: 'seo/pages-that-sell'
	},
	{
		name: 'KWFinder',
		url: 'https://mangools.com/kwfinder/',
		what: 'Find long-tail keywords with weak competition.',
		lesson: 'seo/pages-that-sell'
	},
	{
		name: 'AnswerThePublic',
		url: 'https://answerthepublic.com',
		what: 'See the questions people search around a topic.',
		lesson: 'seo/pages-that-sell'
	},
	{
		name: 'Keywords Everywhere',
		url: 'https://keywordseverywhere.com',
		what: 'See search volume beside Google results while you search.',
		lesson: 'seo/pages-that-sell'
	},
	{
		name: 'Keyword Surfer',
		url: 'https://surfer.ai/keyword-surfer-extension/',
		what: 'A browser extension that shows search volume beside Google results.',
		lesson: 'seo/pages-that-sell'
	},
	{
		name: 'Distribb',
		url: 'https://distribb.io',
		what: 'Connects Claude to your Search Console for a weekly check, and writes and publishes articles.',
		price: '$97 a month, 3-day trial',
		lesson: 'seo/improve-what-ranks',
		note: 'Borja Fat, whose setup the lesson describes, runs Distribb.'
	},
	{
		name: 'Google Ads',
		url: 'https://ads.google.com',
		what: 'Run three search ads, one title angle each, to find the best page title before you change the page.',
		price: 'About $20 a day per test',
		lesson: 'seo/title-tests'
	},
	{
		name: 'Google Trends',
		url: 'https://trends.google.com',
		what: 'Spot rising searches in your category, and tell a seasonal bump from a real spike.',
		price: 'Free',
		lesson: 'seo/beyond-your-site'
	},
	{
		name: 'Google Business Profile',
		url: 'https://www.google.com/business/',
		what: 'Verify and fill in your listing: categories, services, photos, posts and review replies.',
		price: 'Free',
		lesson: 'seo/local-seo'
	},
	{
		name: 'Bing Places',
		url: 'https://www.bingplaces.com',
		what: "Claim your business listing on Bing's maps.",
		price: 'Free',
		lesson: 'seo/local-seo'
	},
	{
		name: 'ChatSEO',
		url: 'https://chatseo.app',
		what: 'An SEO agent: brings your Search Console, keyword volumes and competitor pages into Claude over MCP.',
		price: 'From €29 a month (€49 with the MCP), 7-day trial',
		lesson: 'seo/agent-seo',
		note: 'Nicholas Dulait, who the SEO lessons quote, co-founded ChatSEO.'
	},
	{
		name: 'AminForou/mcp-gsc',
		url: 'https://github.com/AminForou/mcp-gsc',
		what: 'Gives an agent read-only Search Console data, so its numbers come from your site.',
		price: 'Free',
		lesson: 'seo/agent-seo'
	},
	{
		name: 'RomeoSEO/seo-skills',
		url: 'https://github.com/RomeoSEO/seo-skills',
		what: 'Open-source SEO skills for agents with the clearest method of the repos reviewed.',
		price: 'Free',
		lesson: 'seo/agent-seo'
	},
	{
		name: 'AgriciDaniel/claude-seo',
		url: 'https://github.com/AgriciDaniel/claude-seo',
		what: 'SEO skills for Claude Code. Use the page, technical and schema commands.',
		price: 'Free',
		lesson: 'seo/agent-seo',
		note: "Its reports add a link to the author's paid community."
	},
	{
		name: 'AgriciDaniel/claude-blog',
		url: 'https://github.com/AgriciDaniel/claude-blog',
		what: 'An answer-first blog writer that gets FAQ markup right. Ignore its 100-point score.',
		price: 'Free',
		lesson: 'seo/agent-seo'
	},
	{
		name: 'coreyhaines31/marketingskills',
		url: 'https://github.com/coreyhaines31/marketingskills',
		what: 'Marketing skills for agents, SEO included. Ignore its HowTo schema advice.',
		price: 'Free',
		lesson: 'seo/agent-seo'
	},

	// backlinks
	{
		name: 'Backlink for me',
		url: 'https://backlinkforme.com/backlinks',
		what: 'A searchable list of backlink opportunities. Use it to find a few that fit, never to submit everywhere.',
		lesson: 'backlinks/weekly-link-habit',
		note: 'The author of the list in the lesson runs it.'
	},
	{
		name: 'Qwoted',
		url: 'https://www.qwoted.com',
		what: 'Answer reporters looking for a source, with a quote and a link to your research page.',
		lesson: 'backlinks/links-you-earn'
	},
	{
		name: 'Featured',
		url: 'https://featured.com',
		what: 'Answer reporters looking for a source. Filter by topic and deadline, and answer only what you know.',
		lesson: 'backlinks/links-you-earn'
	},
	{
		name: 'SourceBottle',
		url: 'https://www.sourcebottle.com',
		what: 'Answer reporters looking for a source.',
		lesson: 'backlinks/links-you-earn'
	},
	{
		name: 'ResponseSource',
		url: 'https://www.responsesource.com',
		what: 'Answer reporters looking for a source.',
		lesson: 'backlinks/links-you-earn'
	},
	{
		name: 'Wayback Machine',
		url: 'https://web.archive.org',
		what: "Read a dead competitor page's archived copy to see what its readers came for, then publish a better replacement.",
		price: 'Free',
		lesson: 'backlinks/links-you-earn'
	},

	// ai-search
	{
		name: 'ChatGPT',
		url: 'https://chatgpt.com',
		what: "Ask it your buyer's questions while logged out, and log which brands and pages it cites.",
		lesson: 'ai-search/ai-answers'
	},
	{
		name: 'Perplexity',
		url: 'https://www.perplexity.ai',
		what: "Ask it your buyer's questions and log what it cites. Allow PerplexityBot so it can cite you.",
		lesson: 'ai-search/ai-answers'
	},
	{
		name: 'Gemini',
		url: 'https://gemini.google.com',
		what: "Ask it your buyer's questions and log what it cites.",
		lesson: 'ai-search/ai-answers'
	},
	{
		name: 'Ahrefs Webmaster Tools',
		url: 'https://ahrefs.com/webmaster-tools',
		what: 'Audit your own site and see who links to it.',
		price: 'Free for your own site',
		lesson: 'ai-search/ai-answers'
	},
	{
		name: 'Screaming Frog SEO Spider',
		url: 'https://www.screamingfrog.co.uk/seo-spider/',
		what: 'Crawl your site the way a search bot does and find broken pages and missing tags.',
		price: 'Free up to 500 URLs',
		lesson: 'ai-search/ai-answers'
	},
	{
		name: 'skills.sh',
		url: 'https://skills.sh',
		what: 'List an agent skill for your product so AI assistants can find and install it.',
		lesson: 'ai-search/pages-and-places'
	},

	// video
	{
		name: 'Figma',
		url: 'https://www.figma.com',
		what: 'Storyboard every frame of a product animation before any motion work.',
		lesson: 'video/premium-product-videos'
	},
	{
		name: 'YouTube Studio',
		url: 'https://studio.youtube.com',
		what: "Compare a video's retention curve with your last 10 videos of similar length.",
		price: 'Free',
		lesson: 'video/short-form'
	},
	{
		name: 'Codex',
		url: 'https://openai.com/codex/',
		what: 'Draws the style sheets and the first and last frame of every shot in the AI video setup.',
		lesson: 'video/ai-video-plan'
	},
	{
		name: 'ffmpeg',
		url: 'https://ffmpeg.org',
		what: 'Command-line video tool the director agent uses to cut, join and upscale shots.',
		price: 'Free',
		lesson: 'video/ai-video-plan'
	},
	{
		name: 'Seedance',
		url: 'https://ai.byteplus.com/ark/region:ap-southeast-1/docs/create-video-generation-task-api',
		what: 'A video model that animates between a first and last frame you drew.',
		lesson: 'video/ai-video-shots'
	},

	// keep-users
	{
		name: 'Klaviyo',
		url: 'https://www.klaviyo.com',
		what: 'Run behaviour-triggered email flows with a 10% random holdout, so you can prove they add revenue.',
		lesson: 'keep-users/retention'
	},
	{
		name: 'Meta Ad Library',
		url: 'https://www.facebook.com/ads/library/',
		what: "Read competitors' live ads. The ones running 60 days or more are the ones worth rebuilding.",
		price: 'Free',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'Meta Conversions API',
		url: 'https://developers.facebook.com/documentation/ads-commerce/conversions-api/best-practices',
		what: 'Send each purchase from browser and server with one event ID, so Meta counts every sale once.',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'Google Tag Manager',
		url: 'https://tagmanager.google.com',
		what: 'Manage tracking tags in one place, as part of the purchase tracking setup.',
		price: 'Free',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'Stape',
		url: 'https://stape.io',
		what: 'Hosts server-side tracking, so ad platforms still see purchases that browsers block.',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'PostHog',
		url: 'https://posthog.com',
		what: 'Measure which landing page variant converts when the page changes per ad.',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'Google Meridian',
		url: 'https://developers.google.com/meridian',
		what: 'Estimate what each ad channel adds with marketing mix modelling, checked against your holdout tests.',
		price: 'Free',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'Meta Robyn',
		url: 'https://facebookexperimental.github.io/Robyn/',
		what: "Meta's marketing mix modelling tool, an alternative to Meridian.",
		price: 'Free',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'GeoLift',
		url: 'https://facebookincubator.github.io/GeoLift/',
		what: "Run a holdout test by region when a platform lift test isn't available.",
		price: 'Free',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'Veo',
		url: 'https://deepmind.google/models/veo/',
		what: 'Batch UGC-style video ads from one product photo and a 30-second script.',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'Kling',
		url: 'https://kling.ai',
		what: 'Batch UGC-style video ads, an alternative to Veo.',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'ElevenLabs',
		url: 'https://elevenlabs.io',
		what: 'Voice the batched AI video ads.',
		lesson: 'keep-users/paid-ads'
	},
	{
		name: 'irinabuht12-oss/marketing-skills',
		url: 'https://github.com/irinabuht12-oss/marketing-skills',
		what: 'Claude skills for eleven marketing engineering workflows, including the hourly ad agent.',
		price: 'Free',
		lesson: 'keep-users/paid-ads'
	},

	// agents
	{
		name: 'Claude Code',
		url: 'https://claude.com/product/claude-code',
		what: 'A coding agent that runs marketing jobs on a schedule: reports, ad accounts, research and SEO fixes.',
		lesson: 'agents/marketing-as-code'
	},
	{
		name: 'Looker Studio',
		url: 'https://lookerstudio.google.com',
		what: 'A dashboard for the numbers behind the automated Monday report.',
		price: 'Free',
		lesson: 'agents/marketing-as-code'
	},
	{
		name: 'Metabase',
		url: 'https://www.metabase.com',
		what: 'An open-source dashboard for the numbers behind the automated Monday report.',
		lesson: 'agents/marketing-as-code'
	},
	{
		name: 'kie.ai',
		url: 'https://kie.ai',
		what: 'One API for image and video models, used to make a static ad per customer pain point.',
		lesson: 'agents/marketing-as-code'
	},
	{
		name: 'fal',
		url: 'https://fal.ai',
		what: 'Hosted AI models, used to transcribe every word of a generated ad so an agent can check it.',
		lesson: 'agents/marketing-as-code'
	},
	{
		name: 'Claude',
		url: 'https://claude.ai',
		what: 'Keep a standing brief about your business in a Project, so you never explain it twice.',
		lesson: 'agents/context-first'
	},
	{
		name: 'Virlo',
		url: 'https://virlo.ai',
		what: 'A database of viral short videos that research bots read over MCP to find outliers, trends and competitor ads.',
		lesson: 'agents/social-research-team',
		note: "The author of the bots' prompts co-founded Virlo."
	},
	{
		name: 'TikTok Commercial Music Library',
		url: 'https://ads.tiktok.com/resources/help/article/commercial-music-library',
		what: 'Music cleared for business posts and ads on TikTok. Check the track is cleared for your region and for where you will use it.',
		price: 'Free',
		lesson: 'agents/social-research-team'
	}
];
