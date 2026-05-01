import { groq } from "next-sanity";

// Types for sermons
export interface SanitySermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  youtubeUrl: string;
  duration?: string;
  type: string;
  isPopular?: boolean;
  description?: string;
}

// Three latest sermons for the homepage section
export const homepageSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc)[0...3] {
    _id,
    title,
    preacher,
    date,
    youtubeUrl,
    duration,
    type,
    isPopular,
    description
  }
`;

// Types for events
export interface SanityEvent {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  zoomLink?: string;
  color: string;
  shortDescription?: string;
  description?: unknown[];
  image?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  featured: boolean;
  published: boolean;
}

// Get all published events
export const allEventsQuery = groq`
  *[_type == "event" && published == true] | order(date asc) {
    _id,
    title,
    slug,
    date,
    startTime,
    endTime,
    location,
    isOnline,
    zoomLink,
    color,
    shortDescription,
    description,
    "image": image.asset->url,
    featured,
    published
  }
`;

// Get upcoming events (from today onwards)
export const upcomingEventsQuery = groq`
  *[_type == "event" && published == true && date >= $today] | order(date asc) {
    _id,
    title,
    slug,
    date,
    startTime,
    endTime,
    location,
    isOnline,
    zoomLink,
    color,
    shortDescription,
    description,
    "image": image.asset->url,
    featured,
    published
  }
`;

// Get the next upcoming event
export const nextEventQuery = groq`
  *[_type == "event" && published == true && date >= $today] | order(date asc) [0] {
    _id,
    title,
    slug,
    date,
    startTime,
    endTime,
    location,
    isOnline,
    zoomLink,
    color,
    shortDescription,
    description,
    "image": image.asset->url,
    featured,
    published
  }
`;

// Get featured events
export const featuredEventsQuery = groq`
  *[_type == "event" && published == true && featured == true && date >= $today] | order(date asc) {
    _id,
    title,
    slug,
    date,
    startTime,
    endTime,
    location,
    isOnline,
    zoomLink,
    color,
    shortDescription,
    "image": image.asset->url,
    featured
  }
`;

// Get events for a specific month
export const eventsByMonthQuery = groq`
  *[_type == "event" && published == true && date >= $startDate && date <= $endDate] | order(date asc) {
    _id,
    title,
    date,
    startTime,
    endTime,
    location,
    isOnline,
    color,
    shortDescription
  }
`;

// Get a single event by slug
export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    startTime,
    endTime,
    location,
    isOnline,
    zoomLink,
    color,
    shortDescription,
    description,
    "image": image.asset->url,
    featured,
    published
  }
`;
