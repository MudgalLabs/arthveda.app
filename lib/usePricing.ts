"use client";

import { createContext, createElement, ReactNode, useContext } from "react";

import { PricingCurrency, PricingInfo, pricingFor } from "@/lib/pricing";

// The currency is decided on the server (lib/visitor_currency.ts) and handed
// down by PricingProvider, so the first paint already shows the visitor's
// prices. Outside a provider it's India's.
const PricingCurrencyContext = createContext<PricingCurrency>("inr");

export function PricingProvider({ currency, children }: { currency: PricingCurrency; children: ReactNode }) {
    return createElement(PricingCurrencyContext.Provider, { value: currency }, children);
}

export function usePricing(): PricingInfo {
    return pricingFor(useContext(PricingCurrencyContext));
}
