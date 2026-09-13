# Inteople.com

The website for **Inteople** — a parent technology company that engineers intelligent digital
platforms, AI products and connected ecosystems, and builds and operates its own ventures across
healthtech, edtech, fintech and IoT.

It is a **static site**: plain HTML, CSS and vanilla JavaScript with **no build step**. Push to
the default branch and Netlify deploys automatically (`publish = "."`).

> **Key mental model:** because `publish = "."`, **a folder's path _is_ its public URL**, and all
> assets are referenced by **absolute URL** (`/assets/...`), not by relative file path. So `/company/about/`
> is live at `inteople.com/company/about/` simply because the folder sits there. Moving a folder
> changes its URL — keep this in mind before relocating anything.

---

## Repository structure

```text
inteople/
├── index.html              # Homepage (LIVE at inteople.com/) — current v1 marketing homepage
│
│   ── Main site pages (each folder = its public URL) ──
├── company/about/          # /company/about/
├── services/               # /services/  (+ ai-ml, software-engineering, iot-embedded, cloud)
├── products/               # /products/  (+ healodex, edunation, replyflow, pallishokti)
├── work/                   # /work/      (+ per-case-study folders)
├── insights/               # /insights/  (blog + per-article folders)
├── trust/  privacy/  terms/ # /trust/, /privacy/, /terms/
├── vc/                     # /vc/*  digital business cards (one HTML page per person)
│
│   ── Shared design system & assets (ONE home for everything reusable) ──
├── assets/
│   ├── styles/             # Design system: tokens.css → base.css → page CSS
│   ├── scripts/            # home.js (v2 interactions), config.js, vendor/
│   └── images/             # brand/ icons/ products/ team/ qr/
│
│   ── Staging ──
├── preview/index.html      # NEW (v2) homepage, STAGED + noindex. Not live until promoted.
│
│   ── Subdomain sites ──
├── sites/
│   ├── edu/                # edu.inteople.com  (also served at inteople.com/edu/)
│   └── brdb/               # brdb.inteople.com (placeholder — coming soon)
│
│   ── Archived versions ──
├── archive/
│   └── v1/                 # Assets used ONLY by the old homepage (styles/main.css, scripts/main.js)
│
│   ── Tooling & docs (not deployed as pages) ──
├── scripts/generate-qr.py  # Regenerates virtual-card QR codes
├── docs/                   # AUDIT.md, FOUNDATION.md, PAGES.md (planning & architecture)
│
│   ── Config ──
├── netlify.toml            # Headers, caching, redirects, subdomain rewrites
├── sitemap.xml  robots.txt  site.webmanifest
└── README.md
```

**Where do I put a new thing?**

| I'm adding…                     | Put it in…                                                  |
| ------------------------------- | ----------------------------------------------------------- |
| A new top-level page            | `folder-name/index.html` (the folder becomes the URL)       |
| A shared style / script / image | `assets/styles/`, `assets/scripts/`, `assets/images/`       |
| A new subdomain venture         | `sites/<name>/` + a rewrite in `netlify.toml`               |
| A business card                 | `vc/<slug>.html` + the person in `assets/scripts/config.js` |
| A planning/architecture doc     | `docs/`                                                     |

---

## URL ↔ source mapping

Most URLs map straight to a folder. The exceptions are handled by `netlify.toml`:

| Public URL                         | Served from                     | Mechanism                            |
| ---------------------------------- | ------------------------------- | ------------------------------------ |
| `inteople.com/`                    | `index.html`                    | direct                               |
| `inteople.com/company/about/` etc. | `company/about/index.html` etc. | direct (folder = URL)                |
| `inteople.com/vc/alisohel`         | `vc/alisohel.html`              | pretty-URL redirect                  |
| `inteople.com/edu/`                | `sites/edu/`                    | rewrite `/edu/* → /sites/edu/:splat` |
| `edu.inteople.com`                 | `sites/edu/index.html`          | subdomain rewrite (inert until DNS)  |
| `brdb.inteople.com`                | `sites/brdb/index.html`         | subdomain rewrite (inert until DNS)  |
| `inteople.com/assets/*`            | `assets/`                       | direct + long-cache header           |
| `inteople.com/preview/`            | `preview/index.html`            | direct (noindex — staging)           |

---

## Shared design system

All reusable styling lives in **`assets/styles/`** and layers in one direction:

1. **`tokens.css`** — CSS custom properties: colours (navy `--brand` + coral `--accent`), fluid
   type scale, 4px spacing scale, radii, shadows, containers, motion. The single source of design truth.
2. **`base.css`** — reset, typography, buttons (`.btn` system), layout primitives (`.container`,
   `.section`), reveal-on-scroll, accessibility helpers.
3. **Page/section CSS** — `home.css` (site chrome: header, footer, hero), plus `about.css`,
   `services.css`, `products.css`, `work.css`, `insights.css`, `trust.css`.

**`assets/scripts/home.js`** powers shared behaviour on the v2 pages: sticky header, mobile nav,
reveal-on-scroll, animated counters, and the hero canvas. Every v2 page loads
`tokens.css → base.css → home.css` then its page-specific CSS, and `home.js` at the end.

