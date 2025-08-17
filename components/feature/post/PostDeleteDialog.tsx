"use client";

import deletePost from "@/app/action/deletePost";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState, useTransition } from "react";

interface PostDeleteDialogProps {
  children: ReactNode;
  postId: string;
}

const PostDeleteDialog = ({ children, postId }: PostDeleteDialogProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    startTransition(async () => {
      await deletePost({ postId });
      toast.success("投稿を削除しました。");
      setOpen(false);
      router.push("/");
      router.refresh();
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>投稿を削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            投稿を削除するともとに戻せません。リアクション、コメントも同時に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>キャンセル</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            削除する
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostDeleteDialog;
