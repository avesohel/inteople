# Inteople — Marketing Site

The marketing website for **Inteople** (inteople.com) — a product engineering studio building
AI, SaaS, mobile and IoT software for healthtech, fintech, agrotech and edutech.

It is a **static site**: plain HTML, CSS and vanilla JavaScript with **no build step**. Push to
the default branch and Netlify deploys it automatically.

## Project structure

```
.
├── index.html              # Single-page homepage (hero, services, products, contact…)
├── src/
│   ├── styles/main.css     # All homepage styles (design tokens at the top)
│   ├── scripts/
│   │   ├── config.js       # ⭐ Single source of truth for links/contact/people
│   │   ├── main.js         # Homepage interactions + contact-form submit
│   │   └── vendor/
│   │       └── qrcode.min.js
│   └── images/             # Images (prefer .webp — see "Optimizing images")
│       ├── brand/          # logo-mark, logo-256, og-image
│       ├── icons/          # favicons, PWA + apple-touch icons
│       ├── products/       # product/portfolio screenshots
│       ├── team/           # leadership photos
│       └── qr/             # virtual-card QR codes
├── vc/                     # Digital business cards (one HTML page per person)
│   ├── alisohel.html  propel.html  ahsan.html  nasim.html
│   ├── vc.css              # Shared business-card styles
│   └── vc.js               # Builds the vCard + QR code from window.PERSON
├── scripts/                # Maintenance tooling (QR generator)
├── netlify.toml            # Headers, caching, pretty-URL redirects
├── sitemap.xml  robots.txt  site.webmanifest
└── README.md
```

## Editing links & contact details

**All links, contact info, social handles, product URLs and the people behind the business
cards live in one file: [`src/scripts/config.js`](src/scripts/config.js)** (`window.INTEOPLE`).

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

## Contact form (Web3Forms)

The contact form on the homepage emails inquiries via **[Web3Forms](https://web3forms.com)** —
no backend or build step, works on any host.

**To start receiving emails (one-time, ~1 minute):**

1. Go to [web3forms.com](https://web3forms.com), enter the inbox that should receive inquiries,
   and you'll be emailed a free **Access Key** (a UUID) instantly.
2. Open [`src/scripts/config.js`](src/scripts/config.js) and replace the placeholder:

   ```js
   forms: {
     web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",  // ← paste your key here
   },
   ```

That's it — every submission now lands in your inbox. The key is safe to expose in client-side
code (it only allows sending **to** your verified inbox).

**How it behaves:**

- `main.js` submits via `fetch()` (AJAX, no page reload). On success the visitor sees a
  confirmation and the form resets.
- A hidden `botcheck` honeypot field filters spam.
- If the network call fails **or** no key is configured yet, it gracefully falls back to opening
  the visitor's email app (`mailto:`) so no inquiry is ever lost. The `<form action>` also points
  at Web3Forms as a no-JavaScript fallback.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Everything works locally, including live form submission once a real Web3Forms key is set
(Web3Forms accepts cross-origin requests, so it works from `localhost` too).

## Optimizing images

Prefer `.webp` for photos. To convert/optimize at native resolution:

```bash
cwebp -q 72 src/images/products/source.jpg -o src/images/products/source.webp
```

Keep `width`/`height` attributes on `<img>` tags to avoid layout shift, and use
`loading="lazy"` for below-the-fold images.

## Deploy

Push to the default branch → Netlify builds and publishes automatically (`publish = "."`, no
build command). `netlify.toml` configures long-cache headers for `/src/*`, security headers,
and pretty URLs for business cards (`/vc/alisohel` → `/vc/alisohel.html`).
