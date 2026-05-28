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

Top nav (left → right): **logo · Product ▾ · Brokers · Pricing · Open app →**

- **Open app →** is the primary pill (trailing arrow; not "Sign up" — there are
  free surfaces).
- **Product ▾ = just the 3 family cards** — Discover, Journal, Social — each with a
  one-line subtitle, each linking to its hub (`/product/discover|journal|social`).
  **No per-feature links and no `#anchor` deep-links.** Rationale: the family names
  are abstract (esp. "Social"), so the subtitle does the explaining and a dropdown
  gives it room; the hub page itself lists the features. This **decouples the nav
  from each hub's card count** — add / rename / collapse cards freely, the nav never
  needs to match (this is what makes the card choices "guilt-free"). It mirrors the
  homepage's 3 stacked family blocks, and scales: Options/Algo become a 4th/5th
  card only when they ship.

```
Product ▾
  Discover   Find, track, and remember your stock ideas        → /product/discover
  Journal    Review trades and improve your process            → /product/journal
  Social     Build a public trading identity                   → /product/social
```

- **Why not bare flat links** (Deepvue-style Charts/Screener/…): Deepvue's words are
  self-explanatory tool names; ours are abstract layers, so they need the subtitle.
- **Feature-level SEO pages** (e.g. `/product/discover/screener`) can be added later
  and linked from the hub + sitemap — they don't need to live in the nav.

---

## 5. Homepage (`/`)

Minimal, premium, vision-first. **No product switcher** — the hero video is the
interactive hook; the three product blocks below are calm, stacked, static. Hook
→ explore.

**Section order:**

1. **Navbar**
2. **Hero** — headline + locked subtitle, **one** primary CTA *"Start for free"*
   (filled, **sentence case** — see Copy voice; rolled forward 2026-05-28 from
   the earlier "Get started" to put the friction-reducer in the button itself,
   since the whole-product-usable-free story is now central) + a quiet secondary
   *"Explore product"* (ghost). **No extra "free" callout line below the CTA** —
   the button already carries it; don't double up. The hero visual is the
   **flow-loop video** (see §6).
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
8. **Final CTA** — *"Start building your trading process"* → *"Start for free"* /
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
  ("Start for free"), never screener-level ("Try the screener").
- **Button / CTA case = sentence case** (Deepvue-style): "Start for free", "Open app",
  "Explore product". The repo's current **"Open App"** (Title Case) →
  change to **"Open app"**. Nav *section* labels may stay single-word Title Case
  (Discover, Journal, Social, Pricing).
- **Primary CTA label = "Start for free"** (locked 2026-05-28). Build action:
  flip the default in `components/get_started.tsx` so the component returns
  **"Start for free"** when no `label` prop is passed; drop the explicit
  `label="Get started"` on the Free plan card in `app/pricing/plans_table.tsx`
  and let the default kick in; update `hero.tsx`'s hard-coded "Get started" to
  match. Family hubs continue overriding via `label` ("Start journaling",
  "Open the screener", etc.).
- **Button icons.** Filled **primary CTA → no icon** (the fill carries it):
  "Start for free". **App-launch / nav button → trailing arrow** (outbound "go"
  cue): "Open app →". **Secondary text / ghost link → small chevron** for
  affordance: "Explore product ›". Keep arrows subtle — static or a gentle
  translate-on-hover nudge, never aggressive. Applies to: `navbar.tsx` ("Open
  app →"), `get_started.tsx` / `hero.tsx` ("Start for free" with no icon;
  secondary "Explore product ›").
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
- **Naming — "Trade" is the canonical noun for a logged position; "Execution"
  for an individual fill.** Locked 2026-05-28. **Use "trade" everywhere** in
  marketing copy (hero, feature labels, table rows, body, CTAs) — never
  "position." Inside a trade there are one or more **executions** (entries /
  exits / partials); surface "executions" only when you actually need to talk
  about row-level mechanics, never in headline copy. The app is renaming
  `/positions` → `/trades` and the inner "Trades" table → "Executions" in
  parallel (committed v2 — see `arthveda/docs/todo.md` §4) so the two surfaces
  align at launch. Source of truth: `arthveda/docs/marketing_context.md` §5.

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

