# ユーザーページの「最近の投稿」改善実装

## 概要
Issue #13 に対応し、ユーザーページの「最近の投稿」セクションを改善しました。

## 実装内容

### 1. 最近の投稿の表示件数制限
- **変更箇所**: `components/feature/setting/RecentPostList.tsx`, `components/feature/user/RecentPostList.tsx`
- **内容**: 
  - 従来は全ての投稿を表示していたが、最新10件に制限
  - 11件取得して10件表示することで、「もっと見る」ボタンの表示可否を判定
  - 11件以上ある場合に`variant="ghost"`の「もっと見る」ボタンを表示

### 2. ユーザー投稿一覧ページの作成
- **新規追加**: `/user/[userId]/posts` ルート
- **ファイル**:
  - `app/(pages)/user/[userId]/posts/page.tsx` - メインページ
  - `app/action/getUserPosts.ts` - ユーザー投稿取得アクション
  - `app/action/getTotalUserPosts.ts` - ユーザー投稿総数取得アクション
  - `components/feature/user/UserPostList.tsx` - 投稿一覧表示コンポーネント
  - `components/feature/user/UserPostPagination.tsx` - ページネーションコンポーネント

### 3. ページネーションコンポーネントのリファクタリング
- **新規追加**: `components/ui/FlexiblePagination.tsx`
- **変更箇所**: 
  - `components/feature/post/PostPagination.tsx`
  - `components/feature/post/SearchPagination.tsx`
  - `components/feature/user/UserPostPagination.tsx`
- **改善内容**:
  - `generateHref`関数を受け取ることで、柔軟なURL生成を実現
  - コードの重複を削減（約70行 × 3ファイル = 210行以上のコード削減）
  - 1ページ以下の場合は自動で非表示になる機能を追加

## 技術的な詳細

### データベースクエリの最適化
```typescript
// 11件取得して10件表示、11件目の存在で「もっと見る」判定
const recentPosts = await getRecentPostsByUserId({ 
  userId: currentUser.id, 
  count: 11 
});
const displayPosts = recentPosts.slice(0, 10);
const hasMorePosts = recentPosts.length > 10;
```

### FlexiblePaginationの設計
```typescript
interface FlexiblePaginationProps {
  showPages?: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  generateHref: (page: number) => string; // 柔軟なURL生成
}
```

## UI/UX の改善

1. **設定ページとユーザーページ**: 最新10件の投稿のみ表示
2. **もっと見るボタン**: 11件以上の投稿がある場合のみ表示（ghost variant）
3. **投稿一覧ページ**: ページネーション付きで全投稿を閲覧可能
4. **ナビゲーション**: ユーザーページへ戻るボタンを配置

## 既存機能への影響

- **破壊的変更なし**: 既存のページネーション機能は引き続き動作
- **パフォーマンス向上**: 最近の投稿で表示する投稿数が削減されることでページ読み込み速度が向上
- **コードの保守性向上**: ページネーション関連のコードが共通化され、メンテナンスが容易に

## テスト

`__tests__/flexible-pagination.test.tsx` でFlexiblePaginationコンポーネントの主要機能をテスト:
- ページネーションの基本表示
- 1ページ以下の場合の非表示機能
- 最初/最後のページでのボタン制御
- generateHref関数の呼び出し確認

## 今後の拡張性

FlexiblePaginationコンポーネントの導入により、今後新しいページネーション機能を追加する際の開発効率が向上します。