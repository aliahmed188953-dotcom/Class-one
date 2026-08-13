/**
 * The six service cards and the six booking-form options.
 * Order, titles and copy are locked by the approved design prototype.
 *
 * Per SELECTS v4 every card carries a 16:10 image header (icon + title over a
 * dark scrim). VIP is the exception — held icon-only until
 * services/waldorf-pickup.jpg arrives.
 */
import { images, type LocalImage } from './images';

export interface Service {
  title: string;
  text: string;
  /** Inner SVG markup for the 24×24 line icon (stroked in gold via CSS). */
  icon: string;
  /** Optional 16:10 header image (all cards except VIP, for now). */
  image?: LocalImage;
  /** Optional lightbox gallery key (only Airport has one — see buildGalleries). */
  galleryKey?: string;
}

export const services: Service[] = [
  {
    title: 'Airport Meet & Greet',
    text: 'Name-board welcome at arrivals, luggage handled, flight tracked live. Delays change nothing — your chauffeur is already there.',
    icon: '<path d="M2 16l20-6-9 5-2 6-2-4-7-1z"/>',
    image: images.airport.card,
    galleryKey: 'airport',
  },
  {
    title: 'VIP & Executive Chauffeur',
    text: 'By the hour or as directed. One car, one chauffeur, your schedule — for a meeting marathon or a single evening.',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    image: images.services.vip,
  },
  {
    title: 'Artists, Tours & Productions',
    text: 'Convoys, crew shuttles and equipment vans. Venue to hotel to after-show — rider and timing respected to the minute.',
    icon: '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/>',
    image: images.services.artists,
  },
  {
    title: 'Medical & Clinic Transfers',
    text: 'Travel to and from clinics, treatments and medical appointments, with help arranging the details. Not an emergency or ambulance service.',
    icon: '<path d="M12 4v16M4 12h16"/><circle cx="12" cy="12" r="9.5"/>',
    image: images.services.medical,
  },
  {
    title: 'Events & Roadshows',
    text: 'Multi-stop days, galas and premieres. We plan the movement so the day runs on rails.',
    icon: '<rect x="3.5" y="5" width="17" height="15.5"/><path d="M3.5 10h17M8 2.8V7M16 2.8V7"/>',
    image: images.services.events,
  },
  {
    title: 'Security & Discretion',
    text: 'Security services arranged through licensed partners. NDAs signed before the first mile, on request.',
    icon: '<path d="M12 3l7.5 3v5.5c0 4.6-3.1 8-7.5 9.5-4.4-1.5-7.5-4.9-7.5-9.5V6L12 3z"/>',
    image: images.services.security,
  },
];

/** Booking-form "Service" options — exactly the six from the prototype select. */
export const bookingOptions = [
  'Airport transfer',
  'Point to point',
  'By the hour / as directed',
  'Artist & tour logistics',
  'Medical transfer',
  'Event / roadshow',
] as const;
