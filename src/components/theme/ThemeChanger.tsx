"use client";

import { addThemeOnCookie } from "@/utils/theme/addThemeOnCookie";
import { Button } from "@nextui-org/react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface Props {
  theme: string | undefined;
}

export const ThemeChanger = ({ theme: cookieTheme }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    if (!cookieTheme) {
      addThemeOnCookie("light");
    }
  }, []);

  if (!mounted) return null;

  const themeChanger = () => {
    if (theme === "light") {
      addThemeOnCookie("dark");
      setTheme("dark");
    } else {
      addThemeOnCookie("light");
      setTheme("light");
    }
  };

  const ThemeToggleButton = ({ size }: { size: number }) => (
    <Button
      isIconOnly
      size="sm"
      onClick={themeChanger}
      className={`bg-opacity-50 hover:bg-opacity-100 ${
        theme === "light"
          ? "hover:bg-indigo-800 hover:text-white"
          : "text-indigo-800 bg-slate-300"
      }`}
    >
      {theme === "light" ? <IconMoon size={size} /> : <IconSun size={size} />}
    </Button>
  );

  return (
    <div className="absolute right-2">
      <ThemeToggleButton size={16} />
    </div>
  );
};
