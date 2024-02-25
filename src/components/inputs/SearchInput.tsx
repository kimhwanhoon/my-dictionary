"use client";

import { removeAccents } from "@/utils/regex/removeAccents";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

const words_french: string[] = require("an-array-of-french-words");

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.length === 0) {
      setFilteredItems([]);
    } else {
      const result: string[] = [];
      words_french.forEach((originalWord) => {
        const simplifiedOriginalWord = removeAccents(originalWord);
        const simplifiedInputValue = removeAccents(inputValue);
        if (simplifiedOriginalWord.startsWith(simplifiedInputValue)) {
          result.push(originalWord);
        }
      });

      const limitWords = result.slice(0, 5);
      setFilteredItems(limitWords);
    }
  }, [inputValue]);

  return (
    <div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex flex-col gap-2 py-4">
        <h3 className="w-full text-center font-semibold text-lg">Result</h3>
        <div>
          {filteredItems.length === 0
            ? null
            : filteredItems.map((word) => <p key={word}>{word}</p>)}
        </div>
      </div>
    </div>
  );
};
