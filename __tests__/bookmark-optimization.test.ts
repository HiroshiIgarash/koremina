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

  it('getRandomUnseenBookmarks関数が適切に実装されている', () => {
    const fs = require('fs');
    const path = require('path');
    
    const actionPath = path.join(process.cwd(), 'app/action/getRandomUnseenBookmarks.ts');
    const actionContent = fs.readFileSync(actionPath, 'utf8');
    
    // SQLクエリが最適化されているかチェック
    expect(actionContent).toContain('$queryRaw');
    expect(actionContent).toContain('_seenVideos');
    expect(actionContent).toContain('NOT EXISTS');
    
    // ランダムシード機能があるかチェック
    expect(actionContent).toContain('setseed');
    expect(actionContent).toContain('random()');
    
    // 日本語コメントがあるかチェック
    expect(actionContent).toContain('未視聴ブックマークをランダムに取得する最適化された関数');
  });
});