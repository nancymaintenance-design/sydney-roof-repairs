# Sydney Roof Repairs

Independent Ellis Services English / Simplified Chinese roof repair website.

- Canonical site: https://sydneyroofrepairservices.com.au
- Sitemap: https://sydneyroofrepairservices.com.au/sitemap.xml
- GitHub: https://github.com/nancymaintenance-design/sydney-roof-repairs
- Vercel project: `sydney-roof-repairs-flow-b`
- Vercel project ID: `prj_m9fq0Lb9aHy3EPIAUwYpmInBHgDi`
- Vercel team: `nancymaintenance-8624s-projects`

## Development and validation

Use Node 24 and the pinned pnpm lockfile. Keep checkouts, dependency stores, temporary files and generated assets physically on D:.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm lint
node --test tests/*.test.mjs
pnpm validate:review
pnpm build
```

The canonical domain is enabled at build time with `VITE_SITE_URL=https://sydneyroofrepairservices.com.au`, `VITE_DOMAIN_OWNERSHIP_VERIFIED=true`, and `VITE_SITE_INDEXABLE=true`. The last variable is enabled in the existing Vercel Production configuration for the approved 20 October 2026 release. `.env.example` remains safe for local review. Public configuration values are not credentials.

All 56 English/Chinese content routes, including both Privacy pages, belong in the public sitemap. Unknown aliases, previews and nonstandard ports remain noindex and cannot publish the production canonical, hreflang or structured data. Unknown pages return a real 404. Domain normalization redirects www to the HTTPS apex.

## Design

The owner approved the MIT Start Bootstrap Small Business composition with white, charcoal and navy on 20 October 2026. The implementation adapts its image/introduction layout, enquiry band and three-column cards into the existing TanStack Start application. It does not add a Bootstrap runtime or migrate the framework. Source and license are retained in `vendor/startbootstrap-small-business`. Shared visual ownership and token mappings are documented in `DESIGN.md`.

The original business data, all original media, service URLs, protected titles/H1s, contact recipients and site-specific consent/analytics configuration are preserved. `public/clarity-consent.js` is a reviewed shared runtime pinned by checksum; its formatting is intentionally preserved.

## Deployment

Use the existing authenticated Nancy CLI profile and the exact linked project. Local builds and behavioral checks validate the candidate; the Vercel Production build runs `vercel-build` so release validation can check the presence of non-downloadable platform Secrets without exporting them. Stage the Production deployment with `vercel deploy --prod --skip-domain --build-env RELEASE_APPROVED=true`, check it, then promote the same build. The approval build variable records the owner's current release instruction; it must not be used to bypass a later approval requirement. Do not create a replacement Vercel project or change DNS.

Server-side email credentials remain in the existing Vercel Production environment and must never enter Git, public files, client code or logs. The form only reports success when the configured provider explicitly accepts it. Local error-path checks use synthetic data with delivery credentials absent; they do not prove inbox receipt. Do not send real enquiries merely to test a visual revision.
