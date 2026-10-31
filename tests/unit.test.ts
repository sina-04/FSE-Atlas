import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalize,
  switchLocale,
  formatDate,
  formatNumber,
  isActivePosition,
} from '../src/lib/utils';
import { filterRecords, matchesQuery } from '../src/lib/search';
import { ofKind, courses, byId, relatedTo, curriculum } from '../src/data';
test('Persian, Arabic, diacritics, ZWNJ and numerals normalize consistently', () => {
  assert.equal(normalize('ميكروبيولوژي ۱'), normalize('میکروبیولوژی 1'));
  assert.equal(normalize('کيفيّت ٢'), normalize('کیفیت ۲'));
  assert.equal(normalize('فرا‌سودمند'), normalize('فراسودمند'));
  assert(matchesQuery('Food Microbiology 1', 'food ۱'));
});
test('filters combine country, discipline and bilingual text', () => {
  const results = filterRecords(ofKind('programs'), {
    q: 'food',
    category: 'safety',
    country: 'netherlands',
  });
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'wur-safety');
  assert.equal(
    filterRecords(courses, { q: 'ميكروبيولوژي ۱', category: 'specialized', country: '' })
      .length,
    1,
  );
  assert.equal(
    filterRecords(courses, { q: 'no-such-course', category: '', country: '' }).length,
    0,
  );
  assert.equal(
    filterRecords(ofKind('programs'), { q: '', category: '', country: '', level: 'PhD' })
      .length,
    2,
  );
  assert.equal(
    filterRecords(ofKind('resources'), { q: '', category: '', country: '', access: 'mixed' })
      .length,
    1,
  );
  assert.equal(
    filterRecords(ofKind('resources'), {
      q: '',
      category: '',
      country: '',
      format: 'course',
      access: 'free',
    }).length,
    3,
  );
});
test('locale navigation preserves query and fragment without changing slugs', () => {
  assert.equal(
    switchLocale('/fa/courses/?q=food&category=basic#results', 'en'),
    '/en/courses/?q=food&category=basic#results',
  );
  assert.equal(
    switchLocale('/en/careers/food-scientist/', 'fa'),
    '/fa/careers/food-scientist/',
  );
});
test('date and number formatting preserve underlying values', () => {
  assert(formatDate('2026-10-31', 'en').includes('2026'));
  assert(formatDate('2026-10-31', 'fa').includes('۱۴۰۵'));
  assert.equal(formatNumber(140, 'fa'), '۱۴۰');
});
test('positions require checked publication and do not outlive a deadline', () => {
  assert(
    isActivePosition(
      { status: 'published', checkedAt: '2026-10-31', deadline: '2026-11-01' },
      '2026-10-31',
    ),
  );
  assert(
    !isActivePosition(
      { status: 'published', checkedAt: '2026-10-31', deadline: '2026-10-30' },
      '2026-10-31',
    ),
  );
  assert(!isActivePosition({ status: 'unverified', deadline: '2027-01-01' }, '2026-10-31'));
  assert(!isActivePosition({ status: 'closed', checkedAt: '2026-10-31' }, '2026-10-31'));
});
test('curriculum separates options from requirements and retains corrected source value', () => {
  assert.equal(curriculum.total, 140);
  assert.equal(byId.get('course-064')?.credits, 3);
  assert.equal(byId.get('course-064')?.originalCredits, 2);
  assert.equal(curriculum.requirements.find((r) => r.category === 'elective')?.credits, 10);
  assert.equal(
    courses.filter((c) => c.category === 'elective').reduce((sum, c) => sum + c.credits!, 0),
    42,
  );
  const micro = byId.get('course-028')!;
  assert(relatedTo(micro).some((e) => e.id === 'microbiology-analyst'));
});
