import type { Metadata } from "next";
import { getPageBySlug, getSiteSettings } from "@/sanity/lib/sanity";
import PageHeader from "@/components/ui/PageHeader";
import { PortableTextRenderer } from "@/components/portable/PortableTextRenderer";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPageBySlug("ministries").catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  return {
    title: page?.title ? `${page.title} | ${churchName}` : `Ministries | ${churchName}`,
    description:
      page?.seoMetaDescription ??
      `Discover the ministries of ${churchName} — places to serve, grow, and belong.`,
  };
}

export default async function MinistriesPage() {
  const page = await getPageBySlug("ministries").catch(() => null);

  return (
    <main className="bg-zoe-gray min-h-screen">
      <PageHeader
        title={page?.title ?? "Ministries"}
        subtitle="Places to serve, grow, and belong."
        badge="Get Involved"
      />

      <section className="px-6 py-12">
        <article className="mx-auto max-w-3xl">
          {page?.body && page.body.length > 0 ? (
            <PortableTextRenderer value={page.body} />
          ) : (
            <div className="text-center">
              <p className="text-base text-gray-600 md:text-lg">
                Ministry listings are coming soon. To get plugged in today,{" "}
                <a
                  href="mailto:info@zoechristian.ca?subject=I'd%20like%20to%20get%20involved"
                  className="text-zoe-bronze hover:text-zoe-navy underline underline-offset-4"
                >
                  email us
                </a>{" "}
                and we&rsquo;ll connect you with the right team.
              </p>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
