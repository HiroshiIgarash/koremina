#!/usr/bin/env node

/**
 * パッケージアップデート自動化スクリプト
 * 
 * 機能:
 * 1. npm-check-updates を使用してアップデート可能なパッケージを検出
 * 2. 各パッケージのchangelogリンクを収集
 * 3. アップデート情報の要約を生成
 * 4. 注意点や補足があれば追記
 * 
 * 使用方法:
 * node scripts/package-update.js [options]
 * 
 * オプション:
 * --check     : アップデート可能なパッケージの確認のみ（デフォルト）
 * --update    : 実際にパッケージをアップデート
 * --report    : レポートファイルを生成
 * --interactive : インタラクティブモード
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class PackageUpdateManager {
  constructor() {
    this.packageUpdates = [];
    this.reportFile = 'package-update-report.md';
  }

  /**
   * メイン実行関数
   */
  async run() {
    const args = process.argv.slice(2);
    const isUpdateMode = args.includes('--update');
    const isReportMode = args.includes('--report');
    const isInteractiveMode = args.includes('--interactive');

    console.log('🔍 パッケージアップデートチェックを開始します...\n');

    try {
      // 1. アップデート可能なパッケージを取得
      await this.checkUpdates();

      if (this.packageUpdates.length === 0) {
        console.log('✅ すべてのパッケージが最新版です！');
        return;
      }

      // 2. 各パッケージの詳細情報を取得
      await this.gatherPackageInfo();

      // 3. レポート生成
      if (isReportMode) {
        await this.generateReport();
      }

      // 4. レポート表示
      await this.displayReport();

      // 5. インタラクティブモード
      if (isInteractiveMode) {
        await this.interactiveUpdate();
      } else if (isUpdateMode) {
        await this.updatePackages();
      } else {
        console.log('\n💡 パッケージをアップデートするには --update フラグを使用してください');
        console.log('💡 インタラクティブモードを使用するには --interactive フラグを使用してください');
      }

    } catch (error) {
      console.error('❌ エラーが発生しました:', error.message);
      process.exit(1);
    }
  }

  /**
   * npm-check-updates を使用してアップデート可能なパッケージを取得
   */
  async checkUpdates() {
    try {
      const output = execSync('npx npm-check-updates --jsonUpgraded', { 
        encoding: 'utf8',
        cwd: process.cwd()
      });
      
      const updates = JSON.parse(output || '{}');
      
      for (const [packageName, version] of Object.entries(updates)) {
        this.packageUpdates.push({
          name: packageName,
          currentVersion: this.getCurrentVersion(packageName),
          newVersion: version,
          changelog: null,
          releaseNotes: null,
          breaking: false,
          cautions: []
        });
      }

      console.log(`📦 ${this.packageUpdates.length}個のパッケージがアップデート可能です\n`);
      
    } catch (error) {
      throw new Error(`パッケージ更新チェックに失敗しました: ${error.message}`);
    }
  }

  /**
   * 現在のパッケージバージョンを取得
   */
  getCurrentVersion(packageName) {
    try {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      return packageJson.dependencies?.[packageName] || 
             packageJson.devDependencies?.[packageName] || 
             'unknown';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * 各パッケージの詳細情報を収集
   */
  async gatherPackageInfo() {
    console.log('📋 パッケージ情報を収集中...\n');

    for (const packageUpdate of this.packageUpdates) {
      try {
        // npm view でパッケージ情報を取得
        const npmInfo = await this.getNpmInfo(packageUpdate.name);
        
        // changelogリンクを推測
        packageUpdate.changelog = this.guessChangelogUrl(packageUpdate.name, npmInfo);
        
        // 既知の注意点をチェック
        packageUpdate.cautions = this.getKnownCautions(packageUpdate.name, packageUpdate.newVersion);
        
        // Breaking change の可能性をチェック
        packageUpdate.breaking = this.checkBreakingChange(packageUpdate.currentVersion, packageUpdate.newVersion);
        
        console.log(`✅ ${packageUpdate.name}: 情報収集完了`);
        
      } catch (error) {
        console.log(`⚠️  ${packageUpdate.name}: 情報収集に失敗 (${error.message})`);
      }
    }
    console.log('');
  }

  /**
   * npm view でパッケージ情報を取得
   */
  async getNpmInfo(packageName) {
    return new Promise((resolve, reject) => {
      exec(`npm view ${packageName} --json`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        
        try {
          resolve(JSON.parse(stdout));
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }

  /**
   * changelogのURLを推測
   */
  guessChangelogUrl(packageName, npmInfo) {
    // 一般的なchangelogのパターン
    const patterns = [
      `https://github.com/${this.extractGithubRepo(npmInfo)}`,
      `https://github.com/${this.extractGithubRepo(npmInfo)}/releases`,
      `https://github.com/${this.extractGithubRepo(npmInfo)}/blob/main/CHANGELOG.md`,
      `https://github.com/${this.extractGithubRepo(npmInfo)}/blob/main/HISTORY.md`,
      `https://www.npmjs.com/package/${packageName}?activeTab=versions`
    ];

    // 既知のパッケージの直接リンク
    const knownLinks = {
      'next': 'https://github.com/vercel/next.js/releases',
      'react': 'https://github.com/facebook/react/blob/main/CHANGELOG.md',
      'prisma': 'https://github.com/prisma/prisma/releases',
      '@prisma/client': 'https://github.com/prisma/prisma/releases',
      'zod': 'https://github.com/colinhacks/zod/releases',
      'axios': 'https://github.com/axios/axios/blob/main/CHANGELOG.md',
      'dayjs': 'https://github.com/iamkun/dayjs/releases',
      'typescript': 'https://github.com/microsoft/TypeScript/wiki/Roadmap',
      'eslint': 'https://eslint.org/blog/',
      'jest': 'https://github.com/jestjs/jest/blob/main/CHANGELOG.md'
    };

    if (knownLinks[packageName]) {
      return knownLinks[packageName];
    }

    // GitHubリポジトリが見つかった場合
    const githubRepo = this.extractGithubRepo(npmInfo);
    if (githubRepo) {
      return `https://github.com/${githubRepo}/releases`;
    }

    return `https://www.npmjs.com/package/${packageName}?activeTab=versions`;
  }

  /**
   * npm情報からGitHubリポジトリを抽出
   */
  extractGithubRepo(npmInfo) {
    if (!npmInfo) return null;

    // repository フィールドから抽出
    if (npmInfo.repository && npmInfo.repository.url) {
      const match = npmInfo.repository.url.match(/github\.com[\/:](.+?)(?:\.git)?$/);
      if (match) return match[1];
    }

    // homepage から抽出
    if (npmInfo.homepage) {
      const match = npmInfo.homepage.match(/github\.com\/(.+?)(?:\/|$)/);
      if (match) return match[1];
    }

    return null;
  }

  /**
   * 既知の注意点をチェック
   */
  getKnownCautions(packageName, newVersion) {
    const cautions = [];

    // パッケージ固有の注意点
    const knownCautions = {
      'next': [
        'Next.js のメジャー/マイナーアップデートは Breaking Changes を含む可能性があります',
        'アップデート後は `npm run build` でビルドエラーがないか確認してください'
      ],
      '@types/node': [
        'Node.js の型定義のメジャーアップデートは互換性に注意が必要です',
        '使用している Node.js のバージョンとの互換性を確認してください'
      ],
      'prisma': [
        'Prisma のアップデート後は `npx prisma generate` の実行が必要です',
        'データベーススキーマに影響する場合があります'
      ],
      '@prisma/client': [
        'Prisma Client のアップデート後は `npx prisma generate` の実行が必要です'
      ],
      'nodemailer': [
        'メジャーアップデートは API の変更を含む可能性があります',
        'メール送信機能のテストを実施してください'
      ],
      'eslint': [
        'ESLint のメジャーアップデートは新しいルールや設定変更を含む可能性があります'
      ],
      'typescript': [
        'TypeScript のメジャー/マイナーアップデートは型チェックが厳しくなる可能性があります'
      ]
    };

    if (knownCautions[packageName]) {
      cautions.push(...knownCautions[packageName]);
    }

    return cautions;
  }

  /**
   * Breaking Change の可能性をチェック
   */
  checkBreakingChange(currentVersion, newVersion) {
    try {
      const current = this.parseVersion(currentVersion);
      const target = this.parseVersion(newVersion);

      // メジャーバージョンが変わった場合
      if (current.major !== target.major) {
        return true;
      }

      // Beta版やプレリリース版の場合
      if (newVersion.includes('beta') || newVersion.includes('alpha') || newVersion.includes('rc')) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * バージョン文字列をパース
   */
  parseVersion(versionString) {
    const cleaned = versionString.replace(/[\^~]/, '');
    const parts = cleaned.split('.');
    return {
      major: parseInt(parts[0]) || 0,
      minor: parseInt(parts[1]) || 0,
      patch: parseInt(parts[2]) || 0
    };
  }

  /**
   * レポートを表示
   */
  async displayReport() {
    console.log('📊 パッケージアップデートレポート\n');
    console.log('=' .repeat(80));

    for (const pkg of this.packageUpdates) {
      console.log(`\n📦 ${pkg.name}`);
      console.log(`   現在: ${pkg.currentVersion}`);
      console.log(`   更新: ${pkg.newVersion}`);
      
      if (pkg.breaking) {
        console.log(`   ⚠️  Breaking Changes の可能性があります`);
      }

      if (pkg.changelog) {
        console.log(`   📋 Changelog: ${pkg.changelog}`);
      }

      if (pkg.cautions.length > 0) {
        console.log(`   💡 注意点:`);
        pkg.cautions.forEach(caution => {
          console.log(`      - ${caution}`);
        });
      }
    }

    console.log('\n' + '=' .repeat(80));
  }

  /**
   * Markdownレポートを生成
   */
  async generateReport() {
    const reportContent = this.generateMarkdownReport();
    fs.writeFileSync(this.reportFile, reportContent);
    console.log(`📄 レポートファイルを生成しました: ${this.reportFile}\n`);
  }

  /**
   * Markdownレポートの内容を生成
   */
  generateMarkdownReport() {
    const date = new Date().toISOString().split('T')[0];
    
    let content = `# パッケージアップデートレポート\n\n`;
    content += `生成日: ${date}\n\n`;
    content += `## 概要\n\n`;
    content += `アップデート可能なパッケージ: ${this.packageUpdates.length}個\n\n`;

    if (this.packageUpdates.some(pkg => pkg.breaking)) {
      content += `⚠️ **Breaking Changes の可能性があるパッケージが含まれています**\n\n`;
    }

    content += `## パッケージ詳細\n\n`;

    for (const pkg of this.packageUpdates) {
      content += `### ${pkg.name}\n\n`;
      content += `- **現在のバージョン**: ${pkg.currentVersion}\n`;
      content += `- **新しいバージョン**: ${pkg.newVersion}\n`;
      
      if (pkg.breaking) {
        content += `- **⚠️ Breaking Changes**: 可能性あり\n`;
      }

      if (pkg.changelog) {
        content += `- **Changelog**: [リンク](${pkg.changelog})\n`;
      }

      if (pkg.cautions.length > 0) {
        content += `- **注意点**:\n`;
        pkg.cautions.forEach(caution => {
          content += `  - ${caution}\n`;
        });
      }

      content += `\n`;
    }

    content += `## 推奨アクション\n\n`;
    content += `1. 各パッケージのChangelogを確認\n`;
    content += `2. Breaking Changesがある場合は影響範囲を調査\n`;
    content += `3. テスト環境でアップデートを実施\n`;
    content += `4. アプリケーションのテストを実行\n`;
    content += `5. 問題がなければ本番環境にデプロイ\n\n`;

    content += `## コマンド\n\n`;
    content += `\`\`\`bash\n`;
    content += `# パッケージを一括アップデート\n`;
    content += `npm run ncu:upgrade\n\n`;
    content += `# インタラクティブアップデート\n`;
    content += `npm run ncu:i\n`;
    content += `\`\`\`\n`;

    return content;
  }

  /**
   * インタラクティブアップデート
   */
  async interactiveUpdate() {
    console.log('\n🎯 インタラクティブアップデートを開始します...\n');
    
    try {
      execSync('npx npm-check-updates -i', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      
      console.log('\n✅ インタラクティブアップデートが完了しました');
      console.log('💡 アップデート後は `npm install` の実行をお忘れなく！');
      
    } catch (error) {
      console.error('❌ インタラクティブアップデートに失敗しました:', error.message);
    }
  }

  /**
   * 全パッケージをアップデート
   */
  async updatePackages() {
    console.log('\n🚀 パッケージアップデートを実行します...\n');
    
    try {
      execSync('npx npm-check-updates -u && npm install', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      
      console.log('\n✅ パッケージアップデートが完了しました！');
      console.log('🔧 必要に応じて以下のコマンドを実行してください:');
      console.log('   - Prisma: npx prisma generate');
      console.log('   - ビルドテスト: npm run build');
      console.log('   - テスト実行: npm run test');
      
    } catch (error) {
      console.error('❌ パッケージアップデートに失敗しました:', error.message);
    }
  }
}

// スクリプトとして実行された場合
if (require.main === module) {
  const manager = new PackageUpdateManager();
  manager.run().catch(error => {
    console.error('❌ 実行エラー:', error);
    process.exit(1);
  });
}

module.exports = PackageUpdateManager;