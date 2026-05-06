"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-8 rounded-full bg-[#a5876d] p-3 text-[#ECECEC] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-[#303552] ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
