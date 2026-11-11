import React from "react";
import { ArrowUp, Bookmark, BookmarkCheck, Check, ChevronDown, Columns3, Filter, Save, Share2, X } from "lucide-react";
import { CUE } from "../cues";
import { CANDLES } from "../data/irfc";
import { clamp, EASE, invLerp, outCubic, spring, inCubic } from "../lib/ease";
import { C, F } from "../theme";
import { AppWindow, Btn, Chip, Mono, Typed } from "../ui/kit";
import { CandleChart } from "../ui/chart";

const S = CUE.scr;
const P = CUE.pop;
const REST = 99999;

type Row = { s: string; p: number; chg: number; cap: string; ma: string[] };

const r = (s: string, p: number, chg: number, cap: string, ma = ["10 > 20", "20 > 50", "50 > 200"]): Row => ({ s, p, chg, cap, ma });

// Each filter narrows the universe; the table re-sorts under it.
const SETS: Row[][] = [
    [
        r("20MICRONS", 212.4, -0.82, "749Cr", ["10 > 20"]),
        r("360ONE", 1182.3, 1.12, "46,380Cr", ["10 > 20", "20 > 50"]),
        r("3MINDIA", 31240, -0.35, "35,190Cr", []),
        r("5PAISA", 402.15, 0.64, "1,256Cr", ["20 > 50"]),
        r("63MOONS", 744.9, -1.73, "3,433Cr", []),
        r("AARTIIND", 412.6, 0.21, "14,960Cr", ["10 > 20"]),
        r("AAVAS", 1712.0, -0.4, "13,550Cr", ["50 > 200"]),
        r("ABB", 5611.5, 0.95, "1,18,900Cr", ["10 > 20", "20 > 50"]),
        r("ABBOTINDIA", 30115, 0.12, "63,990Cr", ["50 > 200"]),
        r("ABCAPITAL", 278.35, 1.86, "72,640Cr"),
        r("ACC", 1874.2, -0.66, "35,190Cr", []),
    ],
    [
        r("APARINDS", 9440.5, 2.41, "37,920Cr"),
        r("BSE", 2511.8, 3.02, "1,02,000Cr"),
        r("CDSL", 1742.8, 2.64, "36,420Cr"),
        r("DATAPATTNS", 2805.6, 1.32, "15,710Cr", ["10 > 20", "20 > 50"]),
        r("GRSE", 2689.4, 0.88, "30,800Cr"),
        r("HAL", 4815.2, 1.84, "3,22,040Cr"),
        r("IRFC", 142.85, 1.38, "1,86,690Cr"),
        r("KAYNES", 6412.5, 3.12, "41,020Cr"),
        r("MCX", 8912.0, 1.05, "45,450Cr", ["10 > 20", "50 > 200"]),
        r("NETWEB", 2210.4, -0.52, "12,460Cr", ["20 > 50"]),
        r("PGEL", 812.3, 0.47, "21,300Cr"),
    ],
    [
        r("BEL", 412.35, 2.05, "3,01,400Cr"),
        r("BSE", 2511.8, 3.02, "1,02,000Cr"),
        r("COCHINSHIP", 2115.3, 3.4, "55,650Cr"),
        r("HAL", 4815.2, 1.84, "3,22,040Cr"),
        r("IRFC", 142.85, 1.38, "1,86,690Cr"),
        r("KAYNES", 6412.5, 3.12, "41,020Cr"),
        r("MAZDOCK", 3240.6, 1.11, "1,30,700Cr"),
        r("NETWEB", 2210.4, -0.52, "12,460Cr", ["20 > 50"]),
        r("POLYCAB", 7325.1, 1.21, "1,10,200Cr"),
        r("SOLARINDS", 15420, 0.92, "1,39,500Cr"),
        r("TRENT", 5918.45, -0.42, "2,10,400Cr", ["10 > 20", "50 > 200"]),
    ],
];
const FINAL: Row[] = [
    r("KAYNES", 6412.5, 3.12, "41,020Cr"),
    r("HAL", 4815.2, 1.84, "3,22,040Cr"),
    r("IRFC", 142.85, 1.38, "1,86,690Cr"),
    r("BEL", 412.35, 2.05, "3,01,400Cr"),
    r("COCHINSHIP", 2115.3, 3.4, "55,650Cr"),
    r("CDSL", 1742.8, 2.64, "36,420Cr"),
    r("ANGELONE", 2931.6, 1.95, "26,480Cr"),
    r("DIXON", 17240, 0.92, "1,03,600Cr"),
    r("POLYCAB", 7325.1, 1.21, "1,10,200Cr"),
    r("PERSISTENT", 6284.0, 0.77, "98,100Cr"),
    r("SOLARINDS", 15420, 0.92, "1,39,500Cr"),
];

