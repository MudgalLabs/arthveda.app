import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Journal — Understand Every Trade | Arthveda",
    description:
        "Capture the reasoning behind every trade. Review decisions, learn from mistakes, and build a disciplined trading process.",
};

export default function ProductJournalPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">
                    Understand the why behind every trade.
                </h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Log your thoughts, review your decisions, and learn from
                    every trade — so you can improve your process, not just
                    outcomes.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/journal_hero.png"
                alt="Trading journal with notes and reasoning for a trade"
                className="md:w-[80%]"
            />
        </main>
    );
}