Products theme by overriding only the `--accent` token slot (see `products.css` `.theme-*` classes).
Deeper rationale is in [`docs/FOUNDATION.md`](docs/FOUNDATION.md).

---

## Versioning convention (v1 → v2 → v3…)

The site is rebuilt in generations. The rule that keeps URLs stable and history clean:

- **The current generation lives at root** with real URLs (`/`, `/company/…`, `/services/…`).
- **The prior generation is archived** under `archive/v<n>/` — kept for reference, `Disallow`ed in
  `robots.txt`, never linked publicly.
- **The next generation is staged** under `preview/` (noindex) until signed off.

**Going live with a new version:**

1. Move the outgoing homepage + its version-only assets into `archive/v<n>/`.
2. Promote `preview/index.html` → root `index.html`.
3. Update any version-only references; keep all public URLs unchanged.
4. Add the new pages to `sitemap.xml`.

Today: **v1** = the live homepage at root (assets in `archive/v1/`). **v2** = the rebuilt inner
pages (already at root URLs) + the staged homepage in `preview/`, all on the shared `assets/`
design system.

---

## Subdomains

Each subdomain venture is a folder under `sites/` served by a rewrite in `netlify.toml`:

- `edu.inteople.com` → `sites/edu/` (also reachable at `inteople.com/edu/`).
- `brdb.inteople.com` → `sites/brdb/` (placeholder page).

Subdomain rewrites stay **inert** until the Netlify domain alias + DNS CNAME exist — adding the
rule early is harmless. To add another subdomain: create `sites/<name>/index.html`, then add a
`https://<name>.inteople.com/ → /sites/<name>/index.html` rewrite. Subdomain pages use the same
`/assets/` design system, so they stay on-brand for free.

---

## Editing links & contact details

Shared links, contact info, social handles and the people behind the business cards live in
**[`assets/scripts/config.js`](assets/scripts/config.js)** (`window.INTEOPLE`), consumed by the v1
homepage and the `vc/*` cards.

- On the v1 homepage, `main.js` fills any element with a `data-link="<path>"` attribute from the
  config (e.g. `data-link="contact.email"` sets a `mailto:` link).
- Each `vc/*.html` reads its person from `window.INTEOPLE.people["<slug>"]`.

> **SEO note:** homepage nav and product cards are real `<a href>` anchors so crawlers can follow
> them; `config.js` holds the canonical copies. If you change a URL, update both the config **and**
> the matching anchor.

---

## Contact form (Web3Forms)

The v1 homepage form emails inquiries via **[Web3Forms](https://web3forms.com)** — no backend.

1. Get a free **Access Key** at [web3forms.com](https://web3forms.com) for your inbox.
2. Paste it into [`assets/scripts/config.js`](assets/scripts/config.js):

   ```js
   forms: { web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY" },
   ```

The key is safe in client-side code (it only allows sending **to** your verified inbox). Submits
via `fetch()` with a honeypot; falls back to `mailto:` if the call fails or no key is set.

---

## Local preview

```bash
python3 -m http.server 8000   # from the repo root, then open http://localhost:8000
```

Serve from the **repo root** — absolute `/assets/...` paths only resolve correctly from there.
Netlify's rewrites (pretty `/vc/` URLs, `/edu/`) don't run under `http.server`, so test those on a
Netlify deploy/preview. Check: `/`, `/company/about/`, `/preview/`, `/sites/edu/index.html`,
`/vc/alisohel.html`.

---

## Assets & QR tooling

Prefer `.webp` for photos, and keep `width`/`height` on `<img>` (plus `loading="lazy"` below the fold):

```bash
cwebp -q 72 assets/images/products/source.jpg -o assets/images/products/source.webp
```

Regenerate virtual-card QR codes (logo-centred, print-ready) into `assets/images/qr/`:

```bash
python3 scripts/generate-qr.py all          # every card in vc/*.html
python3 scripts/generate-qr.py alisohel     # one card by slug
# requires: python3 -m pip install "qrcode[pil]"
```

---

## Deploy & staging

Push to the default branch → Netlify publishes automatically (`publish = "."`, no build command).
`netlify.toml` configures long-cache headers for `/assets/*`, security headers, pretty `/vc/` URLs,
the `/edu/` rewrite, and the (inert) subdomain rewrites.

**Staging:** `preview/` holds the next homepage with `noindex`. It's live at `/preview/` for review
but excluded from search and the sitemap until it's promoted to root (see _Versioning_ above).

---

## Docs

Planning and architecture references live in [`docs/`](docs/):

- [`docs/AUDIT.md`](docs/AUDIT.md) — architecture / product / UX review.
- [`docs/FOUNDATION.md`](docs/FOUNDATION.md) — the v2 rebuild blueprint and design-system rationale.
- [`docs/PAGES.md`](docs/PAGES.md) — per-page specs (purpose, audience, sections, CTA, SEO intent).
