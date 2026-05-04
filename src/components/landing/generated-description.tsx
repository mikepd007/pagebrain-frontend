"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";

/**
 * GeneratedDescription
 *
 * A single clean paragraph that explains the product, streamed in token by
 * token like an LLM is generating it (Aceternity "text generate effect"
 * feel — opacity 0 → 1 with an 8px blur clearing to 0, ~70ms stagger).
 *
 * Design notes:
 *  - One paragraph. No paragraph breaks, no manual line breaks. The text
 *    wraps naturally inside a constrained max-width (~640px) so it reads
 *    as a tight calm explainer, not a manifesto.
 *  - Smaller type than display copy. This sits between the loud hero and
 *    the feature spotlights and shouldn't compete with either — it's a
 *    quiet confident sentence, not a headline.
 *  - No trailing cursor. Stream finishes and the paragraph just sits there.
 *  - IntersectionObserver gates the animation so it only fires the first
 *    time the section enters view, never during a fast scroll-past.
 */

// One clean paragraph. Three sentences joined with ordinary punctuation —
// no paragraph breaks, no <br>s. This is the entire content.
const PARAGRAPH =
  "PageBrain is the semantic scraping tool for SEOs in the era of AI — built for AIO, AI Overviews, and the new shape of search. It renders modern sites, maps meaning across every page, and turns crawl evidence into audits, strategy, and a clear path forward. The tool that makes you an expert in AI SEO.";

// Per-word stagger and animation duration (kept in sync with `pb-gen-word`
// keyframe in globals.css).
const WORD_DELAY_MS = 70;
const BASE_DELAY_MS = 120;

export function GeneratedDescription() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [generating, setGenerating] = useState(false);

  // Pre-compute per-word delays once. Plain split/map — there is only one
  // paragraph so no nested traversal is needed.
  const words = useMemo(
    () =>
      PARAGRAPH.split(/\s+/).map((word, i) => ({
        word,
        delay: BASE_DELAY_MS + i * WORD_DELAY_MS,
      })),
    [],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setGenerating(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative bg-[hsl(var(--pb-canvas))]"
      aria-label="What PageBrain does"
    >
      <div
        ref={sectionRef}
        data-pb-generating={generating ? "true" : "false"}
        className="mx-auto flex w-full max-w-[820px] flex-col items-center px-6 py-12 text-center sm:py-16 lg:py-20"
      >
        <p className="text-balance font-sans text-[17px] font-medium leading-[1.55] tracking-[-0.012em] text-[hsl(var(--pb-foreground)/0.92)] sm:text-[19px] sm:leading-[1.55] lg:text-[21px] lg:leading-[1.55]">
          {words.map(({ word, delay }, wIdx) => {
            const isLast = wIdx === words.length - 1;
            return (
              <Fragment key={wIdx}>
                <span
                  className="pb-gen-word"
                  style={{ ["--pb-word-delay" as string]: `${delay}ms` }}
                >
                  {word}
                </span>
                {isLast ? "" : " "}
              </Fragment>
            );
          })}
        </p>
      </div>
    </section>
  );
}
