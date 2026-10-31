import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, ExternalLink } from 'lucide-react';
import { Entity, Locale, Kind } from '@/data/schema';
import {
  byId,
  relations,
  relatedTo,
  kindLabels,
  categoryLabels,
  countryNames,
  hrefFor,
} from '@/data';
import { dict } from '@/lib/messages';
import { tr, formatNumber, formatDate, asset } from '@/lib/utils';
import { Breadcrumbs, EntityCard, SectionHeading, SourceLink, icons } from './common';
export function Detail({ entity: e, locale }: { entity: Entity; locale: Locale }) {
  const t = dict(locale);
  const Icon = icons[e.kind] || BookOpen;
  const prereqs = (e.prerequisites || []).map((id) => byId.get(id)!).filter(Boolean);
  const coreqs = (e.corequisites || []).map((id) => byId.get(id)!).filter(Boolean);
  const dependents = relations
    .filter((r) => r.type === 'prerequisite' && r.from === e.id)
    .map((r) => byId.get(r.to)!)
    .filter(Boolean);
  const related = relatedTo(e);
  const groups: Kind[] = [
    'courses',
    'skills',
    'careers',
    'research',
    'resources',
    'programs',
    'faculty',
    'specializations',
    'countries',
  ];
  const steps = [t.step1, t.step2, t.step3, t.step4, t.step5, t.step6];
  const stepBodies =
    e.kind === 'careers'
      ? [
          {
            body:
              locale === 'fa'
                ? 'درس‌های مرتبط زیر را مرور و شکاف‌های دانشی را مشخص کنید.'
                : 'Review the related courses below and identify gaps in your foundations.',
            href: `/${locale}/courses/`,
            label: t.exploreCourses,
          },
          {
            body:
              locale === 'fa'
                ? 'از مهارت‌های مرتبط، یک هدف قابل تمرین و یک مثال حل‌شده انتخاب کنید.'
                : 'Choose one related skill, one practice goal and one worked example.',
            href: `/${locale}/skills/`,
            label: t.viewSkills,
          },
          {
            body: tr(
              e.sections.find((s) => s.title.en === 'A portfolio project')!.body,
              locale,
            ),
            href: `/${locale}/resources/`,
            label: t.viewResources,
          },
          {
            body: tr(e.sections.find((s) => s.title.en === 'Build experience')!.body, locale),
            href: `/${locale}/courses/industrial-internship-i/`,
            label: locale === 'fa' ? 'کارورزی صنعتی' : 'Industrial internship',
          },
          {
            body:
              locale === 'fa'
                ? 'رزومه را با شرح شغل واقعی تطبیق دهید. روش، نتیجه و نقش خود را در پروژه توضیح دهید.'
                : 'Tailor your CV to a real role. Explain your methods, findings and contribution in a project.',
            href: `/${locale}/immigration/international-employment/`,
            label: t.immigration,
          },
          {
            body:
              locale === 'fa'
                ? 'منابع و پژوهش‌های رشته را دنبال کنید و برای مرحله بعد هدف مشخص بگذارید.'
                : 'Follow the field’s resources and research, then set a specific next learning goal.',
            href: `/${locale}/research/`,
            label: t.browseResearch,
          },
        ]
      : [];
  return (
    <>
      <div className="container">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: tr(kindLabels[e.kind], locale), href: `/${locale}/${e.kind}/` },
            { label: tr(e.title, locale) },
          ]}
        />
        <div className="detail-heading">
          <header className="page-header">
            <p className="eyebrow">
              <span />
              {tr(kindLabels[e.kind], locale)}
            </p>
            <h1>{tr(e.title, locale)}</h1>
            <p className="page-summary">{tr(e.summary, locale)}</p>
            <div className="detail-meta">
              <span className="badge">
                {tr(categoryLabels[e.category] || kindLabels[e.kind], locale)}
              </span>
              {e.credits !== undefined && (
                <span className="badge">
                  <BookOpen size={14} />
                  {formatNumber(e.credits, locale)} {t.credits}
                </span>
              )}
              {e.kind === 'courses' && <span className="badge">{t.historical}</span>}
              {e.country && (
                <Link className="badge" href={`/${locale}/countries/${e.country}/`}>
                  {tr(countryNames[e.country], locale)}
                  <ArrowUpRight className="directional" size={13} />
                </Link>
              )}
              {e.level && (
                <span className="badge" dir="ltr">
                  {e.level}
                </span>
              )}
            </div>
            {e.institution && (
              <p className="muted text-small" style={{ marginTop: 14 }}>
                {e.institution}
              </p>
            )}
          </header>
          <span className="icon-tile">
            <Icon size={38} strokeWidth={1.2} />
          </span>
        </div>
        <div className="detail-layout">
          <article className="article-body">
            {e.kind === 'courses' && (
              <>
                <p className="notice">{t.courseLens}</p>
                <section className="article-section">
                  <h2>{t.prerequisites}</h2>
                  {prereqs.length ? (
                    <div className="prereq-list">
                      {prereqs.map((p) => (
                        <Link href={hrefFor(p, locale)} key={p.id}>
                          {tr(p.title, locale)}
                          <ArrowUpRight className="directional" size={15} />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p>{t.noPrerequisites}</p>
                  )}
                  {coreqs.length > 0 && (
                    <>
                      <h3 style={{ marginBlock: '22px 12px' }}>{t.corequisites}</h3>
                      <div className="prereq-list">
                        {coreqs.map((p) => (
                          <Link href={hrefFor(p, locale)} key={p.id}>
                            {tr(p.title, locale)}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {(prereqs.length > 0 || dependents.length > 0) && (
                    <details style={{ marginTop: 24 }}>
                      <summary className="text-link">
                        {t.diagram}
                        <ArrowRight className="directional" size={16} />
                      </summary>
                      <div className="prereq-diagram" aria-label={t.diagram}>
                        {prereqs.map((p) => (
                          <div key={p.id}>
                            <Link
                              href={hrefFor(p, locale)}
                              className="node"
                              style={{ display: 'block' }}
                            >
                              {tr(p.title, locale)}
                            </Link>
                            <span className="graph-connector" aria-hidden="true" />
                          </div>
                        ))}
                        <div className="node current-node">{tr(e.title, locale)}</div>
                        {dependents.length > 0 && (
                          <>
                            <span className="graph-connector" aria-hidden="true" />
                            <h3 className="text-small muted" style={{ marginBlock: 15 }}>
                              {t.dependentCourses}
                            </h3>
                            {dependents.map((p) => (
                              <Link
                                href={hrefFor(p, locale)}
                                className="node"
                                style={{ display: 'block' }}
                                key={p.id}
                              >
                                {tr(p.title, locale)}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    </details>
                  )}
                </section>
              </>
            )}
            {e.kind === 'programs' && <p className="notice">{t.programmeNotice}</p>}
            {e.sections.map((s, i) => (
              <section className="article-section" key={i}>
                <h2>{tr(s.title, locale)}</h2>
                <p>{tr(s.body, locale)}</p>
              </section>
            ))}
            {e.kind === 'careers' && (
              <section className="article-section">
                <h2>{t.roadmap}</h2>
                <p>{t.roadmapIntro}</p>
                <div className="roadmap">
                  {steps.map((step, i) => (
                    <details key={step} open={i === 0}>
                      <summary>{step}</summary>
                      <div className="roadmap-body">
                        <p>{stepBodies[i].body}</p>
                        <Link className="text-link" href={stepBodies[i].href}>
                          {stepBodies[i].label}
                          <ArrowUpRight className="directional" size={15} />
                        </Link>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
            {e.originalTitle &&
              (e.originalTitle.en !== e.title.en || e.originalCredits !== e.credits) && (
                <section className="article-section">
                  <h2>{t.original}</h2>
                  <p dir="auto">{e.originalTitle.en}</p>
                  {e.originalCredits !== e.credits && (
                    <p>
                      {locale === 'fa'
                        ? `فایل صفحه‌گسترده: ${formatNumber(e.originalCredits!, locale)} واحد. جدول PDF: ${formatNumber(e.credits!, locale)} واحد. مقدار PDF نمایش داده می‌شود.`
                        : `Workbook: ${e.originalCredits} credits. PDF table: ${e.credits} credits. The PDF value is displayed.`}
                    </p>
                  )}
                  <Link href={`/${locale}/about/#reconciliation`} className="text-link">
                    {t.reconciliation}
                    <ArrowUpRight className="directional" size={15} />
                  </Link>
                </section>
              )}
            <Link
              className="text-link"
              style={{ marginTop: 25 }}
              href={`/${locale}/${e.kind}/`}
            >
              {t.backToDirectory}
              <ArrowRight className="directional" size={16} />
            </Link>
          </article>
          <aside className="source-panel">
            <h2>{t.sources}</h2>
            {e.sources.map((s, i) => (
              <div className="source-item" key={i}>
                <SourceLink url={s.url.startsWith('/about/') ? `/${locale}${s.url}` : s.url}>
                  {s.type === 'editorial' ? t.editorial : s.title}
                </SourceLink>
                {s.locator && <small dir="auto">{s.locator}</small>}
                {s.checked && (
                  <small>
                    <CalendarDays
                      size={12}
                      style={{ display: 'inline', marginInlineEnd: 5 }}
                    />
                    {t.checked} {formatDate(s.checked, locale)}
                  </small>
                )}
              </div>
            ))}
            <p>{t.sourceNote}</p>
            {e.kind !== 'courses' && e.sources.some((s) => s.checked) && <p>{t.dateNote}</p>}
            {['programs', 'faculty', 'resources'].includes(e.kind) && (
              <a
                className="button button-primary"
                href={asset(e.sources[0].url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.external}
                <ExternalLink size={15} />
              </a>
            )}
            {e.kind === 'resources' && (
              <p>
                {t.resourceLanguage}
                <br />
                {t.resourceAccess}
              </p>
            )}
          </aside>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <div className="container">
            <SectionHeading
              eyebrow={t.related}
              title={locale === 'fa' ? 'دانش را به مسیر پیوند دهید.' : 'Connect the dots.'}
            />
            {groups
              .filter((k) => k !== e.kind && related.some((r) => r.kind === k))
              .map((k) => (
                <div className="related-group" key={k}>
                  <h3>{tr(kindLabels[k], locale)}</h3>
                  <div className="card-grid">
                    {related
                      .filter((r) => r.kind === k)
                      .slice(0, 3)
                      .map((r) => (
                        <EntityCard key={r.id} entity={r} locale={locale} compact />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
