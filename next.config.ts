import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",

    images: {
        loader: "default",
        formats: ["image/webp"],
        unoptimized: false,
    },
};

export default nextConfig;
