# Zoe Christian Assembly

The official website for **Zoe Christian Assembly** in Sherbrooke, QC — a place to plan a visit, watch sermons, request prayer, and give online.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (NY style)
- [Sanity v4](https://www.sanity.io) for content (sermons, events, site settings)
- [Stripe](https://stripe.com) for online giving (Embedded Checkout)
- [Resend](https://resend.com) for transactional email (planned)
- [Neon](https://neon.tech) for Postgres (planned)
- [Vercel](https://vercel.com) for hosting + previews

## Project context

The canonical specs and roadmap live in [`context/`](./context):

- [`context/zoe-overview.md`](./context/zoe-overview.md) — master overview: stack, architecture, brand, roadmap, env vars
- [`context/features/`](./context/features) — numbered feature specs (`00-cleanup-and-refresh.md`, `01-foundation.md`, `02b-wire-homepage-to-sanity.md`, …)
- [`context/current-feature.md`](./context/current-feature.md) — active feature working file

Design tokens are defined as CSS variables in [`src/app/globals.css`](./src/app/globals.css). Brand color tokens (`zoe-navy`, `zoe-bronze`, `zoe-gray`) are exposed in [`tailwind.config.ts`](./tailwind.config.ts) and point at those variables.

## Getting started

```bash
# 1. Install
npm install

# 2. Copy env vars and fill in values (see .env.example)
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sanity Studio is mounted at [http://localhost:3000/studio](http://localhost:3000/studio).

## Required environment variables

See [`.env.example`](./.env.example) for the full list. At minimum, populate:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (default `production`)

Stripe / Resend / Neon / Blob / Admin auth variables come online with their respective features and are commented out in `.env.example` until then.

## Scripts

| Script                 | Purpose                          |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the Next.js dev server     |
| `npm run build`        | Production build                 |
| `npm run start`        | Start the production server      |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format the repo with Prettier    |
| `npm run format:check` | Check formatting without writing |

## Folder layout

```
src/
├── app/             # Next.js routes (homepage + studio + feature pages)
├── components/
│   ├── layout/      # Navbar, Footer, TopBar
│   ├── sections/    # Hero, ServiceInfo, WelcomeSection, ProgramsSection,
│   │                #   SermonsSection, RequestsSection, GivingSection
│   └── ui/          # shadcn primitives + custom UI (BackToTop, CalendarModal, …)
├── contexts/        # React contexts (ModalContext)
├── hooks/           # useScrollReveal
├── lib/             # cross-cutting helpers (cn, stripe)
└── sanity/
    ├── env.ts
    ├── lib/         # client.ts, image.ts, queries.ts, events.ts, live.ts
    ├── schemaTypes/ # sermon, event
    └── structure.ts
```

## Conventions

- **Branches**: `feature/NN-short-slug` for feature work, `fix/short-slug` for bug fixes.
- **Commits**: imperative, present tense ("Add useScrollReveal hook"), reference the feature number when relevant.
- **PRs**: small and focused. Each feature spec ships as several PRs, not one giant one.
- **Formatting**: Prettier + the Tailwind plugin auto-sort classes on save and on commit (Husky + lint-staged).
- **Strict TS**: `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `forceConsistentCasingInFileNames` are all on. Don't `@ts-ignore` — fix the underlying issue.

## Deployment

Hosted on Vercel. Production branch is `main`; pushes to feature branches generate preview deploys automatically. Custom domain serves over HTTPS. Env vars are configured in Vercel for both Production and Preview.

## License

Private — all rights reserved.
