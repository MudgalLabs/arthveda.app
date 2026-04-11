import type { Metadata } from "next";
import { Screenshot } from "@/components/screenshot";

export const metadata: Metadata = {
    title: "Accounts — Track All Your Trading Accounts | Arthveda",
    description:
        "Manage multiple trading accounts in one place. Track performance across brokers, strategies, and capital without the mess.",
};

export default function ProductAccountsPage() {
    return (
        <main>
            <div className="mt-12 md:mt-16 mb-12 text-center space-y-4">
                <h1 className="page-header">
                    See everything, across all your accounts.
                </h1>

                <p className="font-content text-muted-foreground mx-auto max-w-2xl">
                    Track multiple trading accounts in one place — across
                    brokers, strategies, and capital — without losing clarity.
                </p>
            </div>

            <div className="h-8 sm:h-12 md:h-16" />

            <Screenshot
                src="/images/accounts_hero.png"
                alt="Multiple trading accounts tracked in one place with performance overview"
                className="md:w-[80%]"
            />
        </main>
    );
}
