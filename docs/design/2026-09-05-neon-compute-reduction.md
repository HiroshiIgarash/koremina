# Neon compute 使用量の削減

作成日: 2026-09-05
ステータス: 設計完了・実装未着手
ブランチ: `fix/reduce-db-compute`

## 背景

毎月末に Neon から compute quota 超過の通知が届き、月末には本番データベースへ接続できなくなる。2026-08-29 の作業中にも実際に発生し、`/liver_register` の全ライバーが「DB 未登録」と誤表示された（`getLivers` が接続エラーを握り潰して空配列を返すため）。

9 月に入って quota はリセットされたが、原因は解消していないため今月末に再発する。

## 根本原因

Neon の compute hours はクエリ数ではなく **データベースが起きていた時間** で課金される。最終接続から一定時間（既定 5 分）アイドルが続くと自動停止し、そこで課金が止まる。

このアプリは `use cache` を導入済みだが、キャッシュの再検証間隔が自動停止までの時間より短い。

```
DB 稼働率 = min(1, 自動停止までの時間 ÷ 再検証間隔)
```

Next.js 16.2.12 のプリセット値（`node_modules/next/dist/server/config-shared.js:136-170` で確認）:

| プロファイル | stale | revalidate | expire | 自動停止 5 分での稼働率 |
| ------------ | ----- | ---------- | ------ | ----------------------- |
| `seconds`    | 30s   | 1s         | 60s    | 100%                    |
| `minutes`    | 5m    | 60s        | 1h     | 100%                    |
| `hours`      | 5m    | 1h         | 24h    | 8.3%                    |
| `days`       | 5m    | 24h        | 7d     | 0.35%                   |
| `max`        | 5m    | 30d        | 365d   | ほぼ 0%                 |

Neon Free の枠は月 191.9 compute hours（1 日あたり約 6.4 時間）。稼働率が 100% に張り付く場合、アクセスが 1 日 7 時間続くだけで枠を使い切る計算になり、月末に到達するという症状と一致する。

## 現状のコード

### 稼働率 100% を発生させている箇所

`cacheLife("seconds")` — 再検証 1 秒

- `app/action/getReactionsByPostId.ts:7`
- `app/action/getCommentsByPostId.ts:7`
- `app/(pages)/notification/page.tsx:14`
- `components/NotificationField.tsx:10`

`cacheLife("minutes")` — 再検証 60 秒

- `app/action/getPosts.ts:13`
- `app/action/getUserPosts.ts:13`
- `app/action/getTotalPosts.ts:11`

### `use cache` が付いていない読み取り

呼ばれるたびにデータベースへ接続する。

- `app/action/getCurrentUser.ts`（参照 20 ファイル）
- `app/action/getBookmarkInfoByPostId.ts`
- `app/action/getBookmarksById.ts`
- `app/action/getTotalBookmarksById.ts`
- `app/action/getRecentPostsByUserId.ts`
- `app/action/getTotalUserPosts.ts`

### 影響の小さい箇所（対応済みと見なせる）

`hours` / `max` を指定済み。

- `app/action/getLivers.ts:8`
- `app/action/getUserById.ts:7`
- `app/action/getBirthdayLivers.ts:46`
- `app/action/getPostById.ts:8`
- `components/feature/post/PickUpList.tsx:11`

## 前提: 投稿の即時反映が現状すでに壊れている

`app/api/post/route.ts:60` は `revalidateTag("get-post", "minutes")` を呼んでいる。Next.js 16 のドキュメント（`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidateTag.md`）によれば、第 2 引数を付けた `revalidateTag` は stale-while-revalidate になる。

> With `profile`: The tag entry is marked as stale, ... the stale content is served while fresh content is fetched in the background.

つまり投稿者が投稿直後にトップページを見ても、自分の投稿が含まれない一覧が返る可能性が現時点で既にある。

`cacheLife` を伸ばすとこの遅延がさらに長くなるため、**投稿時の無効化を即時型に変えることが `cacheLife` 延長の前提条件** になる。

### 使える手段

- `updateTag` は **Server Action 専用**。Route Handler では使えない（ドキュメントに明記）。read-your-own-writes を保証する唯一の正規手段。
- `revalidateTag(tag)`（第 2 引数なし）は即時失効するが deprecated。TypeScript エラーを抑制すれば動くが、将来削除される可能性がある。

## 決定事項

ユーザーとの合意内容:

