import type { Metadata } from "next";
import { Tag } from "lucide-react";

import { FamilyLabel } from "@/components/family_label";
import { PlansTable } from "@/app/pricing/plans_table";
import { fetchPricing, formatPrice } from "@/lib/pricing";
import { PricingProvider } from "@/lib/usePricing";
import { visitorCountry } from "@/lib/visitor_country";

// The description quotes the visitor's live prices (crawlers mostly get USD);
// without them it still says everything but the numbers.
export async function generateMetadata(): Promise<Metadata> {
    const pricing = await fetchPricing(await visitorCountry());
    const then = pricing
        ? `Then ${formatPrice(pricing.monthlyPrice, pricing.currency)} a month, ${formatPrice(pricing.yearlyPrice, pricing.currency)} a year or ${formatPrice(pricing.oneTimePrice, pricing.currency)} once, ${pricing.taxName} included`
        : "Then pay monthly, yearly or once";
    return {
        title: "Pricing · Arthveda",
        description: `Try Arthveda free for 14 days. No card required. ${then}, with a 14-day refund on every plan.`,
        alternates: { canonical: "/pricing" },
    };
}

export default async function PricingPage() {
    const pricing = await fetchPricing(await visitorCountry());

    return (
        <PricingProvider pricing={pricing}>
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
                        monthly, yearly, or once.
                    </p>
                </section>

                {/* Full-bleed divider after the hero — same treatment as the hubs. */}
                <hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

                {/* Plans block — the three plans we sell, the full "everything is
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
        </PricingProvider>
    );
}
