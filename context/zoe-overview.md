# Zoe Christian Assembly

> **Gather · Worship · Give**

A church website for Zoe Christian Assembly — a small congregation in Sherbrooke, Quebec. Built to be a welcoming online home for members, an unmistakable invitation for visitors, and a quiet, capable back-office for the pastor. Modern, editorial, and intentionally not the blue-and-white church-website cliché.

---

---

## Problem

Small churches are stuck between three bad options for going online:

| Pain point                                 | Current reality                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| WhatsApp / Facebook posts for service info | Buried, missed, no permanent record                                    |
| Free site builders (Wix, Squarespace)      | Generic templates, no Stripe + receipt control, locked-in monthly fees |
| Custom-built sites by volunteers           | Half-finished, never updated, abandoned within a year                  |

Beyond the tooling, the practical jobs a church website actually needs to do:

- Let a first-time visitor decide "yes, I'll come Sunday" within 30 seconds
- Let a member give online, with a **CRA-compliant tax receipt** they can hand to their accountant
- Let a remote attendee join the live service or Zoom in one click
- Let the pastor or a volunteer publish a sermon, post an event, or update Sunday's livestream link without writing code or calling a developer

Most church sites do none of these well. This one does all of them.

---

## Solution

A modern, **public-first** website where every page that matters is open to everyone, no login walls, and the back-office complexity is hidden inside Sanity Studio.

- **Public site** — every visitor sees the live stream, sermons, events, and giving page. No accounts in Phase 1.
- **Sanity Studio at `/studio`** — the church's admin panel. Pastor or volunteer logs in, manages everything through plain-English forms.
- **Stripe Checkout** — secure giving, one-time or recurring, no card data ever touching our server.
- **CRA-compliant receipts** — generated as PDFs, emailed to donors, archived for the 6-year retention requirement.
- **YouTube Live embed** — the `/live` page mirrors the church's existing YouTube broadcast. Free, reliable, recordings become the sermon library automatically.

---

## Target Users

| Persona                      | What they do on the site                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **First-time visitor**       | Lands on the homepage. Reads service times, watches a recent sermon, decides whether to come Sunday.       |
| **In-person member**         | Looks up an event, watches a sermon they missed, gives an offering during the week.                        |
| **Remote attendee**          | Joins the live stream or Zoom call on Sunday morning. May give online too.                                 |
| **Diaspora / former member** | Watches sermons asynchronously, gives occasionally to stay connected.                                      |
| **Pastor / admin**           | Posts sermons after Sunday, creates events, updates the livestream link before service, reviews donations. |

---

## Description

Zoe Christian Assembly is a Sherbrooke, Quebec church. The website is its first real online presence — replacing scattered Facebook posts and ad-hoc messaging with a single home that visitors can find, members can rely on, and the pastor can actually maintain.

The site launches **English-only**. A French version is on the roadmap (Sherbrooke is in Quebec; many visitors will speak French) but is deferred to a later phase to keep the launch tight. All UI text is centralized in a way that makes adding French later mechanical, not archaeological.

The site has **no member accounts in Phase 1.** Everything public is open to everyone. Member registration with personal dashboards is documented as a Phase 2 addition — but the architecture (Postgres set up from day one, `userId` columns reserved on donations, empty `(auth)` route group in the folder tree) is built so adding it later is incremental, not a rewrite.

---

### Homepage (Public — `/`)

The homepage is where a curious visitor decides whether this church is for them. Every section earns its place.

**Design philosophy:**

- Editorial, restrained, sophisticated — not a SaaS landing page, not a generic church template
- Light theme by default (warm, welcoming feel matches the church context)
- Heavy use of subtle motion: fade-up, blur-in, line-grow, hover-lift, pulse-soft — Linear-style polish
- Generous white space, asymmetric grid, large typography
- Real photos of the actual church and congregation when available; strong typography otherwise

**Sections (top to bottom, all already scaffolded as components):**

