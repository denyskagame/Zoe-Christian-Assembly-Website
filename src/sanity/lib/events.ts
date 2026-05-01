import { client } from "./client";
import {
  SanityEvent,
  allEventsQuery,
  upcomingEventsQuery,
  nextEventQuery,
  eventsByMonthQuery,
} from "./queries";

// Get all published events
export async function getAllEvents(): Promise<SanityEvent[]> {
  return client.fetch(allEventsQuery);
}

// Get upcoming events from today
export async function getUpcomingEvents(): Promise<SanityEvent[]> {
  const today = new Date().toISOString().split("T")[0];
  return client.fetch(upcomingEventsQuery, { today });
}

// Get the next upcoming event
export async function getNextEvent(): Promise<SanityEvent | null> {
  const today = new Date().toISOString().split("T")[0];
  return client.fetch(nextEventQuery, { today });
}

// Get events for a specific month (for calendar display)
export async function getEventsByMonth(year: number, month: number): Promise<SanityEvent[]> {
  const startDate = new Date(year, month, 1).toISOString().split("T")[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];
  return client.fetch(eventsByMonthQuery, { startDate, endDate });
}

// Convert Sanity event to calendar format
export interface CalendarEvent {
  id: string;
  slug: string;
  date: Date;
  name: string;
  time: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  fullDescription?: unknown[];
  color: string;
  isOnline: boolean;
  zoomLink?: string;
  image?: string;
  featured: boolean;
}

export function sanityEventToCalendarEvent(event: SanityEvent): CalendarEvent {
  return {
    id: event._id,
    slug: event.slug?.current || "",
    date: new Date(event.date),
    name: event.title,
    time: `${event.startTime} - ${event.endTime}`,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.isOnline ? "On Zoom" : event.location,
    description: event.shortDescription || "",
    fullDescription: event.description,
    color: event.color || "#a5876d",
    isOnline: event.isOnline,
    zoomLink: event.zoomLink,
    image: event.image?.asset?.url || (event.image as unknown as string) || undefined,
    featured: event.featured,
  };
}

// Get all events as calendar events
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const events = await getAllEvents();
  return events.map(sanityEventToCalendarEvent);
}

// Get upcoming events as calendar events
export async function getUpcomingCalendarEvents(): Promise<CalendarEvent[]> {
  const events = await getUpcomingEvents();
  return events.map(sanityEventToCalendarEvent);
}