1. 投稿の即時反映は **投稿処理を Server Action 化して `updateTag` を使う**
2. 適用範囲は **投稿まわりから段階的に**（一括ではなく Phase 分割）

許容できる鮮度:

- 投稿者本人が自分の投稿を見る場合 → 即時反映が必須
- 投稿者以外が投稿一覧を見る場合 → 数分の遅れは許容できる

## Phase 1 の設計（投稿まわり）

### 影響範囲

`/api/post` の呼び出し元は 2 ファイルのみ。

- `components/feature/post/PostForm.tsx:98`（新規投稿）
- `components/feature/post/PostEditForm.tsx:104`（編集）

### 新規作成

`app/action/createPost.ts`

- `"use server"`
- 認証 → zod による検証 → `prisma.video.create`
- `updateTag("get-post")`
- メール通知は現状どおり await せずに送信

`app/action/updatePost.ts`

- 同様の構成
- `updateTag("get-post")` と `updateTag(\`get-post-by-id:${id}\`)`

### 変更

- `components/feature/post/PostForm.tsx` — `fetch("/api/post")` を Server Action 呼び出しへ
- `components/feature/post/PostEditForm.tsx` — 同上
- `app/action/getPosts.ts:13` — `cacheLife("minutes")` → `cacheLife("days")`
- `app/action/getTotalPosts.ts:11` — 同上
- `app/action/getUserPosts.ts:13` — 同上
- `revalidateTag("get-post", "minutes")` を呼んでいる Server Action を `updateTag("get-post")` へ統一
  - `app/action/updateBookmark.ts:41`
  - `app/action/updateSeenUsers.ts:48`
  - `app/action/deletePost.ts:27`
  - `app/action/updateAvatar.ts:26`

### 削除

`app/api/post/route.ts` — 呼び出し元がなくなるため

### 副産物

現在の Route Handler は `body: Record<string, unknown>` を手作業の条件式 10 個で検証している（`app/api/post/route.ts:28-41`）。Server Action にすると引数に型が付き、zod スキーマを `PostForm` と共有できる。`NextResponse` の組み立てとクライアント側の `fetch` / JSON パースも不要になるため、行数はむしろ減る見込み。

### 検証方法

- `pnpm test` — `components/feature/post/postForm.test.tsx` が回帰の網になる
  - ベースライン: 39 tests passed、1 suite 失敗（typedSql 未生成による既存の失敗）
- ローカル docker DB で「投稿 → トップページに戻る → 自分の投稿が見える」を手動確認
- `npx prettier --write` は変更ファイルのみに適用する（リポジトリ全体の `pnpm format` は禁止）

### リスク

`cacheLife("days")` にすると、タグ無効化を経由しない変更（データベースの直接編集など）が最大 1 日反映されない。実装時にタグを踏まない更新経路がないか洗い出す必要がある。

## Phase 2 以降（未着手）

- `cacheLife("seconds")` の 4 箇所をリアクション・コメント・通知の書き込みパスと突き合わせて延長
- `use cache` が付いていない読み取り 6 ファイルにタグ付きキャッシュを追加
  - `getCurrentUser` は既にキャッシュ版の `getCurrentUserWithTag` があるため、読み取り用途はそちらへ置換する
- Neon 使用量の日次監視（GitHub Actions から Neon API を叩き、80% 到達で通知）

## 未確定の情報

以下は Neon Console でしか確認できず、今回は取得できていない。

- 使用量の内訳（本番 `verceldb` と preview `neondb` のどちらが消費しているか）
- 自動停止までの時間の設定値（本設計は既定の 5 分を前提としている）

参考情報:

- Vercel の integration リソースは Neon の `koremina-dev` 1 件のみ（preview / development 用）
- 本番の `DATABASE_URL` は integration 経由ではなく手動設定の Config（245 日前に設定）
- preview 用の `neondb` は接続可能で、`Liver` テーブルに 10 件

autosuspend の実測（preview `neondb`、`docker exec` 経由）:

- ウォーム接続: 1.45s → 0.66s → 0.66s
- 6 分アイドル後: 1.64s
- その直後の再接続: 0.80s

差は約 1 秒。suspend していた可能性を示すが、`docker exec` のオーバーヘッドも混ざるため断定できるデータではない。

## 補足: 調査時の注意点

`/liver_register` の赤表示（`bg-red-100`）を `curl` の生 HTML で数えると、SSR HTML と RSC ペイロードの両方に className 文字列が現れて倍にカウントされる。`<script>` タグを除去してから数える必要がある。
