"use client";

import { Button, Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const searchQuery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("word", inputValue);
      const res = await fetch("/api/dictionary/search", {
        method: "post",
        body: formData,
      });
      const { data } = await res.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log("error, not found");
      return error;
    } finally {
      setInputValue("");
    }
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
