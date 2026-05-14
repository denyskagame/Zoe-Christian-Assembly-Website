/**
 * YouTube URL + thumbnail helpers used by the sermons library, homepage
 * SermonsSection, and (Feature 06) the live page. Kept dependency-free so it
 * can run on the server or in a client component without bundling overhead.
 */

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

const URL_PATTERNS: RegExp[] = [
  /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})/,
  /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com\/live\/)([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
];

/**
 * Extract an 11-character YouTube video ID from any common URL format, or
 * accept a bare ID as-is. Returns `null` when the input isn't a recognisable
 * YouTube reference.
 */
export function extractYouTubeId(input: string | null | undefined): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (ID_PATTERN.test(trimmed)) return trimmed;

  for (const pattern of URL_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export type ThumbnailQuality = "max" | "hq";

/**
 * Returns a YouTube thumbnail URL. `maxresdefault` is sharper but missing for
 * some older videos — callers that render the thumbnail in an `<img>` should
 * use `onError` to fall back to `hq` (`hqdefault.jpg`, always available).
 */
export function getYouTubeThumbnail(id: string, quality: ThumbnailQuality = "max"): string {
  const file = quality === "max" ? "maxresdefault.jpg" : "hqdefault.jpg";
  return `https://i.ytimg.com/vi/${id}/${file}`;
}

export interface YouTubeEmbedOptions {
  autoplay?: boolean;
}

/**
 * Assemble the YouTube `<iframe>` `src` URL. `autoplay: true` only works when
 * the iframe is mounted in response to a user gesture (browsers block
 * unsolicited autoplay), so it's the right flag to set when the facade has
 * just been clicked but the wrong default for an `immediate` mount.
 */
export function getYouTubeEmbedUrl(id: string, options: YouTubeEmbedOptions = {}): string {
  const params = new URLSearchParams();
  if (options.autoplay) params.set("autoplay", "1");
  const query = params.toString();
  return `https://www.youtube.com/embed/${id}${query ? `?${query}` : ""}`;
}
