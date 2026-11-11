import React, { createContext, useContext } from "react";
import { useCurrentFrame } from "remotion";

export const FPS = 60;
/** Loop length in frames (40s at 60fps). Every time-driven value wraps on it. */
export const T = 2400;

export const wrapT = (t: number) => ((t % T) + T) % T;

/**
 * Sub-frame time. Motion blur renders its children several times at fractional
 * times; every animated component reads time through useT() so those samples
 * land between frames instead of snapping to integers.
 */
const TimeContext = createContext<number | null>(null);

export const TimeProvider: React.FC<{ t: number; children: React.ReactNode }> = ({ t, children }) => (
    <TimeContext.Provider value={t}>{children}</TimeContext.Provider>
);

export function useT(): number {
    const frame = useCurrentFrame();
    const ctx = useContext(TimeContext);
    return wrapT(ctx ?? frame);
}