1. **Hero** — Tagline, one-liner about the church, primary CTA ("Watch this Sunday's service" → `/live`), secondary CTA ("Plan a visit" → `/contact`). Background uses the noise-overlay texture for depth.
2. **Service Info** — Service times, address, "Join Sunday Service via Zoom" button (when `currentZoomLink` is set in Sanity).
3. **Welcome Section** — Short message from the pastor, link to full About page. Establishes the church's voice.
4. **Programs Section** — Next 3 upcoming events from Sanity. Cards with date, title, and "Add to calendar" link. Full calendar at `/events`.
5. **Sermons Section** — Latest 3 sermons from Sanity. YouTube thumbnails, preacher names, dates. Full library at `/sermons`.
6. **Requests Section** — Prayer requests / contact form area. (Phase 1: `mailto` link. Phase 2: a real form with submission handling once member accounts exist.)
7. **Giving Section** — Brief, dignified ask with a "Give now" button → `/give`. Mentions tax receipts as a benefit.
8. **Footer** — Address, phone, email, social links, copyright. Pulls from Sanity `siteSettings`.
9. **BackToTop** button — pill-shaped, appears on scroll, brand-bronze.

---

### Public Pages

| Route             | Purpose                                                                              | Notes                                                              |
| ----------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `/`               | Homepage                                                                             | Above                                                              |
| `/about`          | Church history, mission, pastor bio                                                  | Sanity `page` with slug `about`                                    |
| `/beliefs`        | Statement of faith                                                                   | Sanity `page` with slug `beliefs`                                  |
| `/ministries`     | Ministry overviews (kids, youth, worship, outreach)                                  | Sanity `page` with slug `ministries`                               |
| `/contact`        | Address, phone, email, embedded Google Map                                           | Pulls from `siteSettings`                                          |
| `/sermons`        | Paginated archive (12/page, sorted newest first)                                     | YouTube facade-pattern embeds for performance                      |
| `/sermons/[slug]` | Individual sermon                                                                    | Pre-rendered, prev/next navigation, JSON-LD VideoObject            |
| `/events`         | Tabs: Upcoming (list) + Calendar (FullCalendar month/week/list)                      | Recurring events expanded server-side via `rrule`                  |
| `/events/[slug]`  | Individual event                                                                     | "Add to calendar" generates `.ics` and Google Calendar links       |
| `/live`           | YouTube Live embed (current Sunday) or "not live" placeholder with next service time | Auto-detects from `currentLivestreamId` field in Sanity            |
| `/give`           | Giving form: amount, category, one-time/recurring                                    | Stripe Checkout (hosted) — donor address required for tax receipts |
| `/give/campaigns` | Active fundraising campaigns                                                         | Progress bars, individual campaign pages                           |
| `/give/thank-you` | Post-checkout confirmation                                                           |                                                                    |
| `/studio`         | **Sanity Studio — the admin panel**                                                  | Embedded inside Next.js, Sanity handles auth                       |
| `/admin/receipts` | Tax receipts admin tool                                                              | Basic-auth gated (Phase 1)                                         |

---

### Studio / Admin Panel (`/studio`)

**Sanity Studio is the admin panel.** It runs inside the Next.js app at `/studio`, not as a separate service. The pastor logs in here to manage everything.

