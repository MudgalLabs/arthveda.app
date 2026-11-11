// Pure, continuous easing helpers. Everything takes real-valued time so motion
// blur sub-samples interpolate smoothly.

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const invLerp = (a: number, b: number, x: number) => (b === a ? (x >= b ? 1 : 0) : clamp((x - a) / (b - a)));

export type Ease = (x: number) => number;

export const linear: Ease = (x) => x;
export const inSine: Ease = (x) => 1 - Math.cos((x * Math.PI) / 2);
export const outSine: Ease = (x) => Math.sin((x * Math.PI) / 2);
export const inOutSine: Ease = (x) => -(Math.cos(Math.PI * x) - 1) / 2;
export const inCubic: Ease = (x) => x * x * x;
export const outCubic: Ease = (x) => 1 - Math.pow(1 - x, 3);
export const inOutCubic: Ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const inQuart: Ease = (x) => x * x * x * x;
export const outQuart: Ease = (x) => 1 - Math.pow(1 - x, 4);
export const inOutQuart: Ease = (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2);
export const outQuint: Ease = (x) => 1 - Math.pow(1 - x, 5);
export const inOutQuint: Ease = (x) => (x < 0.5 ? 16 * Math.pow(x, 5) : 1 - Math.pow(-2 * x + 2, 5) / 2);
export const outExpo: Ease = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const inExpo: Ease = (x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10));
export const inOutExpo: Ease = (x) =>
    x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
export const outBack =
    (s = 1.70158): Ease =>
    (x) => {
        const c3 = s + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
    };

/** CSS-style cubic-bezier(x1, y1, x2, y2), solved with Newton + bisection. */
export function bezier(x1: number, y1: number, x2: number, y2: number): Ease {
    const cx = 3 * x1,
        bx = 3 * (x2 - x1) - cx,
        ax = 1 - cx - bx;
    const cy = 3 * y1,
        by = 3 * (y2 - y1) - cy,
        ay = 1 - cy - by;
    const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
    const sy = (t: number) => ((ay * t + by) * t + cy) * t;
    const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
    return (x: number) => {
        if (x <= 0) return 0;
        if (x >= 1) return 1;
        let t = x;
        for (let i = 0; i < 8; i++) {
            const e = sx(t) - x;
            const d = dx(t);
            if (Math.abs(e) < 1e-6) return sy(t);
            if (Math.abs(d) < 1e-6) break;
            t -= e / d;
        }
        let lo = 0,
            hi = 1;
        t = x;
        for (let i = 0; i < 30; i++) {
            const v = sx(t);
            if (Math.abs(v - x) < 1e-6) break;
            if (v < x) lo = t;
            else hi = t;
            t = (lo + hi) / 2;
        }
        return sy(t);
    };
}

/** The house curves. Camera moves get a long, confident deceleration. */
export const EASE = {
    whip: bezier(0.72, 0, 0.18, 1),
    glide: bezier(0.45, 0, 0.15, 1),
    settle: bezier(0.16, 1, 0.3, 1),
    swiftOut: bezier(0.2, 0.9, 0.25, 1),
    accel: bezier(0.55, 0, 0.9, 0.4),
};

/**
 * Closed-form damped spring from 0 to 1 (unit mass), time in frames at 60fps.
 * Continuous in t, so it can be sampled at sub-frame offsets.
 */
export function spring(tFrames: number, stiffness = 170, damping = 22): number {
    if (tFrames <= 0) return 0;
    const t = tFrames / 60;
    const w0 = Math.sqrt(stiffness);
    const zeta = damping / (2 * Math.sqrt(stiffness));
    if (zeta < 1) {
        const wd = w0 * Math.sqrt(1 - zeta * zeta);
        return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
    }
    if (zeta === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const r1 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1));
    const r2 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1));
    const c2 = r1 / (r1 - r2);
    const c1 = 1 - c2;
    return 1 - (c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t));
}

/** Progress 0..1 of a window [a, b] with an ease applied. */
export const prog = (t: number, a: number, b: number, ease: Ease = linear) => ease(invLerp(a, b, t));

/** Spring that starts at frame `start`; returns 0 before it. */
export const springAt = (t: number, start: number, stiffness = 170, damping = 22) => spring(t - start, stiffness, damping);

/** Map x in [a,b] to [c,d] (clamped) with ease. */
export const remap = (x: number, a: number, b: number, c: number, d: number, ease: Ease = linear) =>
    lerp(c, d, ease(invLerp(a, b, x)));

/** Smooth pulse 0→1→0 over [a, b]. */
export const bump = (t: number, a: number, b: number) => {
    const x = invLerp(a, b, t);
    return x <= 0 || x >= 1 ? 0 : Math.sin(Math.PI * x);
};
