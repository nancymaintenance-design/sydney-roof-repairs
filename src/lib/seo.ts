import { absoluteUrl, business } from "@/config/business";
import type { Locale } from "@/data/content";

type HeadOptions = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  englishPath?: string;
  chinesePath?: string;
  image?: string;
  noindex?: boolean;
};

export function pageHead(options: HeadOptions) {
  const canonical = absoluteUrl(options.path);
  const englishPath = options.englishPath ?? (options.path.replace(/^\/zh-hans/, "") || "/");
  const chinesePath =
    options.chinesePath ?? (englishPath === "/" ? "/zh-hans" : `/zh-hans${englishPath}`);
  const image = options.image && business.siteUrl ? `${business.siteUrl}${options.image}` : null;
  return {
    meta: [
      { title: options.title },
      { name: "description", content: options.description },
      ...(options.noindex ? [{ name: "robots", content: "noindex,follow" }] : []),
      { property: "og:title", content: options.title },
      { property: "og:description", content: options.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: options.locale === "zh" ? "zh_AU" : "en_AU" },
      ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      ...(image ? [{ property: "og:image", content: image }] : []),
    ],
    links: [
      ...(canonical ? [{ rel: "canonical", href: canonical }] : []),
      ...(business.siteUrl
        ? [
            { rel: "alternate", hrefLang: "en-AU", href: `${business.siteUrl}${englishPath}` },
            { rel: "alternate", hrefLang: "zh-Hans", href: `${business.siteUrl}${chinesePath}` },
            { rel: "alternate", hrefLang: "x-default", href: `${business.siteUrl}${englishPath}` },
          ]
        : []),
    ],
  };
}

export function buildOrganizationSchema(): Record<string, unknown> | null {
  if (!business.siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.businessName,
    legalName: business.legalName,
    taxID: business.abn,
    url: business.siteUrl,
    telephone: business.phone,
    email: business.email,
    areaServed: { "@type": "City", name: "Sydney" },
  };
}

export function buildWebSiteSchema(): Record<string, unknown> | null {
  if (!business.siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.siteName,
    url: business.siteUrl,
    inLanguage: ["en-AU", "zh-Hans"],
    publisher: { "@type": "Organization", name: business.businessName },
  };
}

export function buildServiceSchema(name: string, description: string, path: string) {
  const url = absoluteUrl(path);
  if (!url) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    areaServed: { "@type": "City", name: "Sydney" },
    provider: { "@type": "Organization", name: business.businessName, url: business.siteUrl },
  };
}
