#!/usr/bin/env python3
"""
Generate Inteople virtual-card QR codes with the logo centered.

Matches the house style of assets/img/qr-sohel.png:
  - black modules on a white background
  - the Inteople "in" logo centered on a rounded white panel
  - high error correction (H) so the centered logo never breaks scannability

The URL each QR encodes is derived from the card's page, following the site
convention:  vc/<slug>.html  ->  https://inteople.com/vc/<slug>.html
The output file follows the matching convention:  assets/img/qr-<slug>.png

USAGE
  # regenerate every card found in vc/*.html
  python3 scripts/generate-qr.py all

  # regenerate one card (slug = the vc/<slug>.html filename)
  python3 scripts/generate-qr.py propel
  python3 scripts/generate-qr.py alisohel

  # arbitrary URL -> arbitrary output (one-off codes)
  python3 scripts/generate-qr.py --url https://inteople.com --out assets/img/qr-site.png

Requires:  pip install "qrcode[pil]"  (qrcode + Pillow)
"""

import argparse
import glob
import os
import sys

try:
    import qrcode
    from qrcode.constants import ERROR_CORRECT_H
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit('Missing deps. Run:  python3 -m pip install "qrcode[pil]"')

# ---------------------------------------------------------------------------
# Paths & site convention
# ---------------------------------------------------------------------------
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VC_DIR = os.path.join(REPO_ROOT, "vc")
IMG_DIR = os.path.join(REPO_ROOT, "assets", "img")
LOGO_PATH = os.path.join(IMG_DIR, "logo-256.png")
BASE_URL = "https://inteople.com/vc"

# ---------------------------------------------------------------------------
# Design constants (tuned to match qr-sohel.png)
# ---------------------------------------------------------------------------
BOX_SIZE = 28          # px per QR module -> high-resolution, print-ready output
BORDER = 2             # quiet-zone modules (QR spec minimum is 4; 2 is fine here
                       # because the white panel/quiet zone is preserved visually)
LOGO_RATIO = 0.20      # logo width as a fraction of the QR width (~20%)
PANEL_PAD_RATIO = 0.18 # white padding around the logo, as a fraction of logo size
PANEL_RADIUS_RATIO = 0.22  # corner radius of the white panel, as a fraction of panel


def url_for(slug):
    """Canonical card URL for a page slug (vc/<slug>.html)."""
    return f"{BASE_URL}/{slug}.html"


def out_for(slug):
    """Canonical QR output path for a page slug."""
    return os.path.join(IMG_DIR, f"qr-{slug}.png")


def make_qr(url, out_path):
    """Render a logo-centered QR for `url` and save it to `out_path`."""
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=BOX_SIZE, border=BORDER)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
    w, h = img.size

    # Center logo on a rounded white panel.
    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo_size = int(w * LOGO_RATIO)
    logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

    pad = int(logo_size * PANEL_PAD_RATIO)
    panel = logo_size + pad * 2
    radius = int(panel * PANEL_RADIUS_RATIO)

    panel_img = Image.new("RGBA", (panel, panel), (0, 0, 0, 0))
    draw = ImageDraw.Draw(panel_img)
    draw.rounded_rectangle([0, 0, panel - 1, panel - 1], radius=radius, fill=(255, 255, 255, 255))
    panel_img.paste(logo, (pad, pad), logo)

    px = (w - panel) // 2
    py = (h - panel) // 2
    img.alpha_composite(panel_img, (px, py))

    img.convert("RGB").save(out_path, "PNG")
    print(f"  {os.path.relpath(out_path, REPO_ROOT)}  ({w}x{h})  ->  {url}")


def discover_slugs():
    """Every vc/<slug>.html that is an actual card page."""
    slugs = []
    for path in sorted(glob.glob(os.path.join(VC_DIR, "*.html"))):
        slug = os.path.splitext(os.path.basename(path))[0]
        slugs.append(slug)
    return slugs


def main():
    ap = argparse.ArgumentParser(description="Generate Inteople card QR codes.")
    ap.add_argument("target", nargs="?",
                    help='"all", or a card slug (vc/<slug>.html).')
    ap.add_argument("--url", help="Encode an arbitrary URL instead of a card.")
    ap.add_argument("--out", help="Output path (required with --url).")
    args = ap.parse_args()

    if not os.path.exists(LOGO_PATH):
        sys.exit(f"Logo not found: {LOGO_PATH}")

    # One-off: arbitrary URL -> arbitrary output.
    if args.url:
        if not args.out:
            sys.exit("--url requires --out")
        print("Generating QR:")
        make_qr(args.url, args.out)
        return

    if not args.target:
        ap.print_help()
        sys.exit(1)

    if args.target == "all":
        slugs = discover_slugs()
        print(f"Generating QR codes for {len(slugs)} card(s):")
        for slug in slugs:
            make_qr(url_for(slug), out_for(slug))
        return

    # Single card slug.
    slug = args.target
    html = os.path.join(VC_DIR, f"{slug}.html")
    if not os.path.exists(html):
        sys.exit(f"No card page: {os.path.relpath(html, REPO_ROOT)}")
    print("Generating QR:")
    make_qr(url_for(slug), out_for(slug))


if __name__ == "__main__":
    main()
