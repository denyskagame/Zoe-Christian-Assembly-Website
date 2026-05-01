"use client";

import { Clock, MapPin, Users, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ServiceInfo() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <div ref={sectionRef} className="relative z-20">
      {/* This section creates the bridging effect between Hero and Welcome */}

      {/* Top portion - Hero background color, provides space for the card to sit half-in */}
      <div className="bg-[#ECECEC] pt-36 pb-28 sm:pt-28 sm:pb-24 md:pt-20 md:pb-28 lg:pt-0 lg:pb-32"></div>

      {/* Floating Card - Positioned to overlap into the Welcome section below */}
      <div
        className={`absolute right-0 bottom-0 left-0 flex translate-y-1/2 justify-center px-6 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-1/2 opacity-100" : "translate-y-[60%] opacity-0"
        }`}
      >
        <div className="w-full max-w-3xl">
          {/* Main Card with transparent glass effect */}
          <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#ECECEC]/80 to-white/90 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] backdrop-blur-xl">
            <div className="px-6 py-6 md:px-10 md:py-8 lg:px-12 lg:py-10">
              {/* Header */}
              <div className="mb-5 text-center md:mb-6">
                <h2 className="mb-2 text-xl font-bold text-[#303552] md:text-2xl">
                  Join Us for Worship
                </h2>
                <p className="mx-auto max-w-xl text-xs leading-relaxed text-[#303552]/60 md:text-sm">
                  Experience the presence of God with us every Sunday. Whether you&apos;re new to
                  faith or have been walking with Christ for years, there&apos;s a place for you
                  here.
                </p>
              </div>

              {/* Content Row */}
              <div className="mb-5 flex flex-col items-center justify-center gap-6 md:mb-6 md:flex-row md:gap-10 lg:gap-16">
                {/* Time Block */}
                <div className="group flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#303552] shadow-lg transition-transform group-hover:scale-105 md:h-14 md:w-14">
                    <Clock className="h-5 w-5 text-[#a5876d] md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-[#303552]/50 uppercase md:text-xs">
                      Every Sunday
                    </p>
                    <p className="text-xl font-bold tracking-tight text-[#303552] md:text-2xl">
                      2 PM – 4 PM
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden h-16 w-px bg-[#303552]/10 md:block"></div>
                <div className="h-px w-32 bg-[#303552]/10 md:hidden"></div>

                {/* Location Block */}
                <div className="group flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#303552] shadow-lg transition-transform group-hover:scale-105 md:h-14 md:w-14">
                    <MapPin className="h-5 w-5 text-[#a5876d] md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-[#303552]/50 uppercase md:text-xs">
                      Location
                    </p>
                    <p className="text-base font-bold tracking-tight text-[#303552] md:text-lg">
                      906 Rue Galt E
                    </p>
                    <p className="text-xs font-medium text-[#303552]/60">Sherbrooke, QC J1G 1Y9</p>
                  </div>
                </div>
              </div>

              {/* Bottom Features */}
              <div className="flex flex-col items-center justify-center gap-4 border-t border-[#303552]/10 pt-4 sm:flex-row sm:gap-8 md:pt-5">
                <div className="flex items-center gap-2 text-[#303552]/70">
                  <Users className="h-3.5 w-3.5 text-[#a5876d]" />
                  <span className="text-xs font-medium">All ages welcome</span>
                </div>
                <div className="flex items-center gap-2 text-[#303552]/70">
                  <Heart className="h-3.5 w-3.5 text-[#a5876d]" />
                  <span className="text-xs font-medium">Family-friendly environment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
