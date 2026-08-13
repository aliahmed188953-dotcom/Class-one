/**
 * Single source of truth for company facts, contact data and site metadata.
 * Values still marked as pending are called out inline — replace them here
 * and they update everywhere (header, booking card, contact, footer, JSON-LD, legal
 * pages). Never ship a placeholder as if it were real.
 */
export const site = {
  name: 'Class One Services',
  motto: 'One number. Every journey.',

  /** Confirmed production domain. */
  url: 'https://class-one-services.com',

  /** Confirmed. Display format, plus E.164 for tel: links. */
  phoneDisplay: '+49 172 4196949',
  phoneE164: '+491724196949',

  /** Same number on WhatsApp — international digits, no "+". */
  whatsapp: '491724196949',

  /** Public booking address — site, footer and form replies. */
  email: 'booking@class-one-services.com',

  /**
   * Personal address for the Impressum's "Kontakt" block only (§ 5 DDG
   * requires a named responsible person). Deliberately not used anywhere
   * else on the site, so it stays off scraper-friendly surfaces.
   */
  legalEmail: 'haythamali.ahmed@class-one-services.com',

  /** Confirmed Formspree form — receives the booking form POSTs. */
  formspreeId: 'xaewbwdq',

  serviceArea: 'Cologne — Europe-wide',
  city: 'Cologne',

  /** Quote only — no prices are shown anywhere on the site. */
  pricing: 'quote-only',

  // TODO [TBD]: social profile URLs — used in the footer and JSON-LD sameAs.
  // Leave empty and the footer keeps neutral placeholder links.
  socials: {
    instagram: '', // e.g. 'https://www.instagram.com/classoneservices'
    linkedin: '', // e.g. 'https://www.linkedin.com/company/class-one-services'
  },

  /**
   * Registered company data — drives the Impressum, the Datenschutz
   * "Verantwortlicher" block and the JSON-LD postal address.
   * Note the registered office is Bonn while the service is marketed as
   * Cologne-based; areaServed stays Cologne + Europe.
   */
  legal: {
    company: 'Class One Services GmbH',
    street: 'Maarstr. 25',
    postalCode: '53227',
    city: 'Bonn',
    countryCode: 'DE',
    register: 'HRB 29768',
    registerCourt: 'Amtsgericht Bonn',
    managingDirectors: ['Dalya Salih', 'Ehsan Bshara'],
    // TODO [TBD]: VAT ID still to be supplied. While this is empty the
    // Impressum states "wird nachgereicht" rather than showing a blank or an
    // invented number — honest and complete until the real ID arrives.
    vatId: '',
  },

  title: 'Class One Services — First-Class Chauffeur & Concierge, Cologne | 24/7',
  description:
    'One number. Every journey. First-class chauffeur & concierge for artists, executives and discerning clients — 24/7, Cologne-based, Europe-wide.',
} as const;

/** wa.me deep link base for the WhatsApp CTAs. */
export const waLink = `https://wa.me/${site.whatsapp}`;

/** Formspree endpoint — empty string until the form ID is filled in above. */
export const formspreeEndpoint = site.formspreeId
  ? `https://formspree.io/f/${site.formspreeId}`
  : '';

/**
 * True while the phone/WhatsApp numbers are still placeholders. Components use
 * this to avoid presenting an unusable number as if it were dialable.
 */
export const phoneUnassigned = site.phoneE164 === '+49000000000';
