## Public Pages — Home, About, Beliefs, Contact, Ministries

# Overview

Build the static-content public pages of the church website. These are what a first-time visitor lands on. They consume content from Sanity (Feature 02) and define the visual identity of the site. Other public pages (Sermons, Calendar, Live, Give) are complex enough to be specced separately.

## Requirements

- Global layout (`app/layout.tsx`) with header (logo, nav, mobile hamburger) and footer (address, phone, email, social links) — both pull from Sanity `siteSettings`
- Home page (`/`):
  - Hero with church name, tagline, primary CTA ("Watch this Sunday's service")
  - Service times block
  - Active announcement banner (if any active announcement exists in Sanity)
  - "Upcoming events" section — next 3 events from Sanity
  - "Recent sermons" section — latest 3 sermons from Sanity
  - About preview with link to full About page
- About page (`/about`) — pulls from Sanity `page` document with slug `about`, renders Portable Text
- Beliefs page (`/beliefs`) — same pattern, slug `beliefs`
- Ministries page (`/ministries`) — same pattern, slug `ministries`
- Contact page (`/contact`):
  - Address, phone, email from `siteSettings`
  - Embedded Google Map (iframe, no API key needed)
  - Service times
  - Social links
- Per-page SEO metadata (`<title>`, `<meta description>`, OG image) via Next.js `metadata` API
- JSON-LD `Organization` schema on homepage and Contact page
- `app/sitemap.ts` and `app/robots.ts` (Next.js auto-generates `sitemap.xml` and `robots.txt`)
- ISR: `revalidate: 60` so admin changes appear within a minute
- Mobile-responsive at 320px, 768px, 1280px
- All images use `next/image` with alt text
- WCAG AA accessibility (semantic HTML, keyboard nav, focus rings, contrast ≥ 4.5:1)

## Updates

This is the feature where the site's visual identity is established. Don't default to generic Tailwind starter aesthetics — a church website should feel warm, welcoming, and rooted in place, not like a SaaS landing page.

Things to do well here:

- **Pick a distinctive font pairing.** Avoid Inter, Roboto, and other overused choices. Look at Google Fonts for serifs with character (Fraunces, Cormorant, Lora, EB Garamond) paired with a clean sans for UI (Manrope, DM Sans, Public Sans).
- **Color palette should be decided with the pastor.** It represents the church. Avoid generic blue-and-white. Earth tones, deep colors, or whatever matches existing church visual identity (banners, logo) usually fits better.
- **Real photos beat stock photos.** If real photos aren't available yet, lean on strong typography rather than bad stock.
- **Avoid the cliché church-site layout** of "hero with smiling diverse crowd → service times → big donate button". A more editorial layout (asymmetric grid, generous white space, distinctive typography) signals care and intentionality.

Ask the pastor for: existing logo, brand colors (if any), 5–10 photos of the church and recent events, and the tone they want the site to project (traditional? contemporary? family-focused?).

**On the contact form:** strongly recommend not building one in Phase 1. A `mailto:` link is more reliable, gives the sender a record in their own sent folder, and requires zero ongoing maintenance. If the pastor specifically requests a form later, add it then.

**On performance:** the homepage above-the-fold should be simple. Avoid client-side JavaScript except for the mobile menu toggle. Don't import a heavy icon library — `lucide-react` from shadcn is enough.

## Acceptance criteria

- All five pages render in production with content from Sanity
- Header and footer appear on every page, pulling from `siteSettings`
- Active announcement banner appears on the homepage when an active announcement exists, disappears when none active
- Homepage shows the 3 nearest upcoming events (sorted ascending) and 3 most recent sermons (sorted descending)
- Mobile-responsive at 320px, 768px, 1280px
- Lighthouse on each page (mobile): Performance ≥ 90, Accessibility 100, SEO 100, Best Practices ≥ 95
- All images use `<Image>` and have alt text
- `sitemap.xml` includes all public pages
- Admin changes the church name in Sanity → reflects in header/footer within 60 seconds
- All pages load in under 1.5s LCP on a fast connection
- Color contrast passes WCAG AA on every page

## Out of scope

- Sermons listing (Feature 04)
- Events / Calendar (Feature 05)
- Live page (Feature 06)
- Give page (Feature 08)
- Contact form (deferred — `mailto` link is fine)
- Multi-language / i18n (deferred)
- Search functionality

## References

- `@context/zoe-overview.md`
- `@features/02-sanity-cms.md`
