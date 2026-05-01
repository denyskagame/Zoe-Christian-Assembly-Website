/**
 * Typed data-fetching helpers backed by the Sanity client.
 *
 * This is the canonical entry point for reading content out of Sanity. Use it
 * from server components, route handlers, and pages instead of building queries
 * inline. Consumers pre-dating Feature 02 may still import from
 * `@/sanity/lib/queries` or `@/sanity/lib/events` — those continue to work.
 */

import { client } from "./client";
import { urlFor } from "./image";
import {
  homepageSermonsQuery,
  allSermonsQuery,
  sermonBySlugQuery,
  allEventsQuery,
  upcomingEventsQuery,
  activeAnnouncementsQuery,
  activeCampaignsQuery,
  campaignBySlugQuery,
  activeGivingCategoriesQuery,
  pageBySlugQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  SanitySermon,
  SanityEvent,
  SanityAnnouncement,
  SanityCampaign,
  SanityGivingCategory,
  SanityPage,
  SanitySiteSettings,
} from "../types";

function todayIso(): string {
  const iso = new Date().toISOString().split("T")[0];
  if (!iso) throw new Error("Failed to format today's date");
  return iso;
}

// ---------- Sermons ----------

export async function getSermons(): Promise<SanitySermon[]> {
  return client.fetch<SanitySermon[]>(allSermonsQuery);
}

export async function getHomepageSermons(): Promise<SanitySermon[]> {
  return client.fetch<SanitySermon[]>(homepageSermonsQuery);
}

export async function getSermonBySlug(slug: string): Promise<SanitySermon | null> {
  return client.fetch<SanitySermon | null>(sermonBySlugQuery, { slug });
}

// ---------- Events ----------

export async function getAllEvents(): Promise<SanityEvent[]> {
  return client.fetch<SanityEvent[]>(allEventsQuery);
}

export async function getUpcomingEvents(): Promise<SanityEvent[]> {
  return client.fetch<SanityEvent[]>(upcomingEventsQuery, { today: todayIso() });
}

// ---------- Announcements ----------

export async function getActiveAnnouncements(): Promise<SanityAnnouncement[]> {
  return client.fetch<SanityAnnouncement[]>(activeAnnouncementsQuery, { today: todayIso() });
}

// ---------- Campaigns ----------

export async function getActiveCampaigns(): Promise<SanityCampaign[]> {
  return client.fetch<SanityCampaign[]>(activeCampaignsQuery);
}

export async function getCampaignBySlug(slug: string): Promise<SanityCampaign | null> {
  return client.fetch<SanityCampaign | null>(campaignBySlugQuery, { slug });
}

// ---------- Giving categories ----------

export async function getActiveGivingCategories(): Promise<SanityGivingCategory[]> {
  return client.fetch<SanityGivingCategory[]>(activeGivingCategoriesQuery);
}

// ---------- Pages ----------

export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
  return client.fetch<SanityPage | null>(pageBySlugQuery, { slug });
}

// ---------- Site settings ----------

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return client.fetch<SanitySiteSettings | null>(siteSettingsQuery);
}

// ---------- Image URL builder ----------

export { urlFor };
