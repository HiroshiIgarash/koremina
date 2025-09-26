"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Dispatch, SetStateAction, useTransition } from "react";
import updateBio from "@/app/action/updateBio";
import { useForm } from "react-hook-form";
import { BioSchema, bioSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChangeBioFormProps {
  user: User | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeBioForm = ({ user, setOpen }: ChangeBioFormProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      newBio: user?.bio || "",
    },
    mode: "onChange",
  });

  const watchBio = watch("newBio");

  const onSubmit = async (data: BioSchema) => {
    startTransition(async () => {
      const res = await updateBio(data);
      if (res?.error) {
        toast.error("自己紹介文の変更に失敗しました。");
        return;
      }
      toast.success("自己紹介文を変更しました。");
      setOpen(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Textarea
          {...register("newBio")}
          className="resize-none text-base md:text-sm"
          placeholder="自己紹介文を入力してください"
          rows={4}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-destructive">
            {errors.newBio?.message}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className={cn(watchBio.length > 100 && "text-destructive")}>
              {watchBio.length}
            </span>{" "}
            / 100
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          キャンセル
        </Button>
        <Button disabled={!!errors.newBio || isPending}>
          変更
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
};

export default ChangeBioForm;
