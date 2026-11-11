import React from "react";
import {
    Bookmark,
    ChartCandlestick,
    ChartLine,
    ChevronDown,
    Crosshair,
    Ellipsis,
    Eye,
    GitCompareArrows,
    Magnet,
    Minus,
    NotebookPen,
    Redo2,
    Search,
    SlidersHorizontal,
    Slash,
    StickyNote,
    Trash2,
    Undo2,
} from "lucide-react";
import { CUE } from "../cues";
import { CANDLES, D } from "../data/irfc";
import { clamp, EASE, invLerp, outCubic, spring } from "../lib/ease";
import { C, F } from "../theme";
import { AppWindow, Btn, Card, Chip, Mono } from "../ui/kit";
import { CandleChart, type Marker } from "../ui/chart";

const S = CUE.sym;
const REST = 99999;

// Chart geometry (content-local).
const CH = { x: 60, y: 168, w: 800, h: 410, volH: 70, from: 0, to: CANDLES.length - 1, yMin: 96, yMax: 160 };
const n = CH.to - CH.from + 1;
const step = (CH.w - 64) / n;
const priceH = CH.h - CH.volH - 10;
const cx = (i: number) => CH.x + (i - CH.from + 0.5) * step;
const cy = (v: number) => CH.y + ((CH.yMax - v) / (CH.yMax - CH.yMin)) * priceH;

const J = { x: 896, listTop: 352 };

type Ev = { key: string; at: number; h: number; markers: Marker["kind"][]; i: number; above: boolean };
const EVENTS: Ev[] = [
    { key: "added", at: S.markers, h: 124, markers: ["add"], i: D.added, above: false },
    { key: "trade", at: S.markers + S.markerEvery, h: 88, markers: ["buy"], i: D.entry, above: false },
    { key: "note1", at: S.markers + 2 * S.markerEvery, h: 88, markers: ["buy", "note"], i: D.add, above: true },
    { key: "note2", at: S.markers + 3 * S.markerEvery, h: 88, markers: ["sell"], i: D.exit, above: true },
];

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
// Prior years of activity with this symbol (watchlist adds, notes, trades).
const PRIOR: Record<number, number[]> = {
    2025: [0, 1, 0, 2, 1, 0, 0, 1, 0, 2, 3, 2],
    2024: [1, 0, 2, 3, 1, 2, 3, 0, 1, 0, 1, 3],
    2023: [0, 1, 0, 0, 1, 1, 2, 4, 2, 2, 1, 2],
    2022: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
};

const cellColor = (v: number) => (v <= 0 ? "hsl(222, 30%, 15%)" : ["", "hsl(224, 45%, 30%)", "hsl(224, 52%, 40%)", "hsl(222, 60%, 52%)", "hsl(216, 70%, 66%)"][Math.min(4, v)]);

const JourneyCard: React.FC<{ ev: Ev; glow: number }> = ({ ev, glow }) => {
    const head = (icon: React.ReactNode, title: React.ReactNode, date: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 15.5 }}>
            {icon}
            {title}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: C.textMuted }}>{date}</span>
        </div>
    );
    return (
        <div
            style={{
                height: ev.h - 10,
                padding: "13px 15px",
                borderRadius: 10,
                background: glow > 0 ? `rgba(70, 105, 220, ${0.16 * glow})` : "transparent",
                border: `1px solid ${glow > 0 ? `rgba(143, 182, 255, ${0.55 * glow})` : "hsl(220, 35%, 17%)"}`,
                boxShadow: glow > 0 ? `0 0 ${24 * glow}px rgba(70, 130, 255, ${0.35 * glow})` : undefined,
            }}
        >
            {ev.key === "added" && (
                <>
                    {head(<Bookmark size={16} color={C.azure400} fill="rgba(124,166,216,0.35)" />, <span>Added to <span style={{ color: C.link }}>Breakouts</span></span>, "12 Jan 2026")}
                    <Mono style={{ display: "block", marginTop: 7, fontSize: 13.5, color: C.textMuted }}>
                        @ ₹118.40 → now <span style={{ color: C.success }}>+20.7%</span> Max <span style={{ color: C.success }}>+30.2%</span>
                    </Mono>
                    <div style={{ marginTop: 7, fontSize: 15.5 }}>VCP, 3 weeks tight. Buy the pivot.</div>
                </>
            )}
            {ev.key === "trade" && (
                <>
                    {head(<ChartCandlestick size={16} color={C.azure400} />, <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: C.link }}>Trade</span><Chip style={{ height: 22, fontSize: 12 }}>long</Chip></span>, "19 Jan 2026")}
                    <Mono style={{ display: "block", marginTop: 9, fontSize: 15, color: C.success }}>
                        +₹16,110.60 &nbsp;+17.3% &nbsp;+2.30R <span style={{ color: C.textMuted }}>&nbsp;5w</span>
                    </Mono>
                </>
            )}
            {ev.key === "note1" && (
                <>
                    {head(<StickyNote size={16} color={C.azure400} />, "Note", "02 Feb 2026")}
                    <div style={{ marginTop: 9, fontSize: 15.5 }}>Added on the 10 DMA pullback.</div>
                </>
            )}
            {ev.key === "note2" && (
                <>
                    {head(<StickyNote size={16} color={C.azure400} />, "Note", "23 Feb 2026")}
                    <div style={{ marginTop: 9, fontSize: 15.5 }}>Closed under the 10 DMA. Out. Clean trend trade.</div>
                </>
            )}
        </div>
    );
};

