"use client";

import { CurrencyCode, getUserTimezone } from "@/lib/utils";

interface PricingInfo {
    monthlyPrice: number;
    yearlyPrice: number;
    currency: CurrencyCode;
    isIndia: boolean;
}

export function usePricing(): PricingInfo {
    const tz = getUserTimezone();
    const isIndia = tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
    const monthlyPrice = isIndia ? 299 : 9;
    const yearlyPrice = isIndia ? 1999 : 69;
    const currency = isIndia ? "inr" : "usd";

    return { monthlyPrice, yearlyPrice, currency, isIndia };
}
