"use client";

import Link from "next/link";
import { User } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function OurStaffPage() {
  const boardMembers = [
    { name: "NORBERT ABAYISENGA" },
    { name: "DAMIEN" },
    { name: "CLAUDINE" },
    { name: "CELESTE SEMINEGA UWAMAHORO" },
  ];

  const committeeMembers = [
    { name: "NORBERT ABAYISENGA", role: "Coordinator" },
    { name: "ALINE NEGEREYIMANA", role: "Treasurer & Children Ministry Leader" },
    { name: "DENYS KAGAME", role: "Worship & Media Team Leader" },
    { name: "SOLANGE IMUDUHAYE", role: "Programs Scheduling" },
    { name: "CELESTE SEMINEGA UWAMAHORO", role: "Outreach" },
  ];

  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Our Staff"
        subtitle="Meet the dedicated leaders who serve our church family with passion and commitment."
        badge="Leadership"
      />

      {/* Board Members Section */}
      <section className="bg-[#ececec] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#303552] md:text-3xl">Board Members</h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#ececec] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-[#303552]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-24 w-24 text-white/20" />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#a5876d]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                {/* Info Container */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-[#303552] transition-colors duration-300 group-hover:text-[#a5876d]">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold tracking-widest text-[#a5876d] uppercase">
              Ministry Teams
            </span>
            <h2 className="mt-2 mb-3 text-2xl font-bold text-[#303552] md:text-3xl">
              Committee Members
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {committeeMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#ececec] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-[#a5876d]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-24 w-24 text-white/20" />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#303552]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                {/* Info Container */}
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-lg font-bold text-[#303552] transition-colors duration-300 group-hover:text-[#a5876d]">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold tracking-wider text-[#a5876d] uppercase">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#303552] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Want to Serve?</h2>
          <div className="mx-auto mb-6 h-0.5 w-16 bg-[#a5876d]"></div>
          <p className="mb-8 text-lg leading-relaxed text-white/80">
            We&apos;re always looking for passionate individuals to join our ministry teams. Contact
            us to learn more about serving opportunities.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
            >
              Get Involved
            </Link>
            <a
              href="https://us06web.zoom.us/j/87648045816?pwd=pdbWj5p8lmb25N41DR6VxBCDTG8oJP.1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#ececec] bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#ececec] hover:text-[#303552]"
            >
              Join Online
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
