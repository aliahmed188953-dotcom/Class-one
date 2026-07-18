/**
 * Every image on the site lives in this one file — all of it our own
 * photography now (v2 library, per photos/SELECTS.md; no stock imagery).
 * Masters live in src/assets/photos/<shoot>/ with license plates blurred;
 * Astro's asset pipeline emits AVIF/WebP + responsive sizes at build time.
 *
 * The artist in the Rotterdam production set is deliberately never named,
 * in copy or alt text.
 */
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
import sClassFront from '../assets/photos/villa/s-class-front.jpg';
import gClass01 from '../assets/photos/villa/g-class-01.jpg';
import gClassCarport from '../assets/photos/villa/g-class-carport.jpg';
import vClassDuoFront from '../assets/photos/villa/v-class-duo-front.jpg';
import loungeCard from '../assets/photos/transporter/interior-lounge-02.jpg';
import lounge03 from '../assets/photos/transporter/interior-lounge-03.jpg';
import loungeRed from '../assets/photos/transporter/interior-lounge-05-red.jpg';
import studioFront from '../assets/photos/transporter/studio-front.jpg';
import studioSide from '../assets/photos/transporter/studio-side.jpg';
import cockpit from '../assets/photos/transporter/cockpit.jpg';
import grilleDetail from '../assets/photos/transporter/grille-detail.jpg';

export interface LocalImage {
  image: ImageMetadata;
  alt: string;
  /** CSS object-position implementing the focal-point notes in SELECTS.md. */
  focal?: string;
}

export interface FleetVehicle {
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
      card: {
        image: vclassFront,
        alt: 'Mercedes-Benz V-Class, grille and star with your chauffeur alongside',
        focal: 'center 42%',
      },
      gallery: [
        { image: vclass01, alt: 'Three V-Class vans lined up outside the production studio' },
        { image: vclass02, alt: 'V-Class vans staged rear-on at the venue entrance' },
        { image: fleetSunset01, alt: 'V-Class convoy at the venue at sunset' },
        { image: chauffeurDoor01, alt: 'Chauffeur presenting the open V-Class door and cream leather cabin' },
        { image: heroSunset, alt: 'Chauffeur at the open V-Class door at golden hour' },
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
      card: {
        image: loungeCard,
        alt: 'Premium transporter lounge — quilted leather seating under a starlight ceiling',
        focal: 'center 55%',
      },
      gallery: [
        { image: studioFront, alt: 'Premium transporter, studio front view' },
        { image: studioSide, alt: 'Premium transporter, studio side profile' },
        { image: lounge03, alt: 'Lounge seating with starlight ceiling, facing rear' },
        { image: loungeRed, alt: 'Lounge interior in red ambient lighting' },
        { image: cockpit, alt: 'Cockpit with burl wood trim and cognac leather' },
        { image: grilleDetail, alt: 'Chrome grille detail with Mercedes star' },
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
  } satisfies Record<string, FleetVehicle>,

  /** Experience quote band — starlight lounge in red ambient light, heavy scrim. */
  experience: {
    image: loungeRed,
    alt: 'Starlight-ceiling lounge interior in red ambient light',
    focal: 'center 40%',
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
