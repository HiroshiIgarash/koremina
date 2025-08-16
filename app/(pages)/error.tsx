"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center h-full gap-8">
      <h2 className="font-bold text-xl text-center">エラーが発生しました...</h2>
      <p className="text-center">
        エラーが発生したようです。
        <br />
        ボタンを押してもう一度試してみてください。
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        もう一度試す
      </Button>
    </div>
  );
}
