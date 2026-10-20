import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
const root = new URL("../", import.meta.url);
const require = createRequire(new URL("package.json", root));
const ts = require("typescript");
const { JSDOM } = createRequire("D:/CodexWork/tool-cache/chinese-normalization/package.json")(
  "jsdom",
);
const source = fs.readFileSync(new URL("src/lib/ga4.ts", root), "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const settings = JSON.parse(fs.readFileSync(new URL("ga4.config.json", root), "utf8"));
const business = fs.readFileSync(new URL("src/config/business.ts", root), "utf8");
const actualMeasurementId = business.match(/ga4MeasurementId: "([^"]*)"/)[1];
function fixture(options = {}) {
  const dom = new JSDOM(
    '<!doctype html><html lang="en-AU"><head><title>Private canary must not be used</title><link rel="canonical" href="https://sydneyroofrepairservices.com.au/"></head><body><form><input name="name" value="Unsent private draft"></form></body></html>',
    {
      url: options.href || "https://sydneyroofrepairservices.com.au/",
      referrer: "https://example.invalid/private-path?email=canary@example.invalid#private",
    },
  );
  Object.defineProperty(dom.window.navigator, "globalPrivacyControl", {
    value: options.gpc === true,
  });
  const exported = {};
  const context = {
    exports: exported,
    window: dom.window,
    document: dom.window.document,
    navigator: dom.window.navigator,
    location: dom.window.location,
    localStorage: dom.window.localStorage,
    URL,
    Date,
    Set,
    Object,
    MutationObserver: dom.window.MutationObserver,
    queueMicrotask,
  };
  vm.runInNewContext(code, context);
  const config = {
    ...settings,
    enhancedMeasurementDisabled: true,
    measurementId: actualMeasurementId,
  };
  return { dom, api: exported, config, close: () => dom.window.close() };
}
const own = (value) => JSON.parse(JSON.stringify(value));
test("pending ID and unconfirmed Enhanced Measurement remain fail closed", () => {
  const f = fixture();
  assert.equal(f.api.ga4Ready({ ...f.config, measurementId: "" }), false);
  assert.equal(f.api.ga4Ready({ ...f.config, enhancedMeasurementDisabled: false }), false);
  assert.equal(f.api.ga4Ready({ ...f.config, measurementId: "not-a-google-id" }), false);
  assert.equal(
    f.api.initRoofGA4({ ...f.config, measurementId: "" }, () => {}),
    null,
  );
  assert.equal(f.dom.window.document.querySelectorAll('script[src*="googletagmanager"]').length, 0);
  assert.equal(f.dom.window.roofGA4, undefined);
  f.close();
});
test("GA4 page context removes query and fragment, checks canonical ownership and rejects unknown routes", () => {
  const f = fixture();
  assert.equal(
    f.api.safeGA4Page(
      f.config,
      "https://sydneyroofrepairservices.com.au/contact?email=canary@example.invalid#private",
      "https://sydneyroofrepairservices.com.au/contact",
    ),
    "https://sydneyroofrepairservices.com.au/contact",
  );
  for (const href of [
    "https://preview.vercel.app/contact",
    "http://sydneyroofrepairservices.com.au/contact",
    "https://sydneyroofrepairservices.com.au/customer-private",
    "https://sydneyroofrepairservices.com.au:444/contact",
  ])
    assert.equal(
      f.api.safeGA4Page(f.config, href, "https://sydneyroofrepairservices.com.au/contact"),
      null,
    );
  assert.equal(
    f.api.safeGA4Referrer("https://example.invalid/person/private?name=Canary#secret"),
    "https://example.invalid",
  );
  assert.equal(f.api.safeGA4Referrer("javascript:private"), "");
  f.close();
});
test("event names and parameter values are bounded and never forward identity or request references", () => {
  const f = fixture(),
    privateValues = {
      location: "header",
      name: "Private",
      email: "canary@example.invalid",
      phone: "0400000000",
      request_id: "private-reference",
      sourcePath: "/?private=1",
      details: "Unsent private draft",
    };
  assert.deepEqual(own(f.api.safeGA4Event("phone_click", privateValues)), { location: "header" });
  assert.deepEqual(own(f.api.safeGA4Event("generate_lead", privateValues)), {});
  assert.deepEqual(
    own(f.api.safeGA4Event("email_click", { location: "private-customer-label" })),
    {},
  );
  assert.deepEqual(
    own(f.api.safeGA4Event("quote_form_error", { error_type: "delivery", details: "Private" })),
    { error_type: "delivery" },
  );
  assert.equal(f.api.safeGA4Event("unknown_private_event", privateValues), null);
  f.close();
});
test("Clarity grants, stale grants and malformed consent never become GA4 consent", () => {
  const f = fixture(),
    now = Date.now();
  assert.equal(
    f.api.parseGA4Consent(
      JSON.stringify({ version: 1, choice: "granted", projectId: "yy15u4fmm6", updatedAt: now }),
      actualMeasurementId,
    ),
    null,
  );
  assert.equal(
    f.api.parseGA4Consent(
      JSON.stringify({
        version: 1,
        purpose: "ga4",
        choice: "granted",
        measurementId: actualMeasurementId,
        updatedAt: now - 181 * 86400000,
      }),
      actualMeasurementId,
    ),
    null,
  );
  for (const value of [null, "not-json", "{}"])
    assert.equal(f.api.parseGA4Consent(value, actualMeasurementId), null);
  assert.notEqual(settings.storageKey, "sydney-roof-repairs.clarity-consent.v1");
  f.close();
});
test(
  "consent, route deduplication, safe payload and withdrawal with an unsent form",
  { skip: !actualMeasurementId && "Pending Root's real Measurement ID; no invented ID" },
  () => {
    const f = fixture(),
      states = [],
      controller = f.api.initRoofGA4(f.config, (...state) => states.push(state));
    assert.ok(controller);
    assert.equal(f.dom.window.document.querySelectorAll("#sydney-roof-ga4-tag").length, 0);
    f.dom.window.localStorage.setItem(
      "sydney-roof-repairs.clarity-consent.v1",
      JSON.stringify({ choice: "granted", projectId: "yy15u4fmm6" }),
    );
    controller.navigate();
    assert.equal(f.dom.window.document.querySelectorAll("#sydney-roof-ga4-tag").length, 0);
    controller.choose("granted");
    controller.navigate();
    controller.navigate();
    const events = () => f.dom.window.dataLayer.filter((args) => args[0] === "event");
    assert.equal(events().filter((args) => args[1] === "page_view").length, 1);
    controller.track("generate_lead", {
      request_id: "private-reference",
      details: "private-canary",
    });
    assert.equal(JSON.stringify(f.dom.window.dataLayer).includes("private-reference"), false);
    assert.equal(JSON.stringify(f.dom.window.dataLayer).includes("private-canary"), false);
    assert.equal(
      JSON.stringify(f.dom.window.dataLayer).includes("Private canary must not be used"),
      false,
    );
    f.dom.window.history.pushState({}, "", "/contact?email=canary@example.invalid#private");
    f.dom.window.document.querySelector('link[rel="canonical"]').href =
      "https://sydneyroofrepairservices.com.au/contact";
    controller.navigate();
    controller.navigate();
    assert.equal(events().filter((args) => args[1] === "page_view").length, 2);
    f.dom.window.document.cookie = "_clck=keep-clarity; Path=/";
    f.dom.window.document.cookie = "_ga=remove-google; Path=/";
    controller.choose("denied");
    const count = events().length;
    controller.track("phone_click", { location: "header" });
    assert.equal(events().length, count);
    assert.equal(f.dom.window[`ga-disable-${actualMeasurementId}`], true);
    assert.equal(f.dom.window.document.querySelector("#sydney-roof-ga4-tag"), null);
    assert.equal(f.dom.window.document.querySelector("input").value, "Unsent private draft");
    assert.match(f.dom.window.document.cookie, /_clck=keep-clarity/);
    assert.doesNotMatch(f.dom.window.document.cookie, /_ga=/);
    controller.destroy();
    f.close();
  },
);
test(
  "GPC and preview hosts block collectors even when the ID becomes real",
  { skip: !actualMeasurementId && "Pending Root's real Measurement ID; no invented ID" },
  () => {
    const f = fixture({ gpc: true }),
      controller = f.api.initRoofGA4(f.config, () => {});
    assert.ok(controller);
    controller.choose("granted");
    assert.equal(f.dom.window.document.querySelector("#sydney-roof-ga4-tag"), null);
    controller.destroy();
    f.close();
    const preview = fixture({ href: "https://preview.vercel.app/" });
    assert.equal(
      preview.api.initRoofGA4(preview.config, () => {}),
      null,
    );
    preview.close();
  },
);

