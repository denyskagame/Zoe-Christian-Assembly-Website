"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, UserPlus, ChevronDown } from "lucide-react";

interface TopBarProps {
  forceHide?: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
}

export function TopBar({ forceHide = false, onVisibilityChange }: TopBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          // Hide TopBanner when scrolled past 20px
          const shouldBeVisible = scrollPosition <= 20;
          setIsVisible(shouldBeVisible);
          onVisibilityChange?.(shouldBeVisible);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onVisibilityChange]);

  // If forceHide is true (e.g. Mobile Menu is open), hide it regardless of scroll
  const finalVisibility = forceHide ? false : isVisible;

  // DROPDOWN STYLES
  const dropdownItemStyles =
    "block w-full text-left px-4 py-2.5 text-[#303552] text-sm font-semibold uppercase transition-colors hover:bg-[#a5876d] hover:text-[#ECECEC] border-b border-[#303552]/10 last:border-0";

  return (
    <>
      <div
        className={`fixed top-0 right-0 left-0 z-[60] text-[#303552] transition-all duration-150 ease-in-out ${
          finalVisibility ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d8d8d8] via-[#ececec] to-[#ececec] shadow-sm"></div>

        <div className="relative flex h-14 max-w-full items-center justify-between px-6 lg:px-12 xl:px-20">
          {/* Bottom Line */}
          <div
            className="absolute right-0 bottom-0 h-[2px] w-[55%]"
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
            <BookOpen className="h-4 w-4" />
            BIBLE
          </a>

          {/* Right: Connect & Language */}
          <div className="relative z-10 flex items-center gap-6">
            <Link
              href="/connect"
              className="flex cursor-pointer items-center gap-2 border-none bg-transparent text-sm font-semibold text-[#303552] transition-colors duration-300 hover:text-[#a5876d]"
            >
              <UserPlus className="h-4 w-4" />
              <span className="tracking-wider uppercase">BE A MEMBER</span>
            </Link>

            <div className="h-4 w-px bg-[#303552]/20"></div>

            {/* Language Switcher */}
            <div className="group relative flex h-full cursor-pointer items-center">
              <button className="flex items-center gap-1 text-sm font-semibold text-[#303552] uppercase transition-colors hover:text-[#a5876d]">
                EN
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-[50%] right-0 h-10 w-full bg-transparent"></div>
              <div className="invisible absolute top-[100%] right-0 -translate-y-2 pt-2 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex min-w-[120px] flex-col overflow-hidden rounded-md border border-white/20 bg-[#ECECEC] py-2 shadow-xl">
                  <button className={dropdownItemStyles}>English</button>
                  <button className={dropdownItemStyles}>Français</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer - transitions smoothly */}
      <div
        className={`transition-all duration-150 ease-in-out ${finalVisibility ? "h-14" : "h-0"}`}
      ></div>
    </>
  );
}
