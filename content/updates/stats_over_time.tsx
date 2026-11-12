import type { ReactNode } from "react";

import { GetStarted } from "@/components/get_started";
import { DASHBOARD_URL } from "@/lib/links";

// Release post: chart view on the dashboard's stat widgets (shipped
// 2026-11-12). Facts follow arthveda/docs/dashboard_chart_view.md; keep them in
// step if the widgets change.

const H2 = ({ children }: { children: ReactNode }) => (
    <h2 className="mt-12 font-heading text-[24px] font-medium leading-snug tracking-[-0.01em] text-text-primary">
        {children}
    </h2>
);

const P = ({ children }: { children: ReactNode }) => (
    <p className="mt-4 font-content text-[16px] leading-[1.7] text-text-muted">{children}</p>
);

const Strong = ({ children }: { children: ReactNode }) => (
    <strong className="font-medium text-text-primary">{children}</strong>
);

const PERIODS = [
    { range: "Up to a month", period: "One point per day" },
    { range: "Up to three months", period: "One point per week" },
    { range: "Longer", period: "One point per month" },
];

export default function StatsOverTime() {
    return (
        <>
            <P>
                A 55% win rate looks the same whether you held it all year or
                slid from 70% to 40%. Only one of those needs your attention.
                Until now, the dashboard showed you a single number for the
                whole range. Now <Strong>Win rate</Strong>,{" "}
                <Strong>Expectancy</Strong>, <Strong>Profit Factor</Strong> and{" "}
                <Strong>Avg Win / Loss</Strong> can show that number period by
                period, as a bar or a line chart.
            </P>

            <H2>Switch a widget to a chart</H2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 font-content text-[16px] leading-[1.7] text-text-muted">
                <li>
                    Open your dashboard and click the <Strong>⋯</Strong> menu on
                    any of the four widgets.
                </li>
                <li>
                    Under <Strong>View</Strong>, pick <Strong>Bar chart</Strong>{" "}
                    or <Strong>Line chart</Strong>. The tile grows to fit the
                    chart.
                </li>
                <li>
                    Pick <Strong>Value</Strong> to go back. The tile returns to
                    the size it had.
                </li>
            </ol>
            <P>
                The choice is saved with your dashboard view, so it is there the
                next time you open it. Resize or move the tile from{" "}
                <Strong>Edit layout</Strong> as usual.
            </P>

            <H2>How to read it</H2>
            <P>
                Each bar or point is one period. The period follows the date
                range you set at the top of the dashboard, the same way the PnL
                charts do:
            </P>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {PERIODS.map((p) => (
                    <div key={p.range} className="rounded-lg border border-white/[0.10] bg-surface-1/40 px-5 py-4">
                        <div className="font-heading text-[14px] font-medium text-text-primary">{p.range}</div>
                        <div className="mt-1 font-content text-[14px] leading-[1.6] text-text-muted">{p.period}</div>
                    </div>
                ))}
            </div>
            <P>
                <Strong>Your overall number stays in view</Strong> at the top
                right of the widget, so you can tell at a glance which periods
                beat your average and which are worth a closer look.
            </P>
            <P>
                <Strong>A trade counts in the period it closed.</Strong> Each
                trade is one win or one loss, decided by its final P&amp;L, so a
                trade you scaled out of over two months belongs to the month you
                closed it.
            </P>
            <P>
                Hover any period to see its value and how many trades it holds.
                A 100% month from a single trade is easy to spot.
            </P>

            <H2>An empty month is not a zero</H2>
            <P>
                A month with no closed trades has no win rate, so it shows as{" "}
                <Strong>n/a</Strong> instead of 0%. The same goes for Profit
                Factor and Avg Win / Loss in a period with no losing trades:
                there is nothing to divide by. Hover the gap and it tells you
                why.
            </P>
            <P>
                On the line chart, a faint dashed line bridges those gaps so the
                trend stays readable. A real 0%, a month where every trade lost,
                is still a solid point on the axis. The single-number view now
                says n/a the same way when your range has nothing to measure.
            </P>

            <H2>Works with everything else</H2>
            <P>
                <Strong>Units and Gross / Net.</Strong> Each period follows the
                dashboard&apos;s settings. Expectancy reads in amount, return or
                R, and Gross switches every period to P&amp;L before charges.
            </P>
            <P>
                <Strong>Your profile.</Strong> Pin a widget in its chart view
                from the ⋯ menu to show it in Performance Stats on your public
                profile. It only ever shows rates, ratios and returns, never
                amounts.
            </P>

            <P>
                This one was requested by a trader in our Discord. Keep the
                feature requests coming.
            </P>

            <div className="mt-12">
                <GetStarted label="Open your dashboard" href={DASHBOARD_URL} />
            </div>
        </>
    );
}
