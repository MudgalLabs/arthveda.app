"use client";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";
import { Screenshot } from "@/components/screenshot";

export function HeroScreenshot() {
    const { yearlyPrice, currency } = usePricing();

    return (
        <div className="relative w-fit mx-auto">
            <span className="absolute -top-1 md:-top-4 right-0 md:-right-4 z-10 brand-gradient-bg text-accent-muted font-bold px-2 md:px-4 py-1 md:py-2 rounded-full shadow-lg text-xs md:text-lg border-2 md:border-3 border-white/80 backdrop-blur-sm">
                {formatCurrency(yearlyPrice, { currency })}/year
            </span>
            <Screenshot src="/images/dashboard.webp" alt="Arthveda Dashboard" />
        </div>
    );
}
