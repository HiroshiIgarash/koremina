"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";

const FirstVisitDialog = () => {
  // SSR では常に false（サーバーに localStorage が無いため）。
  // Dialog はポータル描画なので hydration mismatch は起きない
  const [isFirstVisit, setIsFirstVisit] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("isFirstVisit") !== "false"
  );

  const setLocalStorage = () => {
    setIsFirstVisit(false);
    localStorage.setItem("isFirstVisit", "false");
  };

  return (
    <>
      {isFirstVisit && (
        <Dialog defaultOpen onOpenChange={setLocalStorage}>
          <DialogContent className="sm:max-w-md max-w-[90%]">
            <DialogHeader>
              <DialogTitle>はじめまして！</DialogTitle>
            </DialogHeader>
            <div className="space-y-[1lh]">
              <p> コレミナへようこそ！</p>
              <p>
                コレミナはみんなでにじさんじのおすすめ動画を共有できる非公式サービスです！
              </p>
              <p>
                さっそくですが、にじさんじのおすすめ動画はありますか？
                <br />
                もしあれば、アカウント作成しておすすめ動画を教えてください！
              </p>
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                {/* ダイアログを閉じずに遷移した場合も表示済みとして記録する */}
                <Link href="/post" onClick={setLocalStorage}>
                  あなたのおすすめ動画を投稿する
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                （GoogleもしくはXアカウントでログインできます）
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default FirstVisitDialog;
