import { notFound } from 'next/navigation';
import { entities, getEntity } from '@/data';
import { Locale } from '@/data/schema';
import { Detail } from '@/components/detail';
import { pageMetadata } from '@/lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() {
  return entities.map((e) => ({ section: e.kind, slug: e.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  const e = getEntity(section, slug);
  return e
    ? pageMetadata(locale, e.title[locale], e.summary[locale], `${section}/${slug}/`)
    : {};
}
export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  const e = getEntity(section, slug);
  if (!e) notFound();
  return <Detail entity={e} locale={locale} />;
}
