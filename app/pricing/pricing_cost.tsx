"use client";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";

export function PricingCost() {
    const { currency, isIndia, yearlyPrice } = usePricing();

    return (
        <div>
            {/* <h3 className="heading">Subscribe to Arthveda</h3> */}
            <p className="text-text-primary text-center text-4xl font-bold mt-4">
                {formatCurrency(yearlyPrice, { currency })}
                <span className="text-muted-foreground text-base font-medium">
                    /year
                </span>
            </p>
            <p className="text-text-muted mt-2 text-center text-sm">
                (inclusive of {isIndia ? "GST" : "VAT if applicable"})
            </p>
        </div>
    );
}
