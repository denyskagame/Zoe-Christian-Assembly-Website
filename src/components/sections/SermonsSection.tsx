"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { homepageSermonsQuery, type SanitySermon } from "@/sanity/lib/queries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SanitySiteSettings } from "@/sanity/types";

const FALLBACK_HEADING = "Sermons & Podcasts";
const FALLBACK_SUBHEADING = "Watch our latest sermons and listen to inspiring podcasts";
const FALLBACK_CHANNEL_URL = "https://www.youtube.com/@ZoeChristianAssembly";

interface SermonsSectionProps {
  settings: SanitySiteSettings | null;
}

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * YouTube facade: renders a thumbnail until clicked, then swaps in the iframe.
 * Saves ~1.5MB of JS on initial homepage load when there are 3 sermons.
 */
function YouTubeFacade({ url, title }: { url: string; title: string }) {
  const [activated, setActivated] = useState(false);
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return <div className="bg-zoe-navy/10 flex h-full w-full items-center justify-center" />;
  }

  if (activated) {
    return (
      <iframe
        className="h-full w-full"
        src={getYouTubeEmbedUrl(videoId)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Play ${title}`}
      className="group relative h-full w-full cursor-pointer overflow-hidden bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getYouTubeThumbnailUrl(videoId)}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/50">
        <div className="bg-zoe-bronze flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-transform group-hover:scale-110">
          <Play className="ml-1 h-8 w-8 fill-white text-white" />
        </div>
      </div>
    </button>
  );
}

export function SermonsSection({ settings }: SermonsSectionProps) {
  const [sermons, setSermons] = useState<SanitySermon[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const heading = settings?.sermonsHeading?.trim() || FALLBACK_HEADING;
  const subheading = settings?.sermonsSubheading?.trim() || FALLBACK_SUBHEADING;
  const channelUrl = settings?.youtubeChannelUrl?.trim() || FALLBACK_CHANNEL_URL;

  useEffect(() => {
    async function fetchSermons() {
      try {
        const data = await client.fetch<SanitySermon[]>(homepageSermonsQuery);
        setSermons(data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSermons();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      sermon: "Sermon",
      podcast: "Podcast",
      teaching: "Teaching",
      testimony: "Testimony",
    };
    return labels[type] || "Sermon";
  };

  return (
    <section ref={sectionRef} className="bg-zoe-gray relative overflow-hidden px-6 pt-20 pb-20">
      {/* Top wavy separator */}
      <div className="pointer-events-none absolute top-8 right-0 left-0 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="bg-zoe-navy/20 h-px w-16"></div>
          <svg className="text-zoe-bronze/50 h-4 w-8" viewBox="0 0 32 16">
            <path d="M0,8 Q8,0 16,8 T32,8" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="bg-zoe-navy/20 h-px w-16"></div>
        </div>
      </div>

      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-zoe-bronze/5 absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-zoe-navy/5 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-zoe-bronze/5 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-zoe-navy mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-gray-600">{subheading}</p>
        </div>

        {/* Sermons Grid */}
        {loading ? (
          <div
            className={`grid gap-8 transition-all delay-200 duration-700 ease-out md:grid-cols-2 lg:grid-cols-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-lg bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]"
              >
                <div className="aspect-video bg-gray-300"></div>
                <div className="p-6">
                  <div className="mb-3 h-4 w-20 rounded bg-gray-300"></div>
                  <div className="mb-2 h-6 w-full rounded bg-gray-300"></div>
                  <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
                  <div className="h-3 w-40 rounded bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sermons.length > 0 ? (
          <div
            className={`grid gap-8 transition-all delay-200 duration-700 ease-out md:grid-cols-2 lg:grid-cols-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {sermons.map((sermon) => (
              <div
                key={sermon._id}
                className="group relative overflow-hidden rounded-lg bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]"
              >
                {/* Video facade — iframe loads only on click */}
                <div className="aspect-video overflow-hidden">
                  <YouTubeFacade url={sermon.youtubeUrl} title={sermon.title} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex gap-2">
                    <span className="bg-zoe-bronze inline-block rounded-full px-3 py-1 text-xs text-white">
                      {getTypeLabel(sermon.type)}
                    </span>
                    {sermon.isPopular && (
                      <span className="bg-zoe-navy inline-block rounded-full px-3 py-1 text-xs text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-zoe-navy group-hover:text-zoe-bronze mb-2 line-clamp-2 text-lg font-bold transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">{sermon.preacher}</p>
                  <p className="text-xs text-gray-500">
                    {sermon.duration && `${sermon.duration} • `}
                    {formatDate(sermon.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">No sermons available yet.</p>
            <p className="mt-2 text-sm text-gray-500">Check back soon for new content!</p>
          </div>
        )}

        {/* View All Button */}
        <div
          className={`mt-12 text-center transition-all delay-400 duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zoe-bronze text-zoe-gray hover:bg-zoe-navy inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold tracking-wide uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            View All Sermons
          </a>
        </div>
      </div>
    </section>
  );
}
