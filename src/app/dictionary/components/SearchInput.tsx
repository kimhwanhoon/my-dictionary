"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { SelectLanguage } from "./SelectLanguage";
import { debounce } from "lodash";
import { useTheme } from "next-themes";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("lang") ?? "en";
  const currentWord = searchParams.get("search") ?? "";
  const { theme } = useTheme();
  const [backgroundStyle, setBackgroundStyle] = useState<string>("");

  useEffect(() => {
    if (theme === "light") {
      setBackgroundStyle("light-search-input-bg");
    } else {
      setBackgroundStyle("dark-search-input-bg");
    }
  }, [theme]);

  const [inputValue, setInputValue] = useState<string>(currentWord);

  const onSubmitHandler = debounce(() => {
    router.push(
      `/dictionary?lang=${currentLanguage}&search=${inputValue.toLowerCase()}`
    );
  }, 1000);

  return (
    <form
      className={`flex flex-col gap-2 p-6 ${backgroundStyle}`}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitHandler();
      }}
    >
      <Input
        label={"Search words"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        endContent={<SelectLanguage currentLanguage={currentLanguage} />}
      />
      <Button color="primary" fullWidth size="md" type="submit">
        Search
      </Button>
    </form>
  );
};
