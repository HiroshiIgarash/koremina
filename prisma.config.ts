import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // CLIツール（migrate/studio）用にプーリングなしの直接接続を使用
    url: env("DATABASE_URL_UNPOOLED"),
  },
});
