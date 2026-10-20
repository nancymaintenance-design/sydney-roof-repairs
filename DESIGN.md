# Sydney Roof Repairs — approved Small Business adaptation

## Overview

Ellis Services bilingual Sydney roof repair enquiry website. On 20 October 2026 the owner approved the Start Bootstrap Small Business layout with white, charcoal and a single navy accent, and asked for implementation, technical SEO and CLI Git synchronization. Adapt the reference composition to the existing TanStack Start/React application. Keep all existing English and Simplified Chinese routes, metadata, service intent, business facts, photographs, contact routing and optional analytics consent. Home remains the owner for Sydney Roof Repairs.

## Colors

Runtime ownership: `src/styles.css` owns the palette. Components consume the same CSS custom properties through Tailwind arbitrary values. `--brand: #1e3a5f`, `--ink: #202832`, `--muted: #56616f`, `--surface: #f5f7f9`, `--border: #dce2e8`, `--accent-pale: #e6edf5`, `--white: #ffffff`. Historic forest/lime/clay aliases resolve to these tokens; they do not own separate colors. Preserve original logo and natural photo colors. Primary buttons use white text on navy. Dark panels use explicitly light text.

## Typography

Retain the established Inter/system sans stack, with browser Chinese system fallbacks and no new external font request. Display headings use restrained 700–750 weight, readable 1.12–1.17 line height and 32–49px scale. Body copy remains at least 16px with generous line spacing. Do not abbreviate or rewrite the protected H1, title or page intent to fit a layout.

## Layout

Compact white navigation, image-left/text-right homepage introduction, separate light-grey enquiry band and a three-column photographic information grid follow the selected Small Business composition. The real roof photograph is complete and unobscured. The narrow layout stacks the photograph, introduction and actions in natural document flow. Shared navigation, cards, inner-page banners, FAQ and contact forms use the same system. Existing full-photo viewer, service content and the working language counterparts remain available.

## Elevation & Depth

Quiet one-pixel borders, minimal shadows and no decorative background grids. No automatic hero carousel or image overlay. Reserve photo dimensions to prevent shifts. Use short control color transitions and honor reduced motion. Scrollbars stay visible and operable.

## Shapes

Simple rectangular controls and panels, mostly 5–8px corners. Retain original brand asset shapes and familiar social marks. Phone and enquiry actions remain prominent in both languages.

## Components and ownership

`src/styles.css` owns tokens and shared styling; `SiteChrome.tsx` owns header, footer and mobile contact/navigation; `Pages.tsx` owns homepage composition and existing page content; `ContentPageHero.tsx` owns shared inner-page banners. Preserve EnquiryForm's provider-acceptance boundary and editable values on failure. No new backend or demo claims are imported from the template.

## Source and behavioral boundaries

The layout reference is StartBootstrap/startbootstrap-small-business, MIT, with exact source and license recorded in `vendor/startbootstrap-small-business`. No Bootstrap runtime or demonstration photos/copy are shipped. Existing genuine media and source evidence remain unchanged.

The canonical public hostname is sydneyroofrepairservices.com.au. Technical SEO enables eligible public pages on that exact origin, including both Privacy routes, with self-canonical URLs and reciprocal language alternatives. Unknown hosts/previews remain blocked from indexing. Indexing eligibility does not establish Google indexing or rankings. Clarity and GA4 remain separate optional consent choices, with existing site-specific identifiers, masking and contact exclusions. No real enquiry is sent as part of visual testing.
