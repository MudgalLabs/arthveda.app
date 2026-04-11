import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Performance — Track Your Trading Growth | Arthveda",
    description:
        "Track your trading performance with clear metrics like PnL, win rate, and equity curve. Know if you're actually improving.",
};

export default function ProductPerformancePage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">
                    Know if you&apos;re actually improving.
                </h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Track your PnL, win rate, and overall performance over time
                    — so you can measure progress with real data, not
                    assumptions.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/performance_hero.png"
                alt="Trading performance dashboard showing PnL, win rate and equity curve"
                className="w-[80%]"
            />
        </main>
    );
}
