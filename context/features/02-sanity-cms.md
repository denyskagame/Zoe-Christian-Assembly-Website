## Sanity CMS & Admin Panel

# Overview

Set up Sanity Studio embedded inside the Next.js app at `/studio`. **This is the church's admin panel** — not a separate third-party tool. The pastor logs in here to manage all content (sermons, events, pages, site settings). This feature delivers the schemas, the Studio UI, and the data-fetching helpers — it does NOT build the public pages that consume this data (those come in later features).

## Requirements

- Sanity v3 + `next-sanity` integration
- Embedded Studio at `app/studio/[[...tool]]/page.tsx`
- Sanity project on free tier (3 users, 10k docs)
- Schemas for: `sermon`, `event`, `announcement`, `page`, `campaign`, `givingCategory`, `siteSettings` (singleton)
- Custom Studio landing page with quick-action cards: "Add a sermon", "Create an event", "Update this Sunday's livestream link", "Post an announcement"
- All fields use plain-English labels and have helper text with examples (e.g., `title: 'Sermon title'` not `title: 'title'`)
- Validation rules: YouTube URL must match a YouTube pattern; event end time must be after start time; etc.
- Generated TypeScript types from schemas (via `sanity typegen`) so query results are typed
- Data-fetching helpers in `lib/sanity.ts`: `getSermons()`, `getSermonBySlug(slug)`, `getUpcomingEvents()`, `getAllEvents()`, `getActiveCampaigns()`, `getSiteSettings()`, `getPageBySlug(slug)`
- Image URL builder via `@sanity/image-url`
- Sanity environment variables set in both `.env.local` and Vercel
- One-page admin runbook at `docs/admin-runbook.md` covering the 5 most common tasks
- At least one user other than the developer (pastor or volunteer) given Editor access

## Updates

Sanity Studio IS the admin panel — make sure that's understood by anyone touching this. Don't build a custom admin UI to "replace" it. Don't add unnecessary plugins. The default Studio is excellent; heavy customization adds maintenance burden for marginal gain.

The non-technical admin is the most important user of this feature. Schemas should be designed for clarity, not flexibility:

- Group related fields with `fieldsets` to reduce visual clutter
- Hide auto-generated fields (slug, internal IDs) using `hidden: true` until needed, or auto-fill them
- Pin `siteSettings` at the top of the Studio sidebar — it's the most-used document
- For the YouTube live stream ID field on `siteSettings`, make it explicit in helper text that we want the **ID** (e.g., `dQw4w9WgXcQ`) not the full URL. This is the most common admin mistake. Add validation to reject anything that looks like a URL.

For the church's charity info (Feature 10 dependency), `siteSettings` also needs: `charityRegistrationNumber`, `charityLegalName`, `charityAddressOnFile`, `receiptIssuingCity`, `receiptIssuingProvince`, `authorizedSignatoryName`, `authorizedSignatureImage`, `receiptIssuingMode` (`per-donation` | `annual`), `donationReceiptThankYouMessage`. Add these now even though only Feature 10 will use them.

For multi-language (deferred to a future phase): don't build i18n now, but use Sanity's standard field structure rather than anything that would block adding a `localized` plugin later.

## Schema field summaries

### `sermon`

- `title` (string, required), `preacher` (string, required), `date` (date, required)
- `scripture` (string, optional), `youtubeUrl` (URL, required, validated), `description` (text, optional), `slug` (auto from title, hidden)

### `event`

- `title` (string, required), `description` (text, optional), `coverImage` (image, optional)
- `startDateTime`, `endDateTime` (datetime, required)
- `location` (string, optional)
- `category` (enum: Sunday Service | Prayer Night | Youth | Other)
- `recurrence` (enum: none | weekly | bi-weekly | monthly), `recurrenceEndDate` (date, optional)
- Validation: `endDateTime > startDateTime`

### `siteSettings` (singleton)

- `churchName`, `address`, `phone`, `email`, `serviceTimes` (array of strings), `socialLinks` (array of `{platform, url}`)
- `currentLivestreamId` (string, helper text emphasizing ID-only) — used by `/live` page
- `currentZoomLink` (URL, optional)
- `givingMessage` (text, shown above the giving form)
- `donationReceiptThankYouMessage` (text, shown in branded receipt email)
- Charity info fields (listed above) for Feature 10

### `campaign`

- `title`, `goalAmount` (number, in CAD), `coverImage`, `description`, `active` (boolean), `slug`

### `givingCategory`

- `label` (e.g., "Tithe", "Building Fund"), `slug`, `active`

### `announcement`

- `title`, `body`, `active` (boolean), `startDate` (optional), `endDate` (optional)

### `page`

- `title`, `slug`, `body` (Portable Text), `seoMetaDescription`

## Acceptance criteria

- `/studio` loads the embedded Studio and prompts for Sanity login
- All seven schemas exist and are editable
- Every field has a plain-English label and helper text
- The custom Studio landing page shows the quick-action cards
- Validation rules fire on bad input (test: invalid YouTube URL, end time before start time, full URL pasted into `currentLivestreamId`)
- `lib/sanity.ts` exports working, typed query helpers
- Publishing a sermon in Studio makes it fetchable via `getSermons()` within 60 seconds
- Image uploads work; `urlFor()` returns valid CDN URLs
- Sanity env vars set in local `.env.local` and Vercel (both Production and Preview)
- `docs/admin-runbook.md` exists and covers: posting a sermon, creating an event, updating the Sunday livestream link, posting an announcement, recovering a deleted document
- Pastor (or designated volunteer) can log in to Studio successfully

## Out of scope

- Public-facing pages displaying this content (Features 03–06)
- Postgres/Prisma setup (Feature 08)
- i18n / multi-language (deferred)

## References

- `@context/zoe-christian-assembly-overview.md`
- `@features/01-foundation.md`
- Sanity docs: https://www.sanity.io/docs
- next-sanity docs: https://www.sanity.io/plugins/next-sanity
