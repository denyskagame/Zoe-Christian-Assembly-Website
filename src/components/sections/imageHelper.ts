import { urlFor } from "@/sanity/lib/sanity";
import type { SanityImageWithAlt } from "@/sanity/types";

/**
 * Resolve a Sanity image to a Next/Image-friendly URL, falling back to a
 * hardcoded URL (typically the current Cloudinary asset) when the field is
 * empty. Using a fallback keeps the homepage rendering before the pastor
 * uploads the assets to Sanity.
 */
export function resolveImage(
  image: SanityImageWithAlt | undefined,
  fallbackUrl: string,
  width?: number
): string {
  if (!image?.asset) return fallbackUrl;
  const builder = urlFor(image);
  return width ? builder.width(width).url() : builder.url();
}

export function resolveAlt(image: SanityImageWithAlt | undefined, fallbackAlt: string): string {
  return image?.alt?.trim() || fallbackAlt;
}
