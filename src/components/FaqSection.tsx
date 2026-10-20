import { ArrowRight } from "lucide-react";
import { localizedPath, type Locale } from "@/data/content";
import { faqText, type FaqItem } from "@/data/faqs";

export function FaqSection({
  locale,
  items,
  title,
  eyebrow = "FAQ",
  contactLink = true,
  muted = false,
  sectionId,
}: {
  locale: Locale;
  items: readonly FaqItem[];
  title?: string;
  eyebrow?: string;
  contactLink?: boolean;
  muted?: boolean;
  sectionId?: string;
}) {
  const zh = locale === "zh";
  return (
    <section
      id={sectionId}
      className={`${muted ? "bg-[var(--surface)]" : "bg-white"} scroll-mt-28 py-24`}
    >
      <div className="container-shell grid gap-12 lg:grid-cols-[.76fr_1.24fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className={`${eyebrow ? "mt-4 " : ""}text-4xl font-bold tracking-tight`}>
            {title || (zh ? "常见问题与下一步" : "Common questions and next steps")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
            {zh
              ? "先看这里是否已回答您的问题；具体原因、承接范围和价格仍需结合实际资料确认。"
              : "Check whether your question is covered here. The cause, service fit and price still depend on the actual property details."}
          </p>
          {contactLink ? (
            <a
              href={localizedPath(locale, "/contact")}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] no-underline"
            >
              {zh ? "仍有问题？提交咨询" : "Still unsure? Send an enquiry"}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
        <div className="grid gap-3">
          {items.map((item, index) => (
            <details
              key={faqText(item.question, locale)}
              className="group rounded-lg border border-[var(--brand)]/12 bg-white px-6 py-5 shadow-sm"
              open={index === 0}
            >
              <summary className="cursor-pointer list-none pr-10 text-lg font-bold marker:content-none">
                <span className="flex items-start justify-between gap-5">
                  {faqText(item.question, locale)}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent-pale)] text-xl leading-none text-[var(--brand)] transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 max-w-3xl border-t border-[var(--brand)]/10 pt-4 text-sm leading-7 text-[var(--muted)]">
                {faqText(item.answer, locale)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
