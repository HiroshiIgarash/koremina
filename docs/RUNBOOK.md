# ランブック (Runbook)

koremina の運用・デプロイ手順書です。

## デプロイ手順

### 本番デプロイ (Vercel)

koremina は Vercel に自動デプロイされます。

```
develop ブランチへの push → Vercel 自動ビルド → 本番デプロイ
```

手動デプロイが必要な場合:

```bash
# Vercel CLI を使用
npm i -g vercel
vercel --prod
```

### プレビューデプロイ

PR を作成すると Vercel がプレビュー環境を自動生成します。
URL は `VERCEL_PREVIEW_URL` 環境変数で設定します。

## 環境変数の管理

### Vercel ダッシュボードで設定する変数

| 変数名 | 環境 | 説明 |
|--------|------|------|
| `DATABASE_URL` | Production / Preview | Neon 接続プール URL |
| `DATABASE_URL_UNPOOLED` | Production / Preview | Neon 直接接続 URL |
| `AUTH_SECRET` | All | NextAuth.js シークレット |
| `AUTH_GOOGLE_ID` | All | Google OAuth |
| `AUTH_GOOGLE_SECRET` | All | Google OAuth |
| `AUTH_TWITTER_ID` | All | Twitter OAuth |
| `AUTH_TWITTER_SECRET` | All | Twitter OAuth |
| `YT_API_KEY` | All | YouTube API |
| `BLOB_READ_WRITE_TOKEN` | All | Vercel Blob |
| `MAILER_USER` | All | Gmail SMTP |
| `MAILER_PASS` | All | Gmail アプリパスワード |
| `EMAIL_TOKEN_HMAC_SECRET` | All | メール確認 HMAC |
| `NEXT_PUBLIC_BASE_URL` | All | アプリの公開 URL |

## ヘルスチェック

Next.js の組み込みエンドポイントでアプリの状態を確認:

```bash
# HTTP ステータスが 200 であることを確認
curl -I https://your-domain.vercel.app/
```

## データベース管理

### スキーマ変更（本番適用）

```bash
# 1. ローカルで変更を確認
npx prisma db push

# 2. develop ブランチにマージ → Vercel が自動でビルド
# 注: Vercel は postinstall で prisma generate --sql を実行します
```

### 本番 DB への直接接続

```bash
# DATABASE_URL_UNPOOLED を本番値に設定した状態で
pnpm dev:dbprod
```

### Prisma Studio（開発環境）

```bash
pnpm prisma:studio:dev
# http://localhost:5555 でアクセス
```

## よくある問題と対処法

### ビルドエラー: Prisma Client not generated

```bash
# 手動で生成
npx prisma generate --sql
```

### 認証エラー: AUTH_SECRET が見つからない

`.env.local` に `AUTH_SECRET` が設定されているか確認:

```bash
openssl rand -base64 32
# 生成値を AUTH_SECRET に設定
```

### 画像アップロードエラー: BLOB_READ_WRITE_TOKEN

Vercel Blob トークンの有効期限切れの可能性があります。
Vercel ダッシュボードでトークンを再生成してください。

### メール送信エラー

1. `MAILER_USER` が正しい Gmail アドレスか確認
2. `MAILER_PASS` が Gmail の**アプリパスワード**（通常のパスワードではない）か確認
3. Gmail の「安全性の低いアプリのアクセス」設定を確認

### DB 接続エラー

```bash
# 接続テスト
npx prisma db pull
```

- Neon の接続制限（無料プラン: 最大 10 接続）を確認
- `DATABASE_URL` に `pgbouncer=true` が含まれているか確認（接続プール使用時）

## ロールバック手順

### Vercel でのロールバック

1. Vercel ダッシュボード → Deployments
2. 前のデプロイを選択
3. "Promote to Production" をクリック

### データベースのロールバック

Prisma はマイグレーション履歴を使わず `db push` のため、
スキーマ変更のロールバックは手動対応が必要です:

```bash
# 1. schema.prisma を以前の状態に戻す
# 2. db push で適用（破壊的変更がある場合は --accept-data-loss が必要）
npx prisma db push
```

## 監視・ログ

- **Vercel ダッシュボード**: デプロイログ・関数ログ
- **Neon コンソール**: DB クエリ・接続数の確認
- **Vercel Analytics**: ページビュー・パフォーマンス指標

## 依存関係の更新

```bash
# 依存関係の確認
pnpm outdated

# セキュリティ監査
pnpm audit

# 更新（慎重に実施）
pnpm update
```

定期的な更新タイミング:
- セキュリティパッチ: 即時対応
- マイナーアップデート: 月次
- メジャーアップデート: 十分なテスト後
