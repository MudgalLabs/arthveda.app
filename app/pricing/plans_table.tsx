"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import posthog from "posthog-js";

import { usePricing } from "@/lib/usePricing";
import { cn, formatCurrency } from "@/lib/utils";
import { GetStarted } from "@/components/get_started";
import { InfoTooltip } from "@/components/info_tooltip";

type Interval = "monthly" | "yearly";

// Cells can be a check (✓), an em dash (—), or a literal value/limit string.
// The "yes/no" sentinels render as a check / dash; everything else prints as-is
// so caps like "30 / month" or "Last 12 months" sit in their cell.
type Cell = "yes" | "no" | string;

type Row =
    | {
          kind: "group";
          label: string;
          /** Optional one-sentence explainer, shown via an (i) tooltip on the
              group header — used when a whole family needs context (e.g. Social
              "all free, no caps — not a Pro upsell, by design"). */
          tooltip?: string;
      }
    | {
          kind: "feature";
          label: string;
          free: Cell;
          pro: Cell;
          /** Emphasize the label — e.g. the single "Support" row that stands
              alone without a group header above it. */
          strong?: boolean;
          /** Optional one-sentence explainer for the row, shown via (i). */
          tooltip?: string;
      };

// Free vs Pro feature matrix — copy is verbatim from plan §7 (feature rows).
// Caps live ONLY in the Free cell; Pro lifts every cap.
const ROWS: Row[] = [
    { kind: "group", label: "Discover" },
    {
        kind: "feature",
        label: "Run screeners (all NSE/BSE)",
        free: "Unlimited",
        pro: "Unlimited",
    },
    { kind: "feature", label: "Saved screeners", free: "3", pro: "Unlimited" },
    {
        kind: "feature",
        label: "Publish · clone · star screeners",
        free: "yes",
        pro: "yes",
    },
    {
        kind: "feature",
        label: "Progressive Scan",
        free: "Up to 3 screeners / session",
        pro: "Unlimited",
        tooltip:
            "Run several screeners into one session; symbols that repeat across them are your confluence.",
    },
    { kind: "feature", label: "Stock chart + performance", free: "yes", pro: "yes" },
    {
        kind: "feature",
        label: "Watchlists",
        free: "1 list · 20 symbols",
        pro: "Unlimited",
        tooltip:
            "Notes on every add/remove · live since-add % / max gain / max DD · Arthveda-curated views · weekly + monthly review · publish & share.",
    },
    {
        kind: "feature",
        label: "Symbol Journey",
        free: "Last 12 months",
        pro: "Full history",
        tooltip:
            "Per-symbol timeline of every watchlist add, note, and trade you've had with this stock.",
    },

    { kind: "group", label: "Journal" },
    { kind: "feature", label: "Add / import trades", free: "Unlimited", pro: "Unlimited" },
    {
        kind: "feature",
        label: "Trades",
        free: "Last 12 months",
        pro: "Full history",
        tooltip: "Filter, sort, and inspect every trade you've logged, with full history on Pro.",
    },
    { kind: "feature", label: "Dashboard", free: "Last 12 months", pro: "Full history" },
    {
        kind: "feature",
        label: "Insights",
        free: "Last 12 months",
        pro: "Full history",
        tooltip:
            "The setups and mistakes that consistently make or cost you money.",
    },
    {
        kind: "feature",
        label: "Reports",
        free: "Last 12 months",
        pro: "Full history",
        tooltip:
            "Drill-down analytics by setup, instrument, broker, weekday, hold time.",
    },
    { kind: "feature", label: "Calendar", free: "Last 12 months", pro: "Full history" },
    {
        kind: "feature",
        label: "Notebook",
        free: "yes",
        pro: "yes",
        tooltip:
            "Per-trade reflection: what you saw, what you did, what you'd do differently.",
    },
    { kind: "feature", label: "Broker accounts", free: "1", pro: "Unlimited" },
    {
        kind: "feature",
        label: "Broker import",
        free: "File only",
        pro: "Sync + file",
        tooltip:
            "File: upload your broker's tradebook CSV. Sync: scheduled auto-pull (Pro).",
    },
    {
        kind: "feature",
        label: "Tags",
        free: "Setups + Mistakes · 2 tags each",
        pro: "Unlimited groups + tags",
        tooltip:
            "Required Setups + Mistakes groups power consistent analytics; Pro adds custom groups and unlimited tags.",
    },
    {
        kind: "feature",
        label: "Uploads",
        free: "no",
        pro: "Up to 1 GB",
        tooltip:
            "Images attached to trades, notes, and future surfaces (day journal, knowledge base, chart studies).",
    },

    {
        kind: "group",
        label: "Social",
        tooltip:
            "Trader profile · publish screeners + watchlists · showcase · activity heatmap · follow & be followed. All free, no caps. Not a Pro upsell, by design.",
    },
    { kind: "feature", label: "Everything", free: "yes", pro: "yes" },

    // Support stands on its own as a bold row — no group header above it.
    { kind: "feature", label: "Support", free: "Standard", pro: "Priority", strong: true },
];

