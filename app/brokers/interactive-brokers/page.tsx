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
import InteractiveBrokersFAQ from "./faq";

const IBKR = BROKERS.find((b) => b.name === "Interactive Brokers")!;

const TITLE =
    "Trading Journal for Interactive Brokers: From Executions to Real Insights";
const DESCRIPTION =
    "Turn your Interactive Brokers trades into a trading journal with performance analytics, insights, reports, tags, notes, and trade-level feedback. US stocks and ETFs, IBKR's own commissions, synced with no daily login.";

export const metadata: Metadata = {
    title: `${TITLE} · Arthveda`,
    description: DESCRIPTION,
    alternates: { canonical: "/brokers/interactive-brokers" },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://arthveda.app/brokers/interactive-brokers",
        type: "article",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "Trading Journal for Interactive Brokers · Arthveda",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/images/og-image.jpg"],
    },
};

// Plain-text mirror of app/brokers/interactive-brokers/faq.tsx, used only for
// the FAQPage JSON-LD. Keep in sync with the accordion copy.
const FAQ_SCHEMA = [
    {
        q: "What can Arthveda do with my Interactive Brokers trades?",
        a: "Arthveda reads your Interactive Brokers Flex Query, groups executions into trades, uses the commissions and fees IBKR reports to give you after-charges PnL, and gives you a dashboard, trade list, journal notes, tags, insights, and reports.",
    },
    {
        q: "Which instruments are supported?",
        a: "US stocks and ETFs: the S&P 500, Nasdaq-100 and Dow 30 constituents plus the major ETFs. Options, futures, forex, stocks on other exchanges, and tickers outside that list are listed by name as skipped in the import summary, so nothing goes missing silently. If you need one of them, tell me and I'll prioritise it.",
    },
    {
        q: "What is a Flex Query, and how do I make one?",
        a: "A Flex Query is a report you define once in IBKR Client Portal, under Performance & Reports, Flex Queries. Create an Activity Flex Query with the Trades section at Executions level and XML format. Run it to download a file for Import, or use its Query ID with a Flex Web Service token for Sync.",
    },
    {
        q: "Is there a sync, or is it file upload only?",
        a: "Both. Turn on the Flex Web Service in Client Portal, generate a token, and paste it into Arthveda with your Query ID. Your first sync pulls the last 365 days, and each later sync picks up where the last one left off. There is no daily login: the token works until the expiry you picked, up to a year.",
    },
    {
        q: "How are charges calculated?",
        a: "They aren't estimated. Interactive Brokers reports the commission, exchange, regulatory and clearing fees on every execution, and Arthveda uses exactly those, so your net PnL matches your statement.",
    },
    {
        q: "My trades are in dollars and I live in India. How does that work?",
        a: "Each trade keeps its dollar PnL, and your dashboard converts it into your home currency at the USD/INR rate of the day the trade closed. If Interactive Brokers is your first broker in Arthveda, your home currency is set to dollars; once you add rupee trades too, you pick which one your totals are in.",
    },
    {
        q: "I trade through more than one broker. Will it aggregate?",
        a: "Yes. Arthveda supports Zerodha, Upstox, Groww, Angel One, FYERS, Kotak Securities, INDmoney, Dhan, Definedge, and Interactive Brokers. Import from each and the journal aggregates across all of them so you see your real performance picture.",
    },
    {
        q: "Will my trades be public?",
        a: "No. Everything is private by default. You explicitly choose what to publish (screeners, watchlists, public-profile fields). Individual trades are never auto-published.",
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
    { id: "what-ibkr-shows", label: "What IBKR shows" },
    { id: "reports-limits", label: "What it isn't built for" },
    { id: "import-flow", label: "How to import" },
    { id: "sync", label: "Sync with no daily login" },
    { id: "what-to-journal", label: "What to journal" },
    { id: "more-than-journal", label: "More than a journal" },
    { id: "faq", label: "FAQ" },
];

export default function InteractiveBrokersLandingPage() {
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
                        Turn your Interactive Brokers trades into a journal you
                        can actually learn from.
                    </h1>
                    <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        Interactive Brokers gives you executions. Arthveda gives
                        you insights and analytics. Import your trades or Sync
                        them straight from IBKR, and your US stock and ETF trades
                        become a journal with performance analytics, insights
                        that tell you where and why you lose or make money, and
                        a trade-level feedback loop, with the exact commissions
                        IBKR charged.
                    </p>
                    <p className="mt-4 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                        An activity statement is what your accountant needs. A
                        journal is what <em>you</em> need to get better.
                    </p>
                    <SegmentChips segments={IBKR.segments} className="mt-6" />
                    <div className="mt-8 w-fit">
                        <GetStarted
                            noCardNote
                            label="Start your trading journal"
                            href={APP_BROKER_ACCOUNTS_URL}
                        />
                    </div>
                    <p className="mt-4 font-content text-[15px] leading-6 text-text-muted">
                        Not on Interactive Brokers?{" "}
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
                    captionDescription="PnL, commissions, duration, chart context, executions, notes, and tags, all tied to the same trade."
                />
            </div>

            <BrokerJournalShowcase brokerName="Interactive Brokers" />

            <BrokerTrustStrip broker={IBKR} />

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
                            If you trade US stocks on Interactive Brokers, this
                            guide shows how to turn your IBKR history into a
                            journal you can actually learn from.
                        </p>
                        <p className={P}>
                            You have a few hundred executions sitting in your
                            IBKR account. You roughly know last quarter was
                            green. You can&apos;t tell which setup delivered
                            most of that PnL, which trades you held too long, or
                            whether your &quot;high conviction&quot; trades
                            actually outperformed your gut-feel ones.
                        </p>
                        <p className={P}>
                            The problem isn&apos;t your trading. The problem is
                            that an activity statement and a journal solve
                            completely different problems.
                        </p>
                    </section>

                    <section
                        id="what-ibkr-shows"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            What Interactive Brokers actually shows you
                        </h2>
                        <p className={P}>
                            IBKR&apos;s statements and PortfolioAnalyst are
                            thorough about your account: positions, cash,
                            realized PnL, tax lots. That is genuinely useful,
                            but it is built around the account, not around the
                            decisions you made trade by trade.
                        </p>
                        <p className={P}>
                            The artifact that actually moves your edge is the
                            one most traders end up building themselves in
                            Excel, Google Sheets, or Notion. Usually for two
                            months. Usually it stops.
                        </p>
                    </section>

                    <section
                        id="reports-limits"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            What IBKR&apos;s reports are not built for
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
                                Do my day trades beat my swing trades after
                                commissions?
                            </BulletItem>
                            <BulletItem>
                                Which setup is dragging my overall PnL down, even
                                though it feels good when it works?
                            </BulletItem>
                        </ol>
                        <p className={P}>
                            None of these are answerable from a statement
                            without exporting it, opening Excel, writing
                            formulas, and tagging every trade by hand. Arthveda
                            answers them in a few clicks.
                        </p>
                    </section>

                    <section
                        id="import-flow"
                        className="scroll-mt-28 space-y-5"
                    >
                        <h2 className={H2}>
                            How to import your Interactive Brokers trades
                        </h2>
                        <div className="space-y-6">
                            <Step n="1" title="Create a Flex Query in IBKR">
                                Log in to{" "}
                                <Link
                                    href="https://www.interactivebrokers.com/portal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={INLINE_LINK}
                                >
                                    Client Portal
                                </Link>
                                , open Performance &amp; Reports, then Flex
                                Queries, and create an Activity Flex Query.
                                Add the Trades section at Executions level with
                                all fields, and pick XML as the format (CSV
                                works too). You only do this once.
                            </Step>
                            <Step n="2" title="Run it and download the file">
                                Run the query for the period you want, up to
                                365 days at a time, and download the result.
                                For a longer history, run it once per year.
                            </Step>
                            <Step
                                n="3"
                                title="Create your Interactive Brokers account in Arthveda"
                            >
                                Sign up or log in to Arthveda, then go to{" "}
                                <Link
                                    href={APP_BROKER_ACCOUNTS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={INLINE_LINK}
                                >
                                    /accounts
                                </Link>{" "}
                                and create an Interactive Brokers broker
                                account.
                            </Step>
                            <Step n="4" title="Click Import and upload the file">
                                Review the parsed trades and confirm. Arthveda
                                groups your executions into trades
                                automatically, with IBKR&apos;s own commissions
                                on every one. Anything it doesn&apos;t import
                                yet, like options or forex conversions, is
                                listed by name so you know exactly what was left
                                out.
                            </Step>
                        </div>
                        <div className="pt-2">
                            <GetStarted
                                noCardNote
                                label="Import my trades"
                                href={APP_BROKER_ACCOUNTS_URL}
                                size="default"
                            />
                        </div>
                    </section>

                    <section id="sync" className="scroll-mt-28 space-y-5">
                        <h2 className={H2}>Sync with no daily login</h2>
                        <p className={P}>
                            Once your history is in, let Sync keep it current.
                            In Client Portal, turn on the Flex Web Service and
                            generate a token, then paste it into Arthveda with
                            your Query ID. One click pulls your new trades, and
                            each sync picks up where the last one left off.
                        </p>
                        <p className={P}>
                            There is no daily login. The token works until the
                            expiry you chose, up to a year. It can only read
                            reports: it can&apos;t move money or place orders.
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
                                <strong>Setup tag:</strong> what kind of trade
                                was it? Keep the set small and reusable (eight
                                to twelve tags is plenty).
                            </BulletItem>
                            <BulletItem>
                                <strong>Entry reason:</strong> one sentence on
                                the trigger.{" "}
                                <em>
                                    &quot;Reclaimed the 50-day with
                                    above-average volume&quot;
                                </em>{" "}
                                is good. <em>&quot;Looked strong&quot;</em> is
                                not.
                            </BulletItem>
                            <BulletItem>
                                <strong>Exit reason:</strong> stop hit? target
                                hit? time stop? fear? Be honest about the last
                                one.
                            </BulletItem>
                            <BulletItem>
                                <strong>R-multiple</strong> (optional,
                                high-value): risked $200 and made $600 is a +3R.
                                Track it and after fifty trades you stop arguing
                                with yourself about whether you&apos;re positive
                                expectancy.
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
                            <strong>
                                <Link
                                    href="/product/discover"
                                    className={INLINE_LINK}
                                >
                                    Screeners
                                </Link>
                            </strong>
                            : scan the S&amp;P 500, Nasdaq-100 and Dow stocks
                            plus the major ETFs using price, volume, technical,
                            and candlestick filters. If a screened stock becomes
                            a trade, you can later see which screeners are
                            actually leading to better results.
                        </p>
                        <p className={P}>
                            <strong>
                                <Link
                                    href="/product/discover"
                                    className={INLINE_LINK}
                                >
                                    Watchlists and symbol pages
                                </Link>
                            </strong>
                            : track the stocks you care about before and after
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
                            </strong>
                            : build a public trading identity around your
                            process, not just PnL. Publish selected screeners,
                            watchlists, notes, and trade reviews.
                        </p>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <InteractiveBrokersFAQ />
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
                    Turn your Interactive Brokers trades into a journal you can
                    actually learn from.
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
