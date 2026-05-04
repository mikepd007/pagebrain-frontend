"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigationItems } from "./content";
import { Logo } from "./logo";

/**
 * Linear-style top nav. Thin (56px), sticky, with a scroll-aware backdrop:
 *  - at rest: nearly transparent, only a hairline border
 *  - after scroll: opaque graphite, blurred, slightly stronger divider
 */
export function LandingNav() {
  const scrolled = useScrolled(8);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-[hsl(var(--pb-border)/0.7)] bg-[hsl(var(--pb-canvas)/0.78)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-[hsl(var(--pb-border)/0.0)] bg-[hsl(var(--pb-canvas)/0.0)]",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 lg:px-6">
        {/* Brand */}
        <Link
          href="/"
          aria-label="PageBrain home"
          className="group inline-flex items-center transition-opacity duration-200 hover:opacity-90"
        >
          <Logo />
        </Link>

        {/* Center cluster — ghost links, no background, generous click area, tight spacing */}
        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[hsl(var(--pb-storm))] transition-colors duration-150 hover:text-[hsl(var(--pb-foreground))]"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right cluster — sign-in (ghost) + primary CTA */}
        <div className="flex items-center gap-2">
          <a
            href="#signin"
            className="hidden h-8 items-center rounded-md px-3 text-[13px] font-medium text-[hsl(var(--pb-storm))] transition-colors duration-150 hover:text-[hsl(var(--pb-foreground))] sm:inline-flex"
          >
            Sign in
          </a>
          <a
            href="#waitlist"
            className="inline-flex h-8 items-center gap-1.5 rounded-[10px] bg-[hsl(var(--pb-foreground-strong))] px-3.5 text-[13px] font-semibold text-[hsl(var(--pb-canvas))] shadow-[0_0_0_1px_hsl(var(--pb-foreground)/0.06),0_8px_22px_-14px_hsl(var(--pb-foreground)/0.5)] transition duration-150 hover:bg-[hsl(var(--pb-foreground)/0.92)]"
          >
            Join waitlist
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className="size-2.5 -mr-0.5 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h6M6.5 3.5L9 6l-2.5 2.5" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

/** Lightweight scroll-state hook — returns true once the window has scrolled past `threshold`. */
function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
