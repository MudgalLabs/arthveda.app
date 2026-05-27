# Arthveda v2 Marketing Site — Build Plan

> **Purpose.** The buildable spec for the v2 redesign of `arthvedadotapp`
> (arthveda.app). It turns the product brief into concrete IA, pages, copy
> direction, and routing. The product source of truth is the `arthveda` repo's
> `docs/marketing_context.md` (+ sibling feature docs); when a product *fact* is
> in question, that doc wins. This doc owns the *site* decisions.
>
> Locked: 2026-05-26. Stack: Next.js 15 (App Router) + Tailwind v4, deployed on
> Cloudflare via OpenNext. Visual identity: dark, indigo/blue glow,
> screenshot-forward (Linear-grade quality, not a Linear clone).

---

## 1. Positioning (locked)

- **Headline:** **Trading OS for India**
- **Subtitle (verbatim):** *"Built for swing traders to discover stocks, build
  intelligent watchlists, track their journey with every stock, journal trades,
  and share their process — not just P&L. All from one workspace."*
  - Phrasing is deliberate: consistent **third person** ("their journey / their
    process", never a your/their mix), and **"their journey with every stock"**
    (the trader's personal history), not "every stock's journey."
- **ICP:** Indian equity **swing traders** (EOD/daily-candle, NSE/BSE). Not
  intraday scalpers, not options-Greeks power users, not algo builders.
- **Emotional core:** *process over P&L*. Confident and modern; never hype,
  get-rich, tips/signals, or finfluencer energy.
- **Guardrails (do not market):** not a broker, not a charting platform, not
  intraday/streaming, not a leaderboard/copy-trading network, not tips/guaranteed
  returns. **Do not leak the roadmap** — see §8.
- **Metadata (locked — replaces the v1 journal metadata in `app/layout.tsx`):**
  - **Title:** `Trading OS for India · Arthveda` — *center dot `·`, never a pipe `|`.*
  - **Description** (~155 chars, derived from the hero subtitle, **no "free"
    callout**): `Built for Indian swing traders: discover stocks, build intelligent
    watchlists, track their journey with every stock, journal trades, and share
    their process.`
  - **Keywords (v2, replacing the journal-centric set):** trading OS India, stock
    screener India, swing trading India, trading journal India, trading watchlist,
    trader profile.
  - **OG / JSON-LD:** swap the OG image off `performance_hero.png` to a v2 visual;
    the JSON-LD `SoftwareApplication` description must match the new positioning
    (drop the "losing money" line). Per-page metadata on `/product/*`, `/pricing`,
    etc. also needs the v2 refresh — the current `app/layout.tsx` is 100% v1 journal.

---

## 2. The story the site tells

Sell the **workflow loop**, not a feature list:

> **Discover → Organize → Track → Reflect → Publish**

The **Screener is the gravity well**: free, ungated for anonymous visitors, the
top-of-funnel and the single primary CTA everywhere. Login is the ask for
*persistence, combination, and identity* — never for first-touch value.

---

## 3. Information architecture

Three **product families** today, each a hub with **feature pages** underneath.
The architecture scales: **Options** and **Algo** become sibling families only
when they ship (not before — not in nav, not on the site).

```
Product
├── Discover        find, organize, and track stock ideas
│   ├── Screener            [shipped]
│   ├── Progressive Scan    [shipped]
│   ├── Watchlists          [shipped]
│   └── Symbol Journey      [shipped]   (per-symbol workspace, /symbols/:ticker)
│
├── Journal         review trades and improve your process  (this is all of v1)
│   ├── Dashboard           [shipped]
│   ├── Insights            [shipped]
│   ├── Reports & Analytics [shipped]
│   ├── Trades              [shipped]   (was "Positions")
│   ├── Notebook            [shipped]   (trade notes + screenshots; was "Journal")
│   ├── Calendar            [shipped]
│   ├── Tagging             [shipped]
│   └── Accounts            [shipped]   (multi-account / broker import)
│
└── Social          build a public trading identity
    └── Trader Profiles     [shipped]   (the ONLY shipped Social product)
```

### Feature-inventory accuracy (the anchor — do not invent features)

**Social ships exactly one product: Trader Profiles.** It is rich, but its parts
are *surfaces inside the profile*, not separate products:
- Profile home: curated **showcase** (pinned screeners + watchlists),
  instruments-traded sidebar, **activity heatmap + distribution + recent
  timeline**, streak.
- Followers / Following list pages.
- The profile's **published screeners** and **published watchlists** list pages.
- **Find traders** (search; login required).

**Not shipped — keep OFF the site entirely** (no pages, no pills, no copy):
- Shared/Published **trades** (with verified-broker PnL + auto-generated chart) —
  future.
- **Chart Study** — future.
- **Feed** (activity of people you follow) — future.
- **Clans** (private/public trader groups) — future.
- Symbol-Journey **screenshots** — future (the Journey ships without them).
- Watchlist/Screener "notes" are **private (Pro)** — never framed as shareable.

---

## 4. Navigation

Top nav (left → right): **logo · Product ▾ · Pricing · Log in · Open app**

- **Open app** is the primary pill (not "Sign up" — there are free surfaces).
- **Product ▾** is a Linear-style mega-menu containing the three families. Each
  family label links to its hub page; under it, one-liner links go **straight to
  each feature page** (serve both the browser and the high-intent visitor). Only
  families that exist today appear — add Algo/Options later.

```
Discover · Find and track stock ideas
  Screener           Scan the whole NSE/BSE
  Progressive Scan   Stocks that keep showing up
  Watchlists         Track performance, with add/remove notes
  Symbol Journey     Your full history with every symbol

Journal · Review trades, improve your process
  Dashboard · Insights · Reports & Analytics · Trades · Notebook · Calendar · Tagging · Accounts

Social · Build your public trading identity
  Trader Profiles    Showcase your process, not just P&L
```

---

## 5. Homepage (`/`)

Minimal, premium, vision-first. **No product switcher** — the hero video is the
interactive hook; the three product blocks below are calm, stacked, static. Hook
→ explore.

**Section order:**

1. **Navbar**
2. **Hero** — headline + locked subtitle, **one** primary CTA *"Get started"*
   (filled, **sentence case** — see Copy voice; "Start for free" is the one-word
   swap if we ever want the friction-reducer) + a quiet secondary *"Explore
   product"* (ghost). **No "free"-callout helper line** — the product is free to
   enter; we don't shout it. The hero visual is the **flow-loop video** (see §6).
3. **"Watch the full walkthrough"** — directly under the hero video. Opens an
   **on-site overlay with a lite/facade YouTube embed** (thumbnail + play button;
   heavy iframe loads only on click). Primary cut is **English**; a small *"Watch
   in Hindi"* link sits beside it (separate YouTube upload, for Hindi-search
   discovery). **Do not redirect to YouTube** — keep the visitor on arthveda.app.
4. **Product blocks (3 stacked, static).** Discover · Journal · Social, each =
   one screenshot + one-liner + *"Explore [family] →"* into the hub. **No tabs.**
   Stacked is more scannable, better on mobile, and SEO-visible (not hidden
   behind a switcher). Screenshots (deduped against the video, which is
   Discovery-flow only and ends on the Symbol Journey):
   - **Discover → Screener** result view (the free front door; the video already
     covered the command center, so don't repeat it here).
   - **Journal → Insights** (where you make/lose money — the differentiator;
     *not* shown in the video). Dashboard is the fallback if Insights doesn't crop
     cleanly.
   - **Social → trader profile, no banner** (face/bio/activity/sidebar; add one
     screener showcase item only if the heatmap still reads in the crop). Also not
     in the video.
   The **static broker strip** lives inside / right after the **Journal** block —
   *"Works alongside your broker"* (real supported list from `lib/brokers.ts`,
   Dhan removed; static, not a marquee). The Screener's *"no broker login
   required"* and Journal's *"imports from your broker"* reinforce each other.
5. **Social proof** — the existing real user-message screenshots, curated for
   tone (nothing that reads as P&L bragging). Headline e.g. *"Built with traders,
   not in a vacuum."*
6. **Founder note** — short, founder-led, authentic; rewrite the existing
   `founder_letter` content. Process-over-P&L, no tips/signals.
7. **FAQ** — see §9.
8. **Final CTA** — *"Start building your trading process"* → *"Get started"* /
   *"Open app"*.
9. **Footer** — grouped by product (Discover / Journal / Social feature links) +
   Company (Founder note, Contact, Terms, Privacy, Refund). **No roadmap.**

**Family blurbs / CTAs for the 3 product blocks:**
- **Discover** — *"Find ideas. Track what happened next."* Run screeners, combine
  scans, save to intelligent watchlists, and keep your journey with every stock.
  → Explore Discover.
- **Journal** — *"Know where your trading works — and where it breaks."* Log or
  import trades, journal decisions, and use **performance analytics + insights**
  to see where you make money, where you lose it, and what to fix. → Explore
  Journal.
- **Social** — *"Build proof around your process."* Publish your screeners and
  watchlists and showcase how you think — without a P&L leaderboard or a noisy
  feed. → Explore Social.

**Copy voice (locked).**
- **Don't shout "free."** The product is free to enter; people discover what's
  gated by clicking. No "free screener" / "try the free screener" in CTAs, hero, or
  metadata. ("Start for free" as a button is acceptable; anchoring "free" on the
  *screener* is not.)
- **The Screener is the acquisition surface, NOT the sell.** We don't win on "best
  screener." Sell the **connected workflow** (everything around the trade except
  execution, intraday/live charts, and price alerts). CTAs stay product-level
  ("Get started"), never screener-level ("Try the screener").
- **Button / CTA case = sentence case** (Deepvue-style): "Get started", "Open app",
  "Explore product". The repo's current **"Open App"** (Title Case) →
  change to **"Open app"**. Nav *section* labels may stay single-word Title Case
  (Discover, Journal, Social, Pricing).
- **Button icons.** Filled **primary CTA → no icon** (the fill carries it):
  "Get started". **App-launch / nav button → trailing arrow** (outbound "go" cue):
  "Open app →". **Secondary text / ghost link → small chevron** for affordance:
  "Explore product ›". Keep arrows subtle — static or a gentle translate-on-hover
  nudge, never aggressive. Applies to: `navbar.tsx` ("Open app →"),
  `get_started.tsx` / `hero.tsx` ("Get started" with no icon; secondary "Explore
  product ›").
- **Page-title format: center dot `·`, never a pipe `|`** — e.g.
  `Trading OS for India · Arthveda`.
- **Naming — "Symbol" for feature names, "stock" for descriptive copy
  (decision 2026-05-27, supersedes the earlier "market it as Stock Journey"
  call).** Split by *word type*, not by surface:
  - **Proper-noun feature/page names use "Symbol"** — on the site *and* in the
    app — so the two never call the same thing different names. The per-symbol
    workspace is **"Symbol Journey"** (not "Stock Journey"); code/DB/URLs stay
    `/symbols/:ticker`, `symbol_id`.
  - **Descriptive copy** (headlines, subtitles, blurbs, body) speaks the ICP's
    language: **"stock(s)"** — "discover stocks", "your journey with every stock".
  Why "Symbol" is the product primitive: it's instrument-agnostic — the coming
  equity F&O / index F&O / commodity F&O underlyings all resolve to a symbol, so
  naming it "Stock" now forces a rename later. **Don't mix both nouns in one tight
  phrase.** (Source of truth: `arthveda/docs/marketing_context.md` §8.)

---

## 6. Visual media strategy

**One hero flow-loop video + static screenshots everywhere else.**

- **Hero = ONE flow-loop video (~30s)** showing the connected loop end-to-end —
  this is the only artifact that proves "it all connects," which is the whole v2
  thesis — scoped to **Discover → Journal** (we deliberately do **not** force
  Social into the loop; see below). Script (~25–30s; **IRFC is the hero symbol
  throughout**): run a screener (real results — demonstrates discovery) → on the
  watchlist, **Add Symbol → IRFC** (added explicitly via "Add Symbol", since the
  live screener can't be relied on to return IRFC) with a short *real* note
  ("7★ VCP, buy > 450") → click **IRFC's row** in the watchlist to open its symbol page (no ⌘K — a row-click reads more clearly in a 2s window) → chart zooms to full history
  with your trade markers → click a **trade marker** → the **Journey** item
  highlights (the "it connects" money shot) → click **Trade** → the **journal
  entry** opens (entries/exits on the chart, tags, note). End on that journal
  payoff, then gently loop back to the screener.
  - **Front-load the hook:** the first ~5s must be visually gripping (skimmers
    won't watch 30s), then let the narrative play.
  - **Type real content into the app's own fields — not meta-narration.** The
    watchlist note is a *real* reason ("7★ VCP, 3 weeks tight — buy > 195, stop
    182"); the journal entry is a short *real* reflection ("Bought the breakout,
    added on the pullback to the 10-DMA, trailed out under the 20-DMA — clean trend
    trade."). Don't type "talking to the viewer" text ("now I'm
    journaling my logged trade") into the fields — it makes the data look fake and
    turns the demo into a tutorial. Narrate via the **on-screen overlay labels**
    (outside the app UI): "Discover" → "Track it — with your reason" → "Its whole
    journey" → "Reflect in the journal". Keep typed text short — no slow
    full-sentence type-out; viewers can't read much in a muted 30s loop.
  - **Autoplay, muted, looping** — it just plays; **no click-to-play and no big
    play button** on the hero loop (that affordance belongs to the in-depth
    walkthrough below). A subtle **pause/scrub** control + short on-screen
    **English** labels (match the app UI). **No persistent caption overlay** in the
    final — the loop narrates itself. Respect `prefers-reduced-motion`: don't
    autoplay — show the poster with a small play control instead.
  - **Poster frame (the LCP + reduced-motion still) = the `/symbols/IRFC` command
    center** — chart with your trade markers + the Journey timeline + the
    performance snapshot. It's the richest, most differentiated still ("this
    connects everything," not "just a screener") and the loop's visual peak. A
    polished composed still is fine; it needn't be an exact video frame.
  - **Discover + Journal only — NOT Social.** The loop's job is to prove
    *connection*, and find → track → reflect nails it as one believable
    single-session story. Publishing to a profile is a different *kind* of action
    (identity, not workflow continuity); cramming it in makes the loop a tour, not
    a story. Social gets its own product block + family page below.
  - **Performance:** a great **poster frame is the LCP** (instant paint); the
    video **lazy-loads and streams after**. Video in the hero ≠ slow when done
    this way.
- **In-depth walkthrough (15–20min):** hosted on **YouTube**, embedded via a
  **facade/lite-embed in an on-site overlay** (thumbnail + play; load the iframe
  only on click). **English primary**, separate **Hindi** upload linked beside it
  + an in-video shout-out to both language links. Never redirect off-site.
- **Everywhere else = static screenshots.** The 3 homepage product blocks
  (Discover→Screener, Journal→Insights, Social→profile) and **one clean
  screenshot per feature page.** Add short clips later only where motion sells
  (Progressive Scan confluence; watchlist intelligence updating).
- Rationale for static-elsewhere: ship speed, Core Web Vitals, and
  maintainability while the product is actively evolving.

---

## 7. Page templates

### Family hub page (`/product/{discover|journal|social}`)
Headline + subtitle → one stacked section per shipped feature (visual + 2–3 line
pitch + link to the feature page) → a "how this connects to the other families"
beat → a family-appropriate CTA.

- **Discover:** *"Discover and track better stock ideas."* CTA: Open the screener.
- **Journal:** *"Turn trades into feedback."* Protects v1's depth — Journal must
  still read as a serious product. CTA: Start journaling.
  - **Re-home the v1 journal feature cards here.** The product cards that lived on
    the v1 homepage / Product section (Insights, Performance, Reports, Trades,
    Calendar, Tagging, Accounts) **become the feature cards on `/product/journal`**
    — they leave the homepage (which now carries only the 3 stacked family blocks)
    and live under the Journal hub. This is the concrete form of "Journal keeps its
    full v1 depth, re-parented, not deleted." Each card links to its feature page
    (`/product/journal/{insights|reports|calendar|...}`); see the §11 redirect map.
- **Social:** *"Build a public trading identity around your process."* Only the
  Trader Profiles story. CTA: View trader profiles.

### Feature page (`/product/{family}/{feature}`)
Consistent template: 1) hero one-liner, 2) the problem, 3) what it does, 4) a
workflow visual/screenshot, 5) benefit bullets, 6) access line, 7) CTA. These are
**marketing pages that link OUT** to the live app surface — the marketing site
never hosts the screener/app.

