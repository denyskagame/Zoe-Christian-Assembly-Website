import { groq } from "next-sanity";

// Re-export shared types so existing call sites (`@/sanity/lib/queries`) keep working.
export type {
  SanitySermon,
  SanityEvent,
  SanityAnnouncement,
  SanityCampaign,
  SanityGivingCategory,
  SanityPage,
  SanitySiteSettings,
} from "../types";

// ---------- Sermons ----------

const sermonProjection = `
  _id,
  title,
  preacher,
  date,
  scripture,
  youtubeUrl,
  duration,
  type,
  series,
  isFeatured,
  isPopular,
  description,
  thumbnail,
  slug
`;

export const homepageSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc)[0...3] {
    ${sermonProjection}
  }
`;

export const allSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    ${sermonProjection}
  }
`;

export const sermonBySlugQuery = groq`
  *[_type == "sermon" && slug.current == $slug][0] {
    ${sermonProjection}
  }
`;

// ---------- Events ----------

const eventProjection = `
  _id,
  title,
  slug,
  date,
  startTime,
  endTime,
  location,
  isOnline,
  zoomLink,
  category,
  recurrence,
  recurrenceEndDate,
  color,
  shortDescription,
  description,
  "image": image.asset->{ _ref, url },
  featured,
  published
`;

export const allEventsQuery = groq`
  *[_type == "event" && published == true] | order(date asc) {
    ${eventProjection}
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && published == true && date >= $today] | order(date asc) {
    ${eventProjection}
  }
`;

export const nextEventQuery = groq`
  *[_type == "event" && published == true && date >= $today] | order(date asc) [0] {
    ${eventProjection}
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && published == true && featured == true && date >= $today] | order(date asc) {
    ${eventProjection}
  }
`;

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

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    ${eventProjection}
  }
`;

// ---------- Announcements ----------

export const activeAnnouncementsQuery = groq`
  *[_type == "announcement"
    && active == true
    && (!defined(startDate) || startDate <= $today)
    && (!defined(endDate) || endDate >= $today)
  ] | order(_createdAt desc) {
    _id,
    title,
    body,
    active,
    startDate,
    endDate
  }
`;

// ---------- Campaigns ----------

const campaignProjection = `
  _id,
  title,
  slug,
  goalAmount,
  coverImage,
  description,
  active
`;

export const activeCampaignsQuery = groq`
  *[_type == "campaign" && active == true] | order(_createdAt desc) {
    ${campaignProjection}
  }
`;

export const campaignBySlugQuery = groq`
  *[_type == "campaign" && slug.current == $slug][0] {
    ${campaignProjection}
  }
`;

// ---------- Giving categories ----------

export const activeGivingCategoriesQuery = groq`
  *[_type == "givingCategory" && active == true] | order(label asc) {
    _id,
    label,
    slug,
    active
  }
`;

// ---------- Pages ----------

const pageProjection = `
  _id,
  title,
  slug,
  body,
  seoMetaDescription
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ${pageProjection}
  }
`;

// ---------- Site settings ----------

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    _type,
    churchName,
    address,
    phone,
    email,
    serviceTimes,
    socialLinks,
    currentLivestreamId,
    currentZoomLink,
    givingMessage,
    donationReceiptThankYouMessage,
    charityRegistrationNumber,
    charityLegalName,
    charityAddressOnFile,
    receiptIssuingCity,
    receiptIssuingProvince,
    authorizedSignatoryName,
    authorizedSignatureImage,
    receiptIssuingMode
  }
`;
