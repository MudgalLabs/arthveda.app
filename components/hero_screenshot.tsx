"use client";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";
import { Screenshot } from "@/components/screenshot";

export function HeroScreenshot() {
    const { yearlyPrice, currency } = usePricing();

    return (
        <div className="relative w-fit mx-auto">
            <span className="absolute -top-1 sm:-top-4 right-0 sm:-right-4 z-10 brand-gradient-bg text-accent-muted font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg text-xs sm:text-lg border-2 sm:border-3 border-white/80 backdrop-blur-sm">
                {formatCurrency(yearlyPrice, { currency })}/year
            </span>
            <Screenshot src="/images/dashboard.webp" alt="Arthveda Dashboard" />
        </div>
    );
}
