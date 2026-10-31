import '../globals.css';
import { fontVariables } from '@/lib/fonts';
export const metadata = {
  title: 'FSE Atlas · اطلس علوم و مهندسی صنایع غذایی',
  description: 'Food science education, careers and research in English and Persian.',
};
export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
