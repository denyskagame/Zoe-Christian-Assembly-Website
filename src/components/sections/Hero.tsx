"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SanitySiteSettings } from "@/sanity/types";
import { resolveAlt, resolveImage } from "./imageHelper";

const FALLBACK_HERO_URL =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764097924/ggg_amnlgy.png";
const FALLBACK_DECORATIVE_URL =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764102905/Asset_1_z8x1hl.png";
const FALLBACK_HEADLINE = "Empowering You\nto Live the Life of\nJesus Abundantly";
const FALLBACK_EMPHASIS_WORD = "Jesus";
const FALLBACK_PRIMARY_LABEL = "Plan Your Visit";
const FALLBACK_PRIMARY_URL = "/plan-visit";
const FALLBACK_SECONDARY_LABEL = "Join Us Live";
const FALLBACK_ZOOM_URL =
  "https://us06web.zoom.us/j/87648045816?pwd=pdbWj5p8lmb25N41DR6VxBCDTG8oJP.1";

interface HeroProps {
  settings: SanitySiteSettings | null;
}

/**
 * Render the hero headline with the chosen emphasis word as a styled span and
 * preserve line breaks coming from the Sanity text field.
 */
function renderHeadline(headline: string, emphasis: string | undefined) {
  const lines = headline.split(/\r?\n/);
  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    if (emphasis && line.toLowerCase().includes(emphasis.toLowerCase())) {
      const regex = new RegExp(`(${emphasis})`, "ig");
      const segments = line.split(regex);
      segments.forEach((segment, segmentIndex) => {
        if (segment.toLowerCase() === emphasis.toLowerCase()) {
          parts.push(
            <span key={`em-${lineIndex}-${segmentIndex}`} className="uppercase">
              {segment}
            </span>
          );
        } else if (segment) {
          parts.push(<span key={`seg-${lineIndex}-${segmentIndex}`}>{segment}</span>);
        }
      });
    } else {
      parts.push(<span key={`line-${lineIndex}`}>{line}</span>);
    }
    return (
      <span key={`l-${lineIndex}`}>
        {parts}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    );
  });
}

