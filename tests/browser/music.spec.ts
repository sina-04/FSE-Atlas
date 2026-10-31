import { test, expect, type Page } from '@playwright/test';

const visitKey = 'fse-atlas:welcome-music:v1';
type MediaWindow = Window & {
  welcomeAudio?: HTMLAudioElement;
  welcomePlayCalls?: number;
  welcomeRejected?: boolean;
};

async function expectNoMusicControls(page: Page) {
  await expect(page.locator('.welcome-music, audio[controls]')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: /welcome music|Adagio|موسیقی|آداجیو/i }),
  ).toHaveCount(0);
}

// Exercise real permitted autoplay; rejection cases below explicitly mock browser denial.
test.use({ launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] } });

test.describe('when the browser permits audible autoplay', () => {
  test('the real track starts automatically without controls and continues across navigation', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const play = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function () {
        const target = window as MediaWindow;
        target.welcomeAudio = this as HTMLAudioElement;
        target.welcomePlayCalls = (target.welcomePlayCalls || 0) + 1;
        return play.call(this);
      };
    });
    await page.goto('/fse-atlas/en/');
    await expect
      .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.currentTime || 0))
      .toBeGreaterThan(0);
    const media = await page.evaluate(() => {
      const audio = (window as MediaWindow).welcomeAudio!;
      return {
        src: audio.currentSrc,
        volume: audio.volume,
        loop: audio.loop,
        paused: audio.paused,
        controls: audio.controls,
        calls: (window as MediaWindow).welcomePlayCalls,
      };
    });
    expect(media).toEqual({
      src: expect.stringContaining('/fse-atlas/audio/secret-garden-adagio.mp3'),
      volume: 0.35,
      loop: false,
      paused: false,
      controls: false,
      calls: 1,
    });
    await expectNoMusicControls(page);
    await page.getByRole('link', { name: 'تغییر زبان به فارسی' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
    await expectNoMusicControls(page);
    await page.getByRole('link', { name: 'Switch to English' }).click();
    await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
    await expect(page).toHaveURL(/\/careers\/$/);
    expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(1);
    expect(await page.evaluate(() => (window as MediaWindow).welcomeAudio?.paused)).toBe(
      false,
    );
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls || 0)).toBe(0);
    await expectNoMusicControls(page);
  });
});

test('blocked autoplay stays silent with no prompt, controls, errors or retries', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      const target = window as MediaWindow;
      target.welcomePlayCalls = (target.welcomePlayCalls || 0) + 1;
      return Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'));
    };
  });
  await page.goto('/fse-atlas/en/');
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomePlayCalls))
    .toBe(1);
  expect(await page.evaluate((key) => localStorage.getItem(key), visitKey)).toBe('seen');
  await expectNoMusicControls(page);
  await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(1);
  await expectNoMusicControls(page);
  expect(errors).toEqual([]);
});

test('returning visitors do not download the track or see any music controls', async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, 'seen'), visitKey);
  const audioRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/audio/')) audioRequests.push(request.url());
  });
  await page.goto('/fse-atlas/fa/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectNoMusicControls(page);
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expectNoMusicControls(page);
  expect(audioRequests).toEqual([]);
});

test('restricted storage and delayed rejection do not add UI or restart the music', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    };
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    };
    HTMLMediaElement.prototype.play = function () {
      const target = window as MediaWindow;
      target.welcomePlayCalls = (target.welcomePlayCalls || 0) + 1;
      return new Promise((_, reject) =>
        setTimeout(() => {
          target.welcomeRejected = true;
          reject(new DOMException('Blocked', 'NotAllowedError'));
        }, 250),
      );
    };
  });
  await page.goto('/fse-atlas/en/');
  await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeRejected))
    .toBe(true);
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(1);
  await expectNoMusicControls(page);
  expect(errors).toEqual([]);
});
