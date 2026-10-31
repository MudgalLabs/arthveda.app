import { getCloudflareContext } from "@opennextjs/cloudflare";

// The visitor's country from Cloudflare's IP geolocation, for picking the
// pricing currency (lib/usePricing.ts). IP is what Paddle's checkout localizes
// by, so the site and checkout agree. The pages themselves are static, so the
// client asks this once per load. null off Cloudflare (next dev) or when
// Cloudflare can't place the IP.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    let country: string | null = null;
    try {
        country = (getCloudflareContext().cf?.country as string | undefined) ?? null;
    } catch {
        // Not running on Cloudflare.
    }
    country ??= request.headers.get("cf-ipcountry");

    return Response.json({ country }, { headers: { "Cache-Control": "private, no-store" } });
}
