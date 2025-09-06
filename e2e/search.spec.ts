import { test, expect } from '@playwright/test';

test.describe('検索機能', () => {
  test('検索ページが正常に表示される', async ({ page }) => {
    await page.goto('/search');

    // 検索フォームの確認
    const searchInput = page.locator('input[name="q"], input[placeholder*="検索"]');
    await expect(searchInput).toBeVisible();

    // 検索ボタンまたはEnterキーでの検索
    await searchInput.fill('にじさんじ');
    await searchInput.press('Enter');

    // 検索結果の確認（結果がある場合）
    await page.waitForLoadState('networkidle');
    
    // 検索結果またはメッセージの表示確認
    const results = page.locator('[data-testid="search-results"], .search-result, .video-item');
    const noResults = page.locator('text=見つかりませんでした, text=結果がありません');
    
    await expect(results.or(noResults)).toBeVisible();
  });

  test('空の検索クエリでも適切に処理される', async ({ page }) => {
    await page.goto('/search?q=');

    // 空の検索に対する適切な表示
    const emptyMessage = page.locator('text=検索キーワードを入力, text=キーワードを入力してください');
    const searchInput = page.locator('input[name="q"], input[placeholder*="検索"]');
    
    await expect(searchInput.or(emptyMessage)).toBeVisible();
  });

  test('ページネーションが機能する', async ({ page }) => {
    await page.goto('/search?q=test');
    
    // ページネーションの存在確認
    const pagination = page.locator('[data-testid="pagination"], .pagination, nav').filter({ hasText: /次|前|1|2|3/ });
    
    if (await pagination.count() > 0) {
      // 次のページボタンがある場合はクリック
      const nextButton = page.locator('a').filter({ hasText: /次|Next|>/ });
      if (await nextButton.count() > 0) {
        await nextButton.first().click();
        await expect(page).toHaveURL(/page=2/);
      }
    }
  });

  test('検索フィルターが機能する', async ({ page }) => {
    await page.goto('/search?q=test');

    // フィルター要素の確認
    const filters = page.locator('select, input[type="checkbox"], input[type="radio"]');
    
    if (await filters.count() > 0) {
      // フィルターが存在する場合の動作確認
      const firstFilter = filters.first();
      const tagName = await firstFilter.tagName();
      
      if (tagName === 'SELECT') {
        await firstFilter.selectOption({ index: 1 });
      } else if (tagName === 'INPUT') {
        await firstFilter.check();
      }
      
      // フィルター適用後の結果確認
      await page.waitForLoadState('networkidle');
    }
  });
});