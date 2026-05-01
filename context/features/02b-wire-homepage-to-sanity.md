## Wire Homepage Sections to Sanity (Refactor)

# Overview

The homepage is visually complete but hardcoded. Every section currently embeds church-specific data (service times, address, Zoom link, headlines, scripture quotes, stats, fund names) directly in component code. This feature **expands the `siteSettings` schema** with all the missing fields and **refactors the existing homepage components** to consume them.

The pastor must be able to update everything visible on the site without touching code. This feature is what makes that true.

This is a refactor, not a new feature — every component already exists. Goal is to swap hardcoded values for Sanity-driven values without changing the visual output.

## Requirements

### Expand `siteSettings` schema

Add the following fields to the existing `siteSettings` singleton (Feature 02). All fields use plain-English labels and helper text. Group with `fieldsets` so the form stays manageable.

#### Fieldset: "Hero Section"

- `heroHeadline` (string, required) — helper: "Main headline on the homepage. Supports line breaks. Example: 'Empowering You to Live the Life of Jesus Abundantly'"
- `heroEmphasisWord` (string, optional) — helper: "Word to render in uppercase serif (e.g., 'JESUS'). Leave blank if not needed."
- `heroBackgroundImage` (image, required) — the worship-hands image, currently Cloudinary
- `heroDecorativeImage` (image, optional) — the brushstroke under the headline
- `heroPrimaryCtaLabel` (string, default: "Plan Your Visit")
- `heroPrimaryCtaUrl` (string, default: "/plan-visit")
- `heroSecondaryCtaLabel` (string, default: "Join Us Live") — the Zoom button label

#### Fieldset: "Service Information"

- `serviceTimes` (array of `{label, time}` objects) — each has `label` (e.g., "Every Sunday") and `time` (e.g., "2 PM – 4 PM"). Replaces the existing single `serviceTimes` array.
- `address` (object: `street`, `city`, `province`, `postalCode`, `country`) — replaces single string. Helper text on each field.
- `serviceInfoHeading` (string, default: "Join Us for Worship")
- `serviceInfoDescription` (text, optional) — the paragraph below the heading
- `serviceInfoFeatures` (array of strings, default: `["All ages welcome", "Family-friendly environment"]`) — the bottom badges

#### Fieldset: "Welcome Section"

- `welcomeHeadline` (text, required) — the bold paragraph that opens the section
- `welcomeBody` (text, required) — the paragraph beneath
- `welcomeQuote` (object: `text`, `reference`) — e.g., text: "The thief comes only to steal...", reference: "John 10:10 NIV"
- `welcomeBackgroundImage` (image, required)
- `welcomeFeatureImage` (image, required) — the right-column "JESUS" image
- `welcomeStats` (array of `{value, label}`, max 3) — e.g., `{value: "3+", label: "Years Ministry"}`. Replaces hardcoded stats.
- `welcomeValues` (array of `{icon, title, description}`, exactly 3) — Scripture-Centered, Authentic Community, Global Impact cards. `icon` is an enum from a fixed list (`book`, `users`, `globe`, `heart`, `cross`, `dove`).
- `welcomePrimaryCtaLabel` (string, default: "Our Story") + `welcomePrimaryCtaUrl` (default: `/about`)
- `welcomeSecondaryCtaLabel` (string, default: "What We Believe") + `welcomeSecondaryCtaUrl` (default: `/beliefs`)

#### Fieldset: "Requests Section"

- `requestsBackgroundImage` (image, required)
- `requestsHeading` (string, default: "We're Here For You!")
- `requestsSubheading` (text)
- `requestCards` (array of `{icon, title, description, ctaLabel, ctaUrl}`, exactly 3) — replaces the hardcoded three cards. `icon` is an enum from a fixed list (`users`, `praying-hands`, `chat`, `heart`, `book`).

#### Fieldset: "Giving Section"

- `givingHeading` (string, default: "Make a Difference Through Giving")
- `givingDescription` (text)
- `givingQuote` (object: `text`, `reference`) — the 2 Corinthians 9:7 quote
- `givingPresetAmounts` (array of integers, default: `[25, 50, 100, 250]`)
- `givingDefaultPreset` (integer, default: `50`)
- `givingTrustSignals` (array of strings, default: `["Flexible giving options", "100% secure SSL payment", "Instant tax receipts"]`)
- `etransferEmail` (string, optional) — for the "Prefer E-transfer?" footer line. If blank, footer line is hidden.

#### Fieldset: "Sermons Section"

- `sermonsHeading` (string, default: "Sermons & Podcasts")
- `sermonsSubheading` (text)
- `youtubeChannelUrl` (URL, required) — for the "View All Sermons" button

#### Fieldset: "Programs Section"

- `programsHeading` (string, default: "Church Programs")
- `programsSubheading` (text)

