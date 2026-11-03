import { headers } from "next/headers";
import geoip from "geoip-country";

// visitorCountry is the two-letter country of the request's IP, which picks
// the visitor's prices (lib/pricing.ts). arthveda.app sits behind Caddy on the
// VPS (no Cloudflare, so no country header), and Caddy passes the client IP
// in X-Forwarded-For; geoip-country maps it offline (MaxMind GeoLite2,
// bundled). An IP it can't place (localhost, private ranges) is India:
// India-first, and it's what local dev sees. Calling this makes the page
// render per request.
export async function visitorCountry(): Promise<string> {
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
    return (ip ? geoip.lookup(ip)?.country : undefined) || "IN";
}
