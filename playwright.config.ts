import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* E2Eテストを並行実行 */
  fullyParallel: true,
  /* CI環境での失敗時にリトライしない */
  forbidOnly: !!process.env.CI,
  /* CI環境でのリトライ回数 */
  retries: process.env.CI ? 2 : 0,
  /* 並行実行するワーカー数 */
  workers: process.env.CI ? 1 : undefined,
  /* レポーター設定 */
  reporter: 'html',
  /* 共通設定 */
  use: {
    /* ベースURL */
    baseURL: 'http://localhost:3000',
    /* スクリーンショットの撮影タイミング */
    screenshot: 'only-on-failure',
    /* 動画録画設定 */
    video: 'retain-on-failure',
    /* トレース設定 */
    trace: 'on-first-retry',
  },

  /* プロジェクト設定（ブラウザ別） */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* モバイルテスト */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* ローカル開発サーバーの起動 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});