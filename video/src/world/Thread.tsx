import React from "react";
import { CUE } from "../cues";
import { EASE, inOutSine, invLerp, bump } from "../lib/ease";
import { project, type Mat4 } from "../lib/mat";
import { matAt } from "./camera";
import { APEX, BUS_LOOP, ORDER, pointAt, PORT, ROUTE, samplePolyline, SPOKES } from "./layout";

/** Arc-length position of the pulse along the route at time t. */
export function pulseS(t: number) {
    const { stopS } = ROUTE;
    const legs = CUE.legs;
    if (t < legs[0][0]) return stopS[0];
    for (let k = 0; k < legs.length; k++) {
        const [a, b] = legs[k];
        if (t < a) return stopS[k];
        if (t <= b) {
            const first = k === 0 || k === legs.length - 1;
            const u = (first ? EASE.glide : EASE.whip)(invLerp(a, b, t));
            return stopS[k] + (stopS[k + 1] - stopS[k]) * u;
        }
    }
    return stopS[stopS.length - 1];
}

const BUS_PTS = samplePolyline(BUS_LOOP, 64, 24);
const SPOKE_PTS = SPOKES.map((s) => samplePolyline(s, 0, 24));

const path = (M: Mat4, pts: { x: number; y: number }[]) =>
    pts
        .map((p, i) => {
            const q = project(M, { x: p.x, y: p.y, z: 0 });
            return `${i ? "L" : "M"}${q.x.toFixed(1)},${q.y.toFixed(1)}`;
        })
        .join("");

export const ThreadOverlay: React.FC<{ t: number }> = ({ t }) => {
    const M = matAt(t);
    const sHead = pulseS(t);
    const TRAIL = 26;
    const sTail = t >= TRAIL ? Math.min(sHead, pulseS(t - TRAIL)) : ROUTE.stopS[0];
    const speed = Math.abs(sHead - pulseS(t - 1));

    // Trail as short segments whose opacity ramps up to the head.
    const segs: React.ReactNode[] = [];
    const N = 28;
    if (sHead - sTail > 2) {
        let prev = project(M, { ...pointAt(sTail), z: 0 });
        for (let i = 1; i <= N; i++) {
            const s = sTail + ((sHead - sTail) * i) / N;
            const q = project(M, { ...pointAt(s), z: 0 });
            const k = i / N;
            segs.push(
                <line
                    key={i}
                    x1={prev.x}
                    y1={prev.y}
                    x2={q.x}
                    y2={q.y}
                    stroke="#cfe0ff"
                    strokeOpacity={Math.pow(k, 1.6)}
                    strokeWidth={1 + 2.6 * k}
                    strokeLinecap="round"
                />,
            );
            prev = q;
        }
    }

    const head = project(M, { ...pointAt(sHead), z: 0 });
    const moving = Math.min(1, speed / 14);
    // At rest the light settles into the port (or the logo) as a soft node.
    const atApex = Math.hypot(pointAt(sHead).x - APEX.x, pointAt(sHead).y - APEX.y) < 4;
    const headA = atApex ? 0.55 : 0.55 + 0.45 * moving;
    const r = 3.2 + 2.2 * moving;

    return (
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <defs>
                <filter id="tglow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" />
                </filter>
                <radialGradient id="thead">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="22%" stopColor="#bcd4ff" stopOpacity="0.9" />
                    <stop offset="55%" stopColor="#4f86ff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#3f7bff" stopOpacity="0" />
                </radialGradient>
            </defs>
            {/* the circuit */}
            <g opacity={0.9}>
                <path d={path(M, BUS_PTS)} fill="none" stroke="rgba(130, 170, 255, 0.20)" strokeWidth={1.6} />
                {SPOKE_PTS.map((pts, i) => (
                    <path key={i} d={path(M, pts)} fill="none" stroke="rgba(130, 170, 255, 0.20)" strokeWidth={1.6} />
                ))}
            </g>
            {/* ports */}
            {ORDER.map((id, i) => {
                const q = project(M, { ...PORT[id], z: 0 });
                const arrive = bump(t, CUE.legs[i][1] - 6, CUE.legs[i][1] + 40);
                const rr = (3 + 5 * arrive) * Math.min(1.6, q.s * 1.6);
                return (
                    <g key={id}>
                        <circle cx={q.x} cy={q.y} r={rr * 3.2} fill="url(#thead)" opacity={0.25 + 0.75 * arrive} />
                        <circle cx={q.x} cy={q.y} r={rr * 0.6} fill="#dbe8ff" opacity={0.55 + 0.45 * arrive} />
                    </g>
                );
            })}
            {/* trail */}
            <g filter="url(#tglow)" opacity={0.9}>
                {segs}
            </g>
            <g>{segs}</g>
            {/* head */}
            <circle cx={head.x} cy={head.y} r={r * 9} fill="url(#thead)" opacity={headA} />
            <ellipse cx={head.x} cy={head.y} rx={r * 16 * moving + 0.01} ry={r * 0.45} fill="#9fc2ff" opacity={0.35 * moving} />
            <circle cx={head.x} cy={head.y} r={r} fill="#ffffff" opacity={headA} />
        </svg>
    );
};

/** Ease used by panels that want to know how "arrived" the light is. */
export const arrival = (t: number, legIdx: number) => inOutSine(invLerp(CUE.legs[legIdx][0], CUE.legs[legIdx][1], t));
