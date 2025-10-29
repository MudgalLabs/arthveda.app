"use client";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";

export function PriceTag() {
    const { yearlyPrice, currency } = usePricing();

    return (
        <span className="brand-gradient-bg text-accent-muted font-bold px-2 md:px-4 py-1 md:py-2 rounded-full shadow-lg text-xs md:text-lg border-2 md:border-3 border-white/80 backdrop-blur-sm">
            {formatCurrency(yearlyPrice, { currency })}/year
        </span>
    );
}
