import Image from "next/image";
import { screenshots } from "./assets";

/**
 * FeatureSpotlights
 *
 * Three calm alternating product reveals — a clean headline + minimal
 * subcopy + a quiet "Learn more" link on one side, a real product
 * screenshot lit with the same bezel/bloom treatment as the hero on the
 * other.
 *
 * Layout (desktop):
 *   Row 1   [ text 40% ][ image 60% ]
 *   Row 2   [ image 60% ][ text 40% ]
 *   Row 3   [ text 40% ][ image 60% ]
 *
 * The image side is intentionally wider than the text side (60/40) so the
 * product hero of each row is the screenshot, not the copy. The image-side
 * alternation gives the eye a Z-pattern sweep through the section.
 *
 * No eyebrows on the text side anymore — just headline + brief body + link.
 * The headline carries the meaning; the eyebrow was reading as boilerplate.
 */

type SpotlightAlign = "image-left" | "image-right";

type Spotlight = {
  title: string;
  body: string;
  image: string;
  alt: string;
  /** Where the image sits at lg+. */
  align: SpotlightAlign;
  /** href for the "Learn more" link — placeholders for now, fill in later. */
  href: string;
};

const spotlights: Spotlight[] = [
  {
    title: "Every page rendered like Chrome.",
    body: "Full JavaScript execution, real DOM, clean markdown extraction. The crawl captures what's actually on the page.",
    image: screenshots.markdownDetail,
    alt: "PageBrain table view with the Markdown panel open, showing extracted content from a rendered cursor.com blog post.",
    align: "image-right",
    href: "#render",
  },
  {
    title: "Your site as a graph of meaning.",
    body: "Embeddings cluster related pages, surface orphans, and expose internal-link gaps. See your site the way an LLM does.",
    image: screenshots.semanticMap,
    alt: "PageBrain Map view showing semantic clusters of cursor.com blog pages, with a Cursor AI coding cluster selected and its pages listed by core fit.",
    align: "image-left",
    href: "#semantic-graph",
  },
  {
    title: "Agents that work the crawl directly.",
    body: "Agents pull live evidence from your crawl, compare groups, and draft strategy documents in your voice.",
    image: screenshots.agentBrief,
    alt: "PageBrain Crawl Agent generating an SEO Strategy document for cursor.com from live crawl evidence.",
    align: "image-right",
    href: "#agents",
  },
];

