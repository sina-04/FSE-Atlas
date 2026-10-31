import { courses } from './courses';
import { catalogue } from './catalogue';
import { Entity, Kind, L, Relation, Locale } from './schema';
export * from './schema';
export { courses, disciplines } from './courses';
export const entities: Entity[] = [...courses, ...catalogue];
export const byId = new Map(entities.map((e) => [e.id, e]));
export const ofKind = (kind: Kind) => entities.filter((e) => e.kind === kind);
export const hrefFor = (e: Entity, locale: Locale) => `/${locale}/${e.kind}/${e.slug}/`;
export const getEntity = (kind: string, slug: string) =>
  entities.find((e) => e.kind === kind && e.slug === slug);
export { kindLabels, categoryLabels, countryNames } from './labels';
const curatedTargets: Record<string, string[]> = {
  chemistry: [
    'food-scientist',
    'food-chemistry',
    'instrumental-analysis',
    'ingredient-function',
    'chemistry',
    'wur-chemistry',
    'specialization-food-chemistry',
  ],
  microbiology: [
    'microbiology-analyst',
    'food-microbiology',
    'food-biotechnology',
    'microbial-analysis',
    'shelf-life',
    'fda-bam',
    'bad-bug-book',
    'wur-microbiology',
    'hohenheim-biotech',
    'specialization-food-microbiology',
  ],
  engineering: [
    'process-engineer',
    'packaging-specialist',
    'food-engineering',
    'smart-packaging',
    'mass-balances',
    'heat-transfer',
    'process-design',
    'mit-heat',
    'food-contact',
    'hohenheim-materials',
    'specialization-food-engineering',
  ],
  technology: [
    'product-developer',
    'formulation',
    'sensory',
    'food-preservation',
    'wur-technology',
    'hohenheim-food',
    'ubc-group',
    'specialization-food-technology',
  ],
  safety: [
    'food-safety-specialist',
    'quality-assurance',
    'food-safety',
    'hazard-analysis',
    'gmp',
    'traceability',
    'quality-control',
    'haccp',
    'codex',
    'iso22000',
    'wur-safety',
    'specialization-food-safety',
  ],
  data: [
    'rd-researcher',
    'food-data-science',
    'statistics',
    'experimental-design',
    'python-r',
    'excel',
    'nist',
    'doe',
    'python',
    'r',
  ],
  foundations: ['literature-review', 'biology', 'physics'],
  professional: ['scientific-writing', 'technical-english', 'project-planning', 'ift'],
  sustainability: ['sustainable-food', 'fao-loss', 'specialization-sustainable-food-systems'],
  nutrition: ['fooddata', 'food-scientist', 'ingredient-function'],
};
export const relations: Relation[] = [];
for (const course of courses) {
  for (const id of course.prerequisites || [])
    relations.push({
      from: id,
      to: course.id,
      type: 'prerequisite',
      reason: L('Documented prerequisite', 'پیش‌نیاز مستند'),
      source: `/references/ut-fse-2017.pdf#page=${course.pdfPage}`,
    });
  for (const id of course.corequisites || [])
    relations.push({
      from: id,
      to: course.id,
      type: 'corequisite',
      reason: L('Documented corequisite', 'هم‌نیاز مستند'),
      source: `/references/ut-fse-2017.pdf#page=${course.pdfPage}`,
    });
}
for (const entity of entities) {
  for (const tag of entity.tags)
    for (const target of curatedTargets[tag] || []) {
      if (target !== entity.id && byId.has(target) && byId.get(target)?.kind !== entity.kind)
        relations.push({
          from: entity.id,
          to: target,
          type: 'editorial',
          reason: L(
            'A related learning or exploration direction, selected by the editors.',
            'مسیر مرتبط یادگیری یا اکتشاف، انتخاب‌شده توسط تحریریه.',
          ),
          source: '/about/#methodology',
        });
    }
  if (entity.country && entity.kind !== 'countries')
    relations.push({
      from: entity.id,
      to: entity.country,
      type: 'institutional',
      reason: L('Institution located in this country', 'کشور محل مؤسسه'),
      source: entity.sources[0].url,
    });
}
export function relatedTo(entity: Entity, kind?: Kind) {
  const ids = new Set(
    relations
      .filter(
        (r) =>
          r.type !== 'prerequisite' &&
          r.type !== 'corequisite' &&
          (r.from === entity.id || r.to === entity.id),
      )
      .map((r) => (r.from === entity.id ? r.to : r.from)),
  );
  return entities.filter((e) => ids.has(e.id) && (!kind || e.kind === kind));
}
export const sectionIntro: Record<Kind, { en: string; fa: string }> = {
  courses: L(
    'Know what you study. Discover where it can take you.',
    'درس‌ها را بشناسید؛ مسیر کاربردشان را کشف کنید.',
  ),
  careers: L(
    'Find the work that connects with your curiosity.',
    'کاری را پیدا کنید که با کنجکاوی شما پیوند دارد.',
  ),
  research: L('Good questions are the beginning of discovery.', 'پرسش‌های خوب، آغاز کشف‌اند.'),
  skills: L(
    'Turn academic knowledge into practical capability.',
    'دانش دانشگاهی را به توانایی عملی تبدیل کنید.',
  ),
  resources: L(
    'A considered library for your next learning step.',
    'کتابخانه‌ای گزیده برای گام بعدی یادگیری شما.',
  ),
  specializations: L(
    'Choose a direction for deeper study.',
    'مسیری برای مطالعه عمیق‌تر انتخاب کنید.',
  ),
  programs: L(
    'Explore real programmes. Start with the official source.',
    'برنامه‌های واقعی را بشناسید؛ از منبع رسمی آغاز کنید.',
  ),
  faculty: L(
    'Find people, groups and questions that resonate.',
    'گروه‌ها و پرسش‌های همسو با علاقه خود را پیدا کنید.',
  ),
  countries: L(
    'Three destinations. Different paths to explore.',
    'سه مقصد و مسیرهای گوناگون برای کشف.',
  ),
  immigration: L(
    'Prepare for your next chapter across borders.',
    'برای فصل بعدی مسیر خود در جهان آماده شوید.',
  ),
  positions: L(
    'Only documented, checked research opportunities.',
    'فقط فرصت‌های پژوهشی مستند و بررسی‌شده.',
  ),
};
