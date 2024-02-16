"use client";

import useCurrentUrl from "@/utils/store/saveCurrentUrl";
import { useEffect } from "react";

export const ClientHiddenFunctions = ({ url }: { url: string | null }) => {
  const { currentUrl, setCurrentUrl } = useCurrentUrl();
  useEffect(() => {
    setCurrentUrl(url);
  }, [url, setCurrentUrl]);
  return <></>;
};
