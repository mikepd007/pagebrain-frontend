import { screenshots } from "./assets";
import { ScreenshotFrame } from "./product-visual";

/**
 * CtaSection — the closing chapter of the page.
 *
 * Outer section is transparent so the page rails (`<PageGuides />`) run
 * through and below this section into the footer transition. The CTA
 * itself sits in a `--pb-card` panel — same surface treatment the
 * desktop's empty-state hint card uses (`bg-muted/[0.06]` + `border-
 * border/30`). This keeps the section continuous with the rail
 * architecture rather than punching a darker subtle-bg slab into the page.
 */
export function CtaSection() {
  return (
    <section className="relative px-5 py-24 sm:px-8" id="pricing">
      <div className="mx-auto w-[min(1280px,94vw)] overflow-hidden rounded-[14px] border border-[hsl(var(--pb-border)/0.5)] bg-[hsl(var(--pb-card)/0.85)] shadow-[0_18px_54px_-40px_rgba(0,0,0,0.9)]">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--pb-foreground)/0.55)]">
              Private alpha
            </p>
            <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-[-0.02em] text-[hsl(var(--pb-foreground-strong))] sm:text-5xl">
              Start understanding your site in minutes.
            </h2>
            <a
              href="mailto:hello@pagebrain.ai"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-[10px] bg-[hsl(var(--pb-foreground-strong))] px-5 text-[13px] font-semibold text-[hsl(var(--pb-canvas))] shadow-[0_10px_24px_-18px_rgba(255,255,255,0.42)] transition duration-150 hover:bg-[hsl(var(--pb-foreground)/0.9)]"
            >
              Request access
            </a>
          </div>
          <ScreenshotFrame
            src={screenshots.agentHome}
            alt="PageBrain agent prompt for comparing pages and finding content gaps"
            className="aspect-[16/9]"
            imageClassName="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
