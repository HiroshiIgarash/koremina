# コントリビューションガイド

koremina プロジェクトへの貢献方法をまとめたガイドです。

## 前提条件

- **Node.js**: v24.13.0 (mise で管理、`.mise.toml` 参照)
- **pnpm**: v10.32.1（`npm install -g pnpm` でインストール）
- **PostgreSQL**: v14 以上（ローカル開発用）

## セットアップ

```bash
# 1. リポジトリをクローン
git clone https://github.com/your-org/koremina.git
cd koremina

# 2. 依存関係をインストール
pnpm install

# 3. 環境変数を設定
cp .env.example .env.local
# .env.local を編集して各値を設定

# 4. ローカル DB を起動（Docker を使う場合）
docker run -d \
  --name koremina-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  postgres:14

# 5. DB スキーマを適用
npx prisma db push

# 6. 開発サーバーを起動
pnpm dev
```

## 利用可能なコマンド

<!-- AUTO-GENERATED from package.json scripts -->

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | Turbopack で開発サーバーを起動（localhost:3000） |
| `pnpm dev:host` | ローカルネットワーク向けに開発サーバーを起動 |
| `pnpm dev:dbprod` | 本番 DB に接続して開発サーバーを起動 |
| `pnpm build` | 本番向けビルド（Prisma SQL 生成を含む） |
| `pnpm start` | ビルド済みアプリを起動 |
| `pnpm lint` | ESLint でコードをチェック |
| `pnpm format` | Prettier でコードをフォーマット |
| `pnpm format:check` | Prettier フォーマットチェック（CI 用） |
| `pnpm test` | Jest テストスイートを実行 |
| `pnpm prisma:studio:dev` | ローカル DB で Prisma Studio を起動 |

<!-- END AUTO-GENERATED -->

## テスト

```bash
# 全テストを実行
pnpm test

# テストファイルの場所
__tests__/
```

テスト作成のルール:
- **実装詳細ではなく振る舞いをテスト**
- テスト間の依存を避け、任意の順序で実行可能にする
- `@testing-library/react` + `@testing-library/user-event` を使用

## コードスタイル

### フォーマット (Prettier)

```bash
# フォーマット適用
pnpm format

# チェックのみ
pnpm format:check
```

- ダブルクォート、セミコロン必須
- インデント: 2スペース
- 行幅: 80文字
- ES5 トレーリングカンマ、LF 改行

### Lint (ESLint)

```bash
pnpm lint
```

### 言語規約

- **コメント・ドキュメント**: 日本語
- **変数・関数名**: 英語 camelCase
- **コミットメッセージ**: 日本語 + conventional prefix

## Git ワークフロー

### ブランチ戦略

- ベースブランチ: `develop`
- ブランチ命名: `feat/`, `fix/`, `chore/` などのプレフィックスを使用

### コミットメッセージ

コンベンショナルコミット形式（日本語）:

```
feat: 新機能の説明
fix: バグ修正の説明
docs: ドキュメントの更新
test: テストの追加・修正
refactor: リファクタリング
chore: 雑務（依存関係更新など）
```

### PR の作成

```bash
# 通常の PR（自動コードレビューあり）
gh pr create --base develop --title "feat: 機能名" --body "説明"

# レビューをスキップ（WIP や軽微な変更）
gh pr create --base develop --title "[skip-review] chore: 説明" --body "説明"
```

### PR チェックリスト

- [ ] `pnpm lint` が通る
- [ ] `pnpm format:check` が通る
- [ ] `pnpm test` が通る
- [ ] `pnpm build` が通る（TypeScript エラーなし）
- [ ] 適切なコミットメッセージ形式

## データベース変更

1. `prisma/schema.prisma` を編集
2. `npx prisma db push` でスキーマを適用
3. `npx prisma generate` でクライアントを更新
4. 必要に応じてテストを更新
