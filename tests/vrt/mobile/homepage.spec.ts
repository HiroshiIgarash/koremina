import { test, expect } from '@playwright/test';

/**
 * モバイル版ホームページのビジュアルリグレッションテスト
 */
test.describe('Mobile Homepage VRT', () => {
  test.beforeEach(async ({ page }) => {
    // モバイルサイズを明示的に設定
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('モバイル版ホームページ全体のビジュアル確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 初回訪問ダイアログを閉じる
    await page.evaluate(() => {
      localStorage.setItem('isFirstVisit', 'false');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // ページ全体のスクリーンショット
    await expect(page).toHaveScreenshot('homepage-mobile-full.png', {
      fullPage: true
    });
  });

  test('モバイル版メインビジュアル（KV）の確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // モバイルサイズのKV画像が表示されているか確認
    const kvImage = page.locator('img[alt*="コレミナ"].md\\:hidden');
    await kvImage.waitFor({ state: 'visible' });
    
    await expect(kvImage).toHaveScreenshot('homepage-kv-mobile.png');
  });

  test('モバイル版ナビゲーション確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // モバイル固定フッターの確認
    const mobileFooter = page.locator('footer').last();
    await expect(mobileFooter).toHaveScreenshot('homepage-mobile-footer.png');
  });

  test('モバイル版検索フォームの確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 検索フォーム部分を特定
    const searchSection = page.locator('h3:has-text("ワードで検索")').locator('..');
    await expect(searchSection).toHaveScreenshot('homepage-search-mobile.png');
  });

  test('モバイル版ダークモード確認', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('isFirstVisit', 'false');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-mobile-dark-mode.png', {
      fullPage: true
    });
  });

  test('横向きモバイル表示の確認', async ({ page }) => {
    // 横向きサイズに設定
    await page.setViewportSize({ width: 844, height: 390 });
    
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('isFirstVisit', 'false');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-mobile-landscape.png', {
      fullPage: true
    });
  });
});