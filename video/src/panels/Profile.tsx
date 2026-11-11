import React from "react";
import { Ellipsis, Flame, Globe, Radar, Bookmark, TrendingUp, UserPlus } from "lucide-react";
import { CUE } from "../cues";
import { clamp, EASE, invLerp, outCubic, spring } from "../lib/ease";
import { mulberry32 } from "../lib/random";
import { C, F } from "../theme";
import { AppWindow, Avatar, Btn, Card, Chip, Mono, PERSONA } from "../ui/kit";

const S = CUE.pro;
const REST = 99999;

// 26 weeks x 7 days of activity (journal entries, notes, trades, publishes).
const ACT = (() => {
    const r = mulberry32(9);
    return Array.from({ length: 26 * 7 }, (_, i) => {
        const wk = Math.floor(i / 7);
        const busy = 0.35 + 0.45 * Math.sin(wk / 3.2) ** 2;
        const v = r();
        return v < busy * 0.35 ? 0 : v < busy * 0.75 ? 1 : v < busy ? 2 : v < 0.93 ? 3 : 4;
    });
})();
const ACT_COL = ["hsl(222, 30%, 15%)", "hsl(224, 45%, 28%)", "hsl(224, 52%, 38%)", "hsl(222, 60%, 50%)", "hsl(216, 70%, 66%)"];

// All-time return % (never amounts on a public profile).
const RET = (() => {
    const r = mulberry32(17);
    const pts: number[] = [];
    let v = 0;
    for (let i = 0; i < 90; i++) {
        const u = i / 89;
        let d = 0.55;
        if (u > 0.3 && u < 0.42) d = -0.7;
        if (u > 0.62 && u < 0.8) d = 1.0;
        v += d + (r() - 0.5) * 1.2;
        pts.push(v);
    }
    return pts.map((p) => (p / pts[pts.length - 1]) * 38.2);
})();

