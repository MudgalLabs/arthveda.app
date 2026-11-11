import { gauss, mulberry32 } from "../lib/random";

// Crafted IRFC daily candles, Oct 2025 to Mar 2026: a downtrend, a three-step
// volatility contraction, the breakout the trader buys, a 10 DMA add, and the
// exit when price loses the 20 DMA. Shapes are scripted; the noise is seeded.

export type Candle = { o: number; h: number; l: number; c: number; v: number; date: Date };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const fmtDate = (d: Date) => `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const fmtMonth = (d: Date) => MONTHS[d.getUTCMonth()];

function businessDays(start: Date, count: number): Date[] {
    const out: Date[] = [];
    const d = new Date(start.getTime());
    while (out.length < count) {
        const wd = d.getUTCDay();
        if (wd !== 0 && wd !== 6) out.push(new Date(d.getTime()));
        d.setUTCDate(d.getUTCDate() + 1);
    }
    return out;
}

const N = 124;
export const DATES = businessDays(new Date(Date.UTC(2025, 9, 1)), N);
export const dayOf = (y: number, m: number, d: number) =>
    DATES.findIndex((x) => x.getUTCFullYear() === y && x.getUTCMonth() === m - 1 && x.getUTCDate() === d);

// [day index, close, daily volatility %]
const ANCHORS: [number, number, number][] = [
    [0, 132.4, 1.6],
    [9, 127.1, 1.5],
    [21, 117.3, 1.8],
    [29, 109.6, 1.9],
    [37, 104.2, 1.7],
    [45, 113.4, 1.3],
    [51, 107.6, 1.1],
    [58, 116.1, 0.9],
    [63, 111.9, 0.7],
    [70, 118.2, 0.45],
    [77, 118.9, 0.35],
    [78, 122.6, 0.9],
    [84, 131.4, 1.0],
    [88, 128.0, 0.8],
    [95, 141.2, 1.1],
    [100, 152.4, 1.2],
    [103, 145.6, 1.2],
    [108, 139.6, 1.1],
    [114, 145.2, 0.9],
    [119, 140.4, 0.9],
    [122, 140.91, 0.7],
    [123, 142.85, 0.6],
];

function build(): Candle[] {
    const rnd = mulberry32(73);
    const closes: number[] = [];
    const vols: number[] = [];
    for (let a = 0; a < ANCHORS.length - 1; a++) {
        const [d0, c0, v0] = ANCHORS[a];
        const [d1, c1, v1] = ANCHORS[a + 1];
        for (let d = d0; d < d1; d++) {
            const u = (d - d0) / (d1 - d0);
            const s = u * u * (3 - 2 * u);
            closes[d] = c0 + (c1 - c0) * s;
            vols[d] = v0 + (v1 - v0) * u;
        }
    }
    closes[N - 1] = ANCHORS[ANCHORS.length - 1][1];
    vols[N - 1] = ANCHORS[ANCHORS.length - 1][2];

    // Smooth noise on top of the scripted path (pinned anchors stay exact).
    const pinned = new Set(ANCHORS.map((a) => a[0]));
    let drift = 0;
    for (let d = 0; d < N; d++) {
        drift = drift * 0.55 + gauss(rnd) * vols[d] * 0.006;
        if (!pinned.has(d)) closes[d] *= 1 + drift;
    }

    const out: Candle[] = [];
    for (let d = 0; d < N; d++) {
        const c = closes[d];
        const prev = d === 0 ? c * 0.996 : closes[d - 1];
        const vol = vols[d] / 100;
        const o = prev * (1 + gauss(rnd) * vol * 0.35);
        const hi = Math.max(o, c) * (1 + Math.abs(gauss(rnd)) * vol * 0.55);
        const lo = Math.min(o, c) * (1 - Math.abs(gauss(rnd)) * vol * 0.55);
        let v = 0.55 + rnd() * 0.5;
        if (d >= 70 && d <= 77) v *= 0.55; // volume dries up in the tight base
        if (d === 78) v = 2.6; // breakout day
        if (d === 79) v = 1.7;
        if (d >= 95 && d <= 100) v *= 1.35;
        if (d === 103) v = 1.5;
        out.push({ o, h: hi, l: lo, c, v, date: DATES[d] });
    }
    return out;
}

export const CANDLES = build();

export function sma(n: number): (number | null)[] {
    return CANDLES.map((_, i) => {
        if (i < n - 1) return null;
        let s = 0;
        for (let k = i - n + 1; k <= i; k++) s += CANDLES[k].c;
        return s / n;
    });
}

export const MA10 = sma(10);
export const MA20 = sma(20);

export const D = {
    added: dayOf(2026, 1, 12),
    entry: dayOf(2026, 1, 19),
    add: dayOf(2026, 2, 2),
    exit: dayOf(2026, 2, 23),
};

export const LAST = CANDLES[N - 1];
export const PREV = CANDLES[N - 2];
