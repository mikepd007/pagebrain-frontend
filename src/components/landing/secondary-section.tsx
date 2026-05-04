import { evidencePillars } from "./content";

/**
 * Editorial three-pillar section that sits directly under the hero.
 *
 * Brief intentional design notes:
 *  - No cards. Each pillar is just text + a 1px top hairline. The hairline
 *    is what gives the trio rhythm without making them feel like containers.
 *  - The accent azure shows up in two restrained spots: the section eyebrow
 *    and the mono index ("01" / "02" / "03"). Everywhere else the type rides
 *    the foreground / storm tokens for that calm Linear feel.
 *  - Generous vertical padding (py-32 sm:py-40) gives the hero image room to
 *    breathe before the eye lands here. The section sits on the canvas color
 *    so it composes seamlessly with the hero's bottom-fade.
 *  - The intro stack uses asymmetric two-column flow on lg+ (eyebrow/heading
 *    left, description right) — a small editorial flourish that keeps the
 *    section from feeling top-heavy.
 */
export function SecondarySection() {
  return (
    <section className="relative bg-[hsl(var(--pb-canvas))]">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-32 sm:py-40 lg:px-8">
        <SectionIntro />
        <PillarGrid />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Intro — eyebrow + heading on the left, supporting line on the right.       */
/* -------------------------------------------------------------------------- */

function SectionIntro() {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:items-end">
      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[hsl(var(--pb-accent-strong))]">
          {evidencePillars.eyebrow}
        </p>
        <h2 className="mt-4 max-w-[16ch] font-sans text-[32px] font-medium leading-[1.08] tracking-[-0.022em] text-[hsl(var(--pb-foreground-strong))] sm:text-[40px] lg:text-[44px]">
          {evidencePillars.heading}
        </h2>
      </div>

      <p className="max-w-[52ch] text-[15.5px] leading-[1.6] text-[hsl(var(--pb-storm))] lg:pb-1.5">
        Most tools stop at one of these layers. PageBrain keeps all three in
        the same workspace so context flows from raw HTML to the strategy
        document without ever breaking.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pillar grid — three text blocks, each prefaced with a thin hairline and a  */
/* mono index. No backgrounds, no borders, no rounded containers.             */
/* -------------------------------------------------------------------------- */

function PillarGrid() {
  return (
    <ol
      role="list"
      className="mt-20 grid grid-cols-1 gap-y-12 sm:mt-24 sm:grid-cols-3 sm:gap-x-10 lg:mt-28 lg:gap-x-16"
    >
      {evidencePillars.pillars.map((pillar) => (
        <li key={pillar.index} className="relative">
          {/* The only piece of chrome: a 1px hairline that subtly fades from
              the accent color to the storm token. Gives the trio editorial
              rhythm without reading as a "card top". */}
          <div
            aria-hidden="true"
            className="h-px w-full bg-[linear-gradient(90deg,hsl(var(--pb-accent)/0.55),hsl(var(--pb-border-strong))_60%,transparent)]"
          />

          {/* Mono index + label sit on the same baseline — index in accent,
              label in porcelain, separated by a thin slash for tactile feel. */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-[hsl(var(--pb-accent-strong))]">
              {pillar.index}
            </span>
            <span aria-hidden="true" className="text-[hsl(var(--pb-fog))]">
              /
            </span>
            <h3 className="text-[15px] font-medium tracking-[-0.005em] text-[hsl(var(--pb-foreground-strong))]">
              {pillar.label}
            </h3>
          </div>

          <p className="mt-3 max-w-[34ch] text-[14.5px] leading-[1.62] text-[hsl(var(--pb-storm))]">
            {pillar.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
