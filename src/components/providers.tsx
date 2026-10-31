'use client';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { MotionConfig } from 'motion/react';
import { Locale } from '@/data/schema';
import { messages } from '@/lib/messages';
export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
