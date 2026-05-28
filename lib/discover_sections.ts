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
    /** Use a gentler bottom fade when the screenshot has content near its
        bottom edge (e.g. a callout note) the default vignette would wash out. */
    softBottomFade?: boolean;
}

export const DISCOVER_FEATURES: DiscoverFeature[] = [
    {
        id: "screener",
        label: "Screener",
        heading: "Scan the whole market in seconds.",
        subheading:
            "Filter every NSE/BSE stock by price, volume, technicals, and breakout signals. Inspect each hit with an inline chart and go from noise to a shortlist fast.",
        image: "/images/product_discover_screener.png",
    },
    {
        id: "progressive-scan",
        label: "Progressive Scan",
        heading: "Find the stocks that keep showing up.",
        subheading:
            "Run several screeners into one session and surface the names that repeat across them. Confluence becomes your signal instead of duplicate noise.",
        image: "/images/product_discover_progressive_scan.png",
        // Session info box sits at the bottom-right of the screenshot.
        softBottomFade: true,
    },
    {
        id: "watchlists",
        label: "Watchlists",
        heading: "Watchlists that remember why.",
        subheading:
            "Add a note to every stock you track and see how it moved since: percent change, max gain, max drawdown. Learn whether your reasoning actually worked.",
        image: "/images/product_discover_watchlist.png",
        // "Added to watchlist" note sits near the bottom of the screenshot.
        softBottomFade: true,
    },
    {
        id: "symbol-journey",
        label: "Symbol Journey",
        heading: "Every stock gets a timeline.",
        subheading:
            "Open any stock to see your full history with it. Every watchlist add, note, and trade on one timeline beside the chart, so the whole story stays in one place.",
        image: "/images/product_discover_symbol_journey.png",
    },
];
