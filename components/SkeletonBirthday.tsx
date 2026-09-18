import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Birthday の読み込み中プレースホルダ
 *
 * Birthday はリクエスト時評価（connection()）になるため Suspense 境界が要る。
 * 外枠の高さを Birthday と揃えてレイアウトシフトを防ぐ。
 */
const SkeletonBirthday = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("w-full py-8 bg-slate-100 dark:bg-slate-600", className)}
    >
      <p className="text-center font-bold text-lg">
        <Skeleton className="h-7 w-56 mx-auto" />
      </p>
      <p className="text-center text-sm mt-2">
        <Skeleton className="h-5 w-32 mx-auto" />
      </p>
      <ul className="mt-4 flex gap-4 justify-center">
        <li className="flex flex-col items-center">
          <Skeleton className="size-20 rounded-full" />
          <Skeleton className="h-5 w-20 mt-1" />
        </li>
      </ul>
    </div>
  );
};

export default SkeletonBirthday;
