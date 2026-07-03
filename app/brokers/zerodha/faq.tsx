"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// Display copy for the FAQ accordion. The plain-text equivalents that power the
// FAQPage JSON-LD live in the server page (page.tsx) so the schema stays in the
// crawlable HTML head. Keep the two in sync when editing.
const FAQS: { q: string; a: React.ReactNode }[] = [
    {
        q: "What can Arthveda do with my Zerodha trades?",
        a: (
            <>
                Arthveda imports your Zerodha Tradebook, groups executions into
                trades, calculates after-charges PnL, and gives you a dashboard,
                trade list, journal notes, tags, insights, reports, and broker
                sync for future trades.
            </>
        ),
    },
    {
        q: "Does Arthveda support F&O?",
        a: (
            <>
                Yes. Your journal takes everything you trade: equity, crypto,
                and F&amp;O across stock, index, and commodity, whether you sync
                it from Zerodha or log it by hand. The one stock-only surface is
                the screener (NSE/BSE equities).
            </>
        ),
    },
    {
        q: "Do I have to upload a file, or can it sync?",
        a: (
            <>
                Both, for Zerodha. Upload your Console tradebook (XLSX) for a
                date range to import historical trades first. After that,
                connect your Zerodha account inside Arthveda and use Sync to
                pull fresh trades with one click.
            </>
        ),
    },
    {
        q: "I trade through more than one broker. Will it aggregate?",
        a: (
            <>
                Yes. Arthveda supports Zerodha, Upstox, Groww, Angel One, FYERS,
                Kotak Securities, and INDmoney. Import from each and the journal
                aggregates across all of them so you see your real performance
                picture.
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
    {
        q: "What if I scale into a trade with multiple entries and partial exits?",
        a: (
            <>
                Handled natively. If you bought 100 shares of RELIANCE in three
                tranches and exited in two, that&apos;s one trade with five
                executions inside it: average cost computed, partial PnL on each
                exit, full PnL on close.
            </>
        ),
    },
    {
        q: "What about charges?",
        a: (
            <>
                Brokerage, STT, GST, stamp duty, SEBI charges, and exchange
                transaction charges are computed from the standard Zerodha rate
                card. The PnL Arthveda shows you is after charges, which is the
                only PnL that actually matters.
            </>
        ),
    },
    {
        q: "How often should I import?",
        a: (
            <>
                Weekly is a good cadence. Even better: import nightly during a
                swing-trading week so you tag trades while the reasoning is still
                fresh. For history, import the Current FY or Previous FY
                Tradebook first. After your historical data is in Arthveda, use
                Zerodha Sync regularly so fresh trades appear without repeating
                the file-upload process.
            </>
        ),
    },
];

export default function ZerodhaFAQ() {
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