export const Profile: React.FC<{ t: number }> = ({ t: tIn }) => {
    const t = tIn >= S.switch && tIn < CUE.pull[1] ? tIn : REST;
    const ban = EASE.swiftOut(clamp(invLerp(S.build - 4, S.build + 26, t)));
    const av = spring(t - (S.build + 6), 260, 16);
    const nameP = outCubic(clamp((t - (S.build + 12)) / 16));
    const chips = (i: number) => spring(t - (S.build + 22 + i * 5), 320, 18);
    const draw = EASE.glide(clamp(invLerp(S.curve, S.curve + 80, t)));
    const heat = (S.heat + 0) as number;
    const cnt = EASE.swiftOut(clamp(invLerp(S.count, S.count + 60, t)));
    const card = (i: number) => spring(t - (S.cards + i * 10), 220, 22);

    const W = 760,
        H = 250;
    const RMIN = Math.min(...RET),
        RMAX = Math.max(...RET);
    const X = (i: number) => (i / (RET.length - 1)) * W;
    const Y = (v: number) => H - 14 - ((v - RMIN) / (RMAX - RMIN)) * (H - 40);
    const nShown = draw * (RET.length - 1);
    const pts: string[] = [];
    for (let i = 0; i <= Math.floor(nShown); i++) pts.push(`${X(i).toFixed(1)},${Y(RET[i]).toFixed(1)}`);
    const fi = Math.floor(nShown),
        fr = nShown - fi;
    if (fi + 1 < RET.length && fr > 0) pts.push(`${X(fi + fr).toFixed(1)},${Y(RET[fi] + (RET[fi + 1] - RET[fi]) * fr).toFixed(1)}`);

    return (
        <AppWindow active="Profile" crumbs={["Profile"]}>
            {/* banner */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 150,
                    borderRadius: 12,
                    overflow: "hidden",
                    clipPath: `inset(0 ${(1 - ban) * 100}% 0 0 round 12px)`,
                    background:
                        "radial-gradient(120% 140% at 85% 10%, rgba(143,182,255,0.55) 0%, rgba(78,128,238,0.35) 30%, rgba(20,30,70,0) 65%), radial-gradient(90% 120% at 10% 100%, rgba(88,70,200,0.45) 0%, rgba(0,0,0,0) 60%), linear-gradient(120deg, #101a3c 0%, #172a66 55%, #0e1638 100%)",
                }}
            >
                <svg width="100%" height="150" viewBox="0 0 1312 150" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
                    <polyline
                        points={RET.map((v, i) => `${(i / (RET.length - 1)) * 1312},${130 - (v / 38.2) * 100}`).join(" ")}
                        fill="none"
                        stroke="rgba(200, 220, 255, 0.55)"
                        strokeWidth={2}
                    />
                </svg>
            </div>
            <div style={{ position: "absolute", left: 34, top: 82, transform: `scale(${0.6 + 0.4 * av})`, opacity: clamp(av * 1.5), borderRadius: "50%", padding: 5, background: C.bg1 }}>
                <Avatar size={128} />
            </div>
            <div style={{ position: "absolute", right: 0, top: 166, display: "flex", gap: 10, opacity: nameP }}>
                <Btn kind="primary" icon={UserPlus}>
                    Follow
                </Btn>
                <Btn>
                    <Ellipsis size={17} />
                </Btn>
            </div>

            {/* identity */}
            <div style={{ position: "absolute", left: 10, top: 226, opacity: nameP, transform: `translateY(${(1 - nameP) * 12}px)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 28, fontWeight: 650, letterSpacing: "-0.01em" }}>{PERSONA.name}</span>
                    <Chip tone="neutral" style={{ height: 26 }}>
                        <Globe size={13} /> Public
                    </Chip>
                </div>
                <div style={{ fontSize: 16, color: C.textMuted, marginTop: 4 }}>@{PERSONA.handle}</div>
                <div style={{ fontSize: 17, marginTop: 12 }}>Breakouts and base patterns. Process over P&amp;L.</div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    {["Swing", "Positional", "Equity"].map((c, i) => {
                        const p = chips(i);
                        return (
                            <span key={c} style={{ transform: `scale(${0.5 + 0.5 * p})`, opacity: clamp(p * 1.5), display: "inline-block" }}>
                                <Chip tone="blue">{c}</Chip>
                            </span>
                        );
                    })}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 15.5, color: C.textMuted }}>
                    <Flame size={17} color="#f59e0b" /> Current <Mono style={{ color: C.text }}>{Math.round(12 * cnt)} days</Mono> &nbsp;Longest <Mono style={{ color: C.text }}>34 days</Mono>
                </div>
            </div>

            {/* performance (returns only) */}
            <div style={{ position: "absolute", left: 10, top: 468, display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
                <TrendingUp size={17} /> Performance stats
                <span style={{ fontSize: 14, color: C.textMuted, marginLeft: 10 }}>All time · Return</span>
            </div>
            <Card style={{ position: "absolute", left: 0, top: 502, width: 818, height: 300, padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontSize: 14, color: C.textMuted }}>Return</span>
                    <Mono style={{ fontSize: 22, fontWeight: 600, color: C.success }}>+{(38.2 * draw).toFixed(1)}%</Mono>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: 13.5, color: C.textMuted }}>
                        Win rate <Mono style={{ color: C.text }}>54.8%</Mono> &nbsp; Max DD <Mono style={{ color: C.destructive }}>-7.4%</Mono>
                    </span>
                </div>
                <svg width={W} height={H} style={{ marginTop: 6, overflow: "visible" }}>
                    <defs>
                        <linearGradient id="pro-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(73, 224, 136, 0.22)" />
                            <stop offset="100%" stopColor="rgba(73, 224, 136, 0)" />
                        </linearGradient>
                        <filter id="pro-g" x="-10%" y="-30%" width="120%" height="160%">
                            <feGaussianBlur stdDeviation="4" />
                        </filter>
                    </defs>
                    <line x1={0} x2={W} y1={Y(0)} y2={Y(0)} stroke="rgba(143,182,255,0.35)" strokeDasharray="4 4" />
                    {nShown > 1 && <path d={`M0,${Y(RET[0])} L${pts.join(" L")} L${X(nShown)},${Y(0)} L0,${Y(0)} Z`} fill="url(#pro-fill)" />}
                    <polyline points={pts.join(" ")} fill="none" stroke={C.threadGlow} strokeWidth={6} filter="url(#pro-g)" opacity={0.85} />
                    <polyline points={pts.join(" ")} fill="none" stroke={C.thread} strokeWidth={2.2} strokeLinejoin="round" />
                </svg>
            </Card>
            <Card style={{ position: "absolute", left: 0, top: 816, width: 818, bottom: 0, padding: "12px 18px", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 14, color: C.textMuted, width: 60 }}>Activity</span>
                    <div style={{ display: "grid", gridTemplateRows: "repeat(7, 7px)", gridAutoFlow: "column", gridAutoColumns: "24px", gap: 2 }}>
                        {ACT.map((v, i) => {
                            const wk = Math.floor(i / 7);
                            const p = clamp((t - (heat + wk * 1.6 + (i % 7) * 0.4)) / 8);
                            return <div key={i} style={{ height: 7, borderRadius: 1.5, background: p > 0 ? ACT_COL[Math.round(v * p)] : ACT_COL[0] }} />;
                        })}
                    </div>
                </div>
            </Card>

            {/* right column */}
            <div style={{ position: "absolute", left: 846, right: 0, top: 226 }}>
                {[
                    ["Followers", 248],
                    ["Following", 31],
                    ["Trades", 42],
                    ["Screeners", 3],
                    ["Watchlists", 2],
                ].map(([l, v]) => (
                    <div key={l as string} style={{ display: "flex", gap: 10, alignItems: "baseline", height: 32, fontSize: 16.5 }}>
                        <span style={{ color: C.link }}>{l as string}</span>
                        <Mono style={{ fontSize: 17 }}>{Math.round((v as number) * cnt)}</Mono>
                    </div>
                ))}
                <div style={{ fontSize: 15, marginTop: 14 }}>Instruments</div>
                <div style={{ display: "flex", height: 9, borderRadius: 5, overflow: "hidden", marginTop: 8, width: 400 }}>
                    <div style={{ width: `${86.4 * cnt}%`, background: C.equity }} />
                    <div style={{ width: `${9.1 * cnt}%`, background: C.option }} />
                    <div style={{ width: `${4.5 * cnt}%`, background: C.future }} />
                </div>
                <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 13.5, color: C.textMuted }}>
                    <span>● Equity 86.4%</span>
                    <span>● Options 9.1%</span>
                    <span>● Futures 4.5%</span>
                </div>
                <div style={{ fontSize: 15, marginTop: 26 }}>Published</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                    {[
                        [Radar, "VCP Tight Bases", "Screener · run 1,240 times"],
                        [Radar, "Stage 2 Uptrend", "Screener · run 612 times"],
                        [Bookmark, "Breakouts", "Watchlist · 8 symbols"],
                    ].map(([I, h, s], i) => {
                        const p = card(i);
                        const Icon = I as typeof Radar;
                        return (
                            <Card key={h as string} style={{ height: 70, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, opacity: clamp(p * 1.4), transform: `translateX(${(1 - Math.min(1, p)) * 50}px)` }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: "hsl(224, 45%, 18%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon size={19} color={C.azure400} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 16 }}>{h as string}</div>
                                    <div style={{ fontSize: 13.5, color: C.textMuted, marginTop: 3, fontFamily: F.ui }}>{s as string}</div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppWindow>
    );
};
