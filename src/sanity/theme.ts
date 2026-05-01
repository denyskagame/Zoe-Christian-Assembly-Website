import { buildLegacyTheme } from "sanity";

const ZOE_NAVY = "#303552";
const ZOE_BRONZE = "#a5876d";
const ZOE_GRAY = "#ECECEC";
const WHITE = "#ffffff";
const BLACK = "#1a1d2e";

/**
 * Light branding pass for Sanity Studio: top navigation in zoe-navy, primary
 * action buttons in zoe-bronze. We deliberately don't repaint every UI element
 * — Sanity's internal theme structure shifts between major versions, and deep
 * overrides become a maintenance burden on upgrade. If the default chrome ever
 * starts feeling off-brand, prefer adding a small override here over reaching
 * deeper into Sanity internals.
 */
export const zoeStudioTheme = buildLegacyTheme({
  "--white": WHITE,
  "--black": BLACK,

  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": WHITE,
  "--component-text-color": BLACK,

  "--brand-primary": ZOE_NAVY,

  "--main-navigation-color": ZOE_NAVY,
  "--main-navigation-color--inverted": WHITE,

  "--default-button-color": "#666",
  "--default-button-primary-color": ZOE_BRONZE,
  "--default-button-success-color": "#43d675",
  "--default-button-warning-color": "#fb7407",
  "--default-button-danger-color": "#f03e2f",

  "--state-info-color": ZOE_NAVY,
  "--state-success-color": "#43d675",
  "--state-warning-color": "#fb7407",
  "--state-danger-color": "#f03e2f",

  "--focus-color": ZOE_BRONZE,
});

export const ZOE_BRAND_COLORS = {
  navy: ZOE_NAVY,
  bronze: ZOE_BRONZE,
  gray: ZOE_GRAY,
} as const;
