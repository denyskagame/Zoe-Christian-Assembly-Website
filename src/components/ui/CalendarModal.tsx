"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Calendar, Star } from "lucide-react";
import { getCalendarEvents, getUpcomingCalendarEvents, CalendarEvent } from "@/sanity/lib/events";
import { useModal } from "@/contexts/ModalContext";

// Default Zoom link for Evening Prayer
const DEFAULT_ZOOM_LINK =
  "https://us06web.zoom.us/j/87648045816?pwd=pdbWj5p8lmb25N41DR6VxBCDTG8oJP.1";

// Program types with their colors (regular recurring programs)
const PROGRAM_TYPES = {
  sunday: {
    name: "Sunday Service",
    color: "#a5876d",
    time: "2:00 PM - 4:00 PM",
    location: "906 Rue Galt E, Sherbrooke",
  },
  evening_prayer: {
    name: "Evening Prayer",
    color: "#2D8CFF",
    time: "8:00 PM - 9:00 PM",
    location: "On Zoom",
    zoomLink: DEFAULT_ZOOM_LINK,
  },
  bible_study: {
    name: "Bible Study",
    color: "#27ae60",
    time: "6:00 PM - 8:00 PM",
    location: "906 Rue Galt E, Sherbrooke",
  },
  monthly_prayer: {
    name: "Monthly Prayer Day",
    color: "#e74c3c",
    time: "All Day",
    location: "906 Rue Galt E, Sherbrooke",
  },
};

// Re-export CalendarEvent as SpecialEvent for backward compatibility
export type SpecialEvent = CalendarEvent;

