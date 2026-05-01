## Live Service Page

# Overview

`/live` page on the website that embeds the church's current YouTube live stream. When the church isn't streaming, the page gracefully shows the latest sermon and the next service time. Admin updates one field in Sanity (`currentLivestreamId` on `siteSettings`) and the page picks it up automatically. Highest-traffic page on Sundays — get it right.

## Requirements

- `/live` page server-rendered with `getSiteSettings()`
- Two states based on whether `currentLivestreamId` is set:
  - **Set:** YouTube embed plays that video, no facade pattern (visitors expect immediate playback on a live page) — use the iframe directly with `autoplay=1&mute=1`
  - **Empty/null:** "We're not live right now" placeholder with:
    - "Our next service is **{nextServiceTime}**" — computed server-side from `siteSettings.serviceTimes` against current time
    - CTA: "Watch our most recent sermon" → links to latest sermon
    - CTA: "Add next service to my calendar" → generates `.ics` for the next occurrence
- "Watch on YouTube" fallback link visible even when embed is shown (in case iframe fails)
- ISR with short revalidate (`revalidate: 30`) so changes propagate within seconds during a live service
- Header callout: when `currentLivestreamId` is set, show a small red "● LIVE" pill in the site nav next to the "Live" link
- Reuses `<YouTubeEmbed>` from Feature 04 with `immediate` prop to skip the facade

## Updates

Keep this simple. The admin's Sunday workflow is:

1. Go live on YouTube (using OBS or phone)
2. Copy the YouTube video ID (the bit after `?v=` in the URL)
3. Open Sanity Studio, paste it into `currentLivestreamId`, click Publish
4. After service, come back and clear the field, click Publish

Don't build automatic live-window detection (comparing current time to `serviceTimes` to auto-show the embed). It's tempting but adds complexity for marginal value — and YouTube's embed handles the "stream hasn't started yet" state gracefully on its own ("Waiting for live stream").

If the admin consistently forgets step 4, build a Vercel Cron later that clears the field every Monday at 3am. Don't pre-build it.

YouTube embed can fail in three ways:

1. Stream is private/unlisted with embedding disabled — admin must enable embedding in YouTube Studio settings (document this in the runbook)
2. Geo-blocking (not relevant for this church)
3. Browser blocks autoplay-with-sound — handled by starting muted; user unmutes manually

The "Watch on YouTube" fallback link covers all three.

Test the end-to-end flow with the actual pastor before launch. The "paste only the ID, not the URL" thing trips people up. Sanity validation should reject anything that looks like a URL in `currentLivestreamId`.

## Acceptance criteria

- When `currentLivestreamId` is set, `/live` shows the YouTube embed playing that video
- When `currentLivestreamId` is empty, `/live` shows the "not live" placeholder
- Updating `currentLivestreamId` in Sanity reflects on `/live` within 30 seconds
- "Watch our most recent sermon" links to the actual most recent sermon (sorted by `date` desc)
- "Next service" text is computed correctly based on current time and `serviceTimes`
- Mobile: embed is responsive and fills available width
- "● LIVE" indicator appears in site header when `currentLivestreamId` is set, disappears when cleared
- Invalid YouTube ID renders YouTube's standard error UI (not a crash)
- "Watch on YouTube" fallback link is present
- Lighthouse Performance ≥ 80 on `/live`

## Out of scope

- Live chat (use YouTube's built-in chat)
- Multi-camera switching, OBS integration (handled by the church's own production tools)
- DVR / catch-up viewing of past portions of the current stream (use YouTube's controls)
- Automatic live-detection via YouTube Data API (requires quota management, not worth it for Phase 1)
- Branded white-label player (Mux, Cloudflare Stream — future upgrade only if YouTube branding becomes a problem)

## References

- `@context/zoe-christian-assembly-overview.md`
- `@features/02-sanity-cms.md`
- `@features/04-sermons.md`
