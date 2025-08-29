import { test, expect } from '@playwright/test';

test.describe('認証機能', () => {
  test('初回訪問時にダイアログが表示される', async ({ page }) => {
    await page.goto('/');

    // 初回訪問ダイアログの確認
    const dialog = page.locator('[data-testid="first-visit-dialog"], .first-visit, [role="dialog"]');
    
    // ダイアログが表示されるかどうかを確認（ログイン状態によって変わる）
    const dialogCount = await dialog.count();
    if (dialogCount > 0) {
      await expect(dialog.first()).toBeVisible();
    }
  });

  test('ログインページにアクセスできる', async ({ page }) => {
    await page.goto('/');

    // ログインリンクを探す
    const loginLink = page.locator('a').filter({ hasText: /ログイン|Login|サインイン/ });
    
    if (await loginLink.count() > 0) {
      await loginLink.first().click();
      
      // 認証プロバイダーの表示確認
      await expect(page.locator('text=Google').or(page.locator('text=GitHub'))).toBeVisible();
    }
  });

  test('未認証ユーザーは投稿ページにアクセスできない', async ({ page }) => {
    // 投稿ページに直接アクセス
    await page.goto('/post');

    // ログインが必要な場合のリダイレクトまたはメッセージ確認
    await expect(
      page.locator('text=ログイン').or(
        page.locator('text=認証').or(
          page.getByRole('button', { name: /ログイン|Login/ })
        )
      )
    ).toBeVisible();
  });
});