# Validation record

Local validation completed on 1 November 2026 using Node.js 24.21.0 on Windows and isolated Chrome via Playwright.

## Passing checks

- Strict TypeScript and ESLint.
- Six unit tests: Persian/Arabic normalization, combined filters, locale URLs, date/number formatting, position expiry, and curriculum/source reconciliation.
- Content validation: 175 bilingual entities, 1,246 explicit relationships, unique routes/IDs, translation keys, prerequisite cycles, source references and the 140-credit requirement.
- Production static export: 380 exported HTML files checked for valid internal routes and asset links beneath `/fse-atlas/`.
- Twenty Playwright tests: both locales/themes, direct deep links and refresh, global search, country/degree/resource filters, language-state preservation, root preference, keyboard/mobile dialogs, focus restoration, 200% text scaling and the bilingual 404.
- Theme tests verify the measured circular-reveal origin, farthest-corner radius, 650 ms duration, persistence, system preference, reduced motion, rapid clicks and unsupported-API fallback.
- Overflow checks cover 320, 360, 375, 390, 430, 600, 768, 1024, 1280, 1440, 1920 and 2560 px in both languages.
- Automated WCAG-tagged axe scans pass on representative pages in both languages/themes. Desktop, dark Persian and mobile Persian screenshots were visually reviewed.
- Production dependency audit reports zero vulnerabilities.

## Lighthouse

Lighthouse 13.6.0, default mobile simulation, local exported production site:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| English homepage | 100 | 100 | 100 | 100 |
| Persian homepage | 100 | 100 | 100 | 100 |
| English curriculum | 97 | 100 | 100 | 100 |

These are lab measurements, not guarantees across devices, networks or future content changes. Full generated reports and screenshots remain in the ignored local `tmp/` folder.

## Implementation notes

The build includes an idempotent compatibility step for Next.js issue #92339, correcting Windows-generated segment-cache filenames. The export is tested using real static file serving, without SPA fallback. Fonts are local and preloaded through Next.js.

Research/programme scope checks are documented in `source-verification.json`. The curriculum is the supplied historical 2017 version. Course study lenses and relevance connections are editorial. No unverified vacancy, tuition, funding, deadline or immigration eligibility claim is published. The resource directory currently links primarily English materials with bilingual summaries.

GitHub Actions repeats validation, production build, export-link checks and Chromium browser tests before publication. Deployment status and the live URL must be checked separately from these local results.

## Welcome music update

The first encounter attempts the supplied Secret Garden — Adagio MP3. Four additional browser tests cover successful and blocked autoplay, real MP3 decoding/playback, pause/volume/dismiss controls, language/navigation continuity, returning visits without audio downloads, restricted storage and late rejected playback promises. Autoplay blocking is handled with an explicit Play button. The full browser suite now contains 20 tests.
