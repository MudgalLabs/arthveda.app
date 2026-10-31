"use client";

import { useEffect, useState } from "react";

import { CurrencyCode } from "@/lib/utils";

// Single source of truth for the pricing NUMBERS on this site. The app reads
// its prices live from Paddle (~/dev/arthveda/web/src/features/settings/
// plan_and_billing/hooks/use_pricing.ts); this site has no Paddle.js, so these
// are hand-synced with the Paddle prices.
//
// Structure as of 2026-07-20: 14-day free trial (no card), then the workspace
// goes read-only until you subscribe. We sell YEARLY and ONE-TIME only.
// Monthly still exists as a Paddle price for legacy subscribers and support,
// but it is never displayed — which is also why the old "save X% with yearly"
// figure is gone: a saving measured against a price we don't sell would be a
// false claim.
//
// Global pricing (2026-10-31): Paddle's base price is USD with an India
// override in INR. India is told apart by the browser's time zone, which
// needs the client: the server render (and crawlers) get India's prices, and
// visitors elsewhere switch to USD right after mount. Checkout, in the app,
// always shows Paddle's exact price for the buyer's location.
//
// All displayed prices are tax-INCLUSIVE (GST in India, decision 2026-07-05):
// the sticker is the charged amount. Paddle prices must be configured as
// tax-inclusive to match.

const PRICES: Record<CurrencyCode, { yearly: number; oneTime: number }> = {
    // One-time is a standing plan priced a little over 2× yearly —
    // deliberately close enough that "I'll trade for years anyway, pay once"
    // is an easy yes.
    inr: { yearly: 2999, oneTime: 6999 },
    usd: { yearly: 49, oneTime: 99 },
};

interface PricingInfo {
    yearlyPrice: number;
    /** The One-time purchase (Paddle/env still call it "lifetime"). */
    oneTimePrice: number;
    /** Effective per-month price when billed yearly (rounded). */
    yearlyMonthlyPrice: number;
    currency: CurrencyCode;
    /** India's tax is GST; elsewhere it's the local sales tax/VAT. */
    taxName: "GST" | "taxes";
}

function isIndiaTimeZone(): boolean {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
    } catch {
        return true;
    }
}

export function usePricing(): PricingInfo {
    const [currency, setCurrency] = useState<CurrencyCode>("inr");

    useEffect(() => {
        if (!isIndiaTimeZone()) setCurrency("usd");
    }, []);

    const { yearly, oneTime } = PRICES[currency];

    return {
        yearlyPrice: yearly,
        oneTimePrice: oneTime,
        yearlyMonthlyPrice: Math.round(yearly / 12),
        currency,
        taxName: currency === "inr" ? "GST" : "taxes",
    };
}
