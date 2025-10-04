"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";
import { z } from "zod";

// メールアドレスのバリデーションスキーマ（空文字列またはメールアドレス）
const emailSchema = z
  .string()
  .refine(
    (val) => val === "" || z.string().email().safeParse(val).success,
    "有効なメールアドレスを入力してください"
  );

/**
 * 通知用メールアドレスを更新
 */
const updateNotificationEmail = async (email: string) => {
  try {
    const session = await auth();

    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      return {
        error: "Unauthorized",
      };
    }

    const trimmedEmail = email.trim();

    // メールアドレスのバリデーション
    emailSchema.parse(trimmedEmail);

    // 空文字列の場合はnullに変換
    const emailToSave = trimmedEmail === "" ? null : trimmedEmail;

    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        notificationEmail: emailToSave,
      },
    });

    revalidateTag("get-current-user");

    return { success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { error: "有効なメールアドレスを入力してください" };
    }
    return {
      error: "Failed to update notification email",
    };
  }
};

export default updateNotificationEmail;
