"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Check, Lock, ArrowLeft, Heart } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const FUNDS = ["Tithe", "Offering", "Missions", "Building Fund"];
const BG_IMAGE = "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041928/BGG_bdrezv.jpg";

export default function DonatePage() {
  return (
    <Suspense fallback={<DonatePageFallback />}>
      <DonatePageContent />
    </Suspense>
  );
}

function DonatePageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#303552]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#a5876d]" />
    </div>
  );
}

function DonatePageContent() {
  const searchParams = useSearchParams();

  const initialAmount = searchParams.get("amount") ? Number(searchParams.get("amount")) : 50;
  const initialFrequency = searchParams.get("frequency") || "one-time";
  const initialFund = searchParams.get("fund") || "Tithe";

  const [fund, setFund] = useState(initialFund);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const displayFrequency = initialFrequency === "monthly" ? "Monthly" : "One-Time";
  const apiFrequency = initialFrequency === "monthly" ? "Monthly" : "One-time";
  const totalAmount = initialAmount;

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD" }).format(val);

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount, fund, frequency: apiFrequency }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [totalAmount, fund, apiFrequency]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalAmount > 0) {
        setClientSecret(null);
        fetchClientSecret().then((secret) => setClientSecret(secret));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [totalAmount, fund, apiFrequency, fetchClientSecret]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#303552]">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url('${BG_IMAGE}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Noise Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000000' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute top-20 right-10 h-72 w-72 rounded-full bg-[#a5876d]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 px-4 pt-28 pb-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {/* Back Link */}
          <Link
            href="/#giving"
            className="group mb-8 inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Giving</span>
          </Link>

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#a5876d]/20">
              <Heart className="h-8 w-8 text-[#a5876d]" />
            </div>
            <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">Complete Your Gift</h1>
            <p className="mx-auto max-w-md text-sm text-gray-400">
              Your generosity makes a difference in our community
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* LEFT: Gift Summary Card */}
            <div className="space-y-6 lg:col-span-2">
              {/* Amount Card */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-white/60 uppercase">
                    Your Gift
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                      initialFrequency === "monthly"
                        ? "bg-[#a5876d] text-white"
                        : "bg-white/10 text-white/80"
                    }`}
                  >
                    {displayFrequency}
                  </span>
                </div>
                <div className="mb-2 text-5xl font-bold text-white">{formatMoney(totalAmount)}</div>
                <p className="text-sm text-white/40">CAD</p>
              </div>

              {/* Fund Selection */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <label className="mb-4 block text-xs font-semibold tracking-wider text-white/60 uppercase">
                  Select Designation
                </label>
                <div className="space-y-2">
                  {FUNDS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFund(f)}
                      className={`flex w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-200 ${
                        fund === f
                          ? "bg-[#a5876d] text-white"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <span className="font-semibold">{f}</span>
                      {fund === f && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 py-4 text-xs font-medium text-white/40">
                <Lock className="h-3.5 w-3.5" />
                <span>Secured with 256-bit SSL encryption</span>
              </div>
            </div>

            {/* RIGHT: Stripe Checkout */}
            <div className="lg:col-span-3">
              <div className="relative min-h-[550px]">
                {clientSecret ? (
                  <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                    <EmbeddedCheckout className="h-full w-full" />
                  </EmbeddedCheckoutProvider>
                ) : (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#a5876d]" />
                    <span className="text-sm font-medium text-white/60">
                      Preparing secure checkout...
                    </span>
                  </div>
                )}
              </div>

              {/* E-transfer Alternative */}
              <div className="mt-6 text-center">
                <p className="text-sm text-white/40">
                  Prefer E-transfer? Send to{" "}
                  <span className="font-semibold text-[#a5876d]">giving@zoechristian.org</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
