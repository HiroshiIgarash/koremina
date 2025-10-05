"use client";

import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import updateNotifyNewPostByEmail from "@/app/action/updateNotifyNewPostByEmail";
import updateNotificationEmail from "@/app/action/updateNotificationEmail";
import { toast } from "sonner";
import { User } from "@prisma/client";

interface NotificationSettingsProps {
  user: User;
}

const NotificationSettings = ({ user }: NotificationSettingsProps) => {
  const [notifyNewPostByEmail, setNotifyNewPostByEmail] = useState(
    user.notifyNewPostByEmail
  );
  const [notificationEmail, setNotificationEmail] = useState(
    user.notificationEmail || ""
  );
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    setNotifyNewPostByEmail(checked);

    startTransition(async () => {
      const result = await updateNotifyNewPostByEmail(checked);

      if (result?.error) {
        toast.error("設定の更新に失敗しました");
        setNotifyNewPostByEmail(!checked);
      } else {
        toast.success("設定を更新しました");
      }
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailToSave = notificationEmail.trim() || "";

    startTransition(async () => {
      const result = await updateNotificationEmail(emailToSave);

      if (result?.error) {
        toast.error(result.error);
      } else {
        if (result?.requiresVerification) {
          toast.success("確認メールを送信しました。メールボックスをご確認ください", {
            duration: 5000,
          });
        } else {
          toast.success(
            emailToSave
              ? "メールアドレスを更新しました"
              : "メールアドレスを削除しました"
          );
        }
        setIsEditingEmail(false);
      }
    });
  };

  const hasNotificationEmail = !!notificationEmail;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 space-y-6">
      <h2 className="text-xl font-bold">通知設定</h2>

      {/* メールアドレス設定 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">通知用メールアドレス</Label>
        {!isEditingEmail ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                {hasNotificationEmail ? (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {notificationEmail}
                    </p>
                    {user.notificationEmailVerified ? (
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <svg
                          className="h-3 w-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>確認済み</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                        <svg
                          className="h-3 w-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>確認待ち（メールをご確認ください）</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">未設定</p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingEmail(true)}
              >
                {hasNotificationEmail ? "変更" : "設定"}
              </Button>
            </div>
            {user.email && !hasNotificationEmail && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs h-auto py-2 whitespace-normal text-left"
                onClick={() => {
                  setNotificationEmail(user.email!);
                  setIsEditingEmail(true);
                }}
              >
                <span className="break-all">
                  ログイン中のGoogleアカウント ({user.email}) を使用
                </span>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <Input
                type="email"
                value={notificationEmail}
                onChange={e => setNotificationEmail(e.target.value)}
                placeholder="example@email.com"
                disabled={isPending}
                className="flex-1"
              />
              <Button type="submit" disabled={isPending} size="sm">
                保存
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setNotificationEmail(user.notificationEmail || "");
                  setIsEditingEmail(false);
                }}
                disabled={isPending}
              >
                キャンセル
              </Button>
            </form>
            {user.email && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs h-auto py-2 whitespace-normal text-left"
                onClick={() => setNotificationEmail(user.email!)}
                disabled={isPending}
              >
                <span className="break-all">
                  ログイン中のGoogleアカウント ({user.email}) を使用
                </span>
              </Button>
            )}
          </div>
        )}
        <p className="text-xs text-gray-500">
          {user.notificationEmailVerified
            ? "通知はこのメールアドレスに送信されます"
            : "メールアドレスを確認後、通知を受け取れるようになります"}
        </p>
      </div>

      {/* メール通知ON/OFF */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 space-y-1">
          <Label htmlFor="notify-new-post" className="text-base font-medium">
            新規投稿のメール通知
          </Label>
          <p className="text-sm text-gray-500">
            新しい投稿があったときにメールで通知します
          </p>
        </div>
        <Switch
          id="notify-new-post"
          checked={notifyNewPostByEmail}
          onCheckedChange={handleToggle}
          disabled={isPending || !hasNotificationEmail}
        />
      </div>

      {!hasNotificationEmail && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ メール通知を受け取るには、上記でメールアドレスを設定してください
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;
