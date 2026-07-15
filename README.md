# Class One Services — Website Repository

Starter repository for the Class One production website.
Motto: **One number. Every journey.**

## Contents

| File | Purpose |
|---|---|
| `class-one-website.html` | Approved design prototype — the design source of truth |
| `class-one-collateral.html` | Brand collateral (business card, posters) — logo reference |
| `class-one-build-prompt.md` | The engineering brief that Claude Code executes |

## Before you build — fill in the facts

Open `class-one-build-prompt.md` and replace every `[TBD]` in the
"Fill-in facts" block:

- [ ] Domain
- [ ] Phone (E.164) and WhatsApp number
- [ ] Email
- [ ] Fleet at launch
- [ ] Social profiles
- [ ] Impressum / legal data
- [ ] Formspree form ID — free account at [formspree.io](https://formspree.io), takes 2 minutes

Anything left as `[TBD]` stays a clean placeholder in the build — nothing
gets invented.

## Build

Open Claude Code in this folder and run:

> **Read class-one-build-prompt.md and execute it.**

It will propose a build plan first — approve it, then iterate conversationally
("make the hero headline bigger", "swap the fleet photos", …).

## Deploy

When you're happy, tell Claude Code: **"deploy"**. Per the brief it will set up
Git, create the Vercel project, deploy, and hand you the live URL plus the
steps to connect your domain.

## Phase 2 (planned, not built yet)

German language version · service landing pages · city SEO pages
(e.g. /chauffeur-service-cologne) · price tables · blog.
