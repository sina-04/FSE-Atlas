import { asset } from '@/lib/utils';
import './globals.css';
import { fontVariables } from '@/lib/fonts';
export const metadata = {
  title: 'Page not found · FSE Atlas',
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <html lang="fa" dir="rtl" className={fontVariables}>
      <body>
        <main className="container not-found">
          <p className="eyebrow">FSE ATLAS / 404</p>
          <h1>این صفحه بیرون از اطلس است.</h1>
          <p>ممکن است نشانی تغییر کرده باشد. از یکی از مسیرهای زیر شروع کنید.</p>
          <p lang="en" dir="ltr">
            This page is outside the atlas. Explore the site in your preferred language.
          </p>
          <nav aria-label="انتخاب زبان / Language">
            <a href={asset('/fa/')} className="button button-primary">
              بازگشت به اطلس
            </a>
            <a href={asset('/en/')} className="button button-outline" lang="en">
              Explore in English
            </a>
          </nav>
        </main>
      </body>
    </html>
  );
}
