"use client";

import { usePricing } from "@/lib/usePricing";
import { cn, formatCurrency } from "@/lib/utils";
import { useState } from "react";

type BillingInterval = "monthly" | "yearly";

export function PricingCost() {
    const { currency, isIndia, yearlyPrice, monthlyPrice } = usePricing();

    const discountPercentage = Math.round(
        (1 - yearlyPrice / (monthlyPrice * 12)) * 100,
    );

    const [billingInterval, setBillingInterval] =
        useState<BillingInterval>("monthly");

    const activeInterval = billingInterval === "monthly" ? "month" : "year";
    const activePrice =
        billingInterval === "monthly" ? monthlyPrice : yearlyPrice;

    return (
        <div>
            <BillingIntervalToggle
                value={billingInterval}
                onChange={setBillingInterval}
            />

            <div className="h-2" />

            <p className="text-text-muted text-center">
                <span className="text-text-success text-lg font-semibold">
                    Save {discountPercentage}%
                </span>{" "}
                on yearly subscription!
            </p>

            <div className="h-4" />

            <p className="text-text-primary text-center text-4xl font-bold ">
                {formatCurrency(activePrice, { currency })}
                <span className="text-muted-foreground text-base font-medium">
                    /{activeInterval}
                </span>
            </p>
            <p className="text-text-muted mt-2 text-center text-sm">
                (exclusive of {isIndia ? "GST" : "VAT if applicable"})
            </p>
        </div>
    );
}

interface BillingIntervalToggleProps {
    value: BillingInterval;
    onChange: (value: BillingInterval) => void;
}

export function BillingIntervalToggle({
    value,
    onChange,
}: BillingIntervalToggleProps) {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-muted relative flex rounded-full p-1">
                <div
                    className={cn(
                        "bg-primary absolute top-1 bottom-1 w-1/2 rounded-full shadow-sm transition-all duration-200",
                        value === "monthly" ? "left-1" : "left-1/2",
                    )}
                />

                <button
                    onClick={() => onChange("monthly")}
                    className={cn(
                        "relative z-10 w-28 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                        value === "monthly"
                            ? "text-foreground"
                            : "text-muted-foreground",
                    )}
                >
                    Monthly
                </button>

                <button
                    onClick={() => onChange("yearly")}
                    className={cn(
                        "relative z-10 flex w-28 items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                        value === "yearly"
                            ? "text-foreground"
                            : "text-muted-foreground",
                    )}
                >
                    Yearly
                </button>
            </div>
        </div>
    );
}
