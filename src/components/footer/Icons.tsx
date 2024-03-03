"use client";

import { FooterIcon, footerIcons as Icons } from "./Icon";

export const FooterIcons = () => {
  const footerIcons = Icons.map((icon: any) => {
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
