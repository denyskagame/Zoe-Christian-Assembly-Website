"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Send, Lock, Users, Clock, CheckCircle, HandHeart } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

export default function PrayerRequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: "",
    isPrivate: false,
    request: "",
    updates: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requestTypes = [
    "Health & Healing",
    "Family",
    "Finances",
    "Relationships",
    "Guidance & Direction",
    "Spiritual Growth",
    "Thanksgiving",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#ECECEC] px-6">
        <div className="w-full max-w-lg text-center">
          <div className="animate-scale-in rounded-3xl bg-[#ececec] p-12 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#a5876d]/10">
              <HandHeart className="h-10 w-10 text-[#a5876d]" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-[#303552] md:text-3xl">
              We&apos;re Praying With You
            </h1>
            <p className="mb-8 text-gray-600">
              Thank you for sharing your prayer request with us. Our prayer team has received your
              request and will be lifting you up in prayer.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
              >
                Return Home
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    requestType: "",
                    isPrivate: false,
                    request: "",
                    updates: true,
                  });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#303552] bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-[#303552] uppercase transition-all hover:bg-[#303552] hover:text-white"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Prayer Request"
        subtitle="We believe in the power of prayer. Share your request and let us pray with you."
        badge="We're Here For You"
      />

      {/* Main Content */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form - 2 columns */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-[#ececec] p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="John Doe (or Anonymous)"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Request Type */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#303552]">
                      Prayer Category
                    </label>
                    <CustomDropdown
                      options={requestTypes.map((type) => ({ value: type, label: type }))}
                      value={formData.requestType}
                      onChange={(value) => setFormData({ ...formData, requestType: value })}
                      placeholder="SELECT A CATEGORY"
                      name="requestType"
                    />
                  </div>

                  {/* Prayer Request */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#303552]">
                      Your Prayer Request<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="request"
                      value={formData.request}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      placeholder="Share what's on your heart. Your request will be treated with care and confidentiality..."
                    />
                  </div>

                  {/* Privacy Options */}
                  <div className="space-y-4">
                    <label className="group flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleChange}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-[#a5876d] focus:ring-[#a5876d]"
                      />
                      <div>
                        <span className="flex items-center gap-2 font-medium text-[#303552]">
                          <Lock className="h-4 w-4 text-[#a5876d]" />
                          Keep my request private
                        </span>
                        <span className="block text-sm text-gray-500">
                          Only the pastoral team will see this request
                        </span>
                      </div>
                    </label>

                    <label className="group flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="updates"
                        checked={formData.updates}
                        onChange={handleChange}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-[#a5876d] focus:ring-[#a5876d]"
                      />
                      <div>
                        <span className="font-medium text-[#303552]">Receive prayer updates</span>
                        <span className="block text-sm text-gray-500">
                          We&apos;ll follow up and check in on your prayer request
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.request.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#a5876d] py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Prayer Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How We Pray */}
              <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[#303552]">
                  <Heart className="h-5 w-5 text-[#a5876d]" />
                  How We Pray For You
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <span className="text-sm font-bold text-[#a5876d]">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#303552]">We Receive</p>
                      <p className="text-sm text-gray-500">
                        Your request is received by our prayer team
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <span className="text-sm font-bold text-[#a5876d]">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#303552]">We Pray</p>
                      <p className="text-sm text-gray-500">
                        Our team prays for each request individually
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <span className="text-sm font-bold text-[#a5876d]">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#303552]">We Follow Up</p>
                      <p className="text-sm text-gray-500">We check in to see how God is moving</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="rounded-2xl bg-[#303552] p-6 text-white shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 font-bold">
                  <Lock className="h-5 w-5 text-[#a5876d]" />
                  Your Privacy Matters
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  All prayer requests are treated with the utmost confidentiality. Private requests
                  are only shared with our pastoral team. We never share personal information with
                  third parties.
                </p>
              </div>

              {/* Join Prayer Team */}
              <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[#303552]">
                  <Users className="h-5 w-5 text-[#a5876d]" />
                  Join Our Prayer Team
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Want to pray for others? Join our prayer team and be part of this ministry.
                </p>
                <Link
                  href="/connect"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#a5876d] transition-colors hover:text-[#303552]"
                >
                  Get Involved
                  <CheckCircle className="h-4 w-4" />
                </Link>
              </div>

              {/* Prayer Times */}
              <div className="rounded-2xl bg-[#a5876d]/10 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[#303552]">
                  <Clock className="h-5 w-5 text-[#a5876d]" />
                  Prayer Times
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Morning Prayer</span>
                    <span className="font-medium text-[#303552]">Daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Evening Prayer</span>
                    <span className="font-medium text-[#303552]">Daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Corporate Prayer</span>
                    <span className="font-medium text-[#303552]">Sundays</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="bg-[#ececec] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <blockquote className="mb-6 text-xl leading-relaxed font-light text-[#303552] italic md:text-2xl">
            &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition,
            with thanksgiving, present your requests to God.&rdquo;
          </blockquote>
          <cite className="font-semibold text-[#a5876d]">— Philippians 4:6</cite>
        </div>
      </section>
    </main>
  );
}
