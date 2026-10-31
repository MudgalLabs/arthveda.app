"use client";

import { useEffect, useState } from "react";

import { CurrencyCode } from "@/lib/utils";

// Single source of truth for the pricing NUMBERS on this site. The app reads
// its prices live from Paddle (~/dev/arthveda/web/src/features/settings/
// plan_and_billing/hooks/use_pricing.ts); this site has no Paddle.js, so these
// are hand-synced with the Paddle prices.
//
// Structure as of 2026-07-20: 14-day free trial (no card), then the workspace
// goes read-only until you subscribe. We sell YEARLY and ONE-TIME only.
// Monthly still exists as a Paddle price for legacy subscribers and support,
// but it is never displayed — which is also why the old "save X% with yearly"
// figure is gone: a saving measured against a price we don't sell would be a
// false claim.
//
// Global pricing (2026-10-31): Paddle's base price is USD with an India
// override in INR. India is told apart by the visitor's IP country
// (/api/geo, Cloudflare's geolocation), the same signal Paddle's checkout
// localizes by, so a VPN or a traveller sees the currency they'll be charged
// in. The browser's time zone is only the fallback when the country is
// unknown. Both need the client: the server render (and crawlers) get India's
// prices, and visitors elsewhere switch to USD right after mount.
//
// All displayed prices are tax-INCLUSIVE (GST in India, decision 2026-07-05):
// the sticker is the charged amount. Paddle prices must be configured as
// tax-inclusive to match.

const PRICES: Record<CurrencyCode, { yearly: number; oneTime: number }> = {
    // One-time is a standing plan priced a little over 2× yearly —
    // deliberately close enough that "I'll trade for years anyway, pay once"
    // is an easy yes.
    inr: { yearly: 2999, oneTime: 6999 },
    usd: { yearly: 49, oneTime: 99 },
};

interface PricingInfo {
    yearlyPrice: number;
    /** The One-time purchase (Paddle/env still call it "lifetime"). */
    oneTimePrice: number;
    /** Effective per-month price when billed yearly (rounded). */
    yearlyMonthlyPrice: number;
    currency: CurrencyCode;
    /** India's tax is GST; elsewhere it's the local sales tax/VAT. */
    taxName: "GST" | "taxes";
}

// Cloudflare's codes for "unknown" and Tor exits carry no country.
const UNKNOWN_COUNTRIES = new Set(["XX", "T1"]);

let countryPromise: Promise<string | null> | null = null;

// fetchCountry asks /api/geo once per page load; every usePricing caller on
// the page shares the answer.
function fetchCountry(): Promise<string | null> {
    countryPromise ??= fetch("/api/geo")
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { country?: string | null } | null) => {
            const country = data?.country?.toUpperCase() ?? null;
            return country && !UNKNOWN_COUNTRIES.has(country) ? country : null;
        })
        .catch(() => null);
    return countryPromise;
}

function isIndiaTimeZone(): boolean {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
    } catch {
        return true;
    }
}

export function usePricing(): PricingInfo {
    const [currency, setCurrency] = useState<CurrencyCode>("inr");

    useEffect(() => {
        let cancelled = false;
        fetchCountry().then((country) => {
            if (cancelled) return;
            const inIndia = country ? country === "IN" : isIndiaTimeZone();
            setCurrency(inIndia ? "inr" : "usd");
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const { yearly, oneTime } = PRICES[currency];

    return {
        yearlyPrice: yearly,
        oneTimePrice: oneTime,
        yearlyMonthlyPrice: Math.round(yearly / 12),
        currency,
        taxName: currency === "inr" ? "GST" : "taxes",
    };
}
