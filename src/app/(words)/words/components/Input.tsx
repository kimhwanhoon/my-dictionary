"use client";

import { Accordion, AccordionItem, Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const WordInput = () => {
  const router = useRouter();
  const [wordValue, setWordValue] = useState<string>("");
  const [defValue, setDefValue] = useState<string>("");
  const [exampleValue, setExampleValue] = useState<string>("");

  const registerWord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wordValue === "") {
      console.log("input empty");
      return false;
    }

    try {
      const formData = new FormData();
      formData.append("word", wordValue);
      formData.append("definition", defValue);
      formData.append("example", exampleValue);

      const res = await fetch("/api/words", {
        method: "post",
        body: formData,
      });
      const { error } = await res.json();

      if (error) {
        console.log(error);
        return false;
      } else {
        console.log("word added.");
        router.refresh();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setWordValue("");
      setDefValue("");
      setExampleValue("");
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-2 py-2 "
      onSubmit={(e) => registerWord(e)}
    >
      <Input
        type="text"
        label="Word"
        placeholder="Enter your word"
        value={wordValue}
        onChange={(e) => setWordValue(e.target.value)}
      />
      <Accordion isCompact variant="shadow" className="py-2">
        <AccordionItem
          key={"definition & example"}
          aria-label="definition & example"
          title={
            <p className="text-sm">
              definition & example{" "}
              <span className="text-gray-500 text-xs">(optional)</span>
            </p>
          }
        >
          <div className="flex flex-col gap-2">
            <Input
              size="sm"
              type="text"
              label="Definition"
              value={defValue}
              onChange={(e) => setDefValue(e.target.value)}
            />
            <Input
              size="sm"
              type="text"
              label="Example"
              value={exampleValue}
              onChange={(e) => setExampleValue(e.target.value)}
            />
          </div>
        </AccordionItem>
      </Accordion>
      <Button
        className="text-sm font-medium"
        size="sm"
        color="primary"
        variant="shadow"
        fullWidth
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};
