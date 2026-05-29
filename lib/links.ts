// Outbound links to the live Arthveda app. The marketing site never hosts the
// app/screener — these deep-link OUT. Centralized so URLs change in one place.
//
// Environment-aware: in production we point at arthveda.app; in dev we point at
// the locally-running app on :6969, where every route is served under an /app
// prefix. NODE_ENV is inlined at build time, so this works in client components.

const IS_DEV = process.env.NODE_ENV === "development";

// App root.
export const APP_URL = IS_DEV
    ? "http://localhost:6969/app/"
    : "https://arthveda.app/app/";

// The free Screener is the single primary CTA across the site (top-of-funnel,
// ungated for anonymous visitors).
export const SCREENER_URL = IS_DEV
    ? "http://localhost:6969/app/screeners"
    : "https://arthveda.app/screeners";

// The viewer's own trader profile — the Social hub CTA ("Build your profile")
// links here; the app handles the login/redirect if needed.
export const PROFILE_URL = IS_DEV
    ? "http://localhost:6969/app/profile"
    : "https://arthveda.app/app/profile";
