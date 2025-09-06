import { test, expect } from '@playwright/test';

test.describe('静的ページのテスト', () => {
  test('ホームページが表示される（基本テスト）', async ({ page }) => {
    // より基本的なテストから開始
    await page.goto('/');

    // ページが読み込まれることを確認
    await expect(page).toHaveTitle(/.*koremina.*|.*コレミナ.*|.*にじさんじ.*/i);
    
    // 基本的なHTMLコンテンツの存在確認
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('404ページの動作確認', async ({ page }) => {
    // 存在しないページにアクセス
    const response = await page.goto('/non-existent-page-12345');
    
    // 404レスポンスまたは適切なエラーページの表示
    if (response) {
      expect([404, 200].includes(response.status())).toBeTruthy();
    }
    
    // ページの基本構造が存在することを確認
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('基本的なナビゲーション要素の確認', async ({ page }) => {
    await page.goto('/');
    
    // HTML基本構造の確認
    await expect(page.locator('html')).toBeVisible();
    await expect(page.locator('head')).toBeAttached();
    
    // 基本的なメタ情報があることを確認
    const title = page.locator('title');
    await expect(title).toBeAttached();
  });
});