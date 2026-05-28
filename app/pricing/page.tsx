import type { Metadata } from "next";
import { Tag } from "lucide-react";

import { FamilyLabel } from "@/components/family_label";
import { LifetimePromo } from "@/app/pricing/lifetime_strip";
import { PlansTable } from "@/app/pricing/plans_table";

export const metadata: Metadata = {
    title: "Pricing · Arthveda",
    description:
        "Free forever, with limits. Pro lifts every cap when daily use outgrows them — 30-day trial, no credit card required.",
    alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
    return (
        <main className="pb-24">
            {/* Header — match the /product/* hub hero exactly so /pricing reads
                as a sibling of the family hubs (plan §7). No CTAs in the hero. */}
            <section className="pt-12 md:pt-16 lg:pt-20">
                <FamilyLabel name="Pricing" Icon={Tag} />
                <h1 className="mt-5 max-w-3xl text-balance font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.025em] text-text-primary sm:text-[52px] lg:max-w-none lg:text-[60px]">
                    Start free. Upgrade when you need more.
                </h1>
                {/* Subtitle slot now carries the launch promo — gives the
                    Lifetime offer prime real-estate and drops the orphan
                    bordered banner that used to sit above the table. */}
                <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                    <LifetimePromo />
                </p>
            </section>

            {/* Full-bleed divider after the hero — same treatment as the hubs. */}
            <hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

            {/* Plans block — the table (with the Lifetime banner + interval
                toggle on its own header row), then the yearly nudge and the
                trial-mechanics footnote. */}
            <div className="mt-24">
                <PlansTable />

                {/* Yearly nudge + trial footnote (plan §7: mechanics live here,
                    not in the table; the post-launch card-required phase is
                    deliberately not advertised). */}
                <div className="mx-auto mt-8 max-w-3xl space-y-3 text-center text-sm text-text-muted">
                    <p>
                        Building a track record is a long game — most traders
                        go yearly.
                    </p>
                    <p className="text-xs text-text-subtle">
                        30-day Pro trial, no credit card required. When the
                        trial ends, you drop to Free — never locked out.
                    </p>
                </div>
            </div>
        </main>
    );
}
