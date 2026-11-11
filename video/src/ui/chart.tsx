import React from "react";
import { CANDLES, MA10, MA20, type Candle } from "../data/irfc";
import { clamp } from "../lib/ease";
import { C, F } from "../theme";

export type Marker = { i: number; kind: "buy" | "sell" | "add" | "note"; p: number; label?: string };

/**
 * KLineChart-style daily candles, drawn as SVG so every candle can grow in on
 * its own. `reveal` is how many candles are visible (fractional = growing).
 * The close line can be drawn as the luminous "thread".
 */
export const CandleChart: React.FC<{
    w: number;
    h: number;
    from: number;
    to: number;
    reveal: number;
    yMin: number;
    yMax: number;
    volH?: number;
    ma?: boolean;
    thread?: number; // 0..1 opacity of the glowing close line
    markers?: Marker[];
    axis?: boolean;
    data?: Candle[];
    idPrefix: string;
    lastPrice?: boolean;
}> = ({ w, h, from, to, reveal, yMin, yMax, volH = 0, ma = false, thread = 0, markers = [], axis = true, data = CANDLES, idPrefix, lastPrice = true }) => {
    const n = to - from + 1;
    const axisW = axis ? 64 : 0;
    const plotW = w - axisW;
    const step = plotW / n;
    const bodyW = Math.max(1.5, step * 0.62);
    const priceH = h - volH - (volH ? 10 : 0);
    const y = (v: number) => ((yMax - v) / (yMax - yMin)) * priceH;
    const x = (i: number) => (i - from + 0.5) * step;
    const vMax = Math.max(...data.slice(from, to + 1).map((c) => c.v));

    const candles: React.ReactNode[] = [];
    const vols: React.ReactNode[] = [];
    for (let i = from; i <= to; i++) {
        const k = clamp(reveal - (i - from));
        if (k <= 0) break;
        const c = data[i];
        const up = c.c >= c.o;
        const col = up ? C.chartUp : C.chartDown;
        const g = Math.min(1, k * 1.6);
        // body grows out from the open
        const yo = y(c.o),
            yc = y(c.o + (c.c - c.o) * g);
        const top = Math.min(yo, yc),
            bh = Math.max(1, Math.abs(yc - yo));
        const hi = y(c.o + (c.h - c.o) * g),
            lo = y(c.o + (c.l - c.o) * g);
        candles.push(
            <g key={i} opacity={Math.min(1, k * 2)}>
                <line x1={x(i)} x2={x(i)} y1={hi} y2={lo} stroke={col} strokeWidth={1.2} />
                <rect x={x(i) - bodyW / 2} y={top} width={bodyW} height={bh} fill={col} />
            </g>,
        );
        if (volH) {
            const vh = (c.v / vMax) * volH * 0.95 * g;
            vols.push(<rect key={i} x={x(i) - bodyW / 2} y={h - vh} width={bodyW} height={vh} fill={up ? C.chartUpMuted : C.chartDownMuted} />);
        }
    }

    const linePts = (arr: (number | null)[] | null, src: "close" | "ma") => {
        const pts: string[] = [];
        const end = from + reveal - 1;
        for (let i = from; i <= Math.min(to, Math.floor(end)); i++) {
            const v = src === "close" ? data[i].c : arr![i];
            if (v == null) continue;
            pts.push(`${x(i).toFixed(1)},${y(v).toFixed(1)}`);
        }
        // partial last segment for a smooth leading edge
        const fi = Math.floor(end),
            fr = end - fi;
        if (fi + 1 <= to && fr > 0) {
            const a = src === "close" ? data[fi]?.c : arr![fi];
            const b = src === "close" ? data[fi + 1]?.c : arr![fi + 1];
            if (a != null && b != null) pts.push(`${(x(fi) + step * fr).toFixed(1)},${y(a + (b - a) * fr).toFixed(1)}`);
        }
        return pts.join(" ");
    };

    const ticks = 5;
    const last = data[Math.min(to, from + Math.floor(reveal) - 1)] ?? data[from];

    return (
        <svg width={w} height={h} style={{ overflow: "visible", display: "block" }}>
            <defs>
                <filter id={`${idPrefix}-g`} x="-10%" y="-30%" width="120%" height="160%">
                    <feGaussianBlur stdDeviation="4" />
                </filter>
            </defs>
            {axis &&
                Array.from({ length: ticks }, (_, k) => {
                    const v = yMin + ((yMax - yMin) * (k + 0.5)) / ticks;
                    return (
                        <g key={k}>
                            <line x1={0} x2={plotW} y1={y(v)} y2={y(v)} stroke="hsl(220, 35%, 14%)" strokeWidth={1} />
                            <text x={plotW + 10} y={y(v) + 4} fill={C.textSubtle} fontSize={12} fontFamily={F.mono}>
                                {v.toFixed(2)}
                            </text>
                        </g>
                    );
                })}
            <g>{vols}</g>
            <g>{candles}</g>
            {ma && reveal > 1 && (
                <>
                    <polyline points={linePts(MA10, "ma")} fill="none" stroke="#f87171" strokeWidth={1.4} opacity={0.85} />
                    <polyline points={linePts(MA20, "ma")} fill="none" stroke="#34d399" strokeWidth={1.4} opacity={0.85} />
                </>
            )}
            {thread > 0 && reveal > 1 && (
                <g opacity={thread}>
                    <polyline points={linePts(null, "close")} fill="none" stroke={C.threadGlow} strokeWidth={6} filter={`url(#${idPrefix}-g)`} opacity={0.9} />
                    <polyline points={linePts(null, "close")} fill="none" stroke={C.thread} strokeWidth={2} strokeLinejoin="round" />
                </g>
            )}
            {axis && lastPrice && reveal > 1 && (
                <g>
                    <line x1={0} x2={plotW} y1={y(last.c)} y2={y(last.c)} stroke={last.c >= last.o ? C.chartUp : C.chartDown} strokeDasharray="4 4" strokeWidth={1} opacity={0.7} />
                    <rect x={plotW + 2} y={y(last.c) - 11} width={60} height={22} rx={3} fill={last.c >= last.o ? "#16a34a" : "#dc2626"} />
                    <text x={plotW + 32} y={y(last.c) + 4.5} fill="#fff" fontSize={12.5} fontFamily={F.mono} textAnchor="middle">
                        {last.c.toFixed(2)}
                    </text>
                </g>
            )}
            {markers.map((m, k) => {
                if (m.p <= 0) return null;
                const c = data[m.i];
                const above = m.kind === "sell" || m.kind === "note";
                const yy = above ? y(c.h) - 26 : y(c.l) + 26;
                const drop = (1 - clamp(m.p)) * (above ? -40 : 40);
                const fill = m.kind === "buy" ? "#16a34a" : m.kind === "sell" ? "#dc2626" : "hsl(224, 60%, 30%)";
                return (
                    <g key={k} transform={`translate(${x(m.i)}, ${yy + drop})`} opacity={clamp(m.p * 2)}>
                        <line x1={0} x2={0} y1={above ? 12 : -12} y2={above ? 22 : -22} stroke={fill} strokeWidth={1.2} strokeDasharray="2 2" />
                        <rect x={-12} y={-12} width={24} height={24} rx={5} fill={fill} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
                        <text x={0} y={4.5} fill="#fff" fontSize={12} fontFamily={F.ui} fontWeight={700} textAnchor="middle">
                            {m.kind === "buy" ? "B" : m.kind === "sell" ? "S" : m.kind === "add" ? "+" : "✎"}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};
