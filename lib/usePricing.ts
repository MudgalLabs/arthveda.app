"use client";

import { CurrencyCode } from "@/lib/utils";

// Single source of truth for the pricing NUMBERS. The pricing *structure* is
// locked (docs/v2_marketing_plan.md §7: FREEMIUM + 30-day Pro trial; full
// 2-column table). Only these numbers are a moving target — keep them here so
// copy stays truthful when they change.
//
// All displayed prices are GST-INCLUSIVE (decision 2026-07-05): the sticker is
// the charged amount. Paddle prices must be configured as tax-inclusive to
// match.
//
// India-only pricing (decision 2026-05-29): displayed prices are INR. Paddle's
// own checkout enforces the country gate at transaction time; the marketing
// page doesn't try to detect the visitor's region.

interface PricingInfo {
    monthlyPrice: number;
    yearlyPrice: number;
    /** The One-time purchase (Paddle/env still call it "lifetime"). */
    oneTimePrice: number;
    /** Effective per-month price when billed yearly (rounded). */
    yearlyMonthlyPrice: number;
    /** Annual saving vs paying month-to-month: monthly × 12 − yearly. */
    yearlySaving: number;
    /** Yearly discount vs monthly, rounded — drives the "Save X%" pill copy. */
    yearlySavingPct: number;
    currency: CurrencyCode;
}

export function usePricing(): PricingInfo {
    const monthlyPrice = 399;
    const yearlyPrice = 2499;
    // One-time is a standing plan priced at ~2× yearly — deliberately close
    // enough that "I'll trade for years anyway, pay once" is an easy yes.
    const oneTimePrice = 4999;
    const currency: CurrencyCode = "inr";

    const monthlyAnnualCost = monthlyPrice * 12;
    const yearlySaving = monthlyAnnualCost - yearlyPrice;
    const yearlySavingPct = Math.round((yearlySaving / monthlyAnnualCost) * 100);

    return {
        monthlyPrice,
        yearlyPrice,
        oneTimePrice,
        yearlyMonthlyPrice: Math.round(yearlyPrice / 12),
        yearlySaving,
        yearlySavingPct,
        currency,
    };
}
