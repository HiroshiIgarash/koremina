import { defineConfig, devices } from '@playwright/test';

/**
 * Visual Regression Testing (VRT) 設定
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // VRTテストディレクトリ
  testDir: './tests/vrt',
  
  // 並列実行の設定
  fullyParallel: true,
  
  // CI環境での失敗時の動作
  forbidOnly: !!process.env.CI,
  
  // リトライ設定
  retries: process.env.CI ? 2 : 0,
  
  // ワーカー数
  workers: process.env.CI ? 1 : undefined,
  
  // レポーター設定
  reporter: [
    ['html'],
    ['list']
  ],
  
  // 全テスト共通設定
  use: {
    // ベースURL
    baseURL: 'http://localhost:3000',
    
    // スクリーンショット設定
    screenshot: 'only-on-failure',
    
    // 動画録画設定
    video: 'retain-on-failure',
    
    // トレース設定
    trace: 'retain-on-failure',
  },

  // VRT用プロジェクト設定
  projects: [
    {
      name: 'Desktop Chrome VRT',
      use: { 
        ...devices['Desktop Chrome'],
        // VRT用の画面サイズ統一
        viewport: { width: 1280, height: 720 }
      },
      testDir: './tests/vrt/desktop',
    },
    {
      name: 'Mobile VRT',
      use: { 
        ...devices['iPhone 12'],
        // VRT用の画面サイズ統一
        viewport: { width: 390, height: 844 }
      },
      testDir: './tests/vrt/mobile',
    },
    {
      name: 'Components VRT',
      use: { 
        ...devices['Desktop Chrome'],
        // VRT用の画面サイズ統一
        viewport: { width: 1280, height: 720 }
      },
      testDir: './tests/vrt/components',
    },
    {
      name: 'Basic VRT Tests',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
      testMatch: './tests/vrt/basic-vrt-test.spec.ts',
    },
  ],

  // 開発サーバー設定
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  
  // Visual comparison設定
  expect: {
    // ビジュアル比較の閾値設定
    toHaveScreenshot: {
      threshold: 0.2,
      mode: 'pixel'
    },
  },
});