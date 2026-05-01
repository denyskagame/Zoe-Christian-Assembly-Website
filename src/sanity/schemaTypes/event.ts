import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

// Predefined color options for events
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

export default defineType({
  name: "event",
  title: "Special Events",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Event title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      validation: (Rule) => Rule.required().error("Event date is required"),
      options: {
        dateFormat: "MMMM D, YYYY",
      },
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "string",
      description: "e.g., 10:00 AM, 2:00 PM",
      validation: (Rule) => Rule.required().error("Start time is required"),
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "string",
      description: "e.g., 12:00 PM, 4:00 PM",
      validation: (Rule) => Rule.required().error("End time is required"),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "906 Rue Galt E, Sherbrooke",
    }),
    defineField({
      name: "isOnline",
      title: "Is this an online event?",
      type: "boolean",
      initialValue: false,
      description: "Check if this event is on Zoom or online",
    }),
    defineField({
      name: "zoomLink",
      title: "Zoom Link",
      type: "url",
      hidden: ({ parent }) => !parent?.isOnline,
      description: "Add the Zoom meeting link if this is an online event",
    }),
    defineField({
      name: "color",
      title: "Event Color",
      type: "string",
      description: "Choose a color to identify this event on the calendar",
      options: {
        list: EVENT_COLORS,
        layout: "dropdown",
      },
      initialValue: "#a5876d",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "A brief description shown on the calendar card (max 150 characters)",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed description of the event",
    }),
    defineField({
      name: "image",
      title: "Event Flyer/Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Upload an event flyer or promotional image",
    }),
    defineField({
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
      description: "Featured events appear prominently on the homepage",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
      description: "Only published events appear on the website",
    }),
  ],
  orderings: [
    {
      title: "Event Date (Upcoming First)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Event Date (Latest First)",
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
