# FSE Atlas

A bilingual Persian/English guide connecting Food Science and Engineering education with skills, careers, research and international study.

Website: https://sina-04.github.io/fse-atlas/  
Repository: https://github.com/sina-04/fse-atlas

## Develop

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The entry defaults to Persian and remembers an English selection. Direct `/en/` and `/fa/` links always select that language.

## Validate and preview

```sh
npm run check
```

This runs strict TypeScript, ESLint, content/relationship validation and unit tests. To build the GitHub Pages export in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/fse-atlas'
$env:NEXT_PUBLIC_SITE_URL='https://sina-04.github.io/fse-atlas'
npm run build
npm run preview
```

For Bash, prefix the build command with `NEXT_PUBLIC_BASE_PATH=/fse-atlas NEXT_PUBLIC_SITE_URL=https://sina-04.github.io/fse-atlas`.

Preview: http://127.0.0.1:4173/fse-atlas/. The server serves actual exported files with real 404 responses and no SPA fallback.

```sh
npm run test:e2e
```

Local browser tests use an isolated installed Chrome instance; CI installs Playwright Chromium. Tests cover locales/themes, mobile and keyboard navigation, search, filters, direct deep links, reduced motion, persistent themes, automated accessibility and 12 viewport widths.

The post-build step adds compatibility filenames for the Next.js Windows static-export segment-cache issue ([upstream #92339](https://github.com/vercel/next.js/issues/92339)). Linux exports are unchanged.

## Publish

Set repository Settings → Pages → Source to **GitHub Actions**. Pushes to `main` and manual dispatches validate, build and test before deploying `out/`. Pull requests validate without publishing. No deployment token or runtime API secret is required.

## Content

The site contains 81 historical curriculum entries, eight careers, eight research areas, 24 skills, 24 resources, ten graduate specializations, eight institutional degree records (six MSc and two PhD), six research units and three country guides.

The original project files remain in the workspace. Published copies of the supplied documents are in `public/references/`. Read the [content guide](docs/CONTENT_GUIDE.md), [design system](design-system/fse-atlas/MASTER.md) and [validation record](docs/VALIDATION.md) before editing.

This is an independent project, not an official University of Tehran website. The curriculum is historical. Course explanations, relevance links and roadmaps are editorial guidance. Institutional pages establish programme/group existence and scope; current admissions, funding, costs, vacancies and permit conditions must be checked directly.

No unverified open positions are published. External resources in this edition are primarily English, with bilingual summaries. Accounts, remote progress storage, a CMS and automatic vacancy ingestion are outside this release. Preferences stay in the browser; there are no tracking analytics.

## Assets

The first visit attempts to play **Secret Garden — Adagio** from the MP3 supplied in the project. It plays once in the background at 35% volume, without a panel, buttons or settings. If the browser blocks audible autoplay, the site stays silent; no prompt or automatic retry is shown. The encounter is remembered in browser storage (`fse-atlas:welcome-music:v1`), so returning visits do not autoplay or download the track. Playback state survives client navigation and language switching. With storage disabled, the once-per-document guard still prevents repeated attempts.

To test a first visit again, use a fresh browser context or remove only that storage key. The source MP3 remains untouched in the workspace; the website copy is `public/audio/secret-garden-adagio.mp3`. The supplied recording retains its original rights and is not covered by the repository’s MIT code license.

Manrope and Vazirmatn are self-hosted through Fontsource under the SIL Open Font License; see `public/licenses/`. The SVG mark and illustrations were created for this project. The local UI/UX Pro Max authoring skill remains in the workspace and retains its upstream MIT license. External resources retain their providers’ copyright and access terms.
