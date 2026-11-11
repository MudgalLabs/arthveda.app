import React from "react";
import { Check, Copy, KeyRound, Lock, Sparkles } from "lucide-react";
import { CUE } from "../cues";
import { clamp, EASE, invLerp, outCubic, spring } from "../lib/ease";
import { C, F } from "../theme";
import { AppWindow, Btn, Card, Mono, Typed } from "../ui/kit";

const S = CUE.ai;
const REST = 99999;

const QUESTIONS = [
    ["Am I cutting my winners early? Show me what holding longer would have done.", "Uses: Exit quality"],
    ["What mistake do I keep making on my losing trades? Quote my notes.", "Uses: Notes (needs notes access)"],
    ["Which of my setups actually make money after charges, and which should I stop trading?", "Uses: Tags and charges"],
    ["Do I trade better on some weekdays than others?", "Uses: Timing"],
];

const ANSWER = "Yes. Winners you held past the 20 DMA averaged 3.4R. The ones you closed before it averaged 1.1R.";

export const AskAI: React.FC<{ t: number }> = ({ t: tIn }) => {
    const t = tIn >= S.switch && tIn < CUE.whip7[1] + 120 ? tIn : REST;
    const card = (i: number) => outCubic(clamp((t - (S.cards + i * 4)) / 14));
    const copied = t >= S.copy;
    const chat = spring(t - S.chat, 220, 24);
    const ask = clamp(invLerp(S.ask, S.ask + 18, t));
    const answer = clamp(invLerp(S.answer, S.answer + 40, t));
    const bars = EASE.swiftOut(clamp(invLerp(S.bars, S.bars + 30, t)));
    const words = ANSWER.split(" ");
    const shownWords = Math.round(words.length * answer);

    return (
        <AppWindow active="Ask AI" crumbs={["Ask AI"]}>
            <div style={{ maxWidth: 1180 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 28, padding: "0 10px", borderRadius: 999, border: `1px solid ${C.borderSoft}`, fontSize: 13, color: C.textMuted }}>
                    <Sparkles size={14} color={C.azure400} /> Bring your own AI
                </span>
                <div style={{ fontSize: 34, fontWeight: 650, letterSpacing: "-0.02em", marginTop: 16 }}>Ask your AI about your trading</div>
                <div style={{ fontSize: 17, color: C.textMuted, marginTop: 10, lineHeight: 1.5, maxWidth: 720 }}>
                    Connect your AI assistant to Arthveda and ask it why you win, why you lose, and what to change. It answers from your real trades, tags and notes.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 14, color: C.textMuted }}>
                    <Lock size={15} /> Read only: it can never change anything in Arthveda.
                </div>
            </div>

            <div style={{ position: "absolute", left: 0, top: 236, fontSize: 18, fontWeight: 600 }}>Questions only Arthveda can answer</div>
            <div style={{ position: "absolute", left: 0, top: 276, width: 1100, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {QUESTIONS.map(([q, uses], i) => {
                    const p = card(i);
                    const on = i === 0 && copied;
                    return (
                        <Card
                            key={i}
                            style={{
                                height: 118,
                                padding: "16px 18px",
                                opacity: 0.15 + 0.85 * p,
                                transform: `translateY(${(1 - p) * 14}px)`,
                                border: `1px solid ${on ? "rgba(143,182,255,0.6)" : C.borderSubtle}`,
                                boxShadow: on ? "0 0 26px rgba(70,130,255,0.3)" : undefined,
                            }}
                        >
                            <div style={{ display: "flex", gap: 14 }}>
                                <div style={{ flex: 1, fontSize: 16.5, lineHeight: 1.45 }}>{q}</div>
                                {on ? <Check size={18} color={C.success} /> : <Copy size={18} color={C.textMuted} />}
                            </div>
                            <div style={{ marginTop: 10, fontSize: 13, color: C.textSubtle }}>{uses}</div>
                        </Card>
                    );
                })}
            </div>

            <div style={{ position: "absolute", left: 0, top: 554, fontSize: 18, fontWeight: 600 }}>Connect in two minutes</div>
            <div style={{ position: "absolute", left: 0, top: 594, width: 1100, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                    ["Create an API key", "The key lets your AI read your trading data. Notes stay private unless you allow them."],
                    ["Add Arthveda to your AI", "Works with any AI client that supports remote MCP servers."],
                ].map(([h, b], i) => (
                    <div key={h} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span style={{ width: 28, height: 28, borderRadius: 14, background: C.secondary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontFamily: F.mono }}>{i + 1}</span>
                        <div>
                            <div style={{ fontSize: 16.5 }}>{h}</div>
                            <div style={{ fontSize: 14.5, color: C.textMuted, marginTop: 4 }}>{b}</div>
                            {i === 0 && (
                                <Btn kind="primary" icon={KeyRound} style={{ marginTop: 10 }}>
                                    Create API key
                                </Btn>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* the user's own AI assistant, answering from their journal */}
            {chat > 0.001 && (
                <div
                    style={{
                        position: "absolute",
                        left: 600,
                        top: 150,
                        width: 690,
                        height: 600,
                        borderRadius: 14,
                        background: "hsl(224, 38%, 11%)",
                        border: `1px solid rgba(143, 182, 255, 0.4)`,
                        boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 50px rgba(60, 110, 255, 0.18)",
                        transform: `translateY(${(1 - chat) * 70}px) scale(${0.94 + 0.06 * chat})`,
                        opacity: clamp(chat * 1.5),
                        overflow: "hidden",
                        zIndex: 10,
                    }}
                >
                    <div style={{ height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 18px", borderBottom: `1px solid ${C.borderSubtle}` }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #4e80ee, #8fb6ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Sparkles size={16} color="#fff" />
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 600 }}>Your AI assistant</span>
                        <div style={{ flex: 1 }} />
                        <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "hsl(150, 70%, 62%)", border: `1px solid ${C.successBorder}`, background: C.successBg, borderRadius: 999, padding: "4px 10px" }}>
                            <span style={{ width: 7, height: 7, borderRadius: 4, background: C.success }} /> Connected to Arthveda
                        </span>
                    </div>
                    <div style={{ padding: "22px 22px" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div style={{ maxWidth: 440, padding: "12px 16px", borderRadius: "14px 14px 4px 14px", background: C.primary, fontSize: 19, lineHeight: 1.4 }}>
                                <Typed text="Am I cutting my winners early?" p={ask} t={t} caret={ask < 1} />
                            </div>
                        </div>
                        {t >= S.answer - 6 && (
                            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
                                <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "hsl(224, 45%, 20%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Sparkles size={16} color={C.azure400} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 19, lineHeight: 1.5, minHeight: 86 }}>
                                        {words.slice(0, shownWords).join(" ")}
                                        {answer < 1 && <span style={{ display: "inline-block", width: 9, height: 18, marginLeft: 4, background: C.azure400, verticalAlign: "-2px" }} />}
                                    </div>
                                    <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                                        {[
                                            ["Held past the 20 DMA", 3.4, C.success],
                                            ["Closed before it", 1.1, C.azure400],
                                        ].map(([l, v, c]) => (
                                            <div key={l as string}>
                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, color: C.textMuted }}>
                                                    <span>{l as string}</span>
                                                    <Mono style={{ color: C.text }}>{((v as number) * bars).toFixed(1)}R</Mono>
                                                </div>
                                                <div style={{ marginTop: 6, height: 12, borderRadius: 6, background: "hsl(224, 40%, 18%)" }}>
                                                    <div style={{ width: `${((v as number) / 3.6) * 100 * bars}%`, height: "100%", borderRadius: 6, background: c as string, boxShadow: `0 0 14px ${c}` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 18, fontSize: 13.5, color: C.textSubtle, opacity: bars }}>From your 42 trades in Arthveda · read only</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AppWindow>
    );
};
