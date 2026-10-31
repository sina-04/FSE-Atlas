'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from 'lucide-react';
import type { Locale } from '@/data/schema';
import { asset, normalize, switchLocale } from '@/lib/utils';
import { Mark } from './illustrations';
import { Button } from './ui/button';

type SearchItem = {
  id: string;
  title: string;
  otherTitle: string;
  summary: string;
  kind: string;
  label: string;
  url: string;
  tags: string[];
};
function SearchDialog({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const openSearch = useCallback(
    async (value: boolean) => {
      setOpen(value);
      if (value && !items.length) {
        setLoading(true);
        setFailed(false);
        try {
          const res = await fetch(asset(`/search/${locale}.json`));
          if (!res.ok) throw new Error('search');
          setItems(await res.json());
        } catch {
          setFailed(true);
        } finally {
          setLoading(false);
        }
      }
    },
    [items.length, locale],
  );
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        void openSearch(!open);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open, openSearch]);
  const terms = normalize(query).split(' ').filter(Boolean);
  const results = terms.length
    ? items
        .filter((item) =>
          terms.every((word) =>
            normalize(
              `${item.title} ${item.otherTitle} ${item.summary} ${item.tags.join(' ')}`,
            ).includes(word),
          ),
        )
        .sort(
          (a, b) =>
            Number(normalize(b.title).startsWith(normalize(query))) -
            Number(normalize(a.title).startsWith(normalize(query))),
        )
        .slice(0, 30)
    : [];
  const grouped = Object.groupBy(results, (item) => item.label);
  return (
    <Dialog.Root open={open} onOpenChange={openSearch}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('search')}>
          <Search size={20} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="search-dialog" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
          <div className="dialog-heading">
            <Dialog.Title>{t('search')}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={t('close')}>
                <X size={20} />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="muted text-small">
            {t('searchHint')}
          </Dialog.Description>
          <div className="search-field">
            <Search size={20} aria-hidden="true" />
            <input
              autoComplete="off"
              aria-label={t('search')}
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="search-results" aria-live="polite">
            {loading ? (
              <p>{t('searchLoading')}</p>
            ) : failed ? (
              <div>
                <p>{t('searchFailed')}</p>
                <Button variant="outline" onClick={() => void openSearch(true)}>
                  {t('retry')}
                </Button>
              </div>
            ) : !terms.length ? (
              <p className="search-empty">{t('searchStart')}</p>
            ) : !results.length ? (
              <p className="search-empty">{t('searchEmpty')}</p>
            ) : (
              Object.entries(grouped).map(([label, records]) => (
                <section key={label}>
                  <h3 className="eyebrow">{label}</h3>
                  <ul>
                    {records?.map((item) => (
                      <li key={item.id}>
                        <Link onClick={() => setOpen(false)} href={item.url}>
                          <span>
                            <strong>{item.title}</strong>
                            <small>{item.summary}</small>
                          </span>
                          <ArrowUpRight className="directional" size={20} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
function ThemeToggle() {
  const t = useTranslations();
  const { setTheme } = useTheme();
  const transition = useRef<ViewTransition | null>(null);
  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget.getBoundingClientRect();
    const x = target.left + target.width / 2,
      y = target.top + target.height / 2;
    transition.current?.skipTransition();
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    const update = () => {
      flushSync(() => setTheme(next));
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.style.colorScheme = next;
    };
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      update();
      return;
    }
    const tx = document.startViewTransition(update);
    transition.current = tx;
    void tx.ready
      .then(() => {
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(.4,0,.2,1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {});
    void tx.finished
      .then(() => {
        if (transition.current === tx) transition.current = null;
      })
      .catch(() => {});
  }
  return (
    <Button
      onClick={toggle}
      variant="ghost"
      size="icon"
      aria-label={t('theme')}
      data-testid="theme-toggle"
    >
      <Sun className="theme-sun" size={20} />
      <Moon className="theme-moon" size={20} />
    </Button>
  );
}
export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const other = locale === 'en' ? 'fa' : 'en';
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('fse-locale', locale);
    } catch {}
  }, [locale]);
  const nav = [
    ['courses', t('courses')],
    ['careers', t('careers')],
    ['immigration', t('immigration')],
  ];
  function languageSwitch(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    router.push(
      `${switchLocale(pathname, other)}${window.location.search}${window.location.hash}`,
    );
  }
  return (
    <>
      <a className="skip-link" href="#main">
        {t('skip')}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link href={`/${locale}/`} className="brand">
            <Mark />
            <span>
              <b>
                FSE <span className="brand-serif">Atlas</span>
              </b>
              <small>{t('brandLong')}</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label={t('navigation')}>
            {nav.map(([slug, label]) => (
              <Link
                key={slug}
                href={`/${locale}/${slug}/`}
                aria-current={pathname.includes(`/${slug}`) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-tools">
            <SearchDialog locale={locale} />
            <span className="tool-divider" />
            <Link
              className="language-button"
              href={switchLocale(pathname, other)}
              onClick={languageSwitch}
              lang={other}
              hrefLang={other}
              aria-label={locale === 'fa' ? 'EN · Switch to English' : 'تغییر زبان به فارسی'}
            >
              {t('language')}
            </Link>
            <ThemeToggle />
            <Dialog.Root open={menu} onOpenChange={setMenu}>
              <Dialog.Trigger asChild>
                <Button
                  className="mobile-menu-button"
                  variant="ghost"
                  size="icon"
                  aria-label={t('menu')}
                >
                  <Menu size={22} />
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content
                  className="mobile-drawer"
                  dir={locale === 'fa' ? 'rtl' : 'ltr'}
                >
                  <div className="dialog-heading">
                    <Dialog.Title>{t('navigation')}</Dialog.Title>
                    <Dialog.Close asChild>
                      <Button size="icon" variant="ghost" aria-label={t('close')}>
                        <X />
                      </Button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Description className="muted">{t('brandLong')}</Dialog.Description>
                  <nav>
                    {[
                      ...nav,
                      ['research', locale === 'fa' ? 'حوزه‌های پژوهش' : 'Research areas'],
                      ['skills', locale === 'fa' ? 'مهارت‌ها' : 'Skills'],
                      ['resources', locale === 'fa' ? 'منابع یادگیری' : 'Learning resources'],
                      ['programs', locale === 'fa' ? 'تحصیلات تکمیلی' : 'Graduate study'],
                      ['countries', locale === 'fa' ? 'راهنمای کشورها' : 'Country guides'],
                    ].map(([slug, label]) => (
                      <Link
                        href={`/${locale}/${slug}/`}
                        key={slug}
                        onClick={() => setMenu(false)}
                      >
                        {label}
                        <ArrowUpRight className="directional" size={20} />
                      </Link>
                    ))}
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  );
}
