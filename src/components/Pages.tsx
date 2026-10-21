import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  ClipboardCheck,
  Droplets,
  Grid3X3,
  Images,
  FileText,
  Mail,
  MapPin,
  PanelsTopLeft,
  Phone,
  Search,
  ShieldCheck,
  Triangle,
  Waves,
  X,
} from "lucide-react";
import { ClarityPrivacy } from "./ClarityPrivacy";
import { useEffect, useRef, useState } from "react";
import { business } from "@/config/business";
import { blogPath, blogPosts, blogText, formatBlogDate } from "@/data/blog";
import { commonCopy, localizedPath, type Locale, ui } from "@/data/content";
import { pageFaqs } from "@/data/faqs";
import { projects, projectText } from "@/data/media";
import {
  contactPath,
  evidencePath,
  serviceBySlug,
  services,
  servicePath,
  serviceText,
  type RoofService,
} from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { ContactStrip, SiteLayout, SocialIcons } from "./SiteChrome";
import { ContentPageHero } from "./ContentPageHero";
import { EnquiryForm } from "./EnquiryForm";
import { FaqSection } from "./FaqSection";
import { HomeEnquiryOverlay } from "./HomeEnquiryOverlay";

function scrollToPageSection(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  window.history.replaceState(null, "", `#${id}`);
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
}

function PageHero({
  locale,
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  alternatePath,
  children,
  afterHero,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  alternatePath: string;
  children?: React.ReactNode;
  afterHero?: React.ReactNode;
}) {
  return (
    <SiteLayout locale={locale} alternatePath={alternatePath}>
      <section className="overflow-hidden bg-[var(--ink)] text-white roof-grid">
        <div className="container-shell grid min-h-[620px] items-stretch gap-10 py-10 lg:grid-cols-[1.05fr_.95fr] lg:py-14">
          <div className="flex flex-col justify-center py-8">
            <p className="eyebrow !text-[var(--accent-pale)]">{eyebrow}</p>
            <h1 className="section-title mt-5 max-w-4xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={business.phoneHref}
                onClick={() => trackEvent("phone_click", { location: "page_hero" })}
                className="btn-primary"
              >
                <Phone className="h-4 w-4" />
                {ui[locale].call} {business.displayPhone}
              </a>
              <a href={localizedPath(locale, "/contact")} className="btn-secondary">
                {ui[locale].enquire}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            {children}
          </div>
          <figure className="relative min-h-[380px] overflow-hidden rounded-lg bg-white/5 lg:min-h-full">
            <img
              src={image}
              alt={imageAlt}
              width="1080"
              height="811"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-lg bg-[var(--ink)]/88 px-4 py-3 text-xs leading-5 text-white/78 backdrop-blur">
              {commonCopy[locale].mediaDisclosure}
            </figcaption>
          </figure>
        </div>
      </section>
      {afterHero}
      <ContactStrip locale={locale} />
    </SiteLayout>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  compact?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={
          compact
            ? `${eyebrow ? "mt-3 " : ""}text-3xl font-bold leading-[1.06] tracking-[-.035em] sm:text-4xl lg:text-[2.75rem]`
            : `section-title${eyebrow ? " mt-4" : ""}`
        }
      >
        {title}
      </h2>
      {body && (
        <p
          className={
            compact
              ? "mt-4 text-base leading-7 text-[var(--muted)]"
              : "mt-5 text-lg leading-8 text-[var(--muted)]"
          }
        >
          {body}
        </p>
      )}
    </div>
  );
}

