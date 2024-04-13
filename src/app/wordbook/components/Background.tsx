"use client";

import { useTheme } from "next-themes";
import React, { ReactNode, useEffect, useState } from "react";

interface WordbookBackground {
  children: ReactNode;
  className: string;
}

export const WordbookBackground = ({
  children,
  className,
}: WordbookBackground) => {
  const { theme } = useTheme();
  const [backgroundStyle, setBackgroundStyle] = useState<string>("");
  useEffect(() => {
    if (theme === "light") {
      setBackgroundStyle("light-dictionary-result-background");
    } else {
      setBackgroundStyle("dark-dictionary-result-background");
    }
  }, [theme]);
  return <div className={`${className} ${backgroundStyle}`}>{children}</div>;
};
