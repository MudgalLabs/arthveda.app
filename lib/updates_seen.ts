"use client";

import { useEffect, useState } from "react";

import { UPDATES, latestNewUpdate } from "@/lib/updates";

// The "What's new" dot. localStorage keeps the date of the newest update this
// browser has seen on /updates; the dot shows while a newer one exists.
//
// A browser that has never opened /updates gets the dot only while the newest
// post is still news (latestNewUpdate's 30 days). Otherwise a first-time
// visitor would see a dot for an update from last year.
const STORAGE_KEY = "av_updates_seen";
const SEEN_EVENT = "av:updates-seen";

function readSeen(): string | null {
    try {
        return window.localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function hasUnseen(): boolean {
    const latest = UPDATES[0];
    if (!latest) return false;
    const seen = readSeen();
    // ISO dates (YYYY-MM-DD) compare correctly as strings.
    if (seen) return latest.date > seen;
    return !!latestNewUpdate();
}

// useHasUnseenUpdate is false on the server and the first client render, so
// the static HTML never carries a dot that hydration would then remove.
export function useHasUnseenUpdate(): boolean {
    const [unseen, setUnseen] = useState(false);

    useEffect(() => {
        setUnseen(hasUnseen());
        const clear = () => setUnseen(false);
        window.addEventListener(SEEN_EVENT, clear);
        return () => window.removeEventListener(SEEN_EVENT, clear);
    }, []);

    return unseen;
}

// markUpdatesSeen records the newest update as seen and clears the dot in the
// open navbar straight away (same-tab navigations don't fire `storage`).
export function markUpdatesSeen(): void {
    const latest = UPDATES[0];
    if (!latest) return;
    try {
        window.localStorage.setItem(STORAGE_KEY, latest.date);
    } catch {
        // Private mode / blocked storage: the dot just comes back next visit.
    }
    window.dispatchEvent(new Event(SEEN_EVENT));
}
