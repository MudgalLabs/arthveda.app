import { GetStarted } from "@/components/get_started";
import {
    AI_SETUP_URL,
    BROKER_ACCOUNTS_URL,
    DASHBOARD_URL,
    MARKET_MONITOR_URL,
    PROFILE_URL,
    SCREENER_URL,
    SYMBOLS_URL,
} from "@/lib/links";
import { H2, P, SignOff, Since, Strong, UL } from "@/content/updates/prose";

// Backfilled 2026 posts (lib/updates_history.ts), up to the first post
// written live. Same rule as history_2025.tsx: the main text is the feature as
// it shipped on its date, later changes go in <Since>.

export function OpenSourceAgain() {
    return (
        <>
            <P>
                Around the middle of December 2025 I made Arthveda closed source. I had been reading a lot of advice on
                how to make a product profitable, and closing the code was part of it.
            </P>
            <P>
                It took me about 45 days to see that it wasn&apos;t who I am. I started Arthveda to be free and open, so
                that any trader could use it. On 29 January 2026 the code went public again.
            </P>
            <SignOff />
        </>
    );
}

export function IndmoneyImport() {
    return (
        <>
            <P>
                INDmoney joined the list of brokers you can import from. Download your tradebook from INDmoney, upload
                it, and your trades come in grouped into positions with charges worked out.
            </P>
            <P>
                The same week, the trade table started showing how long each trade was held, and prices and quantities
                gained up to four decimal places.
            </P>
            <Since>INDmoney got live sync in October 2026.</Since>
        </>
    );
}

export function MultiCurrency() {
    return (
        <>
            <P>
                Not every trade is in rupees. You can now set a <Strong>home currency</Strong> in Settings and log each
                trade in the currency it was actually traded in.
            </P>
            <P>
                Arthveda converts every trade to your home currency, so your dashboard, calendar and trade list add up
                to one number you can trust, instead of rupees and dollars summed together.
            </P>
        </>
    );
}

export function Reports() {
    return (
        <>
            <P>Analytics by tag showed which setups pay. Reports widens that to every angle a trader asks about.</P>
            <UL>
                <li>
                    <Strong>Time:</Strong> your P&amp;L by day of the week, by hour of the day, and by how long you
                    held.
                </li>
                <li>
                    <Strong>Symbols:</Strong> which stocks you actually make money on, and which ones you keep going
                    back to for losses.
                </li>
                <li>
                    <Strong>Instruments:</Strong> cash, futures and options side by side.
                </li>
                <li>
                    <Strong>Tags:</Strong> the tag analytics you already had, now part of Reports.
                </li>
            </UL>
            <P>
                Alongside it the dashboard became modular, the trade list got its own summary stats, and you could
                export your trades.
            </P>
            <Since>Reports gained charts on 19 August 2026.</Since>
            <div className="mt-12">
                <GetStarted label="Open your journal" href={DASHBOARD_URL} />
            </div>
        </>
    );
}

export function LightTheme() {
    return (
        <>
            <P>Arthveda was dark only, until a trader asked for a light mode.</P>
            <P>
                So now there is one. Choose <Strong>Light</Strong>, <Strong>Dark</Strong> or <Strong>System</Strong>,
                and Arthveda follows. Broker logos even switch to the right version for each theme.
            </P>
        </>
    );
}

export function Insights() {
    return (
        <>
            <P>
                Charts and stats tell you what happened. <Strong>Insights</Strong> tells you what it means, in plain
                sentences, each with the money behind it.
            </P>
            <UL>
                <li>
                    <Strong>Time of day:</Strong> the hours where you make money and the ones where you give it back.
                </li>
                <li>
                    <Strong>Holding period:</Strong> whether you do better on quick trades or longer holds.
                </li>
                <li>
                    <Strong>Psychology:</Strong> patterns in your behaviour that show up in your P&amp;L.
                </li>
            </UL>
            <Since>
                Since then Insights has grown to six sections: Timing, Behaviour (including tilt and the trade after a
                loss), Risk, Setups &amp; Mistakes, Exit quality and Costs.
            </Since>
            <div className="mt-12">
                <GetStarted label="Open your journal" href={DASHBOARD_URL} />
            </div>
        </>
    );
}

