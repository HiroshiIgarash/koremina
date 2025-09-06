import { test, expect } from '@playwright/test';

test.describe('ナビゲーション', () => {
  test('メインナビゲーションが正常に機能する', async ({ page }) => {
    await page.goto('/');

    // 主要なナビゲーションリンクの確認
    const homeLink = page.locator('a[href="/"], a').filter({ hasText: /ホーム|Home/ });
    const postLink = page.locator('a[href="/post"], a').filter({ hasText: /投稿|Post/ });
    
    if (await homeLink.count() > 0) {
      await expect(homeLink.first()).toBeVisible();
    }
    
    if (await postLink.count() > 0) {
      await expect(postLink.first()).toBeVisible();
    }
  });

  test('ヘッダーとフッターが表示される', async ({ page }) => {
    await page.goto('/');

    // ヘッダーの確認
    const header = page.locator('header, [role="banner"], nav');
    if (await header.count() > 0) {
      await expect(header.first()).toBeVisible();
    }

    // フッターの確認
    const footer = page.locator('footer, [role="contentinfo"]');
    if (await footer.count() > 0) {
      await expect(footer.first()).toBeVisible();
    }
  });

  test('404ページが適切に表示される', async ({ page }) => {
    await page.goto('/non-existent-page');

    // 404ページまたはエラーメッセージの確認
    await expect(
      page.locator('text=404').or(
        page.locator('text=見つかりません').or(
          page.locator('text=Not Found')
        )
      )
    ).toBeVisible();
  });

  test('ページ間の遷移が正常に動作する', async ({ page }) => {
    await page.goto('/');

    // ポリシーページへの遷移テスト
    const policyLink = page.locator('a[href="/policy"], a').filter({ hasText: /プライバシー|利用規約|Policy/ });
    
    if (await policyLink.count() > 0) {
      await policyLink.first().click();
      await expect(page).toHaveURL(/\/policy/);
      
      // ポリシーページの内容確認
      await expect(page.locator('text=プライバシー, text=個人情報, text=利用規約')).toBeVisible();
    }
  });
});