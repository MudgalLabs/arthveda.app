import React from "react";
import {
    Activity,
    Bell,
    Bookmark,
    CalendarDays,
    ChartCandlestick,
    ChartPie,
    ChevronRight,
    CircleUserRound,
    LayoutGrid,
    Lightbulb,
    MessageCircle,
    PanelLeft,
    Plus,
    Radar,
    Radio,
    Search,
    Sparkles,
    Telescope,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import { C, F } from "../theme";
import { LOGO_PATH, LOGO_VB, WORDMARK_PATH, WORDMARK_VB } from "./brand";

export const PERSONA = { name: "Rohan Iyer", handle: "rohaniyer", initials: "RI" };

export type NavKey =
    | "Market monitor"
    | "Screeners"
    | "Watchlists"
    | "Symbols"
    | "Dashboard"
    | "Insights"
    | "Ask AI"
    | "Trades"
    | "Profile";

const NAV: { section: string; plus?: boolean; items: [string, LucideIcon, string?][] }[] = [
    {
        section: "Discovery",
        items: [
            ["Market monitor", Activity],
            ["Screeners", Radar],
            ["Watchlists", Bookmark],
            ["Symbols", Telescope],
        ],
    },
    {
        section: "Journal",
        plus: true,
        items: [
            ["Live", Radio, "2"],
            ["Dashboard", LayoutGrid],
            ["Insights", Lightbulb],
            ["Ask AI", Sparkles, "New"],
            ["Reports", ChartPie],
            ["Trades", ChartCandlestick],
            ["Calendar", CalendarDays],
            ["Accounts", Wallet],
        ],
    },
    { section: "Social", items: [["Profile", CircleUserRound]] },
];

export const LogoMark: React.FC<{ h: number; color?: string; style?: React.CSSProperties }> = ({
    h,
    color = C.logo,
    style,
}) => (
    <svg width={(h * LOGO_VB.w) / LOGO_VB.h} height={h} viewBox={`0 0 ${LOGO_VB.w} ${LOGO_VB.h}`} style={style}>
        <path d={LOGO_PATH} fill={color} />
    </svg>
);

export const Wordmark: React.FC<{ h: number; color?: string; style?: React.CSSProperties }> = ({
    h,
    color = C.logo,
    style,
}) => (
    <svg
        width={(h * WORDMARK_VB.w) / WORDMARK_VB.h}
        height={h}
        viewBox={`${WORDMARK_VB.x} ${WORDMARK_VB.y} ${WORDMARK_VB.w} ${WORDMARK_VB.h}`}
        style={style}
    >
        <path d={WORDMARK_PATH} fill={color} />
    </svg>
);

export const Avatar: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #5b8def 0%, #7ca6d8 55%, #a7c4ea 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0b1530",
            fontFamily: F.ui,
            fontWeight: 650,
            fontSize: size * 0.38,
            letterSpacing: "-0.02em",
            flexShrink: 0,
            ...style,
        }}
    >
        {PERSONA.initials}
    </div>
);

