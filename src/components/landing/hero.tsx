import Image from "next/image";
import { screenshots } from "./assets";
import { heroCopy } from "./content";

/**
 * PageBrain hero — full-bleed midnight poster with one dominant idea:
 *  1. Eyebrow changelog link
 *  2. Display headline (one composition, two lines)
 *  3. One-sentence subhead
 *  4. Pink primary CTA + ghost secondary
 *  5. Edge-to-edge product showcase anchoring the whole section
 *
 * Animation: text rises in a 4-step stagger; the product visual floats up
 * after the copy lands. All driven by CSS keyframes (no JS) so the hero
 * paints fast and respects prefers-reduced-motion.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[hsl(var(--pb-canvas))]">
      <BackgroundLayers />

      {/* Inner column — only the text/action stack is constrained. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-center px-6 pt-32 text-center sm:pt-36 lg:pt-40">
        <EyebrowLink />

        <h1
          data-pb-rise
          style={{ ["--pb-delay" as string]: "120ms" }}
          className="mt-7 max-w-[18ch] font-sans text-[44px] font-medium leading-[1.02] tracking-[-0.025em] text-[hsl(var(--pb-foreground-strong))] sm:text-[64px] lg:text-[80px]"
        >
          {heroCopy.headlinePrimary}
          <br />
          <span className="text-[hsl(var(--pb-foreground)/0.78)]">
            {heroCopy.headlineAccent}
          </span>
        </h1>

        {/* Horizon — a thin lit edge that sits naturally under the headline,
            flowing with whatever line height the responsive type produces.
            aria-hidden because it's purely a visual cue. */}
        <div
          aria-hidden="true"
          data-pb-rise
          style={{ ["--pb-delay" as string]: "200ms" }}
          className="pb-hero-horizon mt-5 h-[2px] w-[min(560px,72%)]"
        />

        <p
          data-pb-rise
          style={{ ["--pb-delay" as string]: "260ms" }}
          className="mt-5 max-w-[60ch] text-[17px] leading-[1.55] text-[hsl(var(--pb-storm))] sm:text-[18px]"
        >
          {heroCopy.subhead}
        </p>

        <div
          data-pb-rise
          style={{ ["--pb-delay" as string]: "380ms" }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <PrimaryCta href={heroCopy.primaryCta.href} icon={<AppleGlyph />}>
            {heroCopy.primaryCta.label}
          </PrimaryCta>
          <SecondaryCta
            href={heroCopy.secondaryCta.href}
            icon={<WindowsGlyph />}
          >
            {heroCopy.secondaryCta.label}
          </SecondaryCta>
        </div>
      </div>

      <ProductShowcase />
    </section>
  );
}

/* ----------------------------- Sub-components ----------------------------- */

/**
 * Three composed layers, ordered front-to-back behind the content:
 *  1. Halo  — atmospheric glow with a slow 14s breath
 *  2. Horizon — a single thin lit line that sits roughly at the
 *               vertical center of the headline, giving the eye a focal axis
 *  3. Grain  — barely-there SVG noise, kills gradient banding
 *
 * Plus a top-edge hairline divider just below the nav and a long bottom
 * fade so the section dissolves into the canvas without a hard seam.
 */
