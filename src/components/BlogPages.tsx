import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTree,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import {
  blogCategories,
  blogPath,
  blogPosts,
  blogText,
  formatBlogDate,
  type BlogPost,
} from "@/data/blog";
import { blogEditorial } from "@/data/blog-editorial";
import { localizedPath, type Locale } from "@/data/content";
import type { FaqItem } from "@/data/faqs";
import { services, servicePath, serviceText } from "@/data/services";
import { ContentPageHero } from "./ContentPageHero";
import { FaqSection } from "./FaqSection";
import { ContactStrip, SiteLayout } from "./SiteChrome";

const blogHubFaqs: FaqItem[] = [
  {
    question: {
      en: "Are these guides a roof diagnosis?",
      zh: "这些指南属于屋顶诊断吗？",
    },
    answer: {
      en: "No. The guides help property owners record visible information and prepare an enquiry. The cause, safe access, service fit and repair scope still need confirmation for the actual property.",
      zh: "不是。这些指南用于帮助房屋业主记录可见信息并准备咨询；实际房屋的原因、安全通道、承接适配和维修范围仍需确认。",
    },
  },
  {
    question: {
      en: "Why are all current articles dated September 2026?",
      zh: "为什么目前文章都标注为 2026 年 9 月？",
    },
    answer: {
      en: "This is the website's first published guide collection. The archive shows the real publication month rather than backdating content to make the library appear older.",
      zh: "这是网站首批发布的指南集合。归档显示真实发布日期，不会通过倒填日期让内容库看起来更早。",
    },
  },
  {
    question: {
      en: "Can I use a guide to choose a service page?",
      zh: "可以根据指南选择服务页面吗？",
    },
    answer: {
      en: "Yes. Each guide links to relevant service paths, but the selection is only an enquiry starting point. Describe all visible symptoms and connected roof components in the form.",
      zh: "可以。每篇指南都会链接相关服务路径，但该选择只是咨询起点；请在表单中说明所有可见症状和相关屋顶构件。",
    },
  },
];

