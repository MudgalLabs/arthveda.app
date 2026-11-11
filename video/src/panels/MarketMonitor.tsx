import React from "react";
import { ChevronDown } from "lucide-react";
import { CUE } from "../cues";
import { HEAT_H, HEAT_W, heatColor, IRFC_TILE, TILES } from "../data/heatmap";
import { clamp, inOutCubic, invLerp, outCubic, spring } from "../lib/ease";
import { C, F } from "../theme";
import { AppWindow, Chip, Mono } from "../ui/kit";

const WAVE = 34; // frames for the flip wave to cross the map
const FLIP = 16; // frames per card

/** Card angle in degrees: 0 India, 180 US, 360 India again. */
function angleAt(t: number, cx: number) {
    const u = cx / HEAT_W;
    const a1 = inOutCubic(clamp((t - CUE.mm.flipUS - u * WAVE) / FLIP));
    const a2 = inOutCubic(clamp((t - CUE.mm.flipBack - (1 - u) * WAVE) / FLIP));
    return 180 * a1 + 180 * a2;
}

/** How lit the IRFC idea is: on at rest, off through the flips, back on. */
export function igniteAt(t: number) {
    if (t < CUE.mm.flipUS) return 1;
    if (t < CUE.mm.flipUS + 10) return 1 - (t - CUE.mm.flipUS) / 10;
    if (t < CUE.mm.ignite) return 0;
    return clamp(outCubic(invLerp(CUE.mm.ignite, CUE.mm.ignite + 16, t)));
}

const Select: React.FC<{ label?: string; value: React.ReactNode; w: number }> = ({ label, value, w }) => (
    <div>
        {label && <div style={{ fontSize: 12.5, color: C.textMuted, marginBottom: 6 }}>{label}</div>}
        <div
            style={{
                width: w,
                height: 38,
                borderRadius: 8,
                border: `1px solid ${C.borderSoft}`,
                background: C.bg2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 12px",
                fontSize: 15,
            }}
        >
            {value}
            <ChevronDown size={16} color={C.textMuted} />
        </div>
    </div>
);

/** Text that flips between two values in sync with the map. */
const FlipText: React.FC<{ a: React.ReactNode; b: React.ReactNode; angle: number; style?: React.CSSProperties }> = ({ a, b, angle, style }) => {
    const m = ((angle % 360) + 360) % 360;
    const showB = m > 90 && m < 270;
    const k = Math.abs(Math.cos((m * Math.PI) / 180));
    return (
        <span style={{ display: "inline-block", transform: `scaleY(${0.25 + 0.75 * k})`, opacity: 0.4 + 0.6 * k, ...style }}>
            {showB ? b : a}
        </span>
    );
};

