import { ArrowRight, FileText, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

export type ContentPageHeroAction = {
  href: string;
  label: string;
  kind?: "primary" | "secondary";
};

type ContentPageHeroProps = {
  variant: "services" | "projects" | "areas" | "about" | "guides" | "contact";
  eyebrow?: string;
  title: string;
  intro?: string;
  actions?: ContentPageHeroAction[];
};

function HeroActions({ actions }: { actions?: ContentPageHeroAction[] }) {
  if (!actions?.length) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      {actions.map((action, index) => {
        const primary = action.kind !== "secondary";
        const isPhone = action.href.startsWith("tel:");
        return (
          <a
            key={`${action.href}-${action.label}`}
            href={action.href}
            className={
              primary
                ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent-pale)] px-7 py-3 text-sm font-bold text-[var(--ink)] no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--accent-pale)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
                : "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-[var(--brand)] bg-white px-7 py-3 text-sm font-bold text-[var(--brand)] no-underline transition hover:-translate-y-0.5 hover:bg-[var(--brand)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
            }
          >
            {isPhone ? <Phone className="h-4 w-4" aria-hidden="true" /> : null}
            {action.label}
            {!isPhone && index === 0 ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
          </a>
        );
      })}
    </div>
  );
}

function PaleSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`relative overflow-hidden border-y border-[var(--brand)]/8 bg-[var(--surface)] ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[var(--brand)]" />
      {children}
    </section>
  );
}

export function ContentPageHero({ variant, eyebrow, title, intro, actions }: ContentPageHeroProps) {
  const icon =
    variant === "projects" ? (
      <FileText className="h-5 w-5" aria-hidden="true" />
    ) : variant === "areas" ? (
      <MapPin className="h-5 w-5" aria-hidden="true" />
    ) : null;

  const titleClass =
    variant === "services" || variant === "contact" ? "uppercase leading-[.98]" : "leading-[1.02]";

  return (
    <PaleSection>
      <div className="container-shell flex min-h-[280px] flex-col items-center justify-center py-10 text-center sm:h-[340px] sm:min-h-0 sm:py-12">
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--brand)]">
            {icon}
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <h1
          className={`max-w-5xl whitespace-pre-line text-4xl font-bold tracking-[-.04em] text-[var(--ink)] sm:text-5xl lg:text-[3.55rem] ${eyebrow ? "mt-5" : ""} ${titleClass}`}
        >
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
            {intro}
          </p>
        ) : null}
        <HeroActions actions={actions} />
      </div>
    </PaleSection>
  );
}
