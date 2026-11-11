import React from "react";
import { TimeProvider, useT } from "./time";

/**
 * True accumulation motion blur: renders `children` `samples` times across the
 * shutter window and averages them with additive blending (plus-lighter at
 * 1/N opacity inside an isolated group). This is the accumulation-buffer
 * technique, so text and UI smear exactly along their real paths.
 *
 * shutter is in frames: 0.5 = 180 degrees at 60fps.
 */
export const AccumBlur: React.FC<{
    samples: number;
    shutter?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
}> = ({ samples, shutter = 0.5, style, children }) => {
    const t = useT();
    if (samples <= 1 || shutter <= 0) {
        return <div style={{ position: "absolute", inset: 0, ...style }}>{children}</div>;
    }
    const layers = [];
    for (let i = 0; i < samples; i++) {
        // Centred shutter: samples span [t - shutter/2, t + shutter/2].
        const ti = t + shutter * (i / (samples - 1) - 0.5);
        layers.push(
            <div
                key={i}
                style={{ position: "absolute", inset: 0, opacity: 1 / samples, mixBlendMode: "plus-lighter" }}
            >
                <TimeProvider t={ti}>{children}</TimeProvider>
            </div>,
        );
    }
    return <div style={{ position: "absolute", inset: 0, isolation: "isolate", ...style }}>{layers}</div>;
};

/**
 * Directional (axis-aligned) gaussian blur used for whip pans. Rendered as an
 * inline SVG filter so the stdDeviation can change every frame.
 */
export const DirBlur: React.FC<{
    id: string;
    sx: number;
    sy: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
}> = ({ id, sx, sy, style, children }) => {
    const on = sx > 0.15 || sy > 0.15;
    return (
        <div style={{ position: "absolute", inset: 0, ...style, filter: on ? `url(#${id})` : undefined }}>
            {on && (
                <svg width={0} height={0} style={{ position: "absolute" }}>
                    <defs>
                        <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
                            <feGaussianBlur stdDeviation={`${sx.toFixed(2)} ${sy.toFixed(2)}`} edgeMode="duplicate" />
                        </filter>
                    </defs>
                </svg>
            )}
            {children}
        </div>
    );
};
