# Arthveda Marketing Site — New Features Expansion Plan

> **Purpose.** Buildable spec for folding four new product surfaces into the
> already-shipped v2 marketing site (`arthvedadotapp`, arthveda.app). This is an
> *addition* to `docs/v2_marketing_plan.md` (the v2 re-story), not a replacement:
> the 3-family IA, "Trading OS for India" hero, casing rules, and the
> trial-then-paywall pricing model all still hold. When a product *fact* is in
> question, the `arthveda` repo wins — sources are cited inline.
>
> **Status: PLAN ONLY (locked 2026-07-24). Nothing built yet.**
> Founder decisions taken this session are folded in (§0).
>
> Product sources (all in `~/dev/arthveda/docs/`): `marketing_context.md`,
> `business_context.md`, `market_monitor.md`, `trade_analysis.md`, `insights.md`,
> `mcp_server.md`, `roadmap.md`.

---

## 0. What's new since the v2 re-story, and the locked decisions

The v2 site was built around **Discover / Journal / Social**. Since then the app
shipped four surfaces the site says nothing about:

| Feature | App status | Access | Layer | Site today |
| --- | --- | --- | --- | --- |
| **Market Monitor** — heatmaps, sector rotation (RRG), breadth + regime, FII/DII | Shipped (4 sessions) | **Free + anonymous** | Discovery | absent |
| **Trade Analysis** — MFE/MAE, capture efficiency, exit timing, "left on the table", post-exit band | Shipped (4 phases) | **Pro** | Journal | absent |
| **Insights (upgraded)** — 6 data-validated sections | Shipped | Pro | Journal | one thin generic card |
| **MCP server** — connect Claude/Codex/any AI to your journal, read-only | Phases 1-3 shipped | **Pro** | cross-cutting (AI over Journal) | absent |

**The two facts that shape the whole plan:**

1. **Market Monitor is free + anonymous** (`market_monitor.md` §5) — a *second
   acquisition surface* alongside the Screener, and a fresh SEO asset (market
   breadth India, sector rotation RRG, Nifty heatmap). Treat it like the Screener,
   not like a Pro feature.
2. **MCP + Trade Analysis are Pro** (`mcp_server.md` Auth; `trade_analysis.md`
   header) — differentiation/conversion, not acquisition. `IsPro() == CanWrite()`
   (active subscription OR active trial); a lapsed/read-only account cannot use
   them.

### Locked founder decisions (2026-07-24)

- **AI/MCP is elevated to a top-level product page at `/product/ai`** and gets a
  **4th entry in the Product nav dropdown** (Discover · Journal · Social · **AI**).
  This is a deliberate marketing bet: "connect Claude/an AI to your trading
  journal" is a novel, on-brand, largely-unclaimed search angle. It does NOT
  become a 4th homepage *product block* (the homepage keeps 3 stacked family
  blocks + a separate AI band — see §3).
- **Market Monitor gets its own SEO page + a Discover hub card.** Recommended
  route `/product/market-monitor` (top-level, parallel to `/product/ai`, cleaner
  URL for a marquee free surface). It is NOT added to the nav dropdown (it lives
  under Discover conceptually; the nav stays Discover/Journal/Social/AI).
- **Pricing model itself is unchanged** — the site already migrated to
  14-day-trial-then-read-only. Only additive edits (new rows, stale JSON-LD fix).
- **Build later, in phases.** This doc is the contract.

### Guardrails carried forward (do not drift)

- **Process over P&L.** No hype, tips, signals, get-rich, finfluencer energy.
- **Don't shout "free."** "Try it free for 14 days" as a button is fine;
  "free screener" is not. Market Monitor may state plainly that it's free/no
  login (it's a real acquisition fact), but sell the *connected workflow*.
- **Don't market the roadmap** (algo, options, feed, clans, backtesting,
  verified-trade sharing).
- **Naming:** "Symbol" for proper-noun feature names, "stock" in descriptive
  copy; "Trade" not "Position"; "Instrument" not "Segment".
- **EOD is honest, not a hole.** Market Monitor and Discover are end-of-day; say
  so, frame it as discipline ("decisions after the close, not in intraday noise").
