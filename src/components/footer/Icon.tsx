"use client";

import { footerIconColor } from "@/types/icons";
import { TablerIconsProps } from "@tabler/icons-react";

import {
  IconHome,
  IconNotebook,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  Icon: React.ComponentType<TablerIconsProps>;
  href: string;
}

export const footerIcons = [
  { icon: IconHome, href: "/home" },
  { icon: IconNotebook, href: "/wordbook" },
  { icon: IconUser, href: "/user" },
  { icon: IconSettings, href: "/settings" },
];

export const FooterIcon = ({ Icon, href }: Props) => {
  const router = useRouter();
  const currentPath = usePathname();
  const { theme } = useTheme();
  const [fillColor, setFillColor] = useState<string>("transparent");
  const [lineColor, setLineColor] = useState<string>("#d3d8ec");

  useEffect(() => {
    if (theme === "light") {
      if (currentPath.includes(href)) {
        setFillColor(footerIconColor.light.selected.fill);
        setLineColor(footerIconColor.light.selected.line);
      } else {
        setFillColor(footerIconColor.light.base.fill);
        setLineColor(footerIconColor.light.base.line);
      }
    } else {
      if (currentPath.includes(href)) {
        setFillColor(footerIconColor.dark.selected.fill);
        setLineColor(footerIconColor.dark.selected.line);
      } else {
        setFillColor(footerIconColor.dark.base.fill);
        setLineColor(footerIconColor.dark.base.line);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, theme]);

  return (
    <div className="flex justify-center items-center ">
      <Icon
        className="hover:scale-110 duration-700 ease-soft-spring cursor-pointer"
        fill={fillColor}
        size={32}
        color={lineColor}
        onClick={() => router.push(href)}
      />
    </div>
  );
};