function BlogSidebar({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const publishedDate = blogPosts[0]?.published;
  const collectionLinks = blogPosts.slice(1, 5);
  return (
    <aside className="grid self-start gap-5 lg:sticky lg:top-32">
      <div className="overflow-hidden rounded-lg bg-[var(--brand)] text-white shadow-sm">
        <div className="border-b border-white/12 p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-[var(--accent-pale)]" />
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--accent-pale)]">
              {zh ? "首期指南合集" : "FIRST GUIDE COLLECTION"}
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-tight">
            {publishedDate ? formatBlogDate(publishedDate, locale) : ""}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/68">
            {zh
              ? "同日发布的完整首期合集，按屋顶问题而不是虚构月份分组。"
              : "A complete first collection released together and organised by roof concern, not artificial archive months."}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px bg-white/12">
          <div className="bg-[var(--brand)] p-5">
            <dt className="text-xs font-bold uppercase tracking-[.14em] text-white/55">
              {zh ? "指南" : "Guides"}
            </dt>
            <dd className="mt-2 text-3xl font-bold text-[var(--accent-pale)]">
              {blogPosts.length}
            </dd>
          </div>
          <div className="bg-[var(--brand)] p-5">
            <dt className="text-xs font-bold uppercase tracking-[.14em] text-white/55">
              {zh ? "主题" : "Topics"}
            </dt>
            <dd className="mt-2 text-3xl font-bold text-[var(--accent-pale)]">
              {blogCategories.length}
            </dd>
          </div>
        </dl>
        <div className="p-6">
          <p className="text-sm font-bold">{zh ? "按问题浏览" : "Browse by concern"}</p>
          <ul className="mt-4 grid gap-3 text-sm">
            {blogCategories.map((category) => {
              const count = blogPosts.filter((post) => post.category.en === category.en).length;
              return (
                <li
                  key={category.en}
                  className="flex items-start justify-between gap-4 border-b border-white/12 pb-3 last:border-0 last:pb-0"
                >
                  <span className="leading-5 text-white/74">{blogText(category, locale)}</span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-[var(--accent-pale)]">
                    {count}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="rounded-lg border border-[var(--brand)]/12 bg-white p-6">
        <div className="flex items-center gap-3">
          <ListTree className="h-5 w-5 text-[var(--brand)]" />
          <h2 className="text-lg font-bold">
            {zh ? "继续阅读" : "Continue through the collection"}
          </h2>
        </div>
        <ol className="mt-5 grid gap-4">
          {collectionLinks.map((post, index) => (
            <li key={post.slug} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
              <span className="text-xs font-bold text-[var(--brand)]">
                {String(index + 2).padStart(2, "0")}
              </span>
              <a
                href={blogPath(post, locale)}
                className="text-sm font-bold leading-5 text-[var(--brand)] no-underline hover:text-[var(--brand)]"
              >
                {blogText(post.title, locale)}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

function PostCard({
  post,
  locale,
  featured = false,
}: {
  post: BlogPost;
  locale: Locale;
  featured?: boolean;
}) {
  const zh = locale === "zh";
  const guidePreview = featured ? post.sections.slice(0, 3) : [];
  return (
    <article className="group overflow-hidden rounded-lg border border-[var(--brand)]/12 bg-white shadow-sm">
      {post.image ? (
        <a
          href={blogPath(post, locale)}
          className={`block overflow-hidden no-underline ${featured ? "h-72 sm:h-[26rem]" : ""}`}
        >
          <img
            src={post.image}
            alt={blogText(post.imageAlt, locale)}
            width="1080"
            height="811"
            loading="lazy"
            className={`w-full object-cover transition duration-500 group-hover:scale-[1.025] ${
              featured ? "h-full" : "h-56"
            }`}
          />
        </a>
      ) : null}
      <div className="flex flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-[var(--muted)]">
          <span className="rounded-full bg-[var(--accent-pale)] px-3 py-1 text-[var(--brand)]">
            {blogText(post.category, locale)}
          </span>
          <span>{formatBlogDate(post.published, locale)}</span>
          <span>{zh ? `${post.readingMinutes} 分钟阅读` : `${post.readingMinutes} min read`}</span>
        </div>
        <h2 className={`${featured ? "text-3xl" : "text-2xl"} mt-5 font-bold tracking-tight`}>
          <a href={blogPath(post, locale)} className="no-underline">
            {blogText(post.title, locale)}
          </a>
        </h2>
        <p className={`mt-4 text-sm leading-7 text-[var(--muted)] ${featured ? "" : "flex-1"}`}>
          {blogText(post.summary, locale)}
        </p>
        {featured ? (
          <div className="mt-6 border-t border-[var(--brand)]/10 pt-5">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--brand)]">
              {zh ? "本指南涵盖" : "Inside this guide"}
            </p>
            <ul className="mt-4 grid gap-3 text-sm font-bold leading-5 text-[var(--brand)]">
              {guidePreview.map((section) => (
                <li key={section.heading.en} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                  {blogText(section.heading, locale)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <a
          href={blogPath(post, locale)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] no-underline"
        >
          {zh ? "阅读指南" : "Read the guide"}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const alternate = locale === "zh" ? "/blog" : "/zh-hans/blog";
  const [featured, ...remaining] = blogPosts;
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <ContentPageHero
        variant="guides"
        eyebrow={zh ? "悉尼屋顶维修指南" : "SYDNEY ROOF REPAIR GUIDES"}
        title={
          zh
            ? "用可观察的信息，准备更清楚的屋顶维修咨询"
            : "Use observable details to prepare a clearer roof repair enquiry"
        }
        intro={
          zh
            ? "这些原创指南帮助您记录症状、材料、天气、通道和照片；它们不替代现场确认，也不会仅凭内容给出故障诊断或价格。"
            : "These original guides help you record symptoms, materials, weather, access and photos. They do not replace property-specific confirmation or turn online content into a diagnosis or price."
        }
      />
      <section id="guide-list" className="scroll-mt-32 py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div className="min-w-0">
            <PostCard post={featured} locale={locale} featured />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {remaining.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </div>
          <BlogSidebar locale={locale} />
        </div>
      </section>
      <div id="guide-faq" className="scroll-mt-32">
        <FaqSection
          locale={locale}
          items={blogHubFaqs}
          title={zh ? "关于这些屋顶指南" : "About these roof guides"}
          muted
        />
      </div>
      <ContactStrip locale={locale} />
    </SiteLayout>
  );
}

export function BlogDetailPage({ locale, post }: { locale: Locale; post: BlogPost }) {
  const zh = locale === "zh";
  const englishPath = blogPath(post, "en");
  const chinesePath = blogPath(post, "zh");
  const alternate = locale === "zh" ? englishPath : chinesePath;
  const postIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previous = postIndex > 0 ? blogPosts[postIndex - 1] : undefined;
  const next = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : undefined;
  const relatedServices = services.filter((service) => post.relatedServiceIds.includes(service.id));
  const editorial = blogEditorial[post.slug];
  const firstChecklist = post.sections.flatMap((section) => section.checklist || []).slice(0, 3);
  const guidePoints =
    firstChecklist.length >= 3
      ? firstChecklist
      : post.sections.slice(0, 3).map((section) => section.heading);
  const sectionId = (index: number) => `guide-section-${index + 1}`;
  const articleFaqs: FaqItem[] = [
    ...post.faq,
    {
      question: {
        en: "Can this guide confirm the repair scope for my property?",
        zh: "这篇指南能确认我家屋顶的维修范围吗？",
      },
      answer: {
        en: "No. It helps you organise observable details and choose a starting service path. Access, cause, affected components and the final repair scope still need property-specific confirmation.",
        zh: "不能。指南用于整理可观察信息并选择初步服务路径；安全通道、原因、受影响构件和最终维修范围仍需结合具体房屋确认。",
      },
    },
    {
      question: {
        en: "What should I send with an enquiry after reading this guide?",
        zh: "阅读指南后，提交咨询时应附上什么？",
      },
      answer: {
        en: "Include the suburb or postcode, building height, roof material if known, the visible symptom and when it changes. Add only photos you can take safely and explain anything you could not access.",
        zh: "请提供 suburb 或邮编、建筑高度、已知的屋顶材料、可见症状及变化时间。只附上能安全拍摄的照片，并说明无法接近或确认的部位。",
      },
    },
  ];
  return (
    <SiteLayout locale={locale} alternatePath={alternate}>
      <article>
        <header className="overflow-hidden bg-[var(--ink)] py-16 text-white roof-grid md:py-20">
          <div className="container-shell min-w-0">
            <a
              href={localizedPath(locale, "/blog")}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-pale)] no-underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {zh ? "全部指南" : "All guides"}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold text-white/68">
              <span className="rounded-full bg-[var(--accent-pale)] px-3 py-1 text-[var(--ink)]">
                {blogText(post.category, locale)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatBlogDate(post.published, locale)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {zh ? `${post.readingMinutes} 分钟阅读` : `${post.readingMinutes} min read`}
              </span>
            </div>
            <h1 className="section-title mt-6 max-w-5xl">{blogText(post.title, locale)}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {blogText(post.summary, locale)}
            </p>
          </div>
        </header>
        <div className="container-shell grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_290px] lg:py-20">
          <div className="min-w-0">
            <section className="mb-10 grid min-w-0 overflow-hidden rounded-lg border border-[var(--brand)]/12 bg-white shadow-sm md:grid-cols-[.92fr_1.08fr]">
              <div className="min-w-0 bg-[var(--brand)] p-7 text-white md:p-9">
                <p className="eyebrow !text-[var(--accent-pale)]">
                  {zh ? "指南摘要" : "GUIDE AT A GLANCE"}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  {zh ? "读完后，您应该能整理好这些信息" : "What you should be ready to record"}
                </h2>
                <ul className="mt-6 grid gap-4">
                  {guidePoints.map((point) => (
                    <li key={point.en} className="flex gap-3 text-sm leading-6 text-white/78">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-pale)]" />
                      {blogText(point, locale)}
                    </li>
                  ))}
                </ul>
              </div>
              <nav aria-label={zh ? "文章目录" : "Article contents"} className="min-w-0 p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <ListTree className="h-5 w-5 text-[var(--brand)]" />
                  <h2 className="text-lg font-bold">{zh ? "本文目录" : "In this guide"}</h2>
                </div>
                <ol className="mt-5 grid gap-2 text-sm">
                  {post.sections.map((section, index) => (
                    <li key={section.heading.en}>
                      <a
                        href={`#${sectionId(index)}`}
                        className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-2 rounded-xl px-3 py-2 font-bold no-underline hover:bg-[var(--accent-pale)]"
                      >
                        <span className="text-[var(--brand)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{blogText(section.heading, locale)}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#sydney-context"
                      className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-2 rounded-xl px-3 py-2 font-bold no-underline hover:bg-[var(--accent-pale)]"
                    >
                      <span className="text-[var(--brand)]">
                        {String(post.sections.length + 1).padStart(2, "0")}
                      </span>
                      <span>{zh ? "悉尼住宅语境" : "Sydney property context"}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#when-to-enquire"
                      className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-2 rounded-xl px-3 py-2 font-bold no-underline hover:bg-[var(--accent-pale)]"
                    >
                      <span className="text-[var(--brand)]">
                        {String(post.sections.length + 2).padStart(2, "0")}
                      </span>
                      <span>{zh ? "什么时候应该咨询" : "When to move to an enquiry"}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#article-faq"
                      className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-2 rounded-xl px-3 py-2 font-bold no-underline hover:bg-[var(--accent-pale)]"
                    >
                      <span className="text-[var(--brand)]">FAQ</span>
                      <span>{zh ? "常见问题" : "Common questions"}</span>
                    </a>
                  </li>
                </ol>
              </nav>
            </section>
            {post.image ? (
              <figure className="overflow-hidden rounded-lg bg-[var(--brand)]">
                <img
                  src={post.image}
                  alt={blogText(post.imageAlt, locale)}
                  width="1280"
                  height="960"
                  className="max-h-[560px] w-full object-cover"
                />
                <figcaption className="px-6 py-4 text-sm leading-6 text-white/70">
                  {zh
                    ? "示意画面用于说明可见屋顶部位；实际原因和维修范围仍需结合具体房屋确认。"
                    : "This illustrative roof view supports component identification; the actual cause and repair scope still depend on the property."}
                </figcaption>
              </figure>
            ) : null}
            <div className="prose-safe mt-12 max-w-none">
              {post.sections.map((section, index) => (
                <section
                  key={section.heading.en}
                  id={sectionId(index)}
                  className="scroll-mt-28 border-b border-[var(--brand)]/10 pb-10 last:border-0"
                >
                  <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{blogText(section.heading, locale)}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.en}>{blogText(paragraph, locale)}</p>
                  ))}
                  {section.checklist ? (
                    <div className="not-prose mt-7 rounded-lg bg-[var(--accent-pale)] p-6">
                      <p className="flex items-center gap-2 font-bold text-[var(--brand)]">
                        <BookOpen className="h-5 w-5 text-[var(--brand)]" />
                        {zh ? "记录清单" : "What to record"}
                      </p>
                      <ul className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
                        {section.checklist.map((item) => (
                          <li key={item.en} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                            {blogText(item, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              ))}
              {editorial ? (
                <>
                  <section
                    id="sydney-context"
                    className="scroll-mt-28 border-b border-[var(--brand)]/10 pb-10"
                  >
                    <p className="eyebrow">{String(post.sections.length + 1).padStart(2, "0")}</p>
                    <h2 className="flex items-center gap-3">
                      <MapPin className="h-7 w-7 text-[var(--brand)]" />
                      {zh
                        ? "把问题放回悉尼住宅语境"
                        : "Put the issue in its Sydney property context"}
                    </h2>
                    <p>{blogText(editorial.localContext, locale)}</p>
                  </section>
                  <section
                    id="when-to-enquire"
                    className="scroll-mt-28 border-b border-[var(--brand)]/10 pb-10"
                  >
                    <p className="eyebrow">{String(post.sections.length + 2).padStart(2, "0")}</p>
                    <h2 className="flex items-center gap-3">
                      <ShieldCheck className="h-7 w-7 text-[var(--brand)]" />
                      {zh
                        ? "什么时候应从观察转为咨询"
                        : "When to move from observation to an enquiry"}
                    </h2>
                    <p>{blogText(editorial.decisionGuide, locale)}</p>
                  </section>
                </>
              ) : null}
            </div>
            <section className="mt-12 overflow-hidden rounded-lg bg-[var(--brand)] text-white">
              <div className="border-b border-white/12 p-7 md:p-9">
                <p className="eyebrow !text-[var(--accent-pale)]">
                  {zh ? "相关服务" : "RELATED SERVICES"}
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  {zh ? "从指南进入合适的咨询路径" : "Continue into the relevant enquiry path"}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                  {zh
                    ? "服务页面说明可见信号、评估信息、专属FAQ和对应项目照片；选择只是咨询起点，不代表已经确认原因。"
                    : "Each service page explains visible signs, assessment details, dedicated FAQs and related project photos. Choosing a path starts the enquiry; it does not confirm the cause."}
                </p>
              </div>
              <div className="grid gap-px bg-white/12 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <article key={service.id} className="bg-[var(--brand)] p-7 md:p-8">
                    <h3 className="text-xl font-bold">{serviceText(service.shortTitle, locale)}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/68">
                      {serviceText(service.summary, locale)}
                    </p>
                    <a
                      href={servicePath(service, locale)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-pale)] no-underline"
                    >
                      {zh ? "查看服务详情与FAQ" : "Service details and FAQs"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                ))}
              </div>
            </section>
            <nav
              aria-label={zh ? "文章前后导航" : "Previous and next article"}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {previous ? (
                <a href={blogPath(previous, locale)} className="card p-6 no-underline">
                  <span className="text-xs font-bold text-[var(--brand)]">
                    {zh ? "上一篇" : "PREVIOUS"}
                  </span>
                  <span className="mt-2 block font-bold">{blogText(previous.title, locale)}</span>
                </a>
              ) : (
                <span />
              )}
              {next ? (
                <a href={blogPath(next, locale)} className="card p-6 text-right no-underline">
                  <span className="text-xs font-bold text-[var(--brand)]">
                    {zh ? "下一篇" : "NEXT"}
                  </span>
                  <span className="mt-2 block font-bold">{blogText(next.title, locale)}</span>
                </a>
              ) : null}
            </nav>
          </div>
          <BlogSidebar locale={locale} />
        </div>
      </article>
      <FaqSection
        locale={locale}
        items={articleFaqs}
        title={zh ? "这篇指南的常见问题" : "Questions about this guide"}
        muted
        sectionId="article-faq"
      />
      <ContactStrip locale={locale} />
    </SiteLayout>
  );
}
