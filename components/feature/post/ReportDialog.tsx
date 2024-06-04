"use client";

import sendReportMail from "@/app/action/sendReportMail";
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
import { ReactNode, useState, useTransition } from "react";

interface ReportDialogProps {
  children: ReactNode;
  postId: string;
}

const ReportDialog = ({ children, postId }: ReportDialogProps) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await sendReportMail(postId);
      toast({
        description: "投稿を通報しました。",
      });
      setOpen(false)
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>投稿を報告しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この投稿を管理者に報告します。にじさんじに全く関係のない動画や明らかに不適切と思われる動画と判断した場合、投稿を削除します。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>キャンセル</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            通報する
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReportDialog;
