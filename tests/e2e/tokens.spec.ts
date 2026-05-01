import { test, expect } from "@playwright/test";

test("brand tokens resolve to brand colors", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  // Inject a probe element using each brand token and read its computed color back.
  const colors = await page.evaluate(() => {
    const probe = (cls: string) => {
      const el = document.createElement("div");
      el.className = cls;
      document.body.appendChild(el);
      const c = getComputedStyle(el).backgroundColor;
      el.remove();
      return c;
    };
    return {
      navy: probe("bg-zoe-navy"),
      bronze: probe("bg-zoe-bronze"),
      gray: probe("bg-zoe-gray"),
    };
  });

  // navy = #303552 = rgb(48, 53, 82)
  expect(colors.navy).toBe("rgb(48, 53, 82)");
  // bronze = #a5876d = rgb(165, 135, 109)
  expect(colors.bronze).toBe("rgb(165, 135, 109)");
  // gray = #ECECEC = rgb(236, 236, 236)
  expect(colors.gray).toBe("rgb(236, 236, 236)");
});
