import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",

    images: {
        loader: "default",
        formats: ["image/webp"],
        unoptimized: false,
    },

    // The v1 /roadmap page is removed (plan §8/§11: do not leak the roadmap).
    // Permanently redirect it to home so we don't drop any inbound links.
    async redirects() {
        return [{ source: "/roadmap", destination: "/", permanent: true }];
    },
};

export default nextConfig;
