#!/usr/bin/env python3
"""Render Class One ad creatives from a campaign spec.

Usage:  python3 scripts/render_ads.py campaigns/<name>.json [--photos photos] [--out ads/out]
Then:   python3 scripts/render_ads.py --contact-sheet ads/out
"""
import argparse
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

GOLD = (198, 161, 91)
IVORY = (242, 237, 227)
STONE = (200, 192, 176)
INK = (10, 10, 11)

FORMATS = {
    "feed": (1080, 1350),
    "story": (1080, 1920),
    "display": (1200, 628),
}

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTDIR = os.path.join(HERE, "assets", "fonts")


def font(name, size, weight):
    f = ImageFont.truetype(os.path.join(FONTDIR, name), size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def cover(im, w, h, focal=0.5, hfocal=0.5):
    ar_t, ar_s = w / h, im.width / im.height
    if ar_s > ar_t:
        nw = int(im.height * ar_t)
        x = max(0, min(im.width - nw, int((im.width - nw) * hfocal)))
        im = im.crop((x, 0, x + nw, im.height))
    else:
        nh = int(im.width / ar_t)
        y = max(0, min(im.height - nh, int((im.height - nh) * focal)))
        im = im.crop((0, y, im.width, y + nh))
    return im.resize((w, h), Image.LANCZOS)


def gradient(w, h, stops):
    g = Image.new("L", (1, h))
    px = g.load()
    for y in range(h):
        p = y / max(1, h - 1)
        val = stops[-1][1]
        for i in range(len(stops) - 1):
            p0, a0 = stops[i]
            p1, a1 = stops[i + 1]
            if p0 <= p <= p1:
                t = (p - p0) / (p1 - p0) if p1 > p0 else 0
                val = int(a0 + (a1 - a0) * t)
                break
        px[0, y] = val
    return g.resize((w, h))


def numero(d, x, y, size, color=GOLD):
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
    d.text((x1, y), "1", font=fN, fill=color, anchor="ls")
    return x1 + d.textlength("1", font=fN)


def tracked(d, x, y, text, f, fill, track):
    cx = x
    for ch in text:
        d.text((cx, y), ch, font=f, fill=fill, anchor="ls")
        cx += d.textlength(ch, font=f) + track
    return cx - track


def tw(d, text, f, track):
    return sum(d.textlength(c, font=f) for c in text) + track * max(0, len(text) - 1)


def render(ad, fmt, photos, outdir):
    W, H = FORMATS[fmt]
    s = W / 1080.0                       # scale factor from the 1080 reference
    # Wide, short formats (display 1200x628) cannot carry the 4:5 vertical
    # rhythm: the bottom block would overrun the header. Compress the block
    # and drop the header wordmark, which the headline would otherwise cross.
    wide = H < W
    if wide:
        s *= 0.62

    im = Image.open(os.path.join(photos, ad["src"])).convert("RGB")
    pc = ad.get("precrop")
    if pc:
        im = im.crop((int(pc[0] * im.width), int(pc[1] * im.height),
                      int(pc[2] * im.width), int(pc[3] * im.height)))
    im = cover(im, W, H, ad.get("focal", 0.5), ad.get("hfocal", 0.5))

    if ad.get("dark"):
        im = Image.blend(im, Image.new("RGB", (W, H), INK), ad["dark"])

    im = Image.composite(Image.new("RGB", (W, H), INK), im,
                         gradient(W, H, [(0, 150), (0.28, 20), (1, 0)]))
    im = Image.composite(Image.new("RGB", (W, H), INK), im,
                         gradient(W, H, [(0, 0), (0.28, 12), (0.55, 145), (1, 243)]))

    d = ImageDraw.Draw(im)
    M = int(84 * s)

    if not wide:
        endx = numero(d, M, int(128 * s), int(60 * s))
        tracked(d, endx + 26 * s, int(126 * s), "CLASS ONE",
                font("Cormorant.ttf", int(34 * s), 600), IVORY, 7 * s)

    y = H - int(96 * s)

    cta = ad["cta"]
    fc = font("Jost.ttf", int(25 * s), 500)
    bw = tw(d, cta, fc, 4.2 * s) + 76 * s
    bh = 76 * s
    d.rectangle([M, y - bh, M + bw, y], fill=GOLD)
    tracked(d, M + 38 * s, y - bh / 2 + 9 * s, cta, fc, INK, 4.2 * s)
    y -= bh + 46 * s

    fs = font("Jost.ttf", int(30 * s), 300)
    for line in reversed(ad["subline"]):
        d.text((M, y), line, font=fs, fill=STONE, anchor="ls")
        y -= 44 * s
    y -= 22 * s

    for line, italic in reversed(ad["headline"]):
        fh = font("CormorantItalic.ttf" if italic else "Cormorant.ttf",
                  int(86 * s), 500 if italic else 600)
        d.text((M, y), line, font=fh, fill=GOLD if italic else IVORY, anchor="ls")
        y -= 96 * s
    y -= 16 * s

    fe = font("Jost.ttf", int(22 * s), 500)
    ew = tw(d, ad["eyebrow"], fe, 8 * s)
    tracked(d, M, y, ad["eyebrow"], fe, GOLD, 8 * s)
    d.line([(M, y + 22 * s), (M + ew, y + 22 * s)], fill=GOLD, width=max(2, int(2 * s)))

    if wide:
        # Mark sits bottom-right on wide formats, clear of the copy block.
        ms = int(52 * s)
        mx = W - int(84 * s) - int(150 * s)
        numero(d, mx, H - int(52 * s), ms)

    os.makedirs(outdir, exist_ok=True)
    name = f"{ad['out']}_{fmt}.jpg" if fmt != "feed" else f"{ad['out']}.jpg"
    path = os.path.join(outdir, name)
    im.save(path, quality=94, subsampling=0)
    return path


def contact_sheet(outdir, tag=""):
    files = sorted(f for f in os.listdir(outdir)
                   if f.endswith(".jpg") and (tag in f if tag else True))
    if not files:
        print("no files")
        return
    cols, tw_, th_, pad, lbl = 3, 340, 560, 8, 20
    rows = (len(files) + cols - 1) // cols
    sh = Image.new("RGB", (cols * (tw_ + pad) + pad, rows * (th_ + lbl + pad) + pad), (14, 14, 16))
    dr = ImageDraw.Draw(sh)
    for i, f in enumerate(files):
        im = Image.open(os.path.join(outdir, f)).convert("RGB")
        im.thumbnail((tw_, th_))
        r, c = divmod(i, cols)
        sh.paste(im, (pad + c * (tw_ + pad), pad + r * (th_ + lbl + pad)))
        dr.text((pad + c * (tw_ + pad), pad + r * (th_ + lbl + pad) + im.height + 3),
                f, fill=GOLD)
    p = os.path.join(outdir, "_contact_sheet.jpg")
    sh.save(p, quality=88)
    print("contact sheet:", p)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec", nargs="?")
    ap.add_argument("--photos", default="photos")
    ap.add_argument("--out", default="ads/out")
    ap.add_argument("--contact-sheet", dest="cs")
    ap.add_argument("--tag", default="")
    a = ap.parse_args()

    if a.cs:
        contact_sheet(a.cs, a.tag)
        return
    if not a.spec:
        ap.error("spec required")

    spec = json.load(open(a.spec))
    formats = spec.get("formats", ["feed", "story"])
    for ad in spec["ads"]:
        for fmt in formats:
            print("rendered", render(ad, fmt, a.photos, a.out))
    contact_sheet(a.out)


if __name__ == "__main__":
    sys.exit(main())
