'use client';
import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Locale, Kind } from '@/data/schema';
import { formatNumber } from '@/lib/utils';
import { filterRecords } from '@/lib/search';
import { dict } from '@/lib/messages';
import { EntityCard, CardRecord } from './common';
import { Button } from './ui/button';
const initial = { q: '', category: '', country: '', level: '', format: '', access: '' };
type Filters = typeof initial;
type Option = { value: string; label: string };
function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="filter-select">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export function Directory({
  items,
  locale,
  kind,
  options,
  countries,
}: {
  items: CardRecord[];
  locale: Locale;
  kind: Kind;
  options: Option[];
  countries: Option[];
}) {
  const t = dict(locale);
  const [filters, setFilters] = useState(initial);
  useEffect(() => {
    const sync = () => {
      const p = new URLSearchParams(location.search);
      setFilters(
        Object.fromEntries(
          Object.keys(initial).map((key) => [key, p.get(key) || '']),
        ) as Filters,
      );
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  function update(changes: Partial<Filters>) {
    const next = { ...filters, ...changes };
    setFilters(next);
    const p = new URLSearchParams(location.search);
    for (const [key, value] of Object.entries(next)) {
      if (value) p.set(key, value);
      else p.delete(key);
    }
    history.replaceState(
      null,
      '',
      `${location.pathname}${p.size ? '?' + p.toString() : ''}${location.hash}`,
    );
  }
  const results = filterRecords(items, filters);
  const all = (label: string, choices: Option[]) => [
    { value: '', label: `${label}: ${t.all}` },
    ...choices,
  ];
  const formats = [
    { value: 'book', label: t.resourceBook },
    { value: 'guide', label: t.resourceGuide },
    { value: 'course', label: t.resourceCourse },
    { value: 'dataset', label: t.resourceDataset },
    { value: 'documentation', label: t.resourceDocumentation },
  ];
  return (
    <div className="directory">
      <div className="filter-bar">
        <div className="directory-search">
          <Search size={20} aria-hidden="true" />
          <input
            type="search"
            value={filters.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder={t.query}
            aria-label={t.query}
          />
        </div>
        <div className="filter-with-icon">
          <SlidersHorizontal size={17} aria-hidden="true" />
          <SelectFilter
            label={kind === 'courses' ? t.category : t.discipline}
            value={filters.category}
            options={all(kind === 'courses' ? t.category : t.discipline, options)}
            onChange={(value) => update({ category: value })}
          />
        </div>
        {countries.length > 0 && (
          <SelectFilter
            label={t.country}
            value={filters.country}
            options={all(t.country, countries)}
            onChange={(value) => update({ country: value })}
          />
        )}
        {kind === 'programs' && (
          <SelectFilter
            label={t.degree}
            value={filters.level}
            options={all(t.degree, [
              { value: 'MSc', label: t.masters },
              { value: 'PhD', label: t.doctorate },
            ])}
            onChange={(value) => update({ level: value })}
          />
        )}
        {kind === 'resources' && (
          <>
            <SelectFilter
              label={t.resourceFormat}
              value={filters.format}
              options={all(t.resourceFormat, formats)}
              onChange={(value) => update({ format: value })}
            />
            <SelectFilter
              label={t.resourceAccessLabel}
              value={filters.access}
              options={all(t.resourceAccessLabel, [
                { value: 'free', label: t.resourceFree },
                { value: 'mixed', label: t.resourceMixed },
              ])}
              onChange={(value) => update({ access: value })}
            />
          </>
        )}
      </div>
      <div className="results-heading">
        <p aria-live="polite">
          {formatNumber(results.length, locale)} {t.results}
        </p>
        {Object.values(filters).some(Boolean) && (
          <Button variant="ghost" onClick={() => update(initial)}>
            <X size={15} />
            {t.clear}
          </Button>
        )}
      </div>
      <h2 className="sr-only">{t.results}</h2>
      {results.length ? (
        <div className="card-grid">
          {results.map((e) => (
            <EntityCard entity={e} locale={locale} key={e.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={32} />
          <h2>{t.emptyFilters}</h2>
          <Button variant="outline" onClick={() => update(initial)}>
            {t.clear}
          </Button>
        </div>
      )}
    </div>
  );
}
