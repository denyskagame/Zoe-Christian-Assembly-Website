## Email Receipts & Notifications (Resend)

# Overview

Set up transactional email delivery via Resend. In Phase 1, the only emails are **branded donation thank-you receipts** sent after a successful gift. Stripe sends its own automatic receipts; this feature adds a separate, church-branded one with the church's logo, address, and a thank-you message — friendlier and more personal than Stripe's default email.

Also sets up the email infrastructure (sender domain verification, templates, error handling) that future features can build on. The CRA-compliant PDF tax receipt is a separate flow handled by Feature 10.

## Requirements

- Resend account on free tier (3,000 emails/month, 100/day)
- Sending domain verified with SPF, DKIM, DMARC DNS records on the church's domain
- Sender addresses set up:
  - `giving@zoechristianassembly.org` — donation receipts
  - `noreply@zoechristianassembly.org` — system notifications
  - `info@zoechristianassembly.org` — human-replied messages (forward to pastor's actual inbox)
- Branded donation receipt email template at `emails/donation-receipt.tsx` using `react-email`:
  - Church logo at top
  - "Thank you, {Donor Name}" headline
  - Gift details: amount, date, category, campaign (if applicable), Stripe receipt ID for reference
  - Admin-editable thank-you note (pulls `donationReceiptThankYouMessage` from Sanity `siteSettings`)
  - Footer: church name, full mailing address (CASL requirement), contact email, social links
  - Plain-text fallback (React Email generates this)
- Email-sending helper at `lib/email.ts`:
  - `sendDonationReceipt({ donation })` — renders template, sends via Resend
  - Wraps Resend SDK with proper error handling — failed sends are logged but DO NOT block the donation flow
- `EmailLog` table in Postgres tracking all sends:

```prisma
model EmailLog {
  id          String   @id @default(cuid())
  to          String
  subject     String
  template    String   // 'donation-receipt', etc.
  resendId    String?  // Resend's ID for debugging
  status      String   // 'sent' | 'failed'
  error       String?
  relatedId   String?  // e.g., donation ID
  createdAt   DateTime @default(now())
  @@index([to])
  @@index([createdAt])
}
```

- Wired into Feature 08's Stripe webhook: on `checkout.session.completed` (one-time) and `invoice.paid` (recurring), after marking the donation `SUCCEEDED`, call `sendDonationReceipt()`
- Default thank-you message if `donationReceiptThankYouMessage` is empty in Sanity: "Your generosity helps us continue our ministry. May God bless you abundantly."

## Updates

**Email deliverability is unforgiving.** Even with everything set up correctly, a bad sender reputation can land messages in spam. Maximize the odds:

1. Verify the domain properly. Don't skip DKIM. Don't send from an unverified domain.
2. Set up DMARC, starting with `p=none`, ideally `p=quarantine` once confident.
3. Don't change sender addresses frequently — pick `giving@...` and stick with it.
4. Avoid spammy content (no all-caps subjects, no "FREE" or "URGENT", no excessive exclamation marks).
5. Include plain-text fallback (React Email auto-generates it).
6. Include real physical address in the footer (CASL/CAN-SPAM requirement).

**On CASL (Canadian Anti-Spam Legislation):** Donation receipts are generally exempt as transactional emails — directly related to a transaction the recipient initiated. But:

- Email must be transactional in nature (don't pad with marketing content)
- Include the church's mailing address in the footer
- Include a clear sender identifier

If the church later wants promotional emails (newsletters, event invites), they need to collect explicit consent first. Phase 2.

**On React Email:** Excellent for designing emails as components, but the rendered HTML must work in Outlook (Word's rendering engine, not a real browser). Stick to React Email's documented primitives (`<Container>`, `<Section>`, `<Text>`, `<Button>`) and don't try modern CSS. Test in actual Outlook before declaring done.

**Stripe also sends its own receipt by default.** Both go out in Phase 1 — donors get one from Stripe and one from the church. Acceptable; the branded one is what people remember. After launch, gather feedback and decide whether to disable Stripe's via Stripe Dashboard → Customer Emails.

**The DNS record setup is a real-world dependency** that often blocks. Resolve domain admin access before starting this feature.

## Acceptance criteria

- Sender domain verified in Resend (DKIM and SPF pass)
- A test donation in Stripe test mode triggers a branded receipt email within 5 minutes
- Branded receipt renders correctly in Gmail, Outlook (web), Apple Mail (iOS), Yahoo Mail
- Plain-text fallback is included
- All template fields populate correctly: donor name, amount in CAD with two decimals, formatted date, category, campaign (if any)
- If `donationReceiptThankYouMessage` is set in Sanity, it appears; if empty, the default appears
- Email send failure does NOT cause the Stripe webhook to fail (webhook still returns 200, failure is logged)
- `EmailLog` row created for every send attempt with appropriate status
- Recurring donation receipts sent on each successful charge (not just first)
- Sender address shows the church name (e.g., "Zoe Christian Assembly &lt;giving@zoechristianassembly.org&gt;")
- Email passes Mail Tester ([mail-tester.com](https://mail-tester.com)) at 9/10 or above

## Out of scope

- CRA-compliant tax receipt PDFs (Feature 10)
- Newsletters / mass mailings (Resend Audiences — separate product, Phase 2 if needed)
- Event reminder emails (requires subscriber lists, Phase 2)
- Email preferences page (requires member accounts, Phase 2)
- Disabling Stripe's default receipts (evaluate after launch)

## References

- `@context/zoe-christian-assembly-overview.md`
- `@features/02-sanity-cms.md` — `donationReceiptThankYouMessage` field
- `@features/08-giving-stripe.md` — webhook trigger
- `@features/10-tax-receipts.md` — separate PDF receipt flow
- Resend docs: https://resend.com/docs
- React Email: https://react.email
