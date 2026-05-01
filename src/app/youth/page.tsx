"use client";

import Link from "next/link";
import { Users, BookOpen, Music, MessageCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function YouthPage() {
  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Youth Ministry"
        subtitle="A vibrant community where teens can grow in their faith, build lasting friendships, and discover their God-given purpose."
        badge="Ages 13-18"
      />

      {/* What We Do */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#303552] md:text-3xl">What We Do</h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#303552]/10">
                <BookOpen className="h-6 w-6 text-[#303552]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#303552]">Bible Study</h3>
              <p className="text-sm text-gray-600">
                Deep dives into Scripture that address real-life issues teens face today.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#a5876d]/10">
                <Music className="h-6 w-6 text-[#a5876d]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#303552]">Worship</h3>
              <p className="text-sm text-gray-600">
                Contemporary worship that connects young hearts to God&apos;s presence.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#303552]/10">
                <Users className="h-6 w-6 text-[#303552]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#303552]">Small Groups</h3>
              <p className="text-sm text-gray-600">
                Intimate groups where teens can share, pray, and grow together.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#a5876d]/10">
                <MessageCircle className="h-6 w-6 text-[#a5876d]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#303552]">Mentorship</h3>
              <p className="text-sm text-gray-600">
                One-on-one guidance from caring adult leaders who invest in each teen.
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
                Join us for our weekly gatherings where we worship, learn, and grow together. We
                also have special events throughout the year including retreats, outreach projects,
                and fun activities.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-[#ECECEC] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#303552]">
                    <span className="font-bold text-white">FRI</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#303552]">Friday Night Youth</div>
                    <div className="text-sm text-gray-500">6:00 PM - 8:30 PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-[#ECECEC] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#a5876d]">
                    <span className="font-bold text-white">SUN</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#303552]">Sunday Service</div>
                    <div className="text-sm text-gray-500">
                      Join main service with the church family
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 justify-center">
              <div className="relative">
                <div className="flex h-64 w-64 items-center justify-center rounded-full bg-[#303552]/10">
                  <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#a5876d]/20">
                    <span className="text-7xl">🔥</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-[#303552] p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Ready to Join Us?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              Whether you&apos;re new to faith or have been walking with God for years, there&apos;s
              a place for you here. Come as you are and experience community that will change your
              life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
              >
                Get Connected
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#ececec] bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#ececec] hover:text-[#303552]"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
