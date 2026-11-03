import sitemap from "@/app/sitemap";

// The marketing site's sitemap, served at /sitemap-site.xml.
//
// In production /sitemap.xml and /robots.txt belong to the APP (the API's
// sitemap of screeners, symbols and profiles; the SPA's robots.txt), because
// the VPS Caddyfile sends every path that isn't a marketing path to the app.
// So app/sitemap.ts on its own is never what crawlers see. This route serves
// the same list under a name that doesn't collide, and the app's robots.txt
// (arthveda/web/public/robots.txt) lists it as a second Sitemap. The Caddyfile
// must route /sitemap-site.xml here, like /updates*.
export const dynamic = "force-static";

const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
    const urls = sitemap()
        .map((u) => {
            const lastmod = u.lastModified
                ? `<lastmod>${new Date(u.lastModified).toISOString()}</lastmod>`
                : "";
            const priority = u.priority !== undefined ? `<priority>${u.priority}</priority>` : "";
            return `  <url><loc>${escape(u.url)}</loc>${lastmod}${priority}</url>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
    return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
