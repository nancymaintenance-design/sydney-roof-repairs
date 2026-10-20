import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { business, isProductionHost } from "@/config/business";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";

const basePaths = [
  "/",
  "/services",
  ...services.map((service) => `/services/${service.id}`),
  "/projects",
  "/areas",
  "/about",
  "/contact",
  "/privacy",
  "/blog",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];
const paths = [
  ...basePaths,
  "/zh-hans",
  ...basePaths.filter((path) => path !== "/").map((path) => `/zh-hans${path}`),
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const host = new URL(request.url).host;
        if (!business.publicIndexingEnabled || !business.siteUrl || !isProductionHost(host)) {
          return new Response(
            '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n',
            {
              status: 200,
              headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=300",
                "X-Robots-Tag": "noindex, follow",
              },
            },
          );
        }
        const urls = paths.map(
          (path) => `  <url>\n    <loc>${business.siteUrl}${path}</loc>\n  </url>`,
        );
        return new Response(
          [
            `<?xml version="1.0" encoding="UTF-8"?>`,
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
            ...urls,
            `</urlset>`,
          ].join("\n"),
          {
            headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
          },
        );
      },
    },
  },
});
