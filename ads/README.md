# Class One Services — launch ad set

18 creatives across 6 campaigns, rendered from our own photography with the
`ad-creative` skill (`.claude/skills/ad-creative/`).

Regenerate:

```bash
python3 .claude/skills/ad-creative/scripts/render_ads.py \
  .claude/skills/ad-creative/campaigns/launch.json --photos photos --out ads/out
python3 .claude/skills/ad-creative/scripts/render_ads.py \
  .claude/skills/ad-creative/campaigns/display.json --photos photos --out ads/out
```

**No creative carries a phone number, domain or any other contact line** —
those values are still unassigned (`reference/brand.md`). Add them only when
they exist; never ship placeholders.

---

## Creative index

| File | Campaign | Photo | Headline |
|---|---|---|---|
| `01_airport.jpg` / `_story` / `_display` | Airport transfer (A) | `airport/airport-lineup.jpg` | Your chauffeur / *is already there.* |
| `01_airport_b.jpg` / `_story` | Airport transfer (B) | same photo | Flight delayed? / *The price holds.* |
| `02_executive.jpg` / `_story` / `_display` | Executive chauffeur | `services/waldorf-pickup.jpg` | From the terminal / *to the lobby.* |
| `03_tours.jpg` / `_story` | Artists & tours (A) | `rotterdam/team-fleet-lineup.jpg` | 43 vehicles. / *One point of contact.* |
| `03_tours_b.jpg` / `_story` | Artists & tours (B) | same photo | Your tour manager / *keeps one number.* |
| `04_trust.jpg` / `_story` | Trust / credentials | `rotterdam/chauffeur-sunset.jpg` | For schedules that / *allow no mistakes.* |
| `05_cabin.jpg` / `_story` | V-Class cabin | `v-class/interior-lounge-04.jpg` | The journey / *is the destination.* |
| `06_group.jpg` / `_story` | Premium transporter | `transporter/sprinter-interior.jpg` | For the entire / *entourage.* |

### A/B pairs

| Pair | A — angle | B — angle |
|---|---|---|
| Airport | **Benefit-led**: reassurance on arrival | **Proof-led**: the delay/price mechanic, concrete |
| Tours | **Proof-led**: fleet size, single contact | **Benefit-led**: the tour manager's own workload |

Run A and B in the same ad set, same budget, same audience. Judge on
cost per qualified enquiry, not CTR.

---

## Formats & placement

| Format | Size | Where to run it |
|---|---|---|
| `feed` (no suffix) | 1080×1350 (4:5) | Meta & Instagram feed — primary. Also the file to forward on WhatsApp. |
| `_story` | 1080×1920 (9:16) | Instagram / Facebook Stories & Reels, WhatsApp Status. |
| `_display` | 1200×628 | Google Display Network, and any link-preview slot that wants landscape. |

Only airport and executive have display versions — they are the two
campaigns with search-adjacent intent worth buying on GDN.

**Recommended split:** airport + executive carry the acquisition budget
(feed + story + display). Tours and trust run as retargeting for anyone who
visited the site. Cabin and group are best as Stories — they show interiors,
which reward the full-height frame.

---

## Meta ad copy

Paste into Meta Ads Manager. Primary text is what appears above the image;
headline and description sit below it. No claim here goes beyond what the
business can evidence, and no client is named.

### 01 — Airport transfer (A)
- **Primary text:** Your flight lands, your chauffeur is already waiting. We track arrivals in real time, so a delay changes nothing about your pickup. Luggage handled, fixed price agreed before you travel.
- **Headline:** Your chauffeur is already there
- **Description:** Meet & greet at arrivals, 24/7
- **CTA button:** Get quote

### 01 — Airport transfer (B)
- **Primary text:** A delayed flight should not cost you more. We track your arrival, adjust the pickup, and hold the price we quoted. No meter running while you queue at passport control.
- **Headline:** Flight delayed? The price holds
- **Description:** Fixed price, waiting time included
- **CTA button:** Get quote

### 02 — Executive chauffeur
- **Primary text:** One chauffeur, one point of contact, one price — from the terminal to the lobby and on to the meeting. Book by the hour or as directed, anywhere in Europe.
- **Headline:** From the terminal to the lobby
- **Description:** By the hour or as directed
- **CTA button:** Book now

### 03 — Artists & tours (A)
- **Primary text:** Convoys, crew shuttles and backline in one plan. 43 vehicles and one coordinator who holds the whole itinerary — from load-in to after-show, on the minute.
- **Headline:** 43 vehicles. One point of contact
- **Description:** Tour and production logistics
- **CTA button:** Learn more

### 03 — Artists & tours (B)
- **Primary text:** Your tour manager already has enough numbers to call. Give them one: convoys, crew shuttles and backline planned together, with a single coordinator from load-in to after-show.
- **Headline:** Your tour manager keeps one number
- **Description:** One coordinator, whole itinerary
- **CTA button:** Learn more

### 04 — Trust / credentials
- **Primary text:** Some schedules leave no room for a missed connection. We plan the movement, confirm every leg in advance, and stay reachable around the clock. Discretion is standard; NDAs on request.
- **Headline:** For schedules that allow no mistakes
- **Description:** Discreet, 24/7, Europe-wide
- **CTA button:** Contact us

### 05 — V-Class cabin
- **Primary text:** Individual seats, starlight ceiling, Wi-Fi on board — room to work, rest or say nothing at all. Up to 7 guests in complete privacy.
- **Headline:** The journey is the destination
- **Description:** V-Class, up to 7 guests
- **CTA button:** Learn more

### 06 — Premium transporter
- **Primary text:** Crew, team or delegation — everyone travels together, at the same standard as the V-Class. Up to 19 guests with luggage, one vehicle, one schedule.
- **Headline:** For the entire entourage
- **Description:** Up to 19 guests, one vehicle
- **CTA button:** Check availability

---

## Photo QA log

Every source file was inspected at full resolution before rendering.
Four failed and were corrected in `photos/` (originals backed up):

| File | Finding | Fix |
|---|---|---|
| `rotterdam/team-fleet-lineup.jpg` | Two third-party banners legible ("STREAM MY EVENT STUDIO", "WIN TOGETHER / …UNITED.COM"); parked Audi plate readable; two van plates partly readable below the existing patch | Banners blurred and darkened to read as blank signage; all three plates blurred |
| `rotterdam/chauffeur-sunset.jpg` | "COBUS" airport-shuttle branding legible in background; front plate at frame edge | Both blurred |
| `airport/airport-lineup.jpg` | Partial plate digit on left-row van | Blurred |
| `services/waldorf-pickup.jpg` | Not present in `photos/` at all | Created from the source frame (EXIF-rotated upright), both van plates blurred |

Clean on first inspection: `v-class/interior-lounge-04.jpg`,
`transporter/sprinter-interior.jpg`.

### Open points for the owner

- **Hotel signage** is excluded by the executive precrop, but the location
  remains recognisable to anyone who knows it. Confirm that is acceptable.
- **Team members are identifiable** in the tours, executive and trust
  creatives — GDPR consent applies (per `photos/PHOTOS.md`).
- **"43 vehicles"** is used as a proof point in `03_tours`. It must be
  accurate at the time of running, or the claim should be softened.
