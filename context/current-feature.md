# Current Feature

## Status

Not Started

## Goals

<!-- Add bullet points of what success looks like for the next feature -->

## Notes

<!-- Add additional context, constraints, or details from the spec -->

## History

- **2026-04-30 — Feature 00: Codebase Cleanup & Refresh.** Foundation pass on top of `Initial commit from Create Next App`. Added Prettier + Tailwind plugin + Husky + lint-staged + .editorconfig + .vscode settings; committed `.env.example`; updated `next.config.ts` `remotePatterns`; rewrote README. Added Tailwind brand tokens (`zoe-navy`/`zoe-bronze`/`zoe-gray`) and wired Tailwind v4 to read `tailwind.config.ts` via `@config` in `globals.css` (this also fixed Hero font falling back to Georgia). Centralized `homepageSermonsQuery` in `src/sanity/lib/queries.ts`. Created `src/hooks/useScrollReveal.ts`, replacing 7 duplicated IntersectionObservers across the homepage sections plus `PageHeader`. Hero: removed inline Arial style, now uses `font-serif` (Playfair). Removed duplicate `<BackToTop />` from `page.tsx`. Enabled `noUncheckedIndexedAccess`, `noImplicitOverride`, `forceConsistentCasingInFileNames`. Wrapped `/donate` `useSearchParams()` in Suspense (Next.js 16 build fix). Added Playwright (Chromium) tests: homepage smoke + screenshot at desktop + mobile, brand-token resolution, donate page render. Final state: `tsc --noEmit` clean, `npm run build` green, `eslint .` reports 0 errors / 0 warnings, 6/6 Playwright tests passing. **Spec deviation:** kept `@stripe/react-stripe-js` because the live `/donate` page uses `EmbeddedCheckoutProvider`; deleted dead `donate/checkoutForm.tsx` (Stripe Elements). The full migration to redirect-based hosted Checkout is a separate UX-affecting refactor. **Operational follow-ups for the user:** import the repo into Vercel (production branch `main`, env vars in Production + Preview), connect the custom HTTPS domain, and set up branch protection requiring the Vercel build to pass before merging into `main`.
