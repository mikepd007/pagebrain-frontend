import { footerLinks } from "./content";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--pb-border)/0.34)] bg-[hsl(var(--pb-background-subtle))] px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-1 text-[11.5px] font-medium text-[hsl(var(--pb-muted-foreground))]">
          {footerLinks.map((link) => (
            <a
              href="#docs"
              className="rounded-md px-2.5 py-1.5 transition-colors duration-150 hover:bg-[hsl(var(--pb-muted)/0.28)] hover:text-[hsl(var(--pb-foreground)/0.86)]"
              key={link}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
