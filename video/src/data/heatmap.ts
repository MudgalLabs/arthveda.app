import { squarify, type Rect } from "../lib/squarify";
import { gauss, mulberry32 } from "../lib/random";

// Nifty 500 and S&P 500 tiles for the Market Monitor heatmap. Weights are
// rough market caps; daily % moves are seeded. IRFC is the idea that lights up.

const INDIA: [string, number][] = [
    ["RELIANCE", 19], ["HDFCBANK", 14.5], ["TCS", 12], ["BHARTIARTL", 11], ["ICICIBANK", 9.6], ["SBIN", 7.6],
    ["INFY", 6.6], ["LICI", 5.7], ["BAJFINANCE", 5.6], ["HINDUNILVR", 5.6], ["ITC", 5.4], ["LT", 5.0],
    ["HCLTECH", 4.5], ["SUNPHARMA", 4.1], ["KOTAKBANK", 4.0], ["MARUTI", 4.0], ["M&M", 3.9], ["AXISBANK", 3.6],
    ["ULTRACEMCO", 3.4], ["NTPC", 3.3], ["TITAN", 3.1], ["ONGC", 3.0], ["HAL", 3.0], ["ADANIPORTS", 3.0],
    ["POWERGRID", 2.9], ["ADANIENT", 2.9], ["BAJAJFINSV", 2.8], ["BEL", 2.8], ["WIPRO", 2.7], ["DMART", 2.6],
    ["ETERNAL", 2.6], ["BAJAJ-AUTO", 2.4], ["TATAMOTORS", 2.4], ["JSWSTEEL", 2.3], ["COALINDIA", 2.3],
    ["NESTLEIND", 2.3], ["ASIANPAINT", 2.2], ["INDIGO", 2.0], ["IOC", 2.0], ["TRENT", 1.9], ["DLF", 1.9],
    ["HINDZINC", 1.9], ["IRFC", 1.85], ["SBILIFE", 1.8], ["GRASIM", 1.8], ["VBL", 1.7], ["PIDILITIND", 1.6],
    ["TECHM", 1.6], ["EICHERMOT", 1.6], ["DIVISLAB", 1.6], ["HINDALCO", 1.5], ["BPCL", 1.4], ["CIPLA", 1.3],
    ["TATASTEEL", 1.9], ["TVSMOTOR", 1.3], ["GODREJCP", 1.3], ["BRITANNIA", 1.3], ["SHRIRAMFIN", 1.2],
    ["HDFCLIFE", 1.6], ["PFC", 1.5], ["RECLTD", 1.2], ["BANKBARODA", 1.2], ["CHOLAFIN", 1.2], ["TATAPOWER", 1.3],
    ["GAIL", 1.2], ["AMBUJACEM", 1.3], ["LODHA", 1.2], ["INDUSINDBK", 0.6], ["HAVELLS", 1.0], ["ABB", 1.3],
    ["SIEMENS", 1.1], ["DABUR", 0.9], ["PNB", 1.2], ["CANBK", 1.0], ["MAZDOCK", 1.1], ["POLYCAB", 1.1],
    ["DIXON", 1.0], ["PERSISTENT", 0.95], ["CDSL", 0.36], ["KAYNES", 0.42], ["ANGELONE", 0.27], ["COCHINSHIP", 0.55],
];

const US: [string, number][] = [
    ["NVDA", 44], ["AAPL", 39], ["MSFT", 37], ["GOOGL", 26], ["AMZN", 23], ["META", 18], ["AVGO", 16],
    ["TSLA", 14], ["BRK.B", 10.4], ["JPM", 8.2], ["LLY", 8.0], ["WMT", 8.0], ["V", 6.8], ["ORCL", 6.4],
    ["MA", 5.2], ["XOM", 4.9], ["NFLX", 4.9], ["COST", 4.1], ["JNJ", 4.0], ["HD", 3.8], ["PG", 3.6],
    ["ABBV", 3.6], ["BAC", 3.5], ["PLTR", 3.4], ["AMD", 3.3], ["UNH", 3.0], ["KO", 3.0], ["CRM", 2.6],
    ["CSCO", 2.6], ["CVX", 2.6], ["IBM", 2.5], ["WFC", 2.5], ["GE", 2.4], ["MCD", 2.2], ["PM", 2.4],
    ["ABT", 2.2], ["MS", 2.0], ["GS", 2.0], ["AXP", 1.9], ["INTU", 1.9], ["NOW", 1.9], ["T", 1.9],
    ["UBER", 1.8], ["TMO", 1.7], ["VZ", 1.7], ["DIS", 1.7], ["QCOM", 1.7], ["ISRG", 1.7], ["RTX", 1.8],
    ["BKNG", 1.7], ["CAT", 1.8], ["PEP", 1.8], ["ADBE", 1.5], ["TXN", 1.5], ["SPGI", 1.5], ["AMGN", 1.5],
    ["PGR", 1.4], ["BA", 1.4], ["C", 1.4], ["SCHW", 1.4], ["LOW", 1.3], ["HON", 1.3], ["UNP", 1.3],
    ["AMAT", 1.3], ["NEE", 1.4], ["SYK", 1.3], ["PFE", 1.4], ["BLK", 1.4], ["ETN", 1.3], ["DE", 1.3],
    ["MU", 1.3], ["PANW", 1.2], ["ANET", 1.2], ["LMT", 1.1], ["ADP", 1.1], ["KLAC", 1.0], ["LRCX", 1.0],
    ["SBUX", 1.0], ["GILD", 1.0], ["MDT", 1.0], ["CRWD", 1.0], ["SHOP", 1.0], ["APP", 1.0],
];

export type Tile = { rect: Rect; in: { s: string; p: number }; us: { s: string; p: number } };

export const HEAT_W = 1312;
export const HEAT_H = 708;

function moves(n: number, seed: number, mean: number, sd: number) {
    const r = mulberry32(seed);
    return Array.from({ length: n }, () => Math.max(-5.5, Math.min(5.5, mean + gauss(r) * sd)));
}

function build(): Tile[] {
    const n = INDIA.length;
    const rects = squarify(
        INDIA.map((x) => x[1]),
        HEAT_W,
        HEAT_H,
    );
    const pIn = moves(n, 11, 0.35, 1.35);
    const pUs = moves(n, 29, -0.45, 1.45);
    // US names map onto tiles by rank, so the geometry stays put while the
    // cards flip over (the eye reads "the market switched", not "re-layout").
    const inRank = INDIA.map((x, i) => ({ i, w: x[1] })).sort((a, b) => b.w - a.w);
    const usSorted = [...US].sort((a, b) => b[1] - a[1]);
    const usFor: { s: string; p: number }[] = new Array(n);
    inRank.forEach((r, k) => {
        const u = usSorted[k % usSorted.length];
        usFor[r.i] = { s: u[0], p: pUs[k] };
    });
    return INDIA.map((x, i) => ({
        rect: rects[i],
        in: { s: x[0], p: x[0] === "IRFC" ? 4.21 : pIn[i] },
        us: usFor[i],
    }));
}

export const TILES = build();
export const IRFC_TILE = TILES.find((t) => t.in.s === "IRFC")!;

// The app's dark heatmap ramp (heatmap_color.ts): neutral gray to green/red.
const NEG = [163, 39, 29];
const MID = [44, 44, 42];
const POS = [26, 125, 67];
export function heatColor(p: number) {
    const t = Math.max(-1, Math.min(1, p / 6));
    const pole = t >= 0 ? POS : NEG;
    const a = Math.abs(t);
    const c = MID.map((m, k) => Math.round(m + (pole[k] - m) * a));
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
