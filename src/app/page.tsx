import type { Metadata } from "next";
import { getActiveGivingCategories, getSiteSettings, urlFor } from "@/sanity/lib/sanity";
import { Hero } from "@/components/sections/Hero";
import { ServiceInfo } from "@/components/sections/ServiceInfo";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { SermonsSection } from "@/components/sections/SermonsSection";
import { RequestsSection } from "@/components/sections/RequestsSection";
import { GivingSection } from "@/components/sections/GivingSection";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

// Revalidate the homepage every minute so admin edits in Sanity Studio appear
// without a redeploy.
export const revalidate = 60;

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://zoechristian.ca";
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  const description =
    settings?.heroHeadline?.replace(/\s+/g, " ").trim() ||
    `Welcome to ${churchName}. Join us this Sunday.`;
  const ogImage = settings?.heroBackgroundImage?.asset
    ? urlFor(settings.heroBackgroundImage).width(1200).height(630).url()
    : undefined;

  return {
    title: churchName,
    description,
    openGraph: {
      title: churchName,
      description,
      url: siteUrl(),
      siteName: churchName,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: churchName,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function Home() {
  // Both reads are cheap and independent — fan them out in parallel. Either may
  // return null/[] if Sanity isn't configured yet; sections fall back to
  // sensible defaults so the page still renders.
  const [settings, givingCategories] = await Promise.all([
    getSiteSettings().catch(() => null),
    getActiveGivingCategories().catch(() => []),
  ]);

  return (
    <main>
      <OrganizationJsonLd settings={settings} siteUrl={siteUrl()} />
      <Hero settings={settings} />
      <ServiceInfo settings={settings} />
      <WelcomeSection settings={settings} />
      <ProgramsSection settings={settings} />
      <SermonsSection settings={settings} />
      <RequestsSection settings={settings} />
      <GivingSection settings={settings} givingCategories={givingCategories} />
    </main>
  );
}
