# Inteople.com v2 — Page Specifications

_Per-page spec: purpose · target audience · main sections · primary CTA · SEO intent._
_Created 2026-06-29. Companion to `AUDIT.md` and `FOUNDATION.md`._

**Conventions**

- Routes are folder-based (`/about/` → `/about/index.html`), no-build static, Netlify pretty-URLs.
- Every page also carries: breadcrumb, BreadcrumbList JSON-LD, unique title/description/canonical,
  per-page OG/Twitter, and a persistent footer + "Start a project" CTA.
- **Service list reconciliation:** v2 uses **4 services** (`ai-ml`, `software-engineering`,
  `iot-embedded`, `cloud`). Mobile & web fold into `software-engineering`; SaaS folds into `cloud`.
  → `FOUNDATION.md` §1 should be updated from its 5-service list to match.

---

## TOP-LEVEL PAGES

### Home — `/`

- **Purpose:** Establish Inteople as a parent technology company that builds & operates its own AI
  products and engineers products for partners. Route visitors to the right hub.
- **Audience:** All personas — prospective clients, enterprise/gov buyers, investors, partners,
  candidates, press. Primary: decision-makers evaluating a serious tech partner.
- **Main sections:** Hero (parent positioning + delivery-console visual) → Trust bar (stats /
  product logos) → Capability pillars (AI · Software Eng · IoT · Cloud) → **Products we build &
  operate** → Industries → Selected work (metric teasers) → How we work → Why Inteople → Latest
  insights → Leadership message → CTA band.
- **Primary CTA:** `Start a project` (secondary: `See our products`).
- **SEO intent:** Brand + category ("Inteople", "AI software & product engineering company").
  JSON-LD: Organization + WebSite/SearchAction.

### About — `/company/about/`

- **Purpose:** Build trust through story, mission, vision, values, and trajectory. Humanize the
  company; signal stability and ambition.
- **Audience:** Investors, enterprise/gov buyers doing due diligence, candidates, partners.
- **Main sections:** Hero (mission) → Origin story → Vision → Values → Milestones timeline →
  Leadership preview (→ /company/leadership) → Global reach / locations → CTA.
- **Primary CTA:** `Work with us` (secondary: `Meet the team`).
- **SEO intent:** Navigational/brand ("about Inteople", "Inteople company"). JSON-LD: AboutPage +
  Organization.

### Services — `/services/`

- **Purpose:** Overview of capabilities; gateway to the 4 service detail pages.
- **Audience:** Clients/enterprise scoping a build; technical and business buyers.
- **Main sections:** Hero (capability value prop) → 4 service cards → Engagement models (how we
  partner) → Tech stack overview → Related work → CTA.
- **Primary CTA:** `Discuss your project`.
- **SEO intent:** Category ("software development services", "AI development company"). JSON-LD:
  ItemList of Service.

### Products — `/products/`

- **Purpose:** The parent showcase — owned & operated products as proof of capability and vision.
- **Audience:** Investors (portfolio signal), clients (proof we ship), buyers of the products.
- **Main sections:** Hero (Ventures narrative) → Product grid (Healodex, EduNation, ReplyFlow,
  OwnBooks) → "How we build products" → CTA (explore / partner).
- **Primary CTA:** `Explore a product` (secondary: `Build with us`).
- **SEO intent:** Category/brand ("Inteople products", product names). JSON-LD: ItemList of Product.

### Work / Case Studies — `/work/`

- **Purpose:** Evidence. Outcome-driven proof for enterprise/investor trust (the #1 missing asset
  per AUDIT.md).
- **Audience:** Enterprise/gov buyers, investors, prospective clients comparing vendors.
- **Main sections:** Hero → Filter by industry/service → Case-study card grid (metric-forward) →
  Results highlight band → CTA.
- **Primary CTA:** `Start your project`.
- **SEO intent:** Evidence/long-tail ("healthtech software case study"). JSON-LD: ItemList →
  per-case Article/CreativeWork.

### Blog / Insights — `/insights/`

- **Purpose:** Organic growth engine + thought leadership; demonstrate domain depth in AI, IoT,
  health/edu tech.
- **Audience:** Organic search readers, prospects mid-research, peers, candidates.
- **Main sections:** Hero/intro → Featured post → Category filters → Post grid → Newsletter
  capture → Pagination. (Children: `/insights/<post>/`, `/category/<cat>/`, `/author/<author>/`.)
- **Primary CTA:** `Subscribe` (secondary inline: contextual project CTA).
- **SEO intent:** Informational long-tail (the bulk of organic traffic). JSON-LD: Blog → per-post
  Article + author/publisher. RSS feed.

### Careers — `/company/careers/`

