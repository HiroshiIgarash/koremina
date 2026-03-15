import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { sendNewPostEmails } from "@/lib/email";

const YOUTUBE_VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;
const MAX_COMMENT_LENGTH = 1000;

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  // リクエストボディのパース（不正なJSONに対する防御）
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { videoId, comment, detailComment, liver: liversId } = body;

  // 入力バリデーション: 型チェック・必須フィールド・文字数制限の検証
  if (
    !videoId ||
    typeof videoId !== "string" ||
    !YOUTUBE_VIDEO_ID_RE.test(videoId) ||
    !comment ||
    typeof comment !== "string" ||
    comment.length > MAX_COMMENT_LENGTH ||
    (detailComment != null &&
      (typeof detailComment !== "string" ||
        detailComment.length > MAX_COMMENT_LENGTH)) ||
    !Array.isArray(liversId) ||
    liversId.length === 0
  ) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  const newPost = await prisma.video.create({
    data: {
      videoId,
      comment,
      detailComment,
      postedUser: {
        connect: {
          id: currentUser.id,
        },
      },
      liver: {
        connect: (liversId as string[]).map(l => ({ id: l })),
      },
    },
  });

  revalidateTag("get-post", "minutes");

  // 新規投稿のメール通知を非同期で送信（awaitしない）
  sendNewPostEmails(newPost.id).catch(err => {
    console.error("メール送信エラー:", err);
  });

  return NextResponse.json(newPost);
};

export const PUT = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  // リクエストボディのパース（不正なJSONに対する防御）
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { postId, videoId, comment, detailComment, liver: liversId } = body;

  // 入力バリデーション: postIdの存在確認・型チェック・必須フィールド・文字数制限の検証
  if (
    !postId ||
    typeof postId !== "string" ||
    !videoId ||
    typeof videoId !== "string" ||
    !YOUTUBE_VIDEO_ID_RE.test(videoId) ||
    !comment ||
    typeof comment !== "string" ||
    comment.length > MAX_COMMENT_LENGTH ||
    (detailComment != null &&
      (typeof detailComment !== "string" ||
        detailComment.length > MAX_COMMENT_LENGTH)) ||
    !Array.isArray(liversId) ||
    liversId.length === 0
  ) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  // 投稿の所有者チェック
  const existingPost = await prisma.video.findUnique({
    where: { id: postId },
  });
  if (!existingPost) {
    return new NextResponse("Post not found", { status: 404 });
  }
  if (existingPost.postedUserId !== currentUser.id) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const newPost = await prisma.video.update({
    where: {
      id: postId,
    },
    data: {
      videoId,
      comment,
      detailComment,
      postedUser: {
        connect: {
          id: currentUser.id,
        },
      },
      liver: {
        set: (liversId as string[]).map(l => ({ id: l })),
      },
    },
  });

  revalidateTag("get-post", "minutes");
  revalidateTag(`get-post-by-id:${newPost.id}`, "max");

  return NextResponse.json(newPost);
};
