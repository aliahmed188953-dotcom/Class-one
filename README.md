# Class One Services — Website Repository

Production website for Class One Services, built with Astro (fully static).
Motto: **One number. Every journey.**

## Contents

| Path | Purpose |
|---|---|
| `src/` | The website — pages, components, styles, data (see below) |
| `public/` | Static assets — self-hosted fonts, favicons (Nº1 numéro mark), OG image, robots.txt |
| `scripts/og-template.html` | Source for the 1200×630 Open Graph image |
| `class-one-website.html` | Approved design prototype — the design source of truth |
| `class-one-collateral.html` | Brand collateral (business card, posters) — logo reference |
| `class-one-build-prompt.md` | The engineering brief this build executes |

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Fill in the facts (before launch)

Every `[TBD]` from the brief lives as a clearly marked placeholder — nothing
was invented. One file drives them all: **`src/data/site.ts`**

- [ ] Domain (also in `astro.config.mjs` + `public/robots.txt`)
- [ ] Phone (E.164) and WhatsApp number
- [ ] Email
- [ ] Formspree form ID — free account at [formspree.io](https://formspree.io)
- [ ] Social profiles
- [ ] Fleet at launch — `src/components/Fleet.astro`
- [ ] Impressum / Datenschutz data — `src/pages/impressum.astro`, `src/pages/datenschutz.astro`
- [ ] Real fleet photography — swap URLs in `src/data/images.ts` (one-file edit)

Search the repo for `TODO [TBD]` to find every placeholder.

## Deploy

When you're happy, tell Claude Code: **"deploy"**. Per the brief it will
create the Vercel project, deploy, and hand you the live URL plus the steps
to connect your domain.

## Phase 2 (planned, not built yet)

German language version · service landing pages · city SEO pages
(e.g. /chauffeur-service-cologne) · price tables · blog.
The one-pager is component-based so sections can become routes without a
rebuild.
