import Stripe from "stripe";

// Initialize Stripe with your Secret Key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
