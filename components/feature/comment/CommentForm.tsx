"use client";

import postComment from "@/app/action/postComment";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import { useState } from "react";

interface CommentFormProps {
  user: User;
  postId: string;
}

const CommentForm = ({ user, postId }: CommentFormProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action={async (formData) => {
        await postComment(postId, formData);
        toast({
          description: "コメントを投稿しました",
        });
        setIsSubmitting(false);
        setComment("");
      }}
      onSubmit={() => setIsSubmitting(true)}
      className="flex gap-4 items-center"
    >
      <Avatar user={user} />
      <Input
        className="text-base md:text-sm"
        value={comment}
        name="comment"
        onChange={(e) => setComment(e.target.value)}
        placeholder="コメントする"
        autoComplete="off"
      />
      <Button disabled={isSubmitting}>送信</Button>
    </form>
  );
};

export default CommentForm;
