import type { Metadata } from "next";
import Link from "next/link";
import { Plug } from "lucide-react";

import { FamilyLabel } from "@/components/family_label";
import { GetStarted } from "@/components/get_started";
import LitMedia from "@/components/lit_media";
import { SegmentChips } from "@/components/segment_chips";
import { BROKERS } from "@/lib/brokers";
import { BROKER_ACCOUNTS_URL } from "@/lib/links";
import ZerodhaFAQ from "./faq";

const ZERODHA = BROKERS.find((b) => b.name === "Zerodha")!;

export const metadata: Metadata = {
    title: "Trading Journal for Zerodha Users: From Tradebook to Real Insights · Arthveda",
    description:
        "Turn your Zerodha Console Tradebook into a trading journal with performance analytics, insights, reports, tags, notes, and trade-level feedback in under five minutes.",
    alternates: { canonical: "/brokers/zerodha" },
    openGraph: {
        title: "Trading Journal for Zerodha Users: From Tradebook to Real Insights",
        description:
            "Turn your Zerodha Console Tradebook XLSX into a trading journal with performance analytics, insights, reports, tags, notes, and trade-level feedback in under five minutes.",
        url: "https://arthveda.app/brokers/zerodha",
        type: "article",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "Trading Journal for Zerodha Users · Arthveda",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Trading Journal for Zerodha Users: From Tradebook to Real Insights",
        description:
            "Turn your Zerodha Console Tradebook XLSX into a trading journal with performance analytics, insights, reports, tags, notes, and trade-level feedback in under five minutes.",
        images: ["/images/og-image.jpg"],
    },
};

