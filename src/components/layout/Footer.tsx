"use client";

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

// Assets
const FOOTER_BG_TEXTURE =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764041928/BG_ubuw8d.jpg";
const FOOTER_LOGO =
  "https://res.cloudinary.com/dkvpqgkdr/image/upload/v1768246597/For_Website_Dark_BG-01_g9kqbm.png";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#303552] font-['Inter'] text-gray-200">
      {/* Background Image with 25% Opacity */}
      <div className="absolute inset-0">
        <Image src={FOOTER_BG_TEXTURE} alt="Texture" fill className="object-cover opacity-25" />
      </div>

      {/* Dark Noise Overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000000' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative w-full px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 py-16 pb-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Church Info Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="mb-2">
              <Link
                href="/"
                className="relative block h-28 w-64 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={FOOTER_LOGO}
                  alt="Zoe Christian Assembly Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </Link>
            </div>
            <p className="border-l-2 border-[#a5876d] pl-4 text-center text-sm leading-relaxed font-medium text-gray-300 italic">
              &quot;I have come that they may have life, and have it more abundantly.&quot; - John
              10:10
            </p>
            <div className="mt-4 flex flex-col items-center gap-4">
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                Connect with us
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 no-underline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5876d] hover:bg-[#a5876d] hover:text-white"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 no-underline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5876d] hover:bg-[#a5876d] hover:text-white"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 no-underline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5876d] hover:bg-[#a5876d] hover:text-white"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@zoechristian.org"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 no-underline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5876d] hover:bg-[#a5876d] hover:text-white"
                  aria-label="Email"
                >
                  <MailIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 md:pl-12">
            <h3 className="relative mb-2 pb-3 text-lg font-bold tracking-wider text-white uppercase after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-gradient-to-r after:from-[#a5876d] after:to-transparent after:content-['']">
              Quick Links
            </h3>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              <li className="relative">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm text-gray-300 no-underline transition-all duration-300 hover:translate-x-2 hover:text-[#a5876d]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a5876d] transition-all duration-300 group-hover:w-3"></span>
                  ABOUT US
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/ministries"
                  className="group inline-flex items-center gap-2 text-sm text-gray-300 no-underline transition-all duration-300 hover:translate-x-2 hover:text-[#a5876d]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a5876d] transition-all duration-300 group-hover:w-3"></span>
                  MINISTRIES
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/sermons"
                  className="group inline-flex items-center gap-2 text-sm text-gray-300 no-underline transition-all duration-300 hover:translate-x-2 hover:text-[#a5876d]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a5876d] transition-all duration-300 group-hover:w-3"></span>
                  SERMONS
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm text-gray-300 no-underline transition-all duration-300 hover:translate-x-2 hover:text-[#a5876d]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a5876d] transition-all duration-300 group-hover:w-3"></span>
                  CONTACT US
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/give"
                  className="group inline-flex items-center gap-2 text-sm text-gray-300 no-underline transition-all duration-300 hover:translate-x-2 hover:text-[#a5876d]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a5876d] transition-all duration-300 group-hover:w-3"></span>
                  DONATE
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 text-sm text-gray-300 no-underline transition-all duration-300 hover:translate-x-2 hover:text-[#a5876d]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a5876d] transition-all duration-300 group-hover:w-3"></span>
                  LOGIN
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-6">
            <h3 className="relative mb-2 pb-3 text-lg font-bold tracking-wider text-white uppercase after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-gradient-to-r after:from-[#a5876d] after:to-transparent after:content-['']">
              Contact Info
            </h3>
            <div className="flex flex-col gap-4">
              <div className="group flex items-start gap-3 text-sm text-gray-300">
                <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#a5876d] transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <p className="m-0 leading-snug font-bold text-gray-300">MAILING ADDRESS:</p>
                  <p className="m-0 mt-1 text-sm leading-snug font-medium italic">
                    2341 Rue Des Saules
                  </p>
                  <p className="m-0 text-sm leading-snug font-medium italic">
                    Sherbrooke QC J1G 3W1
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-3 text-sm text-gray-300">
                <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#a5876d] transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <p className="m-0 leading-snug font-bold text-gray-300">CHURCH ADDRESS:</p>
                  <p className="m-0 mt-1 text-sm leading-snug font-medium italic">
                    906 Rue Galt Est
                  </p>
                  <p className="m-0 text-sm leading-snug font-medium italic">
                    Sherbrooke QC J1G 1Y9
                  </p>
                </div>
              </div>
              <div className="text-md group mt-1 flex items-start gap-3 text-gray-300">
                <PhoneIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#a5876d] transition-transform duration-300 group-hover:scale-110" />
                <a
                  href="tel:+18736629211"
                  className="m-0 leading-snug text-gray-300 no-underline transition-colors duration-300 hover:text-[#a5876d]"
                >
                  +1 873-662-9211
                </a>
              </div>
              <div className="text-md group mt-1 flex items-start gap-3 text-gray-300">
                <MailIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#a5876d] transition-transform duration-300 group-hover:scale-110" />
                <a
                  href="mailto:info@zoechristian.org"
                  className="m-0 leading-snug text-gray-300 no-underline transition-colors duration-300 hover:text-[#a5876d]"
                >
                  info@zoechristian.org
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="relative mb-2 pb-3 text-lg font-bold tracking-wider text-white uppercase after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-gradient-to-r after:from-[#a5876d] after:to-transparent after:content-['']">
              Newsletter
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Stay connected with our community. Subscribe to receive updates, sermons, and event
              announcements.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 transition-all duration-300 placeholder:text-gray-400 focus:border-[#a5876d] focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(165,136,106,0.1)] focus:outline-none"
              />
              <button className="w-full cursor-pointer rounded-lg border-none bg-[#a5876d] px-6 py-3 text-sm font-semibold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ececec] hover:text-[#303552] active:translate-y-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex flex-col items-center gap-3 text-sm text-gray-400 md:flex-row">
              <span>
                &copy; {new Date().getFullYear()} Zoe Christian Assembly. All rights reserved.
              </span>
              <div className="flex items-center gap-3">
                <span className="hidden text-gray-600 md:inline">|</span>
                <Link
                  href="/privacy"
                  className="text-gray-400 underline transition-colors duration-300 hover:text-[#a5876d]"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href="/terms"
                  className="text-gray-400 underline transition-colors duration-300 hover:text-[#a5876d]"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-400">
              <span>Handcrafted by</span>
              <br />
              <a
                href="https://majesticcreative.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a5876d] no-underline transition-colors duration-300 hover:text-white"
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
