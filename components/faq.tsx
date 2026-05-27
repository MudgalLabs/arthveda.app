"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

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
        q: "Is the Screener free?",
        a: (
            <>
                Yes. You can run scans and open any published screener with no
                signup. A free account lets you save, star, clone, and publish
                screeners, and use Progressive Scan.
            </>
        ),
    },
    {
        q: "Which markets does it cover?",
        a: <>Indian equities, on the NSE and BSE.</>,
    },
    {
        q: "Is it for intraday trading?",
        a: (
            <>
                No. Arthveda is built for swing and positional trading, on
                daily, end-of-day workflows.
            </>
        ),
    },
    {
        q: "Can I import trades from my broker?",
        a: (
            <>
                Yes. The Journal supports manual logging and broker imports. See
                the brokers page for the supported list.
            </>
        ),
    },
    {
        q: "Will my trades and notes be public?",
        a: (
            <>
                No. Everything is private by default. Nothing is public unless
                you explicitly publish or share it.
            </>
        ),
    },
    {
        q: "Do you give tips or signals?",
        a: (
            <>
                Never. Arthveda is about process, discovery, journaling, and
                review. No tips, no guaranteed returns, no copy-trading.
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
                    open ? "max-h-40 pb-5" : "max-h-0",
                )}
            >
                <div className="text-sm text-text-muted leading-relaxed">
                    {a}
                </div>
            </div>
        </div>
    );
}
