"use client";

import { footerIconColor } from "@/types/icons";
import { TablerIconsProps } from "@tabler/icons-react";

import {
  IconHome,
  IconNotebook,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  Icon: React.ComponentType<TablerIconsProps>;
  href: string;
}

export const footerIcons = [
  { icon: IconHome, href: "/home" },
  { icon: IconNotebook, href: "/dictionary" },
  { icon: IconUser, href: "/user" },
  { icon: IconSettings, href: "/settings" },
];

export const FooterIcon = ({ Icon, href }: Props) => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="flex justify-center items-center">
      <Icon
        fill={
          currentPath.includes(href)
            ? footerIconColor.selected.fill
            : footerIconColor.base.fill
        }
        size={32}
        color={
          currentPath.includes(href)
            ? footerIconColor.selected.line
            : footerIconColor.base.line
        }
        onClick={() => router.push(href)}
      />
    </div>
  );
};
