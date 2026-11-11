import React from "react";
import { AbsoluteFill } from "remotion";
import { SymbolPage } from "./panels/SymbolPage";
import { BRAND_GRADIENT, C, F } from "./theme";
import { LogoMark, Wordmark } from "./ui/kit";

/**
 * YouTube / social thumbnail (1280x720). One focal point that survives being
 * shown at ~250px wide: a big two-word headline and the Symbol Journey with
 * its threads lit, tilted in space, lit by the logo's glow.
 */
export const Thumbnail: React.FC = () => (
    <AbsoluteFill style={{ background: C.stage, overflow: "hidden", fontFamily: F.ui }}>
        <div
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "radial-gradient(60% 75% at 70% 55%, rgba(60, 100, 230, 0.38) 0%, rgba(40, 70, 190, 0.12) 45%, rgba(0,0,0,0) 75%), radial-gradient(45% 60% at 12% 60%, rgba(80, 120, 255, 0.22) 0%, rgba(0,0,0,0) 70%)",
            }}
        />
        <div
            style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(150, 180, 255, 0.16) 1.2px, rgba(0,0,0,0) 1.8px)",
                backgroundSize: "34px 34px",
                maskImage: "radial-gradient(70% 70% at 65% 55%, #000 20%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(70% 70% at 65% 55%, #000 20%, transparent 75%)",
            }}
        />

        {/* the product, tilted into the frame from the right */}
        <div style={{ position: "absolute", inset: 0, perspective: 1800, perspectiveOrigin: "70% 50%" }}>
            <div
                style={{
                    position: "absolute",
                    left: 372,
                    top: 128,
                    width: 1600,
                    height: 1000,
                    transformOrigin: "0 0",
                    transform: "rotateY(-16deg) rotateX(5deg) rotateZ(-1.5deg) scale(0.56)",
                    borderRadius: 16,
                    boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), 0 0 90px rgba(70, 120, 255, 0.35)",
                }}
            >
                <SymbolPage t={0} links />
            </div>
        </div>

        {/* scrim so the headline owns the left */}
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(4,6,13,0.97) 0%, rgba(4,6,13,0.94) 36%, rgba(4,6,13,0.55) 46%, rgba(4,6,13,0) 56%)",
            }}
        />

        <div style={{ position: "absolute", left: 72, top: 76, display: "flex", alignItems: "flex-end", gap: 12 }}>
            <LogoMark h={44} />
            <Wordmark h={44} style={{ marginBottom: 1 }} />
        </div>

        <div style={{ position: "absolute", left: 64, top: 236 }}>
            <div
                style={{
                    fontSize: 172,
                    fontWeight: 700,
                    lineHeight: 0.98,
                    letterSpacing: "-0.05em",
                    fontVariationSettings: "'opsz' 32",
                    color: C.text,
                }}
            >
                Trading
            </div>
            <div
                style={{
                    fontSize: 236,
                    fontWeight: 750,
                    lineHeight: 0.92,
                    letterSpacing: "-0.05em",
                    fontVariationSettings: "'opsz' 32",
                    backgroundImage: BRAND_GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 40px rgba(80, 130, 255, 0.45))",
                    paddingBottom: 10,
                }}
            >
                OS
            </div>
        </div>

        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
            }}
        />
    </AbsoluteFill>
);