export function FeatureSpotlights() {
  return (
    <section
      id="features"
      className="relative bg-[hsl(var(--pb-canvas))] pb-24 sm:pb-32 lg:pb-40"
    >
      {/* Match the hero's lane exactly — `w-[min(1280px,94vw)]` is the same
          width used by ProductShowcase and HeroHighlights, so this section
          aligns horizontally with everything above it. */}
      <div className="mx-auto w-[min(1280px,94vw)]">
        {spotlights.map((spotlight, i) => (
          <SpotlightRow key={spotlight.title} spotlight={spotlight} index={i} />
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
  index,
}: {
  spotlight: Spotlight;
  index: number;
}) {
  const imageOnLeft = spotlight.align === "image-left";

  // Asymmetric grid: image side is 1.5fr (≈60%), text side is 1fr (≈40%).
  // Flip the column order based on alignment so the image is always in the
  // wider track; combined with `lg:order-*` on the text we get clean swap.
  const gridCols = imageOnLeft
    ? "lg:grid-cols-[1.5fr_1fr]"
    : "lg:grid-cols-[1fr_1.5fr]";

  return (
    <div
      className={[
        "grid grid-cols-1 items-center gap-10 sm:gap-12",
        gridCols,
        "lg:gap-16",
        // Vertical rhythm between rows.
        // First row's top pad is small on purpose — it's added to the
        // GeneratedDescription's bottom padding (`py-12 sm:py-16 lg:py-20`)
        // to produce the same total gap as hero→generated-text (where
        // hero's `pb-2 sm:pb-4 lg:pb-6` is added to the same generated
        // top padding). Keeps the section transitions feeling identical.
        // Subsequent rows get the full breathing room.
        index === 0
          ? "pt-2 sm:pt-4 lg:pt-6"
          : "pt-24 sm:pt-32 lg:pt-40",
      ].join(" ")}
    >
      {/* Text — DOM-first so mobile reads headline → body → link → image. */}
      <div
        className={[
          "max-w-[44ch]",
          // When the image goes on the left at lg+, push the text into the
          // right slot via `order-2`; otherwise text stays in the left slot.
          imageOnLeft ? "lg:order-2" : "",
          // Slight inset so headlines don't kiss the screenshot edge.
          imageOnLeft ? "lg:pl-2" : "lg:pr-2",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <h3 className="font-sans text-[26px] font-medium leading-[1.08] tracking-[-0.022em] text-[hsl(var(--pb-foreground-strong))] sm:text-[32px] lg:text-[36px]">
          {spotlight.title}
        </h3>

        <p className="mt-5 text-[15.5px] leading-[1.62] text-[hsl(var(--pb-storm))] sm:text-[16px] lg:text-[16.5px]">
          {spotlight.body}
        </p>

        <LearnMoreLink href={spotlight.href} />
      </div>

      {/* Image — sits in the wider column at lg+. The lit treatment matches
          the hero product frame: composite shadow stack, accent top hairline,
          quiet ambient bloom — at about half the hero's intensity. */}
      <div className={imageOnLeft ? "lg:order-1" : ""}>
        <SpotlightImage src={spotlight.image} alt={spotlight.alt} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LearnMoreLink                                                              */
/*                                                                            */
/*   Quiet inline link with a thin underline that sweeps the full width on    */
/*   hover and an arrow that translates 2px right. Color shifts to azure on   */
/*   hover — the only place the accent shows up in this section other than   */
/*   the screenshot's lit edge.                                               */
/* -------------------------------------------------------------------------- */

function LearnMoreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="group mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[hsl(var(--pb-foreground)/0.92)] transition-colors duration-200 hover:text-[hsl(var(--pb-accent-strong))] sm:mt-9"
    >
      <span className="relative">
        Learn more
        {/* Underline that slides in on hover. The `origin-left` + `scale-x`
            trick avoids a janky width animation on mobile. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-0.5 block h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
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
      strokeWidth="1.6"
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
/* The frame's aspect-ratio matches the screenshots' native dimensions        */
/* (2880 × 1698 — the same ratio the hero uses), and `object-contain` keeps   */
/* the image whole. No cropping, no `object-top`, no zoom. Whatever you see   */
/* in the original PNG is exactly what shows here, just scaled to fit.        */
/* -------------------------------------------------------------------------- */

function SpotlightImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      {/* Quiet ambient bloom behind the frame — about half the intensity of
          the hero's bloom so each frame still feels lit without dominating. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 -m-12 rounded-[60px] sm:-m-16 lg:-m-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, hsl(var(--pb-accent-glow) / 0.18), transparent 70%), radial-gradient(ellipse 90% 80% at 50% 50%, hsl(220 60% 35% / 0.16), transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* Lit upper-edge hairline — same "top of the screen" cue as the hero
          frame, narrower because the spotlight frames are smaller. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-12 -top-px z-10 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--pb-accent-strong)/0.7)_50%,transparent)]"
      />

      <div
        className="relative aspect-[2880/1698] w-full overflow-hidden rounded-[16px] bg-[hsl(var(--pb-graphite))]"
        style={{
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.06), inset 0 -1px 0 hsl(0 0% 0% / 0.4), 0 0 0 1px hsl(var(--pb-border-strong)), 0 24px 60px -36px hsl(var(--pb-accent-glow) / 0.18), 0 50px 110px -45px rgba(0, 0, 0, 0.9)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 760px, 94vw"
          // `object-contain` instead of `object-cover` — the screenshot is
          // shown whole, never cropped. The frame matches the image's
          // 2880×1698 ratio so contain still fills the frame edge-to-edge.
          className="object-contain"
        />
      </div>
    </div>
  );
}
