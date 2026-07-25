// Outbound links to the live Arthveda app. The marketing site never hosts the
// app/screener — these deep-link OUT. Centralized so URLs change in one place.
//
// Environment-aware: in production we point at arthveda.app; in dev at the
// locally-running app on :6969. The app serves at clean URLs (no /app prefix);
// only the home hub lives at /app. NODE_ENV is inlined at build time, so this
// works in client components.

const IS_DEV = process.env.NODE_ENV === "development";

// App root.
export const APP_URL = IS_DEV
    ? "http://localhost:6969/app"
    : "https://arthveda.app/app";

// The free Screener is the single primary CTA across the site (top-of-funnel,
// ungated for anonymous visitors).
export const SCREENER_URL = IS_DEV
    ? "http://localhost:6969/screeners"
    : "https://arthveda.app/screeners";

// The viewer's own trader profile — the Social hub CTA ("Build your profile")
// links here; the app handles the login/redirect if needed.
export const PROFILE_URL = IS_DEV
    ? "http://localhost:6969/profile"
    : "https://arthveda.app/profile";

// Market Monitor — a FREE, anon-readable app surface (heatmaps, sector rotation,
// breadth, FII/DII). Like the Screener, it's a top-of-funnel front door the
// marketing site deep-links OUT to (no login required to look).
export const MARKET_MONITOR_URL = IS_DEV
    ? "http://localhost:6969/market-monitor"
    : "https://arthveda.app/market-monitor";

// AI / MCP setup — the API-keys settings page where a user creates a key to
// connect Claude / Codex / any MCP client. The /product/ai marketing page's CTA
// points here.
export const AI_SETUP_URL = IS_DEV
    ? "http://localhost:6969/settings/api-keys"
    : "https://arthveda.app/settings/api-keys";

// Broker accounts / connect page -- the broker setup guides deep-link here.
export const BROKER_ACCOUNTS_URL = IS_DEV
    ? "http://localhost:6969/accounts"
    : "https://arthveda.app/accounts";

// Backend API base. The marketing site only calls one endpoint (/me, to
// identify an already-logged-in visitor for PostHog — see app/providers.tsx).
// In prod the API is a sibling origin of the marketing site (both under
// arthveda.app), so the session cookie (SameSite=None) rides along and CORS
// allows the arthveda.app origin.
export const API_URL = IS_DEV
    ? "http://localhost:1337"
    : "https://api.arthveda.app";
