// Outbound links to the live Arthveda app. The marketing site never hosts the
// app/screener — these deep-link OUT. Centralized so URLs change in one place.
//
// Keep these production-only so crawlers, social previews, and shared builds
// never expose local development URLs.

// App root.
export const APP_URL = "https://arthveda.app/app/";

// The free Screener is the single primary CTA across the site (top-of-funnel,
// ungated for anonymous visitors).
export const SCREENER_URL = "https://arthveda.app/screeners";

// The viewer's own trader profile — the Social hub CTA ("Build your profile")
// links here; the app handles the login/redirect if needed.
export const PROFILE_URL = "https://arthveda.app/app/profile";
