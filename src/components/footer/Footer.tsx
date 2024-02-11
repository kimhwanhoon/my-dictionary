import {
  IconHome,
  IconNotebook,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-main w-full h-[90px] shadow-medium">
      <div className="grid grid-flow-col grid-col-4 gap-1 h-full">
        <div className="flex justify-center items-center">
          <IconHome size={32} color="#444" />
        </div>
        <div className="flex justify-center items-center">
          <IconNotebook size={32} color="#444" />
        </div>
        <div className="flex justify-center items-center">
          <IconUser size={32} color="#444" />
        </div>
        <div className="flex justify-center items-center">
          <IconSettings size={32} color="#444" />
        </div>
      </div>
    </footer>
  );
};
