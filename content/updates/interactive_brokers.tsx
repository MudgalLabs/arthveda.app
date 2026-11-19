import type { ReactNode } from "react";

import { GetStarted } from "@/components/get_started";
import { BROKER_ACCOUNTS_URL } from "@/lib/links";
import { A, H2, P, Strong } from "@/content/updates/prose";

// Release post: Interactive Brokers import + Sync. Facts follow
// arthveda/docs/ibkr_integration.md and docs/multi_currency.md (§4, §5); keep
// them in step if the integration changes (instruments, sync window, charges).

const OL = ({ children }: { children: ReactNode }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 font-content text-[16px] leading-[1.7] text-text-muted">
        {children}
    </ol>
);

export default function InteractiveBrokers() {
    return (
        <>
            <P>
                Arthveda now works with <Strong>Interactive Brokers</Strong>,
                our first US broker. Import your US stock and ETF trades, or let
                Sync pull them for you, and they land in
                the same journal, dashboard, insights and reports as everything
                else you trade.
            </P>
            <P>
                Sync needs no daily login. You set up a Flex Web Service token
                once, and it keeps working until the expiry you picked, up to a
                year.
            </P>

            <H2>Import your trades</H2>
            <OL>
                <li>
                    In IBKR Client Portal, open{" "}
                    <Strong>Performance &amp; Reports</Strong>, then{" "}
                    <Strong>Flex Queries</Strong>, and create an{" "}
                    <Strong>Activity Flex Query</Strong> with the Trades section
                    at Executions level, as XML (CSV works too).
                </li>
                <li>Run it for up to 365 days and download the file.</li>
                <li>
                    In Arthveda, create an Interactive Brokers account, choose{" "}
                    <Strong>Import</Strong> and upload the file. Review the
                    trades, then import.
                </li>
            </OL>

            <H2>Or Sync it</H2>
            <OL>
                <li>
                    On the same Flex Queries page, turn on the{" "}
                    <Strong>Flex Web Service</Strong> and generate a token.
                    Leave the IP address empty.
                </li>
                <li>
                    Choose <Strong>Connect</Strong> on your Interactive Brokers
                    account and paste the token and your query&apos;s Query ID.
                </li>
                <li>
                    Choose <Strong>Sync</Strong>. The first sync brings in the
                    last 365 days; each one after picks up where the last left
                    off. A day&apos;s trades arrive once IBKR closes that day.
                </li>
            </OL>

            <H2>What comes in</H2>
            <P>
                <Strong>US stocks and ETFs:</Strong> the S&amp;P 500,
                Nasdaq-100 and Dow 30 constituents plus the major ETFs, each
                linked to its chart and symbol page. Partial fills of one order
                become one execution, and scaling in and out is still one trade.
            </P>
            <P>
                <Strong>IBKR&apos;s own commissions.</Strong> Charges are not
                estimated: Arthveda uses the commission, exchange, regulatory and
                clearing fees Interactive Brokers reports on every execution, so
                your net P&amp;L matches your statement.
            </P>
            <P>
                <Strong>Nothing left out silently.</Strong> Options, futures,
                forex conversions, stocks on other exchanges and tickers outside
                that list aren&apos;t imported yet. The review step and the sync
                both list them by name, with the reason, so you know exactly
                what was skipped. If you trade one of them, tell me and I&apos;ll
                prioritise it.
            </P>

            <H2>Dollars and rupees in one journal</H2>
            <P>
                Each trade keeps its P&amp;L in dollars. Your dashboard,
                calendar and reports convert it into your home currency at the
                USD/INR rate of the day the trade closed. If Interactive Brokers
                is the first account you bring in, your home currency becomes
                dollars; once you trade in both currencies, you pick which one
                your totals are in.
            </P>
            <P>
                The same now holds for every broker&apos;s import and sync, not
                just Interactive Brokers. See the{" "}
                <A href="/brokers/interactive-brokers">Interactive Brokers page</A>{" "}
                for the full setup.
            </P>

            <div className="mt-12">
                <GetStarted label="Connect Interactive Brokers" href={BROKER_ACCOUNTS_URL} />
            </div>
        </>
    );
}
