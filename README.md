This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## パッケージアップデート

このプロジェクトには、パッケージのアップデートを自動化するツールが含まれています。

### 基本的な使用方法

```bash
# アップデート可能なパッケージをチェック（推奨）
npm run package-update:check

# インタラクティブアップデート
npm run package-update:interactive

# Claude code統合用（カスタムスラッシュコマンド向け）
npm run package-update:claude

# 従来のコマンド
npm run ncu               # チェックのみ
npm run ncu:i            # インタラクティブ
npm run ncu:upgrade      # 一括更新
```

### Claude カスタムスラッシュコマンド 🚀

このプロジェクトは Claude code のカスタムスラッシュコマンドに対応しています。

#### セットアップ確認
```bash
# Claude設定の検証
npm run claude:setup-check
```

#### 利用可能なコマンド

| コマンド | 機能 | 安全性 |
|---------|------|--------|
| `/package-check` | アップデート可能パッケージの一覧表示 | ✅ 安全 |
| `/package-details [name]` | 特定パッケージの詳細情報 | ✅ 安全 |
| `/package-update-interactive` | 対話的な選択的アップデート | ⭐ 推奨 |
| `/package-report` | 詳細Markdownレポート生成 | ✅ 安全 |
| `/package-update-all` | 全パッケージ自動更新 | ⚠️ 危険 |

#### Claude code での使用例
```bash
# 1. 現在の状況を確認
/package-check

# 2. 特定パッケージの詳細確認
/package-details next

# 3. 安全にアップデート
/package-update-interactive
```

### 機能

- アップデート可能なパッケージの自動検出
- 各パッケージのChangelogリンクの収集
- Breaking Changesの警告
- アップデート時の注意点の表示
- 詳細レポートの生成
- **Claude code統合**: JSON形式の構造化出力でカスタムスラッシュコマンドに最適化

詳細については、以下のドキュメントを参照してください：
- [パッケージアップデートガイド](./docs/package-update.md)
- [Claude設定ガイド](./.claude/README.md)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
