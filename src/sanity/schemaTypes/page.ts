import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: 'Shown in the browser tab and at the top of the page (e.g., "What We Believe").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL path",
      type: "slug",
      description:
        'The part of the URL after the domain (e.g., "what-we-believe" → /what-we-believe).',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Page content",
      type: "array",
      description: "Write the page content here. Use the toolbar for headings, lists, and links.",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "seoMetaDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      description:
        "Shown by Google in search results. 1–2 sentences, ideally under 160 characters.",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}` : "no URL set" };
    },
  },
});
