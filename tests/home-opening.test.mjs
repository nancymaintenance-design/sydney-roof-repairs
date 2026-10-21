import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

const root = new URL("../", import.meta.url);
const require = createRequire(new URL("package.json", root));
const ts = require("typescript");
const modules = new Map();

// Render the actual page and its actual local components without a server,
// network requests, analytics collectors or submitting an enquiry.
function load(relative) {
  const filename = [relative, `${relative}.ts`, `${relative}.tsx`].find((candidate) =>
    fs.existsSync(new URL(candidate, root)),
  );
  if (!filename) throw new Error(`Missing source module ${relative}`);
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const code = ts.transpileModule(
    fs.readFileSync(new URL(filename, root), "utf8").replaceAll("import.meta.env", "__buildEnv"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText;
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require: (specifier) => {
      if (specifier.startsWith("@/")) return load(`src/${specifier.slice(2)}`);
      if (specifier.startsWith("."))
        return load(path.posix.normalize(path.posix.join(path.posix.dirname(filename), specifier)));
      return require(specifier);
    },
    __buildEnv: {},
    console,
    URL,
  });
  return module.exports;
}

test("both homepages retain the approved static opening, existing intent and contact paths", () => {
  const { HomePage } = load("src/components/Pages.tsx");
  for (const [locale, h1, contact] of [
    ["en", "Sydney Roof RepairsClear advice. Practical next steps.", "/contact"],
    ["zh", "悉尼屋顶维修先确认问题与下一步", "/zh-hans/contact"],
  ]) {
    const html = renderToStaticMarkup(createElement(HomePage, { locale }));
    const hero = html.match(/<section\b[^>]*class="home-hero"[^>]*>[\s\S]*?<\/section>/)?.[0];
    assert.ok(hero, locale);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1);
    assert.equal(headings[0][1].replace(/<[^>]*>/g, ""), h1);
    assert.match(hero, /<a\b[^>]*href="tel:\+61405878406"/);
    assert.match(hero, /<a\b[^>]*href="#home-services"/);
    assert.match(hero, /<button\b[^>]*aria-haspopup="dialog"/);
    assert.ok(html.includes(`href="${contact}"`));
    assert.match(html, /<section\b[^>]*id="home-services"/);
    const portal = html.match(/<section\b[^>]*id="home-task-portal"[^>]*>[\s\S]*?<\/section>/)?.[0];
    assert.ok(portal);
    assert.equal((portal.match(/class="[^"]*\bhome-portal-card\b[^"]*"/g) ?? []).length, 6);
    const photo = hero.match(/<figure\b[^>]*class="home-hero-photo"[^>]*>\s*(<img\b[^>]*>)/)?.[1];
    assert.ok(photo);
    assert.match(photo, /src="\/media\/commercial-roof-overview\.webp"/);
    assert.match(photo, /width="1920"/);
    assert.match(photo, /height="1080"/);
    assert.match(photo, /alt="[^"]+"/);
    assert.ok(fs.existsSync(new URL("public/media/commercial-roof-overview.webp", root)));
    assert.doesNotMatch(hero, /aria-roledescription="carousel"|Pause automatic rotation/);
    assert.doesNotMatch(hero, /hero-(ridge-inspection|metal-flashing)-closeup/);
  }
});
