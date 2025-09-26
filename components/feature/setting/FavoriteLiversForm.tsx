"use client";

import { Button } from "@/components/ui/button";
import { Liver, User } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

import { Loader2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import updateFavoriteLivers from "@/app/action/updateFavoriteLivers";
import getLivers from "@/app/action/getLivers";
import { ScrollArea } from "./ui/scroll-area";

interface FavoriteLiversFormProps {
  user: (User & { favoriteLivers: Liver[] }) | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FavoriteLiversForm = ({
  user,
  setOpen: setOpenDialog,
}: FavoriteLiversFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [livers, setLivers] = useState<Liver[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Liver[]>(
    () => user?.favoriteLivers || []
  );
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((liver: Liver) => {
    setSelected(prev => prev.filter(s => s.id !== liver.id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected(prev => {
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
    liver => !selected.some(s => s.id === liver.id)
  );

  useEffect(() => {
    const fetchAndSetLivers = async () => {
      const livers = await getLivers();
      const invalidLivers = livers;
      setLivers(invalidLivers);
    };

    fetchAndSetLivers();
  }, []);

  function handleSubmit(liversId: string[]) {
    startTransition(async () => {
      const result = await updateFavoriteLivers(liversId);

      if (result?.error) {
        console.log(result.error);
        toast.error(
          "登録に失敗しました。何度も失敗する場合は、お問い合わせよりご連絡ください。"
        );
      } else {
        toast.success("推しライバーを登録しました。");
        setOpenDialog(false);
      }
    });
  }

  return (
    <>
      <div className="space-y-2 w-full">
        <span className="text-sm font-medium leading-none">ライバー選択</span>
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
        >
          <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <ScrollArea>
              <div className="flex gap-1 flex-wrap">
                {selected.map(liver => {
                  return (
                    <Badge key={liver.id} variant="secondary">
                      {liver.name}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            handleUnselect(liver);
                          }
                        }}
                        onMouseDown={e => {
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
                  onValueChange={setInputValue}
                  onBlur={() => setOpen(false)}
                  onFocus={() => setOpen(true)}
                  placeholder="推しのライバーを選択"
                  className="text-base md:text-sm ml-2 bg-transparent outline-hidden placeholder:text-muted-foreground flex-1"
                />
              </div>
            </ScrollArea>
          </div>
          <div className="relative mt-2">
            {open && selectables.length > 0 ? (
              <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden animate-in">
                <CommandList>
                  <CommandGroup className="max-h-[20vh] md:max-h-none h-full overflow-auto">
                    {selectables.map(liver => {
                      return (
                        <CommandItem
                          key={liver.id}
                          onMouseDown={e => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onSelect={() => {
                            setInputValue("");
                            setSelected(prev => [...prev, liver]);
                          }}
                          className={"cursor-pointer"}
                          keywords={
                            [liver.aliasFirst, liver.aliasSecond].filter(
                              a => a
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

      <Button
        onClick={() => handleSubmit(selected.map(liver => liver.id))}
        disabled={isPending}
      >
        送信
        {isPending && <Loader2 className="animate-spin" />}
      </Button>
    </>
  );
};

export default FavoriteLiversForm;
