import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Trades — All Your Trades in One Place | Arthveda",
    description:
        "View, filter, and analyze all your trades in one place. Your complete trading history, organized and accessible.",
};

export default function ProductTradesPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">All your trades, in one place.</h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Access your complete trading history with powerful filters
                    and detailed breakdowns — so nothing gets lost or
                    overlooked.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/trades_hero.png"
                alt="Table of trades showing positions, pnl, charges and filters"
                className="w-[80%]"
            />
        </main>
    );
}
