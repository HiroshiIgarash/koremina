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
 * --json      : JSON形式で出力（Claude code統合用）
 * --format    : 出力形式（console|json|markdown）
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class PackageUpdateManager {
  constructor() {
    this.packageUpdates = [];
    this.reportFile = 'package-update-report.md';
    this.outputFormat = 'console'; // console, json, markdown
  }

  /**
   * メイン実行関数
   */
  async run() {
    const args = process.argv.slice(2);
    const isUpdateMode = args.includes('--update');
    const isReportMode = args.includes('--report');
    const isInteractiveMode = args.includes('--interactive');
    const isJsonMode = args.includes('--json');
    
    // 出力形式を設定
    if (isJsonMode) {
      this.outputFormat = 'json';
    } else if (args.includes('--format')) {
      const formatIndex = args.indexOf('--format');
      if (formatIndex !== -1 && args[formatIndex + 1]) {
        this.outputFormat = args[formatIndex + 1];
      }
    }

    if (this.outputFormat !== 'json') {
      console.log('🔍 パッケージアップデートチェックを開始します...\n');
    }

    try {
      // 1. アップデート可能なパッケージを取得
      await this.checkUpdates();

      if (this.packageUpdates.length === 0) {
        if (this.outputFormat === 'json') {
          console.log(JSON.stringify({
            status: 'success',
            message: 'すべてのパッケージが最新版です',
            packages: [],
            summary: {
              total: 0,
              breaking: 0,
              withCautions: 0
            }
          }, null, 2));
        } else {
          console.log('✅ すべてのパッケージが最新版です！');
        }
        return;
      }

      // 2. 各パッケージの詳細情報を取得
      await this.gatherPackageInfo();

      // 3. 出力形式に応じて結果を表示
      if (this.outputFormat === 'json') {
        await this.outputJson();
      } else {
        // 3. レポート生成
        if (isReportMode) {
          await this.generateReport();
        }

        // 4. レポート表示
        await this.displayReport();
      }

      // 5. インタラクティブモード（JSONモードでは無効）
      if (!isJsonMode) {
        if (isInteractiveMode) {
          await this.interactiveUpdate();
        } else if (isUpdateMode) {
          await this.updatePackages();
        } else {
          console.log('\n💡 パッケージをアップデートするには --update フラグを使用してください');
          console.log('💡 インタラクティブモードを使用するには --interactive フラグを使用してください');
          console.log('💡 Claude code統合用にはJSONモード --json を使用してください');
        }
      }

    } catch (error) {
      if (this.outputFormat === 'json') {
        console.log(JSON.stringify({
          status: 'error',
          message: error.message,
          packages: []
        }, null, 2));
      } else {
        console.error('❌ エラーが発生しました:', error.message);
      }
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

      if (this.outputFormat !== 'json') {
        console.log(`📦 ${this.packageUpdates.length}個のパッケージがアップデート可能です\n`);
      }
      
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
    if (this.outputFormat !== 'json') {
      console.log('📋 パッケージ情報を収集中...\n');
    }

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
        
        if (this.outputFormat !== 'json') {
          console.log(`✅ ${packageUpdate.name}: 情報収集完了`);
        }
        
      } catch (error) {
        if (this.outputFormat !== 'json') {
          console.log(`⚠️  ${packageUpdate.name}: 情報収集に失敗 (${error.message})`);
        }
      }
    }
    if (this.outputFormat !== 'json') {
      console.log('');
    }
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
   * JSON形式で出力（Claude code統合用）
   */
  async outputJson() {
    const summary = {
      total: this.packageUpdates.length,
      breaking: this.packageUpdates.filter(pkg => pkg.breaking).length,
      withCautions: this.packageUpdates.filter(pkg => pkg.cautions.length > 0).length
    };

    const output = {
      status: 'success',
      message: `${this.packageUpdates.length}個のパッケージがアップデート可能です`,
      timestamp: new Date().toISOString(),
      summary: summary,
      packages: this.packageUpdates.map(pkg => ({
        name: pkg.name,
        currentVersion: pkg.currentVersion,
        newVersion: pkg.newVersion,
        changelog: pkg.changelog,
        breaking: pkg.breaking,
        cautions: pkg.cautions,
        updateCommand: this.getUpdateCommand(pkg.name),
        priority: this.getUpdatePriority(pkg)
      })),
      recommendations: this.generateRecommendations(),
      commands: {
        check: 'npm run package-update:check',
        interactive: 'npm run package-update:interactive',
        update: 'npm run package-update:update',
        updateSingle: (packageName) => `npm install ${packageName}@latest`
      }
    };

    console.log(JSON.stringify(output, null, 2));
  }

  /**
   * パッケージのアップデートコマンドを取得
   */
  getUpdateCommand(packageName) {
    return `npm install ${packageName}@latest`;
  }

  /**
   * アップデート優先度を判定
   */
  getUpdatePriority(pkg) {
    if (pkg.breaking) {
      return 'high'; // Breaking changes があるので慎重に
    }
    if (pkg.cautions.length > 0) {
      return 'medium'; // 注意点があるので確認が必要
    }
    return 'low'; // 通常のアップデート
  }

  /**
   * 推奨アクションを生成
   */
  generateRecommendations() {
    const recommendations = [];
    
    const breakingPackages = this.packageUpdates.filter(pkg => pkg.breaking);
    if (breakingPackages.length > 0) {
      recommendations.push({
        type: 'warning',
        message: `${breakingPackages.length}個のパッケージでBreaking Changesの可能性があります`,
        packages: breakingPackages.map(pkg => pkg.name),
        action: '各パッケージのChangelogを確認してから段階的にアップデートしてください'
      });
    }

    const cautionPackages = this.packageUpdates.filter(pkg => pkg.cautions.length > 0);
    if (cautionPackages.length > 0) {
      recommendations.push({
        type: 'caution',
        message: `${cautionPackages.length}個のパッケージで注意が必要です`,
        packages: cautionPackages.map(pkg => pkg.name),
        action: '各パッケージの注意点を確認してください'
      });
    }

    const safePackages = this.packageUpdates.filter(pkg => !pkg.breaking && pkg.cautions.length === 0);
    if (safePackages.length > 0) {
      recommendations.push({
        type: 'safe',
        message: `${safePackages.length}個のパッケージは安全にアップデート可能です`,
        packages: safePackages.map(pkg => pkg.name),
        action: 'インタラクティブモードまたは個別にアップデートできます'
      });
    }

    return recommendations;
  }
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
   * レポートを表示
   */
  async generateReport() {
    const reportContent = this.generateMarkdownReport();
    fs.writeFileSync(this.reportFile, reportContent);
    console.log(`📄 レポートファイルを生成しました: ${this.reportFile}\n`);
  }

  /**
   * Markdownレポートを生成
   */
  async generateReport() {
    const reportContent = this.generateMarkdownReport();
    fs.writeFileSync(this.reportFile, reportContent);
    if (this.outputFormat !== 'json') {
      console.log(`📄 レポートファイルを生成しました: ${this.reportFile}\n`);
    }
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