/**
 * メールアドレス確認リンク期限切れページ
 */
export default function EmailExpiredPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
            <svg
              className="h-10 w-10 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          確認リンクの有効期限が切れています
        </h1>

        <p className="text-gray-600">
          確認リンクの有効期限（48時間）が切れています。
          <br />
          設定ページから再度メールアドレスを登録してください。
        </p>
      </div>
    </div>
  );
}
