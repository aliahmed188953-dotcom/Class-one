# Build brief: Class One Services — production website (v1)

## Your role
Act as a senior front-end engineer and brand guardian. Build a production-ready
one-page marketing site from the design prototype in this folder. Extend the
prototype — do not redesign it.

## Source of truth (already in this folder)
- `class-one-website.html` — approved design prototype: colors, fonts, logo,
  copy, sections, animations. This is the design system.
- `class-one-collateral.html` — brand reference (business card, posters).
  Use only for logo proportions.

## Fill-in facts
Use these values exactly. Where a value says [TBD], keep the prototype
placeholder and add a `<!-- TODO -->` comment — never invent data.

- Company name: Class One Services
- Domain: [TBD — e.g. classone-services.de]
- Phone (E.164): [TBD]
- WhatsApp number (international digits, no "+"): [TBD]
- Email: [TBD]
- Service area wording: Cologne & Europe-wide [adjust if told otherwise]
- Fleet at launch: [TBD — e.g. Mercedes S-Class, V-Class]
- Pricing display: quote-only, no prices shown [unless from-prices provided]
- Social profiles: [TBD]
- Impressum / legal data: [TBD — build the pages with clearly marked placeholders]
- Formspree form ID: [TBD — free account at formspree.io]

## Locked decisions
1. **One-pager now, expandable later.** Single index page with anchored
   sections, built component-based so sections can become routes in phase 2.
2. **English only** (`lang="en"`). Legal pages may be in German.
3. **Booking v1 = form + WhatsApp combined** (spec below).

## Stack
- Astro (latest), fully static output.
- Carry the prototype's vanilla CSS over into global design tokens +
  component-scoped styles. No Tailwind, no UI kit, no CSS framework.
- Client JS only for: mobile menu, journey progress line, reveal observer,
  booking form logic (port all from the prototype).
- Self-host the fonts (Cormorant Garamond 500/600 + italic 500; Jost
  300/400/500) as woff2, preloaded, `font-display: swap`. Remove the Google
  Fonts CDN link.

## Pages
1. `/` — sections in prototype order: Hero with booking card, Services (6),
   Fleet, Experience quote band, The Class One Standard, Artists & Management,
   FAQ, Contact, Footer.
2. `/impressum` and `/datenschutz` — minimal branded legal pages with TODO
   placeholders, linked from the footer.
3. Branded 404 page.

## Booking (form + WhatsApp)
- Fields: Service (the 6 options from the prototype), From, To, Date, Time,
  Name, Phone or email, Notes (optional).
- Primary submit → POST to Formspree using the form ID above. Inline success
  message: "Request received — we reply within the hour, day or night."
  Inline error state. No page reload.
- Secondary button "Send via WhatsApp instead" → wa.me deep link with the same
  data prefilled (logic exists in the prototype — port it).
- Sticky bottom bar on mobile (<940px) with Call + WhatsApp buttons; hide it
  while the booking card is in the viewport.
- Honeypot anti-spam field, client-side validation, and a GDPR consent
  checkbox linking to /datenschutz.

## SEO & metadata
- Title: "Class One Services — First-Class Chauffeur & Concierge, Cologne | 24/7".
- Meta description (~150 chars) built around the motto "One number. Every journey."
- Open Graph + Twitter card. Generate a static 1200×630 OG image based on the
  photographic poster layout in the collateral file.
- JSON-LD `LocalBusiness` schema: name, url, telephone, areaServed,
  24/7 openingHours, sameAs (socials).
- Favicon set from the ring-1 mark as SVG, plus PNG fallbacks and
  apple-touch-icon.
- robots.txt, sitemap.xml, canonical URL.

## Images
- Keep the current Unsplash URLs for now, but move every image URL + alt text
  into a single `src/data/images.ts` so swapping in real fleet photos later is
  a one-file edit.
- `loading="lazy"` below the fold, explicit width/height, meaningful alt text.

## Quality bar
- Lighthouse mobile ≥ 95 in all four categories; verify layout at 375px width.
- Preserve the prototype's `prefers-reduced-motion` behavior and visible
  keyboard focus styles.
- No cookies, no tracking, no consent banner needed. If analytics is requested
  later, use a cookieless option (e.g. Plausible) only.
- Semantic HTML; aria labels on nav, burger, and form controls.

## Working method
1. First output a short build plan (file/component structure) and wait for my OK.
2. Build, then run `npm run build` and fix every error and warning.
3. Give me the exact command to preview locally.
4. When I say "deploy": init git, create the Vercel project, deploy, give me
   the live URL and the exact steps to connect the domain.
- Never change design tokens, copy, or layout without asking first.
- Ask before adding any dependency.

## Phase 2 — do NOT build now, keep the architecture ready
German language version, service landing pages (e.g. /airport-transfer,
/artists-tours), city pages for SEO (e.g. /chauffeur-service-cologne),
price tables, blog.
