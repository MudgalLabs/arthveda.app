// The whole film on one sheet (frames at 60fps, loop = 2400). Every scene,
// camera move, title and pulse reads its timing from here.

export const CUE = {
    dive: [20, 108] as const,

    mm: { flipUS: 128, flipBack: 200, ignite: 252 },
    whip1: [316, 356] as const, // Market Monitor -> Screener

    scr: { switch: 330, chips: 362, chipEvery: 13, scan: 440, pick: 470, preview: 474, bookmark: 528 },
    pop: { open: 552, typeStart: 578, typeEnd: 634, add: 660, toast: 672 },
    whip2: [704, 744] as const, // Screener -> Watchlist

    wl: { switch: 716, row: 748, count: 760, note: 778 },
    whip3: [864, 904] as const, // Watchlist -> Symbol (down)

    sym: { switch: 876, candles: 908, candlesEnd: 1004, markers: 1022, markerEvery: 30, highlight: 1176 },
    whip4: [1284, 1324] as const, // Symbol -> Trade (down)

    trd: { switch: 1296, numbers: 1330, tags: 1380, execs: 1394, typeStart: 1436, typeEnd: 1514 },
    whip5: [1564, 1604] as const, // Trade -> Insights (left)

    ins: { switch: 1576, kpis: 1606, curve: 1614, cards: 1676, cardEvery: 18 },
    whip6: [1804, 1840] as const, // Insights -> Ask AI (left)

    ai: { switch: 1814, cards: 1838, copy: 1860, chat: 1866, ask: 1874, answer: 1894, bars: 1918 },
    whip7: [1972, 2008] as const, // Ask AI -> Profile (up)

    pro: { switch: 1982, build: 2008, heat: 2036, curve: 2042, count: 2066, cards: 2104 },
    pull: [2212, 2388] as const, // Profile -> wide

    logo: { trace: 2318, traceEnd: 2366, flash: 2360 },

    titles: [
        { kicker: "01 · Discover", a: "Find the", b: "idea.", in: 66, out: 436 },
        { kicker: "02 · Watchlists", a: "Remember", b: "why.", in: 544, out: 836 },
        { kicker: "03 · Symbol Journey", a: "Watch it", b: "unfold.", in: 884, out: 1060 },
        { kicker: "04 · Journal", a: "Learn what", b: "works.", in: 1304, out: 1470 },
        { kicker: "05 · Profile", a: "Show your", b: "process.", in: 1990, out: 2184 },
    ],

    // Pulse legs: the light leaves the logo, visits each screen in story order
    // and comes home. [start, end] per leg.
    legs: [
        [12, 104],
        [316, 354],
        [704, 742],
        [864, 902],
        [1284, 1322],
        [1564, 1602],
        [1804, 1838],
        [1972, 2006],
        [2214, 2320],
    ] as [number, number][],
};
