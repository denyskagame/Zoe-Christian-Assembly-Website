"use client";

import Link from "next/link";
import { Heart, BookOpen, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function KidsPage() {
  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Zoe Kids"
        subtitle="A fun, safe environment where children learn about God's love through interactive lessons, games, worship, and creative activities."
        badge="Ages 3-12"
      />

      {/* What We Offer */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#303552] md:text-3xl">What We Offer</h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#303552]/10">
                <BookOpen className="h-7 w-7 text-[#303552]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#303552]">Bible Stories</h3>
              <p className="text-gray-600">
                Age-appropriate Bible lessons that bring Scripture to life through storytelling,
                puppets, and visual aids.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#a5876d]/10">
                <Heart className="h-7 w-7 text-[#a5876d]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#303552]">Worship & Songs</h3>
              <p className="text-gray-600">
                Fun, engaging worship songs with actions that help children express their love for
                God.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#303552]/10">
                <Users className="h-7 w-7 text-[#303552]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#303552]">Games & Activities</h3>
              <p className="text-gray-600">
                Interactive games, crafts, and activities that reinforce biblical truths in
                memorable ways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-[#ececec] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-4 text-2xl font-bold text-[#303552] md:text-3xl">When We Meet</h2>
              <div className="mb-6 h-0.5 w-16 bg-[#a5876d]"></div>
              <p className="mb-6 text-gray-600">
                Zoe Kids meets every Sunday during our main worship service. Children are welcomed
                at the beginning of service and dismissed to their age-appropriate classes after
                worship.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-[#ECECEC] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#a5876d]">
                    <span className="font-bold text-white">SUN</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#303552]">Sunday Service</div>
                    <div className="text-sm text-gray-500">2:00 PM - 4:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 justify-center">
              <div className="relative">
                <div className="flex h-64 w-64 items-center justify-center rounded-full bg-[#303552]/10">
                  <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#a5876d]/20">
                    <span className="text-7xl">📖</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-[#303552] p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Your Child&apos;s Safety is Our Priority
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              All our volunteers are trained and background-checked. We maintain secure
              check-in/check-out procedures and keep adult-to-child ratios that ensure personalized
              attention for every child.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
