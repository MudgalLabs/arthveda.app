import type { ComponentType } from "react";

import BenchmarkWidget from "@/content/updates/benchmark_widget";

// Post bodies by slug. Every UPDATES entry (lib/updates.ts) needs one here.
export const UPDATE_BODIES: Record<string, ComponentType> = {
    "benchmark-widget": BenchmarkWidget,
};
