"use client";

import { Button } from "@/components/ui/button";
import { Liver, User } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import updateMostFavoriteLiver from "@/app/action/updateMostFavoriteLiver";
import { Loader2 } from "lucide-react";
import getLivers from "@/app/action/getLivers";

interface MostFavoriteLiverFormProps {
  user: User | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FormSchema = z.object({
  liverId: z.string().optional(),
});

const MostFavoriteLiverForm = ({ setOpen }: MostFavoriteLiverFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [livers, setLivers] = useState<Liver[]>();

  useEffect(() => {
    const fetchAndSetLivers = async () => {
      const livers = await getLivers();
      const invalidLivers = livers;
      setLivers(invalidLivers);
    };

    fetchAndSetLivers();
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await updateMostFavoriteLiver(data);

      if (result?.error) {
        console.log(result.error);
        toast.error(
          "登録に失敗しました。何度も失敗する場合は、お問い合わせよりご連絡ください。"
        );
      } else {
        toast.success("最推しライバーを登録しました。");
        setOpen(false);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="liverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ライバー選択</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="ライバーを選択" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[30vh]">
                  {livers?.map(liver => (
                    <SelectItem key={liver.id} value={liver.id}>
                      {liver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || form.formState.isSubmitted}
        >
          送信
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default MostFavoriteLiverForm;
