import React from "react";
import { Bold, CalendarDays, Ellipsis, Heading, Italic, Link, List, Underline, Clock } from "lucide-react";
import { CUE } from "../cues";
import { CANDLES, D } from "../data/irfc";
import { clamp, EASE, invLerp, outCubic, spring } from "../lib/ease";
import { C, F } from "../theme";
import { AppWindow, Card, Chip, Mono, Typed, inr } from "../ui/kit";
import { CandleChart } from "../ui/chart";

const S = CUE.trd;
const REST = 99999;

const NET = 16110.6;
const GROSS = 16350;
const CHARGES = 239.4;
const ROI = 17.34;
const R = 2.3;

const EXECS = [
    { side: "Buy", qty: 500, px: 121.8, at: "19 Jan 2026, 09:41" },
    { side: "Buy", qty: 250, px: 128.1, at: "02 Feb 2026, 10:12" },
    { side: "Sell", qty: 750, px: 145.7, at: "23 Feb 2026, 15:12" },
];

const NOTE = "Bought the breakout. Added on the 10 DMA pullback. Sold the first close under it.";

export const TradeReview: React.FC<{ t: number }> = ({ t: tIn }) => {
    const t = tIn >= S.switch && tIn < CUE.whip5[1] + 120 ? tIn : REST;
    const k = EASE.swiftOut(clamp(invLerp(S.numbers, S.numbers + 56, t)));
    const chart = EASE.swiftOut(clamp(invLerp(S.numbers - 10, S.numbers + 50, t)));
    const typed = clamp(invLerp(S.typeStart, S.typeEnd, t));
    const tag = (i: number) => spring(t - (S.tags + i * 10), 320, 18);
    const exec = (i: number) => outCubic(clamp((t - (S.execs + i * 9)) / 12));

    const from = D.entry - 14,
        to = D.exit + 8;
    const markers = [
        { i: D.entry, kind: "buy" as const, p: spring(t - (S.execs), 260, 18) },
        { i: D.add, kind: "buy" as const, p: spring(t - (S.execs + 9), 260, 18) },
        { i: D.exit, kind: "sell" as const, p: spring(t - (S.execs + 18), 260, 18) },
    ];

    return (
        <AppWindow
            active="Trades"
            crumbs={["Trades", "IRFC"]}
            right={
                <div style={{ display: "flex", gap: 8 }}>
                    <Chip tone="green">Win</Chip>
                    <Chip>Long</Chip>
                    <Chip>Equity</Chip>
                    <Ellipsis size={18} color={C.textMuted} style={{ marginLeft: 6 }} />
                </div>
            }
        >
            {/* left column */}
            <Card style={{ position: "absolute", left: 0, top: 0, width: 392, height: 232, padding: "16px 18px" }}>
                <div style={{ fontSize: 15, color: C.textMuted }}>Overview</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                    <div>
                        <div style={{ fontSize: 13, color: C.textMuted }}>Net P&amp;L</div>
                        <Mono style={{ display: "block", fontSize: 32, fontWeight: 600, color: C.success, marginTop: 4 }}>
                            +{inr(NET * k)}
                        </Mono>
                        <Mono style={{ fontSize: 15, color: C.success }}>+{(ROI * k).toFixed(2)}%</Mono>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, color: C.textMuted }}>Net R</div>
                        <Mono style={{ display: "block", fontSize: 32, fontWeight: 600, marginTop: 4 }}>{(R * k).toFixed(2)}</Mono>
                    </div>
                </div>
                <div style={{ marginTop: 16, height: 8, borderRadius: 4, background: "hsl(224, 40%, 20%)", overflow: "hidden" }}>
                    <div style={{ width: `${98.5 * k}%`, height: "100%", background: C.primary }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13, color: C.textMuted }}>
                    <span>
                        Gross <Mono style={{ color: C.text }}>{inr(GROSS * k)}</Mono>
                    </span>
                    <span>
                        Charges <Mono style={{ color: C.destructive }}>{inr(CHARGES * k)}</Mono>
                    </span>
                </div>
            </Card>
            <Card style={{ position: "absolute", left: 0, top: 248, width: 392, height: 108, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: C.textMuted }}>
                    <Clock size={16} /> Duration
                </div>
                <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>35 days 5 hours</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 13, color: C.textMuted }}>
                    <CalendarDays size={14} />
                    <Mono>Jan 19, 2026, 09:41 → Feb 23, 2026, 15:12</Mono>
                </div>
            </Card>
            <Card style={{ position: "absolute", left: 0, top: 372, width: 392, height: 236, padding: "16px 18px" }}>
                <div style={{ fontSize: 15, color: C.textMuted }}>Details</div>
                {[
                    ["Symbol", <Mono key="s" style={{ color: C.link }}>IRFC</Mono>],
                    ["Instrument", "Equity"],
                    ["Risk", <Mono key="r">₹7,000.00</Mono>],
                    ["Currency", "INR"],
                ].map(([l, v]) => (
                    <div key={l as string} style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 15.5 }}>
                        <span style={{ color: C.textMuted }}>{l}</span>
                        <span>{v}</span>
                    </div>
                ))}
            </Card>
            <Card style={{ position: "absolute", left: 0, top: 624, width: 392, bottom: 0, padding: "16px 18px" }}>
                <div style={{ fontSize: 15, color: C.textMuted }}>Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                    {[
                        ["Setup", "Breakout"],
                        ["Setup", "VCP"],
                        ["Mistake", "None"],
                    ].map(([g, v], i) => {
                        const p = tag(i);
                        if (p <= 0.001) return null;
                        return (
                            <div key={v} style={{ transform: `scale(${0.5 + 0.5 * p})`, opacity: clamp(p * 1.6), transformOrigin: "left center" }}>
                                <Chip tone={i === 2 ? "neutral" : "blue"} style={{ height: 32, fontSize: 14 }}>
                                    <span style={{ opacity: 0.7 }}>{g}:</span> {v}
                                </Chip>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* right column */}
            <div style={{ position: "absolute", left: 408, right: 0, top: 0, display: "flex", gap: 8 }}>
                {["Review", "Executions 3", "Analysis"].map((x, i) => (
                    <span key={x} style={{ height: 34, padding: "0 14px", display: "flex", alignItems: "center", borderRadius: 7, fontSize: 14.5, background: i === 0 ? C.primary : "transparent", border: i === 0 ? "none" : `1px solid ${C.borderSubtle}`, color: i === 0 ? C.text : C.textMuted }}>
                        {x}
                    </span>
                ))}
            </div>
            <Card style={{ position: "absolute", left: 408, right: 0, top: 48, height: 372, padding: "14px 16px", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <Mono style={{ fontSize: 16, fontWeight: 600 }}>IRFC</Mono>
                    <span style={{ fontSize: 13.5, color: C.textMuted }}>1D · entries and exits</span>
                </div>
                <div style={{ marginTop: 12 }}>
                    <CandleChart idPrefix="trd" w={866} h={300} from={from} to={to} reveal={chart * (to - from + 1)} yMin={110} yMax={158} volH={50} ma thread={0.85} markers={markers} lastPrice={false} />
                </div>
            </Card>
            <Card style={{ position: "absolute", left: 408, right: 0, top: 436, height: 150, padding: "10px 16px" }}>
                <div style={{ display: "flex", fontSize: 13, color: C.textMuted, padding: "4px 0 8px" }}>
                    <span style={{ width: 90 }}>Side</span>
                    <span style={{ width: 90, textAlign: "right" }}>Qty</span>
                    <span style={{ width: 130, textAlign: "right" }}>Price</span>
                    <span style={{ flex: 1, textAlign: "right" }}>Time</span>
                </div>
                {EXECS.map((e, i) => {
                    const p = exec(i);
                    return (
                        <div key={i} style={{ display: "flex", alignItems: "center", height: 36, borderTop: `1px solid hsl(220, 35%, 16%)`, opacity: p, transform: `translateY(${(1 - p) * 12}px)`, fontSize: 15 }}>
                            <span style={{ width: 90, color: e.side === "Buy" ? C.success : C.destructive, fontWeight: 600 }}>{e.side}</span>
                            <Mono style={{ width: 90, textAlign: "right" }}>{e.qty}</Mono>
                            <Mono style={{ width: 130, textAlign: "right" }}>₹{e.px.toFixed(2)}</Mono>
                            <Mono style={{ flex: 1, textAlign: "right", color: C.textMuted, fontSize: 14 }}>{e.at}</Mono>
                        </div>
                    );
                })}
            </Card>
            <Card style={{ position: "absolute", left: 408, right: 0, top: 602, bottom: 0, overflow: "hidden" }}>
                <div style={{ height: 44, display: "flex", alignItems: "center", gap: 18, padding: "0 16px", borderBottom: `1px solid ${C.borderSubtle}`, color: C.textMuted }}>
                    {[Heading, Bold, Italic, Underline, List, Link].map((I, i) => (
                        <I key={i} size={17} strokeWidth={1.8} />
                    ))}
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: 13 }}>Notes</span>
                </div>
                <div
                    style={{
                        margin: 14,
                        padding: "14px 16px",
                        minHeight: 150,
                        borderRadius: 9,
                        background: "hsl(225, 40%, 13%)",
                        border: `1px solid ${typed > 0 && typed < 1 ? "hsl(220, 60%, 52%)" : C.borderSubtle}`,
                        fontSize: 21,
                        lineHeight: 1.5,
                    }}
                >
                    {typed <= 0 ? <span style={{ color: C.placeholder }}>What did you see, and what did you do?</span> : <Typed text={NOTE} p={typed} t={t} caret={typed < 1} />}
                </div>
            </Card>
        </AppWindow>
    );
};

export const TRD_LOCAL = { notes: { x: 260 + 408 + 452, y: 82 + 602 + 110 } };
