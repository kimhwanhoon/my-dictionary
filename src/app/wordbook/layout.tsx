import { Metadata } from "next";
import React, { ReactNode } from "react";

interface WordbookLayout {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Wordbooks - My Dictionary",
};

const WordbookLayout = ({ children }: WordbookLayout) => {
  return <main>{children}</main>;
};

export default WordbookLayout;
