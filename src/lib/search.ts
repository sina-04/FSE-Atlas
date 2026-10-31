import { normalize } from './utils';
export function matchesQuery(text: string, query: string) {
  const haystack = normalize(text);
  return normalize(query)
    .split(' ')
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}
export function filterRecords<
  T extends {
    category: string;
    tags: string[];
    country?: string;
    level?: string;
    format?: string;
    access?: string;
    title: { en: string; fa: string };
    summary: { en: string; fa: string };
  },
>(
  records: T[],
  filters: {
    q: string;
    category: string;
    country: string;
    level?: string;
    format?: string;
    access?: string;
  },
) {
  return records.filter(
    (item) =>
      (!filters.category ||
        item.category === filters.category ||
        item.tags.includes(filters.category)) &&
      (!filters.country || item.country === filters.country) &&
      (!filters.level || item.level === filters.level) &&
      (!filters.format || item.format === filters.format) &&
      (!filters.access || item.access === filters.access) &&
      matchesQuery(
        `${item.title.en} ${item.title.fa} ${item.summary.en} ${item.summary.fa} ${item.tags.join(' ')}`,
        filters.q,
      ),
  );
}
