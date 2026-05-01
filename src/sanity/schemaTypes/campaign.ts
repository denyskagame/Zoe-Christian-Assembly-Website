import { defineField, defineType } from "sanity";

export default defineType({
  name: "campaign",
  title: "Giving Campaigns",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Campaign title",
      type: "string",
      description: 'The name visitors will see (e.g., "Building Fund 2026").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL path",
      type: "slug",
      description: 'Used in the link to this campaign (e.g., "building-fund-2026").',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "goalAmount",
      title: "Goal amount (CAD)",
      type: "number",
      description: 'Total fundraising target in Canadian dollars. Numbers only — no "$" sign.',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      description: "Optional. Recommended size: 1200×600 pixels.",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Campaign description",
      type: "array",
      description: "Tell people what this campaign is for and why it matters.",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "active",
      title: "Show on the giving page",
      type: "boolean",
      description: "Turn this off to archive the campaign without deleting it.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", active: "active", goalAmount: "goalAmount", media: "coverImage" },
    prepare({ title, active, goalAmount, media }) {
      const status = active ? "Active" : "Archived";
      const goal = goalAmount ? ` • $${goalAmount.toLocaleString()} CAD` : "";
      return { title, subtitle: `${status}${goal}`, media };
    },
  },
});
