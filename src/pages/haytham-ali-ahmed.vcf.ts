import type { APIRoute } from 'astro';
import { site, phoneUnassigned } from '../data/site';

/**
 * Downloadable contact file for the digital business card.
 * vCard 3.0 — the most widely supported version across iOS, Android and
 * desktop address books.
 *
 * Phone is omitted while the number is unassigned: a contact card carrying a
 * placeholder number would be saved into people's address books and dialled.
 * It appears automatically once src/data/site.ts is filled in.
 */
const card = {
  firstName: 'Haytham Ali',
  lastName: 'Ahmed',
  title: 'General Manager',
};

/** vCard escaping: backslash, comma, semicolon and newline are special. */
const esc = (v: string) =>
  v.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');

export const GET: APIRoute = () => {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(card.lastName)};${esc(card.firstName)};;;`,
    `FN:${esc(`${card.firstName} ${card.lastName}`)}`,
    `ORG:${esc(site.name)}`,
    `TITLE:${esc(card.title)}`,
    `EMAIL;TYPE=INTERNET,WORK:${site.legalEmail}`,
    `URL:${site.url}`,
    ...(phoneUnassigned ? [] : [`TEL;TYPE=CELL,VOICE:${site.phoneE164}`]),
    `NOTE:${esc(site.motto)}`,
    'END:VCARD',
    '',
  ];

  return new Response(lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="haytham-ali-ahmed.vcf"',
    },
  });
};
