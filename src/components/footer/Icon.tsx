"use client";

import { TablerIconsProps } from "@tabler/icons-react";
import React from "react";

import {
  IconHome,
  IconNotebook,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface Props {
  Icon: React.ComponentType<TablerIconsProps>;
  href: string;
  fill: boolean;
}

export const footerIcons = [
  { icon: IconHome, href: "/", target: "home" },
  { icon: IconNotebook, href: "/words", target: "dictionary" },
  { icon: IconUser, href: "/user", target: "user" },
  { icon: IconSettings, href: "/settings", target: "settings" },
];

export const FooterIcon = ({ Icon, href, fill }: Props) => {
  const router = useRouter();

  const selectedFillColor = "#8980f2";
  const selectedLineColor = "#aba5f7";

  const notSelectedFillColor = "#fff";
  const notSelectedLineColor = "#d3d8ec";
  return (
    <div className="flex justify-center items-center">
      <Icon
        fill={fill ? selectedFillColor : notSelectedFillColor}
        size={32}
        color={fill ? selectedLineColor : notSelectedLineColor}
        onClick={() => router.push(href)}
      />
    </div>
  );
};
