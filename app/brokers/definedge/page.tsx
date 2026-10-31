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
import DefinedgeFAQ from "./faq";

const DEFINEDGE = BROKERS.find((b) => b.name === "Definedge")!;

export const metadata: Metadata = {
    title: "Trading Journal for Definedge Users: Sync Your Trades into Real Insights · Arthveda",
    description:
        "Connect your Definedge account and sync your equity, F&O, and MCX trades into a journal with performance analytics, insights, reports, tags, and notes. No file uploads.",
    alternates: { canonical: "/brokers/definedge" },
    openGraph: {
        title: "Trading Journal for Definedge Users: Sync Your Trades into Real Insights",
        description:
            "Connect your Definedge account and sync your equity, F&O, and MCX trades into a journal with performance analytics, insights, reports, tags, and notes. No file uploads.",
        url: "https://arthveda.app/brokers/definedge",
        type: "article",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "Trading Journal for Definedge Users · Arthveda",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Trading Journal for Definedge Users: Sync Your Trades into Real Insights",
        description:
            "Connect your Definedge account and sync your equity, F&O, and MCX trades into a journal with performance analytics, insights, reports, tags, and notes. No file uploads.",
        images: ["/images/og-image.jpg"],
    },
};

// Plain-text mirror of app/brokers/definedge/faq.tsx, used only for the FAQPage
// JSON-LD. Keep in sync with the accordion copy.
const FAQ_SCHEMA = [
    {
        q: "What can Arthveda do with my Definedge trades?",
        a: "Arthveda connects to your Definedge account with your own API keys, pulls your trades, groups executions into trades, calculates after-charges PnL, and gives you a dashboard, trade list, journal notes, tags, insights, and reports.",
    },
    {
        q: "Is it a file upload or a sync?",
        a: "Sync. Connect your account once with the API Token and API Secret from Definedge MyAccount, login with an OTP each trading day, and a single click pulls today's trades into Arthveda. Definedge's API only returns the current day's trade book, so trades from before you connected can be logged by hand. File import isn't available: Definedge's Trade Register export is a daily P&L summary, not a per-trade tradebook.",
    },
    {
        q: "Do I have to share my Definedge password?",
        a: "No. Arthveda never sees your password. You paste the API Token and API Secret from MyAccount, Arthveda stores the secret encrypted, and each day's session starts with an OTP from Definedge or the External TOTP from your authenticator app. Disconnect removes the saved keys whenever you want.",
    },
    {
        q: "Does Arthveda support F&O for Definedge?",
        a: "Yes. NSE and BSE equity, F&O on NFO and BFO, and MCX commodity futures and options all come in through the Definedge sync, with each contract resolved to the right underlying, expiry, and strike. The journal itself handles everything you trade, and the one stock-only surface is the screener (NSE, BSE and US stocks).",
    },
    {
        q: "I trade through more than one broker. Will it aggregate?",
        a: "Yes. Arthveda supports Zerodha, Upstox, Groww, Angel One, FYERS, Kotak Securities, INDmoney, Dhan, and Definedge. Import from each and the journal aggregates across all of them so you see your real performance picture.",
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
        a: "Brokerage, STT, GST, stamp duty, SEBI charges, and exchange transaction charges are computed from the standard Definedge rate card: free delivery, and at most ₹18 per executed order on intraday, futures, and options. The PnL Arthveda shows you is after charges, which is the only PnL that actually matters.",
    },
    {
        q: "How often should I sync?",
        a: "Every trading day. Definedge's API only returns today's trades, so make Sync part of your post-market routine: login with the OTP, click Sync, and tag the day's trades while the reasoning is still fresh.",
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
    { id: "what-definedge-shows", label: "What Definedge shows" },
    { id: "reports-limits", label: "What it isn't built for" },
    { id: "sync-flow", label: "How the sync works" },
    { id: "what-to-journal", label: "What to journal" },
    { id: "more-than-journal", label: "More than a journal" },
    { id: "faq", label: "FAQ" },
];

export default function DefinedgeLandingPage() {
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
                        Sync your Definedge trades into a trading journal you can
                        actually learn from.
                    </h1>
                    <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        Definedge gives you trades. Arthveda gives you insights and
                        analytics. Connect your account once with your API keys,
                        and every trading day a single click pulls your equity,
                        F&amp;O, and MCX trades into a journal with performance
                        analytics, insights that tell you where and why you lose
                        or make money, and a trade-level feedback loop. No file
                        to export, no monthly download ritual.
                    </p>
                    <p className="mt-4 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        A P&amp;L statement is what your accountant needs. A
                        journal is what <em>you</em> need to get better.
                    </p>
                    <SegmentChips segments={DEFINEDGE.segments} className="mt-6" />
                    <div className="mt-8 w-fit">
                        <GetStarted
                            noCardNote
                            label="Start your trading journal"
                            href={APP_BROKER_ACCOUNTS_URL}
                        />
                    </div>
                    <p className="mt-4 font-content text-[15px] leading-6 text-text-muted">
                        Not on Definedge?{" "}
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
                    captionDescription="PnL, charges, duration, chart context, executions, notes, and tags, all tied to the same Definedge trade."
                />
            </div>

            <BrokerJournalShowcase brokerName="Definedge" actionNoun="sync" />

            <BrokerTrustStrip broker={DEFINEDGE} />

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
                            If you trade on Definedge, this guide shows how
                            Arthveda turns your daily trade book into a journal
                            you can actually learn from, no exports required.
                        </p>
                        <p className={P}>
                            You have a couple of hundred trades sitting in your
                            Definedge account. You roughly know last quarter was green.
                            You can&apos;t tell which setup delivered most of that
                            PnL, which trades you held too long, or whether your
                            &quot;high conviction&quot; trades actually
                            outperformed your gut-feel ones.
                        </p>
                        <p className={P}>
                            The problem isn&apos;t your trading. The problem is
                            that a tradebook and a journal solve completely
                            different problems.
                        </p>
                    </section>

                    <section
                        id="what-definedge-shows"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>What Definedge actually shows you</h2>
                        <p className={P}>
                            Definedge gives you serious tools for the analysis
                            before and during a trade. After it, you get the
                            day&apos;s trade book and a Trade Register that sums
                            up PnL per date and contract, the numbers your
                            accountant needs at tax time. That is genuinely
                            useful, but it is built for filing, not for working
                            out how you actually trade.
                        </p>
                        <p className={P}>
                            The artifact that actually moves your edge is the one
                            most Definedge users end up building themselves in Excel,
                            Google Sheets, Notion, or a custom spreadsheet.
                            Usually for two months. Usually it stops.
                        </p>
                    </section>

                    <section
                        id="reports-limits"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            What Definedge&apos;s reports are not built for
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
                            None of these are answerable from Definedge&apos;s reports
                            without exporting your data, opening Excel, writing
                            formulas, and tagging every trade by hand. Most
                            traders never make it to step three. Arthveda answers
                            them in a few clicks.
                        </p>
                    </section>

                    <section
                        id="sync-flow"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>How the Definedge sync works</h2>
                        <div className="space-y-6">
                            <Step
                                n="1"
                                title="Copy your API keys from Definedge"
                            >
                                Log in to Definedge MyAccount, open Account,
                                then API Config, and copy your API Token and API
                                Secret.
                            </Step>
                            <Step
                                n="2"
                                title="Create your Definedge broker account"
                            >
                                Sign up or log in to Arthveda. Follow onboarding
                                and select Definedge, or go to{" "}
                                <Link
                                    href={APP_BROKER_ACCOUNTS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={INLINE_LINK}
                                >
                                    /accounts
                                </Link>{" "}
                                and create a Definedge broker account. Click
                                Connect and paste the API Token and API Secret.
                            </Step>
                            <Step n="3" title="Login with an OTP">
                                Definedge sends a one-time code to start
                                today&apos;s session. If you turned on External
                                TOTP in MyAccount, the code from your
                                authenticator app works too. Brokers end every
                                session overnight, so this is a quick daily
                                step.
                            </Step>
                            <Step n="4" title="Click Sync">
                                Hit Sync and Arthveda pulls today&apos;s trades
                                through the same import pipeline as every other
                                broker. It groups your executions into trades
                                automatically: one round trip becomes one trade
                                with entry, scaling, exit, holding period, and
                                after-charges PnL computed for you. Futures and
                                options, MCX included, come in as the right
                                instrument with the right expiry and strike.
                            </Step>
                            <Step n="5" title="Explore your journal">
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
                            Definedge&apos;s API only returns the current
                            day&apos;s trades, so make Sync part of your
                            post-market routine. No spreadsheets, no monthly
                            export ritual: login, click Sync, and the day is in
                            your journal.
                        </p>
                        <div className="pt-2">
                            <GetStarted
                                noCardNote
                                label="Start your trading journal"
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
                        <DefinedgeFAQ />
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
                    Sync your Definedge trades into a journal you can actually learn
                    from.
                </h2>
                <div className="h-6" />
                <div className="mx-auto w-fit">
                    <GetStarted
                        noCardNote
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
