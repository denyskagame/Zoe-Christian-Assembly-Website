## Sermons Library

# Overview

Public-facing sermons archive at `/sermons`. Visitors browse all past sermons (sorted newest first, paginated), watch the embedded YouTube video for each one, and read the title, preacher, date, scripture reference, and description. Admin manages sermons through Sanity Studio (Feature 02).

## Requirements

- Listing page at `/sermons`:
  - Server-rendered with `getSermons()` from `lib/sanity.ts`
  - Paginated 12 per page, query string `?page=2`
  - Each card shows YouTube thumbnail (auto-derived from video ID), title, preacher, date
  - Sorted by sermon `date` descending (NOT `_createdAt` — pastors may post sermons days late)
  - ISR with `revalidate: 60`
- Individual sermon page at `/sermons/[slug]`:
  - Pre-rendered at build time via `generateStaticParams`
  - Per-page `<title>` and OG metadata via `generateMetadata`
  - Embedded YouTube video using the **facade pattern** (clickable thumbnail until first click, then swap to iframe)
  - Title, preacher, date, scripture, full description, "Back to sermons" link, prev/next navigation between sermons
- `<YouTubeEmbed>` component in `components/youtube-embed.tsx`:
  - Accepts a YouTube URL or ID
  - Parses video ID via `lib/youtube.ts` helpers (`extractYouTubeId`, `getYouTubeThumbnail`)
  - Uses `maxresdefault.jpg` thumbnail with `hqdefault.jpg` fallback
- Per-sermon JSON-LD `VideoObject` structured data so Google indexes them as videos
- Graceful fallback if a sermon has an invalid YouTube URL ("Video unavailable" message, no crash)

## Updates

The default YouTube iframe is heavy — it loads ~500KB of JS even before the user presses play. On a sermon archive with 12 videos that becomes 6MB+ of unnecessary JavaScript. **Always use the facade pattern**: render a clickable image (the thumbnail) until clicked, then swap in the iframe.

You can write this from scratch in ~30 lines, or use `react-lite-youtube-embed` if you want a maintained library. Either is fine.

This `<YouTubeEmbed>` component is reused by Feature 06 (Live Service) — but with the facade DISABLED there, since visitors expect immediate playback on a live page. Plan the component API to make this configurable (e.g., `<YouTubeEmbed id={...} immediate />`).

YouTube thumbnails:

- `https://img.youtube.com/vi/{id}/maxresdefault.jpg` (1280×720, sometimes missing for older videos)
- `https://img.youtube.com/vi/{id}/hqdefault.jpg` (480×360, always available)

Prefer `maxresdefault` and fall back to `hqdefault` on error.

## Acceptance criteria

- `/sermons` lists all sermons from Sanity, paginated 12 per page, newest first
- Each card shows YouTube thumbnail, title, preacher, date
- Clicking a card opens `/sermons/[slug]` with the embedded video
- Embed uses the facade pattern — verifiable by checking that the YouTube iframe doesn't load until the user clicks play
- Prev/next sermon navigation works on individual sermon pages
- Publishing a new sermon in Sanity makes it appear on `/sermons` within 60 seconds
- Pasting any YouTube URL format (`youtube.com/watch?v=`, `youtu.be/`, embed URL) into Sanity works
- Invalid YouTube URLs show a graceful fallback, not a crash
- Lighthouse Performance ≥ 90 on `/sermons` and `/sermons/[slug]`
- Per-sermon JSON-LD validates with Google's Rich Results Test

## Out of scope

- Sermon search (defer until 50+ sermons)
- Sermon series / collections (defer)
- Audio-only versions (YouTube handles audio streaming itself)
- Transcripts (significant work, defer)
- Comments / engagement features

## References

- `@context/zoe-overview.md`
- `@features/02-sanity-cms.md`
- `@features/03-public-pages.md`
