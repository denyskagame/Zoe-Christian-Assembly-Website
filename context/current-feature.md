# Current Feature: Sanity CMS & Admin Panel

## Status

In Progress

## Goals

- Sanity v3 + `next-sanity` integration with embedded Studio at `app/studio/[[...tool]]/page.tsx` (the church's admin panel — not a separate tool)
- Seven schemas implemented: `sermon`, `event`, `announcement`, `page`, `campaign`, `givingCategory`, `siteSettings` (singleton)
- Plain-English field labels + helper text on every field; `fieldsets` to group related fields; auto-generated fields hidden
- Validation: YouTube URL pattern on `sermon.youtubeUrl`, `event.endDateTime > startDateTime`, `siteSettings.currentLivestreamId` rejects URL-like input (ID only)
- Custom Studio landing page with quick-action cards: "Add a sermon", "Create an event", "Update this Sunday's livestream link", "Post an announcement"
- `siteSettings` pinned at top of Studio sidebar
- Generated TypeScript types via `sanity typegen`
- Typed data-fetching helpers in `lib/sanity.ts`: `getSermons()`, `getSermonBySlug(slug)`, `getUpcomingEvents()`, `getAllEvents()`, `getActiveCampaigns()`, `getSiteSettings()`, `getPageBySlug(slug)`
- `@sanity/image-url` set up; `urlFor()` returns valid CDN URLs
- Sanity env vars set in `.env.local` AND Vercel (Production + Preview)
- `docs/admin-runbook.md` covering 5 common tasks: posting a sermon, creating an event, updating the Sunday livestream link, posting an announcement, recovering a deleted document
- At least one non-developer user (pastor or volunteer) granted Editor access on the Sanity project
- Publishing a sermon in Studio makes it fetchable via `getSermons()` within 60s; image uploads work end-to-end

## Notes

- **Sanity Studio IS the admin panel.** Do not build a custom admin UI to "replace" it. Avoid unnecessary plugins; the default Studio is excellent. Heavy customization = maintenance burden for marginal gain.
- The non-technical admin is the most important user. Design schemas for **clarity over flexibility**.
- `currentLivestreamId` helper text must emphasize **ID only** (e.g., `dQw4w9WgXcQ`), not full URL — this is the most common admin mistake. Validation must reject URL-like input.
- `siteSettings` must include charity fields now (used by Feature 10): `charityRegistrationNumber`, `charityLegalName`, `charityAddressOnFile`, `receiptIssuingCity`, `receiptIssuingProvince`, `authorizedSignatoryName`, `authorizedSignatureImage`, `receiptIssuingMode` (`per-donation` | `annual`), `donationReceiptThankYouMessage`.
- i18n is deferred — but use Sanity's standard field structure so a `localized` plugin can be added later without rework.
- Schema field summaries (from spec):
  - `sermon`: title, preacher, date (required); scripture, description (optional); youtubeUrl (required, validated); slug (auto from title, hidden)
  - `event`: title (required); description, coverImage (optional); startDateTime, endDateTime (required, end > start); location (optional); category enum (Sunday Service | Prayer Night | Youth | Other); recurrence enum (none | weekly | bi-weekly | monthly), recurrenceEndDate
  - `siteSettings` (singleton): churchName, address, phone, email, serviceTimes[], socialLinks[{platform,url}], currentLivestreamId, currentZoomLink, givingMessage, donationReceiptThankYouMessage, charity fields above
  - `campaign`: title, goalAmount (CAD), coverImage, description, active, slug
  - `givingCategory`: label, slug, active
  - `announcement`: title, body, active, startDate, endDate (optional)
  - `page`: title, slug, body (Portable Text), seoMetaDescription
- **Out of scope:** public-facing pages that consume this data (Features 03–06), Postgres/Prisma (Feature 08), i18n.
- **Operational follow-up to do once Sanity project exists:** invite pastor/volunteer as Editor; set env vars in Vercel for both Production and Preview environments.

## History

- **2026-04-30 — Feature 00: Codebase Cleanup & Refresh.** Foundation pass on top of `Initial commit from Create Next App`. Added Prettier + Tailwind plugin + Husky + lint-staged + .editorconfig + .vscode settings; committed `.env.example`; updated `next.config.ts` `remotePatterns`; rewrote README. Added Tailwind brand tokens (`zoe-navy`/`zoe-bronze`/`zoe-gray`) and wired Tailwind v4 to read `tailwind.config.ts` via `@config` in `globals.css` (this also fixed Hero font falling back to Georgia). Centralized `homepageSermonsQuery` in `src/sanity/lib/queries.ts`. Created `src/hooks/useScrollReveal.ts`, replacing 7 duplicated IntersectionObservers across the homepage sections plus `PageHeader`. Hero: removed inline Arial style, now uses `font-serif` (Playfair). Removed duplicate `<BackToTop />` from `page.tsx`. Enabled `noUncheckedIndexedAccess`, `noImplicitOverride`, `forceConsistentCasingInFileNames`. Wrapped `/donate` `useSearchParams()` in Suspense (Next.js 16 build fix). Added Playwright (Chromium) tests: homepage smoke + screenshot at desktop + mobile, brand-token resolution, donate page render. Final state: `tsc --noEmit` clean, `npm run build` green, `eslint .` reports 0 errors / 0 warnings, 6/6 Playwright tests passing. **Spec deviation:** kept `@stripe/react-stripe-js` because the live `/donate` page uses `EmbeddedCheckoutProvider`; deleted dead `donate/checkoutForm.tsx` (Stripe Elements). The full migration to redirect-based hosted Checkout is a separate UX-affecting refactor. **Operational follow-ups for the user:** import the repo into Vercel (production branch `main`, env vars in Production + Preview), connect the custom HTTPS domain, and set up branch protection requiring the Vercel build to pass before merging into `main`.
