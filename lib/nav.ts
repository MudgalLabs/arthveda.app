import { Sparkles, type LucideIcon } from "lucide-react";

import { FAMILY_ICONS } from "@/lib/families";

export interface NavFamily {
    name: string;
    /** One-line subtitle — the family names are abstract, so the subtitle
        does the explaining (plan §4). */
    subtitle: string;
    /** Family hub page. */
    href: string;
    Icon: LucideIcon;
}

// The Product menu lists the 3 families plus AI — no per-feature links and no
// `#anchor` deep-links (plan §4). The names are abstract layers (esp. "Social"
// and "AI"), so a one-line subtitle does the explaining; each hub page lists
// its own features. This decouples the nav from each hub's card count, so cards
// can be added / renamed / collapsed freely without ever touching the nav.
// Families appear only once they ship — Options/Algo get added here later.
//
// AI is deliberately NOT a homepage product family (it's cross-cutting — an AI
// assistant reading your Journal, not a fourth layer), so it lives here in the
// nav and at /product/ai but is absent from `lib/families.ts` FAMILIES.
export const NAV_FAMILIES: NavFamily[] = [
    {
        name: "Discover",
        subtitle: "Find, track, and remember your stock ideas",
        href: "/product/discover",
        Icon: FAMILY_ICONS.discover,
    },
    {
        name: "Journal",
        subtitle: "Review trades and improve your process",
        href: "/product/journal",
        Icon: FAMILY_ICONS.journal,
    },
    {
        name: "Social",
        subtitle: "Build a public trading identity",
        href: "/product/social",
        Icon: FAMILY_ICONS.social,
    },
    {
        name: "AI",
        subtitle: "Ask your journal anything, in plain English",
        href: "/product/ai",
        Icon: Sparkles,
    },
];
