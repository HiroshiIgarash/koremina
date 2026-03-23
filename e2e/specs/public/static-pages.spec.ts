import { test, expect } from "@playwright/test";

test.describe("静的ページ", () => {
  test("ログインページが表示される", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/login/);
    // ログインページのタイトル
    await expect(
      page.getByRole("heading", { name: "ログイン", exact: true })
    ).toBeVisible();
    // Googleログインボタン
    await expect(page.getByText("Googleでログイン")).toBeVisible();
    // Xログインボタン
    await expect(page.getByText("Xでログイン")).toBeVisible();
  });

  test("ログインページにログインメリット説明が表示される", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("コレミナにログインすると")).toBeVisible();
    await expect(page.getByText("おすすめ動画の投稿")).toBeVisible();
  });

  test("FAQページが表示される", async ({ page }) => {
    await page.goto("/faq");
    await expect(page).toHaveURL(/faq/);
  });

  test("ポリシーページが表示される", async ({ page }) => {
    await page.goto("/policy");
    await expect(page).toHaveURL(/policy/);
  });

  test("Aboutページが表示される", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveURL(/about/);
  });

  test("更新履歴ページが表示される", async ({ page }) => {
    await page.goto("/history");
    await expect(page).toHaveURL(/history/);
  });

  test("存在しないページは404を返す", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-xyz123");
    expect(response?.status()).toBe(404);
  });
});
