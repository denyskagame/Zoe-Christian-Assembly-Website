import type { Metadata } from "next";
import { getPageBySlug, getSiteSettings } from "@/sanity/lib/sanity";
import PageHeader from "@/components/ui/PageHeader";
import { PortableTextRenderer } from "@/components/portable/PortableTextRenderer";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPageBySlug("beliefs").catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  return {
    title: page?.title ? `${page.title} | ${churchName}` : `What We Believe | ${churchName}`,
    description:
      page?.seoMetaDescription ??
      `The Scripture-rooted beliefs that shape life and ministry at ${churchName}.`,
  };
}

export default async function BeliefsPage() {
  const page = await getPageBySlug("beliefs").catch(() => null);

  return (
    <main className="bg-zoe-gray min-h-screen">
      <PageHeader
        title={page?.title ?? "What We Believe"}
        subtitle="Scripture is the foundation. Here is where we plant our convictions."
        badge="Our Faith"
      />

      <section className="px-6 py-12">
        <article className="mx-auto max-w-3xl">
          {page?.body && page.body.length > 0 ? (
            <PortableTextRenderer value={page.body} />
          ) : (
            <div className="text-center">
              <p className="text-base text-gray-600 md:text-lg">
                We&rsquo;re writing our statement of beliefs. Please check back soon — or{" "}
                <a
                  href="mailto:info@zoechristian.ca?subject=Question%20about%20your%20beliefs"
                  className="text-zoe-bronze hover:text-zoe-navy underline underline-offset-4"
                >
                  email us
                </a>{" "}
                with any specific questions.
              </p>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
