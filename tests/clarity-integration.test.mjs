import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
const root = new URL("../", import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root), "utf8");
test("only the verified Sydney apex can opt in and bilingual contact routes are excluded", () => {
  const config = JSON.parse(read("clarity.config.json"));
  assert.equal(config.projectId, "yy15u4fmm6");
  assert.equal(config.hostname, "sydneyroofrepairservices.com.au");
  assert.equal(config.siteKind, "business");
  assert.notEqual(config.allowMissingCanonical, true);
  assert.deepEqual(config.privacyPaths, { en: "/privacy", zh: "/zh-hans/privacy" });
  assert.deepEqual(config.excludedPaths, ["/contact", "/zh-hans/contact"]);
  assert.ok(!Object.keys(config).some((key) => /email|phone|customer|userId/i.test(key)));
});
test("the reviewed local consent runtime is exact and never loaded as an unconditional remote tag", () => {
  assert.equal(
    createHash("sha256").update(read("public/clarity-consent.js")).digest("hex"),
    "29f36fa2fb4b4b8803acbf84d02fef27f8faf2fe9f39be3e6a49d4829c02f15d",
  );
  const assets = read("src/components/ClarityAssets.tsx"),
    layout = read("src/routes/__root.tsx");
  assert.equal((layout.match(/<ClarityAssets\b/g) || []).length, 1);
  assert.match(assets, /clarity-config/);
  assert.doesNotMatch(assets, /https:\/\/www\.clarity\.ms/);
  assert.match(assets, /privacyPaths/);
  const form = read("src/components/EnquiryForm.tsx");
  assert.match(form, /<form\s[^>]*data-clarity-mask/s);
});
test("both existing privacy routes retain their owner and accurately describe optional Clarity", () => {
  const privacy = read("src/components/ClarityPrivacy.tsx");
  assert.match(privacy, /Microsoft Clarity/);
  assert.match(privacy, /privacy\.microsoft\.com\/privacystatement/);
  assert.match(privacy, /Clarity only/);
  assert.match(privacy, /withdraw|turn it off/i);
  assert.match(privacy, /关闭|撤回/);
  assert.match(read("src/components/Pages.tsx"), /<ClarityPrivacy locale=\{locale\}/);
  assert.match(read("src/routes/privacy.tsx"), /PrivacyPage locale="en"/);
  assert.match(read("src/routes/zh-hans.privacy.tsx"), /PrivacyPage locale="zh"/);
});
test("existing indexing and fail-closed server boundaries stay in place with the verified GA4 stream", () => {
  const business = read("src/config/business.ts");
  assert.match(
    business,
    /const indexingRequested = import.meta.env.VITE_SITE_INDEXABLE === "true"/,
  );
  assert.match(business, /ga4MeasurementId: "G-9LX6LT20D3"/);
  assert.match(business, /"noindex,nofollow,noarchive"/);
  assert.match(read("src/server.ts"), /enforceHostAwareIndexing/);
  assert.match(read("src/routes/robots[.]txt.ts"), /Disallow: \//);
});
test("the installed Start graph satisfies the official security repair and stays aligned", () => {
  const manifest = JSON.parse(read("package.json"));
  assert.equal(manifest.dependencies["@tanstack/react-start"], "1.168.60");
  assert.equal(manifest.dependencies["@tanstack/react-router"], "^1.170.16");
  assert.equal(manifest.dependencies["@tanstack/router-plugin"], "^1.168.18");
  assert.equal(
    JSON.parse(read("node_modules/@tanstack/react-start/package.json")).version,
    "1.168.60",
  );
  assert.equal(
    JSON.parse(read("node_modules/@tanstack/react-router/package.json")).version,
    "1.170.41",
  );
  assert.equal(
    JSON.parse(read("node_modules/@tanstack/router-plugin/package.json")).version,
    "1.168.42",
  );
  const lock = read("pnpm-lock.yaml");
  assert.doesNotMatch(
    lock,
    /@tanstack\/setup|router_init\.js|79ac49eedf774dd4b0cfa308722bc463cfe5885c/,
  );
  const versions = [...lock.matchAll(/^\s{2}'?@tanstack\/start-server-core@(\d+\.\d+\.\d+)/gm)].map(
    (m) => m[1],
  );
  assert.ok(versions.length > 0);
  for (const version of versions) {
    const [major, minor, patch] = version.split(".").map(Number);
    assert.ok(
      major > 1 || (major === 1 && (minor > 169 || (minor === 169 && patch >= 39))),
      version,
    );
  }
});
