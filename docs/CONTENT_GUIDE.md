# Content editing guide

## Records and sources

The Zod/TypeScript contracts live in `src/data/schema.ts`. `catalogue.ts` contains editorial directories, resources, institutional programmes, research units and country guides. `index.ts` defines curated connections. UI dictionaries live in `src/messages/`; search indexes are generated during development/build.

Every record needs a stable ID and slug, bilingual title/summary, category, tags and a traceable source. Keep IDs and URLs stable when changing display text. Use established Persian terminology and exact official degree names.

Source types distinguish curriculum, institutional, government, educational and editorial evidence. Update verification dates only after actually reviewing the supporting page. A checked date is not a guarantee of future availability or eligibility. Link to legitimate resources rather than copying protected publications. Resource records identify format, language and access; `mixed` indicates a free overview with potentially paid full material.

## Curriculum

`course-import.json` retains 71 workbook records and cell locators. Do not reorder this import: initial IDs and editorial notes follow its source order. `courses.ts` contains reviewed translations, PDF precedence, prerequisites/corequisites and ten additional general-education alternatives. `course-notes.ts` contains editorial introductions.

Use the 2017 PDF as the authority for that historical version. Its 78 specialized credits include 6 internship credits, represented as 72 + 6. Food Plant Unit Operations Design is 3 credits in the PDF and 2 in the workbook; retain both values. The corrected elective pool is 42 available credits, from which 10 are required. General-education alternatives follow the source selection groups; never sum every catalogue entry into graduation requirements.

Official prerequisite/corequisite edges require direct evidence. Editorial relevance must not become an official prerequisite. Do not invent semesters, course codes or current-version claims. Add a separate dataset for a future curriculum revision rather than overwriting 2017 facts.

## Programmes and opportunities

Use exact official programme names and degree levels. A research-group profile is not a vacancy. Published positions require an official application URL, checked date, availability status and deadline if known. The current directory intentionally has no verified listings. Any future population must apply `isActivePosition` during build and browser filtering, so a passed deadline cannot remain active in an older export.

Country pages must use government sources for residence/work conditions and institutional sources for admissions. Do not include costs or deadlines without dated supporting evidence. Do not make eligibility decisions or infer funding/supervisory capacity from a department profile.

## Review and deploy

1. Review the evidence and both translations.
2. Preserve IDs/slugs and add intended relationships.
3. Run `npm run check`.
4. Build with the repository base path, then run `npm run test:e2e`.
5. Review affected pages in both languages/themes, including narrow layouts and keyboard use.
6. Commit to GitHub. Passing checks on `main` deploy automatically.
