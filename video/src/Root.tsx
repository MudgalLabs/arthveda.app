import React from "react";
import { Composition } from "remotion";
import { HeroLoop } from "./HeroLoop";
import { PanelPreview } from "./PanelPreview";
import { Thumbnail } from "./Thumbnail";
import { ChannelBanner } from "./ChannelBanner";
import { T, FPS } from "./lib/time";
import "./lib/fonts";

export const Root: React.FC = () => (
    <>
        <Composition id="HeroLoop" component={HeroLoop} durationInFrames={T} fps={FPS} width={1920} height={1080} />
        <Composition id="ChannelBanner" component={ChannelBanner} durationInFrames={1} fps={FPS} width={2560} height={1440} />
        <Composition id="Thumbnail" component={Thumbnail} durationInFrames={1} fps={FPS} width={1280} height={720} />
        <Composition
            id="Panel"
            component={PanelPreview}
            durationInFrames={T}
            fps={FPS}
            width={1600}
            height={1000}
            defaultProps={{ id: "MM" as const }}
        />
    </>
);
