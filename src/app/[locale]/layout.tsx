import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { localeSchema } from '@/data/schema';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { WelcomeMusic } from '@/components/welcome-music';
import { Footer } from '@/components/common';
import { dict } from '@/lib/messages';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';
export const metadata: Metadata = {
  title: { default: 'FSE Atlas', template: '%s · FSE Atlas' },
  applicationName: 'FSE Atlas',
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg` },
};
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'fa' }, { locale: 'en' }];
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const result = localeSchema.safeParse((await params).locale);
  if (!result.success) notFound();
  const locale = result.data;
  return (
    <html
      lang={locale}
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body>
        <Providers locale={locale}>
          <Header locale={locale} />
          <WelcomeMusic locale={locale} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
        </Providers>
        <noscript>
          <p className="container notice">{dict(locale).sourceNote}</p>
        </noscript>
      </body>
    </html>
  );
}
