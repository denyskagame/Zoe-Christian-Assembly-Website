"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SanityRequestCard, SanitySiteSettings } from "@/sanity/types";
import { resolveImage } from "./imageHelper";
import { getRequestIcon } from "./iconMap";

const FALLBACK_BACKGROUND_URL =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041927/Hero_zufgwz.jpg";
const FALLBACK_HEADING = "We’re Here For You!";
const FALLBACK_SUBHEADING =
  "Whether you’re new to faith or growing in your journey, we’re here to walk alongside you.";

const FALLBACK_CARDS: SanityRequestCard[] = [
  {
    _key: "fb-1",
    icon: "users",
    title: "Is this your first time here?",
    description:
      "If this is your first time visiting ZOE Christian Assembly, get connected with us!",
    ctaLabel: "I’m New Here",
    ctaUrl: "mailto:info@zoechristian.ca?subject=I'm new at ZCA",
  },
  {
    _key: "fb-2",
    icon: "praying-hands",
    title: "Have a prayer request?",
    description:
      "Our team is here to pray with you! Send us your prayer request — we’ll keep it private.",
    ctaLabel: "Pray for Me",
    ctaUrl: "mailto:info@zoechristian.ca?subject=Prayer Request",
  },
  {
    _key: "fb-3",
    icon: "chat",
    title: "Have a testimony to share?",
    description: "We love hearing how your life has been impacted by the church and ministry!",
    ctaLabel: "Share My Story",
    ctaUrl: "mailto:info@zoechristian.ca?subject=Testimony",
  },
];

interface RequestsSectionProps {
  settings: SanitySiteSettings | null;
}

export function RequestsSection({ settings }: RequestsSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const heading = settings?.requestsHeading?.trim() || FALLBACK_HEADING;
  const subheading = settings?.requestsSubheading?.trim() || FALLBACK_SUBHEADING;
  const cards =
    settings?.requestCards && settings.requestCards.length > 0
      ? settings.requestCards
      : FALLBACK_CARDS;
  const backgroundUrl = resolveImage(
    settings?.requestsBackgroundImage,
    FALLBACK_BACKGROUND_URL,
    1920
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-20">
      {/* Background image — uses next/image so it's served as optimized
          WebP at the right size, and scrolls with the page (bg-fixed kills
          frame rate on long pages). */}
      <Image
        src={backgroundUrl}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover"
        priority={false}
      />

      {/* Navy overlay */}
      <div className="bg-zoe-navy/50 absolute inset-0"></div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000000' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">{subheading}</p>
        </div>

        <div
          className={`mb-16 grid gap-8 transition-all delay-200 duration-700 ease-out md:grid-cols-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {cards.map((card) => {
            const Icon = getRequestIcon(card.icon);
            return (
              <div
                key={card._key}
                className="bg-zoe-navy group relative overflow-hidden rounded-2xl p-10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute inset-0 opacity-20"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-zoe-bronze/20 group-hover:bg-zoe-bronze mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300">
                    <Icon className="text-zoe-bronze h-8 w-8 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-white">{card.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-gray-300">{card.description}</p>
                  <a
                    href={card.ctaUrl}
                    className="bg-zoe-bronze text-zoe-gray hover:bg-zoe-navy cursor-pointer rounded-lg px-6 py-3 text-sm font-bold tracking-wide uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {card.ctaLabel}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
