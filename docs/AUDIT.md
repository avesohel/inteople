# Inteople.com — Architecture & Product Audit

_Senior architect / product / UX / CTO advisory review._
_Snapshot date: **2026-07-02**. Supersedes the 2026-06-29 snapshot (single-page era)._
_No application behavior was changed to produce this report; the linting/formatting pass and
the three bug fixes noted in §0.1 were applied alongside it._

## 0. Executive Summary

Since the last audit, Inteople.com has **graduated from a single long page into a real
multi-page site** — 32 HTML pages now ship: per-product pages, per-service pages, an
insights/blog section, case studies under `/work/`, a company/about page, and owned legal &
trust pages. The information-architecture gap that dominated the previous audit is **largely
closed**. This is real progress.

**The center of gravity has now shifted from "missing pages" to "an unfinished migration."**
The new pages are built on a clean, tokenized v2 design system (`/assets/styles/*`), but the
**live homepage (`index.html`) is still the v1 page** — it loads its CSS and JS from
`/archive/v1/` and its navigation is still in-page `#anchors` that don't link to any of the
new routes. A v2 homepage exists at `/preview/` (built on the new system) but is not yet
promoted to `/`. So a visitor landing on the homepage sees the old site and cannot navigate
to the new depth; only inbound/deep links reach it.

**Verdict:** The re-platform of _content_ is mostly done and good. Finish the _migration_:
promote the v2 homepage to `/`, wire the primary nav to the real routes, retire the
`/archive/v1` dependency from the live path, and clear the small set of still-open trust
items (Web3Forms key, analytics, inline styles). Engineering hygiene is now backed by a
real linting toolchain (§11).

### 0.1 Since the last audit (2026-06-29 → 2026-07-02)

**Shipped / resolved:**

- ✅ **Multi-page IA built** — `/products/*`, `/services/*`, `/insights/*`, `/work/*`,
  `/company/about`, `/trust`, `/privacy`, `/terms` all exist as real routes (see §1).
- ✅ **Owned legal pages** — `/privacy/` and `/terms/` now exist; the footer link that used
  to point at the external `privacypolicytemplate.net` template now points to `/privacy/`
  and `/terms/`. _(Fixed in this pass.)_
- ✅ **EduNation vs EduConnect naming — RESOLVED.** The site is uniformly **EduNation**
  (88 references, zero "EduConnect"). The open decision from the last audit is closed.
- ✅ **v2 design system** — parent tokens in `assets/styles/tokens.css` with per-page
  stylesheets (`base`, `home`, `products`, `services`, `insights`, `work`, `about`, `trust`).
- ✅ **Sitemap de-rotted & automated** — was manually maintained and had decayed to **6 URLs**
  while 26 pages existed. Now **auto-generated (30 URLs)** by `scripts/generate-sitemap.mjs`;
  CI fails if it drifts. _(Fixed in this pass.)_
- ✅ **Stale code reference** — `assets/scripts/config.js` referenced the deleted
  `src/scripts/main.js`; corrected to `assets/scripts/home.js`. _(Fixed in this pass.)_
- ✅ **Formatting/consistency drift** — charset casing unified to `utf-8`, whole tree
  formatted, real lint bugs fixed (empty catches, duplicate CSS declarations, a CSS
  shorthand override, missing `<button type>`, unencoded `&`, a duplicated class, misused
  `aria-label`s). See §11. _(Fixed in this pass.)_

**Still open (carried forward):**

- 🔴 **Homepage still on v1** — `index.html` loads `/archive/v1/styles/main.css` +
  `/archive/v1/scripts/main.js`; nav is in-page anchors, not the new routes. The v2 homepage
  sits unused at `/preview/`.
- 🔴 **Web3Forms key is still the placeholder** (`YOUR_WEB3FORMS_ACCESS_KEY`) — every contact
  submission still falls back to `mailto` instead of being captured. Unchanged 5-minute fix.
- 🔴 **No analytics** — still nothing installed; growth is unmeasured.
- 🟠 **Inline `style=` on ~20 pages** — should migrate into the stylesheets.
- 🟡 **Unverifiable homepage stats** ("320+ happy clients," "15+ years") remain on the v1
  homepage copy.

---

## 1. Current Website Structure

### Pages / Routes (32 HTML pages)

