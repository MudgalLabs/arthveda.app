import type { Metadata } from "next";
import { Tag } from "lucide-react";

import { FamilyLabel } from "@/components/family_label";
import { PlansTable } from "@/app/pricing/plans_table";

export const metadata: Metadata = {
    title: "Pricing · Arthveda",
    description:
        "Try Arthveda free for 14 days. No card required. Then \u20b92,999 a year or \u20b96,999 once, GST included, with a 14-day refund on both.",
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
                    Try it free for 14 days. No card required.
                </h1>
                <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                    The whole workspace, no limits, for two weeks. Then pay
                    yearly or pay once.
                </p>
            </section>

            {/* Full-bleed divider after the hero — same treatment as the hubs. */}
            <hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

            {/* Plans block — the two plans we sell, the full "everything is
                included" list, and the read-only explainer for what happens
                after the trial. */}
            <div className="mt-24">
                <PlansTable />

                {/* Trial mechanics footnote. No card means there is no
                    auto-charge to warn about, so this says the one thing a
                    reader still wonders: what starts the clock, and what
                    happens if they do nothing. */}
                <div className="mx-auto mt-10 max-w-3xl space-y-3 text-center text-sm text-text-muted">
                    <p>
                        Building a track record is a long game. Most traders
                        go yearly.
                    </p>
                    <p className="text-xs text-text-subtle">
                        The 14-day trial starts when you create your account.
                        No card, no auto-charge, nothing to cancel: if you do
                        nothing, your workspace simply goes read-only.
                    </p>
                </div>
            </div>
        </main>
    );
}
