import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { db } from "~/server/db";
import { Header } from "~/components/header/header";
import { Toaster } from "~/components/ui/sonner";
import { AuthProvider } from "~/context/authContext";

export const metadata: Metadata = {
  title: "Mindful Tai Chi",
  description:
    "マインドフルネス太極拳の練習動画アプリケーションは、心と体の健康を向上させるための便利なプラットフォームです。 / Mindfulness Tai Chi practice video app is a convenient platform that supports daily practice of mindfulness and Tai Chi, offering easy-to-follow instructional videos to improve mental and physical well-being through the combination of mindfulness and Tai Chi exercises.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const channelList = await db.query.channels.findMany();

  return (
    <AuthProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <div>
            <header className="sticky top-0 z-20">
              <Header channelList={channelList} />
            </header>
            <main className="flex grow">{children}</main>
            <Toaster />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
