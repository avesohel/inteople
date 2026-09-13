# Inteople.com v2 — Rebuild Foundation

_The structural blueprint for rebuilding Inteople as a parent technology company platform._
_Created 2026-06-29. Companion to `AUDIT.md`. Pre-design phase — no page layouts yet._

**Constraints carried from the Decisions Log (`AUDIT.md`):**

- **No-build** — pure static HTML/CSS/JS, Netlify push-to-deploy. Shared chrome via partial
  includes / a stamp script (see `AUDIT.md` → No-Build Implementation Path).
- **Brand** — keep premium **navy + coral**; formalize into shared tokens.
- **EduNation vs EduConnect** — naming deferred; product slug shown as `edunation` provisionally.

**Brand positioning for v2:** Inteople is a **parent technology company** that _builds and
operates its own AI products_ **and** _engineers products for partners_. Every page should
reinforce this dual "Ventures + Studio" identity, not an agency-for-hire identity.

---

## 1. Sitemap

Folder-based static routing (mirrors existing `/edu/`, `/vc/`). Netlify pretty-URLs serve
`/about/` → `/about/index.html`.

```text
inteople.com
│
├── /                              Home — parent-company narrative
│
├── /company/                      Who we are
│   ├── /company/about/            Story, mission, vision, values, milestones
│   ├── /company/leadership/       Team & directors (unhide existing)
│   ├── /company/careers/          Open roles + culture
│   └── /company/contact/          Contact (form + offices + map)
│
├── /services/                     Capabilities overview
│   ├── /services/ai-ml/           AI & Machine Learning
│   ├── /services/software-engineering/   Custom software & product engineering
│   ├── /services/iot-embedded/    IoT & embedded systems
│   ├── /services/cloud-saas/      SaaS & cloud platforms
│   └── /services/mobile-web/      Mobile & web apps
│
├── /industries/                   Verticals overview
│   ├── /industries/healthtech/
│   ├── /industries/fintech/
│   ├── /industries/agrotech/
│   └── /industries/edutech/
│
├── /products/                     Owned & operated products (the parent showcase)
│   ├── /products/healodex/        HealthTech flagship
│   ├── /products/edunation/       EduTech  (name DEFERRED)
│   ├── /products/ownbooks/        AI bookkeeping
│   └── /products/replyflow/       AI reply automation
│
├── /work/                         Case studies index
│   └── /work/<case-slug>/         Individual case study
│
├── /insights/                     Blog / thought leadership
│   ├── /insights/<post-slug>/     Article
│   ├── /insights/category/<cat>/  Category archive
│   └── /insights/author/<author>/ Author archive
│
├── /trust/                        Security, compliance, reliability, data handling
├── /partners/                     Technology & delivery partners
│
├── /legal/
│   ├── /legal/privacy/            Owned (replaces external template link)
│   ├── /legal/terms/
│   └── /legal/cookies/
│
├── /vc/*                          Digital business cards (KEEP as-is)
├── /edu/                          Existing EduNation landing (fold into /products/edunation later)
└── /404                           Branded not-found
```

### Navigation model

**Primary header (left→right):** Services · Products · Industries · Work · Insights · Company
**Header CTA (right):** `Start a project` (primary) + `Book a demo` (ghost)
**Header behavior:** sticky, shrinks on scroll (existing pattern). Services/Products/Industries
open a **structured dropdown/mega-panel** listing children + a featured item.

**Footer (5 columns):**

1. Brand block — logo, one-line positioning, socials, language note
2. Company — About · Leadership · Careers · Contact · Trust
3. Services — the 5 service pages
4. Products — the owned products + "All products"
5. Resources — Insights · Work · Partners · Privacy · Terms

**Utility nav:** breadcrumbs on every inner page; "Start a project" CTA persistent.

---

## 2. Section Hierarchy (per page type)

**Home**

1. Hero — parent positioning + "delivery console" visual (keep, evolve)
2. Trust bar — credibility stats / partner or product logos
3. Capability pillars — AI · Software Engineering · IoT · Cloud (→ /services)
4. **Products we build & operate** — owned-product grid (the parent narrative)
5. Industries we serve — 4 verticals
6. Selected work — 2–3 case-study teasers (metric-forward)
7. How we work — process steps
8. Why Inteople — enterprise differentiators / trust signals
9. Insights — latest 3 posts
10. Leadership message — quote(s)
11. CTA band
12. Footer

**Service detail** — Hero (value prop) → Capabilities/what's included → Approach/methodology →
Tech stack → Related products → Related case studies → FAQ → CTA

**Product detail** — Hero (product + live link/badge) → Problem→solution → Key features →
Screens/visuals (custom CSS/SVG, not stock) → Outcomes/metrics → Tech under the hood →
Compliance note (if applicable) → CTA (Visit / Book demo)

