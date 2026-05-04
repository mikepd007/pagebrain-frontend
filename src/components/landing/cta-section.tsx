import { screenshots } from "./assets";
import { ScreenshotFrame } from "./product-visual";

export function CtaSection() {
  return (
    <section className="bg-[hsl(var(--pb-background-subtle))] px-5 py-24 sm:px-8" id="pricing">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-[hsl(var(--pb-border)/0.48)] bg-[hsl(var(--pb-card)/0.78)] shadow-[0_18px_54px_-40px_rgba(0,0,0,0.9)]">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase text-[hsl(var(--pb-foreground-subtle))]">
              Private alpha
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-[hsl(var(--pb-foreground))] sm:text-6xl">
              Start understanding your site in minutes.
            </h2>
            <a
              href="mailto:hello@pagebrain.ai"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-[hsl(var(--pb-foreground))] px-5 text-[12.5px] font-semibold text-[hsl(var(--pb-background-subtle))] shadow-[0_10px_24px_-18px_rgba(255,255,255,0.42)] transition duration-150 hover:bg-[hsl(var(--pb-foreground)/0.9)]"
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
