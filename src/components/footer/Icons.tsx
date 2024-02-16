"use client";

import React from "react";
import { FooterIcon, footerIcons as Icons } from "./Icon";
import { TablerIconsProps } from "@tabler/icons-react";
import useCurrentUrl from "@/utils/store/saveCurrentUrl";

interface IconType {
  icon: React.ComponentType<TablerIconsProps>;
  href: string;
  target: string;
}

export const FooterIcons = () => {
  const { currentUrl, setCurrentUrl } = useCurrentUrl();
  const footerIcons = Icons.map((icon: IconType) => {
    let fill: boolean;
    currentUrl?.includes(icon.target) ? (fill = true) : (fill = false);
    return (
      <FooterIcon
        key={icon.icon.displayName}
        Icon={icon.icon}
        href={icon.href}
        fill={fill}
      />
    );
  });
  return (
    <div className="grid grid-flow-col grid-col-4 gap-1 h-full">
      {footerIcons}
    </div>
  );
};
