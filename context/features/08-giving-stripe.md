## Offerings & Donations (Stripe)

# Overview

Online giving via Stripe Checkout. Anyone can give without an account. Two flows: **Offerings** (general giving with categories like Tithe, Building Fund, Missions, etc.) and **Donations** (giving to specific campaigns with progress goals, e.g., "Christmas Outreach 2026"). Both support one-time and recurring (weekly/monthly). All transactions stored in Neon Postgres. Triggers branded email receipt (Feature 09) and CRA tax receipt issuance (Feature 10).

Most complex feature in Phase 1. Treat it carefully.

## Requirements

- Neon Postgres set up (free tier)
- Prisma ORM with the data model below
- Stripe account in CAD currency
- Stripe Checkout (hosted page) — NOT Stripe Elements
- `/give` page with form: amount (preset buttons $25/$50/$100/$250 + custom), category (from Sanity `givingCategory`), one-time vs. recurring toggle, frequency (weekly/monthly if recurring), donor name, donor email
- **Donor mailing address collection** — required for CRA tax receipts (see Feature 10). Use Stripe Checkout's native `billing_address_collection: 'required'` rather than custom form fields
- Server Action `createCheckoutSession()` in `app/actions/giving.ts` validates input (Zod) and creates Stripe Checkout Session
- For one-time gifts: `mode: 'payment'`. For recurring: `mode: 'subscription'`
- `/give/thank-you` confirmation page after successful checkout
- Campaign pages:
  - `/give/campaigns` — listing of active campaigns (Sanity `campaign` with `active: true`)
  - `/give/campaigns/[slug]` — individual campaign with progress bar (`sum of succeeded donations / goalAmount`)
- Stripe webhook handler at `app/api/stripe/webhook/route.ts`:
  - Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET`
  - Handles: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`, `charge.refunded`
  - **Idempotent** — replaying any event must not create duplicate `Donation` rows
  - On successful donation: triggers Feature 09 (branded receipt email) and Feature 10 (tax receipt issuance)
  - On refund: triggers Feature 10's receipt void flow

## Data model (Prisma)

```prisma
model Donation {
  id                       String      @id @default(cuid())
  donorEmail               String
  donorName                String
  donorAddressLine1        String?
  donorAddressLine2        String?
  donorCity                String?
  donorProvince            String?
  donorPostalCode          String?
  donorCountry             String?     @default("CA")
  amount                   Int         // in cents
  currency                 String      @default("CAD")
  category                 String      // Sanity givingCategory.slug
  type                     DonationType
  campaignId               String?     // Sanity campaign._id
  stripePaymentIntentId    String?     @unique
  stripeSubscriptionId     String?
  stripeCheckoutSessionId  String?     @unique
  recurring                Boolean     @default(false)
  frequency                String?     // 'weekly' | 'monthly' | null
  status                   DonationStatus @default(PENDING)
  taxReceiptId             String?     // FK to TaxReceipt (Feature 10)
  createdAt                DateTime    @default(now())
  updatedAt                DateTime    @updatedAt
  userId                   String?     // nullable, reserved for future Phase 2 (member accounts)
  @@index([donorEmail])
  @@index([campaignId])
  @@index([createdAt])
  @@index([taxReceiptId])
}

enum DonationType {
  OFFERING
  DONATION
}

enum DonationStatus {
  PENDING
  SUCCEEDED
  FAILED
  CANCELLED
}
```

Two Neon branches: `main` (production) and `preview` (Vercel preview deploys, optional but recommended).

## Updates

**Use Stripe Checkout, not Stripe Elements.** Far less code, PCI scope minimized (server never sees card data), Stripe handles 3D Secure / Apple Pay / Google Pay / SCA automatically. Trade-off is less UI control — worth it.

**Webhook idempotency is the #1 source of bugs in Stripe integrations.** Always:

- Check if a `Donation` with the given Stripe ID already exists _before_ inserting
- Use `upsert` rather than `create` where possible
- Wrap webhook handlers in try/catch; return 200 even on internal errors that aren't retryable, but log them prominently

**On amounts:** Stripe expects integers in cents. Always store and pass amounts as cents. Display formatting ("$25.00") happens at the UI layer only.

**On testing:** Stripe's test cards: `4242 4242 4242 4242` succeeds, `4000 0000 0000 0002` declined, `4000 0027 6000 3184` requires 3D Secure. Never test with real cards in development.

**On webhooks during local dev:** Use the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Admin view of donations:** out of scope at MVP level. The Stripe dashboard is more powerful than anything quickly buildable. Document in the admin runbook: "To see donations, log into Stripe at dashboard.stripe.com." Build a custom view later only if needed.

**Self-service donor portal** (donors managing their recurring donations): out of scope for Phase 1. They email the church and admin handles cancellations via Stripe dashboard. Eventual Phase 2 once member accounts exist.

**Tax receipts** are NOT in this feature — they're Feature 10, a separate spec because of CRA compliance requirements. This feature triggers receipt issuance via the webhook but doesn't generate the PDF itself.

**On CAD:** church is in Canada. Confirm Stripe account country is Canada when creating it — moving country later is painful.

**Develop in Stripe test mode end-to-end first.** Switch to live mode only after every acceptance criterion is met and the church has reviewed the flow on a staging deploy.

## Acceptance criteria

### Functional

- One-time offering of any amount in test mode succeeds, creates a `Donation` row with `status: SUCCEEDED`
- Recurring monthly offering creates a Stripe Subscription and the first `Donation` row with `recurring: true`
- Triggering the next monthly billing cycle in Stripe test mode creates a new `Donation` row via the webhook
- Donation toward a specific campaign correctly stores the `campaignId`
- Campaign progress bar reflects the sum of `SUCCEEDED` donations
- Donor mailing address is captured and stored on the `Donation` row
- On successful donation, Feature 09 receipt email is triggered
- On successful donation, Feature 10 tax receipt issuance is triggered (in `per-donation` mode)
- On refund, Feature 10 receipt void is triggered

### Reliability & security

- Webhook handler is idempotent — replaying a webhook does not create duplicates (verifiable with Stripe's "Resend webhook" feature)
- Webhook signature verification is enforced — unsigned requests rejected with 400
- Failed Stripe Checkout sessions don't leave orphaned `Donation` rows (or they're correctly marked `FAILED`)
- All Stripe API calls have error handling; failures show graceful errors, not 500s
- No card data ever touches our server
- `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` only in env vars
- Donor email validated before creating Checkout Session

### UX

- Mobile: giving form fully usable on a 320px viewport
- Amount input rejects non-numeric and negative values
- Currency clearly shown as CAD throughout
- Loading state shown while redirecting to Stripe (form disabled, spinner visible)

### Operational

- Stripe live mode keys NOT used in development or preview environments — only in production
- Admin runbook includes how to view donations and refund a donation via Stripe dashboard

## Out of scope

- CRA-compliant tax receipts (Feature 10)
- Self-service donor portal (requires future member accounts)
- PayPal or other processors — Stripe only
- In-person giving (kiosk, card reader)
- Donation analytics dashboard (use Stripe's dashboard)
- Apple Pay / Google Pay UI work — Stripe Checkout handles this natively

## References

- `@context/zoe-overview.md`
- `@features/02-sanity-cms.md`
- `@features/03-public-pages.md`
- `@features/09-email-resend.md`
- `@features/10-tax-receipts.md`
- Stripe docs: https://stripe.com/docs
- Stripe testing: https://stripe.com/docs/testing
