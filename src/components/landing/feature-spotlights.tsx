import Image from "next/image";
import { screenshots } from "./assets";

/**
 * FeatureSpotlights — desktop-calm version.
 *
 * Mirrors the patterns the desktop app actually uses (CrawlTable header,
 * AgentChat panel, StartScreen empty states):
 *
 *   - No section opener. Section identity comes from the rows themselves.
 *   - Each row is a four-element stack: small muted category label
 *     → headline → subcopy → "Learn more" link. No spec lists, no
 *     numbered chapter markers, no decorative dividers — the desktop
 *     would never spend a pixel on those, and neither do we here.
 *   - "Learn more" link is sober (no underline sweep, no accent hover —
 *     it just shifts to foreground-strong like the desktop's link buttons).
 *   - Rows separate via pure whitespace — no hairline divider, no glowing
 *     dot ornament. Air alone carries the transition.
 *
 * The screenshot frame stays lit (it's still product photography), but
 * the bloom is half-strength of the hero so the section reads as
 * "section of the page" rather than "another hero".
 */

type SpotlightAlign = "image-left" | "image-right";

type Spotlight = {
  category: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  align: SpotlightAlign;
  href: string;
};

const spotlights: Spotlight[] = [
  {
    category: "Render",
    title: "Every page rendered like Chrome.",
    body: "Full JavaScript execution, real DOM, clean markdown extraction. The crawl captures what's actually on the page.",
    image: screenshots.markdownDetail,
    alt: "PageBrain table view with the Markdown panel open, showing extracted content from a rendered cursor.com blog post.",
    align: "image-right",
    href: "#render",
  },
  {
    category: "Semantic graph",
    title: "Your site as a graph of meaning.",
    body: "Embeddings cluster related pages, surface orphans, and expose internal-link gaps. See your site the way an LLM does.",
    image: screenshots.semanticMap,
    alt: "PageBrain Map view showing semantic clusters of cursor.com blog pages, with a Cursor AI coding cluster selected and its pages listed by core fit.",
    align: "image-left",
    href: "#semantic-graph",
  },
  {
    category: "Agents",
    title: "Agents that work the crawl directly.",
    body: "Agents pull live evidence from your crawl, compare groups, and draft strategy documents in your voice.",
    image: screenshots.agentBrief,
    alt: "PageBrain Crawl Agent generating an SEO Strategy document for cursor.com from live crawl evidence.",
    align: "image-right",
    href: "#agents",
  },
];

/* -------------------------------------------------------------------------- */
/* Top-level section                                                          */
/* -------------------------------------------------------------------------- */

