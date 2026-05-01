"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { homepageSermonsQuery, type SanitySermon } from "@/sanity/lib/queries";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // Handle different YouTube URL formats
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  return null;
}

// Helper function to get YouTube embed URL
function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export function SermonsSection() {
  const [sermons, setSermons] = useState<SanitySermon[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#ECECEC] px-6 pt-20 pb-20">
      {/* Creative Top Separator - Wavy Line Pattern */}
      <div className="pointer-events-none absolute top-8 right-0 left-0 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="h-px w-16 bg-[#303552]/20"></div>
          <svg className="h-4 w-8 text-[#a5876d]/50" viewBox="0 0 32 16">
            <path d="M0,8 Q8,0 16,8 T32,8" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="h-px w-16 bg-[#303552]/20"></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#a5876d]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#303552]/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#a5876d]/5 blur-2xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold text-[#303552] md:text-4xl">Sermons & Podcasts</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Watch our latest sermons and listen to inspiring podcasts
          </p>
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
                className="animate-pulse overflow-hidden rounded-lg bg-[#ececec] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]"
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
                className="group relative overflow-hidden rounded-lg bg-[#ececec] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]"
              >
                {/* Video Embed */}
                <div className="aspect-video overflow-hidden">
                  <iframe
                    className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                    src={getYouTubeEmbedUrl(sermon.youtubeUrl)}
                    title={sermon.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex gap-2">
                    <span className="inline-block rounded-full bg-[#a5876d] px-3 py-1 text-xs text-white">
                      {getTypeLabel(sermon.type)}
                    </span>
                    {sermon.isPopular && (
                      <span className="inline-block rounded-full bg-[#303552] px-3 py-1 text-xs text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[#303552] transition-colors group-hover:text-[#a5876d]">
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
            href="https://www.youtube.com/@ZoeChristianAssembly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
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
