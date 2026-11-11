import React from "react";
import { ChevronDown, Filter, LayoutGrid, Plus } from "lucide-react";
import { CUE } from "../cues";
import { clamp, EASE, invLerp, spring } from "../lib/ease";
import { gauss, mulberry32 } from "../lib/random";
import { C, F } from "../theme";
import { AppWindow, Btn, Card, Chip, Mono, inr } from "../ui/kit";

const S = CUE.ins;
const REST = 99999;

// Cumulative net P&L, Oct 2025 to Mar 2026, with one real drawdown in it.
const EQUITY = (() => {
    const r = mulberry32(42);
    const n = 120;
    const pts: number[] = [];
    let v = 0;
    for (let i = 0; i < n; i++) {
        const u = i / (n - 1);
        let drift = 760;
        if (u > 0.28 && u < 0.43) drift = -820; // the December drawdown
        if (u > 0.55 && u < 0.75) drift = 1250; // the IRFC run
        v += drift + gauss(r) * 900;
        pts.push(v);
    }
    const end = pts[n - 1];
    return pts.map((p) => (p / end) * 68402.1);
})();
const EMIN = Math.min(...EQUITY),
    EMAX = Math.max(...EQUITY);

const MONTHS = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"];

const INSIGHTS = [
    { tone: "green", head: "What's working", title: "Your edge is in 1 day to 1 month trades", body: (k: number) => <><Mono style={{ color: C.success }}>{Math.round(92 * k)}%</Mono> of your profits come from this range.</>, cta: "Focus more on swing trades" },
    { tone: "red", head: "What's hurting", title: "You overtrade at 9–10 AM", body: () => <>You take more trades during this hour, but they underperform your average.</>, cta: "Be more selective during this hour" },
    { tone: "green", head: "What's working", title: "Breakout is your best setup", body: (k: number) => <><Mono style={{ color: C.success }}>+{(2.1 * k).toFixed(1)}R</Mono> average across 18 trades.</>, cta: "Size up on Breakout" },
];