// Hook to fetch and cache special events from Sanity
export function useSpecialEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const calendarEvents = await getCalendarEvents();
        setEvents(calendarEvents);
      } catch (error) {
        console.error("Failed to fetch events from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return { events, loading };
}

// Hook to get next upcoming event from Sanity
export function useNextSpecialEvent() {
  const [nextEvent, setNextEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNextEvent() {
      try {
        const upcomingEvents = await getUpcomingCalendarEvents();
        setNextEvent(upcomingEvents[0] || null);
      } catch (error) {
        console.error("Failed to fetch next event from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNextEvent();
  }, []);

  return { nextEvent, loading };
}

type ProgramType = keyof typeof PROGRAM_TYPES | "special";

interface DayProgram {
  type: ProgramType;
  name: string;
  color: string;
  time: string;
  location: string;
  description?: string;
  isSpecial?: boolean;
  isOnline?: boolean;
  zoomLink?: string;
}

// Helper to get special events for a specific date from the events array
function getSpecialEventsForDate(date: Date, specialEvents: CalendarEvent[]): CalendarEvent[] {
  return specialEvents.filter(
    (event) =>
      event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getDate() === date.getDate()
  );
}

// Helper to get programs for a specific date
function getProgramsForDate(
  date: Date,
  biWeeklyFridayStart: Date,
  specialEvents: CalendarEvent[]
): DayProgram[] {
  const programs: DayProgram[] = [];
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Sunday Service
  if (dayOfWeek === 0) {
    programs.push({ type: "sunday", ...PROGRAM_TYPES.sunday });
  }

  // Evening Prayer - Tuesday & Thursday
  if (dayOfWeek === 2 || dayOfWeek === 4) {
    programs.push({
      type: "evening_prayer",
      ...PROGRAM_TYPES.evening_prayer,
      isOnline: true,
      zoomLink: PROGRAM_TYPES.evening_prayer.zoomLink,
    });
  }

  // Bible Study - Bi-weekly Friday
  if (dayOfWeek === 5) {
    const diffTime = date.getTime() - biWeeklyFridayStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks >= 0 && diffWeeks % 2 === 0) {
      programs.push({ type: "bible_study", ...PROGRAM_TYPES.bible_study });
    }
  }

  // Monthly Prayer - Last Saturday
  if (dayOfWeek === 6) {
    const nextSaturday = dayOfMonth + 7;
    if (nextSaturday > daysInMonth) {
      programs.push({ type: "monthly_prayer", ...PROGRAM_TYPES.monthly_prayer });
    }
  }

  // Add special events for this date from Sanity
  const eventsForDate = getSpecialEventsForDate(date, specialEvents);
  eventsForDate.forEach((event) => {
    programs.unshift({
      type: "special",
      name: event.name,
      color: event.color,
      time: event.time,
      location: event.location,
      description: event.description,
      isSpecial: true,
      isOnline: event.isOnline,
      zoomLink: event.zoomLink,
    });
  });

  return programs;
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const days: (Date | null)[] = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
}

const MONTH_NAMES = [
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

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { setIsModalOpen } = useModal();

  // Fetch special events from Sanity
  const { events: specialEvents } = useSpecialEvents();

  // Sync modal-open state with the global ModalContext.
  useEffect(() => {
    setIsModalOpen(isOpen);
    return () => setIsModalOpen(false);
  }, [isOpen, setIsModalOpen]);

  // Reset to current month and clear selection each time the modal opens.
  // See https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      const now = new Date();
      setCurrentMonth(now.getMonth());
      setCurrentYear(now.getFullYear());
      setSelectedDate(null);
    }
  }

  const biWeeklyFridayStart = useMemo(() => new Date(2026, 0, 3), []);

  const calendarDays = useMemo(
    () => getCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    setSelectedDate(null);
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setSelectedDate(null);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const now = new Date();
    return date.toDateString() === now.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const selectedDatePrograms = useMemo(() => {
    if (!selectedDate) return [];
    return getProgramsForDate(selectedDate, biWeeklyFridayStart, specialEvents);
  }, [selectedDate, biWeeklyFridayStart, specialEvents]);

  if (!isOpen) return null;

  // Use portal to render modal at document body level
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[9998] bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className="pointer-events-auto relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-[#ececec] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="flex-shrink-0 bg-[#303552] p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Program Calendar</h3>
                  <p className="text-xs text-white/70">Select a date to view programs</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Close calendar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Color Legend - Hidden when date is selected */}
            {!selectedDate && (
              <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-1 rounded-lg bg-white/10 py-2">
                {Object.entries(PROGRAM_TYPES).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: value.color }}
                    />
                    <span className="text-[10px] text-white/80">{value.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Date Info */}
            {selectedDate && (
              <div className="mb-4 rounded-lg bg-white/10 p-3">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#a5876d]"></div>
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </h4>
                {selectedDatePrograms.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDatePrograms.map((program, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg bg-white/10 p-2"
                      >
                        <div
                          className="h-6 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: program.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 truncate text-sm font-semibold text-white">
                            {program.isSpecial && (
                              <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />
                            )}
                            {program.name}
                          </div>
                          {program.description && (
                            <div className="mb-0.5 truncate text-[10px] text-white/50">
                              {program.description}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-white/70">
                            <span>{program.time}</span>
                            <span className="text-white/40">•</span>
                            <span className="flex items-center gap-1 truncate">
                              {(program.location === "On Zoom" || program.isOnline) && (
                                <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" fill="#2D8CFF" />
                                  <rect x="6" y="8.5" width="8" height="7" rx="1" fill="white" />
                                  <path d="M14 10.5L18 8.5V15.5L14 13.5V10.5Z" fill="white" />
                                </svg>
                              )}
                              {program.location}
                            </span>
                          </div>
                        </div>
                        {/* Join on Zoom button for online programs - positioned on the right */}
                        {(program.location === "On Zoom" || program.isOnline) &&
                          program.zoomLink && (
                            <a
                              href={program.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#2D8CFF] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1a6fd4]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" fill="white" />
                                <rect x="6" y="8.5" width="8" height="7" rx="1" fill="#2D8CFF" />
                                <path d="M14 10.5L18 8.5V15.5L14 13.5V10.5Z" fill="#2D8CFF" />
                              </svg>
                              Join
                            </a>
                          )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-xs text-white/60">No programs scheduled</p>
                )}
              </div>
            )}

            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={goToPreviousMonth}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="text-lg font-semibold">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </div>
                <button
                  onClick={goToToday}
                  className="text-[10px] font-medium tracking-wider text-[#a5876d] uppercase transition-colors hover:text-white"
                >
                  Today
                </button>
              </div>

              <button
                onClick={goToNextMonth}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="mt-4 grid grid-cols-7 gap-2">
              {DAY_NAMES.map((day) => (
                <div key={day} className="py-2 text-center text-xs font-semibold text-white/60">
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-6">
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((date, index) => {
                const programs = date
                  ? getProgramsForDate(date, biWeeklyFridayStart, specialEvents)
                  : [];
                const hasPrograms = programs.length > 0;
                const hasSpecialEvent = programs.some((p) => p.isSpecial);

                return (
                  <button
                    key={index}
                    onClick={() => date && setSelectedDate(date)}
                    disabled={!date}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl p-1 transition-all duration-200 ${!date ? "cursor-default" : "cursor-pointer hover:bg-[#303552]/5"} ${isToday(date) ? "ring-2 ring-[#a5876d]" : ""} ${isSelected(date) ? "scale-105 bg-[#303552] shadow-lg" : ""} ${hasSpecialEvent && !isSelected(date) ? "bg-gradient-to-br from-yellow-50 to-orange-50" : ""} `}
                  >
                    {date && (
                      <>
                        {/* Special event star indicator */}
                        {hasSpecialEvent && (
                          <Star
                            className={`absolute top-0.5 right-0.5 h-2.5 w-2.5 ${
                              isSelected(date)
                                ? "fill-yellow-300 text-yellow-300"
                                : "fill-yellow-500 text-yellow-500"
                            }`}
                          />
                        )}
                        <span
                          className={`text-sm leading-none font-medium ${isSelected(date) ? "text-white" : "text-[#303552]"} ${isToday(date) && !isSelected(date) ? "font-bold text-[#a5876d]" : ""} `}
                        >
                          {date.getDate()}
                        </span>

                        {hasPrograms && (
                          <div className="mt-1 flex gap-0.5">
                            {programs.slice(0, 3).map((program, i) => (
                              <div
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full ${isSelected(date) ? "opacity-90" : ""}`}
                                style={{
                                  backgroundColor: isSelected(date) ? "white" : program.color,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

// Button component to trigger the calendar modal
interface ViewCalendarButtonProps {
  onClick: () => void;
  className?: string;
}

export function ViewCalendarButton({ onClick, className = "" }: ViewCalendarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-2xl ${className} `}
    >
      <Calendar className="h-4 w-4" />
      <span>View Calendar</span>
    </button>
  );
}
