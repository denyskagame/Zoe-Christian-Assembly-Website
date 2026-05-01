"use client";

import Image from "next/image";
import Link from "next/link";
import { Quote, BookOpen, Users, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Using the Cloudinary image you provided earlier for consistency
const WORSHIP_IMAGE_URL =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041927/About_qv0f7e.jpg";

export function WelcomeSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 pt-64 pb-24 sm:pt-56 md:pt-56 md:pb-28 lg:pt-64"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041928/BGG_bdrezv.jpg)",
        }}
      ></div>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-[#303552]/85"></div>

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

      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-20"></div>
        {/* Top Right Glow (Gold) */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#A5876D] opacity-5 blur-3xl"></div>
        {/* Bottom Left Glow (Blue) */}
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#899BCE] opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* --- MAIN CONTENT GRID --- */}
        <div className="mb-10 grid items-center gap-16 md:grid-cols-2">
          {/* LEFT: TEXT CONTENT */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="mb-8">
              <h3 className="mb-6 text-xl leading-tight font-bold text-white md:text-2xl">
                ZOE CHRISTIAN ASSEMBLY is a vibrant church community that believes in Jesus Christ
                and empowers people to discover and live their God-given purpose.
              </h3>
              <p className="mb-6 leading-relaxed text-gray-300">
                We are a family of believers committed to growing in faith, building authentic
                relationships, and making a positive impact in our community and beyond.
              </p>
            </div>

            {/* Quote Card */}
            <div className="relative mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-[#a5876d]/20" />
              <div className="relative z-10 pt-4">
                <p className="mb-4 pl-6 text-lg leading-relaxed text-gray-200 italic">
                  &ldquo;The thief comes only to steal and kill and destroy; I have come that they
                  may have life, and have it to the full.&rdquo;
                </p>
                <div className="flex items-center gap-3 pl-6">
                  <div className="h-0.5 w-12 bg-[#a5876d]"></div>
                  <p className="text-sm font-bold text-[#a5876d]">John 10:10 NIV</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/about"
                className="rounded-lg bg-[#a5876d] px-6 py-3 text-center text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#ececec] hover:text-[#303552] hover:shadow-2xl"
              >
                Our Story
              </Link>
              <Link
                href="/beliefs"
                className="rounded-lg border-2 border-[#ececec] bg-transparent px-6 py-3 text-center text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#ececec] hover:text-[#303552]"
              >
                What We Believe
              </Link>
            </div>
          </div>

          {/* RIGHT: IMAGE & STATS */}
          <div
            className={`relative transition-all delay-200 duration-700 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8] shadow-2xl md:h-[500px]">
              {/* Main Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <Image src={WORSHIP_IMAGE_URL} alt="Worship at Zoe" fill className="object-cover" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Floating Stats Card (Glassmorphism) */}
              <div className="absolute right-6 bottom-6 left-6">
                <div className="relative overflow-hidden rounded-xl bg-[#ececec]/95 p-6 shadow-lg backdrop-blur-sm">
                  {/* Subtle Texture Overlay on Card */}
                  <div className="bg-noise absolute inset-0 opacity-20 mix-blend-overlay"></div>

                  <div className="relative z-10 grid grid-cols-3 gap-4 divide-x divide-gray-200 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#303552]">3+</div>
                      <div className="mt-1 text-[10px] tracking-wide text-gray-600 uppercase sm:text-xs">
                        Years Ministry
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#303552]">50+</div>
                      <div className="mt-1 text-[10px] tracking-wide text-gray-600 uppercase sm:text-xs">
                        Members
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#303552]">3</div>
                      <div className="mt-1 text-[10px] tracking-wide text-gray-600 uppercase sm:text-xs">
                        Countries Reached
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PART 2: VALUES SECTION --- */}
        <div
          className={`grid gap-8 border-t border-white/5 pt-10 transition-all delay-300 duration-700 ease-out md:grid-cols-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* 1. Scripture-Centered */}
          <div className="group text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]/20 transition-all duration-300 group-hover:bg-[#a5876d]">
              <BookOpen className="h-8 w-8 text-[#a5876d] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-white">Scripture-Centered</h3>
            <p className="px-4 text-sm leading-relaxed text-gray-300">
              We believe the Bible is God&rsquo;s Word and the foundation for all faith and
              practice.
            </p>
          </div>

          {/* 2. Authentic Community */}
          <div className="group text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]/20 transition-all duration-300 group-hover:bg-[#a5876d]">
              <Users className="h-8 w-8 text-[#a5876d] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-white">Authentic Community</h3>
            <p className="px-4 text-sm leading-relaxed text-gray-300">
              We foster genuine relationships where people can grow together in faith and love.
            </p>
          </div>

          {/* 3. Global Impact */}
          <div className="group text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]/20 transition-all duration-300 group-hover:bg-[#a5876d]">
              <Globe className="h-8 w-8 text-[#a5876d] transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-white">Global Impact</h3>
            <p className="px-4 text-sm leading-relaxed text-gray-300">
              We are committed to sharing God&rsquo;s love locally and around the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
