#!/usr/bin/env python3
"""Render the Class One business card, front and back, print-ready.

Spec (from class-one-collateral.html): 85.6 x 54 mm trim + 3 mm bleed, 300 dpi.
Gold is intended as a spot colour or hot foil on the mark, the rule and the
badge — that foil is what makes the card feel expensive in the hand.

    python3 scripts/render_business_card.py [--out card]

Outputs <out>/class-one-card-front.png, -back.png and -preview.png.
Contact values come from src/data/site.ts; nothing is hard-coded here except
the cardholder. No phone is printed while the number is unassigned.
"""
import argparse
import os
import re

from PIL import Image, ImageDraw, ImageFont

GOLD = (198, 161, 91)
IVORY = (242, 237, 227)
STONE = (200, 192, 176)
INK = (10, 10, 11)
HAIRLINE = (35, 35, 39)

DPI = 300
MM = DPI / 25.4
TRIM_W, TRIM_H = 85.6, 54.0          # mm
BLEED = 3.0                          # mm on every edge

W = round((TRIM_W + 2 * BLEED) * MM)  # full canvas incl. bleed
H = round((TRIM_H + 2 * BLEED) * MM)
OX = round(BLEED * MM)                # trim origin inside the canvas
OY = round(BLEED * MM)
TW = round(TRIM_W * MM)
TH = round(TRIM_H * MM)

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTDIR = os.path.join(HERE, ".claude", "skills", "ad-creative", "assets", "fonts")

CARD = {"name": "Haytham Ali Ahmed", "role": "General Manager"}


def site_values():
    """Read the confirmed values out of src/data/site.ts (single source of truth)."""
    src = open(os.path.join(HERE, "src", "data", "site.ts"), encoding="utf-8").read()

    def field(key):
        m = re.search(rf"^\s*{key}:\s*'([^']*)'", src, re.M)
        return m.group(1) if m else ""

    # Phone stays off the card until it is real — same rule as the website.
    # Compare the parsed field, not the raw file: the placeholder literal also
    # appears in the phoneUnassigned comparison further down site.ts.
    unassigned = field("phoneE164") in ("", "+49000000000")

    return {
        "url": field("url"),
        "email": field("legalEmail"),
        "motto": field("motto"),
        "phone": "" if unassigned else field("phoneDisplay"),
    }


