import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 90000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173/FSE-Atlas',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node scripts/serve.mjs',
    url: 'http://127.0.0.1:4173/FSE-Atlas/en/',
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', channel: process.env.CI ? undefined : 'chrome' },
    },
  ],
});