// Plain-text mirror of app/brokers/zerodha/faq.tsx, used only for the FAQPage
// JSON-LD. Keep in sync with the accordion copy.
const FAQ_SCHEMA = [
    {
        q: "What can Arthveda do with my Zerodha trades?",
        a: "Arthveda imports your Zerodha Tradebook, groups executions into trades, calculates after-charges PnL, and gives you a dashboard, trade list, journal notes, tags, insights, reports, and broker sync for future trades.",
    },
    {
        q: "Does Arthveda support F&O?",
        a: "Yes. Your journal takes everything you trade: equity, crypto, and F&O across stock, index, and commodity, whether you sync it from Zerodha or log it by hand. The one stock-only surface is the screener (NSE/BSE equities).",
    },
    {
        q: "Do I have to upload a file, or can it sync?",
        a: "Both, for Zerodha. Use the Console Tradebook XLSX to import historical trades first. After that, connect your Zerodha account inside Arthveda and use Sync to pull fresh trades with one click.",
    },
    {
        q: "I trade through more than one broker. Will it aggregate?",
        a: "Yes. Arthveda supports Zerodha, Upstox, Groww, Angel One, Fyers, Kotak Securities, and INDmoney. Import from each broker account and the journal aggregates them so you can see your real performance picture.",
    },
    {
        q: "Will my trades be public?",
        a: "No. Everything is private by default. You explicitly choose what to publish, such as screeners, watchlists, and public-profile fields. Individual trades are never auto-published.",
    },
    {
        q: "What if I scale into a trade with multiple entries and partial exits?",
        a: "Handled natively. If you bought 100 shares of RELIANCE in three tranches and exited in two, Arthveda treats that as one trade with five executions inside it: average cost computed, partial PnL on each exit, full PnL on close.",
    },
    {
        q: "What about charges?",
        a: "Brokerage, STT, GST, stamp duty, SEBI charges, and exchange transaction charges are computed from the standard Zerodha rate card. The PnL Arthveda shows you is after charges, which is the only PnL that actually matters.",
    },
    {
        q: "How often should I import?",
        a: "For history, import the Current FY or Previous FY Tradebook first. After your historical data is in Arthveda, use Zerodha Sync regularly so fresh trades appear without repeating the file-upload process.",
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
    "font-content text-[15px] text-text-primary underline underline-offset-4 hover:text-text-muted";

const APP_BROKER_ACCOUNTS_URL = BROKER_ACCOUNTS_URL;

const SECTIONS = [
    { id: "what-zerodha-shows", label: "What Zerodha shows" },
    { id: "tradebook-limits", label: "What Console isn't built for" },
    { id: "import-flow", label: "How to import" },
    { id: "after-import", label: "After first import" },
    { id: "what-to-journal", label: "What to journal" },
    { id: "more-than-journal", label: "More than a journal" },
    { id: "faq", label: "FAQ" },
];

export default function ZerodhaLandingPage() {
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
                        Turn your Zerodha Tradebook into a trading journal you
                        can actually learn from.
                    </h1>
                    <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        Zerodha gives you trades. Arthveda gives you insights
                        and analytics. See how you can turn your Zerodha Console
                        Tradebook into a journal with performance analytics,
                        insights that tell you where and why you lose or make
                        money, and a trade-level feedback loop in less than five
                        minutes.
                    </p>
                    <p className="mt-4 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        A tradebook is what your accountant needs. A journal is
                        what <em>you</em> need to get better.
                    </p>
                    <SegmentChips
                        segments={ZERODHA.segments}
                        className="mt-6"
                    />
                    <div className="mt-8 w-fit">
                        <GetStarted
                            label="Start your trading journal"
                            href={APP_BROKER_ACCOUNTS_URL}
                        />
                    </div>
                    <p className="mt-4 font-content text-[15px] leading-6 text-text-muted">
                        Not on Zerodha?{" "}
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
                    captionDescription="PnL, charges, duration, chart context, executions, notes, and tags, all tied to the same Zerodha trade."
                />
            </div>

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
                                    className="font-content text-[15px] leading-6 text-text-muted hover:text-text-primary"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </div>
                    </nav>

                    <section className="space-y-5">
                        <p className={P}>
                            If you trade on Zerodha and your history lives in
                            Console exports, this guide shows how to turn that
                            file into a journal you can actually learn from.
                        </p>
                        <p className={P}>
                            You have a couple of hundred trades sitting in your
                            Zerodha account. You roughly know last quarter was
                            green. You can&apos;t tell which setup delivered
                            most of that PnL, which trades you held too long, or
                            whether your &quot;high conviction&quot; trades
                            actually outperformed your gut-feel ones.
                        </p>
                        <p className={P}>
                            The problem isn&apos;t your trading. The problem is
                            that a tradebook and a journal solve completely
                            different problems.
                        </p>
                    </section>

                    <section
                        id="what-zerodha-shows"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>What Zerodha actually shows you</h2>
                        <p className={P}>
                            <Link
                                href="https://console.zerodha.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={INLINE_LINK}
                            >
                                Console
                            </Link>{" "}
                            is Zerodha&apos;s reports portal, and it&apos;s
                            solid for what it covers:
                        </p>
                        <ul className="space-y-2 pl-5">
                            <BulletItem>
                                <strong>Tradebook</strong> — your executed
                                trades history
                            </BulletItem>
                            <BulletItem>
                                <strong>Tax PnL</strong> — realized PnL by
                                financial year, sorted for ITR filing
                            </BulletItem>
                            <BulletItem>
                                <strong>Holdings statement</strong> — current
                                portfolio with average cost
                            </BulletItem>
                            <BulletItem>
                                <strong>Funds</strong> — cash, margin, and
                                ledger balances
                            </BulletItem>
                        </ul>
                        <p className={P}>
                            Useful, but notice the shape. Console is optimised
                            for the report your accountant needs, because
                            that&apos;s what most retail traders explicitly ask
                            for. The other artifact, the one that actually moves
                            your edge, is the one most Zerodha users end up
                            building themselves in Excel, Google Sheets, Notion,
                            or a custom spreadsheet. Usually for two months.
                            Usually it stops.
                        </p>
                    </section>

                    <section
                        id="tradebook-limits"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            What Zerodha Console is not built for
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
                                Do trades I hold overnight outperform my
                                intraday ones after charges?
                            </BulletItem>
                            <BulletItem>
                                Which setup is dragging my overall PnL down,
                                even though it feels good when it works?
                            </BulletItem>
                        </ol>
                        <p className={P}>
                            None of these are answerable from Console without
                            exporting the tradebook, opening Excel, writing
                            formulas, and tagging every trade by hand. Most
                            traders never make it to step three. Arthveda
                            answers them in a few clicks.
                        </p>
                    </section>

                    <section
                        id="import-flow"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            How to import your Zerodha trades
                        </h2>
                        <div className="space-y-6">
                            <Step
                                n="1"
                                title="Export your tradebook from Zerodha"
                            >
                                Log in at{" "}
                                <Link
                                    href="https://console.zerodha.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={INLINE_LINK}
                                >
                                    console.zerodha.com
                                </Link>
                                , open Reports then Tradebook, select Current FY
                                or Previous FY, click Submit, and download the
                                XLSX.
                            </Step>
                            <Step
                                n="2"
                                title="Create your Zerodha broker account"
                            >
                                Sign up or log in to Arthveda. Follow onboarding
                                and select Zerodha, or go to{" "}
                                <Link
                                    href={APP_BROKER_ACCOUNTS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={INLINE_LINK}
                                >
                                    /accounts
                                </Link>{" "}
                                and create a Zerodha broker account.
                            </Step>
                            <Step
                                n="3"
                                title="Click Import and upload the file"
                            >
                                Choose Import on the Zerodha broker account,
                                upload the Tradebook XLSX, review the parsed
                                trades, and confirm the import. Arthveda groups
                                your executions into trades automatically: one
                                round trip becomes one trade with entry,
                                scaling, exit, holding period, and after-charges
                                PnL computed for you.
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
                            Once your historical data is imported, use Zerodha
                            Sync for the future: log in through your Zerodha
                            account when Arthveda asks, then one click pulls
                            fresh trades into the same journal.
                        </p>
                        <div className="pt-2">
                            <GetStarted
                                label="Import my Tradebook"
                                href={APP_BROKER_ACCOUNTS_URL}
                                size="default"
                            />
                        </div>
                    </section>

                    <section
                        id="after-import"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            What you see after your first import
                        </h2>
                        <p className={P}>
                            Once your Zerodha trades are in, Arthveda becomes
                            the operating system around your trading history.
                        </p>
                        <ul className="space-y-2 pl-5">
                            <BulletItem>
                                <strong>
                                    <Link
                                        href="/product/journal#dashboard"
                                        className={INLINE_LINK}
                                    >
                                        Dashboard
                                    </Link>
                                </strong>{" "}
                                — know if you are actually improving. Track net
                                PnL, gross PnL, charges, win rate, average
                                win/loss, expectancy, profit factor, streaks,
                                and cumulative performance over time.
                            </BulletItem>
                            <BulletItem>
                                <strong>
                                    <Link
                                        href="/product/journal#trades"
                                        className={INLINE_LINK}
                                    >
                                        Trades
                                    </Link>
                                </strong>{" "}
                                — see your complete trading history in one
                                place. Arthveda preserves every trade
                                separately, then lets you search, filter, sort,
                                and inspect detailed breakdowns, so nothing gets
                                merged away, lost, or overlooked.
                            </BulletItem>
                            <BulletItem>
                                <strong>
                                    <Link
                                        href="/product/journal#insights"
                                        className={INLINE_LINK}
                                    >
                                        Insights
                                    </Link>
                                </strong>{" "}
                                — see what is actually hurting your trading.
                                Understand the patterns behind your wins,
                                losses, timing, behaviour, setups, mistakes, and
                                outcomes.
                            </BulletItem>
                            <BulletItem>
                                <strong>
                                    <Link
                                        href="/product/journal#reports"
                                        className={INLINE_LINK}
                                    >
                                        Reports
                                    </Link>
                                </strong>{" "}
                                — find what is consistently working. Break
                                performance down by symbols, instruments,
                                timeframes, tags, and trading patterns, with
                                after-charges PnL and R-factor included.
                            </BulletItem>
                            <BulletItem>
                                <strong>
                                    <Link
                                        href="/product/journal#tagging"
                                        className={INLINE_LINK}
                                    >
                                        Tagging
                                    </Link>
                                </strong>{" "}
                                — spot patterns you would otherwise miss. Tag
                                trades by setup, mistake, market condition,
                                emotion, behaviour, or any trading lens you want
                                to measure.
                            </BulletItem>
                            <BulletItem>
                                <strong>
                                    <Link
                                        href="/product/journal#notebook"
                                        className={INLINE_LINK}
                                    >
                                        Journal notes
                                    </Link>
                                </strong>{" "}
                                — understand the why behind every trade. Attach
                                notes and chart screenshots directly to the
                                actual trade, so your thinking stays connected
                                to the outcome.
                            </BulletItem>
                        </ul>
                        <p className={P}>
                            You do not set any of this up manually. Arthveda
                            computes it from the trades it builds out of your
                            Tradebook the moment you upload it.
                        </p>
                        <p className={P}>
                            For example, you may discover that your breakout
                            trades have a +2.8R expectancy while reversal trades
                            are net negative after charges. That is the kind of
                            feedback a raw Tradebook will never volunteer.
                        </p>
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
                                was it? Keep the set small and reusable (eight
                                to twelve tags is plenty).
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
                            After a month of consistency you&apos;ll see at
                            least one pattern you didn&apos;t know existed.
                        </p>
                    </section>

                    <section
                        id="more-than-journal"
                        className="scroll-mt-28 space-y-5 rounded-lg border border-white/[0.12] bg-surface-1/35 p-6"
                    >
                        <h2 className={H2}>Arthveda is more than a journal</h2>
                        <p className={P}>
                            Most trading journals stop after the trade. Arthveda
                            connects the workflow before and after it:
                            discovery, watchlists, symbol research, execution,
                            journaling, review, and your public trading record.
                        </p>
                        <p className={P}>
                            The same stock you discovered in a screener can
                            later appear in your watchlist, trade journal,
                            review reports, and symbol history, all connected in
                            one workflow.
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
                            you trade them, so your research and journal are
                            part of the same workflow.
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
                        <ZerodhaFAQ />
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
                                    className="block font-content text-[15px] leading-6 text-text-muted hover:text-text-primary"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </aside>
            </div>

            <div className="mx-auto mt-20 max-w-3xl rounded-lg border border-white/[0.12] bg-surface-1/35 px-6 py-10 text-center md:mt-24">
                <h2 className="mx-auto max-w-2xl text-balance font-heading text-[28px] font-medium leading-tight tracking-[-0.015em] text-text-primary sm:text-[34px]">
                    Turn your Zerodha Tradebook into a journal you can actually
                    learn from.
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
