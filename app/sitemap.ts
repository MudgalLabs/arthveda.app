import type { MetadataRoute } from "next";

import { UPDATES } from "@/lib/updates";

const BASE = "https://arthveda.app";

// Public, indexable routes only. The v1 product pages are 301'd in
// next.config.ts and deliberately excluded; /roadmap is gone.
const ROUTES: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/product/journal", priority: 0.9 },
    { path: "/product/discover", priority: 0.9 },
    { path: "/product/social", priority: 0.9 },
    { path: "/product/ai", priority: 0.8 },
    { path: "/pricing", priority: 0.8 },
    { path: "/brokers", priority: 0.6 },
    { path: "/brokers/zerodha", priority: 0.7 },
    { path: "/brokers/groww", priority: 0.7 },
    { path: "/brokers/angel-one", priority: 0.7 },
    { path: "/brokers/fyers", priority: 0.7 },
    { path: "/brokers/indmoney", priority: 0.7 },
    { path: "/brokers/kotak-securities", priority: 0.7 },
    { path: "/brokers/upstox", priority: 0.7 },
    { path: "/brokers/dhan", priority: 0.7 },
    { path: "/brokers/definedge", priority: 0.7 },
    { path: "/updates", priority: 0.6, lastModified: UPDATES[0]?.date },
    ...UPDATES.map((u) => ({ path: `/updates/${u.slug}`, priority: 0.5, lastModified: u.date })),
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.4 },
    { path: "/terms", priority: 0.2 },
    { path: "/privacy", priority: 0.2 },
    { path: "/refund", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return ROUTES.map(({ path, priority, lastModified }) => ({
        url: `${BASE}${path}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly",
        priority,
    }));
}
