import Image from "next/image";
import { screenshots } from "./assets";

const sources = ["Linear roadmap", "Client portal", "Research memo", "Support logs"];
const insights = [
  { label: "Confidence", value: "94%" },
  { label: "Sources", value: "28" },
  { label: "Drafts", value: "07" },
];

export function HeroProductBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-x-[-8vw] top-[450px] z-0 h-[540px] overflow-hidden sm:top-[480px] lg:top-[468px]">
      <div className="absolute inset-x-0 top-0 mx-auto h-[440px] max-w-[1420px] origin-top rotate-[-1.6deg] scale-[1.02] px-6 [perspective:1700px]">
        <div className="relative h-full overflow-hidden rounded-[8px] border border-[hsl(var(--pb-border)/0.72)] bg-[hsl(var(--pb-background-subtle))] shadow-[0_30px_90px_rgba(0,0,0,0.62)] [transform:rotateX(15deg)_rotateZ(-0.2deg)]">
          <Image
            src={screenshots.tableAgent}
            alt=""
            fill
            priority
            sizes="1600px"
            className="object-cover object-top opacity-88 saturate-[0.95]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_21%,transparent_0%,rgba(8,9,10,0.08)_54%,rgba(8,9,10,0.78)_100%)]" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-[hsl(var(--pb-background-subtle)/0.82)] to-[hsl(var(--pb-background-subtle))]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[hsl(var(--pb-background-subtle))] via-[hsl(var(--pb-background-subtle)/0.56)] to-transparent" />
    </div>
  );
}

type ScreenshotFrameProps = {
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  src: string;
};

export function ScreenshotFrame({
  alt,
  className = "",
  imageClassName = "object-cover object-top",
  priority = false,
  src,
}: ScreenshotFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[8px] border border-[hsl(var(--pb-border)/0.64)] bg-[hsl(var(--pb-background))] shadow-[0_18px_54px_-34px_rgba(0,0,0,0.92)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={imageClassName}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(8,9,10,0.05)_48%,rgba(8,9,10,0.36)_100%)]" />
    </div>
  );
}

export function ProductVisual() {
  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[8px] border border-[hsl(var(--pb-border)/0.62)] bg-[hsl(var(--pb-background))] shadow-[0_18px_54px_-34px_rgba(0,0,0,0.92)]">
      <div className="flex h-11 items-center justify-between border-b border-[hsl(var(--pb-border)/0.35)] bg-[hsl(var(--pb-card)/0.72)] px-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[hsl(var(--pb-muted))]" />
          <span className="size-2.5 rounded-full bg-[hsl(var(--pb-muted))]" />
          <span className="size-2.5 rounded-full bg-[hsl(var(--pb-primary))]" />
        </div>
        <span className="font-mono text-[11px] text-[hsl(var(--pb-foreground-subtle))]">workspace/pagebrain-alpha</span>
      </div>

      <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-[220px_1fr_260px]">
        <aside className="border-b border-[hsl(var(--pb-border)/0.32)] bg-[hsl(var(--pb-card)/0.7)] p-4 md:border-b-0 md:border-r">
          <div className="mb-5 text-[11px] font-medium uppercase text-[hsl(var(--pb-foreground-subtle))]">
            Sources
          </div>
          <div className="space-y-2">
            {sources.map((source, index) => (
              <div
                className="flex items-center justify-between rounded-md px-2 py-2 text-[12.5px] text-[hsl(var(--pb-foreground)/0.78)] transition-colors hover:bg-[hsl(var(--pb-muted)/0.2)]"
                key={source}
              >
                <span>{source}</span>
                <span className={index === 0 ? "text-[hsl(var(--pb-primary))]" : "text-[hsl(var(--pb-foreground-subtle))]"}>
                  0{index + 3}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <section className="relative overflow-hidden border-b border-[hsl(var(--pb-border)/0.32)] p-5 md:border-b-0 md:border-r">
          <div className="absolute inset-x-0 top-0 h-px bg-[hsl(var(--pb-primary))]/60" />
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase text-[hsl(var(--pb-foreground-subtle))]">Active brief</p>
              <h3 className="mt-1 text-xl font-semibold text-[hsl(var(--pb-foreground))]">
                Launch narrative map
              </h3>
            </div>
            <div className="rounded-md border border-[hsl(var(--pb-primary)/0.22)] bg-[hsl(var(--pb-primary)/0.08)] px-2 py-1 font-mono text-[11px] text-[hsl(var(--pb-primary))]">
              synced
            </div>
          </div>

          <div className="space-y-3">
            {["Market signal", "Audience tension", "Decision criteria"].map(
              (item, index) => (
                <div
                  className="rounded-[8px] border border-[hsl(var(--pb-border)/0.42)] bg-[hsl(var(--pb-elevated-surface)/0.72)] p-4"
                  key={item}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[13px] font-medium text-[hsl(var(--pb-foreground))]">{item}</span>
                    <span className="font-mono text-[11px] text-[hsl(var(--pb-foreground-subtle))]">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block h-2 rounded-full bg-[hsl(var(--pb-border-hover))]" />
                    <span className="block h-2 w-4/5 rounded-full bg-[hsl(var(--pb-border))]" />
                    <span className="block h-2 w-2/3 rounded-full bg-[hsl(var(--pb-border))]" />
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        <aside className="bg-[hsl(var(--pb-card)/0.7)] p-4">
          <div className="mb-5 text-[11px] font-medium uppercase text-[hsl(var(--pb-foreground-subtle))]">
            Output
          </div>
          <div className="space-y-3">
            {insights.map((item) => (
              <div
                className="flex items-end justify-between border-b border-[hsl(var(--pb-border)/0.32)] pb-3"
                key={item.label}
              >
                <span className="text-[12.5px] text-[hsl(var(--pb-muted-foreground))]">{item.label}</span>
                <span className="font-mono text-2xl text-[hsl(var(--pb-foreground))]">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[8px] border border-[hsl(var(--pb-primary)/0.2)] bg-[hsl(var(--pb-primary)/0.055)] p-3">
            <p className="text-[13px] leading-6 text-[hsl(var(--pb-foreground)/0.78)]">
              Ready to convert into a launch brief with source citations.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
