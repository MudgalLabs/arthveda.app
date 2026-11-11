import React from "react";
import { AbsoluteFill } from "remotion";
import { useT } from "./lib/time";
import { renderPanel } from "./panels";
import type { CellId } from "./world/layout";

/** Flat, unscaled view of one screen for design review. */
export const PanelPreview: React.FC<{ id: CellId }> = ({ id }) => {
    const t = useT();
    return <AbsoluteFill style={{ background: "#000" }}>{renderPanel(id, t)}</AbsoluteFill>;
};