#### Fieldset: "Existing fields" (already specced in Feature 02 — confirm present)

- `currentLivestreamId`, `currentZoomLink`, `socialLinks`
- All charity-info fields (Feature 10): `charityRegistrationNumber`, `charityLegalName`, `charityAddressOnFile`, `receiptIssuingCity`, `receiptIssuingProvince`, `authorizedSignatoryName`, `authorizedSignatureImage`, `receiptIssuingMode`, `donationReceiptThankYouMessage`

### Tailwind brand tokens

Add the brand colors as proper Tailwind tokens in `tailwind.config.ts`:

```ts
colors: {
  // ...existing shadcn tokens...
  "zoe-navy": "var(--color-navy)",
  "zoe-bronze": "var(--color-brown)",
  "zoe-gray": "var(--color-gray)",
}
```

Then migrate components from `bg-[#303552]` / `text-[#a5876d]` / `bg-[#ECECEC]` to `bg-zoe-navy` / `text-zoe-bronze` / `bg-zoe-gray`. Can be done incrementally, but new code must use the tokens.

### Refactor each homepage component

For each section, replace hardcoded values with props or Sanity reads. Pattern:

```tsx
// Server component (e.g., src/app/page.tsx)
import { getSiteSettings } from "@/lib/sanity";
import { Hero } from "@/components/sections/Hero";

export default async function Home() {
  const settings = await getSiteSettings();
  return (
    <main>
      <Hero settings={settings} />
      <ServiceInfo settings={settings} />
      <WelcomeSection settings={settings} />
      {/* ... */}
    </main>
  );
}
```

Each section component becomes a presentation component receiving its data via props. The IntersectionObserver / animation logic stays exactly as is.

### Components to refactor

- `Hero.tsx` — props: `settings.heroHeadline`, `heroEmphasisWord`, `heroBackgroundImage`, `heroDecorativeImage`, CTA labels/URLs, `currentZoomLink`
- `ServiceInfo.tsx` — props: `serviceTimes[0]`, `address`, `serviceInfoHeading`, `serviceInfoDescription`, `serviceInfoFeatures`
- `WelcomeSection.tsx` — props: all `welcome*` fields
- `ProgramsSection.tsx` — fetches its own data via `getUpcomingEvents()` (already specced); props for heading/subheading
- `SermonsSection.tsx` — already fetches sermons; props for heading/subheading and `youtubeChannelUrl`. **Also: replace iframes with facade pattern (Feature 04 dependency).**
- `RequestsSection.tsx` — props: `requestCards`, `requestsBackgroundImage`, heading/subheading
- `GivingSection.tsx` — props: all `giving*` fields, `etransferEmail`. Fetches `givingCategory` documents for the FUNDS dropdown.

### Image handling

All Sanity images must use the `urlFor()` helper from `lib/sanity.ts`:

```tsx
<Image
  src={urlFor(settings.heroBackgroundImage).width(1600).url()}
  alt={settings.heroBackgroundImage.alt ?? "Worship"}
  width={1600}
  height={1600}
  priority
/>
```

Make sure every Sanity image field has an `alt` text input — required for accessibility, easy to forget.

Update `next.config.ts` to allow Sanity's CDN:

```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
    { protocol: 'https', hostname: 'img.youtube.com', pathname: '/**' },
    { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }, // keep for now during transition
  ],
},
```

Once all images are migrated to Sanity, the Cloudinary entry can be removed.

### Mailto fallback for RequestsSection (Phase 1)

The three CTAs in `RequestsSection` link to `/connect`, `/prayer-request`, `/share-testimony` — pages that don't exist and aren't in our spec. For Phase 1, the pastor should configure these as `mailto:` links via Sanity:

```
ctaUrl: "mailto:info@zoechristianassembly.org?subject=I'm new at ZCA"
ctaUrl: "mailto:prayer@zoechristianassembly.org?subject=Prayer Request"
ctaUrl: "mailto:info@zoechristianassembly.org?subject=Testimony"
```

Real submission forms with backend handling become a future phase if the pastor specifically asks for them.

### Bug fixes flagged in audit

- **Remove inline `style={{ fontFamily: "Arial, sans-serif" }}`** from Hero headline. Replace with `className="font-serif"` to use Playfair Display. This is the single biggest visual quick-win.
- **Remove duplicate `<BackToTop />`** from `src/app/page.tsx`. It's already in `layout.tsx` and should only render once.
- **SermonsSection card contrast** — change card `bg-[#ececec]` to `bg-white` so cards stand out against the gray section background.
- **SermonsSection iframes** — replace with facade pattern per Feature 04. ~1.5MB of unnecessary JavaScript currently loads on the homepage.
- **Verify `@/sanity/lib/client` exists** — if not, create it. SermonsSection currently imports it.

### Route alignment

