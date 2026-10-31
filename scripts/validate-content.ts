import assert from 'node:assert/strict';
import {
  entities,
  relations,
  ofKind,
  courses,
  curriculum,
  entitySchema,
  relationSchema,
} from '../src/data';
import en from '../src/messages/en.json';
import fa from '../src/messages/fa.json';
const ids = new Set<string>(),
  routes = new Set<string>();
for (const e of entities) {
  entitySchema.parse(e);
  assert(!ids.has(e.id), `Duplicate ID ${e.id}`);
  ids.add(e.id);
  const route = `${e.kind}/${e.slug}`;
  assert(!routes.has(route), `Duplicate route ${route}`);
  routes.add(route);
  assert(/^[a-z0-9-]+$/.test(e.slug), `Invalid slug ${e.slug}`);
  if (e.country)
    assert(
      ofKind('countries').some((c) => c.id === e.country),
      `Unknown country ${e.country}`,
    );
  for (const s of e.sources)
    assert(
      s.url.startsWith('/') || new URL(s.url).protocol === 'https:',
      `Invalid source ${s.url}`,
    );
}
for (const r of relations) {
  relationSchema.parse(r);
  assert(ids.has(r.from) && ids.has(r.to), `Broken relationship ${r.from} -> ${r.to}`);
}
const sum = (category: string) =>
  courses
    .filter((c) => c.category === category && !c.id.startsWith('course-option'))
    .reduce((n, c) => n + (c.credits || 0), 0);
assert.equal(sum('basic'), 30);
assert.equal(sum('specialized'), 72);
assert.equal(sum('internship'), 6);
assert.equal(sum('general'), 22);
assert.equal(sum('elective'), 42);
assert.equal(
  curriculum.requirements.reduce((n, r) => n + r.credits, 0),
  140,
);
assert.equal(courses.length, 81);
assert.deepEqual(Object.keys(en).sort(), Object.keys(fa).sort());
for (const [k, v] of Object.entries(fa)) assert(v.trim(), `Missing Persian string ${k}`);
for (const [kind, min] of [
  ['careers', 8],
  ['research', 8],
  ['skills', 24],
  ['resources', 24],
  ['specializations', 10],
  ['programs', 6],
  ['faculty', 6],
  ['countries', 3],
] as const)
  assert(ofKind(kind).length >= min, `Incomplete ${kind}`);
// Official prerequisite edges must be acyclic; editorial connections may form useful networks.
const visit = (id: string, stack = new Set<string>()) => {
  assert(!stack.has(id), `Prerequisite cycle ${id}`);
  const next = new Set(stack).add(id);
  relations
    .filter((r) => r.type === 'prerequisite' && r.from === id)
    .forEach((r) => visit(r.to, next));
};
courses.forEach((c) => visit(c.id));
console.log(
  `Validated ${entities.length} bilingual records, ${relations.length} relationships and the 140-credit curriculum.`,
);
