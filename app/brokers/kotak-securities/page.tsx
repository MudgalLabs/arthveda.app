import type { Metadata } from "next";
import Link from "next/link";
import { Plug } from "lucide-react";

import { BrokerJournalShowcase } from "@/components/broker_journal_showcase";
import { BrokerPricingSummary } from "@/components/broker_pricing_summary";
import { BrokerTrustStrip } from "@/components/broker_trust_strip";
import { FamilyLabel } from "@/components/family_label";
import { GetStarted } from "@/components/get_started";
import LitMedia from "@/components/lit_media";
import { SegmentChips } from "@/components/segment_chips";
import { BROKERS } from "@/lib/brokers";
import { BROKER_ACCOUNTS_URL } from "@/lib/links";
import KotakSecuritiesFAQ from "./faq";

const KOTAK = BROKERS.find((b) => b.name === "Kotak Securities")!;

export const metadata: Metadata = {
    title: "Trading Journal for Kotak Securities Users: From Trade Report to Real Insights · Arthveda",
    description:
        "Turn your Kotak Securities trade report into a trading journal with performance analytics, insights, reports, tags, notes, and trade-level feedback in under five minutes. Equity and F&O in one file.",
    alternates: { canonical: "/brokers/kotak-securities" },
    openGraph: {
        title: "Trading Journal for Kotak Securities Users: From Trade Report to Real Insights",
        description:
            "Turn your Kotak Securities trade report into a trading journal with performance analytics, insights, reports, tags, notes, and trade-level feedback in under five minutes. Equity and F&O in one file.",
        url: "https://arthveda.app/brokers/kotak-securities",
        type: "article",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "Trading Journal for Kotak Securities Users · Arthveda",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Trading Journal for Kotak Securities Users: From Trade Report to Real Insights",
        description:
            "Turn your Kotak Securities trade report into a trading journal with performance analytics, insights, reports, tags, notes, and trade-level feedback in under five minutes. Equity and F&O in one file.",
        images: ["/images/og-image.jpg"],
    },
};

// Plain-text mirror of app/brokers/kotak-securities/faq.tsx, used only for the
// FAQPage JSON-LD. Keep in sync with the accordion copy.
const FAQ_SCHEMA = [
    {
        q: "What can Arthveda do with my Kotak Securities trades?",
        a: "Arthveda imports your Kotak Securities trade report, groups executions into trades, calculates after-charges PnL, and gives you a dashboard, trade list, journal notes, tags, insights, and reports.",
    },
    {
        q: "Does Arthveda support F&O for Kotak Securities?",
        a: "Yes. Your Kotak Securities report carries equity, futures, and options, and Arthveda parses all three. It reads the exchange and contract on each row, so a NIFTY option or a stock future comes in as the right instrument with the right expiry and strike. The journal itself handles everything you trade, and the one stock-only surface is the screener (NSE/BSE equities).",
    },
    {
        q: "Is there a sync, or is it file upload only?",
        a: "File upload, for Kotak Securities. Download your trade report from Performance & Reports and import it into Arthveda. Kotak doesn't offer trade sync yet, so to add fresh trades later you download a new report for the recent date range and import it again.",
    },
    {
        q: "I trade through more than one broker. Will it aggregate?",
        a: "Yes. Arthveda supports Zerodha, Upstox, Groww, Angel One, FYERS, Kotak Securities, and INDmoney. Import from each and the journal aggregates across all of them so you see your real performance picture.",
    },
    {
        q: "Will my trades be public?",
        a: "No. Everything is private by default. You explicitly choose what to publish (screeners, watchlists, public-profile fields). Individual trades are never auto-published.",
    },
    {
        q: "What if I scale into a trade with multiple entries and partial exits?",
        a: "Handled natively. If you bought 100 shares of RELIANCE in three tranches and exited in two, that's one trade with five executions inside it: average cost computed, partial PnL on each exit, full PnL on close.",
    },
    {
        q: "What about charges?",
        a: "Brokerage, STT, GST, stamp duty, SEBI charges, and exchange transaction charges are computed from the standard Kotak Securities rate card. The PnL Arthveda shows you is after charges, which is the only PnL that actually matters.",
    },
    {
        q: "How often should I import?",
        a: "There is no fixed rule. A weekly or monthly export keeps your journal current. A good habit is to download your report every weekend and tag the week's trades while the reasoning is still fresh. Since Kotak has no sync, just download the new date range since your last import and upload it again.",
    },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SCHEMA.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};

// Shared prose styles for the long-form body.
const H2 =
    "font-heading text-[26px] font-medium text-text-primary sm:text-[30px]";
