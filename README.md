# Inteople — Marketing Site

The marketing website for **Inteople** (inteople.com) — a product engineering studio building
AI, SaaS, mobile and IoT software for healthtech, fintech, agrotech and edutech.

It is a **static site**: plain HTML, CSS and vanilla JavaScript with **no build step**. Push to
the default branch and Netlify deploys it automatically.

## Project structure

```
.
├── index.html              # Single-page homepage (hero, services, products, contact…)
├── assets/
│   ├── css/main.css        # All homepage styles (design tokens at the top)
│   ├── js/
│   │   ├── config.js       # ⭐ Single source of truth for links/contact/people
│   │   ├── main.js         # Homepage interactions + contact-form submit
│   │   └── vendor/
│   │       └── qrcode.min.js
│   └── img/                # Images (prefer .webp — see "Optimizing images")
├── vc/                     # Digital business cards (one HTML page per person)
│   ├── alisohel.html  propel.html  ahsan.html  nasim.html
│   ├── vc.css              # Shared business-card styles
│   └── vc.js               # Builds the vCard + QR code from window.PERSON
├── netlify.toml            # Headers, caching, pretty-URL redirects
├── sitemap.xml  robots.txt  site.webmanifest
└── README.md
```

## Editing links & contact details

**All links, contact info, social handles, product URLs and the people behind the business
cards live in one file: [`assets/js/config.js`](assets/js/config.js)** (`window.INTEOPLE`).

- `main.js` injects the JS-driven values into the page at runtime. Any element with a
  `data-link="<path>"` attribute is filled from the config — e.g.
  `data-link="social.linkedin"` sets that anchor's `href`, `data-link="contact.email"` sets a
  `mailto:` link.
- Each `vc/*.html` page reads its person from `window.INTEOPLE.people["<slug>"]`, so a card's
  name/role/email/LinkedIn is edited in `config.js`, not in the HTML.

> **SEO note:** the homepage navigation and product cards are kept as real `<a href>` anchors
> in `index.html` so search engines can crawl them. `config.js` holds the canonical copies and
> documents this — if you change a product or social URL, update both the config **and** its
> matching anchor in `index.html` (search the file for the old URL).

## Contact form (Netlify Forms)

The contact form on the homepage uses **[Netlify Forms](https://docs.netlify.com/forms/setup/)** —
no backend or API keys required.

- The `<form>` is marked with `name="contact"` + `data-netlify="true"` and includes a hidden
  `form-name` field and a honeypot (`bot-field`) for spam protection.
- `main.js` submits it via `fetch()` (AJAX, no page reload). On success the visitor sees a
  confirmation; if the request fails (e.g. local preview, which has no Netlify backend) it
  gracefully falls back to opening the visitor's email app.

**To receive submissions by email:** in the Netlify dashboard go to
**Site settings → Forms → Form notifications → Add notification → Email notification** and add
the address that should receive inquiries. Submissions are also stored under **Forms** in the
dashboard.

> Netlify Forms only works on the **deployed** Netlify site — form submissions cannot be tested
> from a local `file://` or `python -m http.server` preview (they hit the mailto fallback).

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Everything except live form submission works locally (layout, links, business cards, QR codes).

## Optimizing images

Prefer `.webp` for photos. To convert/optimize at native resolution:

```bash
cwebp -q 72 assets/img/source.jpg -o assets/img/source.webp
```

Keep `width`/`height` attributes on `<img>` tags to avoid layout shift, and use
`loading="lazy"` for below-the-fold images.

## Deploy

Push to the default branch → Netlify builds and publishes automatically (`publish = "."`, no
build command). `netlify.toml` configures long-cache headers for `/assets/*`, security headers,
and pretty URLs for business cards (`/vc/alisohel` → `/vc/alisohel.html`).