**Industry detail** — Hero → Vertical challenges → Our capabilities mapped to them →
Relevant products → Relevant case studies → Compliance/regulatory note (e.g. HIPAA-aware) → CTA

**Case study** — Hero (client + headline metric) → Challenge → Approach → Solution →
Results (metrics band) → Tech stack → Testimonial → Related work → CTA

**Company / About** — Hero (mission) → Origin story → Vision → Values → Milestones timeline →
Leadership preview → Global reach/locations → CTA

**Leadership** — Intro → Leadership grid (cards) → Directors → "Join us" link to careers

**Careers** — Hero (why Inteople) → Culture/values → Benefits → Open roles list → How we hire →
CTA (apply / general interest)

**Insights (listing)** — Intro → Featured post → Category filters → Post grid → Newsletter
capture → Pagination

**Insights (post)** — Header (title, author, date, reading time, category) → Hero image →
Article body (narrow reading column) → Author bio → Related articles → Newsletter/CTA

**Trust** — Security practices → Compliance posture (HIPAA-aware, data handling) →
Reliability/SLA/uptime → Data privacy → Certifications & roadmap → Contact security

**Contact** — Hero → Form (Web3Forms) → Direct channels (email/phone) → Offices → Map →
Leadership cards link (/vc/)

---

## 3. Reusable Components

Class-based (BEM-ish), composed in static HTML. Shared chrome via partials.

**Global / chrome**

- `site-header` + mega-panel nav, `nav-drawer` (mobile)
- `site-footer`
- `skip-link`, `breadcrumb`
- `btn` variants: `btn-primary`, `btn-ghost`, `btn-sm`, `btn-link`
- `pill` / `badge`
- `section` wrapper + `eyebrow` + `section-title` + `lead`
- `container` (default / wide / narrow-article)

**Cards**

- `card--capability` (icon, title, desc, link) — services
- `card--product` (logo, badge, image, feature list, CTA) — exists, reuse
- `card--industry` (icon, vertical, blurb)
- `card--case` (client, headline metric, tags) — metric-forward
- `card--post` (image, category, title, meta, reading time) — blog
- `card--person` (photo, name, role, social) — leadership
- `card--stat` / animated counter tile
- `card--quote` (testimonial / leadership)

**Patterns**

- `hero` (home variant + `hero--inner` for sub-pages)
- `logo-bar` / trust bar
- `process` steps
- `feature-split` (text + visual, alternating)
- `metric-band`
- `cta-band`
- `faq` (accordion, details/summary based)
- `newsletter` signup
- `tabs`, `chip`/tag, `pagination`, `spec-table` / comparison table

**Utility / behavior (JS)**

- `reveal` on-scroll (exists)
- `data-count` animated counter (exists)
- `data-link` config injection (exists — keep single source of truth)
- **`data-include` partial loader (NEW)** — fetch shared header/footer for no-build DRY
- sticky-header, mobile-nav (exists)

**Component states:** define hover / focus-visible / active / disabled / loading for every
interactive element. Focus rings mandatory.

---

## 4. Design System Direction

Goal: **one parent design system**, products are accent-themed layers on it — fixing the
navy/coral-vs-edu-blue fragmentation called out in `AUDIT.md`.

### CSS architecture (no-build, multiple `<link>`s, HTTP/2)

```text
/src/styles/
  tokens.css        ← single source of truth: color, type, space, radius, shadow, motion
  base.css          ← reset, base typography, layout primitives, a11y
  components.css    ← buttons, cards, nav, hero, sections, patterns
  pages.css         ← page-specific composition / overrides
```

Product subsites (`/edu/`, future) **import the same `tokens.css`** then override only the
accent slot.

### Color

- **Brand:** navy `#2b3a55` (+ `#3f5575`, `#6b80a3`) — primary
- **Accent:** coral `#ff6a50` (+ `#ff8a73`, soft `#ffe6e0`) — actions/highlights
- **Surfaces:** near-white `#f7f9fc`, `#eef2f8`, white; lines `#e2e8f2` / `#d3dcea`
- **Ink:** `#1f2a3d`, muted `#5d6b82`, `#8a96ab`
- **Semantic:** success / warning / danger / info (add)
- **Per-product accent slot:** `--accent` overridable per product (e.g. Healodex teal,
  EduNation green) — _structure/neutrals stay identical_, only accent shifts. Scope via
  `[data-theme="healodex"]` or a per-page `<body>` class.

### Typography

- **Inter** (keep). Type scale via `clamp()`:
  display / h1 / h2 / h3 / h4 / body-lg / body / small / eyebrow / mono.
