"use client";

import { IconProps } from "@/types/icons";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  href: string;
  Icon: (props: IconProps) => JSX.Element;
}

export const ButtonWithIcon = ({ title, href, Icon }: Props) => {
  const router = useRouter();
  return (
    <Button endContent={<Icon />} onClick={() => router.push(href)}>
      {title}
    </Button>
  );
};
