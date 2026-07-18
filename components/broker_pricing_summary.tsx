"use client";

import Link from "next/link";

import { usePricing } from "@/lib/usePricing";
import { formatCurrency } from "@/lib/utils";

// Compact pricing recap for broker landing pages. Prices come from the single
// source of truth (usePricing) so this never drifts from /pricing when the
// numbers change. Sits right before a page's bottom CTA.
export function BrokerPricingSummary() {
    const {
        monthlyPrice,
        yearlyPrice,
        oneTimePrice,
        yearlySavingPct,
        currency,
    } = usePricing();

    const money = (n: number) =>
        formatCurrency(n, {
            currency,
            localizationOpts: { maximumFractionDigits: 0 },
        });

    return (
        <section className="mx-auto mt-20 max-w-3xl rounded-lg border border-white/[0.12] bg-surface-1/35 p-6 md:mt-24 md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-heading text-[20px] font-medium text-text-primary">
                        Free to start. Pro when you want more.
                    </p>
                    <p className="mt-2 font-content text-[14px] leading-[1.6] text-text-muted">
                        Do the whole workflow free, with limits. Pro lifts them
                        all: {money(monthlyPrice)}/mo, {money(yearlyPrice)}/yr
                        (save {yearlySavingPct}%), or {money(oneTimePrice)} once.
                        All prices include GST.
                    </p>
                    <p className="mt-2 font-content text-[13px] leading-[1.6] text-text-subtle">
                        30-day Pro trial. Add a card to start, cancel anytime
                        before it ends.
                    </p>
                </div>
                <Link href="/pricing" className="shrink-0 font-content text-[14px]!">
                    Compare plans
                </Link>
            </div>
        </section>
    );
}
