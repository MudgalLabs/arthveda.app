import React from "react";
import { getLength } from "@remotion/paths";
import { CUE } from "../cues";
import { clamp, invLerp, outCubic, inOutSine } from "../lib/ease";
import { T } from "../lib/time";
import { C } from "../theme";
import { LOGO_PATH } from "../ui/brand";
import { Wordmark } from "../ui/kit";
import { APEX } from "./layout";

const LOGO_LEN = getLength(LOGO_PATH);
const MARK_H = 360;
const MARK_W = (MARK_H * 56) / 48;

/** Flash envelope that is back to exactly zero before the loop point. */
function flashAt(t: number) {
    const a = CUE.logo.flash;
    if (t < a - 14 || t > T - 2) return 0;
    if (t < a) return outCubic(invLerp(a - 14, a, t));
    return 1 - inOutSine(invLerp(a, T - 2, t));
}

export const Hub: React.FC<{ t: number; wide: number }> = ({ t, wide }) => {
    const breathe = 0.5 + 0.5 * Math.sin((Math.PI * 2 * 2 * t) / T);
    const flash = flashAt(t);
    const trace = clamp(invLerp(CUE.logo.trace, CUE.logo.traceEnd, t));
    const traceFade = 1 - clamp(invLerp(CUE.logo.traceEnd + 4, T - 4, t));
    const traceOn = t >= CUE.logo.trace && t < T - 4;
    const ring = clamp(invLerp(CUE.logo.flash - 4, T - 2, t));

    const glowA = 0.42 + 0.14 * breathe + 0.9 * flash;
    // The lockup recedes while the camera works the screens around it.
    const lockup = 0.28 + 0.72 * wide;
    const fill = flash > 0 ? mix(C.logo, "#eaf2ff", flash * 0.85) : C.logo;

    return (
        <div style={{ position: "absolute", left: 0, top: 0 }}>
            {/* halo */}
            <div
                style={{
                    position: "absolute",
                    left: -900,
                    top: -760,
                    width: 1800,
                    height: 1400,
                    background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(70, 120, 255, ${0.3 * glowA}) 0%, rgba(50, 90, 230, ${0.12 * glowA}) 35%, rgba(0,0,0,0) 70%)`,
                }}
            />
            {/* shockwave on power-on */}
            {ring > 0 && ring < 1 &&
                [0, 0.12].map((lag) => {
                    const q = Math.max(0, (ring - lag) / (1 - lag));
                    if (q <= 0 || q >= 1) return null;
                    const R = 240 + outCubic(q) * (lag ? 2600 : 1300);
                    const a = (1 - q) * (lag ? 0.35 : 0.85);
                    return (
                        <div
                            key={lag}
                            style={{
                                position: "absolute",
                                left: -R,
                                top: -40 - R,
                                width: 2 * R,
                                height: 2 * R,
                                borderRadius: "50%",
                                border: `${(lag ? 10 : 5) * (1 - q) + 1}px solid rgba(170, 205, 255, ${a})`,
                                boxShadow: `0 0 ${lag ? 120 : 60}px rgba(90, 140, 255, ${a * 0.8}), inset 0 0 ${lag ? 120 : 60}px rgba(90, 140, 255, ${a * 0.5})`,
                            }}
                        />
                    );
                })}
            <svg
                width={MARK_W}
                height={MARK_H}
                viewBox="0 0 56 48"
                style={{
                    position: "absolute",
                    left: -MARK_W / 2,
                    top: APEX.y,
                    overflow: "visible",
                    opacity: Math.max(lockup, flash),
                    filter: `drop-shadow(0 0 ${18 + 50 * flash}px rgba(90, 140, 255, ${Math.min(1, 0.55 * glowA)}))`,
                }}
            >
                <path d={LOGO_PATH} fill={fill} />
                {traceOn && (
                    <g style={{ opacity: traceFade }}>
                        {/* two arms leave the apex and race down both sides */}
                        {[0, 1].map((k) => (
                            <path
                                key={k}
                                d={LOGO_PATH}
                                fill="none"
                                stroke={C.threadCore}
                                strokeWidth={1.1}
                                strokeLinecap="round"
                                strokeDasharray={`${(LOGO_LEN / 2) * trace} ${LOGO_LEN}`}
                                strokeDashoffset={k === 0 ? 0 : (LOGO_LEN / 2) * trace - LOGO_LEN}
                                style={{ filter: "drop-shadow(0 0 1.5px #cfe0ff) drop-shadow(0 0 4px #3f7bff)" }}
                            />
                        ))}
                    </g>
                )}
            </svg>
            <Wordmark h={92} color={fill} style={{ position: "absolute", left: -257, top: 176, opacity: Math.max(lockup, flash), filter: `drop-shadow(0 0 ${12 + 30 * flash}px rgba(90, 140, 255, ${Math.min(1, 0.35 * glowA)}))` }} />
        </div>
    );
};

function mix(a: string, b: string, k: number) {
    const pa = parse(a),
        pb = parse(b);
    const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * k));
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
function parse(hex: string) {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