export function ClosedSource() {
    return (
        <>
            <P>
                On 22 May 2026, days before v2, I removed the open-source license and made Arthveda closed source.
                Unlike the last time, this one is final.
            </P>
            <SignOff />
        </>
    );
}

export function TraderProfiles() {
    return (
        <>
            <P>
                <Strong>Arthveda Social</Strong> starts with a public profile for every trader, at its own address:
                arthveda.app/traders/your-handle.
            </P>
            <UL>
                <li>
                    <Strong>Who you are:</Strong> avatar, banner, bio, links, and chips for your trading style and the
                    instruments you trade.
                </li>
                <li>
                    <Strong>Your work:</Strong> the screeners and watchlists you publish, and a heatmap of your
                    activity, like a contribution graph for trading.
                </li>
                <li>
                    <Strong>Your showcase:</Strong> pick what visitors see first.
                </li>
            </UL>
            <P>
                No feed, no leaderboard and no public P&amp;L. A profile is for showing how you trade, not for showing
                off.
            </P>
            <div className="mt-12">
                <GetStarted label="Build your profile" href={PROFILE_URL} />
            </div>
        </>
    );
}

export function Discover() {
    return (
        <>
            <P>
                Version 2 is the biggest change Arthveda has had. A journal looks back at trades you already made.
                Arthveda now covers what comes before them too: finding a stock, watching it, and remembering everything
                you did with it. That is the Trading OS.
            </P>

            <H2>Screeners</H2>
            <P>
                Build a screener from filters, or start from one of the screeners published by Arthveda. Run it,
                bookmark other traders&apos; screeners, copy one to make it yours, and publish your own.{" "}
                <Strong>Progressive scan</Strong> shows the stocks that turn up across several screeners at once.
            </P>

            <H2>Watchlists</H2>
            <P>
                Add stocks straight from a screener. The chart marks the day each one was added, so you can see how it
                has done since. Share a watchlist with a link, or publish it.
            </P>

            <H2>Symbol pages and your Journey</H2>
            <P>
                Press <Strong>Cmd K</Strong> anywhere to jump to any stock. Its page has the chart and your{" "}
                <Strong>Journey</Strong> with it: when it entered a watchlist, when you traded it, all marked on the
                chart.
            </P>
            <div className="mt-12 flex flex-wrap gap-3">
                <GetStarted label="Open the screener" href={SCREENER_URL} />
            </div>
            <Since>The Market Monitor joined Discover on 12 July 2026.</Since>
        </>
    );
}

export function DashboardViews() {
    return (
        <>
            <P>Every trader looks at their numbers differently. Your dashboard now bends to that.</P>
            <UL>
                <li>
                    <Strong>Pick your widgets</Strong> and lay them out: drag, resize, remove.
                </li>
                <li>
                    <Strong>Set filters</Strong> for the whole dashboard, like one broker account, only options, or one
                    setup tag, and per-widget settings where they make sense.
                </li>
                <li>
                    <Strong>Save it as a View.</Strong> Your own <Strong>My View</Strong> is where you start, and Pro
                    lets you keep more: one for intraday, one for swing, one for a single account.
                </li>
            </UL>
            <div className="mt-12">
                <GetStarted label="Open your dashboard" href={DASHBOARD_URL} />
            </div>
        </>
    );
}

export function TradeSharing() {
    return (
        <>
            <P>
                A good trade, or an instructive bad one, is worth showing to someone. Now you can, without a screenshot.
            </P>
            <UL>
                <li>
                    <Strong>Share</Strong> gives you a private, read-only link: the chart, your executions, your notes
                    and tags, laid out for reading. It previews nicely in WhatsApp, X and Discord.
                </li>
                <li>
                    <Strong>Publish</Strong> also lists the trade on your public profile, where you can pin it to your
                    showcase.
                </li>
                <li>
                    <Strong>P&amp;L is hidden by default.</Strong> Turn it on per trade if you want people to see the
                    numbers.
                </li>
            </UL>
            <P>Sharing is free on every plan.</P>
        </>
    );
}

