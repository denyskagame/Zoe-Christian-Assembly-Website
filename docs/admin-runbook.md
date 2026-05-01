# Zoe Admin Runbook

This is your guide to the most common things you'll do as an admin of the Zoe Christian Assembly website. Bookmark this page.

The admin panel lives at:

```
https://<your-site>/studio
```

You log in with the email you were invited under. If you don't see an invite, ask the developer to invite you.

When you save a change in the admin panel, the public website usually updates within 60 seconds.

---

## 1. Post a sermon

1. Open the admin panel and click **Add a sermon** from the welcome screen (or pick **Sermons** in the sidebar and click **+**).
2. Fill in:
   - **Sermon title** — the name of the message.
   - **Preacher** — who preached it.
   - **Date preached** — pick the Sunday it was given.
   - **YouTube video URL** — paste the full link from YouTube (looks like `https://www.youtube.com/watch?v=...` or `https://youtu.be/...`). The system will reject it if it's not a valid YouTube link.
3. (Optional but encouraged) Open **Details** and fill in **Scripture reference**, **Short description**, **Duration**, **Type**, and **Series**.
4. Click **Publish** in the bottom-right.

Sermons sort newest-first automatically.

---

## 2. Create an event

1. From the welcome screen click **Create an event** (or pick **Events** in the sidebar and click **+**).
2. Fill in **Event title**, pick a **Category**, and write a **Short description**.
3. Under **When it happens**, set the **date**, **start time**, and **end time**. Times use formats like `10:00 AM` or `2:00 PM`. The system will reject an end time that isn't after the start time.
4. Under **Where it happens**, set the **location**, or check **Is this an online event?** to enter a Zoom link.
5. (Optional) If the event repeats, open **Recurrence** and pick weekly / bi-weekly / monthly. Set **Repeat until** if it has a final date.
6. (Optional) Open **Appearance** to set a calendar color and upload a flyer image.
7. Make sure **Published** is checked under **Visibility flags**.
8. Click **Publish**.

---

## 3. Update this Sunday's livestream link

This is the single most common task each week.

1. From the welcome screen click **Update this Sunday's livestream**, or click **Site Settings** in the sidebar.
2. Find **Live stream & online services**.
3. In **This Sunday's YouTube video ID**, paste **only the 11-character video ID** — not the full URL.
   - The ID is the part after `v=` in the URL. Example: in `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.
   - If you paste a full URL by mistake, the system will tell you. Just take the 11 characters between `v=` and the next `&` and try again.

4. Click **Publish**.

The `/live` page on the website will pick up the new ID within a minute.

---

## 4. Post an announcement

Use this for short, time-sensitive notices ("Service moved to 11 AM this Sunday").

1. From the welcome screen click **Post an announcement** (or pick **Announcements** in the sidebar and click **+**).
2. Fill in:
   - **Headline** — short and clear.
   - **Message** — the full text. 1–3 sentences works best.
3. Make sure **Show on the website** is on.
4. (Optional) Under **When to show**, set a **Start showing on** or **Stop showing on** date if the announcement should appear automatically over a window.
5. Click **Publish**.

To take an announcement down without losing it, open it again and turn off **Show on the website**.

---

## 5. Recover a deleted document

Sanity keeps a history of every change. If you delete a sermon, event, or any other document by mistake:

1. From the sidebar, open the section the document was in (e.g., **Sermons**).
2. At the top of the list, click the three-dot menu and pick **Show deleted**, or click **History** on the section header.
3. Find the deleted document and click **Restore**.

If you can't find it, ask the developer — Sanity retains deleted content for 30 days on the free plan and the developer can restore it from a tool called "Sanity History API" if needed.

---

## Tips

- **Drafts vs. Published.** When you make changes, you create a **draft**. The public site only shows what you've **published**. The "Publish" button is in the bottom-right corner of every document.
- **Preview before publishing.** Click the eye icon at the top of a document to see a preview of how it'll look.
- **Don't worry about breaking things.** Almost everything is reversible — if you save something wrong, edit it and publish again.

---

## For the developer

### Regenerating TypeScript types

After changing any schema in `src/sanity/schemaTypes/`, regenerate the typed query helpers:

```sh
npm run typegen
```

This runs `sanity schema extract` (writes `schema.json`) followed by `sanity typegen generate` (writes `src/sanity/sanity.types.ts`). Both files are gitignored — they regenerate locally and on Vercel as needed. You'll need `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` set in `.env.local` for these commands to succeed.

The hand-written interfaces in `src/sanity/types.ts` are the canonical types for the rest of the codebase. Once `npm run typegen` runs successfully, you can switch the data-fetching helpers in `src/sanity/lib/sanity.ts` to import from `./sanity.types.ts` instead. Until then, the hand-written types stay authoritative.

### Inviting a non-developer admin

1. Open the Sanity project at <https://www.sanity.io/manage>.
2. Go to **Members** → **Invite member**.
3. Enter the pastor or volunteer's email and choose role **Editor** (not Administrator — Editors cannot change billing, tokens, or schemas).
4. They'll get an email invite. Once they accept, they can log in at `/studio`.

### Setting Sanity environment variables

Both `.env.local` (development) and Vercel (production + preview) need:

| Variable                         | Where to find it                                            |
| -------------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sanity project page → **API** tab                           |
| `NEXT_PUBLIC_SANITY_DATASET`     | Usually `production`                                        |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Pinned in `.env.example` — bump only with intent            |
| `SANITY_API_TOKEN`               | Sanity → **API** → **Tokens** → create with **Viewer** role |

In Vercel, set these for **Production** AND **Preview** so PR builds can fetch content too.
