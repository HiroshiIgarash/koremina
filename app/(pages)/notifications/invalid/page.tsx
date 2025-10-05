/**
 * メールアドレス確認リンク無効ページ
 */
export default function EmailInvalidPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          無効なリンクです
        </h1>

        <p className="text-gray-600">
          確認リンクが無効です。
          <br />
          リンクが正しくコピーされているか確認してください。
          <br />
          問題が解決しない場合は、設定ページから再度メールアドレスを登録してください。
        </p>
      </div>
    </div>
  );
}
