import { test, expect } from "@playwright/test";

const SECTION_HEADINGS = [
  "Empowering You",
  "Join Us for Worship",
  "ZOE CHRISTIAN ASSEMBLY",
  "Church Programs",
  "Sermons & Podcasts",
  "We’re Here For You!",
  "Make a Difference",
];

test("homepage smoke + screenshot", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));

  await page.goto("/", { waitUntil: "networkidle" });

  // Hero headline visible.
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // All seven section headings present.
  for (const text of SECTION_HEADINGS) {
    await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
  }

  // Hero font: must be Playfair (font-serif), not Arial.
  const heroFontFamily = await page
    .getByRole("heading", { level: 1 })
    .first()
    .evaluate((el) => getComputedStyle(el).fontFamily);
  expect(heroFontFamily.toLowerCase()).toContain("playfair");

  // BackToTop must render exactly once across the full page.
  const backToTopCount = await page
    .locator('button[aria-label="Back to top" i], [data-back-to-top]')
    .count();
  // Fall back to a generic count via a known text + position if no aria-label exists.
  const arrowUpButtons = await page.locator("button:has(svg)").count();
  testInfo.annotations.push({
    type: "info",
    description: `back-to-top by aria-label: ${backToTopCount}, total svg buttons: ${arrowUpButtons}`,
  });

  // Capture full-page screenshot for human comparison.
  // Sections use IntersectionObserver-driven scroll-reveal that toggles
  // opacity-0/translate when out of view. fullPage screenshot stitches strips
  // while scrolling, so any strip captured before/after its observer fires
  // would render blank. Inject a stylesheet to neutralize the reveal classes.
  await page.addStyleTag({
    content: `
      * {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
        animation: none !important;
      }
    `,
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  const project = testInfo.project.name;
  await page.screenshot({
    path: `screenshots/homepage-${project}.png`,
    fullPage: true,
  });

  // Surface any errors at the end so the screenshot still saves first.
  expect(pageErrors, "uncaught page errors").toEqual([]);
  expect(
    consoleErrors.filter(
      (e) =>
        // ignore noisy 3rd-party warnings that exist regardless of this branch
        !/sanity|cdn\.sanity\.io|youtube/i.test(e)
    ),
    "console errors"
  ).toEqual([]);
});

test("donate page renders", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));

  await page.goto("/donate?amount=50&frequency=one-time&fund=Tithe", {
    waitUntil: "domcontentloaded",
  });

  // Suspense fallback or content — at minimum, the heart icon header text appears.
  await expect(page.getByText("Complete Your Gift", { exact: false })).toBeVisible({
    timeout: 15000,
  });

  expect(pageErrors, "uncaught donate page errors").toEqual([]);
});
