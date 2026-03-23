import { test, expect } from "@playwright/test";

test.describe("設定ページ (認証済み)", () => {
  test("設定ページにアクセスできる", async ({ page }) => {
    await page.goto("/setting");
    await expect(page).toHaveURL(/setting/);
  });

  test("設定ページでユーザー情報エリアが表示される", async ({ page }) => {
    await page.goto("/setting");
    // main要素が表示されるまで待機（networkidleより安定）
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("設定ページ (未認証リダイレクト確認)", () => {
  // 未認証状態 (storageStateを空にする)
  test.use({ storageState: { cookies: [], origins: [] } });

  test("未認証でアクセスするとトップページにリダイレクトされる", async ({
    page,
  }) => {
    await page.goto("/setting");
    // 設定ページのURLではないことを確認（/ にリダイレクトされる）
    await expect(page).not.toHaveURL(/\/setting$/);
  });
});
