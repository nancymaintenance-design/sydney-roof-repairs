import { Banknote, ChevronDown, CreditCard, Landmark, Mail, Menu, Phone, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { business } from "@/config/business";
import { localizedPath, type Locale, ui } from "@/data/content";
import { services, servicePath, serviceText } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

function Header({ locale, alternatePath }: { locale: Locale; alternatePath: string }) {
  const [open, setOpen] = useState(false);
  const copy = ui[locale];
  const nav = [
    [copy.home, localizedPath(locale, "/")],
    [copy.services, localizedPath(locale, "/services")],
    [copy.projects, localizedPath(locale, "/projects")],
    [copy.areas, localizedPath(locale, "/areas")],
    [copy.about, localizedPath(locale, "/about")],
    [copy.blog, localizedPath(locale, "/blog")],
    [copy.contact, localizedPath(locale, "/contact")],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--brand)]/10 bg-[var(--surface)]/95 backdrop-blur-xl">
      <div className="container-shell site-header-shell flex h-20 items-center justify-between gap-4 lg:h-24">
        <a
          href={localizedPath(locale, "/")}
          className="flex items-center gap-3 no-underline"
          aria-label={
            locale === "zh"
              ? "Ellis Services 悉尼屋顶维修首页"
              : "Ellis Services Sydney Roof Repairs home"
          }
        >
          <img
            src="/sydney-roof-repairs-mark.svg"
            alt=""
            width="48"
            height="48"
            className="h-11 w-11 lg:h-16 lg:w-16"
          />
          <span className="leading-none">
            <strong className="block text-lg font-bold tracking-[-.03em] text-[var(--ink)] lg:text-xl">
              ELLIS SERVICES
            </strong>
            <span className="mt-1 block text-[9px] font-bold tracking-[.18em] text-[var(--brand)] lg:text-[10px]">
              SYDNEY ROOF REPAIRS
            </span>
          </span>
        </a>

        <nav
          aria-label={locale === "zh" ? "主导航" : "Primary navigation"}
          className="hidden items-center gap-1 xl:flex"
        >
          <a
            href={nav[0][1]}
            className="rounded-full px-3 py-2 text-sm font-bold no-underline hover:bg-white lg:px-4 lg:text-base"
          >
            {nav[0][0]}
          </a>
          <div className="group relative">
            <a
              href={nav[1][1]}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold no-underline hover:bg-white lg:px-4 lg:text-base"
            >
              {nav[1][0]} <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="invisible absolute left-0 top-full w-80 translate-y-2 rounded-lg border border-[var(--brand)]/10 bg-white p-3 opacity-0 shadow-2xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <a
                href={localizedPath(locale, "/services")}
                className="block rounded-lg bg-[var(--accent-pale)] px-4 py-3 text-sm font-bold text-[var(--brand)] no-underline"
              >
                {copy.allServices}
              </a>
              {services.map((service) => (
                <a
                  key={service.id}
                  href={servicePath(service, locale)}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold no-underline hover:bg-[var(--surface)]"
                >
                  {serviceText(service.shortTitle, locale)}
                </a>
              ))}
            </div>
          </div>
          {nav.slice(2, 6).map(([label, path]) => (
            <a
              key={path}
              href={path}
              className="rounded-full px-3 py-2 text-sm font-bold no-underline hover:bg-white lg:px-4 lg:text-base"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={alternatePath}
            lang={locale === "zh" ? "en-AU" : "zh-Hans"}
            hrefLang={locale === "zh" ? "en-AU" : "zh-Hans"}
            aria-label={copy.languageLabel}
            className="rounded-full border border-[var(--brand)]/20 px-3 py-2 text-xs font-bold no-underline"
          >
            {copy.language}
          </a>
          <a
            href={business.phoneHref}
            onClick={() => trackEvent("phone_click", { location: "header" })}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold no-underline lg:flex"
          >
            <Phone className="h-4 w-4" />
            {business.displayPhone}
          </a>
          <a
            href={localizedPath(locale, "/contact")}
            className="btn-primary text-sm lg:min-h-14 lg:px-6 lg:text-base"
          >
            {copy.enquire}
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={locale === "zh" ? "切换导航" : "Toggle navigation"}
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-[var(--brand)]/20 p-2.5 xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav
          aria-label={locale === "zh" ? "移动导航" : "Mobile navigation"}
          className="mobile-navigation border-t border-[var(--brand)]/10 bg-[var(--surface)] px-4 py-4 xl:hidden"
        >
          <div className="mx-auto grid max-w-3xl gap-1">
            {nav.map(([label, path]) => (
              <a
                key={path}
                href={path}
                className="rounded-xl px-4 py-3 font-bold no-underline hover:bg-white"
              >
                {label}
              </a>
            ))}
            <details className="rounded-xl bg-white px-4 py-3">
              <summary className="cursor-pointer font-bold">{copy.allServices}</summary>
              <div className="mt-2 grid gap-1 pl-3">
                {services.map((service) => (
                  <a
                    key={service.id}
                    href={servicePath(service, locale)}
                    className="py-2 text-sm font-semibold no-underline"
                  >
                    {serviceText(service.shortTitle, locale)}
                  </a>
                ))}
              </div>
            </details>
            <a href={alternatePath} className="rounded-xl px-4 py-3 font-bold no-underline">
              {copy.language}
            </a>
            <a href={business.phoneHref} className="btn-primary mt-2">
              {copy.call} {business.displayPhone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function SocialMark({ id }: { id: string }) {
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.2 7.7H1.7V22h3.5V7.7ZM3.45 2A2.05 2.05 0 1 0 3.45 6.1 2.05 2.05 0 0 0 3.45 2ZM22.3 13.8c0-4.3-2.3-6.3-5.4-6.3-2.5 0-3.6 1.4-4.2 2.3V7.7H9.2V22h3.5v-7.1c0-1.9.4-3.7 2.7-3.7 2.3 0 2.3 2.1 2.3 3.8v7h3.5l1.1-8.2Z"
        />
      </svg>
    );
  }
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.8 22v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.3 1.5-4.3 4.4v2.2H7.5v3.2h2.8V22h3.5Z"
        />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 1 6.2 2.5"
        fill="none"
        stroke="#4285f4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18.2 5.5A9 9 0 0 1 20.7 12"
        fill="none"
        stroke="#ea4335"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20.7 12A9 9 0 0 1 12 21"
        fill="none"
        stroke="#34a853"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 21a9 9 0 1 1 0-18"
        fill="none"
        stroke="#fbbc05"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M12 12h8" fill="none" stroke="#4285f4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function SocialIcons({
  locale,
  tone = "dark",
  compact = false,
}: {
  locale: Locale;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const enabled = business.socialProfiles.filter((profile) => profile.enabled && profile.url);
  if (!enabled.length) return null;
  return (
    <div
      className={`flex flex-wrap ${compact ? "gap-1.5" : "gap-3"}`}
      aria-label={locale === "zh" ? "Ellis Services Group 在线平台" : "Ellis Services Group online"}
    >
      {enabled.map((profile) => (
        <a
          key={profile.id}
          href={profile.url}
          rel="me noopener noreferrer"
          target="_blank"
          aria-label={`${profile.label} — Ellis Services Group`}
          title={`${profile.label} — Ellis Services Group`}
          className={`grid place-items-center rounded-full border no-underline transition hover:-translate-y-0.5 ${
            compact ? "h-8 w-8" : "h-10 w-10"
          } ${
            tone === "light"
              ? "border-[var(--brand)]/20 bg-white text-[var(--brand)] hover:bg-[var(--accent-pale)]"
              : "border-white/25 text-white hover:border-[var(--accent-pale)] hover:text-[var(--accent-pale)]"
          }`}
        >
          <SocialMark id={profile.id} />
        </a>
      ))}
    </div>
  );
}

function ContactRail({ locale }: { locale: Locale }) {
  return (
    <div className="border-b border-[var(--brand)]/10 bg-white text-[var(--brand)]">
      <div className="container-shell site-header-shell flex min-h-10 items-center justify-between gap-4 py-2">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <a
            href={business.phoneHref}
            onClick={() => trackEvent("phone_click", { location: "contact_rail" })}
            className="inline-flex shrink-0 items-center gap-2 text-xs font-bold no-underline sm:text-sm"
          >
            <Phone className="h-4 w-4" />
            {business.displayPhone}
          </a>
          <a
            href={business.emailHref}
            onClick={() => trackEvent("email_click", { location: "contact_rail" })}
            className="hidden min-w-0 items-center gap-2 text-xs font-bold no-underline md:inline-flex"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{business.email}</span>
          </a>
          <a
            href={business.emailHref}
            onClick={() => trackEvent("email_click", { location: "contact_rail_mobile" })}
            aria-label={locale === "zh" ? "发送邮件" : "Send email"}
            title={business.email}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--brand)]/20 bg-white no-underline md:hidden"
          >
            <Mail className="h-4 w-4" />
          </a>
          <SocialIcons locale={locale} tone="light" compact />
        </div>
        <a
          href={localizedPath(locale, "/contact")}
          className="hidden shrink-0 text-xs font-bold text-[var(--brand)] no-underline sm:block"
        >
          {locale === "zh" ? "免费说明您的需求 →" : "Describe your enquiry →"}
        </a>
      </div>
    </div>
  );
}

function PaymentMark({ label }: { label: string }) {
  if (label === "Mastercard") {
    return (
      <svg viewBox="0 0 42 24" className="h-6 w-10" aria-hidden="true">
        <circle cx="16" cy="12" r="9" fill="currentColor" opacity=".7" />
        <circle cx="26" cy="12" r="9" fill="currentColor" opacity=".45" />
      </svg>
    );
  }
  if (label === "Bank transfer") return <Landmark className="h-6 w-8" aria-hidden="true" />;
  if (label === "Cash") return <Banknote className="h-6 w-8" aria-hidden="true" />;
  if (label === "EFTPOS") return <CreditCard className="h-6 w-8" aria-hidden="true" />;
  const wordmark = label === "American Express" ? "AMEX" : "VISA";
  return (
    <span aria-hidden="true" className="text-sm font-bold italic tracking-[-.04em]">
      {wordmark}
    </span>
  );
}

export function PaymentIcons({ locale }: { locale: Locale }) {
  const enabled = business.paymentMethods.filter((method) => method.enabled);
  if (!enabled.length) return null;
  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-2"
      aria-label={locale === "zh" ? "接受的付款方式" : "Accepted payment methods"}
    >
      {enabled.map((method) => (
        <span
          key={method.label}
          role="img"
          aria-label={method.label}
          title={method.label}
          className="grid min-h-9 min-w-10 place-items-center text-white/68"
        >
          <PaymentMark label={method.label} />
        </span>
      ))}
    </div>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  return (
    <footer className="bg-[var(--ink)] pb-20 text-white md:pb-0">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/sydney-roof-repairs-mark.svg"
              alt=""
              width="52"
              height="52"
              className="h-12 w-12"
            />
            <p className="text-xl font-bold leading-tight">
              ELLIS SERVICES
              <br />
              <span className="text-xs tracking-[.14em] text-[var(--accent-pale)]">
                SYDNEY ROOF REPAIRS
              </span>
            </p>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            {locale === "zh"
              ? "面向悉尼屋顶漏水、风暴损坏、瓦屋顶、金属屋顶、泛水、天沟谷和屋脊维修需求的清晰咨询入口。"
              : "A clear enquiry pathway for Sydney roof leaks, storm damage, tile and metal roofs, flashings, valleys and ridge repairs."}
          </p>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[.16em] text-white/48">
            {locale === "zh" ? "关注 Ellis Services Group" : "Follow Ellis Services Group"}
          </p>
          <div className="mt-3">
            <SocialIcons locale={locale} />
          </div>
          <div className="mt-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-white/48">
              {locale === "zh" ? "付款方式" : "Payments"}
            </p>
            <PaymentIcons locale={locale} />
          </div>
        </div>
        <div>
          <p className="eyebrow !text-[var(--accent-pale)]">{copy.services}</p>
          <ul className="mt-4 grid gap-3 text-sm text-white/72">
            {services.map((service) => (
              <li key={service.id}>
                <a href={servicePath(service, locale)} className="no-underline hover:text-white">
                  {serviceText(service.shortTitle, locale)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-[var(--accent-pale)]">{copy.contact}</p>
          <ul className="mt-4 grid gap-3 text-sm text-white/72">
            <li>
              <a
                href={business.phoneHref}
                onClick={() => trackEvent("phone_click", { location: "footer" })}
              >
                {business.displayPhone}
              </a>
            </li>
            <li>
              <a
                href={business.emailHref}
                onClick={() => trackEvent("email_click", { location: "footer" })}
              >
                {business.email}
              </a>
            </li>
            <li>
              <a href={localizedPath(locale, "/projects")}>{copy.projects}</a>
            </li>
            <li>
              <a href={localizedPath(locale, "/areas")}>{copy.areas}</a>
            </li>
            <li>
              <a href={localizedPath(locale, "/blog")}>{copy.blog}</a>
            </li>
            <li>
              <a href={localizedPath(locale, "/privacy")}>{copy.privacy}</a>
            </li>
          </ul>
          <p className="mt-5 text-xs leading-5 text-white/48">
            {locale === "zh"
              ? "该地址仅作联系资料，不表示为可直接到访的办公室、门店或 Google Business Profile 地点。"
              : business.address.publicTreatment}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/48 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {business.businessName}
          </span>
          <span>
            {locale === "zh"
              ? "承接范围和可用性以实际咨询确认"
              : "SERVICE FIT AND AVAILABILITY CONFIRMED FROM YOUR ENQUIRY"}
          </span>
        </div>
      </div>
    </footer>
  );
}

function MobileContactBar({ locale }: { locale: Locale }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-[var(--brand)]/15 bg-[var(--surface)]/97 backdrop-blur md:hidden">
      <a
        href={business.phoneHref}
        onClick={() => trackEvent("phone_click", { location: "mobile_bar" })}
        className="flex min-h-16 items-center justify-center gap-2 font-bold text-[var(--brand)] no-underline"
      >
        <Phone className="h-4 w-4" />
        {ui[locale].call}
      </a>
      <a
        href={localizedPath(locale, "/contact")}
        className="flex min-h-16 items-center justify-center bg-[var(--accent-pale)] px-3 text-center text-sm font-bold text-[var(--ink)] no-underline"
      >
        {ui[locale].enquire}
      </a>
    </div>
  );
}

export function SiteLayout({
  locale,
  alternatePath,
  children,
}: {
  locale: Locale;
  alternatePath: string;
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-full bg-white px-4 py-3 font-bold transition focus:translate-y-0"
      >
        {locale === "zh" ? "跳到主要内容" : "Skip to content"}
      </a>
      <ContactRail locale={locale} />
      <Header locale={locale} alternatePath={alternatePath} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
      <MobileContactBar locale={locale} />
    </>
  );
}

export function ContactStrip({
  locale,
  contactHref,
  showEyebrow = true,
}: {
  locale: Locale;
  contactHref?: string;
  showEyebrow?: boolean;
}) {
  return (
    <section className="contact-strip bg-[var(--brand)] py-10 text-white">
      <div className="container-shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          {showEyebrow ? (
            <p className="eyebrow !text-white/70">
              {locale === "zh" ? "准备说明问题？" : "Ready to describe the issue?"}
            </p>
          ) : null}
          <h2 className={`${showEyebrow ? "mt-2 " : ""}text-3xl font-bold tracking-tight`}>
            {locale === "zh"
              ? "先确认屋顶状况和下一步。"
              : "Start with the roof condition and the next step."}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={business.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" />
            {business.displayPhone}
          </a>
          <a href={contactHref || localizedPath(locale, "/contact")} className="btn-secondary">
            <Mail className="h-4 w-4" />
            {ui[locale].enquire}
          </a>
        </div>
      </div>
    </section>
  );
}
