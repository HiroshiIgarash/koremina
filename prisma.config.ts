/**
 * Prisma設定ファイル
 * package.jsonの非推奨なprisma設定からの移行
 * @see https://pris.ly/prisma-config
 */
export default {
  seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
};