"use client";

import { formatPrice } from "@/lib/pricing";
import { usePricing } from "@/lib/usePricing";

// Renders nothing without live prices (outside a PricingProvider, or when the
// API couldn't be reached) rather than a guessed number.
export function PriceTag() {
    const pricing = usePricing();
    if (!pricing) return null;

    return (
        <span className="brand-gradient-bg text-accent-muted font-bold px-2 md:px-4 py-1 md:py-2 rounded-full shadow-lg text-xs md:text-lg border-2 md:border-3 border-white/80 backdrop-blur-sm">
            {formatPrice(pricing.yearlyPrice, pricing.currency)}/year
        </span>
    );
}
