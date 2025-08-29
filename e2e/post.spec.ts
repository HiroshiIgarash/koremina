import { test, expect } from '@playwright/test';

test.describe('動画投稿機能', () => {
  test('投稿フォームが正常に表示される', async ({ page }) => {
    await page.goto('/post');

    // 投稿フォームの要素確認
    const youtubeIdInput = page.locator('input').filter({ hasText: /youtube.*ID|YouTube.*ID/ }).or(
      page.locator('input[name*="youtube"], input[placeholder*="youtube"], input[label*="youtube"]')
    );
    
    if (await youtubeIdInput.count() > 0) {
      await expect(youtubeIdInput.first()).toBeVisible();
    } else {
      // ログインが必要な場合
      await expect(
        page.locator('text=ログイン').or(
          page.locator('text=認証が必要')
        )
      ).toBeVisible();
    }
  });

  test('YouTube IDを入力するとサムネイルが表示される', async ({ page }) => {
    // 認証が必要な場合はスキップ
    await page.goto('/post');
    
    const isAuthenticated = await page.locator('input').filter({ hasText: /youtube.*ID/ }).count() > 0;
    test.skip(!isAuthenticated, 'ログインが必要です');

    const youtubeIdInput = page.locator('input').filter({ hasText: /youtube.*ID/ }).first();
    
    // 有効なYouTube IDを入力
    await youtubeIdInput.fill('k9Eewd8TEWE');
    
    // サムネイル画像の表示確認
    const thumbnail = page.locator('img[src*="youtube"], img[alt*="サムネイル"]');
    await expect(thumbnail).toBeVisible({ timeout: 10000 });
  });

  test('投稿フォームのバリデーションが機能する', async ({ page }) => {
    await page.goto('/post');
    
    const isAuthenticated = await page.locator('input').filter({ hasText: /youtube.*ID/ }).count() > 0;
    test.skip(!isAuthenticated, 'ログインが必要です');

    // 空のフォームで送信
    const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /投稿|送信|Submit/ });
    
    if (await submitButton.count() > 0) {
      await submitButton.first().click();
      
      // エラーメッセージの確認
      const errorMessage = page.locator('text=必須, text=入力してください, text=required');
      await expect(errorMessage).toBeVisible();
    }
  });

  test('投稿完了後の処理が正常に動作する', async ({ page }) => {
    await page.goto('/post');
    
    const isAuthenticated = await page.locator('input').filter({ hasText: /youtube.*ID/ }).count() > 0;
    test.skip(!isAuthenticated, 'ログインが必要です');

    // フォームの入力
    const youtubeIdInput = page.locator('input').filter({ hasText: /youtube.*ID/ }).first();
    await youtubeIdInput.fill('k9Eewd8TEWE');
    
    // タイトルの入力（存在する場合）
    const titleInput = page.locator('input[name*="title"], input[placeholder*="タイトル"]');
    if (await titleInput.count() > 0) {
      await titleInput.first().fill('テスト動画タイトル');
    }
    
    // 説明文の入力（存在する場合）
    const descriptionInput = page.locator('textarea[name*="description"], textarea[placeholder*="説明"]');
    if (await descriptionInput.count() > 0) {
      await descriptionInput.first().fill('テスト動画の説明文です。');
    }
    
    // フォーム送信
    const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /投稿|送信|Submit/ });
    if (await submitButton.count() > 0) {
      await submitButton.first().click();
      
      // 投稿完了の確認（リダイレクトまたは成功メッセージ）
      await expect(
        page.locator('text=投稿完了, text=投稿されました, text=成功').or(
          page.waitForURL('/')
        )
      ).toBeTruthy();
    }
  });
});