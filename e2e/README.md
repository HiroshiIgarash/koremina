# E2Eテスト

このプロジェクトでは、[Playwright](https://playwright.dev/)を使用してE2E（End-to-End）テストを実装しています。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Playwrightブラウザのインストール

```bash
npx playwright install
```

## テストの実行

### 基本的な実行

```bash
# 全てのE2Eテストを実行
npm run test:e2e

# UIモードでテストを実行（ブラウザを表示しながら）
npm run test:e2e:ui

# テストレポートを表示
npm run test:e2e:report
```

### 特定のテストファイルを実行

```bash
# ホームページのテストのみ実行
npx playwright test home.spec.ts

# 認証関連のテストのみ実行
npx playwright test auth.spec.ts
```

### 特定のブラウザでテストを実行

```bash
# Chromiumのみでテスト実行
npx playwright test --project=chromium

# モバイルChromeでテスト実行
npx playwright test --project="Mobile Chrome"
```

### ヘッドレスモードの切り替え

```bash
# ヘッド付きモードで実行（ブラウザを表示）
npx playwright test --headed

# デバッグモードで実行
npx playwright test --debug
```

## テストファイル構成

```
e2e/
├── home.spec.ts        # ホームページのテスト
├── auth.spec.ts        # 認証機能のテスト
├── search.spec.ts      # 検索機能のテスト
├── navigation.spec.ts  # ナビゲーションのテスト
└── post.spec.ts        # 動画投稿機能のテスト
```

## テストケース

### 1. ホームページ（home.spec.ts）
- トップページの正常表示
- レスポンシブデザインの動作確認
- 検索フォームの基本機能

### 2. 認証機能（auth.spec.ts）
- 初回訪問ダイアログの表示
- ログインページへのアクセス
- 未認証ユーザーのアクセス制限

### 3. 検索機能（search.spec.ts）
- 検索ページの表示
- 検索クエリの処理
- ページネーション機能
- 検索フィルターの動作

### 4. ナビゲーション（navigation.spec.ts）
- メインナビゲーションの動作
- ヘッダー・フッターの表示
- 404ページの処理
- ページ間遷移

### 5. 動画投稿機能（post.spec.ts）
- 投稿フォームの表示
- YouTube IDによるサムネイル表示
- フォームバリデーション
- 投稿完了処理

## CI/CD統合

GitHub Actionsでの自動テスト実行については、以下の設定を追加することができます：

```yaml
# .github/workflows/e2e.yml
name: E2E Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm run test:e2e
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## 設定ファイル

### playwright.config.ts

Playwrightの設定ファイルです。以下の設定が含まれています：

- テストディレクトリ：`./e2e`
- ベースURL：`http://localhost:3000`
- ブラウザ設定：Chromium、Firefox、WebKit、モバイル
- レポート形式：HTML
- スクリーンショット・動画録画設定

## トラブルシューティング

### よくある問題

1. **ブラウザがインストールされていない**
   ```bash
   npx playwright install
   ```

2. **開発サーバーが起動していない**
   ```bash
   npm run dev
   ```

3. **データベースの準備ができていない**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### デバッグ方法

- `--debug` フラグを使用してステップ実行
- `--headed` フラグでブラウザを表示
- `page.pause()` でテストを一時停止
- スクリーンショット機能の活用

## 拡張可能性

今後追加できるテストケース：

- API エンドポイントのテスト
- パフォーマンステスト
- アクセシビリティテスト
- セキュリティテスト
- 国際化（i18n）テスト