import { Suspense } from "react";
import Link from "next/link";

import { GetStarted } from "@/components/get_started";
import { PlanCards } from "@/components/plan_cards";
import { fetchPricing } from "@/lib/pricing";
import { PricingProvider } from "@/lib/usePricing";
import { visitorCountry } from "@/lib/visitor_country";

// Prices depend on the visitor's country, so this part streams in behind a
// Suspense boundary: a slow or unreachable pricing API must not hold up the
// hero, and this section is far below the fold anyway.
async function LivePlanCards() {
    const pricing = await fetchPricing(await visitorCountry(), { revalidate: 600 });

    // Three cards of dashes would look broken on the homepage, so without
    // live prices say the same thing in words.
    if (!pricing) {
        return <p className="text-text-muted text-sm">After the trial, pay monthly, yearly, or once.</p>;
    }

    return (
        <PricingProvider pricing={pricing}>
            <PlanCards />
        </PricingProvider>
    );
}

export default function BottomCTA() {
    return (
        <div id="bottom-cta" className="mx-auto max-w-4xl text-center">
            <h3 className="section-header">
                Start building your <br className="sm:hidden" />
                trading process.
            </h3>

            <div className="h-10" />

            {/* The price comes before the ask: "try it free" raises "and then
                what do I pay?", so that is answered right above the button. */}
            <Suspense fallback={<PlanCards />}>
                <LivePlanCards />
            </Suspense>

            <div className="h-10" />

            <div className="mx-auto w-fit">
                <GetStarted noCardNote />
            </div>

            <div className="h-6" />

            {/* The other half of the question: what happens if I don't pay. */}
            <p className="text-text-muted mx-auto max-w-2xl text-balance text-sm leading-relaxed">
                No auto-charge when the trial ends. If you don&apos;t subscribe,
                your journal goes read-only and nothing is deleted.
            </p>

            <div className="h-3" />

            <Link href="/pricing">See everything included</Link>
        </div>
    );
}
