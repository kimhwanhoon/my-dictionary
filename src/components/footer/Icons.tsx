"use client";

import React from "react";
import { FooterIcon, footerIcons as Icons } from "./Icon";
import { TablerIconsProps } from "@tabler/icons-react";

interface IconType {
  icon: React.ComponentType<TablerIconsProps>;
  href: string;
}

export const FooterIcons = () => {
  const footerIcons = Icons.map((icon: IconType) => {
    return (
      <FooterIcon
        key={icon.icon.displayName}
        Icon={icon.icon}
        href={icon.href}
      />
    );
  });
  return (
    <div className="grid grid-flow-col grid-col-4 gap-1 h-full">
      {footerIcons}
    </div>
  );
};
