import { Metadata } from "next";

export const metadata: Metadata = {
  title: "更新履歴",
};

const Page = () => {
  return (
    <>
      <div className="px-4 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-16">更新履歴</h1>
        <div className="space-y-4">準備中</div>
      </div>
    </>
  );
};

export default Page;
