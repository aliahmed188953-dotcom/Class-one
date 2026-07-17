/**
 * Every image on the site lives in this one file.
 *
 * Two kinds of entries:
 *  - Remote Unsplash previews (kept from the prototype for the sedan fleet
 *    cards, hero and contact backgrounds) — plain URL + alt.
 *  - Local photography (Rotterdam production set, license plates blurred,
 *    masters in src/assets/photos/) — imported so Astro's asset pipeline
 *    emits AVIF/WebP + responsive sizes at build time.
 */
import vanDuskVenue from '../assets/photos/van-dusk-venue.jpg';
import cabinDoorDusk from '../assets/photos/cabin-door-dusk.jpg';
import convoyDusk from '../assets/photos/convoy-dusk.jpg';
import fleetLineup from '../assets/photos/fleet-lineup.jpg';
import vanLoadIn from '../assets/photos/van-load-in.jpg';
import coordinators from '../assets/photos/coordinators.jpg';

export interface RemoteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface LocalImage {
  image: ImageMetadata;
  alt: string;
}

export const images = {
  /** Hero background (decorative CSS background behind the dark gradient). */
  hero: {
    src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1800&q=70',
    alt: 'Black chauffeur-driven sedan at night',
    width: 1800,
    height: 1200,
  },

  /** Fleet cards — sedans stay Unsplash previews; the VIP Van is our own. */
  fleet: {
    business: {
      src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=70',
      alt: 'Business Class — Mercedes-Benz E-Class sedan',
      width: 1200,
      height: 750,
    },
    first: {
      src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=70',
      alt: 'First Class — Mercedes-Benz S-Class sedan',
      width: 1200,
      height: 750,
    },
    van: {
      image: vanDuskVenue,
      alt: 'Class One Mercedes-Benz V-Class vans at dusk outside the venue, sliding door open',
    },
    lounge: {
      src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=70',
      alt: 'VIP Lounge — Sprinter VIP cabin seating for crew and backline',
      width: 1200,
      height: 750,
    },
  },

  /** Experience quote band background — V-Class cabin glowing at dusk. */
  experience: {
    image: cabinDoorDusk,
    alt: 'Open V-Class door revealing the lit cream leather cabin at dusk',
  },

  /** Artists & Management section background (heavy scrim over it). */
  artists: {
    image: convoyDusk,
    alt: 'Chauffeur convoy of V-Class vans waiting at the venue at dusk',
  },

  /** Case-study strip — Rotterdam production, July 2026. */
  caseStudy: [
    {
      image: fleetLineup,
      alt: 'Three Mercedes-Benz V-Class vans with chauffeurs lined up outside the production studio',
    },
    {
      image: vanLoadIn,
      alt: 'Crew van at the load-in, rear doors side, before the show',
    },
    {
      image: coordinators,
      alt: 'Two Class One coordinators talking between runs',
    },
  ],

  /** Contact section background (decorative CSS background). */
  contact: {
    src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=70',
    alt: 'VIP van on the road at night',
    width: 1800,
    height: 1200,
  },
} as const;
