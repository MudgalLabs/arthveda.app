import React from "react";
import { CUE } from "../cues";
import { AccumBlur } from "../lib/blur";
import { clamp, EASE, inCubic, invLerp, spring } from "../lib/ease";
import { mulberry32 } from "../lib/random";
import { useT } from "../lib/time";
import { BRAND_GRADIENT, C, F } from "../theme";

type Def = (typeof CUE.titles)[number];

const SIZE = 104;
const LINE = SIZE * 1.06;
const X = 104;
const Y = 352;
const GLYPHS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789#%+/<>";

/** Kicker that decodes from noise into its words. */
const Kicker: React.FC<{ text: string; t: number; start: number; out: number }> = ({ text, t, start, out }) => {
    const chars = text.toUpperCase().split("");
    const fade = 1 - clamp((t - out) / 10);
    return (
        <div style={{ fontFamily: F.mono, fontSize: 19, letterSpacing: "0.18em", color: C.textMuted, opacity: clamp((t - start) / 6) * fade, whiteSpace: "pre" }}>
            {chars.map((ch, i) => {
                const at = start + 3 + i * 0.9;
                if (ch === " " || ch === "·") return <span key={i}>{ch}</span>;
                if (t >= at) return <span key={i} style={{ color: i < 2 ? C.thread : undefined }}>{ch}</span>;
                if (t < at - 10) return <span key={i} style={{ opacity: 0 }}>{ch}</span>;
                const r = mulberry32(i * 131 + Math.floor(t / 2) * 7);
                return (
                    <span key={i} style={{ color: C.textSubtle }}>
                        {GLYPHS[Math.floor(r() * GLYPHS.length)]}
                    </span>
                );
            })}
        </div>
    );
};

/** One title line revealed through a mask; rises in, accelerates out. */
const Line: React.FC<{ text: string; t: number; inAt: number; outAt: number; gradient?: boolean }> = ({ text, t, inAt, outAt, gradient }) => {
    const pin = spring(t - inAt, 150, 19);
    const pout = inCubic(clamp((t - outAt) / 16));
    const y = (1 - pin) * LINE * 1.05 - pout * LINE * 1.1;
    return (
        <div style={{ height: LINE, overflow: "hidden", paddingRight: 30 }}>
            <div
                style={{
                    transform: `translateY(${y}px)`,
                    fontFamily: F.ui,
                    fontWeight: 650,
                    fontSize: SIZE,
                    lineHeight: `${LINE}px`,
                    letterSpacing: "-0.045em",
                    fontVariationSettings: "'opsz' 32",
                    whiteSpace: "nowrap",
                    ...(gradient
                        ? {
                              backgroundImage: BRAND_GRADIENT,
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "transparent",
                              filter: "drop-shadow(0 0 26px rgba(80, 130, 255, 0.35))",
                          }
                        : { color: C.text }),
                }}
            >
                {text}
            </div>
        </div>
    );
};

const Block: React.FC<{ d: Def }> = ({ d }) => {
    const t = useT();
    return (
        <div style={{ position: "absolute", left: X, top: Y }}>
            <Kicker text={d.kicker} t={t} start={d.in} out={d.out + 8} />
            <div style={{ height: 18 }} />
            <Line text={d.a} t={t} inAt={d.in + 2} outAt={d.out} />
            <Line text={d.b} t={t} inAt={d.in + 8} outAt={d.out + 4} gradient />
        </div>
    );
};

/** Is a title moving (in or out) at time t? Then it needs motion blur. */
const moving = (d: Def, t: number) => (t >= d.in && t <= d.in + 44) || (t >= d.out - 1 && t <= d.out + 24);

export const Titles: React.FC = () => {
    const t = useT();
    const live = CUE.titles.filter((d) => t >= d.in - 2 && t <= d.out + 26);
    if (!live.length) return null;
    const scrim = Math.max(
        ...live.map((d) => clamp(invLerp(d.in - 2, d.in + 14, t)) * (1 - clamp(invLerp(d.out + 4, d.out + 26, t)))),
    );
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: EASE.glide(scrim),
                    background: "linear-gradient(90deg, rgba(4, 6, 13, 0.95) 0%, rgba(4, 6, 13, 0.86) 24%, rgba(4, 6, 13, 0.45) 40%, rgba(4, 6, 13, 0.0) 54%)",
                }}
            />
            {live.map((d) =>
                moving(d, t) ? (
                    <AccumBlur key={d.kicker} samples={16} shutter={1.2}>
                        <Block d={d} />
                    </AccumBlur>
                ) : (
                    <div key={d.kicker} style={{ position: "absolute", inset: 0 }}>
                        <Block d={d} />
                    </div>
                ),
            )}
        </>
    );
};