| Area                  | Routes                                                                    | Notes                                                                            |
| --------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Home                  | `/`                                                                       | **Still the v1 page** (archive assets, anchor nav)                               |
| Home (v2, unpromoted) | `/preview/`                                                               | New design system; `noindex` + robots-disallowed                                 |
| Products              | `/products/`, `/products/{healodex,edunation,replyflow,pallishokti}`      | Parent showcase + per-product pages                                              |
| Services              | `/services/`, `/services/{ai-ml,cloud,iot-embedded,software-engineering}` | Per-service pages                                                                |
| Insights (blog)       | `/insights/` + 5 articles                                                 | e.g. `rag-in-production`, `offline-first-healthtech`                             |
| Work (case studies)   | `/work/` + 3 studies                                                      | `healodex-connected-care`, `replyflow-support-automation`, `edunation-school-os` |
| Company               | `/company/about/`                                                         | About page                                                                       |
| Trust & legal         | `/trust/`, `/privacy/`, `/terms/`                                         | Owned pages (no longer external template)                                        |
| vCards                | `/vc/{alisohel,propel,ahsan,nasim}`                                       | Pretty URLs via Netlify, vCard + QR                                              |
| Sub-sites             | `/edu/` (EduNation landing, EN/BN) · `/sites/brdb/` (subdomain-inert)     | `sites/*`; `/edu/` published via redirect                                        |

### Navigation

- **v1 homepage nav (live):** in-page `#anchors` only (`#industries`, `#services`,
  `#products`, `#process`, `#messages`, `#contact`). **Does not link to the new routes.**
- New sub-pages carry their own headers/footers with real cross-links — so the depth exists,
  but the front door (`/`) doesn't open onto it.

### Biggest structural issue now

Not "missing pages" (they exist) but **a half-finished cutover**: the homepage and the rest
of the site are on two different design systems and two different navigation models. Promoting
`/preview/` → `/` and updating the nav is the highest-leverage remaining move.

---

## 2. Current Technology Stack

| Layer     | Current                                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | **None** — hand-written static HTML (no-build decision still in force, §8)                                                                                                  |
| Build     | **None** (`publish = "."`, no command). New: **dev-only** lint tooling (§11) that never runs on deploy                                                                      |
| Frontend  | Vanilla HTML + CSS + ES5-style vanilla JS (IIFE, no deps)                                                                                                                   |
| Backend   | **None.** Contact via Web3Forms (3rd-party, **key still placeholder**); vCard/QR client-side                                                                                |
| CSS       | Two systems coexisting: **v2** `assets/styles/*` (tokenized parent system, used by all new pages) and **v1** `archive/v1/styles/main.css` (still used by the live homepage) |
| Libraries | `qrcode.min.js` (vendored) only                                                                                                                                             |
| Fonts     | Google Fonts (Inter; Hind Siliguri on edu)                                                                                                                                  |
| Deploy    | Netlify, auto from git push; security headers, long-cache `/assets/*`, pretty-URL + subdomain redirects                                                                     |
| SEO       | Per-page title/description/canonical/OG/Twitter, `Organization` JSON-LD, **auto-generated sitemap**, robots, manifest                                                       |
| Tooling   | **New:** Prettier, ESLint, Stylelint, html-validate, markdownlint, Ruff + pre-commit hooks + CI (§11)                                                                       |
| Analytics | **None** ⚠️                                                                                                                                                                 |

**Assessment:** The no-build model has held up well through the expansion to 32 pages — shared
header/footer are hand-mirrored per page, which is the known cost. The re-evaluation trigger
from the last audit (">8–10 hand-maintained pages, or a blog ships") has **now fired**: both a
blog (`/insights`) and ~30 pages exist. The Astro migration question (§8) is formally reopened
— but the no-build path remains viable with discipline, now aided by linting.

---

## 3. Design Analysis

| Dimension              | Rating              | Notes                                                                                                                  |
| ---------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Design-system maturity | ✅ Strong (v2)      | `tokens.css` is a real parent system; per-product accent theming via `--accent` override                               |
| Homepage consistency   | 🔴 Split            | Live `/` is v1; every other page is v2 — two visual languages on one domain                                            |
| Color / type / spacing | ✅ Good             | Tokenized, fluid scale, accessible contrast                                                                            |
| Layout quality         | ✅ Strong           | Hero "delivery console" remains distinctive; new pages are clean                                                       |
| Mobile responsiveness  | ✅ Good             | Grid + clamp, mobile nav present                                                                                       |
| Enterprise appearance  | 🟢 Improved         | Now reads as a multi-product company, not just a studio                                                                |
| EduNation brand        | 🟡 Separate palette | `/edu/` still blue/green vs parent navy/coral — acceptable as a product brand, but derive from shared tokens over time |

