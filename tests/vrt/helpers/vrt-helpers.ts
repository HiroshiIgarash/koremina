/**
 * VRT（Visual Regression Testing）ヘルパー関数
 */

import { Page, Locator } from '@playwright/test';

/**
 * 初回訪問ダイアログを無効にする
 */
export async function disableFirstVisitDialog(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.setItem('isFirstVisit', 'false');
  });
}

/**
 * 初回訪問ダイアログを有効にする
 */
export async function enableFirstVisitDialog(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.removeItem('isFirstVisit');
  });
}

/**
 * ダークモードに切り替える
 */
export async function enableDarkMode(page: Page): Promise<void> {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
}

/**
 * ライトモードに切り替える
 */
export async function enableLightMode(page: Page): Promise<void> {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
}

/**
 * ページの完全な読み込みを待機
 */
export async function waitForPageFullyLoaded(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  // フォントなどの非同期リソースの読み込み待機
  await page.waitForTimeout(500);
}

/**
 * 要素が安定するまで待機（アニメーション完了など）
 */
export async function waitForElementStable(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  // アニメーション完了を待機
  await locator.page().waitForTimeout(300);
}

/**
 * モバイルビューポートに設定
 */
export async function setMobileViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 390, height: 844 });
}

/**
 * デスクトップビューポートに設定
 */
export async function setDesktopViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 1280, height: 720 });
}

/**
 * タブレットビューポートに設定
 */
export async function setTabletViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 768, height: 1024 });
}

/**
 * スクロールして要素を表示エリア内に移動
 */
export async function scrollToElement(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
  await locator.page().waitForTimeout(200);
}

/**
 * ホバー状態でスクリーンショットを撮影するヘルパー
 */
export async function screenshotWithHover(locator: Locator, targetElement: Locator): Promise<void> {
  await targetElement.hover();
  await locator.page().waitForTimeout(100); // ホバー効果の適用を待機
}

/**
 * 特定の状態でコンポーネントをテストするためのセットアップ
 */
export interface ComponentTestOptions {
  darkMode?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  hover?: boolean;
  disableAnimations?: boolean;
}

export async function setupComponentTest(page: Page, options: ComponentTestOptions = {}): Promise<void> {
  // ビューポート設定
  if (options.mobile) {
    await setMobileViewport(page);
  } else if (options.tablet) {
    await setTabletViewport(page);
  } else {
    await setDesktopViewport(page);
  }

  // テーマ設定
  if (options.darkMode) {
    await enableDarkMode(page);
  } else {
    await enableLightMode(page);
  }

  // アニメーション無効化
  if (options.disableAnimations) {
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
  }
}