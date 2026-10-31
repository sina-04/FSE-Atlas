import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Globe2,
  Microscope,
  FlaskConical,
  Network,
  ShieldCheck,
  Sprout,
  GraduationCap,
} from 'lucide-react';
import { byId, courses, ofKind, hrefFor } from '@/data';
import { Locale } from '@/data/schema';
import { dict } from '@/lib/messages';
import { formatNumber, tr } from '@/lib/utils';
import { EntityCard, SectionHeading } from './common';
import { ScienceIllustration } from './illustrations';
import { Button } from './ui/button';
import { Reveal } from './reveal';
export function Home({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const featured = ['course-030', 'course-028', 'course-032', 'course-048']
    .map((id) => byId.get(id)!)
    .filter(Boolean);
  const journey = [
    { slug: 'courses', title: t.courses, desc: t.courseCard, Icon: BookOpen },
    { slug: 'careers', title: t.careers, desc: t.careerCard, Icon: BriefcaseBusiness },
    { slug: 'immigration', title: t.immigration, desc: t.internationalCard, Icon: Globe2 },
  ];
  const connection = [
    byId.get('course-028')!,
    byId.get('microbial-analysis')!,
    byId.get('microbiology-analyst')!,
    byId.get('food-microbiology')!,
  ];
  const researchIcons = [
    FlaskConical,
    Microscope,
    Network,
    Sprout,
    ShieldCheck,
    BookOpen,
    Sprout,
    Network,
  ];
  return (
    <>
      <div className="container">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              {t.heroEyebrow}
            </p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions">
              <Button asChild>
                <Link href={`/${locale}/courses/`}>
                  {t.exploreCourses}
                  <ArrowRight className="directional" size={17} />
                </Link>
              </Button>
              <Link className="text-link" href={`/${locale}/careers/`}>
                {t.exploreCareers}
                <ArrowUpRight className="directional" size={17} />
              </Link>
            </div>
            <div className="hero-footnote">
              <GraduationCap size={28} strokeWidth={1.2} />
              <span>
                <strong>{t.curriculumLabel}</strong>
                <br />
                {t.curriculumYear}
              </span>
            </div>
          </div>
          <div className="hero-art">
            <ScienceIllustration />
            <div className="specimen-label">
              <span className="specimen-index">
                FSE
                <br />
                01—∞
              </span>
              <span>
                {locale === 'fa' ? 'مشاهده. پرسش. کشف.' : 'Observe. Question. Discover.'}
                <strong>
                  {locale === 'fa' ? 'علم در هر دانه' : 'Science in every grain'}
                </strong>
              </span>
            </div>
            <div className="hero-stamp">
              <b>{formatNumber(140, locale)}</b>
              <span>{t.degreeCredits}</span>
            </div>
            <p className="art-caption">{t.heroCaption}</p>
          </div>
        </section>
        <section className="journey-section">
          <div className="journey-heading">
            <p className="eyebrow">{t.journeyLabel}</p>
            <h2>{t.journeyTitle}</h2>
          </div>
          <div className="journey-grid">
            {journey.map(({ slug, title, desc, Icon }, i) => (
              <Link className="journey-card" key={slug} href={`/${locale}/${slug}/`}>
                <span className="journey-number">0{i + 1}</span>
                <ArrowUpRight className="card-arrow directional" size={20} />
                <h3>
                  <Icon size={24} strokeWidth={1.4} />
                  {title}
                </h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <section className="section section-cream">
        <div className="container">
          <SectionHeading
            eyebrow={t.featuredLabel}
            title={t.featuredTitle}
            href={`/${locale}/courses/`}
            linkLabel={t.browseCourses}
          />
          <Reveal className="card-grid four-grid">
            {featured.map((e) => (
              <EntityCard key={e.id} entity={e} locale={locale} />
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container connection-section">
          <div>
            <SectionHeading
              eyebrow={t.connectionLabel}
              title={t.connectionTitle}
              description={t.connectionDescription}
            />
            <Link
              href={hrefFor(
                courses.find((c) => c.id === 'course-028')!,
                locale,
              )}
              className="text-link"
            >
              {tr(connection[0].title, locale)}
              <ArrowRight className="directional" size={18} />
            </Link>
          </div>
          <Reveal className="connection-steps">
            {connection.map((e, i) => (
              <Link className="connection-step" key={e.id} href={hrefFor(e, locale)}>
                <span className="icon-tile">
                  {i === 0 ? (
                    <BookOpen size={22} />
                  ) : i === 1 ? (
                    <Network size={22} />
                  ) : i === 2 ? (
                    <BriefcaseBusiness size={22} />
                  ) : (
                    <Microscope size={22} />
                  )}
                </span>
                <span>
                  <small>
                    {
                      [
                        locale === 'fa' ? 'درس' : 'A course',
                        locale === 'fa' ? 'مهارت' : 'A skill',
                        locale === 'fa' ? 'شغل' : 'A career',
                        locale === 'fa' ? 'پرسش پژوهشی' : 'A research direction',
                      ][i]
                    }
                  </small>
                  <strong>{tr(e.title, locale)}</strong>
                </span>
                <ArrowUpRight className="directional" size={18} />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
      <div className="container">
        <section className="career-band">
          <div className="container career-layout">
            <div>
              <SectionHeading
                eyebrow={t.careersLabel}
                title={t.careersTitle}
                description={t.careersDescription}
              />
              <Link className="text-link" href={`/${locale}/careers/`}>
                {t.exploreCareers}
                <ArrowRight className="directional" size={18} />
              </Link>
            </div>
            <Reveal className="career-list">
              {ofKind('careers')
                .slice(0, 3)
                .map((e) => (
                  <Link className="career-row" href={hrefFor(e, locale)} key={e.id}>
                    <span className="icon-tile">
                      <BriefcaseBusiness size={22} strokeWidth={1.3} />
                    </span>
                    <span>
                      <h3>{tr(e.title, locale)}</h3>
                      <p>{tr(e.summary, locale)}</p>
                    </span>
                    <ArrowUpRight size={22} className="directional" />
                  </Link>
                ))}
            </Reveal>
          </div>
        </section>
      </div>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={t.researchLabel}
            title={t.researchTitle}
            href={`/${locale}/research/`}
            linkLabel={t.browseResearch}
          />
          <Reveal className="research-grid">
            {ofKind('research')
              .filter((_, i) => [0, 1, 3, 6].includes(i))
              .map((e, i) => {
                const Icon = researchIcons[i];
                return (
                  <Link className="research-tile" href={hrefFor(e, locale)} key={e.id}>
                    <Icon size={30} strokeWidth={1.25} />
                    <h3>{tr(e.title, locale)}</h3>
                    <p>{tr(e.summary, locale)}</p>
                  </Link>
                );
              })}
          </Reveal>
        </div>
      </section>
      <section className="section world-section">
        <div className="container">
          <div className="world-inner">
            <div>
              <p className="eyebrow">
                <span />
                {t.worldLabel}
              </p>
              <h2>{t.worldTitle}</h2>
              <p className="section-description">{t.worldDescription}</p>
              <Link className="text-link" href={`/${locale}/countries/`}>
                {t.browseCountries}
                <ArrowRight className="directional" size={18} />
              </Link>
            </div>
            <div>
              {ofKind('countries').map((e, i) => (
                <Link className="world-country" href={hrefFor(e, locale)} key={e.id}>
                  <span className="country-code">{['DE', 'NL', 'CA'][i]}</span>
                  <span>
                    <h3>{tr(e.title, locale)}</h3>
                    <p>{['Hohenheim', 'Wageningen', 'Guelph · British Columbia'][i]}</p>
                  </span>
                  <ArrowUpRight size={24} className="directional" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
