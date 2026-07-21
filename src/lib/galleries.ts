/**
 * Builds the optimized lightbox galleries once, keyed by trigger name
 * (fleet vehicle keys + "airport"). Called from index.astro and passed to
 * a single page-level <Lightbox>. Images are capped at their source width
 * (never upscaled) and emitted as q80 WebP by the custom image service.
 */
import { getImage } from 'astro:assets';
import { images, type LocalImage } from '../data/images';

export interface GallerySlide {
  src: string;
  alt: string;
}

async function optimize(list: readonly LocalImage[]): Promise<GallerySlide[]> {
  return Promise.all(
    list.map(async (g) => {
      const img = await getImage({
        src: g.image,
        width: Math.min(1600, g.image.width),
        format: 'webp',
        quality: 80,
      });
      return { src: img.src, alt: g.alt };
    })
  );
}

export async function buildGalleries(): Promise<Record<string, GallerySlide[]>> {
  const out: Record<string, GallerySlide[]> = {};
  for (const [key, vehicle] of Object.entries(images.fleet)) {
    out[key] = await optimize(vehicle.gallery);
  }
  out.airport = await optimize(images.airport.gallery);
  return out;
}
