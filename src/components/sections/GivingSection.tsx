"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quote, Check, Lock, Heart } from "lucide-react";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PRESET_AMOUNTS = [25, 50, 100, 250];
const FUNDS = ["Tithe", "Offering", "Missions", "Building Fund"];

export function GivingSection() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | "">(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState("one-time");
  const [fund, setFund] = useState("Tithe");
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const handleGiveNow = () => {
    const finalAmount = customAmount ? Number(customAmount) : selectedAmount || 0;
    router.push(
      `/donate?amount=${finalAmount}&frequency=${frequency}&fund=${encodeURIComponent(fund)}`
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

  return (
    <section
      ref={sectionRef}
      id="giving"
      className="relative overflow-hidden bg-[#ECECEC] px-6 py-24"
    >
      {/* Creative Top Separator - Cross Pattern */}
      <div className="pointer-events-none absolute top-8 right-0 left-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#a5876d]/40"></div>
          <div className="relative h-4 w-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-0.5 w-4 bg-[#a5876d]/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-0.5 bg-[#a5876d]/50"></div>
            </div>
          </div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#a5876d]/40"></div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#a5876d]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#303552]/5 blur-3xl"></div>
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
              <span className="rounded-full border border-[#a5876d]/20 bg-[#a5876d]/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#a5876d] uppercase">
                Partner With Us
              </span>
            </div>

            <h2 className="mb-6 text-3xl leading-tight font-bold text-[#303552] md:text-4xl lg:text-5xl">
              Make a Difference <br /> Through Giving
            </h2>

            <p className="mb-10 text-lg leading-relaxed font-light text-gray-600">
              Your financial contributions are the heartbeat of our ministry. Every donation
              directly funds outreach programs and helps us create a welcoming space where lives are
              transformed.
            </p>

            {/* --- Scripture Card --- */}
            <div className="relative mb-8 rounded-2xl bg-[#303552] p-8 shadow-lg">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-[#a5876d]/30" />
              <div className="relative z-10 pt-4">
                <p className="mb-4 pl-6 text-lg leading-relaxed text-gray-200 italic">
                  &ldquo;Every man according as he purposeth in his heart, so let him give; not
                  grudgingly, or of necessity: for God loveth a cheerful giver.&rdquo;
                </p>
                <div className="flex items-center gap-3 pl-6">
                  <div className="h-0.5 w-12 bg-[#a5876d]"></div>
                  <p className="text-sm font-bold text-[#a5876d]">2 Corinthians 9:7 KJV</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {["Flexible giving options", "100% secure SSL payment", "Instant tax receipts"].map(
                (item, i) => (
                  <div key={i} className="group flex items-center gap-4">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#303552]">
                      <Check className="h-3.5 w-3.5 text-[#a5876d]" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT: DONATION CARD */}
          <div
            className={`relative overflow-hidden rounded-2xl bg-[#ececec] p-6 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1),0_25px_60px_-15px_rgba(48,53,82,0.3)] transition-all delay-200 duration-700 ease-out lg:p-8 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative z-10">
              {/* Header with Heart Icon */}
              <div className="mb-6 text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#a5876d]/10">
                  <Heart className="h-6 w-6 text-[#a5876d]" />
                </div>
                <h3 className="text-2xl font-bold text-[#303552]">Give Online</h3>
                <p className="mt-1 text-xs text-gray-500">Secure, encrypted, and simple.</p>
              </div>

              {/* FREQUENCY BUTTONS */}
              <div className="mb-5 flex rounded-lg border-2 border-[#303552] bg-[#ececec]">
                <button
                  onClick={() => setFrequency("one-time")}
                  className={`flex-1 rounded-l-md py-3 text-sm font-bold transition-all duration-300 ${
                    frequency === "one-time"
                      ? "bg-[#303552] text-[#ececec]"
                      : "text-gray-500 hover:text-[#a5876d]"
                  }`}
                >
                  One-Time
                </button>
                <button
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 rounded-r-md py-3 text-sm font-bold transition-all duration-300 ${
                    frequency === "monthly"
                      ? "bg-[#303552] text-[#ececec]"
                      : "text-gray-500 hover:text-[#a5876d]"
                  }`}
                >
                  Monthly
                </button>
              </div>

              {/* FUND SELECTION - Dropdown Style */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold tracking-wider text-[#303552] uppercase">
                  Select Designation
                </label>
                <CustomDropdown
                  options={FUNDS.map((f) => ({ value: f, label: f }))}
                  value={fund}
                  onChange={setFund}
                  placeholder="Select Designation"
                />
              </div>

              {/* AMOUNT SELECTION */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-semibold tracking-wider text-[#303552] uppercase">
                  Choose Amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handlePresetClick(amt)}
                      className={`rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                        selectedAmount === amt && !customAmount
                          ? "-translate-y-1 bg-[#a5876d] text-[#ececec] shadow-lg"
                          : "border border-gray-300 bg-[#ececec] text-gray-600 hover:-translate-y-1 hover:border-[#a5876d] hover:text-[#a5876d]"
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
                  className={`relative flex items-center rounded-lg border bg-[#ececec] px-4 py-3 transition-all duration-200 ${customAmount ? "border-[#a5876d] ring-2 ring-[#a5876d]" : "border-gray-300 hover:border-[#a5876d]"}`}
                >
                  <span className="text-lg font-bold text-[#303552]">$</span>
                  <input
                    type="number"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    className="ml-2 w-full bg-transparent font-bold text-[#303552] outline-none placeholder:font-normal placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* GIVE BUTTON */}
              <button
                onClick={handleGiveNow}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#a5876d] py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
              >
                <span>Continue to Payment</span>
                {(customAmount || selectedAmount) && (
                  <span className="rounded bg-[#ececec]/20 px-2 py-0.5 text-xs">
                    ${customAmount || selectedAmount}
                  </span>
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Secured with 256-bit SSL encryption</span>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4 text-center">
                <p className="text-xs text-gray-500">
                  Prefer E-transfer? Send to{" "}
                  <span className="font-semibold text-[#303552]">giving@zoechristian.org</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