export function Commodities() {
    return (
        <>
            <P>
                Arthveda now speaks MCX. Commodity futures and options trades get the right charges, link to their
                commodity like an index option links to its index, and have daily price history going back years for
                charts.
            </P>
            <P>
                The same release fixed charges for ETFs and the exchange rate used for equity trades in another
                currency.
            </P>
        </>
    );
}

export function Help() {
    return (
        <>
            <P>
                Got a question, found a bug, want a feature? Click <Strong>Help</Strong> in the sidebar and write to me
                right there, without leaving Arthveda or opening your email. Replies come back to the same place.
            </P>

            <H2>Built on Grahak</H2>
            <P>
                The Help widget is{" "}
                <a href="https://grahak.dev" target="_blank" rel="noopener">
                    Grahak
                </a>
                , a customer conversation tool I built at Mudgal Labs. Customers report bugs, ask questions and request
                features from inside a product, and the team answers from one inbox, with the context of what the
                customer was doing. It even wears Arthveda&apos;s theme.
            </P>
        </>
    );
}

export function MarketMonitor() {
    return (
        <>
            <P>
                Before you look at one stock, look at the whole market. <Strong>Market Monitor</Strong> is a new page in
                Discover.
            </P>
            <UL>
                <li>
                    <Strong>Index heatmap:</Strong> every stock in Nifty 50, Nifty 500 and the rest of the ladder down
                    to Microcap 250, coloured by how it moved.
                </li>
                <li>
                    <Strong>Market breadth:</Strong> how many stocks are rising against how many are falling, across
                    each index.
                </li>
            </UL>
            <P>It is free and open to everyone, no login needed.</P>
            <div className="mt-12">
                <GetStarted label="Open Market Monitor" href={MARKET_MONITOR_URL} />
            </div>
        </>
    );
}

export function NewCharts() {
    return (
        <>
            <P>
                Every price chart in Arthveda moved to a new chart engine: the symbol page, watchlists, your trades and
                shared trades.
            </P>
            <UL>
                <li>
                    <Strong>Indicators</Strong> built in, from moving averages to oscillators.
                </li>
                <li>
                    <Strong>Drawing tools:</Strong> trend lines, levels and more.
                </li>
                <li>
                    <Strong>Your drawings are saved</Strong> per symbol, so the levels you marked are still there next
                    time.
                </li>
            </UL>
            <div className="mt-12">
                <GetStarted label="Open a chart" href={SYMBOLS_URL} />
            </div>
        </>
    );
}

export function TradeAnalysis() {
    return (
        <>
            <P>
                Your P&amp;L says how a trade ended. The new <Strong>Analysis</Strong> tab on a closed trade shows how
                it got there, and what you left behind.
            </P>
            <UL>
                <li>
                    <Strong>The P&amp;L curve</Strong> through the life of the trade, bar by bar.
                </li>
                <li>
                    <Strong>Best and worst points:</Strong> the most it was ever up (MFE) and the deepest it went
                    against you (MAE).
                </li>
                <li>
                    <Strong>Capture efficiency:</Strong> how much of the available move you actually kept.
                </li>
                <li>
                    <Strong>After the exit:</Strong> what the stock did once you got out, and whether holding longer
                    would have paid.
                </li>
                <li>
                    <Strong>Sizing:</Strong> compare the trade as you sized it with the trade at full size.
                </li>
            </UL>
            <P>It works on closed cash trades, intraday and swing, and is part of Pro.</P>
        </>
    );
}

