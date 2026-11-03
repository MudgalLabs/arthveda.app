"use client";

import { createContext, createElement, ReactNode, useContext } from "react";

import type { PricingInfo } from "@/lib/pricing";

// The prices are fetched on the server (lib/pricing.ts) for the visitor's
// country and handed down by PricingProvider, so the first paint already shows
// the visitor's prices. Null means the API couldn't be reached: render the
// plans without numbers.
const PricingContext = createContext<PricingInfo | null>(null);

export function PricingProvider({ pricing, children }: { pricing: PricingInfo | null; children: ReactNode }) {
    return createElement(PricingContext.Provider, { value: pricing }, children);
}

export function usePricing(): PricingInfo | null {
    return useContext(PricingContext);
}
