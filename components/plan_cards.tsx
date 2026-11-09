"use client";

import { GetStarted } from "@/components/get_started";
import { formatPrice } from "@/lib/pricing";
import { usePricing } from "@/lib/usePricing";

// The three plans we sell, side by side with no interval toggle: every plan is
// visible at once, and the yearly card in the middle is the one we recommend.
//
// Prices come live from Paddle (lib/pricing.ts). If they couldn't be loaded,
// the cards render without a number rather than a guess.
//
// `withCta` is for /pricing. The homepage leaves it off: every card's button
// goes to the same signup, so there it would only repeat the section's own CTA
// three more times.
export function PlanCards({ withCta = false }: { withCta?: boolean }) {
    const pricing = usePricing();

    const money = (n: number) => (pricing ? formatPrice(n, pricing.currency) : "");
    const taxIncluded = pricing?.taxName === "GST" ? "GST included" : "Taxes included";

    return (
        <div className="grid gap-4 text-left md:grid-cols-3">
            {/* Monthly */}
            <div className="flex flex-col rounded-lg border border-white/[0.12] bg-surface-1/35 p-6">
                <h3 className="font-heading text-lg font-medium text-text-primary">Monthly</h3>

                <PriceHeadline amount={pricing && money(pricing.monthlyPrice)} unit="per month" />
                <p className="mt-2 text-sm text-text-muted">Cancel anytime. {taxIncluded}.</p>

                {withCta && (
                    <div className="mt-auto pt-5">
                        <GetStarted fullWidth variant="secondary" size="default" eventProps={{ plan: "monthly" }} />
                    </div>
                )}
            </div>

            {/* Yearly — the recommended path, so it gets the "lit stage"
                treatment (radial brand spotlight + tinted base) used on the
                hero and product blocks. */}
            <div
                className="relative flex flex-col rounded-lg border border-[hsl(220,35%,20%)] p-6"
                style={{
                    background:
                        "radial-gradient(85% 100% at 50% 0%, rgba(150,163,255,0.20) 0%, rgba(150,163,255,0.06) 45%, transparent 80%), rgba(63,95,255,0.08)",
                }}
            >
                <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-heading text-lg font-medium text-text-primary">Yearly</h3>
                    {/* Measured against monthly, a price we sell, so the
                        saving is a true claim. */}
                    {pricing && pricing.yearlySavingsPercent > 0 && (
                        <span className="shrink-0 rounded-full bg-white/[0.08] px-2.5 py-0.5 text-xs text-text-muted">
                            Save {pricing.yearlySavingsPercent}%
                        </span>
                    )}
                </div>

                {/* Headline is always the amount actually charged; the
                    per-month rate is a sub-line (decision 2026-07-05). */}
                <PriceHeadline amount={pricing && money(pricing.yearlyPrice)} unit="per year" />
                <p className="mt-2 text-sm text-text-muted">
                    {pricing ? (
                        <>
                            <span className="text-text-primary">{money(pricing.yearlyMonthlyPrice)} per month</span>,{" "}
                            {pricing.taxName} included
                        </>
                    ) : (
                        "Most traders pick this."
                    )}
                </p>

                {withCta && (
                    <div className="mt-auto pt-5">
                        <GetStarted fullWidth size="default" eventProps={{ plan: "yearly" }} />
                    </div>
                )}
            </div>

            {/* One-time. PostHog keeps the historical "lifetime" vocabulary
                for this plan so existing insights don't fragment; only the
                UI says "One-time". Its value depends on how long you stay,
                so it is framed by break-even against monthly, never as a
                percentage off. */}
            <div className="flex flex-col rounded-lg border border-white/[0.12] bg-surface-1/35 p-6">
                <h3 className="font-heading text-lg font-medium text-text-primary">One-time</h3>

                <PriceHeadline amount={pricing && money(pricing.oneTimePrice)} unit="once" />
                <p className="mt-2 text-sm text-text-muted">
                    Pay once, no renewals.
                    {pricing && pricing.oneTimeBreakEvenMonths > 0 && (
                        <> Less than {pricing.oneTimeBreakEvenMonths} months of monthly.</>
                    )}{" "}
                    {taxIncluded}.
                </p>

                {withCta && (
                    <div className="mt-auto pt-5">
                        <GetStarted fullWidth variant="secondary" size="default" eventProps={{ plan: "lifetime" }} />
                    </div>
                )}
            </div>
        </div>
    );
}

// The sticker for one plan. Without live prices (the API was unreachable) it
// keeps the card's height with a dash instead of showing a guessed number.
function PriceHeadline({ amount, unit }: { amount: string | null; unit: string }) {
    return (
        <div className="mt-4 flex items-baseline gap-2">
            <span className="font-heading text-3xl font-semibold text-text-primary">{amount ?? "—"}</span>
            {amount && <span className="text-sm text-text-muted">{unit}</span>}
        </div>
    );
}
