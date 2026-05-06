"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quote, Check, Lock, Heart } from "lucide-react";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SanityGivingCategory, SanitySiteSettings } from "@/sanity/types";

const FALLBACK_PRESET_AMOUNTS = [25, 50, 100, 250];
const FALLBACK_DEFAULT_PRESET = 50;
const FALLBACK_HEADING = "Make a Difference Through Giving";
const FALLBACK_DESCRIPTION =
  "Your financial contributions are the heartbeat of our ministry. Every donation directly funds outreach programs and helps us create a welcoming space where lives are transformed.";
const FALLBACK_QUOTE_TEXT =
  "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.";
const FALLBACK_QUOTE_REFERENCE = "2 Corinthians 9:7 KJV";
const FALLBACK_TRUST_SIGNALS = [
  "Flexible giving options",
  "100% secure SSL payment",
  "Instant tax receipts",
];
const FALLBACK_CATEGORY_LABELS = ["Tithe", "Offering", "Missions", "Building Fund"];

interface GivingSectionProps {
  settings: SanitySiteSettings | null;
  givingCategories: SanityGivingCategory[];
}

export function GivingSection({ settings, givingCategories }: GivingSectionProps) {
  const router = useRouter();

  const presetAmounts =
    settings?.givingPresetAmounts && settings.givingPresetAmounts.length > 0
      ? settings.givingPresetAmounts
      : FALLBACK_PRESET_AMOUNTS;
  const defaultPreset = settings?.givingDefaultPreset ?? FALLBACK_DEFAULT_PRESET;
  const heading = settings?.givingHeading?.trim() || FALLBACK_HEADING;
  const description = settings?.givingDescription?.trim() || FALLBACK_DESCRIPTION;
  const quoteText = settings?.givingQuote?.text?.trim() || FALLBACK_QUOTE_TEXT;
  const quoteReference = settings?.givingQuote?.reference?.trim() || FALLBACK_QUOTE_REFERENCE;
  const trustSignals =
    settings?.givingTrustSignals && settings.givingTrustSignals.length > 0
      ? settings.givingTrustSignals
      : FALLBACK_TRUST_SIGNALS;
  const etransferEmail = settings?.etransferEmail?.trim() || "";

  // Use Sanity-managed giving categories when available; fall back to a fixed
  // list so the form is still usable before any are published.
  const fundLabels =
    givingCategories.length > 0 ? givingCategories.map((c) => c.label) : FALLBACK_CATEGORY_LABELS;
  const fundOptions = fundLabels.map((label) => ({ value: label, label }));

  const [selectedAmount, setSelectedAmount] = useState<number | "">(defaultPreset);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState("one-time");
  const [fund, setFund] = useState(fundLabels[0] ?? "Tithe");
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const handleGiveNow = () => {
    const finalAmount = customAmount ? Number(customAmount) : selectedAmount || 0;
    router.push(
      `/give?amount=${finalAmount}&frequency=${frequency}&fund=${encodeURIComponent(fund)}`
    );
  };

  const handlePresetClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount("");
  };

  const headingLines = heading.split(/\r?\n/);

  return (
    <section
      ref={sectionRef}
      id="giving"
      className="bg-zoe-gray relative overflow-hidden px-6 py-24"
    >
      {/* Top Separator */}
      <div className="pointer-events-none absolute top-8 right-0 left-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="to-zoe-bronze/40 h-px w-20 bg-linear-to-r from-transparent"></div>
          <div className="relative h-4 w-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-zoe-bronze/50 h-0.5 w-4"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-zoe-bronze/50 h-4 w-0.5"></div>
            </div>
          </div>
          <div className="to-zoe-bronze/40 h-px w-20 bg-linear-to-l from-transparent"></div>
        </div>
      </div>

      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-zoe-bronze/5 absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-zoe-navy/5 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* LEFT: TEXT CONTENT */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="mb-6 inline-block">
              <span className="border-zoe-bronze/20 bg-zoe-bronze/10 text-zoe-bronze rounded-full border px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase">
                Partner With Us
              </span>
            </div>

            <h2 className="text-zoe-navy mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>

            <p className="mb-10 text-lg leading-relaxed font-light text-gray-600">{description}</p>

            {/* Scripture Card */}
            <div className="bg-zoe-navy relative mb-8 rounded-2xl p-8 shadow-lg">
              <Quote className="text-zoe-bronze/30 absolute top-4 left-4 h-8 w-8" />
              <div className="relative z-10 pt-4">
                <p className="mb-4 pl-6 text-lg leading-relaxed text-gray-200 italic">
                  &ldquo;{quoteText}&rdquo;
                </p>
                <div className="flex items-center gap-3 pl-6">
                  <div className="bg-zoe-bronze h-0.5 w-12"></div>
                  <p className="text-zoe-bronze text-sm font-bold">{quoteReference}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {trustSignals.map((item, i) => (
                <div key={i} className="group flex items-center gap-4">
                  <div className="bg-zoe-navy flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                    <Check className="text-zoe-bronze h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DONATION CARD */}
          <div
            className={`bg-zoe-gray relative overflow-hidden rounded-2xl p-6 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] transition-all delay-200 duration-700 ease-out lg:p-8 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-6 text-center">
                <div className="bg-zoe-bronze/10 mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full">
                  <Heart className="text-zoe-bronze h-6 w-6" />
                </div>
                <h3 className="text-zoe-navy text-2xl font-bold">Give Online</h3>
                <p className="mt-1 text-xs text-gray-500">Secure, encrypted, and simple.</p>
              </div>

              {/* FREQUENCY BUTTONS */}
              <div className="border-zoe-navy bg-zoe-gray mb-5 flex rounded-lg border-2">
                <button
                  onClick={() => setFrequency("one-time")}
                  className={`flex-1 rounded-l-md py-3 text-sm font-bold transition-all duration-300 ${
                    frequency === "one-time"
                      ? "bg-zoe-navy text-zoe-gray"
                      : "hover:text-zoe-bronze text-gray-500"
                  }`}
                >
                  One-Time
                </button>
                <button
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 rounded-r-md py-3 text-sm font-bold transition-all duration-300 ${
                    frequency === "monthly"
                      ? "bg-zoe-navy text-zoe-gray"
                      : "hover:text-zoe-bronze text-gray-500"
                  }`}
                >
                  Monthly
                </button>
              </div>

              {/* FUND SELECTION */}
              <div className="mb-5">
                <label className="text-zoe-navy mb-2 block text-xs font-semibold tracking-wider uppercase">
                  Select Designation
                </label>
                <CustomDropdown
                  options={fundOptions}
                  value={fund}
                  onChange={setFund}
                  placeholder="Select Designation"
                />
              </div>

              {/* AMOUNT SELECTION */}
              <div className="mb-4">
                <label className="text-zoe-navy mb-2 block text-xs font-semibold tracking-wider uppercase">
                  Choose Amount
                </label>
                <div
                  className={`grid gap-2 ${
                    presetAmounts.length <= 2
                      ? "grid-cols-2"
                      : presetAmounts.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-4"
                  }`}
                >
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handlePresetClick(amt)}
                      className={`rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                        selectedAmount === amt && !customAmount
                          ? "bg-zoe-bronze text-zoe-gray -translate-y-1 shadow-lg"
                          : "bg-zoe-gray hover:border-zoe-bronze hover:text-zoe-bronze border border-gray-300 text-gray-600 hover:-translate-y-1"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* CUSTOM AMOUNT */}
              <div className="mb-5">
                <div
                  className={`bg-zoe-gray relative flex items-center rounded-lg border px-4 py-3 transition-all duration-200 ${
                    customAmount
                      ? "border-zoe-bronze ring-zoe-bronze ring-2"
                      : "hover:border-zoe-bronze border-gray-300"
                  }`}
                >
                  <span className="text-zoe-navy text-lg font-bold">$</span>
                  <input
                    type="number"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    className="text-zoe-navy ml-2 w-full bg-transparent font-bold outline-none placeholder:font-normal placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* GIVE BUTTON */}
              <button
                onClick={handleGiveNow}
                className="bg-zoe-bronze text-zoe-gray hover:bg-zoe-navy flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span>Continue to Payment</span>
                {(customAmount || selectedAmount) && (
                  <span className="bg-zoe-gray/20 rounded px-2 py-0.5 text-xs">
                    ${customAmount || selectedAmount}
                  </span>
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Secured with 256-bit SSL encryption</span>
              </div>

              {etransferEmail && (
                <div className="mt-4 border-t border-gray-200 pt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Prefer E-transfer? Send to{" "}
                    <a
                      href={`mailto:${etransferEmail}`}
                      className="text-zoe-navy font-semibold hover:underline"
                    >
                      {etransferEmail}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
