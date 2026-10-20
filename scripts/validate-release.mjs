import { spawnSync } from "node:child_process";

const review = spawnSync(process.execPath, ["scripts/validate-review.mjs"], { stdio: "inherit" });
if (review.status !== 0) process.exit(review.status || 1);

const required = [
  ["RELEASE_APPROVED", "true", "explicit production release approval is absent"],
  ["VITE_DOMAIN_OWNERSHIP_VERIFIED", "true", "domain ownership is not verified"],
  [
    "VITE_SITE_URL",
    "https://sydneyroofrepairservices.com.au",
    "production site URL is not explicitly configured",
  ],
  ["VITE_SITE_INDEXABLE", "true", "public indexing is not explicitly enabled"],
];
const blockers = required
  .filter(([name, expected]) => process.env[name] !== expected)
  .map(([, , message]) => message);
for (const name of ["RESEND_API_KEY", "QUOTE_FROM_EMAIL", "QUOTE_TO_EMAIL"]) {
  if (!process.env[name]?.trim()) blockers.push(`${name} is not configured`);
}
if (blockers.length) {
  for (const blocker of blockers) console.error(`BLOCKED: ${blocker}`);
  console.error("RELEASE VALIDATION BLOCKED — expected for the local implementation phase.");
  process.exit(1);
}
console.log("RELEASE VALIDATION PASSED.");
