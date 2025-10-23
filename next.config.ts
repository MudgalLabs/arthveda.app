import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        loader: "default",
        formats: ["image/webp"],
        unoptimized: false,
    },
};

export default nextConfig;
