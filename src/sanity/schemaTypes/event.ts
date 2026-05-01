import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

const EVENT_COLORS = [
  { title: "Brown (Sunday Service)", value: "#a5876d" },
  { title: "Blue (Zoom/Online)", value: "#2D8CFF" },
  { title: "Green (Bible Study)", value: "#27ae60" },
  { title: "Red (Prayer)", value: "#e74c3c" },
  { title: "Pink (Valentine/Mother)", value: "#e91e63" },
  { title: "Purple (Easter)", value: "#9c27b0" },
  { title: "Navy (Father's Day)", value: "#1976d2" },
  { title: "Orange (Anniversary)", value: "#ff9800" },
  { title: "Deep Red (Christmas)", value: "#c62828" },
  { title: "Gold (New Year)", value: "#ffd700" },
];

function parseTimeString(value: string | undefined): number | null {
  if (!value) return null;
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return null;
  let hours = parseInt(match[1]!, 10);
  const minutes = parseInt(match[2]!, 10);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export default defineType({
  name: "event",
  title: "Special Events",
  type: "document",
  icon: CalendarIcon,
  fieldsets: [
    { name: "main", title: "Event basics", options: { collapsible: false } },
    { name: "schedule", title: "When it happens", options: { collapsible: false } },
    {
      name: "location",
      title: "Where it happens",
      description: "Physical location or online (Zoom).",
      options: { collapsible: true },
    },
    {
      name: "recurrence",
      title: "Recurrence",
      description: "Set this if the event repeats. Defaults to a single occurrence.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "appearance",
      title: "Appearance",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "metadata",
      title: "Visibility flags",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Event title",
      type: "string",
      description: 'Shown on the calendar and event card (e.g., "Christmas Eve Service").',
      fieldset: "main",
      validation: (rule) => rule.required().error("Event title is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Used for filtering events on the public calendar.",
      fieldset: "main",
      options: {
        list: [
          { title: "Sunday Service", value: "sunday-service" },
          { title: "Prayer Night", value: "prayer-night" },
          { title: "Youth", value: "youth" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      initialValue: "other",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "Brief summary shown on the calendar card. 1–2 sentences, max 150 characters.",
      fieldset: "main",
      validation: (rule) => rule.max(150),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
      description: "Long-form details. Shown when someone clicks the event.",
      fieldset: "main",
    }),

    defineField({
      name: "date",
      title: "Event date",
      type: "date",
      description: "The day the event happens.",
      fieldset: "schedule",
      validation: (rule) => rule.required().error("Event date is required"),
      options: { dateFormat: "MMMM D, YYYY" },
    }),
    defineField({
      name: "startTime",
      title: "Start time",
      type: "string",
      description: 'When the event starts (e.g., "10:00 AM" or "2:00 PM").',
      fieldset: "schedule",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return "Start time is required";
          return parseTimeString(value) !== null
            ? true
            : 'Use a time like "10:00 AM" or "2:00 PM".';
        }),
    }),
    defineField({
      name: "endTime",
      title: "End time",
      type: "string",
      description: 'When the event ends (e.g., "12:00 PM" or "4:00 PM").',
      fieldset: "schedule",
      validation: (rule) =>
        rule.required().custom((value, context) => {
          if (!value) return "End time is required";
          const end = parseTimeString(value);
          if (end === null) return 'Use a time like "12:00 PM" or "4:00 PM".';
          const startTime = (context.document as { startTime?: string } | undefined)?.startTime;
          const start = parseTimeString(startTime);
          if (start !== null && end <= start) {
            return "End time must be after the start time.";
          }
          return true;
        }),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'Address or venue name (e.g., "906 Rue Galt E, Sherbrooke").',
      fieldset: "location",
      initialValue: "906 Rue Galt E, Sherbrooke",
    }),
    defineField({
      name: "isOnline",
      title: "Is this an online event?",
      type: "boolean",
      description: "Check this if the event happens on Zoom or another video platform.",
      fieldset: "location",
      initialValue: false,
    }),
    defineField({
      name: "zoomLink",
      title: "Zoom link",
      type: "url",
      description: 'Required for online events. Paste the full Zoom link (starts with "https://").',
      fieldset: "location",
      hidden: ({ parent }) => !parent?.isOnline,
      validation: (rule) =>
        rule.custom((value, context) => {
          const isOnline = (context.document as { isOnline?: boolean } | undefined)?.isOnline;
          if (isOnline && !value) return "Online events need a Zoom link.";
          return true;
        }),
    }),

    defineField({
      name: "recurrence",
      title: "Repeats",
      type: "string",
      description: 'Set "None" for a single event. Otherwise pick how often it repeats.',
      fieldset: "recurrence",
      options: {
        list: [
          { title: "None (single event)", value: "none" },
          { title: "Weekly", value: "weekly" },
          { title: "Bi-weekly", value: "bi-weekly" },
          { title: "Monthly", value: "monthly" },
        ],
        layout: "radio",
      },
      initialValue: "none",
    }),
    defineField({
      name: "recurrenceEndDate",
      title: "Repeat until",
      type: "date",
      description: "Optional. The last day this event repeats. Leave blank for ongoing.",
      fieldset: "recurrence",
      hidden: ({ parent }) => !parent?.recurrence || parent.recurrence === "none",
    }),

    defineField({
      name: "color",
      title: "Calendar color",
      type: "string",
      description: "Pick a color so this event stands out on the calendar.",
      fieldset: "appearance",
      options: { list: EVENT_COLORS, layout: "dropdown" },
      initialValue: "#a5876d",
    }),
    defineField({
      name: "image",
      title: "Event flyer / image",
      type: "image",
      description: "Optional poster image. Recommended size: 1200×750 pixels.",
      fieldset: "appearance",
      options: { hotspot: true },
    }),

    defineField({
      name: "featured",
      title: "Featured event",
      type: "boolean",
      description: "Featured events appear prominently on the homepage.",
      fieldset: "metadata",
      initialValue: false,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Only published events appear on the website.",
      fieldset: "metadata",
      initialValue: true,
    }),
    defineField({
      name: "slug",
      title: "Slug (auto-generated)",
      type: "slug",
      description: "Auto-filled from the title. You can edit it if needed.",
      fieldset: "metadata",
      hidden: ({ document }) => !document?.title,
      options: { source: "title", maxLength: 96 },
    }),
  ],
  orderings: [
    {
      title: "Event date (upcoming first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Event date (latest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      startTime: "startTime",
      media: "image",
      published: "published",
    },
    prepare({ title, date, startTime, media, published }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No date";
      return {
        title: `${published ? "" : "[Draft] "}${title}`,
        subtitle: `${formattedDate} at ${startTime || "TBD"}`,
        media: media || CalendarIcon,
      };
    },
  },
});
