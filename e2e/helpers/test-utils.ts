import { Page } from "@playwright/test";

/**
 * ページのDOMコンテンツが読み込まれるまで待機する
 *
 * "networkidle" は動的コンテンツの多いページで不安定になりやすいため、
 * "domcontentloaded" を使用する。さらに厳密な待機が必要な場合は
 * 呼び出し元で expect(locator).toBeVisible() を使うこと。
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState("domcontentloaded");
}