### Discover & Social hub page copy (ready to build)

Mirror the `/product/journal` build (`lib/journal_sections.ts` + `FeatureCard`):
left-aligned hero (label / heading / subheading; no CTAs in the hero) → 2-up grid
of feature cards → a closing CTA. **Card copy is second person** ("…so you…"),
matching the Journal cards. **Naming:** feature *labels* use "Symbol", *prose* uses
"stock" — never both in one phrase (see `marketing_context.md` §8). **Keep card
counts even** (2 per row): Discover = 4, Social = 4 (we drop a dedicated "Find
traders" card — it's about discovering *others*, off-thesis for a "build your
identity" page; it lives in the hero subheading + the CTA instead). Card images at
**2×**, from **one demo account with IRFC as the recurring hero stock**; no empty
states; keep framing consistent with the Journal cards.

#### `/product/discover` — label "Discover" · title `Discover · Arthveda`
- **Hero heading:** Find ideas. Track what happens next.
- **Hero subheading:** Scan the whole market, save what matters with the reason you added it, and keep a running history of every stock you track — so good ideas don't slip away.
- **Metadata description:** Scan the whole NSE/BSE, build intelligent watchlists with the reason you added each stock, and keep a full history of every stock you track.
- **CTA:** Open the screener
- **Cards** (`lib/discover_sections.ts`):

| id | label | heading | subheading | image + shot |
|---|---|---|---|---|
| `screener` | Screener | Scan the whole market in seconds. | Filter every NSE/BSE stock by price, volume, technicals, and breakout signals, and inspect each hit with an inline chart, so you go from noise to a shortlist fast. | `/images/discover/screener.png` — result view: filter chips + ~8–10 names (IRFC among them) + inline chart preview on a selected row. |
| `progressive-scan` | Progressive Scan | Find the stocks that keep showing up. | Run several screeners into one session and surface the names that repeat across them, so confluence becomes your signal instead of duplicate noise. | `/images/discover/progressive_scan.png` — the Unique/Duplicate split (or Repeat-signals panel) with a symbol shown across 2–3 screeners + the floating session box. |
| `watchlists` | Watchlists | Watchlists that remember why. | Add a note to every stock you track and see how it moved since — percent change, max gain, max drawdown — so you learn whether your reasoning actually worked. | `/images/discover/watchlists.png` — populated watchlist table with the intelligence columns + a legible note ("7★ VCP…"). |
| `symbol-journey` | Symbol Journey | Every stock gets a timeline. | Open any stock to see your full history with it — every watchlist add, note, and trade on one timeline beside the chart — so the whole story stays in one place. | `/images/discover/symbol_journey.png` — the `/symbols/IRFC` command center: chart + markers + Journey timeline + performance snapshot. **Same frame as the hero video poster — reuse it.** |

#### `/product/social` — label "Social" · title `Social · Arthveda`
- **Hero heading:** Build a reputation on your process.
- **Hero subheading:** Your public profile shows how you actually trade — your published screeners and watchlists, your activity, your consistency — so you build credibility on process, not P&L screenshots.
- **Metadata description:** Build a public trading identity around your process — your screeners, watchlists, and activity — and follow traders who think like you. Not a P&L leaderboard.
- **CTA:** View trader profiles  (alt: Create your profile)
- **Cards** (`lib/social_sections.ts`) — **2 cards**, both crops of one rich profile:

| id | label | heading | subheading | image + shot |
|---|---|---|---|---|
| `showcase` | Showcase | Show your work, not your P&L. | Publish your screeners and watchlists for anyone to open and clone, and pin your best to a showcase, so your reputation rests on your ideas, not P&L screenshots. | `/images/social/showcase.png` — the profile's showcase + published screeners/watchlists (pinned main card + thumbs + the published grid). |
| `activity` | Activity | Let your consistency show. | An activity heatmap, a workflow breakdown, and a recent timeline, so your discipline is visible to others — and you can see whether you're running the full process or just logging trades. | `/images/social/activity.png` — heatmap (populated) + the workflow/category distribution + the recent-activity timeline. |

> **Why only 2 cards:** "Trader Profile" was dropped — the hero already says the
> page is about building your identity, so a "your identity, on one page" card is
> redundant. "Showcase" + "Published work" were **merged** — same idea (your
> published screeners/watchlists, curated). "Find traders" stays off the grid
> (discovering *others* is off-thesis; carried by the hero subheading + CTA). Two
> cards is honest for the thinnest family, stays even, and grows as Social does.

> **Nav doesn't mirror these cards — by design.** Per §4, the Product menu lists
> **only the 3 families** (no per-feature nav links anywhere), so no hub's card
> count ever needs to match the nav — that's exactly what makes these card choices
> free. The "Social" family card links to this hub (`/product/social`); the page
> CTA ("View trader profiles") points to the live `/traders` app. When Social gains
> real surface area later, collapse Trader Profiles into 1–2 cards freely — nothing
> in the nav changes.

### `/pricing` page copy & UX

> **Model locked 2026-05-28: FREEMIUM + 30-day Pro trial.** Everyone can use the
> whole workflow free, with **hard caps**. Serious users upgrade to lift them.
> **Always free, no caps (the growth engine — never touch this):** the Screener
> (running scans, anon), viewing any published screener/watchlist/profile, any
> stock's chart + performance, and **all of Social** (profile, publish, showcase,
> activity, find/follow). Caps bite on **personal workflow depth** — watchlist
> count/size, journal volume, history windows, broker accounts, screenshots, tags.
> Price numbers stay a moving target; the *structure + caps* below are what's fixed.

