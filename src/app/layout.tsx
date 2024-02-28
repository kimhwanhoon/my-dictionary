import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers as NextUIProvider } from "@/NextUI/provider";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import "react-toastify/dist/ReactToastify.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Dictionary",
  description:
    "This web app is where we save our vocabularies, idioms and sentences that we want to memorize.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestUrl = headers().get("x-url") || "";

  return (
    <html lang="en" className="bg-main" suppressHydrationWarning>
      <body className={`${inter.className} h-dvh`} suppressHydrationWarning>
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
