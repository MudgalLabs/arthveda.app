type PositionInstrument = "equity" | "futures" | "options" | "crypto";

type ImportType = "auto" | "today" | "file";

export interface Broker {
    name: string;
    svg: string;
    homepage: string;
    instruments: PositionInstrument[];
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
        homepage: "https://www.angelone.in/",
        instruments: ["equity", "futures", "options"],
        importTypes: ["file"],
    },
    {
        name: "Fyers",
        svg: "/svgs/fyers.svg",
        homepage: "https://fyers.in/",
        instruments: ["options"],
        importTypes: ["file"],
    },
    {
        name: "Groww",
        svg: "/svgs/groww.svg",
        homepage: "https://groww.in/",
        instruments: ["equity"],
        importTypes: ["file"],
    },
    {
        name: "INDmoney",
        svg: "/svgs/indmoney.svg",
        homepage: "https://www.indmoney.com/",
        instruments: ["equity", "options"],
        importTypes: ["file"],
    },
    {
        name: "Kotak Securities",
        svg: "/svgs/kotak_securities.svg",
        homepage: "https://www.kotaksecurities.com/",
        instruments: ["equity", "futures", "options"],
        importTypes: ["file"],
    },
    {
        name: "Upstox",
        svg: "/svgs/upstox.svg",
        homepage: "https://upstox.com/",
        instruments: ["equity", "options"],
        importTypes: ["file"],
    },
    {
        name: "Zerodha",
        svg: "/svgs/zerodha.svg",
        homepage: "https://zerodha.com/",
        instruments: ["equity", "futures", "options"],
        importTypes: ["today", "file"],
        landingPath: "/brokers/zerodha",
    },
];
