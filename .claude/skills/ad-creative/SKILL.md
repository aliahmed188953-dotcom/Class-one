---
name: ad-creative
description: "Produce on-brand advertising creatives (static posters for Meta, Instagram, Google Display, WhatsApp) from the company's own photography. Use whenever the user asks for ads, ad creatives, campaign visuals, posters, social posts, story graphics, or A/B variants for Class One Services. Handles image selection, cropping, brand overlay, copywriting rules, multi-format export and QA."
---

# Ad Creative Production

Generates finished ad images from real company photography. Never generates or
alters vehicles with AI — the photographs are the proof, and altered badges or
invented number plates destroy credibility instantly.

## When to use

Any request for ads, campaign visuals, posters, social graphics, story assets,
or headline variants. Also for refreshing existing creatives with new copy.

## Workflow

1. **Read the brand reference.** `reference/brand.md` holds colours, fonts,
   layout rules, copy voice and the photo→campaign mapping. Never invent
   brand values.
2. **Confirm the photo library.** Images live in `photos/`. Verify each chosen
   file visually before use — filenames are scene labels, not guarantees.
   Reject any photo where a licence plate is readable or a third-party logo
   (vehicle outfitter, venue sponsor) is legible.
3. **Write or update a campaign spec** in `campaigns/<name>.json` (schema in
   `reference/brand.md`). One entry per creative.
4. **Render:** `python3 scripts/render_ads.py campaigns/<name>.json`
   Outputs every format into `ads/out/`.
5. **QA — mandatory.** Build a contact sheet and inspect it. Check each item:
   - Vehicle never covered by the text block; no head or Mercedes star cropped
   - Eyebrow line legible against its background (raise `dark` if not)
   - No bystanders as the visual subject
   - No readable plate, no third-party branding
   - Text inside the 8 % safe margin on all sides
   Re-crop and re-render anything that fails. Do not ship a failing frame.
6. **Report** the mapping of file → photo → headline before finishing.

## Hard rules

- Copy is **English**, sentence case, one idea per creative.
- Headline: two lines max, second line italic gold. Never more than 6 words a line.
- Subline: two lines max, benefit-led, concrete. No adjective stacking.
- CTA: 2–3 words, uppercase, imperative.
- Never state a claim the business cannot prove.
- Never name a client. Categories only ("touring artists", "royal delegations").
- Text must occupy under 20 % of the frame area.
- Never render body copy that includes a phone number or domain unless the
  values are present in `reference/brand.md` — placeholders must not ship.

## Formats

`feed` 1080×1350 (4:5, primary — Meta feed and WhatsApp forwarding),
`story` 1080×1920 (9:16), `display` 1200×628 (Google Display).
Default: feed + story. Render display only when asked.
