import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Insights — Find What’s Hurting Your Trading | Arthveda",
    description:
        "Analyze your trading performance with clear insights. Identify mistakes, uncover what’s working, and improve your edge with data-backed patterns.",

    openGraph: {
        title: "Insights — Find What’s Hurting Your Trading",
        description:
            "See exactly where you lose money and what works in your trading.",
        images: [
            {
                url: "/images/insights_hero.png",
                width: 1200,
                height: 630,
                alt: "Arthveda Insights",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Insights — Find What’s Hurting Your Trading",
        description:
            "See exactly where you lose money and what works in your trading.",
        images: ["/images/insights_hero.png"],
    },
};

export default function ProductInsightsPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">
                    See what’s actually hurting your trading.
                </h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Arthveda analyzes your trades to show where you lose money,
                    where you make it, and what needs to change — so you can
                    improve with clarity, not intuition.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/insights_hero.png"
                alt="Insights showing what's hurting and what's working in trading performance"
                className="w-[80%]"
            />
        </main>
    );
}
