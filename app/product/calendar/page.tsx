import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Calendar — Visualize Your Trading Over Time | Arthveda",
    description:
        "See your trading performance day by day with a visual calendar. Spot patterns across time instantly.",
};

export default function ProductCalendarPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">See your trading over time.</h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Visualize your daily performance in a calendar view — so you
                    can spot patterns, streaks, and consistency at a glance.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/calendar_hero.png"
                alt="Trading calendar showing daily profit and loss patterns"
                className="md:w-[80%]"
            />
        </main>
    );
}
