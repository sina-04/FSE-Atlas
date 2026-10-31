import { mkdir, writeFile } from 'node:fs/promises';
import { entities, kindLabels } from '../src/data';
for (const locale of ['en', 'fa'] as const) {
  const items = entities.map((e) => ({
    id: e.id,
    title: e.title[locale],
    otherTitle: e.title[locale === 'en' ? 'fa' : 'en'],
    summary: e.summary[locale],
    kind: e.kind,
    label: kindLabels[e.kind][locale],
    url: `/${locale}/${e.kind}/${e.slug}/`,
    tags: e.tags,
  }));
  await mkdir('public/search', { recursive: true });
  await writeFile(`public/search/${locale}.json`, JSON.stringify(items));
}
console.log(`Generated two local search indexes for ${entities.length} records.`);