- **Purpose:** Attract talent; signal growth and culture (a growth signal for investors too).
- **Audience:** Candidates (engineers, designers, PMs); secondarily investors/partners.
- **Main sections:** Hero (why Inteople) → Culture & values → Benefits → Open roles list → How we
  hire → CTA (apply / general interest).
- **Primary CTA:** `View open roles` / `Apply`.
- **SEO intent:** Talent ("Inteople careers", "software jobs Bangladesh/remote"). JSON-LD:
  JobPosting per role.

### Trust — `/trust/`

- **Purpose:** Enterprise/government readiness — security, compliance, reliability, data handling.
  Removes procurement blockers.
- **Audience:** Enterprise/gov procurement, security/compliance reviewers, healthcare buyers.
- **Main sections:** Hero → Security practices → Compliance posture (HIPAA-aware, data handling) →
  Reliability/SLA/uptime → Data privacy → Certifications & roadmap → Security contact.
- **Primary CTA:** `Contact our security team` (secondary: `Request documentation`).
- **SEO intent:** Trust/brand ("Inteople security", "is Inteople HIPAA compliant"). JSON-LD:
  WebPage; FAQPage if Q&A used.

### Contact — `/company/contact/`

- **Purpose:** Capture qualified inquiries and provide direct channels.
- **Audience:** All conversion-ready visitors.
- **Main sections:** Hero → Inquiry form (Web3Forms; needs real key — AUDIT High) → Direct channels
  (email/phone) → Offices → Map → Leadership cards (→ /vc/).
- **Primary CTA:** `Send message`.
- **SEO intent:** Navigational ("contact Inteople"). JSON-LD: ContactPage + Organization contactPoint.

### Privacy — `/legal/privacy/`

- **Purpose:** Owned privacy policy (replaces the external template link flagged in AUDIT.md). Legal
  - trust requirement.
- **Audience:** All users; enterprise/gov/legal reviewers; regulators.
- **Main sections:** Last-updated → Data collected → Use & legal basis → Cookies/analytics →
  Third parties (Web3Forms, fonts, analytics) → Retention → User rights → Contact.
- **Primary CTA:** `Contact us` (low-emphasis).
- **SEO intent:** Utility (indexable, low priority). JSON-LD: WebPage. `noindex` optional.

### Terms — `/legal/terms/`

- **Purpose:** Terms of use / service governing site and engagements.
- **Audience:** All users; legal/procurement reviewers.
- **Main sections:** Last-updated → Acceptance → Use of site → IP → Disclaimers → Liability →
  Governing law → Changes → Contact.
- **Primary CTA:** `Contact us` (low-emphasis).
- **SEO intent:** Utility. JSON-LD: WebPage.

> Also recommended (from FOUNDATION.md, not in this request): `/legal/cookies/`, `/partners/`,
> `/company/leadership/`, `/industries/*`, and a branded `/404`.

---

## PRODUCT PAGES

_Shared template:_ Hero (product + live link/badge) → Problem → Solution → Key features →
Screens/visuals (custom CSS/SVG, no stock) → Outcomes/metrics → Tech under the hood → Compliance
note (if applicable) → CTA. _JSON-LD: Product / SoftwareApplication._ Each wears Inteople chrome
with a per-product accent (FOUNDATION.md §4).

### Healodex — `/products/healodex/`

- **Purpose:** Position the HealthTech flagship — real-time health intelligence & telehealth
  infrastructure — as proof of regulated-domain capability.
- **Audience:** Health systems, clinics, doctors, healthtech investors; enterprise health buyers.
- **Main sections:** Standard template + emphasis on IoT/edge diagnostics (Healodex Kit),
  doctor-in-the-loop triage, offline-first sync, FHIR-readiness, HIPAA-aware compliance.
