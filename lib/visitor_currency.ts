import { headers } from "next/headers";
import geoip from "geoip-country";

import type { PricingCurrency } from "@/lib/pricing";

// visitorCurrency picks the pricing currency from the request's IP: INR for
// India, USD for everywhere else. arthveda.app sits behind Caddy on the VPS
// (no Cloudflare, so no country header), and Caddy passes the client IP in
// X-Forwarded-For; geoip-country maps it offline (MaxMind GeoLite2, bundled).
// An IP it can't place (localhost, private ranges) gets INR: India-first, and
// it's what local dev sees. Calling this makes the page render per request.
export async function visitorCurrency(): Promise<PricingCurrency> {
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
    const country = ip ? geoip.lookup(ip)?.country : undefined;
    return country && country !== "IN" ? "usd" : "inr";
}
