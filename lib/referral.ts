// Referral links (docs/referrals.md): any Arthveda URL with ?ref=<code>, on the
// marketing site or the app, credits the visitor to that code (e.g. an intern).
//
// The code is kept in a first-party cookie, NOT only in PostHog, because
// ad-blockers drop posthog-js entirely and the DB is the ground truth for "who
// brought this customer". First link wins: once set, a later ?ref= is ignored
// (same model as initial_utm_* and entry_surface). After signup the app claims
// the cookie onto user_profile.referral_code and clears it (auth_context).
//
// Keep in sync with the app's copy in arthveda/web/src/lib/referral.ts.

const COOKIE = "av_ref";
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;
// Must match referralCodePattern in api/internal/feature/userprofile/service.go.
const CODE_PATTERN = /^[a-z0-9_-]{2,32}$/;

function cookieAttrs(maxAge: number): string {
    const host = window.location.hostname;
    // Domain-wide so www./apex and marketing/app all see the same cookie.
    const domain = host === "arthveda.app" || host.endsWith(".arthveda.app") ? "; Domain=.arthveda.app" : "";
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    return `; Path=/; Max-Age=${maxAge}; SameSite=Lax${domain}${secure}`;
}

export function normalizeReferralCode(raw: string | null | undefined): string | null {
    const code = (raw ?? "").trim().toLowerCase();
    return CODE_PATTERN.test(code) ? code : null;
}

export function getReferralCode(): string | null {
    const match = document.cookie.match(/(?:^|;\s*)av_ref=([^;]*)/);
    return match ? normalizeReferralCode(decodeURIComponent(match[1])) : null;
}

export function clearReferralCode() {
    document.cookie = `${COOKIE}=${cookieAttrs(0)}`;
}

// captureReferral reads ?ref= from the current URL, stores it if no code is
// stored yet, and strips it from the address bar so a link the visitor copies
// and forwards doesn't keep crediting the same referrer. Returns the code that
// is now in effect (the stored one when first-wins kept an earlier code).
export function captureReferral(): string | null {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get("ref");
    if (raw === null) return getReferralCode();

    const existing = getReferralCode();
    const code = normalizeReferralCode(raw);
    if (!existing && code) {
        document.cookie = `${COOKIE}=${encodeURIComponent(code)}${cookieAttrs(MAX_AGE_SECONDS)}`;
    }

    url.searchParams.delete("ref");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);

    return existing ?? code;
}
