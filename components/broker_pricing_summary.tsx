"use client";

import Link from "next/link";

import { formatPrice } from "@/lib/pricing";
import { usePricing } from "@/lib/usePricing";

// Compact pricing recap for broker landing pages. Prices are Paddle's live
// ones (usePricing), the same numbers /pricing shows. Sits right before a
// page's bottom CTA.
export function BrokerPricingSummary() {
    const pricing = usePricing();

    return (
        <section className="mx-auto mt-20 max-w-3xl rounded-lg border border-white/[0.12] bg-surface-1/35 p-6 md:mt-24 md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-heading text-[20px] font-medium text-text-primary">
                        Try it free for 14 days. No card required.
                    </p>
                    <p className="mt-2 font-content text-[14px] leading-[1.6] text-text-muted">
                        The whole product, no limits, for 14 days.{" "}
                        {pricing ? (
                            <>
                                Then {formatPrice(pricing.monthlyPrice, pricing.currency)}/mo,{" "}
                                {formatPrice(pricing.yearlyPrice, pricing.currency)}/yr or{" "}
                                {formatPrice(pricing.oneTimePrice, pricing.currency)} once. All prices
                                include {pricing.taxName}.
                            </>
                        ) : (
                            "Then pay monthly, yearly, or once."
                        )}
                    </p>
                    <p className="mt-2 font-content text-[13px] leading-[1.6] text-text-subtle">
                        14-day refund on every plan. If you stop subscribing,
                        your journal stays readable and exportable.
                    </p>
                </div>
                <Link href="/pricing" className="shrink-0 font-content text-[14px]!">
                    Compare plans
                </Link>
            </div>
        </section>
    );
}
