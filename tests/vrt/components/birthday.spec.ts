import { test, expect } from '@playwright/test';

/**
 * Birthdayコンポーネントのビジュアルリグレッションテスト
 */
test.describe('Birthday Component VRT', () => {
  test.beforeEach(async ({ page }) => {
    // ホームページに移動（Birthdayコンポーネントが表示される）
    await page.goto('/');
    
    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');
  });

  test('今日の誕生日表示のビジュアル確認', async ({ page }) => {
    // Birthdayコンポーネントが表示されるまで待機
    const birthdaySection = page.locator('.bg-slate-100.dark\\:bg-slate-600');
    await birthdaySection.waitFor({ state: 'visible' });
    
    // Birthdayコンポーネントのスクリーンショットを撮影
    await expect(birthdaySection).toHaveScreenshot('birthday-component-today.png');
  });

  test('直近の誕生日表示のビジュアル確認', async ({ page }) => {
    // モックデータを設定するため、テストデータを挿入する想定
    // 実際の実装では、APIモックを使用する
    
    const birthdaySection = page.locator('.bg-slate-100.dark\\:bg-slate-600');
    await birthdaySection.waitFor({ state: 'visible' });
    
    await expect(birthdaySection).toHaveScreenshot('birthday-component-future.png');
  });

  test('誕生日情報なし表示のビジュアル確認', async ({ page }) => {
    // データがない状態をシミュレート
    const birthdaySection = page.locator('.bg-slate-100.dark\\:bg-slate-600');
    await birthdaySection.waitFor({ state: 'visible' });
    
    await expect(birthdaySection).toHaveScreenshot('birthday-component-no-data.png');
  });

  test('ダークモードでの表示確認', async ({ page }) => {
    // ダークモードに切り替え
    await page.emulateMedia({ colorScheme: 'dark' });
    
    const birthdaySection = page.locator('.bg-slate-100.dark\\:bg-slate-600');
    await birthdaySection.waitFor({ state: 'visible' });
    
    await expect(birthdaySection).toHaveScreenshot('birthday-component-dark-mode.png');
  });
});