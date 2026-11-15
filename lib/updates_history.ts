import type { Update } from "@/lib/updates";

// Backfilled /updates entries (see the note on Update in lib/updates.ts).
// Dates are when each thing actually happened: the git history for releases,
// the prod invoice table for sales, the LinkedIn post of the day for the
// journey milestones. No covers: the 2025 UI looks nothing like today's, and a
// current screenshot would claim it did.
export const HISTORY_2025: Update[] = [
    {
        slug: "tags",
        date: "2025-10-22",
        title: "Tags: find out which setups actually pay",
        summary:
            "Tag your trades by setup, mistake or anything else you track, filter by them, and see P&L, win rate and more for every tag side by side.",
        tags: ["Journal", "Tags"],
        keywords: [
            "trading journal tags",
            "tag trades by setup",
            "trading mistakes tracking",
            "performance by setup",
            "trade tagging analytics",
            "Arthveda tags",
        ],
    },
    {
        slug: "free-trial",
        date: "2025-10-29",
        kind: "journey",
        title: "Every new trader gets Pro free for 30 days",
        summary:
            "Three weeks after ending the Free plan, the way in became a trial: sign up and every Pro feature is yours for 30 days.",
        tags: ["Business"],
        keywords: ["Arthveda free trial", "trading journal free trial"],
    },
    {
        slug: "free-plan-ends",
        date: "2025-10-09",
        kind: "journey",
        title: "The hard call: no more Free plan",
        summary:
            "Free, Paid, Trial: I went back and forth for weeks. To keep Arthveda sustainable, the Free plan had to go.",
        tags: ["Business"],
        keywords: ["Arthveda pricing", "indie SaaS pricing", "build in public"],
    },
    {
        slug: "rich-notes",
        date: "2025-10-02",
        title: "Notes with screenshots, right on the trade",
        summary:
            "Trade notes became a full editor: headings, lists, formatting and your chart screenshots, kept with the trade they belong to.",
        tags: ["Journal", "Notes"],
        keywords: [
            "trading journal with screenshots",
            "trade notes with images",
            "rich text trading journal",
            "attach chart screenshot to trade",
            "Arthveda notes",
        ],
    },
    {
        slug: "trading-calendar",
        date: "2025-09-19",
        title: "The trading calendar",
        summary:
            "See every day you traded as a green or red tile, open any day to its trades, and zoom out to the whole year or all time.",
        tags: ["Journal", "Calendar"],
        keywords: [
            "trading calendar",
            "trading P&L calendar",
            "daily P&L heatmap",
            "trading journal calendar view",
            "Arthveda calendar",
        ],
    },
    {
        slug: "angel-one-kotak-import",
        date: "2025-09-11",
        title: "Import from Angel One and Kotak Securities",
        summary: "Angel One and Kotak Securities tradebooks now import straight into your journal, charges included.",
        tags: ["Journal", "Brokers"],
        keywords: [
            "Angel One trading journal",
            "Angel One tradebook import",
            "Kotak Securities trading journal",
            "Kotak tradebook import",
        ],
    },
    {
        slug: "first-sale",
        date: "2025-08-29",
        kind: "journey",
        title: "The first sale: ₹1,401.84",
        summary: "A month after Pro went live, a trader paid for a year of it. The first rupee Arthveda ever made.",
        tags: ["Business"],
        keywords: ["Arthveda first customer", "indie hacker first sale", "build in public"],
    },
    {
        slug: "notifications",
        date: "2025-08-27",
        title: "Notifications, powered by Bodhveda",
        summary:
            "Arthveda got a notification inbox right in the app. It runs on Bodhveda, the open-source notification platform I built at Mudgal Labs.",
        tags: ["Platform"],
        keywords: ["Bodhveda", "open source notifications", "in-app notifications", "notification inbox"],
    },
    {
        slug: "pro-plan",
        date: "2025-07-28",
        kind: "journey",
        title: "Pro, to keep the lights on",
        summary:
            "Hosting and development cost money, so Arthveda got a paid Pro plan. The code stayed open source and free to self host.",
        tags: ["Business"],
        keywords: ["Arthveda Pro", "open source SaaS pricing", "build in public"],
    },
    {
        slug: "first-contribution",
        date: "2025-07-15",
        kind: "journey",
        title: "Our first open-source contribution",
        summary:
            "Six days after the code went public, a developer from the community sent a pull request to make Arthveda easier to self host with Docker.",
        tags: ["Open source"],
        keywords: ["Arthveda open source", "first open source contribution"],
    },
    {
        slug: "zerodha-sync",
        date: "2025-07-14",
        title: "Sync your trades from Zerodha",
        summary:
            "Connect your Zerodha account and Sync brings your trades in, no tradebook file needed. Futures and options followed within a week.",
        tags: ["Journal", "Brokers"],
        keywords: [
            "Zerodha trading journal",
            "Zerodha Kite trade sync",
            "Zerodha tradebook import",
            "Zerodha F&O journal",
            "Arthveda Zerodha",
        ],
    },
    {
        slug: "open-source",
        date: "2025-07-09",
        kind: "journey",
        title: "Arthveda goes open source",
        summary:
            "The code went public under the AGPL, as part of Mudgal Labs: my home for free and open-source software.",
        tags: ["Open source"],
        keywords: ["Arthveda open source", "open source trading journal", "Mudgal Labs"],
    },
    {
        slug: "upstox-import",
        date: "2025-07-02",
        title: "Import from Upstox",
        summary:
            "Upstox tradebooks now import into your journal, with each company name matched to its trading symbol.",
        tags: ["Journal", "Brokers"],
        keywords: ["Upstox trading journal", "Upstox tradebook import", "Upstox P&L analysis"],
    },
    {
        slug: "beta-launch",
        date: "2025-06-24",
        title: "Arthveda beta is live",
        summary:
            "The first public version: log or import your trades, get charges worked out for you, and see where your P&L comes from.",
        tags: ["Journal"],
        keywords: [
            "Arthveda beta",
            "trading journal India",
            "free trading journal",
            "Zerodha tradebook analysis",
            "Groww trading journal",
        ],
    },
    {
        slug: "inception",
        date: "2025-04-01",
        kind: "journey",
        title: "Day one",
        summary:
            "Arthveda started as a side project to solve my own problem: a trading journal that actually worked for Indian traders.",
        tags: ["Inception"],
        keywords: ["Arthveda story", "Arthveda founder", "build in public"],
    },
];

