import React from "react";
import type { CellId } from "../world/layout";
import { MarketMonitor } from "./MarketMonitor";
import { Screener } from "./Screener";
import { Watchlist } from "./Watchlist";
import { SymbolPage } from "./SymbolPage";
import { TradeReview } from "./TradeReview";
import { Insights } from "./Insights";
import { AskAI } from "./AskAI";
import { Profile } from "./Profile";

export const renderPanel = (id: CellId, t: number): React.ReactNode => {
    switch (id) {
        case "MM":
            return <MarketMonitor t={t} />;
        case "SCR":
            return <Screener t={t} />;
        case "WL":
            return <Watchlist t={t} />;
        case "SYM":
            return <SymbolPage t={t} />;
        case "TRD":
            return <TradeReview t={t} />;
        case "INS":
            return <Insights t={t} />;
        case "AI":
            return <AskAI t={t} />;
        case "PRO":
            return <Profile t={t} />;
    }
};
