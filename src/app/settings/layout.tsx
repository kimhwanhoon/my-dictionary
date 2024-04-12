import { Metadata } from "next";
import React, { ReactNode } from "react";

interface SettingsLayout {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Settings - My Dictionary",
};

const SettingsLayout = ({ children }: SettingsLayout) => {
  return <main>{children}</main>;
};

export default SettingsLayout;
