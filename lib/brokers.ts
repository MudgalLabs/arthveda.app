type PositionInstrument = "equity" | "futures" | "options" | "crypto";

type ImportType = "auto" | "today" | "file";

/** How a trading segment can get into a user's Arthveda journal for a broker. */
export type SegmentState =
    /** Parsed automatically from the broker's export. */
    | "supported"
    /** The broker doesn't let you export this segment, so it can only be logged
        manually. Arthveda still supports the segment, just not the import. */
    | "manual"
    /** Not built yet, but the broker does export it, so we can add it on request
        once someone shares a sample export. */
    | "on-request";

/** The trading segments we describe on broker chips. Kept as a closed set so
    the underlyings shown for each (see SEGMENT_DETAIL in segment_chips.tsx) stay
    consistent across every broker and page. */
export type SegmentLabel = "Cash" | "F&O" | "Options" | "Futures";

export interface BrokerSegment {
    label: SegmentLabel;
    state: SegmentState;
    /** Overrides SEGMENT_DETAIL when a broker covers fewer underlyings than the
        segment usually does (Groww's API has no MCX, so no commodity F&O). */
    detail?: string;
}

export interface Broker {
    name: string;
    /** Wide wordmark logo (brand name baked in). Used by the homepage scrolling
        broker strip. */
    svg: string;
    /** Square brand icon mark. Used next to the broker name on /brokers cards
        and in the table view. */
    icon: string;
    homepage: string;
    /** Raw instrument enum that the import can parse today (machine-facing,
        used for logic). For human-facing display of segment support and the
        manual / on-request states, use `segments`. */
    instruments: PositionInstrument[];
    /** Human-facing segment support, grouped and labelled for display chips. */
    segments: BrokerSegment[];
    importTypes: ImportType[];
    /** The broker has no per-trade export at all (Dhan), so file upload is
        impossible, not just unbuilt: show a dash instead of "Request". */
    fileUploadUnavailable?: boolean;
    isComingSoon?: boolean;
    /** Internal SEO landing page for this broker, if one exists. Drives the
        "Learn more" link on the /brokers card and the homepage logo link. */
    landingPath?: string;
}

export const BROKERS: Broker[] = [
    {
        name: "Angel One",
        svg: "/svgs/angel_one.svg",
        icon: "/svgs/icons/angel_one.svg",
        homepage: "https://www.angelone.in/",
        instruments: ["equity", "futures", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "supported" },
        ],
        importTypes: ["today", "file"],
        landingPath: "/brokers/angel-one",
    },
    {
        name: "Dhan",
        svg: "/svgs/dhan.svg",
        icon: "/svgs/icons/dhan.svg",
        homepage: "https://dhan.co/",
        instruments: ["equity", "futures", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "supported" },
        ],
        importTypes: ["auto"],
        fileUploadUnavailable: true,
        landingPath: "/brokers/dhan",
    },
    {
        name: "Definedge",
        svg: "/svgs/icons/definedge.svg",
        icon: "/svgs/icons/definedge.svg",
        homepage: "https://www.definedgesecurities.com/",
        instruments: ["equity", "futures", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "supported" },
        ],
        importTypes: ["today"],
        landingPath: "/brokers/definedge",
    },
    {
        name: "FYERS",
        svg: "/svgs/fyers.svg",
        icon: "/svgs/icons/fyers.svg",
        homepage: "https://fyers.in/",
        instruments: ["equity", "options", "futures"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "Options", state: "supported" },
            { label: "Futures", state: "supported" },
        ],
        importTypes: ["auto", "file"],
        landingPath: "/brokers/fyers",
    },
    {
        name: "Groww",
        svg: "/svgs/groww.svg",
        icon: "/svgs/icons/groww.svg",
        homepage: "https://groww.in/",
        instruments: ["equity", "futures", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "supported", detail: "index, stocks" },
        ],
        importTypes: ["today", "file"],
        landingPath: "/brokers/groww",
    },
    {
        name: "INDmoney",
        svg: "/svgs/indmoney.svg",
        icon: "/svgs/icons/indmoney.svg",
        homepage: "https://www.indmoney.com/",
        instruments: ["equity", "futures", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "supported" },
        ],
        importTypes: ["today", "file"],
        landingPath: "/brokers/indmoney",
    },
    {
        name: "Kotak Securities",
        svg: "/svgs/kotak_securities.svg",
        icon: "/svgs/icons/kotak_securities.svg",
        homepage: "https://www.kotaksecurities.com/",
        instruments: ["equity", "futures", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "supported" },
        ],
        importTypes: ["today", "file"],
        landingPath: "/brokers/kotak-securities",
    },
    {
        name: "Upstox",
        svg: "/svgs/upstox.svg",
        icon: "/svgs/icons/upstox.svg",
        homepage: "https://upstox.com/",
        instruments: ["equity", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "Options", state: "supported" },
            { label: "Futures", state: "on-request" },
        ],
        importTypes: ["today", "file"],
        landingPath: "/brokers/upstox",
    },
    {
        name: "Zerodha",
        svg: "/svgs/zerodha.svg",
        icon: "/svgs/icons/zerodha.svg",
        homepage: "https://zerodha.com/",
        instruments: ["equity", "futures", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "supported" },
        ],
        importTypes: ["today", "file"],
        landingPath: "/brokers/zerodha",
    },
];

