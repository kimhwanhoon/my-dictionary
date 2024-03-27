import { IconBook2 } from "@tabler/icons-react";
import React from "react";

interface Props {
  customClass?: string;
}

export const Logo = ({ customClass = "" }: Props) => {
  return (
    <div className="flex items-center gap-[2px] animate-500 hover:scale-[1.025]">
      <IconBook2
        fill="#978ff1"
        size={34}
        className="text-indigo-900 dark:text-white"
      />
      <h1
        className={`uppercase text-center text-3xl font-bold font-mono tracking-tight  text-indigo-700 drop-shadow-lg dark:text-white ${customClass}`}
      >
        Dictionary
      </h1>
    </div>
  );
};
