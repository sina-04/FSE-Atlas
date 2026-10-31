import type { Metadata } from 'next';
import type { Locale } from '@/data/schema';
import { siteUrl } from './utils';
export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = '',
): Metadata {
  const url = `${siteUrl}/${locale}/${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/${path}`,
        fa: `${siteUrl}/fa/${path}`,
        'x-default': `${siteUrl}/fa/${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'FSE Atlas',
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: 'FSE Atlas · Food Science & Engineering',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og.png`],
    },
  };
}
