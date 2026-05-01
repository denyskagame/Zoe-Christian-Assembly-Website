"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  showGradientLine?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  align = "center",
  size = "md",
  showGradientLine = true,
}: PageHeaderProps) {
  const { ref: headerRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0,
    delay: 0,
    once: true,
  });

  const sizeClasses = {
    sm: "pt-8 pb-4",
    md: "pt-12 pb-6",
    lg: "pt-16 pb-8",
  };

  const titleSizes = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl lg:text-4xl",
    lg: "text-3xl md:text-4xl lg:text-5xl",
  };

  return (
    <section
      ref={headerRef}
      className={`relative px-6 ${sizeClasses[size]} page-header overflow-hidden`}
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#a5876d]/5 blur-3xl transition-all duration-1000 ${
            isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
        <div
          className={`absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#303552]/5 blur-3xl transition-all delay-200 duration-1000 ${
            isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-7xl ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {/* Badge */}
        {badge && (
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full bg-[#a5876d]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#a5876d] uppercase transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a5876d]" />
            {badge}
          </div>
        )}

        {/* Title */}
        <h1
          className={`${titleSizes[size]} font-bold tracking-tight text-[#303552] transition-all delay-100 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {title}
        </h1>

        {/* Gradient Line */}
        {showGradientLine && (
          <div
            className={`mt-4 h-0.5 bg-gradient-to-r from-transparent via-[#a5876d] to-transparent transition-all delay-300 duration-1000 ${
              align === "center" ? "mx-auto" : ""
            } ${isVisible ? "w-16 opacity-100" : "w-0 opacity-0"}`}
          />
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`mt-4 max-w-2xl leading-relaxed text-gray-600 transition-all delay-400 duration-700 ${
              align === "center" ? "mx-auto" : ""
            } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
