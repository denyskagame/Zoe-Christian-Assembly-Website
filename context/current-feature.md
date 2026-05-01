# Current Feature: Codebase Cleanup & Refresh

## Status

Implementation complete — pending visual regression check, manual browser smoke test, and Vercel verification (operational items).

## Goals

### Tooling

- Remove unused deps: `@stripe/react-stripe-js`, `styled-components`
- Add Prettier with `.prettierrc` (incl. `prettier-plugin-tailwindcss`)
- Add Husky + lint-staged pre-commit hook (Prettier + ESLint on staged files)
- Add `.editorconfig` and committed `.vscode/settings.json`
- Add `npm run format` script

### Configuration

- Update `next.config.ts` `images.remotePatterns` (cdn.sanity.io, img.youtube.com, i.ytimg.com, plus temporary res.cloudinary.com / images.unsplash.com)
- Create/update committed `.env.example` covering Site, Sanity, and commented placeholders for DB, Stripe, Resend, Blob, Admin auth
- Add Tailwind brand tokens: `zoe-navy`, `zoe-bronze`, `zoe-gray` (point at existing CSS variables — no bulk component rewrite)

### Code structure

- Create `src/hooks/useScrollReveal.ts` and replace duplicated IntersectionObserver in all 7 sections (Hero, ServiceInfo, WelcomeSection, ProgramsSection, SermonsSection, RequestsSection, GivingSection)
- Create `src/sanity/lib/client.ts`, `image.ts`, `queries.ts`; move `SermonsSection` GROQ inline query into `queries.ts`
- Remove duplicate `<BackToTop />` from `src/app/page.tsx` (keep only the one in `layout.tsx`)
- Fix Hero typography: remove `style={{ fontFamily: "Arial, sans-serif" }}`, use `font-serif` (Playfair) instead
- Confirm folder layout: `components/{layout,sections,ui}`, `contexts/`, `hooks/`, `lib/`, `sanity/{env.ts,lib/,schemaTypes/,structure.ts}`
- Prep for server-component conversion in 02b: no `next/router`, only `next/navigation`; verify `ModalContext` uses `"use client"`; add boundary comment in `page.tsx`

### TypeScript

- Enable `noUncheckedIndexedAccess`, `noImplicitOverride`, `forceConsistentCasingInFileNames` in `tsconfig.json`
- `npm run build` passes with zero TS errors and zero lint errors (no `@ts-ignore` to silence)

### Documentation

- Replace boilerplate `README.md`: name, description, setup, env vars, scripts, stack overview, links to overview + features specs, contribution conventions

### Operational

- Verify Vercel: production branch `main`, custom domain on HTTPS, env vars set for Production + Preview, preview deploys work

### Visual regression

- Zero visible change at desktop and mobile widths; animations, hover states, transitions identical; same 7 sections in same order

## Notes

- **This is a cleanup pass, NOT a rewrite.** Every visual element, animation, and section component stays. Only the foundation underneath changes.
- **Order matters** to minimize risk:
  1. Tooling (pure additions)
  2. Remove unused deps
  3. `next.config.ts` + `.env.example`
  4. README
  5. Tailwind brand tokens (additive)
  6. Sanity client paths + centralized queries
  7. Extract `useScrollReveal` (one section at a time, verify visual output after each)
  8. Hero typography fix + duplicate `<BackToTop />` removal
  9. TypeScript strictness audit (last — may surface issues across many files)
- Ship as **multiple small PRs**, not one giant PR. Each requirement is a candidate for its own PR.
- After every refactor, view the site in the browser at desktop + mobile. Take before/after screenshots. Goal: zero visual delta.
- **Out of scope** (deferred to Feature 02b): schema expansion, hex → brand-token bulk migration, Cloudinary → Sanity image migration, sections refactored to props-driven, page.tsx → server component switch.
- Brand tokens are **added** here but components keep their hex codes for now — migration is incremental in 02b.
- Spec reference: `context/features/00-cleanup-and-refresh.md`. Sibling: `features/01-foundation.md`. Successor: `features/02b-wire-homepage-to-sanity.md`.