- Article body: max-width ~70ch, larger line-height for readability.
- Bangla (`Hind Siliguri`) loaded only where bilingual (edu).

### Spacing & layout

- 4px base scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`
- Section vertical rhythm token (e.g. `--section-y`)
- Containers: default `1180` · wide `1320` · article `720`
- 12-column mental model; CSS grid + flex

### Elevation, radius, motion

- Radius: `18px` / `12px` (exists) + pill
- 3 shadow tiers (rest / hover / overlay)
- Motion tokens: durations (fast/base/slow), easing; reveal + counters honor
  `prefers-reduced-motion`

### Iconography & imagery

- Inline SVG, stroke `1.75` (existing convention) — one consistent set
- Photos `.webp`/`.avif`, `width`/`height` + `loading="lazy"`
- Product mockups as **custom CSS/SVG** (per the `/edu/` precedent) — avoid generic stock

### Accessibility baseline

- WCAG AA contrast · visible focus · semantic landmarks · alt text · keyboard nav ·
  reduced-motion · skip-link

### Brand architecture rule

On `inteople.com`, products wear **Inteople chrome** (shared header/footer) with their accent.
On their own domains they can be co-branded. Never a fully separate design system.

---

## 5. SEO Structure

### URL conventions

Lowercase, hyphenated, trailing-slash folders, stable slugs, no params. Mirrors Netlify
pretty-URLs.

### Meta — unique per page

| Page       | Title pattern                                        |
| ---------- | ---------------------------------------------------- |
| Home       | `Inteople — AI, Software, IoT & Product Engineering` |
| Service    | `AI & Machine Learning Services \| Inteople`         |
| Product    | `Healodex — Telehealth Infrastructure \| Inteople`   |
| Industry   | `HealthTech Software Development \| Inteople`        |
| Case study | `<Client>: <Outcome> \| Inteople Work`               |
| Blog post  | `<Title> \| Inteople Insights`                       |
| Company    | `About Inteople — A Technology Company`              |

Each page: unique `description`, `canonical`, per-page OG/Twitter (+ per-post OG image).

### Structured data (JSON-LD) by type

- **Organization** (home) — extend existing: logo, `contactPoint`, `address`, `sameAs`,
  `foundingDate`, `founder`
- **WebSite** + `SearchAction` (home)
- **BreadcrumbList** — every inner page
- **Service** — service pages
- **Product** / **SoftwareApplication** — product pages
- **Article** (+ author/publisher) — blog posts
- **CreativeWork**/Article — case studies
- **JobPosting** — careers roles
- **FAQPage** — where FAQ blocks exist

### Sitemap & robots

- **Generate `sitemap.xml`** with a small `scripts/` generator that walks the folders (run
  before push) — replaces the hand-maintained file that will rot. Consistent with the no-build
  stamp-script approach.
- `robots.txt` keeps `Sitemap:` ref (exists).

### Internal linking

Hub-and-spoke: Service ↔ Industry ↔ Product ↔ Case study ↔ Blog cross-link each other.
Breadcrumbs everywhere. Footer links to all hubs.

### Performance (Core Web Vitals)

Keep `width`/`height`, lazy-load below fold, preconnect fonts, webp/avif, minimal deferred JS.
Budget: LCP < 2.5s, CLS < 0.1, INP < 200ms.

### Measurement (prerequisite)

Add **analytics** (Plausible or GA4) + **Google Search Console**, submit sitemap. _Currently
none — flagged High in `AUDIT.md`._

### i18n note

Main site English-first; `hreflang` ready if Bangla is added later. Edu landing already
bilingual.

---

## Build Sequencing (suggested, no-build)

| Phase | Deliverable                                                                  | Depends on |
| ----- | ---------------------------------------------------------------------------- | ---------- |
| 0     | `tokens.css` + `base.css` + partials (header/footer) + `data-include` loader | —          |
| 1     | Home (recomposed) + footer legal links → owned `/legal/*`                    | Phase 0    |
| 2     | `/company/about` + unhide `/company/leadership`                              | Phase 0    |
| 3     | `/services/*` (overview + 5 details)                                         | Phase 0    |
| 4     | `/products/*` + `/industries/*`                                              | Phase 0    |
| 5     | `/work/*` case studies                                                       | Phase 0    |
| 6     | `/insights/*` blog MVP + sitemap generator                                   | Phase 0    |
| 7     | `/trust`, `/partners`, `/company/careers`, `/404`                            | Phase 0    |

Quick wins (Web3Forms key, analytics) can land anytime, independent of phases.

---

_Next step after sign-off on this foundation: produce page-level wireframes/layouts, starting
with Phase 0 (tokens + chrome) and the Home recomposition._
