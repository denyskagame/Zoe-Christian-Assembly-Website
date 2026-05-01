"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquareHeart,
  Send,
  Sparkles,
  Heart,
  Users,
  CheckCircle,
  Quote,
  Camera,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

export default function ShareTestimonyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    testimonyType: "",
    title: "",
    testimony: "",
    isPublic: true,
    allowContact: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const testimonyTypes = [
    "Salvation",
    "Healing",
    "Answered Prayer",
    "Provision",
    "Deliverance",
    "Restoration",
    "Spiritual Growth",
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
              <Sparkles className="h-10 w-10 text-[#a5876d]" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-[#303552] md:text-3xl">
              Thank You for Sharing!
            </h1>
            <p className="mb-8 text-gray-600">
              Your testimony is a powerful reminder of God&apos;s faithfulness. We&apos;re grateful
              you chose to share your story with us. Our team will review it shortly.
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
                    testimonyType: "",
                    title: "",
                    testimony: "",
                    isPublic: true,
                    allowContact: true,
                  });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#303552] bg-transparent px-6 py-3 text-sm font-bold tracking-wide text-[#303552] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:text-[#ececec]"
              >
                Share Another
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
        title="Share Your Testimony"
        subtitle="Your story matters. Share how God has been working in your life and encourage others."
        badge="Your Story Matters"
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
                        Your Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Email<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Testimony Type and Title */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Testimony Type
                      </label>
                      <CustomDropdown
                        options={testimonyTypes.map((type) => ({ value: type, label: type }))}
                        value={formData.testimonyType}
                        onChange={(value) => setFormData({ ...formData, testimonyType: value })}
                        placeholder="SELECT A CATEGORY"
                        name="testimonyType"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Testimony Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="e.g., How God Healed My Marriage"
                      />
                    </div>
                  </div>

                  {/* Testimony */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#303552]">
                      Your Testimony<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="testimony"
                      value={formData.testimony}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      placeholder="Share your story... What was the situation? What did God do? How has your life changed?"
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <label className="group flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleChange}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-[#a5876d] focus:ring-[#a5876d]"
                      />
                      <div>
                        <span className="flex items-center gap-2 font-medium text-[#303552]">
                          <Users className="h-4 w-4 text-[#a5876d]" />
                          Share publicly
                        </span>
                        <span className="block text-sm text-gray-500">
                          Allow your testimony to be shared to encourage others
                        </span>
                      </div>
                    </label>

                    <label className="group flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="allowContact"
                        checked={formData.allowContact}
                        onChange={handleChange}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-[#a5876d] focus:ring-[#a5876d]"
                      />
                      <div>
                        <span className="font-medium text-[#303552]">
                          Allow church to contact me
                        </span>
                        <span className="block text-sm text-gray-500">
                          We may reach out to feature your testimony in a service or video
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.testimony.trim() ||
                      !formData.name.trim() ||
                      !formData.email.trim()
                    }
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
                        Submit Testimony
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Share */}
              <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[#303552]">
                  <Heart className="h-5 w-5 text-[#a5876d]" />
                  Why Share Your Story?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <span className="text-sm font-bold text-[#a5876d]">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#303552]">Glorify God</p>
                      <p className="text-sm text-gray-500">
                        Your story points others to His goodness
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <span className="text-sm font-bold text-[#a5876d]">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#303552]">Encourage Others</p>
                      <p className="text-sm text-gray-500">
                        Your testimony can inspire faith in someone else
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <span className="text-sm font-bold text-[#a5876d]">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#303552]">Build Community</p>
                      <p className="text-sm text-gray-500">Share in the joy of what God is doing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Testimonies */}
              <div className="rounded-2xl bg-[#303552] p-6 text-white shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 font-bold">
                  <Sparkles className="h-5 w-5 text-[#a5876d]" />
                  Featured Testimonies
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-white/80">
                  Selected testimonies may be featured during our Sunday services, on our website,
                  or on our social media to encourage our community.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#a5876d]">
                  <Camera className="h-4 w-4" />
                  <span>Video testimonies welcome!</span>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[#303552]">
                  <MessageSquareHeart className="h-5 w-5 text-[#a5876d]" />
                  Tips for Sharing
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a5876d]" />
                    <span>Describe the situation before God intervened</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a5876d]" />
                    <span>Share specifically what God did</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a5876d]" />
                    <span>Explain how your life is different now</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a5876d]" />
                    <span>Be authentic and honest</span>
                  </li>
                </ul>
              </div>

              {/* Contact for Video */}
              <div className="rounded-2xl bg-[#a5876d]/10 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[#303552]">
                  <Camera className="h-5 w-5 text-[#a5876d]" />
                  Record a Video Testimony
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Want to share your testimony on video? Contact us to schedule a recording session.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#a5876d] transition-colors hover:text-[#303552]"
                >
                  Contact Us
                  <CheckCircle className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="bg-[#ececec] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Quote className="mx-auto mb-6 h-12 w-12 text-[#a5876d]/20" />
          <blockquote className="mb-6 text-xl leading-relaxed font-light text-[#303552] italic md:text-2xl">
            &ldquo;They triumphed over him by the blood of the Lamb and by the word of their
            testimony.&rdquo;
          </blockquote>
          <cite className="font-semibold text-[#a5876d]">— Revelation 12:11</cite>
        </div>
      </section>
    </main>
  );
}
