"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { StudioLogo } from "./src/sanity/components/StudioLogo";
import { zoeStudioTheme } from "./src/sanity/theme";

const SINGLETON_TYPES = new Set<string>(["siteSettings"]);
const SINGLETON_DISABLED_ACTIONS = new Set(["duplicate", "delete", "unpublish"]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  theme: zoeStudioTheme,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  document: {
    // Hide singletons from the global "+ Create" menu — they're edited from the
    // pinned sidebar entry only.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((tpl) => !SINGLETON_TYPES.has(tpl.templateId))
        : prev,
    // Remove destructive actions on singletons.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter((action) => !action.action || !SINGLETON_DISABLED_ACTIONS.has(action.action))
        : prev,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