/** `links` holds every marker-to-card thread lit (for stills like the thumbnail). */
export const SymbolPage: React.FC<{ t: number; links?: boolean }> = ({ t: tIn, links = false }) => {
    const t = !links && tIn >= S.switch && tIn < CUE.whip4[1] + 120 ? tIn : REST;
    const reveal = EASE.swiftOut(clamp(invLerp(S.candles, S.candlesEnd, t))) * n;
    const priceShown = reveal >= n - 0.5;

    const markers: Marker[] = [];
    for (const ev of EVENTS) {
        const p = spring(t - ev.at, 260, 18);
        for (const k of ev.markers) markers.push({ i: ev.i, kind: k, p });
    }
    const highlight = t >= S.highlight ? outCubic(clamp((t - S.highlight) / 14)) * (0.8 + 0.2 * Math.sin((t - S.highlight) / 6)) : 0;

    // Journey list: newest first; each insert pushes older cards down.
    const ins = EVENTS.map((ev) => spring(t - (ev.at + 6), 220, 24));
    const order = [3, 2, 1, 0];
    let y = J.listTop;
    const cardPos: Record<string, number> = {};
    for (const idx of order) {
        cardPos[EVENTS[idx].key] = y;
        y += EVENTS[idx].h * clamp(ins[idx]);
    }

    const lit = (year: number, m: number) => {
        if (year !== 2026) return PRIOR[year]?.[m] ?? 0;
        if (m === 0) return (t >= EVENTS[0].at ? 2 : 0) + (t >= EVENTS[1].at ? 2 : 0);
        if (m === 1) return (t >= EVENTS[2].at ? 2 : 0) + (t >= EVENTS[3].at ? 1 : 0);
        if (m === 2) return t >= S.candlesEnd ? 1 : 0;
        return 0;
    };

    const stats = outCubic(clamp((t - (EVENTS[3].at + 10)) / 24));

    return (
        <AppWindow active="Symbols" crumbs={["Symbols", "IRFC"]}>
            <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 380, height: 40, borderRadius: 8, border: `1px solid ${C.borderSoft}`, display: "flex", alignItems: "center", gap: 10, padding: "0 12px", color: C.placeholder, fontSize: 15 }}>
                    <Search size={17} /> Search a symbol (e.g. RELIANCE, NVDA)
                </div>
                <Btn icon={Bookmark}>Add to watchlist</Btn>
                <Btn icon={NotebookPen}>Add note</Btn>
            </div>

            {/* chart card */}
            <Card style={{ position: "absolute", left: 0, top: 54, width: 880, height: 576 }}>
                <div style={{ position: "absolute", left: 18, top: 16, display: "flex", alignItems: "baseline", gap: 10 }}>
                    <Mono style={{ fontSize: 18, fontWeight: 600 }}>IRFC</Mono>
                    <span style={{ fontSize: 14.5, color: C.textMuted }}>INDIAN RAILWAY FIN CORP L · NSE</span>
                </div>
                <div style={{ position: "absolute", right: 16, top: 14, display: "flex", gap: 16, fontSize: 14, color: C.textMuted, alignItems: "center" }}>
                    <span style={{ display: "flex", gap: 6, alignItems: "center" }}><ChartLine size={15} /> Add indicator <ChevronDown size={14} /></span>
                    <span style={{ display: "flex", gap: 6, alignItems: "center" }}><GitCompareArrows size={15} /> Compare</span>
                    <span style={{ display: "flex", gap: 6, alignItems: "center" }}><SlidersHorizontal size={15} /> Settings <ChevronDown size={14} /></span>
                    <Ellipsis size={16} />
                </div>
                <div style={{ position: "absolute", left: 18, top: 50, display: "flex", alignItems: "baseline", gap: 12, opacity: priceShown ? 1 : 0.35 }}>
                    <Mono style={{ fontSize: 30, fontWeight: 600 }}>₹142.85</Mono>
                    <Mono style={{ fontSize: 16, color: C.success }}>+1.94 (+1.38%)</Mono>
                </div>
                <Mono style={{ position: "absolute", left: 18, top: 96, fontSize: 13, color: C.textMuted }}>
                    1D &nbsp;O 141.10 &nbsp;H 143.20 &nbsp;L 140.62 &nbsp;C 142.85 &nbsp;<span style={{ color: C.success }}>+1.94 (+1.38%)</span> &nbsp;V 2.31Cr
                </Mono>
                <div style={{ position: "absolute", left: 10, top: 128, display: "flex", flexDirection: "column", gap: 14, color: C.textMuted, padding: 6 }}>
                    {[Crosshair, Magnet, Slash, Minus, Undo2, Redo2, Trash2].map((I, k) => (
                        <I key={k} size={17} strokeWidth={1.7} />
                    ))}
                </div>
                <div style={{ position: "absolute", left: 60, top: 124, display: "flex", gap: 8 }}>
                    {[
                        ["MA 10", "#f87171"],
                        ["MA 20", "#34d399"],
                        ["VOL", C.textMuted],
                    ].map(([l, c]) => (
                        <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, height: 24, padding: "0 8px", borderRadius: 6, background: "hsl(224, 40%, 16%)", fontSize: 12, fontFamily: F.mono }}>
                            <span style={{ width: 8, height: 8, borderRadius: 4, background: c }} />
                            {l}
                        </span>
                    ))}
                </div>
            </Card>
            <div style={{ position: "absolute", left: CH.x, top: CH.y }}>
                <CandleChart idPrefix="sym" w={CH.w} h={CH.h} from={CH.from} to={CH.to} reveal={reveal} yMin={CH.yMin} yMax={CH.yMax} volH={CH.volH} ma thread={1} markers={markers} />
            </div>

            {/* this trader's stats on the symbol */}
            <Card style={{ position: "absolute", left: 0, top: 646, width: 880, height: 112, padding: "14px 20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", rowGap: 10 }}>
                {[
                    ["Trades", "4", C.text],
                    ["Win rate", "75%", C.text],
                    ["Net P&L", "+₹21,904.60", C.success],
                    ["Avg gain", "+11.2%", C.success],
                    ["Avg loss", "-3.1%", C.destructive],
                    ["Best", "+17.3%", C.success],
                    ["Worst", "-3.1%", C.destructive],
                    ["Avg hold", "18d", C.text],
                ].map(([l, v, c]) => (
                    <div key={l} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                        <span style={{ fontSize: 13.5, color: C.textMuted, width: 70 }}>{l}</span>
                        <Mono style={{ fontSize: 15.5, color: c, opacity: 0.2 + 0.8 * stats }}>{v}</Mono>
                    </div>
                ))}
            </Card>
            <Card style={{ position: "absolute", left: 0, top: 774, width: 880, bottom: 0, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                {[
                    ["1W", "+2.1%"],
                    ["1M", "-4.4%"],
                    ["3M", "+18.9%"],
                    ["6M", "+7.8%"],
                    ["1Y", "+31.5%"],
                ].map(([l, v]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 13.5, color: C.textMuted }}>{l}</div>
                        <Mono style={{ display: "block", marginTop: 6, fontSize: 16.5, color: v.startsWith("-") ? C.destructive : C.success }}>{v}</Mono>
                    </div>
                ))}
            </Card>

            {/* Journey */}
            <Card style={{ position: "absolute", left: J.x, right: 0, top: 54, bottom: 0, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 18, right: 18, top: 16, display: "flex", alignItems: "center", fontSize: 18, fontWeight: 600 }}>
                    Journey
                    <div style={{ flex: 1 }} />
                    <Eye size={18} color={C.textMuted} />
                </div>
                <div style={{ position: "absolute", left: 18, top: 56, display: "flex", gap: 8 }}>
                    {["All", "Watchlists", "Trades", "Notes"].map((x, i) => (
                        <span key={x} style={{ height: 32, padding: "0 12px", display: "flex", alignItems: "center", borderRadius: 7, fontSize: 14.5, background: i === 0 ? C.primary : "transparent", border: i === 0 ? "none" : `1px solid ${C.borderSubtle}`, color: i === 0 ? C.text : C.textMuted }}>
                            {x}
                        </span>
                    ))}
                </div>
                <div style={{ position: "absolute", left: 18, top: 108 }}>
                    <div style={{ display: "flex", gap: 4, marginLeft: 58, fontSize: 11.5, color: C.textMuted }}>
                        {MONTHS.map((m, i) => (
                            <span key={i} style={{ width: 20, textAlign: "center" }}>
                                {m}
                            </span>
                        ))}
                    </div>
                    {[2026, 2025, 2024, 2023, 2022].map((yr) => (
                        <div key={yr} style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                            <Mono style={{ width: 58, fontSize: 12.5, color: C.textMuted }}>{yr}</Mono>
                            <div style={{ display: "flex", gap: 4 }}>
                                {MONTHS.map((_, m) => {
                                    const v = lit(yr, m);
                                    return <div key={m} style={{ width: 20, height: 20, borderRadius: 4, background: cellColor(v), boxShadow: yr === 2026 && v >= 3 ? "0 0 10px rgba(110,160,255,0.5)" : undefined }} />;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            {EVENTS.map((ev, k) => {
                const p = clamp(ins[k]);
                if (p <= 0.001) return null;
                // The slot opens (clipped) while the card slides in, so the
                // list pushes down without cards ever overlapping.
                return (
                    <div
                        key={ev.key}
                        style={{
                            position: "absolute",
                            left: J.x + 14,
                            right: 14,
                            top: cardPos[ev.key],
                            height: ev.h * p,
                            overflow: "hidden",
                        }}
                    >
                        <div style={{ opacity: clamp(p * 1.4), transform: `translateX(${(1 - p) * 46}px)` }}>
                            <JourneyCard ev={ev} glow={ev.key === "trade" ? highlight : 0} />
                        </div>
                    </div>
                );
            })}

            {/* the thread: each marker reaches across to the card it created */}
            <svg width={1312} height={892} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}>
                <defs>
                    <filter id="sym-link-g" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                </defs>
                {EVENTS.map((ev) => {
                    const draw = links ? 1 : clamp((t - ev.at - 4) / 14);
                    const fade = links ? 0.85 : 1 - clamp((t - ev.at - 26) / 22);
                    if (draw <= 0 || fade <= 0) return null;
                    const c = CANDLES[ev.i];
                    const x0 = cx(ev.i),
                        y0 = ev.above ? cy(c.h) - 26 : cy(c.l) + 26;
                    const x1 = J.x + 14,
                        y1 = (links ? cardPos[ev.key] : J.listTop) + 40;
                    const d = `M${x0},${y0} C${x0 + 160},${y0} ${x1 - 160},${y1} ${x1},${y1}`;
                    const len = 1000;
                    return (
                        <g key={ev.key} opacity={fade}>
                            <path d={d} fill="none" stroke={C.threadGlow} strokeWidth={6} filter="url(#sym-link-g)" strokeDasharray={`${len * draw} ${len}`} />
                            <path d={d} fill="none" stroke={C.threadCore} strokeWidth={1.8} strokeDasharray={`${len * draw} ${len}`} />
                            {draw >= 1 && <circle cx={x1} cy={y1} r={4} fill="#fff" />}
                        </g>
                    );
                })}
            </svg>
        </AppWindow>
    );
};

export const SYM_LOCAL = {
    tradeCard: { x: 260 + J.x + 200, y: 82 + J.listTop + 88 + 88 + 40 },
};
