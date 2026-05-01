"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function RequestsSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-20">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041927/Hero_zufgwz.jpg)",
        }}
      ></div>

      {/* Navy Blue Overlay with Low Opacity */}
      <div className="absolute inset-0 bg-[#303552]/50"></div>

      {/* Noise Effect Overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000000' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            We&rsquo;re Here For You!
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Whether you&rsquo;re new to faith or growing in your journey, we&rsquo;re here to walk
            alongside you.
          </p>
        </div>

        <div
          className={`mb-16 grid gap-8 transition-all delay-200 duration-700 ease-out md:grid-cols-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Card 1: I'm New Here */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#303552] p-10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-20"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]/20 transition-colors duration-300 group-hover:bg-[#a5876d]">
                <svg
                  className="h-8 w-8 text-[#a5876d] transition-colors duration-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Is this your first time here?</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-300">
                If this is your first time visiting ZOE Christian Assembly, get connected with us!
              </p>
              <Link
                href="/connect"
                className="cursor-pointer rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
              >
                I&rsquo;m New Here
              </Link>
            </div>
          </div>

          {/* Card 2: Prayer Request */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#303552] p-10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-20"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]/20 transition-colors duration-300 group-hover:bg-[#a5876d]">
                <svg
                  className="h-8 w-8 text-[#a5876d] transition-colors duration-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Have a prayer request?</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-300">
                Our team is here to pray with you! Submit your prayer request by clicking below.
              </p>
              <Link
                href="/prayer-request"
                className="cursor-pointer rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
              >
                Pray for Me
              </Link>
            </div>
          </div>

          {/* Card 3: Share Testimony */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#303552] p-10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-20"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]/20 transition-colors duration-300 group-hover:bg-[#a5876d]">
                <svg
                  className="h-8 w-8 text-[#a5876d] transition-colors duration-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Have a testimony to share?</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-300">
                We love hearing how your life has been impacted by the church and ministry!
              </p>
              <Link
                href="/share-testimony"
                className="cursor-pointer rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
              >
                Share My Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
