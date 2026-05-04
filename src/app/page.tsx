import { CtaSection } from "@/components/landing/cta-section";
import { FeatureSections } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LandingNav } from "@/components/landing/nav";
import { SecondarySection } from "@/components/landing/secondary-section";
import { WorkflowSection } from "@/components/landing/workflow-section";

export default function Home() {
  return (
    <>
      <LandingNav />
      <main className="min-h-svh bg-[hsl(var(--pb-background-subtle))] text-[hsl(var(--pb-foreground))]">
        <Hero />
        <SecondarySection />
        <FeatureSections />
        <WorkflowSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
