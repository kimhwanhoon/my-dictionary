"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { SelectLanguage } from "./SelectLanguage";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("lang");

  const [inputValue, setInputValue] = useState<string>("");

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/dictionary?lang=${currentLanguage}&search=${inputValue}`);
  };

  return (
    <form
      className="flex flex-col gap-2 bg-blue-200 p-6 rounded-xl"
      onSubmit={onSubmitHandler}
    >
      <Input
        size="sm"
        label={"Search words"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        endContent={<SelectLanguage currentLanguage={currentLanguage} />}
      />
      <Button color="primary" fullWidth size="md">
        Search
      </Button>
    </form>
  );
};
