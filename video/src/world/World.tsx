import React from "react";
import { C } from "../theme";
import { CX, CY, H, PERSPECTIVE, project, toCss, W, type Mat4 } from "../lib/mat";
import { mulberry32 } from "../lib/random";
import { T } from "../lib/time";
import { camAt, camMatrix } from "./camera";
import { CELLS, ORDER, PH, PW, type CellId } from "./layout";
import { Hub } from "./Hub";
import { CUE } from "../cues";
import { bump } from "../lib/ease";

const BLEED = 120;

export type PanelRender = (id: CellId, t: number) => React.ReactNode;

/** Projected screen-space bbox of a world rect (z = 0). */
function screenBox(M: Mat4, x: number, y: number, w: number, h: number) {
    const pts = [
        project(M, { x, y, z: 0 }),
        project(M, { x: x + w, y, z: 0 }),
        project(M, { x, y: y + h, z: 0 }),
        project(M, { x: x + w, y: y + h, z: 0 }),
    ];
    const xs = pts.map((p) => p.x),
        ys = pts.map((p) => p.y);
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
}

function visibleArea(b: { x0: number; x1: number; y0: number; y1: number }) {
    const w = Math.max(0, Math.min(W, b.x1) - Math.max(0, b.x0));
    const h = Math.max(0, Math.min(H, b.y1) - Math.max(0, b.y0));
    return w * h;
}

/** Arrival flash on a panel's frame when the pulse reaches its port. */
function arrivalGlow(id: CellId, t: number) {
    const idx = ORDER.indexOf(id);
    const end = CUE.legs[idx][1];
    return bump(t, end - 6, end + 34);
}

const Floor: React.FC = () => (
    <>
        {/* soft light pooled under the grid */}
        <div
            style={{
                position: "absolute",
                left: -3600,
                top: -2500,
                width: 7200,
                height: 5000,
                transform: "translateZ(-420px)",
                background:
                    "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(56, 96, 220, 0.26) 0%, rgba(40, 70, 180, 0.10) 38%, rgba(0,0,0,0) 70%)",
            }}
        />
        {/* dot grid floor: depth cue + parallax */}
        <div
            style={{
                position: "absolute",
                left: -3300,
                top: -2300,
                width: 6600,
                height: 4600,
                transform: "translateZ(-260px)",
                backgroundImage: "radial-gradient(circle, rgba(150, 180, 255, 0.22) 1.6px, rgba(0,0,0,0) 2.2px)",
                backgroundSize: "80px 80px",
                backgroundPosition: "40px 40px",
                WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 30%, transparent 72%)",
                maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 30%, transparent 72%)",
            }}
        />
    </>
);

// Dust motes at varied depth, drifting on loop-periodic paths.
const MOTES = (() => {
    const r = mulberry32(5);
    return Array.from({ length: 70 }, () => ({
        x: (r() - 0.5) * 7600,
        y: (r() - 0.5) * 5200,
        z: -500 + r() * 1100,
        s: 2 + r() * 3.5,
        a: 0.12 + r() * 0.4,
        k: 1 + Math.floor(r() * 3),
        ph: r() * Math.PI * 2,
        amp: 40 + r() * 90,
    }));
})();

const Motes: React.FC<{ t: number }> = ({ t }) => (
    <>
        {MOTES.map((m, i) => {
            const a = (Math.PI * 2 * m.k * t) / T + m.ph;
            return (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: m.s,
                        height: m.s,
                        borderRadius: "50%",
                        background: `rgba(170, 200, 255, ${m.a})`,
                        boxShadow: `0 0 ${m.s * 3}px rgba(120, 160, 255, ${m.a * 0.8})`,
                        transform: `translate3d(${m.x + Math.sin(a) * m.amp}px, ${m.y + Math.cos(a * 0.7) * m.amp * 0.6}px, ${m.z}px)`,
                    }}
                />
            );
        })}
    </>
);

const PanelSlot: React.FC<{
    id: CellId;
    M: Mat4;
    t: number;
    dim: number;
    render: PanelRender;
}> = ({ id, M, t, dim, render }) => {
    const c = CELLS[id];
    const x = c.x - PW / 2,
        y = c.y - PH / 2;
    const glow = arrivalGlow(id, t);
    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: PW,
                height: PH,
                borderRadius: 16,
                boxShadow: `0 50px 110px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.07)${
                    glow > 0.01 ? `, 0 0 ${40 + glow * 60}px rgba(80, 140, 255, ${0.55 * glow}), 0 0 0 ${1 + glow * 1.5}px rgba(160, 200, 255, ${0.7 * glow})` : ""
                }`,
            }}
        >
            {render(id, t)}
            {/* glass sheen */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 22%)",
                    pointerEvents: "none",
                }}
            />
            {dim > 0.005 && (
                <div style={{ position: "absolute", inset: -1, borderRadius: 16, background: `rgba(3, 5, 11, ${dim})` }} />
            )}
        </div>
    );
};

/**
 * layer "backdrop" draws only the floor (once per frame, never multi-sampled);
 * layer "content" draws the screens, logo and dust (what motion blur samples).
 */
export const WorldView: React.FC<{ t: number; render: PanelRender; layer?: "backdrop" | "content" }> = ({ t, render, layer = "content" }) => {
    const cam = camAt(t);
    const M = camMatrix(cam);

    // Cull panels that are off screen; dim the ones the camera isn't on.
    const boxes = ORDER.map((id) => {
        const c = CELLS[id];
        return screenBox(M, c.x - PW / 2, c.y - PH / 2, PW, PH);
    });
    const areas = boxes.map(visibleArea);
    const maxA = Math.max(1, ...areas);
    // In the establishing shot every screen should read; dimming is for focus.
    const wide = Math.max(0, Math.min(1, (cam.dist - 200) / 1900));

    return (
        <div
            style={{
                position: "absolute",
                left: -BLEED,
                top: -BLEED,
                width: W + 2 * BLEED,
                height: H + 2 * BLEED,
                perspective: PERSPECTIVE,
                perspectiveOrigin: `${CX + BLEED}px ${CY + BLEED}px`,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: CX + BLEED,
                    top: CY + BLEED,
                    width: 0,
                    height: 0,
                    transformStyle: "preserve-3d",
                    transformOrigin: "0 0 0",
                    transform: toCss(M),
                }}
            >
                {layer === "backdrop" && <Floor />}
                {layer === "content" && <Motes t={t} />}
                {layer === "content" && <Hub t={t} wide={wide} />}
                {layer === "content" && ORDER.map((id, i) => {
                    const b = boxes[i];
                    const off = b.x1 < -250 || b.x0 > W + 250 || b.y1 < -250 || b.y0 > H + 250;
                    if (off) return null;
                    const dim = 0.7 * (1 - Math.sqrt(areas[i] / maxA)) * (1 - 0.85 * wide);
                    return <PanelSlot key={id} id={id} M={M} t={t} dim={dim} render={render} />;
                })}
            </div>
        </div>
    );
};

export const Backdrop: React.FC = () => (
    <div
        style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 85% 80% at 50% 45%, #0b1328 0%, #070b18 45%, ${C.stage} 100%)`,
        }}
    />
);

export const Vignette: React.FC = () => (
    <div
        style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
            pointerEvents: "none",
        }}
    />
);