- **Primary CTA:** `Visit Healodex` / `Book a demo`.
- **SEO intent:** Product + category ("Healodex", "telehealth infrastructure", "remote patient
  monitoring platform"). Accent: health teal.

### EduNation — `/products/edunation/` _(name DEFERRED — EduNation vs EduConnect)_

- **Purpose:** Position the EduTech product — AI-powered school operating system / learning
  ecosystem. Eventually folds in the existing `/edu/` landing.
- **Audience:** School owners, principals, teachers, parents; edutech investors; ministries.
- **Main sections:** Standard template + school management, AI classroom assistant, student/parent
  apps, Bangla+English support.
- **Primary CTA:** `Book free demo` / `Start digital transformation`.
- **SEO intent:** Product + category ("school management software", "AI education platform
  Bangladesh"). Accent: education green. **Blocked on naming decision.**

### ReplyFlow — `/products/replyflow/`

- **Purpose:** Position the AI reply/automation product as applied-AI proof.
- **Audience:** SMBs, support/sales teams, ops leaders evaluating AI automation.
- **Main sections:** Standard template + AI reply generation, channel integrations, workflow
  automation, analytics.
- **Primary CTA:** `Try ReplyFlow` / `Book a demo`.
- **SEO intent:** Product + category ("AI reply automation", "AI customer response tool").
  Accent: per brand.

### OwnBooks — `/products/ownbooks/`

- **Purpose:** Position the AI bookkeeping/accounting product — FinTech applied-AI proof.
- **Audience:** SMBs, founders, accountants, finance teams.
- **Main sections:** Standard template + AI bookkeeping, automated categorization, reports,
  integrations, security/data handling.
- **Primary CTA:** `Try OwnBooks` / `Book a demo`.
- **SEO intent:** Product + category ("AI bookkeeping software", "automated accounting").
  Accent: per brand.

---

## SERVICE PAGES

_Shared template:_ Hero (value prop) → What's included / capabilities → Approach/methodology →
Tech stack → Related products → Related case studies → FAQ → CTA. _JSON-LD: Service (+ FAQPage)._

### AI & Machine Learning — `/services/ai-ml/`

- **Purpose:** Sell AI capability — LLM apps, RAG, agents, copilots, computer vision, predictive
  models wired into real products. Inteople's lead differentiator.
- **Audience:** Product leaders, CTOs, enterprises adding AI; AI-curious buyers.
- **Main sections:** Template + use-cases (copilots/RAG/CV/forecasting), responsible-AI/data note,
  proof via products (ReplyFlow, OwnBooks, Healodex AI).
- **Primary CTA:** `Scope an AI project`.
- **SEO intent:** High-value commercial ("AI development services", "LLM/RAG development company",
  "build an AI agent").

### Software Engineering — `/services/software-engineering/`

- **Purpose:** Core custom software & product engineering — incl. mobile & web (folded in). The
  foundational service.
- **Audience:** Startups→enterprise needing a senior build partner; non-technical founders.
- **Main sections:** Template + product engineering, web apps, cross-platform mobile (Flutter/RN),
  modernization, QA/security, ownership model.
- **Primary CTA:** `Start a build`.
- **SEO intent:** Commercial ("custom software development company", "product engineering
  services", "mobile app development").

### IoT & Embedded — `/services/iot-embedded/`

- **Purpose:** Differentiated hardware+software capability — ESP32/edge devices, telemetry,
  connected products (ties to Healodex Kit).
- **Audience:** Healthtech/agrotech/industrial buyers needing connected products.
- **Main sections:** Template + edge devices, telemetry pipelines, firmware, device↔cloud, security;
  proof via Healodex IoT.
- **Primary CTA:** `Discuss your connected product`.
- **SEO intent:** Niche commercial ("IoT development company", "embedded systems / ESP32
  development", "telemetry platform").

### Cloud — `/services/cloud/`

- **Purpose:** Cloud-native & SaaS platforms (SaaS folded in) — multi-tenant architecture, APIs,
  scalability, reliability on AWS/Azure/GCP.
- **Audience:** Enterprises & SaaS founders needing scalable, reliable platforms; technical buyers.
- **Main sections:** Template + multi-tenant SaaS, cloud architecture, APIs/integrations, DevOps,
  reliability/SLA (ties to /trust).
- **Primary CTA:** `Plan your platform`.
- **SEO intent:** Commercial ("SaaS development company", "cloud-native architecture", "AWS/Azure/GCP
  development partner").

---

## Cross-Linking Map (hub-and-spoke, for SEO + navigation)

- **Service ↔ Product:** AI-ML ↔ ReplyFlow/OwnBooks/Healodex · IoT ↔ Healodex · Cloud ↔ all SaaS
  products · Software-Eng ↔ all.
- **Service ↔ Industry:** AI-ML/Software → all · IoT → HealthTech/AgroTech · Cloud → all.
- **Product ↔ Industry:** Healodex ↔ HealthTech · EduNation ↔ EduTech · OwnBooks ↔ FinTech.
- **Work ↔ everything:** each case study links its service(s), product(s), industry.
- **Insights ↔ everything:** posts link the relevant service/product/industry hub.
- **Trust ↔ Cloud/Contact/Products** (esp. Healodex compliance).

---

## Open Items Affecting Pages

1. **EduNation vs EduConnect** — blocks `/products/edunation/` final naming/URL (AUDIT.md, deferred).
2. **Web3Forms key** — Contact page can't capture leads until set (AUDIT High).
3. **Service-list reconciliation** — update `FOUNDATION.md` §1 from 5 services to the 4 above.
4. **Recommended-but-unrequested pages** — `/industries/*`, `/company/leadership/`, `/partners/`,
   `/legal/cookies/`, `/404`: confirm whether v2 scope includes them now or later.
