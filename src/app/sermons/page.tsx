"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Search, Filter, ChevronDown, Youtube } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { client } from "@/sanity/lib/client";

interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  youtubeUrl: string;
  duration?: string;
  type: string;
  series?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  description?: string;
}

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
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

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [seriesList, setSeriesList] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSermons() {
      try {
        const query = `*[_type == "sermon"] | order(date desc) {
          _id,
          title,
          preacher,
          date,
          youtubeUrl,
          duration,
          type,
          series,
          isFeatured,
          isPopular,
          description
        }`;
        const data = await client.fetch(query);
        setSermons(data);

        // Extract unique series
        const uniqueSeries = [
          ...new Set(data.map((s: Sermon) => s.series).filter(Boolean)),
        ] as string[];
        setSeriesList(uniqueSeries);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSermons();
  }, []);

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeries = selectedSeries === "all" || sermon.series === selectedSeries;
    const matchesType = selectedType === "all" || sermon.type === selectedType;
    return matchesSearch && matchesSeries && matchesType;
  });

  // Get featured sermon (first featured one or most recent)
  const featuredSermon = filteredSermons.find((s) => s.isFeatured) || filteredSermons[0];
  const otherSermons = filteredSermons.filter((s) => s._id !== featuredSermon?._id);

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
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Sermons & Podcasts"
        subtitle="Catch up on our latest sermons, messages, and podcasts. Be blessed by God's Word and teachings."
        badge="Watch & Listen"
      />

      {/* Search and Filters */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sermons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-[#ececec] py-3 pr-4 pl-12 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#303552] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#a5876d] hover:shadow-lg"
              >
                <Filter className="h-5 w-5" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
                {/* Type Filter */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">Type:</span>
                  {["all", "sermon", "podcast", "teaching", "testimony"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        selectedType === type
                          ? "bg-[#a5876d] text-white"
                          : "bg-[#F5F4F2] text-[#303552] hover:bg-[#a5876d] hover:text-[#ececec]"
                      }`}
                    >
                      {type === "all" ? "All Types" : getTypeLabel(type)}
                    </button>
                  ))}
                </div>

                {/* Series Filter */}
                {seriesList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">Series:</span>
                    <button
                      onClick={() => setSelectedSeries("all")}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        selectedSeries === "all"
                          ? "bg-[#a5876d] text-white"
                          : "bg-[#F5F4F2] text-[#303552] hover:bg-[#a5876d] hover:text-[#ececec]"
                      }`}
                    >
                      All Series
                    </button>
                    {seriesList.map((series) => (
                      <button
                        key={series}
                        onClick={() => setSelectedSeries(series)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          selectedSeries === series
                            ? "bg-[#a5876d] text-white"
                            : "bg-[#F5F4F2] text-[#303552] hover:bg-[#a5876d] hover:text-[#ececec]"
                        }`}
                      >
                        {series}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading ? (
        <section className="px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse overflow-hidden rounded-3xl bg-[#303552]">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="aspect-video bg-[#252841] md:aspect-auto"></div>
                <div className="p-8 md:p-12">
                  <div className="mb-4 h-6 w-32 rounded bg-white/20"></div>
                  <div className="mb-4 h-8 w-full rounded bg-white/20"></div>
                  <div className="mb-6 h-4 w-3/4 rounded bg-white/20"></div>
                  <div className="flex gap-4">
                    <div className="h-4 w-24 rounded bg-white/20"></div>
                    <div className="h-4 w-24 rounded bg-white/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : sermons.length === 0 ? (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl text-center">
            <div className="rounded-2xl bg-[#ececec] p-12 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
              <Youtube className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-bold text-[#303552]">No Sermons Yet</h3>
              <p className="text-gray-500">Check back soon for new sermons and podcasts!</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Sermon */}
          {featuredSermon && (
            <section className="px-6 py-8">
              <div className="mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-2xl border border-[#a5876d]/20 bg-[#ececec]/90 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] backdrop-blur-sm">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(featuredSermon.youtubeUrl)}
                      title={featuredSermon.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    ></iframe>
                  </div>
                  <div className="p-8">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-block rounded-full bg-[#a5876d] px-3 py-1 text-xs text-white">
                        {getTypeLabel(featuredSermon.type)}
                      </span>
                      {featuredSermon.isFeatured && (
                        <span className="inline-block rounded-full bg-[#303552] px-3 py-1 text-xs text-white">
                          Featured
                        </span>
                      )}
                      {featuredSermon.isPopular && (
                        <span className="inline-block rounded-full bg-[#303552] px-3 py-1 text-xs text-white">
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-[#303552] transition-colors hover:text-[#a5876d]">
                      {featuredSermon.title}
                    </h3>
                    <p className="mb-4 font-semibold text-gray-600">{featuredSermon.preacher}</p>
                    {featuredSermon.description && (
                      <p className="mb-4 leading-relaxed text-gray-600">
                        {featuredSermon.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {featuredSermon.duration && (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#a5876d]" />
                          {featuredSermon.duration}
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#a5876d]" />
                        {formatDate(featuredSermon.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sermon Archive */}
          <section className="relative overflow-hidden bg-[#ececec] px-6 py-12">
            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#303552]/5 blur-3xl"></div>
              <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#a5876d]/5 blur-3xl"></div>
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(165, 136, 106, 0.4) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              ></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="mb-12 text-center">
                <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
                  Browse through our collection of messages, sermons, and podcast teachings.
                </p>
              </div>

              {filteredSermons.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-gray-500">No sermons found matching your search.</p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {otherSermons.map((sermon) => (
                    <div key={sermon._id} className="group">
                      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-[#ececec] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
                        <div className="relative aspect-video bg-[#1a1d2e]">
                          <iframe
                            width="100%"
                            height="100%"
                            src={getYouTubeEmbedUrl(sermon.youtubeUrl)}
                            title={sermon.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <div className="mb-2 flex gap-2">
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
                          <p className="mb-1 text-sm text-gray-600">{sermon.preacher}</p>
                          <p className="text-xs text-gray-500">
                            {sermon.duration && `${sermon.duration} • `}
                            {formatDate(sermon.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View More Button */}
              <div className="mt-12 text-center">
                <a
                  href="https://www.youtube.com/@zoechristianassembly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  View All on YouTube
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Join Live Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#303552] to-[#3a3f5e] px-6 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#a5876d] opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#a5876d] opacity-5 blur-3xl"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1,0h1v1H1V0zm2,2h1v1H2V2z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
              mixBlendMode: "soft-light",
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Join Us Live on Sundays!
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-300 md:text-xl">
            Every Sunday at 2:00 PM - 4:00 PM EST. Join us online via Zoom or visit us in person!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://us06web.zoom.us/j/87648045816?pwd=pdbWj5p8lmb25N41DR6VxBCDTG8oJP.1"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
            >
              Join on Zoom
            </a>
            <a
              href="https://www.youtube.com/@zoechristianassembly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#ececec] bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#ececec] hover:text-[#303552]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
