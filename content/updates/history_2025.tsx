import { GetStarted } from "@/components/get_started";
import { BROKER_ACCOUNTS_URL, DASHBOARD_URL } from "@/lib/links";
import { H2, P, SignOff, Since, Strong, UL } from "@/content/updates/prose";

// Backfilled 2025 posts (lib/updates_history.ts). Each body describes the
// feature AS IT SHIPPED on its date, from the commits of the time; anything
// that came later goes in a <Since> aside, never into the main text.

export function Inception() {
    return (
        <>
            <P>
                On 1 April 2025 I started Arthveda as a side project, to solve my own problem: keeping a trading journal
                that actually worked for Indian traders. I built it for fun, and for one trader: me.
            </P>
            <P>
                The problem was bigger than a journal, though. My trading journey was scattered across too many places.
                I discovered stocks in a screener, tracked them in a watchlist somewhere else, placed trades through my
                broker, and kept my notes and lessons in yet another place. Every part of it was connected in my head,
                but fragmented across tools.
            </P>
            <P>
                Day one didn&apos;t solve any of that. The first weeks were plumbing: sign-in, a database, a design
                system of my own, a sidebar. No trades, no charts. But the idea was already there: most trading tools
                remember what the market did, and very few remember what you did.
            </P>
            <P>
                I didn&apos;t know then that it would grow into a product other traders pay for. This page is the record
                of how it did, one release and one milestone at a time.
            </P>
            <SignOff />
        </>
    );
}

export function BetaLaunch() {
    return (
        <>
            <P>
                After almost three months of building, the first public version of Arthveda went live. It did one thing:
                give an Indian trader an honest picture of their trading.
            </P>

            <H2>What was in it</H2>
            <UL>
                <li>
                    <Strong>Log a trade by hand.</Strong> Add your buys and sells and Arthveda works out the P&amp;L,
                    the R multiple and the charges as you type: brokerage, STT, exchange and SEBI fees, GST and stamp
                    duty.
                </li>
                <li>
                    <Strong>Import your tradebook.</Strong> Upload the file from Zerodha or Groww and every trade comes
                    in, grouped into positions. Run the same file twice and nothing is duplicated.
                </li>
                <li>
                    <Strong>A dashboard.</Strong> Cumulative P&amp;L over time, gross or net of charges, plus your
                    overview, winning and losing stats (win rate, average win and loss, average R) for any date range.
                    Widgets can be dragged and resized.
                </li>
                <li>
                    <Strong>Notes on every trade</Strong>, so the why stays next to the numbers.
                </li>
                <li>
                    <Strong>A demo account</Strong> to look around before importing anything of your own.
                </li>
            </UL>
            <P>It was cash trades only, with futures and options shown as coming soon.</P>

            <Since>
                Since then, Arthveda has grown into a Trading OS: more brokers, futures, options and commodities, live
                sync, Discover and Social. The rest of this page is how it got there.
            </Since>
        </>
    );
}

export function UpstoxImport() {
    return (
        <>
            <P>
                Upstox became the third broker you can import from, after Zerodha and Groww. Download your tradebook
                from Upstox, upload it, and your trades come in grouped into positions with charges worked out.
            </P>
            <P>
                Upstox tradebooks name a stock by its company, not its trading symbol. Arthveda matches each company
                name to its symbol, so your Upstox trades sit next to the rest of your journal under the same name.
            </P>
            <Since>
                Options in Upstox tradebooks were supported from 18 July 2025. Upstox gained live sync in October 2026.
            </Since>
        </>
    );
}

export function OpenSource() {
    return (
        <>
            <P>
                I built Arthveda to be free and open source, so that any trader could use it. On 9 July 2025 the code
                went public under the AGPL license.
            </P>
            <P>
                It went out as part of <Strong>Mudgal Labs</Strong>, the name I build free and open-source software
                under. Anyone could read the code, run their own copy with Docker, or send a fix.
            </P>
            <P>
                Open source shaped Arthveda for the next ten months, and the rest of this timeline tells how that
                changed.
            </P>
            <SignOff />
        </>
    );
}

