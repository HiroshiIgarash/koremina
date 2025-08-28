import { z } from "zod";

export const nicknameSchema = z.object({
  newNickname: z
    .string()
    .min(1, { message: "ユーザーネームは必須です" })
    .max(50, { message: "50文字を超えています。" }),
});

export type NicknameSchema = z.infer<typeof nicknameSchema>;

export const bioSchema = z.object({
  newBio: z
    .string()
    .max(100, { message: "100文字を超えています。" }),
});

export type BioSchema = z.infer<typeof bioSchema>;
