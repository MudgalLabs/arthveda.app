// Single source of truth for the pricing NUMBERS on this site.
//
// Structure as of 2026-07-20: 14-day free trial (no card), then the workspace
// goes read-only until you subscribe. We sell YEARLY and ONE-TIME only.
// Monthly still exists as a Paddle price for legacy subscribers and support,
// but it is never displayed — which is also why the old "save X% with yearly"
// figure is gone: a saving measured against a price we don't sell would be a
// false claim.
//
// Global pricing (2026-10-31): USD everywhere, INR in India (Paddle's base
// price and its India override; keep the two in sync by hand). Which row a
// visitor sees is decided on the server from their IP (lib/visitor_currency.ts).
//
// All displayed prices are tax-INCLUSIVE (GST in India, decision 2026-07-05):
// the sticker is the charged amount. Paddle prices must be configured as
// tax-inclusive to match.

export type PricingCurrency = "inr" | "usd";

const PRICES: Record<PricingCurrency, { yearly: number; oneTime: number }> = {
    // One-time is a standing plan priced a little over 2× yearly —
    // deliberately close enough that "I'll trade for years anyway, pay once"
    // is an easy yes.
    inr: { yearly: 2999, oneTime: 6999 },
    usd: { yearly: 49, oneTime: 99 },
};

export interface PricingInfo {
    yearlyPrice: number;
    /** The One-time purchase (Paddle/env still call it "lifetime"). */
    oneTimePrice: number;
    /** Effective per-month price when billed yearly (rounded). */
    yearlyMonthlyPrice: number;
    currency: PricingCurrency;
    /** India's tax is GST; elsewhere it's the local sales tax/VAT. */
    taxName: "GST" | "taxes";
}

export function pricingFor(currency: PricingCurrency): PricingInfo {
    const { yearly, oneTime } = PRICES[currency];
    return {
        yearlyPrice: yearly,
        oneTimePrice: oneTime,
        yearlyMonthlyPrice: Math.round(yearly / 12),
        currency,
        taxName: currency === "inr" ? "GST" : "taxes",
    };
}
