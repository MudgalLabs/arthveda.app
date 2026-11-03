import type { ReactNode } from "react";

import { GetStarted } from "@/components/get_started";
import { DASHBOARD_URL } from "@/lib/links";

// Release post: the Benchmark widget (shipped 2026-11-03). Facts follow
// arthveda/docs/benchmark_comparison.md; keep them in step if the widget
// changes.

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

const INDICES = [
    { market: "India", names: "Nifty 50, Nifty 500, Nifty Midcap 150, Nifty Smallcap 250" },
    { market: "US", names: "S&P 500, Nasdaq-100, Dow 30, Russell 2000" },
];

export default function BenchmarkWidget() {
    return (
        <>
            <P>
                Every trader eventually asks the same question: would I have
                done better just holding the index? Your dashboard now answers
                it. The new <Strong>Benchmark</Strong> widget draws your return
                and up to three market indices on one chart, over exactly the
                same period, all starting from 0%.
            </P>

            <H2>Add it to your dashboard</H2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 font-content text-[16px] leading-[1.7] text-text-muted">
                <li>
                    Open your dashboard and choose <Strong>Add widget</Strong>,
                    then <Strong>Benchmark</Strong>.
                </li>
                <li>
                    Click the line under the title (<Strong>vs Nifty 50</Strong>)
                    to pick the indices. You can compare against up to three at
                    once.
                </li>
                <li>
                    Set the date range at the top of the dashboard as usual. The
                    widget compares you and the indices over that range.
                </li>
            </ol>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {INDICES.map((g) => (
                    <div
                        key={g.market}
                        className="rounded-lg border border-white/[0.10] bg-surface-1/40 px-5 py-4"
                    >
                        <div className="font-heading text-[14px] font-medium text-text-primary">{g.market}</div>
                        <div className="mt-1 font-content text-[14px] leading-[1.6] text-text-muted">{g.names}</div>
                    </div>
                ))}
            </div>

            <H2>How to read it</H2>
            <P>
                The legend gives the answer at the end of the period, for
                example <Strong>You +6.64%</Strong> and{" "}
                <Strong>S&amp;P 500 +16.11% (you 9.46 pts behind)</Strong>. The
                gap is in percentage points: +12% against +8% is 4 pts ahead.
                Hover anywhere on the chart to see the same figures at that
                point in time.
            </P>

            <H2>A fair comparison</H2>
            <P>
                <Strong>Deposits and withdrawals don&apos;t count.</Strong>{" "}
                Your line is a time-weighted return, the same one the equity
                curve shows in Return mode. Adding money to your account
                doesn&apos;t make you look better, and taking it out doesn&apos;t
                make you look worse. An index never receives deposits, so this
                is the only way the two can be compared.
            </P>
            <P>
                <Strong>Always after charges.</Strong> Brokerage, taxes and fees
                come off, because that is what you actually kept.
            </P>
            <P>
                <Strong>It ignores the Units setting.</Strong> Whether your
                dashboard reads in Amount, Return or R, this widget always
                compares returns, because a return is the only thing an index
                has.
            </P>
            <P>
                It needs an opening balance on your broker accounts, since a
                return has to be measured against something. If one is missing,
                the widget tells you where to add it.
            </P>

            <H2>More places to find it</H2>
            <P>
                <Strong>Account page.</Strong> Each broker account now has its
                own Benchmark chart under the equity curve.
            </P>
            <P>
                <Strong>Your profile.</Strong> Pin the widget from its ⋯ menu to
                show it in Performance Stats on your public profile. It only
                ever shows returns, never amounts.
            </P>
            <P>
                <Strong>Ask AI.</Strong> If you&apos;ve connected an AI
                assistant to your journal, ask it &ldquo;did I beat the Nifty
                this year?&rdquo; and it will answer with the same numbers.
            </P>

            <div className="mt-12">
                <GetStarted label="Open your dashboard" href={DASHBOARD_URL} />
            </div>
        </>
    );
}
