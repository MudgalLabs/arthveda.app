"use client";

import { CurrencyCode, getUserTimezone } from "@/lib/utils";

interface PricingInfo {
    yearlyPrice: number;
    currency: CurrencyCode;
    isIndia: boolean;
}

export function usePricing(): PricingInfo {
    const tz = getUserTimezone();
    const isIndia = tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
    const yearlyPrice = isIndia ? 1500 : 50;
    const currency = isIndia ? "inr" : "usd";

    return { yearlyPrice, currency, isIndia };
}
