"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Heart, Flame, Church, Cross } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function WhatWeBelievePage() {
  const beliefs = [
    {
      title: "The Bible",
      description:
        "We believe the Bible is the inspired, infallible Word of God, our final authority for faith and life.",
      icon: BookOpen,
    },
    {
      title: "God",
      description:
        "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
      icon: Sparkles,
    },
    {
      title: "Jesus Christ",
      description:
        "We believe Jesus Christ is the Son of God, fully God and fully man, who died for our sins and rose again.",
      icon: Cross,
    },
    {
      title: "Salvation",
      description:
        "We believe salvation is a gift of God's grace through faith in Jesus Christ, not by works.",
      icon: Heart,
    },
    {
      title: "The Holy Spirit",
      description:
        "We believe in the Holy Spirit, the Lord, the giver of life. He proceeds from the Father and the Son, and with the Father and the Son is worshipped and glorified.",
      icon: Flame,
    },
    {
      title: "The Church",
      description:
        "We believe the Church is the body of Christ, called to worship, fellowship, and share the Gospel.",
      icon: Church,
    },
  ];

  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="What We Believe"
        subtitle="Our faith is built on the unchanging truths of God's Word. Here are the core beliefs that guide our church."
        badge="Our Faith"
      />

      {/* Core Beliefs Section */}
      <section className="bg-[#ececec] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((belief, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-gray-200 bg-[#ececec] p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#a5876d]/10 transition-transform duration-300 group-hover:scale-110">
                  <belief.icon className="h-8 w-8 text-[#a5876d]" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#303552] transition-colors duration-300 group-hover:text-[#a5876d]">
                  {belief.title}
                </h3>
                <p className="leading-relaxed text-gray-600">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement of Faith Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#303552] md:text-3xl">
              Our Statement of Faith
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#ececec] p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] md:p-12">
            <div className="space-y-6 leading-relaxed text-gray-600">
              <p>
                We believe in one God, eternally existing in three persons: Father, Son, and Holy
                Spirit. We believe that God created the heavens and the earth, and that He sustains
                all things by His power.
              </p>
              <p>
                We believe that Jesus Christ is the Son of God, conceived by the Holy Spirit, born
                of the Virgin Mary. He lived a sinless life, died on the cross as a sacrifice for
                our sins, was buried, and rose again on the third day. He ascended into heaven and
                is seated at the right hand of the Father.
              </p>
              <p>
                We believe that salvation is by grace through faith in Jesus Christ alone. It is the
                gift of God and not by works, so that no one can boast. All who believe in Him are
                justified by His grace and have eternal life.
              </p>
              <p>
                We believe in the baptism of the Holy Spirit, who indwells all believers and
                empowers them for service. We believe in the spiritual gifts given by the Holy
                Spirit for the edification of the Church.
              </p>
              <p>
                We believe Jesus Christ will return personally and visibly to establish His kingdom.
                We believe in the resurrection of both the saved and the lost: the saved to eternal
                life, and the lost to eternal separation from God.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#303552] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Want to Learn More?</h2>
          <div className="mx-auto mb-6 h-0.5 w-16 bg-[#a5876d]"></div>
          <p className="mb-8 text-lg leading-relaxed text-white/80">
            Join us for our weekly Bible studies and Sunday services to grow deeper in your
            understanding of God&apos;s Word.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/about/our-story"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#ececec] bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#ececec] hover:text-[#303552]"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
