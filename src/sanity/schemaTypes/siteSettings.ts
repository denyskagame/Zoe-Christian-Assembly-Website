import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

const URL_LIKE_PATTERN = /^(https?:\/\/|www\.|.*\/)/i;
const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

const VALUE_CARD_ICONS = [
  { title: "Open book", value: "book" },
  { title: "People / community", value: "users" },
  { title: "Globe", value: "globe" },
  { title: "Heart", value: "heart" },
  { title: "Cross", value: "cross" },
  { title: "Dove", value: "dove" },
];

const REQUEST_CARD_ICONS = [
  { title: "People / community", value: "users" },
  { title: "Praying hands", value: "praying-hands" },
  { title: "Chat bubble", value: "chat" },
  { title: "Heart", value: "heart" },
  { title: "Open book", value: "book" },
];

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
      name: "hero",
      title: "Homepage — Hero section",
      description: "The first thing visitors see at the top of the homepage.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "serviceInfo",
      title: "Homepage — Service Info card",
      description: "The card overlapping the bottom of the hero with service time + address.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "welcome",
      title: "Homepage — Welcome section",
      description: 'The "About Zoe" section with stats and value cards.',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "requests",
      title: "Homepage — Requests section",
      description: "The 3 cards inviting visitors to connect, request prayer, or share testimony.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "giving",
      title: "Homepage — Giving section + giving page settings",
      description: "Copy and presets for the giving form on the homepage and /give page.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "sermons",
      title: "Homepage — Sermons section",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "programs",
      title: "Homepage — Programs section",
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
    // ----- Church -----
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
      type: "object",
      description: "Used in the footer, contact page, and the homepage Service Info card.",
      fieldset: "church",
      fields: [
        defineField({
          name: "street",
          title: "Street",
          type: "string",
          description: 'Street + number (e.g., "906 Rue Galt E").',
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
          description: 'e.g., "Sherbrooke".',
        }),
        defineField({
          name: "province",
          title: "Province / state",
          type: "string",
          description: 'Two-letter code (e.g., "QC").',
        }),
        defineField({
          name: "postalCode",
          title: "Postal code",
          type: "string",
          description: 'e.g., "J1G 1Y9".',
        }),
        defineField({
          name: "country",
          title: "Country",
          type: "string",
          description: 'Defaults to "Canada".',
          initialValue: "Canada",
        }),
      ],
    }),
    defineField({
      name: "mailingAddress",
      title: "Mailing address (optional)",
      type: "object",
      description:
        "Use this if mail goes to a different address than the church building (e.g., a P.O. box). Leave blank to show only the church address.",
      fieldset: "church",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "province", title: "Province / state", type: "string" }),
        defineField({ name: "postalCode", title: "Postal code", type: "string" }),
        defineField({
          name: "country",
          title: "Country",
          type: "string",
          initialValue: "Canada",
        }),
      ],
    }),
    defineField({
      name: "serviceTimes",
      title: "Service times",
      type: "array",
      description:
        'Each entry has a label (e.g., "Every Sunday") and a time (e.g., "2 PM – 4 PM"). The first entry shows on the homepage.',
      fieldset: "church",
      of: [
        {
          type: "object",
          name: "serviceTime",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g., "Every Sunday", "Mid-week service".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "time",
              title: "Time",
              type: "string",
              description: 'e.g., "2 PM – 4 PM".',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "time" } },
        },
      ],
    }),

    // ----- Contact -----
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
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),

    // ----- Live -----
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
      description:
        "Optional. Used by the Hero section's secondary CTA, the homepage live link, and the /live page.",
    }),

    // ----- Hero -----
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "text",
      rows: 3,
      description: "The big headline at the top of the homepage. Line breaks are preserved.",
      fieldset: "hero",
      validation: (rule) => rule.min(10).max(200),
    }),
    defineField({
      name: "heroEmphasisWord",
      title: "Emphasis word",
      type: "string",
      description:
        'Word inside the headline that gets rendered in uppercase serif (e.g., "JESUS"). Leave blank if no emphasis is needed.',
      fieldset: "hero",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero image",
      type: "image",
      description: "The worship-hands image on the right of the headline. Recommended: 1600×1600.",
      fieldset: "hero",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            'Describe the image for screen readers (e.g., "People worshipping with hands raised").',
        }),
      ],
    }),
    defineField({
      name: "heroDecorativeImage",
      title: "Decorative element",
      type: "image",
      description:
        "Optional brushstroke or accent that sits under the headline. Leave blank to hide.",
      fieldset: "hero",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Primary button — label",
      type: "string",
      description: 'e.g., "Plan Your Visit".',
      fieldset: "hero",
      initialValue: "Plan Your Visit",
    }),
    defineField({
      name: "heroPrimaryCtaUrl",
      title: "Primary button — link",
      type: "string",
      description: 'Internal path (e.g., "/plan-visit") or full URL.',
      fieldset: "hero",
      initialValue: "/plan-visit",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Secondary (Zoom) button — label",
      type: "string",
      description: 'e.g., "Join Us Live".',
      fieldset: "hero",
      initialValue: "Join Us Live",
    }),

    // ----- Service Info card -----
    defineField({
      name: "serviceInfoHeading",
      title: "Card heading",
      type: "string",
      description: 'e.g., "Join Us for Worship".',
      fieldset: "serviceInfo",
      initialValue: "Join Us for Worship",
    }),
    defineField({
      name: "serviceInfoDescription",
      title: "Card description",
      type: "text",
      rows: 3,
      description: "1–2 sentences shown under the heading.",
      fieldset: "serviceInfo",
    }),
    defineField({
      name: "serviceInfoFeatures",
      title: "Bottom badges",
      type: "array",
      of: [{ type: "string" }],
      description: 'Short phrases shown as badges (e.g., "All ages welcome").',
      fieldset: "serviceInfo",
    }),

    // ----- Welcome section -----
    defineField({
      name: "welcomeHeadline",
      title: "Headline (bold paragraph)",
      type: "text",
      rows: 3,
      description: "The bold paragraph that opens the section.",
      fieldset: "welcome",
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "welcomeBody",
      title: "Body paragraph",
      type: "text",
      rows: 4,
      description: "Paragraph beneath the bold headline.",
      fieldset: "welcome",
    }),
    defineField({
      name: "welcomeQuote",
      title: "Scripture quote",
      type: "object",
      fieldset: "welcome",
      fields: [
        defineField({
          name: "text",
          title: "Quote",
          type: "text",
          rows: 3,
          description: "The Scripture passage.",
        }),
        defineField({
          name: "reference",
          title: "Reference",
          type: "string",
          description: 'Book/chapter/verse + translation (e.g., "John 10:10 NIV").',
        }),
      ],
    }),
    defineField({
      name: "welcomeBackgroundImage",
      title: "Background image",
      type: "image",
      description: "Full-bleed background behind the welcome section.",
      fieldset: "welcome",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "welcomeFeatureImage",
      title: "Feature image (right column)",
      type: "image",
      description: 'The "JESUS" feature image on the right side.',
      fieldset: "welcome",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "welcomeStats",
      title: "Stats (max 3)",
      type: "array",
      description:
        'Numbers shown over the feature image (e.g., "3+ Years Ministry"). Up to 3. Consider whether keeping these stats up-to-date is realistic — if not, leave the array empty to hide them.',
      fieldset: "welcome",
      of: [
        {
          type: "object",
          name: "welcomeStat",
          fields: [
            defineField({
              name: "value",
              title: "Number",
              type: "string",
              description: 'e.g., "3+", "50+".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g., "Years Ministry".',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "welcomeValues",
      title: "Value cards (exactly 3)",
      type: "array",
      description: "The 3 cards beneath the main content (Scripture-Centered, etc.).",
      fieldset: "welcome",
      of: [
        {
          type: "object",
          name: "welcomeValue",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: VALUE_CARD_ICONS, layout: "dropdown" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "welcomePrimaryCtaLabel",
      title: "Primary CTA — label",
      type: "string",
      fieldset: "welcome",
      initialValue: "Our Story",
    }),
    defineField({
      name: "welcomePrimaryCtaUrl",
      title: "Primary CTA — link",
      type: "string",
      fieldset: "welcome",
      initialValue: "/about",
    }),
    defineField({
      name: "welcomeSecondaryCtaLabel",
      title: "Secondary CTA — label",
      type: "string",
      fieldset: "welcome",
      initialValue: "What We Believe",
    }),
    defineField({
      name: "welcomeSecondaryCtaUrl",
      title: "Secondary CTA — link",
      type: "string",
      fieldset: "welcome",
      initialValue: "/beliefs",
    }),

    // ----- Requests section -----
    defineField({
      name: "requestsBackgroundImage",
      title: "Background image",
      type: "image",
      fieldset: "requests",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "requestsHeading",
      title: "Heading",
      type: "string",
      description: 'e.g., "We’re Here For You!"',
      fieldset: "requests",
      initialValue: "We’re Here For You!",
    }),
    defineField({
      name: "requestsSubheading",
      title: "Subheading",
      type: "text",
      rows: 3,
      fieldset: "requests",
    }),
    defineField({
      name: "requestCards",
      title: "Request cards (exactly 3)",
      type: "array",
      description: "The 3 invitation cards. Use mailto: links to receive responses by email.",
      fieldset: "requests",
      of: [
        {
          type: "object",
          name: "requestCard",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: REQUEST_CARD_ICONS, layout: "dropdown" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "ctaLabel",
              title: "Button label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "ctaUrl",
              title: "Button link",
              type: "string",
              description:
                'mailto: link or path (e.g., "mailto:info@zoechristian.ca?subject=Prayer Request").',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "ctaLabel" } },
        },
      ],
      validation: (rule) => rule.max(3),
    }),

    // ----- Giving section -----
    defineField({
      name: "givingHeading",
      title: "Heading",
      type: "string",
      fieldset: "giving",
      initialValue: "Make a Difference Through Giving",
    }),
    defineField({
      name: "givingDescription",
      title: "Description",
      type: "text",
      rows: 4,
      fieldset: "giving",
    }),
    defineField({
      name: "givingMessage",
      title: "Message above the giving form",
      type: "text",
      rows: 3,
      fieldset: "giving",
      description: "Short note shown above the donation form on the giving page.",
    }),
    defineField({
      name: "givingQuote",
      title: "Scripture quote",
      type: "object",
      fieldset: "giving",
      fields: [
        defineField({ name: "text", title: "Quote", type: "text", rows: 3 }),
        defineField({ name: "reference", title: "Reference", type: "string" }),
      ],
    }),
    defineField({
      name: "givingPresetAmounts",
      title: "Preset amounts (CAD)",
      type: "array",
      description: "Up to 4 amounts shown as quick-pick buttons.",
      of: [{ type: "number" }],
      fieldset: "giving",
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "givingDefaultPreset",
      title: "Default selected amount (CAD)",
      type: "number",
      description: "Which amount is highlighted when the page loads.",
      fieldset: "giving",
      initialValue: 50,
    }),
    defineField({
      name: "givingTrustSignals",
      title: "Trust signals",
      type: "array",
      description: 'Short phrases shown as bullets (e.g., "Instant tax receipts").',
      of: [{ type: "string" }],
      fieldset: "giving",
    }),
    defineField({
      name: "etransferEmail",
      title: "E-transfer email",
      type: "string",
      description: 'For the "Prefer E-transfer?" line. Leave blank to hide that line entirely.',
      fieldset: "giving",
      validation: (rule) =>
        rule.custom((email) => {
          if (!email) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? true
            : "Please enter a valid email address.";
        }),
    }),
    defineField({
      name: "donationReceiptThankYouMessage",
      title: "Thank-you message in donation receipts",
      type: "text",
      rows: 3,
      fieldset: "giving",
      description: "Appears in the receipt email donors receive. Keep it warm and personal.",
    }),

    // ----- Sermons section -----
    defineField({
      name: "sermonsHeading",
      title: "Heading",
      type: "string",
      fieldset: "sermons",
      initialValue: "Sermons & Podcasts",
    }),
    defineField({
      name: "sermonsSubheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      fieldset: "sermons",
    }),
    defineField({
      name: "youtubeChannelUrl",
      title: "YouTube channel URL",
      type: "url",
      description: 'Linked from the "View All Sermons" button.',
      fieldset: "sermons",
    }),

    // ----- Programs section -----
    defineField({
      name: "programsHeading",
      title: "Heading",
      type: "string",
      fieldset: "programs",
      initialValue: "Church Programs",
    }),
    defineField({
      name: "programsSubheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      fieldset: "programs",
    }),

    // ----- Charity (unchanged from Feature 02) -----
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