Example — **Progressive Scan:** *"Find stocks that keep showing up."* Run multiple
screeners into one session; repetition becomes signal, not duplicate noise.
Access: *"Free — account required to save your scan session."* CTA: Start
Progressive Scan free.

---

## 8. Roadmap handling (locked: do not leak)

No `/roadmap` page (the current one gets **removed / 301'd to `/`**). No named
future tools anywhere (no algo, options, replay, backtesting, market pulse,
feed, clans). The homepage may carry **one vague line** near the end, e.g.:

> *"Arthveda starts with the core swing-trading workflow — and keeps expanding
> into a broader workspace for serious Indian traders."*

That's the ceiling.

---

## 9. FAQ (accurate answers)

- **Is Arthveda a broker?** No — it never executes or controls trades. It's the
  workflow + identity layer around your broker.
- **Is the Screener free?** Yes — run scans and open any published screener with
  no signup. A free account is needed to save, star, clone, or publish screeners,
  and to use Progressive Scan.
- **Which markets?** Indian equities, NSE/BSE.
- **Is it for intraday?** No — built for swing/positional, daily/EOD workflows.
- **Can I import trades from my broker?** Yes — the Journal supports logging and
  broker imports (see the brokers page for the supported list).
- **Will my trades and notes be public?** No — private by default; nothing is
  public unless you explicitly publish/share it.
- **Tips or signals?** No — process, discovery, journaling, and review. Never
  guaranteed returns, tips, or copy-trading.

---

## 10. Access model (for CTAs / pricing copy)

Single source of truth: `arthveda/docs/marketing_context.md` §6. Summary:
- **Anonymous + free:** run any screener, view/explore published screeners,
  view public profiles/watchlists.
- **Free login:** save / star / clone / publish screeners; have a profile;
  **Progressive Scan** (decision 2026-05-26: moving Pro → free + login; anon
  deferred; pending product change).
- **Pro/Trial (today):** Watchlists, Symbol Journey + private notes, full Journal.
  The broader freemium split is **in flux** — keep the pricing teaser **soft**;
  do not hardcode tier copy until the founder finalizes it.

---

## 11. Routing & redirects

**New routes:** `/`, `/product/discover` (+ `/screener`, `/progressive-scan`,
`/watchlists`, `/symbol-journey`), `/product/journal` (+ `/dashboard`,
`/insights`, `/reports`, `/trades`, `/notebook`, `/calendar`, `/tagging`,
`/accounts`), `/product/social` (+ `/trader-profiles`), `/pricing`, `/brokers`,
`/about`, `/contact`, `/privacy`, `/terms`, `/refund`.

**301 the old v1 `/product/*` pages** so we don't drop journal SEO:
| Old | New |
| --- | --- |
| `/product/journal` | `/product/journal` (now the hub) |
| `/product/insights` | `/product/journal/insights` |
| `/product/performance` | `/product/journal/reports` |
| `/product/reports` | `/product/journal/reports` |
| `/product/trades` | `/product/journal/trades` |
| `/product/calendar` | `/product/journal/calendar` |
| `/product/tagging` | `/product/journal/tagging` |
| `/product/accounts` | `/product/journal/accounts` |
| `/roadmap` | `/` |

**SEO — two-property split.** The long-tail (per-stock pages, published
screeners, trader profiles) lives in the **app** (it ships sitemaps + prerender).
The marketing site targets **category/brand terms** ("trading OS India", "stock
screener India", "trading journal India") and funnels into the app. Don't try to
rank marketing pages for per-stock/per-screener terms — that's the app's job;
avoid cannibalization/duplicate content.

---

## 12. Open items (need founder input before/at build)

- **Pricing architecture** — freemium vs Pro split beyond the Screener is undecided.
  Pricing teaser stays soft until locked.
- **Founder note copy** — to be rewritten.
- **Real broker list** — confirm against `lib/brokers.ts`; never list unsupported
  brokers.
- **Anon Progressive Scan** — deferred; revisit only on funnel data.