GivingSection currently routes to `/donate?amount=...&frequency=...&fund=...`. The spec uses `/give`. **Decision: keep `/give` as the canonical route** (matches spec, slightly more church-friendly word than donate). Update `GivingSection.handleGiveNow()` to push to `/give?...` instead.

## Updates

This refactor is the most important hour-for-hour investment in the build. Every minute spent now on field structure saves hours later when the pastor wants to tweak copy.

**Don't try to do this all at once.** Suggested order:

1. Expand the schema in Sanity Studio first (one PR). Verify it loads, validates, and the admin can populate it.
2. Add Tailwind brand tokens (one PR, small, low-risk).
3. Refactor one section at a time, starting with `ServiceInfo` (smallest, highest-value) → `Hero` → `WelcomeSection` → `RequestsSection` → `GivingSection`. Each section is a separate PR.
4. Migrate hardcoded hex colors to brand tokens as you touch each file. No need for a separate "color migration" PR.
5. Wire `SermonsSection` and `ProgramsSection` to real Sanity queries last (they already partially are).

**Why server components for the homepage:**

The current sections are all `"use client"` because of IntersectionObserver. Keep them as client components, but turn `page.tsx` into a **server component** that fetches `siteSettings` once and passes data down. This avoids running the Sanity query on the client and gives ISR caching for free.

```tsx
// page.tsx (server component, no "use client")
import { getSiteSettings } from "@/lib/sanity";

export default async function Home() {
  const settings = await getSiteSettings();
  return (
    <main>
      <Hero settings={settings} />
      {/* ... */}
    </main>
  );
}
```

**ISR config** — set `revalidate: 60` on the page so admin changes appear within a minute without a full rebuild.

**Don't skip the alt text.** Every Sanity image field gets an `alt` input. Helper text on the field: "Describe the image for screen readers and visually impaired visitors. Example: 'People worshipping with hands raised'."

**Validation hint:** Add Sanity validation to require headlines and CTAs to be non-empty so the pastor can't accidentally publish a broken homepage. Example:

```ts
defineField({
  name: "heroHeadline",
  type: "string",
  validation: (Rule) => Rule.required().min(10).max(120),
});
```

**On the GivingSection FUNDS array:** Currently hardcoded as `["Tithe", "Offering", "Missions", "Building Fund"]`. Should fetch live from Sanity `givingCategory` documents. The schema already exists per Feature 02. Use the same pattern as SermonsSection — `useEffect` + `client.fetch` — or pass the categories as a prop from the server component.

**On the Welcome stats:** consider deeply whether these belong on the site at all. Numbers go stale, and "3 Countries Reached" is hard to verify and easy to misinterpret. If kept, make sure the pastor commits to updating them quarterly. If not, propose removing them — the section reads fine without.

## Acceptance criteria

- All 30+ new fields exist in the `siteSettings` Sanity schema with helper text and validation
- Pastor can update every visible piece of homepage copy, every image, and every CTA from Sanity Studio without code changes
- Homepage renders identically to the current design when populated with the existing values
- All sections receive their data via props or `getSiteSettings()` (no hardcoded strings, hex codes, or Cloudinary URLs in component files)
- All images load from Sanity's CDN via `urlFor()` (Cloudinary URLs migrated)
- Tailwind brand tokens (`zoe-navy`, `zoe-bronze`, `zoe-gray`) defined and used in new code
- Hero headline uses Playfair Display (no inline Arial override)
- `BackToTop` rendered exactly once (from `layout.tsx`, not duplicated in `page.tsx`)
- SermonsSection cards have visible contrast against the section background
- SermonsSection uses YouTube facade pattern (no iframes loading on initial page mount)
- GivingSection routes to `/give` (not `/donate`)
- RequestsSection CTAs work as `mailto:` links pulled from Sanity
- ISR set to `revalidate: 60` so admin updates appear within a minute
- Updating any field in Sanity Studio is reflected on the homepage within 60 seconds
- Sanity validation prevents publishing the homepage with empty required fields
- Lighthouse Performance ≥ 90 on the homepage (was being dragged down by the 3 sermon iframes)

## Out of scope

- Real submission handling for `/connect`, `/prayer-request`, `/share-testimony` — Phase 2+ (mailto for now)
- Building any new sections — only refactoring existing ones
- Changing the visual design — pixel-identical output
- Multi-language support — deferred
- Member-account-gated content — Phase 2+

## References

- `@context/zoe-christian-assembly-overview.md`
- `@features/02-sanity-cms.md` — base schema definitions
- `@features/04-sermons.md` — facade pattern for YouTube embeds
- `@features/03-public-pages.md` — global layout and ISR strategy
- `@features/08-giving-stripe.md` — `/give` route convention
- Sanity image hotspot/crop docs: https://www.sanity.io/docs/image-type
- Sanity validation docs: https://www.sanity.io/docs/validation
