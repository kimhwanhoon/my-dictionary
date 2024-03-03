"use client";

import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/dictionary?search=${inputValue}`);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Input
        label={"Search words"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
};