export function DhanSync() {
    return (
        <>
            <P>
                Dhan is the easiest broker to connect so far. Add a Dhan account, approve one consent screen, and press
                Sync. You don&apos;t need to create an API app of your own.
            </P>
            <P>
                Sync brings in today&apos;s trades and your past ones, through the same pipeline as every other import,
                so nothing is ever duplicated.
            </P>
            <Since>Dhan positions also show on Live, from 30 September 2026.</Since>
            <div className="mt-12">
                <GetStarted label="Connect your broker" href={BROKER_ACCOUNTS_URL} />
            </div>
        </>
    );
}

const PAYING = [
    { n: 1, when: "August 2025" },
    { n: 2, when: "September 2025" },
    { n: "3 to 5", when: "October 2025" },
    { n: 6, when: "January 2026" },
    { n: 7, when: "February 2026" },
    { n: 8, when: "March 2026" },
    { n: 9, when: "May 2026" },
    { n: 10, when: "August 2026" },
];

export function TenPayingTraders() {
    return (
        <>
            <P>On 3 August 2026 Arthveda got its tenth paying customer. It took almost a year from the first.</P>
            <ul className="mt-6 space-y-1.5 font-content text-[15px] text-text-muted">
                {PAYING.map((p) => (
                    <li key={String(p.n)}>
                        <Strong>#{p.n}</Strong> · {p.when}
                    </li>
                ))}
            </ul>
            <P>
                Ten is a small number, and I&apos;m sharing it anyway. Arthveda is built by one person, in the open, and
                this is what its growth actually looks like. Every one of those ten is a trader who looked at it and
                decided it was worth paying for.
            </P>
            <P>One day this page will say 1,000. Then 10,000.</P>
            <Since>As of November 2026, 13 traders pay for Arthveda.</Since>
            <SignOff />
        </>
    );
}

export function ProfilePerformanceStats() {
    return (
        <>
            <P>Your profile showed how you trade. Now it can show how it is going, on your terms.</P>
            <P>
                Open the <Strong>⋯</Strong> menu on a dashboard widget and pin it to your profile. Pinned widgets appear
                under <Strong>Performance Stats</Strong>, computed live from your journal.
            </P>
            <P>
                They show returns and R multiples, never rupee amounts, so you can show how you trade without showing
                your account size.
            </P>
            <div className="mt-12">
                <GetStarted label="Build your profile" href={PROFILE_URL} />
            </div>
        </>
    );
}

export function ReportsCharts() {
    return (
        <>
            <P>
                Reports were tables. Now every tab can switch between a <Strong>chart</Strong> and a table, and they all
                take the same filters as your dashboard and Insights: account, instrument, tags, dates.
            </P>
            <P>A bar for each weekday or hour makes the pattern obvious in a way a column of numbers never did.</P>
            <Since>
                From 1 September 2026, Reports and the dashboard also read in Amount, Percent or R, gross or net of
                charges.
            </Since>
            <div className="mt-12">
                <GetStarted label="Open your journal" href={DASHBOARD_URL} />
            </div>
        </>
    );
}

export function VerifiedTrades() {
    return (
        <>
            <P>
                A number a trader typed is a claim. A number that came from their broker is a record. Until now Arthveda
                showed both the same way.
            </P>
            <P>
                A trade is now <Strong>Verified</Strong> when every one of its executions arrived from your broker
                through sync or import and has never been edited. Verified trades carry a badge in your journal and
                wherever you share them, so the people you show them to know the numbers are real.
            </P>
        </>
    );
}

export function MultiLegTrades() {
    return (
        <>
            <P>
                A short strangle with two adjustments is six legs and one trade. Until now Arthveda counted it as six:
                six rows in your trades, six results in your win rate, and a &ldquo;loss&rdquo; every time you closed
                the tested side, even while the trade was still running.
            </P>
            <P>
                Now you can <Strong>group</Strong> the legs into one trade. The group has its own P&amp;L and its own
                notes, counts once in your stats, and is only closed when the last leg is. Every leg must be on the same
                underlying, so a group always means one idea.
            </P>
            <P>For option sellers, whose skill is in the adjustments, the journal finally reads the way you trade.</P>
        </>
    );
}

