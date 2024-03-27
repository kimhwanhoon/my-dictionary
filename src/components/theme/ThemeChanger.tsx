"use client";

import { Button } from "@nextui-org/react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themeChanger = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const Icon = ({ size }: { size: number }) => {
    if (theme === "light") {
      return <IconMoon size={size} />;
    } else {
      return <IconSun size={size} />;
    }
  };

  return (
    <div className="absolute right-2">
      <Button
        isIconOnly
        size="sm"
        onClick={themeChanger}
        className="bg-opacity-40"
      >
        <Icon size={16} />
      </Button>
    </div>
  );
};
