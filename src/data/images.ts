/**
 * Every image on the site lives in this one file — all of it our own
 * photography (v3 library, per photos/SELECTS.md; no stock imagery).
 * Masters live in src/assets/photos/<shoot>/ with license plates blurred;
 * Astro's asset pipeline emits AVIF/WebP + responsive sizes at build time.
 *
 * The artist in the Rotterdam production set is deliberately never named,
 * in copy or alt text.
 */
// Rotterdam production
import heroSunset from '../assets/photos/rotterdam/chauffeur-sunset.jpg';
import vclassFront from '../assets/photos/rotterdam/venue-vclass-front.jpg';
import vclass01 from '../assets/photos/rotterdam/venue-vclass-01.jpg';
import vclass02 from '../assets/photos/rotterdam/venue-vclass-02.jpg';
import fleetSunset01 from '../assets/photos/rotterdam/fleet-sunset-01.jpg';
import fleetSunset02 from '../assets/photos/rotterdam/fleet-sunset-02.jpg';
import fleetSunset03 from '../assets/photos/rotterdam/fleet-sunset-03.jpg';
import chauffeurDoor01 from '../assets/photos/rotterdam/chauffeur-door-01.jpg';
import artistGroup01 from '../assets/photos/rotterdam/artist-group-01.jpg';
import teamFleetLineup from '../assets/photos/rotterdam/team-fleet-lineup.jpg';
import venueLineup02 from '../assets/photos/rotterdam/venue-lineup-02.jpg';
import teamVan01 from '../assets/photos/rotterdam/team-van-01.jpg';
// Villa assignment
import sClassFront from '../assets/photos/villa/s-class-front.jpg';
import gClass01 from '../assets/photos/villa/g-class-01.jpg';
import gClassCarport from '../assets/photos/villa/g-class-carport.jpg';
import vClassDuoFront from '../assets/photos/villa/v-class-duo-front.jpg';
// V-Class studio + interiors
import vcStudioFront from '../assets/photos/v-class/studio-front.jpg';
import vcStudioSide from '../assets/photos/v-class/studio-side.jpg';
import vcGrille from '../assets/photos/v-class/grille-detail.jpg';
import vcLounge01 from '../assets/photos/v-class/interior-lounge-01.jpg';
import vcLounge02 from '../assets/photos/v-class/interior-lounge-02.jpg';
import vcLounge03 from '../assets/photos/v-class/interior-lounge-03.jpg';
import vcLounge04 from '../assets/photos/v-class/interior-lounge-04.jpg';
import vcLounge05 from '../assets/photos/v-class/interior-lounge-05-red.jpg';
import vcLounge06 from '../assets/photos/v-class/interior-lounge-06.jpg';
import vcCabinFront from '../assets/photos/v-class/cabin-front.jpg';
import vcCockpit from '../assets/photos/v-class/cockpit.jpg';
import vcConsole from '../assets/photos/v-class/console-detail.jpg';
// Premium Transporter (Sprinter)
import sprinterExterior from '../assets/photos/transporter/sprinter-exterior.jpg';
import sprinterInterior from '../assets/photos/transporter/sprinter-interior.jpg';
// Airport
import airportLineup from '../assets/photos/airport/airport-lineup.jpg';
import airportLot from '../assets/photos/airport/airport-lot.jpg';

export interface LocalImage {
  image: ImageMetadata;
  alt: string;
  /** CSS object-position implementing the focal-point notes in SELECTS.md. */
  focal?: string;
}

export interface Gallery {
  card: LocalImage;
  gallery: LocalImage[];
}

