import { defineField, defineType } from "sanity";

export default defineType({
  name: "givingCategory",
  title: "Giving Categories",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Category name",
      type: "string",
      description:
        'Shown to donors when they choose where to give (e.g., "Tithe", "Building Fund").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Internal ID",
      type: "slug",
      description: "Auto-generated from the name. Used internally to track donations.",
      options: { source: "label", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "active",
      title: "Show on the giving page",
      type: "boolean",
      description: "Turn this off to retire a category without losing past donation history.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "label", active: "active" },
    prepare({ title, active }) {
      return { title, subtitle: active ? "Active" : "Hidden" };
    },
  },
});
