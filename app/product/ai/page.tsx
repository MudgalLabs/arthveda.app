import type { Metadata } from "next";
import { Sparkles, ShieldCheck, Calculator, KeyRound } from "lucide-react";

import { FamilyLabel } from "@/components/family_label";
import { GetStarted } from "@/components/get_started";
import { AI_SETUP_URL } from "@/lib/links";

export const metadata: Metadata = {
    title: "Connect your AI to your trading journal · Arthveda",
    description:
        "Connect Claude, Codex, or any MCP client to your Arthveda trading journal and ask it, in plain English, what you keep getting wrong. Read-only, private, and yours to switch off anytime.",
    alternates: { canonical: "/product/ai" },
};

// The questions come straight from the product docs (mcp_server.md intro,
// trade_analysis.md §15) — real things the tools can answer, not invented ones.
const QUESTIONS = [
    "What is my biggest recurring mistake?",
    "Does my edge hold on Mondays?",
    "Am I cutting winners early?",
    "Which setup has my worst expectancy? Show me the 5 worst trades in it.",
    "Am I chronically exiting before the move is over?",
    "Do I size up after a loss, and does it cost me?",
];

const HOW_IT_WORKS = [
    {
        Icon: Calculator,
        heading: "You compute, the AI interprets.",
        body: "Arthveda hands your AI already-worked-out facts, like win rate by setup, expectancy by hold time, and how much of each move you captured. It never has to add up raw trades. The numbers are ours; the thinking is yours to have with the model.",
    },
    {
        Icon: ShieldCheck,
        heading: "Read-only, always.",
        body: "Your AI can read your journal. It cannot add to it, change it, or delete anything. The worst it can do is draw the wrong conclusion, and its reasoning is always yours to check against your own numbers.",
    },
    {
        Icon: KeyRound,
        heading: "Your notes stay yours until you say otherwise.",
        body: "Your trades and tags are shared. Your written notes are a separate switch you turn on per key, because that is the most personal thing in your journal. Create up to five keys, name them, and revoke any of them the moment you want to.",
    },
];

export default function AIHubPage() {
    return (
        <main className="pb-24">
            {/* Hero — left-aligned, matches the family hub heroes (no CTAs in the
                hero itself; the CTA lives at the foot of the page). */}
            <section className="pt-12 md:pt-16 lg:pt-20">
                <FamilyLabel name="AI" Icon={Sparkles} />
                <h1 className="mt-5 max-w-3xl text-balance font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.025em] text-text-primary sm:text-[52px] lg:max-w-none lg:text-[60px]">
                    Ask your journal anything.
                </h1>
                <p className="mt-5 max-w-3xl font-content text-[15px] leading-[1.6] text-text-muted">
                    Connect Claude, Codex, or any AI assistant to Arthveda and
                    ask, in plain English, what your trading actually says about
                    you. It reads your trades, tags and notes and does the
                    thinking with you.
                </p>
            </section>

            {/* Full-bleed divider after the hero — same treatment as the hubs. */}
            <hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2 border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

            {/* Questions you can actually ask. */}
            <section className="mt-24">
                <h2 className="max-w-2xl text-balance font-heading text-[28px] font-medium leading-tight tracking-[-0.02em] text-text-primary sm:text-[34px]">
                    Questions you can actually ask.
                </h2>
                <p className="mt-4 max-w-2xl font-content text-[15px] leading-[1.6] text-text-muted">
                    Not a chatbot bolted onto a dashboard. Your assistant reads
                    the same journal you do, so the answers are about your
                    trading, with the numbers behind them.
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                    {QUESTIONS.map((q) => (
                        <div
                            key={q}
                            className="flex items-start gap-3 rounded-lg border border-white/[0.10] bg-surface-1/40 px-5 py-4"
                        >
                            <Sparkles
                                size={16}
                                aria-hidden
                                className="mt-0.5 shrink-0 text-accent"
                            />
                            <span className="font-content text-[15px] leading-[1.5] text-text-primary">
                                {q}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works — three beats grounded in the read-only, notes-opt-in
                design (mcp_server.md). */}
            <section className="mt-24 md:mt-28">
                <h2 className="max-w-2xl text-balance font-heading text-[28px] font-medium leading-tight tracking-[-0.02em] text-text-primary sm:text-[34px]">
                    How it works.
                </h2>

                <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
                    {HOW_IT_WORKS.map(({ Icon, heading, body }) => (
                        <div key={heading}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                                <Icon size={20} aria-hidden className="text-text-muted" />
                            </div>
                            <h3 className="mt-4 font-heading text-[17px] font-medium text-text-primary">
                                {heading}
                            </h3>
                            <p className="mt-2 font-content text-[14px] leading-[1.6] text-text-muted">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Set it up. */}
            <section className="mt-24 rounded-lg border border-white/[0.12] bg-surface-1/35 p-6 md:mt-28 md:p-8">
                <h2 className="font-heading text-[18px] font-medium text-text-primary">
                    Set it up in a minute.
                </h2>
                <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 font-content text-[15px] leading-[1.6] text-text-muted">
                    <li>
                        Create an API key in your{" "}
                        <a href={AI_SETUP_URL}>Arthveda settings</a>.
                    </li>
                    <li>
                        Paste it into Claude Code, Claude Desktop, Codex, or any
                        other MCP client.
                    </li>
                    <li>Ask away.</li>
                </ol>
                <p className="mt-4 max-w-2xl font-content text-[14px] leading-[1.6] text-text-subtle">
                    Included with your subscription and with the{" "}
                    <span className="whitespace-nowrap">14-day</span> trial.
                </p>
            </section>

            {/* CTA — points at the app's key-creation page, not a signup wall. */}
            <div className="mt-20 text-center md:mt-28">
                <h2 className="section-header">Ready to talk to your journal?</h2>
                <div className="h-8" />
                <div className="mx-auto w-fit">
                    <GetStarted
                        label="Set up your AI connection"
                        href={AI_SETUP_URL}
                    />
                </div>
            </div>
        </main>
    );
}