export function FirstContribution() {
    return (
        <>
            <P>
                Six days after the code went public, the first pull request from outside arrived. A developer from the
                community improved the Docker setup so Arthveda builds smaller and is easier to self host. More of their
                changes followed that week.
            </P>
            <P>
                Seeing someone else spend their evening making Arthveda better is what made it feel like a real project,
                not just mine.
            </P>
            <SignOff />
        </>
    );
}

export function ZerodhaSync() {
    return (
        <>
            <P>
                Downloading a tradebook after every session gets old fast. Now you can connect your Zerodha account to
                Arthveda and press <Strong>Sync</Strong>: your trades come in straight from Kite.
            </P>

            <H2>How it works</H2>
            <UL>
                <li>Add your Zerodha account under Broker accounts and log in with Kite.</li>
                <li>
                    Press Sync. New trades are added, and a trade that adds to or exits a position you already hold
                    joins that position instead of starting a new one.
                </li>
                <li>
                    A summary shows what came in. Syncing again never duplicates a trade, and neither does importing a
                    tradebook for the same days.
                </li>
            </UL>
            <P>
                The same release brought <Strong>broker accounts</Strong>: you can keep more than one account per
                broker, and every trade belongs to one.
            </P>

            <H2>Futures and options</H2>
            <P>
                Within the week, Zerodha futures and options followed, first by tradebook import and then by Sync, with
                F&amp;O charges worked out like everything else.
            </P>

            <Since>
                From 19 August 2025 you no longer needed your own Kite API key to connect: log in with Zerodha and
                you&apos;re done.
            </Since>

            <div className="mt-12">
                <GetStarted label="Connect your broker" href={BROKER_ACCOUNTS_URL} />
            </div>
        </>
    );
}

export function ProPlan() {
    return (
        <>
            <P>
                Arthveda runs on servers, and every hour I put into it is an hour I&apos;m not spending elsewhere. To
                make it sustainable, I added a paid <Strong>Pro</Strong> plan, with checkout through Paddle.
            </P>
            <P>
                Nothing about open source changed. The code stayed public, and anyone who wanted Arthveda for free could
                still run it on their own machine. Pro was for traders who wanted the hosted version and wanted to
                support its development.
            </P>
            <P>
                The Free plan stayed too, with limits on how much of the dashboard and how many broker accounts it
                covered.
            </P>
            <SignOff />
        </>
    );
}

export function Notifications() {
    return (
        <>
            <P>
                Arthveda has a notification inbox now. Open it from the sidebar to see what&apos;s new: mark things
                read, delete them, and scroll back as far as you like. Your first notification is a welcome when you
                sign up.
            </P>

            <H2>Built on Bodhveda</H2>
            <P>
                Notifications are one of those features every product needs and nobody wants to build: storage,
                delivery, read state, broadcasts, per-user preferences. So I built it once, as its own product.
            </P>
            <P>
                <a href="https://bodhveda.com" target="_blank" rel="noopener">
                    Bodhveda
                </a>{" "}
                is an open-source notification platform from Mudgal Labs. Send a notification to one user or broadcast
                it to everyone, let people choose what they hear about, and drop an inbox into your React app with its
                SDK. The whole inbox in Arthveda is a few lines of <Strong>@bodhveda/react</Strong>.
            </P>
            <P>If you&apos;re building a product and dreading notifications, give it a look.</P>

            <Since>
                Since then the inbox has grown to new followers, support replies and Product updates, and you choose
                which of those you get in Settings.
            </Since>
        </>
    );
}

export function FirstSale() {
    return (
        <>
            <P>
                On 29 August 2025, a month after Pro went live, Arthveda made its first sale: <Strong>₹1,401.84</Strong>{" "}
                for a year of Pro.
            </P>
            <P>
                It isn&apos;t much money. But a trader looked at something I built as a side project, decided it was
                worth paying for, and did. That changed how I thought about Arthveda: from a project to a product that
                has to earn its keep.
            </P>
            <P>To that first customer: thank you.</P>
            <SignOff />
        </>
    );
}

export function AngelOneKotakImport() {
    return (
        <>
            <P>
                Two more brokers joined the import list: <Strong>Angel One</Strong> and{" "}
                <Strong>Kotak Securities</Strong>. Upload the tradebook and your trades come in grouped into positions.
            </P>
            <UL>
                <li>
                    <Strong>Angel One:</Strong> cash trades, with Angel One&apos;s own brokerage worked into the
                    charges.
                </li>
                <li>
                    <Strong>Kotak Securities:</Strong> cash trades and options.
                </li>
            </UL>
            <Since>
                Angel One futures and options followed on 5 November 2025, and Kotak futures on 21 November 2025. Both
                got live sync in October 2026.
            </Since>
        </>
    );
}