**Goal:** a visitor sees instantly that *the whole product is usable free*, and
that Pro lifts the limits when serious daily use bumps into them.

**Header — match the `/product/*` hub hero exactly** (so `/pricing` reads as a
sibling of `/product/discover|journal|social`, not a different page template).
Mirror the structure and spacing of `app/product/journal/page.tsx`:

```
<section className="pt-12 md:pt-16 lg:pt-20">
  <FamilyLabel name="Pricing" Icon={...} />     {/* eyebrow */}
  <h1 className="mt-5 max-w-3xl text-balance font-heading
                 text-[40px] font-medium leading-[1.04]
                 tracking-[-0.025em] text-text-primary
                 sm:text-[52px] lg:max-w-none lg:text-[60px]">
    {heading}
  </h1>
  <p className="mt-5 max-w-3xl font-content text-[15px]
                leading-[1.6] text-text-muted">
    {subline}
  </p>
</section>

{/* Full-bleed divider, same as product hubs. */}
<hr className="relative left-1/2 mt-20 w-screen -translate-x-1/2
               border-t border-[hsl(220,20%,13.5%)] md:mt-24" />

{/* Plans table starts here, mt-24 down from the hr. */}
<div className="mt-24">...</div>
```

No CTAs in the hero. Left-aligned; **not** the centered `page-header`.

- **Label:** Pricing
- **Heading (locked from design 2026-05-28):** **Start free. Upgrade when you
  need more.**