// Intermediate result sets: each extra filter swaps in names closer to the final list.
SETS.push([...SETS[2].slice(3), ...FINAL.slice(5, 8)]);
SETS.push([...FINAL.slice(0, 7), SETS[2][1], SETS[2][6], SETS[2][9], FINAL[9]]);

const CHIPS = ["1M Performance > 20%", "Close > SMA 50", "ADR 20 > 3%", "Price × Volume > 5Cr", "Near 52W High = Yes"];
const COUNTS = [5454, 1912, 640, 187, 63, 21];

const ROW_H = 66;
const TABLE_W = 560;
const IRFC_ROW = 2;

/** Rolling-digit counter. */
const Odometer: React.FC<{ from: number; to: number; p: number }> = ({ from, to, p }) => {
    const v = Math.round(from + (to - from) * p);
    return <>{v.toLocaleString("en-IN")}</>;
};

const RowView: React.FC<{ row: Row; sel?: number; bookmarked?: number; pulse?: number }> = ({ row, sel = 0, bookmarked = 0, pulse = 0 }) => (
    <div
        style={{
            position: "relative",
            height: ROW_H,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            borderBottom: `1px solid hsl(220, 35%, 15%)`,
            background: sel > 0 ? `rgba(70, 105, 220, ${0.22 * sel})` : "transparent",
        }}
    >
        {sel > 0 && <div style={{ position: "absolute", left: 0, top: 6, bottom: 6, width: 3, borderRadius: 2, background: C.thread, boxShadow: `0 0 12px ${C.threadGlow}`, opacity: sel }} />}
        <div style={{ width: 196 }}>
            <Mono style={{ color: C.link, fontSize: 15.5, fontWeight: 500 }}>{row.s}</Mono>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                {row.ma.map((m) => (
                    <span key={m} style={{ fontSize: 10.5, padding: "1px 5px", borderRadius: 4, background: "hsl(222, 40%, 17%)", color: C.textMuted, fontFamily: F.mono }}>
                        {m}
                    </span>
                ))}
            </div>
        </div>
        <Mono style={{ width: 104, textAlign: "right", fontSize: 15 }}>₹{row.p.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</Mono>
        <Mono style={{ width: 92, textAlign: "right", fontSize: 15, color: row.chg >= 0 ? C.success : C.destructive }}>
            {row.chg >= 0 ? "+" : ""}
            {row.chg.toFixed(2)}%
        </Mono>
        <Mono style={{ width: 112, textAlign: "right", fontSize: 14, color: C.textMuted }}>{row.cap}</Mono>
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {pulse > 0 && pulse < 1 && (
                <div style={{ position: "absolute", inset: -14 * pulse, borderRadius: 999, border: `2px solid rgba(160, 200, 255, ${1 - pulse})` }} />
            )}
            {bookmarked > 0.5 ? (
                <BookmarkCheck size={20} color={C.thread} fill="rgba(80, 130, 255, 0.35)" style={{ transform: `scale(${0.8 + 0.2 * bookmarked})` }} />
            ) : (
                <Bookmark size={20} color={pulse > 0 ? C.thread : C.textSubtle} />
            )}
        </div>
    </div>
);

export const Screener: React.FC<{ t: number }> = ({ t: tIn }) => {
    // Before its scene (and through the wide shot) the screen holds its final state.
    const t = tIn >= S.switch && tIn < CUE.whip2[1] + 200 ? tIn : REST;

    const nChips = CHIPS.filter((_, i) => t >= S.chips + i * S.chipEvery).length;
    const lastChip = nChips > 0 ? S.chips + (nChips - 1) * S.chipEvery : 0;
    const countP = nChips > 0 ? outCubic(clamp((t - lastChip) / 10)) : 0;
    const count = nChips === 0 ? COUNTS[0] : Math.round(COUNTS[nChips - 1] + (COUNTS[nChips] - COUNTS[nChips - 1]) * countP);

    // Which row set is showing (one per filter), and how far into its entrance.
    const isFinal = nChips === CHIPS.length;
    const rows = isFinal ? FINAL : SETS[nChips];
    const setIdx = nChips;
    const setStart = nChips === 0 ? -999 : lastChip + 3;
    const prevRows = nChips === 0 ? null : SETS[nChips - 1];
    const outP = nChips === 0 ? 1 : clamp((t - lastChip) / 5);

    const scanP = clamp(invLerp(S.scan, S.pick, t));
    const scanY = EASE.glide(scanP) * IRFC_ROW * ROW_H;
    const picked = t >= S.pick;
    const sel = picked ? outCubic(clamp((t - S.pick) / 10)) : 0;
    const preview = clamp((t - S.preview) * 1.6);

    const popOpen = spring(t - P.open, 260, 24);
    const popClose = t >= P.add ? inCubic(clamp((t - P.add - 6) / 12)) : 0;
    const popVis = t >= P.open && popClose < 1;
    const typed = clamp(invLerp(P.typeStart, P.typeEnd, t));
    const bookmarked = t >= P.add + 12 ? outCubic(clamp((t - P.add - 12) / 10)) : 0;
    const pulse = t >= S.bookmark && t < P.open + 10 ? ((t - S.bookmark) % 26) / 26 : 0;
    const toast = t >= P.toast ? spring(t - P.toast, 240, 24) : 0;
    const addPress = t >= P.add && t < P.add + 8 ? 1 : 0;

    return (
        <AppWindow active="Screeners" crumbs={["Screeners", "Playground"]}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ height: 38, width: 110, borderRadius: 8, border: `1px solid ${C.borderSoft}`, background: C.bg2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", fontSize: 15 }}>
                    India <ChevronDown size={16} color={C.textMuted} />
                </div>
                <Btn icon={Columns3}>Columns</Btn>
                <Btn icon={Save}>Save</Btn>
                <Btn icon={Share2}>Share</Btn>
            </div>

            {/* filter chips */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16, height: 40 }}>
                {CHIPS.map((c, i) => {
                    const k = spring(t - (S.chips + i * S.chipEvery), 300, 20);
                    if (k <= 0.001) return null;
                    return (
                        <div key={c} style={{ transform: `scale(${0.6 + 0.4 * k})`, opacity: clamp(k * 1.5), transformOrigin: "left center" }}>
                            <Chip tone="neutral" style={{ height: 34, fontSize: 14, padding: "0 10px" }}>
                                <span style={{ fontFamily: F.mono, fontSize: 13.5 }}>{c}</span>
                                <X size={14} color={C.textSubtle} />
                            </Chip>
                        </div>
                    );
                })}
                <div style={{ width: 34, height: 34, borderRadius: 8, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Filter size={16} />
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 15, color: C.textMuted }}>
                    <Mono style={{ color: C.text, fontSize: 17, fontWeight: 600 }}>
                        <Odometer from={count} to={count} p={1} />
                    </Mono>{" "}
                    {nChips === 0 ? "symbols" : "results"}
                </div>
            </div>

            {/* results table */}
            <div style={{ position: "absolute", left: 0, top: 116, width: TABLE_W, bottom: 0, border: `1px solid ${C.borderSubtle}`, borderRadius: 10, overflow: "hidden", background: C.bg1 }}>
                <div style={{ height: 42, display: "flex", alignItems: "center", padding: "0 14px", fontSize: 13.5, color: C.textMuted, borderBottom: `1px solid ${C.borderSubtle}`, background: "hsl(223, 45%, 10%)" }}>
                    <span style={{ width: 196, display: "flex", alignItems: "center", gap: 6 }}>
                        Symbol <ArrowUp size={13} />
                    </span>
                    <span style={{ width: 104, textAlign: "right" }}>Price</span>
                    <span style={{ width: 92, textAlign: "right" }}>Chg %</span>
                    <span style={{ width: 112, textAlign: "right" }}>Mkt Cap</span>
                </div>
                <div style={{ position: "relative" }}>
                    {t >= S.scan && t < S.pick + 8 && (
                        <div style={{ position: "absolute", left: 0, right: 0, top: scanY, height: ROW_H, background: "rgba(90, 130, 255, 0.12)", borderTop: `1px solid rgba(143, 182, 255, 0.35)`, borderBottom: `1px solid rgba(143, 182, 255, 0.35)`, opacity: 1 - clamp((t - S.pick) / 8) }} />
                    )}
                    {/* the previous result set lifts away while the new one cascades in */}
                    {prevRows && outP < 1 && (
                        <div style={{ position: "absolute", left: 0, right: 0, top: 0, opacity: 1 - outP, transform: `translateY(${-16 * outP}px)` }}>
                            {prevRows.map((row) => (
                                <RowView key={`p-${row.s}`} row={row} />
                            ))}
                        </div>
                    )}
                    {rows.map((row, i) => {
                        const k = outCubic(clamp((t - setStart - i * 1.6) / 9));
                        const isIrfc = isFinal && i === IRFC_ROW;
                        return (
                            <div key={`${setIdx}-${row.s}`} style={{ transform: `translateY(${(1 - k) * 18}px)`, opacity: setStart < -100 ? 1 : k }}>
                                <RowView row={row} sel={isIrfc ? sel : 0} bookmarked={isIrfc ? bookmarked : 0} pulse={isIrfc ? pulse : 0} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* chart preview */}
            <div style={{ position: "absolute", left: TABLE_W + 16, right: 0, top: 116, bottom: 0, border: `1px solid ${C.borderSubtle}`, borderRadius: 10, background: C.bg2, overflow: "hidden" }}>
                {picked ? (
                    <div style={{ padding: "16px 18px" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                            <Mono style={{ fontSize: 18, fontWeight: 600 }}>IRFC</Mono>
                            <span style={{ fontSize: 14, color: C.textMuted }}>INDIAN RAILWAY FIN CORP L · NSE</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 8 }}>
                            <Mono style={{ fontSize: 30, fontWeight: 600 }}>₹142.85</Mono>
                            <Mono style={{ fontSize: 16, color: C.success }}>+1.94 (+1.38%)</Mono>
                        </div>
                        <div style={{ marginTop: 18 }}>
                            <CandleChart idPrefix="scr" w={696} h={560} from={44} to={123} reveal={preview * 80} yMin={98} yMax={160} volH={90} ma thread={0.9} />
                        </div>
                    </div>
                ) : (
                    // While the filters land, the empty preview becomes the counter:
                    // the whole universe narrowing down to a shortlist.
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Mono
                            style={{
                                fontSize: 132,
                                fontWeight: 600,
                                letterSpacing: "-0.04em",
                                lineHeight: 1,
                                color: nChips === CHIPS.length ? C.text : "hsl(213, 30%, 88%)",
                                transform: `scale(${1 + 0.06 * (nChips > 0 ? 1 - clamp((t - lastChip) / 10) : 0)})`,
                                textShadow: nChips === CHIPS.length ? "0 0 40px rgba(90, 140, 255, 0.55)" : "none",
                            }}
                        >
                            {count.toLocaleString("en-IN")}
                        </Mono>
                        <div style={{ fontSize: 20, color: C.textMuted }}>{nChips === 0 ? "symbols in the universe" : nChips === CHIPS.length ? "match every filter" : "still match"}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 22 }}>
                            {CHIPS.map((_, i) => (
                                <div key={i} style={{ width: 44, height: 5, borderRadius: 3, background: i < nChips ? C.thread : "hsl(224, 40%, 22%)", boxShadow: i < nChips ? `0 0 10px ${C.threadGlow}` : "none" }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* "Remember why": the note popover on the bookmark */}
            {popVis && (
                <div
                    style={{
                        position: "absolute",
                        left: 300,
                        top: 116 + 42 + ROW_H * (IRFC_ROW + 1) + 6,
                        width: 420,
                        transformOrigin: "236px -20px",
                        transform: `scale(${(0.9 + 0.1 * popOpen) * (1 - 0.75 * popClose)}) translate(${popClose * 120}px, ${-popClose * 60}px)`,
                        opacity: clamp(popOpen * 2) * (1 - popClose),
                        background: C.bg3,
                        border: `1px solid ${C.borderSoft}`,
                        borderRadius: 12,
                        boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(143, 182, 255, ${0.25 + 0.35 * clamp(typed * 3)})`,
                        padding: 18,
                        zIndex: 20,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                            Add <Mono style={{ fontWeight: 600 }}>IRFC</Mono> to watchlist
                        </div>
                        <X size={17} color={C.textMuted} />
                    </div>
                    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
                        {["Breakouts", "Momentum"].map((w, i) => (
                            <div key={w} style={{ height: 38, borderRadius: 8, display: "flex", alignItems: "center", gap: 10, padding: "0 10px", background: i === 0 ? C.secondary : "transparent", fontSize: 15 }}>
                                <span style={{ width: 16 }}>{i === 0 && <Check size={16} color={C.thread} />}</span>
                                {w}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 12, fontSize: 13.5, color: C.textMuted }}>Note when added</div>
                    <div style={{ marginTop: 8, minHeight: 84, borderRadius: 9, border: `1px solid ${typed > 0 ? "hsl(220, 60%, 52%)" : C.borderSoft}`, background: "hsl(225, 40%, 13%)", padding: "11px 12px", fontSize: 18, lineHeight: 1.4 }}>
                        {typed <= 0 ? <span style={{ color: C.placeholder }}>Why? (e.g. 7 stars, VCP)</span> : <Typed text="VCP, 3 weeks tight. Buy the pivot." p={typed} t={t} />}
                    </div>
                    <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        <Btn kind="ghost">Back</Btn>
                        <Btn kind="primary" style={{ transform: `scale(${1 - 0.05 * addPress})`, boxShadow: addPress ? `0 0 0 3px rgba(143,182,255,0.5)` : undefined }}>
                            Add
                        </Btn>
                    </div>
                </div>
            )}

            {/* toast */}
            {toast > 0.001 && t < CUE.whip2[1] + 100 && (
                <div
                    style={{
                        position: "absolute",
                        right: 16,
                        bottom: 16,
                        transform: `translateY(${(1 - toast) * 40}px)`,
                        opacity: clamp(toast * 2),
                        height: 46,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "0 16px",
                        borderRadius: 10,
                        background: "hsl(150, 50%, 9%)",
                        border: `1px solid hsl(150, 60%, 22%)`,
                        fontSize: 15.5,
                        zIndex: 30,
                    }}
                >
                    <Check size={17} color="hsl(150, 70%, 60%)" />
                    <Mono>IRFC</Mono> added to <span style={{ color: C.link }}>Breakouts</span>
                </div>
            )}
        </AppWindow>
    );
};

export const SCR_LOCAL = {
    popover: { x: 260 + 300 + 210, y: 82 + 116 + 42 + ROW_H * 3 + 6 + 150 },
};
