"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// Display copy for the FAQ accordion. The plain-text equivalents that power the
// FAQPage JSON-LD live in the server page (page.tsx) so the schema stays in the
// crawlable HTML head. Keep the two in sync when editing.
const FAQS: { q: string; a: React.ReactNode }[] = [
    {
        q: "What can Arthveda do with my Interactive Brokers trades?",
        a: (
            <>
                Arthveda reads your Interactive Brokers Flex Query, groups
                executions into trades, uses the commissions and fees IBKR
                reports to give you after-charges PnL, and gives you a
                dashboard, trade list, journal notes, tags, insights, and
                reports.
            </>
        ),
    },
    {
        q: "Which instruments are supported?",
        a: (
            <>
                US stocks and ETFs: the S&amp;P 500, Nasdaq-100 and Dow 30
                constituents plus the major ETFs. Options, futures, forex,
                stocks on other exchanges, and tickers outside that list are
                listed by name as skipped in the import summary, so nothing
                goes missing silently. If you need one of them, tell me and
                I&apos;ll prioritise it.
            </>
        ),
    },
    {
        q: "What is a Flex Query, and how do I make one?",
        a: (
            <>
                A Flex Query is a report you define once in IBKR Client Portal,
                under Performance &amp; Reports, Flex Queries. Create an
                Activity Flex Query with the Trades section at Executions level
                and XML format. Run it to download a file for Import, or use its
                Query ID with a Flex Web Service token for Sync.
            </>
        ),
    },
    {
        q: "Is there a sync, or is it file upload only?",
        a: (
            <>
                Both. Turn on the Flex Web Service in Client Portal, generate a
                token, and paste it into Arthveda with your Query ID. Your first
                sync pulls the last 365 days, and each later sync picks up where
                the last one left off. There is no daily login: the token works
                until the expiry you picked, up to a year.
            </>
        ),
    },
    {
        q: "How are charges calculated?",
        a: (
            <>
                They aren&apos;t estimated. Interactive Brokers reports the
                commission, exchange, regulatory and clearing fees on every
                execution, and Arthveda uses exactly those, so your net PnL
                matches your statement.
            </>
        ),
    },
    {
        q: "My trades are in dollars and I live in India. How does that work?",
        a: (
            <>
                Each trade keeps its dollar PnL, and your dashboard converts it
                into your home currency at the USD/INR rate of the day the trade
                closed. If Interactive Brokers is your first broker in Arthveda,
                your home currency is set to dollars; once you add rupee trades
                too, you pick which one your totals are in.
            </>
        ),
    },
    {
        q: "I trade through more than one broker. Will it aggregate?",
        a: (
            <>
                Yes. Arthveda supports Zerodha, Upstox, Groww, Angel One, FYERS,
                Kotak Securities, INDmoney, Dhan, Definedge, and Interactive
                Brokers. Import from each and the journal aggregates across all
                of them so you see your real performance picture.
            </>
        ),
    },
    {
        q: "Will my trades be public?",
        a: (
            <>
                No. Everything is private by default. You explicitly choose what
                to publish (screeners, watchlists, public-profile fields).
                Individual trades are never auto-published.
            </>
        ),
    },
];

export default function InteractiveBrokersFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section>
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-10 sm:mb-14 md:mb-16">
                    <h2 className="section-header">Frequently asked</h2>
                </div>

                <div className="divide-y divide-border-subtle/50">
                    {FAQS.map((faq, idx) => (
                        <FAQItem
                            key={idx}
                            {...faq}
                            open={openIndex === idx}
                            onToggle={() =>
                                setOpenIndex(openIndex === idx ? null : idx)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

type FAQItemProps = {
    q: string;
    a: React.ReactNode;
    open: boolean;
    onToggle: () => void;
};

function FAQItem({ q, a, open, onToggle }: FAQItemProps) {
    return (
        <div
            className={cn(
                "transition-colors duration-200 px-3 py-2 rounded-md",
                open ? "bg-surface-2" : "hover:bg-surface-1/50",
            )}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
            >
                <span
                    className={cn(
                        "font-medium transition-colors duration-200",
                        open
                            ? "text-text-primary"
                            : "text-text-muted group-hover:text-text-primary",
                    )}
                >
                    {q}
                </span>

                <span
                    className={cn(
                        "transition-transform duration-200",
                        open && "rotate-45",
                    )}
                >
                    +
                </span>
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    open ? "max-h-96 pb-5" : "max-h-0",
                )}
            >
                <div className="text-sm text-text-muted leading-relaxed">
                    {a}
                </div>
            </div>
        </div>
    );
}