export const MarketMonitor: React.FC<{ t: number }> = ({ t }) => {
    const ign = igniteAt(t);
    const headAngle = angleAt(t, 0);
    const irfc = IRFC_TILE.rect;
    const ripple = t >= CUE.mm.ignite ? (t - CUE.mm.ignite) / 70 : -1;

    return (
        <AppWindow active="Market monitor" crumbs={["Market monitor"]}>
            {/* stat strip */}
            <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}>
                <Chip tone={headAngle % 360 > 90 && headAngle % 360 < 270 ? "green" : "neutral"}>
                    <FlipText angle={headAngle} a="Neutral" b="Risk-On" />
                </Chip>
                {[
                    ["Nifty 50", "+0.63%", "S&P 500", "-0.41%"],
                    ["A/D", "317 / 179", "A/D", "246 / 252"],
                    ["> 200 DMA", "47%", "> 200 DMA", "62%"],
                    ["52W H/L", "17 / 1", "52W H/L", "5 / 8"],
                ].map(([l1, v1, l2, v2], i) => (
                    <div
                        key={i}
                        style={{
                            height: 30,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "0 11px",
                            borderRadius: 7,
                            border: `1px solid ${C.borderSubtle}`,
                            color: C.textMuted,
                        }}
                    >
                        <FlipText angle={angleAt(t, 120 + i * 140)} a={l1} b={l2} />
                        <Mono style={{ color: i === 0 ? (headAngle % 360 > 90 && headAngle % 360 < 270 ? C.destructive : C.success) : C.text }}>
                            <FlipText angle={angleAt(t, 120 + i * 140)} a={v1} b={v2} />
                        </Mono>
                    </div>
                ))}
            </div>

            {/* controls */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", marginTop: 20 }}>
                <Select w={120} value={<FlipText angle={headAngle} a="India" b="US" />} />
                <div style={{ display: "flex", border: `1px solid ${C.borderSoft}`, borderRadius: 8, overflow: "hidden", height: 38 }}>
                    {["Heatmap", "Sector", "Breadth"].map((x, i) => (
                        <div
                            key={x}
                            style={{
                                padding: "0 16px",
                                display: "flex",
                                alignItems: "center",
                                fontSize: 15,
                                background: i === 0 ? C.primary : "transparent",
                                color: i === 0 ? C.text : C.textMuted,
                            }}
                        >
                            {x}
                        </div>
                    ))}
                </div>
                <div style={{ width: 18 }} />
                <Select label="Index" w={180} value={<FlipText angle={angleAt(t, 300)} a="Nifty 500" b="S&P 500" />} />
                <Select label="Time period" w={92} value="1D" />
                <Select label="Size by" w={150} value="Market cap" />
                <div style={{ flex: 1 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: C.textMuted, fontFamily: F.mono, paddingBottom: 10 }}>
                    -6%
                    <div style={{ width: 150, height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${heatColor(-6)}, ${heatColor(0)}, ${heatColor(6)})` }} />
                    +6%
                </div>
            </div>

            {/* treemap */}
            <div style={{ position: "absolute", left: 0, top: 172, width: HEAT_W, height: HEAT_H }}>
                {TILES.map((tile, i) => {
                    const r = tile.rect;
                    const ang = angleAt(t, r.x + r.w / 2);
                    const m = ((ang % 360) + 360) % 360;
                    const us = m > 90 && m < 270;
                    const d = us ? tile.us : tile.in;
                    const k = Math.abs(Math.cos((m * Math.PI) / 180));
                    const isIrfc = tile === IRFC_TILE && !us;
                    const big = Math.sqrt(r.w * r.h);
                    const fs = Math.max(10.5, Math.min(26, big / 7.5));
                    const show = r.w > 46 && r.h > 30;
                    const dimOthers = !isIrfc ? 0.42 * ign : 0;
                    return (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                left: r.x + 1,
                                top: r.y + 1,
                                width: r.w - 2,
                                height: r.h - 2,
                                transform: `perspective(1100px) rotateY(${ang}deg)`,
                                zIndex: isIrfc ? 5 : 1,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: 3,
                                    background: heatColor(d.p),
                                    filter: `brightness(${(0.45 + 0.55 * k) * (1 - dimOthers)})`,
                                    transform: us ? "rotateY(180deg)" : undefined,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    overflow: "hidden",
                                }}
                            >
                                {show && (
                                    <>
                                        <div style={{ fontSize: fs, fontWeight: 650, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{d.s}</div>
                                        <div style={{ fontFamily: F.mono, fontSize: fs * 0.78, opacity: 0.9, lineHeight: 1.25 }}>
                                            {d.p >= 0 ? "+" : ""}
                                            {d.p.toFixed(2)}%
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
                {/* the idea lights up */}
                {ign > 0.01 && (
                    <div
                        style={{
                            position: "absolute",
                            left: irfc.x - 1,
                            top: irfc.y - 1,
                            width: irfc.w + 2,
                            height: irfc.h + 2,
                            borderRadius: 4,
                            zIndex: 6,
                            boxShadow: `0 0 0 ${2.5 * ign}px ${C.threadCore}, 0 0 ${26 * ign}px ${8 * ign}px rgba(80, 140, 255, ${0.75 * ign})`,
                            transform: `scale(${1 + 0.06 * ign * (1 - spring(Math.max(0, t - CUE.mm.ignite), 220, 14) + 1) * 0.5})`,
                        }}
                    />
                )}
                {ripple > 0 && ripple < 1 &&
                    [0, 0.28].map((off) => {
                        const q = clamp((ripple - off) / (1 - off));
                        if (q <= 0 || q >= 1) return null;
                        const R = 30 + q * 260;
                        return (
                            <div
                                key={off}
                                style={{
                                    position: "absolute",
                                    left: irfc.x + irfc.w / 2 - R,
                                    top: irfc.y + irfc.h / 2 - R,
                                    width: 2 * R,
                                    height: 2 * R,
                                    borderRadius: "50%",
                                    border: `2px solid rgba(170, 205, 255, ${0.8 * (1 - q)})`,
                                    zIndex: 7,
                                }}
                            />
                        );
                    })}
            </div>
        </AppWindow>
    );
};

/** Panel-local centre of the IRFC tile (for the camera). */
export const IRFC_LOCAL = {
    x: 240 + 20 + IRFC_TILE.rect.x + IRFC_TILE.rect.w / 2,
    y: 8 + 74 + 172 + IRFC_TILE.rect.y + IRFC_TILE.rect.h / 2,
};
