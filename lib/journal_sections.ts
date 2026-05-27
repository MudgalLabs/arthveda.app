// Journal family page: a left-aligned hero, then a 2-up grid of feature cards
// (8 cards, 4 rows). Copy + images are the v1 feature pages, re-homed here (em
// dashes removed). `id` is the nav deep-link anchor (/product/journal#insights).

export interface JournalFeature {
    id: string;
    /** Short feature name, shown as a subtle caption above the image. */
    label: string;
    heading: string;
    subheading: string;
    image: string;
}

export const JOURNAL_FEATURES: JournalFeature[] = [
    {
        id: "insights",
        label: "Insights",
        heading: "See what's actually hurting your trading.",
        subheading:
            "Arthveda analyzes your trades to show why you lose money and what needs to change, so you can improve with clarity, not intuition.",
        image: "/images/insights_hero.png",
    },
    {
        id: "dashboard",
        label: "Dashboard",
        heading: "Know if you're actually improving.",
        subheading:
            "Track your PnL, win rate, and overall performance over time, so you can measure progress with real data, not assumptions.",
        image: "/images/dashboard-hero.png",
    },
    {
        id: "reports",
        label: "Reports & Analytics",
        heading: "Find what's consistently working.",
        subheading:
            "Break performance down across setups, symbols, and patterns, so you can double down on what works and cut what doesn't.",
        image: "/images/reports_hero.png",
    },
    {
        id: "trades",
        label: "Trades",
        heading: "All your trades, in one place.",
        subheading:
            "Your complete trading history with powerful filters and detailed breakdowns, so nothing gets lost or overlooked.",
        image: "/images/trades_hero.png",
    },
    {
        id: "notebook",
        label: "Notebook",
        heading: "Understand the why behind every trade.",
        subheading:
            "Write your reasoning, attach screenshots, and review your decisions, so you learn from every trade, not just the outcome.",
        image: "/images/journal_hero.png",
    },
    {
        id: "calendar",
        label: "Calendar",
        heading: "See your trading over time.",
        subheading:
            "Your daily activity in a calendar view, so you can spot patterns, streaks, and consistency at a glance.",
        image: "/images/calendar_hero.png",
    },
    {
        id: "tagging",
        label: "Tagging",
        heading: "Spot patterns you'd otherwise miss.",
        subheading:
            "Tag your trades by setup, mistake, or behavior, and uncover patterns that aren't visible otherwise.",
        image: "/images/tagging_hero.png",
    },
    {
        id: "accounts",
        label: "Accounts",
        heading: "See everything, across all your accounts.",
        subheading:
            "Track multiple trading accounts in one place, across brokers, strategies, and capital, without losing clarity.",
        image: "/images/accounts_hero.png",
    },
];
