import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Reports — Find What’s Consistently Working | Arthveda",
    description:
        "Break down your trading performance across setups, symbols, and strategies. Discover what consistently works.",
};

export default function ProductReportsPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">
                    Find what’s consistently working.
                </h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Analyze your performance across setups, symbols, and
                    patterns — so you can double down on what works and cut what
                    doesn’t.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/reports_hero.png"
                alt="Trading reports showing performance breakdown across setups and symbols"
                className="w-[80%]"
            />
        </main>
    );
}
