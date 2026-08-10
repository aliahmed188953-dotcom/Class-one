#!/usr/bin/env python3
"""Re-apply the advertising sanitisation pass to the photo library.

`photos/` is gitignored (rights-restricted originals), so the corrections
found during ad QA cannot be committed as pixels. This script records them
as coordinates instead: run it against a fresh copy of the library and the
sources become safe to advertise with again.

Each entry was found by inspecting the file at full resolution — the client's
own plate-blurring pass missed all of them.

Usage:  python3 scripts/sanitize_photos.py [--photos photos] [--check]
"""
import argparse
import os
import sys

from PIL import Image, ImageFilter

INK = (10, 10, 11)

# file -> list of (box, darken) regions.
# darken > 0 turns a blurred sign into a dark panel so it reads as blank
# signage rather than an obvious smudge.
FIXES = {
    "rotterdam/team-fleet-lineup.jpg": [
        ((0, 145, 352, 437), 0.62),        # "STREAM MY EVENT STUDIO" banner
        ((823, 315, 1132, 497), 0.62),     # "WIN TOGETHER / ...UNITED.COM" banner
        ((1268, 620, 1427, 677), 0.0),     # parked Audi plate, far right
        ((210, 866, 360, 940), 0.0),       # front-left van plate below existing patch
        ((983, 728, 1058, 768), 0.0),      # right van plate "HH XJ ...."
    ],
    "rotterdam/chauffeur-sunset.jpg": [
        ((266, 784, 414, 844), 0.0),       # "COBUS" shuttle branding
        ((0, 1272, 155, 1345), 0.0),       # front plate at frame edge
    ],
    "airport/airport-lineup.jpg": [
        ((138, 758, 202, 802), 0.0),       # partial plate digit, left row
    ],
}

# services/waldorf-pickup.jpg is not in the delivered library at all — it is
# built from the source frame (EXIF-rotated upright) with both van plates
# blurred. Kept here so the executive campaign stays reproducible.
WALDORF_PLATES = [(110, 5090, 375, 5215), (1700, 5110, 2290, 5320)]


def obscure(im, boxes):
    for box, darken in boxes:
        box = tuple(int(v) for v in box)
        region = im.crop(box)
        w, h = region.size
        if w < 2 or h < 2:
            continue
        pix = region.resize((max(2, w // 9), max(2, h // 9)), Image.BILINEAR)
        pix = pix.resize((w, h), Image.BILINEAR)
        pix = pix.filter(ImageFilter.GaussianBlur(max(4, w // 22)))
        if darken:
            pix = Image.blend(pix, Image.new("RGB", (w, h), INK), darken)
        im.paste(pix, box)
    return im


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--photos", default="photos")
    ap.add_argument("--check", action="store_true",
                    help="only report which files are present/missing")
    a = ap.parse_args()

    missing = []
    for rel in list(FIXES) + ["services/waldorf-pickup.jpg"]:
        if not os.path.exists(os.path.join(a.photos, rel)):
            missing.append(rel)
    if missing:
        print("MISSING from the library:")
        for m in missing:
            print("  -", m)
        if "services/waldorf-pickup.jpg" in missing:
            print("    (build it from the original portrait frame, then blur",
                  WALDORF_PLATES, ")")
    if a.check:
        return 0

    for rel, boxes in FIXES.items():
        path = os.path.join(a.photos, rel)
        if not os.path.exists(path):
            continue
        im = Image.open(path).convert("RGB")
        obscure(im, boxes)
        im.save(path, quality=92)
        print(f"sanitised {rel} ({len(boxes)} region(s))")
    return 0


if __name__ == "__main__":
    sys.exit(main())