export function TradingCalendar() {
    return (
        <>
            <P>
                The <Strong>Calendar</Strong> shows your trading the way you lived it: one tile per day, green for a
                profit and red for a loss.
            </P>
            <UL>
                <li>
                    <Strong>Month view.</Strong> Every trading day with its P&amp;L. Click a day to see the trades
                    behind it.
                </li>
                <li>
                    <Strong>Year view.</Strong> Click the month name to see all twelve months at once, and spot your
                    good and bad stretches in a glance.
                </li>
                <li>
                    <Strong>All time.</Strong> Every year you&apos;ve traded, side by side.
                </li>
            </UL>
            <Since>
                Since then the calendar gained weekly totals, a compact view on phones, a day summary with gross and net
                R, and a choice of showing gross P&amp;L, net P&amp;L or R on every tile.
            </Since>
            <div className="mt-12">
                <GetStarted label="Open your journal" href={DASHBOARD_URL} />
            </div>
        </>
    );
}

export function RichNotes() {
    return (
        <>
            <P>
                A plain text box is not where trading lessons get written. Trade notes are now a proper editor, on their
                own <Strong>Notes</Strong> tab next to the trade&apos;s executions.
            </P>
            <UL>
                <li>Headings, bold, lists and quotes, to give a review some shape.</li>
                <li>
                    <Strong>Screenshots.</Strong> Upload your chart at entry and at exit and they stay with the trade.
                    Images are resized for you, so a phone screenshot doesn&apos;t weigh megabytes.
                </li>
                <li>Your storage use is shown on the billing page, so you always know how much room is left.</li>
            </UL>
            <P>Image uploads are part of Pro.</P>
            <div className="mt-12">
                <GetStarted label="Open your journal" href={DASHBOARD_URL} />
            </div>
        </>
    );
}

export function FreePlanEnds() {
    return (
        <>
            <P>
                For weeks I went back and forth between Free, Paid and Trial. Money was never the main goal. But
                Arthveda costs real money to run and real time to build, and a Free plan that most people stayed on
                wasn&apos;t paying for either.
            </P>
            <P>
                So I made the hard call: the Free plan ended. To use the hosted Arthveda, you subscribe to Pro. Traders
                who had signed up before the change got a discount code as a thank-you for being early.
            </P>
            <P>The code was still open source, so anyone who wanted Arthveda for free could still run it themselves.</P>
            <SignOff />
        </>
    );
}

export function Tags() {
    return (
        <>
            <P>
                Your P&amp;L tells you whether you made money. Tags tell you <Strong>how</Strong>.
            </P>

            <H2>Make your own</H2>
            <P>
                Create tag groups on the new Tags page, like Setup, Mistake or Emotion, and the tags inside them:
                Breakout, Moved my stop, FOMO. Then tag a trade when you add or edit it.
            </P>

            <H2>Use them</H2>
            <UL>
                <li>
                    <Strong>Filter</Strong> your trades by any tag.
                </li>
                <li>
                    <Strong>Analytics by tag:</Strong> trades, win rate, P&amp;L and more for every tag, in one table
                    you can sort. The setups that pay rise to the top, and the mistakes that cost you show up in rupees.
                </li>
            </UL>
            <Since>
                Since then, tags can be shown as columns on the Trades table and filter every surface of the journal,
                from the dashboard to Reports and Insights.
            </Since>
            <div className="mt-12">
                <GetStarted label="Open your journal" href={DASHBOARD_URL} />
            </div>
        </>
    );
}

export function FreeTrial() {
    return (
        <>
            <P>
                Ending the Free plan left a question: how does a new trader find out whether Arthveda is for them? The
                answer was a trial. From 29 October 2025, every new account got <Strong>30 days of Pro</Strong> free,
                with a countdown in the app so the end never comes as a surprise.
            </P>
            <P>
                The trial has changed shape a few times since, as you&apos;ll see further up this page, but the idea
                stuck: try all of it first, then decide.
            </P>
            <SignOff />
        </>
    );
}
