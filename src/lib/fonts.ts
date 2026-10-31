import localFont from 'next/font/local';
export const manrope = localFont({
  src: '../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
  preload: true,
});
export const vazirmatn = localFont({
  src: '../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2',
  variable: '--font-vazirmatn',
  display: 'swap',
  weight: '100 900',
  preload: true,
});
export const fontVariables = `${manrope.variable} ${vazirmatn.variable}`;
