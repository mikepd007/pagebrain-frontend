/**
 * Single source of truth for landing page copy.
 * Keep entries terse. If a string sounds like marketing fluff, rewrite it like product UI.
 */

export type NavItem = { label: string; href: string };

export const navigationItems: NavItem[] = [
  { label: "Product", href: "#product" },
  { label: "Workflow", href: "#workflow" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
];

export const heroCopy = {
  eyebrow: "Now in private beta",
  eyebrowTag: "v0.1",
  headlinePrimary: "Crawl intelligence",
  headlineAccent: "for the AI age.",
  subhead:
    "PageBrain renders modern sites, maps meaning across every page, and lets agents turn crawl evidence into audits, strategy, and deliverables.",
  primaryCta: { label: "Download for Mac", href: "#download-mac" },
  secondaryCta: { label: "Download for Windows", href: "#download-windows" },
} as const;

export const featureHighlights = [
  {
    eyebrow: "Capture",
    title: "Capture the technical foundation.",
    body: "Render JavaScript, extract HTML, metadata, links, headings, and page structure, then convert important content into clean markdown.",
  },
  {
    eyebrow: "Understand",
    title: "Map similarity across your content.",
    body: "Embed high-value pages to see what overlaps, which URLs support each other, and where semantic gaps weaken the site.",
  },
  {
    eyebrow: "Ship",
    title: "Ask the crawl what is really going on.",
    body: "Use agents to investigate issues, compare page groups, uncover content gaps, and turn findings into audits and strategy.",
  },
];

export const workflowSteps = [
  "Crawl rendered pages and collect the SEO fields that matter",
  "Build semantic maps, entities, evidence, and page-level context",
  "Ship audit narratives, prioritized action plans, and deliverables",
];

export const footerLinks = ["Security", "Changelog", "Careers", "Contact"];
