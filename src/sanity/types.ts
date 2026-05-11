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

export interface SanityAddress {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

export interface SanityServiceTime {
  _key: string;
  label: string;
  time: string;
}

export interface SanityImageWithAlt extends SanityImage {
  alt?: string;
}

export interface SanityScriptureQuote {
  text?: string;
  reference?: string;
}

export interface SanityWelcomeStat {
  _key: string;
  value: string;
  label: string;
}

export type WelcomeValueIcon = "book" | "users" | "globe" | "heart" | "cross" | "dove";

export interface SanityWelcomeValue {
  _key: string;
  icon: WelcomeValueIcon;
  title: string;
  description: string;
}

export type RequestCardIcon = "users" | "praying-hands" | "chat" | "heart" | "book";

export interface SanityRequestCard {
  _key: string;
  icon: RequestCardIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface SanitySiteSettings {
  _id: "siteSettings";
  _type: "siteSettings";

  // Church
  churchName: string;
  address?: SanityAddress;
  mailingAddress?: SanityAddress;
  serviceTimes?: SanityServiceTime[];

  // Contact
  phone?: string;
  email?: string;
  socialLinks?: SanitySocialLink[];

  // Live
  currentLivestreamId?: string;
  currentZoomLink?: string;

  // Hero
  heroHeadline?: string;
  heroEmphasisWord?: string;
  heroBackgroundImage?: SanityImageWithAlt;
  heroDecorativeImage?: SanityImageWithAlt;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaUrl?: string;
  heroSecondaryCtaLabel?: string;

  // Service info card
  serviceInfoHeading?: string;
  serviceInfoDescription?: string;
  serviceInfoFeatures?: string[];

  // Welcome
  welcomeHeadline?: string;
  welcomeBody?: string;
  welcomeQuote?: SanityScriptureQuote;
  welcomeBackgroundImage?: SanityImageWithAlt;
  welcomeFeatureImage?: SanityImageWithAlt;
  welcomeStats?: SanityWelcomeStat[];
  welcomeValues?: SanityWelcomeValue[];
  welcomePrimaryCtaLabel?: string;
  welcomePrimaryCtaUrl?: string;
  welcomeSecondaryCtaLabel?: string;
  welcomeSecondaryCtaUrl?: string;

  // Requests
  requestsBackgroundImage?: SanityImageWithAlt;
  requestsHeading?: string;
  requestsSubheading?: string;
  requestCards?: SanityRequestCard[];

  // Giving
  givingHeading?: string;
  givingDescription?: string;
  givingMessage?: string;
  givingQuote?: SanityScriptureQuote;
  givingPresetAmounts?: number[];
  givingDefaultPreset?: number;
  givingTrustSignals?: string[];
  etransferEmail?: string;
  donationReceiptThankYouMessage?: string;

  // Sermons
  sermonsHeading?: string;
  sermonsSubheading?: string;
  youtubeChannelUrl?: string;

  // Programs
  programsHeading?: string;
  programsSubheading?: string;

  // Charity (Feature 10 dependency)
  charityRegistrationNumber?: string;
  charityLegalName?: string;
  charityAddressOnFile?: string;
  receiptIssuingCity?: string;
  receiptIssuingProvince?: string;
  authorizedSignatoryName?: string;
  authorizedSignatureImage?: SanityImage;
  receiptIssuingMode?: "per-donation" | "annual";
}