**Sidebar (configured via Sanity's `structure` builder):**

| Item              | Purpose                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quick Actions     | Custom landing page with 4 large cards: Add Sermon · Create Event · Update This Sunday's Livestream · Post Announcement                                     |
| Site Settings     | Singleton — church name, address, service times, current livestream YouTube ID, current Zoom link, charity registration info, signature image, social links |
| Sermons           | List of all sermons, newest first                                                                                                                           |
| Events            | One-time and recurring events                                                                                                                               |
| Pages             | About, Beliefs, Ministries (rich text via Portable Text)                                                                                                    |
| Announcements     | Active homepage banners                                                                                                                                     |
| Campaigns         | Donation campaigns with goal amounts and progress                                                                                                           |
| Giving Categories | Tithe, Offering, Building Fund, Missions, etc.                                                                                                              |

**Designed for a non-technical admin:**

- Plain-English field labels with helper text (e.g., "Date the sermon was preached" not `preachedAt`)
- Validation catches mistakes before publish (YouTube URL must look like a YouTube URL; event end time must follow start time)
- Auto-generated fields hidden by default
- Sanity's built-in 30-day trash for accidental deletes

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│              Visitors / Donors / Pastor                  │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│              Next.js 16 App  (Vercel)                    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────┐  │
│  │  Public pages  │  │  /give → Stripe│  │  /studio   │  │
│  │  (ISR, SSG)    │  │    Checkout    │  │  (Sanity   │  │
│  │                │  │  (guest-friendly)│ │  Studio)   │  │
│  └────────────────┘  └────────────────┘  └────────────┘  │
│         Server Actions / API Routes                      │
│         Webhook: /api/stripe/webhook                     │
└─────────┬───────────────┬──────────────────┬─────────────┘
          │               │                  │
          ▼               ▼                  ▼
   ┌────────────┐   ┌────────────┐   ┌──────────────┐
   │ PostgreSQL │   │   Stripe   │   │    Sanity    │
   │   (Neon)   │   │ (payments) │   │  (CMS / CDN) │
   │  Donations │   │            │   │              │
   │ TaxReceipts│   │            │   │              │
   │  EmailLogs │   │            │   │              │
   └────────────┘   └────────────┘   └──────────────┘
                            │
            ┌───────────────┼─────────────────┐
            ▼               ▼                 ▼
      ┌──────────┐   ┌─────────────┐   ┌───────────┐
      │  Resend  │   │   Vercel    │   │  YouTube  │
      │ (emails) │   │    Blob     │   │   Live    │
      │          │   │ (PDF store) │   │           │
      └──────────┘   └─────────────┘   └───────────┘
```

---

## Tech Stack

### Currently installed (verified from package.json)

| Layer                | Tool                                   | Version             |
| -------------------- | -------------------------------------- | ------------------- |
| Framework            | Next.js                                | 16.1.1 (App Router) |
| Runtime              | React                                  | 19.2.3              |
| Language             | TypeScript                             | 5.x                 |
| Styling              | Tailwind CSS                           | v4                  |
| Animation            | tw-animate-css + custom keyframes      | 1.4                 |
| Component primitives | shadcn/ui (New York style, slate base) | —                   |
| Radix primitives     | Dialog, Separator, Slot                | latest              |
| Icons                | lucide-react                           | 0.562               |
| CMS                  | Sanity v4 + next-sanity 11             | 4.22                |
| Rich text rendering  | @portabletext/react                    | 6.0                 |
| Image URLs           | @sanity/image-url                      | 1.2                 |
| Payments             | stripe (server SDK)                    | 20.1                |

### To be installed (per feature specs)

| Feature            | Packages                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| 08 — Stripe giving | `prisma`, `@prisma/client`, `zod`                                                                              |
| 09 — Email         | `resend`, `react-email`, `@react-email/components`                                                             |
| 10 — Tax receipts  | `@react-pdf/renderer`, `@vercel/blob`, `date-fns`                                                              |
| 05 — Calendar      | `@fullcalendar/react`, `@fullcalendar/daygrid`, `@fullcalendar/timegrid`, `@fullcalendar/list`, `rrule`, `ics` |

### To be removed (currently installed but unused)

- `@stripe/react-stripe-js` — we use Stripe-hosted Checkout, not Elements. Remove.
- `styled-components` — we use Tailwind. Remove.

### Hosting & services

- **Vercel** — frontend, API routes, webhooks (Hobby tier)
- **Neon** — Postgres for donations, tax receipts, email logs (Free tier)
- **Sanity** — CMS (Free tier: 3 users, 10k docs)
- **Stripe** — payments (no monthly fee, 2.9% + $0.30 per CAD transaction)
- **Resend** — transactional email (Free tier: 3k/mo)
- **Vercel Blob** — tax receipt PDF storage (private, signed URLs)
- **YouTube Live** — service streaming (free)
- **Zoom** — secondary remote attendance (church already has account)

---

## Design Language

The visual identity is already defined in the codebase. These are the actual values being used.

### Brand Colors

| Token          | Hex       | Role                                                                                  |
| -------------- | --------- | ------------------------------------------------------------------------------------- |
| **Navy**       | `#303552` | Primary — headings, primary buttons, hover states, brand presence                     |
| **Bronze**     | `#a5876d` | Accent — links, focus rings, gradient endpoints, decorative elements, scrollbar thumb |
| **Light Gray** | `#ECECEC` | Surface — section backgrounds, scrollbar track                                        |
| **White**      | `#FFFFFF` | Page background                                                                       |

### Functional Colors (shadcn/slate base)

| Token                            | HSL              | Usage                                                       |
| -------------------------------- | ---------------- | ----------------------------------------------------------- |
| `background`                     | `0 0% 100%`      | Page background                                             |
| `foreground`                     | `240 10% 3.9%`   | Body text                                                   |
| `border` / `input`               | `240 5.9% 90%`   | Form borders, dividers                                      |
| `muted` / `secondary` / `accent` | `240 4.8% 95.9%` | Subtle surfaces                                             |
| `muted-foreground`               | `240 3.8% 46.1%` | Secondary text                                              |
| `destructive`                    | `0 84.2% 60.2%`  | Errors, delete actions                                      |
| `ring`                           | `240 5.9% 10%`   | Default focus ring (overridden to bronze for visible focus) |

### Typography

- **Sans (UI / body)** — Inter, loaded via `next/font/google`, variable `--font-inter`
- **Serif (display / headings)** — Playfair Display, loaded via `next/font/google`, variable `--font-playfair`

Tailwind exposes these as `font-sans` and `font-serif`. Use serif for hero headlines and section titles; sans for everything else.

### Motion

A custom motion library is defined in `globals.css`. Apply utility classes for staggered, choreographed page entrances:

| Class                              | Effect                                             |
| ---------------------------------- | -------------------------------------------------- |
| `animate-fade-in`                  | Opacity 0 → 1, 600ms                               |
| `animate-fade-up`                  | Slide up 20px + fade in, 600ms                     |
| `animate-fade-down`                | Slide down 20px + fade in, 600ms                   |
| `animate-slide-in-left` / `-right` | Horizontal slide-in, 600ms                         |
| `animate-scale-in`                 | Scale 95% → 100% + fade, 500ms                     |
| `animate-blur-in`                  | Blur 10px → 0 + fade, 800ms                        |
| `animate-gradient`                 | Animated gradient position shift                   |
| `animate-float`                    | Gentle vertical float, infinite                    |
| `animate-pulse-soft`               | Subtle pulse, infinite                             |
| `animate-shimmer`                  | Loading shimmer effect                             |
| `animate-line-grow`                | Width 0 → 4rem, 800ms (used for accent underlines) |

Stagger delays: `delay-100` through `delay-800` (100ms increments).

### Effects & Patterns

- **`.hover-lift`** — translates up 4px and casts a 12px brand-navy shadow on hover
- **`.text-gradient`** — applies the navy → bronze gradient to text
- **`.glass`** — frosted glass effect (white 80% opacity + 10px backdrop blur)
- **`.noise-overlay`** — SVG-based film-grain texture for hero/background depth
- **`.page-header`** — adds a subtle bronze-gradient accent line at the top of section headers
- **Custom scrollbar** — bronze thumb on light-gray track, brand-consistent throughout the site
- **Focus ring** — 2px solid bronze with 2px offset (overrides default for brand cohesion)

### Component Library

Built on [shadcn/ui](https://ui.shadcn.com/) (New York style) with custom theming. CSS variables in `globals.css` are the source of truth — adjust `--color-*` tokens there, not in component files.

---

## Folder Structure

```text
zoe/
├── src/
│   ├── app/
│   │   ├── (public)/            # Public pages route group
│   │   │   ├── page.tsx         # Home
│   │   │   ├── about/
│   │   │   ├── sermons/
│   │   │   ├── events/
│   │   │   ├── live/
│   │   │   └── give/
│   │   ├── (admin)/             # Admin tools (basic-auth gated)
│   │   │   └── admin/receipts/
│   │   ├── (auth)/              # Empty in Phase 1, reserved for Phase 2
│   │   ├── api/
│   │   │   └── stripe/
│   │   │       └── webhook/
│   │   ├── studio/[[...tool]]/  # Sanity Studio
│   │   ├── layout.tsx
│   │   ├── globals.css          # ← all design tokens live here
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/              # Navbar, Footer, BackToTop
│   │   ├── sections/            # Hero, ServiceInfo, WelcomeSection, etc.
│   │   ├── ui/                  # shadcn primitives + custom UI
│   │   └── youtube-embed.tsx    # Reused across /sermons and /live
│   ├── contexts/
│   │   └── ModalContext.tsx     # Modal state (giving forms, prayer requests, etc.)
│   ├── lib/
│   │   ├── sanity.ts            # Client + query helpers
│   │   ├── stripe.ts
│   │   ├── prisma.ts
│   │   ├── email.ts             # Resend helpers
│   │   ├── receipts.ts          # Tax receipt issuance
│   │   ├── events.ts            # Recurring event expansion
│   │   ├── youtube.ts           # ID extraction, thumbnail URLs
│   │   └── utils.ts             # cn() and shared helpers
│   ├── sanity/
│   │   ├── env.ts
│   │   ├── schemaTypes/         # sermon, event, page, siteSettings, etc.
│   │   └── structure.ts         # Custom Studio sidebar
│   └── prisma/
│       └── schema.prisma
├── public/
├── docs/
│   ├── admin-runbook.md         # 5 most common tasks for the pastor
│   └── backups.md               # Postgres snapshot strategy
├── components.json              # shadcn config
├── next.config.ts
├── sanity.config.ts
├── sanity.cli.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Roadmap

The launch target is **as fast as possible, while shipping something the church will be proud of and won't break a CRA audit.** Realistic estimate: **3.5–4 weeks of focused work**, with the timeline often constrained by external dependencies (DNS propagation, Stripe verification, accountant review of the receipt template) more than by coding speed.

### Phase 1 — Foundation & Public Site (Week 1)

Get the public site live so the church has a real online presence. No giving yet.

- [x] Next.js 16 + TypeScript + Tailwind v4 + shadcn (New York) setup
- [x] Sanity Studio scaffolded at `/studio`
- [x] Brand color tokens defined (`#303552`, `#a5876d`, `#ECECEC`)
- [x] Typography pairing (Inter + Playfair Display)
- [x] Custom motion library + section components scaffolded
- [ ] Add `cdn.sanity.io` and `img.youtube.com` to `next.config.ts` `remotePatterns`
- [ ] Remove unused deps (`@stripe/react-stripe-js`, `styled-components`)
- [ ] Add Prettier + Husky + lint-staged
- [ ] Build out Sanity schemas (sermon, event, page, announcement, campaign, givingCategory, siteSettings)
- [ ] Custom Studio landing page with quick-action cards
- [ ] Wire homepage sections to real Sanity data
- [ ] About, Beliefs, Ministries, Contact pages
- [ ] Deploy to Vercel with custom domain

### Phase 2 — Giving + Tax Receipts (Weeks 2–3)

The hard, regulated part. Spread across two weeks because of accountant review and Stripe live-mode activation timing.

- [ ] Neon Postgres + Prisma migration (`Donation`, `TaxReceipt`, `ReceiptCounter`, `EmailLog`)
- [ ] Stripe Checkout for one-time and recurring gifts (CAD)
- [ ] Stripe webhook handler with idempotency
- [ ] Donor address collection at checkout
- [ ] Resend setup (domain verification, DKIM/SPF/DMARC)
- [ ] Branded thank-you receipt email template
- [ ] **CRA-compliant PDF receipt** generation (`@react-pdf/renderer`)
- [ ] Sequential receipt-numbering with concurrency safety
- [ ] Vercel Blob storage for receipt PDFs
- [ ] Refund → automatic receipt void flow
- [ ] Admin receipts tool at `/admin/receipts` (basic-auth gated)
- [ ] **Accountant review** of the receipt template before live mode
- [ ] Switch to Stripe live mode

### Phase 3 — Sermons, Calendar, Live, Zoom (Week 3–4)

Mostly content-pages-on-rails work. Quick once the foundation is real.

- [ ] Sermons listing + individual pages (YouTube facade pattern)
- [ ] Events page with FullCalendar (month/week/list) and recurring expansion
- [ ] Individual event pages with `.ics` + Google Calendar add links
- [ ] `/live` page with YouTube Live embed and "not live" placeholder
- [ ] "● LIVE" indicator in nav when stream is active
- [ ] Zoom join button (homepage + `/live`)

### Phase 4 — Polish & Launch (Days 1–3 of Week 4)

- [ ] SEO metadata, Open Graph images, JSON-LD structured data
- [ ] Sitemap and robots.txt
- [ ] Accessibility pass (WCAG AA — keyboard, contrast, alt text, focus rings)
- [ ] Lighthouse pass on every public page (target: Performance ≥ 90, A11y 100, SEO 100)
- [ ] Backup strategy documented (`docs/backups.md`)
- [ ] Admin runbook written (`docs/admin-runbook.md`)
- [ ] **Pastor training session** (30 min, screen-recorded)
- [ ] DNS migration to production domain
- [ ] Soft launch (announce to congregation only)
- [ ] Public launch (social media, Google Business listing)

### Future — Phase 5+ (post-launch)

Documented for context, not part of the initial build. Add only when concrete requests appear from the pastor or congregation.

- Member accounts (registration, login, member dashboard with personal giving history)
- French translation (full bilingual site)
- Self-service donor portal (manage recurring giving without emailing the church)
- Newsletter / mass email
- Event RSVP / registration
- Quebec provincial tax receipts (Revenu Québec)

---

## Open Items Before Launch

These are not engineering tasks — they're things the pastor or church leadership needs to provide or decide.

| Item                                                                                                                                          | Owner               | Blocker for            |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------- |
| About / Beliefs / Ministries page text                                                                                                        | Pastor              | Phase 1 launch         |
| Logo file (SVG preferred)                                                                                                                     | Church              | Phase 1 launch         |
| Photos of the church and recent events                                                                                                        | Church              | Phase 1 visual polish  |
| **CRA registration number** (verify on the [List of charities](https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en)) | Pastor / Treasurer  | Phase 2 receipts       |
| Authorized signatory name + signature scan (transparent PNG, 300dpi)                                                                          | Church board        | Phase 2 receipts       |
| Accountant review of the receipt template                                                                                                     | Pastor + accountant | Phase 2 live mode      |
| Per-donation vs. annual receipt mode preference                                                                                               | Pastor              | Phase 2 receipts       |
| Charity address as on file with CRA                                                                                                           | Pastor              | Phase 2 receipts       |
| Pastor's thank-you message for the receipt email                                                                                              | Pastor              | Phase 2 (has fallback) |
| Confirm Zoom plan (free vs. Pro)                                                                                                              | Pastor              | Pre-launch only        |
| DNS access for email domain verification                                                                                                      | Domain admin        | Phase 2 emails         |
| Stripe account business verification                                                                                                          | Pastor / Treasurer  | Phase 2 live mode      |

---

## Estimated Costs (Year 1)

| Service                                           | Cost                                              |
| ------------------------------------------------- | ------------------------------------------------- |
| Vercel hosting (Hobby)                            | $0                                                |
| Neon Postgres (Free)                              | $0                                                |
| Sanity CMS (Free — 3 users, 10k docs)             | $0                                                |
| Resend (Free — 3k emails/mo)                      | $0                                                |
| Vercel Blob (Free tier covers small church scale) | $0                                                |
| Stripe                                            | 2.9% + $0.30 per CAD transaction (no monthly fee) |
| YouTube Live                                      | $0                                                |
| Domain (already registered)                       | ~$12/year                                         |
| **Total fixed**                                   | **~$12/year**                                     |

If usage outgrows free tiers (unlikely for at least the first year): roughly $20–60/month for paid Neon + Sanity tiers.

---

## Security & Compliance

- **PCI scope minimized** — Stripe-hosted Checkout means our server never touches raw card data.
- **Webhook signatures verified** on every Stripe event; unsigned requests rejected with 400.
- **HTTPS enforced** by Vercel automatically.
- **Tax receipt PDFs stored privately** in Vercel Blob with signed URLs; never publicly enumerable.
- **Receipt records never hard-deleted** — voiding sets status to `VOIDED`, replacement creates a new record. CRA requires 6-year retention; permanent retention is simpler.
- **Receipt numbers are transactional** — concurrent donations cannot collide.
- **Sanity Studio admin auth** is handled by Sanity itself; no custom login code in Phase 1.
- **Admin tool at `/admin/receipts`** is gated by basic auth (env var credentials) until Phase 2 brings real auth.
- **Privacy policy required** under Quebec's Law 25 — site collects donor information. Include data retention, what's stored, how to request deletion. Draft this before launch.
- **CASL compliance** — donation receipts are exempt as transactional emails, but the church mailing address must appear in every email footer, and explicit consent is required before any future promotional/newsletter emails.

---

## Links & Resources

| Resource                 | URL                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Next.js Docs             | https://nextjs.org/docs                                                                                                          |
| Sanity Docs              | https://www.sanity.io/docs                                                                                                       |
| next-sanity              | https://www.sanity.io/plugins/next-sanity                                                                                        |
| shadcn/ui                | https://ui.shadcn.com                                                                                                            |
| Tailwind CSS v4          | https://tailwindcss.com/docs                                                                                                     |
| Stripe Docs              | https://stripe.com/docs                                                                                                          |
| Stripe Test Cards        | https://stripe.com/docs/testing                                                                                                  |
| Resend Docs              | https://resend.com/docs                                                                                                          |
| React Email              | https://react.email                                                                                                              |
| @react-pdf/renderer      | https://react-pdf.org                                                                                                            |
| Prisma Docs              | https://www.prisma.io/docs                                                                                                       |
| Neon Docs                | https://neon.tech/docs                                                                                                           |
| FullCalendar React       | https://fullcalendar.io/docs/react                                                                                               |
| Vercel Blob              | https://vercel.com/docs/storage/vercel-blob                                                                                      |
| **CRA receipting rules** | https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/operating-a-registered-charity/issuing-receipts.html |
| **CRA charity list**     | https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en                                                     |
| Quebec Law 25 (privacy)  | https://www.cai.gouv.qc.ca/english/                                                                                              |
| CASL (anti-spam)         | https://crtc.gc.ca/eng/internet/anti.htm                                                                                         |

---

## Environment Variables

```env
# Site
NEXT_PUBLIC_SITE_URL="https://zoechristianassembly.org"

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="..."
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="..."           # read+write, server-only

# Database (Neon Postgres)
DATABASE_URL="postgresql://...@ep-xxx.us-east-2.aws.neon.tech/zoe?sslmode=require"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend
RESEND_API_KEY="re_..."
RESEND_FROM_GIVING="giving@zoechristianassembly.org"
RESEND_FROM_NOREPLY="noreply@zoechristianassembly.org"

# Vercel Blob (tax receipt PDFs)
BLOB_READ_WRITE_TOKEN="..."

# Admin tool basic auth (Phase 1 — until real auth in Phase 2)
ADMIN_BASIC_AUTH_USER="..."
ADMIN_BASIC_AUTH_PASSWORD="..."
```

---

_Built with intention. A real online home for a real congregation._
