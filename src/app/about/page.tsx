import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Users } from "lucide-react";
import { getPageBySlug, getSiteSettings } from "@/sanity/lib/sanity";
import PageHeader from "@/components/ui/PageHeader";
import { PortableTextRenderer } from "@/components/portable/PortableTextRenderer";

export const revalidate = 60;

const SUB_PAGES = [
  {
    href: "/about/our-story",
    title: "Our Story",
    description: "How Zoe Christian Assembly came to be and where we're going.",
    Icon: BookOpen,
  },
  {
    href: "/about/what-we-believe",
    title: "What We Believe",
    description: "The Scripture-rooted convictions that shape everything we do.",
    Icon: Heart,
  },
  {
    href: "/about/our-staff",
    title: "Our Staff",
    description: "Meet the team that serves and shepherds the church.",
    Icon: Users,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPageBySlug("about").catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  return {
    title: page?.title ? `${page.title} | ${churchName}` : `About | ${churchName}`,
    description:
      page?.seoMetaDescription ??
      `Learn about ${churchName} — our story, beliefs, and the team that serves our community.`,
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug("about").catch(() => null);

  return (
    <main className="bg-zoe-gray min-h-screen">
      <PageHeader
        title={page?.title ?? "About Us"}
        subtitle="Get to know Zoe Christian Assembly — our story, our beliefs, and our people."
        badge="Welcome"
      />

      {page?.body && page.body.length > 0 ? (
        <section className="px-6 py-12">
          <article className="mx-auto max-w-3xl">
            <PortableTextRenderer value={page.body} />
          </article>
        </section>
      ) : (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base text-gray-600 md:text-lg">
              We&rsquo;re putting the finishing touches on this page. In the meantime, dive into our
              story, our beliefs, and our staff below.
            </p>
          </div>
        </section>
      )}

      {/* Sub-page tiles */}
      <section className="px-6 pt-4 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {SUB_PAGES.map(({ href, title, description, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-zoe-gray hover:border-zoe-bronze focus:ring-zoe-bronze block rounded-2xl border border-transparent bg-white p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:outline-none"
            >
              <div className="bg-zoe-bronze/10 group-hover:bg-zoe-bronze mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300">
                <Icon className="text-zoe-bronze h-6 w-6 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h2 className="text-zoe-navy group-hover:text-zoe-bronze mb-2 text-xl font-bold transition-colors">
                {title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>
              <span className="text-zoe-bronze inline-flex items-center gap-1 text-sm font-semibold">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
