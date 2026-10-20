import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const root = new URL("../", import.meta.url);
const require = createRequire(new URL("package.json", root));
const ts = require("typescript");
const production = "https://sydneyroofrepairservices.com.au";

// Execute the real configuration, route handlers and response wrapper. Only
// TanStack's registration and SSR engine are replaced at their framework boundary.
function fixture({ env = {}, html, status = 200, throwDuringRender = false } = {}) {
  const modules = new Map();
  const settings = {
    VITE_SITE_URL: production,
    VITE_DOMAIN_OWNERSHIP_VERIFIED: "true",
    VITE_SITE_INDEXABLE: "true",
    ...env,
  };
  const page =
    html ??
    `<!doctype html><html><head>
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${production}/services">
    <link rel="alternate" hreflang="en-AU" href="${production}/services">
    <meta property="og:url" content="${production}/services">
    <script type="application/ld+json">{"@type":"WebSite","url":"${production}"}</script>
    </head><body><h1>Existing title and content</h1></body></html>`;

  function load(relative) {
    let filename = relative;
    if (!path.extname(filename)) filename += ".ts";
    if (modules.has(filename)) return modules.get(filename).exports;
    const module = { exports: {} };
    modules.set(filename, module);
    const source = fs
      .readFileSync(new URL(filename, root), "utf8")
      .replaceAll("import.meta.env", "__buildEnv");
    const code = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    const localRequire = (specifier) => {
      if (specifier === "@tanstack/react-router")
        return { createFileRoute: () => (options) => options };
      if (specifier === "@tanstack/react-start/server-entry")
        return {
          __esModule: true,
          default: {
            fetch: () => {
              if (throwDuringRender) throw new Error("controlled SSR failure");
              return new Response(page, {
                status,
                headers: { "content-type": "text/html; charset=utf-8" },
              });
            },
          },
        };
      if (specifier === "@/components/Pages") return {};
      if (specifier.startsWith("@/")) return load(`src/${specifier.slice(2)}`);
      if (specifier.startsWith("."))
        return load(path.posix.normalize(path.posix.join(path.posix.dirname(filename), specifier)));
      return require(specifier);
    };
    vm.runInNewContext(
      code,
      {
        module,
        exports: module.exports,
        require: localRequire,
        __buildEnv: settings,
        Request,
        Response,
        Headers,
        URL,
        console: { error() {} },
      },
      { filename },
    );
    return module.exports;
  }
  return {
    business: () => load("src/config/business.ts"),
    head: (options) => load("src/lib/seo.ts").pageHead(options),
    route: (name, host = production) =>
      load(`src/routes/${name}.ts`).Route.server.handlers.GET({
        request: new Request(`${host}/${name === "robots[.]txt" ? "robots.txt" : "sitemap.xml"}`),
      }),
    privacy: (locale) =>
      load(`src/routes/${locale === "zh" ? "zh-hans." : ""}privacy.tsx`).Route.head(),
    render: (url) => load("src/server.ts").default.fetch(new Request(url), {}, {}),
  };
}

test("approved production sitemap includes all 56 public pages including both Privacy pages", async () => {
  const response = await fixture().route("sitemap[.]xml");
  const xml = await response.text();
  assert.equal(response.status, 200);
  assert.equal((xml.match(/<loc>/g) ?? []).length, 56);
  assert.match(xml, /<loc>https:\/\/sydneyroofrepairservices\.com\.au\/privacy<\/loc>/);
  assert.match(xml, /<loc>https:\/\/sydneyroofrepairservices\.com\.au\/zh-hans\/privacy<\/loc>/);
  assert.equal(new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])).size, 56);
  assert.equal(response.headers.get("x-robots-tag"), null);
});

test("Privacy pages keep their titles and reciprocal canonicals while allowing production indexing", () => {
  const f = fixture();
  for (const [locale, expectedTitle, expectedCanonical] of [
    ["en", "Privacy | Ellis Services Sydney Roof Repairs", `${production}/privacy`],
    ["zh", "隐私政策 | Ellis Services 悉尼屋顶维修", `${production}/zh-hans/privacy`],
  ]) {
    const head = f.privacy(locale);
    assert.equal(head.meta.find((item) => "title" in item).title, expectedTitle);
    assert.equal(
      head.meta.some((item) => item.name === "robots" && item.content.includes("noindex")),
      false,
    );
    assert.equal(head.links.find((link) => link.rel === "canonical").href, expectedCanonical);
    assert.deepEqual(
      Array.from(
        head.links.filter((link) => link.rel === "alternate"),
        (link) => link.href,
      ),
      [`${production}/privacy`, `${production}/zh-hans/privacy`, `${production}/privacy`],
    );
  }
});

test("preview, unknown aliases and nonstandard ports remain blocked with production build flags", async () => {
  for (const host of [
    "https://preview.vercel.app",
    "https://unknown.example",
    `${production}:444`,
  ]) {
    const f = fixture();
    const robots = await f.route("robots[.]txt", host);
    assert.match(await robots.text(), /Disallow: \//, host);
    const sitemap = await f.route("sitemap[.]xml", host);
    assert.doesNotMatch(await sitemap.text(), /<loc>/, host);
    const page = await f.render(`${host}/services`);
    assert.match(page.headers.get("x-robots-tag") ?? "", /noindex/, host);
    const html = await page.text();
    assert.match(html, /name="robots" content="noindex,follow"/, host);
    assert.doesNotMatch(
      html,
      /rel="(?:canonical|alternate)"|property="og:url"|application\/ld\+json/,
      host,
    );
    assert.match(html, /<h1>Existing title and content<\/h1>/);
  }
});

test("production allows crawling and preserves canonical, language and schema signals", async () => {
  const f = fixture();
  const robots = await f.route("robots[.]txt");
  assert.equal(
    await robots.text(),
    `User-agent: *\nAllow: /\nSitemap: ${production}/sitemap.xml\n`,
  );
  const page = await f.render(`${production}/services`);
  const html = await page.text();
  assert.equal(page.headers.get("x-robots-tag"), null);
  assert.match(html, /name="robots" content="index,follow"/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /rel="alternate"/);
  assert.match(html, /application\/ld\+json/);
});

test("missing or false launch approval keeps production robots and sitemap blocked", async () => {
  for (const env of [
    { VITE_SITE_INDEXABLE: "false" },
    { VITE_DOMAIN_OWNERSHIP_VERIFIED: "false" },
    { VITE_SITE_URL: "https://wrong.example" },
  ]) {
    const f = fixture({ env });
    const robots = await f.route("robots[.]txt");
    assert.match(await robots.text(), /Disallow: \//);
    assert.doesNotMatch(await (await f.route("sitemap[.]xml")).text(), /<loc>/);
  }
});

test("error responses cannot be indexed on production, including thrown SSR errors", async () => {
  for (const options of [{ status: 404 }, { status: 500 }, { throwDuringRender: true }]) {
    const page = await fixture(options).render(`${production}/missing`);
    assert.match(page.headers.get("x-robots-tag") ?? "", /noindex/);
  }
});
