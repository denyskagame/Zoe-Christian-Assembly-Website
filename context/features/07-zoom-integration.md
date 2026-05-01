## Zoom Integration

# Overview

A "Join Sunday Service via Zoom" button on the homepage and `/live` page. Clicking it opens the Zoom meeting in a new tab. The link is managed in Sanity Site Settings — admin updates it once if it ever changes. No Zoom SDK, no embedding, no auth. Just a link, done right.

This feature is intentionally tiny — it has its own spec only to make sure it doesn't get over-engineered.

## Requirements

- `<ZoomJoinButton>` component in `components/zoom-join-button.tsx`:
  - Reads `currentZoomLink` from Sanity Site Settings
  - Renders an `<a>` styled as a button with `target="_blank" rel="noopener noreferrer"`
  - If `currentZoomLink` is empty/null, renders nothing (no broken button)
- Place the component on:
  - The homepage (in the hero or service-times section)
  - The `/live` page
- Consistent styling with the rest of the site's design system

## Updates

The church already has a Zoom account (confirmed by the pastor). This feature works the same regardless of whether it's free or paid Zoom.

One operational thing to confirm with the pastor: free Zoom caps meetings at 40 minutes for groups of 3+ people, which is shorter than most services. If the account is free, the pastor should know that mid-service cutoffs will happen. Either:

- Upgrade to Zoom Pro (~$200/year)
- De-emphasize Zoom for the main service (visitors use the YouTube embed instead) and use Zoom only for prayer meetings, bible study, etc.

Either way, this website integration stays the same.

## Security note for the runbook

Public Zoom links can be Zoom-bombed. Defenses (configured in Zoom, not on the website):

- Require a passcode embedded in the link
- Enable a waiting room for non-members
- Mute participants on entry

Document these in the admin runbook. Don't try to enforce them from the website.

## Acceptance criteria

- When `currentZoomLink` is set, the button appears on the homepage and `/live`
- When `currentZoomLink` is empty, the button does not appear
- Clicking the button opens the Zoom URL in a new tab
- Button styling is consistent with the rest of the site
- Updating the link in Sanity reflects on the site within 60 seconds (ISR)

## Out of scope

- Zoom Web SDK embedded inside the site (added complexity for marginal UX gain)
- Member-only Zoom access (Phase 1 has no member accounts)
- Live participant counts or other Zoom metadata
- Multiple Zoom links (e.g., one per service type — expand later if needed)

## References

- `@context/zoe-christian-assembly-overview.md`
- `@features/02-sanity-cms.md`
- `@features/03-public-pages.md`
- `@features/06-live-service.md`
