import React from "react";
import { ArrowDownRight, ArrowUpRight, CalendarPlus, ChevronDown, Download, Pencil, Plus, Share2, StickyNote, Trash2, TrendingUp } from "lucide-react";
import { CUE } from "../cues";
import { CANDLES, D } from "../data/irfc";
import { clamp, EASE, invLerp, outCubic, spring } from "../lib/ease";
import { C, F } from "../theme";
import { AppWindow, Btn, Card, Mono } from "../ui/kit";

const S = CUE.wl;
const REST = 99999;

const ADD_PRICE = 118.4;
const after = CANDLES.slice(D.added);
const NOW = (CANDLES[CANDLES.length - 1].c / ADD_PRICE - 1) * 100;
const MAXG = (Math.max(...after.map((c) => c.h)) / ADD_PRICE - 1) * 100;
const MAXDD = (Math.min(...after.map((c) => c.l)) / ADD_PRICE - 1) * 100;

const OTHERS = [
    { s: "KAYNES", added: "06 Jan 2026", at: "₹5,620.00", now: 14.1, mg: 17.9, dd: -3.6 },
    { s: "HAL", added: "05 Jan 2026", at: "₹4,534.50", now: 6.2, mg: 9.8, dd: -2.4 },
    { s: "BEL", added: "29 Dec 2025", at: "₹399.90", now: 3.1, mg: 7.7, dd: -4.0 },
    { s: "CDSL", added: "18 Dec 2025", at: "₹1,793.00", now: -2.8, mg: 4.1, dd: -8.3 },
    { s: "POLYCAB", added: "11 Dec 2025", at: "₹6,940.00", now: 5.5, mg: 8.9, dd: -5.2 },
    { s: "TRENT", added: "02 Dec 2025", at: "₹6,210.00", now: -4.7, mg: 3.3, dd: -11.6 },
    { s: "ANGELONE", added: "24 Nov 2025", at: "₹2,705.00", now: 8.4, mg: 12.6, dd: -6.9 },
];

