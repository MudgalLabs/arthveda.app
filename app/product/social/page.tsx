import type { Metadata } from "next";

import FeatureCard from "@/components/feature_card";
import { FamilyLabel } from "@/components/family_label";
import { GetStarted } from "@/components/get_started";
import { SOCIAL_FEATURES } from "@/lib/social_sections";
import { FAMILY_ICONS } from "@/lib/families";
import { PROFILE_URL } from "@/lib/links";

export const metadata: Metadata = {
    title: "Social · Arthveda",
    description:
        "Build a public trading identity around your process — your screeners, watchlists, and activity — and follow traders who think like you. Not a P&L leaderboard.",
    alternates: { canonical: "/product/social" },
};

// Group features into pairs — each pair renders as one bordered container.
const ROWS = Array.from({ length: Math.ceil(SOCIAL_FEATURES.length / 2) }, (_, i) =>
    SOCIAL_FEATURES.slice(i * 2, i * 2 + 2)
);

export default function SocialHubPage() {
    return (
        <main className="pb-24">
            {/* Hero — left-aligned (homepage hero style, no CTAs). The heading
                drops its width cap at lg so it sits on one line on wide screens;
                text-balance keeps any wrap on narrower screens even. The
                subheading keeps a readable measure. */}
            <section className="pt-12 md:pt-16 lg:pt-20">
                <FamilyLabel name="Social" Icon={FAMILY_ICONS.social} />
                <h1 className="mt-5 max-w-3xl text-balance font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.025em] text-text-primary sm:text-[52px] lg:max-w-none lg:text-[60px]">
                    Build a reputation on your process.
                </h1>
                <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                    Your public profile shows how you actually trade — your
                    published screeners and watchlists, your activity, your
                    consistency — so you build credibility on process, not P&amp;L
                    screenshots.
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
                                placeholderLabel={feature.placeholderLabel}
                                priority={ri === 0}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-20 text-center md:mt-28">
                <h2 className="section-header">
                    Ready to build your trading identity?
                </h2>
                <div className="h-8" />
                <div className="mx-auto w-fit">
                    <GetStarted label="Create your profile" href={PROFILE_URL} />
                </div>
            </div>
        </main>
    );
}
