import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers as NextUIProvider } from "@/NextUI/Provider";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { checkUserSession } from "@/utils/supabase/sessionChecker";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const requestUrl = headers().get("x-url") || "";
  const { isSession } = await checkUserSession();
  const heightVariation = isSession
    ? "h-[calc(100dvh-130px)]"
    : "h-[calc(100dvh-70px)]";

  return (
    <html lang="en" className="bg-main" suppressHydrationWarning>
      <body
        className={`${inter.className} h-dvh dark:bg-slate-900`}
        suppressHydrationWarning
      >
        <NextUIProvider>
          <Header />
          <main className={`${heightVariation} overflow-auto`}>{children}</main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </NextUIProvider>
      </body>
    </html>
  );
}
