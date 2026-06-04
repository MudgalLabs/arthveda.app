"use client";

import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

// Capture first-touch campaign attribution for the anonymous session. Because we
// run `identified_only` and never call identify(), there's no person profile, so
// PostHog's built-in `$initial_utm_*` person props are never stored. We register
// them ourselves with register_once (first touch wins) so the source rides along
// on every event — including the "Get started" click that crosses into the app
// via the shared arthveda.app cookie. This is our "signup source".
function captureInitialUtm() {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
        const value = params.get(key);
        if (value) utm[`initial_${key}`] = value;
    }
    if (Object.keys(utm).length > 0) posthog.register_once(utm);
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;

        // Anonymous analytics: no consent gate, no identify(), no PII. We track
        // what visitors do, not who they are. `identified_only` means no person
        // profile is ever created. See `arthveda/docs/analytics.md`.
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            defaults: "2025-05-24",
            person_profiles: "identified_only",
            // App Router navigates via the History API; "history_change" re-fires
            // $pageview on every client-side route change (the default fires once).
            // pageleave powers accurate bounce rate / time-on-page.
            capture_pageview: "history_change",
            capture_pageleave: true,
        });

        // surface separates the marketing site's events from the app's in the
        // shared PostHog project. The app registers surface: "app".
        posthog.register({ surface: "landing" });
        captureInitialUtm();
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
