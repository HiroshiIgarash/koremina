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

## 確定した情報（2026-09-05 Neon Console で確認）

Neon 組織は `Vercel: hiroshi-igarashi's projects`（Free プラン、サブスクリプションは Vercel 側で管理）。プロジェクトは 2 件。

| プロジェクト | 用途 | プロジェクト ID | エンドポイント | compute size | PG | 使用量（9/1〜9/5） |
| --- | --- | --- | --- | --- | --- | --- |
| `koremina-postgres` | 本番 `verceldb` | `icy-lab-42671584` | `ep-odd-shape-a1zf454d` | 0.25 CU 固定 | 16 | **13.23 / 100 CU-hrs** |
| `koremina-dev` | preview `neondb` | `hidden-frost-24123114` | `ep-mute-bread-a1g4icru` | 1 ↔ 2 CU | 17 | 0.28 / 100 CU-hrs |

### 使用量の内訳

消費のほぼ全量（98%）が本番の `koremina-postgres`。preview 側は無視できる。ただし preview は compute size が 1〜2 CU と本番の 4〜8 倍あるため、長時間稼働させた場合の単価は高い。

### 自動停止までの時間

本番エンドポイントの Monitoring に **`Autosuspend delay: 5 minutes (default)`** と明示されている。設計の前提は正しい。

Free プランでは compute の編集ダイアログに「Scales to zero after 5 minutes of inactivity. Upgrade your plan to configure this setting.」と表示され、**この値は変更できない**。したがって稼働時間の削減はアプリケーション側で行うしかない。

### 実測の稼働率

- 経過時間: 9/1 00:00 〜 9/5 13:47 ≒ 110 時間
- 消費: 13.23 CU-hrs ÷ 0.25 CU = **約 53 稼働時間**
- 稼働率 **約 48%**

当初の想定（稼働率 100%）ではなく約半分だが、それでも月換算 94.5 CU-hrs となり上限 100 CU-hrs にほぼ到達する。月末に超過するという症状と一致する。

> 背景の節にある「月 191.9 compute hours」は Neon の旧情報。Console の実表示は **100 CU-hrs / 月**。0.25 CU 換算で 400 稼働時間に相当する。

### 24 時間の稼働パターン

Monitoring の直近 24 時間グラフでは、深夜帯（4:47 AM 付近）も含めて `ENDPOINT INACTIVE` の縞と `ALLOCATED` が短周期で交互に現れ、**CPU 使用量はほぼ 0 のまま**。

実ユーザーがいない時間帯にも DB が起こされ続けており、かつ起きている間に実質的な処理をしていない。クローラや監視からの散発的なアクセスが、再検証間隔の短いキャッシュを踏んで DB を起こしていると考えられる。`cacheLife` を延長する対策はこのパターンに直接効く。

### アクセス主体の特定（2026-09-05 Vercel Observability で確認）

本番プロジェクト `koremina`（Hobby プラン）の直近 12 時間（09-05 01:50 〜 13:50 JST）。

**リクエストの約半分がボット**

| Bot | リクエスト | CDN キャッシュ率 |
| --- | --- | --- |
| meta-externalagent | 312 | 87.5% |
| semrush | 120 | 100% |
| meta-webindexer | 99 | 93.9% |
| bingbot | 31 | 6.5% |
| applebot | 22 | 77.3% |
| googlebot | 14 | 64.3% |
| google-association-service | 10 | 100% |
| claudebot / oai-searchbot / amazonbot | 8 | 100% |

合計約 616 / 全 1.2K リクエスト ≒ **51%**。日本語 VTuber コミュニティサイトへの深夜アクセスの正体はこれ。実ユーザーではない。

**Function 呼び出しの頻度が autosuspend を下回っている**

12 時間で **257 invocations**。

| ルート | invocations |
| --- | --- |
| `/post/[postId]` | 162 |
| `/page` | 34 |
| `/` | 21 |
| `/user/[userId]` | 16 |
| その他（segment / sitemap.xml 等） | 24 |

平均 **21.4 回/時 = 約 2.8 分に 1 回**。グラフは深夜帯も含めて 12 時間ほぼ途切れない。**autosuspend の 5 分より短い間隔で関数が起動し続けている**ため、DB が寝る隙がない。実測稼働率 48% と整合する。

CDN キャッシュ率が高くても関数は動く。post ページは動的部分を `Suspense` で切り出しており（`app/(pages)/post/[postId]/page.tsx` の `ReactionAndReportSection`）、CDN がシェルを返してもこの穴は毎回実行される。その先が `getReactionsByPostId`（`cacheLife("seconds")` = 再検証 1 秒）なので、実質毎回 DB に到達する。

`/post/[postId]` だけで invocations の 63% を占めることから、**Phase 2 に置いていた `cacheLife("seconds")` 4 箇所の延長が、実は最も効く対策**である。

**除外できた容疑者**

- ヘッダーの `getCurrentUser`（`components/HeaderRight.tsx`）: `session?.user?.id` が無い場合は prisma を呼ぶ前に `null` を返す。認証も `strategy: "jwt"` で DB セッションではない。未ログインのボットでは DB を叩かない。
- `updateSeenUsers`: 未ログインでは `Unauthorized` で早期 return。
- Cron Jobs: `vercel.json` が存在せず、cron の設定なし。
- `middleware.ts`: **存在しない**（CLAUDE.md の記述は古い）。

**キャッシュの実測値（同 12 時間）**

- Data Cache: reads 220 / writes 19 / hit rate 91.3% / on-demand revalidation 0
- Runtime Cache（`use cache: remote`）: 0（未使用）

Data Cache の write が 12 時間で 19 回しかない一方、DB は 48% 起きている。つまり **DB を起こしているのはキャッシュの再生成ではなく、キャッシュを通らない経路と、再検証間隔 1 秒で実質キャッシュとして機能していない `seconds` プロファイル**である。

### 追加で検討できる対策

`cacheLife` の延長とは独立に、リクエスト自体を減らす方向も効く。

- `semrush`（120 リクエスト / 12h、SEO 解析クローラ）はサイトの価値に寄与しない。`robots.txt` での拒否、または Vercel Firewall のルールでブロックする。
- `meta-externalagent` / `meta-webindexer`（合計 411 リクエスト / 12h）は AI 学習用クローラ。ブロックの是非はサービス方針の判断。
- `bingbot` は CDN キャッシュ率 6.5% と極端に低く、31 リクエストのほぼ全てが origin に届いている。原因の切り分けは未実施。

ただしこれらは対症療法であり、`cacheLife` を延ばせばボットが来ても DB は起きない。優先度は `cacheLife` の是正が先。

### 残る未確認

- Phase 2 の日次監視を実装する際は Neon の Personal API key が必要（Console の Account settings → API keys で発行）。今回は Console の画面から直接確認できたため発行していない。
- `bingbot` の CDN キャッシュ率が 6.5% と低い理由。

## 補足: 調査時の注意点

`/liver_register` の赤表示（`bg-red-100`）を `curl` の生 HTML で数えると、SSR HTML と RSC ペイロードの両方に className 文字列が現れて倍にカウントされる。`<script>` タグを除去してから数える必要がある。
