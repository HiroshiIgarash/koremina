/**
 * メールアドレス確認完了ページ
 */
export default function EmailConfirmedPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          メールアドレスの確認が完了しました
        </h1>

        <p className="text-gray-600">
          通知用メールアドレスが正常に登録されました。
          <br />
          今後、新しい投稿があった際にメールでお知らせします。
        </p>
      </div>
    </div>
  );
}
