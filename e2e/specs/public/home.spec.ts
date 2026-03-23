import { test, expect } from "@playwright/test";

test.describe("トップページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("正常に表示される", async ({ page }) => {
    await expect(page).toHaveTitle(
      /コレミナ -にじさんじおすすめ動画共有サービス（非公式）-/
    );
  });

  test("キービジュアル画像が表示される", async ({ page }) => {
    // キービジュアル（SPまたはPC用）の画像が存在する
    // SPとPC用の2枚が存在する。Desktop Chromeではmd:block（PC用=2枚目）が表示される
    await expect(page.locator('img[alt*="コレミナ"]').last()).toBeVisible();
  });

  test("おすすめ動画を探すセクションが表示される", async ({ page }) => {
    await expect(page.getByText("おすすめ動画を探す")).toBeVisible();
  });

  test("新着投稿セクションが表示される", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "新着投稿" })).toBeVisible();
  });

  test("Pick Upセクションが表示される", async ({ page }) => {
    await expect(page.getByText("Pick Up!")).toBeVisible();
  });

  test("コレミナについてのリンクが存在する", async ({ page }) => {
    const aboutLink = page.getByRole("link", {
      name: "コレミナについて",
      exact: true,
    });
    await expect(aboutLink).toBeVisible();
  });

  test("ワード検索フォームが表示される", async ({ page }) => {
    await expect(page.getByText("ワードで検索")).toBeVisible();
  });
});

test.describe("トップページのナビゲーション", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("ヘッダーが表示される", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
  });

  test("フッターが表示される", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
