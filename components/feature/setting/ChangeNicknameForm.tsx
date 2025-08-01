"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Dispatch, SetStateAction, useTransition } from "react";
import updateNickname from "@/app/action/updateNickname";
import { useForm } from "react-hook-form";
import { NicknameSchema, nicknameSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ChangeNicknameFormProps {
  user: User | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeNicknameForm = ({ user, setOpen }: ChangeNicknameFormProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      newNickname: user?.nickname || user?.name || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: NicknameSchema) => {
    startTransition(async () => {
      const res = await updateNickname(data);
      if (res?.error) {
        toast.error("ユーザーネームの変更に失敗しました。");
        return;
      }
      toast.success("ユーザーネームを変更しました。");
      setOpen(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <Input {...register("newNickname")} className="text-base md:text-sm" />
        <Button disabled={!!errors.newNickname || isPending}>
          変更
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </div>
      <div className="text-sm text-destructive mt-2">
        {errors.newNickname?.message}
      </div>
    </form>
  );
};

export default ChangeNicknameForm;