- **Subline — doubles as the launch lifetime promo (locked from design
  2026-05-28):**
  *"🎉 Lifetime ₹3,999 + GST — first 10 users only. Then the price goes up."*
  (`+ GST` inline — attaches to the actual charged amount; same convention as
  the Pro card, see below. Avoids the checkout-surprise without breaking the
  urgency rhythm.)
  - Placing the promo in the hero subline (rather than a separate strip above
    the table) keeps the hero as the page's single visual focus and lands the
    urgency above the fold.
  - **Post-promo fallback** (when the 10 seats are sold and the lifetime is
    pulled): swap the subline to the access pitch — *"Do the whole workflow
    free, with limits. Pro lifts them all — 30-day trial, no card."* Build the
    subline so it's a single editable string driven by the same constant that
    powers `lifetime_cohort_count` (when sold-out, render the fallback). Don't
    leave a stale promo up.

**Plans layout — one full-width 2-column table (ClickUp-style); NOT a centered card.**
Each column's top is **name → price → (toggle on Pro) → CTA**; feature rows below.
The full-width table sits comfortably under the left-aligned header (no narrow
floating card mid-page).

**Period toggle — sits ABOVE the cards, right-aligned, page-level control.**
- **Default: Yearly.**
- A small **"Save 44% with yearly"** label sits *above* the toggle (indigo,
  right-aligned). It is **not** a pill *inside* the toggle.
- The toggle is a **segmented control** (rounded pill background, the active
  segment filled indigo). Only the Pro card's price reacts; the Free card is
  identical at both periods.

