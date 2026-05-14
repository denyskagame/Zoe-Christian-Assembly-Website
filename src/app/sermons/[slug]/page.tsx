import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, Clock, User } from "lucide-react";
import { getSermonBySlug, getSermons, getSiteSettings } from "@/sanity/lib/sanity";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { VideoJsonLd, parseDurationToIso8601 } from "@/components/seo/VideoJsonLd";
import type { SanitySermon } from "@/sanity/types";

export const revalidate = 60;

interface SermonPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    sermon: "Sermon",
    podcast: "Podcast",
    teaching: "Teaching",
    testimony: "Testimony",
  };
  return labels[type] ?? "Sermon";
}

/**
 * Pre-render every sermon with a slug at build time. Sermons without a slug
 * (the schema makes slug optional) are skipped — they aren't reachable as
 * individual pages anyway.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const sermons = await getSermons().catch(() => []);
  return sermons
    .map((s) => s.slug?.current)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SermonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [sermon, settings] = await Promise.all([
    getSermonBySlug(slug).catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  if (!sermon) return { title: `Sermon | ${churchName}` };

  const videoId = extractYouTubeId(sermon.youtubeUrl);
  const ogImage = videoId ? getYouTubeThumbnail(videoId, "max") : undefined;
  const description =
    sermon.description?.trim() || `${sermon.preacher} • ${formatDate(sermon.date)}`;

  return {
    title: `${sermon.title} | ${churchName}`,
    description,
    openGraph: {
      title: sermon.title,
      description,
      type: "video.other",
      ...(ogImage ? { images: [{ url: ogImage, width: 1280, height: 720 }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: sermon.title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

function findAdjacent(
  sermons: SanitySermon[],
  currentId: string
): { prev: SanitySermon | null; next: SanitySermon | null } {
  // `sermons` is already date-desc from getSermons(). "Prev" in reading order
  // is the older sermon (later in array); "Next" is the newer one (earlier).
  // Surface them under intuitive labels: "Previous sermon" = older, "Next
  // sermon" = newer.
  const index = sermons.findIndex((s) => s._id === currentId);
  if (index === -1) return { prev: null, next: null };
  const newer = index > 0 ? sermons[index - 1] : null;
  const older = index < sermons.length - 1 ? sermons[index + 1] : null;
  return { prev: older ?? null, next: newer ?? null };
}

export default async function SermonPage({ params }: SermonPageProps) {
  const { slug } = await params;
  const [sermon, allSermons] = await Promise.all([
    getSermonBySlug(slug).catch(() => null),
    getSermons().catch(() => []),
  ]);

  if (!sermon) notFound();

  const { prev, next } = findAdjacent(allSermons, sermon._id);
  const durationIso = parseDurationToIso8601(sermon.duration);

  return (
    <main className="bg-zoe-gray min-h-screen">
      <VideoJsonLd
        name={sermon.title}
        description={sermon.description}
        youtubeUrl={sermon.youtubeUrl}
        uploadDate={sermon.date}
        durationIso8601={durationIso}
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/sermons"
          className="text-zoe-bronze hover:text-zoe-navy mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all sermons
        </Link>

        <article className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
          <div className="aspect-video w-full">
            <YouTubeEmbed url={sermon.youtubeUrl} title={sermon.title} />
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="bg-zoe-bronze inline-block rounded-full px-3 py-1 text-xs font-semibold text-white">
                {getTypeLabel(sermon.type)}
              </span>
              {sermon.isPopular && (
                <span className="bg-zoe-navy inline-block rounded-full px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}
              {sermon.series && (
                <span className="bg-zoe-navy/10 text-zoe-navy inline-block rounded-full px-3 py-1 text-xs font-semibold">
                  {sermon.series}
                </span>
              )}
            </div>

            <h1 className="text-zoe-navy mb-6 font-serif text-3xl leading-tight font-bold md:text-4xl">
              {sermon.title}
            </h1>

            <dl className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <User className="text-zoe-bronze mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Preacher
                  </dt>
                  <dd className="text-zoe-navy text-sm font-semibold">{sermon.preacher}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="text-zoe-bronze mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Date
                  </dt>
                  <dd className="text-zoe-navy text-sm font-semibold">{formatDate(sermon.date)}</dd>
                </div>
              </div>
              {sermon.duration && (
                <div className="flex items-start gap-3">
                  <Clock className="text-zoe-bronze mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Length
                    </dt>
                    <dd className="text-zoe-navy text-sm font-semibold">{sermon.duration}</dd>
                  </div>
                </div>
              )}
              {sermon.scripture && (
                <div className="flex items-start gap-3">
                  <BookOpen className="text-zoe-bronze mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Scripture
                    </dt>
                    <dd className="text-zoe-navy text-sm font-semibold">{sermon.scripture}</dd>
                  </div>
                </div>
              )}
            </dl>

            {sermon.description && (
              <div className="border-t border-gray-100 pt-6">
                <p className="text-base leading-relaxed whitespace-pre-line text-gray-700 md:text-lg">
                  {sermon.description}
                </p>
              </div>
            )}
          </div>
        </article>

        {(prev || next) && (
          <nav aria-label="Sermon navigation" className="mt-10 grid gap-4 sm:grid-cols-2">
            {prev?.slug?.current ? (
              <Link
                href={`/sermons/${prev.slug.current}`}
                className="hover:border-zoe-bronze group flex flex-col rounded-2xl border border-transparent bg-white p-5 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  ← Previous sermon
                </span>
                <span className="text-zoe-navy group-hover:text-zoe-bronze mt-1 line-clamp-2 font-bold transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next?.slug?.current ? (
              <Link
                href={`/sermons/${next.slug.current}`}
                className="hover:border-zoe-bronze group flex flex-col rounded-2xl border border-transparent bg-white p-5 text-right shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Next sermon →
                </span>
                <span className="text-zoe-navy group-hover:text-zoe-bronze mt-1 line-clamp-2 font-bold transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
