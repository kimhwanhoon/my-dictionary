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
}

export const footerIcons = [
  { icon: IconHome, href: "/" },
  { icon: IconNotebook, href: "/wordbook" },
  { icon: IconUser, href: "/user" },
  { icon: IconSettings, href: "/settings" },
];

export const FooterIcon = ({ Icon, href }: Props) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center">
      <Icon size={32} color="#444" onClick={() => router.push(href)} />
    </div>
  );
};
