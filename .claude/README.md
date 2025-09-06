# Claude カスタムスラッシュコマンド設定

このディレクトリには、koremina プロジェクトのパッケージアップデート自動化ツール用の Claude カスタムスラッシュコマンド設定が含まれています。

## 📁 ファイル構成

```
.claude/
├── README.md                                    # このファイル
├── config.json                                 # Claude ワークスペース設定
├── commands.json                               # 統合コマンド定義
└── manifest.json                               # Claude拡張マニフェスト
```

## 🚀 セットアップ方法

### 1. Claude code での設定

1. Claude code でこのプロジェクトのワークスペースを開く
2. 設定メニューから「カスタムスラッシュコマンド」を選択
3. `.claude/commands.json` ファイルを読み込み
4. コマンドが正常に登録されたことを確認

### 2. 依存関係のインストール

```bash
# プロジェクトの依存関係をインストール
npm install

# npm-check-updates が利用可能か確認
npx npm-check-updates --version
```

### 3. 動作確認

```bash
# Claude code で以下のコマンドを実行してテスト
/package-update
```

## 📋 統合コマンド

### `/package-update` - オールインワン パッケージ管理ツール

**🎯 主な機能（一つのコマンドですべて実行）:**

1. **📊 ncuによるバージョンアップデートチェック**
   - npm-check-updatesを使用してアップデート可能なパッケージを自動検出

2. **🔗 changelogリンク自動収集**  
   - 各パッケージのGitHubリポジトリから自動的にChangelogやリリースノートのリンクを収集
   - Next.js、React、Prisma、Zodなど主要パッケージの直接リンクを内蔵

3. **📝 アップデート情報要約**
   - パッケージごとの変更内容とバージョン情報を構造化して表示
   - Breaking Changes の自動検出と警告

4. **⚠️ 注意点・補足の自動追記**
   - **Next.js**: ビルドテストの必要性を警告
   - **Prisma**: `npx prisma generate`の実行が必要であることを通知  
   - **TypeScript**: 型チェックの厳格化について注意喚起
   - メジャーバージョンアップデート時の Breaking Changes 警告

**📤 出力形式:**
- JSON形式の構造化データ
- パッケージごとの安全性レベル（✅安全/💡確認推奨/⚠️要注意）
- 推奨アクション付き

## 🔄 推奨ワークフロー

### 日常的なパッケージ管理

```bash
# 1. 統合チェック実行（全機能を一括実行）
/package-update
```

### 詳細分析が必要な場合

```bash
# npm スクリプトで詳細情報を取得
npm run package-update:check      # Markdownレポート生成
npm run package-update:interactive # 対話的アップデート
npm run package-update:json       # 詳細JSON出力
```

### アップデート後の確認手順

```bash
# ビルドテスト
npm run build

# テスト実行  
npm run test

# Prisma関連のパッケージを更新した場合
npx prisma generate
```

## ⚠️ 安全性ガイドライン

### 必須の事前準備
- ✅ gitでコミット済み
- ✅ Breaking Changesの内容を理解
- ✅ テスト環境での事前検証
- ✅ ロールバック手順の確認

### 推奨手順
1. **確認**: `/package-update` で全情報を一括取得
2. **分析**: 出力されたchangelogリンクと注意点を確認
3. **計画**: Breaking Changesの影響を評価
4. **実行**: `npm run package-update:interactive` で段階的アップデート
5. **検証**: ビルドとテストで動作確認

## 🔧 トラブルシューティング

### コマンドが認識されない
- Claude code の設定でスラッシュコマンドが有効化されているか確認
- `.claude/commands.json` が正しく読み込まれているか確認

### npm-check-updates エラー
```bash
# npm-check-updates を再インストール
npm install -g npm-check-updates
# または
npx npm-check-updates
```

### アップデート後のエラー
```bash
# パッケージの整合性を確認
npm install

# キャッシュクリア  
npm cache clean --force

# 最悪の場合はロールバック
git checkout .
npm install
```

## 📚 関連ドキュメント

- [パッケージアップデートツール詳細](../docs/package-update.md)
- [プロジェクトREADME](../README.md)

## 🤝 貢献

カスタムスラッシュコマンドの改善提案は Issue またはPRでお願いします。

- 新機能の追加
- 安全性の向上
- ドキュメントの改善

---

**⚡ Claude code でパッケージ管理を自動化しましょう！**