const Sidebar: React.FC<{ active: NavKey }> = ({ active }) => (
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 232, padding: "20px 14px", fontFamily: F.ui }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, paddingLeft: 8, height: 30 }}>
            <LogoMark h={25} />
            <Wordmark h={25} style={{ marginBottom: 1 }} />
        </div>
        <div
            style={{
                marginTop: 22,
                height: 40,
                border: `1px solid ${C.borderSoft}`,
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                gap: 9,
                color: C.textMuted,
                fontSize: 15,
            }}
        >
            <Search size={17} strokeWidth={2} />
            <span style={{ flex: 1 }}>Search...</span>
            <span
                style={{
                    fontSize: 12,
                    border: `1px solid ${C.borderSoft}`,
                    borderRadius: 5,
                    padding: "1px 6px",
                    color: C.textMuted,
                }}
            >
                ⌘K
            </span>
        </div>
        {NAV.map((sec) => (
            <div key={sec.section} style={{ marginTop: 24 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 6px",
                        fontSize: 12.5,
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        color: C.textMuted,
                    }}
                >
                    {sec.section}
                    {sec.plus && <Plus size={15} />}
                </div>
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                    {sec.items.map(([label, Icon, badge]) => {
                        const on = label === active;
                        return (
                            <div
                                key={label}
                                style={{
                                    height: 36,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 11,
                                    padding: "0 9px",
                                    borderRadius: 8,
                                    background: on ? C.secondary : "transparent",
                                    color: on ? C.text : "hsl(213, 25%, 86%)",
                                    fontSize: 15,
                                }}
                            >
                                <Icon size={18} strokeWidth={1.8} />
                                <span>{label}</span>
                                {badge && (
                                    <span
                                        style={{
                                            fontSize: badge === "New" ? 11 : 11.5,
                                            padding: badge === "New" ? "1px 6px" : "0 7px",
                                            borderRadius: 999,
                                            background: "hsl(222, 50%, 22%)",
                                            color: "hsl(213, 80%, 78%)",
                                            fontFamily: badge === "New" ? F.ui : F.mono,
                                        }}
                                    >
                                        {badge}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        ))}
        <div style={{ position: "absolute", left: 14, right: 14, bottom: 18 }}>
            {[
                ["Help", MessageCircle],
                ["Notifications", Bell],
            ].map(([label, Icon]) => {
                const I = Icon as LucideIcon;
                return (
                    <div
                        key={label as string}
                        style={{ height: 36, display: "flex", alignItems: "center", gap: 11, padding: "0 9px", color: "hsl(213, 25%, 86%)", fontSize: 15 }}
                    >
                        <I size={18} strokeWidth={1.8} />
                        {label as string}
                    </div>
                );
            })}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, paddingLeft: 4 }}>
                <Avatar size={34} />
                <div>
                    <div style={{ fontSize: 14.5, color: C.text }}>{PERSONA.name}</div>
                    <span
                        style={{
                            fontSize: 11.5,
                            padding: "0 6px",
                            borderRadius: 4,
                            border: `1px solid ${C.borderSoft}`,
                            color: C.azure400,
                        }}
                    >
                        Pro
                    </span>
                </div>
            </div>
        </div>
    </div>
);

/** One app window: sidebar + the rounded content frame with a breadcrumb bar. */
export const AppWindow: React.FC<{
    active: NavKey;
    crumbs: string[];
    right?: React.ReactNode;
    children: React.ReactNode;
}> = ({ active, crumbs, right, children }) => (
    <div
        style={{
            position: "absolute",
            inset: 0,
            background: C.bg0,
            borderRadius: 16,
            overflow: "hidden",
            fontFamily: F.ui,
            color: C.text,
        }}
    >
        <Sidebar active={active} />
        <div
            style={{
                position: "absolute",
                left: 240,
                top: 8,
                right: 8,
                bottom: 8,
                background: C.bg1,
                border: `1px solid ${C.borderSubtle}`,
                borderRadius: 11,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    height: 54,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "0 18px",
                    borderBottom: `1px solid hsl(220, 35%, 15%)`,
                }}
            >
                <PanelLeft size={18} color={C.textMuted} strokeWidth={1.8} />
                <div style={{ width: 1, height: 22, background: C.borderSubtle }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16.5 }}>
                    {crumbs.map((c, i) => (
                        <React.Fragment key={c}>
                            {i > 0 && <ChevronRight size={15} color={C.textMuted} />}
                            <span style={{ color: i === crumbs.length - 1 ? C.text : "hsl(213, 25%, 86%)", fontWeight: 500 }}>
                                {c}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
                <div style={{ flex: 1 }} />
                {right}
            </div>
            <div style={{ position: "absolute", left: 20, right: 20, top: 74, bottom: 18 }}>{children}</div>
        </div>
    </div>
);

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
    <div
        style={{
            background: C.bg2,
            border: `1px solid ${C.borderSubtle}`,
            borderRadius: 10,
            position: "relative",
            ...style,
        }}
    >
        {children}
    </div>
);

type Tone = "neutral" | "green" | "red" | "blue" | "solid";
const TONES: Record<Tone, React.CSSProperties> = {
    neutral: { background: "hsl(222, 40%, 17%)", color: "hsl(213, 30%, 82%)", border: `1px solid hsl(220, 35%, 24%)` },
    green: { background: C.successBg, color: "hsl(150, 70%, 62%)", border: `1px solid ${C.successBorder}` },
    red: { background: C.errorBg, color: "hsl(356, 100%, 76%)", border: `1px solid ${C.errorBorder}` },
    blue: { background: "hsl(224, 52%, 22%)", color: "hsl(213, 90%, 80%)", border: `1px solid hsl(222, 52%, 32%)` },
    solid: { background: C.primary, color: C.text, border: `1px solid ${C.primaryHover}` },
};

export const Chip: React.FC<{ tone?: Tone; style?: React.CSSProperties; children: React.ReactNode }> = ({
    tone = "neutral",
    style,
    children,
}) => (
    <span
        style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 26,
            padding: "0 9px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            whiteSpace: "nowrap",
            ...TONES[tone],
            ...style,
        }}
    >
        {children}
    </span>
);

export const Btn: React.FC<{
    kind?: "primary" | "secondary" | "ghost";
    icon?: LucideIcon;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}> = ({ kind = "secondary", icon: Icon, style, children }) => (
    <div
        style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 38,
            padding: "0 14px",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 500,
            whiteSpace: "nowrap",
            background: kind === "primary" ? C.primary : kind === "secondary" ? C.secondary : "transparent",
            color: C.text,
            border: kind === "ghost" ? "1px solid transparent" : `1px solid ${kind === "primary" ? C.primaryHover : C.borderSoft}`,
            ...style,
        }}
    >
        {Icon && <Icon size={17} strokeWidth={1.9} />}
        {children}
    </div>
);

export const Mono: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
    <span style={{ fontFamily: F.mono, fontVariantNumeric: "tabular-nums", ...style }}>{children}</span>
);

export const Label: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
    <div style={{ fontSize: 14, color: C.textMuted, ...style }}>{children}</div>
);

export const signed = (v: number, digits = 2, suffix = "") =>
    `${v >= 0 ? "+" : "-"}${Math.abs(v).toFixed(digits)}${suffix}`;

export const inr = (v: number, digits = 2) => {
    const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return `${v < 0 ? "-" : ""}₹${s}`;
};

export const signedInr = (v: number, digits = 2) => `${v >= 0 ? "+" : "-"}${inr(Math.abs(v), digits)}`;

export const pnlColor = (v: number) => (v >= 0 ? C.success : C.destructive);

/** Typing reveal with a caret. `p` is 0..1 of the string; caret blinks after. */
export const Typed: React.FC<{ text: string; p: number; t: number; caret?: boolean; style?: React.CSSProperties }> = ({
    text,
    p,
    t,
    caret = true,
    style,
}) => {
    const n = Math.round(text.length * Math.max(0, Math.min(1, p)));
    const typing = p > 0 && p < 1;
    const on = typing || Math.floor(t / 30) % 2 === 0;
    return (
        <span style={style}>
            {text.slice(0, n)}
            {caret && (
                <span
                    style={{
                        display: "inline-block",
                        width: 2,
                        height: "1.15em",
                        marginLeft: 1,
                        verticalAlign: "-0.18em",
                        background: C.azure400,
                        opacity: on ? 1 : 0,
                    }}
                />
            )}
        </span>
    );
};