export const images = {
  /** Hero — golden hour, chauffeur + V-Class (focal: car nose, chauffeur in frame). */
  hero: {
    image: heroSunset,
    alt: 'Chauffeur at the open V-Class door at golden hour outside the venue',
    focal: 'center 74%',
  } satisfies LocalImage,

  /** Fleet cards + per-vehicle lightbox galleries. */
  fleet: {
    vclass: {
      // Showroom shot leads, per client (SELECTS v3).
      card: {
        image: vcStudioFront,
        alt: 'Mercedes-Benz V-Class, showroom front view with Maybach grille',
        focal: 'center 50%',
      },
      gallery: [
        { image: vcStudioFront, alt: 'V-Class showroom front view with Maybach grille' },
        { image: vcStudioSide, alt: 'V-Class showroom side profile' },
        { image: vcGrille, alt: 'V-Class grille and star, detail' },
        { image: vcLounge01, alt: 'V-Class lounge cabin — cognac quilted seats' },
        { image: vcLounge02, alt: 'V-Class lounge cabin, facing rear' },
        { image: vcLounge03, alt: 'V-Class lounge seating with starlight ceiling' },
        { image: vcLounge04, alt: 'V-Class lounge cabin under the starlight ceiling' },
        { image: vcLounge05, alt: 'V-Class lounge interior in red ambient light' },
        { image: vcLounge06, alt: 'V-Class lounge cabin detail' },
        { image: vcCabinFront, alt: 'V-Class cabin looking forward to the cockpit' },
        { image: vcCockpit, alt: 'V-Class cockpit with burl wood trim' },
        { image: vcConsole, alt: 'V-Class console detail' },
        { image: vclassFront, alt: 'V-Class with chauffeur outside the venue at the production' },
        { image: vclass01, alt: 'Three V-Class vans lined up outside the production studio' },
        { image: vclass02, alt: 'V-Class vans staged rear-on at the venue entrance' },
      ],
    },
    sclass: {
      card: {
        image: sClassFront,
        alt: 'Mercedes-Benz S-Class, front view with star and headlights',
        focal: 'center 46%',
      },
      gallery: [
        { image: sClassFront, alt: 'Mercedes-Benz S-Class, front view with star and headlights' },
      ],
    },
    transporter: {
      // Premium Transporter (Sprinter) — exterior cover, interior in the gallery.
      card: {
        image: sprinterExterior,
        alt: 'Premium transporter — black Mercedes-Benz Sprinter outside a glass hotel',
        focal: 'center 60%',
      },
      gallery: [
        { image: sprinterInterior, alt: 'Premium transporter interior — lounge seating' },
      ],
    },
    gclass: {
      card: {
        image: gClass01,
        alt: 'Mercedes-Benz G-Class SUV at a private villa, front three-quarter view',
        focal: '60% 32%',
      },
      gallery: [
        { image: gClass01, alt: 'Mercedes-Benz G-Class SUV at a private villa' },
        { image: gClassCarport, alt: 'G-Class under the villa carport' },
        { image: vClassDuoFront, alt: 'G-Class and V-Class duo on the villa forecourt' },
      ],
    },
  } satisfies Record<string, Gallery>,

  /** Airport Meet & Greet service card — image header + lightbox. */
  airport: {
    card: {
      image: airportLineup,
      alt: 'Class One V-Class fleet lined up for airport pickups',
      focal: 'center 42%',
    },
    gallery: [
      { image: airportLineup, alt: 'Class One V-Class fleet lined up for airport pickups' },
      { image: airportLot, alt: 'Chauffeur assisting a guest with luggage beside the V-Class fleet on the apron' },
    ],
  } satisfies Gallery,

  /** Experience quote band — clean starlight-ceiling lounge, heavy scrim. */
  experience: {
    image: vcLounge04,
    alt: 'V-Class lounge cabin under the starlight ceiling',
    focal: 'center 42%',
  } satisfies LocalImage,

  /** Artists & Management background — sunset fleet, heavy scrim. */
  artists: {
    image: fleetSunset02,
    alt: 'Chauffeurs and V-Class fleet at the venue at sunset',
    focal: 'center 62%',
  } satisfies LocalImage,

  /** Case-study strip (Rotterdam production) — featured shot first. */
  caseStudy: [
    {
      image: artistGroup01,
      alt: 'VIP arrival — guests with their chauffeur-driven V-Class in the venue car park',
      featured: true,
    },
    { image: teamFleetLineup, alt: 'Three V-Class vans and chauffeurs outside the production studio', featured: false },
    { image: chauffeurDoor01, alt: 'Chauffeur presenting the open V-Class door, cream leather cabin', featured: false },
    { image: fleetSunset01, alt: 'V-Class convoy at the venue at sunset', featured: false },
    { image: venueLineup02, alt: 'Chauffeurs waiting with the vans at dusk', featured: false },
    { image: teamVan01, alt: 'Vans staged at the venue entrance before load-in', featured: false },
  ],

  /** Contact section background — sunset fleet, darkened. */
  contact: {
    image: fleetSunset03,
    alt: 'V-Class fleet at dusk outside the venue',
    focal: 'center 68%',
  } satisfies LocalImage,
} as const;
