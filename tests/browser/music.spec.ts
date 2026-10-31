import { test, expect } from '@playwright/test';

const visitKey = 'fse-atlas:welcome-music:v1';
type MediaWindow = Window & { welcomeAudio?: HTMLAudioElement; welcomePlayCalls?: number };

test('first-visit autoplay fallback plays the real track, with volume and pause controls', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      const target = window as MediaWindow;
      target.welcomeAudio = this as HTMLAudioElement;
      target.welcomePlayCalls = (target.welcomePlayCalls || 0) + 1;
      if (target.welcomePlayCalls === 1)
        return Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'));
      return play.call(this);
    };
  });
  await page.goto('/fse-atlas/en/');
  const player = page.getByTestId('welcome-music');
  await expect(player).toContainText('Press play');
  expect(await page.evaluate((key) => localStorage.getItem(key), visitKey)).toBe('seen');
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(1);
  await player.getByRole('button', { name: 'Play Adagio by Secret Garden' }).click();
  await expect(player.getByRole('button', { name: 'Pause welcome music' })).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.paused))
    .toBe(false);
  expect(
    await page.evaluate(() => (window as MediaWindow).welcomeAudio?.currentSrc),
  ).toContain('/fse-atlas/audio/secret-garden-adagio.mp3');
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.duration || 0))
    .toBeGreaterThan(60);
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.currentTime || 0))
    .toBeGreaterThan(0);
  await player.getByRole('slider', { name: 'Welcome music volume' }).focus();
  await page.keyboard.press('Home');
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.volume))
    .toBe(0);
  await player.getByRole('button', { name: 'Pause welcome music' }).click();
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.paused))
    .toBe(true);
  await page.getByRole('link', { name: 'تغییر زبان به فارسی' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(player.getByRole('button', { name: 'پخش آداجیو از سکرت گاردن' })).toBeVisible();
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(2);
  await player.getByRole('button', { name: 'قطع و بستن موسیقی خوشامدگویی' }).click();
  await expect(player).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(player).toHaveCount(0);
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls || 0)).toBe(0);
});

test('successful first-visit autoplay is attempted once and does not restart on navigation', async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      const target = window as MediaWindow;
      target.welcomePlayCalls = (target.welcomePlayCalls || 0) + 1;
      return Promise.resolve();
    };
  });
  await page.goto('/fse-atlas/en/');
  await expect(page.getByTestId('welcome-music')).toContainText('Enjoy a little music');
  await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(1);
  await page.getByRole('button', { name: 'Stop and dismiss welcome music' }).click();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByTestId('welcome-music')).toHaveCount(0);
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls || 0)).toBe(0);
});

test('a returning visitor does not download the soundtrack or see an autoplay prompt', async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, 'seen'), visitKey);
  const audioRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/audio/')) audioRequests.push(request.url());
  });
  await page.goto('/fse-atlas/fa/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByTestId('welcome-music')).toHaveCount(0);
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(audioRequests).toEqual([]);
});

test('storage restrictions and a late play rejection remain dismissible', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    };
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    };
    HTMLMediaElement.prototype.play = () =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new DOMException('Blocked', 'NotAllowedError')), 250),
      );
  });
  await page.goto('/fse-atlas/en/');
  await expect(page.getByTestId('welcome-music')).toBeVisible();
  await page.getByRole('button', { name: 'Stop and dismiss welcome music' }).click();
  await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  await expect(page.getByTestId('welcome-music')).toHaveCount(0);
});
