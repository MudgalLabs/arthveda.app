import React from "react";
import { AbsoluteFill } from "remotion";
import { AccumBlur, DirBlur } from "./lib/blur";
import { useT } from "./lib/time";
import { renderPanel } from "./panels";
import { C } from "./theme";
import { blurAt } from "./world/camera";
import { ThreadOverlay } from "./world/Thread";
import { Backdrop, Vignette, WorldView } from "./world/World";
import { Titles } from "./titles/Titles";

/** One sample of the world (camera + screens + thread) at the current time. */
const WorldSample: React.FC = () => {
    const t = useT();
    return (
        <>
            <WorldView t={t} render={renderPanel} />
            <ThreadOverlay t={t} />
        </>
    );
};

export const HeroLoop: React.FC = () => {
    const t = useT();
    const blur = blurAt(t);
    return (
        <AbsoluteFill style={{ background: C.stage, overflow: "hidden" }}>
            <Backdrop />
            <div style={{ position: "absolute", inset: 0 }}>
                <WorldView t={t} render={renderPanel} layer="backdrop" />
            </div>
            {blur.kind === "accum" ? (
                <AccumBlur samples={blur.samples} shutter={0.6}>
                    <WorldSample />
                </AccumBlur>
            ) : blur.kind === "dir" ? (
                <DirBlur id="whip" sx={blur.sx} sy={blur.sy}>
                    <WorldSample />
                </DirBlur>
            ) : (
                <div style={{ position: "absolute", inset: 0 }}>
                    <WorldSample />
                </div>
            )}
            <Titles />
            <Vignette />
        </AbsoluteFill>
    );
};
