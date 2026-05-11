import Link from "next/link";
import Image from "next/image";
import {
  InstagramIcon,
  YouTubeIcon,
  FacebookIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/ui/Icons";
import type { ComponentType } from "react";
import type { SanityAddress, SanitySiteSettings, SanitySocialLink } from "@/sanity/types";

const FOOTER_BG_TEXTURE =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041928/BG_ubuw8d.jpg";
const FOOTER_LOGO =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1768246597/For_Website_Dark_BG-01_g9kqbm.png";

const FALLBACK_QUOTE = {
  text: "I have come that they may have life, and have it more abundantly.",
  reference: "John 10:10",
};

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/ministries", label: "Ministries" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" },
  { href: "/give", label: "Give" },
];

interface FooterProps {
  settings: SanitySiteSettings | null;
}

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
};

function getSocialIcon(platform: string): ComponentType<{ className?: string }> {
  return SOCIAL_ICONS[platform.toLowerCase()] ?? MailIcon;
}

function formatAddressLines(addr: SanityAddress | undefined): string[] {
  if (!addr) return [];
  const cityProvince = [addr.city, addr.province].filter(Boolean).join(" ");
  const cityLine = [cityProvince, addr.postalCode].filter(Boolean).join(" ").trim();
  return [addr.street, cityLine].filter((line) => line && line.length > 0) as string[];
}

export function Footer({ settings }: FooterProps) {
  const churchName = settings?.churchName ?? "Zoe Christian Assembly";
  const churchAddress = formatAddressLines(settings?.address);
  const mailingAddress = formatAddressLines(settings?.mailingAddress);
  const phone = settings?.phone?.trim();
  const email = settings?.email?.trim() || "info@zoechristian.ca";
  const socialLinks: SanitySocialLink[] = settings?.socialLinks ?? [];

  return (
    <footer className="bg-zoe-navy relative mt-auto overflow-hidden font-['Inter'] text-gray-200">
      {/* Background texture */}
      <div className="absolute inset-0">
        <Image
          src={FOOTER_BG_TEXTURE}
          alt=""
          aria-hidden
          fill
          className="object-cover opacity-25"
        />
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000000' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      ></div>

      <div className="relative w-full px-8 lg:px-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 py-16 pb-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Church block */}
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <Link
              href="/"
              className="relative block h-28 w-64 transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={FOOTER_LOGO}
                alt={`${churchName} logo`}
                fill
                className="object-contain drop-shadow-lg"
              />
            </Link>
            <p className="border-zoe-bronze border-l-2 pl-4 text-sm leading-relaxed font-medium text-gray-300 italic">
              &ldquo;{FALLBACK_QUOTE.text}&rdquo; — {FALLBACK_QUOTE.reference}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-4 flex flex-col items-center gap-4 md:items-start">
                <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                  Connect with us
                </h4>
                <ul className="flex gap-4">
                  {socialLinks.map((link) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <li key={link._key}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.platform}
                          className="hover:border-zoe-bronze hover:bg-zoe-bronze flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </li>
                    );
                  })}
                  <li>
                    <a
                      href={`mailto:${email}`}
                      aria-label="Email"
                      className="hover:border-zoe-bronze hover:bg-zoe-bronze flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
                    >
                      <MailIcon className="h-5 w-5" />
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-6 md:pl-12">
            <h3 className="after:from-zoe-bronze relative mb-2 pb-3 text-lg font-bold tracking-wider text-white uppercase after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-linear-to-r after:to-transparent after:content-['']">
              Quick Links
            </h3>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {QUICK_LINKS.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className="hover:text-zoe-bronze group inline-flex items-center gap-2 text-sm tracking-wide text-gray-300 uppercase no-underline transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="bg-zoe-bronze h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:w-3"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <h3 className="after:from-zoe-bronze relative mb-2 pb-3 text-lg font-bold tracking-wider text-white uppercase after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-linear-to-r after:to-transparent after:content-['']">
              Contact Info
            </h3>
            <div className="flex flex-col gap-4">
              {churchAddress.length > 0 && (
                <div className="group flex items-start gap-3 text-sm text-gray-300">
                  <MapPinIcon className="text-zoe-bronze mt-0.5 h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="m-0 leading-snug font-bold text-gray-300">CHURCH ADDRESS:</p>
                    {churchAddress.map((line) => (
                      <p key={line} className="m-0 mt-1 text-sm leading-snug font-medium italic">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {mailingAddress.length > 0 && (
                <div className="group flex items-start gap-3 text-sm text-gray-300">
                  <MapPinIcon className="text-zoe-bronze mt-0.5 h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="m-0 leading-snug font-bold text-gray-300">MAILING ADDRESS:</p>
                    {mailingAddress.map((line) => (
                      <p key={line} className="m-0 mt-1 text-sm leading-snug font-medium italic">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {phone && (
                <div className="text-md group mt-1 flex items-start gap-3 text-gray-300">
                  <PhoneIcon className="text-zoe-bronze mt-0.5 h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-zoe-bronze m-0 leading-snug text-gray-300 no-underline transition-colors duration-300"
                  >
                    {phone}
                  </a>
                </div>
              )}
              <div className="text-md group mt-1 flex items-start gap-3 text-gray-300">
                <MailIcon className="text-zoe-bronze mt-0.5 h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-zoe-bronze m-0 leading-snug text-gray-300 no-underline transition-colors duration-300"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {churchName}. All rights reserved.
            </span>
            <div className="text-sm text-gray-400">
              <span>Handcrafted by </span>
              <a
                href="https://majesticcreative.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zoe-bronze transition-colors duration-300 hover:text-white"
              >
                Majestic Creative Agency
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
