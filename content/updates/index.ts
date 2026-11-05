import type { ComponentType } from "react";

import BenchmarkWidget from "@/content/updates/benchmark_widget";
import CompareSymbols from "@/content/updates/compare_symbols";

// Post bodies by slug. Every UPDATES entry (lib/updates.ts) needs one here.
export const UPDATE_BODIES: Record<string, ComponentType> = {
    "compare-symbols": CompareSymbols,
    "benchmark-widget": BenchmarkWidget,
};
