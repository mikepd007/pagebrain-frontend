import { screenshots } from "./assets";
import { workflowSteps } from "./content";
import { ScreenshotFrame } from "./product-visual";

export function WorkflowSection() {
  return (
    <section className="bg-[hsl(var(--pb-background))] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase text-[hsl(var(--pb-foreground-subtle))]">
            From crawl to plan
          </p>
          <h2 className="max-w-lg text-4xl font-semibold leading-tight text-[hsl(var(--pb-foreground))] sm:text-5xl">
            A cleaner path from raw URLs to decisions.
          </h2>
        </div>

        <div className="relative">
          <ScreenshotFrame
            src={screenshots.semanticMap}
            alt="PageBrain semantic map showing clustered pages and topic scores"
            className="mb-6 aspect-[16/9]"
            imageClassName="object-cover object-left-top"
          />
          <div className="relative">
            <div className="absolute left-4 top-6 hidden h-[calc(100%-48px)] w-px bg-[hsl(var(--pb-border)/0.72)] sm:block" />
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div className="relative flex gap-5" key={step}>
                  <div className="z-10 grid size-8 shrink-0 place-items-center rounded-md border border-[hsl(var(--pb-border)/0.58)] bg-[hsl(var(--pb-card))] font-mono text-[11px] text-[hsl(var(--pb-primary))]">
                    {index + 1}
                  </div>
                  <div className="w-full rounded-[8px] border border-[hsl(var(--pb-border)/0.44)] bg-[hsl(var(--pb-elevated-surface)/0.78)] p-5">
                    <p className="text-[15px] font-medium leading-6 text-[hsl(var(--pb-foreground)/0.9)]">{step}</p>
                    <div className="mt-4 grid gap-2">
                      <span className="h-1.5 w-full rounded-full bg-[hsl(var(--pb-border)/0.9)]" />
                      <span className="h-1.5 w-2/3 rounded-full bg-[hsl(var(--pb-border)/0.7)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
