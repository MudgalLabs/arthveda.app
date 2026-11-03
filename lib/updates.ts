// One release post on /updates. The list is the timeline, newest first, and
// each entry renders at /updates/<slug>. Post bodies live in
// content/updates (UPDATE_BODIES), kept out of this file so the navbar dot
// can read the list without pulling every post into the client bundle.
//
// The slug is the URL the in-app "Product updates" notification links to
// (arthveda/api cmd/send_announcement) and the URL the social posts share, so
// never rename one after it has been sent.
export type Update = {
    slug: string;
    // ISO date (YYYY-MM-DD) the release shipped.
    date: string;
    title: string;
    // One or two sentences: the timeline card, the meta description and the
    // social preview text. Keep it under ~160 characters.
    summary: string;
    tags: string[];
    // Search terms for this post only (the site-wide list in app/layout.tsx is
    // about the product, not the release).
    keywords: string[];
    // A real screenshot of the feature, in /public. It is the post's hero, the
    // timeline thumbnail and the og:image, so a shared link previews with it.
    // Aim for about 1.9:1 (the og:image shape).
    cover: { src: string; width: number; height: number; alt: string };
    // The share card: the cover cut to 1200x630 JPG, the size LinkedIn, X,
    // WhatsApp and Discord all render without re-cropping, and light enough
    // that no scraper times out on it.
    og: { src: string; width: number; height: number };
};

export const UPDATES: Update[] = [
    {
        slug: "benchmark-widget",
        date: "2026-11-03",
        title: "Benchmark: did you beat the index?",
        summary:
            "A new dashboard widget that plots your return against Nifty 50, S&P 500 and six more indices over the same period, net of charges.",
        tags: ["Journal", "Dashboard"],
        keywords: [
            "benchmark trading performance",
            "compare trading returns with Nifty 50",
            "trading journal vs index",
            "did I beat the market",
            "time-weighted return trading",
            "Nifty 50 vs portfolio",
            "S&P 500 benchmark trading journal",
            "Arthveda Benchmark widget",
        ],
        cover: {
            src: "/images/updates/benchmark-widget-cover.png",
            width: 2848,
            height: 1492,
            alt: "The Benchmark widget: your return against Nifty 50, Nifty Midcap 150 and S&P 500, all starting from 0%",
        },
        og: { src: "/images/updates/benchmark-widget-og.jpg", width: 1200, height: 630 },
    },
];

export function getUpdate(slug: string): Update | undefined {
    return UPDATES.find((u) => u.slug === slug);
}

// How long the newest post counts as news for a browser that has never opened
// /updates (the navbar dot, lib/updates_seen.ts). "New" is date-bounded.
const NEW_FOR_DAYS = 30;

export function latestNewUpdate(now: Date = new Date()): Update | undefined {
    const u = UPDATES[0];
    if (!u) return undefined;
    const age = (now.getTime() - new Date(`${u.date}T00:00:00Z`).getTime()) / 86_400_000;
    return age <= NEW_FOR_DAYS ? u : undefined;
}

export function formatUpdateDate(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}
