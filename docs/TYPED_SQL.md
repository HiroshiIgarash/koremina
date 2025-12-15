# Prisma Typed SQL ドキュメント

このプロジェクトでは、Prisma の Typed SQL 機能を使用してパフォーマンスを最適化しています。

## 設定

### 1. Prisma Schema 設定

`prisma/schema.prisma` で `typedSql` プレビュー機能を有効化：

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["typedSql"]
}
```

### 2. SQLファイルの配置

`prisma/sql/` ディレクトリに `.sql` ファイルを配置します：

- `getRandomPostIds.sql` - ランダムな投稿IDを取得
- `getRandomUnseenBookmarks.sql` - 未視聴ブックマークをランダムに取得

### 3. 型生成コマンド

```bash
# Prisma Client と Typed SQL の型を生成
npm run prisma:generate

# または直接
npx prisma generate --sql
```

## 使用方法

### TypeScript での Typed SQL 使用例

```typescript
import prisma from "@/lib/db";
import { getRandomUnseenBookmarks as getRandomUnseenBookmarksSQL } from "@prisma/client/sql";

// Typed SQL クエリの実行
const results = await prisma.$queryRawTyped(
  getRandomUnseenBookmarksSQL(userId, randomSeed, limit)
);
```

### SQLファイルの記述ルール

SQLファイルでは、パラメータを以下の形式で定義します：

```sql
-- @param {String} $1:userId
-- @param {Float} $2:seed  
-- @param {Int} $3:limit
SELECT ...
WHERE column = $1
LIMIT $3;
```

## パフォーマンスの利点

1. **タイプセーフティ**: TypeScript で完全な型チェック
2. **最適化**: データベースレベルでの効率的なクエリ実行
3. **保守性**: SQLとTypeScriptの分離による可読性向上
4. **再利用性**: 型付きクエリ関数の再利用

## ビルドプロセス

本番ビルド時に自動的に型生成が実行されます：

```bash
npm run build
# -> npm run prisma:generate && next build
```