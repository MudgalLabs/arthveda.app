import type { MetadataRoute } from "next";

const BASE = "https://arthveda.app";

// Public, indexable routes only. The v1 product pages are 301'd in
// next.config.ts and deliberately excluded; /roadmap is gone.
const ROUTES: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/product/journal", priority: 0.9 },
    { path: "/product/discover", priority: 0.9 },
    { path: "/product/social", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    { path: "/brokers", priority: 0.6 },
    { path: "/brokers/zerodha", priority: 0.7 },
    { path: "/brokers/groww", priority: 0.7 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.4 },
    { path: "/terms", priority: 0.2 },
    { path: "/privacy", priority: 0.2 },
    { path: "/refund", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return ROUTES.map(({ path, priority }) => ({
        url: `${BASE}${path}`,
        changeFrequency: "monthly",
        priority,
    }));
}
