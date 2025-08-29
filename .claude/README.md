# Claude カスタムスラッシュコマンド設定

このディレクトリには、koremina プロジェクトのパッケージアップデート自動化ツール用の Claude カスタムスラッシュコマンド設定が含まれています。

## 📁 ファイル構成

```
.claude/
├── README.md                                    # このファイル
├── config.json                                 # Claude ワークスペース設定
├── commands.json                               # コマンド一覧定義
└── commands/
    ├── package-check.json                      # パッケージチェックコマンド
    ├── package-details.json                    # パッケージ詳細コマンド  
    ├── package-update-interactive.json         # インタラクティブアップデート
    ├── package-report.json                     # レポート生成コマンド
    └── package-update-all.json                 # 一括アップデート（危険）
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
/package-check
```

## 📋 利用可能なコマンド

### `/package-check`
- **機能**: アップデート可能なパッケージの一覧を表示
- **出力**: JSON形式の構造化データ
- **用途**: 定期的なパッケージ状況の確認

### `/package-details [パッケージ名]`
- **機能**: 特定パッケージの詳細情報を取得
- **例**: `/package-details next`
- **出力**: changelog、注意点、Breaking Changes情報

### `/package-update-interactive`
- **機能**: 安全な対話的パッケージアップデート
- **特徴**: 個別選択可能、Breaking Changes警告付き
- **推奨度**: ⭐⭐⭐⭐⭐ (最も安全)

### `/package-report`
- **機能**: 詳細なMarkdownレポートを生成
- **出力**: `package-update-report.md` ファイル
- **用途**: チーム共有、アップデート計画策定

### `/package-update-all` ⚠️
- **機能**: 全パッケージを一括アップデート
- **警告**: 非常に危険、本番環境使用禁止
- **推奨度**: ⭐ (テスト環境のみ)

## 🔄 推奨ワークフロー

### 日常的なパッケージ管理

```bash
# 1. 現在の状況を確認
/package-check

# 2. 詳細レポートを生成
/package-report

# 3. 気になるパッケージの詳細を確認
/package-details next
/package-details prisma

# 4. 安全にアップデート
/package-update-interactive
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

### 危険なコマンド
- 🚨 `/package-update-all` - 本番環境では絶対使用禁止
- ⚠️ メジャーバージョンアップ - 必ず事前に影響を確認

### 推奨手順
1. **確認**: `/package-check` で状況把握
2. **分析**: `/package-report` で詳細分析  
3. **計画**: Breaking Changesの影響を評価
4. **実行**: `/package-update-interactive` で段階的アップデート
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

- 新しいコマンドの追加
- 既存コマンドの機能改善
- 安全性の向上
- ドキュメントの改善

---

**⚡ Claude code でパッケージ管理を自動化しましょう！**