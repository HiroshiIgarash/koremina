import { test, expect } from '@playwright/test';

/**
 * UIコンポーネントのビジュアルリグレッションテスト
 */
test.describe('UI Components VRT', () => {
  test('Select コンポーネントの表示確認', async ({ page }) => {
    // 投稿ページに移動（Selectコンポーネントが使用されている）
    await page.goto('/post');
    await page.waitForLoadState('networkidle');
    
    // Selectコンポーネントを探して操作
    const selectTrigger = page.locator('[role="combobox"]').first();
    if (await selectTrigger.isVisible()) {
      await selectTrigger.click();
      
      // ドロップダウンが開いた状態でスクリーンショット
      const selectContent = page.locator('[role="listbox"]');
      await selectContent.waitFor({ state: 'visible' });
      
      await expect(page).toHaveScreenshot('select-component-open.png');
    }
  });

  test('Button コンポーネントの各状態確認', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // ボタンの通常状態
    const button = page.locator('button').first();
    if (await button.isVisible()) {
      await expect(button).toHaveScreenshot('button-normal.png');
      
      // ホバー状態
      await button.hover();
      await expect(button).toHaveScreenshot('button-hover.png');
    }
  });

  test('Dialog コンポーネントの表示確認', async ({ page }) => {
    await page.goto('/');
    
    // 初回訪問ダイアログを表示
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const dialog = page.locator('[data-slot="dialog-content"]');
    if (await dialog.isVisible()) {
      await expect(dialog).toHaveScreenshot('dialog-component.png');
      
      // ダイアログを閉じるボタンのスタイル確認
      const closeButton = dialog.locator('[data-slot="dialog-close"]');
      await closeButton.hover();
      await expect(dialog).toHaveScreenshot('dialog-close-button-hover.png');
    }
  });

  test('Loading/Skeleton コンポーネントの確認', async ({ page }) => {
    await page.goto('/');
    
    // ページ読み込み中のスケルトン表示を確認
    // 実際の実装では、ネットワークを遅延させてスケルトンを表示
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
    
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // スケルトンローダーが表示されているかチェック
    const skeleton = page.locator('.animate-pulse').first();
    if (await skeleton.isVisible()) {
      await expect(skeleton).toHaveScreenshot('skeleton-component.png');
    }
  });
});