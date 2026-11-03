// The pricing NUMBERS on this site come from Paddle, never from code
// (2026-11-03): the server asks the Arthveda API (GET /v1/pricing), which
// holds the Paddle key and returns Paddle's pricing preview for the visitor's
// country. Change a price in Paddle and this site, the app and checkout all
// follow, with no deploy. The API caches each country for 10 minutes. This
// site still loads no Paddle.js.
//
// Paddle holds a USD base price with an India override (INR); Paddle may also
// convert into another local currency, which the formatter handles.
//
// Plans: monthly, yearly and One-time (monthly sold again from 2026-11-03).
// Every account starts with a 14-day no-card trial, then goes read-only until
// it subscribes.
//
// All displayed prices are tax-INCLUSIVE (GST in India, decision 2026-07-05):
// the sticker is the charged amount. Paddle prices must be configured as
// tax-inclusive to match.

// Production reaches the API over the shared Docker network (both containers
// sit on caddy_net); local dev runs it on :1337. ARTHVEDA_API_INTERNAL_URL
// overrides either.
const API_URL =
    process.env.ARTHVEDA_API_INTERNAL_URL ||
    (process.env.NODE_ENV === "production" ? "http://arthveda_api:1337" : "http://localhost:1337");

export interface PricingInfo {
    monthlyPrice: number;
    yearlyPrice: number;
    /** The One-time purchase (Paddle/env still call it "lifetime"). */
    oneTimePrice: number;
    /**
     * Effective per-month price when billed yearly. Small amounts keep their
     * cents ($69/yr is $5.75, not $6); larger ones round to a whole unit
     * (₹3,999/yr is ₹333).
     */
    yearlyMonthlyPrice: number;
    /** Yearly's saving over twelve months of monthly, floored to a whole percent. */
    yearlySavingsPercent: number;
    /** How many months of monthly cost more than One-time (One-time is "less than N months"). */
    oneTimeBreakEvenMonths: number;
    /** ISO 4217, upper case: usually USD or INR. */
    currency: string;
    /** India's tax is GST; elsewhere it's the local sales tax/VAT. */
    taxName: "GST" | "taxes";
}

interface ApiPrices {
    currency_code: string;
    monthly: number;
    yearly: number;
    one_time: number;
}

// fetchPricing returns the visitor's prices, or null when the API can't be
// reached; callers then render the plans without numbers rather than guess.
// Pass revalidate (seconds) from a page that should stay static, otherwise the
// call is uncached and makes the page render per request.
export async function fetchPricing(country: string, opts: { revalidate?: number } = {}): Promise<PricingInfo | null> {
    try {
        const res = await fetch(`${API_URL}/v1/pricing?country=${encodeURIComponent(country)}`, {
            signal: AbortSignal.timeout(3000),
            ...(opts.revalidate ? { next: { revalidate: opts.revalidate } } : { cache: "no-store" }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = (await res.json()) as { data?: ApiPrices };
        if (!body.data) throw new Error("no data in response");
        return toPricingInfo(body.data);
    } catch (error) {
        console.error(`pricing: could not load prices for ${country}:`, error);
        return null;
    }
}

function toPricingInfo(p: ApiPrices): PricingInfo {
    const currency = p.currency_code.toUpperCase();
    // Paddle amounts are in the currency's minor unit; the decimal count comes
    // from the currency itself (two for USD/INR, zero for JPY).
    const decimals =
        new Intl.NumberFormat("en", { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2;
    const major = (minor: number) => minor / 10 ** decimals;

    const monthlyPrice = major(p.monthly);
    const yearlyPrice = major(p.yearly);
    const oneTimePrice = major(p.one_time);
    const perMonth = yearlyPrice / 12;

    return {
        monthlyPrice,
        yearlyPrice,
        oneTimePrice,
        yearlyMonthlyPrice: perMonth < 100 ? Math.round(perMonth * 100) / 100 : Math.round(perMonth),
        yearlySavingsPercent:
            monthlyPrice > 0 ? Math.max(0, Math.floor((1 - yearlyPrice / (monthlyPrice * 12)) * 100)) : 0,
        oneTimeBreakEvenMonths: monthlyPrice > 0 ? Math.ceil(oneTimePrice / monthlyPrice) : 0,
        currency,
        taxName: currency === "INR" ? "GST" : "taxes",
    };
}

// formatPrice shows whole units, except an amount that has cents ($5.75).
export function formatPrice(amount: number, currency: string): string {
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
}