const P = "font-content text-[15px] leading-[1.7] text-text-muted";
const INLINE_LINK =
    "font-content text-[15px]! text-text-primary underline underline-offset-4 hover:text-text-muted";

const APP_BROKER_ACCOUNTS_URL = BROKER_ACCOUNTS_URL;

const SECTIONS = [
    { id: "what-kotak-shows", label: "What Kotak shows" },
    { id: "reports-limits", label: "What it isn't built for" },
    { id: "import-flow", label: "How to import" },
    { id: "what-to-journal", label: "What to journal" },
    { id: "more-than-journal", label: "More than a journal" },
    { id: "faq", label: "FAQ" },
];

export default function KotakSecuritiesLandingPage() {
    return (
        <main className="pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <section className="pt-12 md:pt-16 lg:pt-20">
                <div>
                    <FamilyLabel name="Brokers" Icon={Plug} />
                    <h1 className="mt-5 max-w-4xl text-balance font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.025em] text-text-primary sm:text-[52px] lg:max-w-none lg:text-[60px]">
                        Turn your Kotak Securities trade report into a trading
                        journal you can actually learn from.
                    </h1>
                    <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        Kotak Securities gives you trades. Arthveda gives you
                        insights and analytics. See how you can turn your Kotak
                        trade report, equity and F&amp;O in one file, into a
                        journal with performance analytics, insights that tell
                        you where and why you lose or make money, and a
                        trade-level feedback loop in less than five minutes.
                    </p>
                    <p className="mt-4 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        A P&amp;L statement is what your accountant needs. A
                        journal is what <em>you</em> need to get better.
                    </p>
                    <SegmentChips segments={KOTAK.segments} className="mt-6" />
                    <div className="mt-8 w-fit">
                        <GetStarted
                            label="Start your trading journal"
                            href={APP_BROKER_ACCOUNTS_URL}
                        />
                    </div>
                    <p className="mt-4 font-content text-[15px] leading-6 text-text-muted">
                        Not on Kotak Securities?{" "}
                        <Link href="/brokers" className={INLINE_LINK}>
                            See all supported brokers
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <hr className="relative left-1/2 mt-12 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-16" />

            <div
                className="mt-8 md:mt-10"
                aria-label="Arthveda trade journal preview"
            >
                <LitMedia
                    src="/images/v2/trade-view.png"
                    alt="Arthveda trade view with chart, PnL, duration, details, and journal notes"
                    priority
                    aspectClassName="aspect-[2940/1844]"
                    lightOrigin="top"
                    bottomFade
                    fullBleed={false}
                    frameClassName="relative z-10 mx-auto w-[min(1500px,calc((100svh_-_5.5rem_-_3rem)*2940/1844))] max-w-full rounded-md border-white/[0.1] shadow-[0_16px_36px_-20px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                    captionTitle="See the full trade, not just the execution."
                    captionDescription="PnL, charges, duration, chart context, executions, notes, and tags, all tied to the same Kotak Securities trade."
                />
            </div>

            <BrokerJournalShowcase brokerName="Kotak Securities" />

            <BrokerTrustStrip broker={KOTAK} />

            <div className="mx-auto mt-24 grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,768px)_220px] lg:items-start lg:justify-center">
                <div className="space-y-20">
                    <nav
                        className="rounded-lg border border-white/[0.12] bg-surface-1/35 p-4 lg:hidden"
                        aria-label="Article index"
                    >
                        <p className="font-heading text-[15px] font-medium text-text-primary">
                            Index
                        </p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {SECTIONS.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="font-content text-[15px]! leading-6 text-text-muted hover:text-text-primary"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </div>
                    </nav>

                    <section className="space-y-5">
                        <p className={P}>
                            If you trade on Kotak Securities and your history
                            lives in report exports, this guide shows how to turn
                            that file into a journal you can actually learn from.
                        </p>
                        <p className={P}>
                            You have a couple of hundred trades sitting in your
                            Kotak account. You roughly know last quarter was
                            green. You can&apos;t tell which setup delivered most
                            of that PnL, which trades you held too long, or
                            whether your &quot;high conviction&quot; trades
                            actually outperformed your gut-feel ones.
                        </p>
                        <p className={P}>
                            The problem isn&apos;t your trading. The problem is
                            that a trade report and a journal solve completely
                            different problems.
                        </p>
                    </section>

                    <section
                        id="what-kotak-shows"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            What Kotak Securities actually shows you
                        </h2>
                        <p className={P}>
                            Kotak Securities shows you your trades and PnL
                            reports, the numbers your accountant needs at tax
                            time. That is genuinely useful, but it is built for
                            filing, not for working out how you actually trade.
                        </p>
                        <p className={P}>
                            The artifact that actually moves your edge is the one
                            most Kotak users end up building themselves in Excel,
                            Google Sheets, Notion, or a custom spreadsheet.
                            Usually for two months. Usually it stops.
                        </p>
                    </section>

                    <section
                        id="reports-limits"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            What Kotak&apos;s reports are not built for
                        </h2>
                        <p className={P}>
                            Pull up your last hundred closed trades in your head
                            and try to answer these:
                        </p>
                        <ol className="list-decimal space-y-2 pl-5">
                            <BulletItem>
                                What&apos;s my win rate over the last quarter?
                            </BulletItem>
                            <BulletItem>
                                What&apos;s my average winner versus my average
                                loser, in R-multiples?
                            </BulletItem>
                            <BulletItem>
                                Are my breakout trades more profitable than my
                                mean-reversion trades, or am I just remembering
                                the dopamine ones?
                            </BulletItem>
                            <BulletItem>
                                Do trades I hold overnight outperform my intraday
                                ones after charges?
                            </BulletItem>
                            <BulletItem>
                                Which setup is dragging my overall PnL down, even
                                though it feels good when it works?
                            </BulletItem>
                        </ol>
                        <p className={P}>
                            None of these are answerable from Kotak&apos;s
                            reports without exporting your trade report, opening
                            Excel, writing formulas, and tagging every trade by
                            hand. Most traders never make it to step three.
                            Arthveda answers them in a few clicks.
                        </p>
                    </section>

                    <section
                        id="import-flow"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            How to import your Kotak Securities trades
                        </h2>
                        <div className="space-y-6">
                            <Step
                                n="1"
                                title="Download your trade report from Kotak"
                            >
                                Log in to your{" "}
                                <Link
                                    href="https://www.kotaksecurities.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={INLINE_LINK}
                                >
                                    Kotak Securities
                                </Link>{" "}
                                account, open Performance &amp; Reports, and
                                download the trade report or statement from the
                                Reports section for your date range. Equity and
                                F&amp;O come down together in the same export.
                            </Step>
                            <Step
                                n="2"
                                title="Create your Kotak Securities broker account"
                            >
                                Sign up or log in to Arthveda. Follow onboarding
                                and select Kotak Securities, or go to{" "}
                                <Link
                                    href={APP_BROKER_ACCOUNTS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={INLINE_LINK}
                                >
                                    /accounts
                                </Link>{" "}
                                and create a Kotak Securities broker account.
                            </Step>
                            <Step
                                n="3"
                                title="Click Import and upload the file"
                            >
                                Choose Import on the Kotak Securities broker
                                account, upload the report file, review the
                                parsed trades, and confirm the import. Arthveda
                                groups your executions into trades automatically:
                                one round trip becomes one trade with entry,
                                scaling, exit, holding period, and after-charges
                                PnL computed for you. Futures and options
                                contracts are read straight from the file, with
                                the right underlying, expiry, and strike.
                            </Step>
                            <Step n="4" title="Explore your journal">
                                Open Trades, Dashboard, Insights, and Reports.
                                Then pick your first ten trades, add a tag like{" "}
                                <em>breakout</em>, <em>earnings</em>, or{" "}
                                <em>support-bounce</em>, and add a one-line note
                                on what you were actually thinking when you
                                entered. That&apos;s the work. It compounds from
                                here.
                            </Step>
                        </div>
                        <p className={P}>
                            The whole flow is about five minutes the first time.
                            Kotak doesn&apos;t offer trade sync yet, so when you
                            want to add fresh trades, download a new report for
                            the date range since your last import and upload it
                            again. Same five clicks, no spreadsheet.
                        </p>
                        <div className="pt-2">
                            <GetStarted
                                label="Import my trade report"
                                href={APP_BROKER_ACCOUNTS_URL}
                                size="default"
                            />
                        </div>
                    </section>

                    <section
                        id="what-to-journal"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>What to actually journal</h2>
                        <p className={P}>
                            If you want the journal to do its job, every trade
                            needs a little human input. The number is small on
                            purpose:
                        </p>
                        <ol className="list-decimal space-y-2 pl-5">
                            <BulletItem>
                                <strong>Setup tag</strong> — what kind of trade
                                was it? Keep the set small and reusable (eight to
                                twelve tags is plenty).
                            </BulletItem>
                            <BulletItem>
                                <strong>Entry reason</strong> — one sentence on
                                the trigger.{" "}
                                <em>
                                    &quot;50 DMA reclaim with above-average
                                    volume&quot;
                                </em>{" "}
                                is good. <em>&quot;Looked strong&quot;</em> is
                                not.
                            </BulletItem>
                            <BulletItem>
                                <strong>Exit reason</strong> — stop hit? target
                                hit? time stop? fear? Be honest about the last
                                one.
                            </BulletItem>
                            <BulletItem>
                                <strong>R-multiple</strong> (optional,
                                high-value) — risked ₹2,000 and made ₹6,000 is a
                                +3R. Track it and after fifty trades you stop
                                arguing with yourself about whether you&apos;re
                                positive expectancy.
                            </BulletItem>
                        </ol>
                        <p className={P}>
                            You can also attach chart screenshots at entry and
                            exit and a note on what you&apos;d do differently.
                            After a month of consistency you&apos;ll see at least
                            one pattern you didn&apos;t know existed.
                        </p>
                    </section>

                    <section
                        id="more-than-journal"
                        className="scroll-mt-28 space-y-5 rounded-lg border border-white/[0.12] bg-surface-1/35 p-6"
                    >
                        <h2 className={H2}>Arthveda is more than a journal</h2>
                        <p className={P}>
                            Most trading journals stop after the trade. Arthveda
                            connects the workflow before and after it: discovery,
                            watchlists, symbol research, execution, journaling,
                            review, and your public trading record.
                        </p>
                        <p className={P}>
                            The same stock you discovered in a screener can later
                            appear in your watchlist, trade journal, review
                            reports, and symbol history, all connected in one
                            workflow.
                        </p>
                        <p className={P}>
                            <strong>
                                <Link
                                    href="/product/discover"
                                    className={INLINE_LINK}
                                >
                                    Screeners
                                </Link>
                            </strong>{" "}
                            — scan NSE and BSE stocks using price, volume,
                            technical, and candlestick filters. Arthveda
                            remembers the source of every idea, so if a screened
                            stock becomes a trade, you can later see which
                            screeners are actually leading to better results.
                        </p>
                        <p className={P}>
                            <strong>
                                <Link
                                    href="/product/discover"
                                    className={INLINE_LINK}
                                >
                                    Watchlists and symbol pages
                                </Link>
                            </strong>{" "}
                            — track the stocks you care about before and after
                            you trade them, so your research and journal are part
                            of the same workflow.
                        </p>
                        <p className={P}>
                            <strong>
                                <Link
                                    href="/product/social"
                                    className={INLINE_LINK}
                                >
                                    Public profile
                                </Link>
                            </strong>{" "}
                            — build a public trading identity around your
                            process, not just PnL. Publish selected screeners,
                            watchlists, notes, and trade reviews so others can
                            understand how you find ideas, track them, and learn
                            from them over time.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <KotakSecuritiesFAQ />
                    </section>
                </div>

                <aside className="sticky top-28 hidden lg:block">
                    <nav
                        className="rounded-lg border border-white/[0.12] bg-surface-1/35 p-4"
                        aria-label="Article index"
                    >
                        <p className="font-heading text-[15px] font-medium text-text-primary">
                            Index
                        </p>
                        <div className="mt-3 space-y-2">
                            {SECTIONS.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block font-content text-[15px]! leading-6 text-text-muted hover:text-text-primary"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </aside>
            </div>

            <BrokerPricingSummary />

            <div className="mx-auto mt-20 max-w-3xl rounded-lg border border-white/[0.12] bg-surface-1/35 px-6 py-10 text-center md:mt-24">
                <h2 className="mx-auto max-w-2xl text-balance font-heading text-[28px] font-medium leading-tight tracking-[-0.015em] text-text-primary sm:text-[34px]">
                    Turn your Kotak Securities trade report into a journal you
                    can actually learn from.
                </h2>
                <div className="h-6" />
                <div className="mx-auto w-fit">
                    <GetStarted
                        label="Start your trading journal"
                        href={APP_BROKER_ACCOUNTS_URL}
                    />
                </div>
            </div>
        </main>
    );
}

function BulletItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="font-content text-[15px] leading-[1.7] text-text-muted marker:text-text-muted">
            {children}
        </li>
    );
}

function Step({
    n,
    title,
    children,
}: {
    n: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-subtle font-heading text-sm text-text-primary">
                {n}
            </div>
            <div className="space-y-1">
                <p className="font-heading text-[16px] font-medium text-text-primary">
                    {title}
                </p>
                <p className="font-content text-[15px] leading-[1.7] text-text-muted">
                    {children}
                </p>
            </div>
        </div>
    );
}
