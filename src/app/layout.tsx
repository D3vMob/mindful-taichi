import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Header } from "~/components/header";

export const metadata: Metadata = {
  title: "Mindful Tai Chi",
  description:
    "マインドフルネス太極拳の練習動画アプリケーションは、心と体の健康を向上させるための便利なプラットフォームです。 / Mindfulness Tai Chi practice video app is a convenient platform that supports daily practice of mindfulness and Tai Chi, offering easy-to-follow instructional videos to improve mental and physical well-being through the combination of mindfulness and Tai Chi exercises.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="flex grow flex-col min-h-screen">
          <header>
            <Header />
          </header>
          <main className="flex grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
