import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";

export const noto = Noto_Sans_JP({ preload: true, subsets: ["latin"] });

export const metadata: Metadata = {
  title: "コレミナ -にじさんじ布教お助けアプリ-",
  description:
    "koreminaはにじさんじを他人におすすめする際の手助けとなるアプリです。おすすめの動画を共有しましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={noto.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NextTopLoader showSpinner={false} height={2} />
          <div className="min-h-dvh grid grid-rows-[auto,1fr,auto]">
            <Header />
            <main className="flex flex-col items-center pt-12 pb-20">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
