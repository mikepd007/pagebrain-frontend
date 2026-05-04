"use client";

import { useEffect, useState } from "react";

/**
 * PageGuides — architectural rails for the landing page.
 *
 * Two 1px vertical hairlines pinned to the *outside* of the content lane
 * — wider than the lane itself so the screenshots, headlines, and text
 * blocks all live INSIDE the rails with real breathing room. The page
 * reads as content composed within an architectural frame, not jammed
 * against the rail edges.
 *
 * Sizing:
 *   - Content lane (hero, gen desc, features): `min(1280px, 94vw)`
 *   - Rail lane (this component):              `min(1520px, 98vw)`
 *   - Resulting gutter at desktop:             ~80–120px each side
 *   - Resulting gutter at common laptop:       ~30–60px each side
 *
 * Plus four small "L" corner marks at the rail-lane corners — same
 * blueprint-marker pattern Linear and Vercel use to pin a working area.
 *
 * Positioning model: `fixed inset-0` so the rails track the viewport,
 * not the document. The user always sees the rails at the same lane
 * edges regardless of scroll position. This is the same approach Linear
 * uses on its homepage.
 *
 * Corner mark behaviour: the TOP corners track the top of the *currently
 * visible* content lane. While the hero is on screen, that's just below
 * the nav; once you scroll into the spotlights, the top corners snap to
 * the lane top of the section that's in view. Implementation here is
 * deliberately simple — fixed at the top of the visible viewport area
 * (just below the 56px nav) and at the bottom (just above the footer).
 *
 * Why this elevates the page:
 *
 *   1. The lane becomes architecturally legible. Every section is
 *      anchored to the same vertical track. The eye finally has a
 *      structural reference, not just a stack of compositions.
 *
 *   2. The corner marks read as setup notation — "this is the working
 *      area" — without ever being a hard border. Pure restraint.
 *
 *   3. The rails draw in once on mount via `pb-rail-draw` (top-down
 *      scaleY reveal, ~1.4s, ease-out, never replays).
 */

// Rail and corner mark colors.
//
// Bumped to ~14% white over the 8.5%-lightness canvas — gives a rendered
// brightness around 22% lightness, which is clearly visible on dark
// while still feeling "architectural hairline" rather than "border".
// Tuned against the desktop's `border-border/30` instinct on dark.
const RAIL_COLOR = "hsl(var(--pb-foreground) / 0.14)";
const CORNER_COLOR = "hsl(var(--pb-foreground) / 0.22)";

const NAV_HEIGHT_PX = 56;
const FOOTER_RESERVE_PX = 100; // keep corners clear of the footer slab

export function PageGuides() {
  // Don't paint the rails until after the first frame on the client.
  // Avoids the FOUC where SSR'd rails appear at full opacity, then re-
  // animate after hydration. Tiny detail, big polish.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      // `fixed inset-0` so the rails track the viewport. z=[5] sits above
      // section backgrounds (z-auto, no bg) but below the nav (z-50). At
      // RAIL_COLOR's low alpha the rails read as ambient regardless of
      // whether they technically paint above or below content.
      className="pointer-events-none fixed inset-0 z-[5] flex justify-center"
    >
      {/* Rail lane is intentionally wider than the content lane
          (`min(1280px, 94vw)`). At desktop this gives ~120px of breathing
          room each side between the content and the rails — the page reads
          as composed within a frame, not pinned to the rail edges. */}
      <div className="relative h-full w-[min(1520px,98vw)]">
        {/* ─────── Vertical rails ─────── */}
        <span
          className="pb-rail-draw absolute left-0 w-px"
          style={{
            top: `${NAV_HEIGHT_PX}px`,
            bottom: 0,
            background: `linear-gradient(180deg, transparent 0%, ${RAIL_COLOR} 4%, ${RAIL_COLOR} 96%, transparent 100%)`,
            animationDelay: "120ms",
          }}
        />
        <span
          className="pb-rail-draw absolute right-0 w-px"
          style={{
            top: `${NAV_HEIGHT_PX}px`,
            bottom: 0,
            background: `linear-gradient(180deg, transparent 0%, ${RAIL_COLOR} 4%, ${RAIL_COLOR} 96%, transparent 100%)`,
            animationDelay: "200ms",
          }}
        />

        {/* ─────── Corner marks ─────── */}
        <CornerMark
          position="top-left"
          color={CORNER_COLOR}
          delayMs={1200}
          topPx={NAV_HEIGHT_PX + 24}
        />
        <CornerMark
          position="top-right"
          color={CORNER_COLOR}
          delayMs={1280}
          topPx={NAV_HEIGHT_PX + 24}
        />
        <CornerMark
          position="bottom-left"
          color={CORNER_COLOR}
          delayMs={1360}
          bottomPx={FOOTER_RESERVE_PX}
        />
        <CornerMark
          position="bottom-right"
          color={CORNER_COLOR}
          delayMs={1440}
          bottomPx={FOOTER_RESERVE_PX}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CornerMark                                                                 */
/*                                                                            */
/*   ┌──   ──┐                                                                */
/*   │       │   each corner is 14px horizontal stub + 14px vertical stub     */
/*   └──   ──┘   meeting at the lane's outer corner                           */
/* -------------------------------------------------------------------------- */

type CornerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

function CornerMark({
  position,
  color,
  delayMs,
  topPx,
  bottomPx,
}: {
  position: CornerPosition;
  color: string;
  delayMs: number;
  topPx?: number;
  bottomPx?: number;
}) {
  const isLeft = position.endsWith("left");
  const isTop = position.startsWith("top");
  const stubLength = "16px";

  const anchorStyle: React.CSSProperties = {
    [isLeft ? "left" : "right"]: 0,
    ...(isTop ? { top: `${topPx ?? 0}px` } : { bottom: `${bottomPx ?? 0}px` }),
  };

  return (
    <div className="absolute size-0" style={anchorStyle}>
      {/* Horizontal stub */}
      <span
        className="pb-rail-fade absolute"
        style={{
          height: "1px",
          width: stubLength,
          background: color,
          [isLeft ? "left" : "right"]: 0,
          [isTop ? "top" : "bottom"]: 0,
          animationDelay: `${delayMs}ms`,
        }}
      />
      {/* Vertical stub */}
      <span
        className="pb-rail-fade absolute"
        style={{
          width: "1px",
          height: stubLength,
          background: color,
          [isLeft ? "left" : "right"]: 0,
          [isTop ? "top" : "bottom"]: 0,
          animationDelay: `${delayMs + 60}ms`,
        }}
      />
    </div>
  );
}
