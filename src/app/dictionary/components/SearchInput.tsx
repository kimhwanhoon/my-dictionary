"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { SelectLanguage } from "./SelectLanguage";
import { debounce } from "lodash";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("lang") ?? "en";
  const currentWord = searchParams.get("search") ?? "";

  const [inputValue, setInputValue] = useState<string>(currentWord);

  const onSubmitHandler = debounce(() => {
    router.push(`/dictionary?lang=${currentLanguage}&search=${inputValue}`);
  }, 1000);

  return (
    <form
      className="flex flex-col gap-2 p-6 primary-bg"
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
