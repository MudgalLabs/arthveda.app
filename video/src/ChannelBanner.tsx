import React from "react";
import { AbsoluteFill } from "remotion";
import { CANDLES } from "./data/irfc";
import { Insights } from "./panels/Insights";
import { SymbolPage } from "./panels/SymbolPage";
import { BRAND_GRADIENT, C, F } from "./theme";
import { LogoMark, Wordmark } from "./ui/kit";

/**
 * YouTube channel banner, 2560x1440. Only the centre 1546x423 is visible on
 * every device (phones), desktop shows a 2560x423 strip, TVs show it all. So
 * the lockup and line live in the safe box; screens and light fill the edges.
 */
const W = 2560;
const H = 1440;
const SAFE = { x: (W - 1546) / 2, y: (H - 423) / 2, w: 1546, h: 423 };

// The thread: IRFC's closes stretched across the full width.
const THREAD = (() => {
    const cs = CANDLES.map((c) => c.c);
    const lo = Math.min(...cs),
        hi = Math.max(...cs);
    return cs.map((v, i) => `${((i / (cs.length - 1)) * (W + 80) - 40).toFixed(1)},${(1010 - ((v - lo) / (hi - lo)) * 520).toFixed(1)}`).join(" ");
})();

const Tilted: React.FC<{ x: number; y: number; ry: number; children: React.ReactNode }> = ({ x, y, ry, children }) => (
    <div style={{ position: "absolute", inset: 0, perspective: 2200, perspectiveOrigin: `${x}px ${y}px` }}>
        <div
            style={{
                position: "absolute",
                left: x - 800,
                top: y - 500,
                width: 1600,
                height: 1000,
                transform: `rotateY(${ry}deg) rotateX(4deg) scale(0.6)`,
                borderRadius: 16,
                boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), 0 0 80px rgba(70,120,255,0.3)",
                opacity: 0.9,
            }}
        >
            {children}
        </div>
    </div>
);

export const ChannelBanner: React.FC = () => (
    <AbsoluteFill style={{ background: C.stage, overflow: "hidden", fontFamily: F.ui }}>
        <div
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "radial-gradient(55% 45% at 50% 50%, rgba(60, 100, 230, 0.32) 0%, rgba(40, 70, 190, 0.1) 50%, rgba(0,0,0,0) 80%), linear-gradient(180deg, #070b18 0%, #04060d 100%)",
            }}
        />
        <div
            style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(150, 180, 255, 0.16) 1.6px, rgba(0,0,0,0) 2.4px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(60% 60% at 50% 50%, #000 15%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(60% 60% at 50% 50%, #000 15%, transparent 80%)",
            }}
        />

        {/* product at the edges (desktop + TV), facing inward */}
        <Tilted x={300} y={730} ry={24}>
            <SymbolPage t={0} links />
        </Tilted>
        <Tilted x={W - 300} y={730} ry={-24}>
            <Insights t={0} />
        </Tilted>
        <div
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "linear-gradient(90deg, rgba(4,6,13,0.15) 0%, rgba(4,6,13,0.75) 20%, rgba(4,6,13,0.92) 32%, rgba(4,6,13,0.92) 68%, rgba(4,6,13,0.75) 80%, rgba(4,6,13,0.15) 100%)",
            }}
        />

        {/* the thread runs the full width behind everything */}
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
            <defs>
                <filter id="bn-g" x="-5%" y="-20%" width="110%" height="140%">
                    <feGaussianBlur stdDeviation="9" />
                </filter>
                <linearGradient id="bn-fade" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
                    <stop offset="35%" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="65%" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.15" />
                </linearGradient>
                <mask id="bn-m">
                    <rect width={W} height={H} fill="url(#bn-fade)" />
                </mask>
            </defs>
            <g mask="url(#bn-m)">
                <polyline points={THREAD} fill="none" stroke={C.threadGlow} strokeWidth={14} filter="url(#bn-g)" />
                <polyline points={THREAD} fill="none" stroke={C.thread} strokeWidth={3.5} strokeLinejoin="round" />
            </g>
        </svg>

        {/* calm pool behind the lockup so the thread never fights the type */}
        <div
            style={{
                position: "absolute",
                left: SAFE.x - 120,
                top: SAFE.y - 90,
                width: SAFE.w + 240,
                height: SAFE.h + 180,
                background: "radial-gradient(50% 50% at 50% 50%, rgba(4,6,13,0.9) 35%, rgba(4,6,13,0) 100%)",
            }}
        />

        {/* safe area: visible on every device */}
        <div
            style={{
                position: "absolute",
                left: SAFE.x,
                top: SAFE.y,
                width: SAFE.w,
                height: SAFE.h,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-end", gap: 26, filter: "drop-shadow(0 0 30px rgba(90,140,255,0.45))" }}>
                <LogoMark h={132} />
                <Wordmark h={132} style={{ marginBottom: 3 }} />
            </div>
            <div style={{ marginTop: 34, fontSize: 92, fontWeight: 700, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 32", lineHeight: 1 }}>
                <span style={{ color: C.text }}>Trading </span>
                <span style={{ backgroundImage: BRAND_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>OS</span>
            </div>
            <div style={{ marginTop: 28, fontFamily: F.mono, fontSize: 27, letterSpacing: "0.22em", color: C.textMuted }}>
                DISCOVER · JOURNAL · SOCIAL
            </div>
        </div>

        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)" }} />
    </AbsoluteFill>
);
