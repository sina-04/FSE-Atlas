import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const prefix = '/FSE-Atlas';
test('root defaults to Persian and remembers an explicit English choice', async ({ page }) => {
  await page.goto(`${prefix}/`);
  await expect(page).toHaveURL(/\/fa\/$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL(/\/en\/$/);
  await page.goto(`${prefix}/`);
  await expect(page).toHaveURL(/\/en\/$/);
});
for (const locale of ['en', 'fa'])
  for (const theme of ['light', 'dark'])
    test(`${locale} ${theme}: directory, search, locale and persistent theme`, async ({
      page,
    }) => {
      await page.addInitScript((theme) => {
        if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);
      }, theme);
      await page.goto(`${prefix}/${locale}/courses/?category=specialized#main`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /dark/ : /light/);
      const search = page.locator('input[type=search]');
      await search.fill(locale === 'en' ? 'microbiology 1' : 'ميكروبيولوژي ۱');
      await expect(page.locator('.directory .entity-card')).toHaveCount(1);
      await page
        .getByRole('link', {
          name: locale === 'en' ? 'تغییر زبان به فارسی' : 'Switch to English',
        })
        .click();
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        locale === 'en' ? 'fa' : 'en',
      );
      await expect(page).toHaveURL(/category=specialized/);
      await expect(page).toHaveURL(/#main$/);
      await expect(page.locator('.directory .entity-card')).toHaveCount(1);
      await page.keyboard.press('Control+k');
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.getByRole('dialog').locator('input').fill('HACCP');
      await expect(page.getByRole('dialog').getByRole('link').first()).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await page.getByTestId('theme-toggle').click();
      await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /light/ : /dark/);
      await page.reload();
      await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /light/ : /dark/);
    });
test('direct deep links, roadmap and source links work without fallback routing', async ({
  page,
}) => {
  const res = await page.goto(`${prefix}/en/careers/process-engineer/`);
  expect(res?.status()).toBe(200);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Food Process Engineer');
  await page.getByText('Make a small project', { exact: true }).click();
  await expect(page.locator('.roadmap details').nth(2)).toHaveAttribute('open', '');
  await page.goto(`${prefix}/en/courses/food-chemistry-1/`);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.source-panel a').first()).toHaveAttribute(
    'href',
    /\/FSE-Atlas\/references\/ut-fse-2017.pdf#page=7/,
  );
  const missing = await page.goto(`${prefix}/en/not-a-real-route/`);
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Explore in English' })).toBeVisible();
});
test('theme fallback, reduced motion, rapid clicks and system preference', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.addInitScript(() =>
    Object.defineProperty(document, 'startViewTransition', {
      value: undefined,
      configurable: true,
    }),
  );
  await page.goto(`${prefix}/en/`);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByTestId('theme-toggle').click();
  await expect(page.locator('html')).toHaveClass(/light/);
  for (let i = 0; i < 5; i++) await page.getByTestId('theme-toggle').click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});
for (const locale of ['en', 'fa'])
  test(`${locale}: all specified widths prevent page overflow`, async ({ page }) => {
    for (const width of [320, 360, 375, 390, 430, 600, 768, 1024, 1280, 1440, 1920, 2560]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${prefix}/${locale}/`);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `home overflow at ${width}`,
      ).toBe(true);
      await page.goto(`${prefix}/${locale}/courses/`);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `courses overflow at ${width}`,
      ).toBe(true);
    }
  });
for (const locale of ['en', 'fa'])
  for (const theme of ['light', 'dark'])
    test(`${locale} ${theme}: accessible representative pages`, async ({ page }) => {
      await page.addInitScript((theme) => {
        if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);
      }, theme);
      for (const path of ['', 'courses/', 'careers/food-scientist/', 'programs/']) {
        await page.goto(`${prefix}/${locale}/${path}`);
        const scan = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(
          scan.violations,
          JSON.stringify(
            scan.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
          ),
        ).toEqual([]);
      }
    });
test('mobile navigation, keyboard focus and 200% text scaling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${prefix}/fa/`);
  await page.getByRole('button', { name: 'باز کردن فهرست' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'باز کردن فهرست' })).toBeFocused();
  await page.goto(`${prefix}/fa/careers/food-scientist/`);
  await page.addStyleTag({ content: 'html{font-size:200%}' });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
  ).toBe(true);
});
