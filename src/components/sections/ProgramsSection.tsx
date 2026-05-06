"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarModal,
  ViewCalendarButton,
  useNextSpecialEvent,
} from "@/components/ui/CalendarModal";
import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SanitySiteSettings } from "@/sanity/types";

const FALLBACK_HEADING = "Church Programs";
const FALLBACK_SUBHEADING =
  "Join us for these special programs and grow together as a community in faith.";

interface ProgramsSectionProps {
  settings: SanitySiteSettings | null;
}

// Countdown calculator
function getCountdown(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, isOver: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isOver: false };
}

// Format date consistently to avoid hydration mismatch
function formatEventDate(date: Date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function ProgramsSection({ settings }: ProgramsSectionProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, isOver: false });
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const heading = settings?.programsHeading?.trim() || FALLBACK_HEADING;
  const subheading = settings?.programsSubheading?.trim() || FALLBACK_SUBHEADING;

  // Fetch next event from Sanity
  const { nextEvent } = useNextSpecialEvent();

  // Update countdown every minute
  useEffect(() => {
    if (!nextEvent) return;

    const updateCountdown = () => {
      setCountdown(getCountdown(nextEvent.date));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextEvent]);

  return (
    <section ref={sectionRef} className="bg-zoe-gray relative px-6 pt-10 pb-16">
      {/* Big Calendar Icon - Top Right */}
      <div className="pointer-events-none absolute -top-6 right-4 z-0 md:-top-14 md:right-16 lg:-top-20 lg:right-16">
        <svg
          className="text-zoe-navy h-16 w-16 opacity-[0.08] md:h-32 md:w-32 lg:h-40 lg:w-40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Main calendar body */}
          <rect x="3" y="5" width="18" height="16" rx="2" />
          {/* Horizontal line separating header */}
          <line x1="3" y1="10" x2="21" y2="10" />
          {/* Left pin */}
          <line x1="8" y1="3" x2="8" y2="7" strokeLinecap="round" />
          {/* Right pin */}
          <line x1="16" y1="3" x2="16" y2="7" strokeLinecap="round" />
        </svg>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-zoe-bronze/5 absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-zoe-navy/5 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-zoe-bronze/3 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-2xl"></div>
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23303552' fill-opacity='0.04'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-zoe-navy mb-6 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#666]">{subheading}</p>
        </div>

        {/* Programs Grid */}
        <div
          className={`mb-12 grid gap-8 transition-all delay-200 duration-700 ease-out md:grid-cols-2 lg:grid-cols-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* 1. Sunday Service */}
          <div className="group from-zoe-gray/80 relative overflow-hidden rounded-2xl bg-linear-to-b to-white/90 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15),0_35px_70px_-15px_rgba(48,53,82,0.4)]">
            <div className="relative z-10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center">
                  <svg
                    className="text-zoe-bronze h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div className="bg-zoe-navy rounded-full px-3 py-1 text-xs font-bold text-white uppercase">
                  Weekly
                </div>
              </div>
              <h3 className="text-zoe-navy mb-3 text-xl font-bold">Sunday Service</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Join us every Sunday for worship, fellowship, and powerful messages from God&apos;s
                Word.
              </p>
              <div className="mb-4 rounded-lg border border-white/40 bg-white/50 p-3 backdrop-blur-sm">
                <div className="text-zoe-navy text-lg font-bold">Every Sunday</div>
                <div className="text-sm text-gray-600">2:00 PM - 4:00 PM Eastern</div>
                <div className="mt-1 text-xs text-gray-500">906 Rue Galt E, Sherbrooke</div>
              </div>
              <Link
                href="https://us06web.zoom.us/j/87648045816?pwd=pdbWj5p8lmb25N41DR6VxBCDTG8oJP.1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zoe-bronze hover:text-zoe-navy text-sm font-semibold no-underline transition-colors"
              >
                Join Online â†’
              </Link>
            </div>
          </div>

          {/* 2. Evening Prayer Time */}
          <div className="group from-zoe-gray/80 relative overflow-hidden rounded-2xl bg-linear-to-b to-white/90 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15),0_35px_70px_-15px_rgba(48,53,82,0.4)]">
            <div className="relative z-10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center">
                  <svg className="text-zoe-bronze h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
                <div className="bg-zoe-navy rounded-full px-3 py-1 text-xs font-bold text-white uppercase">
                  Weekly
                </div>
              </div>
              <h3 className="text-zoe-navy mb-3 text-xl font-bold">Evening Prayer Time</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Join us for focused prayer and spiritual fellowship in the evening.
              </p>
              <div className="mb-4 rounded-lg border border-white/40 bg-white/50 p-3 backdrop-blur-sm">
                <div className="text-zoe-navy text-lg font-bold">Tuesday & Thursday</div>
                <div className="text-sm text-gray-600">8:00 PM - 9:00 PM Eastern</div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#2D8CFF" />
                    <rect x="6" y="8.5" width="8" height="7" rx="1" fill="white" />
                    <path d="M14 10.5L18 8.5V15.5L14 13.5V10.5Z" fill="white" />
                  </svg>
                  On Zoom
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bible Study */}
          <div className="group from-zoe-gray/80 relative overflow-hidden rounded-2xl bg-linear-to-b to-white/90 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15),0_35px_70px_-15px_rgba(48,53,82,0.4)]">
            <div className="relative z-10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center">
                  <svg className="text-zoe-bronze h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <div className="bg-zoe-navy rounded-full px-3 py-1 text-xs font-bold text-white uppercase">
                  Bi-Weekly
                </div>
              </div>
              <h3 className="text-zoe-navy mb-3 text-xl font-bold">Bible Study</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Deep Bible study with coffee and snacks every two weeks.
              </p>
              <div className="mb-4 rounded-lg border border-white/40 bg-white/50 p-3 backdrop-blur-sm">
                <div className="text-zoe-navy text-lg font-bold">Every Two Weeks - Friday</div>
                <div className="text-sm text-gray-600">6:00 PM - 8:00 PM Eastern</div>
                <div className="mt-1 text-xs text-gray-500">Coffee & Snacks Included</div>
              </div>
            </div>
          </div>

          {/* 4. Monthly Prayer Day */}
          <div className="group from-zoe-gray/80 relative overflow-hidden rounded-2xl bg-linear-to-b to-white/90 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15),0_35px_70px_-15px_rgba(48,53,82,0.4)]">
            <div className="relative z-10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center">
                  <svg
                    className="text-zoe-bronze h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="bg-zoe-navy rounded-full px-3 py-1 text-xs font-bold text-white uppercase">
                  Monthly
                </div>
              </div>
              <h3 className="text-zoe-navy mb-3 text-xl font-bold">Monthly Prayer Day</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                A full day dedicated to prayer, fasting, and seeking God&apos;s presence together.
              </p>
              <div className="mb-4 rounded-lg border border-white/40 bg-white/50 p-3 backdrop-blur-sm">
                <div className="text-zoe-navy text-lg font-bold">Last Week of Month</div>
                <div className="text-sm text-gray-600">All Day Prayer & Fasting</div>
                <div className="mt-1 text-xs text-gray-500">906 Rue Galt E, Sherbrooke</div>
              </div>
            </div>
          </div>

          {/* 5. Special Events - Dynamic with Countdown */}
          <div className="group from-zoe-gray/80 relative overflow-hidden rounded-2xl bg-linear-to-b to-white/90 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15),0_35px_70px_-15px_rgba(48,53,82,0.4)]">
            {/* Decorative gradient overlay for special events */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: nextEvent
                  ? `linear-gradient(135deg, ${nextEvent.color}40 0%, transparent 60%)`
                  : "linear-gradient(135deg, #a5876d40 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center">
                  <Star className="fill-zoe-bronze/20 text-zoe-bronze h-8 w-8" />
                </div>
                <div
                  className="rounded-full px-3 py-1 text-xs font-bold text-white uppercase"
                  style={{ backgroundColor: nextEvent?.color || "#303552" }}
                >
                  Upcoming
                </div>
              </div>

              {nextEvent ? (
                <>
                  <h3 className="text-zoe-navy mb-2 text-xl font-bold">{nextEvent.name}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {nextEvent.description}
                  </p>

                  {/* Countdown */}
                  {!countdown.isOver && (
                    <div className="mb-4 flex justify-center gap-2">
                      <div className="bg-zoe-navy min-w-[60px] rounded-lg px-3 py-2 text-center text-white">
                        <div className="text-xl font-bold">{countdown.days}</div>
                        <div className="text-[10px] tracking-wide uppercase opacity-70">Days</div>
                      </div>
                      <div className="bg-zoe-navy min-w-[60px] rounded-lg px-3 py-2 text-center text-white">
                        <div className="text-xl font-bold">{countdown.hours}</div>
                        <div className="text-[10px] tracking-wide uppercase opacity-70">Hours</div>
                      </div>
                      <div className="bg-zoe-navy min-w-[60px] rounded-lg px-3 py-2 text-center text-white">
                        <div className="text-xl font-bold">{countdown.minutes}</div>
                        <div className="text-[10px] tracking-wide uppercase opacity-70">Mins</div>
                      </div>
                    </div>
                  )}

                  <div className="mb-4 rounded-lg border border-white/40 bg-white/50 p-3 backdrop-blur-sm">
                    <div className="text-zoe-navy text-lg font-bold">
                      {formatEventDate(nextEvent.date)}
                    </div>
                    <div className="text-sm text-gray-600">{nextEvent.time}</div>
                    <div className="mt-1 text-xs text-gray-500">{nextEvent.location}</div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-zoe-navy mb-3 text-xl font-bold">Special Events</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    Stay tuned for upcoming special events and celebrations.
                  </p>
                  <div className="mb-4 rounded-lg border border-white/40 bg-white/50 p-3 backdrop-blur-sm">
                    <div className="text-zoe-navy text-lg font-bold">Coming Soon</div>
                    <div className="text-sm text-gray-600">New events being planned</div>
                  </div>
                </>
              )}

              <button
                onClick={() => setIsCalendarOpen(true)}
                className="text-zoe-bronze hover:text-zoe-navy mb-0 text-sm font-semibold transition-colors"
              >
                View All Events â†’
              </button>
            </div>
          </div>
        </div>

        {/* View Calendar Button */}
        <div
          className={`flex justify-center transition-all delay-400 duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <ViewCalendarButton onClick={() => setIsCalendarOpen(true)} />
        </div>

        {/* Calendar Modal */}
        <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      </div>
    </section>
  );
}
