# scripts/

Maintenance scripts for the Inteople site.

## generate-qr.py — virtual-card QR codes

Generates QR codes for the `/vc/` virtual business cards with the Inteople
logo centered, matching the house style of `src/images/qr/qr-sohel.png`
(black modules on white, blue "in" logo on a rounded white panel, high
error correction so the logo never breaks scannability).

### One-time setup

```bash
python3 -m pip install "qrcode[pil]"
```

### Usage

```bash
# regenerate the QR for every card in vc/*.html
python3 scripts/generate-qr.py all

# regenerate one card (slug = the vc/<slug>.html filename)
python3 scripts/generate-qr.py propel

# arbitrary URL -> arbitrary output (one-off codes)
python3 scripts/generate-qr.py --url https://inteople.com --out src/images/qr/qr-site.png
```

### Conventions

- URL encoded:  `vc/<slug>.html` → `https://inteople.com/vc/<slug>.html`
- Output file:  `src/images/qr/qr-<slug>.png`

After generating a **new** card's QR, point that person's `qr` field in
`src/scripts/config.js` at the generated file, e.g.:

```js
qr: "/src/images/qr/qr-<slug>.png",
```

`vc/vc.js` prefers this static image; if a card has no `qr` set, it falls
back to generating a (plain, logo-less) QR client-side at runtime.

### Tuning the look

Design constants live near the top of `generate-qr.py`
(`BOX_SIZE`, `LOGO_RATIO`, `PANEL_PAD_RATIO`, `PANEL_RADIUS_RATIO`).
Adjust there and re-run `all` to restyle every card consistently.
