"use client";

import deletePost from "@/app/action/deletePost";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState, useTransition } from "react";

interface PostDeleteDialogProps {
  children: ReactNode;
  postId: string;
}

const PostDeleteDialog = ({ children, postId }: PostDeleteDialogProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    startTransition(async () => {
      await deletePost({ postId });
      toast({
        description: "投稿を削除しました。",
      });
      setOpen(false)
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
          <Button onClick={handleDelete} disabled={isPending} variant={"destructive"}>
            削除する
            {
              isPending && (
                <Loader2 className="animate-spin" />
              )
            }
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostDeleteDialog;
