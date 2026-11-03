import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",

    // geoip-country reads its MaxMind data files from its own folder at
    // runtime (lib/visitor_country.ts), so it stays a plain node_modules
    // require and its data/ ships in the standalone build of the pages that
    // price by visitor IP.
    serverExternalPackages: ["geoip-country"],
    outputFileTracingIncludes: {
        "/pricing": ["./node_modules/geoip-country/data/**/*"],
        "/brokers/**": ["./node_modules/geoip-country/data/**/*"],
    },

    images: {
        loader: "default",
        formats: ["image/webp"],
        unoptimized: false,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ceoshikhar.com",
                pathname: "/images/**",
            },
        ],
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
