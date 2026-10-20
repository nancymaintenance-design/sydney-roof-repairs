import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absoluteUrl, business, isProductionHost } from "@/config/business";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const host = new URL(request.url).host;
        const publicHost =
          business.publicIndexingEnabled && Boolean(business.siteUrl) && isProductionHost(host);
        const body = publicHost
          ? ["User-agent: *", "Allow: /", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ""].join("\n")
          : ["User-agent: *", "Disallow: /", ""].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=300",
            ...(!publicHost ? { "X-Robots-Tag": "noindex, follow" } : {}),
          },
        });
      },
    },
  },
});