export function LivePositions() {
    return (
        <>
            <P>
                The new <Strong>Live</Strong> page, under Journal, shows everything you have open right now with live
                unrealised P&amp;L:
            </P>
            <UL>
                <li>open trades already in your journal, and</li>
                <li>
                    open positions and holdings in any logged-in broker account,{" "}
                    <Strong>even ones you never synced</Strong>.
                </li>
            </UL>
            <P>
                Option legs are priced from your broker, so a multi-leg trade shows its true running P&amp;L. The same
                live number appears on the open trade&apos;s page and in the trades list.
            </P>
            <P>Live is part of Pro.</P>
        </>
    );
}

export function CorporateActions() {
    return (
        <>
            <P>
                Buy 30 shares at ₹2,500, and after a 1:10 split your broker shows 300 at ₹250. If your journal
                doesn&apos;t know about the split, the chart, the exit and the P&amp;L all stop making sense.
            </P>
            <P>
                Arthveda now tracks splits and bonuses on NSE and restates a long position you held through one onto the
                new share count. The P&amp;L doesn&apos;t change by a paisa, but everything lines up with the price you
                see today. It runs every night, so the next split is handled before you notice it.
            </P>
        </>
    );
}

export function ArthvedaGoesGlobal() {
    return (
        <>
            <P>Arthveda started in India and stays India-first. Its first step beyond India is the US market.</P>
            <UL>
                <li>
                    <Strong>US stocks and ETFs:</Strong> the S&amp;P 500, Nasdaq-100 and Dow 30 constituents and the
                    major ETFs, each with a symbol page and 20 years of daily charts.
                </li>
                <li>
                    <Strong>A US Market Monitor</Strong>, next to the Indian one.
                </li>
            </UL>
            <P>
                A couple of weeks later Arthveda dropped &ldquo;for India&rdquo; from its name tag. It is a Trading OS,
                India-first, for traders anywhere.
            </P>
            <div className="mt-12">
                <GetStarted label="Open Market Monitor" href={MARKET_MONITOR_URL} />
            </div>
        </>
    );
}

export function MoreBrokers() {
    return (
        <>
            <P>October was the month of brokers. Seven of them gained sync, on top of Zerodha and Dhan:</P>
            <UL>
                <li>
                    <Strong>Definedge</Strong> (1 October)
                </li>
                <li>
                    <Strong>Upstox and Groww</Strong> (11 October)
                </li>
                <li>
                    <Strong>Fyers, Angel One, Kotak Neo and INDmoney</Strong> (25 October)
                </li>
            </UL>
            <P>
                Connect the account, log in, and press Sync: your trades come in without a tradebook, deduplicated
                against anything you imported before. Each one also feeds <Strong>Live</Strong>, so your open positions
                show live P&amp;L.
            </P>
            <div className="mt-12">
                <GetStarted label="Connect your broker" href={BROKER_ACCOUNTS_URL} />
            </div>
        </>
    );
}

export function AskAi() {
    return (
        <>
            <P>Your journal knows everything about your trading. Now you can just ask it.</P>
            <P>
                Arthveda runs an <Strong>MCP server</Strong>, the standard way AI assistants connect to your data.
                Create a key on the new <Strong>Ask AI</Strong> page, add it to Claude, Cursor or any MCP client, and
                ask things like:
            </P>
            <UL>
                <li>&ldquo;What is my win rate on breakouts this year?&rdquo;</li>
                <li>&ldquo;Which mistake cost me the most in October?&rdquo;</li>
                <li>&ldquo;Am I exiting my winners too early?&rdquo;</li>
            </UL>
            <P>
                The assistant reads your trades, notes, tags and stats through Arthveda. It is{" "}
                <Strong>read-only</Strong>: it can never add, change or delete anything.
            </P>
            <P>
                Ask AI buttons on Insights, Reports and each trade copy a ready-made prompt, so you can go from a number
                to a conversation in one click.
            </P>
            <div className="mt-12">
                <GetStarted label="Set up Ask AI" href={AI_SETUP_URL} />
            </div>
        </>
    );
}
