# パッケージアップデート自動化ツール

このドキュメントでは、koremina プロジェクトのパッケージアップデート自動化ツールについて説明します。

## 概要

パッケージアップデート自動化ツールは、以下の機能を提供します：

1. **アップデート可能パッケージの検出**: npm-check-updates を使用してアップデート可能なパッケージを自動検出
2. **Changelogリンクの収集**: 各パッケージのChangelogやリリースノートのリンクを自動収集
3. **アップデート情報の要約**: パッケージごとのアップデート内容の要約を生成
4. **注意点の自動追記**: Breaking Changesや既知の問題に関する注意点を自動追記
5. **レポート生成**: Markdown形式での詳細レポートを生成

## 使用方法

### 基本的なコマンド

```bash
# 推奨: アップデート可能なパッケージをチェック（レポート生成）
npm run package-update:check

# 基本チェック（レポートなし）
npm run package-update

# インタラクティブアップデート
npm run package-update:interactive

# 自動アップデート（要注意）
npm run package-update:update
```

### Claude code統合用コマンド

```bash
# Claude code用の最適化された出力
npm run package-update:claude

# JSON形式での詳細出力
npm run package-update:json

# 特定パッケージの詳細（Claude code用）
node scripts/claude-package-update.js --package [パッケージ名]
```

### 詳細オプション

```bash
# スクリプトを直接実行する場合
node scripts/package-update.js [options]

# 利用可能なオプション:
# --check     : アップデート可能なパッケージの確認のみ（デフォルト）
# --update    : 実際にパッケージをアップデート
# --report    : レポートファイルを生成
# --interactive : インタラクティブモード
# --json      : JSON形式で出力（Claude code統合用）
# --format    : 出力形式（console|json|markdown）
```

## Claude code統合

このツールはClaude codeのカスタムスラッシュコマンドでの使用に最適化されています。

### Claude code用の出力形式

```bash
# 簡潔なJSON出力（Claude code推奨）
npm run package-update:claude
```

出力例:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "hasUpdates": true,
  "message": "📦 5個のパッケージがアップデート可能",
  "packages": [
    {
      "name": "next",
      "from": "15.5.0",
      "to": "15.5.2",
      "status": "💡 確認推奨",
      "changelog": "https://github.com/vercel/next.js/releases"
    }
  ],
  "actions": {
    "viewDetails": "npm run package-update:check",
    "interactive": "npm run package-update:interactive",
    "updateAll": "npm run package-update:update"
  }
}
```

### カスタムスラッシュコマンドでの活用

Claude codeで以下のようなワークフローが可能になります：

1. **パッケージ更新チェック**: `/update-check` → `npm run package-update:claude`
2. **詳細情報の取得**: 各パッケージのchangelogリンクと注意点を確認
3. **段階的更新**: インタラクティブモードでの選択的更新
4. **レポート生成**: Markdown形式での詳細レポート生成

### JSON出力の構造

- `hasUpdates`: アップデートの有無
- `packages[]`: アップデート可能パッケージ一覧
  - `status`: パッケージの安全性レベル
  - `breaking`: Breaking Changesの有無
  - `cautions[]`: 注意点の配列
- `actions`: 推奨アクション一覧

## 機能詳細

### 1. パッケージ検出

- npm-check-updates を使用してアップデート可能なパッケージを検出
- 現在のバージョンと新しいバージョンを比較
- メジャーバージョンアップの自動検出

### 2. Changelogリンク収集

以下の方法でChangelogリンクを自動収集：

- 既知パッケージの直接リンク（Next.js、React、Prisma等）
- npm パッケージ情報からGitHubリポジトリを抽出
- 一般的なChangelog パターンの推測

### 3. 注意点の自動追記

パッケージごとに既知の注意点を自動追記：

- **Next.js**: Breaking Changes の可能性、ビルドテストの必要性
- **Prisma**: `npx prisma generate` の実行が必要
- **TypeScript**: 型チェックの厳格化
- **Node.js types**: 互換性の確認が必要
- **その他**: パッケージ固有の注意点

### 4. Breaking Changes 検出

以下の条件でBreaking Changesの可能性を判定：

- メジャーバージョンの変更
- Beta/Alpha/RC版への更新
- 既知の問題があるバージョン

## 出力例

### コンソール出力

```
🔍 パッケージアップデートチェックを開始します...

📦 14個のパッケージがアップデート可能です

📋 パッケージ情報を収集中...

✅ next: 情報収集完了
✅ prisma: 情報収集完了
...

📊 パッケージアップデートレポート

================================================================================

📦 next
   現在: 15.5.0
   更新: 15.5.2
   📋 Changelog: https://github.com/vercel/next.js/releases
   💡 注意点:
      - Next.js のメジャー/マイナーアップデートは Breaking Changes を含む可能性があります
      - アップデート後は `npm run build` でビルドエラーがないか確認してください
```

### Markdownレポート

`package-update-report.md` ファイルが生成され、以下の情報を含みます：

- アップデート可能パッケージの一覧
- 各パッケージの詳細情報
- Breaking Changes の警告
- 推奨アクション
- 実行コマンド

## 安全なアップデート手順

1. **事前確認**
   ```bash
   npm run package-update:check
   ```

2. **レポート確認**
   - 生成された `package-update-report.md` を確認
   - Breaking Changes があるパッケージを特定
   - 各パッケージのChangelogを確認

3. **段階的アップデート**
   ```bash
   # インタラクティブモードで選択的にアップデート
   npm run package-update:interactive
   ```

4. **動作確認**
   ```bash
   # 依存関係のインストール
   npm install
   
   # Prismaの場合
   npx prisma generate
   
   # ビルドテスト
   npm run build
   
   # テスト実行
   npm run test
   ```

5. **本番デプロイ**
   - テストが成功したら本番環境にデプロイ

## 注意事項

- **`--update` オプションの使用は慎重に**: 全パッケージを一括更新するため、事前にテスト環境で検証してください
- **Breaking Changes**: メジャーアップデートは必ずChangelogを確認してから実行してください
- **Prisma関連**: Prismaのアップデート後は必ず `npx prisma generate` を実行してください
- **型定義**: TypeScript関連のアップデートは型エラーが発生する可能性があります

## トラブルシューティング

### よくある問題

1. **ネットワークエラー**
   - npm registry への接続を確認
   - プロキシ設定を確認

2. **パッケージ情報取得エラー**
   - 個別パッケージの情報取得に失敗する場合がありますが、処理は継続されます

3. **アップデート後のビルドエラー**
   - Changelogを確認してBreaking Changesを調査
   - 必要に応じてコードの修正を実施

## カスタマイズ

スクリプトは以下の方法でカスタマイズ可能です：

- `scripts/package-update.js` の `knownLinks` オブジェクトに新しいパッケージのChangelogリンクを追加
- `knownCautions` オブジェクトにパッケージ固有の注意点を追加
- Breaking Changes 判定ロジックの調整

## 関連コマンド

```bash
# 従来のnpm-check-updatesコマンド
npm run ncu                 # チェックのみ
npm run ncu:i              # インタラクティブ
npm run ncu:upgrade        # 一括更新

# 新しい自動化ツール
npm run package-update             # 基本チェック
npm run package-update:check       # レポート付きチェック
npm run package-update:interactive # インタラクティブ
npm run package-update:update      # 自動更新（要注意）

# Claude code統合用
npm run package-update:claude      # Claude code用最適化出力
npm run package-update:json        # 詳細JSON出力
```