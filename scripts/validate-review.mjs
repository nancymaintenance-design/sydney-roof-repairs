import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];
const pass = [];
const requiredFiles = [
  "SITE-BRIEF.md",
  "FACT-REGISTER.md",
  "ROUTE-MATRIX.md",
  "MEDIA-MANIFEST.md",
  "MIGRATION-MATRIX.md",
  "NARRATIVE-BRIDGE-MATRIX.md",
  "QUERY-OWNER-BASELINE.md",
  "TEN-SITE-EVIDENCE-PATTERN-AUDIT-2026-09-18.md",
  "LOCAL-ACCEPTANCE-REPORT-2026-09-18-R5.md",
  "src/config/business.ts",
  "src/data/services.ts",
  "src/data/media.ts",
  "src/data/faqs.ts",
  "src/data/blog.ts",
  "src/data/blog-editorial.ts",
  "src/components/Pages.tsx",
  "src/components/FaqSection.tsx",
  "src/components/BlogPages.tsx",
  "src/components/EnquiryForm.tsx",
  "src/routes/robots[.]txt.ts",
  "src/routes/sitemap[.]xml.ts",
  "src/routes/api/quote.ts",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing ${file}`);
}
if (!failures.length) pass.push("required implementation and governance files exist");

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const business = read("src/config/business.ts");
const services = read("src/data/services.ts");
const media = read("src/data/media.ts");
const faqs = read("src/data/faqs.ts");
const blog = read("src/data/blog.ts");
const blogEditorial = read("src/data/blog-editorial.ts");
const blogPages = read("src/components/BlogPages.tsx");
const pages = read("src/components/Pages.tsx");
const siteChrome = read("src/components/SiteChrome.tsx");
const enquiryForm = read("src/components/EnquiryForm.tsx");
const quote = read("src/routes/api/quote.ts");
const routeFiles = fs.readdirSync(path.join(root, "src/routes"), { recursive: true }).map(String);
const sourceFiles = fs
  .readdirSync(path.join(root, "src"), { recursive: true })
  .map(String)
  .filter((file) => /\.(ts|tsx)$/.test(file));
const source = sourceFiles.map((file) => read(path.join("src", file))).join("\n");
for (const token of ["brisbane", "ellisserviceselectrician.com.au", "G-PDY8WSLLCX"]) {
  if (source.toLowerCase().includes(token.toLowerCase()))
    failures.push(`donor contamination token found: ${token}`);
}
if (!failures.some((item) => item.startsWith("donor contamination")))
  pass.push("no Brisbane/electrical donor identity or old GA4 token in source");

const expectedSlugs = [
  "roof-leak-repairs-sydney",
  "storm-damage-roof-repairs-sydney",
  "tile-roof-repairs-sydney",
  "metal-roof-repairs-sydney",
  "flashing-valley-repairs-sydney",
  "ridge-capping-repointing-sydney",
];
for (const slug of expectedSlugs)
  if (!services.includes(`id: "${slug}"`)) failures.push(`missing service slug ${slug}`);
if (expectedSlugs.every((slug) => services.includes(`id: "${slug}"`)))
  pass.push("all six service owners exist in the single service data source");
const serviceBlocks = services.split(/\n  \{\n    id: /).slice(1);
const serviceFaqCounts = serviceBlocks.map((block) => {
  const faqBlock = block.match(/faq:\s*\[([\s\S]*?)\n\s*\],\n\s*image:/);
  return faqBlock ? (faqBlock[1].match(/question:/g) || []).length : 0;
});
const serviceSignCounts = serviceBlocks.map((block) => {
  const signBlock = block.match(/signs:\s*{\s*en:\s*\[([\s\S]*?)\],\s*zh:/);
  return signBlock ? (signBlock[1].match(/^\s*"/gm) || []).length : 0;
});
if (serviceFaqCounts.length !== 6 || serviceFaqCounts.some((count) => count < 5))
  failures.push(
    `each service detail must contain at least five dedicated FAQs, found ${serviceFaqCounts.join("/")}`,
  );
if (!pages.includes('href="#service-faq"') || !pages.includes('sectionId="service-faq"'))
  failures.push("service detail FAQ anchor and visible section are incomplete");
if (serviceFaqCounts.length === 6 && serviceFaqCounts.every((count) => count >= 5))
  pass.push("six service details each contain five dedicated FAQs with a visible page anchor");
if (serviceSignCounts.length !== 6 || serviceSignCounts.some((count) => count < 5))
  failures.push(
    `each service detail must contain five distinct visible signs, found ${serviceSignCounts.join("/")}`,
  );
for (const token of [
  "SAFE INFORMATION BOUNDARY",
  "WHAT AFFECTS THE QUOTE",
  "service-sign-card",
  "These signs support an enquiry, not a remote diagnosis.",
]) {
  if (!pages.includes(token)) failures.push(`service decision structure missing: ${token}`);
}
for (const token of [
  "md:grid-cols-3 md:divide-x",
  "overflow-x-auto py-4 hide-scrollbar",
  'aria-label={zh ? "本页内容" : "On this page"}',
]) {
  if (pages.includes(token)) failures.push(`obsolete service-detail navigation remains: ${token}`);
}
const visibleSignsBlock = pages.match(
  /<section id="visible-signs"([\s\S]*?)<section id="assessment-details"/,
);
if (visibleSignsBlock?.[1].includes("0{index + 1}"))
  failures.push("service signs must not use sequence numbering for non-sequential observations");
if (
  serviceSignCounts.length === 6 &&
  serviceSignCounts.every((count) => count >= 5) &&
  !failures.some((item) => item.startsWith("service decision structure"))
)
  pass.push(
    "all six service details expose five observable signs plus preparation, safety, quote-factor and related-service layers without obsolete in-page navigation",
  );

for (const token of [
  'id="home-task-portal"',
  "const homePortalCards = [",
  "home-portal-card",
  "home-portal-image",
  'variant="home-list"',
  "home-service-list",
  "function HomeHero",
  "grid-cols-[6.5rem_1fr]",
  'key: "about"',
  "Sydney roof repair services and information",
]) {
  if (!pages.includes(token)) failures.push(`refined Home opening mechanism missing: ${token}`);
}
for (const token of [
  "START HERE",
  "START WITH THE ROOF ISSUE",
  "RELATED ROOF PHOTOS",
  "OUR WORKING APPROACH",
  "LATEST ROOF GUIDES",
  "DO YOU HAVE A ROOF QUESTION?",
]) {
  if (pages.includes(token))
    failures.push(`obsolete Home guidance label must stay removed: ${token}`);
}
const homePortalBlock = pages.match(/const homePortalCards = \[([\s\S]*?)\n  \];/);
const homePortalImageCount = homePortalBlock
  ? (homePortalBlock[1].match(/image: "\/media\//g) || []).length
  : 0;
if (homePortalImageCount !== 6)
  failures.push(`Home image portal must contain exactly six cards, found ${homePortalImageCount}`);
if (homePortalBlock?.[1].includes('href: localizedPath(locale, "/blog")'))
  failures.push(
    "Home six-card image portal must keep Blog outside the screenshot-matched portal set",
  );
if (
  !failures.some(
    (item) =>
      item.startsWith("refined Home opening") || item.startsWith("obsolete Home guidance label"),
  )
)
  pass.push(
    "Home opening keeps six image-led navigation portals and a customer-facing content flow without obsolete guidance labels",
  );

for (const token of [
  'id="confirm-fit"',
  'id="area-groups"',
  'id="area-services"',
  'id="area-faq"',
  "const areaGroups = [",
  "Location is not the only factor",
]) {
  if (!pages.includes(token)) failures.push(`Areas decision structure missing: ${token}`);
}
if (!pages.includes("areaGroups.map") || !pages.includes("services.map((service)"))
  failures.push("Areas group and service matching cards are incomplete");
if (
  (
    pages.match(
      /^    "(?:Artarmon|Chatswood|Inner West Sydney|Newtown|Marrickville|Mosman|Killara|Lindfield|Lower North Shore|Roseville|Willoughby|Lane Cove|Castle Cove|St Ives|Gordon|Middle Cove|Turramurra|Naremburn|Crows Nest|Castlecrag|Cremorne|Lane Cove North|Killara East|East Lindfield|Roseville Chase|Willoughby North|St Peters|Northbridge|Cammeray|Annandale|Balgowlah|Brookvale|Chatswood East|Chatswood West|Clontarf|Cremorne Point|Curl Curl|Dee Why|Drummoyne|Dulwich Hill|East Killara|Forestville|Frenchs Forest|Freshwater|Greenwich|Killarney Heights|Kurraba Point|Lane Cove East|Lane Cove West|Lewisham|Leichhardt|Longueville|Macquarie Park|Manly|Neutral Bay|North Balgowlah|North Curl Curl|North Ryde|North Sydney|Northwood|Riverview|Ryde|Seaforth|South Turramurra|St Leonards|Stanmore|Wahroonga|Waverton|Willoughby East)",$/gm,
    ) || []
  ).length !== 69 ||
  !pages.includes('zh ? "Wollstonecraft 及其他地区" : "Wollstonecraft and more."')
)
  failures.push("Areas suburb list must include all 70 owner-supplied labels");
if (!failures.some((item) => item.startsWith("Areas")))
  pass.push(
    "Areas is a complete enquiry hub with 70 owner-supplied location labels, fit checks, six service links, FAQ and contact handoff",
  );

for (const token of [
  "lg:items-stretch",
  "project-actions mt-6 border-t",
  "lg:absolute lg:inset-y-0 lg:right-0",
  "lg:grid-rows-2",
  "lg:min-h-0 lg:flex-1 lg:aspect-auto",
]) {
  if (!pages.includes(token))
    failures.push(`Projects equal-height group mechanism missing: ${token}`);
}
if (!failures.some((item) => item.startsWith("Projects equal-height")))
  pass.push(
    "Projects groups keep narrative actions in normal flow while the two-row evidence gallery stretches to the content height",
  );

for (const file of [
  "zh-hans.index.tsx",
  "zh-hans.services.index.tsx",
  "zh-hans.services.$slug.tsx",
  "zh-hans.projects.tsx",
  "zh-hans.areas.tsx",
  "zh-hans.about.tsx",
  "zh-hans.contact.tsx",
  "zh-hans.privacy.tsx",
  "blog.tsx",
  "blog.index.tsx",
  "blog.$slug.tsx",
  "zh-hans.blog.tsx",
  "zh-hans.blog.index.tsx",
  "zh-hans.blog.$slug.tsx",
]) {
  if (!routeFiles.includes(file)) failures.push(`missing bilingual route ${file}`);
}
if (routeFiles.includes("zh-hans.services.$slug.tsx")) pass.push("full zh-Hans route layer exists");

if (!business.includes('domainStatus: "vercel-verified-noindex"'))
  failures.push("Vercel-verified noindex domain status missing");
if (!business.includes('ga4MeasurementId: "G-9LX6LT20D3"'))
  failures.push("GA4 must retain the verified Sydney-specific stream");
const requiredSocialUrls = [
  "https://au.linkedin.com/in/ellis-services-group-091541266",
  "https://www.facebook.com/p/Ellis-Services-Group-100082926022259/",
  "https://www.instagram.com/elliservices_group/",
];
for (const url of requiredSocialUrls) {
  if (!business.includes(url)) failures.push(`approved group social URL missing: ${url}`);
}
for (const label of ["Visa", "Mastercard", "American Express", "EFTPOS", "Bank transfer", "Cash"]) {
  if (!business.includes(`"${label}"`)) failures.push(`payment mechanism missing: ${label}`);
}
if (
  !/id:\s*"google"[\s\S]*?url:\s*""[\s\S]*?status:\s*"candidate-not-verified"[\s\S]*?enabled:\s*false/.test(
    business,
  )
)
  failures.push("Google profile must remain hidden until a Sydney profile is verified");
for (const id of ["linkedin", "facebook", "instagram"]) {
  if (!new RegExp(`id:\\s*"${id}"[\\s\\S]*?enabled:\\s*true`).test(business))
    failures.push(`approved ${id} profile is not enabled`);
}
if (business.includes("publicIndexingEnabled: true"))
  failures.push("public indexing hard-coded on");
if (!failures.some((item) => /domain|GA4|social|payment|indexing/.test(item)))
  pass.push(
    "approved platform links, payment methods and verified Sydney GA4 stream are retained; Google profile and production indexing still require their configured gates",
  );

if ((blog.match(/slug: "/g) || []).length !== 14)
  failures.push("blog must contain exactly 14 original launch articles");
if ((blog.match(/published: "2026-09-18"/g) || []).length !== 14)
  failures.push("all launch articles must use the truthful 2026-09-18 publication date");
if (!blog.includes('year: "2026"') || !blog.includes('t("September", "九月")'))
  failures.push("truthful 2026/September blog archive is missing");
for (const key of ["home", "services", "projects", "areas", "about", "contact"]) {
  if (!faqs.includes(`${key}: [`)) failures.push(`missing page FAQ owner ${key}`);
  if (!pages.includes(`pageFaqs.${key}`)) failures.push(`page FAQ is not rendered for ${key}`);
}
if (!siteChrome.includes('localizedPath(locale, "/blog")'))
  failures.push("Blog is missing from shared navigation");
if (!pages.includes("blogPosts.slice(0, 3)")) failures.push("Home latest-guide module is missing");
if ((blogEditorial.match(/^  "/gm) || []).length !== 14)
  failures.push("all 14 guides require a dedicated Sydney context and enquiry decision layer");
for (const token of [
  "GUIDE AT A GLANCE",
  "In this guide",
  'id="sydney-context"',
  'id="when-to-enquire"',
  'sectionId="article-faq"',
]) {
  if (!blogPages.includes(token)) failures.push(`blog article structure missing: ${token}`);
}
if (!failures.some((item) => /blog|FAQ|latest-guide/.test(item)))
  pass.push(
    "14 bilingual guides include truthful archive, article contents, Sydney context, decision layer and page-level FAQs",
  );

const expectedProjectIds = [
  "tile-roof-surfaces",
  "ridge-and-open-sections",
  "valley-and-abutment-details",
  "metal-roof-box-gutter-details",
];
for (const id of expectedProjectIds) {
  if (!media.includes(`id: "${id}"`)) failures.push(`missing project evidence owner ${id}`);
  if (!services.includes(`evidenceProjectId: "${id}"`))
    failures.push(`no service maps to project evidence owner ${id}`);
  if (!pages.includes("id={project.id}")) failures.push("project anchor IDs are not rendered");
}
if ((services.match(/evidenceProjectId: "/g) || []).length !== 6)
  failures.push("all six services must map to one project evidence owner");
for (const field of [
  "evidenceLevel",
  "visibleDetails",
  "enquiryUse",
  "limitation",
  "label",
  "caption",
  "alt",
]) {
  if (!media.includes(`${field}:`)) failures.push(`project evidence field missing: ${field}`);
}
if ((media.match(/src: "\/media\//g) || []).length !== 15)
  failures.push("project evidence gallery must contain exactly 15 selected images");
const imageCounts = [...media.matchAll(/images:\s*\[([\s\S]*?)\n\s*\],/g)].map(
  (match) => (match[1].match(/src: "\/media\//g) || []).length,
);
if (imageCounts.join(",") !== "3,3,4,5")
  failures.push(`project image groups must be 3/3/4/5, found ${imageCounts.join("/")}`);
if (!pages.includes("href={evidencePath(service, locale)}"))
  failures.push("Home service cards do not render Projects evidence links");
if (!pages.includes("href={contactPath(relatedServices[0], locale)}"))
  failures.push("Projects groups do not hand off to a service-selected contact URL");
if (!pages.includes('tone="light"') || !siteChrome.includes("<PaymentIcons locale={locale} />"))
  failures.push("Contact/Footer icon mechanisms are incomplete");
if (!siteChrome.includes("<ContactRail locale={locale} />") || !siteChrome.includes("compact"))
  failures.push("above-the-fold contact rail with compact platform icons is incomplete");
if (
  !pages.includes("lg:items-stretch") ||
  !pages.includes("lg:absolute lg:inset-y-0 lg:right-0") ||
  !pages.includes("lg:grid-rows-2") ||
  !pages.includes("flex min-h-0 flex-col") ||
  !pages.includes("lg:min-h-0 lg:flex-1 lg:aspect-auto") ||
  !pages.includes("project.images.length === 3 || project.images.length === 5")
)
  failures.push("Projects 3/4/5-image mosaic alignment contract is incomplete");
if (
  !enquiryForm.includes("defaultService") ||
  !read("src/routes/contact.tsx").includes("validateSearch")
)
  failures.push("contact service preselection is incomplete");
const publicCopy = [
  pages,
  siteChrome,
  read("src/data/content.ts"),
  media,
  services,
  ...routeFiles
    .filter((file) => /\.tsx$/.test(file))
    .map((file) => read(path.join("src/routes", file))),
].join("\n");
for (const token of [
  "owner-supplied",
  "Owner-supplied",
  "业主提供",
  "evidence-safe",
  "project evidence",
  "real project documentation",
  "review-stage",
  "supporting visual",
]) {
  if (publicCopy.includes(token))
    failures.push(`internal review term appears in public copy: ${token}`);
}
if (
  !failures.some((item) =>
    /project evidence|service cards|Contact|contact service|internal review/.test(item),
  )
)
  pass.push(
    "six service-to-project links, four evidence owners, per-image copy and customer-facing terminology are complete",
  );

if (!quote.includes("Online delivery is not configured yet") || !/,\s*503\b/.test(quote))
  failures.push("quote endpoint lacks unconfigured 503 path");
for (const token of [
  "https://api.resend.com/emails",
  "process.env.RESEND_API_KEY",
  "process.env.QUOTE_FROM_EMAIL",
  "process.env.QUOTE_TO_EMAIL",
  '"Idempotency-Key"',
  "!provider.ok",
  'typeof result?.id !== "string"',
]) {
  if (!quote.includes(token))
    failures.push(`quote endpoint lacks Resend acceptance guard: ${token}`);
}
if (!quote.includes("Content-Type must be application/json"))
  failures.push("quote endpoint lacks content-type guard");
if (!quote.includes("rateLimited")) failures.push("quote endpoint lacks rate limit guard");
if (!failures.some((item) => item.startsWith("quote endpoint")))
  pass.push("enquiry endpoint stays honest and guarded");

const mediaCount = fs
  .readdirSync(path.join(root, "public/media"))
  .filter((file) => /\.jpg$/i.test(file)).length;
const homeSupportingMedia = [
  "hero-ridge-inspection-closeup-v2.jpg",
  "hero-metal-flashing-closeup-v2.jpg",
];
for (const file of homeSupportingMedia) {
  if (!fs.existsSync(path.join(root, "public/media", file))) {
    failures.push(`Home supporting media missing: ${file}`);
  }
}
if (mediaCount !== 18)
  failures.push(`expected 18 selected public media files, found ${mediaCount}`);
else if (!failures.some((item) => item.startsWith("Home supporting media missing")))
  pass.push(
    "18 existing media files are preserved and 15 remain in Projects evidence groups; the Home render check verifies the selected original roof photograph",
  );

const behaviorChecks = spawnSync(
  process.execPath,
  ["--test", "tests/indexing.test.mjs", "tests/home-opening.test.mjs"],
  { cwd: root, encoding: "utf8" },
);
if (behaviorChecks.status !== 0) {
  failures.push("rendered Home, sitemap or host-aware indexing regression check failed");
  console.error(behaviorChecks.stdout);
  console.error(behaviorChecks.stderr);
} else {
  pass.push(
    "actual bilingual Home renders retain the static opening and contact paths; all 56 public sitemap URLs, Privacy indexing, unknown-host protection and error noindex behavior pass",
  );
}

for (const item of pass) console.log(`PASS: ${item}`);
if (failures.length) {
  for (const item of failures) console.error(`FAIL: ${item}`);
  process.exit(1);
}
console.log(
  "REVIEW VALIDATION PASSED — content, rendered Home and host-aware indexing checks passed.",
);
