import { ReactNode } from "react";

import { PricingProvider } from "@/lib/usePricing";
import { visitorCurrency } from "@/lib/visitor_currency";

// Broker pages end with a pricing recap (BrokerPricingSummary), so they get
// the visitor's currency the same way /pricing does.
export default async function BrokersLayout({ children }: { children: ReactNode }) {
    return <PricingProvider currency={await visitorCurrency()}>{children}</PricingProvider>;
}
