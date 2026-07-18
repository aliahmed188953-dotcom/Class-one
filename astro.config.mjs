// @ts-check
import { defineConfig } from 'astro/config';

// TODO [TBD]: set the real production domain (e.g. https://classone-services.de).
// Also update: src/data/site.ts and public/robots.txt.
export default defineConfig({
  site: 'https://class-one.example',
  // Fully static output (Astro default). One-pager now — sections are separate
  // components so they can become routes in phase 2.
  image: {
    // sharp pipeline + mild post-resize sharpen, q80 defaults, no upscaling
    service: { entrypoint: './src/lib/image-service.ts' },
  },
});
