import { defineField, defineType } from "sanity";

const YOUTUBE_URL_PATTERN =
  /^https?:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)[A-Za-z0-9_-]{11}/;

export default defineType({
  name: "sermon",
  title: "Sermons",
  type: "document",
  fieldsets: [
    { name: "main", title: "Main", options: { collapsible: false } },
    {
      name: "details",
      title: "Details",
      description: "Series, type, and short notes.",
      options: { collapsible: true },
    },
    {
      name: "media",
      title: "Media",
      description: "Optional thumbnail. YouTube's auto-generated thumbnail is used if blank.",
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
      title: "Sermon title",
      type: "string",
      description: 'The title that appears on the sermon card (e.g., "Walking by Faith").',
      fieldset: "main",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preacher",
      title: "Preacher",
      type: "string",
      description: 'Name of the preacher (e.g., "Pastor John Doe").',
      fieldset: "main",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date preached",
      type: "datetime",
      description: "When the sermon was preached. Used to sort sermons newest-first.",
      fieldset: "main",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube video URL",
      type: "url",
      description:
        'Paste the full YouTube link (e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ" or "https://youtu.be/dQw4w9WgXcQ").',
      fieldset: "main",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          return YOUTUBE_URL_PATTERN.test(value)
            ? true
            : "This doesn't look like a YouTube link. It should start with youtube.com/watch?v= or youtu.be/.";
        }),
    }),
    defineField({
      name: "scripture",
      title: "Scripture reference",
      type: "string",
      description: 'Optional. Bible passage referenced (e.g., "John 3:16" or "Romans 8:28-30").',
      fieldset: "details",
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "1–2 sentences shown under the sermon title.",
      fieldset: "details",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'Optional. e.g., "45 min" or "1 hr 20 min".',
      fieldset: "details",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      description: "Used in filters on the sermons page.",
      fieldset: "details",
      options: {
        list: [
          { title: "Sermon", value: "sermon" },
          { title: "Podcast", value: "podcast" },
          { title: "Teaching", value: "teaching" },
          { title: "Testimony", value: "testimony" },
        ],
        layout: "radio",
      },
      initialValue: "sermon",
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "string",
      description: 'Optional series name (e.g., "Faith Foundations").',
      fieldset: "details",
    }),
    defineField({
      name: "thumbnail",
      title: "Custom thumbnail",
      type: "image",
      description: "Optional. If left blank, the YouTube thumbnail is used.",
      fieldset: "media",
      options: { hotspot: true },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Featured sermons appear at the top of the sermons page.",
      fieldset: "metadata",
      initialValue: false,
    }),
    defineField({
      name: "isPopular",
      title: "Popular",
      type: "boolean",
      description: 'Shows a "Popular" badge on the sermon card.',
      fieldset: "metadata",
      initialValue: false,
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
    { title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Date, oldest first", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "title",
      preacher: "preacher",
      date: "date",
      type: "type",
      media: "thumbnail",
    },
    prepare({ title, preacher, date, type, media }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : "No date";
      return {
        title,
        subtitle: `${preacher || "Unknown"} • ${formattedDate} • ${type || "sermon"}`,
        media,
      };
    },
  },
});
