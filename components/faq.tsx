"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const FAQS = [
    {
        q: "Do I need to manually enter my trades?",
        a: (
            <>
                No.
                <br />
                Import your trades using your broker’s exported file in seconds.
            </>
        ),
    },
    {
        q: "Which brokers are supported?",
        a: (
            <>
                Zerodha, Groww, Angel One, and others via file upload.
                <br />
                Can 1-click sync today’s trades for Zerodha.
            </>
        ),
    },
    {
        q: "How is this different from what my broker provides?",
        a: (
            <>
                Your broker shows what happened.
                <br />
                Arthveda shows what to change.
            </>
        ),
    },
    {
        q: "How is this different from spreadsheets?",
        a: (
            <>
                Spreadsheets help you log trades.
                <br />
                Arthveda helps you understand them.
            </>
        ),
    },
    {
        q: "Is this only for experienced traders?",
        a: (
            <>
                No.
                <br />
                If you&apos;re trading, you should be learning from it.
            </>
        ),
    },
    {
        q: "Is my trading data secure?",
        a: (
            <>
                Yes.
                <br />
                Your data is used only to power your analytics inside Arthveda.
                <br />
                It is never sold or used for advertising.
            </>
        ),
    },
    {
        q: "Will this actually help me become profitable?",
        a: (
            <>
                Arthveda won’t trade for you.
                <br />
                But it will show you what’s working, what’s hurting, and what to
                fix.
            </>
        ),
    },
    {
        q: "Is there a free plan?",
        a: (
            <>
                No.
                <br />
                You get a 30-day free trial — no credit card required.
                <br />A free plan is coming soon.
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
