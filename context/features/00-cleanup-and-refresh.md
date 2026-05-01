## Codebase Cleanup & Refresh

# Overview

The Zoe codebase is in good shape but has accumulated rough edges from initial scaffolding and prototyping: unused dependencies, ad-hoc patterns repeated across components, hardcoded values, inline styles bypassing the design system, and missing dev-ergonomic tooling. This spec is **a focused cleanup pass — not a rewrite**. The goal is to leave the project in a state that's ready to scale across the rest of the build.

We are **not** deleting the project and starting again. Every visual element, every animation, every section component stays. What changes is the foundation underneath: tooling, code hygiene, shared patterns, and removing things that shouldn't be there.

After this feature, the codebase should feel deliberate. Future contributors should be able to read any file and understand the conventions immediately.

## Requirements

### 1. Remove unused dependencies

These were installed during early scaffolding but aren't needed for our final stack. Remove from `package.json`:

- `@stripe/react-stripe-js` — we use Stripe-hosted Checkout, not Elements
- `styled-components` — we use Tailwind, never styled-components

Run `npm uninstall @stripe/react-stripe-js styled-components` and verify nothing breaks. If anything imports them, replace with the Tailwind/Stripe-hosted equivalent.

### 2. Add missing dev tooling

The project has ESLint but no Prettier, no Husky, and no lint-staged. Add them:

- **Prettier** with a `.prettierrc` committed to the repo. Recommend:
  ```json
  {
    "semi": true,
    "singleQuote": false,
    "trailingComma": "es5",
    "tabWidth": 2,
    "printWidth": 100,
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```
  The Tailwind plugin auto-sorts class names — major win for code reviews.
- **Husky + lint-staged** — pre-commit hook runs Prettier and ESLint on staged files. Blocks commits with lint errors.
- **`.editorconfig`** — basic file at the project root for cross-editor consistency.
- **`.vscode/settings.json`** (committed) — formats on save, ESLint as the linter, recommended extensions list.

### 3. Update `next.config.ts`