export const Insights: React.FC<{ t: number }> = ({ t: tIn }) => {
    const t = tIn >= S.switch && tIn < CUE.whip6[1] + 120 ? tIn : REST;
    const k = EASE.swiftOut(clamp(invLerp(S.kpis, S.kpis + 60, t)));
    const draw = EASE.glide(clamp(invLerp(S.curve, S.curve + 104, t)));

    const W = 690,
        H = 560;
    const X = (i: number) => (i / (EQUITY.length - 1)) * W;
    const Y = (v: number) => H - 30 - ((v - EMIN) / (EMAX - EMIN)) * (H - 80);
    const nShown = draw * (EQUITY.length - 1);
    const pts: string[] = [];
    for (let i = 0; i <= Math.floor(nShown); i++) pts.push(`${X(i).toFixed(1)},${Y(EQUITY[i]).toFixed(1)}`);
    const fi = Math.floor(nShown),
        fr = nShown - fi;
    let hx = X(fi),
        hy = Y(EQUITY[fi]);
    if (fi + 1 < EQUITY.length && fr > 0) {
        hx = X(fi + fr);
        hy = Y(EQUITY[fi] + (EQUITY[fi + 1] - EQUITY[fi]) * fr);
        pts.push(`${hx.toFixed(1)},${hy.toFixed(1)}`);
    }
    // drawdown band (peak to trough in December)
    let peak = 0,
        ddStart = 0,
        ddEnd = 0,
        worst = 0;
    for (let i = 0; i < EQUITY.length; i++) {
        if (EQUITY[i] > EQUITY[peak]) peak = i;
        const dd = EQUITY[peak] - EQUITY[i];
        if (dd > worst) {
            worst = dd;
            ddStart = peak;
            ddEnd = i;
        }
    }

    return (
        <AppWindow active="Dashboard" crumbs={["Dashboard"]}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Btn>
                    Net ₹ <ChevronDown size={15} />
                </Btn>
                <Btn icon={Filter}>Filters</Btn>
                <div style={{ flex: 1 }} />
                <Btn icon={LayoutGrid}>Edit layout</Btn>
                <Btn kind="primary" icon={Plus}>
                    Add widget
                </Btn>
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
                <Card style={{ flex: 1, height: 118, padding: "14px 16px" }}>
                    <div style={{ fontSize: 14, color: C.textMuted }}>Net P&amp;L</div>
                    <Mono style={{ display: "block", fontSize: 28, fontWeight: 600, color: C.success, marginTop: 8 }}>+{inr(68402.1 * k)}</Mono>
                    <div style={{ marginTop: 10, height: 7, borderRadius: 4, background: "hsl(224, 40%, 20%)" }}>
                        <div style={{ width: `${76 * k}%`, height: "100%", borderRadius: 4, background: C.primary }} />
                    </div>
                </Card>
                <Card style={{ flex: 1, height: 118, padding: "14px 16px" }}>
                    <div style={{ fontSize: 14, color: C.textMuted }}>Win rate</div>
                    <Mono style={{ display: "block", fontSize: 28, fontWeight: 600, marginTop: 8 }}>{(54.8 * k).toFixed(1)}%</Mono>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <Chip tone="green" style={{ height: 22, fontSize: 12 }}>
                            <Mono>{Math.round(23 * k)} W</Mono>
                        </Chip>
                        <Chip tone="red" style={{ height: 22, fontSize: 12 }}>
                            <Mono>{Math.round(19 * k)} L</Mono>
                        </Chip>
                    </div>
                </Card>
                <Card style={{ flex: 1, height: 118, padding: "14px 16px" }}>
                    <div style={{ fontSize: 14, color: C.textMuted }}>Profit factor</div>
                    <Mono style={{ display: "block", fontSize: 28, fontWeight: 600, marginTop: 8 }}>{(1.76 * k).toFixed(2)}</Mono>
                </Card>
                <Card style={{ flex: 1, height: 118, padding: "14px 16px" }}>
                    <div style={{ fontSize: 14, color: C.textMuted }}>Avg R</div>
                    <Mono style={{ display: "block", fontSize: 28, fontWeight: 600, marginTop: 8, color: C.success }}>+{(0.58 * k).toFixed(2)}R</Mono>
                </Card>
            </div>

            <Card style={{ position: "absolute", left: 0, top: 192, width: 790, bottom: 0, padding: "16px 22px", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 16 }}>Equity curve</span>
                    <div style={{ flex: 1 }} />
                    {[
                        ["Cash flow", C.thread],
                        ["Drawdowns", C.loss],
                    ].map(([l, c]) => (
                        <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 16, fontSize: 13, color: C.textMuted }}>
                            <span style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                            {l}
                        </span>
                    ))}
                </div>
                <svg width={W} height={H} style={{ marginTop: 22, marginLeft: 44, overflow: "visible" }}>
                    <defs>
                        <linearGradient id="eq-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(80, 130, 255, 0.28)" />
                            <stop offset="100%" stopColor="rgba(80, 130, 255, 0)" />
                        </linearGradient>
                        <filter id="eq-g" x="-10%" y="-30%" width="120%" height="160%">
                            <feGaussianBlur stdDeviation="5" />
                        </filter>
                    </defs>
                    {[0, 1, 2, 3, 4].map((g) => {
                        const v = EMIN + ((EMAX - EMIN) * g) / 4;
                        return (
                            <g key={g}>
                                <line x1={0} x2={W} y1={Y(v)} y2={Y(v)} stroke="hsl(220, 35%, 15%)" />
                                <text x={-10} y={Y(v) + 4} fill={C.textSubtle} fontSize={12} fontFamily={F.mono} textAnchor="end">
                                    {v < 0 ? "-" : ""}₹{Math.abs(v / 1000).toFixed(0)}k
                                </text>
                            </g>
                        );
                    })}
                    {MONTHS.map((m, i) => (
                        <text key={m} x={(i / (MONTHS.length - 1)) * W} y={H + 4} fill={C.textSubtle} fontSize={12} fontFamily={F.mono} textAnchor={i === 0 ? "start" : i === MONTHS.length - 1 ? "end" : "middle"}>
                            {m}
                        </text>
                    ))}
                    {nShown > ddEnd && (
                        <rect x={X(ddStart)} y={Y(EQUITY[ddStart])} width={X(ddEnd) - X(ddStart)} height={Y(EQUITY[ddEnd]) - Y(EQUITY[ddStart])} fill="rgba(239, 68, 68, 0.12)" stroke="rgba(239, 68, 68, 0.45)" strokeDasharray="4 4" />
                    )}
                    {nShown > 1 && <path d={`M0,${Y(EQUITY[0])} L${pts.join(" L")} L${hx},${H - 30} L0,${H - 30} Z`} fill="url(#eq-fill)" />}
                    <polyline points={pts.join(" ")} fill="none" stroke={C.threadGlow} strokeWidth={7} filter="url(#eq-g)" opacity={0.9} />
                    <polyline points={pts.join(" ")} fill="none" stroke={C.thread} strokeWidth={2.4} strokeLinejoin="round" />
                    {draw > 0 && draw < 1 && (
                        <>
                            <circle cx={hx} cy={hy} r={16} fill="rgba(110, 160, 255, 0.3)" />
                            <circle cx={hx} cy={hy} r={5} fill="#fff" />
                        </>
                    )}
                </svg>
            </Card>

            <div style={{ position: "absolute", left: 806, right: 0, top: 192, bottom: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {INSIGHTS.map((ins, i) => {
                    const p = spring(t - (S.cards + i * S.cardEvery), 200, 22);
                    const kk = clamp(invLerp(S.cards + i * S.cardEvery + 6, S.cards + i * S.cardEvery + 46, t));
                    return (
                        <Card
                            key={i}
                            style={{
                                flex: 1,
                                padding: "16px 18px",
                                opacity: clamp(p * 1.4),
                                transform: `translateX(${(1 - Math.min(1, p)) * 60}px)`,
                                borderLeft: `3px solid ${ins.tone === "green" ? "hsl(150, 60%, 40%)" : "hsl(357, 60%, 52%)"}`,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textMuted }}>
                                <span style={{ width: 8, height: 8, borderRadius: 4, background: ins.tone === "green" ? C.success : C.destructive }} />
                                {ins.head}
                            </div>
                            <div style={{ fontSize: 19, fontWeight: 600, marginTop: 10, lineHeight: 1.3 }}>{ins.title}</div>
                            <div style={{ fontSize: 15.5, color: C.textMuted, marginTop: 8, lineHeight: 1.45 }}>{ins.body(EASE.swiftOut(kk))}</div>
                            <div style={{ marginTop: 12 }}>
                                <Chip style={{ height: 28, fontSize: 13 }}>{ins.cta}</Chip>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </AppWindow>
    );
};
