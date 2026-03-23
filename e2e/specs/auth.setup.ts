import { test as setup } from "@playwright/test";
import { encode } from "next-auth/jwt";
import { Client } from "pg";
import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";

const AUTH_FILE = path.join(__dirname, "../../.auth/user.json");

setup("認証状態のセットアップ", async ({ page }) => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL 環境変数が設定されていません");
  }

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    throw new Error("AUTH_SECRET 環境変数が設定されていません");
  }

  const client = new Client({ connectionString });
  await client.connect();

  try {
    const testEmail = "e2e-test@example.com";
    const testName = "E2Eテストユーザー";

    // テスト用ユーザーをupsert (PostgreSQL)
    // ON CONFLICT 時は既存の id を保持するため、INSERT 側の id はコンフリクト非発生時のみ使用される
    const result = await client.query(
      `
      INSERT INTO "User" (id, email, name, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET "updatedAt" = NOW()
      RETURNING id, email, name, image
      `,
      [crypto.randomUUID(), testEmail, testName]
    );

    const testUser = result.rows[0];
    if (!testUser) {
      throw new Error("テストユーザーの作成・取得に失敗しました");
    }

    // NextAuth.js v5 のJWTトークンを生成
    const sessionToken = await encode({
      token: {
        sub: testUser.id,
        id: testUser.id,
        name: testUser.name,
        email: testUser.email,
        picture: testUser.image ?? null,
      },
      secret: authSecret,
      salt: "authjs.session-token",
    });

    // .auth ディレクトリを作成
    const authDir = path.join(__dirname, "../../.auth");
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    // cookieを設定
    await page.context().addCookies([
      {
        name: "authjs.session-token",
        value: sessionToken,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        expires: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24時間（CI実行には十分な有効期限）
      },
    ]);

    // 認証状態を保存
    await page.context().storageState({ path: AUTH_FILE });
  } finally {
    await client.end();
  }
});
