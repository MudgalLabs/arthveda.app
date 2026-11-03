"use client";

import { Check } from "lucide-react";

import { usePricing } from "@/lib/usePricing";
import { formatPrice } from "@/lib/pricing";
import { GetStarted } from "@/components/get_started";
import { InfoTooltip } from "@/components/info_tooltip";

// This page used to be a Free-vs-Pro matrix with a cap in every Free cell.
// That model is gone (2026-07-20): there is no free tier, so there is nothing
// to compare against and no caps to list. What replaced it:
//
//   trial   14 days, no card, the entire product with no limits
//   after   the workspace goes READ-ONLY -- everything you built stays
//           readable, exportable and shareable, you just can't add to it
//   always  running screeners stays free for everyone, signed in or not
//
// So the page is now one "everything is included" list plus the three plans
// we actually sell. Deliberately NOT a comparison table: inviting a per-feature
// comparison implies there is a lesser tier to compare with, which is exactly
// the impression we're trying to remove.

type Feature = {
    label: string;
    /** Optional one-sentence explainer, shown via an (i) tooltip. */
    tooltip?: string;
};

type Group = {
    label: string;
    tooltip?: string;
    features: Feature[];
};

// Every row here is included in full, for every subscriber and for anyone on
// the trial. No cell values, because there are no limits to state.
const GROUPS: Group[] = [
    {
        label: "Discover",
        features: [
            {
                label: "Run screeners across all of NSE/BSE and the major US indices",
                tooltip:
                    "Free for everyone, forever, signed in or not. Saving one to your workspace is what needs a subscription.",
            },
            {
                label: "Market Monitor",
                tooltip:
                    "Sector and index heatmaps, sector rotation, market breadth and the risk-on/risk-off regime. Free for everyone, signed in or not.",
            },
            { label: "Unlimited saved screeners" },
            { label: "Publish, clone and star screeners" },
            {
                label: "Progressive Scan",
                tooltip:
                    "Run several screeners into one session; symbols that repeat across them are your confluence.",
            },
            {
                label: "Unlimited watchlists",
                tooltip:
                    "Notes on every add and remove, live since-add % / max gain / max drawdown, curated views, weekly and monthly review, publish and share.",
            },
            {
                label: "Symbol Journey, full history",
                tooltip:
                    "Per-symbol timeline of every watchlist add, note, and trade you've had with this stock.",
            },
            {
                label: "Charts with indicators and drawing tools",
                tooltip:
                    "Saved per symbol, so your levels and annotations are still there next time.",
            },
        ],
    },
    {
        label: "Journal",
        features: [
            { label: "Unlimited trades, full history" },
            {
                label: "Dashboard, Insights, Reports and Calendar",
                tooltip:
                    "Insights names your behavioural leaks (cutting winners early, revenge-sizing, overtrading, exit quality, costs) with the money behind each, ranked by what hurts most. Plus drill-down by setup, instrument, broker, weekday and hold time.",
            },
            {
                label: "Trade Analysis",
                tooltip:
                    "Every closed trade replayed against the price that followed it: the heat you sat through, how much of the move you captured, and what was left on the table after you exited.",
            },
            {
                label: "Arthveda MCP: connect Claude, Codex, or any AI",
                tooltip:
                    "Read-only access for your AI assistant to your trades, tags and notes, so you can ask your journal questions in plain English. Notes are opt-in.",
            },
            {
                label: "Notebook on every trade",
                tooltip:
                    "Per-trade reflection: what you saw, what you did, what you'd do differently.",
            },
            { label: "Up to 10 broker accounts" },
            {
                label: "Broker sync and file import",
                tooltip:
                    "File: upload your broker's tradebook CSV. Sync: scheduled auto-pull.",
            },
            {
                label: "Unlimited tag groups and tags",
                tooltip:
                    "Setups and Mistakes come as required groups so analytics stay consistent; add as many of your own as you like.",
            },
            {
                label: "Up to 1 GB of uploads",
                tooltip:
                    "Images attached to trades, notes, and future surfaces (day journal, knowledge base, chart studies).",
            },
        ],
    },
    {
        label: "Social",
        tooltip:
            "Your public trader profile and everything on it stays free for every account, always. It is the identity layer, not an upsell.",
        features: [
            { label: "Public trader profile, showcase and activity heatmap" },
            { label: "Publish screeners, watchlists and trades" },
            { label: "Follow and be followed" },
        ],
    },
];

