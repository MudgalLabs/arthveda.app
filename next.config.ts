import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",

    images: {
        loader: "default",
        formats: ["image/webp"],
        unoptimized: false,
    },

    // v1 → v2 redirects (plan §11). Old per-feature product pages collapse
    // into the single Journal hub — we deliberately don't deep-link to in-page
    // sections; just land on the hub root. /roadmap was removed entirely
    // (plan §8: don't leak the roadmap).
    async redirects() {
        return [
            { source: "/roadmap", destination: "/", permanent: true },
            {
                source: "/product/insights",
                destination: "/product/journal",
                permanent: true,
            },
            {
                source: "/product/calendar",
                destination: "/product/journal",
                permanent: true,
            },
            {
                source: "/product/tagging",
                destination: "/product/journal",
                permanent: true,
            },
            {
                source: "/product/trades",
                destination: "/product/journal",
                permanent: true,
            },
            {
                source: "/product/accounts",
                destination: "/product/journal",
                permanent: true,
            },
            {
                source: "/product/reports",
                destination: "/product/journal",
                permanent: true,
            },
            {
                source: "/product/performance",
                destination: "/product/journal",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
