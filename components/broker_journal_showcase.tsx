import Image from "next/image";
import Link from "next/link";

// Mini journal showcase for broker landing pages: real feature screenshots that
// deep-link into the journal hub. A summary for skimmers who won't read the
// long-form body. Images and anchors mirror lib/journal_sections.ts; identical
// across brokers except the name in the heading/subcopy.
const FEATURES = [
    {
        id: "dashboard",
        title: "Dashboard",
        image: "/images/product_journal_dashboard.png",
        blurb: "Net PnL, win rate, expectancy, and your equity curve over time.",
    },
    {
        id: "insights",
        title: "Insights",
        image: "/images/product_journal_insights.png",
        blurb: "The patterns behind your wins, losses, timing, and mistakes.",
    },
    {
        id: "reports",
        title: "Reports",
        image: "/images/product_journal_reports.png",
        blurb: "Performance broken down by symbol, setup, timeframe, and tag.",
    },
    {
        id: "trades",
        title: "Trades",
        image: "/images/product_journal_trades.png",
        blurb: "Your full history, with filters and a detailed breakdown per trade.",
    },
    {
        id: "tagging",
        title: "Tagging",
        image: "/images/product_journal_tagging.png",
        blurb: "Tag by setup, mistake, or market condition, then measure each one.",
    },
    {
        id: "notebook",
        title: "Notebook",
        image: "/images/product_journal_notebook.png",
        blurb: "Attach your reasoning and chart screenshots to the actual trade.",
    },
];

export function BrokerJournalShowcase({
    brokerName,
    // Sync-only brokers (Dhan) pull trades rather than importing a file.
    actionNoun = "import",
}: {
    brokerName: string;
    actionNoun?: string;
}) {
    return (
        <section className="mx-auto mt-20 max-w-6xl md:mt-24">
            <div className="text-center">
                <h2 className="font-heading text-[26px] font-medium tracking-[-0.015em] text-text-primary sm:text-[30px]">
                    Everything you get from one {brokerName} {actionNoun}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-balance font-content text-[15px] leading-[1.6] text-text-muted">
                    Your {brokerName} trades become a dashboard, insights,
                    reports, and a searchable journal, with no setup and no
                    formulas to maintain.
                </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((feature) => (
                    <li key={feature.id}>
                        <Link
                            href={`/product/journal#${feature.id}`}
                            className="group flex h-full flex-col rounded-lg border border-white/[0.12] bg-surface-1/35 p-3 no-underline! transition-colors hover:border-border-accent"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-white/[0.06] bg-background">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    quality={90}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                                />
                            </div>
                            <div className="px-1 pb-1 pt-4">
                                <p className="font-heading text-[15px] font-medium text-text-primary">
                                    {feature.title}
                                </p>
                                <p className="mt-1 font-content text-[13.5px] leading-[1.6] text-text-muted">
                                    {feature.blurb}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-8 text-center">
                <Link
                    href="/product/journal"
                    className="font-content text-[15px]!"
                >
                    Explore the full journal
                </Link>
            </div>
        </section>
    );
}
