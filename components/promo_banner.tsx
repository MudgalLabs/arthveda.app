"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import posthog from "posthog-js";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";

// Launch-only site-wide promo banner for the lifetime offer (plan §7). Sits
// above the navbar in `app/layout.tsx`. Hidden on /pricing (the hero subtitle
// there already carries the same line — see `app/pricing/lifetime_strip.tsx`).
//
// Dismissal is forever (localStorage; per user "we don't show them again").
// The `v1` in the storage key means a future promo with a different key isn't
// auto-dismissed by stale state.

const DISMISS_KEY = "arthveda.promo_lifetime_v1_dismissed";
const PROMO_NAME = "lifetime_v1";

export const PromoBanner = () => {
    const pathname = usePathname();
    const { lifetimePrice, currency, lifetimeSoldOut } = usePricing();
    const [mounted, setMounted] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    // Read localStorage on mount. Until then, render nothing — avoids a
    // flash-then-hide for users who already dismissed. Tradeoff: a one-frame
    // delayed appearance for first-time visitors, which is fine.
    useEffect(() => {
        setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
        setMounted(true);
    }, []);

    const visible =
        mounted && !dismissed && !lifetimeSoldOut && pathname !== "/pricing";

    // Fire "Saw" once per page-visit when the banner actually renders.
    useEffect(() => {
        if (visible) {
            posthog.capture("Saw Promo Banner", { promo: PROMO_NAME });
        }
    }, [visible]);

    if (!visible) return null;

    const price = formatCurrency(lifetimePrice, {
        currency,
        localizationOpts: { maximumFractionDigits: 0 },
    });

    const handleDismiss = (e: React.MouseEvent) => {
        // Stop the wrapping <Link> from routing to /pricing on close click.
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem(DISMISS_KEY, "1");
        setDismissed(true);
        posthog.capture("Dismissed Promo Banner", { promo: PROMO_NAME });
    };

    return (
        <Link
            href="/pricing"
            onClick={() =>
                posthog.capture("Clicked Promo Banner", { promo: PROMO_NAME })
            }
            className="block w-full bg-accent-muted border-b border-white/8 transition-colors hover:bg-accent/20"
        >
            <div className="relative mx-auto max-w-[1440px] px-4 py-2.5 pr-14 text-center text-sm text-text-primary">
                <span aria-hidden>🎉 </span>
                <span className="font-medium">Arthveda is free to use.</span>
                {" Upgrade to Pro for "}
                <span className="font-medium">{price} + GST once.</span>
                {" Lifetime offer for the first 10 users only."}
                <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label="Dismiss promo"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-text-muted transition-colors hover:text-text-primary"
                >
                    <X size={14} />
                </button>
            </div>
        </Link>
    );
};

export default PromoBanner;
