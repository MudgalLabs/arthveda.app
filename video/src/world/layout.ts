// The world: eight app screens on a 3x3 grid around the logo, joined by a
// circuit (the "bus") that the pulse travels. World units are CSS px at zoom 1.

export const PW = 1600;
export const PH = 1000;
export const GAP = 140;
export const SX = PW + GAP;
export const SY = PH + GAP;

export type CellId = "MM" | "SCR" | "WL" | "SYM" | "TRD" | "INS" | "AI" | "PRO";

export const CELLS: Record<CellId, { x: number; y: number }> = {
    MM: { x: -SX, y: -SY },
    SCR: { x: 0, y: -SY },
    WL: { x: SX, y: -SY },
    SYM: { x: SX, y: 0 },
    TRD: { x: SX, y: SY },
    INS: { x: 0, y: SY },
    AI: { x: -SX, y: SY },
    PRO: { x: -SX, y: 0 },
};

export const ORDER: CellId[] = ["MM", "SCR", "WL", "SYM", "TRD", "INS", "AI", "PRO"];

/** Bus rectangle (inner gutters around the logo). */
export const BX = PW / 2 + GAP / 2; // 870
export const BY = PH / 2 + GAP / 2; // 570
/** Where the panel edges sit, facing the bus. */
export const EX = PW / 2 + GAP; // 940
export const EY = PH / 2 + GAP; // 640

/** Port on each panel: the point where the bus meets the screen. */
export const PORT: Record<CellId, { x: number; y: number }> = {
    MM: { x: -EX, y: -EY },
    SCR: { x: 0, y: -EY },
    WL: { x: EX, y: -EY },
    SYM: { x: EX, y: 0 },
    TRD: { x: EX, y: EY },
    INS: { x: 0, y: EY },
    AI: { x: -EX, y: EY },
    PRO: { x: -EX, y: 0 },
};

/** Logo apex (top of the A) in world coords. */
export const APEX = { x: 0, y: -232 };

type P = { x: number; y: number };
const p = (x: number, y: number): P => ({ x, y });

/** The pulse route, leg by leg (each leg is a polyline). */
export const LEGS: P[][] = [
    [APEX, p(0, -BY), p(-BX, -BY), PORT.MM],
    [PORT.MM, p(-BX, -BY), p(0, -BY), PORT.SCR],
    [PORT.SCR, p(0, -BY), p(BX, -BY), PORT.WL],
    [PORT.WL, p(BX, -BY), p(BX, 0), PORT.SYM],
    [PORT.SYM, p(BX, 0), p(BX, BY), PORT.TRD],
    [PORT.TRD, p(BX, BY), p(0, BY), PORT.INS],
    [PORT.INS, p(0, BY), p(-BX, BY), PORT.AI],
    [PORT.AI, p(-BX, BY), p(-BX, 0), PORT.PRO],
    [PORT.PRO, p(-BX, 0), p(-BX, -BY), p(0, -BY), APEX],
];

/** Static circuit drawn faintly in the wide shot. */
export const BUS_LOOP: P[] = [p(-BX, -BY), p(BX, -BY), p(BX, BY), p(-BX, BY), p(-BX, -BY)];
export const SPOKES: P[][] = [
    [p(-BX, -BY), PORT.MM],
    [p(0, -BY), PORT.SCR],
    [p(BX, -BY), PORT.WL],
    [p(BX, 0), PORT.SYM],
    [p(BX, BY), PORT.TRD],
    [p(0, BY), PORT.INS],
    [p(-BX, BY), PORT.AI],
    [p(-BX, 0), PORT.PRO],
    [p(0, -BY), APEX],
];

/** Dense samples along a polyline with rounded interior corners. */
export function samplePolyline(pts: P[], radius = 56, step = 8): P[] {
    const out: P[] = [];
    const seg = (a: P, b: P) => {
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        const n = Math.max(1, Math.ceil(len / step));
        for (let i = 0; i < n; i++) out.push({ x: a.x + ((b.x - a.x) * i) / n, y: a.y + ((b.y - a.y) * i) / n });
    };
    let cur = pts[0];
    for (let i = 1; i < pts.length; i++) {
        const b = pts[i];
        const next = pts[i + 1];
        if (!next) {
            seg(cur, b);
            cur = b;
            continue;
        }
        const d1 = Math.hypot(b.x - cur.x, b.y - cur.y);
        const d2 = Math.hypot(next.x - b.x, next.y - b.y);
        const r = Math.min(radius, d1 / 2, d2 / 2);
        const u1 = { x: (b.x - cur.x) / d1, y: (b.y - cur.y) / d1 };
        const u2 = { x: (next.x - b.x) / d2, y: (next.y - b.y) / d2 };
        const a1 = { x: b.x - u1.x * r, y: b.y - u1.y * r };
        const a2 = { x: b.x + u2.x * r, y: b.y + u2.y * r };
        seg(cur, a1);
        // quadratic corner through the vertex
        const n = 8;
        for (let k = 0; k < n; k++) {
            const t = k / n;
            out.push({
                x: (1 - t) * (1 - t) * a1.x + 2 * (1 - t) * t * b.x + t * t * a2.x,
                y: (1 - t) * (1 - t) * a1.y + 2 * (1 - t) * t * b.y + t * t * a2.y,
            });
        }
        cur = a2;
    }
    out.push(cur);
    return out;
}

/** The full pulse route as one sampled path with arc length + stop positions. */
function buildRoute() {
    const pts: P[] = [];
    const stops: number[] = [0];
    for (const leg of LEGS) {
        const s = samplePolyline(leg);
        if (pts.length) s.shift();
        pts.push(...s);
        stops.push(pts.length - 1);
    }
    const len: number[] = [0];
    for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    return { pts, len, stopS: stops.map((i) => len[i]) };
}

export const ROUTE = buildRoute();

export function pointAt(s: number): P {
    const { pts, len } = ROUTE;
    if (s <= 0) return pts[0];
    if (s >= len[len.length - 1]) return pts[pts.length - 1];
    let lo = 0,
        hi = len.length - 1;
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (len[mid] <= s) lo = mid;
        else hi = mid;
    }
    const u = (s - len[lo]) / (len[hi] - len[lo] || 1);
    return { x: pts[lo].x + (pts[hi].x - pts[lo].x) * u, y: pts[lo].y + (pts[hi].y - pts[lo].y) * u };
}
