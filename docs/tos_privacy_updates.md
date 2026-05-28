# Legal copy updates — Lifetime semantics + privacy clarification

Two edits requested for the next marketing-site build session. Both came up in
the app's Phase 1 pricing rollout (in-app `Change plan` modal now sells
monthly / yearly / lifetime), and the public legal pages need to catch up.

When you ship these, bump the **Effective Date** on both pages to today.

---

## 1. Terms of Service — clarify "Lifetime" means lifetime of the product

**Why:** The new Lifetime SKU is being sold as "First 10 users only,
₹3,999 + GST" with copy that calls it "Active forever, no renewals." We need
to make clear that "forever" is bounded by the product's existence, not the
user's. If Arthveda is shut down or discontinued, lifetime access ends with
it. Without this, a future "we're shutting down" announcement could expose us
to a "you sold me lifetime access" claim.

**Where:** `app/terms/page.tsx`. Add a new section between the current
`#1 Overview` and `#2 Your Responsibilities`. Renumber everything below.
(Sections currently go 1 Overview → 2 Responsibilities → 3 Data Ownership →
4 Service Availability → 5 Termination → 6 Changes → 7 Contact. After this
edit the new section becomes 2 and the rest shift to 3-8.)

**Suggested copy:**

```
2. Subscriptions and Lifetime Access

Arthveda offers monthly and yearly recurring plans, and a one-time "Lifetime"
purchase.

The word "lifetime" refers to the lifetime of the Arthveda product, not the
lifetime of the user. If Arthveda is shut down, discontinued, or otherwise
ceases operation, access to all plans — including Lifetime — ends with the
service. A Lifetime purchase is not a guarantee of perpetual service or of any
specific runway.

Refunds for Lifetime purchases are handled per our refund policy
(arthveda.app/refund). Recurring plans (monthly, yearly) can be cancelled at
any time and remain active until the end of the current billing period.
```

**Optional:** the existing Section 4 ("Service Availability") already says
features may change or be removed without notice. Consider strengthening
that section with one extra sentence: *"We may also discontinue the service
entirely with reasonable notice, after which all access (including Lifetime)
ends."* — but the new dedicated section above is the load-bearing one.

---

## 2. Privacy Policy — explicit "we do not read your trade data"

**Why:** Multiple users have raised privacy concerns about operators reading
their trade history. The current policy talks about what we *collect* and how
we *use* it for app features, but doesn't address the unstated worry: *"is a
human at Arthveda browsing my trades?"* The honest answer is no — we only
look at account-level operational data (profiles, subscriptions, invoices,
error logs) for monitoring. Making that explicit is a high-trust signal at
near-zero copy cost.

**Where:** `app/privacy/page.tsx`. Extend the current `#2 How We Use Your
Data` section by adding two paragraphs below the existing bullet list. No
renumbering needed.

**Suggested copy** (append after the existing "We do not sell your data or
use it for advertising." bullet):

```
We do not read your individual trade data. The trades, notes, watchlists,
and screener runs you create in Arthveda are private to your account.
Automated systems process them to render your charts, metrics, and
analytics — operators and support staff do not browse user trade histories.

For operational monitoring (keeping the service running, handling billing,
preventing fraud, debugging errors) we do look at account-level signals:
user profiles, subscription status, invoices, login activity, and error
logs. These never include the contents of your trades.
```

**Optional but recommended:** consider also renaming Section 2's heading to
something like *"How We Use Your Data (And What We Don't Look At)"* to
flag the new content from the table of contents.

---

## Cross-surface consistency notes

- App side (this repo's sibling, `~/dev/arthveda`) now uses "Lifetime" /
  "Active forever, no renewals" in `plan_and_billing.tsx` and the new
  `change_plan_dialog.tsx`. Keep marketing copy aligned: prefer "Lifetime"
  over "one-time" / "forever access" when describing the SKU.
- Marketing `/pricing` page's hero promo still says "First 10 users only,
  then the price goes up" — this matches the in-app Pro card copy. Don't
  drift these apart.
- Both legal pages should also update the *Effective Date* line at the top
  to the date of this edit. Today the ToS shows `June 29, 2025` and the
  Privacy Policy shows `November 1, 2025` — both should advance.
