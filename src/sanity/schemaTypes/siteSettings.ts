import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

const URL_LIKE_PATTERN = /^(https?:\/\/|www\.|.*\/)/i;
const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  description: "Site-wide settings. Most of these are used in many places — change carefully.",
  fieldsets: [
    { name: "church", title: "Church information", options: { collapsible: false } },
    { name: "contact", title: "Contact details", options: { collapsible: true } },
    {
      name: "live",
      title: "Live stream & online services",
      description: "What appears on the /live page each week.",
      options: { collapsible: true },
    },
    {
      name: "giving",
      title: "Giving page settings",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "charity",
      title: "Charity & receipts (used by Feature 10)",
      description:
        "Required Canadian charity info used to issue donation receipts. Don't change without checking with the treasurer.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "churchName",
      title: "Church name",
      type: "string",
      description: 'Full legal name (e.g., "Zoe Christian Assembly").',
      fieldset: "church",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      description: "Street address used in the footer and contact page.",
      fieldset: "church",
    }),
    defineField({
      name: "serviceTimes",
      title: "Service times",
      type: "array",
      of: [{ type: "string" }],
      description: 'One entry per line, e.g., "Sunday Service — 2:00 PM".',
      fieldset: "church",
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Main phone number shown in the footer and contact page.",
      fieldset: "contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Public contact email address.",
      fieldset: "contact",
      validation: (rule) =>
        rule.custom((email) => {
          if (!email) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? true
            : "Please enter a valid email address.";
        }),
    }),
    defineField({
      name: "socialLinks",
      title: "Social media links",
      type: "array",
      fieldset: "contact",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description: 'e.g., "YouTube", "Facebook", "Instagram".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),

    defineField({
      name: "currentLivestreamId",
      title: "This Sunday's YouTube video ID",
      type: "string",
      fieldset: "live",
      description:
        'IMPORTANT: paste the 11-character YouTube ID only — NOT the full URL. Example: "dQw4w9WgXcQ". The ID is the part after "v=" in the YouTube URL.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          if (URL_LIKE_PATTERN.test(value)) {
            return 'This looks like a URL. Paste only the video ID (the part after "v=" in the YouTube URL).';
          }
          if (!YOUTUBE_VIDEO_ID_PATTERN.test(value)) {
            return "YouTube video IDs are exactly 11 characters (letters, numbers, _, -).";
          }
          return true;
        }),
    }),
    defineField({
      name: "currentZoomLink",
      title: "Current Zoom link",
      type: "url",
      fieldset: "live",
      description: "Optional. Used for online prayer and special online services.",
    }),

    defineField({
      name: "givingMessage",
      title: "Message above the giving form",
      type: "text",
      rows: 3,
      fieldset: "giving",
      description: "A short note shown above the donation form on /donate.",
    }),
    defineField({
      name: "donationReceiptThankYouMessage",
      title: "Thank-you message in donation receipts",
      type: "text",
      rows: 3,
      fieldset: "giving",
      description: "Appears in the receipt email donors receive. Keep it warm and personal.",
    }),

    defineField({
      name: "charityRegistrationNumber",
      title: "CRA charity registration number",
      type: "string",
      fieldset: "charity",
      description: 'CRA business number with "RR0001" suffix (e.g., "123456789RR0001").',
    }),
    defineField({
      name: "charityLegalName",
      title: "Legal charity name",
      type: "string",
      fieldset: "charity",
      description: "Exact name registered with the CRA. Appears on receipts.",
    }),
    defineField({
      name: "charityAddressOnFile",
      title: "Address on file with the CRA",
      type: "string",
      fieldset: "charity",
      description: "Full address — must match what's filed with the CRA.",
    }),
    defineField({
      name: "receiptIssuingCity",
      title: "Receipt issuing city",
      type: "string",
      fieldset: "charity",
      description: 'City printed on receipts (e.g., "Sherbrooke").',
    }),
    defineField({
      name: "receiptIssuingProvince",
      title: "Receipt issuing province",
      type: "string",
      fieldset: "charity",
      description: 'Province printed on receipts (e.g., "QC").',
    }),
    defineField({
      name: "authorizedSignatoryName",
      title: "Authorized signatory name",
      type: "string",
      fieldset: "charity",
      description: "The person whose signature appears on receipts.",
    }),
    defineField({
      name: "authorizedSignatureImage",
      title: "Signature image",
      type: "image",
      fieldset: "charity",
      description:
        "PNG with transparent background, around 400×120 pixels. Used on official donation receipts.",
    }),
    defineField({
      name: "receiptIssuingMode",
      title: "Receipt issuing mode",
      type: "string",
      fieldset: "charity",
      description:
        'How donors receive receipts. "Per donation" = email immediately after each gift. "Annual" = one consolidated tax receipt at year-end.',
      options: {
        list: [
          { title: "Per donation (immediate)", value: "per-donation" },
          { title: "Annual (year-end)", value: "annual" },
        ],
        layout: "radio",
      },
      initialValue: "per-donation",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
