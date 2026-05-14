import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/youtube";

interface VideoJsonLdProps {
  name: string;
  description?: string;
  youtubeUrl: string;
  uploadDate: string;
  durationIso8601?: string;
}

/**
 * Emits a schema.org `VideoObject` JSON-LD blob so Google indexes the sermon
 * as a video (rich result with thumbnail + duration in search). Skips
 * rendering when the YouTube URL can't be parsed — no point emitting JSON-LD
 * pointing at a broken video.
 */
export function VideoJsonLd({
  name,
  description,
  youtubeUrl,
  uploadDate,
  durationIso8601,
}: VideoJsonLdProps) {
  const id = extractYouTubeId(youtubeUrl);
  if (!id) return null;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description: description?.trim() || name,
    thumbnailUrl: [getYouTubeThumbnail(id, "max"), getYouTubeThumbnail(id, "hq")],
    uploadDate,
    embedUrl: getYouTubeEmbedUrl(id),
    contentUrl: youtubeUrl,
  };
  if (durationIso8601) jsonLd.duration = durationIso8601;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/<\//g, "<\\/"),
      }}
    />
  );
}

/**
 * Best-effort parser for the freeform `duration` field on sermons
 * (e.g., "45 min", "1 hr 20 min"). Returns an ISO 8601 duration like "PT1H20M"
 * if recognisable, otherwise `undefined` so the JSON-LD just omits the field.
 */
export function parseDurationToIso8601(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const lower = input.toLowerCase();
  const hourMatch = lower.match(/(\d+)\s*(?:h|hr|hour)/);
  const minMatch = lower.match(/(\d+)\s*(?:m|min|minute)/);
  const hours = hourMatch ? Number.parseInt(hourMatch[1]!, 10) : 0;
  const mins = minMatch ? Number.parseInt(minMatch[1]!, 10) : 0;
  if (hours === 0 && mins === 0) return undefined;
  return `PT${hours > 0 ? `${hours}H` : ""}${mins > 0 ? `${mins}M` : ""}`;
}
