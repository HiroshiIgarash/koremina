import { describe, it, expect } from '@jest/globals';

describe('未視聴ブックマークのランダム取得最適化', () => {
  it('TopBookMarkListコンポーネントが正しいインポートを使用している', () => {
    const fs = require('fs');
    const path = require('path');
    
    const componentPath = path.join(process.cwd(), 'components/feature/bookmark/TopBookMarkList.tsx');
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    // 最適化された関数をインポートしているかチェック
    expect(componentContent).toContain('getRandomUnseenBookmarks');
    
    // 古い非効率な関数を使用していないかチェック
    expect(componentContent).not.toContain('getBookmarksById');
    expect(componentContent).not.toContain('extractRandomElementsFromArray');
    
    // コメントで最適化について言及しているかチェック
    expect(componentContent).toContain('最適化された');
  });

  it('getRandomUnseenBookmarks関数でTyped SQLが適切に実装されている', () => {
    const fs = require('fs');
    const path = require('path');
    
    const actionPath = path.join(process.cwd(), 'app/action/getRandomUnseenBookmarks.ts');
    const actionContent = fs.readFileSync(actionPath, 'utf8');
    
    // Typed SQLのインポートがあるかチェック
    expect(actionContent).toContain('getRandomUnseenBookmarks as getRandomUnseenBookmarksSQL');
    expect(actionContent).toContain('@prisma/client/sql');
    
    // Typed SQLクエリ実行があるかチェック
    expect(actionContent).toContain('$queryRawTyped');
    
    // ランダムシード機能があるかチェック
    expect(actionContent).toContain('randomSeed');
    
    // 日本語コメントでTyped SQLについて言及しているかチェック
    expect(actionContent).toContain('Prisma Typed SQLを使用');
    expect(actionContent).toContain('タイプセーフなクエリを実行');
  });

  it('Typed SQL ファイルが存在し、適切なパラメータ定義がある', () => {
    const fs = require('fs');
    const path = require('path');
    
    const sqlPath = path.join(process.cwd(), 'prisma/sql/getRandomUnseenBookmarks.sql');
    expect(fs.existsSync(sqlPath)).toBe(true);
    
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // パラメータ定義があるかチェック
    expect(sqlContent).toContain('@param {String} $1:userId');
    expect(sqlContent).toContain('@param {Float} $2:seed');
    expect(sqlContent).toContain('@param {Int} $3:limit');
    
    // 最適化されたクエリ構造があるかチェック
    expect(sqlContent).toContain('NOT EXISTS');
    expect(sqlContent).toContain('setseed');
    expect(sqlContent).toContain('random()');
    expect(sqlContent).toContain('ORDER BY rand');
  });
});