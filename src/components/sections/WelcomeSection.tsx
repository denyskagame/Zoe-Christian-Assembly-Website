"use client";

import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SanitySiteSettings, SanityWelcomeStat, SanityWelcomeValue } from "@/sanity/types";
import { resolveAlt, resolveImage } from "./imageHelper";
import { getValueIcon } from "./iconMap";

const FALLBACK_FEATURE_URL =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041927/About_qv0f7e.jpg";
const FALLBACK_BACKGROUND_URL =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041928/BGG_bdrezv.jpg";
const FALLBACK_HEADLINE =
  "ZOE CHRISTIAN ASSEMBLY is a vibrant church community that believes in Jesus Christ and empowers people to discover and live their God-given purpose.";
const FALLBACK_BODY =
  "We are a family of believers committed to growing in faith, building authentic relationships, and making a positive impact in our community and beyond.";
const FALLBACK_QUOTE_TEXT =
  "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.";
const FALLBACK_QUOTE_REFERENCE = "John 10:10 NIV";
const FALLBACK_PRIMARY_LABEL = "Our Story";
const FALLBACK_PRIMARY_URL = "/about";
const FALLBACK_SECONDARY_LABEL = "What We Believe";
const FALLBACK_SECONDARY_URL = "/beliefs";

const FALLBACK_STATS: SanityWelcomeStat[] = [
  { _key: "fb-1", value: "3+", label: "Years Ministry" },
  { _key: "fb-2", value: "50+", label: "Members" },
  { _key: "fb-3", value: "3", label: "Countries Reached" },
];

const FALLBACK_VALUES: SanityWelcomeValue[] = [
  {
    _key: "fb-1",
    icon: "book",
    title: "Scripture-Centered",
    description:
      "We believe the Bible is God’s Word and the foundation for all faith and practice.",
  },
  {
    _key: "fb-2",
    icon: "users",
    title: "Authentic Community",
    description:
      "We foster genuine relationships where people can grow together in faith and love.",
  },
  {
    _key: "fb-3",
    icon: "globe",
    title: "Global Impact",
    description: "We are committed to sharing God’s love locally and around the world.",
  },
];

interface WelcomeSectionProps {
  settings: SanitySiteSettings | null;
}

