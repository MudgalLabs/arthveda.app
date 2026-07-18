"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// Display copy for the FAQ accordion. The plain-text equivalents that power the
// FAQPage JSON-LD live in the server page (page.tsx) so the schema stays in the
// crawlable HTML head. Keep the two in sync when editing.
const FAQS: { q: string; a: React.ReactNode }[] = [
    {
        q: "What can Arthveda do with my INDmoney trades?",
        a: (
            <>
                Arthveda imports your INDmoney tradebook, groups executions into
                trades, calculates after-charges PnL, and gives you a dashboard,
                trade list, journal notes, tags, insights, and reports.
            </>
        ),
    },
    {
        q: "Does Arthveda support F&O for INDmoney?",
        a: (
            <>
                Equity and options, yes. Arthveda reads your INDmoney tradebook
                and brings in stocks and options automatically, detecting the
                CE/PE contract on each row. Futures import isn&apos;t built yet,
                but INDmoney does export it, so ping us a sample tradebook and we
                can add it. The journal itself handles everything you trade, and
                the one stock-only surface is the screener (NSE/BSE equities).
            </>
        ),
    },
    {
        q: "Is there a sync, or is it file upload only?",
        a: (
            <>
                File upload, for INDmoney. Export your tradebook (Excel or CSV)
                from the INDmoney app and import it into Arthveda. INDmoney
                doesn&apos;t offer trade sync yet, so to add fresh trades later
                you export a new tradebook for the recent date range and import
                it again.
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
                transaction charges are computed from the standard INDmoney rate
                card. The PnL Arthveda shows you is after charges, which is the
                only PnL that actually matters.
            </>
        ),
    },
    {
        q: "How often should I import?",
        a: (
            <>
                There is no fixed rule. A weekly or monthly export keeps your
                journal current. A good habit is to export your tradebook every
                weekend and tag the week&apos;s trades while the reasoning is
                still fresh. Since INDmoney has no sync, just export the new date
                range since your last import and upload it again.
            </>
        ),
    },
];

export default function INDmoneyFAQ() {
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
