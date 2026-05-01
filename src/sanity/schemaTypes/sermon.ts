import { defineField, defineType } from "sanity";

export default defineType({
  name: "sermon",
  title: "Sermons",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Sermon Title",
      type: "string",
      validation: (rule) => rule.required(),
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
      name: "preacher",
      title: "Preacher",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date Preached",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description:
        "Paste the full YouTube URL here (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "45 min" or "1 hr 20 min"',
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
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
      description: 'Optional series name (e.g. "Faith Foundations", "ZOE Life Series")',
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Mark this sermon as featured (will appear prominently)",
      initialValue: false,
    }),
    defineField({
      name: "isPopular",
      title: "Popular",
      type: "boolean",
      description: "Mark this sermon as popular",
      initialValue: false,
    }),
    defineField({
      name: "thumbnail",
      title: "Custom Thumbnail",
      type: "image",
      description: "Optional custom thumbnail. If not provided, YouTube thumbnail will be used.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, Old",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
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
