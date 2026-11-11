import { CUE } from "../cues";
import { bump, EASE, inOutSine, invLerp, lerp, type Ease } from "../lib/ease";
import { chain, project, rotX, rotY, rotZ, scale, translate, unproject, type Mat4 } from "../lib/mat";
import { T } from "../lib/time";
import { CELLS, PH, PW, type CellId } from "./layout";
import { IRFC_LOCAL } from "../panels/MarketMonitor";
import { SCR_LOCAL } from "../panels/Screener";
import { SYM_LOCAL } from "../panels/SymbolPage";
import { TRD_LOCAL } from "../panels/TradeReview";

export type Cam = {
    tx: number;
    ty: number;
    dist: number;
    zoom: number;
    yaw: number;
    pitch: number;
    roll: number;
};

export function camMatrix(c: Cam): Mat4 {
    return chain(
        scale(c.zoom, c.zoom, 1),
        translate(0, 0, -c.dist),
        rotZ(c.roll),
        rotX(c.pitch),
        rotY(c.yaw),
        translate(-c.tx, -c.ty, 0),
    );
}

const TAU = Math.PI * 2;

/** The establishing shot (also frame 0 and the poster). Drift is periodic in T. */
export function wide(t: number): Cam {
    const a = (TAU * t) / T;
    return {
        tx: 470 + 70 * Math.sin(a),
        ty: 10 + 40 * Math.sin(a + 0.8),
        dist: 2350,
        zoom: 0.53,
        yaw: -17 + 2.2 * Math.sin(a + 0.3),
        pitch: 19 + 1.2 * Math.sin(a + 1.4),
        roll: -3.2 + 0.6 * Math.sin(a + 2.1),
    };
}

const FZ = 0.75;
/** Panel framed on the right, leaving the left third for the title. */
export function focus(id: CellId, dx = 0, dy = 0): Cam {
    const c = CELLS[id];
    return { tx: c.x - 300 / FZ + dx, ty: c.y + 6 + dy, dist: 0, zoom: FZ, yaw: -5, pitch: 1.5, roll: 0 };
}

/** Panel centred and a touch larger (no title on screen). */
export function full(id: CellId, zoom = 0.9, dx = 0, dy = 0): Cam {
    const c = CELLS[id];
    return { tx: c.x + dx, ty: c.y + dy, dist: 0, zoom, yaw: -2, pitch: 1, roll: 0 };
}

/** Close-up: panel-local point (lx, ly) lands at screen (sx, sy) at `zoom`. */
export function close(id: CellId, lx: number, ly: number, zoom: number, sx = 960, sy = 540, yaw = -3): Cam {
    const c = CELLS[id];
    const wx = c.x - PW / 2 + lx;
    const wy = c.y - PH / 2 + ly;
    return { tx: wx - (sx - 960) / zoom, ty: wy - (sy - 540) / zoom, dist: 0, zoom, yaw, pitch: 1, roll: 0 };
}

type Key = { f: number; cam: (t: number) => Cam; ease?: Ease; whip?: { dir: number } };
const K = (f: number, cam: Cam | ((t: number) => Cam), ease?: Ease, whip?: { dir: number }): Key => ({
    f,
    cam: typeof cam === "function" ? cam : () => cam,
    ease,
    whip,
});