// Grid template shared by the column tops AND every feature row, so all three
// columns line up cleanly down the entire table.
//
// - **Mobile**: label column hugs its widest cell (today: "Publish · clone ·
//   star screeners") via `max-content`; Free/Pro each have a 220px floor so
//   the price block and CTA render cleanly while the table scrolls
//   horizontally.
// - **md+**: revert to balanced flex columns (`2fr / 1fr / 1fr`) so on wide
//   viewports the label column doesn't hog space and Free/Pro stay tight.
const GRID_COLS =
    "grid grid-cols-[max-content_minmax(220px,1fr)_minmax(220px,1fr)] md:grid-cols-[2fr_1fr_1fr]";

// First-group index drives where we show the mobile-only "Free / Pro" column
// labels — once on the first group is enough to establish the structure;
// repeating on every group is visual noise.
const FIRST_GROUP_INDEX = ROWS.findIndex((r) => r.kind === "group");

export function PlansTable() {
    const {
        monthlyPrice,
        yearlyPrice,
        yearlyMonthlyPrice,
        yearlySavingPct,
        currency,
    } = usePricing();

    // Yearly is the default — building a track record is a long game (plan §7).
    const [interval, setInterval] = useState<Interval>("yearly");
    const isYearly = interval === "yearly";

    const handleIntervalChange = (next: Interval) => {
        setInterval(next);
        posthog.capture("Pricing Interval Toggled", { interval: next });
    };

    const money = (n: number) =>
        formatCurrency(n, {
            currency,
            localizationOpts: { maximumFractionDigits: 0 },
        });

    // The headline number under the Pro column top: per-month either way.
    const proPerMonth = isYearly ? yearlyMonthlyPrice : monthlyPrice;

    return (
        <div>
            {/* Toggle group sits on the right side of the row (centered on
                mobile where there's no room to right-align cleanly); inside
                the group, the savings label stays centered above the toggle
                pill. */}
            <div className="mb-5 flex justify-center md:justify-end">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-medium text-text-primary">
                        Save {yearlySavingPct}% with yearly
                    </p>
                    <IntervalToggle value={interval} onChange={handleIntervalChange} />
                </div>
            </div>

            {/* Horizontal scroll on viewports too narrow for 3 columns to read
                well; breaks out of the page padding so the strip aligns flush.
                min-w-[720px] sits just under the grid's natural floor (label
                max-content ≈ 290px + 2 × 220px Free/Pro = ~730px) — explicit so
                the overflow behaviour is obvious at a glance. */}
            <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                {/* The grid lives at the TABLE level (not per-row), and each
                    row uses `grid-cols-subgrid` to inherit the same column
                    tracks. That way the column tops align with the body rows,
                    and the label column's max-content is driven by the widest
                    label cell across every row — not just the cells in its own
                    row's grid. */}
                <div className={cn(GRID_COLS, "min-w-[720px] overflow-hidden rounded-xl border border-[hsl(220,35%,13%)]")}>
                    {/* Column tops ----------------------------------------- */}
                    {/* On mobile the column tops use a 2-col layout (Free |
                        Pro), so each price card gets ~50% of the table width
                        and the Free card sits visually above the label column
                        rather than aligning with the narrower body Free col.
                        On md+ they fall back to subgrid (empty | Free | Pro)
                        so the price cards line up with the body columns. */}
                    <div className="col-span-3 grid grid-cols-2 md:grid-cols-subgrid">
                    {/* Empty placeholder over the label column — only renders
                        on md+ so the subgrid has a cell in col 1. */}
                    <div className="hidden md:block" />

                    {/* Free top */}
                    <div className="border-[hsl(220,35%,13%)] p-5 md:border-l md:p-6">
                        <h3 className="font-heading text-lg font-medium text-text-primary">
                            Free
                        </h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="font-heading text-3xl font-semibold text-text-primary">
                                {money(0)}
                            </span>
                            <span className="text-sm text-text-muted">forever</span>
                        </div>
                        {/* Invisible placeholder matching Pro's "Billed yearly
                            ₹X" sub-line height — keeps the Free CTA aligned
                            with Pro's CTA side-by-side. visibility:hidden
                            preserves layout (unlike display:none). */}
                        <p className="invisible mt-2 text-sm" aria-hidden>
                            &nbsp;
                        </p>
                        {/* CTA carries the wording — no helper line beneath
                            (the trial-mechanics line belongs on Pro, where
                            there's actually a trial, not on Free). */}
                        <div className="mt-5">
                            <GetStarted
                                fullWidth
                                variant="secondary"
                                size="default"
                                eventProps={{ plan: "free" }}
                            />
                        </div>
                    </div>

                    {/* Pro top — "lit stage" treatment (radial brand spotlight
                        + tinted base) so the upgrade column reads as the focal
                        point. Mirrors the lit-media gradient used on the hero
                        and product blocks, keeping visual language consistent. */}
                    <div
                        className="relative border-l border-[hsl(220,35%,13%)] p-5 md:p-6"
                        style={{
                            background:
                                "radial-gradient(85% 100% at 50% 0%, rgba(150,163,255,0.20) 0%, rgba(150,163,255,0.06) 45%, transparent 80%), rgba(63,95,255,0.08)",
                        }}
                    >
                        <h3 className="font-heading text-lg font-medium text-text-primary">
                            Pro
                        </h3>

                        <div className="mt-4">
                            <div className="flex items-baseline gap-2">
                                <span className="font-heading text-3xl font-semibold text-text-primary">
                                    {money(proPerMonth)}
                                </span>
                                <span className="text-sm text-text-muted">
                                    per month
                                </span>
                            </div>
                            {/* Sub-line stays short — the "Save X% with yearly"
                                nudge sits next to the toggle now, so don't
                                repeat the savings here.
                                GST convention (plan §7, 2026-05-28): yearly
                                attaches "+ GST" to the BILLED amount (₹1,999),
                                not the per-month display rate. Monthly drops
                                "Billed monthly" entirely — the headline IS the
                                billed amount, so "+ GST" alone closes the loop. */}
                            <p className="mt-2 text-sm text-text-muted">
                                {isYearly ? (
                                    <>
                                        Billed yearly{" "}
                                        <span className="text-text-primary">
                                            {money(yearlyPrice)} + GST
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-text-primary">
                                        + GST
                                    </span>
                                )}
                            </p>
                        </div>

                        <div className="mt-5">
                            <GetStarted
                                label="Start 30-day free trial"
                                fullWidth
                                size="default"
                                eventProps={{ plan: "pro", interval }}
                            />
                        </div>
                        <p className="mt-3 text-center text-xs text-text-subtle">
                            Card required. No charge today.
                        </p>
                    </div>
                </div>

                {/* Feature rows --------------------------------------------------- */}
                {ROWS.map((row, i) =>
                    row.kind === "group" ? (
                        <div
                            key={`g-${row.label}`}
                            className="col-span-3 grid grid-cols-subgrid border-t border-[hsl(220,35%,13%)] bg-secondary/30"
                        >
                            <div className="flex items-center gap-1.5 px-5 py-2.5 md:px-6">
                                <span className="text-xs font-medium uppercase tracking-wider text-text-primary">
                                    {row.label}
                                </span>
                                {row.tooltip && (
                                    <InfoTooltip
                                        content={row.tooltip}
                                        label={`About ${row.label}`}
                                    />
                                )}
                            </div>
                            {/* Mobile-only Free/Pro column headers — rendered
                                only on the FIRST group row. Once the columns
                                are labeled there the rest of the table reads
                                fine without repeating them on every group. */}
                            {i === FIRST_GROUP_INDEX && (
                                <>
                                    <div className="flex items-center justify-center border-l border-[hsl(220,35%,13%)] px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider text-text-subtle md:hidden">
                                        Free
                                    </div>
                                    <div className="flex items-center justify-center border-l border-[hsl(220,35%,13%)] px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider text-text-subtle md:hidden">
                                        Pro
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div
                            key={`f-${i}`}
                            className="col-span-3 grid grid-cols-subgrid border-t border-[hsl(220,35%,13%)]"
                        >
                            <div
                                className={cn(
                                    "flex items-center gap-1.5 px-5 py-3 text-sm md:px-6",
                                    row.strong
                                        ? "font-medium text-text-primary"
                                        : "text-text-muted",
                                )}
                            >
                                <span>{row.label}</span>
                                {row.tooltip && (
                                    <InfoTooltip
                                        content={row.tooltip}
                                        label={`About ${row.label}`}
                                    />
                                )}
                            </div>
                            <div className="flex items-center justify-center border-l border-[hsl(220,35%,13%)] px-3 py-3 text-center text-sm">
                                <CellValue value={row.free} muted />
                            </div>
                            <div className="flex items-center justify-center border-l border-[hsl(220,35%,13%)] bg-primary/[0.06] px-3 py-3 text-center text-sm">
                                <CellValue value={row.pro} />
                            </div>
                        </div>
                    ),
                )}
                </div>
            </div>
        </div>
    );
}

function CellValue({ value, muted = false }: { value: Cell; muted?: boolean }) {
    if (value === "no") return <span className="text-text-subtle">—</span>;
    if (value === "yes")
        return (
            <Check
                size={16}
                className={muted ? "text-text-muted" : "text-accent"}
                aria-label="Included"
            />
        );
    return <span className={muted ? "text-text-muted" : "text-text-primary"}>{value}</span>;
}

interface IntervalToggleProps {
    value: Interval;
    onChange: (value: Interval) => void;
}

function IntervalToggle({ value, onChange }: IntervalToggleProps) {
    // Larger pill (ClickUp-sized) with the savings nudge lifted out — the
    // selected option just shows "Monthly" / "Yearly", no inline % chip.
    const baseBtn =
        "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors";

    return (
        <div className="relative flex rounded-full border border-[hsl(220,35%,13%)] bg-secondary p-1">
            <button
                onClick={() => onChange("monthly")}
                className={cn(
                    baseBtn,
                    value === "monthly"
                        ? "bg-primary text-foreground"
                        : "text-text-muted hover:text-text-primary",
                )}
            >
                Monthly
            </button>
            <button
                onClick={() => onChange("yearly")}
                className={cn(
                    baseBtn,
                    value === "yearly"
                        ? "bg-primary text-foreground"
                        : "text-text-muted hover:text-text-primary",
                )}
            >
                Yearly
            </button>
        </div>
    );
}
