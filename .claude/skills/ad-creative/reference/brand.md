# Class One Services — brand reference for advertising

## Identity

Wordmark: **CLASS ONE** · descriptor **Services**
Mark: **N°1** — capital N, raised underlined lowercase o, numeral 1, in Cormorant Garamond 600.
Motto: *One number. Every journey.*
Positioning: discreet luxury. Restraint is the signal. Never shout, never stack adjectives.

## Colours

| Token | Hex | Use |
|---|---|---|
| ink | `#0A0A0B` | backgrounds, scrims |
| gold | `#C6A15B` | mark, eyebrow, italic headline line, CTA fill |
| ivory | `#F2EDE3` | primary headline, wordmark |
| stone | `#C8C0B0` | sublines on photography |

Gold is champagne, never yellow. It carries roughly 10 % of the surface.

## Type

- Display: **Cormorant Garamond** — headline (600 roman / 500 italic), wordmark 600, the N°1 mark
- Body: **Jost** — eyebrow 500 tracked, subline 300, CTA 500 tracked

Fonts are in `assets/fonts/`. If missing, fetch from the Google Fonts GitHub repo
(`raw.githubusercontent.com/google/fonts/main/ofl/...`) — both are variable fonts;
set weight via `set_variation_by_axes`.

## Layout (all formats)

- Margin: 84 px at 1080 width, scaled proportionally
- Header: N°1 + CLASS ONE, top left
- Bottom block bottom-up: CTA button → subline → headline → eyebrow with gold rule
- Top scrim: ink 150→0 alpha over the first 28 %
- Bottom scrim: 0 → 243 alpha, ramping from 28 %
- Vehicles must stay clear of the bottom block. Crop so the subject sits in the
  upper two thirds.

## Copy voice

Lead with the client's benefit, not the company's features.
Good: "Your chauffeur is already there." Bad: "Premium luxury transportation solutions."
Proof beats adjectives: "Whole convoys. One point of contact." outperforms "Large fleet."

Never put a fleet count in copy. The figure moves with the season and with
vehicles on hire, so any specific number is a claim that cannot be stood
behind. Convey scale through what is operated ("whole convoys", "crew
shuttles and backline in one plan"), not through a total.

Approved credential line (categories only, no names):
"Trusted with touring artists, royal delegations and senior political figures."

## Photo → campaign mapping

| Campaign | Photo | Crop note |
|---|---|---|
| Airport transfer | `airport/airport-lineup.jpg` | focal 0.42 |
| Executive chauffeur | `services/waldorf-pickup.jpg` | precrop `[0,0.705,1,1]`, hfocal 0.25 — vans + chauffeur only, exclude passers-by |
| Artists & tours | `rotterdam/team-fleet-lineup.jpg` | hfocal 0.42, dark 0.05 |
| Trust / credentials | `rotterdam/chauffeur-sunset.jpg` | precrop `[0,0.30,1,1]` to cut sky |
| V-Class cabin | `v-class/interior-lounge-04.jpg` | dark 0.10 (clean ceiling, no outfitter sign) |
| Premium transporter | `transporter/sprinter-interior.jpg` | focal 0.42, dark 0.08 |

Do **not** use for advertising: `villa/*` (client premises identifiable),
any frame showing the artist (needs written management approval),
`v-class/interior-lounge-02/03/05` (outfitter branding patched — patch is visible up close).

## Campaign spec schema

```json
{
  "formats": ["feed", "story"],
  "ads": [
    {
      "src": "airport/airport-lineup.jpg",
      "out": "01_airport",
      "eyebrow": "AIRPORT TRANSFER",
      "headline": [["Your chauffeur", false], ["is already there.", true]],
      "subline": ["Live flight tracking. Meet & greet at arrivals.",
                  "Luggage handled. Fixed price, no meter."],
      "cta": "GET A QUOTE",
      "focal": 0.42,
      "hfocal": 0.5,
      "precrop": null,
      "dark": 0.0
    }
  ]
}
```

`headline` is a list of `[text, italic]` pairs — italic lines render gold.
`focal` 0..1 vertical anchor, `hfocal` 0..1 horizontal anchor,
`precrop` `[left, top, right, bottom]` as fractions applied before cropping,
`dark` 0..1 global darkening for legibility.

## Contact values

Phone, mobile, email and domain are **not yet assigned**. Until they exist,
creatives carry no contact line. Do not ship placeholder digits.