const KEYS: Key[] = [
    K(0, wide),
    K(CUE.dive[0], wide),
    K(CUE.dive[1], focus("MM"), EASE.glide),
    K(CUE.whip1[0], close("MM", IRFC_LOCAL.x, IRFC_LOCAL.y, 0.84, 1260, 560), inOutSine),
    K(CUE.whip1[1], focus("SCR"), EASE.whip, { dir: 1 }),
    K(424, focus("SCR", 10, 0), inOutSine),
    K(492, close("SCR", 880, 540, 0.86, 960, 556, -2), EASE.glide),
    K(540, close("SCR", 900, 530, 0.87, 960, 556, -2), inOutSine),
    K(588, close("SCR", SCR_LOCAL.popover.x, SCR_LOCAL.popover.y, 1.32, 1250, 560, -4), EASE.glide),
    K(CUE.whip2[0], close("SCR", SCR_LOCAL.popover.x + 10, SCR_LOCAL.popover.y, 1.35, 1250, 560, -4), inOutSine),
    K(CUE.whip2[1], focus("WL"), EASE.whip, { dir: 1 }),
    K(CUE.whip3[0], close("WL", 800, 520, 0.82, 1230, 556, -5), inOutSine),
    K(CUE.whip3[1], focus("SYM"), EASE.whip, { dir: 1 }),
    K(1018, focus("SYM", 12, 0), inOutSine),
    K(1098, full("SYM", 0.92, 0, 6), EASE.glide),
    K(1168, full("SYM", 0.94, 10, 4), inOutSine),
    K(1262, close("SYM", SYM_LOCAL.tradeCard.x, SYM_LOCAL.tradeCard.y, 1.3, 1040, 560, -2), EASE.glide),
    K(CUE.whip4[0], close("SYM", SYM_LOCAL.tradeCard.x + 6, SYM_LOCAL.tradeCard.y + 4, 1.33, 1040, 560, -2), inOutSine),
    K(CUE.whip4[1], focus("TRD"), EASE.whip, { dir: 1 }),
    K(1416, focus("TRD", 14, 0), inOutSine),
    K(1476, close("TRD", TRD_LOCAL.notes.x, TRD_LOCAL.notes.y, 1.25, 1000, 600, -3), EASE.glide),
    K(CUE.whip5[0], close("TRD", TRD_LOCAL.notes.x + 10, TRD_LOCAL.notes.y - 4, 1.27, 1000, 600, -3), inOutSine),
    K(CUE.whip5[1], full("INS", 0.9), EASE.whip, { dir: -1 }),
    K(CUE.whip6[0], close("INS", 1000, 560, 1.0, 960, 540, -2), inOutSine),
    K(CUE.whip6[1], full("AI", 0.9), EASE.whip, { dir: -1 }),
    K(CUE.whip7[0], close("AI", 1205, 532, 1.12, 1060, 560, -2), inOutSine),
    K(CUE.whip7[1], focus("PRO"), EASE.whip, { dir: -1 }),
    K(CUE.pull[0], close("PRO", 800, 520, 0.8, 1250, 556, -5), inOutSine),
    K(CUE.pull[1], wide, EASE.glide),
    K(T, wide),
];

const lerpCam = (a: Cam, b: Cam, u: number): Cam => ({
    tx: lerp(a.tx, b.tx, u),
    ty: lerp(a.ty, b.ty, u),
    dist: lerp(a.dist, b.dist, u),
    zoom: Math.exp(lerp(Math.log(a.zoom), Math.log(b.zoom), u)),
    yaw: lerp(a.yaw, b.yaw, u),
    pitch: lerp(a.pitch, b.pitch, u),
    roll: lerp(a.roll, b.roll, u),
});

export function camAt(t: number): Cam {
    let i = 0;
    while (i < KEYS.length - 2 && t >= KEYS[i + 1].f) i++;
    const a = KEYS[i],
        b = KEYS[i + 1];
    const raw = invLerp(a.f, b.f, t);
    const u = (b.ease ?? inOutSine)(raw);
    const c = lerpCam(a.cam(t), b.cam(t), u);
    if (b.whip) {
        // A whip arcs back a little mid-move and leans into the turn.
        const k = bump(t, a.f, b.f);
        c.dist += 340 * k;
        c.roll += 1.1 * k * b.whip.dir;
    }
    return c;
}

export const matAt = (t: number) => camMatrix(camAt(t));

/** Which blur treatment the world needs at time t. */
export type BlurMode = { kind: "none" } | { kind: "dir"; sx: number; sy: number } | { kind: "accum"; samples: number };

export function blurAt(t: number): BlurMode {
    const m0 = matAt(t - 0.5);
    const m1 = matAt(t + 0.5);
    // Screen-space motion over one frame at the centre and the corners.
    const probe = [
        [960, 540],
        [160, 140],
        [1760, 140],
        [160, 940],
        [1760, 940],
    ];
    let cx = 0,
        cy = 0,
        maxD = 0,
        spread = 0;
    const vs: { x: number; y: number }[] = [];
    for (const [X, Y] of probe) {
        const w = unproject(m1, X, Y);
        const p0 = project(m0, w);
        const v = { x: X - p0.x, y: Y - p0.y };
        vs.push(v);
        maxD = Math.max(maxD, Math.hypot(v.x, v.y));
    }
    cx = vs[0].x;
    cy = vs[0].y;
    for (const v of vs) spread = Math.max(spread, Math.hypot(v.x - cx, v.y - cy));
    if (maxD < 2.5) return { kind: "none" };
    // Mostly a pan: a directional blur is exact enough and far cheaper.
    if (spread < maxD * 0.35) {
        const k = 0.36;
        return { kind: "dir", sx: Math.abs(cx) * k, sy: Math.abs(cy) * k };
    }
    return { kind: "accum", samples: Math.max(3, Math.min(8, Math.ceil(maxD / 5))) };
}

/** 0 at a focused shot, 1 at the establishing shot. */
export function widenessAt(t: number) {
    const c = camAt(t);
    return Math.max(0, Math.min(1, (c.dist - 200) / 1900));
}
