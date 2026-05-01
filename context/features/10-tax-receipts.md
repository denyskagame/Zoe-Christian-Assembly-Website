## CRA-Compliant Charitable Tax Receipts

# Overview

Generate Canada Revenue Agency (CRA) compliant charitable donation receipts for every eligible gift. Receipts are PDFs, stored in Vercel Blob, recorded in Neon Postgres, and sent to donors as email attachments. Supports two issuance modes: **per-donation** (one PDF per gift, sent immediately) or **annual** (one consolidated PDF per donor per calendar year, sent in February). Church chooses which.

This is a regulated feature. Misissued receipts can result in CRA penalties or revocation of charitable status. Treat the CRA's official guidance as the source of truth, not this document.

## CRA receipt requirements (every receipt MUST have)

Per the [CRA's official guidance](https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/operating-a-registered-charity/issuing-receipts.html):

1. The phrase "Official receipt for income tax purposes" (or equivalent)
2. Charity's name and address as on file with CRA
3. Charity's registration number (format: `12345 6789 RR 0001`)
4. Unique sequential serial number (never reused)
5. Place where receipt was issued (city, province, country)
6. Date of donation (or year, for annual receipts)
7. Date the receipt was issued
8. Full name of the donor (and address — required for receipts above $10)
9. Amount of the gift in CAD
10. Eligible amount of the gift (for cash gifts, equals the amount)
11. Signature of an individual authorized by the charity
12. Name and website of CRA: `Canada Revenue Agency, canada.ca/charities-giving`

Other rules:

- Issue receipts no later than February 28 of the year following the donation
- Voided/replaced receipts must reference the original; original marked "cancelled"
- Records retained 6 years minimum
- Recurring donations: each gets its own receipt OR included in an annual — either is fine

## Requirements

- `TaxReceipt` and `ReceiptCounter` Prisma models (see Data model below)
- `taxReceiptId` foreign key on `Donation` (added in Feature 08's schema)
- New fields on Sanity `siteSettings` (defined in Feature 02): `charityRegistrationNumber`, `charityLegalName`, `charityAddressOnFile`, `receiptIssuingCity`, `receiptIssuingProvince`, `authorizedSignatoryName`, `authorizedSignatureImage`, `receiptIssuingMode` (`per-donation` | `annual`)
- Receipt PDF template at `lib/receipts/template.tsx` using `@react-pdf/renderer`, including all 12 CRA-required fields
- Sequential receipt-number generator in `lib/receipts.ts`:
  - `getNextReceiptNumber()` — atomic, transactional, never returns duplicates even under concurrency
  - Backed by single-row `ReceiptCounter` table updated within `prisma.$transaction`
- Issuance helpers in `lib/receipts/issue.ts`:
  - `issuePerDonationReceipt(donationId)` — fetch donation, get next receipt number, render PDF, upload to Vercel Blob, insert `TaxReceipt`, update `Donation.taxReceiptId`, email PDF to donor, log
  - `issueAnnualReceipts(year)` — group all `SUCCEEDED` donations in that year by donor email, sum amounts, issue one consolidated receipt per donor
- Stripe webhook (Feature 08) wires the trigger:
  - `per-donation` mode: call `issuePerDonationReceipt()` after donation is marked `SUCCEEDED`
  - `annual` mode: no auto-trigger; admin runs it via the admin tool
  - On `charge.refunded`: void the related receipt automatically and email the donor a notification
- PDFs stored in Vercel Blob at `receipts/{year}/{receiptNumber}.pdf` (private, signed URLs only)
- Each receipt's PDF SHA256 hash stored in `TaxReceipt.pdfHash` for tamper detection
- Admin receipts tool at `app/(admin)/admin/receipts`:
  - List view: paginated, filterable by year and donor name
  - Per-receipt view: PDF preview, void button, donations covered
  - "Generate annual receipts for {year}" button (only if `receiptIssuingMode === 'annual'`)
  - Year-end CSV export of all receipts
  - Auth: simple basic-auth via Next.js middleware with credentials in env vars (Phase 1, no real auth yet)

## Data model (Prisma)

```prisma
model TaxReceipt {
  id                  String      @id @default(cuid())
  receiptNumber       Int         @unique
  receiptYear         Int
  donorName           String
  donorEmail          String
  donorAddressLine1   String
  donorAddressLine2   String?
  donorCity           String
  donorProvince       String
  donorPostalCode     String
  donorCountry        String      @default("CA")
  totalAmount         Int         // cents
  eligibleAmount      Int         // cents (= totalAmount for cash gifts)
  issuedAt            DateTime    @default(now())
  issuedBy            String      // admin email
  status              ReceiptStatus @default(ISSUED)
  replacesReceiptId   String?
  replacedByReceiptId String?
  pdfUrl              String?
  pdfHash             String?
  emailSentAt         DateTime?
  donations           Donation[]
  createdAt           DateTime    @default(now())
  @@index([receiptYear, donorEmail])
  @@index([issuedAt])
}

enum ReceiptStatus {
  ISSUED
  VOIDED
  REPLACED
}

model ReceiptCounter {
  id      Int @id @default(1)
  current Int @default(0)
}
```

## Updates

This is the one feature where "move fast and break things" is genuinely dangerous. Specifically:

- **Have a Canadian accountant or charity lawyer review the receipt template before going live with real donations.** Generate a test receipt for a $1 donation, print it, have it reviewed.
- **Verify the church's CRA registration number is correct** by looking it up at the CRA's [List of charities](https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en) before configuring it.
- **Don't issue any real receipts until the pastor or treasurer has signed off on a sample.**

**Recommend `per-donation` mode for Phase 1:**

- Donors get immediate confirmation, which they prefer
- Spreads technical load (no big February batch job to debug under time pressure)
- Easier to handle edge cases (refunds, address changes) one at a time
- Trade-off: more emails. At this scale it doesn't matter.

If the church specifically prefers annual receipts, the architecture supports both — flip the `receiptIssuingMode` field.

**Receipt-number sequence is the highest-risk technical detail.** Two donations completing at the same instant must NOT get the same receipt number. Use a transactional read-modify-write on `ReceiptCounter` within `prisma.$transaction`. Test under concurrency by simulating 100 simultaneous donations and confirming receipt numbers 1–100 are assigned exactly once.

**Signature image:** get a clean, high-resolution scan of the authorized signatory's signature on a transparent background, PNG, 300dpi minimum. Test rendering at receipt scale before committing — many signatures look fine on screen but render as a blurry blob in a PDF. Have the signatory sign on white paper with a thick black pen, scan, then make the background transparent.

The signatory must be authorized by the church's board to sign receipts. Document this authorization in writing — CRA may ask.

**Refund handling:** when Stripe sends `charge.refunded`:

1. Mark the donation as refunded
2. Find the related `TaxReceipt`
3. Set its status to `VOIDED`
4. Email the donor: "Your receipt #X has been voided due to a refund."

Both the original receipt and the void are kept in the database forever (CRA requires 6+ years; permanent retention is simpler).

**Quebec-specific receipts (Revenu Québec):** Quebec residents may also benefit from a provincial receipt with slightly different requirements. Confirm with the church's accountant whether the federal CRA receipt is sufficient or if a separate Quebec receipt is needed. If yes, this becomes Feature 10b — defer until confirmed.

**Backups:** set up daily Postgres snapshot exported to a separate location (S3 / R2). CRA requires 6 years retention; relying on Vercel Blob and Neon's defaults alone is risky. Document the strategy in `docs/backups.md`.

**Storage URLs must be private.** Donor PDFs contain personal info. Vercel Blob defaults to public URLs — make sure the bucket is configured for private with signed URLs (default 7-day expiration for emailed links, on-demand for admin tool).

**Sherbrooke is in Quebec — many donors will have French accents** in their names and addresses. Test that the PDF renderer handles them correctly (é, è, ç, etc.). Also test long addresses, apartment numbers, and rural-route addresses.

## Acceptance criteria

### Functional

- Sanity charity-info fields are present and validated (registration number matches CRA format)
- A test donation in `per-donation` mode triggers issuance of a `TaxReceipt`, generated PDF, email to donor with PDF attached, all within 5 minutes
- PDF contains all 12 CRA-required fields, correctly populated
- Receipt numbers are sequential with no duplicates — verifiable by inserting 100 concurrent test donations and confirming numbers 1–100 each appear exactly once
- Voiding a receipt sets status to `VOIDED`; if reissued, new receipt has `replacesReceiptId` populated
- In `annual` mode, no receipts issued during the year; "Generate annual receipts" button creates one consolidated receipt per donor
- Refunded donation triggers automatic void and donor email

### Compliance & data integrity

- No two receipts ever share a receipt number (DB constraint enforced)
- Receipt records never hard-deleted — only marked voided
- PDF hashes stored for tamper detection
- Donor address fields present on every issued receipt
- Admin can generate complete year-end CSV export

### Security

- Admin receipts tool gated by basic auth (env var creds)
- PDFs in private Vercel Blob storage; emails contain signed URLs valid for 7 days
- Charity registration number editable only in Sanity Studio by trusted admins

### UX

- PDF renders identically in Adobe Acrobat, macOS Preview, and Chrome's PDF viewer
- Email with PDF attachment passes Mail Tester deliverability
- Admin receipts list view loads in under 2 seconds for up to 1,000 receipts

## Out of scope

- Non-cash gifts (gifts-in-kind, securities) — different CRA requirements; Phase 2+
- Split receipts (gift + benefit, e.g., fundraising dinner)
- Quebec-specific provincial receipts (defer until confirmed needed)
- Donor self-service receipt portal (requires future member accounts)
- Multi-currency (CAD only)
- Bilingual receipts (defer with multi-language)

## References

- `@context/zoe-christian-assembly-overview.md`
- `@features/02-sanity-cms.md` — charity-info fields on `siteSettings`
- `@features/08-giving-stripe.md` — webhook trigger and `Donation.taxReceiptId`
- `@features/09-email-resend.md` — for sending the receipt PDF
- CRA receipting rules: https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/operating-a-registered-charity/issuing-receipts.html
- CRA charity list: https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en
- `@react-pdf/renderer` docs: https://react-pdf.org
