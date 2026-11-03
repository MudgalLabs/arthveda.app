"use client";

import { useEffect } from "react";

import { markUpdatesSeen } from "@/lib/updates_seen";

// Rendered by app/updates/layout.tsx: opening the timeline or any post counts
// as having seen what's new.
export default function MarkUpdatesSeen() {
    useEffect(() => {
        markUpdatesSeen();
    }, []);
    return null;
}