const pct = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`;
const col = (v: number) => (v >= 0 ? C.success : C.destructive);

const COLS = [176, 170, 100, 110, 100];

const Kpi: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
    <Card style={{ flex: 1, height: 92, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: "hsl(224, 45%, 18%)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <div>
            <div style={{ fontSize: 13.5, color: C.textMuted }}>{label}</div>
            <div style={{ fontSize: 24, marginTop: 4, fontFamily: F.mono, fontWeight: 500 }}>{value}</div>
        </div>
    </Card>
);

export const Watchlist: React.FC<{ t: number }> = ({ t: tIn }) => {
    const t = tIn >= S.switch && tIn < CUE.whip3[1] + 120 ? tIn : REST;
    const rowIn = spring(t - S.row, 200, 22);
    const k = EASE.glide(clamp(invLerp(S.count, S.count + 96, t)));
    const note = outCubic(clamp((t - S.note) / 18));

    const avg = (vals: number[]) => vals.reduce((a, b) => a + b, 0) / vals.length;
    const withIrfc = (f: (o: (typeof OTHERS)[number]) => number, irfc: number) => avg([irfc * k, ...OTHERS.map(f)]);
    const shownAvgNow = rowIn > 0.5 ? withIrfc((o) => o.now, NOW) : avg(OTHERS.map((o) => o.now));
    const shownAvgMg = rowIn > 0.5 ? withIrfc((o) => o.mg, MAXG) : avg(OTHERS.map((o) => o.mg));
    const shownAvgDd = rowIn > 0.5 ? withIrfc((o) => o.dd, MAXDD) : avg(OTHERS.map((o) => o.dd));

    // Since-added chart: closes from the add date, revealed as the time-lapse runs.
    const from = D.added - 12;
    const to = CANDLES.length - 1;
    const n = to - from;
    const reveal = 12 + (n - 12) * k;
    const W = 590,
        H = 470;
    const yMin = 108,
        yMax = 158;
    const X = (i: number) => ((i - from) / n) * W;
    const Y = (v: number) => H - ((v - yMin) / (yMax - yMin)) * H;
    const pts: string[] = [];
    for (let i = from; i <= from + Math.floor(reveal); i++) pts.push(`${X(i).toFixed(1)},${Y(CANDLES[i].c).toFixed(1)}`);
    const fi = from + Math.floor(reveal),
        fr = reveal - Math.floor(reveal);
    let headX = X(fi),
        headY = Y(CANDLES[fi].c);
    if (fi + 1 <= to && fr > 0) {
        headX = X(fi) + (X(fi + 1) - X(fi)) * fr;
        headY = Y(CANDLES[fi].c + (CANDLES[fi + 1].c - CANDLES[fi].c) * fr);
        pts.push(`${headX.toFixed(1)},${headY.toFixed(1)}`);
    }
    const addX = X(D.added),
        addY = Y(ADD_PRICE);

    return (
        <AppWindow active="Watchlists" crumbs={["Watchlists", "Breakouts"]}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ height: 38, width: 170, borderRadius: 8, border: `1px solid ${C.borderSoft}`, background: C.bg2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", fontSize: 15 }}>
                    Breakouts <ChevronDown size={16} color={C.textMuted} />
                </div>
                <Btn kind="primary" icon={Plus}>
                    Add Symbol
                </Btn>
                <Btn icon={Pencil}>Rename</Btn>
                <Btn icon={Trash2}>Delete</Btn>
                <Btn icon={Share2}>Share</Btn>
                <Btn icon={Download}>Export</Btn>
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
                <Kpi icon={<TrendingUp size={20} color={C.azure400} />} label="Avg Now" value={<span style={{ color: col(shownAvgNow) }}>{pct(shownAvgNow)}</span>} />
                <Kpi icon={<ArrowUpRight size={20} color={C.azure400} />} label="Avg Max Gain" value={<span style={{ color: C.success }}>{pct(shownAvgMg)}</span>} />
                <Kpi icon={<ArrowDownRight size={20} color={C.azure400} />} label="Avg Max DD" value={<span style={{ color: C.destructive }}>{pct(shownAvgDd)}</span>} />
                <Kpi icon={<CalendarPlus size={20} color={C.azure400} />} label="Added This Week" value={rowIn > 0.5 ? "1" : "0"} />
            </div>

            {/* table */}
            <div style={{ position: "absolute", left: 0, top: 168, width: 676, bottom: 0, border: `1px solid ${C.borderSubtle}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: 42, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13.5, color: C.textMuted, borderBottom: `1px solid ${C.borderSubtle}`, background: "hsl(223, 45%, 10%)" }}>
                    {["Symbol", "Added", "Now", "Max Gain", "Max DD"].map((h, i) => (
                        <span key={h} style={{ width: COLS[i], textAlign: i > 1 ? "right" : "left" }}>
                            {h}
                        </span>
                    ))}
                </div>
                <div style={{ position: "relative" }}>
                    {/* the new row slides in at the top and pushes the rest down */}
                    <div style={{ height: 72 * clamp(rowIn), overflow: "visible", position: "relative" }}>
                        {rowIn > 0.001 && (
                            <div
                                style={{
                                    height: 72,
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 16px",
                                    background: `rgba(70, 105, 220, ${0.2})`,
                                    borderBottom: `1px solid hsl(220, 35%, 15%)`,
                                    transform: `translateY(${(1 - rowIn) * -30}px)`,
                                    opacity: clamp(rowIn * 1.4),
                                    position: "relative",
                                }}
                            >
                                <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 3, borderRadius: 2, background: C.thread, boxShadow: `0 0 12px ${C.threadGlow}` }} />
                                <Mono style={{ width: COLS[0], color: C.link, fontSize: 16, fontWeight: 500 }}>IRFC</Mono>
                                <div style={{ width: COLS[1] }}>
                                    <div style={{ fontSize: 14.5 }}>12 Jan 2026</div>
                                    <Mono style={{ fontSize: 13, color: C.textMuted }}>@ ₹118.40</Mono>
                                </div>
                                <Mono style={{ width: COLS[2], textAlign: "right", fontSize: 16, color: col(NOW * k) }}>{pct(NOW * k)}</Mono>
                                <Mono style={{ width: COLS[3], textAlign: "right", fontSize: 16, color: C.success }}>{pct(MAXG * k)}</Mono>
                                <Mono style={{ width: COLS[4], textAlign: "right", fontSize: 16, color: C.destructive }}>{pct(MAXDD * Math.min(1, k * 3))}</Mono>
                            </div>
                        )}
                    </div>
                    {OTHERS.map((o) => (
                        <div key={o.s} style={{ height: 72, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: `1px solid hsl(220, 35%, 15%)` }}>
                            <Mono style={{ width: COLS[0], color: C.link, fontSize: 16, fontWeight: 500 }}>{o.s}</Mono>
                            <div style={{ width: COLS[1] }}>
                                <div style={{ fontSize: 14.5 }}>{o.added}</div>
                                <Mono style={{ fontSize: 13, color: C.textMuted }}>@ {o.at}</Mono>
                            </div>
                            <Mono style={{ width: COLS[2], textAlign: "right", fontSize: 16, color: col(o.now) }}>{pct(o.now)}</Mono>
                            <Mono style={{ width: COLS[3], textAlign: "right", fontSize: 16, color: C.success }}>{pct(o.mg)}</Mono>
                            <Mono style={{ width: COLS[4], textAlign: "right", fontSize: 16, color: C.destructive }}>{pct(o.dd)}</Mono>
                        </div>
                    ))}
                </div>
            </div>

            {/* since-added chart + the reason */}
            <Card style={{ position: "absolute", left: 692, right: 0, top: 168, bottom: 0, padding: "16px 18px", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <Mono style={{ fontSize: 18, fontWeight: 600 }}>IRFC</Mono>
                    <span style={{ fontSize: 14, color: C.textMuted }}>since added · 12 Jan 2026</span>
                    <div style={{ flex: 1 }} />
                    <Mono style={{ fontSize: 22, fontWeight: 600, color: col(NOW * k) }}>{pct(NOW * k)}</Mono>
                </div>
                <svg width={W} height={H} style={{ marginTop: 18, overflow: "visible" }}>
                    <defs>
                        <linearGradient id="wl-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(73, 224, 136, 0.28)" />
                            <stop offset="100%" stopColor="rgba(73, 224, 136, 0)" />
                        </linearGradient>
                        <filter id="wl-g" x="-10%" y="-30%" width="120%" height="160%">
                            <feGaussianBlur stdDeviation="4" />
                        </filter>
                    </defs>
                    {[0.2, 0.4, 0.6, 0.8].map((g) => (
                        <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="hsl(220, 35%, 15%)" />
                    ))}
                    <line x1={0} x2={W} y1={addY} y2={addY} stroke="rgba(143, 182, 255, 0.45)" strokeDasharray="5 5" />
                    {k > 0 && <path d={`M${addX},${addY} L${pts.filter((_, i) => i >= D.added - from).join(" L")} L${headX},${addY} Z`} fill="url(#wl-fill)" />}
                    <polyline points={pts.slice(0, D.added - from + 1).join(" ")} fill="none" stroke={C.textSubtle} strokeWidth={1.8} />
                    {k > 0 && (
                        <>
                            <polyline points={pts.slice(D.added - from).join(" ")} fill="none" stroke={C.threadGlow} strokeWidth={6} filter="url(#wl-g)" opacity={0.9} />
                            <polyline points={pts.slice(D.added - from).join(" ")} fill="none" stroke={C.thread} strokeWidth={2.2} strokeLinejoin="round" />
                            <circle cx={headX} cy={headY} r={5} fill="#fff" />
                            <circle cx={headX} cy={headY} r={14} fill="rgba(110, 160, 255, 0.35)" />
                        </>
                    )}
                    <g transform={`translate(${addX}, ${addY})`}>
                        <circle r={9} fill={C.primary} stroke="#cfe0ff" strokeWidth={2} />
                        <text x={0} y={-18} fill={C.textMuted} fontSize={12.5} fontFamily={F.mono} textAnchor="middle">
                            added ₹118.40
                        </text>
                    </g>
                </svg>
                <div
                    style={{
                        marginTop: 20,
                        padding: "14px 16px",
                        borderRadius: 10,
                        background: "hsl(225, 40%, 15%)",
                        border: `1px solid rgba(143, 182, 255, ${0.2 + 0.3 * note})`,
                        opacity: note,
                        transform: `translateY(${(1 - note) * 10}px)`,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: C.textMuted }}>
                        <StickyNote size={15} /> Note when added
                    </div>
                    <div style={{ marginTop: 8, fontSize: 19, lineHeight: 1.35 }}>VCP, 3 weeks tight. Buy the pivot.</div>
                </div>
            </Card>
        </AppWindow>
    );
};