function ServiceCards({
  locale,
  limit,
  variant = "grid",
}: {
  locale: Locale;
  limit?: number;
  variant?: "grid" | "home-list";
}) {
  const selectedServices = services.slice(0, limit);

  if (variant === "home-list") {
    const serviceIcons = [Droplets, CloudLightning, Grid3X3, PanelsTopLeft, Waves, Triangle];
    return (
      <div className="home-service-list mt-8 grid overflow-hidden rounded-lg border border-[var(--brand)]/10 bg-white shadow-sm lg:grid-cols-2">
        {selectedServices.map((service, index) => {
          const ServiceIcon = serviceIcons[index] ?? ShieldCheck;
          return (
            <article
              key={service.id}
              className="group grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-b border-[var(--brand)]/10 p-5 sm:gap-5 lg:min-h-[9.5rem] lg:border-r lg:[&:nth-child(even)]:border-r-0 lg:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <a
                href={servicePath(service, locale)}
                aria-label={serviceText(service.shortTitle, locale)}
                className="grid h-14 w-14 place-items-center rounded-lg bg-[var(--accent-pale)] text-[var(--brand)] no-underline transition group-hover:bg-[var(--accent-pale)]"
              >
                <ServiceIcon className="h-6 w-6" aria-hidden="true" />
              </a>
              <div className="flex min-w-0 flex-col">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-[var(--ink)]">
                  <a href={servicePath(service, locale)} className="no-underline">
                    {serviceText(service.shortTitle, locale)}
                  </a>
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {serviceText(service.summary, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold">
                  <a
                    href={servicePath(service, locale)}
                    className="inline-flex items-center gap-1.5 text-[var(--brand)] no-underline"
                  >
                    {locale === "zh" ? "服务详情" : "Service details"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={evidencePath(service, locale)}
                    className="inline-flex items-center gap-1.5 text-[var(--brand)] no-underline"
                  >
                    {locale === "zh" ? "查看项目照片" : "See project photos"}
                    <Images className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {selectedServices.map((service, index) => (
        <article key={service.id} className="card group overflow-hidden">
          <a href={servicePath(service, locale)} className="block no-underline">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--border)]">
              <img
                src={service.image}
                alt={serviceText(service.imageAlt, locale)}
                width="1080"
                height="1440"
                loading={index > 2 ? "lazy" : "eager"}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[var(--accent-pale)] px-3 py-1 text-[10px] font-bold tracking-[.12em] text-[var(--ink)]">
                {locale === "zh" ? "屋顶服务" : "ROOF SERVICE"}
              </span>
            </div>
          </a>
          <div className="p-6">
            <h3 className="text-2xl font-bold tracking-tight">
              {serviceText(service.shortTitle, locale)}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {serviceText(service.summary, locale)}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-[var(--brand)]">
              <a
                href={servicePath(service, locale)}
                className="inline-flex items-center gap-2 no-underline"
              >
                {locale === "zh" ? "查看服务详情" : "View service details"}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={evidencePath(service, locale)}
                className="inline-flex items-center gap-2 no-underline"
              >
                {locale === "zh" ? "查看相关照片" : "See related work photos"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function HomeHero({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  return (
    <section
      className="home-hero"
      aria-label={zh ? "悉尼屋顶维修首页开场" : "Sydney roof repair introduction"}
    >
      <div className="container-shell home-hero-layout">
        <figure className="home-hero-photo">
          <img
            src="/media/commercial-roof-overview.webp"
            alt={
              zh ? "金属屋面与泛水连接处的可见情况" : "Visible metal roof and flashing junctions"
            }
            width="1920"
            height="1080"
            fetchPriority="high"
          />
          <figcaption>
            {zh ? "金属屋面与泛水连接处" : "Metal roof and flashing junctions"}
          </figcaption>
        </figure>
        <div className="home-hero-copy">
          <p className="eyebrow">{zh ? "Ellis Services · 悉尼" : "Ellis Services · Sydney"}</p>
          <h1>
            {zh ? (
              <>
                悉尼屋顶维修
                <br />
                先确认问题与下一步
              </>
            ) : (
              <>
                Sydney Roof Repairs
                <br />
                Clear advice. Practical next steps.
              </>
            )}
          </h1>
          <p className="home-hero-intro">
            {zh
              ? "漏水、风暴损坏、瓦屋顶、金属屋顶、泛水、天沟谷及屋脊维修咨询。"
              : "Roof leak, storm damage, tile, metal, flashing, valley and ridge repair enquiries across Sydney."}
          </p>
          <div className="home-hero-actions">
            <a
              href={business.phoneHref}
              className="btn-primary"
              onClick={() => trackEvent("phone_click", { location: "home_hero" })}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {business.displayPhone}
            </a>
            <a
              href="#home-services"
              onClick={(event) => scrollToPageSection(event, "home-services")}
              className="btn-secondary"
            >
              {zh ? "查看维修服务" : "Explore roof repair services"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="container-shell">
        <div className="home-hero-cta">
          <p>
            {zh
              ? "把可见情况和所在 suburb 告诉我们。"
              : "Tell us what you can see and your suburb."}
          </p>
          <HomeEnquiryOverlay
            locale={locale}
            trigger={
              <button type="button" className="btn-primary">
                {ui[locale].enquire}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const homePortalCards = [
    {
      key: "services",
      title: zh ? "屋顶维修服务" : "Roof repair services",
      description: zh
        ? "按漏水、风暴损坏、瓦片、金属屋面、泛水或屋脊问题进入对应服务。"
        : "Start with leaks, storm damage, tiles, metal roofing, flashing or ridge issues.",
      image: "/media/tile-roof-after.jpg",
      imageAlt: zh ? "瓦屋面整体可见情况" : "Visible tiled roof condition",
      href: localizedPath(locale, "/services"),
      action: zh ? "查看全部服务" : "View all services",
    },
    {
      key: "about",
      title: zh ? "了解我们" : "About Ellis Services",
      description: zh
        ? "查看企业信息、服务方式、沟通边界，以及咨询时会核对哪些现场资料。"
        : "Review the business details, service approach, communication boundaries and enquiry information.",
      image: "/media/tile-roof-finished-detail.jpg",
      imageAlt: zh ? "已完工瓦屋面的可见细节" : "Visible detail of a finished tiled roof",
      href: localizedPath(locale, "/about"),
      action: zh ? "了解服务方式" : "How we work",
    },
    {
      key: "faq",
      title: zh ? "常见问题" : "Roof repair FAQs",
      description: zh
        ? "了解照片、报价、检查与安全范围等常见屋顶维修问题。"
        : "Read common roof repair questions about photos, quotes, inspections and safe access.",
      image: "/media/tile-detail-damaged-bedding.jpg",
      imageAlt: zh ? "瓦片与砂浆连接位置的可见细节" : "Visible tile and bedding junction detail",
      href: "#home-faq",
      action: zh ? "查看常见问题" : "Read common questions",
    },
    {
      key: "areas",
      title: zh ? "悉尼服务区域" : "Sydney service areas",
      description: zh
        ? "按 Sydney 区域查看承接说明，并用 suburb 或邮编确认具体地址是否适合安排。"
        : "Review Sydney coverage, then use a suburb or postcode to confirm whether an address is a fit.",
      image: "/media/commercial-roof-overview.webp",
      imageAlt: zh
        ? "商用金属屋顶局部处理整体画面"
        : "Wide view of local treatment on a commercial metal roof",
      href: localizedPath(locale, "/areas"),
      action: zh ? "核对服务区域" : "Check your area",
    },
    {
      key: "projects",
      title: zh ? "屋顶项目资料" : "Roof project photos",
      description: zh
        ? "查看按屋顶部位整理的照片组、可见事实、照片能说明什么以及仍需现场确认的边界。"
        : "Review roof-area photo sets, visible facts, what the images support and what still needs inspection.",
      image: "/media/valley-flashing-repair-02.jpg",
      imageAlt: zh ? "屋面谷与相邻瓦片的可见细节" : "Visible roof valley and adjacent tile detail",
      href: localizedPath(locale, "/projects"),
      action: zh ? "查看项目资料" : "Review roof photos",
    },
    {
      key: "contact",
      title: zh ? "联系与维修咨询" : "Contact and enquiries",
      description: zh
        ? "准备 suburb、屋顶类型、问题位置、发生时间与可安全拍摄的照片，提交初步咨询。"
        : "Share the suburb, roof type, problem area, timing and any photos that are safe to take.",
      image: "/media/ridge-capping-repair-detail.jpg",
      imageAlt: zh ? "屋脊封顶连接位置的可见细节" : "Visible ridge-capping junction detail",
      href: localizedPath(locale, "/contact"),
      action: zh ? "提交维修咨询" : "Send an enquiry",
    },
  ];
  const alternate = locale === "zh" ? "/" : "/zh-hans";
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <HomeHero locale={locale} />

      <section id="home-task-portal" className="scroll-mt-32 bg-[var(--surface)] py-14 sm:py-16">
        <div className="container-shell max-w-[76rem]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {zh ? "悉尼屋顶维修服务与实用信息" : "Sydney roof repair services and information"}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
              {zh
                ? "查看维修服务、项目照片、服务区域与常见问题，或直接说明您的屋顶情况。"
                : "Explore repair services, project photos, service areas and common questions, or describe your roof issue directly."}
            </p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homePortalCards.map((card) => (
              <a
                key={card.key}
                href={card.href}
                onClick={
                  card.href.startsWith("#")
                    ? (event) => scrollToPageSection(event, card.href.slice(1))
                    : undefined
                }
                className="home-portal-card group grid min-w-0 grid-cols-[6.5rem_1fr] overflow-hidden rounded-lg border border-[var(--brand)]/10 bg-white no-underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
              >
                <span className="relative block min-h-[8.75rem] overflow-hidden bg-[var(--border)]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    width="1080"
                    height="675"
                    loading="lazy"
                    className="home-portal-image h-full w-full object-cover"
                  />
                </span>
                <span className="flex min-w-0 flex-col p-4">
                  <span className="block text-base font-bold tracking-tight text-[var(--ink)]">
                    {card.title}
                  </span>
                  <span className="mt-2 line-clamp-2 block text-xs leading-5 text-[var(--muted)]">
                    {card.description}
                  </span>
                  <span className="mt-auto flex items-center justify-between border-t border-[var(--brand)]/10 pt-3 text-xs font-bold text-[var(--brand)]">
                    <span>{card.action}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="home-services" className="scroll-mt-28 py-16 sm:py-20">
        <div className="container-shell max-w-[76rem]">
          <SectionIntro
            compact
            title={
              zh ? "选择适合屋顶情况的维修服务" : "Roof repair services for the issue you can see"
            }
            body={
              zh
                ? "可按漏水、风暴损坏或具体屋顶部位查看瓦片、金属屋面、泛水天沟谷与屋脊维修。"
                : "Browse by leaks, storm damage or the roof area involved, including tile, metal, flashing, valley and ridge repairs."
            }
          />
          <ServiceCards locale={locale} variant="home-list" />
        </div>
      </section>

      <section className="bg-[var(--surface)] py-16 sm:py-20">
        <div className="container-shell max-w-[76rem]">
          <div className="grid overflow-hidden rounded-lg border border-[var(--brand)]/10 bg-white shadow-sm lg:grid-cols-[.95fr_1.05fr]">
            <figure className="relative min-h-[340px] overflow-hidden lg:min-h-[460px]">
              <img
                src="/media/valley-flashing-repair-01.jpg"
                alt={
                  zh
                    ? "天沟谷泛水与相邻瓦片的可见细节"
                    : "Visible valley flashing and adjoining tile detail"
                }
                width="1280"
                height="1707"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/78 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-lg border border-white/15 bg-[var(--ink)]/88 p-4 text-xs leading-5 text-white/78 backdrop-blur">
                {zh
                  ? "这类画面可帮助说明天沟谷、瓦片和连接处的空间关系，但不会仅凭照片确认原因或维修范围。"
                  : "This kind of view can show the relationship between the valley, tiles and junction, without claiming a diagnosis or final scope from the image alone."}
              </figcaption>
            </figure>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <h2 className="text-3xl font-bold leading-[1.05] tracking-[-.035em] sm:text-4xl">
                {zh ? "查看不同屋顶部位的项目照片" : "See project photos from different roof areas"}
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {zh
                  ? "项目资料按屋顶部位整理，让您先看清瓦片、泛水、天沟谷和金属屋面的可见关系，再准备自己的咨询信息。"
                  : "Project photos are organised by roof area so you can compare visible tile, flashing, valley and metal-roof relationships before preparing an enquiry."}
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  [
                    zh ? "一张整体画面" : "One wider view",
                    zh
                      ? "交代屋面方向、相邻部位与问题位置。"
                      : "Show the roof direction, adjoining areas and problem location.",
                  ],
                  [
                    zh ? "一张安全特写" : "One safe close view",
                    zh
                      ? "记录裂缝、移位、水迹或连接处等可见细节。"
                      : "Record visible cracking, movement, staining or junction detail.",
                  ],
                  [
                    zh ? "一条时间说明" : "One timing note",
                    zh
                      ? "说明何时出现，以及是否与降雨或风暴有关。"
                      : "Explain when it appears and whether rain or a storm is involved.",
                  ],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-[var(--brand)]/10 pt-4"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent-pale)] text-[var(--brand)]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-bold text-[var(--ink)]">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={localizedPath(locale, "/projects")} className="btn-primary">
                  {ui[locale].projects}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={localizedPath(locale, "/contact")} className="btn-secondary">
                  {zh ? "准备维修咨询" : "Prepare an enquiry"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-shell grid max-w-[76rem] min-w-0 gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
          <figure className="relative min-h-[360px] overflow-hidden rounded-lg border border-[var(--brand)]/10 shadow-sm lg:min-h-[460px]">
            <img
              src="/media/ridge-capping-repair-detail.jpg"
              alt={zh ? "屋脊瓦与相邻瓦面作业细节" : "Ridge capping and adjoining tile roof detail"}
              width="960"
              height="1280"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/76 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-lg border border-white/15 bg-[var(--ink)]/88 p-4 backdrop-blur">
              <p className="text-xs leading-5 text-white/78 sm:text-sm sm:leading-6">
                {zh
                  ? "可见裂缝、移位或水迹有助于说明问题，但维修范围仍需结合材料、连接部位和安全通道确认。"
                  : "Visible cracking, movement or water marks help explain the issue, but the repair scope still depends on materials, junctions and safe access."}
              </p>
            </figcaption>
          </figure>
          <div className="min-w-0 text-[var(--ink)]">
            <h2 className="text-3xl font-bold leading-[1.05] tracking-[-.035em] sm:text-4xl">
              {zh ? "屋顶维修咨询如何进行" : "How a roof repair enquiry works"}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
              {zh
                ? "我们不会从一张照片直接跳到结论。先整理可见信息，再确认承接适配、检查重点和影响报价的实际因素。"
                : "We do not jump from one photo to a conclusion. Observable details come first, followed by service fit, inspection priorities and the real factors that shape a quote."}
            </p>
            <div className="mt-7 grid gap-4">
              {[
                [
                  Search,
                  zh ? "说明症状" : "Describe the symptom",
                  zh
                    ? "提供出现时间、受影响位置、屋顶材料和安全拍摄的照片。"
                    : "Share when it appears, the affected area, roof material and safely taken photos.",
                ],
                [
                  ClipboardCheck,
                  zh ? "确认适配和检查重点" : "Confirm service fit and inspection priorities",
                  zh
                    ? "结合 suburb、房屋高度、通道和问题类型，说明哪些部位仍需现场检查。"
                    : "Use the suburb, property height, access and issue type to explain what still needs an on-site check.",
                ],
                [
                  CheckCircle2,
                  zh ? "约定下一步" : "Agree the next step",
                  zh
                    ? "在任何工作范围确定前说明合适的维修路径和所需信息。"
                    : "Explain the suitable repair path and required information before scope is agreed.",
                ],
              ].map(([Icon, title, body]) => {
                const StepIcon = Icon as typeof Search;
                return (
                  <article
                    key={String(title)}
                    className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-[var(--brand)]/10 pt-4"
                  >
                    <div>
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface)] text-[var(--brand)]">
                        <StepIcon className="h-5 w-5" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--ink)]">{String(title)}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{String(body)}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-7 rounded-[1.25rem] border border-[var(--brand)]/10 bg-[var(--surface)] p-5">
              <p className="text-sm font-bold text-[var(--brand)]">
                {zh ? "报价前需要确认" : "WHAT MUST BE CONFIRMED BEFORE A QUOTE"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {commonCopy[locale].costNote}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={localizedPath(locale, "/about")} className="btn-secondary">
                  {zh ? "了解我们的承接方式" : "How we handle enquiries"}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={localizedPath(locale, "/contact")} className="btn-primary">
                  {zh ? "提交问题资料" : "Share your roof details"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] py-16 sm:py-20">
        <div className="container-shell max-w-[76rem]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionIntro
              compact
              title={zh ? "屋顶维修指南" : "Roof repair guides"}
              body={
                zh
                  ? "了解常见屋顶问题、可观察信息以及咨询前适合准备的资料。"
                  : "Understand common roof issues, observable details and useful information to prepare before an enquiry."
              }
            />
            <a href={localizedPath(locale, "/blog")} className="btn-secondary shrink-0">
              {zh ? "查看全部指南" : "View all guides"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="card overflow-hidden">
                <img
                  src={post.image}
                  alt={blogText(post.imageAlt, locale)}
                  width="1080"
                  height="811"
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[.1em] text-[var(--brand)]">
                    {blogText(post.category, locale)} · {formatBlogDate(post.published, locale)}
                  </p>
                  <h3 className="mt-3 text-lg font-bold leading-snug">
                    {blogText(post.title, locale)}
                  </h3>
                  <a
                    href={blogPath(post, locale)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] no-underline"
                  >
                    {zh ? "阅读指南" : "Read guide"}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="home-faq" className="scroll-mt-28">
        <FaqSection locale={locale} items={pageFaqs.home} eyebrow="" />
      </div>

      <section id="enquiry" className="scroll-mt-28 bg-[var(--surface)] py-20 sm:py-24">
        <div className="container-shell grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
          <div className="flex h-full min-w-0 flex-col rounded-lg border border-[var(--brand)]/10 bg-transparent p-7 text-[var(--ink)] sm:p-10">
            <h2 className="text-4xl font-bold tracking-[-.035em] sm:text-5xl">
              {zh ? "说明您的屋顶问题" : "Tell us about your roof issue"}
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              {zh
                ? "请提供 suburb 或邮编、屋顶材料、可见问题和现场通道信息。我们会先核对是否适合承接，再说明下一步。"
                : "Share the suburb or postcode, roof material, visible issue and access details. We will check service fit before explaining the next step."}
            </p>
            <div className="mt-7 grid gap-3 text-sm text-[var(--ink)]">
              <a
                href={business.phoneHref}
                className="flex items-center gap-3 font-bold no-underline"
              >
                <Phone className="h-5 w-5 text-[var(--brand)]" />
                {business.displayPhone}
              </a>
              <a
                href={business.emailHref}
                className="flex min-w-0 items-center gap-3 font-bold no-underline"
              >
                <Mail className="h-5 w-5 shrink-0 text-[var(--brand)]" />
                <span className="break-all">{business.email}</span>
              </a>
            </div>
            <div className="mt-6">
              <SocialIcons locale={locale} tone="light" />
            </div>
            <p className="mt-6 text-xs leading-6 text-[var(--muted)]">
              {zh
                ? "地图仅用于悉尼范围的位置语境，不表示可到访门店，也不代表所有 suburb 均已确认承接。"
                : "The map provides Sydney-wide location context only. It does not show a walk-in office or confirm service in every suburb."}
            </p>
            <div className="mt-5 min-h-[310px] flex-1 overflow-hidden rounded-lg border border-[var(--brand)]/12 bg-[var(--border)] shadow-sm">
              <iframe
                title={
                  zh
                    ? "悉尼屋顶维修咨询位置语境地图"
                    : "Sydney roof repair enquiry location context map"
                }
                src="https://www.google.com/maps?q=Sydney%2C%20NSW&z=10&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full min-h-[310px] w-full border-0"
              />
            </div>
          </div>
          <div className="rounded-lg border border-[var(--brand)]/10 bg-white p-6 shadow-sm md:p-10">
            <EnquiryForm locale={locale} compact />
          </div>
        </div>
      </section>
      <ContactStrip locale={locale} showEyebrow={false} />
    </SiteLayout>
  );
}

export function ServicesIndexPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const alternate = locale === "zh" ? "/services" : "/zh-hans/services";
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <ContentPageHero
        variant="services"
        title={zh ? "屋顶维修服务" : "Our roof repair services"}
        actions={[
          {
            href: localizedPath(locale, "/contact"),
            label: zh ? "提交评估需求" : "Request an assessment",
          },
          {
            href: business.phoneHref,
            label: zh ? `致电 ${business.displayPhone}` : "Call us",
            kind: "secondary",
          },
        ]}
      />
      <section id="service-list" className="scroll-mt-32 py-24">
        <div className="container-shell">
          <ServiceCards locale={locale} />
        </div>
      </section>
      <section id="service-guidance" className="scroll-mt-32 bg-[var(--surface)] py-20">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <SectionIntro
            eyebrow={zh ? "咨询前需要确认" : "BEFORE YOU BOOK"}
            title={
              zh
                ? "先说明现场情况，再确认是否适合承接。"
                : "Share the site details before service fit is confirmed."
            }
          />
          <div>
            <p className="text-lg leading-8 text-[var(--muted)]">{commonCopy[locale].fitNote}</p>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              {commonCopy[locale].costNote}
            </p>
          </div>
        </div>
      </section>
      <div id="services-faq" className="scroll-mt-32">
        <FaqSection locale={locale} items={pageFaqs.services} muted />
      </div>
      <ContactStrip locale={locale} />
    </SiteLayout>
  );
}

export function ServiceDetailPage({ locale, service }: { locale: Locale; service: RoofService }) {
  const zh = locale === "zh";
  const englishPath = servicePath(service, "en");
  const chinesePath = servicePath(service, "zh");
  const alternate = locale === "zh" ? englishPath : chinesePath;
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <section className="overflow-hidden bg-[var(--ink)] text-white roof-grid">
        <div className="container-shell grid min-h-[680px] gap-12 py-12 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:py-16">
          <div className="min-w-0">
            <p className="eyebrow !text-[var(--accent-pale)]">
              {zh ? "悉尼屋顶维修服务" : "SYDNEY ROOF REPAIR SERVICE"}
            </p>
            <h1 className="section-title mt-5">{serviceText(service.title, locale)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {serviceText(service.intro, locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                {ui[locale].call} {business.displayPhone}
              </a>
              <a href={contactPath(service, locale)} className="btn-secondary">
                {ui[locale].enquire}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-sm font-bold text-white/82">
              <a
                href={evidencePath(service, locale)}
                className="inline-flex items-center gap-2 no-underline"
              >
                <Images className="h-4 w-4 text-[var(--accent-pale)]" />
                {zh ? "核对相关屋面照片" : "Review related roof photos"}
              </a>
              <a
                href="#service-faq"
                onClick={(event) => scrollToPageSection(event, "service-faq")}
                className="inline-flex items-center gap-2 no-underline"
              >
                <ShieldCheck className="h-4 w-4 text-[var(--accent-pale)]" />
                {zh ? "阅读本服务FAQ" : "Read this service FAQ"}
              </a>
            </div>
          </div>
          <figure className="relative min-h-[450px] overflow-hidden rounded-[2.5rem] border border-white/12 lg:min-h-[560px]">
            <img
              src={service.image}
              alt={serviceText(service.imageAlt, locale)}
              width="1080"
              height="1440"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-lg bg-[var(--ink)]/88 px-4 py-3 text-xs leading-5 text-white/75">
              {commonCopy[locale].mediaDisclosure}
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="visible-signs" className="scroll-mt-40 bg-[var(--surface)] py-20 lg:py-24">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{zh ? "常见可见信号" : "VISIBLE SIGNS TO REPORT"}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              {zh ? "描述现象，不必自行诊断。" : "Describe the symptom; do not self-diagnose."}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
              {zh
                ? "以下情况用于帮助说明咨询，并不单独证明原因或最终维修方式。"
                : "Use these observations to explain the enquiry; none confirms the cause or final repair method by itself."}
            </p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {service.signs[locale].map((sign) => (
              <li
                key={sign}
                className="service-sign-card group flex min-h-44 flex-col rounded-[1.4rem] border border-[var(--brand)]/12 bg-white p-6 shadow-sm last:md:col-span-2 last:xl:col-span-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--accent-pale)] text-[var(--brand)] transition-colors group-hover:bg-[var(--accent-pale)]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="mt-6 block text-[10px] font-bold uppercase tracking-[.14em] text-[var(--brand)]">
                  {zh ? "可见情况" : "VISIBLE CONDITION"}
                </span>
                <span className="mt-2 block text-sm font-bold leading-6 text-[var(--ink)]">
                  {sign}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-4 rounded-[1.4rem] bg-[var(--brand)] px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div className="flex min-w-0 gap-4">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent-pale)]" />
              <div>
                <p className="font-bold">
                  {zh
                    ? "这些信号用于说明咨询，不是远程诊断。"
                    : "These signs support an enquiry, not a remote diagnosis."}
                </p>
                <p className="mt-1 text-sm leading-6 text-white/68">
                  {zh
                    ? "原因、维修范围与施工方式仍需结合屋顶情况进一步确认。"
                    : "The cause, repair scope and method still depend on further roof assessment."}
                </p>
              </div>
            </div>
            <a
              href="#assessment-details"
              onClick={(event) => scrollToPageSection(event, "assessment-details")}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/18 px-4 py-2 text-sm font-bold text-white no-underline transition hover:border-[var(--accent-pale)] hover:text-[var(--accent-pale)] sm:self-center"
            >
              {zh ? "查看评估信息" : "See assessment details"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      <section id="assessment-details" className="scroll-mt-40 bg-[var(--surface)] py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="min-w-0">
            <SectionIntro
              eyebrow={zh ? "评估信息" : "USEFUL ASSESSMENT DETAILS"}
              title={zh ? "什么信息有助于确认下一步？" : "What helps confirm the next step?"}
            />
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {serviceText(service.assessment, locale)}
            </p>
            <div className="mt-8 rounded-lg border border-[var(--brand)]/12 bg-white/70 p-6">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[var(--brand)]">
                {zh ? "安全资料边界" : "SAFE INFORMATION BOUNDARY"}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {zh
                  ? "请只提供能从地面、室内或其他安全位置获得的资料；不要为拍照攀爬屋顶。"
                  : "Only share details available from the ground, inside the property or another safe position. Do not climb onto the roof for photos."}
              </p>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="border-b border-[var(--brand)]/10 bg-[var(--brand)] px-7 py-5 text-white">
              <p className="text-xs font-bold tracking-[.14em] text-[var(--accent-pale)]">
                {zh ? "确认路径" : "CONFIRMATION PATH"}
              </p>
            </div>
            <ol className="grid gap-5">
              {service.process[locale].map((step, index) => (
                <li
                  key={step}
                  className="mx-7 flex gap-4 border-b border-[var(--brand)]/10 py-5 last:border-0"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-sm font-bold text-[var(--accent-pale)]">
                    {index + 1}
                  </span>
                  <p className="pt-2 font-bold">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <FaqSection
        locale={locale}
        items={service.faq}
        title={zh ? "这项服务的常见问题" : "Common questions about this service"}
        eyebrow={
          zh
            ? `${serviceText(service.shortTitle, locale)} FAQ`
            : `${serviceText(service.shortTitle, locale)} FAQ`
        }
        sectionId="service-faq"
      />
      <section className="bg-[var(--brand)] py-20 text-white">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow !text-[var(--accent-pale)]">
                {zh ? "影响报价的因素" : "WHAT AFFECTS THE QUOTE"}
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                {zh ? "范围确认后，价格才有依据。" : "Price needs a confirmed scope."}
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/72">{commonCopy[locale].costNote}</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
            {[
              zh ? "可见问题" : "Visible issue",
              zh ? "屋顶材料" : "Roof material",
              zh ? "受影响范围" : "Affected area",
              zh ? "安全通道" : "Safe access",
              zh ? "维修方法" : "Repair method",
            ].map((factor) => (
              <div key={factor} className="bg-[var(--brand)] px-5 py-6">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent-pale)]" />
                <p className="mt-3 text-sm font-bold">{factor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container-shell">
          <SectionIntro
            eyebrow={zh ? "相关服务" : "RELATED ROOF SERVICES"}
            title={
              zh
                ? "如果问题涉及相邻构件，也可查看这些路径"
                : "If adjoining components are involved, review these paths"
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((item) => item.id !== service.id)
              .map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-[var(--brand)]/15 bg-white p-6"
                >
                  <h3 className="font-bold">{serviceText(item.shortTitle, locale)}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {serviceText(item.summary, locale)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm font-bold text-[var(--brand)]">
                    <a
                      href={servicePath(item, locale)}
                      className="inline-flex items-center gap-1 no-underline"
                    >
                      {zh ? "服务详情" : "Service details"} <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={evidencePath(item, locale)}
                      className="inline-flex items-center gap-1 no-underline"
                    >
                      {zh ? "相关照片" : "Related photos"} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
      <ContactStrip locale={locale} contactHref={contactPath(service, locale)} />
    </SiteLayout>
  );
}

function ProjectGallery({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<{ projectIndex: number; imageIndex: number } | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const closeLightbox = () => {
    setActive(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  const moveImage = (delta: number) => {
    setActive((current) => {
      if (!current) return current;
      const count = projects[current.projectIndex].images.length;
      return {
        ...current,
        imageIndex: (current.imageIndex + delta + count) % count,
      };
    });
  };

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        requestAnimationFrame(() => openerRef.current?.focus());
      }
      if (event.key === "ArrowLeft") moveImage(-1);
      if (event.key === "ArrowRight") moveImage(1);
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href]"),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  const activeProject = active ? projects[active.projectIndex] : null;
  const activeImage = activeProject && active ? activeProject.images[active.imageIndex] : null;

  return (
    <>
      {projects.map((project, projectIndex) => {
        const relatedServices = services.filter((service) =>
          project.serviceIds.includes(service.id),
        );
        const imageGrid =
          project.images.length <= 4
            ? "md:grid-cols-2 lg:grid-rows-2"
            : "md:grid-cols-3 lg:grid-rows-2";
        return (
          <article id={project.id} key={project.id} className="card scroll-mt-28 overflow-hidden">
            <div className="relative grid lg:grid-cols-[.82fr_1.18fr] lg:items-stretch">
              <div className="p-7 md:p-9 lg:p-10">
                <p className="eyebrow">
                  {locale === "zh" ? "可见屋面细节" : "VISIBLE ROOF DETAILS"}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  {projectText(project.title, locale)}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {projectText(project.summary, locale)}
                </p>
                <h3 className="mt-7 text-sm font-bold uppercase tracking-[.12em] text-[var(--brand)]">
                  {locale === "zh" ? "画面可以看见" : "What is visible"}
                </h3>
                <ul className="mt-4 grid gap-2.5 text-sm">
                  {project.visibleDetails[locale].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-[var(--brand)]/10 bg-[var(--surface)] px-3.5 py-3 leading-5"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-lg bg-[var(--accent-pale)] p-5">
                  <h3 className="text-sm font-bold">
                    {locale === "zh" ? "咨询时怎么用" : "Helpful for your enquiry"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {projectText(project.enquiryUse, locale)}
                  </p>
                </div>
                <div className="mt-4 rounded-lg border border-[var(--brand)]/20 bg-[var(--surface)] p-5">
                  <h3 className="text-sm font-bold">
                    {locale === "zh" ? "仍需现场或进一步确认" : "Still needs confirmation"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {projectText(project.limitation, locale)}
                  </p>
                </div>
                <div className="project-actions mt-6 border-t border-[var(--brand)]/10 pt-6">
                  <div className="flex flex-wrap gap-3">
                    {relatedServices.map((service) => (
                      <a
                        key={service.id}
                        href={servicePath(service, locale)}
                        className="rounded-full border border-[var(--brand)]/20 px-4 py-2 text-xs font-bold no-underline"
                      >
                        {serviceText(service.shortTitle, locale)}
                      </a>
                    ))}
                  </div>
                  {relatedServices[0] ? (
                    <a
                      href={contactPath(relatedServices[0], locale)}
                      className="btn-primary mt-5 w-full justify-center"
                    >
                      {locale === "zh" ? "按此屋面部位提交咨询" : "Enquire about this roof area"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
              <div
                className={`grid grid-cols-1 gap-3 bg-[var(--brand)] p-3 lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-[59%] ${imageGrid}`}
              >
                {project.images.map((image, index) => {
                  const alt = projectText(image.alt, locale);
                  const label = projectText(image.label, locale);
                  const caption = projectText(image.caption, locale);
                  const wideFirst =
                    (project.images.length === 3 || project.images.length === 5) && index === 0;
                  return (
                    <figure
                      key={image.src}
                      className={`flex min-h-0 flex-col overflow-hidden rounded-lg bg-white ${wideFirst ? "md:col-span-2" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={(event) => {
                          openerRef.current = event.currentTarget;
                          setActive({ projectIndex, imageIndex: index });
                        }}
                        className="group relative block aspect-[4/3] w-full overflow-hidden bg-[var(--border)] text-left lg:min-h-0 lg:flex-1 lg:aspect-auto"
                        aria-label={`${locale === "zh" ? "放大查看" : "Open larger image"}: ${label}`}
                      >
                        <img
                          src={image.src}
                          alt={alt}
                          width="1080"
                          height="1440"
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                        />
                        <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-pale)] text-[var(--ink)] shadow">
                          <Images className="h-4 w-4" />
                        </span>
                      </button>
                      <figcaption className="p-4">
                        <span className="block text-xs font-bold uppercase tracking-[.1em] text-[var(--brand)]">
                          {label}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">
                          {caption}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
      {activeProject && activeImage && active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={projectText(activeProject.title, locale)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--ink)]/95 p-3 sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-[var(--ink)] shadow"
            aria-label={locale === "zh" ? "关闭大图" : "Close larger image"}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="grid max-h-[94dvh] w-full max-w-6xl grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-lg bg-[var(--ink)] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative grid min-h-0 place-items-center p-3 sm:p-6">
              <img
                src={activeImage.src}
                alt={projectText(activeImage.alt, locale)}
                className="max-h-[68dvh] max-w-full rounded-lg object-contain"
              />
              {activeProject.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => moveImage(-1)}
                    className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--ink)] shadow"
                    aria-label={locale === "zh" ? "上一张图片" : "Previous image"}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(1)}
                    className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--ink)] shadow"
                    aria-label={locale === "zh" ? "下一张图片" : "Next image"}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              ) : null}
            </div>
            <div className="border-t border-white/10 bg-[var(--ink)] px-5 py-4 text-white sm:px-8">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
                <div className="flex flex-col items-center">
                  <p className="font-bold">{projectText(activeImage.label, locale)}</p>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-white/70">
                    {projectText(activeImage.caption, locale)}
                  </p>
                </div>
                {activeProject.images.length > 1 ? (
                  <p
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold"
                    aria-live="polite"
                  >
                    {locale === "zh"
                      ? `第 ${active.imageIndex + 1} 张，共 ${activeProject.images.length} 张`
                      : `Image ${active.imageIndex + 1} of ${activeProject.images.length}`}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const alternate = locale === "zh" ? "/projects" : "/zh-hans/projects";
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <ContentPageHero
        variant="projects"
        eyebrow={zh ? "屋顶现场照片" : "ROOF AREA PHOTOS"}
        title={zh ? "按屋面部位查看可见细节" : "Review visible roof details by component"}
        intro={`${commonCopy[locale].mediaDisclosure} ${zh ? "点击任意图片可放大查看。" : "Open any image to inspect it at a larger size."}`}
      />
      <section id="project-groups" className="scroll-mt-32 py-24">
        <div className="container-shell grid gap-8">
          <ProjectGallery locale={locale} />
        </div>
      </section>
      <div id="projects-faq" className="scroll-mt-32">
        <FaqSection locale={locale} items={pageFaqs.projects} muted />
      </div>
      <ContactStrip locale={locale} />
    </SiteLayout>
  );
}

export function AreasPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const alternate = locale === "zh" ? "/areas" : "/zh-hans/areas";
  const areaGroups = [
    "Artarmon",
    "Chatswood",
    "Inner West Sydney",
    "Newtown",
    "Marrickville",
    "Mosman",
    "Killara",
    "Lindfield",
    "Lower North Shore",
    "Roseville",
    "Willoughby",
    "Lane Cove",
    "Castle Cove",
    "St Ives",
    "Gordon",
    "Middle Cove",
    "Turramurra",
    "Naremburn",
    "Crows Nest",
    "Castlecrag",
    "Cremorne",
    "Lane Cove North",
    "Killara East",
    "East Lindfield",
    "Roseville Chase",
    "Willoughby North",
    "St Peters",
    "Northbridge",
    "Cammeray",
    "Annandale",
    "Balgowlah",
    "Brookvale",
    "Chatswood East",
    "Chatswood West",
    "Clontarf",
    "Cremorne Point",
    "Curl Curl",
    "Dee Why",
    "Drummoyne",
    "Dulwich Hill",
    "East Killara",
    "Forestville",
    "Frenchs Forest",
    "Freshwater",
    "Greenwich",
    "Killarney Heights",
    "Kurraba Point",
    "Lane Cove East",
    "Lane Cove West",
    "Lewisham",
    "Leichhardt",
    "Longueville",
    "Macquarie Park",
    "Manly",
    "Neutral Bay",
    "North Balgowlah",
    "North Curl Curl",
    "North Ryde",
    "North Sydney",
    "Northwood",
    "Riverview",
    "Ryde",
    "Seaforth",
    "South Turramurra",
    "St Leonards",
    "Stanmore",
    "Wahroonga",
    "Waverton",
    "Willoughby East",
    zh ? "Wollstonecraft 及其他地区" : "Wollstonecraft and more.",
  ];
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <ContentPageHero
        variant="areas"
        eyebrow={zh ? "悉尼屋顶维修咨询区域" : "SYDNEY ROOF REPAIR ENQUIRY AREAS"}
        title={
          zh
            ? "先定位房屋，再确认屋顶维修是否适合承接"
            : "Locate the property, then confirm roof repair service fit"
        }
        intro={
          zh
            ? "我们接收悉尼屋顶维修咨询。请提供 suburb 或邮编、屋顶材料、房屋高度和通道信息；实际承接范围与可用性会根据每次咨询确认。"
            : "We receive Sydney roof repair enquiries. Share the suburb or postcode, roof material, property height and access details; actual service fit and availability are confirmed for each enquiry."
        }
      />

      <section id="area-map" className="scroll-mt-32 bg-white py-16 sm:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">{zh ? "悉尼位置语境" : "SYDNEY LOCATION CONTEXT"}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {zh ? "先在悉尼范围内定位房屋" : "Locate the property within Sydney first"}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
              {zh
                ? "地图只提供悉尼范围的位置语境，不显示可到访门店，也不代表每个 suburb 已确认承接。"
                : "This map provides Sydney-wide location context only. It does not show a walk-in office or confirm service in every suburb."}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-[var(--brand)]/12 bg-[var(--border)] shadow-sm">
            <iframe
              title={
                zh
                  ? "悉尼屋顶维修咨询位置语境地图"
                  : "Sydney roof repair enquiry location context map"
              }
              src="https://www.google.com/maps?q=Sydney%2C%20NSW&z=10&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[360px] w-full border-0 sm:h-[430px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      <section id="confirm-fit" className="scroll-mt-32 bg-[var(--surface)] py-24">
        <div className="container-shell">
          <div id="area-groups" className="scroll-mt-32 text-center">
            <p className="eyebrow">{zh ? "承接区域" : "AREAS WE SERVICE"}</p>
            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              {zh ? "悉尼屋顶维修服务区域" : "Roof repair service areas across Sydney"}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">
              {zh
                ? "我们接收 Lower North Shore、Inner West 及下列悉尼地区的屋顶维修咨询。请提供准确 suburb 或邮编，以确认当前可用性与现场条件。"
                : "We receive roof repair enquiries across the Lower North Shore, Inner West and the Sydney areas listed below. Include the exact suburb or postcode so current availability and site conditions can be confirmed."}
            </p>
            <div className="mx-auto mt-9 flex max-w-6xl flex-wrap justify-center gap-2.5 rounded-lg border border-[var(--border)]/45 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
              {areaGroups.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-bold leading-none text-[var(--brand)]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-20 border-t border-[var(--brand)]/12 pt-20">
            <SectionIntro
              eyebrow={zh ? "承接核对" : "SERVICE-FIT CHECK"}
              title={
                zh
                  ? "位置不是唯一条件，四项信息一起决定下一步"
                  : "Location is not the only factor: four details shape the next step"
              }
              body={
                zh
                  ? "准确位置需要与可见问题、物业情况和安全通道一起说明，才能确认是否适合继续安排。"
                  : "The exact location needs to be considered with the visible issue, property details and safe access before the next step can be confirmed."
              }
            />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              [
                MapPin,
                zh ? "位置" : "Location",
                zh
                  ? "suburb 或邮编，以及是否属于外圈区域。"
                  : "Suburb or postcode, including whether the property is outer-metro.",
              ],
              [
                Search,
                zh ? "问题" : "Roof issue",
                zh
                  ? "可见症状、出现时间和受影响部位。"
                  : "Visible symptom, when it appears and the affected roof area.",
              ],
              [
                ClipboardCheck,
                zh ? "物业" : "Property",
                zh
                  ? "屋顶材料、房屋类型和楼层高度。"
                  : "Roof material, property type and storey height.",
              ],
              [
                ShieldCheck,
                zh ? "通道" : "Access",
                zh
                  ? "停车、侧边通道及其他安全限制。"
                  : "Parking, side access and any other safety constraints.",
              ],
            ].map(([Icon, title, body]) => {
              const AreaIcon = Icon as typeof MapPin;
              return (
                <article key={String(title)} className="card p-7">
                  <AreaIcon className="h-6 w-6 text-[var(--brand)]" />
                  <h2 className="mt-5 text-xl font-bold">{String(title)}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{String(body)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="area-services" className="scroll-mt-32 py-24">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro
              eyebrow={zh ? "服务与地点一起核对" : "MATCH THE SERVICE AND LOCATION"}
              title={
                zh
                  ? "说明屋顶问题，再核对所在区域"
                  : "Name the roof issue, then confirm the location"
              }
              body={
                zh
                  ? "选择最接近的服务详情页，查看需准备的照片和信息；提交咨询时带上 suburb 或邮编。"
                  : "Open the closest service page to see which photos and details help, then include the suburb or postcode in the enquiry."
              }
            />
            <a href={localizedPath(locale, "/services")} className="btn-secondary shrink-0">
              {ui[locale].allServices}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="card p-6">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--brand)]">
                  {zh ? "悉尼咨询" : "SYDNEY ENQUIRY"}
                </p>
                <h3 className="mt-3 text-xl font-bold">
                  {serviceText(service.shortTitle, locale)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {serviceText(service.summary, locale)}
                </p>
                <a
                  href={servicePath(service, locale)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] no-underline"
                >
                  {zh ? "查看服务与准备信息" : "View service and preparation details"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand)] py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow !text-[var(--accent-pale)]">
              {zh ? "提交前准备" : "BEFORE YOU SEND THE ENQUIRY"}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              {zh
                ? "一条清楚的位置说明，比猜测覆盖范围更快。"
                : "A clear location note is more useful than guessing the coverage area."}
            </h2>
          </div>
          <div className="rounded-lg border border-white/12 bg-white/6 p-7">
            <ul className="grid gap-4 text-sm font-bold leading-6 text-white/78 sm:grid-cols-2">
              {(zh
                ? [
                    "suburb 或邮编",
                    "屋顶材料与楼层高度",
                    "可见问题及出现时间",
                    "停车、侧边通道或安全限制",
                  ]
                : [
                    "Suburb or postcode",
                    "Roof material and storey height",
                    "Visible issue and timing",
                    "Parking, side access or safety limits",
                  ]
              ).map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-pale)]" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={localizedPath(locale, "/contact")} className="btn-primary mt-7">
              {zh ? "提交区域与屋顶信息" : "Send the location and roof details"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <div id="area-faq" className="scroll-mt-32">
        <FaqSection locale={locale} items={pageFaqs.areas} />
      </div>
      <ContactStrip locale={locale} />
    </SiteLayout>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const alternate = locale === "zh" ? "/about" : "/zh-hans/about";
  const abnActiveFrom = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${business.abnRecord.activeFrom}T00:00:00+11:00`));
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <ContentPageHero
        variant="about"
        eyebrow={zh ? "关于 ELLIS SERVICES" : "ABOUT ELLIS SERVICES"}
        title={
          zh
            ? "把屋顶维修咨询做成清晰、可核对的下一步"
            : "A clear, checkable next step for roof repair enquiries"
        }
        intro={
          zh
            ? "Ellis Services 接收悉尼屋顶维修咨询。我们先了解可见问题、屋顶材料、现场通道和所在区域，再说明是否适合承接及下一步。"
            : "Ellis Services receives Sydney roof repair enquiries. We start with the visible issue, roof material, site access and suburb, then explain service fit and the next step."
        }
      />
      <section id="company-record" className="scroll-mt-32 py-24">
        <div className="container-shell">
          <SectionIntro
            eyebrow={zh ? "企业登记与咨询方法" : "COMPANY RECORD AND ENQUIRY METHOD"}
            title={
              zh
                ? "先核对企业主体，再从具体屋顶问题开始"
                : "Check the company record, then start with the roof issue"
            }
            body={
              zh
                ? "以下企业资料来自 Australian Business Register 官方记录；右侧说明每次咨询如何从可见信息进入下一步。ABN 生效日期不代表屋顶维修经验年限。"
                : "The company details below are checked against the Australian Business Register. The enquiry method beside them explains how visible information leads to the next step. The ABN active date is not presented as roofing experience."
            }
          />
          <div className="mt-12 grid items-stretch overflow-hidden rounded-lg border border-[var(--brand)]/12 shadow-sm lg:grid-cols-2">
            <article className="h-full bg-white p-7 sm:p-10 lg:p-12">
              <FileText className="h-8 w-8 text-[var(--brand)]" />
              <h2 className="mt-6 text-3xl font-bold">
                {zh ? "官方企业登记" : "Registered company record"}
              </h2>
              <dl className="mt-8 border-t border-[var(--brand)]/12">
                {[
                  [zh ? "公开品牌" : "Public brand", business.businessName],
                  [zh ? "法律主体" : "Legal entity", business.legalName],
                  ["ABN", business.abn],
                  [
                    zh ? "ABN 状态" : "ABN status",
                    zh
                      ? `Active，自 ${abnActiveFrom} 起`
                      : `${business.abnRecord.status} from ${abnActiveFrom}`,
                  ],
                  [zh ? "实体类型" : "Entity type", business.abnRecord.entityType],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 border-b border-[var(--brand)]/12 py-4 sm:grid-cols-[9rem_1fr]"
                  >
                    <dt className="text-sm font-bold text-[var(--muted)]">{label}</dt>
                    <dd className="font-bold text-[var(--brand)]">{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={business.abnRecord.url}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] no-underline"
              >
                <Building2 className="h-4 w-4" />
                {zh ? "在 ABR 官网核对企业记录" : "Check the official ABR record"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
            <article className="h-full bg-[var(--brand)] p-7 text-white sm:p-10 lg:p-12">
              <p className="eyebrow !text-[var(--accent-pale)]">
                {zh ? "清楚信息先于工作约定" : "CLEAR DETAILS BEFORE WORK IS AGREED"}
              </p>
              <h2 className="mt-5 text-3xl font-bold">
                {zh ? "三步形成有用的下一步" : "Three steps shape a useful next step"}
              </h2>
              <div className="mt-8 border-t border-white/14">
                {[
                  [
                    "01",
                    zh ? "从问题开始" : "Start with the issue",
                    zh
                      ? "说明可见症状、屋顶材料、所在区域和安全可得的照片。"
                      : "Describe the visible symptom, roof material, suburb and any photos you can take safely.",
                  ],
                  [
                    "02",
                    zh ? "核对承接条件" : "Check service fit",
                    zh
                      ? "结合屋面部位、建筑高度、现场通道和所需工作确认适配。"
                      : "Check the roof area, building height, site access and the work being discussed.",
                  ],
                  [
                    "03",
                    zh ? "确认再约定" : "Confirm before agreement",
                    zh
                      ? "范围、通道、任何适用要求和下一步在工作约定前说明。"
                      : "Clarify scope, access, any applicable requirements and the next step before work is agreed.",
                  ],
                ].map(([number, title, body]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-white/14 py-6"
                  >
                    <span className="text-sm font-bold text-[var(--accent-pale)]">{number}</span>
                    <span>
                      <strong className="block text-lg">{title}</strong>
                      <span className="mt-2 block text-sm leading-6 text-white/68">{body}</span>
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
      <section id="visit-note" className="scroll-mt-32 bg-[var(--brand)] py-20 text-white">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-[var(--accent-pale)]">
              {zh ? "到访前请确认" : "CONFIRM BEFORE VISITING"}
            </p>
            <h2 className="mt-4 text-4xl font-bold">{business.address.formatted}</h2>
          </div>
          <p className="text-lg leading-8 text-white/72">
            {zh
              ? "该地址目前仅作联系资料，不表示为可直接到访的办公室、门店或 Google Business Profile 地点。到访、会面或现场安排必须先确认。"
              : business.address.publicTreatment +
                " Visits, meetings and site arrangements must be confirmed first."}
          </p>
        </div>
      </section>
      <div id="about-faq" className="scroll-mt-32">
        <FaqSection locale={locale} items={pageFaqs.about} />
      </div>
      <ContactStrip locale={locale} />
    </SiteLayout>
  );
}

export function ContactPage({
  locale,
  initialServiceId,
}: {
  locale: Locale;
  initialServiceId?: string;
}) {
  const zh = locale === "zh";
  const alternate = locale === "zh" ? "/contact" : "/zh-hans/contact";
  const selectedService = initialServiceId ? serviceBySlug(initialServiceId) : undefined;
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <ContentPageHero
        variant="contact"
        eyebrow={zh ? "联系 ELLIS SERVICES" : "GET IN TOUCH"}
        title={zh ? "有屋顶问题？\n联系我们。" : "Have a roof question?\nContact us."}
        intro={
          zh
            ? "填写下方表单发送屋顶维修咨询；如需直接沟通，也可以拨打电话。"
            : "Use the form below to send a roof repair enquiry, or call us if you would prefer to speak directly."
        }
        actions={[
          { href: "#contact-form", label: zh ? "提交询盘" : "Send an enquiry" },
          {
            href: business.phoneHref,
            label: zh ? `致电 ${business.displayPhone}` : `Call ${business.displayPhone}`,
            kind: "secondary",
          },
        ]}
      />
      <section className="py-24">
        <div
          id="contact-form"
          className="container-shell scroll-mt-32 grid gap-10 lg:grid-cols-[.72fr_1.28fr]"
        >
          <aside className="space-y-4">
            <a
              href={business.phoneHref}
              onClick={() => trackEvent("phone_click", { location: "contact" })}
              className="card flex items-center gap-4 p-6 no-underline"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent-pale)]">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <small className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  {zh ? "电话" : "Phone"}
                </small>
                <strong className="mt-1 block text-lg">{business.displayPhone}</strong>
              </span>
            </a>
            <a
              href={business.emailHref}
              onClick={() => trackEvent("email_click", { location: "contact" })}
              className="card flex items-center gap-4 p-6 no-underline"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent-pale)]">
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <small className="block text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  Email
                </small>
                <strong className="mt-1 block break-all text-sm">{business.email}</strong>
              </span>
            </a>
            <div className="card p-6">
              <MapPin className="h-6 w-6 text-[var(--brand)]" />
              <p className="mt-4 font-bold">{business.address.formatted}</p>
              <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
                {zh
                  ? "仅作联系资料，不表示为可直接到访地点；任何到访或会面需先确认。"
                  : business.address.publicTreatment}
              </p>
            </div>
            <div className="card p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                {zh ? "Ellis Services Group 在线平台" : "Find Ellis Services Group online"}
              </p>
              <SocialIcons locale={locale} tone="light" />
            </div>
          </aside>
          <div className="card p-6 md:p-10">
            {selectedService ? (
              <p className="mb-5 rounded-lg bg-[var(--accent-pale)] px-4 py-3 text-sm font-bold text-[var(--brand)]">
                {zh ? "已选择服务：" : "Selected service: "}
                {serviceText(selectedService.shortTitle, locale)}
              </p>
            ) : null}
            <EnquiryForm locale={locale} defaultService={selectedService?.id} />
          </div>
        </div>
      </section>
      <FaqSection locale={locale} items={pageFaqs.contact} muted />
    </SiteLayout>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const alternate = locale === "zh" ? "/privacy" : "/zh-hans/privacy";
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <article className="container-shell py-20">
        <p className="eyebrow">{zh ? "隐私政策" : "PRIVACY"}</p>
        <h1 className="section-title mt-5">
          {zh ? "隐私与咨询资料处理" : "Privacy and enquiry data handling"}
        </h1>
        <div className="prose-safe mt-10 max-w-4xl">
          <p>
            {zh
              ? "本页面说明 Sydney Roof Repairs 网站如何处理您主动提供的咨询资料。最后更新：2026 年 9 月 21 日。"
              : "This page explains how the Sydney Roof Repairs website handles enquiry information you choose to provide. Last updated 21 September 2026."}
          </p>
          <h2>{zh ? "我们收集什么" : "What we collect"}</h2>
          <p>
            {zh
              ? "咨询表单可能收集姓名、电话、电子邮箱、suburb 或邮编、服务类别、问题说明、来源页面和技术请求编号。电话或邮件沟通中，您也可能主动提供照片和其他房屋信息。"
              : "The enquiry form may collect your name, phone, email, suburb or postcode, service category, issue description, source page and a technical request reference. You may also choose to provide photos and property information by phone or email."}
          </p>
          <h2>{zh ? "使用目的" : "Why it is used"}</h2>
          <p>
            {zh
              ? "这些资料仅用于回复咨询、确认承接范围和安排下一步。表单只有在投递服务明确接受消息后才会显示成功；投递失败时会提示您改用电话或邮件。"
              : "These details are used to respond to the enquiry, confirm service fit and arrange the next step. The form shows success only after the delivery provider accepts the message; if delivery fails, it asks you to use phone or email instead."}
          </p>
          <h2>{zh ? "服务提供商与日志" : "Providers and logs"}</h2>
          <p>
            {zh
              ? "本网站由 Vercel 托管，并使用 Resend 投递在线咨询邮件。托管与邮件服务商可能处理表单内容、请求元数据和投递状态，并保存安全、投递和故障排查所需的最小日志。"
              : "This website is hosted by Vercel and uses Resend to deliver online enquiry emails. Hosting and email providers may process form contents, request metadata and delivery status, and retain minimal logs needed for security, delivery and troubleshooting."}
          </p>
          <h2>{zh ? "分析" : "Analytics"}</h2>
          <div data-ga4-notice className="space-y-4">
            <p>
              {zh
                ? "Google Analytics 4 默认关闭。只有你另外明确允许后，才会载入 Google 的分析程式，统计页面浏览、电话或邮件按钮点击、咨询表单开始、发送尝试、发送失败，以及邮件服务商已接受的咨询。按钮点击不代表电话接通；服务商接受也不代表邮件送达、工作成交或收入。"
                : "Google Analytics 4 is off by default. Only after your separate permission will Google's analytics code load to measure page visits, phone or email button clicks, enquiry form starts, submission attempts, submission errors and enquiries accepted by the email provider. A button click does not establish a connected call; provider acceptance does not establish email delivery, a booked job or revenue."}
            </p>
            <p>
              {zh
                ? "我们不会向 Google Analytics 发送表单内容、姓名、电话、电子邮箱或咨询编号。分析事件只使用固定的公开页面名称、去除查询参数和片段的网址、语言及有限的互动类别；来路只保留网站来源。Google Signals、用户提供的数据收集、广告个人化及自动增强型衡量均关闭。"
                : "We do not send form contents, names, phone numbers, email addresses or enquiry references to Google Analytics. Events use fixed public page names, page URLs without query parameters or fragments, language and limited interaction categories; referrers retain only their origin. Google Signals, user-provided data collection, ad personalization and automatic Enhanced Measurement are off."}
            </p>
            <p>
              {zh
                ? "GA4 选择与 Clarity 分开。你可以在页底的 Google Analytics 分析偏好中允许或关闭 GA4；拒绝不影响浏览或联系。撤回会停用这项分析并清除它的分析 cookie，不重新载入页面或丢失未发送的咨询内容，也不改变 Clarity 或网站所需的其他 cookie。浏览器 DNT/GPC 信号会使 GA4 保持关闭。"
                : "Your GA4 choice is separate from Clarity. Allow or turn off GA4 using Google Analytics preferences at the bottom of the page; refusing does not affect browsing or contacting us. Withdrawal disables this analytics stream and clears its analytics cookies without reloading the page, losing an unfinished enquiry or changing Clarity and other website cookies. Browser DNT/GPC signals keep GA4 off."}
            </p>
            <p>
              <a href="https://policies.google.com/privacy">
                {zh ? "Google 隐私政策" : "Google privacy policy"}
              </a>
            </p>
          </div>
          <ClarityPrivacy locale={locale} />
          <h2>{zh ? "联系我们" : "Contact"}</h2>
          <p>
            {zh
              ? `如需查询或更正您提供的资料，请联系 ${business.email} 或致电 ${business.displayPhone}。`
              : `To ask about or correct information you provided, email ${business.email} or call ${business.displayPhone}.`}
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
