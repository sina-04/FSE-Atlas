import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ExternalLink, SearchCheck } from 'lucide-react';
import { kinds, Locale, Kind, curriculum } from '@/data/schema';
import { ofKind, sectionIntro, categoryLabels, countryNames, kindLabels } from '@/data';
import { dict } from '@/lib/messages';
import { tr, formatNumber } from '@/lib/utils';
import { pageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/common';
import { Directory } from '@/components/directory';
export const dynamicParams = false;
export function generateStaticParams() {
  return kinds.map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; section: Kind }>;
}) {
  const { locale, section } = await params;
  if (!kinds.includes(section)) return {};
  return pageMetadata(
    locale,
    tr(kindLabels[section], locale),
    tr(sectionIntro[section], locale),
    `${section}/`,
  );
}
export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: Locale; section: string }>;
}) {
  const { locale, section } = await params;
  if (!kinds.includes(section as Kind)) notFound();
  const kind = section as Kind;
  const t = dict(locale);
  const records = ofKind(kind);
  const items = records.map(
    ({
      id,
      slug,
      kind,
      title,
      summary,
      category,
      tags,
      credits,
      country,
      institution,
      level,
      format,
      access,
      resourceLanguage,
    }) => ({
      id,
      slug,
      kind,
      title,
      summary,
      category,
      tags,
      credits,
      country,
      institution,
      level,
      format,
      access,
      resourceLanguage,
    }),
  );
  const options = [
    ...new Set(records.map((e) => (kind === 'courses' ? e.category : e.tags[0]))),
  ].map((value) => ({
    value,
    label: tr(categoryLabels[value] || { en: value, fa: value }, locale),
  }));
  const countryOptions = [
    ...new Set(records.flatMap((e) => (e.country ? [e.country] : []))),
  ].map((value) => ({ value, label: tr(countryNames[value], locale) }));
  const navKinds: Kind[] =
    kind === 'courses' || kind === 'resources'
      ? ['courses', 'resources', 'skills']
      : kind === 'immigration' || kind === 'countries'
        ? ['immigration', 'countries', 'programs', 'faculty']
        : [
            'careers',
            'research',
            'skills',
            'specializations',
            'programs',
            'faculty',
            'positions',
          ];
  return (
    <div className="container">
      <Breadcrumbs locale={locale} items={[{ label: tr(kindLabels[kind], locale) }]} />
      <header className="page-header">
        <p className="eyebrow">
          <span />
          FSE Atlas / {formatNumber(records.length, locale)} {t.results}
        </p>
        <h1>{kind === 'courses' ? t.curriculumTitle : tr(kindLabels[kind], locale)}</h1>
        <p className="page-summary">
          {kind === 'courses' ? t.curriculumIntro : tr(sectionIntro[kind], locale)}
        </p>
        <nav className="secondary-nav" aria-label={t.more}>
          {navKinds
            .filter((k) => k !== kind)
            .map((k) => (
              <Link href={`/${locale}/${k}/`} key={k}>
                {tr(kindLabels[k], locale)}
              </Link>
            ))}
        </nav>
      </header>
      {kind === 'courses' && (
        <>
          <div className="credit-strip" aria-label={t.table}>
            <div className="credit-cell total">
              <strong>{formatNumber(curriculum.total, locale)}</strong>
              <span>{t.requiredCredits}</span>
            </div>
            {curriculum.requirements.map((row) => (
              <div className="credit-cell" key={row.category}>
                <strong>{formatNumber(row.credits, locale)}</strong>
                <span>{tr(categoryLabels[row.category], locale)}</span>
              </div>
            ))}
          </div>
          <div className="notice">
            <p>
              <strong>{t.historical}</strong> · {t.curriculumNotice}
            </p>
            <p>
              {t.electiveNotice} {t.generalNotice}
            </p>
            <Link className="text-link" href={`/${locale}/about/#reconciliation`}>
              {t.reconciliation}
              <ArrowUpRight className="directional" size={17} />
            </Link>
          </div>
        </>
      )}
      {kind === 'programs' && <div className="notice">{t.programmeNotice}</div>}
      {kind === 'faculty' && (
        <div className="notice">
          {t.researchGroup} · {t.positionsHint}
        </div>
      )}
      {kind === 'positions' ? (
        <div className="empty-state">
          <SearchCheck size={36} />
          <h2>{t.positionsEmpty}</h2>
          <p>{t.positionsHint}</p>
          <nav className="secondary-nav">
            <Link href={`/${locale}/faculty/`}>
              {t.viewGroups}
              <ExternalLink size={14} />
            </Link>
            <Link href={`/${locale}/research/`}>{t.browseResearch}</Link>
          </nav>
        </div>
      ) : (
        <Directory
          items={items}
          locale={locale}
          kind={kind}
          options={options}
          countries={countryOptions}
        />
      )}
    </div>
  );
}
