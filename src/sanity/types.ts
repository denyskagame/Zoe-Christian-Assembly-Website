/**
 * Hand-written TypeScript types for Sanity documents.
 *
 * These types are the canonical shape consumed by `src/sanity/lib/sanity.ts`.
 * Once `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set
 * locally, `npm run typegen` will (re)generate `src/sanity/sanity.types.ts`
 * from the schema. Until then, the helpers are anchored to these types.
 *
 * See docs/admin-runbook.md for the typegen workflow.
 */

import type { PortableTextBlock } from "@portabletext/react";

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanitySermon {
  _id: string;
  _type: "sermon";
  title: string;
  preacher: string;
  date: string;
  scripture?: string;
  youtubeUrl: string;
  duration?: string;
  type: "sermon" | "podcast" | "teaching" | "testimony";
  series?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  thumbnail?: SanityImage;
  description?: string;
  slug?: SanitySlug;
}

export interface SanityEvent {
  _id: string;
  _type: "event";
  title: string;
  slug?: SanitySlug;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  isOnline: boolean;
  zoomLink?: string;
  category?: "sunday-service" | "prayer-night" | "youth" | "other";
  recurrence?: "none" | "weekly" | "bi-weekly" | "monthly";
  recurrenceEndDate?: string;
  color: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  image?: { asset: { _ref: string; url?: string } };
  featured: boolean;
  published: boolean;
}

export interface SanityAnnouncement {
  _id: string;
  _type: "announcement";
  title: string;
  body: string;
  active: boolean;
  startDate?: string;
  endDate?: string;
}

export interface SanityCampaign {
  _id: string;
  _type: "campaign";
  title: string;
  slug: SanitySlug;
  goalAmount: number;
  coverImage?: SanityImage;
  description?: PortableTextBlock[];
  active: boolean;
}

export interface SanityGivingCategory {
  _id: string;
  _type: "givingCategory";
  label: string;
  slug: SanitySlug;
  active: boolean;
}

export interface SanityPage {
  _id: string;
  _type: "page";
  title: string;
  slug: SanitySlug;
  body?: PortableTextBlock[];
  seoMetaDescription?: string;
}

export interface SanitySocialLink {
  _key: string;
  platform: string;
  url: string;
}

export interface SanitySiteSettings {
  _id: "siteSettings";
  _type: "siteSettings";
  churchName: string;
  address?: string;
  phone?: string;
  email?: string;
  serviceTimes?: string[];
  socialLinks?: SanitySocialLink[];
  currentLivestreamId?: string;
  currentZoomLink?: string;
  givingMessage?: string;
  donationReceiptThankYouMessage?: string;
  // Charity fields (Feature 10 dependency)
  charityRegistrationNumber?: string;
  charityLegalName?: string;
  charityAddressOnFile?: string;
  receiptIssuingCity?: string;
  receiptIssuingProvince?: string;
  authorizedSignatoryName?: string;
  authorizedSignatureImage?: SanityImage;
  receiptIssuingMode?: "per-donation" | "annual";
}
