# VRT (Visual Regression Testing) 実装ガイド

## 概要

このプロジェクトでは、無料で利用できるPlaywright Visual Testingを使用してビジュアルリグレッションテストを実装しています。

## VRTとは

Visual Regression Testing（VRT）は、UIコンポーネントやページの視覚的な変更を自動的に検出するテスト手法です。スクリーンショット比較により、意図しない視覚的変更やデザインの破綻を早期に発見できます。

## 採用ライブラリ

**Playwright Visual Testing**
- 完全無料で利用可能
- Next.jsとの高い親和性
- 複数ブラウザサポート（Chromium, Firefox, WebKit）
- CI/CD統合が容易
- 豊富な設定オプション

## プロジェクト構造

```
tests/vrt/
├── components/           # コンポーネント単位のVRT
│   ├── birthday.spec.ts
│   ├── first-visit-dialog.spec.ts
│   └── ui-components.spec.ts
├── desktop/             # デスクトップ表示のVRT
│   └── homepage.spec.ts
├── mobile/              # モバイル表示のVRT
│   └── homepage.spec.ts
└── helpers/             # VRT用ヘルパー関数
    └── vrt-helpers.ts

test-results/            # ベースライン画像格納
├── components/
├── desktop/
└── mobile/

playwright.config.ts     # Playwright設定ファイル
.github/workflows/vrt.yml # CI/CD設定
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install --save-dev @playwright/test playwright
```

### 2. Playwrightブラウザのインストール

```bash
npx playwright install
```

## 使用方法

### 基本的なVRTテストの実行

```bash
# 全VRTテスト実行
npm run test:vrt

# 特定のテストファイルのみ実行
npx playwright test tests/vrt/components/birthday.spec.ts

# UIモードでの実行（対話的）
npm run test:vrt:ui

# デバッグモードでの実行
npm run test:vrt:debug
```

### ベースライン画像の更新

```bash
# 全ベースライン画像を更新
npm run test:vrt:update

# 特定のテストのベースライン画像のみ更新
npx playwright test tests/vrt/components/birthday.spec.ts --update-snapshots
```

## テスト対象

### コンポーネントレベル
- Birthdayコンポーネント（今日/未来/データなしの各状態）
- FirstVisitDialogコンポーネント
- UIコンポーネント（Button, Select, Dialog等）

### ページレベル
- ホームページ（デスクトップ/モバイル）
- ヘッダー、フッター
- メインビジュアル（KV）

### 表示状態
- ライトモード / ダークモード
- デスクトップ / タブレット / モバイル
- ホバー状態
- ローディング状態

## CI/CD統合

GitHub Actionsで自動実行される設定になっています：

- **Pull Request**: VRTを実行し、差分があれば警告
- **develop ブランチへのpush**: ベースライン画像を自動更新

## ベストプラクティス

### 1. 安定したテスト環境
- ビューポートサイズの統一
- フォントの一貫性
- アニメーション無効化（必要に応じて）

### 2. 適切な許容閾値
- `threshold: 0.2` (20%の差分まで許容)
- フォントレンダリングの違いを考慮

### 3. テストの分離
- 各テストは独立して実行可能
- 外部APIへの依存を最小化
- モックデータの活用

### 4. メンテナンス
- 意図的なデザイン変更時はベースライン更新
- 定期的な画像の見直し
- CI環境との整合性確保

## トラブルシューティング

### よくある問題

1. **フォントレンダリングの違い**
   - CI環境とローカル環境でフォントが異なる
   - 解決策: 特定フォントの統一、閾値調整

2. **タイミング問題**
   - ローディング状態での撮影
   - 解決策: 適切な待機処理の追加

3. **動的コンテンツ**
   - 日付や時間などの変動するコンテンツ
   - 解決策: モックデータの使用、固定値設定

## 拡張可能性

### 新しいテストの追加

1. 適切なディレクトリにテストファイルを作成
2. `vrt-helpers.ts` のヘルパー関数を活用
3. 一貫した命名規則でスクリーンショット名を設定

### カスタムヘルパー関数

```typescript
import { setupComponentTest } from '../helpers/vrt-helpers';

test('新しいコンポーネントのテスト', async ({ page }) => {
  await setupComponentTest(page, { 
    mobile: true, 
    darkMode: true 
  });
  
  // テストロジック
});
```

## まとめ

このVRT実装により、以下が実現されます：

- **品質向上**: 意図しないUIの変更を早期発見
- **効率化**: 手動でのビジュアル確認作業の自動化
- **信頼性**: CI/CDパイプラインでの継続的な品質チェック
- **チーム開発**: デザインレビューの標準化

無料でありながら、エンタープライズレベルのVRTが実現できる環境を構築しました。