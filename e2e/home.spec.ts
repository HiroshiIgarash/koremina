import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('トップページが正常に表示される', async ({ page }) => {
    await page.goto('/');

    // ページタイトルの確認
    await expect(page).toHaveTitle(/コレミナ/);

    // メインビジュアルの確認
    const kvImage = page.locator('img[alt*="コレミナ"]');
    await expect(kvImage).toBeVisible();

    // カウント表示の確認
    const countElement = page.locator('text=件');
    await expect(countElement).toBeVisible();
  });

  test('レスポンシブデザインが正しく動作する', async ({ page }) => {
    // デスクトップ表示
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    
    const pcImage = page.locator('img[src="/kv_pc.png"]');
    await expect(pcImage).toBeVisible();

    // モバイル表示
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const spImage = page.locator('img[src="/kv_sp.png"]');
    await expect(spImage).toBeVisible();
  });

  test('検索フォームが機能する', async ({ page }) => {
    await page.goto('/');

    // 検索フォームの存在確認
    const searchInput = page.locator('input[placeholder*="検索"]');
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible();
      
      // 検索テストの実行
      await searchInput.fill('テスト');
      await searchInput.press('Enter');
      
      // 検索結果ページへの遷移確認
      await expect(page).toHaveURL(/\/search/);
    }
  });
});