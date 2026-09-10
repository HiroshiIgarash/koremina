import { z } from "zod";

const YOUTUBE_VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;
const MAX_COMMENT_LENGTH = 1000;

/**
 * 投稿の作成・更新で受け取る入力の検証スキーマ
 *
 * 閾値は Route Handler（app/api/post/route.ts）時代の条件をそのまま移植している。
 * クライアント側の formSchema（comment は 40 文字）より緩いが、サーバーを
 * 最終防衛線として広めに受ける従来の挙動を変えないため意図的に揃えていない。
 */
export const postInputSchema = z.object({
  videoId: z.string().regex(YOUTUBE_VIDEO_ID_RE),
  comment: z.string().min(1).max(MAX_COMMENT_LENGTH),
  detailComment: z.string().max(MAX_COMMENT_LENGTH).nullish(),
  liver: z.array(z.string()).min(1),
});

export type PostInput = z.infer<typeof postInputSchema>;