def font(name, size, weight):
    f = ImageFont.truetype(os.path.join(FONTDIR, name), size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def tracked(d, x, y, text, f, fill, track, anchor="ls"):
    """Draw letter-spaced text; returns the advance width."""
    cx = x
    for ch in text:
        d.text((cx, y), ch, font=f, fill=fill, anchor=anchor)
        cx += d.textlength(ch, font=f) + track
    return cx - track - x


def tracked_width(d, text, f, track):
    return sum(d.textlength(c, font=f) for c in text) + track * max(0, len(text) - 1)


# Cormorant defaults to oldstyle figures, where "1" reads as a small capital I.
# The mark needs a proper lining numeral, so ask for the lnum feature.
LNUM = ["lnum"]


def numero(d, x, y, size, color=GOLD):
    """N + raised underlined o + 1, on the baseline at y. Returns end x."""
    fN = font("Cormorant.ttf", size, 600)
    fo = font("Cormorant.ttf", int(size * 0.36), 600)
    d.text((x, y), "N", font=fN, fill=color, anchor="ls")
    ox = x + d.textlength("N", font=fN) + size * 0.03
    oy = y - size * 0.40
    d.text((ox, oy), "o", font=fo, fill=color, anchor="ls")
    wo = d.textlength("o", font=fo)
    d.line([(ox, oy + size * 0.045), (ox + wo, oy + size * 0.045)],
           fill=color, width=max(2, int(size * 0.035)))
    x1 = ox + wo + size * 0.05
    d.text((x1, y), "1", font=fN, fill=color, anchor="ls", features=LNUM)
    return x1 + d.textlength("1", font=fN, features=LNUM)


def numero_width(d, size):
    fN = font("Cormorant.ttf", size, 600)
    fo = font("Cormorant.ttf", int(size * 0.36), 600)
    return (d.textlength("N", font=fN) + size * 0.03 + d.textlength("o", font=fo)
            + size * 0.05 + d.textlength("1", font=fN, features=LNUM))


def base_canvas():
    """Ink card with a soft top glow, bled to the edges."""
    im = Image.new("RGB", (W, H), INK)
    glow = Image.new("L", (W, H), 0)
    gd = ImageDraw.Draw(glow)
    cx, cy = W / 2, H * 0.08
    rx, ry = W * 0.42, H * 0.42
    for i in range(60, 0, -1):
        t = i / 60
        gd.ellipse([cx - rx * t, cy - ry * t, cx + rx * t, cy + ry * t],
                   fill=int(26 * (1 - t)))
    return Image.composite(Image.new("RGB", (W, H), (26, 26, 29)), im, glow)


def render_front(out):
    im = base_canvas()
    d = ImageDraw.Draw(im)

    mark_size = int(TH * 0.30)
    mw = numero_width(d, mark_size)
    base_y = OY + TH * 0.46
    numero(d, OX + (TW - mw) / 2, base_y, mark_size)

    # Wordmark
    f_wm = font("Cormorant.ttf", int(TH * 0.105), 600)
    track = TH * 0.105 * 0.22
    ww = tracked_width(d, "CLASS ONE", f_wm, track)
    y_wm = base_y + TH * 0.175
    tracked(d, OX + (TW - ww) / 2 + track / 2, y_wm, "CLASS ONE", f_wm, IVORY, track)

    # Gold rule
    rw = TW * 0.11
    y_rule = y_wm + TH * 0.085
    d.rectangle([OX + (TW - rw) / 2, y_rule, OX + (TW + rw) / 2, y_rule + max(2, TH * 0.004)],
                fill=GOLD)

    # Descriptor
    f_sub = font("Jost.ttf", int(TH * 0.037), 400)
    strack = TH * 0.037 * 0.58
    sw = tracked_width(d, "SERVICES", f_sub, strack)
    tracked(d, OX + (TW - sw) / 2 + strack / 2, y_rule + TH * 0.105,
            "SERVICES", f_sub, STONE, strack)

    im.save(out, dpi=(DPI, DPI))
    return out


def render_back(out, v):
    im = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(im)

    m = OX + TW * 0.085                     # left content margin
    right = OX + TW - TW * 0.085

    # Gold tick on the trim edge, as on the printed reference
    d.rectangle([m, OY, m + TW * 0.12, OY + max(2, TH * 0.007)], fill=GOLD)

    # Name + role
    f_name = font("Cormorant.ttf", int(TH * 0.115), 600)
    d.text((m, OY + TH * 0.235), CARD["name"], font=f_name, fill=IVORY, anchor="ls")
    f_role = font("Jost.ttf", int(TH * 0.040), 500)
    rtrack = TH * 0.040 * 0.34
    tracked(d, m, OY + TH * 0.305, CARD["role"].upper(), f_role, STONE, rtrack)

    # Contact block — QR sits to the right, so keep the text column clear of it
    qr_side = TH * 0.335
    qr_x = right - qr_side
    qr_y = OY + TH * 0.42

    f_key = font("Jost.ttf", int(TH * 0.038), 500)
    f_val = font("Jost.ttf", int(TH * 0.050), 300)
    rows = [("E", v["email"]), ("W", v["url"].replace("https://", ""))]
    if v["phone"]:
        rows.insert(0, ("T", v["phone"]))

    y = OY + TH * 0.50
    for key, val in rows:
        tracked(d, m, y, key, f_key, GOLD, TH * 0.038 * 0.20)
        d.text((m + TW * 0.055, y), val, font=f_val, fill=IVORY, anchor="ls")
        y += TH * 0.088

    # QR to the digital card
    qr_path = os.path.join(HERE, "public", "card-qr.png")
    if os.path.exists(qr_path):
        qr = Image.open(qr_path).convert("RGB").resize(
            (int(qr_side), int(qr_side)), Image.NEAREST)
        im.paste(qr, (int(qr_x), int(qr_y)))

    # Footer: hairline, motto, 24/7 badge
    y_line = OY + TH - TH * 0.20
    d.line([(m, y_line), (right, y_line)], fill=HAIRLINE, width=max(1, int(TH * 0.003)))

    f_motto = font("CormorantItalic.ttf", int(TH * 0.062), 500)
    d.text((m, y_line + TH * 0.115), v["motto"], font=f_motto, fill=GOLD, anchor="ls")

    f_badge = font("Jost.ttf", int(TH * 0.036), 500)
    btrack = TH * 0.036 * 0.28
    bw = tracked_width(d, "24 / 7", f_badge, btrack)
    pad_x, pad_y = TH * 0.030, TH * 0.026
    bx1, by1 = right - bw - pad_x * 2, y_line + TH * 0.055
    bx2, by2 = right, by1 + TH * 0.036 + pad_y * 2
    d.rectangle([bx1, by1, bx2, by2], outline=GOLD, width=max(1, int(TH * 0.003)))
    tracked(d, bx1 + pad_x + btrack / 2, by2 - pad_y - TH * 0.008,
            "24 / 7", f_badge, GOLD, btrack)

    im.save(out, dpi=(DPI, DPI))
    return out


def preview(front, back, out):
    """Side-by-side preview at trim (bleed cropped), for screen review."""
    gap, pad = 40, 48
    ims = [Image.open(p).crop((OX, OY, OX + TW, OY + TH)) for p in (front, back)]
    sheet = Image.new("RGB", (pad * 2 + TW * 2 + gap, pad * 2 + TH), (18, 18, 20))
    sheet.paste(ims[0], (pad, pad))
    sheet.paste(ims[1], (pad + TW + gap, pad))
    sheet.thumbnail((1600, 1600), Image.LANCZOS)
    sheet.save(out, quality=94)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="card")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    v = site_values()

    f = render_front(os.path.join(a.out, "class-one-card-front.png"))
    b = render_back(os.path.join(a.out, "class-one-card-back.png"), v)
    p = preview(f, b, os.path.join(a.out, "class-one-card-preview.png"))
    for path in (f, b, p):
        print("wrote", path)
    print(f"canvas {W}x{H}px @ {DPI}dpi  (trim {TRIM_W}x{TRIM_H}mm + {BLEED}mm bleed)")
    if not v["phone"]:
        print("note: no phone printed — number still unassigned in src/data/site.ts")


if __name__ == "__main__":
    main()