/** A broker or trading platform Arthveda does NOT support yet, listed on
    /brokers only to collect demand ("Request this broker").

    Deliberately a separate type and list from `Broker` / `BROKERS`: it has no
    segments, import types, wordmark or `landingPath`, so the homepage logo
    strip, the supported table and the sitemap can never pick one up. Don't add
    landing pages or links for these; we don't want them ranking for
    "<broker> trading journal" while the import doesn't exist. */
export interface UnsupportedPlatform {
    name: string;
    /** Square brand icon, rendered muted. */
    icon: string;
    group: UnsupportedPlatformGroup;
    /** Short qualifier under the name (e.g. "incl. thinkorswim"). */
    note?: string;
}

export type UnsupportedPlatformGroup = "India" | "US" | "Platforms" | "Crypto";

export const UNSUPPORTED_PLATFORM_GROUPS: UnsupportedPlatformGroup[] = [
    "India",
    "US",
    "Platforms",
    "Crypto",
];

export const UNSUPPORTED_PLATFORMS: UnsupportedPlatform[] = [
    // India
    { name: "ICICI Direct", icon: "/svgs/icons/icici_direct.svg", group: "India" },
    {
        name: "HDFC Securities",
        icon: "/svgs/icons/hdfc_securities.svg",
        group: "India",
        note: "incl. HDFC Sky",
    },
    { name: "Motilal Oswal", icon: "/svgs/icons/motilal_oswal.svg", group: "India" },
    { name: "Paytm Money", icon: "/svgs/icons/paytm_money.svg", group: "India" },
    // US
    {
        name: "Interactive Brokers",
        icon: "/svgs/icons/interactive_brokers.svg",
        group: "US",
    },
    {
        name: "Charles Schwab",
        icon: "/svgs/icons/charles_schwab.svg",
        group: "US",
        note: "incl. thinkorswim",
    },
    { name: "Robinhood", icon: "/svgs/icons/robinhood.svg", group: "US" },
    { name: "Webull", icon: "/svgs/icons/webull.svg", group: "US" },
    // Platforms
    {
        name: "MetaTrader 4 / 5",
        icon: "/svgs/icons/metatrader.svg",
        group: "Platforms",
    },
    { name: "NinjaTrader", icon: "/svgs/icons/ninjatrader.svg", group: "Platforms" },
    {
        name: "TradingView",
        icon: "/svgs/icons/tradingview.svg",
        group: "Platforms",
        note: "Paper trading",
    },
    // Crypto
    { name: "Binance", icon: "/svgs/icons/binance.svg", group: "Crypto" },
    { name: "Coinbase", icon: "/svgs/icons/coinbase.svg", group: "Crypto" },
    { name: "Bybit", icon: "/svgs/icons/bybit.svg", group: "Crypto" },
    {
        name: "Delta Exchange",
        icon: "/svgs/icons/delta_exchange.svg",
        group: "Crypto",
    },
];
