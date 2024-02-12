import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers as NextUIProvider } from "@/NextUI/provider";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import { SpeedInsights } from "@vercel/speed-insights/next";

import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Dictionary",
  description:
    "This web app is where we save our vocabularies, idioms and sentences that we want to memorize.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-main" suppressHydrationWarning>
      <body className={`${inter.className} h-dvh`} suppressHydrationWarning>
        <NextUIProvider>
          <Header />
          <main className="h-[calc(100dvh-150px)] overflow-auto">
            {children}
          </main>
          <Footer />
        </NextUIProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
