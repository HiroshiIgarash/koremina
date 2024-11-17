"use client";

import deleteComment from "@/app/action/deleteComment";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

interface DeleteCommentButtonProps {
  commentId: string;
  postId: string;
}

const DeleteCommentButton = ({
  commentId,
  postId,
}: DeleteCommentButtonProps) => {
  const [isPending, startTransition] = useTransition();


  const handleClick = () => {
    startTransition(async () => {
      const result = await deleteComment({ commentId, postId });
      if (result?.error) {
        toast.error("削除に失敗しました。何度も失敗する場合は、お問い合わせよりご連絡ください。");
      } else {
        toast.success("コメントを削除しました。");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
    >
      削除
      {
        isPending && (
          <Loader2 className="animate-spin" />
        )
      }
    </Button>
  );
};

export default DeleteCommentButton;
