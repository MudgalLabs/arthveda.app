import { ReactNode } from "react";

import { fetchPricing } from "@/lib/pricing";
import { PricingProvider } from "@/lib/usePricing";
import { visitorCountry } from "@/lib/visitor_country";

// Broker pages end with a pricing recap (BrokerPricingSummary), so they get
// the visitor's live prices the same way /pricing does.
export default async function BrokersLayout({ children }: { children: ReactNode }) {
    return <PricingProvider pricing={await fetchPricing(await visitorCountry())}>{children}</PricingProvider>;
}
