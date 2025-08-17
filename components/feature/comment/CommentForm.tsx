"use client";

import postComment from "@/app/action/postComment";
import updateNotification from "@/app/action/updateNotification";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { useState } from "react";

interface CommentFormProps {
  user: User;
  postId: string;
}

const CommentForm = ({ user, postId }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action={async formData => {
        const result = await postComment(postId, formData);
        if (result?.error) {
          console.log(result.error);
          toast.error(
            "登録に失敗しました。何度も失敗する場合は、お問い合わせよりご連絡ください。"
          );
        } else {
          updateNotification({ type: "comment", postId });
          toast.success("コメントを投稿しました。");
          setComment("");
        }
        setIsSubmitting(false);
      }}
      onSubmit={() => setIsSubmitting(true)}
      className="flex gap-4 items-center"
    >
      <Avatar user={user} />
      <Input
        className="text-base md:text-sm"
        value={comment}
        name="comment"
        onChange={e => setComment(e.target.value)}
        placeholder="コメントする"
        autoComplete="off"
      />
      <Button disabled={isSubmitting}>送信</Button>
    </form>
  );
};

export default CommentForm;
