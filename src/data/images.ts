/**
 * Every image on the site lives in this one file — swap in real fleet
 * photography later by editing only these entries.
 *
 * All photos are Unsplash previews for now (kept from the approved
 * prototype). `width`/`height` are layout hints for the 16:10 fleet
 * frames; the CSS `aspect-ratio` + `object-fit: cover` do the actual
 * cropping, so replacement photos of any size will render identically.
 */
export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const images = {
  /** Hero background (decorative CSS background behind the dark gradient). */
  hero: {
    src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1800&q=70',
    alt: 'Black chauffeur-driven sedan at night',
    width: 1800,
    height: 1200,
  },

  /** Fleet cards — rendered as real <img> elements (lazy, 16:10 frame). */
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
      src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=70',
      alt: 'VIP Van — Mercedes-Benz V-Class',
      width: 1200,
      height: 750,
    },
    lounge: {
      src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=70',
      alt: 'VIP Lounge — Sprinter VIP cabin seating for crew and backline',
      width: 1200,
      height: 750,
    },
  },

  /** Experience quote band background (decorative CSS background). */
  experience: {
    src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1800&q=70',
    alt: 'First-class cabin seating in warm light',
    width: 1800,
    height: 1200,
  },

  /** Contact section background (decorative CSS background). */
  contact: {
    src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=70',
    alt: 'VIP van on the road at night',
    width: 1800,
    height: 1200,
  },
} as const;
