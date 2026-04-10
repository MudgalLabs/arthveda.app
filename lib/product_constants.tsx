import {
    BarChart3,
    TrendingUp,
    BookOpen,
    FileText,
    ListOrdered,
    CalendarDays,
    Tags,
    Building2,
} from "lucide-react";

export const PRODUCT = {
    insights: {
        title: "Insights",
        desc: "See your mistakes clearly.",
        href: "/product/insights",
        Icon: BarChart3,
        image: "/images/product_insights.png",
        alt: "Insights",
        imageClassName:
            "absolute top-0 left-0 origin-top-left scale-[1] group-hover:scale-[1.05]",
    },

    performance: {
        title: "Performance",
        desc: "Know if you're actually improving.",
        href: "/product/performance",
        Icon: TrendingUp,
        image: "/images/product_dashboard.png",
        alt: "Performance",
        imageClassName:
            "absolute top-0 left-0 origin-top-left scale-[1.4] group-hover:scale-[1.45]",
    },

    journal: {
        title: "Journal",
        desc: "Understand the why behind a trade.",
        href: "/product/journal",
        Icon: BookOpen,
        image: "/images/product_journal.png",
        alt: "Journal",
        imageClassName:
            "absolute top-0 left-0 origin-top-left scale-[1.4] group-hover:scale-[1.45]",
    },

    reports: {
        title: "Reports",
        desc: "Find what’s consistently working.",
        href: "/product/reports",
        Icon: FileText,
        image: "/images/product_reports.png",
        alt: "Reports",
        imageClassName:
            "absolute top-0 left-0 origin-top-left scale-[1.4] group-hover:scale-[1.45]",
    },

    trades: {
        title: "Trades",
        desc: "All your trades, in one place.",
        href: "/product/trades",
        Icon: ListOrdered,
        image: "/images/product_positions.png",
        alt: "Trades",
        imageClassName:
            "absolute top-0 left-0 origin-top-left scale-[1.35] group-hover:scale-[1.4]",
    },

    calendar: {
        title: "Calendar",
        desc: "See your trading over time.",
        href: "/product/calendar",
        Icon: CalendarDays,
        image: "/images/product_calendar.png",
        alt: "Calendar",
        imageClassName:
            "absolute top-0 left-0 origin-top-right scale-[1.5] group-hover:scale-[1.55]",
    },

    tagging: {
        title: "Tagging",
        desc: "Spot patterns you’d otherwise miss.",
        href: "/product/tagging",
        Icon: Tags,
        image: "/images/product_tags.png",
        alt: "Tagging",
        imageClassName:
            "absolute top-0 left-0 origin-top-left scale-[1.4] group-hover:scale-[1.45]",
    },

    brokers: {
        title: "Brokers",
        desc: "Get your trades into Arthveda.",
        href: "/brokers",
        Icon: Building2,
        image: "/images/product_brokers.png",
        alt: "Brokers",
        imageClassName:
            "absolute top-0 left-0 origin-top-left scale-[1.2] group-hover:scale-[1.25]",
    },
} as const;

export const PRODUCT_KEYS = [
    "insights",
    "performance",
    "journal",
    "reports",
    "trades",
    "calendar",
    "tagging",
    "brokers",
] as const;

export const NAV_PRODUCT_KEYS = PRODUCT_KEYS.filter((key) => key !== "brokers");
