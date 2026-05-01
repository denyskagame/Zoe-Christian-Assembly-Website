"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Send, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Church Address",
      lines: ["906 Rue Galt E", "Sherbrooke, QC J1G 1Y9"],
    },
    {
      icon: Mail,
      title: "Mailing Address",
      lines: ["2341 Rue Des Saules", "Sherbrooke, QC J1G 3W1"],
    },
    {
      icon: Phone,
      title: "Phone",
      lines: ["+1 873-662-9211"],
      link: "tel:+18736629211",
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["info@zoechristian.org"],
      link: "mailto:info@zoechristian.org",
    },
  ];

  return (
    <main className="min-h-screen bg-[#ECECEC]">
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you! Whether you have questions, prayer requests, or just want to say hello, reach out to us."
        badge="Get In Touch"
      />

      {/* Contact Form & Info Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Information - 2 columns */}
            <div className="lg:col-span-2">
              <div className="sticky top-8">
                <h2 className="mb-8 text-2xl font-bold text-[#303552]">Get In Touch</h2>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-[#ececec] p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.15),0_15px_40px_-10px_rgba(48,53,82,0.3)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]/10">
                          <info.icon className="h-6 w-6 text-[#a5876d]" />
                        </div>
                        <div>
                          <h3 className="mb-2 font-bold text-[#303552]">{info.title}</h3>
                          {info.lines.map((line, i) =>
                            info.link ? (
                              <a
                                key={i}
                                href={info.link}
                                className="block text-sm text-gray-600 transition-colors hover:text-[#a5876d]"
                              >
                                {line}
                              </a>
                            ) : (
                              <p key={i} className="text-sm text-gray-600">
                                {line}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Service Times */}
                  <div className="rounded-2xl bg-[#303552] p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#a5876d]">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-bold text-white">Service Times</h3>
                        <p className="text-sm text-white/80">Sunday: 2:00 PM - 4:00 PM</p>
                        <p className="text-sm text-white/80">Morning Prayer: Daily</p>
                        <p className="text-sm text-white/80">Evening Prayer: Daily</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#ececec] p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] md:p-12">
                <h2 className="mb-8 text-2xl font-bold text-[#303552]">Send Us a Message</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
                    Thank you for your message! We&apos;ll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#303552]"
                    >
                      Full Name<span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-[#303552]"
                      >
                        Email<span className="ml-1 text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-[#303552]"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-[#303552]"
                    >
                      Subject<span className="ml-1 text-red-500">*</span>
                    </label>
                    <CustomDropdown
                      options={[
                        { value: "general", label: "General Inquiry" },
                        { value: "prayer", label: "Prayer Request" },
                        { value: "visit", label: "First Time Visit" },
                        { value: "volunteer", label: "Volunteer Opportunity" },
                        { value: "other", label: "Other" },
                      ]}
                      value={formData.subject}
                      onChange={(value) => setFormData({ ...formData, subject: value })}
                      placeholder="SELECT A SUBJECT"
                      name="subject"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-[#303552]"
                    >
                      Message<span className="ml-1 text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-[#ececec] px-4 py-3 transition-all outline-none hover:border-[#a5876d] focus:border-transparent focus:ring-2 focus:ring-[#a5876d]"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#a5876d] py-3 text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-[#ececec] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#303552] md:text-3xl">Find Us</h2>
            <div className="mx-auto h-0.5 w-16 bg-[#a5876d]"></div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-[#ececec] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2809.8969844891635!2d-71.88245!3d45.40028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb7c7f8c8c8c8c8%3A0x8c8c8c8c8c8c8c8!2s906%20Rue%20Galt%20E%2C%20Sherbrooke%2C%20QC%20J1G%201Y9!5e0!3m2!1sen!2sca!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
