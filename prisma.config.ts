import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // CLIツール（migrate/studio）用にプーリングなしの直接接続を使用
    // DATABASE_URL_UNPOOLED が未設定の場合（CI の generate 時など）は DATABASE_URL にフォールバック
    // どちらも未設定の場合は generate が DB 接続なしで動作できるようダミー URL を使用
    url:
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.DATABASE_URL ??
      "postgresql://localhost/placeholder",
  },
});
