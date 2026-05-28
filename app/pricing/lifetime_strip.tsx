"use client";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";

// Launch-only promo (plan §7). Renders as INLINE children — no wrapper, no
// border — so the caller decides the surrounding container (today: the hero
// subtitle on /pricing). Currency-aware via usePricing.
//
// When the lifetime cohort sells out (`lifetimeSoldOut === true`), the promo
// is replaced with the access-pitch fallback so the hero never carries a
// stale offer. Same flag also kills the site-wide `<PromoBanner>` — single
// source of truth.
export function LifetimePromo() {
    const { lifetimePrice, currency, lifetimeSoldOut } = usePricing();

    if (lifetimeSoldOut) {
        return (
            <>
                Do the whole workflow free, with limits. Pro lifts them all —
                30-day trial, no card.
            </>
        );
    }

    const price = formatCurrency(lifetimePrice, {
        currency,
        localizationOpts: { maximumFractionDigits: 0 },
    });

    // `+ GST` attaches to the actual charged amount on every displayed price
    // (plan §7, GST convention locked 2026-05-28).
    return (
        <>
            <span aria-hidden>🎉 </span>
            <span className="font-medium text-text-primary">
                Lifetime {price} + GST
            </span>
            {". First 10 users only, then the price goes up."}
        </>
    );
}
