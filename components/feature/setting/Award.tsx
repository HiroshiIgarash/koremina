import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Award = async () => {
  const session = await auth();
  const currentUser = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      _count: true,
    },
  });
  if (!currentUser) return;

  // 称号種類
  const AWARD_TYPE = ["favoriteLiver", "post", "comment", "reaction"] as const;

  // 称号一覧
  const award: {
    [key in (typeof AWARD_TYPE)[number]]: {
      [level in "bronze" | "silver" | "gold" | "none"]: {
        count: number;
        text: string;
      };
    };
  } = {
    favoriteLiver: {
      none: {
        count: 0,
        text: "推しライバーを設定しよう",
      },
      bronze: {
        count: 1,
        text: "",
      },
      silver: {
        count: 1,
        text: "",
      },
      gold: {
        count: 1,
        text: "推しライバー設定済み",
      },
    },
    post: {
      none: {
        count: 0,
        text: "おすすめ動画を投稿しよう！",
      },
      bronze: {
        count: 1,
        text: "おすすめ初心者",
      },
      silver: {
        count: 5,
        text: "おすすめ大好き！",
      },
      gold: {
        count: 10,
        text: "推しを見てくれ！！！！！",
      },
    },
    comment: {
      none: {
        count: 0,
        text: "コメントをしてみよう！",
      },
      bronze: {
        count: 1,
        text: "はじめてのコメント",
      },
      silver: {
        count: 3,
        text: "コメントマスター",
      },
      gold: {
        count: 7,
        text: "コメントプロフェッショナル",
      },
    },
    reaction: {
      none: {
        count: 0,
        text: "リアクションをたくさんしよう！",
      },
      bronze: {
        count: 10,
        text: "ナイス！リアクション",
      },
      silver: {
        count: 50,
        text: "ナイス！ナイス！リアクション",
      },
      gold: {
        count: 100,
        text: "にじさんじのもりあげマスター",
      },
    },
  };

  const favoriteLiverCount =
    (currentUser.mostFavoriteLiverId ? 1 : 0) +
    currentUser._count.favoriteLivers;
  const postCount = currentUser._count.Video;
  const commentCount = currentUser._count.Comment;
  const reactionCount =
    currentUser._count.angelVideo +
    currentUser._count.cryVideo +
    currentUser._count.goodVideo +
    currentUser._count.loveVideo +
    currentUser._count.funnyVideo;

  const level = (awardType: (typeof AWARD_TYPE)[number]) => {
    let target: number | undefined;
    switch (awardType) {
      case "post":
        target = postCount;
        break;
      case "comment":
        target = commentCount;
        break;
      case "reaction":
        target = reactionCount;
        break;
      case "favoriteLiver":
        target = favoriteLiverCount;
        break;
      default:
        return awardType satisfies never;
    }

    if (target !== undefined) {
      if (target >= award[awardType].gold.count) {
        return "gold";
      } else if (target >= award[awardType].silver.count) {
        return "silver";
      } else if (target >= award[awardType].bronze.count) {
        return "bronze";
      } else {
        return "none";
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-8 space-y-12">
        <div>
          <p className="font-semibold text-xl text-center my-4">
            獲得した称号
            <br />
            <span className="text-sm font-medium">
              クリックでXのページに飛んで共有できます。
            </span>
          </p>
          <div className="flex flex-col items-center gap-4">
            {AWARD_TYPE.map(type => {
              const lv = level(type);
              if (lv) {
                return (
                  <AwardBudge key={type} variant={lv} userId={currentUser.id}>
                    {award[type][lv].text}
                  </AwardBudge>
                );
              }
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AwardBudge = ({
  children,
  variant,
  userId,
}: {
  children: ReactNode;
  variant: "gold" | "silver" | "bronze" | "none";
  userId: string;
}) => {
  return (
    <Link
      href={`https://x.com/intent/post?text=${encodeURIComponent(
        `
#コレミナ で称号「${children}」を獲得しました！

マイページ
https://koremina.vercel.app/user/${userId}
`
      )}`}
      className={cn(
        "text-center max-w-80 w-full",
        variant === "none" && "cursor-none pointer-events-none"
      )}
    >
      <div
        className={cn(
          "p-2 rounded-full bg-linear-to-br text-black",
          variant === "none" &&
            "bg-gray-50 dark:bg-gray-900 border border-current  text-gray-300 dark:text-gray-700",
          variant === "gold" && "from-[#B39855] via-[#FFF9E6] to-[#B39855]",
          variant === "silver" && "from-[#BDC3C9] via-[#FFFFFF] to-[#BDC3C9]",
          variant === "bronze" && "from-[#A86F4E] via-[#F9C7A2] to-[#A86F4E]"
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export default Award;
