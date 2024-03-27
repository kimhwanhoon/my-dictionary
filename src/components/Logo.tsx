import { IconBook2 } from "@tabler/icons-react";
import React from "react";

interface Props {
  customClass?: string;
}

export const Logo = ({ customClass = "" }: Props) => {
  return (
    <div className="flex items-center gap-[2px]">
      <IconBook2
        fill="#978ff1"
        size={34}
        className="text-indigo-700 dark:text-white"
      />
      <h1
        className={`uppercase text-center text-3xl font-bold font-mono text-indigo-700  cursor-default drop-shadow-lg dark:text-white ${customClass}`}
      >
        Dictionary
      </h1>
    </div>
  );
};