export function PlansTable() {
    const pricing = usePricing();

    // Prices come live from Paddle (lib/pricing.ts). If they couldn't be
    // loaded, the cards render without a number rather than a guess.
    const money = (n: number) => (pricing ? formatPrice(n, pricing.currency) : "");
    const taxIncluded = pricing?.taxName === "GST" ? "GST included" : "Taxes included";

    return (
        <div className="mx-auto max-w-4xl">
            {/* Plans. Three cards side by side, no interval toggle: every plan
                we sell is visible at once, and the yearly card in the middle
                is the one we recommend. */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Monthly */}
                <div className="flex flex-col rounded-lg border border-white/[0.12] bg-surface-1/35 p-6">
                    <h3 className="font-heading text-lg font-medium text-text-primary">Monthly</h3>

                    <PriceHeadline amount={pricing && money(pricing.monthlyPrice)} unit="per month" />
                    <p className="mt-2 text-sm text-text-muted">Cancel anytime. {taxIncluded}.</p>

                    <div className="mt-auto pt-5">
                        <GetStarted
                            fullWidth
                            variant="secondary"
                            size="default"
                            eventProps={{ plan: "monthly" }}
                        />
                    </div>
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
                        <h3 className="font-heading text-lg font-medium text-text-primary">
                            Yearly
                        </h3>
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
                                <span className="text-text-primary">
                                    {money(pricing.yearlyMonthlyPrice)} per month
                                </span>
                                , {pricing.taxName} included
                            </>
                        ) : (
                            "Most traders pick this."
                        )}
                    </p>

                    <div className="mt-auto pt-5">
                        <GetStarted fullWidth size="default" eventProps={{ plan: "yearly" }} />
                    </div>
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

                    <div className="mt-auto pt-5">
                        <GetStarted
                            fullWidth
                            variant="secondary"
                            size="default"
                            eventProps={{ plan: "lifetime" }}
                        />
                    </div>
                </div>
            </div>

            <p className="mt-4 text-center text-sm text-text-muted">
                No card required to start. 14-day refund on every plan, no
                questions asked.
            </p>

            {/* Everything included */}
            <div className="mt-16">
                <h2 className="text-center font-heading text-[22px] font-medium text-text-primary">
                    Everything is included
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center font-content text-[15px] leading-[1.6] text-text-muted">
                    No tiers, no per-feature limits, nothing held back. The
                    14-day trial is the whole product.
                </p>

                <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
                    {GROUPS.map((group) => (
                        <section key={group.label}>
                            <h3 className="flex items-center gap-1.5 font-heading text-[15px] font-medium text-text-primary">
                                {group.label}
                                {group.tooltip && <InfoTooltip content={group.tooltip} />}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {group.features.map((feature) => (
                                    <li
                                        key={feature.label}
                                        className="flex items-start gap-2.5 font-content text-[14px] leading-[1.5] text-text-muted"
                                    >
                                        <Check
                                            size={16}
                                            className="mt-0.5 shrink-0 text-text-primary"
                                            aria-hidden
                                        />
                                        <span className="flex items-start gap-1.5">
                                            {feature.label}
                                            {feature.tooltip && (
                                                <InfoTooltip content={feature.tooltip} />
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </div>

            {/* What happens after the trial. This is the question the reader is
                actually asking, and answering it plainly is the whole reason a
                no-card trial can convert: the risk of starting is zero, and the
                risk of stopping is zero too. */}
            <div className="mt-16 rounded-lg border border-white/[0.12] bg-surface-1/35 p-6 md:p-8">
                <h2 className="font-heading text-[18px] font-medium text-text-primary">
                    What happens when the trial ends
                </h2>
                <p className="mt-3 max-w-2xl font-content text-[15px] leading-[1.6] text-text-muted">
                    Your workspace goes read-only. Every trade, screener,
                    watchlist and note you built stays exactly where it is: you
                    can read it, re-run your saved screeners, export it to CSV,
                    and publish or share it. You just can&apos;t add anything
                    new until you subscribe.
                </p>
                <p className="mt-3 max-w-2xl font-content text-[15px] leading-[1.6] text-text-muted">
                    Nothing is deleted and nothing is held hostage. Running
                    screeners stays free either way.
                </p>
            </div>
        </div>
    );
}

// The sticker for one plan. Without live prices (the API was unreachable) it
// keeps the card's height with a dash instead of showing a guessed number.
function PriceHeadline({ amount, unit }: { amount: string | null; unit: string }) {
    return (
        <div className="mt-4 flex items-baseline gap-2">
            <span className="font-heading text-3xl font-semibold text-text-primary">{amount ?? "\u2014"}</span>
            {amount && <span className="text-sm text-text-muted">{unit}</span>}
        </div>
    );
}
