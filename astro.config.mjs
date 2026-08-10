// @ts-check
import { defineConfig } from 'astro/config';

// Production domain — keep in sync with src/data/site.ts and public/robots.txt.
export default defineConfig({
  site: 'https://class-one-services.com',
  // Fully static output (Astro default). One-pager now — sections are separate
  // components so they can become routes in phase 2.
  image: {
    // sharp pipeline + mild post-resize sharpen, q80 defaults, no upscaling
    service: { entrypoint: './src/lib/image-service.ts' },
  },
});
