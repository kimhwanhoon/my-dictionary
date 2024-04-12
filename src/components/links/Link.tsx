import NextLink from "next/link";
import React from "react";

interface LinkProps {
  href: string;
  children: string;
  optionalClassName?: string;
}

export const Link = ({ href, children, optionalClassName }: LinkProps) => {
  return (
    <NextLink
      className={`text-blue-500 hover:text-blue-600 hover:underline dark:hover:text-blue-400 ${
        optionalClassName ?? ""
      }`}
      href={href}
    >
      {children}
    </NextLink>
  );
};
