import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Locale, Localized } from '@/data/schema';
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const tr = (value: Localized, locale: Locale) => value[locale];
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sina-04.github.io/FSE-Atlas';
export const asset = (path: string) => (path.startsWith('/') ? `${basePath}${path}` : path);
export function normalize(text: string) {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 1632))
    .replace(/[\u064B-\u065F\u0670\u200c\u200d]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}
export const formatNumber = (n: number, locale: Locale) =>
  new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(n);
export function formatDate(value: string, locale: Locale) {
  const date = new Date(`${value}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
export function switchLocale(path: string, locale: Locale) {
  return path.replace(/^\/(?:fa|en)(?=\/|$)/, `/${locale}`);
}
export function isActivePosition(
  position: { status: string; deadline?: string; checkedAt?: string },
  today = new Date().toISOString().slice(0, 10),
) {
  return (
    position.status === 'published' &&
    !!position.checkedAt &&
    (!position.deadline || position.deadline >= today)
  );
}
