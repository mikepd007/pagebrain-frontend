import Image from "next/image";
import { screenshots } from "./assets";
import { featureHighlights } from "./content";

const featureScreenshots = [
  screenshots.groupedMap,
  screenshots.markdownDetail,
  screenshots.linksDetail,
];

export function FeatureSections() {
  return (
    <section className="bg-[hsl(var(--pb-background-subtle))] py-24" id="workflow">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 font-mono text-[11px] uppercase text-[hsl(var(--pb-foreground-subtle))]">
            Feature system
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-[hsl(var(--pb-foreground))] sm:text-5xl">
            The browser becomes a working surface.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[8px] border border-[hsl(var(--pb-border)/0.46)] bg-[hsl(var(--pb-border)/0.46)] shadow-[0_18px_54px_-40px_rgba(0,0,0,0.9)] lg:grid-cols-3">
          {featureHighlights.map((feature, index) => (
            <article
              className="group min-h-[410px] bg-[hsl(var(--pb-card)/0.76)] p-4 transition-colors duration-200 hover:bg-[hsl(var(--pb-elevated-surface)/0.88)]"
              key={feature.title}
            >
              <div className="relative mb-6 aspect-[1.35] overflow-hidden rounded-[8px] border border-[hsl(var(--pb-border)/0.5)] bg-[hsl(var(--pb-background-subtle))]">
                <Image
                  src={featureScreenshots[index]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-top opacity-72 transition duration-500 group-hover:opacity-94"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--pb-card)/0.8)]" />
              </div>
              <div className="mb-5 flex items-center justify-between px-2">
                <span className="font-mono text-[11px] uppercase text-[hsl(var(--pb-foreground-subtle))]">
                  {feature.eyebrow}
                </span>
                <span className="rounded-md border border-[hsl(var(--pb-border)/0.45)] bg-[hsl(var(--pb-muted)/0.18)] px-1.5 py-0.5 font-mono text-[10.5px] text-[hsl(var(--pb-primary))]">
                  0{index + 1}
                </span>
              </div>
              <div className="px-2 pb-2">
                <h3 className="max-w-sm text-2xl font-semibold leading-tight text-[hsl(var(--pb-foreground))]">
                  {feature.title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[hsl(var(--pb-muted-foreground))]">
                  {feature.body}
                </p>
                <div className="mt-10 h-px w-12 bg-[hsl(var(--pb-border-hover))] transition-all duration-300 group-hover:w-24 group-hover:bg-[hsl(var(--pb-primary)/0.9)]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
