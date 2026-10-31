# Premium visual overhaul — verification

> Historical first PR pass. The current revision and rerun test results are recorded in [overhaul-qa.md](overhaul-qa.md).

Date: 30 October 2026. Starting GitHub main: `8189647ffcd700f0d2c2548c020ad398bafacec3`.

## Result

- `npm ci --no-audit --no-fund`: passes after repairing the original picomatch lockfile mismatch.
- `npm run typecheck`: passes.
- `npm run lint`: passes with zero warnings/errors.
- `npm run build`: passes. Next warns about missing metadataBase because no production origin is configured; see deployment requirements below.
- Playwright production suite: **25 passed, 1 intentionally skipped**, 0 unexpected, 0 flaky. The desktop run skips the mobile-only navigation case. Desktop: 1440×900. Mobile: iPhone 13 / 390×844 CSS viewport. Results summary: `premium-evidence/test-results.json`.
- Separate before/after screenshot captures cover home, menu, gallery, contact and the new product dialog. Mobile screenshots are stored at CSS pixel scale.
- All 35 WebP assets decode successfully; image and font files are nonempty.
- `git diff --check`: passes.

## Behavior verified

The menu still has all 11 products and has no prices, totals, franchise sections or invented reviews. Category filtering and category deep links work. Newly mounted filtered cards receive scroll reveals. The hero has three manual scenes and functioning next/previous buttons. Header background changes on scroll. Reduced-motion preference changes take effect live and disable reveal/parallax. All visible images load on every public route, and tested layouts fit the viewport. Additional 320px and 768px viewport checks verify that the hero title fits without clipping.

WhatsApp links retain **905402560609** (settings/environment overrides are preserved). Tests decode the URL query and verify product name, quantity, every checked chocolate and fruit option, and a Turkish note containing `&`. Group limits and quantity bounds are enforced. The message asks the business to confirm availability and pickup. Tests do not send an actual WhatsApp message or independently establish that a human currently monitors that number.

The product detail uses a native modal dialog for focus containment/Escape; closing restores focus. The seed menu's existing preference groups are now exposed. Special-series recipes retain their fixed descriptions and have no invented customization groups. Preferences and existing selection limits are not a guarantee of stock or a claim that the external platform offers identical customization controls.

Admin routes remain authenticated, CSRF origin checks are unchanged, unauthenticated product/settings writes return 403, and admin pages include noindex. The validator accepts existing HTTPS image URLs and safe `/images/...` paths, so changing other fields no longer rejects a seed image. It rejects traversal, protocol-relative and script URLs. The editor supports local image paths and retains the rights confirmation. No file-upload service, public write endpoint, hardcoded password, temporary persistence or authentication bypass was introduced.

## Failed attempts and fixes

The initial `npm ci` failed on the inherited lockfile mismatch; `npm install` repaired it and a subsequent clean `npm ci` succeeded. The inherited Playwright configuration referenced a Mac-only Chrome path; it now uses Playwright's managed browser by default, with an optional environment override. The standard browser archive download was truncated in this environment, so QA used a Chromium 153 executable supplied by `@sparticuz/chromium` installed outside the repository, via `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. This QA runtime is not a production dependency. The first server attempt hit a network-interface lookup error; explicitly binding the test server to 127.0.0.1 resolved it.

The first visual pass caught two empty encoded WebP files (`bardak`, `lotus-caramel`). Both were re-encoded from their generated PNGs and all assets were decoded again. An image-wait test included a hidden mobile lazy image; it now checks rendered images. Initial image-loading failures were corrected and the full suite rerun successfully. Screenshot capture uses bounded font/image waits; the separate image-loading test asserts actual successful browser decoding. An early screenshot run overlapped dependency reinstallation and emitted missing-module errors; clean captures were repeated after installation completed.

## Required deployment configuration / unverified behavior

- **No DATABASE_URL, ADMIN_PASSWORD_HASH or SESSION_SECRET were supplied.** Live authenticated database writes, image URL persistence and migration against an actual PostgreSQL instance could not be exercised. Configure them and run `npm run db:migrate`; do not bypass authentication. The public site works with the 11 seed products without a database.
- **NEXT_PUBLIC_SITE_URL must be set to the real HTTPS origin at build time.** No domain was invented. Canonicals, structured-data URL and sitemap URLs are emitted only when configured. Without it the sitemap is empty, robots omits a sitemap URL and Next warns that social image resolution defaults to localhost.
- Existing database product rows are not overwritten by seed edits. An already seeded production database must have its chosen image URLs updated through the authenticated panel (or an owner-reviewed data migration). Owner-provided custom images are preserved.
- Hours, Instagram and delivery remain governed by the existing settings. No unverified opening hours, account or delivery claim was added.

## Content sources

Current [Migros Wrapples menu](https://www.migros.com.tr/yemek/wrapples-waffle-efeler-guzelhisar-mah-st-2eee8) fetched 30 October 2026 confirms all 11 names and special-series ingredient descriptions. Prices and unrelated categories from the source were not imported. Source images remain in `public/images/products/`, with provenance in `real-media-audit.md`. The actual location contact and storefront-sign crop are preserved.

19 original AI photographs were generated with the built-in image tool: 3 hero scenes, 11 product still lifes, 5 preparation/table/cafe-atmosphere images. There are 23 optimized WebP files including 4 category-square variants (about 3.9MB total), plus a 1200×630 social preview. Full prompts are in `premium-image-manifest.json`. All generated product views are labeled “Temsili sunum”; both AI interiors explicitly say they are not the real premises. The 6 original source photos remain in the real-photo gallery, and the 5 previous illustrative assets remain archived in the repo.

Fonts are self-hosted with their licenses in `public/fonts/`; Google Fonts network imports were removed.