**Key design risk (updated):** brand fragmentation is no longer the top risk — the **v1/v2
homepage split** is. It's the first thing a visitor sees and it undercuts the polish of
everything behind it.

---

## 4. Business Positioning Analysis

| Does the site communicate…      | Status                                                                                                         |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Technology company identity     | 🟢 Improved — dedicated products/services/work/insights now support a "builds & operates products" story       |
| Product company vision          | 🟢 `/products/` explicitly frames Healodex, EduNation, ReplyFlow, PalliShokti as **owned & operated** ventures |
| AI capability                   | 🟢 Yes — `/services/ai-ml`, RAG/agents insights                                                                |
| Healthcare tech (Healodex)      | 🟢 Owned `/products/healodex` + case study now exist                                                           |
| Education tech (EduNation)      | 🟢 Naming resolved; `/products/edunation`, `/work/edunation-school-os`, `/edu/` landing                        |
| Government/enterprise readiness | 🟡 Improved — `/trust`, case studies, legal pages exist; still no analytics, homepage still v1                 |

**Core positioning (updated):** the "Studio + Products" dual narrative the last audit
recommended is **now largely built** in the sub-pages. The remaining gap is that the **v1
homepage doesn't tell that story** — promoting the v2 home closes it.

---

## 5. SEO Analysis

| Item                         | Status                                                                                                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Per-page meta / OG / Twitter | ✅ Present across the new pages                                                                                                                                               |
| Structured data              | 🟡 `Organization` on home. Add `WebSite`+SearchAction, `BreadcrumbList`, `Article` (insights), `Product`/`SoftwareApplication` (products), `JobPosting` (careers, when built) |
| Sitemap                      | ✅ **Now auto-generated** (`npm run sitemap`, 30 URLs) — no longer rots; CI enforces freshness                                                                                |
| robots.txt                   | ✅ Fine (disallows `/preview/`, `/archive/`)                                                                                                                                  |
| URL structure                | 🟢 **Fixed** — real per-topic routes now exist to rank for; the single-page ceiling is gone                                                                                   |
| Homepage crawl paths         | 🟠 v1 home's anchor nav doesn't link to the new routes, so internal-link equity from `/` to deep pages is weak until the nav is rewired                                       |
| Blog                         | 🟢 `/insights` exists (5 articles); add `Article` JSON-LD + RSS                                                                                                               |
| Analytics                    | 🔴 None — still can't measure any of this                                                                                                                                     |

**Bottom line:** technical + IA SEO both jumped from the last audit. Two follow-ups:
per-type JSON-LD, and **rewire the homepage nav** so `/` passes link equity into the new depth.

---

## 6. Content Analysis

