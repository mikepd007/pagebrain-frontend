import { screenshots } from "./assets";
import { ScreenshotFrame } from "./product-visual";

export function SecondarySection() {
  return (
    <section className="border-y border-[hsl(var(--pb-border)/0.34)] bg-[hsl(var(--pb-background))]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex min-h-[420px] flex-col justify-center border-[hsl(var(--pb-border)/0.34)] py-20 lg:border-r lg:pr-14">
          <p className="mb-4 font-mono text-[11px] uppercase text-[hsl(var(--pb-foreground-subtle))]">
            Evidence-backed strategy
          </p>
          <h2 className="max-w-xl text-4xl font-semibold leading-tight text-[hsl(var(--pb-foreground))] sm:text-5xl">
            Stop auditing from spreadsheets and gut feel.
          </h2>
        </div>

        <div className="grid content-center gap-8 py-16 lg:pl-14">
          <p className="max-w-2xl text-xl leading-8 text-[hsl(var(--pb-foreground)/0.74)]">
            PageBrain keeps crawl data, rendered content, semantic context, and
            agent findings connected so recommendations stay tied to real page evidence.
          </p>
          <ScreenshotFrame
            src={screenshots.agentBrief}
            alt="PageBrain generating an SEO strategy document from crawl context"
            className="aspect-[16/9]"
            imageClassName="object-cover object-top"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {["Rendered crawl data", "Semantic context", "Doc-ready output"].map((item) => (
              <div
                className="rounded-md border border-[hsl(var(--pb-border)/0.38)] bg-[hsl(var(--pb-card)/0.42)] px-3 py-2 text-[12.5px] font-medium text-[hsl(var(--pb-foreground)/0.82)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
