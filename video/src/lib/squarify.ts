// Copied from arthveda web/src/features/market_monitor/treemap_layout.ts so the
// video's heatmap uses the app's exact layout algorithm.
// Squarified treemap layout (Bruls, Huizing, van Wijk 2000).
//
// lightweight-charts is for time series and recharts' Treemap can't do the
// finviz-style custom tile (per-tile fill from a performance scale, hover lift,
// SymbolLink click), so we compute the layout ourselves and render plain
// absolutely-positioned divs. The algorithm greedily packs items into rows
// along the shorter side of the remaining rectangle, keeping tile aspect ratios
// close to 1 so the biggest names read as blocks, not slivers.

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Item {
    area: number; // scaled to pixels^2
    index: number; // original index, so caller maps back to its data
}

// squarify returns one Rect per input value, in the ORIGINAL order (values[i]
// -> rects[i]). Values must be non-negative; zero/negative are treated as a
// tiny epsilon so every tile still gets a (vanishing) slot rather than breaking
// the layout. Caller should filter those out for display.
export function squarify(values: number[], width: number, height: number): Rect[] {
    const rects: Rect[] = values.map(() => ({ x: 0, y: 0, w: 0, h: 0 }));
    if (width <= 0 || height <= 0 || values.length === 0) return rects;

    const positive = values.map((v) => (v > 0 ? v : 1e-9));
    const total = positive.reduce((a, b) => a + b, 0);
    const scale = (width * height) / total;

    const items: Item[] = positive.map((v, index) => ({ area: v * scale, index })).sort((a, b) => b.area - a.area);

    let free: Rect = { x: 0, y: 0, w: width, h: height };
    let row: Item[] = [];

    const flush = () => {
        if (row.length === 0) return;
        layoutRow(row, free, rects);
        free = shrink(free, sumArea(row));
        row = [];
    };

    for (const item of items) {
        const side = Math.min(free.w, free.h);
        if (row.length === 0) {
            row.push(item);
            continue;
        }
        // Would adding item improve (lower) the worst aspect ratio of the row?
        // If not, close the row and start a new one on the remaining rect.
        const current = worstRatio(row, side);
        const candidate = worstRatio([...row, item], side);
        if (candidate <= current) {
            row.push(item);
        } else {
            flush();
            row.push(item);
        }
    }
    flush();

    return rects;
}

function sumArea(row: Item[]): number {
    return row.reduce((a, b) => a + b.area, 0);
}

// worstRatio is the worst (largest) width:height ratio among tiles in a row
// laid along `side`. Lower is squarer.
function worstRatio(row: Item[], side: number): number {
    const s = sumArea(row);
    if (s <= 0 || side <= 0) return Infinity;
    const rowLength = s / side; // thickness of the strip
    let worst = 0;
    for (const item of row) {
        const length = item.area / rowLength; // extent of this tile along `side`
        const ratio = Math.max(rowLength / length, length / rowLength);
        if (ratio > worst) worst = ratio;
    }
    return worst;
}

// layoutRow places a completed row as a strip along the shorter side of `free`,
// writing each item's Rect into results at its original index.
function layoutRow(row: Item[], free: Rect, results: Rect[]) {
    const s = sumArea(row);
    if (s <= 0) return;

    if (free.w >= free.h) {
        // Vertical strip on the left: width = thickness, items stack downward.
        const thickness = s / free.h;
        let offset = free.y;
        for (const item of row) {
            const h = item.area / thickness;
            results[item.index] = { x: free.x, y: offset, w: thickness, h };
            offset += h;
        }
    } else {
        // Horizontal strip on top: height = thickness, items run rightward.
        const thickness = s / free.w;
        let offset = free.x;
        for (const item of row) {
            const w = item.area / thickness;
            results[item.index] = { x: offset, y: free.y, w, h: thickness };
            offset += w;
        }
    }
}

// shrink removes the just-laid strip from the free rectangle.
function shrink(free: Rect, rowArea: number): Rect {
    if (free.w >= free.h) {
        const thickness = rowArea / free.h;
        return { x: free.x + thickness, y: free.y, w: free.w - thickness, h: free.h };
    }
    const thickness = rowArea / free.w;
    return { x: free.x, y: free.y + thickness, w: free.w, h: free.h - thickness };
}
