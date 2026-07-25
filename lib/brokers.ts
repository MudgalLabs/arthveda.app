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
        importTypes: ["file"],
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
        landingPath: "/brokers/dhan",
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
        importTypes: ["file"],
        landingPath: "/brokers/fyers",
    },
    {
        name: "Groww",
        svg: "/svgs/groww.svg",
        icon: "/svgs/icons/groww.svg",
        homepage: "https://groww.in/",
        instruments: ["equity"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "F&O", state: "manual" },
        ],
        importTypes: ["file"],
        landingPath: "/brokers/groww",
    },
    {
        name: "INDmoney",
        svg: "/svgs/indmoney.svg",
        icon: "/svgs/icons/indmoney.svg",
        homepage: "https://www.indmoney.com/",
        instruments: ["equity", "options"],
        segments: [
            { label: "Cash", state: "supported" },
            { label: "Options", state: "supported" },
            { label: "Futures", state: "on-request" },
        ],
        importTypes: ["file"],
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
        importTypes: ["file"],
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
        importTypes: ["file"],
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
