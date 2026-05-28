"use client";

import { CurrencyCode } from "@/lib/utils";

// Single source of truth for the pricing NUMBERS. The pricing *structure* is
// locked (docs/v2_marketing_plan.md §7: FREEMIUM + 30-day Pro trial; full
// 2-column table; Lifetime as a launch-only strip). Only these numbers are a
// moving target — keep them here so copy stays truthful when they change.
//
// India-only pricing (decision 2026-05-29): displayed prices are INR. Paddle's
// own checkout enforces the country gate at transaction time; the marketing
// page doesn't try to detect the visitor's region.

interface PricingInfo {
    monthlyPrice: number;
    yearlyPrice: number;
    lifetimePrice: number;
    /** Effective per-month price when billed yearly (rounded). */
    yearlyMonthlyPrice: number;
    /** Annual saving vs paying month-to-month: monthly × 12 − yearly. */
    yearlySaving: number;
    /** Yearly discount vs monthly, rounded — drives the "Save X%" pill copy. */
    yearlySavingPct: number;
    currency: CurrencyCode;
}

export function usePricing(): PricingInfo {
    const monthlyPrice = 299;
    const yearlyPrice = 1999;
    // Lifetime is priced as a launch promo with deliberate symmetry: ~2× yearly
    // + a year of buffer (plan §7).
    const lifetimePrice = 3999;
    const currency: CurrencyCode = "inr";

    const monthlyAnnualCost = monthlyPrice * 12;
    const yearlySaving = monthlyAnnualCost - yearlyPrice;
    const yearlySavingPct = Math.round((yearlySaving / monthlyAnnualCost) * 100);

    return {
        monthlyPrice,
        yearlyPrice,
        lifetimePrice,
        yearlyMonthlyPrice: Math.round(yearlyPrice / 12),
        yearlySaving,
        yearlySavingPct,
        currency,
    };
}
