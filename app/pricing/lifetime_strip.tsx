"use client";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";

// Launch-only promo (plan §7). Renders as INLINE children — no wrapper, no
// border — so the caller decides the surrounding container (today: the hero
// subtitle on /pricing). Currency-aware via usePricing.
export function LifetimePromo() {
    const { lifetimePrice, currency } = usePricing();

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
            {" — first 10 users only. Then the price goes up."}
        </>
    );
}
