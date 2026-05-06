"use client";

import { Clock, MapPin, Users, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SanitySiteSettings } from "@/sanity/types";

const FALLBACK_HEADING = "Join Us for Worship";
const FALLBACK_DESCRIPTION =
  "Experience the presence of God with us every Sunday. Whether you're new to faith or have been walking with Christ for years, there's a place for you here.";
const FALLBACK_TIME_LABEL = "Every Sunday";
const FALLBACK_TIME_VALUE = "2 PM – 4 PM";
const FALLBACK_STREET = "906 Rue Galt E";
const FALLBACK_CITY_LINE = "Sherbrooke, QC J1G 1Y9";
const FALLBACK_FEATURES = ["All ages welcome", "Family-friendly environment"];

const FEATURE_ICONS = [Users, Heart];

interface ServiceInfoProps {
  settings: SanitySiteSettings | null;
}

function buildCityLine(settings: SanitySiteSettings | null): string {
  const address = settings?.address;
  if (!address) return FALLBACK_CITY_LINE;
  const cityProvince = [address.city, address.province].filter(Boolean).join(", ");
  return [cityProvince, address.postalCode].filter(Boolean).join(" ") || FALLBACK_CITY_LINE;
}

export function ServiceInfo({ settings }: ServiceInfoProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  const heading = settings?.serviceInfoHeading ?? FALLBACK_HEADING;
  const description = settings?.serviceInfoDescription ?? FALLBACK_DESCRIPTION;
  const firstService = settings?.serviceTimes?.[0];
  const timeLabel = firstService?.label ?? FALLBACK_TIME_LABEL;
  const timeValue = firstService?.time ?? FALLBACK_TIME_VALUE;
  const street = settings?.address?.street ?? FALLBACK_STREET;
  const cityLine = buildCityLine(settings);
  const features =
    settings?.serviceInfoFeatures && settings.serviceInfoFeatures.length > 0
      ? settings.serviceInfoFeatures
      : FALLBACK_FEATURES;

  return (
    <div ref={sectionRef} className="relative z-20">
      {/* Top portion - Hero background color, provides space for the card to sit half-in */}
      <div className="bg-zoe-gray pt-36 pb-28 sm:pt-28 sm:pb-24 md:pt-20 md:pb-28 lg:pt-0 lg:pb-32"></div>

      {/* Floating Card - Positioned to overlap into the Welcome section below */}
      <div
        className={`absolute right-0 bottom-0 left-0 flex translate-y-1/2 justify-center px-6 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-1/2 opacity-100" : "translate-y-[60%] opacity-0"
        }`}
      >
        <div className="w-full max-w-3xl">
          <div className="from-zoe-gray/80 overflow-hidden rounded-2xl bg-linear-to-b to-white/90 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)]">
            <div className="px-6 py-6 md:px-10 md:py-8 lg:px-12 lg:py-10">
              {/* Header */}
              <div className="mb-5 text-center md:mb-6">
                <h2 className="text-zoe-navy mb-2 text-xl font-bold md:text-2xl">{heading}</h2>
                <p className="text-zoe-navy/60 mx-auto max-w-xl text-xs leading-relaxed md:text-sm">
                  {description}
                </p>
              </div>

              {/* Content Row */}
              <div className="mb-5 flex flex-col items-center justify-center gap-6 md:mb-6 md:flex-row md:gap-10 lg:gap-16">
                {/* Time Block */}
                <div className="group flex items-center gap-3">
                  <div className="bg-zoe-navy flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105 md:h-14 md:w-14">
                    <Clock className="text-zoe-bronze h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-zoe-navy/50 mb-0.5 text-[10px] font-semibold tracking-widest uppercase md:text-xs">
                      {timeLabel}
                    </p>
                    <p className="text-zoe-navy text-xl font-bold tracking-tight md:text-2xl">
                      {timeValue}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="bg-zoe-navy/10 hidden h-16 w-px md:block"></div>
                <div className="bg-zoe-navy/10 h-px w-32 md:hidden"></div>

                {/* Location Block */}
                <div className="group flex items-center gap-3">
                  <div className="bg-zoe-navy flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105 md:h-14 md:w-14">
                    <MapPin className="text-zoe-bronze h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-zoe-navy/50 mb-0.5 text-[10px] font-semibold tracking-widest uppercase md:text-xs">
                      Location
                    </p>
                    <p className="text-zoe-navy text-base font-bold tracking-tight md:text-lg">
                      {street}
                    </p>
                    <p className="text-zoe-navy/60 text-xs font-medium">{cityLine}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Features */}
              <div className="border-zoe-navy/10 flex flex-col items-center justify-center gap-4 border-t pt-4 sm:flex-row sm:gap-8 md:pt-5">
                {features.map((feature, i) => {
                  const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length] ?? Users;
                  return (
                    <div key={feature} className="text-zoe-navy/70 flex items-center gap-2">
                      <Icon className="text-zoe-bronze h-3.5 w-3.5" />
                      <span className="text-xs font-medium">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
