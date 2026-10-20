import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { business, isProductionHost } from "./config/business";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const canonicalRedirect = redirectNonCanonicalProductionHost(request);
      if (canonicalRedirect) return canonicalRedirect;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await enforceHostAwareIndexing(request, normalized);
    } catch (error) {
      console.error(error);
      return await enforceHostAwareIndexing(
        request,
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};

function redirectNonCanonicalProductionHost(request: Request): Response | undefined {
  if (!business.siteUrl) return undefined;

  const sourceUrl = new URL(request.url);
  const redirectHosts = new Set(business.officialDomain ? [`www.${business.officialDomain}`] : []);
  if (!redirectHosts.has(sourceUrl.host)) return undefined;

  const destination = new URL(`${sourceUrl.pathname}${sourceUrl.search}`, business.siteUrl);
  return Response.redirect(destination, 308);
}

// Host-aware indexing controls.
//
// - On the approved production host, public content routes are served as
//   index,follow with production canonicals and JSON-LD intact when the
//   launch gates are enabled. Error responses are always noindex.
// - On every other host (Lovable preview, dev, staging, unknown
//   aliases), the response is rewritten to noindex,follow, the
//   production canonical / hreflang / og:url / JSON-LD is stripped, and an
//   X-Robots-Tag: noindex, follow header is added — so a preview
//   URL can never become a second indexable version of the site.
// - Error responses on any host are also forced to noindex,follow.
async function enforceHostAwareIndexing(request: Request, response: Response): Promise<Response> {
  const host = new URL(request.url).host;
  const prodHost = isProductionHost(host);
  const isError = response.status >= 400;
  const needsNoindex = !prodHost || !business.publicIndexingEnabled || isError;
  if (!needsNoindex) return response;

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, follow");

  const contentType = headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    return new Response(response.body, { status: response.status, headers });
  }

  let html = await response.text();

  // Force robots meta to noindex,follow (replace if present, else insert).
  const robotsRe = /<meta\s+[^>]*name=["']robots["'][^>]*>/i;
  const noindexTag = '<meta name="robots" content="noindex,follow">';
  if (robotsRe.test(html)) {
    html = html.replace(robotsRe, noindexTag);
  } else {
    html = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}${noindexTag}`);
  }

  if (!prodHost || isError) {
    // Strip production canonical and og:url so preview HTML never
    // advertises the production domain as its canonical location.
    html = html.replace(/<link\s+[^>]*rel=["'](?:canonical|alternate)["'][^>]*>\s*/gi, "");
    html = html.replace(/<meta\s+[^>]*property=["']og:url["'][^>]*>\s*/gi, "");
    // Strip all JSON-LD blocks — they contain absolute production URLs.
    html = html.replace(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
      "",
    );
  }

  headers.delete("content-length");
  return new Response(html, { status: response.status, headers });
}
