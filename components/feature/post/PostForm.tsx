"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VideoImage from "./VideoImage";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Liver } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Loader2, X } from "lucide-react";
import getLivers from "@/app/action/getLivers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  videoId: z
    .string()
    .min(11, {
      message: "動画IDは11文字です。",
    })
    .max(11, {
      message: "動画IDは11文字です。",
    }),
  comment: z
    .string()
    .min(1, {
      message: "投稿タイトルは必須項目です。",
    })
    .max(40, {
      message: "40文字を超えています。",
    }),
  detailComment: z.string().optional(),
  liver: z.string().array(),
});

const PostForm = () => {
  const router = useRouter();

  const [isValidVideoId, setIsValidVideoId] = useState(false);

  const [livers, setLivers] = useState<Liver[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Liver[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoId: "",
      comment: "",
      detailComment: "",
      liver: [],
    },
    mode: "onBlur",
  });

  form.setValue(
    "liver",
    selected.map((s) => s.id)
  );

  const watchVideoId = form.watch("videoId");
  const watchComment = form.watch("comment");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await axios.post("/api/post", values).then(() => {
        toast.success("投稿が完了しました。");
        router.push("/");
        router.refresh();
      });
    });
  }

  const handleBlur = (value: string) => {
    if (!URL.canParse(value)) {
      form.trigger("videoId");
      return;
    }

    const url = new URL(value);

    // https://www.youtube.com/watch〜 の場合、v= 以降を返す
    if (url.origin === "https://www.youtube.com" && url.pathname === "/watch") {
      const paramV = url.searchParams.get("v");

      if (!paramV) return;

      form.setValue("videoId", paramV.toString());

      // https://youtu.be〜 の場合、スラッシュ以降を返す
    } else if (url.origin === "https://youtu.be") {
      const path = url.pathname; // '/videoId'
      const removedSlashPath = path.slice(1);

      form.setValue("videoId", removedSlashPath);

      // https://www.youtube.com/live〜 の場合、live/以降を返す
    } else if (
      url.origin.match(/https:\/\/(www\.)?youtube\.com/) &&
      url.pathname.startsWith("/live/")
    ) {
      const path = url.pathname; // '/live/videoId'
      const extractedPath = path.split("/")[2]; // ['','live',videoId]

      form.setValue("videoId", extractedPath);

      // https://www.youtube.com/shorts〜 の場合、shorts/以降を返す
    } else if (
      url.origin.match(/https:\/\/(www\.)?youtube\.com/) &&
      url.pathname.startsWith("/shorts/")
    ) {
      const path = url.pathname; // '/shorts/videoId'
      const extractedPath = path.split("/")[2]; // ['','shorts',videoId]

      form.setValue("videoId", extractedPath);
    }

    form.trigger("videoId");
  };

  const handleUnselect = useCallback((liver: Liver) => {
    setSelected((prev) => prev.filter((s) => s.id !== liver.id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = livers.filter(
    (liver) => !selected.some((s) => s.id === liver.id)
  );

  useEffect(() => {
    const fetchAndSetLivers = async () => {
      const livers = await getLivers();
      const invalidLivers = livers;
      setLivers(invalidLivers);
    };

    fetchAndSetLivers();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">おすすめ動画を投稿する</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormLabel>
              このライバーを推すときにおすすめしたい！（必須）
            </FormLabel>
            <Command
              onKeyDown={handleKeyDown}
              className="overflow-visible bg-transparent"
            >
              <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                  {selected.map((liver) => {
                    return (
                      <Badge key={liver.id} variant="secondary">
                        {liver.name}
                        <button
                          className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUnselect(liver);
                            }
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={() => handleUnselect(liver)}
                        >
                          <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </button>
                      </Badge>
                    );
                  })}
                  {/* Avoid having the "Search" Icon */}
                  <CommandPrimitive.Input
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={(e) => {
                      if (!(livers.length > 0)) return;
                      setInputValue(e);
                    }}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    placeholder="ライバーを選択"
                    className="text-base md:text-sm ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                  />
                </div>
              </div>
              <div className="relative mt-2">
                {open && selectables.length > 0 ? (
                  <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <CommandList>
                      <CommandGroup className="max-h-[20vh] md:max-h-none h-full overflow-auto">
                        {selectables.map((liver) => {
                          return (
                            <CommandItem
                              key={liver.id}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={(value) => {
                                setInputValue("");
                                setSelected((prev) => [...prev, liver]);
                              }}
                              className={"cursor-pointer"}
                              keywords={
                                [liver.aliasFirst, liver.aliasSecond].filter(
                                  (a) => a
                                ) as string[]
                              }
                            >
                              {liver.name}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </div>
                ) : null}
              </div>
            </Command>
          </div>
          <input type="hidden" {...form.register("liver")} />
          <div>
            <FormField
              control={form.control}
              name="videoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>youtube ID（URLでも可）</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      {...field}
                      onBlur={(e) => handleBlur(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    動画IDもしくはURLを記入してください。（サムネイルが表示されます）
                    <br />
                    <Dialog>
                      <DialogTrigger>
                        <span className="underline">
                          サムネイルが表示されない場合
                        </span>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            サムネイルが表示されない場合
                          </DialogTitle>
                          <DialogDescription className="text-foreground">
                            URLを入力後、
                            <span className="text-destructive">
                              任意の場所をクリック / タップ
                            </span>
                            すると動画IDに変換されるようになっています。
                            <br />
                            例）https://www.youtube.com/watch?v=8tTKwtgzJwA →
                            8tTKwtgzJwA
                          </DialogDescription>
                          <DialogDescription className="text-foreground">
                            任意の場所をクリック /
                            タップしても変換されない場合、手動で動画ID(11文字)を入力してください
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchVideoId.length === 11 && (
              <div className="mt-4">
                <VideoImage
                  id={watchVideoId}
                  setIsValidVideoId={setIsValidVideoId}
                />
              </div>
            )}
          </div>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>投稿タイトル（必須）</FormLabel>
                <FormControl>
                  <Input
                    className="text-base md:text-sm"
                    placeholder="〇〇好きに見てほしい！"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  動画の感想や一言コメントなど、40文字以内で記入してください。（
                  <span
                    className={cn(
                      watchComment.length > 40 && "text-destructive"
                    )}
                  >
                    {watchComment.length}
                  </span>{" "}
                  / 40）
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="detailComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>詳細文</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none text-base md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  コメントを細かく書くことができます。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting ||
              form.formState.isSubmitSuccessful ||
              !form.formState.isValid ||
              !isValidVideoId ||
              selected.length === 0
            }
          >
            投稿
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
          <p className="text-sm">
            ※投稿ボタンが押せない場合、以下を確認してください。
            <br />
            ・「このライバーを推すときにおすすめしたい！」→ライバーのラベルが表示されていますか？
            <br />
            ・youtube ID（URLでも可）→サムネが表示されていますか？
            <br />
          </p>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
