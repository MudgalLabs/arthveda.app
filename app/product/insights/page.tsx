import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Insights — Find What’s Hurting Your Trading | Arthveda",
    description:
        "Analyze your trading performance with clear insights. Identify mistakes, uncover what’s working, and improve your edge with data-backed patterns.",
};

export default function ProductInsightsPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">
                    See what’s actually hurting your trading.
                </h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Arthveda analyzes your trades to show why you lose money and
                    what needs to change — so you can improve with clarity, not
                    intuition.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/insights_hero.png"
                alt="Insights showing what's hurting and what's working in trading performance"
                className="md:w-[80%]"
            />
        </main>
    );
}
