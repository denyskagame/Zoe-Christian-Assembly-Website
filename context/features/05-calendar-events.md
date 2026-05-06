## Schedules, Programs & Calendar

# Overview

Public events page at `/events` with two views: "Upcoming" (list view of next 20 events) and "Calendar" (FullCalendar with month/week/list views). Visitors can click any event for full details, and add events to their personal calendar (Google, Apple, Outlook) via a one-click `.ics` export or a Google Calendar URL. Admin manages events through Sanity (Feature 02).

## Requirements

- `/events` page with two tabs: "Upcoming" (default) and "Calendar"
- "Upcoming" tab: simple chronological list of next 20 events
- "Calendar" tab: FullCalendar with month, week, and list views (toggleable)
- Individual event page at `/events/[slug]` with: title, full description, formatted date/time, location, cover image, "Add to my calendar" button
- "Add to my calendar" provides two options:
  - Download `.ics` file via `/events/[slug]/calendar.ics` server route
  - "Add to Google Calendar" link using Google's URL-based add-event format
- Recurring events handled via a simple enum (`none` | `weekly` | `bi-weekly` | `monthly`) with optional `recurrenceEndDate` — NOT raw RRULE strings
- Server helpers in `lib/events.ts`:
  - `getExpandedEvents(rangeStart, rangeEnd)` — fetches Sanity events, expands recurring ones, returns sorted occurrences
  - `getUpcomingEvents(limit)` — used by `/events` and the homepage
- `.ics` files for recurring events include the RRULE so the user's calendar app handles recurrence natively
- Time zone handling: store all datetimes in Sanity as UTC, display in `America/Toronto` (Sherbrooke is Eastern Time)
- FullCalendar code-split (`dynamic` import with `ssr: false`) so it doesn't load on every page

## Updates

FullCalendar is solid but heavy (~150KB minified). Code-split it so it only loads on `/events`, not the whole site.

For the homepage's "next 3 events" section (Feature 03), do NOT use FullCalendar — just render the data as a simple list. FullCalendar is only for the dedicated `/events` page.

**Resist supporting arbitrary RRULE strings in Sanity.** Most churches have a small number of regular weekly events plus occasional one-off events. The 4-option enum (`none`, `weekly`, `bi-weekly`, `monthly`) covers 95% of real cases. Letting admins write raw RRULE is too error-prone.

Edge case: if a recurring event needs to be cancelled for a specific week (e.g., "no Prayer Night this Wednesday because of Christmas"), the admin creates a separate one-off "Prayer Night Cancelled" event for that date as a workaround. Acceptable for Phase 1; full exception-date support can come later.

`rrule` (npm package) handles the expansion math. `ics` (npm package) generates the calendar files.

## Acceptance criteria

- `/events` shows both "Upcoming" and "Calendar" tabs
- Calendar view supports month/week/list, all toggleable
- One-time events display correctly on their date
- Weekly/bi-weekly/monthly recurring events display on every occurrence within visible range
- Recurring events stop appearing after `recurrenceEndDate` if set
- Clicking an event in any view opens the individual event page
- "Add to my calendar" works for both Google Calendar (URL) and Apple/Outlook (`.ics` file)
- `.ics` files for recurring events preserve recurrence in the user's calendar app
- Mobile: calendar is usable on a phone screen
- Publishing a new event in Sanity makes it appear within 60 seconds
- Sanity validation rejects events with end time before start time
- Lighthouse Performance ≥ 85 on `/events` (FullCalendar adds weight; 85 is acceptable)

## Out of scope

- Event registration / RSVP
- Ticketing or paid events
- Complex recurrence rules ("every 2nd Tuesday of the month")
- Calendar embed for external sites
- Email reminders for events (Phase 2 candidate, requires subscriptions)

## References

- `@context/zoe-overview.md`
- `@features/02-sanity-cms.md`
- `@features/03-public-pages.md`
- FullCalendar React docs: https://fullcalendar.io/docs/react
