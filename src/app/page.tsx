// This page becomes a server component in Feature 02b. Section components stay
// client because of scroll animations.
import { Hero } from "@/components/sections/Hero";
import { ServiceInfo } from "@/components/sections/ServiceInfo";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { SermonsSection } from "@/components/sections/SermonsSection";
import { RequestsSection } from "@/components/sections/RequestsSection";
import { GivingSection } from "@/components/sections/GivingSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceInfo />
      <WelcomeSection />
      <ProgramsSection />
      <SermonsSection />
      <RequestsSection />
      <GivingSection />
    </main>
  );
}
