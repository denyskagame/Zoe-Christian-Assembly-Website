## Project Foundation & Deployment

# Overview

Set up the Next.js app, deploy to Vercel, and get a "Coming soon" placeholder live on the church's domain. This is the foundation every other feature builds on.

## Requirements

- Next.js 14+ (App Router) with TypeScript
- Tailwind CSS + shadcn/ui initialization
- ESLint + Prettier + Husky pre-commit hook
- Folder structure as described in the project overview (no `src/` directory, root-level `app/`)
- Connect the GitHub repo to Vercel — push to `main` auto-deploys to production, every other branch gets a preview URL
- Custom domain (already registered) connected to Vercel with HTTPS
- `.env.example` committed with placeholder keys for every service we'll use later (Sanity, Neon, Stripe, Resend, Vercel Blob)
- A styled "Coming soon" page at `/` with church name, tagline, and contact email
- README with setup instructions (clone → `npm install` → `npm run dev`)

## Updates

This is the boring foundational work — get it done quickly and well so we never have to revisit it.

A few things worth getting right the first time:

- **Don't skip Husky.** Pre-commit lint feels like overhead on day one but saves hours later.
- **Pick the Prettier config and document it in the README.** Don't let formatting drift between contributors.
- **Set up Vercel preview deploys properly** — the church's pastor or volunteers may want to see the site before it's live; preview URLs make that easy.
- **Vercel Hobby tier is fine for production.** Don't upgrade until clearly needed.
- **Configure `next.config.js` to allow images from Sanity's CDN** (`cdn.sanity.io`) and YouTube's thumbnail CDN (`img.youtube.com`) — both will be needed by later features. Setting this up now avoids debugging it under pressure later.

## Acceptance criteria

- `npm install && npm run dev` works on a clean clone with no errors
- `npm run build` produces a successful production build with zero TypeScript and zero ESLint errors
- Pushing to `main` deploys to the production domain within 2 minutes
- Pushing to any other branch creates a Vercel preview URL
- The production URL serves the placeholder page over HTTPS
- Lighthouse score on the production page (mobile): Performance 100, Accessibility 100, SEO 100, Best Practices 100
- Site is responsive at 320px, 768px, 1280px viewport widths
- `.env.example` is committed; `.env.local` is gitignored
- Husky blocks commits with linting errors

## Out of scope

- Any database setup
- Sanity CMS (Feature 02)
- Real content beyond the placeholder
- Analytics (added during Phase 4 polish)
- Full SEO metadata (added per-page in later features)

## References

- `@context/zoe-christian-assembly-overview.md`
