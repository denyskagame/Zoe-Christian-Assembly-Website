import { defineField, defineType } from "sanity";

export default defineType({
  name: "announcement",
  title: "Announcements",
  type: "document",
  fieldsets: [
    { name: "schedule", title: "When to show", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description:
        'Short, attention-grabbing line shown to visitors (e.g., "Christmas service moved to 11 AM").',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "body",
      title: "Message",
      type: "text",
      rows: 4,
      description: "The full announcement text. 1–3 sentences works best.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      description: "Turn this off to hide the announcement without deleting it.",
      initialValue: true,
    }),
    defineField({
      name: "startDate",
      title: "Start showing on",
      type: "date",
      description: "Optional. Leave blank to show immediately while active.",
      fieldset: "schedule",
    }),
    defineField({
      name: "endDate",
      title: "Stop showing on",
      type: "date",
      description: "Optional. Leave blank to keep showing until you turn it off.",
      fieldset: "schedule",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = (context.document as { startDate?: string } | undefined)?.startDate;
          if (!endDate || !startDate) return true;
          return new Date(endDate) >= new Date(startDate)
            ? true
            : "End date must be the same as or after the start date.";
        }),
    }),
  ],
  preview: {
    select: { title: "title", active: "active", startDate: "startDate" },
    prepare({ title, active, startDate }) {
      const status = active ? "Active" : "Hidden";
      const when = startDate ? ` • starts ${startDate}` : "";
      return { title, subtitle: `${status}${when}` };
    },
  },
});
