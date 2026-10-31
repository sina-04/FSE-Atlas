import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Microscope,
  Leaf,
  Network,
  BriefcaseBusiness,
  Globe2,
  ExternalLink,
} from 'lucide-react';
import type { Entity, Locale, Kind } from '@/data/schema';
import { categoryLabels, kindLabels, countryNames } from '@/data/labels';
import { dict } from '@/lib/messages';
import { asset, formatNumber, tr } from '@/lib/utils';
import { Mark } from './illustrations';
export const icons: Record<string, typeof BookOpen> = {
  courses: BookOpen,
  careers: BriefcaseBusiness,
  research: Microscope,
  skills: Network,
  resources: BookOpen,
  programs: FlaskConical,
  faculty: Microscope,
  countries: Globe2,
  immigration: Globe2,
  specializations: Leaf,
};
export type CardRecord = Pick<
  Entity,
  | 'id'
  | 'slug'
  | 'kind'
  | 'title'
  | 'summary'
  | 'category'
  | 'tags'
  | 'credits'
  | 'country'
  | 'institution'
  | 'level'
  | 'format'
  | 'access'
  | 'resourceLanguage'
>;
export function EntityCard({
  entity,
  locale,
  compact = false,
}: {
  entity: CardRecord;
  locale: Locale;
  compact?: boolean;
}) {
  const Icon = icons[entity.kind] || FlaskConical;
  const t = dict(locale);
  return (
    <Link
      className={`entity-card ${compact ? 'compact-card' : ''}`}
      href={`/${locale}/${entity.kind}/${entity.slug}/`}
    >
      <div className="card-top">
        <span className={`icon-tile tone-${entity.tags[0]}`}>
          <Icon size={24} strokeWidth={1.5} />
        </span>
        <ArrowUpRight className="card-arrow directional" size={20} />
      </div>
      <span className="card-category">
        {tr(categoryLabels[entity.category] || kindLabels[entity.kind], locale)}
      </span>
      <h3>{tr(entity.title, locale)}</h3>
      <p>{tr(entity.summary, locale)}</p>
      <div className="card-meta">
        {entity.credits !== undefined ? (
          <span>
            {formatNumber(entity.credits, locale)} {t.credits}
          </span>
        ) : entity.country ? (
          <span>{tr(countryNames[entity.country], locale)}</span>
        ) : (
          <span>{t.view}</span>
        )}
        {entity.institution && <small>{entity.institution}</small>}
      </div>
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && (
          <p className="eyebrow">
            <span />
            {eyebrow}
          </p>
        )}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {linkLabel}
          <ArrowRight className="directional" size={18} />
        </Link>
      )}
    </div>
  );
}
export function Breadcrumbs({
  locale,
  items = [],
}: {
  locale: Locale;
  items?: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label={locale === 'fa' ? 'مسیر صفحه' : 'Breadcrumb'}>
      <Link href={`/${locale}/`}>{dict(locale).home}</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span aria-hidden="true" className="breadcrumb-sep">
            /
          </span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function SourceLink({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <a
      href={url.startsWith('/') ? asset(url) : url}
      target="_blank"
      rel="noopener noreferrer"
      className="source-link"
    >
      {children}
      <ExternalLink size={15} aria-hidden="true" />
    </a>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const groups: { title: string; links: [Kind | string, string][] }[] = [
    {
      title: t.courses,
      links: [
        ['courses', t.curriculumTitle],
        ['resources', kindLabels.resources[locale]],
        ['skills', kindLabels.skills[locale]],
      ],
    },
    {
      title: t.careers,
      links: [
        ['careers', kindLabels.careers[locale]],
        ['research', kindLabels.research[locale]],
        ['faculty', kindLabels.faculty[locale]],
      ],
    },
    {
      title: t.immigration,
      links: [
        ['programs', kindLabels.programs[locale]],
        ['specializations', kindLabels.specializations[locale]],
        ['countries', kindLabels.countries[locale]],
      ],
    },
  ];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href={`/${locale}/`} className="brand">
              <Mark />
              <span>
                <b>
                  FSE <span className="brand-serif">Atlas</span>
                </b>
                <small>{t.brandLong}</small>
              </span>
            </Link>
            <p>{t.footerLine}</p>
            <small>{t.footerIndependent}</small>
          </div>
          {groups.map((group) => (
            <div className="footer-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([path, label]) => (
                <Link href={`/${locale}/${path}/`} key={path}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            ©{' '}
            {new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
              useGrouping: false,
            }).format(2026)}{' '}
            FSE Atlas
          </span>
          <span>{t.footerSources}</span>
          <Link href={`/${locale}/about/`}>
            {t.methodology}
            <ArrowUpRight className="directional" size={15} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
