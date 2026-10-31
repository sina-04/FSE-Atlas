import { MetadataRoute } from 'next';
import { entities } from '@/data';
import { kinds } from '@/data/schema';
import { siteUrl } from '@/lib/utils';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    'about/',
    ...kinds.map((k) => `${k}/`),
    ...entities.map((e) => `${e.kind}/${e.slug}/`),
  ];
  return paths.flatMap((path) =>
    ['fa', 'en'].map((locale) => ({
      url: `${siteUrl}/${locale}/${path}`,
      alternates: { languages: { fa: `${siteUrl}/fa/${path}`, en: `${siteUrl}/en/${path}` } },
    })),
  );
}
