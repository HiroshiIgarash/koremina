import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "コレミナ -にじさんじ布教お助けアプリ-",
  description: "koreminaはにじさんじを他人におすすめする際の手助けとなるアプリです。おすすめの動画を共有しましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between pt-28">
        {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
