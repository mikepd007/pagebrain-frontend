"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";

/**
 * GeneratedDescription — "in one paragraph", desktop-calm.
 *
 * Strips back to what the desktop StartScreen does: a single quiet
 * paragraph centered on the canvas, no horizontal rules, no monogram
 * kicker, no glowing end-mark. The only animated chrome is the word-by-
 * word blur clear that signals "an LLM wrote this" — a direct echo of
 * the streamdown rendering used by the AgentChat in product.
 *
 * Why so plain on purpose:
 *   - The desktop app builds trust through restraint. No marketing chrome
 *     ever appears in the workspace; every pixel does product work.
 *   - This bridge between hero and features is "the product talking to
 *     you" — it should feel like a sentence the agent itself wrote, not
 *     a campaign poster. Instrument-like, not eventful.
 *   - Removing the mono kicker + accent dot means the only color in the
 *     whole block is the foreground type — which is exactly how the
 *     desktop's empty-state copy reads.
 */

const PARAGRAPH =
  "PageBrain is the semantic scraping tool for SEOs in the era of AI — built for AIO, AI Overviews, and the new shape of search. It renders modern sites, maps meaning across every page, and turns crawl evidence into audits, strategy, and a clear path forward. The tool that makes you an expert in AI SEO.";

// Per-word stagger and animation duration (kept in sync with `pb-gen-word`
// keyframe in globals.css).
const WORD_DELAY_MS = 70;
const BASE_DELAY_MS = 120;

export function GeneratedDescription() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [generating, setGenerating] = useState(false);

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
      className="relative"
      aria-label="What PageBrain does"
    >
      <div
        ref={sectionRef}
        data-pb-generating={generating ? "true" : "false"}
        className="mx-auto flex w-full max-w-[820px] flex-col items-center px-6 py-12 text-center sm:py-16 lg:py-20"
      >
        {/*
         * Type sized to read as quiet editorial body, not a headline.
         * `text-foreground/85` matches the desktop's typical prose color
         * (assistant message body, panel copy). `text-balance` keeps the
         * line endings natural rather than ragged.
         */}
        <p className="text-balance font-sans text-[16px] font-normal leading-[1.6] text-[hsl(var(--pb-foreground)/0.85)] sm:text-[18px] sm:leading-[1.6] lg:text-[20px] lg:leading-[1.55]">
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
