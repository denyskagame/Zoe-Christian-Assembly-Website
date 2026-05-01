"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isModalOpen } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  // Handle donate button click - scroll to giving section or navigate to home first
  const handleDonateClick = useCallback(() => {
    if (pathname === "/") {
      // Already on homepage, just scroll to giving section
      const givingSection = document.getElementById("giving");
      if (givingSection) {
        givingSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to homepage with hash
      router.push("/#giving");
    }
  }, [pathname, router]);

  // Link Styles
  const linkStyles =
    "text-[#303552] px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center uppercase relative no-underline cursor-pointer border-none bg-transparent hover:text-[#a5876d]";
  const dropdownItemStyles =
    "block px-4 py-3 text-[#303552] transition-all duration-300 uppercase font-medium text-sm border-none bg-transparent w-full text-left whitespace-nowrap hover:bg-[#a5876d] hover:text-white hover:translate-x-1";

  // Scroll handler using requestAnimationFrame for smooth updates
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPosition = window.scrollY;
          setScrollPosition(currentScrollPosition);
          // TopBar visibility: hide when scrolling past 20px
          setIsTopBarVisible(currentScrollPosition <= 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate navbar top position
  const getNavbarTop = useCallback(() => {
    if (isMobileMenuOpen) return "0";
    // Show navbar below TopBar when at top, otherwise stick to top
    return isTopBarVisible && scrollPosition <= 5 ? "3.5rem" : "0";
  }, [isMobileMenuOpen, isTopBarVisible, scrollPosition]);

  return (
    <>
      {/* TopBar */}
      <div
        className={`fixed top-0 right-0 left-0 z-60 text-[#303552] transition-all duration-150 ease-out ${
          isTopBarVisible && !isMobileMenuOpen && !isModalOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d8d8d8] via-[#ececec] to-[#ececec] shadow-sm"></div>

        <div className="relative flex h-14 max-w-full items-center justify-between px-6 lg:px-12 xl:px-20">
          {/* Bottom Line */}
          <div
            className="absolute right-0 bottom-0 h-0.5 w-[55%]"
            style={{
              background:
                "linear-gradient(to left, #303552 0%, #a5876d 60%, rgba(255,255,255,0) 100%)",
            }}
          ></div>

          {/* Left: Bible Link */}
          <a
            href="https://www.bible.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center gap-2 pl-1 text-sm font-semibold tracking-wide text-[#303552] no-underline transition-colors duration-300 hover:text-[#a5876d]"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h7v7l2-1 2 1V4h2v12z" />
            </svg>
            BIBLE
          </a>

          {/* Right: Connect & Language */}
          <div className="relative z-10 flex items-center gap-6">
            <Link
              href="/connect"
              className="flex cursor-pointer items-center gap-2 border-none bg-transparent text-sm font-semibold text-[#303552] transition-colors duration-300 hover:text-[#a5876d]"
            >
              <svg className="h-4 w-4" fill="none" stroke="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" fill="currentColor" />
                <path d="M20 21a8 8 0 1 0-16 0" fill="currentColor" />
              </svg>
              <span className="tracking-wider uppercase">CONNECT</span>
            </Link>

            <div className="h-4 w-px bg-[#303552]/20"></div>

            {/* Language Switcher */}
            <div className="group relative flex h-full cursor-pointer items-center">
              <button className="flex items-center gap-1 text-sm font-semibold text-[#303552] uppercase transition-colors hover:text-[#a5876d]">
                EN
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-[50%] right-0 h-10 w-full bg-transparent"></div>
              <div className="invisible absolute top-full right-0 -translate-y-2 pt-2 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex min-w-30 flex-col overflow-hidden rounded-md border border-white/20 bg-[#ECECEC] py-2 shadow-xl">
                  <button className="block w-full border-b border-[#303552]/10 px-4 py-2.5 text-left text-sm font-semibold text-[#303552] uppercase transition-colors last:border-0 hover:bg-[#a5876d] hover:text-[#ECECEC]">
                    English
                  </button>
                  <button className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-[#303552] uppercase transition-colors hover:bg-[#a5876d] hover:text-[#ECECEC]">
                    Français
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed right-0 left-0 z-50 flex items-center transition-[top,background-color,opacity,transform] duration-150 ease-out ${
          isTopBarVisible ? "bg-[#ECECEC]" : "bg-[#ECECEC]/80 backdrop-blur-md"
        } ${isModalOpen ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
        style={{
          top: isModalOpen ? "-100%" : getNavbarTop(),
        }}
      >
        <div className="w-full px-8 lg:px-16">
          <div className="flex h-20 items-center justify-between">
            {/* LOGO */}
            <div className="mt-4 flex-shrink-0">
              <Link
                href="/"
                className="inline-block transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764097888/For_Website_Light_BG-01_janmev.png"
                  alt="Zoe Christian Assembly"
                  width={280}
                  height={100}
                  className="h-24 w-auto object-contain drop-shadow-sm transition-all duration-300 hover:drop-shadow-md"
                  priority
                />
              </Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
              <div className="flex items-center space-x-12">
                <Link href="/" className={linkStyles}>
                  Home
                </Link>

                {/* About Dropdown */}
                <div className="group relative">
                  <span className={linkStyles}>
                    About
                    <svg
                      className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <div className="invisible absolute top-full left-0 z-[100] min-w-60 -translate-y-2 rounded-lg bg-[#F5F4F2] py-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 before:absolute before:-top-2 before:right-0 before:left-0 before:h-2 before:bg-transparent before:content-['']">
                    <Link href="/about/our-story" className={dropdownItemStyles}>
                      Our Story
                    </Link>
                    <Link href="/about/what-we-believe" className={dropdownItemStyles}>
                      What We Believe
                    </Link>
                    <Link href="/about/our-staff" className={dropdownItemStyles}>
                      Our Staff
                    </Link>
                  </div>
                </div>

                {/* Ministries Dropdown */}
                <div className="group relative">
                  <span className={linkStyles}>
                    Ministries
                    <svg
                      className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <div className="invisible absolute top-full left-0 z-[100] min-w-60 -translate-y-2 rounded-lg bg-[#F5F4F2] py-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 before:absolute before:-top-2 before:right-0 before:left-0 before:h-2 before:bg-transparent before:content-['']">
                    <Link href="/kids" className={dropdownItemStyles}>
                      Zoe Kids
                    </Link>
                    <Link href="/youth" className={dropdownItemStyles}>
                      Youth
                    </Link>
                  </div>
                </div>

                <Link href="/events" className={linkStyles}>
                  Events
                </Link>
                <Link href="/sermons" className={linkStyles}>
                  Sermons
                </Link>
                <Link href="/contact" className={linkStyles}>
                  Contact
                </Link>
              </div>
            </div>

            {/* GIVE BUTTON (Desktop) */}
            <div className="hidden items-center md:flex">
              <button
                onClick={handleDonateClick}
                className="group flex h-10 transform cursor-pointer items-center gap-2 rounded-lg border-none bg-[#303552] px-3 py-2 text-sm font-semibold text-white uppercase transition-all duration-300 hover:-translate-y-2"
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="h-4 w-4 fill-[#ececec] transition-colors duration-300 group-hover:fill-red-600"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>GIVE</span>
                </span>
              </button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center rounded-md border-none bg-transparent p-2 text-[#303552] transition-all duration-300 hover:scale-105 hover:bg-[#a5876d]/15 hover:text-[#a5876d]"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div
          className={`fixed right-0 left-0 z-40 bg-[#F5F4F2]/90 p-4 backdrop-blur-lg transition-all duration-300 md:hidden ${isMobileMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-5 opacity-0"}`}
          style={{ top: getNavbarTop() === "0" ? "5rem" : "8.5rem" }}
        >
          <Link
            href="/"
            className="relative mb-2 block w-full overflow-hidden rounded-lg border-none bg-transparent px-4 py-3 text-left font-semibold text-[#303552] uppercase no-underline transition-all duration-300 hover:text-[#a5876d]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* About Dropdown */}
          <div>
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "mobile-about" ? null : "mobile-about")
              }
              className="relative mb-2 flex w-full items-center justify-between overflow-hidden rounded-lg border-none bg-transparent px-4 py-3 text-left font-semibold text-[#303552] uppercase no-underline transition-all duration-300 hover:text-[#a5876d]"
            >
              About
              <svg
                className="h-4 w-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  transform: activeDropdown === "mobile-about" ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "mobile-about" && (
              <div className="mt-2 ml-4 border-l-2 border-[#a5876d]/30 pl-4">
                <Link
                  href="/about/our-story"
                  className="mb-1 block w-full rounded-md border-none bg-transparent px-4 py-3 text-left text-sm font-medium text-[#303552] uppercase no-underline transition-all duration-300 hover:translate-x-1 hover:bg-[#a5876d] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Story
                </Link>
                <Link
                  href="/about/what-we-believe"
                  className="mb-1 block w-full rounded-md border-none bg-transparent px-4 py-3 text-left text-sm font-medium text-[#303552] uppercase no-underline transition-all duration-300 hover:translate-x-1 hover:bg-[#a5876d] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  What We Believe
                </Link>
                <Link
                  href="/about/our-staff"
                  className="mb-1 block w-full rounded-md border-none bg-transparent px-4 py-3 text-left text-sm font-medium text-[#303552] uppercase no-underline transition-all duration-300 hover:translate-x-1 hover:bg-[#a5876d] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Staff
                </Link>
              </div>
            )}
          </div>

          {/* Ministries Dropdown */}
          <div>
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "mobile-ministries" ? null : "mobile-ministries"
                )
              }
              className="relative mb-2 flex w-full items-center justify-between overflow-hidden rounded-lg border-none bg-transparent px-4 py-3 text-left font-semibold text-[#303552] uppercase no-underline transition-all duration-300 hover:text-[#a5876d]"
            >
              Ministries
              <svg
                className="h-4 w-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  transform:
                    activeDropdown === "mobile-ministries" ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "mobile-ministries" && (
              <div className="mt-2 ml-4 border-l-2 border-[#a5876d]/30 pl-4">
                <Link
                  href="/kids"
                  className="mb-1 block w-full rounded-md border-none bg-transparent px-4 py-3 text-left text-sm font-medium text-[#303552] uppercase no-underline transition-all duration-300 hover:translate-x-1 hover:bg-[#a5876d] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Zoe Kids
                </Link>
                <Link
                  href="/youth"
                  className="mb-1 block w-full rounded-md border-none bg-transparent px-4 py-3 text-left text-sm font-medium text-[#303552] uppercase no-underline transition-all duration-300 hover:translate-x-1 hover:bg-[#a5876d] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Youth
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/events"
            className="relative mb-2 block w-full overflow-hidden rounded-lg border-none bg-transparent px-4 py-3 text-left font-semibold text-[#303552] uppercase no-underline transition-all duration-300 hover:text-[#a5876d]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </Link>

          <Link
            href="/sermons"
            className="relative mb-2 block w-full overflow-hidden rounded-lg border-none bg-transparent px-4 py-3 text-left font-semibold text-[#303552] uppercase no-underline transition-all duration-300 hover:text-[#a5876d]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sermons
          </Link>

          <Link
            href="/contact"
            className="relative mb-2 block w-full overflow-hidden rounded-lg border-none bg-transparent px-4 py-3 text-left font-semibold text-[#303552] uppercase no-underline transition-all duration-300 hover:text-[#a5876d]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>

          {/* Donate Button - Same as Desktop */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleDonateClick();
            }}
            className="group mt-4 flex h-10 w-full transform cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-[#303552] px-3 py-2 text-sm font-semibold text-white uppercase transition-all duration-300 hover:-translate-y-1"
          >
            <span className="flex items-center justify-center space-x-2">
              <svg
                className="h-4 w-4 fill-[#ececec] transition-colors duration-300 group-hover:fill-red-600"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GIVE</span>
            </span>
          </button>
        </div>
      )}

      {/* Spacer - fixed height to prevent content jump */}
      <div
        className="transition-all duration-150 ease-in-out"
        style={{ height: isTopBarVisible && !isMobileMenuOpen ? "8.5rem" : "5rem" }}
      ></div>
    </>
  );
}
