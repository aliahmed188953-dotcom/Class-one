/**
 * Local image service: Astro's sharp pipeline plus a mild unsharp pass
 * applied AFTER resize (quality bar from the photo brief), q80 defaults,
 * and a hard guarantee that sources are never upscaled.
 */
import type { LocalImageService } from 'astro';
import { baseService } from 'astro/assets';
import sharp from 'sharp';

const FORMAT_DEFAULT_QUALITY: Record<string, number> = {
  avif: 80,
  webp: 80,
  jpeg: 80,
  jpg: 80,
  png: 90,
};

const service: LocalImageService = {
  ...baseService,

  async transform(inputBuffer, transformOptions) {
    const { width, height, format, quality } = transformOptions as {
      width?: number;
      height?: number;
      format: string;
      quality?: string | number | null;
    };

    if (format === 'svg') {
      return { data: inputBuffer, format: 'svg' as const };
    }

    let pipeline = sharp(inputBuffer, {
      failOn: 'error',
      pages: -1,
      limitInputPixels: false,
    }).rotate(); // respect EXIF orientation

    if (width || height) {
      pipeline = pipeline.resize({
        width: width ? Math.round(width) : undefined,
        height: height ? Math.round(height) : undefined,
        withoutEnlargement: true, // never upscale beyond the source
      });
      // Mild unsharp after resize — sigma ~0.5 keeps it subtle.
      pipeline = pipeline.sharpen({ sigma: 0.5 });
    }

    const fmt = format === 'jpg' ? 'jpeg' : format;
    const q =
      typeof quality === 'number'
        ? quality
        : quality && !Number.isNaN(Number(quality))
          ? Number(quality)
          : (FORMAT_DEFAULT_QUALITY[fmt] ?? 80);

    pipeline = pipeline.toFormat(fmt as keyof sharp.FormatEnum, { quality: q });

    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
    return {
      data,
      format: info.format as never,
    };
  },
};

export default service;
