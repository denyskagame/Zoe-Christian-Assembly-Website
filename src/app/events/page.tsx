"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, X, Star, ExternalLink } from "lucide-react";
import { getAllEvents, CalendarEvent, sanityEventToCalendarEvent } from "@/sanity/lib/events";
import PageHeader from "@/components/ui/PageHeader";

// Event Detail Modal Component
function EventDetailModal({
  event,
  isOpen,
  onClose,
}: {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}) {
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

  if (!isOpen || !event) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="animate-in fade-in fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div
          className="animate-in slide-in-from-bottom-4 fade-in pointer-events-auto relative max-h-[90vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-2xl bg-[#ececec] shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Event Image / Header */}
          {event.image ? (
            <div className="relative aspect-[16/9] w-full">
              <Image src={event.image} alt={event.name} fill className="object-cover" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-bold text-white uppercase">
                  <Star className="h-3 w-3 fill-white" />
                  Featured
                </div>
              )}
              {/* Title on Image */}
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">{event.name}</h2>
              </div>
            </div>
          ) : (
            <div className="relative w-full px-6 py-12" style={{ backgroundColor: event.color }}>
              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-bold text-white uppercase">
                  <Star className="h-3 w-3 fill-white" />
                  Featured
                </div>
              )}
              <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
                {event.name}
              </h2>
            </div>
          )}

          {/* Event Details */}
          <div className="p-6">
            {/* Date, Time, Location */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  <Calendar className="h-5 w-5" style={{ color: event.color }} />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase">Date</div>
                  <div className="font-semibold text-[#303552]">
                    {event.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  <Clock className="h-5 w-5" style={{ color: event.color }} />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase">Time</div>
                  <div className="font-semibold text-[#303552]">{event.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  {event.isOnline ? (
                    <svg
                      className="h-5 w-5"
                      style={{ color: event.color }}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
                      <rect x="6" y="8.5" width="8" height="7" rx="1" fill="currentColor" />
                      <path d="M14 10.5L18 8.5V15.5L14 13.5V10.5Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <MapPin className="h-5 w-5" style={{ color: event.color }} />
                  )}
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase">Location</div>
                  <div className="font-semibold text-[#303552]">{event.location}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-bold text-[#303552]">About This Event</h3>
                <p className="leading-relaxed text-gray-600">{event.description}</p>
              </div>
            )}

            {/* Join Button for Online Events */}
            {event.isOnline && event.zoomLink && (
              <a
                href={event.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2D8CFF] px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#1a6fd1] hover:shadow-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2" />
                  <rect x="6" y="8.5" width="8" height="7" rx="1" fill="white" />
                  <path d="M14 10.5L18 8.5V15.5L14 13.5V10.5Z" fill="white" />
                </svg>
                Join on Zoom
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Event Card Component
function EventCard({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  const isPast = event.date < new Date();

  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-2xl bg-[#ececec] text-left shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)] ${
        isPast ? "opacity-60" : "hover:-translate-y-2"
      }`}
    >
      {/* Image or Color Header */}
      {event.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-[10px] font-bold text-white uppercase">
              <Star className="h-2.5 w-2.5 fill-white" />
              Featured
            </div>
          )}
          {/* Date Badge */}
          <div className="absolute top-3 right-3 rounded-lg bg-[#ececec] px-3 py-2 text-center shadow-lg">
            <div className="text-xs font-bold text-[#303552] uppercase">
              {event.date.toLocaleDateString("en-US", { month: "short" })}
            </div>
            <div className="text-2xl leading-none font-bold text-[#303552]">
              {event.date.getDate()}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="relative flex aspect-[16/10] w-full items-center justify-center"
          style={{ backgroundColor: event.color }}
        >
          {/* Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-[10px] font-bold text-white uppercase">
              <Star className="h-2.5 w-2.5 fill-white" />
              Featured
            </div>
          )}
          {/* Date Badge */}
          <div className="absolute top-3 right-3 rounded-lg bg-[#ececec] px-3 py-2 text-center shadow-lg">
            <div className="text-xs font-bold text-[#303552] uppercase">
              {event.date.toLocaleDateString("en-US", { month: "short" })}
            </div>
            <div className="text-2xl leading-none font-bold text-[#303552]">
              {event.date.getDate()}
            </div>
          </div>
          {/* Calendar Icon */}
          <Calendar className="h-16 w-16 text-white/30" />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Color indicator line */}
        <div className="mb-3 h-1 w-12 rounded-full" style={{ backgroundColor: event.color }} />

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[#303552] transition-colors group-hover:text-[#a5876d]">
          {event.name}
        </h3>

        {event.description && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-500">{event.description}</p>
        )}

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#a5876d]" />
            <span>{event.startTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {event.isOnline ? (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#2D8CFF" />
                  <rect x="6" y="8.5" width="8" height="7" rx="1" fill="white" />
                  <path d="M14 10.5L18 8.5V15.5L14 13.5V10.5Z" fill="white" />
                </svg>
                <span className="font-medium text-[#2D8CFF]">Zoom</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 text-[#a5876d]" />
                <span className="max-w-[150px] truncate">{event.location}</span>
              </>
            )}
          </div>
        </div>

        {/* Past Event Badge */}
        {isPast && (
          <div className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            Past Event
          </div>
        )}
      </div>
    </button>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const allEvents = await getAllEvents();
        setEvents(allEvents.map(sanityEventToCalendarEvent));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const now = new Date();
  const filteredEvents = events.filter((event) => {
    if (filter === "upcoming") return event.date >= now;
    if (filter === "past") return event.date < now;
    return true;
  });

  // Sort: upcoming by date ascending, past by date descending
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (filter === "past") {
      return b.date.getTime() - a.date.getTime();
    }
    return a.date.getTime() - b.date.getTime();
  });

  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Events"
        subtitle="Join us for worship, fellowship, and community events."
        badge="What's Happening"
      />

      {/* Events Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Filter Tabs */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex rounded-xl bg-[#ececec] p-1.5 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
              {(["upcoming", "all", "past"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                    filter === tab
                      ? "bg-[#303552] text-white shadow-md"
                      : "text-gray-500 hover:text-[#303552]"
                  }`}
                >
                  {tab === "upcoming" ? "Upcoming" : tab === "all" ? "All Events" : "Past"}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#a5876d] border-t-transparent" />
            </div>
          ) : sortedEvents.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-bold text-[#303552]">
                {filter === "upcoming"
                  ? "No Upcoming Events"
                  : filter === "past"
                    ? "No Past Events"
                    : "No Events Found"}
              </h3>
              <p className="text-gray-500">
                {filter === "upcoming"
                  ? "Check back soon for new events!"
                  : "There are no events to display."}
              </p>
            </div>
          ) : (
            /* Events Grid */
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </main>
  );
}
