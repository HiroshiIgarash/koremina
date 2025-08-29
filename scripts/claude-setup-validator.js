#!/usr/bin/env node

/**
 * Claude カスタムスラッシュコマンド セットアップ検証スクリプト
 * 
 * Claude code でカスタムスラッシュコマンドが正しく設定されているかを確認
 */

const fs = require('fs');
const path = require('path');

class ClaudeSetupValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  /**
   * セットアップの検証を実行
   */
  async validate() {
    console.log('🔍 Claude カスタムスラッシュコマンドのセットアップを検証中...\n');

    this.checkDirectoryStructure();
    this.checkConfigFiles();
    this.checkPackageJson();
    this.checkScripts();
    await this.testCommands();

    this.printResults();
  }

  /**
   * ディレクトリ構造の確認
   */
  checkDirectoryStructure() {
    const requiredFiles = [
      '.claude',
      '.claude/README.md',
      '.claude/config.json',
      '.claude/commands.json',
      '.claude/manifest.json',
      '.claude/commands',
      '.claude/commands/package-check.json',
      '.claude/commands/package-details.json',
      '.claude/commands/package-update-interactive.json',
      '.claude/commands/package-report.json',
      '.claude/commands/package-update-all.json'
    ];

    requiredFiles.forEach(file => {
      const fullPath = path.join(process.cwd(), file);
      if (fs.existsSync(fullPath)) {
        this.success.push(`✅ ${file} が存在します`);
      } else {
        this.errors.push(`❌ ${file} が見つかりません`);
      }
    });
  }

  /**
   * 設定ファイルの内容確認
   */
  checkConfigFiles() {
    try {
      // commands.json の確認
      const commandsPath = path.join(process.cwd(), '.claude/commands.json');
      if (fs.existsSync(commandsPath)) {
        const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
        if (commands.commands && Array.isArray(commands.commands)) {
          this.success.push(`✅ commands.json: ${commands.commands.length}個のコマンドが定義されています`);
        } else {
          this.errors.push('❌ commands.json: コマンド定義が正しくありません');
        }
      }

      // config.json の確認
      const configPath = path.join(process.cwd(), '.claude/config.json');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (config.name && config.workspace) {
          this.success.push('✅ config.json: ワークスペース設定が正しく設定されています');
        } else {
          this.warnings.push('⚠️ config.json: 設定が不完全な可能性があります');
        }
      }

    } catch (error) {
      this.errors.push(`❌ 設定ファイルの解析エラー: ${error.message}`);
    }
  }

  /**
   * package.json のスクリプト確認
   */
  checkPackageJson() {
    try {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      const requiredScripts = [
        'package-update:claude',
        'package-update:check',
        'package-update:interactive',
        'package-update:json',
        'package-update:update'
      ];

      requiredScripts.forEach(script => {
        if (packageJson.scripts && packageJson.scripts[script]) {
          this.success.push(`✅ npm script: ${script} が定義されています`);
        } else {
          this.errors.push(`❌ npm script: ${script} が見つかりません`);
        }
      });

    } catch (error) {
      this.errors.push(`❌ package.json の読み取りエラー: ${error.message}`);
    }
  }

  /**
   * スクリプトファイルの確認
   */
  checkScripts() {
    const requiredScripts = [
      'scripts/package-update.js',
      'scripts/claude-package-update.js'
    ];

    requiredScripts.forEach(script => {
      const fullPath = path.join(process.cwd(), script);
      if (fs.existsSync(fullPath)) {
        this.success.push(`✅ スクリプト: ${script} が存在します`);
      } else {
        this.errors.push(`❌ スクリプト: ${script} が見つかりません`);
      }
    });
  }

  /**
   * コマンドの動作テスト
   */
  async testCommands() {
    console.log('\n🧪 コマンドの動作テストを実行中...');
    
    try {
      // package-update:claude コマンドのテスト
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      const result = await execAsync('npm run package-update:claude', { 
        timeout: 30000,
        cwd: process.cwd()
      });

      if (result.stdout.includes('"hasUpdates"')) {
        this.success.push('✅ package-update:claude コマンドが正常に動作します');
      } else {
        this.warnings.push('⚠️ package-update:claude の出力形式を確認してください');
      }

    } catch (error) {
      this.errors.push(`❌ コマンドテストエラー: ${error.message}`);
    }
  }

  /**
   * 結果の表示
   */
  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Claude カスタムスラッシュコマンド セットアップ検証結果');
    console.log('='.repeat(60));

    if (this.success.length > 0) {
      console.log('\n✅ 成功:');
      this.success.forEach(msg => console.log(`  ${msg}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️ 警告:');
      this.warnings.forEach(msg => console.log(`  ${msg}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ エラー:');
      this.errors.forEach(msg => console.log(`  ${msg}`));
    }

    console.log('\n' + '='.repeat(60));

    if (this.errors.length === 0) {
      console.log('🎉 セットアップが完了しました！');
      console.log('\n📋 Claude code で以下のコマンドが利用可能です:');
      console.log('  /package-check - パッケージアップデートの確認');
      console.log('  /package-details [name] - 特定パッケージの詳細');
      console.log('  /package-update-interactive - 安全な対話的アップデート');
      console.log('  /package-report - 詳細レポートの生成');
      console.log('  /package-update-all - 全パッケージの自動更新 (⚠️危険)');
      console.log('\n🔗 詳細は .claude/README.md を参照してください');
    } else {
      console.log('❌ セットアップに問題があります。上記のエラーを修正してください。');
      process.exit(1);
    }
  }
}

// スクリプトとして実行された場合
if (require.main === module) {
  const validator = new ClaudeSetupValidator();
  validator.validate().catch(error => {
    console.error('❌ 検証中にエラーが発生しました:', error.message);
    process.exit(1);
  });
}

module.exports = ClaudeSetupValidator;