export function WelcomeSection({ settings }: WelcomeSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const headline = settings?.welcomeHeadline?.trim() || FALLBACK_HEADLINE;
  const body = settings?.welcomeBody?.trim() || FALLBACK_BODY;
  const quoteText = settings?.welcomeQuote?.text?.trim() || FALLBACK_QUOTE_TEXT;
  const quoteReference = settings?.welcomeQuote?.reference?.trim() || FALLBACK_QUOTE_REFERENCE;
  const primaryLabel = settings?.welcomePrimaryCtaLabel?.trim() || FALLBACK_PRIMARY_LABEL;
  const primaryUrl = settings?.welcomePrimaryCtaUrl?.trim() || FALLBACK_PRIMARY_URL;
  const secondaryLabel = settings?.welcomeSecondaryCtaLabel?.trim() || FALLBACK_SECONDARY_LABEL;
  const secondaryUrl = settings?.welcomeSecondaryCtaUrl?.trim() || FALLBACK_SECONDARY_URL;
  const stats =
    settings?.welcomeStats && settings.welcomeStats.length > 0
      ? settings.welcomeStats
      : FALLBACK_STATS;
  const values =
    settings?.welcomeValues && settings.welcomeValues.length > 0
      ? settings.welcomeValues
      : FALLBACK_VALUES;
  const featureImageUrl = resolveImage(settings?.welcomeFeatureImage, FALLBACK_FEATURE_URL, 1200);
  const featureImageAlt = resolveAlt(settings?.welcomeFeatureImage, "Worship at Zoe");
  const backgroundImageUrl = resolveImage(
    settings?.welcomeBackgroundImage,
    FALLBACK_BACKGROUND_URL,
    1920
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 pt-64 pb-24 sm:pt-56 md:pt-56 md:pb-28 lg:pt-64"
    >
      {/* Background image — served via next/image for WebP + responsive
          sizing. Avoids decoding a multi-MB original on every paint. */}
      <Image
        src={backgroundImageUrl}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover"
        priority={false}
      />

      {/* Dark Overlay for readability */}
      <div className="bg-zoe-navy/85 absolute inset-0"></div>

      {/* Curved Top */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-16 overflow-hidden md:h-20 lg:h-24">
        <svg
          className="absolute top-0 h-full w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,120 Q720,0 1440,120 L1440,0 L0,0 Z" fill="#ECECEC" />
        </svg>
      </div>

      {/* Background decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-transparent opacity-20"></div>
        <div className="bg-zoe-bronze absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#899BCE] opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 grid items-center gap-16 md:grid-cols-2">
          {/* LEFT: TEXT CONTENT */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="mb-8">
              <h3 className="mb-6 text-xl leading-tight font-bold text-white md:text-2xl">
                {headline}
              </h3>
              <p className="mb-6 leading-relaxed text-gray-300">{body}</p>
            </div>

            {/* Quote Card */}
            <div className="relative mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <Quote className="text-zoe-bronze/20 absolute top-4 left-4 h-8 w-8" />
              <div className="relative z-10 pt-4">
                <p className="mb-4 pl-6 text-lg leading-relaxed text-gray-200 italic">
                  &ldquo;{quoteText}&rdquo;
                </p>
                <div className="flex items-center gap-3 pl-6">
                  <div className="bg-zoe-bronze h-0.5 w-12"></div>
                  <p className="text-zoe-bronze text-sm font-bold">{quoteReference}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryUrl}
                className="bg-zoe-bronze hover:bg-zoe-gray hover:text-zoe-navy rounded-lg px-6 py-3 text-center text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {primaryLabel}
              </Link>
              <Link
                href={secondaryUrl}
                className="border-zoe-gray text-zoe-gray hover:bg-zoe-gray hover:text-zoe-navy rounded-lg border-2 bg-transparent px-6 py-3 text-center text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-1"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          {/* RIGHT: IMAGE & STATS */}
          <div
            className={`relative transition-all delay-200 duration-700 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative h-[400px] overflow-hidden rounded-2xl bg-linear-to-br from-[#f5f5f5] to-[#e8e8e8] shadow-2xl md:h-[500px]">
              <div className="absolute inset-0">
                <Image src={featureImageUrl} alt={featureImageAlt} fill className="object-cover" />
                <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Floating Stats Card */}
              {stats.length > 0 && (
                <div className="absolute right-6 bottom-6 left-6">
                  <div className="bg-zoe-gray/95 relative overflow-hidden rounded-xl p-6 shadow-lg backdrop-blur-sm">
                    <div className="bg-noise absolute inset-0 opacity-20 mix-blend-overlay"></div>
                    <div
                      // Static class strings so Tailwind's content scanner picks them up.
                      className={`relative z-10 grid gap-4 divide-x divide-gray-200 text-center ${
                        stats.length === 1
                          ? "grid-cols-1"
                          : stats.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-3"
                      }`}
                    >
                      {stats.map((stat) => (
                        <div key={stat._key}>
                          <div className="text-zoe-navy text-2xl font-bold">{stat.value}</div>
                          <div className="mt-1 text-[10px] tracking-wide text-gray-600 uppercase sm:text-xs">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- VALUES --- */}
        <div
          className={`grid gap-8 border-t border-white/5 pt-10 transition-all delay-300 duration-700 ease-out md:grid-cols-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {values.map((value) => {
            const Icon = getValueIcon(value.icon);
            return (
              <div key={value._key} className="group text-center">
                <div className="bg-zoe-bronze/20 group-hover:bg-zoe-bronze mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300">
                  <Icon className="text-zoe-bronze h-8 w-8 transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-white">{value.title}</h3>
                <p className="px-4 text-sm leading-relaxed text-gray-300">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
