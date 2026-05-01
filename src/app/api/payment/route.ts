import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { amount, fund, frequency } = await req.json();

    if (!amount) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

    const amountInCents = Math.round(amount * 100);
    const isMonthly = frequency === "Monthly";

    // Create a Checkout Session (Embedded Mode)
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",

      // 1. Define what we are selling (Dynamic Price)
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: isMonthly ? `Monthly Donation (${fund})` : `Donation (${fund})`,
            },
            unit_amount: amountInCents,
            recurring: isMonthly ? { interval: "month" } : undefined, // Adds recurring logic if needed
          },
          quantity: 1,
        },
      ],

      // 2. Mode (Subscription vs Payment)
      mode: isMonthly ? "subscription" : "payment",

      // 3. Redirect URL (Where to go after payment)
      // The {session_id} is automatically filled by Stripe
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,

      // 4. Branding & Receipts
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Stripe API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
