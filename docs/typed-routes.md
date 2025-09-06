# Typed Routes 実装ガイド

## 概要

Next.js 15.5の typed routes 機能を有効化しました。これにより、ルートパスとナビゲーションが型安全になります。

## 設定

### next.config.mjs
```javascript
const nextConfig = {
  typedRoutes: true,
  // ...
};
```

### 自動生成される型定義

Next.jsが以下の型定義ファイルを自動生成します：

- `.next/types/routes.d.ts` - ルート定義とパラメータ型
- `.next/types/link.d.ts` - Link コンポーネントの型定義

## 使用方法

### Link コンポーネント

```tsx
import Link from "next/link";

// 型安全なリンク
<Link href="/about">About</Link>
<Link href="/post/123">Post Detail</Link>
<Link href="/user/456/posts">User Posts</Link>

// クエリパラメータ付き
<Link href="/search?q=test">Search</Link>
```

### useRouter フック

```tsx
import { useRouter } from "next/navigation";
import { Route } from "next";

const router = useRouter();

// 型安全なナビゲーション
router.push("/" as Route);
router.push("/post/123" as Route);
router.push("/search?q=test" as Route);
```

### 動的ルート対応

動的ルートのパラメータは自動的に型推論されます：

```tsx
// /post/[postId]/page.tsx
export default function Page(props: PageProps<'/post/[postId]'>) {
  const { postId } = await props.params; // postId は string 型
  return <div>Post ID: {postId}</div>;
}
```

## 実装済みコンポーネント

以下のコンポーネントでtyped routesを実装済み：

### ページネーション
- `FlexiblePagination` - 基本ページネーションコンポーネント
- `PostPagination` - 投稿一覧のページネーション
- `SearchPagination` - 検索結果のページネーション
- `UserPostPagination` - ユーザー投稿のページネーション

### ナビゲーション
- `PostForm` - 投稿作成後のリダイレクト
- `PostEditForm` - 投稿編集後のリダイレクト
- `PostDeleteDialog` - 投稿削除後のリダイレクト
- `PostFilter` - ライバーフィルターのナビゲーション
- `SearchForm` - 検索フォームのナビゲーション

## 利点

1. **型安全性**: 存在しないルートへのナビゲーションをコンパイル時に検出
2. **自動補完**: IDEでルートパスの自動補完が利用可能
3. **リファクタリング**: ルートの変更時に影響箇所を自動検出
4. **ドキュメント性**: 利用可能なルートが型定義から明確

## 注意事項

- 新しいルートを追加した場合、開発サーバーの再起動が必要な場合があります
- 動的ルートは `as Route` でキャストが必要です
- 外部URLには typed routes は適用されません

## 次のステップ

- [ ] 残りのLink コンポーネントの typed routes 対応
- [ ] redirect 関数の typed routes 対応
- [ ] Form コンポーネントの action プロパティ対応