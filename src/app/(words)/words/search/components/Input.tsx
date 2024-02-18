"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();

  const searchQuery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue("");
    router.push(`/words/search?q=${inputValue}`);
  };

  return (
    <form className="p-4 flex flex-col gap-2" onSubmit={(e) => searchQuery(e)}>
      <Input
        label={"Search words"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button color="primary" fullWidth type="submit">
        Search
      </Button>
    </form>
  );
};
