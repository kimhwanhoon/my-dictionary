"use client";

import { NextUIProvider as Provider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </Provider>
  );
}