- **Casing:** sentence-case buttons/CTAs; page-title separator is `·` not `|`.
- **No em dashes** in user-facing copy.

---

## 1. Hero — add the AI hook (`components/hero.tsx`)

The locked subtitle stays **verbatim** (do not rewrite it). Add a compact AI line
*beneath the CTA row*, small and quiet so it reads as "and there's this too," not
a second headline.

**Recommended element:** a single muted line with a subtle AI/sparkle icon,
sitting under the buttons (below the existing "No card required" note's row):

> **Now connect Claude, Codex, or any AI assistant to your journal — and ask it
> what you keep getting wrong.**  ›  *(links to `/product/ai`)*

Notes:
- Keep it text-first (one line), not a big card. The hero visual load-bearer is
  still the flow-loop video.
- Angle to preserve: **read-only + private** ("it reads your journal, it never
  trades") and the process framing you used — "learn about your trading, and
  yourself." Full pitch lives on `/product/ai`; the hero just plants the flag.
- Reduced-motion / performance: it's static text, no concern.
- Analytics: `posthog.capture("Clicked AI hero link", { location: "hero" })`.

**Open sub-decision (build session):** pill-row vs single line. Recommend single
line for restraint; a pill row risks competing with the primary CTA.

---

## 2. Nav — add AI as the 4th dropdown entry

`lib/nav.ts` (`NAV_FAMILIES`) drives BOTH the desktop mega-menu and the mobile
menu (`components/navbar.tsx`), so adding one entry updates both. Add:

```
AI    Ask your journal anything, from your own AI tools    → /product/ai
```

- Icon: a Lucide AI-ish glyph — `Sparkles` or `Bot` (pick one; `Sparkles` reads
  "AI" more universally). Add to `FAMILY_ICONS` or a small parallel map — note
  `FAMILY_ICONS` in `lib/families.ts` is typed to `ProductFamily["key"]`
  (discover/journal/social), so AI needs either a widened type or its own icon
  const. Simplest: give `NavFamily` its own `Icon` and pass `Sparkles` directly
  in `nav.ts` (nav already imports `LucideIcon`), leaving `families.ts` untouched
  since AI is not a homepage product family.
- The mega-menu width (`w-[380px]`) comfortably fits a 4th row; verify vertical
  spacing on desktop and the mobile list.
- Subtitle keeps the same "abstract layer needs a one-liner" pattern as the other
  three.

**Do NOT** add AI to `lib/families.ts` `FAMILIES` — that array is the 3 homepage
product blocks, and AI is a cross-cutting band, not a family (§3).

---

## 3. Homepage (`app/page.tsx`)

Current order: Hero · ProductBlocks (Discover/Journal/Social) · Testimonials ·
FounderLetter · FAQ · BottomCTA.

Changes:

1. **Hero** — §1 AI line.
2. **ProductBlocks** — update the **Discover** blurb (`lib/families.ts`) to name
   Market Monitor (see §4). Journal/Social blurbs unchanged.
3. **New AI band** — insert a distinct section AFTER `ProductBlocks`, BEFORE
   `Testimonials`. NOT a 4th product block (different visual treatment so it reads
   as cross-cutting, not a family). One screenshot (a Claude conversation over the
   journal) + heading + one-liner + "Explore AI →" into `/product/ai`.
   - Heading: **Bring your own AI.**
   - Body: **Connect Claude, Codex, or any AI assistant to your journal and ask
     it, in plain English, what your numbers actually say. It reads your trades,
     tags and notes. It never places one.**
   - CTA: **Explore AI →** → `/product/ai`
   - New component `components/ai_band.tsx`.
4. Everything else (Testimonials, FounderLetter, FAQ, BottomCTA) unchanged except
   the FAQ additions in §8.

> Market Monitor does NOT get its own homepage band — it rides inside the
> Discover story (blurb + the Discover hub card + its own page). Two new homepage
> sections (an AI band is already one) would dilute the hero. If a Market Monitor
> homepage callout is wanted later, put it as a small "free, no login" strip
> inside the Discover product block, mirroring how the broker strip sits inside
> the Journal block.

---

## 4. Discover hub (`lib/discover_sections.ts`, `app/product/discover/page.tsx`)

Add **Market Monitor** as a feature card. Current: 4 cards (Screener, Progressive
Scan, Watchlists, Symbol Journey), rendered as 2 rows of 2 in bordered pair
containers. Adding one makes 5 (odd) — the `ROWS` pairing would leave a lone card
in a 2-col container.

**Recommended fix: go to 6 cards (3 even rows)** by also adding a **Charts** card
(saved indicators + drawing tools per symbol already ship and are already listed
on `/pricing`). Order:

1. Screener → 2. **Market Monitor** (new) → 3. Progressive Scan →
4. Watchlists → 5. Symbol Journey → 6. **Charts** (new)

*(Alternative if you'd rather not add Charts: keep 5 and make the last row render
full-width. Cleaner to just add the 6th — Charts is a real, shipped, relevant
Discover surface.)*

New card copy (second person, matching existing cards):

| id | label | heading | subheading |
| --- | --- | --- | --- |
| `market-monitor` | Market Monitor | Read the market before you trade it. | See where the money is with sector and index heatmaps, spot rotation on a relative-strength graph, and check breadth and the risk-on/risk-off regime, so you size up or step aside with the whole market in view. |
| `charts` | Charts | Your levels, saved for next time. | Mark up any stock with indicators and drawing tools, and find them exactly where you left them the next time you open it, so your analysis compounds instead of starting over. |

- **Market Monitor card image:** the breadth tab with the regime badge + a heatmap
  crop (see §9). Card links to `/product/market-monitor` (add an optional `href`
  to `FeatureCard` if it doesn't take one — currently the cards are static).
- **Discover hero subheading** (`app/product/discover/page.tsx`) — extend to name
  the market read, e.g. append: "...and read the broader market before you commit."
- **Discover homepage blurb** (`lib/families.ts` `FAMILIES[discover].blurb`):
  add a Market Monitor clause, e.g.: "Screen the whole NSE/BSE, read the market
  with heatmaps, breadth and sector rotation, and save ideas to watchlists that
  track how each one plays out."
- **EOD honesty:** one line on the card page or tooltip — "End-of-day, updated
  after the close" — matches `market_monitor.md` §1.

---

## 5. Market Monitor SEO page (`/product/market-monitor`)

New standalone page, same template as the Discover/Journal hubs (left-aligned
hero → 2-up feature-card grid → CTA). It's a *free front door*, so the CTA points
at the **live app surface**, no login: `https://arthveda.app/app/market-monitor`
(add `MARKET_MONITOR_URL` to `lib/links.ts`, dev `http://localhost:6969/market-monitor`).

- **Label:** Market Monitor  ·  **Title:** `Market Monitor · Arthveda`
- **Hero heading:** Read the market before you trade it.
- **Hero subheading:** Heatmaps, sector rotation, market breadth and the
  risk-on/risk-off regime for NSE, in one end-of-day view. Free, and no login to
  look.
- **Metadata description:** Free NSE market monitor: sector and index heatmaps,
  a relative-rotation graph, market breadth, the risk-on/risk-off regime, and
  FII/DII flows. End-of-day, no login required.
- **CTA:** Open Market Monitor → (live app, no login)

**4 cards** (even), each a sub-surface — copy grounded in `market_monitor.md`:

| id | label | heading | subheading |
| --- | --- | --- | --- |
| `heatmaps` | Heatmaps | See where the money went today. | Sector, index and whole-universe heatmaps sized by market cap or turnover and coloured by the move, over the day or up to a year, so the day's real winners and losers are obvious at a glance. |
| `sector-rotation` | Sector rotation | Watch money rotate between sectors. | A relative-rotation graph plots all 13 NSE sector indices against the benchmark into leading, weakening, lagging and improving, with a trail, so you catch the rotation while it's happening, not after. |
| `breadth` | Market breadth | Know if the market has your back. | Advances and declines, the share of stocks above their 200-day average, new highs against new lows, and a risk-on / neutral / risk-off regime, tracked over time so you can see the tape turning. |
| `flows` | FII/DII flows | Follow the big money. | The day's provisional FII and DII net cash flows, right in the stat strip, so you know who was buying and who was selling before you form a view. |

**Facts to keep accurate (do not overclaim):**
- **End-of-day only** (`market_monitor.md` §1). Never imply live/intraday/ticks.
- **Free + anon everywhere** — the whole surface (`§5`). Say "no login required."
- RRG normalization is a documented open approximation (`§7`/`§10 Session 3`) —
  don't claim "JdK RRG"; "relative-rotation graph" is the safe term.
- FII/DII is provisional cash-market, latest session (`§10 Session 4`) — "the
  day's" is fine; don't promise history charts (they accrue forward).
- Universe = curated NSE index baskets (Nifty 50…500, Midcap/Smallcap), not "all
  of BSE." "NSE" is the honest word.

**Sitemap:** add `/product/market-monitor` (priority ~0.8) in `app/sitemap.ts`.

---

## 6. Journal hub (`lib/journal_sections.ts`)

Two additions and one rewrite. Current: 8 cards (Insights, Dashboard, Reports,
Trades, Notebook, Calendar, Tagging, Accounts). Add **Trade Analysis** + an **AI**
card → 10 cards (stays even, 5 rows). Place Trade Analysis right after Insights
(both are "learn from what happened"); place AI last (it spans everything).

### 6a. New — Trade Analysis card

| id | label | heading | subheading |
| --- | --- | --- | --- |
| `trade-analysis` | Trade Analysis | Find out if you sold too early. | Every closed trade is replayed against the price that followed it: how much heat you sat through, how much of the move you captured, and how much was still on the table after you exited. The honest answer, from the chart, not your memory. |

- Source: `trade_analysis.md`. Key true claims: MFE (best unrealized profit), MAE
  (worst drawdown), **capture efficiency** (P&L vs the peak while holding),
  **exit timing** (vs the move that continued after), **left on the table** /
  **loss avoided** (post-exit band). Candle-backed; equity (stocks + ETFs) today.
- **Pro** — but do NOT stamp a "Pro" badge on the marketing card (the site sells
  the trial as "the whole product," so everything is "included"). The Pro line
  belongs only in the pricing list (§7) if anywhere.
- Image: the Analysis tab (PnL curve with MFE/MAE dots + the shaded post-exit
  band + the three metric cards).

### 6b. Rewrite — Insights card

The current copy ("See why you lose money and what to change") undersells a
feature that now runs **six data-validated sections**: Timing (hour of day,
holding duration, disposition effect), Behaviour (post-win/loss, overtrading,
tilt), Risk (sizing consistency, biggest-bets-worst-bets, averaging down,
revenge/ego sizing), Setups & Mistakes, Exit quality, and Costs
(`insights.md` §1).

Rewrite to:

| id | label | heading | subheading |
| --- | --- | --- | --- |
| `insights` | Insights | The leaks you can't see in a P&L. | Arthveda reads your whole journal and names what's actually costing you: cutting winners early, revenge-sizing after a loss, overtrading your busiest days, or bleeding to charges. Each finding comes with the money behind it, ranked by what hurts most. |

- Keep it honest: every card is "a claim plus the money behind it"
  (`insights.md` §1). "Ranked by what hurts most" = `rankByImpact`.
- Do not invent thresholds/numbers in copy.

### 6c. New — AI card (mirrors the `/product/ai` page)

| id | label | heading | subheading |
| --- | --- | --- | --- |
| `ai` | AI | Ask your journal, in plain English. | Connect Claude, Codex, or any AI assistant and ask what you keep getting wrong, whether your edge holds on Mondays, or if you're cutting winners early. It reads your trades, tags and notes, and never places a trade. |

- Card links to `/product/ai`.
- Image: a Claude/Codex conversation answering a real journal question.

---

## 7. AI page (`/product/ai`)

The flagship new page. Template can follow the hub pattern (hero → cards → CTA)
but the content is a *pitch*, so allow a couple of bespoke sections. Grounded
entirely in `mcp_server.md`.

- **Label:** AI  ·  **Title:** `Connect your AI to your trading journal · Arthveda`
- **Hero heading:** Ask your journal anything.
- **Hero subheading:** Connect Claude, Codex, or any AI assistant to Arthveda and
  ask, in plain English, what your trading actually says about you. It reads your
  trades, tags and notes and does the thinking with you. It is read-only: it never
  places, changes or deletes a thing.
- **Metadata description:** Connect Claude, Codex or any MCP client to your
  Arthveda trading journal and ask it, in plain English, what you keep getting
  wrong. Read-only, private, and yours to switch off anytime.
- **CTA:** Set up your AI connection → `https://arthveda.app/app/settings/api-keys`
  (add `AI_SETUP_URL` / `API_KEYS_URL` to `lib/links.ts`).

**Section A — "Questions you can actually ask"** (use the doc's real examples,
`mcp_server.md` intro + `trade_analysis.md` §15):
- "What is my biggest recurring mistake?"
- "Does my edge hold on Mondays?"
- "Am I cutting winners early?"
- "Which setup has my worst expectancy, and show me the 5 worst trades in it."
- "Am I chronically exiting before the move is over?"

**Section B — "How it works"** (3 beats):
1. **You compute, the AI interprets.** Arthveda hands the AI already-aggregated
   facts (win rate by tag, expectancy by hold time, post-exit drift), not a raw
   dump. The numbers are ours; the judgement is the model's.
2. **Read-only, always.** It can read your journal. It cannot log, edit, import
   or delete anything. (`mcp_server.md`: "Read-only. No writes, ever, in v1.")
3. **Your notes stay yours until you say otherwise.** Trade data and tags are
   shared by default; your written notes are a **separate opt-in** you control per
   key. (`mcp_server.md` Auth / notes scope.)

**Section C — "Set it up in a minute"**: create an API key in Settings → paste it
into Claude Code / Claude Desktop / Codex (streamable-HTTP MCP, Bearer token) →
ask. Mention: up to 5 keys, name them, revoke anytime.

**Facts to keep accurate:**
- **Pro feature** (`mcp_server.md`: "MCP is Pro-only"). On the marketing page,
  frame as included in the product/trial, not badged; the honest gate line, if
  any: "Included with your subscription (and the 14-day trial)."
- Clients: "Claude, Codex, or any MCP client." Streamable-HTTP + Bearer; a stdio
  bridge is deferred, so don't promise npm/stdio.
- **Don't overclaim autonomy.** It answers questions; it is not an agent that
  trades. Read-only is the whole safety story — lead with it.
- Privacy: notes go to a third-party model provider only if the notes scope is on
  — state this plainly (it's the doc's stance, and it's good trust copy).

**Sitemap:** add `/product/ai` (priority ~0.8).

---

## 8. Pricing (`app/pricing/plans_table.tsx`) + JSON-LD

Model is unchanged. Additive edits to the "Everything is included" list:

- **Discover group:** add **"Market Monitor"** with tooltip: *"Sector and index
  heatmaps, sector rotation, market breadth and the risk-on/risk-off regime.
  Free for everyone, signed in or not."* (It's free+anon, so it's the second row,
  after "Run screeners…", that carries a "free for everyone" tooltip.)
- **Journal group:** add **"Trade Analysis"** with tooltip: *"Every closed trade
  replayed against the price that followed: heat taken, move captured, and what
  was left on the table."*
- **Journal group (or a new one-line group):** add **"Connect your AI (Claude,
  Codex, any MCP client)"** with tooltip: *"Read-only access for your AI assistant
  to your trades, tags and notes. Notes are opt-in."*
- Consider bumping the **Insights** existing line's tooltip to reflect the six
  sections (behaviour, risk, exit quality, costs), not just "setups and mistakes."

**Stale JSON-LD price (`app/layout.tsx`):** the `SoftwareApplication` offer still
lists `price: "399"` (the retired monthly). Update to the yearly headline
`price: "2499"` (or model both plans). Small correctness fix, do it in this pass.

**Metadata already correct** on `/pricing` (14-day trial, ₹2,499 / ₹4,999). Leave.

---

## 9. FAQ (`components/faq.tsx`)

Add three entries (keep the founder voice):

- **"Can I connect Claude or another AI to my trading?"** — Yes. Create an API
  key in settings and connect Claude, Codex, or any MCP client, then ask your
  journal questions in plain English. It's read-only: it reads your trades, tags
  and notes and never places, edits or deletes a trade. Your written notes stay
  private unless you opt them in. Links to `/product/ai`.
- **"Is Market Monitor free?"** — Yes, and you don't even need an account to look.
  Heatmaps, sector rotation, breadth and the market regime are open to everyone.
  It's end-of-day, updated after the close. Links to `/product/market-monitor`.
- **"Can it tell me if I exited a trade too early?"** — Yes. Trade Analysis
  replays every closed trade against the price that came after it and shows how
  much of the move you captured and how much was still on the table. Links to
  `/product/journal`.

---

## 10. SEO / metadata / plumbing

- **`app/layout.tsx` keywords:** add `market breadth India`, `sector rotation
  RRG`, `Nifty heatmap`, `connect AI to trading journal`, `Claude trading journal`,
  `MCP trading`. Fix the JSON-LD price (§8).
- **`app/sitemap.ts`:** add `/product/ai` and `/product/market-monitor` (~0.8).
- **`lib/links.ts`:** add `MARKET_MONITOR_URL` (live app) and
  `AI_SETUP_URL` (`/app/settings/api-keys`).
- **Per-page metadata:** each new page gets its own `title`/`description`/
  `canonical` (patterns already in `app/product/*/page.tsx`).
- **Nav is decoupled** from card counts — only the AI dropdown entry changes (§2);
  Market Monitor needs no nav entry.
- **Two-property SEO split still holds** (`v2_marketing_plan.md` §11): marketing
  targets category/brand terms and funnels into the app; the app owns per-symbol
  long-tail. The new pages target *category* terms ("market monitor India",
  "connect AI to trading journal"), not per-stock/per-trade terms.

---

## 11. Screenshots needed (net-new)

All at **2×** (retina), from one demo account, IRFC as the recurring hero stock
where a stock appears. (See the standing memory TODO to also re-export the
existing homepage shots at 2×.)

- **Market Monitor:** breadth tab (regime badge + cards + trend line), a heatmap
  (sector or index), the sector RRG. → homepage Discover blurb needs none; the
  Discover card + the `/product/market-monitor` cards need these.
- **Trade Analysis:** the Analysis tab (PnL curve + MFE/MAE dots + shaded
  post-exit band + metric cards).
- **Insights (upgraded):** a section showing several ranked cards across
  behaviour/risk/exit-quality (so it visibly reads as more than "setups").
- **MCP/AI:** a Claude (and/or Codex) conversation answering a real journal
  question — the AI band, the AI Journal card, and `/product/ai` hero.

Until captured, use the existing `FeatureCard` placeholder path (`image: null` +
`placeholderLabel`).

---

## 12. Suggested build phases (when we build)

1. **Phase A — copy-only, highest leverage, no new pages, no new shots:**
   hero AI line (§1), AI nav entry (§2), Insights card rewrite (§6b), Discover
   blurb + homepage Discover mention of Market Monitor (§4), pricing list rows +
   JSON-LD fix (§8), FAQ entries (§9), metadata/keywords (§10). All shippable with
   placeholders.
2. **Phase B — the two cards that need one shot each:** Trade Analysis + AI cards
   under Journal (§6a, §6c), Market Monitor + Charts cards under Discover (§4).
3. **Phase C — the two new pages:** `/product/market-monitor` (§5) and
   `/product/ai` (§7), homepage AI band (§3), sitemap + links (§10).
4. **Phase D — screenshots** at 2× replace placeholders across all of the above.

Phases A-C are independent enough to ship in any order once copy is approved;
D is orthogonal.

---

## 13. Open sub-decisions for the build session

- Hero AI element: single muted line (recommended) vs a pill row.
- AI nav icon: `Sparkles` (recommended) vs `Bot`.
- Discover 6th card: add **Charts** (recommended, keeps grid even) vs leave 5 and
  render a full-width last row.
- Market Monitor route: `/product/market-monitor` (recommended) vs
  `/product/discover/market-monitor` (stricter IA, longer URL).
- `/product/ai` page: pure hub template vs a couple of bespoke sections
  (recommended — the "questions you can ask" + "how it works" beats sell it far
  better than 4 generic cards).
- Whether to show any "Pro" affordance on Trade Analysis / AI marketing cards
  (recommended: no badge; the trial narrative is "the whole product," and the
  Pro line, if needed, lives only in the pricing list).
```