test("settled canonical after an early SPA pathname notification emits one safe pageview", async () => {
  assert.equal(actualMeasurementId, "G-9LX6LT20D3");
  const f = fixture();
  const controller = f.api.initRoofGA4(f.config, () => {});
  controller.choose("granted");
  const pageviews = () =>
    f.dom.window.dataLayer.filter((args) => args[0] === "event" && args[1] === "page_view");
  assert.equal(pageviews().length, 1);
  f.dom.window.history.pushState({}, "", "/services");
  controller.navigate();
  assert.equal(pageviews().length, 1);
  assert.equal(f.dom.window[`ga-disable-${actualMeasurementId}`], true);
  f.dom.window.document.querySelector('link[rel="canonical"]').href =
    "https://sydneyroofrepairservices.com.au/services";
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(
    pageviews().length,
    2,
    "Recover when TanStack HeadContent commits after the pathname effect",
  );
  assert.equal(
    pageviews().at(-1)[2].page_location,
    "https://sydneyroofrepairservices.com.au/services",
  );
  assert.equal(f.dom.window[`ga-disable-${actualMeasurementId}`], false);
  controller.navigate();
  f.dom.window.document
    .querySelector('link[rel="canonical"]')
    .setAttribute("href", "https://sydneyroofrepairservices.com.au/services");
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(pageviews().length, 2);
  controller.destroy();
  f.close();
});

test("cross-tab revoke and repeated regrant preserve drafts and count only the new consented view", () => {
  const f = fixture(),
    controller = f.api.initRoofGA4(f.config, () => {});
  controller.choose("granted");
  const pageviews = () =>
    f.dom.window.dataLayer.filter((args) => args[0] === "event" && args[1] === "page_view");
  f.dom.window.dispatchEvent(
    new f.dom.window.StorageEvent("storage", { key: f.config.storageKey, newValue: null }),
  );
  assert.equal(f.dom.window[`ga-disable-${actualMeasurementId}`], true);
  const stored = JSON.stringify({
    version: 1,
    purpose: "ga4",
    choice: "granted",
    measurementId: actualMeasurementId,
    updatedAt: Date.now(),
  });
  f.dom.window.dispatchEvent(
    new f.dom.window.StorageEvent("storage", { key: f.config.storageKey, newValue: stored }),
  );
  f.dom.window.dispatchEvent(
    new f.dom.window.StorageEvent("storage", { key: f.config.storageKey, newValue: stored }),
  );
  assert.equal(pageviews().length, 2);
  assert.equal(f.dom.window.document.querySelector("input").value, "Unsent private draft");
  controller.destroy();
  f.close();
});
