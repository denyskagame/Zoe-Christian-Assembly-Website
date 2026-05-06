import { getActiveGivingCategories, getSiteSettings } from "@/sanity/lib/sanity";
import { Hero } from "@/components/sections/Hero";
import { ServiceInfo } from "@/components/sections/ServiceInfo";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { SermonsSection } from "@/components/sections/SermonsSection";
import { RequestsSection } from "@/components/sections/RequestsSection";
import { GivingSection } from "@/components/sections/GivingSection";

// Revalidate the homepage every minute so admin edits in Sanity Studio appear
// without a redeploy.
export const revalidate = 60;

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
