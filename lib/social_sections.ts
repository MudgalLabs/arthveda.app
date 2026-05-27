// Social family page: a left-aligned hero, then a 2-up grid of feature cards
// (2 cards, 1 row). Mirrors the Discover/Journal build (FeatureCard). Copy is
// locked in docs/v2_marketing_plan.md §7. Card copy is second person.
//
// Social ships exactly ONE product — Trader Profiles. These two cards are
// SURFACES inside that one profile, not separate products: never imply shared
// trades, chart study, a feed, or clans (all future; kept off the site).
//
// Why only 2 cards (plan §7): "Trader Profile" was dropped (the hero already
// says the page is about building your identity); "Showcase" + "Published work"
// were merged (same idea — your published screeners/watchlists, curated). "Find
// traders" stays off the grid — discovering *others* is off-thesis for a "build
// your identity" page; it lives in the hero subheading + the CTA instead.

export interface SocialFeature {
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

export const SOCIAL_FEATURES: SocialFeature[] = [
    {
        id: "showcase",
        label: "Showcase",
        heading: "Show your work, not your P&L.",
        subheading:
            "Publish your screeners and watchlists for anyone to open and clone, and pin your best to a showcase, so your reputation rests on your ideas, not P&L screenshots.",
        image: null,
        placeholderLabel: "Showcase — pinned & published screeners/watchlists",
    },
    {
        id: "activity",
        label: "Activity",
        heading: "Let your consistency show.",
        subheading:
            "An activity heatmap, a workflow breakdown, and a recent timeline, so your discipline is visible to others — and you can see whether you're running the full process or just logging trades.",
        image: null,
        placeholderLabel: "Activity — heatmap, workflow & timeline",
    },
];
