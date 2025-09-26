"use client";

import getCurrentUser from "@/app/action/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Liver } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface PostFilterProps {
  filterLiversId: string | undefined;
  livers: Liver[];
  user: Awaited<ReturnType<typeof getCurrentUser>> | null;
  isPending?: boolean;
}

const PostFilter = ({
  filterLiversId,
  livers,
  user,
  isPending = false,
}: PostFilterProps) => {
  const [isRoutingPending, startRoutingTransition] = useTransition();
  const router = useRouter();

  const filterLiver = livers.find(l => l.id === filterLiversId);

  const handleChange = (value: string) => {
    if (value === filterLiversId) return;
    const href = value === "all" ? "/page/" : `/page/?liver=${value}`;
    startRoutingTransition(() => {
      router.push(href);
    });
  };

  const handleRandomClick = () => {
    const invalidLivers = livers;
    const rand = Math.floor(Math.random() * invalidLivers.length);
    const randomLiverId = invalidLivers[rand]?.id;
    if (!randomLiverId) return;
    startRoutingTransition(() => {
      router.push(`/page/?liver=${randomLiverId}`);
    });
  };

  // 最推しライバー
  const mostFavoriteLiver = user?.mostFavoriteLiver;

  // 推しライバー
  const favoriteLiversWithoutMostFavoriteLiver =
    user?.favoriteLivers.filter(l => l.id !== mostFavoriteLiver?.id) || [];

  return (
    <div className="self-start mb-8 px-4 w-full max-w-7xl mx-auto">
      <Label className="font-bold text-base">ライバーで絞り込む</Label>
      <div className="flex items-center gap-2 md:gap-8 mt-2">
        <Select
          onValueChange={handleChange}
          value={!isPending && filterLiver ? filterLiver?.id : "all"}
        >
          <SelectTrigger className="w-48 md:w-64">
            <SelectValue placeholder="ライバー絞り込み" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全て表示</SelectItem>
            <SelectSeparator />
            {isPending ? (
              <SelectItem value="pending" disabled>
                読み込み中...
              </SelectItem>
            ) : (
              <>
                {user && user.mostFavoriteLiver && (
                  <>
                    <SelectGroup>
                      <SelectLabel>最推しライバー</SelectLabel>
                      {
                        <SelectItem
                          key={user.mostFavoriteLiver.id}
                          value={user.mostFavoriteLiver.id}
                        >
                          {user.mostFavoriteLiver.name}
                        </SelectItem>
                      }
                    </SelectGroup>
                    <SelectSeparator />
                  </>
                )}
                {favoriteLiversWithoutMostFavoriteLiver.length > 0 && (
                  <>
                    <SelectGroup>
                      <SelectLabel>推しライバー</SelectLabel>
                      {favoriteLiversWithoutMostFavoriteLiver.map(liver => (
                        <SelectItem key={liver.id} value={liver.id}>
                          {liver.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                  </>
                )}
                <SelectGroup>
                  <SelectLabel>全ライバー</SelectLabel>
                  {livers.map(liver => {
                    if (mostFavoriteLiver?.id === liver.id) return;
                    if (
                      favoriteLiversWithoutMostFavoriteLiver.some(
                        l => l.id === liver.id
                      )
                    )
                      return;
                    if (liver.isRetire || liver.isOverseas) return;

                    return (
                      <SelectItem key={liver.id} value={liver.id}>
                        {liver.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>にじさんじEN</SelectLabel>
                  {livers.map(liver => {
                    if (mostFavoriteLiver?.id === liver.id) return;
                    if (
                      favoriteLiversWithoutMostFavoriteLiver.some(
                        l => l.id === liver.id
                      )
                    )
                      return;
                    if (liver.isRetire || !liver.isOverseas) return;

                    return (
                      <SelectItem key={liver.id} value={liver.id}>
                        {liver.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>卒業ライバー</SelectLabel>
                  {livers.map(liver => {
                    if (mostFavoriteLiver?.id === liver.id) return;
                    if (
                      favoriteLiversWithoutMostFavoriteLiver.some(
                        l => l.id === liver.id
                      )
                    )
                      return;
                    if (!liver.isRetire) return;

                    return (
                      <SelectItem key={liver.id} value={liver.id}>
                        {liver.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </>
            )}
          </SelectContent>
        </Select>
        <Button onClick={handleRandomClick}>ランダム</Button>
        {isRoutingPending && (
          <span className="text-muted-foreground">検索中...</span>
        )}
      </div>
    </div>
  );
};

export default PostFilter;
