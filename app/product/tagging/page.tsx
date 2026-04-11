import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Tagging — Spot Patterns in Your Trades | Arthveda",
    description:
        "Tag your trades and uncover hidden patterns. Understand which setups and behaviors drive your results.",
};

export default function ProductTaggingPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">
                    Spot patterns you’d otherwise miss.
                </h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Tag your trades by setup, mistake, or behavior — and uncover
                    patterns that aren’t visible otherwise.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/tagging_hero.png"
                alt="Tagged trades showing patterns across setups and behaviors"
                className="w-[80%]"
            />
        </main>
    );
}