export function FeatureSpotlights() {
  return (
    <section
      id="features"
      className="relative bg-[hsl(var(--pb-canvas))] pb-24 sm:pb-32 lg:pb-40"
    >
      {/* Same lane as the hero (`w-[min(1280px,94vw)]`) so the entire page
          sits in a single rail — desktop's StartScreen does the same: one
          centered column, no varying widths. */}
      <div className="mx-auto w-[min(1280px,94vw)] pt-2 sm:pt-4 lg:pt-6">
        {spotlights.map((spotlight, i) => (
          <SpotlightRow
            key={spotlight.category}
            spotlight={spotlight}
            isFirst={i === 0}
          />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SpotlightRow                                                                */
/* -------------------------------------------------------------------------- */

function SpotlightRow({
  spotlight,
  isFirst,
}: {
  spotlight: Spotlight;
  isFirst: boolean;
}) {
  const imageOnLeft = spotlight.align === "image-left";

  // Asymmetric grid: image side is 1.5fr (≈60%), text side is 1fr (≈40%).
  // Flip the column order based on alignment so the image is always in the
  // wider track; combined with `lg:order-*` on the text we get a clean swap.
  const gridCols = imageOnLeft
    ? "lg:grid-cols-[1.5fr_1fr]"
    : "lg:grid-cols-[1fr_1.5fr]";

  return (
    <div
      className={[
        // Row separation — pure whitespace, no hairline. The desktop's
        // panels use borders to separate, but feature rows on a long
        // marketing page read calmer with breathing room alone.
        !isFirst ? "pt-24 sm:pt-32 lg:pt-40" : "",
        "grid grid-cols-1 items-center gap-10 sm:gap-12",
        gridCols,
        "lg:gap-16",
        // First row keeps the calm small top pad that mirrors hero→genText.
        isFirst ? "pt-2 sm:pt-4 lg:pt-6" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* TEXT — DOM-first so mobile reads category → headline → body
          → link → image. */}
      <div
        className={[
          "max-w-[44ch]",
          imageOnLeft ? "lg:order-2" : "",
          imageOnLeft ? "lg:pl-2" : "lg:pr-2",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/*
         * Category label — direct port of the desktop AgentView header
         * pattern: `text-[12px] font-medium text-foreground/75`. No mono
         * caps, no hairlines, no chapter index. The category alone is
         * enough to anchor the row; anything more is decoration.
         */}
        <div className="text-[12px] font-medium text-[hsl(var(--pb-foreground)/0.55)]">
          {spotlight.category}
        </div>

        <h3 className="mt-3 font-sans text-[26px] font-medium leading-[1.12] tracking-[-0.018em] text-[hsl(var(--pb-foreground-strong))] sm:text-[30px] lg:text-[34px]">
          {spotlight.title}
        </h3>

        <p className="mt-4 text-[14.5px] leading-[1.6] text-[hsl(var(--pb-foreground)/0.7)] sm:text-[15px] lg:text-[15.5px]">
          {spotlight.body}
        </p>

        <LearnMoreLink href={spotlight.href} />
      </div>

      {/* IMAGE — sits in the wider column at lg+. Quiet lit treatment. */}
      <div className={imageOnLeft ? "lg:order-1" : ""}>
        <SpotlightImage src={spotlight.image} alt={spotlight.alt} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LearnMoreLink                                                              */
/*                                                                            */
/*   Desktop "link" button pattern: `text-foreground hover:text-foreground/75`*/
/*   No underline sweep, no accent hover. The arrow translates 2px right on   */
/*   hover — the only motion. Calm, instrument-like.                          */
/* -------------------------------------------------------------------------- */

function LearnMoreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="group mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-[hsl(var(--pb-foreground)/0.85)] transition-colors duration-150 hover:text-[hsl(var(--pb-foreground-strong))] sm:mt-9"
    >
      <span>Learn more</span>
      <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
    </a>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8h9M9 4.5l3.5 3.5L9 11.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* SpotlightImage — quieter cousin of the hero's ProductShowcase frame.       */
/*                                                                            */
/* Same composite shadow stack as the hero — top inset highlight, bottom      */
/* inset shadow, hairline border, soft drop shadow — at half intensity. The   */
/* frame's aspect ratio matches the screenshots' native 2880×1698, with       */
/* `object-contain` so the image is shown whole.                              */
/* -------------------------------------------------------------------------- */

function SpotlightImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      {/* Quiet ambient bloom behind the frame — half the hero's intensity. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 -m-12 rounded-[60px] sm:-m-16 lg:-m-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, hsl(var(--pb-accent-glow) / 0.14), transparent 70%), radial-gradient(ellipse 90% 80% at 50% 50%, hsl(220 60% 35% / 0.12), transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* Lit upper-edge hairline — quieter than the hero's. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-12 -top-px z-10 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--pb-accent-strong)/0.55)_50%,transparent)]"
      />

      <div
        className="relative aspect-[2880/1698] w-full overflow-hidden rounded-[14px] bg-[hsl(var(--pb-elevated))]"
        style={{
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.05), inset 0 -1px 0 hsl(0 0% 0% / 0.4), 0 0 0 1px hsl(var(--pb-border-elevated)), 0 24px 60px -36px hsl(var(--pb-accent-glow) / 0.14), 0 50px 110px -45px rgba(0, 0, 0, 0.85)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 760px, 94vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
