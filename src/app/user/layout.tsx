import { Metadata } from "next";
import React, { ReactNode } from "react";

interface UserLayout {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "User page - My Dictionary",
  description: "This page is currently being built by the developer.",
};

const UserLayout = ({ children }: UserLayout) => {
  return <main>{children}</main>;
};

export default UserLayout;