export function Hero({ settings }: HeroProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.2,
    delay: 30,
  });

  const headline = settings?.heroHeadline?.trim() || FALLBACK_HEADLINE;
  const emphasisWord = settings?.heroEmphasisWord?.trim() || FALLBACK_EMPHASIS_WORD;
  const primaryLabel = settings?.heroPrimaryCtaLabel?.trim() || FALLBACK_PRIMARY_LABEL;
  const primaryUrl = settings?.heroPrimaryCtaUrl?.trim() || FALLBACK_PRIMARY_URL;
  const secondaryLabel = settings?.heroSecondaryCtaLabel?.trim() || FALLBACK_SECONDARY_LABEL;
  const zoomUrl = settings?.currentZoomLink?.trim() || FALLBACK_ZOOM_URL;
  const heroImageUrl = resolveImage(settings?.heroBackgroundImage, FALLBACK_HERO_URL, 1600);
  const heroImageAlt = resolveAlt(settings?.heroBackgroundImage, "Worship");
  const decorativeImageUrl = resolveImage(
    settings?.heroDecorativeImage,
    FALLBACK_DECORATIVE_URL,
    800
  );
  const decorativeImageAlt = resolveAlt(settings?.heroDecorativeImage, "Decorative element");

  return (
    <section
      ref={sectionRef}
      className="bg-zoe-gray relative flex w-full items-start justify-center overflow-hidden pt-8 pb-4 md:pt-12 md:pb-12 lg:min-h-[85vh] lg:items-center lg:pt-20 lg:pb-24"
    >
      <div className="relative z-10 container mx-auto grid grid-cols-1 items-center gap-8 px-6 md:gap-12 lg:grid-cols-2 lg:gap-8 lg:pr-12 lg:pl-24 xl:pr-20 xl:pl-32">
        {/* --- LEFT COLUMN: TEXT --- */}
        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center lg:items-start lg:text-left">
          {/* Hero image - above headline on Mobile/Tablet only */}
          <div
            className={`relative mb-4 flex h-[200px] w-full max-w-[650px] justify-center transition-all duration-500 ease-out sm:mb-6 sm:h-[240px] sm:max-w-[750px] md:mb-8 md:h-[280px] md:max-w-[850px] lg:hidden ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Image
              src={heroImageUrl}
              alt={heroImageAlt}
              fill
              className="rotate-[-6deg] transform object-contain drop-shadow-2xl transition-transform duration-700 ease-out hover:rotate-[-1deg]"
            />
          </div>

          <div className="relative flex w-full flex-col items-center lg:items-start">
            {/* HEADLINE */}
            <h1
              className={`text-zoe-navy relative z-20 mt-12 font-serif text-4xl leading-[1.15] font-bold tracking-tight transition-all duration-500 ease-out sm:mt-14 sm:text-5xl md:mt-16 md:text-6xl lg:mt-0 lg:text-[4rem] lg:leading-[1.1] ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {renderHeadline(headline, emphasisWord)}
            </h1>

            {/* DECORATIVE IMAGE (Below headline on all screens) */}
            <div
              className={`pointer-events-none relative z-10 mt-[-35px] flex h-[100px] w-[300px] justify-center transition-all duration-500 ease-out sm:mt-[-40px] sm:h-[130px] sm:w-[400px] md:mt-[-45px] md:h-[150px] md:w-[500px] lg:mt-[-50px] lg:-ml-8 lg:h-[180px] lg:w-[600px] lg:justify-start ${
                isVisible
                  ? "translate-x-0 scale-100 opacity-90"
                  : "-translate-x-8 scale-95 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <Image
                src={decorativeImageUrl}
                alt={decorativeImageAlt}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* BUTTONS GROUP */}
          <div
            className={`relative z-20 mt-6 flex w-full flex-col gap-3 transition-all duration-500 ease-out sm:mt-8 sm:w-auto sm:flex-row sm:gap-4 md:mt-10 md:gap-5 lg:mt-2 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* PRIMARY CTA */}
            <Link
              href={primaryUrl}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg px-6 py-3 text-sm font-bold tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto"
            >
              <div className="bg-zoe-bronze group-hover:bg-zoe-navy absolute inset-0 transition-colors duration-300"></div>
              <span className="text-zoe-gray relative z-10 uppercase transition-colors group-hover:text-white">
                {primaryLabel}
              </span>
              <ArrowRight className="text-zoe-gray relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </Link>

            {/* SECONDARY CTA — Zoom */}
            <a
              href={zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-zoe-navy relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border-2 px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
            >
              <div className="group-hover:bg-zoe-navy absolute inset-0 bg-transparent transition-colors duration-300"></div>
              <div className="relative z-10 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                {/* Zoom Icon */}
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="#2D8CFF"
                    className="transition-colors duration-300 group-hover:fill-white"
                  />
                  <rect
                    x="6"
                    y="8.5"
                    width="8"
                    height="7"
                    rx="1"
                    fill="white"
                    className="transition-colors duration-300 group-hover:fill-[#2D8CFF]"
                  />
                  <path
                    d="M14 10.5L18 8.5V15.5L14 13.5V10.5Z"
                    fill="white"
                    className="transition-colors duration-300 group-hover:fill-[#2D8CFF]"
                  />
                </svg>
              </div>
              <span className="text-zoe-navy relative z-10 whitespace-nowrap uppercase transition-colors duration-300 group-hover:text-white">
                {secondaryLabel}
              </span>
            </a>
          </div>
        </div>

        {/* --- RIGHT COLUMN: MAIN IMAGE (Desktop only) --- */}
        <div
          className={`relative hidden items-center justify-end transition-all duration-500 ease-out lg:flex ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="relative w-full max-w-[1300px]">
            <Image
              src={heroImageUrl}
              alt={heroImageAlt}
              width={1600}
              height={1600}
              className="h-auto w-full rotate-[-6deg] transform object-contain drop-shadow-2xl transition-transform duration-500 ease-out hover:rotate-[-1deg]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
