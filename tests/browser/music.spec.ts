import { test, expect } from '@playwright/test';

const prefix = '/FSE-Atlas';
const visitKey = 'fse-atlas:welcome-music:v1';
type MediaWindow = Window & {
  welcomeAudio?: HTMLAudioElement;
  welcomePlayCalls?: number;
  welcomeRejected?: boolean;
  rejectWelcomePlay?: () => void;
};

// Exercise native playback; blocked-policy cases explicitly reject the first attempt.
test.use({ launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] } });

test('compact music control pauses/resumes real audio and survives scrolling and navigation', async ({
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
  await page.goto(`${prefix}/en/`);
  const button = page.getByTestId('music-toggle');
  await expect(button).toHaveAccessibleName('Pause welcome music');
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.currentTime || 0))
    .toBeGreaterThan(0.1);
  const media = await page.evaluate(() => {
    const audio = (window as MediaWindow).welcomeAudio!;
    return {
      src: audio.currentSrc,
      volume: audio.volume,
      loop: audio.loop,
      controls: audio.controls,
    };
  });
  expect(media).toEqual({
    src: expect.stringContaining(`${prefix}/audio/secret-garden-adagio.mp3`),
    volume: 0.35,
    loop: false,
    controls: false,
  });
  await button.click();
  await expect(button).toHaveAccessibleName('Play welcome music');
  expect(await page.evaluate(() => (window as MediaWindow).welcomeAudio?.paused)).toBe(true);
  const pausedAt = await page.evaluate(
    () => (window as MediaWindow).welcomeAudio!.currentTime,
  );
  await button.focus();
  await page.keyboard.press('Space');
  await expect(button).toHaveAccessibleName('Pause welcome music');
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.currentTime || 0))
    .toBeGreaterThan(pausedAt);
  await page.getByTestId('theme-toggle').click();
  await expect(button).toBeVisible();
  await page.getByRole('link', { name: 'تغییر زبان به فارسی' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(button).toHaveAccessibleName('توقف موسیقی خوشامدگویی');
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    const before = await button.boundingBox();
    expect(before!.width).toBe(44);
    expect(before!.height).toBe(44);
    expect(before!.x).toBeGreaterThanOrEqual(16);
    expect(before!.x + before!.width).toBeLessThanOrEqual(width - 16);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const after = await button.boundingBox();
    expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
    expect(await button.evaluate((el) => getComputedStyle(el).borderRadius)).toBe('50%');
  }
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(2);
  expect(await page.evaluate(() => (window as MediaWindow).welcomeAudio?.paused)).toBe(false);
  await expect(page.locator('.welcome-music, audio[controls]')).toHaveCount(0);
  // End-of-track events restore the Play icon without depending on MP3 seek timing.
  await page.evaluate(() => {
    const audio = (window as MediaWindow).welcomeAudio!;
    audio.dispatchEvent(new Event('ended'));
  });
  await expect(button).toHaveAccessibleName('Play welcome music');
  await page.reload();
  await expect(button).toHaveAccessibleName('Play welcome music');
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls || 0)).toBe(0);
});

test('blocked autoplay offers a working keyboard play button without a panel or errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
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
  await page.goto(`${prefix}/en/`);
  const button = page.getByTestId('music-toggle');
  await expect(button).toHaveAccessibleName('Play welcome music');
  expect(await page.evaluate((key) => localStorage.getItem(key), visitKey)).toBe('seen');
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAccessibleName('Pause welcome music');
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeAudio?.currentTime || 0))
    .toBeGreaterThan(0);
  await button.click();
  await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  await expect(button).toHaveAccessibleName('Play welcome music');
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(2);
  expect(errors).toEqual([]);
});

test('returning visitors download no audio until the compact Play button is used', async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, 'seen'), visitKey);
  const audioRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/audio/')) audioRequests.push(request.url());
  });
  await page.goto(`${prefix}/fa/`);
  const button = page.getByTestId('music-toggle');
  await expect(button).toHaveAccessibleName('پخش موسیقی خوشامدگویی');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(button).toHaveAccessibleName('Play welcome music');
  expect(audioRequests).toEqual([]);
  await button.click();
  await expect(button).toHaveAccessibleName('Pause welcome music');
  await expect.poll(() => audioRequests.length).toBeGreaterThan(0);
  await button.click();
});

test('rapid toggles and a late rejection keep current playback when storage is restricted', async ({
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
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      const target = window as MediaWindow;
      target.welcomeAudio = this as HTMLAudioElement;
      target.welcomePlayCalls = (target.welcomePlayCalls || 0) + 1;
      if (target.welcomePlayCalls === 1)
        return new Promise((_, reject) => {
          target.rejectWelcomePlay = () => {
            target.welcomeRejected = true;
            reject(new DOMException('Blocked', 'NotAllowedError'));
          };
        });
      return play.call(this);
    };
  });
  await page.goto(`${prefix}/en/`);
  const button = page.getByTestId('music-toggle');
  await expect(button).toHaveAccessibleName('Pause welcome music');
  await button.click();
  await expect(button).toHaveAccessibleName('Play welcome music');
  await button.click();
  await page.evaluate(() => (window as MediaWindow).rejectWelcomePlay?.());
  await expect
    .poll(() => page.evaluate(() => (window as MediaWindow).welcomeRejected))
    .toBe(true);
  await expect(button).toHaveAccessibleName('Pause welcome music');
  expect(await page.evaluate(() => (window as MediaWindow).welcomeAudio?.paused)).toBe(false);
  await page.locator('.desktop-nav').getByRole('link', { name: 'Career Pathways' }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  expect(await page.evaluate(() => (window as MediaWindow).welcomePlayCalls)).toBe(2);
  await button.click();
  expect(errors).toEqual([]);
});