**Free card (always identical, period-agnostic):**
- Heading: **Free**
- Price: **₹0** with small `forever` beside it (same baseline).
- CTA: **Start for free** (filled secondary tone — quieter than Pro's CTA).
- **NO helper line.** Do not add "No credit card required" here (Free has no
  card flow; the line belongs on Pro).

**Pro card (period-aware):**
- Heading: **Pro**
- **Yearly view (default):**
  - Price = **₹167** with small `/month` beside it (1999÷12 = ₹166.58, **round
    up** — honest).
  - Sub-line (muted): **`Billed yearly ₹1,999 + GST`** — *(the `+ GST` attaches
    to the **billed** amount, not the per-month display rate, because ₹1,999 is
    what actually gets charged.)*
- **Monthly view:**
  - Price = **₹299** with small `/month` beside it.
  - Sub-line (muted): **`+ GST`** *(short — the price IS the billed amount
    monthly, no separate qualifier needed; `+ GST` alone closes the loop.)*
- **GST convention (locked 2026-05-28):** every displayed price on the page is
  followed by an adjacent `+ GST` somewhere on the same visual block — never a
  standalone "GST extra" line. Picked "+ GST" over "Excludes tax / Excludes
  GST / Exclusive of GST / GST extra" because **inline `+ GST` is Indian B2C-
  native** (every brokerage contract note ends with `+ GST 18%`), reads as a
  *fact* not an apology, and stays consistent between the hero subtitle and the
  card without a separate copy line. Same convention will apply to any future
  paid surface (annual upsell modals, lifetime, etc.).
- CTA: **Start 30-day trial** (filled primary; same component family as
  hero/nav primary).
- Helper line beneath the CTA: **No credit card required** *(Phase 1 only;
  remove on Phase 2 MoR/Paddle switch and replace with* **First month free ·
  card required** *).*

**Table convention — list every feature, ✓ both columns when both have it.**
Industry standard (Linear / Notion / Vercel / GitHub): the pricing table doubles
as a feature inventory. When most rows are ✓✓, the rows with **caps** (3 /
Unlimited, Last 12 months / Full history, 1 / Unlimited) **pop** — the
repetition is the *background* against which the upgrade story stands out. Don't
omit a feature just because both tiers have it.

**Row explanations live in tooltips, not inline.** When a row label needs
context (*what is* "Symbol Journey"? what counts as broker "sync"?), put a
subtle **`(i)` icon** to the right of the label that opens a one-sentence
tooltip on **hover AND tap** (mobile must work — no hover-only). Same rule for
group headers. **Never** put prose under a row, **never** put parentheticals
*inside* the row label — the row label is the label; everything else is the
tooltip. Tooltip copy: ≤ ~20 words, plain language, no jargon if avoidable.

**Tooltip candidates** (build session writes the final copy; this is the seed):

| Row | Tooltip seed |
|---|---|
| Progressive Scan | Run several screeners into one session; symbols that repeat across them are your confluence. |
| Watchlists | Notes on every add/remove · live since-add % / max gain / max DD · Arthveda-curated views · weekly + monthly review · publish & share. |
| Symbol Journey | Per-symbol timeline of every watchlist add, note, and trade you've had with this stock. |
| Explore (trades) | Filter, sort, and inspect every trade you've logged. |
| Insights | The setups and mistakes that consistently make you — or cost you — money. |
| Reports | Drill-down analytics by setup, instrument, broker, weekday, hold time. |
| Notebook | Per-trade reflection — what you saw, what you did, what you'd do differently. |
| Broker import | **File:** upload your broker's tradebook CSV. **Sync:** scheduled auto-pull (Pro). |
| Tags | Setup, mistake, and custom tags grouped into categories you define. |
| Uploads | Images attached to trades, notes, and future surfaces (day journal, knowledge base, chart studies). |
| Social (group) | Trader profile · publish screeners + watchlists · showcase · activity heatmap · follow & be followed. All free, no caps — not a Pro upsell, by design. |

**Feature rows (grouped):** `(i)` markers in the table below = a tooltip lives
there (copy from the table above).

| | **Free** | **Pro** |
|---|---|---|
| **Discover** | | |
| Run screeners (all NSE/BSE) | Unlimited | Unlimited |
| Saved screeners | **3** | Unlimited |
| Publish · clone · star screeners | ✓ | ✓ |
| Progressive Scan `(i)` | up to **3 screeners / session** | Unlimited |
| Stock chart + performance | ✓ | ✓ |
| Watchlists `(i)` | **1 list · 20 symbols** | Unlimited |
| Symbol Journey `(i)` | Last 12 months | Full history |
| **Journal** | | |
| Add / import trades | Unlimited | Unlimited |
| Explore (trades) `(i)` | Last 12 months | Full history |
| Dashboard | Last 12 months | Full history |
| Insights `(i)` | Last 12 months | Full history |
| Reports `(i)` | Last 12 months | Full history |
| Calendar | Last 12 months | Full history |
| Notebook `(i)` | ✓ | ✓ |
| Broker accounts | **1** | Unlimited |
| Broker import `(i)` | File only | Sync + file |
| Tags `(i)` | **2 groups × 2 tags** | Unlimited |
| Uploads `(i)` | — | Up to 1 GB |
| **Social** `(i)` | | |
| Everything | ✓ | ✓ |
| **Support** | Standard | Priority |

**Lifetime offer (launch only) — lives in the hero subline, NOT a separate
strip above the table** (decision 2026-05-28, locked from design). Subline text:
*"🎉 Lifetime ₹3,999 — first 10 users only. Then the price goes up."*

- **₹3,999** is deliberate symmetry with ₹299/mo + ₹1,999/yr (≈ 2× yearly + a
  year buffer); the math reads obviously to a yearly buyer.
- **First 10** is a deliberate scarcity choice — small, credible, urgent.
  Tracked via `lifetime_cohort_count` (see `arthveda/docs/todo.md` §3);
  **close the offer when it hits 10** and either pull the lifetime entirely or
  raise the price + raise the cap (data-driven, not pre-committed).
- **NOT a permanent 3rd column** in the plans table. The 2-card Free/Pro layout
  stays; lifetime is a hero-subline promo until sold out, then the subline
  swaps to the access fallback (see Header spec above).

**Trial mechanics — two phases (note this in the page, not in the table):**
- **At launch:** 30-day Pro trial, **no credit card required.** On expiry, the user
  **drops to Free (capped)** — never locked out. Anti-abuse during this window:
  email/IP rate-limits + block disposable email domains.
- **Post-launch (soon, MoR/Paddle):** 30-day Pro trial becomes **card-required**,
  marketed as **"First month free."** Same card can't be used twice. Auto-converts
  to paid (monthly/yearly, picked at signup) unless cancelled — user can drop to
  Free anytime.
- **Grandfather** users who started under no-card — their trial finishes under
  no-card terms.
- **Measure first, then switch.** Watch abuse rate + trial→paid conversion during
  the no-card window; the switch should be data-driven, not a calendar.

**Yearly upsell — locked from design.** Period toggle defaults to **Yearly**;
a small **"Save 44% with yearly"** label sits *above* the toggle (right-
aligned, indigo — see the period-toggle spec above the cards). Pro's Yearly
view displays the effective per-month rate **₹167/mo** (rounded up from
1999÷12 = ₹166.58 — honest) + the muted sub-line **`Billed yearly ₹1,999 +
GST`**. Same 30-day trial on either period.

**Remove from the current `/pricing`:** the v1 journal-only `FEATURES` list
(replace with the table above), the **"14-day money-back guarantee"** line
(freemium + no-card trial replaces it — keep only the quiet `/refund` link), and
the **"Arthveda is growing… See what's coming → /roadmap"** block. Also nuke the
`/roadmap` route + any nav/footer link to it.

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

Single source of truth: `arthveda/docs/marketing_context.md` §6. **Model locked
2026-05-28: FREEMIUM + 30-day Pro trial.** Summary:
- **Anonymous (no account, uncapped — the growth engine):** run any screener, view
  any published screener / watchlist / profile, any stock's chart + performance.
- **Free account (everything, with hard caps):** save 3 screeners; publish · clone ·
  star; Progressive Scan (up to 3 screeners/session); **1 watchlist, 20 symbols**
  (with notes + intelligence); Symbol Journey limited to **last 12 months**;
  Journal — import unlimited trades, but only the **last 12 months are visible**
  (one window across trades + analytics + explore — full history is Pro), **1
  broker account**, file-only import, **2 tag groups × 2 tags**, no uploads;
  all of **Social free with no caps** (profile, publish, showcase, activity,
  find/follow).
- **Pro** (₹299/mo or ₹1,999/yr — **save 44%**; **GST extra**):
  all caps lifted, full history everywhere, broker sync, uploads up to 1 GB,
  priority support, every new feature.
- **30-day Pro trial:**
  - **At launch:** no credit card required → on expiry, **drops to Free** (not
    locked out).
  - **Soon after:** card-required via **MoR (Paddle)**, marketed as **"First month
    free"**; same card can't be reused; auto-converts to paid unless cancelled.
  - Grandfather no-card trialists; switch driven by abuse + conversion data, not a
    calendar.
- **Lifetime ₹3,999, first 10 users only** (launch promo — lives in the hero
  subline of `/pricing`, not a separate strip; then raise/remove — symmetric
  with ₹299/mo + ₹1,999/yr).
- **Pricing numbers** stay a moving target — keep them in one easy-to-edit place,
  don't hardcode across the page. See the §7 `/pricing` spec for the full table.

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

- **Pricing architecture** — ✅ decided (**FREEMIUM** + 30-day Pro trial; see §7
  `/pricing` + §10). Only the **price numbers** stay a moving target. ⚠️ This is a
  real app-side build: server-side cap enforcement (watchlists, **12-month
  visible window** across trades + analytics + explore, broker accounts, uploads,
  tags) + trial state machine (Pro trial → drop to Free on expiry) +
  (post-launch) MoR/Paddle integration + the **`/positions` → `/trades`** +
  "Trades table → Executions" rename. Tracked in `arthveda/docs/todo.md` §3 + §4.
- **Founder note copy** — to be rewritten.
- **Real broker list** — confirm against `lib/brokers.ts`; never list unsupported
  brokers.
- **Anon Progressive Scan** — deferred; revisit only on funnel data.
