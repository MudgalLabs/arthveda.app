"use client";

import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

import { API_URL } from "@/lib/links";

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

// entry_surface = the FIRST Arthveda surface this anonymous visitor landed on.
// register_once means first touch wins even across the marketing<->app boundary
// (shared arthveda.app cookie). The app registers its own values (trader_profile,
// shared_screener, ...); here we tag the marketing entry pages.
function deriveEntrySurface(pathname: string): string {
    if (pathname === "/") return "marketing_home";
    if (pathname.startsWith("/pricing")) return "marketing_pricing";
    if (pathname.startsWith("/product")) return "marketing_product";
    return "marketing_other";
}

// Collapse the /me subscription into a single plan dimension. Mirrors the app's
// auth_context derivation: a trial carries plan_id="pro" + is_trial, so check
// is_trial first.
function derivePlanTier(sub: {
    status?: string;
    plan_id?: string;
    is_trial?: boolean;
} | null | undefined): "free" | "trial" | "pro" {
    if (sub && sub.status === "active") {
        if (sub.is_trial || sub.plan_id === "trial") return "trial";
        if (sub.plan_id === "pro") return "pro";
    }
    return "free";
}

// If the visitor is already logged into the app, the session cookie rides along
// to the sibling API origin (SameSite=None), so /me tells us who they are. We
// then identify() them on the marketing site too — distinct_id = user_id, with
// name + plan_tier only (never email), matching the app. Anonymous visitors
// (no/invalid session => 401, or a network error) are left untouched: no
// identify(), no person profile.
function identifyIfAuthed() {
    fetch(`${API_URL}/v1/users/me`, { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((body) => {
            const user = body?.data;
            if (!user?.user_id) return; // anonymous — stay anonymous
            posthog.identify(user.user_id, {
                name: user.display_name ?? user.name,
                plan_tier: derivePlanTier(user.subscription),
            });
        })
        .catch(() => {
            // Network/CORS error: stay anonymous, don't break the page.
        });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;

        // No consent gate. Anonymous visitors are never identified; we only
        // identify() a visitor who is already logged into the app (see
        // identifyIfAuthed below), with name + plan_tier and no email.
        // `identified_only` means a person profile is created only on identify().
        // See `arthveda/docs/analytics.md`.
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
        posthog.register_once({ entry_surface: deriveEntrySurface(window.location.pathname) });
        captureInitialUtm();
        identifyIfAuthed();
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
