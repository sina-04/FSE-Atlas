import en from '@/messages/en.json';
import fa from '@/messages/fa.json';
import { Locale } from '@/data/schema';
export const messages = { en, fa };
export const dict = (locale: Locale) => messages[locale];
