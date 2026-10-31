import { Home } from '@/components/home';
import { Locale } from '@/data/schema';
import { dict } from '@/lib/messages';
import { pageMetadata } from '@/lib/metadata';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    locale === 'fa' ? 'اطلس علوم و مهندسی صنایع غذایی' : 'Food Science & Engineering Atlas',
    dict(locale).heroDescription,
  );
}
export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <Home locale={locale} />;
}
