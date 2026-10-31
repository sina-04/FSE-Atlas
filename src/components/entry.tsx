'use client';
import { useEffect } from 'react';
import { asset } from '@/lib/utils';
import { Mark } from './illustrations';
export function Entry() {
  useEffect(() => {
    let locale = 'fa';
    try {
      if (localStorage.getItem('fse-locale') === 'en') locale = 'en';
    } catch {}
    window.location.replace(`${asset(`/${locale}/`)}${location.search}${location.hash}`);
  }, []);
  return (
    <div className="entry-page">
      <Mark />
      <h1>FSE Atlas</h1>
      <p>اطلس علوم و مهندسی صنایع غذایی</p>
      <p lang="en" dir="ltr">
        Education, careers and research in food science.
      </p>
      <nav aria-label="انتخاب زبان / Choose a language">
        <a className="button button-primary" href={asset('/fa/')} lang="fa">
          فارسی
        </a>
        <a className="button button-outline" href={asset('/en/')} lang="en">
          English
        </a>
      </nav>
    </div>
  );
}