- **About:** 🟢 `/company/about` now exists (was ❌).
- **Services:** 🟢 Dedicated pages per service (was 🟡 cards only).
- **Products:** 🟢 Per-product pages + owned/operated framing (was 🟡 portfolio mix).
- **Case studies:** 🟢 Three under `/work/` (was ❌ — this was the #1 missing asset).
- **Blog:** 🟢 `/insights` with 5 articles (was ❌).
- **Trust/legal:** 🟢 `/trust`, `/privacy`, `/terms` owned (was 🔴 external template).
- **Contact:** 🔴 **Web3Forms key still placeholder** — leads still fall back to `mailto`.
  **Fix today.**

**Weak/risky content to fix:**

1. **Web3Forms key** — set the real key so submissions are captured (~5 min).
2. **Homepage is v1** — promote `/preview/` to `/`.
3. **Unverifiable stats** on the v1 homepage ("320+ happy clients," "15+ years") — verify or
   soften; enterprise buyers check.
4. **Inline `style=` on ~20 pages** — migrate into stylesheets for consistency & CSP-friendliness.

---

## 7. Comparison With Modern Technology Companies

| Pattern                 | Peers | Inteople (2026-06-29) | Inteople (2026-07-02)  |
| ----------------------- | :---: | :-------------------: | :--------------------: |
| Per-product pages       |  ✅   |          ❌           |           ✅           |
| Per-service pages       |  ✅   |          ❌           |           ✅           |
| Case studies w/ metrics |  ✅   |          ❌           | 🟢 (3, verify metrics) |
| Blog / Insights         |  ✅   |          ❌           |      ✅ (5 posts)      |
| About / Company         |  ✅   |          ❌           |           ✅           |
| Trust / Security        |  ✅   |          ❌           |      🟢 `/trust`       |
| Legal (Privacy/Terms)   |  ✅   |      🔴 external      |        ✅ owned        |
| Careers                 |  ✅   |          ❌           |       ❌ (still)       |
| Newsletter capture      |  ✅   |          ❌           |       ❌ (still)       |
| Analytics               |  ✅   |          ❌           |       ❌ (still)       |

**Read:** the structural deficit that defined the last audit is mostly erased. What remains is
operational maturity (analytics, careers, newsletter) and finishing the homepage cutover.

---

## 8. Future Scalability Recommendation

The last audit's **no-build decision still stands** (see Decisions Log). The re-evaluation
trigger it set — ">8–10 pages or a blog ships" — **has now fired** (32 pages + `/insights`).
That doesn't force a migration; it means the question is now live:

- **Stay no-build (current):** works today; cost is hand-mirrored header/footer across 32
  pages and manual `Article`/listing upkeep for the blog. Linting (§11) mitigates drift.
- **Astro (still the recommended path _if_ maintenance pain grows):** one shared layout,
  Markdown/MDX content collections for blog + case studies + products, auto per-type JSON-LD.
  Ports the existing HTML/CSS over and preserves the Netlify deploy.

**CTO call unchanged:** stay no-build for now, but treat any of these as the migrate signal —
blog author velocity rises, header/footer drift recurs despite linting, or non-devs need to
publish. The recommended IA (below) is already ~80% built as static folders.

### Recommended IA (already mostly shipped)

```text
inteople.com
├── /                      Home — promote v2 (/preview) here  ← NEXT
├── /company/about         ✅ built   (+ /leadership, /careers → todo)
├── /services              ✅ built   (ai-ml, cloud, iot-embedded, software-engineering)
├── /products              ✅ built   (healodex, edunation, replyflow, pallishokti)
├── /work                  ✅ built   (3 case studies)
├── /insights              ✅ built   (blog; +categories/authors/RSS → todo)
├── /trust /privacy /terms ✅ built
├── /edu, /sites/*         ✅ sub-sites
└── /404                   → todo
```

---

## 9. Blog / Insights — Next Steps

`/insights` exists with 5 articles on the v2 system. To mature it without a framework:

- Add **`Article` JSON-LD** + author byline/date + reading-time to each post.
- Add **categories** and an **RSS feed** (can be generated by a small script like the sitemap).
- When author velocity or non-dev publishing demands it, migrate posts to a Markdown content
  collection (Astro) or a git-based CMS (Decap) — see §8.

---

## 10. Final CTO Recommendation

### A. Keep

v2 design-token system · case studies / insights / product & service pages · owned legal &
trust pages · Netlify push-to-deploy · vCards · **new linting toolchain** (§11).

### B. Finish / Fix (High)

1. **Promote v2 homepage** `/preview/` → `/`; rewire primary nav to the real routes; drop the
   live path's dependency on `/archive/v1/*`.
2. **Set the real Web3Forms key** (leads currently lost to `mailto`).
3. **Add analytics** (Plausible/GA4 — one script tag).
4. **Migrate inline `style=`** into stylesheets (~20 pages).

### C. Add next (Med)

Verify/soften homepage stats · per-type JSON-LD (`Article`/`Product`/`Breadcrumb`) · RSS +
categories for `/insights` · `/company/about/leadership` (unhide team) · `/404`.

### D. Add later (Low)

Careers · newsletter capture · partners/press · CMS (Decap/Sanity) · reconsider Astro if the
no-build maintenance cost climbs (§8).

---

## 11. Code Quality / Linting (new — 2026-07-02)

A **development-only** linting toolchain was added. It formats and lints the source but
**never runs on deploy** (Netlify still deploys the repo as-is; `node_modules/` is gitignored).
Full usage in [`docs/LINTING.md`](LINTING.md).

| Language | Tool                                      | Config                              |
| -------- | ----------------------------------------- | ----------------------------------- |
| All      | Prettier + EditorConfig                   | `.prettierrc.json`, `.editorconfig` |
| HTML     | html-validate                             | `.htmlvalidate.json`                |
| CSS      | Stylelint (`stylelint-config-standard`)   | `.stylelintrc.json`                 |
| JS       | ESLint 9 (flat, tuned for ES5 IIFE style) | `eslint.config.mjs`                 |
| Markdown | markdownlint-cli2                         | `.markdownlint-cli2.jsonc`          |
| Python   | Ruff (lint + format)                      | `ruff.toml`                         |

**Automation:** `lint-staged` + husky pre-commit auto-fix staged files;
`.github/workflows/lint.yml` runs the full suite + `sitemap --check` on every push/PR.

**Real issues found & fixed in the setup pass:** stale `config.js` path comment; dead external
privacy link → `/privacy/`; stale 6-URL sitemap → auto-generated 30-URL sitemap; empty `catch`
blocks and an unused variable in `edu.js`; a CSS `border` shorthand overriding `border-color`
and several exact-duplicate CSS declarations; 37 `<button>` missing `type`; 19 unencoded `&`
in text; a duplicated CSS class; misused `aria-label`s on non-labelable elements; charset
casing drift. Remaining **warnings** (non-blocking): `wcag/h30` on decorative image-links in
insight "Related" cards; `~20` pages still carry inline `style=`.

---

## Roadmap by Priority

| Priority    | Initiative                                       | Why                                           | Effort |
| ----------- | ------------------------------------------------ | --------------------------------------------- | ------ |
| 🔴 **High** | Set real Web3Forms key                           | Capturing leads now                           | 5 min  |
| 🔴 **High** | Promote v2 homepage to `/` + rewire nav          | Front door still v1; unlocks internal linking | M      |
| 🔴 **High** | Add analytics (Plausible/GA4)                    | Can't improve what you don't measure          | S      |
| 🟠 **Med**  | Migrate inline styles → stylesheets              | Consistency / CSP                             | S–M    |
| 🟠 **Med**  | Per-type JSON-LD + RSS for insights              | Organic growth                                | M      |
| 🟠 **Med**  | Verify/soften homepage stats                     | Enterprise trust                              | S      |
| 🟢 **Low**  | Careers, /404, leadership, newsletter            | Scale & depth                                 | M      |
| 🟢 **Low**  | Reconsider Astro / CMS if maintenance pain grows | Operational maturity                          | L      |

---

## Open Decisions

1. **EduNation vs EduConnect** — ✅ **CLOSED (2026-07-02):** resolved to **EduNation**
   sitewide.
2. **Re-platform appetite (no-build vs Astro)** — **still no-build** (Decisions Log). The
   re-evaluation trigger has now fired (blog + 32 pages); revisit when maintenance pain
   recurs.
3. **v2 homepage promotion** — **NEW, open:** promote `/preview/` to `/` now, or keep iterating
   in preview? Recommendation: promote (see §10.B).

---

## Decisions Log

_Running record of direction-setting calls._

| Date       | Decision                                                                                  | Rationale / owner note                                                                            |
| ---------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 2026-06-29 | **Stay no-build** (pure static HTML/CSS/JS, Netlify push-to-deploy).                      | Owner preference. Revisit Astro when page count / blog makes copy-paste painful.                  |
| 2026-06-29 | **EduNation vs EduConnect naming: deferred.**                                             | No edu changes until canonical name chosen.                                                       |
| 2026-06-29 | Audit captured for a **future "v2" planning cycle**.                                      | Build later per CTO review.                                                                       |
| 2026-07-02 | **EduNation is canonical.**                                                               | Naming resolved; site uniformly uses "EduNation" (no "EduConnect").                               |
| 2026-07-02 | **Added dev-only linting toolchain; deploy remains no-build.**                            | Quality gate for the growing page count (§11). `node_modules` gitignored; Netlify unaffected.     |
| 2026-07-02 | **Sitemap is now generated, not hand-maintained.**                                        | Manual sitemap had rotted to 6 of ~30 URLs; `scripts/generate-sitemap.mjs` + CI check replace it. |
| 2026-07-02 | Re-evaluation trigger for no-build has **fired** (blog + 32 pages) but decision **held**. | Migrate only when hand-maintenance pain recurs; linting buys runway.                              |

---

## No-Build Implementation Path (still valid)

The multi-page IA in §8 is built as plain `.html` files in folders (mirroring `/vc/` and
`/edu/`), with Netlify pretty-URL redirects. The one real cost remains **shared
header/footer/SEO drift** across pages — now partially mitigated by linting (§11) and the
generated sitemap. If drift recurs, tame it with a client-side `data-include` fetch or an
optional Python "stamp" script (both keep the deploy model unchanged); escalate to Astro only
at the migrate signal in §8.

---

## Loose Ends (housekeeping, not roadmap)

- `netlify.toml` contains **inert** subdomain rewrites for `edu.inteople.com` and
  `brdb.inteople.com` — live only once Netlify domain aliases + DNS CNAMEs exist. Keep for
  future subdomain use or revert — owner decision pending.
- `/sites/brdb/` and `/preview/` are `noindex` and excluded from the generated sitemap by
  design; promote them (and update the generator's exclude list) when they go public.
- The live homepage still references `/archive/v1/*` assets — this is the dependency to sever
  when promoting the v2 home.
