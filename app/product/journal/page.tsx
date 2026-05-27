import type { Metadata } from "next";

import FeatureCard from "@/components/feature_card";
import { GetStarted } from "@/components/get_started";
import { JOURNAL_FEATURES } from "@/lib/journal_sections";

export const metadata: Metadata = {
    title: "Journal · Arthveda",
    description:
        "Review trades and improve your process. Log or import trades, journal the decisions behind them, and use performance analytics and insights to see where you make money, where you lose it, and what to fix.",
    alternates: { canonical: "/product/journal" },
};

// Group features into pairs — each pair renders as one bordered container.
const ROWS = Array.from({ length: Math.ceil(JOURNAL_FEATURES.length / 2) }, (_, i) =>
    JOURNAL_FEATURES.slice(i * 2, i * 2 + 2)
);

export default function JournalHubPage() {
    return (
        <main className="pb-24">
            {/* Hero — left-aligned (homepage hero style, no CTAs). */}
            <section className="max-w-3xl pt-12 md:pt-16 lg:pt-20">
                <p className="text-sm font-medium uppercase tracking-wide text-accent">
                    Journal
                </p>
                <h1 className="mt-5 font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.025em] text-text-primary sm:text-[52px] lg:text-[60px]">
                    Turn trades into feedback.
                </h1>
                <p className="mt-5 font-content text-[15px] leading-[1.6] text-text-muted">
                    Log or import your trades, journal the decisions behind them,
                    and use performance analytics and insights to see where you
                    make money, where you lose it, and what to fix.
                </p>
            </section>

            {/* Full-bleed divider after the hero. Breaks out of the padded
                content column (safe: the layout wrapper is overflow-x-clip). */}
            <hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

            {/* Features — each pair of cards sits in one bordered container
                with a divider between them (Linear-style). Containers are spaced
                evenly, matching the divider-to-first-row gap. */}
            <div className="mt-24 space-y-24">
                {ROWS.map((pair, ri) => (
                    <div
                        key={ri}
                        className="grid grid-cols-1 divide-y divide-white/[0.14] overflow-hidden rounded-md border border-white/[0.14] md:grid-cols-2 md:divide-x md:divide-y-0"
                    >
                        {pair.map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                id={feature.id}
                                label={feature.label}
                                heading={feature.heading}
                                subheading={feature.subheading}
                                image={feature.image}
                                priority={ri === 0}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-20 text-center md:mt-28">
                <h2 className="section-header">
                    Ready to learn from every trade?
                </h2>
                <div className="h-8" />
                <div className="mx-auto w-fit">
                    <GetStarted label="Start journaling" />
                </div>
            </div>
        </main>
    );
}
