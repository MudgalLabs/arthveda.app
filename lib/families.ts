import { Telescope, BookOpenText, Users, type LucideIcon } from "lucide-react";

// The three product families (Discover / Journal / Social) that power the
// stacked homepage blocks and, later, the hub pages. Copy is locked in
// docs/v2_marketing_plan.md §5 — do not invent features. Social ships ONLY
// Trader Profiles (no shared trades / chart study / feed).

// Single source of truth for the per-family icons — reused as a visual cue
// anywhere a family name appears (nav dropdown, homepage blocks, hub heroes).
export const FAMILY_ICONS: Record<ProductFamily["key"], LucideIcon> = {
    discover: Telescope,
    journal: BookOpenText,
    social: Users,
};

export interface ProductFamily {
    key: "discover" | "journal" | "social";
    name: string;
    /** Short punchy tagline (the emotional hook). */
    tagline: string;
    /** 1–2 sentence blurb. */
    blurb: string;
    ctaLabel: string;
    href: string;
    /** Screenshot for the block. `image` null => render styled placeholder. */
    image: string | null;
    imageAlt: string;
    /** Short label shown inside the placeholder frame when no image yet. */
    placeholderLabel: string;
}

export const FAMILIES: ProductFamily[] = [
    {
        key: "discover",
        name: "Discover",
        tagline: "Find ideas. Track what happens next.",
        blurb: "Screen the whole NSE/BSE, read the market with heatmaps, breadth and sector rotation, and save ideas to watchlists that track how each one plays out.",
        ctaLabel: "Explore Discover",
        href: "/product/discover",
        image: "/images/v2/product-discover.png",
        imageAlt: "Arthveda Screener results across NSE/BSE",
        placeholderLabel: "Screener · results view",
    },
    {
        key: "journal",
        name: "Journal",
        tagline: "Know where your trading works, and where it breaks.",
        blurb: "Log or import trades, journal the thinking behind them, and see where you make money, where you lose it, and what to fix.",
        ctaLabel: "Explore Journal",
        href: "/product/journal",
        image: "/images/v2/product-journal.png",
        imageAlt: "Arthveda Journal insights: where you make and lose money",
        placeholderLabel: "Journal · insights",
    },
    {
        key: "social",
        name: "Social",
        tagline: "Build proof around your process.",
        blurb: "Publish your screeners and watchlists to showcase how you actually trade. No P&L leaderboard, no noisy feed.",
        ctaLabel: "Explore Social",
        href: "/product/social",
        image: "/images/v2/product-social.png",
        imageAlt: "Arthveda trader profile: process over P&L",
        placeholderLabel: "Trader profile",
    },
];
