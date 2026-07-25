"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MARKET_MONITOR_URL } from "@/lib/links";

const FAQS = [
    {
        q: "Is Arthveda a broker?",
        a: (
            <>
                No. It never executes or controls your trades. Arthveda is the
                workflow and identity layer that sits around your broker.
            </>
        ),
    },
    {
        q: "Do you give tips, signals, or trade calls?",
        a: (
            <>
                Never. I don&apos;t run a tip group and I&apos;ll never sell
                you one. Arthveda is about your process: discovery, watchlists,
                journaling, and review. No calls, no guaranteed returns, no
                copy-trading.
            </>
        ),
    },
    {
        q: "Is Arthveda free?",
        a: (
            <>
                There is a 14-day free trial, no card required. You get the
                whole product during it, with no limits. After that you
                subscribe to keep going. If you don&apos;t, nothing is deleted:
                your trades, screeners and watchlists stay readable,
                exportable and shareable, you just can&apos;t add to them until
                you subscribe. Running screeners stays free for everyone. See{" "}
                <Link href="/pricing">pricing</Link>.
            </>
        ),
    },
    {
        q: "Which markets and segments does it support?",
        a: (
            <>
                Most of them. Your{" "}
                <Link href="/product/journal">Journal</Link> takes everything
                you trade: equity, crypto, and F&amp;O across stock, index, and
                commodity, whether you sync it from Zerodha and other brokers or
                log it by hand. The one stock-only part is{" "}
                <Link href="/product/discover">Discover</Link>, the screener:
                Indian equities on the NSE and BSE.
            </>
        ),
    },
    {
        q: "Does it work for my trading style?",
        a: (
            <>
                Yes. The{" "}
                <Link href="/product/journal">Journal</Link> is
                style-agnostic: intraday, swing, positional, long-term and
                automated strategies all log, analyse and review the same way,
                across equity and F&amp;O.{" "}
                <Link href="/product/discover">Discover</Link> runs on
                end-of-day data, so it suits traders scanning for the next few
                days or weeks rather than intraday setups.
            </>
        ),
    },
    {
        q: "Can I import trades from my broker?",
        a: (
            <>
                Yes. Log trades manually, or pull them in automatically with
                Broker Sync. SEBI requires brokers to log you out every morning,
                so a synced setup needs a quick login to your broker once a day.
                Broker Sync supports Zerodha today, with more{" "}
                <Link href="/brokers">brokers</Link> planned.
            </>
        ),
    },
    {
        q: "Can I connect Claude or another AI to my trading?",
        a: (
            <>
                Yes. Create an API key in your settings and{" "}
                <Link href="/product/ai">
                    connect Claude, Codex, or any AI assistant
                </Link>
                , then ask your journal questions in plain English. It is
                read-only: it reads your journal and never changes it. Your
                written notes stay private unless you opt them in.
            </>
        ),
    },
    {
        q: "Is Market Monitor free?",
        a: (
            <>
                Yes, and you don&apos;t even need an account to look. Heatmaps,
                sector rotation, market breadth, and the risk-on / risk-off
                regime are open to everyone. It runs on end-of-day data, updated
                after the close.{" "}
                <a href={MARKET_MONITOR_URL}>Open Market Monitor</a>.
            </>
        ),
    },
    {
        q: "Can it tell me if I exited a trade too early?",
        a: (
            <>
                Yes. <Link href="/product/journal">Trade Analysis</Link> replays
                every closed trade against the price that came after it and
                shows how much of the move you captured and how much was still
                on the table after you exited. The honest answer, from the
                chart, not your memory.
            </>
        ),
    },
    {
        q: "Will my trades, journals, and watchlists be public?",
        a: (
            <>
                No. Everything is private by default. Your trades, journals, and
                watchlists are yours alone. Nothing is public unless you
                explicitly publish or share it.
            </>
        ),
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section>
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-10 sm:mb-14 md:mb-16">
                    <h3 className="section-header">
                        Frequently Asked Questions
                    </h3>

                    <p className="text-text-muted mt-3">
                        Questions before you start?
                    </p>
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
                    open ? "max-h-72 pb-5" : "max-h-0",
                )}
            >
                <div className="text-sm text-text-muted leading-relaxed">
                    {a}
                </div>
            </div>
        </div>
    );
}
