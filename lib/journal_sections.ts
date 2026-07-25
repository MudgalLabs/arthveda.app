// Journal family page: a left-aligned hero, then a 2-up grid of feature cards
// (8 cards, 4 rows). Copy + images are the v1 feature pages, re-homed here.
// `id` is also used as the feature card's deep-link anchor.

export interface JournalFeature {
    id: string;
    /** Short feature name, shown as a subtle caption above the image. */
    label: string;
    heading: string;
    subheading: string;
    /** Screenshot path, or null to render a placeholder until captured. */
    image: string | null;
    /** Short label shown inside the placeholder when `image` is null. */
    placeholderLabel?: string;
    /** Override the card's frame aspect when the screenshot isn't the default
        16:10 (otherwise `object-cover` clips its edges). */
    aspectClass?: string;
}

export const JOURNAL_FEATURES: JournalFeature[] = [
    {
        id: "insights",
        label: "Insights",
        heading: "The leaks you can't see in a P&L.",
        subheading:
            "Arthveda reads your whole journal and names the habits quietly costing you money, each with the rupees behind it, ranked by what hurts most.",
        image: "/images/product_journal_insights.png",
        // The new Insights shot is 16:9 (more tabs + cards); the default 16:10
        // frame would clip its left/right edges.
        aspectClass: "aspect-[16/9]",
    },
    {
        id: "dashboard",
        label: "Dashboard",
        heading: "Know if you're actually improving.",
        subheading:
            "Track PnL, win rate, and performance over time. Measure progress with data, not assumptions.",
        image: "/images/product_journal_dashboard.png",
    },
    {
        id: "reports",
        label: "Reports & Analytics",
        heading: "Find what's consistently working.",
        subheading:
            "Break performance down across setups, symbols, and patterns, so you can double down on what works and cut what doesn't.",
        image: "/images/product_journal_reports.png",
    },
    {
        id: "trades",
        label: "Trades",
        heading: "All your trades, in one place.",
        subheading:
            "Your complete trading history with powerful filters and detailed breakdowns, so nothing gets lost or overlooked.",
        image: "/images/product_journal_trades.png",
    },
    {
        id: "notebook",
        label: "Notebook",
        heading: "Understand the why behind every trade.",
        subheading:
            "Write your reasoning, attach screenshots, and review your decisions, so you learn from every trade, not just the outcome.",
        image: "/images/product_journal_notebook.png",
    },
    {
        id: "trade-analysis",
        label: "Trade Analysis",
        heading: "Find out if you sold too early.",
        subheading:
            "Every closed trade replayed against the price that followed, so you see how efficiently you held it and how much you left on the table.",
        image: "/images/product_journal_trade_analysis.png",
        // Tall (~6:5) shot; the default 16:10 frame would crop the lower cards.
        aspectClass: "aspect-[6/5]",
    },
    {
        id: "calendar",
        label: "Calendar",
        heading: "See your trading over time.",
        subheading:
            "Your daily activity in a calendar view, so you can spot patterns, streaks, and consistency at a glance.",
        image: "/images/product_journal_calendar.png",
    },
    {
        id: "tagging",
        label: "Tagging",
        heading: "Spot patterns you'd otherwise miss.",
        subheading:
            "Tag your trades by setup, mistake, or behavior, and uncover patterns that aren't visible otherwise.",
        image: "/images/product_journal_tagging.png",
    },
    {
        id: "accounts",
        label: "Accounts",
        heading: "See everything, across all your accounts.",
        subheading:
            "Track multiple trading accounts in one place, across brokers, strategies, and capital, without losing clarity.",
        image: "/images/product_journal_accounts.png",
    },
];
