#!/usr/bin/env node

/**
 * Claude code用パッケージアップデートツール
 * 
 * カスタムスラッシュコマンドで使用するための最適化されたツール
 * 簡潔で構造化されたアップデート情報を提供
 */

const PackageUpdateManager = require('./package-update.js');

class ClaudePackageUpdateManager extends PackageUpdateManager {
  constructor() {
    super();
    this.outputFormat = 'json';
  }

  /**
   * Claude code専用の簡潔な実行
   */
  async runForClaude() {
    try {
      // アップデート可能なパッケージを取得
      await this.checkUpdates();

      if (this.packageUpdates.length === 0) {
        this.outputClaudeResult({
          hasUpdates: false,
          message: '✅ すべてのパッケージが最新版です',
          packages: []
        });
        return;
      }

      // 詳細情報を収集
      await this.gatherPackageInfo();

      // Claude向けの結果を出力
      this.outputClaudeResult({
        hasUpdates: true,
        message: `📦 ${this.packageUpdates.length}個のパッケージがアップデート可能`,
        packages: this.formatPackagesForClaude()
      });

    } catch (error) {
      this.outputClaudeResult({
        hasUpdates: false,
        error: true,
        message: `❌ エラー: ${error.message}`,
        packages: []
      });
    }
  }

  /**
   * Claude用のパッケージ情報をフォーマット
   */
  formatPackagesForClaude() {
    return this.packageUpdates.map(pkg => {
      const formatted = {
        name: pkg.name,
        from: pkg.currentVersion,
        to: pkg.newVersion,
        status: this.getPackageStatus(pkg)
      };

      // 必要な情報のみ追加
      if (pkg.changelog) {
        formatted.changelog = pkg.changelog;
      }

      if (pkg.breaking) {
        formatted.breaking = true;
      }

      if (pkg.cautions && pkg.cautions.length > 0) {
        formatted.cautions = pkg.cautions;
      }

      return formatted;
    });
  }

  /**
   * パッケージのステータスを判定
   */
  getPackageStatus(pkg) {
    if (pkg.breaking) {
      return '⚠️  要注意';
    }
    if (pkg.cautions && pkg.cautions.length > 0) {
      return '💡 確認推奨';
    }
    return '✅ 安全';
  }

  /**
   * Claude用の結果を出力
   */
  outputClaudeResult(result) {
    const output = {
      timestamp: new Date().toISOString(),
      ...result,
      // Claude codeで使いやすいアクション
      actions: {
        viewDetails: 'npm run package-update:check',
        interactive: 'npm run package-update:interactive',
        updateAll: 'npm run package-update:update'
      }
    };

    console.log(JSON.stringify(output, null, 2));
  }

  /**
   * 特定パッケージの詳細情報（Claude code用）
   */
  async getPackageDetailsForClaude(packageName) {
    try {
      // 指定されたパッケージのみをチェック
      const singlePackageUpdate = this.packageUpdates.find(pkg => pkg.name === packageName);
      
      if (!singlePackageUpdate) {
        console.log(JSON.stringify({
          error: true,
          message: `パッケージ '${packageName}' が見つかりません`
        }));
        return;
      }

      const npmInfo = await this.getNpmInfo(packageName);
      
      const details = {
        name: packageName,
        currentVersion: singlePackageUpdate.currentVersion,
        newVersion: singlePackageUpdate.newVersion,
        changelog: this.guessChangelogUrl(packageName, npmInfo),
        cautions: this.getKnownCautions(packageName, singlePackageUpdate.newVersion),
        breaking: this.checkBreakingChange(singlePackageUpdate.currentVersion, singlePackageUpdate.newVersion),
        updateCommand: `npm install ${packageName}@${singlePackageUpdate.newVersion}`,
        description: npmInfo?.description || '',
        homepage: npmInfo?.homepage || '',
        lastModified: npmInfo?.time?.[singlePackageUpdate.newVersion] || ''
      };

      console.log(JSON.stringify(details, null, 2));

    } catch (error) {
      console.log(JSON.stringify({
        error: true,
        message: `詳細情報の取得に失敗: ${error.message}`
      }));
    }
  }
}

// コマンドライン引数を処理
async function main() {
  const args = process.argv.slice(2);
  const manager = new ClaudePackageUpdateManager();

  if (args[0] === '--package' && args[1]) {
    // 特定パッケージの詳細
    await manager.runForClaude();
    await manager.getPackageDetailsForClaude(args[1]);
  } else {
    // 全パッケージのチェック
    await manager.runForClaude();
  }
}

// スクリプトとして実行された場合
if (require.main === module) {
  main().catch(error => {
    console.log(JSON.stringify({
      error: true,
      message: error.message
    }));
    process.exit(1);
  });
}

module.exports = ClaudePackageUpdateManager;