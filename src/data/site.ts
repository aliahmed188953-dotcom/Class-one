/**
 * Single source of truth for company facts, contact data and site metadata.
 * Every value marked [TBD] is a placeholder carried over from the design
 * prototype — replace it here and it updates everywhere (header, booking
 * card, contact, footer, JSON-LD, legal pages).
 */
export const site = {
  name: 'Class One Services',
  motto: 'One number. Every journey.',

  // TODO [TBD]: real production domain — also update astro.config.mjs and public/robots.txt
  url: 'https://class-one.example',

  // TODO [TBD]: real phone number — display format + E.164 (used for tel: links)
  phoneDisplay: '+49 (0)000 000 000',
  phoneE164: '+49000000000',

  // TODO [TBD]: WhatsApp number — international digits, no "+" (prototype demo number kept)
  whatsapp: '49000000000',

  // TODO [TBD]: real booking email (prototype placeholder kept)
  email: 'booking@class-one.example',

  // TODO [TBD]: Formspree form ID (free account at formspree.io, e.g. 'mqkrzvbw').
  // While this is empty the booking form shows its inline error state and
  // points people to WhatsApp/phone instead — nothing is silently lost.
  formspreeId: '',

  serviceArea: 'Cologne & Europe-wide',
  city: 'Cologne',

  // TODO [TBD]: social profile URLs — used in the footer and JSON-LD sameAs.
  // Leave empty to keep the prototype's placeholder links.
  socials: {
    instagram: '', // e.g. 'https://www.instagram.com/classoneservices'
    linkedin: '', // e.g. 'https://www.linkedin.com/company/class-one-services'
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
