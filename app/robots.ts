import type { MetadataRoute } from "next";

// metadataBase (app/layout.tsx) makes the sitemap URL absolute.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://arthveda.app/sitemap.xml",
        host: "https://arthveda.app",
    };
}
