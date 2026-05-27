// Discover family page: a left-aligned hero, then a 2-up grid of feature cards
// (4 cards, 2 rows). Mirrors the Journal build (lib/journal_sections.ts +
// FeatureCard). Copy is locked in docs/v2_marketing_plan.md §7. Card copy is
// second person ("…so you…").
//
// Naming (marketing_context.md §8): feature *labels* use "Symbol", *prose* uses
// "stock" — never both in one phrase.

export interface DiscoverFeature {
    id: string;
    /** Short feature name, shown as a subtle caption above the image. */
    label: string;
    heading: string;
    subheading: string;
    /** Screenshot path, or null to render a placeholder until captured. */
    image: string | null;
    /** Short label shown inside the placeholder when `image` is null. */
    placeholderLabel?: string;
}

export const DISCOVER_FEATURES: DiscoverFeature[] = [
    {
        id: "screener",
        label: "Screener",
        heading: "Scan the whole market in seconds.",
        subheading:
            "Filter every NSE/BSE stock by price, volume, technicals, and breakout signals, and inspect each hit with an inline chart, so you go from noise to a shortlist fast.",
        image: "/images/v2/product-discover.png",
    },
    {
        id: "progressive-scan",
        label: "Progressive Scan",
        heading: "Find the stocks that keep showing up.",
        subheading:
            "Run several screeners into one session and surface the names that repeat across them, so confluence becomes your signal instead of duplicate noise.",
        image: null,
        placeholderLabel: "Progressive Scan — repeat signals",
    },
    {
        id: "watchlists",
        label: "Watchlists",
        heading: "Watchlists that remember why.",
        subheading:
            "Add a note to every stock you track and see how it moved since — percent change, max gain, max drawdown — so you learn whether your reasoning actually worked.",
        image: null,
        placeholderLabel: "Watchlist — intelligence columns",
    },
    {
        id: "symbol-journey",
        label: "Symbol Journey",
        heading: "Every stock gets a timeline.",
        subheading:
            "Open any stock to see your full history with it — every watchlist add, note, and trade on one timeline beside the chart — so the whole story stays in one place.",
        // Same frame as the hero video poster (the /symbols/IRFC command center).
        image: "/images/v2/video-poster.png",
    },
];