## History

- **2026-04-30** — Implementation pass landed on `feature/00-cleanup-and-refresh`.
  - **Tooling**: added `.prettierrc` (with `prettier-plugin-tailwindcss`), `.prettierignore`, `.editorconfig`, `.vscode/settings.json` + `extensions.json`, Husky pre-commit hook, lint-staged config in `package.json`. New scripts: `format`, `format:check`, `prepare`.
  - **Deps**: uninstalled `styled-components` (truly unused). **Kept `@stripe/react-stripe-js`** — the live `/donate` page uses `EmbeddedCheckoutProvider` from it, so removing it would break the donate flow. The spec assumed redirect-based Stripe-hosted Checkout; migrating Embedded → redirect Checkout is a UX-affecting refactor, deferred. Deleted dead `src/app/donate/checkoutForm.tsx` (Stripe Elements `PaymentElement`, not imported anywhere).
  - **Config**: `next.config.ts` `remotePatterns` updated (cdn.sanity.io, img.youtube.com, i.ytimg.com, res.cloudinary.com, images.unsplash.com). `.env.example` committed (Site, Sanity, plus commented placeholders for DB/Stripe/Resend/Blob/Admin). `.gitignore` now allows `.env.example`.
  - **Tailwind tokens**: `zoe-navy`, `zoe-bronze`, `zoe-gray` added in `tailwind.config.ts` pointing at the existing CSS vars. No bulk hex migration (deferred to 02b).
  - **Sanity**: `src/sanity/lib/{client,image,queries}.ts` already existed; added `homepageSermonsQuery` + `SanitySermon` type to `queries.ts` and refactored `SermonsSection` to import the centralized query.
  - **Hook extraction**: created `src/hooks/useScrollReveal.ts`. Refactored all 7 section components (`Hero`, `ServiceInfo`, `WelcomeSection`, `ProgramsSection`, `SermonsSection`, `RequestsSection`, `GivingSection`) to use it. Each section's original threshold and delay preserved.
  - **Hero typography**: removed `style={{ fontFamily: "Arial, sans-serif" }}`, added `font-serif` so Playfair (loaded via `next/font`) renders.
  - **Duplicate BackToTop**: removed from `src/app/page.tsx`. `layout.tsx` retains it, so it's available on every route. Added the boundary comment for the future server-component switch.
  - **TypeScript**: `noUncheckedIndexedAccess`, `noImplicitOverride`, `forceConsistentCasingInFileNames` enabled. Fixed surfaced index-access errors in `SermonsSection` and `sermons/page.tsx` `getYouTubeVideoId`. Fixed possibly-undefined `entry` in `useScrollAnimation`.
  - **Lint cleanup** (to satisfy "zero lint errors" acceptance criterion): removed `any` in `src/app/api/payment/route.ts`, replaced `require("tailwindcss-animate")` with an ESM import, removed empty `useEffect(() => setIsVisible(true), [])` in `PageHeader`, replaced setState-in-effect in `CalendarModal` with the React-canonical "store previous prop in state" pattern, escaped curly quotes/apostrophes in `WelcomeSection`/`GivingSection`/`RequestsSection`. 14 `no-unused-vars` warnings remain on pages outside this feature's scope (sermons, kids, youth, etc.).
  - **Build fix**: wrapped `/donate` page's `useSearchParams()` in a `Suspense` boundary (Next.js 16 build was failing on it before this pass).
  - **Final state**: `npx tsc --noEmit` clean; `npm run build` green; `npx eslint .` reports 0 errors, 14 warnings.
  - **Still TBD by the user**:
    - Visual regression check (browser, desktop + mobile, before/after screenshots).
    - Manual smoke test of `/`, `/donate`, `/studio`, animations.
    - Vercel verification (production branch `main`, custom HTTPS domain, Production + Preview env vars, throwaway preview deploy).
    - Decide whether to migrate the donate flow off `@stripe/react-stripe-js` (would unlock removing that dep per the original spec).
