"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Users,
  Church,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

type FormStep = 1 | 2 | 3;

interface FormData {
  // Step 1 - Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  // Step 2 - Address & Family
  address: string;
  city: string;
  province: string;
  postalCode: string;
  maritalStatus: string;
  familyMembers: string;
  // Step 3 - Church Info
  membershipStatus: string;
  howDidYouHear: string;
  interests: string[];
  prayerRequest: string;
  comments: string;
}

export default function ConnectPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    province: "QC",
    postalCode: "",
    maritalStatus: "",
    familyMembers: "",
    membershipStatus: "",
    howDidYouHear: "",
    interests: [],
    prayerRequest: "",
    comments: "",
  });

  const interests = [
    { id: "worship", label: "Worship Team", icon: "🎵" },
    { id: "youth", label: "Youth Ministry", icon: "👦" },
    { id: "kids", label: "Children Ministry", icon: "👶" },
    { id: "prayer", label: "Prayer Team", icon: "🙏" },
    { id: "outreach", label: "Outreach", icon: "🌍" },
    { id: "media", label: "Media & Tech", icon: "📷" },
    { id: "hospitality", label: "Hospitality", icon: "☕" },
    { id: "biblestudy", label: "Bible Study", icon: "📖" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((i) => i !== interestId)
        : [...prev.interests, interestId],
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

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep((currentStep + 1) as FormStep);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormStep);
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Address & Family", icon: MapPin },
    { number: 3, title: "Get Involved", icon: Heart },
  ];

  if (isSubmitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#ECECEC] px-6">
        <div className="w-full max-w-lg text-center">
          <div className="rounded-3xl bg-[#ececec] p-12 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-[#303552] md:text-3xl">
              Welcome to the Family!
            </h1>
            <p className="mb-8 text-gray-600">
              Thank you for connecting with us! We&apos;re excited to have you as part of our
              community. Someone from our team will reach out to you soon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Connect With Us"
        subtitle="Whether you're a first-time visitor or ready to become a member, we'd love to get to know you better."
        badge="Join Our Community"
      />

      {/* Progress Steps */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-[#a5876d] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`mt-2 hidden text-xs font-medium sm:block ${
                      currentStep >= step.number ? "text-[#303552]" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-1 flex-1 rounded transition-all duration-300 ${
                      currentStep > step.number ? "bg-[#a5876d]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 py-8 pb-16">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-[#ececec] p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] md:p-12">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <User className="h-5 w-5 text-[#a5876d]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#303552]">Personal Information</h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        <Mail className="mr-1 inline h-4 w-4" />
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
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        <Phone className="mr-1 inline h-4 w-4" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        <Calendar className="mr-1 inline h-4 w-4" />
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Gender
                      </label>
                      <CustomDropdown
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        value={formData.gender}
                        onChange={(value) => setFormData({ ...formData, gender: value })}
                        placeholder="Select..."
                        name="gender"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address & Family */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <MapPin className="h-5 w-5 text-[#a5876d]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#303552]">Address & Family</h2>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#303552]">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="Sherbrooke"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Province
                      </label>
                      <CustomDropdown
                        options={[
                          { value: "QC", label: "Quebec" },
                          { value: "ON", label: "Ontario" },
                          { value: "BC", label: "British Columbia" },
                          { value: "AB", label: "Alberta" },
                          { value: "MB", label: "Manitoba" },
                          { value: "SK", label: "Saskatchewan" },
                          { value: "NS", label: "Nova Scotia" },
                          { value: "NB", label: "New Brunswick" },
                          { value: "NL", label: "Newfoundland" },
                          { value: "PE", label: "Prince Edward Island" },
                        ]}
                        value={formData.province}
                        onChange={(value) => setFormData({ ...formData, province: value })}
                        placeholder="Select Province"
                        name="province"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="J1G 1Y9"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        <Users className="mr-1 inline h-4 w-4" />
                        Marital Status
                      </label>
                      <CustomDropdown
                        options={[
                          { value: "single", label: "Single" },
                          { value: "married", label: "Married" },
                          { value: "divorced", label: "Divorced" },
                          { value: "widowed", label: "Widowed" },
                        ]}
                        value={formData.maritalStatus}
                        onChange={(value) => setFormData({ ...formData, maritalStatus: value })}
                        placeholder="Select..."
                        name="maritalStatus"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        Family Members in Household
                      </label>
                      <input
                        type="text"
                        name="familyMembers"
                        value={formData.familyMembers}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="e.g., 2 adults, 3 children"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Get Involved */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a5876d]/10">
                      <Heart className="h-5 w-5 text-[#a5876d]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#303552]">Get Involved</h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        <Church className="mr-1 inline h-4 w-4" />I am a...
                      </label>
                      <CustomDropdown
                        options={[
                          { value: "first-time", label: "First-time Visitor" },
                          { value: "returning", label: "Returning Visitor" },
                          { value: "regular", label: "Regular Attendee" },
                          { value: "member", label: "Want to Become a Member" },
                        ]}
                        value={formData.membershipStatus}
                        onChange={(value) => setFormData({ ...formData, membershipStatus: value })}
                        placeholder="Select..."
                        name="membershipStatus"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#303552]">
                        How did you hear about us?
                      </label>
                      <CustomDropdown
                        options={[
                          { value: "friend", label: "Friend or Family" },
                          { value: "social", label: "Social Media" },
                          { value: "google", label: "Google Search" },
                          { value: "event", label: "Church Event" },
                          { value: "other", label: "Other" },
                        ]}
                        value={formData.howDidYouHear}
                        onChange={(value) => setFormData({ ...formData, howDidYouHear: value })}
                        placeholder="Select..."
                        name="howDidYouHear"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-4 block text-sm font-semibold text-[#303552]">
                      Areas of Interest (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {interests.map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => handleInterestToggle(interest.id)}
                          className={`rounded-xl border-2 p-4 text-left transition-all duration-300 ${
                            formData.interests.includes(interest.id)
                              ? "border-[#a5876d] bg-[#a5876d]/10"
                              : "border-gray-200 hover:border-[#a5876d]/50"
                          }`}
                        >
                          <span className="mb-1 block text-2xl">{interest.icon}</span>
                          <span className="text-sm font-medium text-[#303552]">
                            {interest.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#303552]">
                      Prayer Request (Optional)
                    </label>
                    <textarea
                      name="prayerRequest"
                      value={formData.prayerRequest}
                      onChange={handleChange}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      placeholder="Share any prayer requests..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#303552]">
                      Additional Comments
                    </label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      placeholder="Anything else you'd like us to know..."
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-between border-t border-gray-100 pt-6">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded-lg px-6 py-3 font-semibold text-[#303552] transition-all hover:bg-gray-100"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#a5876d] px-6 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
                  >
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#a5876d] px-8 py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Complete Registration
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
