import { test, expect } from '@playwright/test';
import { 
  disableFirstVisitDialog, 
  setupComponentTest, 
  waitForPageFullyLoaded 
} from '../helpers/vrt-helpers';

/**
 * VRT基本動作確認テスト
 * Playwright VRT環境が正しく動作することを確認するための簡単なテスト
 */
test.describe('VRT Basic Functionality Test', () => {
  test('ホームページの基本スクリーンショット撮影確認', async ({ page }) => {
    // 基本設定でページを準備
    await setupComponentTest(page, { mobile: false, darkMode: false });
    
    // ホームページに移動
    await page.goto('/');
    
    // 初回訪問ダイアログを無効化
    await disableFirstVisitDialog(page);
    await page.reload();
    
    // ページの完全読み込み待機
    await waitForPageFullyLoaded(page);
    
    // スクリーンショットを撮影（VRT環境の動作確認）
    await expect(page).toHaveScreenshot('basic-homepage-test.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 400 } // 上部のみ撮影
    });
  });

  test('モバイル表示の基本確認', async ({ page }) => {
    // モバイル設定でページを準備
    await setupComponentTest(page, { mobile: true, darkMode: false });
    
    await page.goto('/');
    await disableFirstVisitDialog(page);
    await page.reload();
    await waitForPageFullyLoaded(page);
    
    // モバイル版スクリーンショット
    await expect(page).toHaveScreenshot('basic-mobile-test.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 390, height: 400 } // 上部のみ撮影
    });
  });

  test('ダークモードの基本確認', async ({ page }) => {
    // ダークモード設定でページを準備
    await setupComponentTest(page, { mobile: false, darkMode: true });
    
    await page.goto('/');
    await disableFirstVisitDialog(page);
    await page.reload();
    await waitForPageFullyLoaded(page);
    
    // ダークモード版スクリーンショット
    await expect(page).toHaveScreenshot('basic-dark-mode-test.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 400 } // 上部のみ撮影
    });
  });
});