Allow image hosts we'll actually use:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
    { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
    { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }, // keep until full migration to Sanity
    { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }, // keep for placeholders during dev
  ],
},
```

Once all production images live in Sanity, remove the Cloudinary and Unsplash entries.

### 4. Add brand tokens to Tailwind config

Currently the brand colors live as CSS variables in `globals.css` but components reference raw hex codes (`bg-[#303552]`, `text-[#a5876d]`). Add Tailwind tokens that point at the variables:

```ts
// tailwind.config.ts
extend: {
  colors: {
    // ...existing shadcn tokens stay...
    "zoe-navy": "var(--color-navy)",
    "zoe-bronze": "var(--color-brown)",
    "zoe-gray": "var(--color-gray)",
  },
  // ...
}
```

After this, **all new code uses tokens** (`bg-zoe-navy`, `text-zoe-bronze`, `bg-zoe-gray`). Migrating the existing components from hex to tokens happens incrementally in Feature 02b — not in this cleanup pass — so this feature only adds the tokens, doesn't bulk-rewrite components.

### 5. Extract the `useScrollReveal` hook

Every section component (`Hero`, `ServiceInfo`, `WelcomeSection`, `ProgramsSection`, `SermonsSection`, `RequestsSection`, `GivingSection`) repeats the same IntersectionObserver pattern — about 20 lines of duplicated code per section. Extract into a single hook:

```ts
// src/hooks/useScrollReveal.ts
import { useEffect, useState, useRef, RefObject } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: { threshold?: number; delay?: number; once?: boolean } = {}
): { ref: RefObject<T>; isVisible: boolean } {
  const { threshold = 0.15, delay = 100, once = false } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, delay, once]);

  return { ref, isVisible };
}
```

Replace the duplicated IntersectionObserver in every section with `const { ref, isVisible } = useScrollReveal();`. Single source of truth, ~150 fewer lines of code, behavior unchanged.

### 6. Remove duplicate `<BackToTop />`

Currently rendered in both `src/app/layout.tsx` AND `src/app/page.tsx`. **Keep only the one in `layout.tsx`** so it's available on every page. Remove from `page.tsx`.

### 7. Fix Hero typography

Hero headline currently has `style={{ fontFamily: "Arial, sans-serif" }}` — bypassing the loaded Playfair Display font. Replace with the appropriate Tailwind class so the font loaded via `next/font` is actually used.

Decide which feels right:

- `font-serif` — Playfair Display (matches editorial intent, recommended)
- `font-sans` — Inter (current visual but properly applied)

Recommend `font-serif` for the hero headline. Test both, pick the one the pastor prefers.

### 8. Verify Sanity client paths

`SermonsSection.tsx` imports `@/sanity/lib/client`. Confirm this file exists. If not, create it with a properly configured Sanity client:

```ts
// src/sanity/lib/client.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
```

Also create `src/sanity/lib/image.ts` (image URL builder) and `src/sanity/lib/queries.ts` (centralized GROQ queries) so they're ready for Feature 02b.

### 9. Centralize Sanity queries

Right now `SermonsSection` defines its GROQ query inline. As more sections wire to Sanity, queries scattered across files become a maintenance problem. Move all queries to `src/sanity/lib/queries.ts`:

```ts
export const HOMEPAGE_SERMONS_QUERY = `*[_type == "sermon"] | order(date desc)[0...3] {
  _id, title, preacher, date, youtubeUrl, type, isPopular, description
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] { ... }`;
// etc.
```

Each query exported by name, imported where needed, never duplicated.

### 10. Folder structure tidy

Confirm or establish:

```
src/
├── app/             # Next.js routes
├── components/
│   ├── layout/      # Navbar, Footer, BackToTop
│   ├── sections/    # Hero, ServiceInfo, etc.
│   └── ui/          # shadcn primitives + custom UI like CustomDropdown
├── contexts/        # React contexts (ModalContext)
├── hooks/           # ← new — useScrollReveal lives here
├── lib/             # cross-cutting helpers (utils.ts, etc.)
├── sanity/
│   ├── env.ts
│   ├── lib/         # ← new — client.ts, image.ts, queries.ts
│   ├── schemaTypes/
│   └── structure.ts
└── styles/          # only if we have global styles outside globals.css
```

### 11. Standardize the `"use client"` boundary

The whole homepage currently is client components because of `useEffect`/IntersectionObserver. After 02b, `page.tsx` should become a server component that fetches data and passes it down. This cleanup spec doesn't make that switch yet — but we **prepare** for it by:

- Making sure no section component imports anything that would block server-component conversion (e.g., no `next/router`, only `next/navigation`).
- Confirming `ModalContext` is properly client-side (uses `"use client"` correctly).
- Documenting the boundary in a comment at the top of `page.tsx`: "This page becomes a server component in Feature 02b. Section components stay client because of scroll animations."

### 12. README rewrite

The current `README.md` is the default Next.js boilerplate. Replace with a real one:

- Project name, one-line description
- Link to `zoe-christian-assembly-overview.md`
- Link to `features/README.md`
- Setup instructions: clone, `npm install`, env vars to populate, `npm run dev`
- Available scripts (`dev`, `build`, `start`, `lint`, `format`)
- Stack overview (Next.js 16, Sanity, Tailwind, Stripe, Resend, Neon)
- Where to find the design tokens (`globals.css` and `tailwind.config.ts`)
- Where to find the admin runbook (when it exists)
- Contribution conventions: branch names, commit message style, PR template

### 13. `.env.example` (committed)

Create or update so a fresh clone shows what's needed:

```env
# Site
NEXT_PUBLIC_SITE_URL=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Database (added during Feature 08)
# DATABASE_URL=

# Stripe (added during Feature 08)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=

# Resend (added during Feature 09)
# RESEND_API_KEY=
# RESEND_FROM_GIVING=
# RESEND_FROM_NOREPLY=

# Vercel Blob (added during Feature 10)
# BLOB_READ_WRITE_TOKEN=

# Admin tool basic auth (added during Feature 10)
# ADMIN_BASIC_AUTH_USER=
# ADMIN_BASIC_AUTH_PASSWORD=
```

### 14. Verify Vercel deployment

Confirm:

- The repo is connected to Vercel
- Production branch is `main`
- Custom domain is connected with HTTPS
- All current env vars are set in Vercel for both Production and Preview
- Preview deploys work — push a throwaway branch and verify

If any of this isn't done, do it as part of this feature.

### 15. TypeScript strictness audit

`tsconfig.json` already has `"strict": true` — good. Add these for tighter safety:

```json
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true,
"forceConsistentCasingInFileNames": true
```

Run `npm run build` after adding. If anything errors, fix the affected files. **Do not add `// @ts-ignore` to silence these** — fix the underlying issue.

## Updates

This is the kind of work that feels invisible from the outside but compounds in value over the entire build. Spending half a day here saves several days of friction over the next 3 weeks.

**Order matters.** Work in this order to minimize risk:

1. Tooling (Prettier, Husky, EditorConfig, VSCode settings) — pure additions, can't break anything
2. Remove unused dependencies — small risk, easy to verify
3. Update `next.config.ts` and `.env.example` — config-only changes
4. README rewrite — pure docs
5. Brand tokens in Tailwind — additive, doesn't change existing code
6. Sanity client paths + centralized queries — pre-work for Feature 02b
7. Extract `useScrollReveal` hook — refactor that touches every section, do it carefully, one section at a time, verify visual output is identical after each
8. Hero typography fix and remove duplicate `<BackToTop />` — visible bug fixes, save them for last so they get focused review
9. TypeScript strictness audit — last, since it may surface issues across many files

**Visual regression check.** After each refactor PR, **actually view the site** in the browser at desktop and mobile widths. Don't trust that "it compiled" means "it looks right." Take screenshots before and after, compare them. The goal is **zero visual change** from this feature — that's how you know the refactor was clean.

**Commit hygiene.** Make this feature multiple small PRs, not one giant one. Each item in the requirements list is a candidate for its own PR. Reviewer fatigue is real; small PRs get good reviews, big ones get rubber-stamped.

**What this feature does NOT do:**

- Does not change any visible design
- Does not add new features or pages
- Does not migrate Cloudinary images to Sanity (that's 02b)
- Does not bulk-replace hex codes with brand tokens (also 02b — incremental migration is safer)
- Does not refactor sections to be props-driven (also 02b)
- Does not delete or rewrite the project — every component, every animation, every visual touch stays exactly as it is

This is the cleanup pass that lets every subsequent feature feel easy. Do it once, do it well, never again.

## Acceptance criteria

### Tooling

- `package.json` no longer lists `@stripe/react-stripe-js` or `styled-components`
- Prettier is installed and configured (`.prettierrc` committed)
- Husky pre-commit hook runs Prettier + ESLint on staged files
- `.editorconfig` and `.vscode/settings.json` are committed
- `npm run format` script added that runs Prettier on the whole repo

### Configuration

- `next.config.ts` allows `cdn.sanity.io`, `img.youtube.com`, `i.ytimg.com`
- `.env.example` updated and committed; `.env.local` is gitignored
- `tailwind.config.ts` exposes `zoe-navy`, `zoe-bronze`, `zoe-gray` tokens

### Code structure

- `src/hooks/useScrollReveal.ts` exists and exports the hook
- All 7 section components use `useScrollReveal()` instead of duplicated IntersectionObserver code
- `src/sanity/lib/client.ts`, `image.ts`, and `queries.ts` exist
- `SermonsSection` imports its query from `queries.ts`, not inline
- `<BackToTop />` rendered exactly once (from `layout.tsx`)
- Hero headline no longer has the inline Arial style
- TypeScript strictness flags `noUncheckedIndexedAccess`, `noImplicitOverride`, `forceConsistentCasingInFileNames` enabled
- `npm run build` succeeds with zero TS errors and zero lint errors

### Documentation

- `README.md` is the project's real README, not the Next.js boilerplate
- README explains setup, env vars, scripts, and links to the overview and feature specs

### Operational

- Vercel auto-deploys on push to `main` (verified by deploying)
- Preview deploys work on feature branches (verified)
- Production domain serves the current site over HTTPS
- All existing functionality verified to still work after cleanup (homepage renders, Sanity Studio at `/studio` loads, IntersectionObserver animations still trigger correctly)

### Visual regression

- Side-by-side screenshots before and after the cleanup show no visible change to the homepage at desktop or mobile widths
- Animations, hover states, transitions all behave identically
- All 7 homepage sections render in the same order with the same content

## Out of scope

- Anything in Feature 02b (schema expansion, component refactor to props, Cloudinary → Sanity image migration, hex → token migration)
- Building any new feature
- Visual or design changes
- Member accounts or auth (deferred to Phase 2)

## References

- `@context/zoe-christian-assembly-overview.md`
- `@features/01-foundation.md` — original foundation spec (this is its sibling)
- `@features/02b-wire-homepage-to-sanity.md` — what comes immediately after this cleanup
- Husky docs: https://typicode.github.io/husky
- Prettier + Tailwind plugin: https://github.com/tailwindlabs/prettier-plugin-tailwindcss
