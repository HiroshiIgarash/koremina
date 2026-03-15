"use server";

import { auth } from "@/auth";
import getUserById from "./getUserById";

/**
 * 認証済みユーザーの情報をキャッシュ付きで取得する
 * getUserById が "use cache" でキャッシュされるため、
 * 実質的にユーザー情報はキャッシュから取得される
 */
const getCurrentUserWithTag = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return getUserById(session.user.id);
};

export default getCurrentUserWithTag;
