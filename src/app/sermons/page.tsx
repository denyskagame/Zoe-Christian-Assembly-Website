import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { getSermons, getSiteSettings } from "@/sanity/lib/sanity";
import PageHeader from "@/components/ui/PageHeader";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import type { SanitySermon } from "@/sanity/types";

export const revalidate = 60;

const PAGE_SIZE = 12;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  return {
    title: `Sermons & Podcasts | ${churchName}`,
    description: `Browse the full sermon archive from ${churchName}. Watch, listen, be blessed.`,
  };
}

interface SermonsPageProps {
  searchParams: Promise<{ page?: string }>;
}

function parsePage(raw: string | undefined, totalPages: number): number {
  const parsed = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  if (parsed > totalPages) return Math.max(totalPages, 1);
  return parsed;
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

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) result.push("…");
    result.push(sorted[i]!);
  }
  return result;
}

function SermonCard({ sermon }: { sermon: SanitySermon }) {
  const videoId = extractYouTubeId(sermon.youtubeUrl);
  const slug = sermon.slug?.current;
  const thumb = videoId ? getYouTubeThumbnail(videoId, "max") : null;

  const card = (
    <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
      <div className="bg-zoe-navy/10 relative aspect-video w-full overflow-hidden">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={sermon.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-zoe-navy/70 flex h-full w-full items-center justify-center text-sm font-semibold">
            Video unavailable
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="bg-zoe-bronze inline-block rounded-full px-3 py-1 text-xs text-white">
            {getTypeLabel(sermon.type)}
          </span>
          {sermon.isPopular && (
            <span className="bg-zoe-navy inline-block rounded-full px-3 py-1 text-xs text-white">
              Popular
            </span>
          )}
        </div>
        <h2 className="text-zoe-navy group-hover:text-zoe-bronze mb-2 line-clamp-2 text-lg font-bold transition-colors">
          {sermon.title}
        </h2>
        <p className="mb-3 text-sm text-gray-600">{sermon.preacher}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="text-zoe-bronze h-3.5 w-3.5" />
            {formatDate(sermon.date)}
          </span>
          {sermon.duration && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="text-zoe-bronze h-3.5 w-3.5" />
              {sermon.duration}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (slug) {
    return (
      <Link
        href={`/sermons/${slug}`}
        className="focus:ring-zoe-bronze block rounded-2xl focus:ring-2 focus:outline-none"
      >
        {card}
      </Link>
    );
  }
  return card;
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(currentPage, totalPages);

  const linkBase =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors";

  return (
    <nav aria-label="Sermon pagination" className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          {currentPage > 1 ? (
            <Link
              href={currentPage - 1 === 1 ? "/sermons" : `/sermons?page=${currentPage - 1}`}
              className={`${linkBase} text-zoe-navy hover:bg-zoe-bronze/10`}
            >
              ← Prev
            </Link>
          ) : (
            <span className={`${linkBase} cursor-not-allowed text-gray-300`}>← Prev</span>
          )}
        </li>
        {pages.map((p, i) => (
          <li key={`${p}-${i}`}>
            {p === "…" ? (
              <span className={`${linkBase} text-gray-400`}>…</span>
            ) : p === currentPage ? (
              <span aria-current="page" className={`${linkBase} bg-zoe-navy text-white`}>
                {p}
              </span>
            ) : (
              <Link
                href={p === 1 ? "/sermons" : `/sermons?page=${p}`}
                className={`${linkBase} text-zoe-navy hover:bg-zoe-bronze/10`}
              >
                {p}
              </Link>
            )}
          </li>
        ))}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={`/sermons?page=${currentPage + 1}`}
              className={`${linkBase} text-zoe-navy hover:bg-zoe-bronze/10`}
            >
              Next →
            </Link>
          ) : (
            <span className={`${linkBase} cursor-not-allowed text-gray-300`}>Next →</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default async function SermonsPage({ searchParams }: SermonsPageProps) {
  const sermons = await getSermons().catch(() => []);
  const totalPages = Math.max(1, Math.ceil(sermons.length / PAGE_SIZE));
  const { page: rawPage } = await searchParams;
  const currentPage = parsePage(rawPage, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageSermons = sermons.slice(start, start + PAGE_SIZE);

  return (
    <main className="bg-zoe-gray min-h-screen">
      <PageHeader
        title="Sermons & Podcasts"
        subtitle="Catch up on our latest sermons, messages, and podcasts. Be blessed by God's Word."
        badge="Watch & Listen"
      />

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {pageSermons.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-zoe-navy text-xl font-bold">No sermons yet</p>
              <p className="mt-2 text-sm text-gray-500">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pageSermons.map((sermon) => (
                <SermonCard key={sermon._id} sermon={sermon} />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </main>
  );
}
