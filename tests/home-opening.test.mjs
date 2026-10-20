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
const { JSDOM } = createRequire("D:/CodexWork/tool-cache/chinese-normalization/package.json")(
  "jsdom",
);
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
    const document = new JSDOM(renderToStaticMarkup(createElement(HomePage, { locale }))).window
      .document;
    const hero = document.querySelector(".home-hero");
    assert.ok(hero, locale);
    assert.equal(hero.querySelector("h1").textContent, h1);
    assert.equal(document.querySelectorAll("h1").length, 1);
    assert.ok(hero.querySelector('a[href="tel:+61405878406"]'));
    assert.ok(hero.querySelector('a[href="#home-services"]'));
    assert.ok(hero.querySelector('button[aria-haspopup="dialog"]'));
    assert.ok(document.querySelector(`a[href="${contact}"]`));
    assert.ok(document.querySelector("#home-services"));
    assert.ok(document.querySelector("#home-task-portal"));
    assert.equal(document.querySelectorAll("#home-task-portal .home-portal-card").length, 6);
    const photo = hero.querySelector(".home-hero-photo img");
    assert.equal(photo.getAttribute("src"), "/media/metal-roof-repair-overview.jpg");
    assert.equal(photo.getAttribute("width"), "1920");
    assert.equal(photo.getAttribute("height"), "1080");
    assert.ok(photo.getAttribute("alt"));
    assert.ok(fs.existsSync(new URL(`public${photo.getAttribute("src")}`, root)));
    assert.doesNotMatch(hero.outerHTML, /aria-roledescription="carousel"|Pause automatic rotation/);
    assert.doesNotMatch(hero.outerHTML, /hero-(ridge-inspection|metal-flashing)-closeup/);
  }
});
