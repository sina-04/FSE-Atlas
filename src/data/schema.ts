import { z } from 'zod';
export const localeSchema = z.enum(['en', 'fa']);
export type Locale = z.infer<typeof localeSchema>;
export const localizedSchema = z.object({ en: z.string().min(1), fa: z.string().min(1) });
export type Localized = z.infer<typeof localizedSchema>;
export const L = (en: string, fa: string): Localized => ({ en, fa });
export const kinds = [
  'courses',
  'careers',
  'research',
  'skills',
  'resources',
  'specializations',
  'programs',
  'faculty',
  'countries',
  'immigration',
  'positions',
] as const;
export const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  type: z.enum(['curriculum', 'institution', 'government', 'education', 'editorial']),
  checked: z.string().optional(),
  locator: z.string().optional(),
});
export const entitySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  kind: z.enum(kinds),
  title: localizedSchema,
  summary: localizedSchema,
  category: z.string(),
  tags: z.array(z.string()),
  country: z.string().optional(),
  institution: z.string().optional(),
  level: z.enum(['MSc', 'PhD']).optional(),
  format: z.enum(['book', 'guide', 'course', 'dataset', 'documentation']).optional(),
  access: z.enum(['free', 'mixed']).optional(),
  resourceLanguage: z.enum(['en', 'fa']).optional(),
  status: z.enum(['published', 'historical', 'closed', 'unverified']),
  sources: z.array(sourceSchema).min(1),
  sections: z.array(z.object({ title: localizedSchema, body: localizedSchema })),
  credits: z.number().positive().optional(),
  originalCredits: z.number().optional(),
  originalTitle: localizedSchema.optional(),
  prerequisites: z.array(z.string()).optional(),
  corequisites: z.array(z.string()).optional(),
  prerequisiteNote: localizedSchema.optional(),
  pdfPage: z.number().optional(),
  cells: z.string().optional(),
  deadline: z.string().optional(),
  checkedAt: z.string().optional(),
});
export type Entity = z.infer<typeof entitySchema>;
export type Kind = Entity['kind'];
export const relationSchema = z.object({
  from: z.string(),
  to: z.string(),
  type: z.enum(['prerequisite', 'corequisite', 'editorial', 'institutional']),
  reason: localizedSchema,
  source: z.string().min(1),
});
export type Relation = z.infer<typeof relationSchema>;
export const universitySchema = z.object({
  id: z.string(),
  name: localizedSchema,
  country: z.enum(['germany', 'netherlands', 'canada']),
  url: z.url(),
});
export type University = z.infer<typeof universitySchema>;
export const roadmapSchema = z.object({
  careerId: z.string(),
  steps: z
    .array(
      z.object({
        title: localizedSchema,
        description: localizedSchema,
        relatedIds: z.array(z.string()),
      }),
    )
    .min(1),
});
export type CareerRoadmap = z.infer<typeof roadmapSchema>;
export const universities: University[] = [
  {
    id: 'hohenheim',
    name: L('University of Hohenheim', 'دانشگاه هوهنهایم'),
    country: 'germany',
    url: 'https://www.uni-hohenheim.de/en',
  },
  {
    id: 'wageningen',
    name: L('Wageningen University & Research', 'دانشگاه و پژوهشگاه واخنینگن'),
    country: 'netherlands',
    url: 'https://www.wur.nl/en',
  },
  {
    id: 'guelph',
    name: L('University of Guelph', 'دانشگاه گولف'),
    country: 'canada',
    url: 'https://www.uoguelph.ca',
  },
  {
    id: 'ubc',
    name: L('University of British Columbia', 'دانشگاه بریتیش کلمبیا'),
    country: 'canada',
    url: 'https://www.ubc.ca',
  },
];
export const curriculumSchema = z.object({
  id: z.string(),
  university: localizedSchema,
  version: z.string(),
  total: z.number(),
  requirements: z.array(z.object({ category: z.string(), credits: z.number() })),
});
export const curriculum = curriculumSchema.parse({
  id: 'ut-fse-2017',
  university: L('University of Tehran', 'دانشگاه تهران'),
  version: '2017 / ۱۳۹۶',
  total: 140,
  requirements: [
    { category: 'general', credits: 22 },
    { category: 'basic', credits: 30 },
    { category: 'specialized', credits: 72 },
    { category: 'internship', credits: 6 },
    { category: 'elective', credits: 10 },
  ],
});
