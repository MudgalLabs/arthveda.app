import type { ComponentType } from "react";

import BenchmarkWidget from "@/content/updates/benchmark_widget";
import CompareSymbols from "@/content/updates/compare_symbols";
import InteractiveBrokers from "@/content/updates/interactive_brokers";
import StatsOverTime from "@/content/updates/stats_over_time";
import * as H2025 from "@/content/updates/history_2025";
import * as H2026 from "@/content/updates/history_2026";

// Post bodies by slug. Every UPDATES entry (lib/updates.ts) needs one here.
export const UPDATE_BODIES: Record<string, ComponentType> = {
    "interactive-brokers": InteractiveBrokers,
    "stats-over-time": StatsOverTime,
    "compare-symbols": CompareSymbols,
    "benchmark-widget": BenchmarkWidget,

    // Backfilled 2026 (lib/updates_history.ts).
    "ask-ai": H2026.AskAi,
    "more-brokers": H2026.MoreBrokers,
    "arthveda-goes-global": H2026.ArthvedaGoesGlobal,
    "corporate-actions": H2026.CorporateActions,
    "live-positions": H2026.LivePositions,
    "multi-leg-trades": H2026.MultiLegTrades,
    "verified-trades": H2026.VerifiedTrades,
    "reports-charts": H2026.ReportsCharts,
    "profile-performance-stats": H2026.ProfilePerformanceStats,
    "ten-paying-traders": H2026.TenPayingTraders,
    "dhan-sync": H2026.DhanSync,
    "trade-analysis": H2026.TradeAnalysis,
    "new-charts": H2026.NewCharts,
    "market-monitor": H2026.MarketMonitor,
    help: H2026.Help,
    commodities: H2026.Commodities,
    "trade-sharing": H2026.TradeSharing,
    "dashboard-views": H2026.DashboardViews,
    discover: H2026.Discover,
    "closed-source": H2026.ClosedSource,
    "trader-profiles": H2026.TraderProfiles,
    insights: H2026.Insights,
    "light-theme": H2026.LightTheme,
    reports: H2026.Reports,
    "multi-currency": H2026.MultiCurrency,
    "indmoney-import": H2026.IndmoneyImport,
    "open-source-again": H2026.OpenSourceAgain,

    // Backfilled 2025 (lib/updates_history.ts).
    tags: H2025.Tags,
    "free-trial": H2025.FreeTrial,
    "free-plan-ends": H2025.FreePlanEnds,
    "rich-notes": H2025.RichNotes,
    "trading-calendar": H2025.TradingCalendar,
    "angel-one-kotak-import": H2025.AngelOneKotakImport,
    "first-sale": H2025.FirstSale,
    notifications: H2025.Notifications,
    "pro-plan": H2025.ProPlan,
    "first-contribution": H2025.FirstContribution,
    "zerodha-sync": H2025.ZerodhaSync,
    "open-source": H2025.OpenSource,
    "upstox-import": H2025.UpstoxImport,
    "beta-launch": H2025.BetaLaunch,
    inception: H2025.Inception,
};
