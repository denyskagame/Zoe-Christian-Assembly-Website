"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/youtube";

interface YouTubeEmbedProps {
  /** Full URL (any common format) or bare 11-char ID. */
  url?: string | null;
  /** Alternatively, pass the ID directly. Takes precedence over `url`. */
  id?: string | null;
  /** Accessible title used for the iframe and play-button aria-label. */
  title: string;
  /** Skip the click-to-load facade — render the iframe immediately. Default `false`. */
  immediate?: boolean;
  /** Extra class names for the outer aspect-ratio wrapper. */
  className?: string;
}

/**
 * Reusable YouTube embed with two modes:
 *
 * - **Facade (default).** Renders a thumbnail with a play button until the
 *   user clicks; then swaps in the iframe with `autoplay=1`. Saves ~500 KB
 *   of YouTube player JS per embed on initial page load — important for the
 *   `/sermons` archive where 12+ embeds can ship simultaneously.
 *
 * - **`immediate`.** Renders the iframe directly on mount, no facade. Used by
 *   Feature 06's live page where visitors expect instant playback. Autoplay
 *   is not set in this mode because browsers block unsolicited autoplay.
 *
 * Graceful fallback: if neither `url` nor `id` resolves to a valid 11-char
 * YouTube ID, renders a "Video unavailable" placeholder so the admin sees a
 * clear signal to fix the URL in Sanity.
 */
export function YouTubeEmbed({ url, id, title, immediate = false, className }: YouTubeEmbedProps) {
  const videoId = id ?? extractYouTubeId(url);
  const [activated, setActivated] = useState(immediate);
  const [thumbFailed, setThumbFailed] = useState(false);

  const wrapperClass = ["relative h-full w-full overflow-hidden", className]
    .filter(Boolean)
    .join(" ");

  if (!videoId) {
    return (
      <div
        className={`${wrapperClass} bg-zoe-navy/10 text-zoe-navy/70 flex items-center justify-center`}
        role="img"
        aria-label="Video unavailable"
      >
        <span className="text-sm font-semibold">Video unavailable</span>
      </div>
    );
  }

  if (activated) {
    return (
      <iframe
        className={`${wrapperClass} border-0`}
        src={getYouTubeEmbedUrl(videoId, { autoplay: !immediate })}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  const thumbnailUrl = getYouTubeThumbnail(videoId, thumbFailed ? "hq" : "max");

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Play ${title}`}
      className={`${wrapperClass} group cursor-pointer bg-black`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        onError={() => {
          // maxresdefault is missing for many older sermons — fall back to
          // hqdefault, which is always available.
          if (!thumbFailed) setThumbFailed(true);
        }}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/50">
        <span className="bg-zoe-bronze flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-transform group-hover:scale-110">
          <Play className="ml-1 h-8 w-8 fill-white text-white" />
        </span>
      </span>
    </button>
  );
}