// 2026, up to the first post written live (benchmark-widget, 2026-11-03).
// Covers where the UI is still essentially what shipped were captured on
// 2026-11-13 from the local app with the demo journal (never a real one);
// the rest share the site card like the 2025 ones.
export const HISTORY_2026: Update[] = [
    {
        slug: "ask-ai",
        cover: {
            src: "/images/updates/ask-ai-cover.png",
            width: 3024,
            height: 1568,
            alt: "The Ask AI page: connect your AI assistant to Arthveda, with example questions like 'Am I cutting my winners early?'",
        },
        og: { src: "/images/updates/ask-ai-og.jpg", width: 1200, height: 630 },
        date: "2026-10-29",
        title: "Ask AI: talk to your journal",
        summary:
            "Connect Claude, Cursor or any MCP client to your Arthveda journal and ask it about your trading in plain words. Read-only, always.",
        tags: ["Journal", "AI"],
        keywords: [
            "AI trading journal",
            "ask AI about my trades",
            "trading journal MCP server",
            "Claude trading journal",
            "AI trade analysis",
            "Arthveda Ask AI",
        ],
    },
    {
        slug: "more-brokers",
        date: "2026-10-25",
        title: "Sync from seven more brokers",
        summary:
            "Definedge, Upstox, Groww, Fyers, Angel One, Kotak Neo and INDmoney now sync straight into your journal, with live P&L on Live.",
        tags: ["Journal", "Brokers"],
        keywords: [
            "Fyers trading journal",
            "Angel One trading journal sync",
            "Kotak Neo trading journal",
            "INDmoney trading journal",
            "Upstox trade sync",
            "Groww trade sync",
            "Definedge trading journal",
            "broker sync trading journal India",
        ],
    },
    {
        slug: "arthveda-goes-global",
        cover: {
            src: "/images/updates/arthveda-goes-global-cover.png",
            width: 3024,
            height: 1568,
            alt: "The US Market Monitor: an S&P 500 heatmap with Apple, Microsoft, Nvidia and the rest coloured by their 1-day move",
        },
        og: { src: "/images/updates/arthveda-goes-global-og.jpg", width: 1200, height: 630 },
        date: "2026-10-14",
        title: "Arthveda goes global: US stocks are here",
        summary:
            "S&P 500, Nasdaq-100 and Dow stocks plus major US ETFs get symbol pages, 20 years of charts and a US Market Monitor.",
        tags: ["Discover", "Markets"],
        keywords: ["US stocks charts", "S&P 500 heatmap", "Nasdaq 100 stocks", "US ETF charts", "Arthveda US market"],
    },
    {
        slug: "corporate-actions",
        date: "2026-10-07",
        title: "Splits and bonuses, handled for you",
        summary:
            "When a stock you held splits or issues a bonus, Arthveda restates your position onto the new share count, so your P&L and charts line up.",
        tags: ["Journal"],
        keywords: [
            "stock split trading journal",
            "bonus issue P&L",
            "corporate actions trading journal",
            "split adjusted trade history",
        ],
    },
    {
        slug: "live-positions",
        date: "2026-09-30",
        title: "Live: everything you hold, priced right now",
        summary:
            "A new Live page shows every open position with live unrealised P&L, including ones you never synced, straight from your logged-in brokers.",
        tags: ["Journal", "Live"],
        keywords: [
            "live P&L tracker",
            "open positions tracker India",
            "live unrealised P&L",
            "options positions live P&L",
            "Arthveda Live",
        ],
    },
    {
        slug: "multi-leg-trades",
        date: "2026-09-07",
        title: "Multi-leg trades: a strangle is one trade",
        summary:
            "Group the legs of a spread, strangle or adjusted position into one trade, so your win rate and P&L count it the way you traded it.",
        tags: ["Journal", "F&O"],
        keywords: [
            "options strategy journal",
            "multi leg options trade journal",
            "strangle P&L tracker",
            "options adjustments journal",
            "spread trading journal",
        ],
    },
    {
        slug: "verified-trades",
        date: "2026-08-25",
        title: "Verified trades",
        summary:
            "A trade that came straight from your broker and was never edited gets a Verified badge, so anyone you share it with knows it is real.",
        tags: ["Journal", "Social"],
        keywords: ["verified trading P&L", "verified trades", "proof of trading performance", "Arthveda verified"],
    },
    {
        slug: "reports-charts",
        cover: {
            src: "/images/updates/reports-charts-cover.png",
            width: 3024,
            height: 1568,
            alt: "Reports on the Timeframes tab as charts: net P&L bars by holding duration, day of the week and hour of the day",
        },
        og: { src: "/images/updates/reports-charts-og.jpg", width: 1200, height: 630 },
        date: "2026-08-19",
        title: "Reports, now with charts",
        summary:
            "Every Reports tab can show a chart as well as a table, with the same filters as your dashboard and Insights.",
        tags: ["Journal", "Reports"],
        keywords: [
            "trading performance reports",
            "P&L by day of week chart",
            "P&L by symbol chart",
            "trading journal reports",
        ],
    },
    {
        slug: "profile-performance-stats",
        cover: {
            src: "/images/updates/profile-performance-stats-cover.png",
            width: 3024,
            height: 1568,
            alt: "Performance Stats on a public profile: an equity curve in return terms with drawdowns, next to the trader's instrument mix",
        },
        og: { src: "/images/updates/profile-performance-stats-og.jpg", width: 1200, height: 630 },
        date: "2026-08-13",
        title: "Show your stats on your profile",
        summary:
            "Pin dashboard widgets to your public trader profile as Performance Stats. Returns and R only, never your rupee amounts.",
        tags: ["Social"],
        keywords: ["trader profile stats", "share trading performance", "public trading stats"],
    },
    {
        slug: "ten-paying-traders",
        date: "2026-08-03",
        kind: "journey",
        title: "10 paying traders",
        summary:
            "Almost a year after the first sale, the tenth trader paid for Arthveda. A small number, and every one of them a trader who decided this was worth paying for.",
        tags: ["Business"],
        keywords: ["Arthveda customers", "indie SaaS milestone", "build in public"],
    },
    {
        slug: "dhan-sync",
        date: "2026-07-23",
        title: "Dhan sync, one click",
        summary:
            "Connect Dhan with a single consent screen, no API app of your own, and Sync brings in today's and past trades.",
        tags: ["Journal", "Brokers"],
        keywords: ["Dhan trading journal", "Dhan trade sync", "DhanHQ journal"],
    },
    {
        slug: "trade-analysis",
        cover: {
            src: "/images/updates/trade-analysis-cover.png",
            width: 3024,
            height: 1568,
            alt: "The Analysis tab on a trade: the P&L curve through the trade and after the exit, with MFE, MAE and capture efficiency cards",
        },
        og: { src: "/images/updates/trade-analysis-og.jpg", width: 1200, height: 630 },
        date: "2026-07-21",
        title: "Trade Analysis: how well did you exit?",
        summary:
            "A new Analysis tab on every closed trade: the P&L curve through its life, the best and worst it got, and what happened after you got out.",
        tags: ["Journal"],
        keywords: [
            "MFE MAE trading",
            "trade exit analysis",
            "maximum favorable excursion",
            "did I exit too early",
            "trade P&L curve",
        ],
    },
    {
        slug: "new-charts",
        cover: {
            src: "/images/updates/new-charts-cover.png",
            width: 2972,
            height: 1414,
            alt: "A RELIANCE daily candlestick chart in Arthveda with the drawing toolbar on the left and Add indicator, Compare and Settings above",
        },
        og: { src: "/images/updates/new-charts-og.jpg", width: 1200, height: 630 },
        date: "2026-07-13",
        title: "New charts, with indicators and drawings",
        summary:
            "Every chart in Arthveda moved to a new engine with built-in indicators and drawing tools, and your drawings are saved per symbol.",
        tags: ["Discover", "Charts"],
        keywords: ["stock chart with indicators", "chart drawing tools", "candlestick chart India", "Arthveda charts"],
    },
    {
        slug: "market-monitor",
        cover: {
            src: "/images/updates/market-monitor-cover.png",
            width: 3024,
            height: 1568,
            alt: "Market Monitor's Nifty 500 heatmap: every stock sized by market cap and coloured by its 1-day move, with the market mood, advance/decline and FII/DII flows above",
        },
        og: { src: "/images/updates/market-monitor-og.jpg", width: 1200, height: 630 },
        date: "2026-07-12",
        title: "Market Monitor",
        summary:
            "See the whole market at a glance: an index heatmap from Nifty 50 to Microcap 250, and market breadth. Free, no login needed.",
        tags: ["Discover", "Markets"],
        keywords: [
            "Nifty heatmap",
            "NSE market heatmap",
            "market breadth India",
            "Nifty 500 heatmap",
            "Market Monitor",
        ],
    },
    {
        slug: "help",
        date: "2026-06-29",
        title: "Help, right inside the app",
        summary:
            "Questions, bugs and feature requests now go straight to me from the Help button in the sidebar, powered by Grahak.",
        tags: ["Platform"],
        keywords: ["Arthveda support", "Grahak support widget", "in-app support chat"],
    },
    {
        slug: "commodities",
        cover: {
            src: "/images/updates/commodities-cover.png",
            width: 2972,
            height: 1414,
            alt: "A Crude Oil (MCX) daily candlestick chart in Arthveda",
        },
        og: { src: "/images/updates/commodities-og.jpg", width: 1200, height: 630 },
        date: "2026-06-16",
        title: "Commodities: MCX futures and options",
        summary:
            "Journal your MCX trades with the right charges, linked to their commodity, with daily price history going back years.",
        tags: ["Journal", "F&O"],
        keywords: [
            "MCX trading journal",
            "commodity trading journal",
            "crude oil options journal",
            "MCX charges calculator",
        ],
    },
    {
        slug: "trade-sharing",
        date: "2026-06-15",
        title: "Share a trade",
        summary:
            "Share any trade as a clean, read-only link, or publish it to your profile. Your P&L stays hidden unless you choose to show it.",
        tags: ["Social"],
        keywords: ["share trade link", "share trading journal entry", "publish trades", "trade breakdown"],
    },
    {
        slug: "dashboard-views",
        cover: {
            src: "/images/updates/dashboard-views-cover.png",
            width: 3024,
            height: 1568,
            alt: "A dashboard on the My View view: Net P&L, Win Rate, Avg Win/Loss, an equity curve, Expectancy, Profit Factor and Streak widgets",
        },
        og: { src: "/images/updates/dashboard-views-og.jpg", width: 1200, height: 630 },
        date: "2026-06-13",
        title: "Dashboard Views: build the dashboard you want",
        summary:
            "Pick your widgets, lay them out, set filters, and save the result as a View. Switch between views for different ways of looking at your trading.",
        tags: ["Journal", "Dashboard"],
        keywords: ["custom trading dashboard", "trading journal dashboard widgets", "saved dashboard views"],
    },
    {
        slug: "discover",
        cover: {
            src: "/images/updates/discover-cover.png",
            width: 3024,
            height: 1568,
            alt: "The Screeners page: screeners published by Arthveda such as High Tight Flag and Pullback to 20-Day SMA, with their filters, tags and run counts",
        },
        og: { src: "/images/updates/discover-og.jpg", width: 1200, height: 630 },
        date: "2026-05-26",
        title: "Arthveda v2: Discover",
        summary:
            "Arthveda grows from a journal into a Trading OS: Screeners, Watchlists and Symbol pages that remember your whole journey with a stock.",
        tags: ["Discover"],
        keywords: [
            "stock screener India",
            "free stock screener NSE",
            "stock watchlist",
            "Arthveda Discover",
            "trading OS",
        ],
    },
    {
        slug: "closed-source",
        date: "2026-05-22",
        kind: "journey",
        title: "Closed source, for good",
        summary: "With v2 around the corner, I made Arthveda closed source. This time it is final.",
        tags: ["Open source"],
        keywords: ["Arthveda closed source"],
    },
    {
        slug: "trader-profiles",
        cover: {
            src: "/images/updates/trader-profiles-cover.png",
            width: 3024,
            height: 1568,
            alt: "Shikhar Sharma's public trader profile at @ceoshikhar: banner, avatar, bio, style chips, streak and follower counts",
        },
        og: { src: "/images/updates/trader-profiles-og.jpg", width: 1200, height: 630 },
        date: "2026-05-24",
        title: "Arthveda Social: public trader profiles",
        summary:
            "Every trader gets a public profile: who you are, how you trade, your screeners and watchlists, and a heatmap of your activity.",
        tags: ["Social"],
        keywords: ["trader profile", "public trading profile", "trading portfolio page", "Arthveda Social"],
    },
    {
        slug: "insights",
        cover: {
            src: "/images/updates/insights-cover.png",
            width: 3024,
            height: 1568,
            alt: "Insights on the Timing tab: what's hurting (weakest hour, long holds) and what's working (best hour, best holding range), each with its money",
        },
        og: { src: "/images/updates/insights-og.jpg", width: 1200, height: 630 },
        date: "2026-04-08",
        title: "Insights: what is working, what is hurting",
        summary:
            "Your journal, turned into plain statements you can act on, each with the money behind it: your best hours, your holding habits, your patterns.",
        tags: ["Journal", "Insights"],
        keywords: [
            "trading insights",
            "trading psychology analysis",
            "best time of day to trade",
            "trading mistakes analysis",
        ],
    },
    {
        slug: "light-theme",
        cover: {
            src: "/images/updates/light-theme-cover.png",
            width: 3024,
            height: 1568,
            alt: "The Arthveda dashboard in the light theme",
        },
        og: { src: "/images/updates/light-theme-og.jpg", width: 1200, height: 630 },
        date: "2026-04-04",
        title: "Light theme",
        summary: "A trader asked for a light mode, so Arthveda got one. Pick Light, Dark or follow your system.",
        tags: ["Platform"],
        keywords: ["trading journal light mode", "Arthveda light theme"],
    },
    {
        slug: "reports",
        cover: {
            src: "/images/updates/reports-cover.png",
            width: 3024,
            height: 1568,
            alt: "Reports on the Timeframes tab as tables: P&L, charges and R factor by holding duration and by day of the week",
        },
        og: { src: "/images/updates/reports-og.jpg", width: 1200, height: 630 },
        date: "2026-03-19",
        title: "Reports: slice your trading every way",
        summary:
            "See your performance by day of week, hour of day, holding period, symbol and instrument, next to the tag reports you already had.",
        tags: ["Journal", "Reports"],
        keywords: ["trading performance by day of week", "P&L by hour", "holding period analysis", "P&L by symbol"],
    },
    {
        slug: "multi-currency",
        date: "2026-03-01",
        title: "Multiple currencies, one home currency",
        summary:
            "Log trades in any currency. Arthveda converts them to your home currency so the dashboard, calendar and trades all add up.",
        tags: ["Journal"],
        keywords: ["multi currency trading journal", "trading journal USD INR", "home currency conversion"],
    },
    {
        slug: "indmoney-import",
        date: "2026-02-14",
        title: "Import from INDmoney",
        summary: "INDmoney tradebooks now import into your journal, charges included.",
        tags: ["Journal", "Brokers"],
        keywords: ["INDmoney trading journal", "INDmoney tradebook import"],
    },
    {
        slug: "open-source-again",
        date: "2026-01-29",
        kind: "journey",
        title: "Open source again",
        summary:
            "For about 45 days Arthveda was closed source, because I followed advice on how to make it profitable. I soon realised that wasn't me.",
        tags: ["Open source"],
        keywords: ["Arthveda open source", "build in public"],
    },
];
