"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// Display copy for the FAQ accordion. The plain-text equivalents that power the
// FAQPage JSON-LD live in the server page (page.tsx) so the schema stays in the
// crawlable HTML head. Keep the two in sync when editing.
const FAQS: { q: string; a: React.ReactNode }[] = [
    {
        q: "What can Arthveda do with my Dhan trades?",
        a: (
            <>
                Once Dhan sync is live, Arthveda connects to your Dhan account,
                pulls your trades, groups executions into trades, calculates
                after-charges PnL, and gives you a dashboard, trade list,
                journal notes, tags, insights, and reports.
            </>
        ),
    },
    {
        q: "When will Dhan support be available?",
        a: (
            <>
                It&apos;s coming soon. The integration is built and in final
                testing. In the meantime you can start journaling today with
                Zerodha, Upstox, Groww, Angel One, FYERS, Kotak Securities, or
                INDmoney, and your Dhan trades will slot into the same journal
                the moment sync goes live.
            </>
        ),
    },
    {
        q: "Is it a file upload or a sync?",
        a: (
            <>
                Sync. Dhan is a sync-first broker: connect your account once,
                then a single click pulls today&apos;s and your full historical
                trades into Arthveda. There&apos;s no file to download or upload.
                To stay current later, you just hit Sync again.
            </>
        ),
    },
    {
        q: "Does Arthveda support F&O for Dhan?",
        a: (
            <>
                Yes. Equity, futures, and options all come in through the Dhan
                sync, with each contract resolved to the right instrument,
                expiry, and strike. The journal itself handles everything you
                trade, and the one stock-only surface is the screener (NSE/BSE
                equities).
            </>
        ),
    },
    {
        q: "I trade through more than one broker. Will it aggregate?",
        a: (
            <>
                Yes. Arthveda supports Zerodha, Upstox, Groww, Angel One, FYERS,
                Kotak Securities, and INDmoney, with Dhan on the way. Import from
                each and the journal aggregates across all of them so you see
                your real performance picture.
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
                transaction charges are computed from the standard Dhan rate
                card. The PnL Arthveda shows you is after charges, which is the
                only PnL that actually matters.
            </>
        ),
    },
];

export default function DhanFAQ() {
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
