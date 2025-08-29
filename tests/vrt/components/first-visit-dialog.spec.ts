import { test, expect } from '@playwright/test';

/**
 * FirstVisitDialogコンポーネントのビジュアルリグレッションテスト
 */
test.describe('FirstVisitDialog Component VRT', () => {
  test('初回訪問ダイアログの表示確認', async ({ page }) => {
    // ローカルストレージをクリアして初回訪問状態をシミュレート
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // ページをリロードして初回訪問状態にする
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // ダイアログが表示されるまで待機
    const dialog = page.locator('[data-slot="dialog-content"]');
    await dialog.waitFor({ state: 'visible' });
    
    // ダイアログのスクリーンショットを撮影
    await expect(dialog).toHaveScreenshot('first-visit-dialog.png');
  });

  test('ダイアログ内のボタンスタイル確認', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const dialog = page.locator('[data-slot="dialog-content"]');
    await dialog.waitFor({ state: 'visible' });
    
    // ボタンにホバーした状態でスクリーンショット
    const postButton = page.locator('text=あなたのおすすめ動画を投稿する');
    await postButton.hover();
    
    await expect(dialog).toHaveScreenshot('first-visit-dialog-button-hover.png');
  });

  test('ダークモードでのダイアログ表示確認', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const dialog = page.locator('[data-slot="dialog-content"]');
    await dialog.waitFor({ state: 'visible' });
    
    await expect(dialog).toHaveScreenshot('first-visit-dialog-dark-mode.png');
  });
});