"use client";

import { CurrencyCode } from "@/lib/utils";

// Single source of truth for the pricing NUMBERS. Kept in sync by hand with
// the app's copy at ~/dev/arthveda/web/src/features/settings/plan_and_billing/
// hooks/use_pricing.ts.
//
// Structure as of 2026-07-20: 14-day free trial (no card), then the workspace
// goes read-only until you subscribe. We sell YEARLY and ONE-TIME only.
// Monthly (₹399) still exists as a Paddle price for legacy subscribers and
// support, but it is never displayed — which is also why the old "save X% with
// yearly" figure is gone: a saving measured against a price we don't sell
// would be a false claim.
//
// All displayed prices are GST-INCLUSIVE (decision 2026-07-05): the sticker is
// the charged amount. Paddle prices must be configured as tax-inclusive to
// match.
//
// India-only pricing (decision 2026-05-29): displayed prices are INR. Paddle's
// own checkout enforces the country gate at transaction time; the marketing
// page doesn't try to detect the visitor's region.

interface PricingInfo {
    yearlyPrice: number;
    /** The One-time purchase (Paddle/env still call it "lifetime"). */
    oneTimePrice: number;
    /** Effective per-month price when billed yearly (rounded). */
    yearlyMonthlyPrice: number;
    currency: CurrencyCode;
}

export function usePricing(): PricingInfo {
    const yearlyPrice = 2499;
    // One-time is a standing plan priced at ~2× yearly — deliberately close
    // enough that "I'll trade for years anyway, pay once" is an easy yes.
    const oneTimePrice = 4999;
    const currency: CurrencyCode = "inr";

    return {
        yearlyPrice,
        oneTimePrice,
        yearlyMonthlyPrice: Math.round(yearlyPrice / 12),
        currency,
    };
}
