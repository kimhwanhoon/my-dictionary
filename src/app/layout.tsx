import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import NextUIProvider from "@/NextUI/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Dictionary",
  applicationName: "My Dictionary",
  description:
    "This web app serves as our repository for storing vocabularies, idioms, and sentences that we aim to memorize.",
  appleWebApp: {
    capable: true,
    title: "My Dictionary",
    statusBarStyle: "black-translucent",
    startupImage: ["./apple-icon.png"],
  },
  authors: {
    name: "Hwanhoon Kim",
    url: "https://github.com/kimhwanhoon/my-dictionary",
  },
  creator: "Hwanhoon Kim",
  publisher: "Hwanhoon Kim, Deployed by Vercel",
  keywords: ["dictionary", "custom dictionary", "kimhwanhoon"],
  category: "dictionary",
  icons: "https://i.ibb.co/sysbxn8/apple-icon.png",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 2.3,
  maximumScale: 1,
  interactiveWidget: "resizes-content",
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-main" suppressHydrationWarning>
      <body
        className={`${inter.className} h-dvh dark:bg-slate-900 relative -z-50`}
        suppressHydrationWarning
      >
        <NextUIProvider>
          <Header />
          <main className="h-[calc(100dvh-130px)] overflow-auto">
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
