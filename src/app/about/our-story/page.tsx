"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Users, Building, Zap, Eye, Target, Award } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function OurStoryPage() {
  const [activeTab, setActiveTab] = useState<"vision" | "mission" | "values">("vision");

  const timelineItems = [
    {
      year: "End of 2022",
      title: "The Beginning",
      description:
        "ZOE Christian Assembly began in the most humble of settings - the basement of a family home in Sherbrooke. Founded by NORBERT ABAYISENGE with his family, this small gathering of three people carried a mighty vision: to create a community where people could experience the abundant life that Jesus promised. In that simple basement, with hearts full of faith and determination, they began to worship, pray, and study God's Word together, believing that God would multiply their small beginning into something extraordinary.",
      icon: Calendar,
      position: "left",
    },
    {
      year: "2023",
      title: "Growing Together",
      description:
        "God's faithfulness was evident as our small basement gathering grew into a thriving community of 14 dedicated believers throughout 2023. What started as a family vision expanded into a spiritual family, with new members drawn by the authentic love and powerful presence of God in our midst. Each person who joined brought their unique gifts and testimonies, creating a rich tapestry of faith. We established regular prayer meetings, Bible studies, and fellowship gatherings, watching in awe as God used our diverse backgrounds to strengthen and encourage one another in the faith.",
      icon: Users,
      position: "right",
    },
    {
      year: "2024",
      title: "Deepening Roots",
      description:
        "Throughout 2024, we continued to flourish in our beloved basement sanctuary, deepening our relationships with God and each other. This year marked a season of spiritual maturity and preparation as we established stronger foundations through consistent prayer meetings, Bible studies, and fellowship. God was preparing our hearts for the bigger blessing He had in store, teaching us that it's not the size of the space that matters, but the size of our faith and the depth of our love for one another.",
      icon: Building,
      position: "left",
    },
    {
      year: "2025+",
      title: "Our New Beginning & Beyond",
      description:
        "In early 2025, by God's incredible provision and guidance, we made the momentous transition from our beloved basement sanctuary to a beautiful church home at 906 Rue Galt E in the heart of Sherbrooke. This sacred space became our new sanctuary where believers from all walks of life could gather, worship, and experience the transforming power of God's presence together. Today, our community continues to flourish and grow beyond what we could have imagined from those early basement days. Through daily morning prayers, evening prayer sessions, Bible studies, and community fellowship, we empower people to discover and live the abundant life that Jesus promised. Every Sunday from 2:00 PM to 4:00 PM, our church doors open wide, creating a ripple effect of God's love and transformation that will echo for generations.",
      icon: Zap,
      position: "right",
      featured: true,
    },
  ];

  const values = [
    {
      title: "Scripture-Centered",
      description:
        "We believe the Bible is God's inspired Word and the foundation for life and faith.",
    },
    {
      title: "Prayer-Driven",
      description: "We depend on God through prayer in all we do, seeking His guidance and power.",
    },
    {
      title: "Spirit-Empowered",
      description: "We rely on the Holy Spirit to transform lives and empower ministry.",
    },
    {
      title: "Love-Motivated",
      description: "We are motivated by God's love to love Him and love others unconditionally.",
    },
  ];

  const missionPoints = [
    { icon: "📖", text: "Teach Biblical Truth" },
    { icon: "🤝", text: "Build Authentic Relationships" },
    { icon: "🌱", text: "Grow Disciples" },
    { icon: "❤️", text: "Serve Our Community" },
  ];

  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Our Story"
        subtitle="A journey of faith, hope, and abundant life in Christ. Discover how God has been faithful in building His church."
        badge="About Us"
      />

      {/* Timeline Section */}
      <section className="bg-[#ececec] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#303552] md:text-3xl">Where We Began</h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-gradient-to-b from-[#a5876d] via-[#a5876d] to-transparent md:block"></div>

            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    item.position === "left" ? "md:justify-end" : "md:ml-auto md:justify-start"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      item.position === "left" ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`group rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        item.featured
                          ? "bg-[#303552] text-white"
                          : "border border-gray-200 bg-[#ececec] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]"
                      }`}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            item.featured ? "bg-[#a5876d]" : "bg-[#a5876d]/20"
                          }`}
                        >
                          <item.icon
                            className={`h-6 w-6 ${item.featured ? "text-white" : "text-[#a5876d]"}`}
                          />
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              item.featured ? "text-white" : "text-[#303552]"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-sm font-semibold ${item.featured ? "text-[#a5876d]" : "text-[#a5876d]"}`}
                          >
                            {item.year}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`leading-relaxed ${
                          item.featured ? "text-gray-200" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-1/2 z-10 hidden -translate-x-1/2 transform rounded-full border-4 border-[#ECECEC] md:block ${
                      item.featured ? "h-8 w-8 animate-pulse bg-[#a5876d]" : "h-6 w-6 bg-[#a5876d]"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="bg-[#303552] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">What Drives Us</h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {(["vision", "mission", "values"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-8 py-3 font-bold tracking-wide uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? "scale-105 bg-[#a5876d] text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[350px]">
            {activeTab === "vision" && (
              <div className="rounded-2xl border border-[#a5876d]/20 bg-white/5 p-8 backdrop-blur-sm md:p-12">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="mb-6 text-xl leading-relaxed text-gray-200">
                  To be a vibrant community where every person experiences the abundant life Jesus
                  promised, discovering their purpose and living fully alive in Christ.
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div className="rounded-xl bg-white/5 p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-[#a5876d]">∞</div>
                    <p className="text-gray-300">Abundant Life</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-[#a5876d]">♥</div>
                    <p className="text-gray-300">Community</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-[#a5876d]">✝</div>
                    <p className="text-gray-300">Christ-Centered</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="rounded-2xl border border-[#a5876d]/20 bg-white/5 p-8 backdrop-blur-sm md:p-12">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="mb-8 text-xl leading-relaxed text-gray-200">
                  To empower people to live the life of Jesus abundantly by teaching God&apos;s
                  Word, fostering authentic community, and equipping believers to make disciples.
                </p>
                <div className="space-y-4">
                  {missionPoints.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-xl bg-white/5 p-4 transition-colors duration-300 hover:bg-white/10"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-lg font-semibold text-gray-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="rounded-2xl border border-[#a5876d]/20 bg-white/5 p-8 backdrop-blur-sm md:p-12">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Core Values</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="group rounded-xl bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
                    >
                      <h4 className="mb-3 text-xl font-bold text-[#a5876d] transition-transform duration-300 group-hover:scale-105">
                        {value.title}
                      </h4>
                      <p className="leading-relaxed text-gray-300">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-[#303552] md:text-3xl">Join Our Story</h2>
          <div className="mx-auto mb-6 h-0.5 w-16 bg-[#a5876d]"></div>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            Your story matters. Come be part of a community where you belong, where you can grow,
            and where you can make a difference.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
            >
              Visit Us
            </Link>
            <a
              href="https://us06web.zoom.us/j/87648045816?pwd=pdbWj5p8lmb25N41DR6VxBCDTG8oJP.1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#303552] bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-[#303552] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:text-[#ececec]"
            >
              Join Online
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
