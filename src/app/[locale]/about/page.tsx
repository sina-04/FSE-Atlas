import { Locale, L } from '@/data/schema';
import { dict } from '@/lib/messages';
import { tr } from '@/lib/utils';
import { pageMetadata } from '@/lib/metadata';
import { Breadcrumbs, SourceLink } from '@/components/common';
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return pageMetadata(locale, dict(locale).about, dict(locale).footerSources, 'about/');
}
export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dict(locale);
  const sections = [
    {
      id: 'purpose',
      title: L('A thoughtful companion to your studies', 'همراهی برای مسیر یادگیری شما'),
      body: L(
        'FSE Atlas is an independent educational guide connecting food science courses with skills, careers, research and international study. It is not operated by the University of Tehran and does not award qualifications.',
        'اطلس غذا راهنمای آموزشی مستقلی است که درس‌های علوم غذا را به مهارت، شغل، پژوهش و تحصیل بین‌المللی پیوند می‌دهد. این وب‌سایت متعلق به دانشگاه تهران نیست و مدرک تحصیلی صادر نمی‌کند.',
      ),
    },
    {
      id: 'methodology',
      title: L('Evidence before recommendations', 'شواهد، پیش از پیشنهاد'),
      body: L(
        'Academic requirements are transcribed from the supplied 2017 University of Tehran document. Course learning lenses, skill connections and career roadmaps are editorial guidance. A related-content link signals a relevant learning direction, not an official prerequisite or a guarantee of employment or admission. Institutional programmes and research units link to their official pages; a group profile is not an advertised vacancy.',
        'الزامات دانشگاهی از سند ارائه‌شده دانشگاه تهران در سال ۱۳۹۶ استخراج شده‌اند. محورهای یادگیری درس، ارتباط مهارت‌ها و نقشه راه شغلی راهنمای تحریریه هستند. پیوند محتوای مرتبط مسیر یادگیری مناسب را نشان می‌دهد، نه پیش‌نیاز رسمی یا تضمین شغل و پذیرش. برنامه‌ها و واحدهای پژوهشی به صفحه رسمی پیوند دارند؛ معرفی گروه به معنی آگهی موقعیت نیست.',
      ),
    },
    {
      id: 'curriculum',
      title: L('A versioned historical curriculum', 'برنامه درسی تاریخی و نسخه‌دار'),
      body: L(
        'The document was approved in 1396 (2017). Its degree requirement is 140 credits: 22 general education, 30 foundations, 78 specialized credits including 6 internship credits, and 10 electives. The explorer separates the 72 other specialized credits from internships. General-education alternatives and elective choices are not all compulsory. No semester sequence or official course identifiers have been inferred.',
        'سند در سال ۱۳۹۶ (۲۰۱۷) تصویب شده است. دوره ۱۴۰ واحد دارد: ۲۲ عمومی، ۳۰ پایه، ۷۸ تخصصی شامل ۶ کارورزی و ۱۰ انتخابی. در اطلس، ۷۲ واحد تخصصی دیگر از کارورزی جدا شده‌اند. همه گزینه‌های عمومی و انتخابی اجباری نیستند. ترتیب نیم‌سال و شناسه رسمی درس استنباط نشده است.',
      ),
    },
    {
      id: 'reconciliation',
      title: L('Reconciliation of the supplied sources', 'تطبیق منابع ارائه‌شده'),
      body: L(
        'The workbook contains 71 course entries and selected general-education options. Ten additional general-education alternatives from PDF page 5 bring this catalogue to 81 entries. The PDF lists Food Plant Unit Operations Design as 3 credits (page 8); the workbook lists 2 (L15:N15). The site displays 3 and retains the original 2-credit value in the record. Consequently, the available elective pool is 42 credits rather than the workbook’s 41; only 10 elective credits are required. Original English wording is retained where editorial translations have been corrected. Detailed PDF syllabi and bibliography remain available in the source document; the website’s learning lenses are editorial summaries.',
        'فایل صفحه‌گسترده ۷۱ رکورد درس و گزینه‌های منتخب عمومی دارد. ده گزینه عمومی دیگر از صفحه ۵ PDF، فهرست اطلس را به ۸۱ رکورد می‌رساند. طراحی واحدهای عملیاتی در کارخانه در صفحه ۸ PDF سه واحد و در فایل صفحه‌گسترده (L15:N15) دو واحد است. سایت سه واحد را نمایش می‌دهد و مقدار اصلی دو واحد را در رکورد نگه می‌دارد. بنابراین مجموع گزینه‌های انتخابی ۴۲ واحد است، نه ۴۱ واحد فایل؛ فقط ۱۰ واحد انتخابی لازم است. عبارت انگلیسی اولیه در موارد اصلاح ترجمه نگهداری شده است. سرفصل و کتابنامه تفصیلی در PDF قابل مطالعه است؛ محورهای یادگیری وب‌سایت خلاصه‌های تحریریه هستند.',
      ),
    },
    {
      id: 'verification',
      title: L('What a verification date means', 'معنای تاریخ بررسی'),
      body: L(
        'Programme and research-group pages were reviewed on 31 October 2026 for existence and subject scope. This does not verify an applicant’s eligibility, a future intake, available funding or a vacancy. Costs, deadlines and permit conditions should be checked directly with the institution or government. This edition publishes no unverified open positions and does not provide immigration eligibility decisions.',
        'صفحات برنامه‌ها و گروه‌های پژوهشی در ۳۱ اکتبر ۲۰۲۶ از نظر وجود و دامنه موضوعی بررسی شدند. این بررسی به معنی تأیید شرایط متقاضی، ورودی آینده، تأمین مالی یا موقعیت خالی نیست. هزینه، مهلت و شرایط مجوز را از مؤسسه یا دولت بررسی کنید. این نسخه موقعیت باز تأییدنشده منتشر نمی‌کند و درباره واجد شرایط بودن مهاجرت تصمیم نمی‌گیرد.',
      ),
    },
    {
      id: 'privacy',
      title: L('Privacy and accessibility', 'حریم خصوصی و دسترس‌پذیری'),
      body: L(
        'Language and theme preferences are stored in your browser. Search uses a local, published index; no account, analytics or external search service is required. The interface supports keyboard use, reduced motion, Persian RTL and English LTR. Public learning resources retain their own copyright and access terms.',
        'ترجیحات زبان و رنگ در مرورگر شما ذخیره می‌شوند. جست‌وجو از فهرست عمومی محلی استفاده می‌کند؛ حساب، تحلیل‌گر ردیابی و موتور جست‌وجوی بیرونی لازم نیست. رابط از صفحه‌کلید، کاهش حرکت، راست‌به‌چپ فارسی و چپ‌به‌راست انگلیسی پشتیبانی می‌کند. حقوق و شرایط دسترسی منابع آموزشی متعلق به ارائه‌دهنده است.',
      ),
    },
  ];
  return (
    <div className="container">
      <Breadcrumbs locale={locale} items={[{ label: t.about }]} />
      <header className="page-header">
        <p className="eyebrow">FSE Atlas</p>
        <h1>{t.about}</h1>
        <p className="page-summary">{t.footerSources}</p>
      </header>
      <article className="about-layout">
        {sections.map((s) => (
          <section className="article-section" id={s.id} key={s.id}>
            <h2>{tr(s.title, locale)}</h2>
            <p>{tr(s.body, locale)}</p>
          </section>
        ))}
        <section className="article-section">
          <h2>{t.sourceDocument}</h2>
          <div className="download-row">
            <SourceLink url="/references/ut-fse-2017.pdf">
              {locale === 'fa'
                ? 'برنامه درسی دانشگاه تهران · PDF'
                : 'University of Tehran curriculum · PDF'}
            </SourceLink>
            <SourceLink url="/references/fse-chart.xlsx">
              {locale === 'fa'
                ? 'فایل اصلی تحلیل درس‌ها · XLSX'
                : 'Original course analysis · XLSX'}
            </SourceLink>
          </div>
        </section>
      </article>
    </div>
  );
}