function BackgroundLayers() {
  return (
    <>
      {/* Hairline divider sitting just below the nav. */}
      <div className="absolute inset-x-0 top-14 z-0 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--pb-border-strong)/0.7)_50%,transparent)]" />

      {/* Layer 1 — atmospheric halo. Drives the mood of the upper viewport. */}
      <div className="pb-hero-halo pointer-events-none absolute inset-x-0 top-0 z-0 h-[860px]" />

      {/* Layer 3 — film grain. Sits above the gradients so it can break up
          their smoothness, but below content (z-0). */}
      <div className="pb-hero-grain pointer-events-none absolute inset-x-0 top-0 z-0 h-[860px]" />

      {/* Long bottom fade — dissolves the section cleanly into the next. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-72 bg-gradient-to-b from-transparent to-[hsl(var(--pb-canvas))]" />
    </>
  );
}

function EyebrowLink() {
  return (
    <a
      href="#changelog"
      data-pb-rise
      style={{ ["--pb-delay" as string]: "0ms" }}
      className="group inline-flex items-center gap-2 rounded-full border border-[hsl(var(--pb-border-strong)/0.9)] bg-[hsl(var(--pb-graphite)/0.75)] py-1 pl-1 pr-3 text-[12px] font-medium text-[hsl(var(--pb-light-steel))] shadow-[0_0_0_1px_hsl(var(--pb-foreground)/0.02)_inset] backdrop-blur-md transition-colors duration-150 hover:border-[hsl(var(--pb-border-hover))] hover:text-[hsl(var(--pb-foreground-strong))]"
    >
      <span className="inline-flex h-5 items-center rounded-full bg-[hsl(var(--pb-accent)/0.18)] px-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.04em] text-[hsl(var(--pb-accent-strong))]">
        {heroCopy.eyebrowTag}
      </span>
      <span>{heroCopy.eyebrow}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="size-3 -mr-0.5 text-[hsl(var(--pb-storm))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--pb-foreground-strong))]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h6M6.5 3.5L9 6l-2.5 2.5" />
      </svg>
    </a>
  );
}

/**
 * Primary CTA — porcelain on canvas, no accent fill. Reads as the dominant
 * action through pure contrast (white on near-black) rather than color.
 * The azure accent is reserved for smaller, more meaningful moments.
 *
 * `icon` renders to the LEFT of the label — used for the platform glyph
 * on download buttons. When omitted the button is icon-less.
 */
function PrimaryCta({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex h-10 items-center gap-2 rounded-[12px] bg-[hsl(var(--pb-foreground-strong))] px-4 text-[13px] font-semibold text-[hsl(var(--pb-canvas))] shadow-[0_0_0_1px_hsl(var(--pb-foreground)/0.06),0_14px_30px_-18px_hsl(var(--pb-foreground)/0.55)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[hsl(var(--pb-foreground)/0.92)] active:translate-y-px"
    >
      {icon}
      {children}
    </a>
  );
}

function SecondaryCta({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex h-10 items-center gap-2 rounded-[12px] border border-[hsl(var(--pb-border-strong))] bg-[hsl(var(--pb-graphite)/0.6)] px-4 text-[13px] font-medium text-[hsl(var(--pb-foreground))] transition-colors duration-150 hover:border-[hsl(var(--pb-border-hover))] hover:bg-[hsl(var(--pb-slate))] hover:text-[hsl(var(--pb-foreground-strong))]"
    >
      {icon}
      {children}
    </a>
  );
}

/* --- Platform glyphs --- */

function AppleGlyph({ className = "size-[14px]" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`-ml-0.5 -mt-0.5 ${className}`}
      fill="currentColor"
    >
      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
    </svg>
  );
}

function WindowsGlyph({ className = "size-[12.5px]" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
    >
      <path d="M0 1.91 6.554.97v6.464H0V1.91Zm0 12.18 6.554.945V8.563H0v5.527Zm7.265.05L16 16V8.563H7.265v5.578Zm0-13.27v6.534H16V0L7.265.871Z" />
    </svg>
  );
}

/**
 * The dominant visual anchor — full-width product still photographed at a
 * very slight tilt, framed with a faint accent line on top, and dissolving
 * into the next section via a long gradient.
 */
function ProductShowcase() {
  return (
    <div
      data-pb-float
      style={{ ["--pb-delay" as string]: "500ms" }}
      className="relative z-10 mt-12 sm:mt-14 lg:mt-16"
      id="product"
    >
      {/* Edge-to-edge frame container — no shared max-width. */}
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        {/* Accent hairline running across the top of the frame. */}
        <div className="absolute inset-x-12 -top-px h-px bg-[linear-gradient(90deg,transparent,hsl(var(--pb-accent)/0.55)_50%,transparent)]" />

        {/* The screenshot already includes the desktop app's own titlebar
            (traffic-light dots, date, page count). The frame's aspect ratio
            matches the source image (2880×1698) so nothing gets cropped. */}
        <div className="relative aspect-[2880/1698] w-full overflow-hidden rounded-2xl border border-[hsl(var(--pb-border-strong))] bg-[hsl(var(--pb-graphite))] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95),0_0_0_1px_hsl(var(--pb-foreground)/0.04)_inset]">
          <Image
            src={screenshots.tableAgent}
            alt="PageBrain workspace showing a crawl table for cursor.com alongside the Crawl Agent panel drafting an SEO strategy."
            fill
            priority
            sizes="(min-width: 1280px) 1280px, 94vw"
            className="object-contain"
          />
        </div>

        {/* Soft reflection that fades the bottom edge into the canvas. */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-2 h-32 bg-[linear-gradient(180deg,transparent,hsl(var(--pb-canvas)))]" />
      </div>
    </div>
  );
}
