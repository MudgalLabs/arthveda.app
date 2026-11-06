import type { ReactNode } from "react";

import { GetStarted } from "@/components/get_started";
import { SYMBOLS_URL } from "@/lib/links";

// Release post: Compare on the symbol chart (shipped 2026-11-05). Facts follow
// arthveda/docs/symbols.md ("Chart: Compare, layout, image export"); keep them
// in step if the chart changes.

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

const SUGGESTED = [
    {
        market: "India",
        names: "The stock's own NSE sector index (IT, Bank, Auto, Pharma, FMCG and 8 more), then Nifty 50, Nifty 500, Midcap 150 and Smallcap 250",
    },
    {
        market: "US",
        names: "The stock's sector fund (XLK, XLF, XLV and 8 more), then the S&P 500, Nasdaq-100, Dow 30 and Russell 2000",
    },
];

export default function CompareSymbols() {
    return (
        <>
            <P>
                A stock that rose 11% sounds great until you see its sector
                rose 10%. The question that matters is usually not &ldquo;did
                it go up?&rdquo; but &ldquo;did it beat everything around
                it?&rdquo; Every symbol chart now answers that. Choose{" "}
                <Strong>Compare</Strong> and put up to five stocks or indices
                on one chart, all starting from 0%.
            </P>
            <P>
                Any mix works: <Strong>stock vs stock</Strong> (HDFC Bank vs
                ICICI Bank), <Strong>stock vs its sector</Strong> (TCS vs Nifty
                IT), <Strong>stock vs the market</Strong> (Reliance vs Nifty
                50) or <Strong>index vs index</Strong> (Nifty Bank vs Nifty
                IT). Open an index&apos;s chart and compare from there too.
            </P>

            <H2>Compare on any chart</H2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 font-content text-[16px] leading-[1.7] text-text-muted">
                <li>Open any symbol and choose <Strong>Compare</Strong> in the chart toolbar.</li>
                <li>
                    Pick from the suggestions, or search any stock or index in
                    the same market. Arthveda suggests the stock&apos;s own
                    sector index first.
                </li>
                <li>Add up to five. Each gets its own line and color.</li>
            </ol>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SUGGESTED.map((g) => (
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
                Every line starts at 0% on the first day you can see, so the
                legend shows each line&apos;s return over exactly what is on
                screen. In the chart above, <Strong>TCS +11.18%</Strong>{" "}
                against <Strong>Nifty IT +10.33%</Strong>: TCS beat its sector
                by 0.85 points from 15 September to 30 October.
            </P>
            <P>
                <Strong>Zoom to the window you care about.</Strong> Scroll or
                zoom until only one month is on screen and the legend reads
                that month&apos;s return for every line. Move the chart and the
                numbers follow.
            </P>
            <P>
                While you compare, the stock itself is drawn as a line too, so
                you are always comparing like with like. Remove the last
                comparison and the candles come back.
            </P>

            <H2>Share what you found</H2>
            <P>
                <Strong>The link keeps the comparison.</Strong> Copy the page
                address and whoever opens it sees the same lines.
            </P>
            <P>
                <Strong>Save it as an image.</Strong> The chart&apos;s ⋯ menu
                has <Strong>Save image</Strong> and <Strong>Copy image</Strong>.
                The picture carries the dates on screen and every line&apos;s
                return, so it explains itself wherever you post it.
            </P>

            <H2>Also new on the chart</H2>
            <P>
                <Strong>A bigger chart.</Strong> The chart now runs the full
                width of the page and fills your screen, with the symbol&apos;s
                stats and your journey just below it.
            </P>
            <P>
                <Strong>A tidier legend.</Strong> A long list of indicators
                folds into one line with a single click.
            </P>
            <P>
                <Strong>Chart tools are free.</Strong> Indicators, drawings,
                saved layouts and Compare now work on every account, free or
                paid.
            </P>

            <div className="mt-12">
                <GetStarted label="Try TCS vs Nifty IT" href={`${SYMBOLS_URL}/TCS?compare=NIFTYIT`} />
            </div>
        </>
    );
}
