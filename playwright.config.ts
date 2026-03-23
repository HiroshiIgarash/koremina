import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env.test") });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e/specs",
  // テスト間の DB 競合を避けるため並列実行を無効化
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    // Step 1: 認証状態を生成するセットアップ
    {
      name: "setup",
      testDir: "./e2e/specs",
      testMatch: /.*\.setup\.ts/,
    },
    // 未認証ユーザーのテスト
    {
      name: "public",
      testDir: "./e2e/specs/public",
      use: { ...devices["Desktop Chrome"] },
    },
    // 認証済みユーザーのテスト
    {
      name: "authenticated",
      testDir: "./e2e/specs/authenticated",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
