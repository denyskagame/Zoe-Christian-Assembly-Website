import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { getSiteSettings } from "@/sanity/lib/sanity";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import PageHeader from "@/components/ui/PageHeader";
import type { SanityAddress } from "@/sanity/types";

export const revalidate = 60;

const FALLBACK_PHONE = "+1 873-662-9211";
const FALLBACK_EMAIL = "info@zoechristian.ca";
const FALLBACK_ADDRESS_LINES = ["906 Rue Galt E", "Sherbrooke, QC J1G 1Y9"];
const FALLBACK_MAILING_LINES = ["2341 Rue Des Saules", "Sherbrooke, QC J1G 3W1"];

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://zoechristian.ca";
}

function formatAddressLines(addr: SanityAddress | undefined): string[] {
  if (!addr) return [];
  const cityProvince = [addr.city, addr.province].filter(Boolean).join(", ");
  const cityLine = [cityProvince, addr.postalCode].filter(Boolean).join(" ");
  return [addr.street, cityLine].filter(Boolean) as string[];
}

function flattenAddress(addr: SanityAddress | undefined): string {
  if (!addr) return "";
  return [addr.street, addr.city, addr.province, addr.postalCode, addr.country]
    .filter(Boolean)
    .join(", ");
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  return {
    title: `Contact Us | ${churchName}`,
    description: `Visit, call, or email ${churchName}. Service times, location, and how to reach our team.`,
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);

  const phone = settings?.phone?.trim() || FALLBACK_PHONE;
  const email = settings?.email?.trim() || FALLBACK_EMAIL;
  const addressLines =
    formatAddressLines(settings?.address).length > 0
      ? formatAddressLines(settings?.address)
      : FALLBACK_ADDRESS_LINES;
  const mailingLines = formatAddressLines(settings?.mailingAddress);
  const serviceTimes = settings?.serviceTimes ?? [];
  const socialLinks = settings?.socialLinks ?? [];

  // Compose a keyless Google Maps embed URL from the address. If we don't have
  // any address parts, hide the map.
  const flatAddress = flattenAddress(settings?.address) || addressLines.join(", ");
  const mapEmbedUrl = flatAddress
    ? `https://maps.google.com/maps?q=${encodeURIComponent(flatAddress)}&output=embed`
    : null;

  const contactCards = [
    {
      Icon: MapPin,
      title: "Church Address",
      lines: addressLines,
    },
    ...(mailingLines.length > 0
      ? [
          {
            Icon: MapPin,
            title: "Mailing Address",
            lines: mailingLines,
          },
        ]
      : mailingLines.length === 0 && !settings
        ? [
            {
              Icon: MapPin,
              title: "Mailing Address",
              lines: FALLBACK_MAILING_LINES,
            },
          ]
        : []),
    {
      Icon: Phone,
      title: "Phone",
      lines: [phone],
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
    },
    {
      Icon: Mail,
      title: "Email",
      lines: [email],
      href: `mailto:${email}`,
    },
  ];

  return (
    <main className="bg-zoe-gray min-h-screen">
      <OrganizationJsonLd settings={settings} siteUrl={siteUrl()} />

      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Visit on Sunday, give us a call, or send a quick email."
        badge="Get In Touch"
      />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
          {/* Contact info — 2 cols */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {contactCards.map((card, i) => (
                <div
                  key={`${card.title}-${i}`}
                  className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-zoe-bronze/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                      <card.Icon className="text-zoe-bronze h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-zoe-navy mb-2 font-bold">{card.title}</h3>
                      {card.lines.map((line, j) =>
                        card.href ? (
                          <a
                            key={j}
                            href={card.href}
                            className="hover:text-zoe-bronze block text-sm text-gray-600 transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={j} className="text-sm text-gray-600">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {serviceTimes.length > 0 && (
                <div className="bg-zoe-navy rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-zoe-bronze flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-bold text-white">Service Times</h3>
                      {serviceTimes.map((s) => (
                        <p key={s._key} className="text-sm text-white/80">
                          {s.label}: {s.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {socialLinks.length > 0 && (
                <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
                  <h3 className="text-zoe-navy mb-3 font-bold">Follow us</h3>
                  <ul className="flex flex-wrap gap-2">
                    {socialLinks.map((link) => (
                      <li key={link._key}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-zoe-bronze/10 text-zoe-bronze hover:bg-zoe-bronze inline-block rounded-full px-4 py-1.5 text-sm font-semibold transition-colors hover:text-white"
                        >
                          {link.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Send a message — mailto, no form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)] md:p-12">
              <h2 className="text-zoe-navy mb-4 text-2xl font-bold">Send Us a Message</h2>
              <p className="mb-8 leading-relaxed text-gray-600">
                Questions, prayer requests, or just want to say hello? Email is the fastest way to
                reach our team. We typically respond within a day or two.
              </p>

              <a
                href={`mailto:${email}`}
                className="bg-zoe-bronze text-zoe-gray hover:bg-zoe-navy inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Send className="h-5 w-5" />
                Email {email}
              </a>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <h3 className="text-zoe-navy mb-3 font-bold">Common reasons people reach out</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a
                      href={`mailto:${email}?subject=I'm new at Zoe`}
                      className="hover:text-zoe-bronze underline underline-offset-4 transition-colors"
                    >
                      I&rsquo;m planning my first visit
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${email}?subject=Prayer request`}
                      className="hover:text-zoe-bronze underline underline-offset-4 transition-colors"
                    >
                      I have a prayer request
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${email}?subject=Volunteering`}
                      className="hover:text-zoe-bronze underline underline-offset-4 transition-colors"
                    >
                      I&rsquo;d like to volunteer
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${email}?subject=Question about your beliefs`}
                      className="hover:text-zoe-bronze underline underline-offset-4 transition-colors"
                    >
                      I have a question about your beliefs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mapEmbedUrl && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-zoe-navy mb-3 text-2xl font-bold md:text-3xl">Find Us</h2>
              <div className="bg-zoe-bronze mx-auto h-0.5 w-16"></div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church location map"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
