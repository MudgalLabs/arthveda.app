// Column-major 4x4 matrices that mirror CSS transform math exactly, so the 2D
// overlay (thread, particles) projects to the same pixels the browser draws.

export type Mat4 = Float64Array;
export type Vec3 = { x: number; y: number; z: number };

export const W = 1920;
export const H = 1080;
export const CX = W / 2;
export const CY = H / 2;
/** CSS perspective distance of the world stage. */
export const PERSPECTIVE = 2200;

export const ident = (): Mat4 => {
    const m = new Float64Array(16);
    m[0] = m[5] = m[10] = m[15] = 1;
    return m;
};

export function mul(a: Mat4, b: Mat4): Mat4 {
    const o = new Float64Array(16);
    for (let c = 0; c < 4; c++)
        for (let r = 0; r < 4; r++) {
            let s = 0;
            for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
            o[c * 4 + r] = s;
        }
    return o;
}

export const chain = (...ms: Mat4[]) => ms.reduce((acc, m) => mul(acc, m), ident());

export const translate = (x: number, y: number, z: number): Mat4 => {
    const m = ident();
    m[12] = x;
    m[13] = y;
    m[14] = z;
    return m;
};

export const scale = (sx: number, sy: number, sz: number): Mat4 => {
    const m = ident();
    m[0] = sx;
    m[5] = sy;
    m[10] = sz;
    return m;
};

const rad = (d: number) => (d * Math.PI) / 180;

export const rotX = (deg: number): Mat4 => {
    const m = ident();
    const c = Math.cos(rad(deg)),
        s = Math.sin(rad(deg));
    m[5] = c;
    m[6] = s;
    m[9] = -s;
    m[10] = c;
    return m;
};

export const rotY = (deg: number): Mat4 => {
    const m = ident();
    const c = Math.cos(rad(deg)),
        s = Math.sin(rad(deg));
    m[0] = c;
    m[2] = -s;
    m[8] = s;
    m[10] = c;
    return m;
};

export const rotZ = (deg: number): Mat4 => {
    const m = ident();
    const c = Math.cos(rad(deg)),
        s = Math.sin(rad(deg));
    m[0] = c;
    m[1] = s;
    m[4] = -s;
    m[5] = c;
    return m;
};

export function apply(m: Mat4, p: Vec3): Vec3 {
    return {
        x: m[0] * p.x + m[4] * p.y + m[8] * p.z + m[12],
        y: m[1] * p.x + m[5] * p.y + m[9] * p.z + m[13],
        z: m[2] * p.x + m[6] * p.y + m[10] * p.z + m[14],
    };
}

export type Screen = { x: number; y: number; s: number; z: number };

/** World point -> screen pixel, matching `perspective` + `matrix3d` in CSS. */
export function project(m: Mat4, p: Vec3): Screen {
    const q = apply(m, p);
    const k = PERSPECTIVE / Math.max(1, PERSPECTIVE - q.z);
    return { x: CX + q.x * k, y: CY + q.y * k, s: k, z: q.z };
}

/** Screen pixel -> world point on the z = planeZ plane (inverse homography). */
export function unproject(m: Mat4, X: number, Y: number, planeZ = 0): Vec3 {
    const P = PERSPECTIVE;
    const u = X - CX,
        v = Y - CY;
    // camera-space coords for world (x, y, planeZ)
    const ox = m[8] * planeZ + m[12];
    const oy = m[9] * planeZ + m[13];
    const oz = m[10] * planeZ + m[14];
    const a11 = P * m[0] + u * m[2],
        a12 = P * m[4] + u * m[6],
        b1 = u * (P - oz) - P * ox;
    const a21 = P * m[1] + v * m[2],
        a22 = P * m[5] + v * m[6],
        b2 = v * (P - oz) - P * oy;
    const det = a11 * a22 - a12 * a21;
    if (Math.abs(det) < 1e-9) return { x: 0, y: 0, z: planeZ };
    return { x: (b1 * a22 - a12 * b2) / det, y: (a11 * b2 - a21 * b1) / det, z: planeZ };
}

export const toCss = (m: Mat4) => `matrix3d(${Array.from(m, (v) => +v.toFixed(6)).join(",")})`;
