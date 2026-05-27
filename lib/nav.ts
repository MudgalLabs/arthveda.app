import {
    Radar,
    Play,
    Bookmark,
    Telescope,
    LayoutDashboard,
    Sparkles,
    PieChart,
    ListOrdered,
    NotebookPen,
    CalendarDays,
    Tags,
    Wallet,
    UserRound,
    type LucideIcon,
} from "lucide-react";

export interface NavItem {
    title: string;
    /** Short one-liner — keep brief so it stays on a single line in the menu. */
    desc: string;
    /** Links to the feature page, e.g. /product/discover#screener. */
    href: string;
    Icon: LucideIcon;
}

export interface NavFamily {
    name: string;
    /** Family hub page. */
    href: string;
    /** Feature pages. A family with a single item renders as a plain nav link. */
    items: NavItem[];
}

// The product families that drive the nav (plan §3/§4). Families appear only
// once they ship — Options/Algo get added here later.
//
// Naming note: feature names use "Symbol" (concrete) since we'll later expand
// to index/F&O underlyings; ICP marketing copy can still say "stock".
export const NAV_FAMILIES: NavFamily[] = [
    {
        name: "Discover",
        href: "/product/discover",
        items: [
            {
                title: "Screener",
                desc: "Scan the whole NSE/BSE",
                href: "/product/discover#screener",
                Icon: Radar,
            },
            {
                title: "Progressive Scan",
                desc: "Stocks that keep showing up",
                href: "/product/discover#progressive-scan",
                Icon: Play,
            },
            {
                title: "Watchlists",
                desc: "Track performance, with add/remove notes",
                href: "/product/discover#watchlists",
                Icon: Bookmark,
            },
            {
                title: "Symbol Journey",
                desc: "Your full history with every symbol",
                href: "/product/discover#symbol-journey",
                Icon: Telescope,
            },
        ],
    },
    {
        name: "Journal",
        href: "/product/journal",
        items: [
            {
                title: "Dashboard",
                desc: "Your trading at a glance",
                href: "/product/journal#dashboard",
                Icon: LayoutDashboard,
            },
            {
                title: "Insights",
                desc: "Where you make and lose money",
                href: "/product/journal#insights",
                Icon: Sparkles,
            },
            {
                title: "Reports & Analytics",
                desc: "Your performance breakdown",
                href: "/product/journal#reports",
                Icon: PieChart,
            },
            {
                title: "Trades",
                desc: "All your trades, in one place",
                href: "/product/journal#trades",
                Icon: ListOrdered,
            },
            {
                title: "Notebook",
                desc: "The why behind every trade",
                href: "/product/journal#notebook",
                Icon: NotebookPen,
            },
            {
                title: "Calendar",
                desc: "Your activity, day by day",
                href: "/product/journal#calendar",
                Icon: CalendarDays,
            },
            {
                title: "Tagging",
                desc: "Spot patterns you'd otherwise miss",
                href: "/product/journal#tagging",
                Icon: Tags,
            },
            {
                title: "Accounts",
                desc: "All your trading accounts, in one place",
                href: "/product/journal#accounts",
                Icon: Wallet,
            },
        ],
    },
    {
        name: "Social",
        href: "/product/social",
        // Single shipped product → renders as a plain link, not a dropdown.
        items: [
            {
                title: "Trader Profiles",
                desc: "Showcase your process, not just P&L",
                href: "/product/social#trader-profiles",
                Icon: UserRound,
            },
        ],
    },
];
