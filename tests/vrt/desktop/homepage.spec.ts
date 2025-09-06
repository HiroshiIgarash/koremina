import { test, expect } from '@playwright/test';

/**
 * デスクトップ版ホームページのビジュアルリグレッションテスト
 */
test.describe('Desktop Homepage VRT', () => {
  test.beforeEach(async ({ page }) => {
    // デスクトップサイズを明示的に設定
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('ホームページ全体のビジュアル確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 初回訪問ダイアログを閉じる
    await page.evaluate(() => {
      localStorage.setItem('isFirstVisit', 'false');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // ページ全体のスクリーンショット
    await expect(page).toHaveScreenshot('homepage-desktop-full.png', {
      fullPage: true
    });
  });

  test('ヘッダー部分のビジュアル確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // ヘッダーのスクリーンショット
    const header = page.locator('header').first();
    await expect(header).toHaveScreenshot('homepage-header-desktop.png');
  });

  test('メインビジュアル（KV）の確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // PCサイズのKV画像が表示されているか確認
    const kvImage = page.locator('img[alt*="コレミナ"].hidden.md\\:block');
    await kvImage.waitFor({ state: 'visible' });
    
    await expect(kvImage).toHaveScreenshot('homepage-kv-desktop.png');
  });

  test('検索フォーム部分の確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 検索フォーム部分を特定
    const searchSection = page.locator('h3:has-text("ワードで検索")').locator('..');
    await expect(searchSection).toHaveScreenshot('homepage-search-desktop.png');
  });

  test('ダークモードでのホームページ確認', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('isFirstVisit', 'false');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-desktop-dark-mode.png', {
      fullPage: true
    });
  });
});